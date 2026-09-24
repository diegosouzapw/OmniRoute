/**
 * opencodeResponsesStall.ts — opt-in first-byte stall guard for streamed
 * Responses replies in the opencode executor (#13484).
 *
 * A streamed Responses reply opens with `response.created` before any
 * generation, so a 2xx Responses stream that stays silent past the window is
 * stalled, not thinking. Chat Completions streams are left alone: gateways may
 * legitimately hold them until the answer is ready.
 *
 * Gated by OPENCODE_RESPONSES_STALL_ROTATION (default off). With the flag off
 * the window is 0 and every guard call hands back the very same result object,
 * so the stream readiness timeout stays the only bound, as before.
 */

import { isOpencodeResponsesStallRotationEnabled } from "@/shared/utils/featureFlags";
import { getResponsesFirstByteTimeoutMs } from "@/shared/utils/runtimeTimeouts";
import { guardResponsesStreamFirstByte } from "../utils/firstByteWatchdog.ts";

export { isResponsesFirstByteTimeout } from "../utils/firstByteWatchdog.ts";

/** First-byte window (ms) for this request, or 0 when the guard does not apply. */
export function resolveResponsesStallWindowMs(
  stream: boolean | undefined,
  requestFormat: string | null
): number {
  if (!stream || requestFormat !== "openai-responses") return 0;
  if (!isOpencodeResponsesStallRotationEnabled()) return 0;
  return getResponsesFirstByteTimeoutMs();
}

/**
 * Returns `result` itself when `windowMs` is 0 or it carries no 2xx body;
 * otherwise resolves once the first body byte arrives, or throws
 * RESPONSES_FIRST_BYTE_TIMEOUT (or the abort reason when `signal` fires).
 */
export async function guardResponsesStall<T>(
  result: T,
  windowMs: number,
  signal?: AbortSignal | null
): Promise<T> {
  if (windowMs <= 0 || !result || typeof result !== "object" || !("response" in result)) {
    return result;
  }
  const response = (result as { response: Response }).response;
  if (!response?.ok || !response.body) return result;
  const guarded = await guardResponsesStreamFirstByte(response, windowMs, signal);
  return { ...result, response: guarded };
}
