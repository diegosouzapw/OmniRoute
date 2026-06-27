import { trackPendingRequest } from "@/lib/usageDb";
import { STREAM_IDLE_TIMEOUT_MS } from "../config/constants.ts";
import { FORMATS } from "../translator/formats.ts";
import { PENDING_REQUEST_CLEARED_MARKER } from "./stream.ts";

// Stream handler with disconnect detection - shared for all providers

// Default budget for the pipeWithDisconnect raw-upstream stall watchdog.
// Inherits STREAM_IDLE_TIMEOUT_MS so a single env knob still governs the
// max time we tolerate silence from upstream. Reasoning models (Claude
// thinking, Kiro EventStream binary frames) emit zero post-transform
// output for long stretches while raw bytes keep arriving — measuring
// stall on the transform output false-positives on those streams, so
// the watchdog must track upstream byte activity instead. Ported from
// decolua/9router#1243.
const DEFAULT_STREAM_STALL_TIMEOUT_MS = STREAM_IDLE_TIMEOUT_MS;

type StreamDisconnectEvent = {
  reason: string;
  duration: number;
};

type StreamErrorEvent = {
  error: unknown;
  message: string;
  statusCode: number;
  duration: number;
};

type StreamControllerOptions = {
  onDisconnect?: (event: StreamDisconnectEvent) => boolean | void;
  onError?: (event: StreamErrorEvent) => boolean | void;
  provider?: string;
  model?: string;
  connectionId?: string | null;
  clientResponseFormat?: string | null;
  clientAbortSignal?: AbortSignal | null;
};

type StreamController = ReturnType<typeof createStreamController>;

type StreamErrorStatusKind = "rate_limit" | "authentication" | "permission" | "client" | "server";

type StreamErrorStatusMapping = {
  responses: {
    type: string;
    code: string;
  };
  claude: {
    type: string;
  };
};

function isResponsesClientFormat(clientResponseFormat?: string | null): boolean {
  return (
    clientResponseFormat === FORMATS.OPENAI_RESPONSES ||
    clientResponseFormat === FORMATS.OPENAI_RESPONSE
  );
}

function getStreamErrorStatusKind(statusCode: number): StreamErrorStatusKind {
  if (statusCode === 429) return "rate_limit";
  if (statusCode === 401) return "authentication";
  if (statusCode === 403) return "permission";
  if (statusCode >= 400 && statusCode < 500) return "client";
  return "server";
}

function getStreamErrorStatusMapping(statusCode: number): StreamErrorStatusMapping {
  switch (getStreamErrorStatusKind(statusCode)) {
    case "rate_limit":
      return {
        responses: { type: "rate_limit_error", code: "rate_limit_exceeded" },
        claude: { type: "rate_limit_error" },
      };
    case "authentication":
      return {
        responses: { type: "authentication_error", code: "invalid_authentication" },
        claude: { type: "authentication_error" },
      };
    case "permission":
      return {
        responses: { type: "authentication_error", code: "permission_denied" },
        claude: { type: "permission_error" },
      };
    case "client":
      return {
        responses: { type: "invalid_request_error", code: "bad_request" },
        claude: { type: "invalid_request_error" },
      };
    case "server":
      return {
        responses: { type: "server_error", code: "server_error" },
        claude: { type: "api_error" },
      };
    default:
      return {
        responses: { type: "server_error", code: "server_error" },
        claude: { type: "api_error" },
      };
  }
}

function encodeSseEvent(
  data: unknown,
  {
    event,
    includeDone = false,
  }: {
    event?: string;
    includeDone?: boolean;
  } = {}
) {
  if (event && /[\r\n]/.test(event)) {
    throw new Error("SSE event names must not contain newlines");
  }

  const encoder = new TextEncoder();
  const prefix = event ? `event: ${event}\n` : "";
  const chunks = [encoder.encode(`${prefix}data: ${JSON.stringify(data)}\n\n`)];
  if (includeDone) {
    chunks.push(encoder.encode("data: [DONE]\n\n"));
  }
  return chunks;
}

