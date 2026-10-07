/**
 * Response mapping helpers for the Arena (lmarena) executor — kept small so
 * the executor methods stay under complexity / max-lines gates.
 */
import { isCloudflareChallenge } from "../../services/lmarenaTlsClient.ts";
import { buildErrorBody } from "../../utils/error.ts";
import { sanitizeLMArenaError } from "./error.ts";
import { markLMArenaCatalogModelDead } from "./models.ts";
import { parseArenaSSE } from "./stream.ts";

const encoder = new TextEncoder();
const SAFE_ARENA_STREAM_ERROR_NAMES = new Set([
  "AbortError",
  "ResponseAborted",
  "TimeoutError",
  "BodyTimeoutError",
]);

type ArenaPublicFailure =
  | { kind: "missing-cookie" }
  | {
      kind: "bot-block";
      status: number;
      reason: "cloudflare" | "token-present" | "token-needed";
    }
  | { kind: "http-status"; status: number }
  | { kind: "tls-unavailable" }
  | { kind: "network" }
  | { kind: "upstream-event" }
  | { kind: "stream-transport" };

interface ArenaProjectedPublicFailure {
  status: number;
  message: string;
  type: string;
  code: string;
}

type ArenaProjectedStreamError = Error & {
  statusCode?: number;
  type?: string;
  code?: string;
};

const ARENA_PUBLIC_MESSAGES = {
  missingCookie:
    "Arena requires a session cookie. Paste the full Cookie header from arena.ai (include arena-auth-prod-v1.* chunks and ideally cf_clearance).",
  cloudflareBot:
    "Arena blocked by Cloudflare bot management. Use a residential/browser-grade network if needed, paste a fresh full Cookie header (include cf_clearance / __cf_bm when present), and optionally set providerSpecificData.recaptchaV3Token from a live browser session.",
  botTokenNeeded:
    "If this persists, supply a browser reCAPTCHA v3 token via credentials.providerSpecificData.recaptchaV3Token (in addition to the session cookie).",
  tlsUnavailable:
    "Arena TLS impersonation unavailable: Arena upstream error. Verify the wreq-js 3.2 native binding.",
  upstream: "Arena upstream error",
  upstreamStream: "Arena upstream stream error",
} as const;

function normalizeArenaErrorStatus(status: number, fallback: number): number {
  return Number.isInteger(status) && status >= 400 && status <= 599 ? status : fallback;
}

function projectArenaPublicFailure(failure: ArenaPublicFailure): ArenaProjectedPublicFailure {
  switch (failure.kind) {
    case "missing-cookie":
      return {
        status: 401,
        message: ARENA_PUBLIC_MESSAGES.missingCookie,
        type: "authentication_error",
        code: "missing_cookie",
      };
    case "bot-block": {
      const status = normalizeArenaErrorStatus(failure.status, 403);
      let message: string;
      switch (failure.reason) {
        case "cloudflare":
          message = ARENA_PUBLIC_MESSAGES.cloudflareBot;
          break;
        case "token-present":
          message = `Arena API error: ${status}`;
          break;
        case "token-needed":
          message = `Arena API error: ${status}. ${ARENA_PUBLIC_MESSAGES.botTokenNeeded}`;
          break;
        default: {
          const exhaustiveReason: never = failure.reason;
          return exhaustiveReason;
        }
      }
      return {
        status,
        message,
        type: "api_error",
        code: "cloudflare_or_bot",
      };
    }
    case "http-status": {
      const status = normalizeArenaErrorStatus(failure.status, 502);
      return {
        status,
        message: `Arena API error: ${status}`,
        type: "api_error",
        code: String(status),
      };
    }
    case "tls-unavailable":
      return {
        status: 502,
        message: ARENA_PUBLIC_MESSAGES.tlsUnavailable,
        type: "upstream_error",
        code: "TLS_CLIENT_UNAVAILABLE",
      };
    case "network":
      return {
        status: 502,
        message: ARENA_PUBLIC_MESSAGES.upstream,
        type: "network_error",
        code: "request_failed",
      };
    case "upstream-event":
      return {
        status: 502,
        message: ARENA_PUBLIC_MESSAGES.upstream,
        type: "api_error",
        code: "lmarena_error",
      };
    case "stream-transport":
      return {
        status: 502,
        message: ARENA_PUBLIC_MESSAGES.upstreamStream,
        type: "upstream_error",
        code: "lmarena_stream_error",
      };
    default: {
      const exhaustiveFailure: never = failure;
      return exhaustiveFailure;
    }
  }
}

