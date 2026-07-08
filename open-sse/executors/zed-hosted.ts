/**
 * ZedHostedExecutor — routes requests to Zed's hosted LLM aggregator
 * (cloud.zed.dev/completions), a multi-format proxy that fronts
 * Anthropic/OpenAI/Google/xAI depending on the requested model.
 *
 * Distinct from the pre-existing `zed` provider id, which is a Zed IDE
 * credential-import surface (src/lib/zed-oauth/ + src/mitm/detection/zed.ts) —
 * that surface only detects/imports local Zed IDE keychain credentials, it does
 * not proxy chat completions. This executor is the NEW cloud-proxy
 * capability; registry id `zed-hosted` avoids colliding with the IDE id.
 *
 * Wire protocol: POST /completions with an NDJSON/SSE-ish body-per-line
 * response stream (`{"event": <provider-shaped-chunk>}` /
 * `{"status": ...}` / `[DONE]`), authenticated with a short-lived LLM
 * bearer token (see open-sse/shared/zedAuth.ts). The provider-shaped
 * chunk is Claude/Gemini/OpenAI-Responses/xAI(OpenAI-shaped) depending on
 * which upstream Zed is fronting for the requested model — translated back
 * to OpenAI Chat Completions chunks by reusing OmniRoute's own translators
 * (the same ones used for the native claude/gemini/codex executors), never
 * a bespoke per-provider parser.
 *
 * Ported from decolua/9router PR #2328 (open-sse/executors/zed.js),
 * adapted to TypeScript + OmniRoute's BaseExecutor/translator conventions.
 * Like WindsurfExecutor, this overrides execute() entirely rather than
 * using BaseExecutor's default Claude-Code-oriented pipeline, because the
 * Zed wire request/response shape (thread envelope, LLM-token exchange,
 * NDJSON status frames) doesn't fit the generic transformRequest/buildUrl
 * contract that pipeline assumes.
 */

import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { FORMATS } from "../translator/formats.ts";
import { initState } from "../translator/index.ts";
import { openaiToClaudeRequest } from "../translator/request/openai-to-claude.ts";
import { openaiToGeminiRequest } from "../translator/request/openai-to-gemini.ts";
import { openaiToOpenAIResponsesRequest } from "../translator/request/openai-responses/toResponses.ts";
import { claudeToOpenAIResponse } from "../translator/response/claude-to-openai.ts";
import { geminiToOpenAIResponse } from "../translator/response/gemini-to-openai.ts";
import { openaiResponsesToOpenAIResponse } from "../translator/response/openai-responses.ts";
import { ZED_HEADERS, resolveZedModels, zedLlmFetch, type ZedCredentials } from "../shared/zedAuth.ts";

const ZED_PROVIDER = {
  anthropic: "Anthropic",
  openai: "OpenAi",
  google: "Google",
  xai: "XAi",
} as const;

type ZedProviderName = (typeof ZED_PROVIDER)[keyof typeof ZED_PROVIDER];

function normalizeZedProvider(value: unknown, model: unknown): ZedProviderName {
  const raw = String(value || "").toLowerCase();
  if (raw === "anthropic") return ZED_PROVIDER.anthropic;
  if (raw === "openai" || raw === "open_ai") return ZED_PROVIDER.openai;
  if (raw === "google" || raw === "gemini") return ZED_PROVIDER.google;
  if (raw === "xai" || raw === "x_ai" || raw === "x-ai") return ZED_PROVIDER.xai;

  const m = String(model || "").toLowerCase();
  if (m.includes("claude")) return ZED_PROVIDER.anthropic;
  if (m.includes("gemini")) return ZED_PROVIDER.google;
  if (m.includes("grok") || m.includes("xai")) return ZED_PROVIDER.xai;
  return ZED_PROVIDER.openai;
}

function buildProviderRequest(
  provider: ZedProviderName,
  model: string,
  body: unknown,
  stream: boolean,
  credentials: ProviderCredentials
): unknown {
  if (provider === ZED_PROVIDER.anthropic) {
    return openaiToClaudeRequest(model, body, true);
  }
  if (provider === ZED_PROVIDER.google) {
    return openaiToGeminiRequest(model, body as Record<string, unknown>, true, credentials);
  }
  if (provider === ZED_PROVIDER.openai) {
    return openaiToOpenAIResponsesRequest(model, body, true, credentials);
  }
  return {
    ...(body as Record<string, unknown>),
    model,
    stream: stream !== false,
  };
}