// Get HH:MM:SS timestamp
function getTimeString() {
  return new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function isPendingRequestClearedError(error: unknown): boolean {
  return (
    !!error &&
    typeof error === "object" &&
    (error as Record<string, unknown>)[PENDING_REQUEST_CLEARED_MARKER] === true
  );
}

/**
 * A client disconnect — the caller aborted the request or closed the SSE
 * connection — is NOT a provider failure. It surfaces either as an
 * AbortError/ResponseAborted, or, when OmniRoute then tries to enqueue another
 * chunk into the now-closed response stream, as a "Controller is already closed"
 * TypeError. Treating any of these as an upstream error wrongly cools down the
 * account/connection, so the stream error path uses this to skip the provider
 * failover/cooldown (the chatgpt-web / codex / antigravity executors already
 * guard client aborts the same way).
 */
export function isClientDisconnectError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const name = (error as { name?: unknown }).name;
  if (name === "AbortError" || name === "ResponseAborted") return true;
  const message = (error as { message?: unknown }).message;
  return typeof message === "string" && /Controller is already closed/i.test(message);
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error.trim().length > 0) return error;
  return "Upstream stream error";
}

function getErrorStatusCode(error: unknown): number {
  if (error && typeof error === "object" && "statusCode" in error) {
    const statusCode = Number((error as { statusCode?: unknown }).statusCode);
    if (Number.isFinite(statusCode) && statusCode >= 400 && statusCode <= 599) {
      return statusCode;
    }
  }
  return 502;
}

function hasClientTerminalSseMarker(text: string, clientResponseFormat?: string | null): boolean {
  if (/(?:^|\r?\n)data:\s*\[DONE\]\s*(?:\r?\n|$)/.test(text)) {
    return true;
  }

  if (isResponsesClientFormat(clientResponseFormat)) {
    return (
      /(?:^|\r?\n)event:\s*response\.completed\s*(?:\r?\n|$)/.test(text) ||
      /"type"\s*:\s*"response\.completed"/.test(text)
    );
  }

  if (clientResponseFormat === FORMATS.CLAUDE) {
    return (
      /(?:^|\r?\n)event:\s*message_stop\s*(?:\r?\n|$)/.test(text) ||
      /"type"\s*:\s*"message_stop"/.test(text)
    );
  }

  return false;
}

/**
 * Create stream controller with abort and disconnect detection
 * @param {object} options
 * @param {function} options.onDisconnect - Callback when client disconnects
 * @param {object} options.log - Logger instance
 * @param {string} options.provider - Provider name
 * @param {string} options.model - Model name
 */
