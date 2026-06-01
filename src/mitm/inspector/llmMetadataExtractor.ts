/**
 * Extract LLM-specific metadata from intercepted requests so the UI can
 * render summary chips (provider, model, tokens, cost). Provider/api inference
 * is host- and path-based; token counts come from the upstream `usage` block.
 *
 * Replaces the stub `extractLlmMetadata` left in `kindDetector.ts` by F1.
 * Cost estimation uses the minimal pricing table in `pricing.ts` (R5-11).
 */

import { detectKind } from "./kindDetector.ts";
import { estimateCost } from "./pricing.ts";
import { mergeStream, parseSseStream } from "./sseMerger.ts";
import type { InterceptedRequest, LlmMetadata } from "./types.ts";

interface ProviderMatch {
  pattern: RegExp;
  provider: string;
}

const PROVIDER_MATCHERS: ProviderMatch[] = [
  { pattern: /(^|\.)openai\.com$/i, provider: "openai" },
  { pattern: /(^|\.)openai\.azure\.com$/i, provider: "azure-openai" },
  { pattern: /(^|\.)anthropic\.com$/i, provider: "anthropic" },
  { pattern: /generativelanguage\.googleapis\.com$/i, provider: "gemini" },
  { pattern: /(^|\.)aiplatform\.googleapis\.com$/i, provider: "vertex" },
  { pattern: /(^|\.)mistral\.ai$/i, provider: "mistral" },
  { pattern: /(^|\.)deepseek\.com$/i, provider: "deepseek" },
  { pattern: /(^|\.)groq\.com$/i, provider: "groq" },
  { pattern: /(^|\.)together\.xyz$/i, provider: "together" },
  { pattern: /(^|\.)fireworks\.ai$/i, provider: "fireworks" },
  { pattern: /(^|\.)cohere\.com$/i, provider: "cohere" },
  { pattern: /(^|\.)perplexity\.ai$/i, provider: "perplexity" },
  { pattern: /(^|\.)huggingface\.co$/i, provider: "huggingface" },
  { pattern: /(^|\.)openrouter\.ai$/i, provider: "openrouter" },
  { pattern: /(^|\.)x\.ai$/i, provider: "xai" },
  { pattern: /(^|\.)moonshot\.ai$/i, provider: "moonshot" },
  { pattern: /bigmodel\.cn$/i, provider: "bigmodel" },
  { pattern: /(^|\.)githubcopilot\.com$/i, provider: "github-copilot" },
  { pattern: /(^|\.)cursor\.sh$/i, provider: "cursor" },
  { pattern: /(^|\.)zed\.dev$/i, provider: "zed" },
];

interface ApiKindMatch {
  pattern: RegExp;
  apiKind: string;
}

const API_KIND_MATCHERS: ApiKindMatch[] = [
  { pattern: /\/(v1|v1beta)?\/?chat\/completions/i, apiKind: "chat.completions" },
  { pattern: /\/(v1|v1beta)\/messages/i, apiKind: "messages" },
  { pattern: /\/(v1|v1beta)?\/?embeddings/i, apiKind: "embeddings" },
  { pattern: /\/(v1|v1beta)?\/?responses/i, apiKind: "responses" },
  { pattern: /\/streamGenerateContent/i, apiKind: "streamGenerateContent" },
  { pattern: /\/generateContent/i, apiKind: "generateContent" },
  { pattern: /\/(v1|v1beta)\/completions/i, apiKind: "completions" },
];

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function safeParseJson(value: string | null | undefined): unknown {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function inferProvider(host: string): string | null {
  for (const m of PROVIDER_MATCHERS) {
    if (m.pattern.test(host)) return m.provider;
  }
  return null;
}

function inferApiKind(path: string): string | null {
  for (const m of API_KIND_MATCHERS) {
    if (m.pattern.test(path)) return m.apiKind;
  }
  return null;
}

function countMessages(body: Record<string, unknown> | null): number {
  if (!body) return 0;
  if (Array.isArray(body.messages)) return body.messages.length;
  if (Array.isArray(body.contents)) return body.contents.length;
  if (Array.isArray(body.input)) return body.input.length;
  return 0;
}

function isSseRequest(req: InterceptedRequest): boolean {
  const accept = req.requestHeaders["accept"] ?? req.requestHeaders["Accept"] ?? "";
  const ct = req.responseHeaders["content-type"] ?? req.responseHeaders["Content-Type"] ?? "";
  return (
    accept.includes("event-stream") ||
    ct.includes("event-stream") ||
    /^\s*event:|^\s*data:/m.test(req.responseBody ?? "")
  );
}

function maybeNumber(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

function extractUsage(resp: unknown): { tokensIn: number | null; tokensOut: number | null } {
  // Direct JSON
  const respObj = asRecord(resp);
  const usage = asRecord(respObj?.usage);
  if (usage) {
    const inTok =
      maybeNumber(usage.prompt_tokens) ??
      maybeNumber(usage.input_tokens) ??
      maybeNumber((asRecord(usage.promptTokensDetails) ?? {}).total) ??
      null;
    const outTok =
      maybeNumber(usage.completion_tokens) ??
      maybeNumber(usage.output_tokens) ??
      maybeNumber((asRecord(usage.completionTokensDetails) ?? {}).total) ??
      null;
    return { tokensIn: inTok, tokensOut: outTok };
  }
  // Gemini-style usageMetadata
  const um = asRecord(respObj?.usageMetadata);
  if (um) {
    const inTok = maybeNumber(um.promptTokenCount);
    const outTok = maybeNumber(um.candidatesTokenCount);
    return { tokensIn: inTok, tokensOut: outTok };
  }
  return { tokensIn: null, tokensOut: null };
}

/**
 * Extract LLM metadata. Returns `null` for non-LLM requests; otherwise
 * returns best-effort fields (any unknown field is `null`).
 */
export function extractLlmMetadata(req: InterceptedRequest): LlmMetadata | null {
  const kind = req.detectedKind ?? detectKind(req);
  if (kind !== "llm") return null;

  const body = asRecord(safeParseJson(req.requestBody));
  let resp: unknown = safeParseJson(req.responseBody);

  // If response was SSE, try to merge it for usage metadata.
  if (!resp && req.responseBody && isSseRequest(req)) {
    const merged = mergeStream(parseSseStream(req.responseBody));
    resp = merged.message ?? null;
  }

  const respObj = asRecord(resp);

  const provider = inferProvider(req.host);
  const apiKind = inferApiKind(req.path);
  const model =
    (body && typeof body.model === "string" ? body.model : null) ??
    (respObj && typeof respObj.model === "string" ? respObj.model : null) ??
    (respObj && typeof respObj.modelVersion === "string" ? respObj.modelVersion : null) ??
    null;
  const messages = countMessages(body);
  const { tokensIn, tokensOut } = extractUsage(resp);
  const streamed = isSseRequest(req);
  const mappedTo =
    req.mappedModel ??
    req.requestHeaders["x-omniroute-mapped"] ??
    req.requestHeaders["X-Omniroute-Mapped"] ??
    null;

  return {
    provider,
    apiKind,
    model,
    messages,
    tokensIn,
    tokensOut,
    streamed,
    mappedTo,
    costEstimateUsd: estimateCost(model, tokensIn, tokensOut),
  };
}