function projectArenaStreamError(error: unknown): Error {
  const publicError = buildArenaPublicError({ kind: "stream-transport" }).body.error;
  const projected = new Error(publicError.message) as ArenaProjectedStreamError;
  projected.stack = undefined;
  projected.type = publicError.type;
  projected.code = publicError.code;
  if (!error || typeof error !== "object") return projected;

  try {
    const name = (error as { name?: unknown }).name;
    if (typeof name === "string" && SAFE_ARENA_STREAM_ERROR_NAMES.has(name)) {
      projected.name = name;
    }
    const rawStatusCode = (error as { statusCode?: unknown }).statusCode;
    if (
      typeof rawStatusCode === "number" &&
      Number.isInteger(rawStatusCode) &&
      rawStatusCode >= 400 &&
      rawStatusCode <= 599
    ) {
      projected.statusCode = rawStatusCode;
    }
  } catch {
    // Hostile thrown values must not escape through coercing metadata accessors.
  }
  return projected;
}

function buildArenaPublicError(failure: ArenaPublicFailure) {
  const projected = projectArenaPublicFailure(failure);
  return {
    status: projected.status,
    body: buildErrorBody(projected.status, projected.message, undefined, {
      type: projected.type,
      code: projected.code,
    }),
  };
}

function errorResponse(failure: ArenaPublicFailure): Response {
  const projected = buildArenaPublicError(failure);
  return new Response(JSON.stringify(projected.body), {
    status: projected.status,
    headers: { "Content-Type": "application/json" },
  });
}

export function missingCookieResult(
  url: string,
  headers: Record<string, string>,
  transformedBody: unknown
) {
  return {
    response: errorResponse({ kind: "missing-cookie" }),
    url,
    headers,
    transformedBody,
  };
}

function isBotOrChallenge(status: number, text: string | null | undefined): boolean {
  if (status === 403) return true;
  if (isCloudflareChallenge(text)) return true;
  return Boolean(text && text.trimStart().startsWith("<!DOCTYPE"));
}

function botBlockFailure(
  text: string | null | undefined,
  hasRecaptcha: boolean,
  status: number
): ArenaPublicFailure {
  const reason = isCloudflareChallenge(text)
    ? "cloudflare"
    : hasRecaptcha
      ? "token-present"
      : "token-needed";
  return { kind: "bot-block", status, reason };
}

/** Map non-2xx / CF TLS results to an executor failure payload, or null if OK. */
export function mapFailedTlsResult(opts: {
  status: number;
  text: string | null | undefined;
  hasRecaptcha: boolean;
  model: string;
  arenaModelId: string;
  url: string;
  headers: Record<string, string>;
  transformedBody: unknown;
}) {
  const { status, text, hasRecaptcha, model, arenaModelId, url, headers, transformedBody } = opts;
  if (isBotOrChallenge(status, text)) {
    return {
      response: errorResponse(botBlockFailure(text, hasRecaptcha, status)),
      url,
      headers,
      transformedBody,
    };
  }
  if (status >= 200 && status < 300) return null;

  if (status === 404 || status === 410 || status === 502) {
    markLMArenaCatalogModelDead(model);
    markLMArenaCatalogModelDead(arenaModelId);
  }
  // Fail closed: TLS error bodies can contain upstream stacks, causes, or internal identifiers.
  // Preserve the HTTP classification without projecting any body-derived text to the caller.
  return {
    response: errorResponse({ kind: "http-status", status }),
    url,
    headers,
    transformedBody,
  };
}

export function mapTlsUnavailable(
  url: string,
  headers: Record<string, string>,
  transformedBody: unknown
) {
  return {
    response: errorResponse({ kind: "tls-unavailable" }),
    url,
    headers,
    transformedBody,
  };
}

export function mapNetworkError(
  url: string,
  headers: Record<string, string>,
  transformedBody: unknown
) {
  return {
    response: errorResponse({ kind: "network" }),
    url,
    headers,
    transformedBody,
  };
}