/** @param {StreamControllerOptions} options */
export function createStreamController({
  onDisconnect,
  onError,
  provider,
  model,
  connectionId,
  clientResponseFormat,
  clientAbortSignal,
}: StreamControllerOptions = {}) {
  const abortController = new AbortController();
  const startTime = Date.now();
  let disconnected = false;
  let pendingRequestCleared = false;
  let cleanupClientAbortSignal: (() => void) | null = null;

  const logStream = (status) => {
    const duration = Date.now() - startTime;
    const p = provider?.toUpperCase() || "UNKNOWN";
    console.log(
      `[${getTimeString()}] 🌊 [STREAM] ${p} | ${model || "unknown"} | ${duration}ms | ${status}`
    );
  };

  const clearPendingRequest = (error?: unknown) => {
    if (pendingRequestCleared) return;
    if (
      error &&
      typeof error === "object" &&
      (error as Record<string, unknown>)[PENDING_REQUEST_CLEARED_MARKER] === true
    ) {
      pendingRequestCleared = true;
      return;
    }

    pendingRequestCleared = true;
    if (!model && !provider && !connectionId) return;
    try {
      trackPendingRequest(model || "", provider || "", connectionId ?? null, false);
    } catch {}
  };

  const cleanupClientAbortListener = () => {
    if (!cleanupClientAbortSignal) return;
    cleanupClientAbortSignal();
    cleanupClientAbortSignal = null;
  };

  const getClientAbortReason = () => {
    const reason = clientAbortSignal?.reason;
    if (typeof reason === "string" && reason.trim().length > 0) {
      return reason;
    }
    if (reason instanceof Error && reason.message) {
      return reason.message;
    }
    return "request_signal_aborted";
  };

  const controller = {
    signal: abortController.signal,
    startTime,

    isConnected: () => !disconnected,

    // Call when client disconnects
    handleDisconnect: (reason = "client_closed") => {
      if (disconnected) return;
      disconnected = true;
      cleanupClientAbortListener();

      logStream(`disconnect: ${reason}`);

      // Decrement pending request counter — the TransformStream flush() won't
      // fire when the client aborts mid-stream, so we must clean up here.
      clearPendingRequest();

      abortController.abort(reason);

      onDisconnect?.({ reason, duration: Date.now() - startTime });
    },

    // Call when stream completes normally
    handleComplete: () => {
      if (disconnected) return;
      disconnected = true;
      cleanupClientAbortListener();

      logStream("complete");
    },

    // Call on error
    handleError: (error: unknown) => {
      cleanupClientAbortListener();

      // A client disconnect is not a provider failure. If the client already went away
      // (disconnected) or the error is a client abort / "Controller is already closed",
      // skip the onError failover/cooldown path — otherwise one cancelled request marks
      // the upstream connection unavailable.
      if (disconnected || isClientDisconnectError(error)) {
        clearPendingRequest(error);
        logStream(disconnected ? "client_disconnect (post-abort)" : "client_disconnect");
        return;
      }

      const alreadyCleared = isPendingRequestClearedError(error);
      let handled = false;
      if (!alreadyCleared) {
        try {
          handled =
            onError?.({
              error,
              message: getErrorMessage(error),
              statusCode: getErrorStatusCode(error),
              duration: Date.now() - startTime,
            }) === true;
        } catch {}
      }

      if (!handled) {
        clearPendingRequest(error);
      } else {
        pendingRequestCleared = true;
      }

      if (error instanceof Error && error.name === "AbortError") {
        logStream("aborted");
        return;
      }

      if (error instanceof Error) {
        logStream(`error: ${error.message}`);
        return;
      }
      logStream("error: unknown");
    },

    abort: () => {
      cleanupClientAbortListener();
      abortController.abort();
    },
    clientResponseFormat,
  };

  if (clientAbortSignal && typeof clientAbortSignal.addEventListener === "function") {
    const handleClientAbort = () => {
      controller.handleDisconnect(getClientAbortReason());
    };
    if (clientAbortSignal.aborted) {
      queueMicrotask(handleClientAbort);
    } else {
      clientAbortSignal.addEventListener("abort", handleClientAbort, { once: true });
      cleanupClientAbortSignal = () => {
        clientAbortSignal.removeEventListener("abort", handleClientAbort);
      };
    }
  }

  return controller;
}

function buildStreamErrorChunks(
  errorMsg: string,
  statusCode: number,
  clientResponseFormat?: string | null
) {
  const statusMapping = getStreamErrorStatusMapping(statusCode);

  if (isResponsesClientFormat(clientResponseFormat)) {
    const errorEvent = {
      type: "response.failed",
      response: {
        id: null,
        status: "failed",
        error: {
          message: errorMsg,
          type: statusMapping.responses.type,
          code: statusMapping.responses.code,
        },
      },
    };

    return encodeSseEvent(errorEvent, { event: "response.failed" });
  }

  if (clientResponseFormat === FORMATS.CLAUDE) {
    const errorEvent = {
      type: "error",
      error: {
        type: statusMapping.claude.type,
        message: errorMsg,
      },
    };

    return encodeSseEvent(errorEvent, { event: "error" });
  }

  const errorEvent = {
    object: "chat.completion.chunk",
    choices: [
      {
        index: 0,
        delta: {},
        finish_reason: "error",
      },
    ],
    error: {
      message: errorMsg,
      type: statusMapping.responses.type,
      code: statusMapping.responses.code,
    },
  };

  return encodeSseEvent(errorEvent, { includeDone: true });
}