function initProviderState(provider: ZedProviderName, model: string): Record<string, unknown> {
  if (provider === ZED_PROVIDER.anthropic) return initState(FORMATS.CLAUDE);
  if (provider === ZED_PROVIDER.google) return initState(FORMATS.GEMINI);
  if (provider === ZED_PROVIDER.openai) return initState(FORMATS.OPENAI_RESPONSES);
  const state = initState(FORMATS.OPENAI);
  state.model = model;
  return state;
}

function convertProviderEvent(
  provider: ZedProviderName,
  event: unknown,
  state: Record<string, unknown>
): unknown {
  if (provider === ZED_PROVIDER.anthropic) return claudeToOpenAIResponse(event, state);
  if (provider === ZED_PROVIDER.google) return geminiToOpenAIResponse(event, state);
  if (provider === ZED_PROVIDER.openai) return openaiResponsesToOpenAIResponse(event, state);
  return event;
}

function createErrorChunk(model: string, message: string): Record<string, unknown> {
  return {
    id: `chatcmpl-zed-error-${Date.now()}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, delta: { content: `[Zed error] ${message}` }, finish_reason: "stop" }],
  };
}

function enqueueSseObject(
  controller: ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder,
  chunk: unknown
): void {
  if (!chunk) return;
  const items = Array.isArray(chunk) ? chunk : [chunk];
  for (const item of items) {
    if (!item) continue;
    controller.enqueue(encoder.encode(`data: ${JSON.stringify(item)}\n\n`));
  }
}

type ZedLine = { done?: true; status?: unknown; event?: unknown } | null;

function unwrapZedLine(line: string): ZedLine {
  let text = line.replace(/\r$/, "").trim();
  if (!text) return null;
  if (text.startsWith("data:")) text = text.slice(5).trimStart();
  if (text === "[DONE]") return { done: true };
  try {
    const parsed = JSON.parse(text);
    if (parsed && Object.prototype.hasOwnProperty.call(parsed, "event")) {
      return { event: parsed.event };
    }
    if (parsed && Object.prototype.hasOwnProperty.call(parsed, "status")) {
      return { status: parsed.status };
    }
    return { event: parsed };
  } catch {
    return null;
  }
}

function normalizeStatus(status: unknown): Record<string, unknown> | null {
  if (!status) return null;
  if (typeof status === "string") return { type: status };
  if (typeof status === "object") {
    const rec = status as Record<string, unknown>;
    const key = Object.keys(rec)[0];
    if (key && typeof rec[key] === "object") return { type: key, ...(rec[key] as object) };
    return rec;
  }
  return null;
}

function wrapZedCompletionStream(
  response: Response,
  provider: ZedProviderName,
  model: string
): Response {
  if (!response.ok || !response.body) return response;

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const state = initProviderState(provider, model);
  let buffer = "";
  let done = false;

  const finish = (controller: ReadableStreamDefaultController<Uint8Array>) => {
    if (done) return;
    const finalChunk = convertProviderEvent(provider, null, state);
    enqueueSseObject(controller, encoder, finalChunk);
    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
    done = true;
  };

  const processLine = (line: string, controller: ReadableStreamDefaultController<Uint8Array>) => {
    if (done) return;
    const payload = unwrapZedLine(line);
    if (!payload) return;
    if (payload.done) {
      finish(controller);
      return;
    }
    if (payload.status) {
      const status = normalizeStatus(payload.status);
      if (status?.type === "failed" || status?.failed) {
        const failed = (status.failed as Record<string, unknown>) || status;
        const message = String(failed.message || failed.error || failed.code || "request failed");
        enqueueSseObject(controller, encoder, createErrorChunk(model, message));
        finish(controller);
      } else if (status?.type === "stream_ended" || status === ("stream_ended" as unknown)) {
        finish(controller);
      }
      return;
    }
    const converted = convertProviderEvent(provider, payload.event, state);
    enqueueSseObject(controller, encoder, converted);
  };

  const transformed = response.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          processLine(line, controller);
        }
      },
      flush(controller) {
        buffer += decoder.decode();
        if (buffer) {
          processLine(buffer, controller);
          buffer = "";
        }
        finish(controller);
      },
    })
  );

  return new Response(transformed, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
}

export class ZedHostedExecutor extends BaseExecutor {
  constructor() {
    super("zed-hosted", PROVIDERS["zed-hosted"] || {});
  }

  async resolveModel(
    model: string,
    credentials: ZedCredentials,
    signal: AbortSignal | null | undefined,
    log: ExecuteInput["log"]
  ): Promise<{ raw: Record<string, unknown> | null; provider: ZedProviderName }> {
    try {
      const catalog = await resolveZedModels(credentials, { config: this.config, signal });
      let raw = catalog?.rawById?.get(model) ?? null;
      if (!raw) {
        const refreshed = await resolveZedModels(credentials, {
          config: this.config,
          signal,
          forceRefresh: true,
        });
        raw = refreshed?.rawById?.get(model) ?? null;
      }
      return {
        raw,
        provider: normalizeZedProvider(raw?.provider, model),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      log?.warn?.("ZED", `model catalog unavailable, inferring provider for ${model}: ${message}`);
      return { raw: null, provider: normalizeZedProvider(null, model) };
    }
  }

  async execute({ model, body, stream, credentials, signal, log }: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const zedCredentials = credentials as ZedCredentials;
    const { provider } = await this.resolveModel(model, zedCredentials, signal, log);
    const providerRequest = buildProviderRequest(provider, model, body, stream, credentials);
    const bodyRecord = (body ?? {}) as Record<string, unknown>;
    const payload = {
      thread_id: bodyRecord.thread_id || (credentials as Record<string, unknown>)?._clientSessionId,
      prompt_id: bodyRecord.prompt_id,
      provider,
      model,
      provider_request: providerRequest,
    };

    const response = await zedLlmFetch(zedCredentials, "/completions", {
      config: this.config,
      signal,
      fetchOptions: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/x-ndjson, text/event-stream, */*",
          "User-Agent": `OmniRoute/zed-hosted`,
          "x-zed-version": (this.config as Record<string, unknown>)?.appVersion?.toString() || "0.200.0",
          [ZED_HEADERS.clientSupportsStatus]: "true",
          [ZED_HEADERS.clientSupportsStreamEnded]: "true",
        },
        body: JSON.stringify(payload),
      },
    });

    const wrapped = response.ok ? wrapZedCompletionStream(response, provider, model) : response;
    return {
      response: wrapped,
      url: `${(this.config as Record<string, unknown>)?.llmBaseUrl || "https://cloud.zed.dev"}/completions`,
      headers: { "Content-Type": "application/json", Authorization: "Bearer <zed-llm-token>" },
      transformedBody: payload,
    };
  }

  parseError(response: Response, bodyText: string): { status: number; message: string } {
    let parsed: Record<string, unknown> | null = null;
    try {
      parsed = JSON.parse(bodyText || "{}");
    } catch {
      parsed = null;
    }

    const errorObj = (parsed?.error as Record<string, unknown>) || undefined;
    const code = (parsed?.code as string) || (errorObj?.code as string) || "";
    const rawMessage =
      (parsed?.message as string) || (errorObj?.message as string) || bodyText || response.statusText;
    if (code === "trial_blocked") {
      return {
        status: response.status,
        message: `Zed trial access is blocked upstream. The account can list hosted models, but Zed is refusing completions until trial/billing access is enabled or unblocked. Zed says: ${rawMessage}`,
      };
    }
    if (code) {
      return {
        status: response.status,
        message: `Zed ${code}: ${rawMessage}`,
      };
    }
    return {
      status: response.status,
      message: rawMessage || `Zed upstream error: ${response.status}`,
    };
  }

  async refreshCredentials(): Promise<Partial<ProviderCredentials> | null> {
    return null;
  }

  needsRefresh(): boolean {
    return false;
  }
}

export default ZedHostedExecutor;

export const __test__ = {
  normalizeZedProvider,
  unwrapZedLine,
  wrapZedCompletionStream,
};
