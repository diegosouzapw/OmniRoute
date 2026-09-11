export interface LogStreamOptions {
  baseUrl?: string;
  filters?: string[];
  follow?: boolean;
  timeout?: number;
  headers?: HeadersInit;
}

export interface LogStream {
  stream: ReadableStream<Uint8Array>;
  stop: () => void;
}

export function createLogStream(options: LogStreamOptions = {}): LogStream {
  const baseUrl = options.baseUrl || "http://localhost:20128";
  const filters = options.filters || [];
  const follow = options.follow ?? false;
  const timeout = options.timeout || 30000;
  const headers = options.headers;

  const controller = new AbortController();
  const { signal } = controller;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let url = `${baseUrl}/api/cli-tools/logs?follow=${follow}`;
      if (filters.length > 0) {
        url += `&filter=${encodeURIComponent(filters.join(","))}`;
      }

      const timeoutId = setTimeout(() => {
        if (follow) return; // Don't timeout follow mode
        controller.error(new Error(`Log stream timed out after ${timeout}ms`));
      }, timeout);

      try {
        const response = await fetch(url, { signal, headers });

        if (!response.ok) {
          controller.error(new Error(`HTTP ${response.status}: ${response.statusText}`));
          return;
        }

        if (!response.body) {
          controller.error(new Error("Response body is null"));
          return;
        }

        const reader = response.body.getReader();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (signal.aborted) break;
            controller.enqueue(value);
          }
        } finally {
          // Leaving the loop early (abort/throw) otherwise keeps the body locked
          // and its socket held until GC.
          await reader.cancel().catch(() => {});
        }

        controller.close();
      } catch (err) {
        if (signal.aborted) return; // Expected stop
        controller.error(err instanceof Error ? err : new Error(String(err)));
      } finally {
        // `stop()` aborts mid-fetch and returns through the `signal.aborted`
        // branch above, so clearing the timer on the individual exit paths
        // misses the one path stop() is built to take.
        clearTimeout(timeoutId);
      }
    },

    cancel() {
      controller.abort();
    },
  });

  return {
    stream,
    stop: () => controller.abort(),
  };
}
