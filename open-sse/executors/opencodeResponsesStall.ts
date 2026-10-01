/**
 * opencodeResponsesStall.ts — opt-in first-byte stall guard for streamed
 * Responses replies in the opencode executor (#13484).
 *
 * A streamed Responses reply opens with `response.created` before any
 * generation, so a 2xx Responses stream that stays silent past the window is
 * stalled, not thinking. Chat Completions streams are left alone: gateways may
 * legitimately hold them until the answer is ready.
 *
 * Worst case on the stall arm: at most 2 first-byte waits per request (one
 * rotation), each bounded by the window; the guarded final direct call can add
 * one more wait without a rotation, so at most 3 waits mixed, all window-bounded.
 *
 * Gated by OPENCODE_RESPONSES_STALL_ROTATION (default off). With the flag off
 * the window is 0 and every guard call hands back the very same result object,
 * so the stream readiness timeout stays the only bound, as before.
 */

import { isOpencodeResponsesStallRotationEnabled } from "@/shared/utils/featureFlags";
import {
  DEFAULT_STREAM_READINESS_TIMEOUT_MS,
  getResponsesFirstByteTimeoutMs,
  getUpstreamTimeoutConfig,
} from "@/shared/utils/runtimeTimeouts";
import { guardResponsesStreamFirstByte } from "../utils/firstByteWatchdog.ts";

export { isResponsesFirstByteTimeout } from "../utils/firstByteWatchdog.ts";

export type StallGuardSetup = {
  windowMs: number;
  capped: boolean;
};

/**
 * Reads the readiness bound, resolves the window, and reports whether the
 * configured value was capped — so the call site stays a one-line wiring hunk
 * on the frozen executor file. `readBound` / `readConfigured` default to the
 * live getters; tests inject fakes. The cap notice is logged here (never in
 * the pure `resolve` below) through the optional `log` sink, in generic
 * English with no internal IDs beyond the caller's own prefix.
 */
export function setupStallGuard(
  stream: boolean | undefined,
  requestFormat: string | null,
  log?: { warn?: (tag: string, message: string) => void } | null,
  cid = "",
  readBound: () => number = () => getUpstreamTimeoutConfig().streamReadinessTimeoutMs,
  readConfigured: () => number = getResponsesFirstByteTimeoutMs
): StallGuardSetup {
  const capMs = readBound();
  const windowMs = resolveResponsesStallWindowMs(stream, requestFormat, capMs);
  const capped = capMs > 0 && windowMs > 0 && readConfigured() > capMs;
  if (capped) log?.warn?.("OPENCODE", `${cid}stalled stream first-byte wait capped`);
  return { windowMs, capped };
}

/**
 * First-byte window (ms) for this request, or 0 when the guard does not apply.
 *
 * The configured window is capped by the stream readiness bound (`capMs`).
 * Equal to the bound is enough — no need to stay strictly below it: the guard
 * consumes the first byte BEFORE the executor returns, and the readiness check
 * in chatCore only starts on the response the executor hands back (which then
 * replays that byte at once), so the two waits never race. A guard firing at
 * exactly the bound costs the same wall time the readiness check would have,
 * but buys the rotation. A non-positive bound means readiness is disabled
 * (`STREAM_READINESS_TIMEOUT_MS=0`): there is no ceiling, and the configured
 * window is used as is, since the guard is then the only first-byte bound left.
 */
export function resolveResponsesStallWindowMs(
  stream: boolean | undefined,
  requestFormat: string | null,
  capMs?: number
): number {
  if (!stream || requestFormat !== "openai-responses") return 0;
  if (!isOpencodeResponsesStallRotationEnabled()) return 0;
  const configured = getResponsesFirstByteTimeoutMs();
  if (configured === 0) return 0;
  const cap = capMs ?? DEFAULT_STREAM_READINESS_TIMEOUT_MS;
  if (!(cap > 0)) return configured;
  return configured > cap ? cap : configured;
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
