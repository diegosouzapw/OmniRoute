// Stream handler with disconnect detection - shared for all providers

type StreamDisconnectEvent = {
  reason: string;
  duration: number;
};

type StreamControllerOptions = {
  onDisconnect?: (event: StreamDisconnectEvent) => void;
  log?: unknown;
  provider?: string;
  model?: string;
};

type StreamController = ReturnType<typeof createStreamController>;

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
  log,
  provider,
  model,
}: StreamControllerOptions = {}) {
  const abortController = new AbortController();
  const startTime = Date.now();
  let disconnected = false;
  let abortTimeout: ReturnType<typeof setTimeout> | null = null;

  const logStream = (status) => {
    const duration = Date.now() - startTime;
    const p = provider?.toUpperCase() || "UNKNOWN";
    console.log(
      `[${getTimeString()}] 🌊 [STREAM] ${p} | ${model || "unknown"} | ${duration}ms | ${status}`
    );
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

      // Delay abort to allow cleanup
      abortTimeout = setTimeout(() => {
        abortController.abort();
      }, 500);

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
  };
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
            ? (error as any).statusCode
            : 500;

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

        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(errorEvent)}\n\n`));
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));

        controller.close();
      }
    },

    cancel(reason) {
      streamController.handleDisconnect(reason || "cancelled");
      reader.cancel();
      writer.abort();
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
