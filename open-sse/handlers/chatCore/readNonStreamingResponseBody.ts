/**
 * Drain an upstream Response body into a string.
 *
 * Two modes:
 *   1. Non-streaming (default): just await response.text() with a
 *      configurable wall-clock deadline (FETCH_BODY_TIMEOUT_MS).
 *   2. Streaming SSE / ndjson: drain chunk-by-chunk, decode each
 *      chunk, and stop as soon as a terminal SSE event is observed
 *      (so the non-streaming bridge does not block on a long-lived
 *      upstream). The terminal detection is delegated to
 *      appendNonStreamingSseTerminalSignal.
 *
 * In both modes the body is bounded by FETCH_BODY_TIMEOUT_MS; on
 * timeout we throw via createBodyTimeoutError(FETCH_BODY_TIMEOUT_MS)
 * so the upstream caller can map the failure to a clean 504.
 *
 * The reader is always released in the finally block, even on
 * exception paths, so a hung upstream cannot leak handles.
 *
 * Lifted verbatim from chatCore.ts so the bifrost relay and the
 * upcoming imageGen subcommand can re-use the exact same drain
 * semantics.
 *
 * The leaf imports its sibling helpers (withBodyTimeout,
 * readStreamChunkWithTimeout, createBodyTimeoutError,
 * appendNonStreamingSseTerminalSignal) and the
 * FETCH_BODY_TIMEOUT_MS constant from the same chatCore/ scope that
 * defined the original inline function. This matches the pattern
 * used by every other chatCore leaf extraction to date.
 */
import { withBodyTimeout } from "./upstreamTimeouts.ts";
import { FETCH_BODY_TIMEOUT_MS } from "../../constants/upstreamFetch.ts";
import { readStreamChunkWithTimeout, createBodyTimeoutError } from "./upstreamTimeouts.ts";
import {
  appendNonStreamingSseTerminalSignal,
  type NonStreamingSseTerminalState,
} from "./nonStreamingSse.ts";

export async function readNonStreamingResponseBody(
  response: Response,
  contentType: string,
  upstreamStream: boolean
): Promise<string> {
  if (
    !upstreamStream ||
    !response.body ||
    (!contentType.includes("text/event-stream") && !contentType.includes("application/x-ndjson"))
  ) {
    return withBodyTimeout<string>(response.text());
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const terminalState: NonStreamingSseTerminalState = {
    currentEvent: "",
    pendingLine: "",
  };
  let rawBody = "";
  const deadline = FETCH_BODY_TIMEOUT_MS > 0 ? Date.now() + FETCH_BODY_TIMEOUT_MS : 0;

  try {
    while (true) {
      const timeoutMs = deadline > 0 ? deadline - Date.now() : 0;
      if (deadline > 0 && timeoutMs <= 0) {
        throw createBodyTimeoutError(FETCH_BODY_TIMEOUT_MS);
      }

      const { done, value } = await readStreamChunkWithTimeout(reader, timeoutMs);
      if (done) break;
      if (!value) continue;

      const decodedChunk = decoder.decode(value, { stream: true });
      rawBody += decodedChunk;
      if (appendNonStreamingSseTerminalSignal(terminalState, decodedChunk)) {
        await reader.cancel("non-streaming bridge consumed terminal SSE event").catch(() => {});
        break;
      }
    }
  } catch (error) {
    await reader.cancel(error).catch(() => {});
    throw error;
  } finally {
    rawBody += decoder.decode();
    reader.releaseLock();
  }

  return rawBody;
}

/**
 * Mutable state for SSE/ndjson terminal-event detection. The leaf
 * owns the shape because the upstream-stream chunk decoder is the
 * sole writer; exposing the shape lets callers (e.g. the bifrost
 * relay's replay buffer) pre-allocate one of these per stream and
 * pass it across iterations.
 */
export interface NonStreamingSseTerminalState {
  currentEvent: string;
  pendingLine: string;
}
