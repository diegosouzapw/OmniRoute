const DEFAULT_INTERVAL_MS = 15_000;

type SseHeartbeatTransformOptions = {
  intervalMs?: number;
  signal?: AbortSignal;
};

export function createSseHeartbeatTransform({
  intervalMs = DEFAULT_INTERVAL_MS,
  signal,
}: SseHeartbeatTransformOptions = {}) {
  let intervalId: ReturnType<typeof setInterval> | undefined;
  const encoder = new TextEncoder();

  const stop = () => {
    if (!intervalId) return;
    clearInterval(intervalId);
    intervalId = undefined;
  };

  return new TransformStream<Uint8Array, Uint8Array>({
    start(controller) {
      intervalId = setInterval(() => {
        if (signal?.aborted) {
          stop();
          return;
        }

        try {
          controller.enqueue(encoder.encode(`: keepalive ${new Date().toISOString()}\n\n`));
        } catch {
          stop();
        }
      }, intervalMs);

      if (intervalId && typeof intervalId === "object" && "unref" in intervalId) {
        intervalId.unref?.();
      }

      signal?.addEventListener("abort", stop, { once: true });
    },

    transform(chunk, controller) {
      controller.enqueue(chunk);
    },

    flush() {
      stop();
    },
  });
}
