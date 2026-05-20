import { trackPendingRequest } from "@/lib/usageDb";
import { FORMATS } from "../translator/formats.ts";
import { PENDING_REQUEST_CLEARED_MARKER } from "./stream.ts";

// Stream handler with disconnect detection - shared for all providers

const DISCONNECT_ABORT_DELAY_MS = 2_000;

type StreamDisconnectEvent = {
  reason: string;
  duration: number;
};

type StreamControllerOptions = {
  onDisconnect?: (event: StreamDisconnectEvent) => void;
  provider?: string;
  model?: string;
  connectionId?: string | null;
  clientResponseFormat?: string | null;
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
  provider,
  model,
  connectionId,
  clientResponseFormat,
}: StreamControllerOptions = {}) {
  const abortController = new AbortController();
  const startTime = Date.now();
  let disconnected = false;
  let abortTimeout: ReturnType<typeof setTimeout> | null = null;
  let pendingRequestCleared = false;

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

  return {
    signal: abortController.signal,
    startTime,

    isConnected: () => !disconnected,

    // Call when client disconnects
    handleDisconnect: (reason = "client_closed") => {
      if (disconnected) return;
      disconnected = true;

      logStream(`disconnect: ${reason}`);

      // Decrement pending request counter — the TransformStream flush() won't
      // fire when the client aborts mid-stream, so we must clean up here.
      clearPendingRequest();

      // Delay abort to allow cleanup
      abortTimeout = setTimeout(() => {
        abortController.abort();
      }, DISCONNECT_ABORT_DELAY_MS);

      onDisconnect?.({ reason, duration: Date.now() - startTime });
    },

    // Call when stream completes normally
    handleComplete: () => {
      if (disconnected) return;
      disconnected = true;

      logStream("complete");

      if (abortTimeout) {
        clearTimeout(abortTimeout);
        abortTimeout = null;
      }
    },

    // Call on error
    handleError: (error: unknown) => {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
        abortTimeout = null;
      }

      clearPendingRequest(error);

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

    abort: () => abortController.abort(),
    clientResponseFormat,
  };
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
      type: "upstream_error",
      code: statusCode,
    },
  };

  return encodeSseEvent(errorEvent, { includeDone: true });
}

/**
 * Create transform stream with disconnect detection
 * Wraps existing transform stream and adds abort capability
 */
export function createDisconnectAwareStream(transformStream, streamController) {
  const reader = transformStream.readable.getReader();
  const writer = transformStream.writable.getWriter();

  return new ReadableStream({
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
      } catch (error) {
        streamController.handleError(error);

        // T35: Encapsulate mid-stream errors as SSE events instead of abruptly aborting
        // This prevents TransferEncodingError on the client side
        const errorMsg = error instanceof Error ? error.message : "Upstream stream error";
        const statusCode =
          typeof error === "object" && error !== null && "statusCode" in error
            ? Number((error as { statusCode?: unknown }).statusCode) || 500
            : 500;

        for (const chunk of buildStreamErrorChunks(
          errorMsg,
          statusCode,
          streamController.clientResponseFormat
        )) {
          controller.enqueue(chunk);
        }

        controller.close();
      }
    },

    cancel(reason) {
      streamController.handleDisconnect(reason || "cancelled");
      reader.cancel();
      setTimeout(() => {
        writer.abort();
      }, DISCONNECT_ABORT_DELAY_MS).unref?.();
    },
  });
}

/**
 * Pipe provider response through transform with disconnect detection
 * @param {Response} providerResponse - Response from provider
 * @param {TransformStream} transformStream - Transform stream for SSE
 * @param {object} streamController - Stream controller from createStreamController
 */
export function pipeWithDisconnect(
  providerResponse: Response,
  transformStream: TransformStream<Uint8Array, Uint8Array>,
  streamController: StreamController
) {
  const transformedBody = providerResponse.body.pipeThrough(transformStream);
  return createDisconnectAwareStream(
    { readable: transformedBody, writable: { getWriter: () => ({ abort: () => {} }) } },
    streamController
  );
}
