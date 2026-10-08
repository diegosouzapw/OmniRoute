// Codex Images API handler (dedicated generations/edits routes).
// Family: codex-responses | Provider: codex
//
// Under ChatGPT OAuth the Codex backend serves GPT Image models through two unary JSON
// routes that sit next to `/responses` — the typed Images client contract Codex CLI uses
// (openai/codex#23989):
//   POST {codex}/images/generations  {prompt, model, n, quality?, size?, background?}
//   POST {codex}/images/edits        {images: [{image_url}], prompt, model, n, ...}
//   -> {created, data: [{b64_json}], background, quality, size, output_format, usage}
// The Responses hosted `image_generation` tool ignores a requested image model (the
// backend echoes `gpt-image-2-codex` for every request) and needs a chat model to call
// it, which it can decline. These routes take `model` as a request field and have no
// chat model in the loop. They do not echo the model that served the image.

import { randomUUID } from "crypto";
import { getCodexClientVersion, getCodexUserAgent } from "../../../config/codexClient.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import {
  isCodexChatGptModelAccessError,
  mapLegacyImageQualityToImageTool,
  sanitizeImageProviderError,
  saveImageErrorResult,
  saveImageSuccessResult,
} from "../../imageGeneration.ts";

type ImageLog = {
  info: (tag: string, message: string) => void;
  error: (tag: string, message: string) => void;
} | null;

type CodexImagesSuccess = {
  ok: true;
  images: string[];
  created: number | null;
  outputFormat: string | null;
  usage: unknown;
};
type CodexImagesFailure = { ok: false; status: number; error: unknown; retryable: boolean };
type CodexImagesOutcome = CodexImagesSuccess | CodexImagesFailure;

function isFailure(outcome: CodexImagesOutcome): outcome is CodexImagesFailure {
  return outcome.ok === false;
}

const OUTPUT_MIME_BY_FORMAT: Readonly<Record<string, string>> = {
  png: "image/png",
  jpeg: "image/jpeg",
  webp: "image/webp",
};
const MAX_CODEX_IMAGES_PER_REQUEST = 10;

/** GPT Image models are image-only: they are served by the Images routes, never a tool call. */
export function isCodexImagesApiModel(model: unknown): boolean {
  return typeof model === "string" && /^gpt-image-/i.test(model.trim());
}

/** `https://chatgpt.com/backend-api/codex/responses` -> `.../backend-api/codex/images/<route>`. */
export function codexImagesUrl(responsesUrl: string, route: "generations" | "edits"): string {
  const base = String(responsesUrl || "")
    .replace(/\/+$/, "")
    .replace(/\/responses$/, "");
  return `${base}/images/${route}`;
}

/** Sum two upstream `usage` blocks field by field (n>1 fans out into one call per image). */
function sumUsage(total: unknown, next: unknown): unknown {
  if (total === undefined || total === null) return next;
  if (next === undefined || next === null) return total;
  if (typeof total === "number" && typeof next === "number") return total + next;
  if (typeof total !== "object" || typeof next !== "object") return total;
  const merged: Record<string, unknown> = { ...(total as Record<string, unknown>) };
  for (const [key, value] of Object.entries(next as Record<string, unknown>)) {
    merged[key] = sumUsage(merged[key], value);
  }
  return merged;
}

function readImagesResponse(raw: string): CodexImagesOutcome {
  let parsed: Record<string, unknown> | null = null;
  try {
    const value = JSON.parse(raw);
    if (value && typeof value === "object" && !Array.isArray(value)) parsed = value;
  } catch {
    parsed = null;
  }
  const data = Array.isArray(parsed?.data) ? parsed.data : [];
  const images = data
    .map((item) =>
      item && typeof item === "object" ? (item as Record<string, unknown>).b64_json : null
    )
    .filter((b64): b64 is string => typeof b64 === "string" && b64.length > 0);
  if (!parsed || images.length === 0) {
    return {
      ok: false,
      status: 502,
      error: "Codex Images API returned no b64_json image",
      retryable: false,
    };
  }
  return {
    ok: true,
    images,
    created: typeof parsed.created === "number" ? parsed.created : null,
    outputFormat: typeof parsed.output_format === "string" ? parsed.output_format : null,
    usage: parsed.usage && typeof parsed.usage === "object" ? parsed.usage : undefined,
  };
}

/**
 * Serve a Codex image generation or reference-image edit through the dedicated Images
 * routes. Called by handleCodexImageGeneration after its prompt, credential, and
 * free-plan guards, so account selection and retry semantics stay shared with the
 * hosted-tool path.
 */
