/**
 * chatCore stream finalize wrapper (Quality Gate v2 / Fase 9 — chatCore god-file decomposition,
 * #3501).
 *
 * Extracted from chatCore: wraps a ReadableStream so a `finalize` callback runs exactly once when the
 * stream is fully drained, errors, or is cancelled. Side-effect-free other than the wrapped stream's
 * own lifecycle; behaviour is byte-identical to the previous module-level function.
 */

export function wrapReadableStreamWithFinalize<T>(
  readable: ReadableStream<T>,
  finalize: () => void
): ReadableStream<T> {
  const reader = readable.getReader();
  let finalized = false;

  const runFinalize = () => {
    if (finalized) return;
    finalized = true;
    finalize();
  };

  return new ReadableStream<T>({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          runFinalize();
          controller.close();
          return;
        }
        controller.enqueue(value);
      } catch (error) {
        runFinalize();
        controller.error(error);
      }
    },

    async cancel(reason) {
      runFinalize();
      try {
        await reader.cancel(reason);
      } catch (error) {
        // Ignored
      }
    },
  });
}
