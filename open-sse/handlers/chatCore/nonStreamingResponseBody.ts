/**
 * chatCore non-streaming response-body reader (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from chatCore: reads an upstream response body to a string. When the upstream is an SSE /
 * NDJSON stream consumed in non-streaming mode, it drains the reader chunk-by-chunk under the body
 * timeout and cancels early once a terminal SSE signal is observed; otherwise it falls back to a
 * timeout-bounded response.text(). Behaviour is byte-identical to the previous module-level function.
 */

import { withBodyTimeout } from "../../utils/stream.ts";
import { FETCH_BODY_TIMEOUT_MS } from "../../config/constants.ts";
import { createBodyTimeoutError, readStreamChunkWithTimeout } from "./upstreamTimeouts.ts";
import {
  appendNonStreamingSseTerminalSignal,
  type NonStreamingSseTerminalState,
} from "./nonStreamingSse.ts";

/**
 * Thrown when a non-streaming upstream body exceeds the hard cap. Buffering an unbounded
 * SSE/NDJSON or JSON response in non-streaming mode was an OOM path (`rawBody += chunk`
 * with no ceiling): a single multi-hundred-MB upstream response could fill the V8 heap.
 * Callers treat this like any other upstream error rather than crashing the process.
 */
export class NonStreamingResponseTooLargeError extends Error {
  readonly bytesSeen: number;
  readonly maxBytes: number;
  constructor(bytesSeen: number, maxBytes: number) {
    super(
      `Upstream non-streaming response exceeded the ${maxBytes}-byte cap (saw at least ${bytesSeen} bytes)`
    );
    this.name = "NonStreamingResponseTooLargeError";
    this.bytesSeen = bytesSeen;
    this.maxBytes = maxBytes;
  }
}

const DEFAULT_MAX_NONSTREAMING_RESPONSE_BYTES = 64 * 1024 * 1024; // 64 MB

/**
 * Hard cap for a non-streaming response buffered fully into memory. Generous by default so
 * legitimate large completions pass; bounds only pathological/runaway upstream bodies.
 * Override with `OMNIROUTE_MAX_NONSTREAMING_RESPONSE_BYTES`.
 */
export const MAX_NONSTREAMING_RESPONSE_BYTES = (() => {
  const parsed = Number.parseInt(String(process.env.OMNIROUTE_MAX_NONSTREAMING_RESPONSE_BYTES), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MAX_NONSTREAMING_RESPONSE_BYTES;
})();

export async function readNonStreamingResponseBody(
  response: Response,
  contentType: string,
  upstreamStream: boolean,
  maxBytes: number = MAX_NONSTREAMING_RESPONSE_BYTES
): Promise<string> {
  if (
    !upstreamStream ||
    !response.body ||
    (!contentType.includes("text/event-stream") && !contentType.includes("application/x-ndjson"))
  ) {
    // Reject before buffering when the upstream declares an over-cap Content-Length.
    const declared = Number.parseInt(response.headers.get("content-length") ?? "", 10);
    if (Number.isFinite(declared) && declared > maxBytes) {
      throw new NonStreamingResponseTooLargeError(declared, maxBytes);
    }
    return withBodyTimeout<string>(response.text());
  }

  return drainNonStreamingSseBody(response.body, maxBytes);
}

/**
 * Drain an SSE/NDJSON stream consumed in non-streaming mode into a single string, bounded
 * by `maxBytes` (cancels the upstream and throws {@link NonStreamingResponseTooLargeError}
 * past the cap) and by the body timeout, cancelling early on a terminal SSE signal.
 */
type NonStreamingChunk = { kind: "done" } | { kind: "skip" } | { kind: "chunk"; value: Uint8Array };

function cancelNonStreamingReader(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  reason: unknown
): void {
  try {
    void reader.cancel(reason).catch(() => {});
  } catch {
    // The caller is already unwinding or returning a complete terminal response.
  }
}

/** Read the next chunk under the body-timeout deadline, normalizing end/empty cases. */
async function readNextNonStreamingChunk(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  deadline: number
): Promise<NonStreamingChunk> {
  const timeoutMs = deadline > 0 ? deadline - Date.now() : 0;
  if (deadline > 0 && timeoutMs <= 0) {
    throw createBodyTimeoutError(FETCH_BODY_TIMEOUT_MS);
  }
  const { done, value } = await readStreamChunkWithTimeout(reader, timeoutMs);
  if (done) return { kind: "done" };
  if (!value) return { kind: "skip" };
  return { kind: "chunk", value };
}

async function drainNonStreamingSseBody(
  body: ReadableStream<Uint8Array>,
  maxBytes: number
): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  const terminalState: NonStreamingSseTerminalState = {
    currentEvent: "",
    pendingLine: "",
  };
  let rawBody = "";
  let bytesSeen = 0;
  const deadline = FETCH_BODY_TIMEOUT_MS > 0 ? Date.now() + FETCH_BODY_TIMEOUT_MS : 0;
  let cancelRequested = false;
  const requestCancel = (reason: unknown) => {
    if (cancelRequested) return;
    cancelRequested = true;
    cancelNonStreamingReader(reader, reason);
  };

  try {
    while (true) {
      const next = await readNextNonStreamingChunk(reader, deadline);
      if (next.kind === "done") break;
      if (next.kind === "skip") continue;

      // Bound the buffer: cancel the upstream and fail fast past the cap rather than
      // growing `rawBody` until the V8 heap is exhausted.
      bytesSeen += next.value.byteLength;
      if (bytesSeen > maxBytes) {
        requestCancel("non-streaming response exceeded byte cap");
        throw new NonStreamingResponseTooLargeError(bytesSeen, maxBytes);
      }

      const decodedChunk = decoder.decode(next.value, { stream: true });
      rawBody += decodedChunk;
      if (appendNonStreamingSseTerminalSignal(terminalState, decodedChunk)) {
        requestCancel("non-streaming bridge consumed terminal SSE event");
        break;
      }
    }
  } catch (error) {
    requestCancel(error);
    throw error;
  } finally {
    rawBody += decoder.decode();
    reader.releaseLock();
  }

  return rawBody;
}
