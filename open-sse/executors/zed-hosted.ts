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
 * Like DevinDesktopExecutor, this overrides execute() entirely rather than
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
import {
  ZED_HEADERS,
  resolveZedModels,
  zedLlmFetch,
  type ZedCredentials,
} from "../shared/zedAuth.ts";
import { buildErrorBody } from "../utils/error.ts";
import { hasUsefulStreamContent } from "../utils/streamReadiness.ts";
import { resolveSuppressThinkClose, THINKING_MARKER_HEADER } from "../utils/thinkCloseMarker.ts";

// Wire values for the `provider` field of POST /completions. These are NOT
// display names: cloud.zed.dev matches them exactly, and an unrecognized value
// fails the whole request with `500 {"message":"An internal server error
// occurred."}` before the model is ever looked at — which is why every model id,
// including invalid ones, produced an identical 500.
//
// The spellings come from Zed's own GET /models catalog, which reports
// `anthropic`, `open_ai` and `google` (note the underscore); `x_ai` follows the
// same convention. Feeding a catalog value back through normalizeZedProvider is
// therefore identity, as it must be.
const ZED_PROVIDER = {
  anthropic: "anthropic",
  openai: "open_ai",
  google: "google",
  xai: "x_ai",
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

const MAX_ZED_FAILURE_MESSAGE_LENGTH = 512;
const MAX_PENDING_ZED_OUTPUT_LENGTH = 64 * 1024;
const ZED_STREAM_FAILURE_PUBLIC_MESSAGE = "Zed upstream stream failed";

function boundedFailureText(value: unknown): string | null {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const text = String(value).trim();
  return text ? text.slice(0, MAX_ZED_FAILURE_MESSAGE_LENGTH) : null;
}

function extractZedFailureMessage(failed: Record<string, unknown>): string {
  const nestedError =
    failed.error && typeof failed.error === "object" && !Array.isArray(failed.error)
      ? (failed.error as Record<string, unknown>)
      : null;
  const candidates = [
    failed.message,
    nestedError?.message,
    typeof failed.error === "object" ? undefined : failed.error,
    failed.code,
    nestedError?.code,
  ];
  for (const candidate of candidates) {
    const text = boundedFailureText(candidate);
    if (text) return text;
  }
  return "request failed";
}

function createErrorChunk(message: string): ReturnType<typeof buildErrorBody> {
  return buildErrorBody(502, `Zed stream failed: ${message}`, undefined, {
    type: "upstream_error",
    code: "ZED_STREAM_FAILED",
  });
}

/**
 * The controller capabilities these SSE helpers use. Normal frames only enqueue;
 * terminal failures also terminate so they do not depend on the upstream socket
 * eventually reaching EOF. Narrow controller types keep the helpers honest. The wider
 * `ReadableStreamDefaultController` annotation rejected every call site, because the
 * helpers are driven from a TransformStream and `TransformStreamDefaultController`
 * has no `close()`.
 */
type SseEnqueueTarget = Pick<ReadableStreamDefaultController<Uint8Array>, "enqueue">;
type SseProcessTarget = Pick<TransformStreamDefaultController<Uint8Array>, "enqueue" | "terminate">;

function serializeSseObject(chunk: unknown): string {
  if (!chunk) return "";
  let serialized = "";
  const items = Array.isArray(chunk) ? chunk : [chunk];
  for (const item of items) {
    if (!item) continue;
    serialized += `data: ${JSON.stringify(item)}\n\n`;
  }
  return serialized;
}

function enqueueSseObject(
  controller: SseEnqueueTarget,
  encoder: TextEncoder,
  chunk: unknown
): void {
  const serialized = serializeSseObject(chunk);
  if (!serialized) return;
  controller.enqueue(encoder.encode(serialized));
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

/**
 * Resolves `</think>` close-marker suppression from the incoming client
 * headers / response format, extracted from `ZedHostedExecutor.execute` to
 * keep that method's cyclomatic complexity under the project cap.
 */
function resolveZedSuppressThinkClose(
  clientHeaders: ExecuteInput["clientHeaders"],
  clientResponseFormat: ExecuteInput["clientResponseFormat"]
): boolean {
  return resolveSuppressThinkClose({
    userAgent: clientHeaders?.["user-agent"] ?? clientHeaders?.["User-Agent"] ?? null,
    thinkingMarkerHeader:
      clientHeaders?.[THINKING_MARKER_HEADER] ??
      clientHeaders?.["x-omniroute-thinking-marker"] ??
      null,
    clientResponseFormat: clientResponseFormat ?? null,
  });
}

function wrapZedCompletionStream(
  response: Response,
  provider: ZedProviderName,
  model: string,
  options?: { suppressThinkClose?: boolean }
): Response {
  if (!response.ok || !response.body) return response;

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const state = initProviderState(provider, model);
  if (options?.suppressThinkClose) {
    // Responses API clients (and UA/header-opted-out clients) must not see the
    // textual `</think>` close marker — same policy chatCore applies (#4633 /
    // #5245 / kimi-coding stray marker on /v1/responses).
    state.suppressThinkClose = true;
  }
  let buffer = "";
  let done = false;
  let providerOutputForwarded = false;
  let pendingProviderOutput = "";
  let pendingFailure: (Error & { statusCode: number }) | null = null;

  const forwardProviderOutput = (controller: SseEnqueueTarget, chunk: unknown) => {
    const serialized = serializeSseObject(chunk);
    if (!serialized) return;
    if (providerOutputForwarded) {
      controller.enqueue(encoder.encode(serialized));
      return;
    }

    // A role/bootstrap-only chunk makes ensureStreamReadiness release the response before any
    // model output exists. If the next chunk is status.failed, downstream read-ahead can discard
    // the first real content while propagating the error. Hold structural frames until the first
    // substantive text/reasoning/tool delta, then release them atomically with that output.
    const outputWithBootstrap = pendingProviderOutput + serialized;
    if (!hasUsefulStreamContent(outputWithBootstrap)) {
      pendingProviderOutput =
        outputWithBootstrap.length <= MAX_PENDING_ZED_OUTPUT_LENGTH
          ? outputWithBootstrap
          : serialized.length <= MAX_PENDING_ZED_OUTPUT_LENGTH
            ? serialized
            : "";
      return;
    }
    controller.enqueue(encoder.encode(outputWithBootstrap));
    pendingProviderOutput = "";
    providerOutputForwarded = true;
  };

  const finish = (controller: SseEnqueueTarget) => {
    if (done) return;
    const finalChunk = convertProviderEvent(provider, null, state);
    const finalOutput = `${pendingProviderOutput}${serializeSseObject(finalChunk)}data: [DONE]\n\n`;
    pendingProviderOutput = "";
    controller.enqueue(encoder.encode(finalOutput));
    done = true;
  };

  const processLine = (line: string, controller: SseProcessTarget) => {
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
        const failed =
          status.failed && typeof status.failed === "object" && !Array.isArray(status.failed)
            ? (status.failed as Record<string, unknown>)
            : status;
        if (providerOutputForwarded) {
          pendingFailure = Object.assign(new Error(ZED_STREAM_FAILURE_PUBLIC_MESSAGE), {
            statusCode: 502,
          });
          done = true;
          controller.terminate();
          return;
        }
        pendingProviderOutput = "";
        enqueueSseObject(controller, encoder, createErrorChunk(extractZedFailureMessage(failed)));
        done = true;
        controller.terminate();
      } else if (status?.type === "stream_ended" || status === ("stream_ended" as unknown)) {
        finish(controller);
      }
      return;
    }
    const converted = convertProviderEvent(provider, payload.event, state);
    forwardProviderOutput(controller, converted);
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

  // `TransformStreamDefaultController.error()` discards already-enqueued output. A failed
  // status can share one upstream network chunk with the last content delta, so erroring the
  // transform immediately would erase that partial answer. Drain the transformed chunks through
  // a backpressure-aware reader first, then reject the next read with the fixed public error.
  // The normal chat pipeline turns that rejection into its client-format terminal frame and
  // records the 502 through the existing failure finalizers.
  const transformedReader = transformed.getReader();
  let guardedStreamCancelled = false;
  const cancelTransformedReader = (reason: unknown) => {
    if (guardedStreamCancelled) return;
    guardedStreamCancelled = true;
    // Client cancellation must settle independently of an upstream body whose cancel hook hangs.
    // Request cancellation once, but do not await provider cleanup on the client-facing boundary.
    void transformedReader.cancel(reason).catch(() => {
      console.debug("[ZED] upstream stream cancellation rejected");
    });
  };
  const guardedStream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const next = await transformedReader.read();
        if (guardedStreamCancelled) return;
        if (!next.done) {
          controller.enqueue(next.value);
          return;
        }
        if (pendingFailure) {
          controller.error(pendingFailure);
          return;
        }
        controller.close();
      } catch (error) {
        if (!guardedStreamCancelled) controller.error(error);
      }
    },
    cancel(reason) {
      cancelTransformedReader(reason);
    },
  });

  return new Response(guardedStream, {
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

  async execute({
    model,
    body,
    stream,
    credentials,
    signal,
    log,
    clientHeaders,
    clientResponseFormat,
  }: ExecuteInput): Promise<{
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
          "x-zed-version":
            (this.config as Record<string, unknown>)?.appVersion?.toString() || "0.200.0",
          [ZED_HEADERS.clientSupportsStatus]: "true",
          [ZED_HEADERS.clientSupportsStreamEnded]: "true",
        },
        body: JSON.stringify(payload),
      },
    });

    // The Anthropic backend converts Claude events to OpenAI chunks inside
    // wrapZedCompletionStream, bypassing chatCore's marker policy — resolve
    // `</think>` close-marker suppression here from the client format /
    // headers (same policy as chatCore / GLM, #5245 / kimi-coding leak).
    const suppressThinkClose = resolveZedSuppressThinkClose(clientHeaders, clientResponseFormat);

    const wrapped = response.ok
      ? wrapZedCompletionStream(response, provider, model, { suppressThinkClose })
      : response;
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
      (parsed?.message as string) ||
      (errorObj?.message as string) ||
      bodyText ||
      response.statusText;
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