/**
 * Minimal `writable` half used by `pipeWithDisconnect`. The real writable is
 * driven entirely by the upstream-piped readable, so the writer only needs an
 * `abort()` hook for `createDisconnectAwareStream`'s `cancel()` path.
 *
 * `abort()` returns `Promise<void>` to match the native
 * `WritableStreamDefaultWriter.abort()` contract — `cancel()` (and any caller
 * that awaits the writer) gets a real thenable instead of `undefined`, which
 * keeps abort/error handling clean. Ported from decolua/9router@6b624af4.
 */
export function createNoopAbortWritable(): {
  getWriter: () => { abort: () => Promise<void> };
} {
  return { getWriter: () => ({ abort: () => Promise.resolve() }) };
}

/**
 * Create transform stream with disconnect detection
 * Wraps existing transform stream and adds abort capability
 */
export function createDisconnectAwareStream(transformStream, streamController) {
  const reader = transformStream.readable.getReader();
  const writer = transformStream.writable.getWriter();
  const terminalDecoder = new TextDecoder();
  let terminalTail = "";
  let clientTerminalSeen = false;

  const noteClientChunk = (chunk: unknown) => {
    if (clientTerminalSeen) return;
    if (!(chunk instanceof Uint8Array)) return;

    terminalTail += terminalDecoder.decode(chunk, { stream: true });
    if (terminalTail.length > 4096) {
      terminalTail = terminalTail.slice(-4096);
    }
    clientTerminalSeen = hasClientTerminalSseMarker(
      terminalTail,
      streamController.clientResponseFormat
    );
  };

  return new ReadableStream(
    {
      async pull(controller) {
        if (!streamController.isConnected()) {
          controller.close();
          return;
        }

        try {
          const { done, value } = await reader.read();
          if (done) {
            streamController.handleComplete();
            controller.close();
            return;
          }
          controller.enqueue(value);
          noteClientChunk(value);
        } catch (error) {
          if (!streamController.isConnected()) {
            try {
              controller.close();
            } catch {}
            return;
          }

          if (clientTerminalSeen) {
            streamController.handleComplete();
            try {
              controller.close();
            } catch {}
            return;
          }

          streamController.handleError(error);

          // T35: Encapsulate mid-stream errors as SSE events instead of abruptly aborting
          // This prevents TransferEncodingError on the client side
          const errorMsg = getErrorMessage(error);
          const statusCode = getErrorStatusCode(error);

          try {
            for (const chunk of buildStreamErrorChunks(
              errorMsg,
              statusCode,
              streamController.clientResponseFormat
            )) {
              controller.enqueue(chunk);
            }
          } catch {
            // The downstream may have closed while we were formatting the in-band
            // error event. The original stream error has already been recorded.
          }

          try {
            controller.close();
          } catch {}
        }
      },

      async cancel(reason) {
        streamController.handleDisconnect(reason || "cancelled");
        await Promise.allSettled([reader.cancel(reason), writer.abort(reason)]);
      },
    },
    { highWaterMark: 16384 }
  );
}

/**
 * Pipe provider response through transform with disconnect detection.
 *
 * Stall watchdog tracks raw upstream byte activity, not transform output.
 * Reasoning models (Claude thinking via Kiro, etc.) can produce zero SSE
 * output for long stretches while partial EventStream frames keep arriving;
 * measuring stall on the transform output caused false stalls. Any upstream
 * chunk resets the timer. If no bytes arrive for `stallTimeoutMs`, the
 * stream surfaces a "stream stall timeout" error and aborts.
 *
 * Ported from decolua/9router#1243 by @zakirkun.
 *
 * @param providerResponse - Response from provider
 * @param transformStream - Transform stream for SSE
 * @param streamController - Stream controller from createStreamController
 * @param opts.stallTimeoutMs - Override the stall budget (defaults to
 *   STREAM_IDLE_TIMEOUT_MS / DEFAULT_STREAM_STALL_TIMEOUT_MS). `0` disables
 *   the watchdog.
 */