export function buildArenaUpstreamHttpResponse(opts: {
  stream: boolean;
  status: number;
  text: string | null;
  body: ReadableStream<Uint8Array> | null;
}): Response {
  const { stream, status, text, body } = opts;
  if (stream && body) {
    return new Response(body, {
      status,
      headers: { "Content-Type": "text/event-stream" },
    });
  }
  return new Response(text ?? "", {
    status,
    headers: { "Content-Type": "text/event-stream" },
  });
}

function baseChunk(model: string) {
  return {
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
  };
}

function enqueueSse(controller: ReadableStreamDefaultController, chunk: Record<string, unknown>) {
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
}

function emitStopAndDone(controller: ReadableStreamDefaultController, model: string) {
  enqueueSse(controller, {
    ...baseChunk(model),
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
  });

  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
  controller.close();
}

/** Process one Arena SSE line into OpenAI chunk writes. Returns true if stream should end. */
function handleArenaEventLine(
  sseLine: string,
  model: string,
  controller: ReadableStreamDefaultController
): boolean {
  const event = parseArenaSSE(sseLine);
  if (!event) return false;
  if (event.type === "text" && event.content) {
    enqueueSse(controller, {
      ...baseChunk(model),
      choices: [{ index: 0, delta: { content: event.content }, finish_reason: null }],
    });
    return false;
  }
  if (event.type === "error") {
    const upstreamError = buildArenaPublicError({ kind: "upstream-event" });
    enqueueSse(controller, {
      ...baseChunk(model),
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      error: upstreamError.body.error,
    });
    controller.close();
    return true;
  }
  if (event.type === "done") {
    emitStopAndDone(controller, model);
    return true;
  }
  return false;
}

export function createOpenAIArenaStream(opts: {
  reader: ReadableStreamDefaultReader<Uint8Array>;
  model: string;
  signal?: AbortSignal;
  log?: { error?: (scope: string, msg: string) => void };
}): ReadableStream<Uint8Array> {
  const { reader, model, signal, log } = opts;
  const decoder = new TextDecoder();
  let buffer = "";
  let readerCleanup: Promise<void> | null = null;

  const cleanupReader = (): Promise<void> => {
    if (readerCleanup) return readerCleanup;
    readerCleanup = (async () => {
      try {
        await reader.cancel();
      } catch {
        // The upstream may already be closed or errored; still release its lock below.
      }
      try {
        reader.releaseLock();
      } catch {
        // A concurrent cleanup may already have released this reader.
      }
    })();
    return readerCleanup;
  };

  const onAbort = () => {
    // The upstream reader may already be closed; cleanup failure must not replace the abort outcome.
    void cleanupReader();
  };
  if (signal) {
    if (signal.aborted) onAbort();
    else signal.addEventListener("abort", onAbort, { once: true });
  }

  return new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          if (signal?.aborted) {
            // Cancellation is best-effort cleanup; the already-observed abort remains authoritative.
            await cleanupReader();
            controller.close();
            return;
          }
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (!line.trim()) continue;
            const sseLine = line.startsWith("data: ") ? line.substring(6) : line;
            if (handleArenaEventLine(sseLine, model, controller)) return;
          }
        }
        emitStopAndDone(controller, model);
      } catch (error) {
        const logMessage = sanitizeLMArenaError(error, "Arena upstream stream error");
        log?.error?.("LMArenaExecutor", `Streaming error: ${logMessage}`);
        controller.error(projectArenaStreamError(error));
      } finally {
        await cleanupReader();
        if (signal) signal.removeEventListener("abort", onAbort);
      }
    },
    async cancel() {
      // The consumer may cancel after the upstream reader closed; cleanup must not mask that outcome.
      await cleanupReader();
      if (signal) signal.removeEventListener("abort", onAbort);
    },
  });
}

export async function handleNonStreamingArenaResponse(
  response: Response,
  model: string
): Promise<Response> {
  const text = await response.text();
  let fullText = "";
  let hasUpstreamError = false;

  for (const line of text.split("\n")) {
    if (!line.trim()) continue;
    const sseLine = line.startsWith("data: ") ? line.substring(6) : line;
    const event = parseArenaSSE(sseLine);
    if (!event) continue;
    if (event.type === "text" && event.content) fullText += event.content;
    else if (event.type === "error") {
      hasUpstreamError = true;
      break;
    } else if (event.type === "done") break;
  }

  if (hasUpstreamError) {
    return errorResponse({ kind: "upstream-event" });
  }

  return new Response(
    JSON.stringify({
      id: `chatcmpl-${Date.now()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: fullText },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