export async function handleCodexImagesApi({
  model,
  provider,
  baseUrl,
  body,
  token,
  workspaceId,
  requestedCount,
  referenceImages,
  startTime,
  log,
  signal,
  logPath,
}: {
  model: string;
  provider: string;
  baseUrl: string;
  body: Record<string, unknown>;
  token: string;
  workspaceId: unknown;
  requestedCount: number;
  referenceImages: Array<{ bytes: Buffer; mime?: string }>;
  startTime: number;
  log: ImageLog;
  signal: AbortSignal | null;
  logPath: string;
}) {
  if (requestedCount > MAX_CODEX_IMAGES_PER_REQUEST) {
    return saveImageErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: `n must be between 1 and ${MAX_CODEX_IMAGES_PER_REQUEST} for Codex image generation`,
      path: logPath,
    });
  }
  const isEdit = referenceImages.length > 0;
  const url = codexImagesUrl(baseUrl, isEdit ? "edits" : "generations");
  const prompt = String(body.prompt);

  // One image per call, same as Codex CLI; n>1 fans out below.
  const upstreamBody: Record<string, unknown> = { prompt, model, n: 1 };
  if (typeof body.size === "string" && body.size.trim()) upstreamBody.size = body.size.trim();
  if (typeof body.quality === "string" && body.quality.trim()) {
    upstreamBody.quality = mapLegacyImageQualityToImageTool(body.quality.trim());
  }
  if (typeof body.background === "string" && body.background.trim()) {
    upstreamBody.background = body.background.trim();
  }
  if (isEdit) {
    upstreamBody.images = referenceImages.map((image) => ({
      image_url: `data:${image.mime || "image/png"};base64,${image.bytes.toString("base64")}`,
    }));
  }
  // Never log reference image bytes; record their MIME/size only (same as the hosted path).
  const { prompt: _prompt, images: _images, ...loggedOptions } = upstreamBody;
  const requestBodyForLog = isEdit
    ? {
        ...loggedOptions,
        prompt_chars: prompt.length,
        reference_images: referenceImages.map((image) => ({
          mime: image.mime || "image/png",
          bytes: image.bytes.length,
        })),
      }
    : upstreamBody;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    Version: getCodexClientVersion(),
    "User-Agent": getCodexUserAgent(),
    originator: "codex_cli_rs",
  };
  if (typeof workspaceId === "string" && workspaceId) headers["chatgpt-account-id"] = workspaceId;

  if (log) {
    const promptSummary = isEdit ? `${prompt.length} chars` : `"${prompt.slice(0, 60)}..."`;
    log.info("IMAGE", `${provider}/${model} (codex-images) | prompt: ${promptSummary}`);
  }

  const fetchOne = async (): Promise<CodexImagesOutcome> => {
    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: { ...headers, "x-codex-image-turn-id": randomUUID() },
        body: JSON.stringify(upstreamBody),
        signal,
      });
    } catch (err) {
      const message = sanitizeErrorMessage(err);
      if (log) log.error("IMAGE", `${provider} fetch error: ${message}`);
      return {
        ok: false,
        status: 502,
        error: `Image provider error: ${message}`,
        retryable: false,
      };
    }
    let raw: string;
    try {
      raw = await response.text();
    } catch (err) {
      const message = sanitizeErrorMessage(err);
      if (log) log.error("IMAGE", `${provider} response read error: ${message}`);
      return {
        ok: false,
        status: 502,
        error: `Image provider response error: ${message}`,
        retryable: false,
      };
    }
    if (!response.ok) {
      const safeError = sanitizeImageProviderError(raw);
      if (log) {
        const safeLog = typeof safeError === "string" ? safeError : JSON.stringify(safeError ?? {});
        log.error("IMAGE", `${provider} error ${response.status}: ${safeLog}`);
      }
      return {
        ok: false,
        status: response.status,
        error: safeError,
        retryable: isCodexChatGptModelAccessError(response.status, raw, model),
      };
    }
    return readImagesResponse(raw);
  };

  const outcomes = await Promise.all(Array.from({ length: requestedCount }, () => fetchOne()));

  const collected: string[] = [];
  let created: number | null = null;
  let outputFormat: string | null = null;
  let usage: unknown = undefined;
  for (const outcome of outcomes) {
    if (isFailure(outcome)) {
      return saveImageErrorResult({
        provider,
        model,
        status: outcome.status,
        startTime,
        error: outcome.error,
        requestBody: requestBodyForLog,
        path: logPath,
        ...(outcome.retryable ? { retryable: true } : {}),
      });
    }
    collected.push(...outcome.images);
    created = created ?? outcome.created;
    outputFormat = outputFormat ?? outcome.outputFormat;
    usage = sumUsage(usage, outcome.usage);
  }

  // Same envelope rules as the hosted-tool path (#12268): bytes in b64_json unless the
  // caller explicitly asked for `url`, in which case a data: URI is returned.
  const mime = OUTPUT_MIME_BY_FORMAT[outputFormat || "png"] || "image/png";
  const images =
    body.response_format === "url"
      ? collected.map((b64) => ({ url: `data:${mime};base64,${b64}` }))
      : collected.map((b64) => ({ b64_json: b64 }));

  const result = saveImageSuccessResult({
    provider,
    model,
    startTime,
    requestBody: requestBodyForLog,
    responseBody: { images_count: images.length, ...(usage ? { usage } : {}) },
    created,
    images,
    path: logPath,
  });
  // The Images routes report token usage in the OpenAI gpt-image-* `usage` shape; pass it
  // through so callers (and future usage accounting) see what the image actually cost.
  if (usage) (result.data as Record<string, unknown>).usage = usage;
  return result;
}
