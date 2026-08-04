/**
 * Per-read timeout helpers for the Codex SSE peek/passthrough body reads (#8020).
 *
 * `peekCodexSseTransientError()` in ../codex.ts reads the first bytes of a Codex
 * SSE response body BEFORE the response reaches chatCore's normal readiness/idle
 * pipeline, so a 200 text/event-stream whose body never emits a byte bypassed
 * FETCH_BODY_TIMEOUT_MS / STREAM_IDLE_TIMEOUT_MS entirely and hung on a bare
 * `reader.read()` for ~15 minutes before the platform killed the connection as a
 * generic 502. These helpers wrap every read (the peek loop AND the re-assembled
 * passthrough body's pull()) in `readStreamChunkWithTimeout`, PER READ rather than
 * against a single total-request deadline, so a long-but-alive reasoning stream
 * that keeps emitting chunks never trips the timeout — only a stream that goes
 * silent for `timeoutMs` does.
 */
import { readStreamChunkWithTimeout } from "../../handlers/chatCore/upstreamTimeouts.ts";

function isBodyTimeoutError(err: unknown): boolean {
  return err instanceof Error && err.name === "BodyTimeoutError";
}

async function cancelReaderSafely(reader: ReadableStreamDefaultReader<Uint8Array>): Promise<void> {
  try {
    await reader.cancel();
  } catch {
    // Upstream socket may already be closing; nothing to clean up.
  }
}

/**
 * Reads the next peek-loop chunk under `timeoutMs`. On a `BodyTimeoutError` the
 * upstream reader is cancelled (releasing the socket) and `timedOut: true` is
 * returned instead of throwing, so the caller can short-circuit straight to a
 * bounded error response rather than falling through to an unbounded passthrough.
 */
export async function readCodexPeekChunk(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  timeoutMs: number
): Promise<{ done: boolean; value?: Uint8Array; timedOut: boolean }> {
  try {
    const { done, value } = await readStreamChunkWithTimeout(reader, timeoutMs);
    return { done, value, timedOut: false };
  } catch (err) {
    if (isBodyTimeoutError(err)) {
      await cancelReaderSafely(reader);
      return { done: true, timedOut: true };
    }
    throw err;
  }
}

/**
 * Builds the re-assembled Codex SSE body (peeked prefix chunks + continued drain
 * of the same reader), with every subsequent read bounded by `timeoutMs`. A
 * timeout on the passthrough cancels the upstream reader and errors the stream
 * controller instead of hanging the client connection forever.
 */
export function buildCodexTimeoutSafePassthroughBody(
  chunks: Uint8Array[],
  upstreamReader: ReadableStreamDefaultReader<Uint8Array>,
  timeoutMs: number
): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
    },
    async pull(controller) {
      try {
        const { done, value } = await readStreamChunkWithTimeout(upstreamReader, timeoutMs);
        if (done) {
          controller.close();
          return;
        }
        if (!value) return;
        controller.enqueue(value);
      } catch (err) {
        await cancelReaderSafely(upstreamReader);
        controller.error(err);
      }
    },
    cancel(reason) {
      try {
        upstreamReader.cancel(reason).catch(() => {});
      } catch {
        // noop — upstream socket may already be closing.
      }
    },
  });
}
