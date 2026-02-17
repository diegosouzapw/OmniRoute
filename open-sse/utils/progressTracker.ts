/**
 * Progress Tracker — Phase 9.3
 *
 * Emits SSE `event: progress` events during long streaming responses.
 * Opt-in via X-OmniRoute-Progress: true header.
 *
 * Progress events contain:
 *   { tokens_generated, elapsed_ms }
 *
 * @module utils/progressTracker
 */

const DEFAULT_INTERVAL_MS = 2000;

/**
 * Create a progress emitter for a streaming response.
 * Returns a TransformStream that injects progress events periodically.
 *
 * @param {object} options
 * @param {number} [options.intervalMs=2000] - Interval between events
 * @param {AbortSignal} [options.signal] - Abort signal for cancellation
 * @returns {TransformStream}
 */
export function createProgressTransform({ intervalMs = DEFAULT_INTERVAL_MS, signal }: { intervalMs?: number; signal?: AbortSignal } = {}) {
  let tokenCount = 0;
  let startTime = Date.now();
  let intervalId;
  let writer;

  const encoder = new TextEncoder();

  return new TransformStream({
    start(controller) {
      writer = controller;
      startTime = Date.now();

      intervalId = setInterval(() => {
        if (signal?.aborted) {
          clearInterval(intervalId);
          return;
        }
        const progressEvent = `event: progress\ndata: ${JSON.stringify({
          tokens_generated: tokenCount,
          elapsed_ms: Date.now() - startTime,
        })}\n\n`;
        try {
          controller.enqueue(encoder.encode(progressEvent));
        } catch {
          // Stream closed
          clearInterval(intervalId);
        }
      }, intervalMs);

      // Clean up on abort
      signal?.addEventListener(
        "abort",
        () => {
          clearInterval(intervalId);
        },
        { once: true }
      );
    },

    transform(chunk, controller) {
      // Count token events in the chunk
      const text = typeof chunk === "string" ? chunk : new TextDecoder().decode(chunk);
      // Count data lines (each is roughly one token event)
      const dataLines = text.split("\n").filter((l) => l.startsWith("data: "));
      tokenCount += dataLines.length;
      controller.enqueue(chunk);
    },

    flush() {
      clearInterval(intervalId);
      // Final progress event
      if (writer) {
        try {
          const finalEvent = `event: progress\ndata: ${JSON.stringify({
            tokens_generated: tokenCount,
            elapsed_ms: Date.now() - startTime,
            done: true,
          })}\n\n`;
          writer.enqueue(encoder.encode(finalEvent));
        } catch {
          // Stream already closed
        }
      }
    },
  });
}

/**
 * Check if client opted into progress tracking.
 * @param {Headers|object} headers
 * @returns {boolean}
 */
export function wantsProgress(headers) {
  if (!headers) return false;
  const get = typeof headers.get === "function" ? (k) => headers.get(k) : (k) => headers[k];
  return get("x-omniroute-progress") === "true";
}
