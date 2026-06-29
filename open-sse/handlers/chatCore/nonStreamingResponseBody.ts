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