export function pipeWithDisconnect(
  providerResponse: Response,
  transformStream: TransformStream<Uint8Array, Uint8Array>,
  streamController: StreamController,
  opts: { stallTimeoutMs?: number } = {}
) {
  const stallTimeoutMs = opts.stallTimeoutMs ?? DEFAULT_STREAM_STALL_TIMEOUT_MS;

  // Watchdog disabled — preserve legacy behavior verbatim.
  if (!stallTimeoutMs || stallTimeoutMs <= 0) {
    const transformedBody = providerResponse.body.pipeThrough(transformStream);
    return createDisconnectAwareStream(
      { readable: transformedBody, writable: createNoopAbortWritable() },
      streamController
    );
  }

  let stallTimer: ReturnType<typeof setTimeout> | null = null;
  // Captured on the upstream tap's `start`, used by the watchdog to error the
  // pipeline so the downstream reader unblocks and emits a clean SSE error
  // event. Without this, aborting the AbortController alone does not unblock
  // a `reader.read()` already suspended on the transform pipe — the request
  // would hang until the upstream finally closed the socket.
  let upstreamTapController: TransformStreamDefaultController<Uint8Array> | null = null;
  // Set when the watchdog fires so the downstream pull() catch (which sees
  // the same error propagated through the pipeline) does not call
  // handleError a second time — pending-cleanup is idempotent but onError
  // callbacks should fire once per error.
  let stallFired = false;

  const clearStall = () => {
    if (stallTimer) {
      clearTimeout(stallTimer);
      stallTimer = null;
    }
  };
  const armStall = () => {
    clearStall();
    stallTimer = setTimeout(() => {
      stallTimer = null;
      stallFired = true;
      const stallError = new Error("stream stall timeout");
      // Notify the controller (onError callback + pending-request cleanup).
      try {
        streamController.handleError?.(stallError);
      } catch {}
      // Error the pipeline so the downstream reader unblocks. createDisconnect-
      // AwareStream's catch block translates this into buildStreamErrorChunks
      // (sanitized SSE error event with finish_reason:"error", per the format).
      try {
        upstreamTapController?.error(stallError);
      } catch {}
      // Abort the underlying fetch so upstream releases the connection.
      try {
        streamController.abort?.();
      } catch {}
    }, stallTimeoutMs);
  };

  // Wrap controller so every termination path clears the stall timer.
  // Without this, abort/complete/error/disconnect paths leave the timer armed
  // and a stale abort could fire after the request has already ended.
  const wrappedController: StreamController = {
    ...streamController,
    handleComplete: () => {
      clearStall();
      streamController.handleComplete();
    },
    handleError: (e: unknown) => {
      clearStall();
      // Watchdog already fired its own handleError — the inner pull() catch
      // sees the same error propagated through the pipeline; suppress the
      // duplicate to keep onError callbacks single-fire.
      if (stallFired) return;
      streamController.handleError(e);
    },
    handleDisconnect: (reason?: string) => {
      clearStall();
      streamController.handleDisconnect(reason);
    },
    abort: () => {
      clearStall();
      streamController.abort();
    },
  };

  // Inert tap that resets the stall timer on every raw upstream byte chunk.
  // Sits between the provider body and the SSE transform so reasoning models
  // that buffer many raw bytes into a single emitted event do not look
  // stalled to the watchdog.
  const upstreamTap = new TransformStream<Uint8Array, Uint8Array>({
    start(controller) {
      upstreamTapController = controller;
      armStall();
    },
    transform(chunk, controller) {
      armStall();
      controller.enqueue(chunk);
    },
    flush() {
      clearStall();
    },
  });

  const transformedBody = providerResponse.body
    .pipeThrough(upstreamTap)
    .pipeThrough(transformStream);
  return createDisconnectAwareStream(
    { readable: transformedBody, writable: createNoopAbortWritable() },
    wrappedController
  );
}
