/**
 * opencodeTransientFailure.ts — retriable-upstream predicate for the opencode
 * executor loop.
 *
 * Leaf module: internal imports from the same executors layer only
 * (isEmptyUpstreamRejection, discardResponseBody — no registry, no DB). 5xx
 * short-circuits on status alone; the 400 arm delegates to the existing
 * empty-rejection classifier.
 */

import { isEmptyUpstreamRejection } from "./accountRotation.ts";
import { discardResponseBody } from "./opencodeResponseBody.ts";

export function isRetriableUpstreamFailure(status: number, bodyText?: string): boolean {
  if (status >= 500 && status < 600) return true;
  if (status !== 400) return false;
  if (typeof bodyText !== "string" || bodyText === "") return false;
  return isEmptyUpstreamRejection(status, bodyText);
}

// ── Failover pause after repeated transient failures (#13615, opt-in) ──────
// Gated by OPENCODE_TRANSIENT_FAILOVER_BACKOFF (default off). The first retry
// after a transient failure stays immediate (a distinct egress already guards
// a one-off flap); from the second consecutive transient failure on, the loop
// waits before the next account so a briefly overloaded upstream can recover.

/** Consecutive transient failures before the first pause. */
export const TRANSIENT_PAUSE_STREAK = 2;
/** First pause, same magnitude as BaseExecutor.WAF_RETRY_CONFIG.delayMs. */
export const TRANSIENT_RETRY_BASE_DELAY_MS = 1500;
/** Upper bound of a single pause. */
export const TRANSIENT_RETRY_MAX_DELAY_MS = 6000;
/** Upper bound of all pauses in one request. */
export const TRANSIENT_RETRY_TOTAL_BUDGET_MS = 10_000;

/**
 * Pause before the next dispatch after `consecutiveFailures` transient failures
 * in a row, given `pausedMs` already spent this request. 0 means dispatch now.
 * Doubles per further failure (1.5s, 3s, 6s, 6s…) and never exceeds the
 * per-pause cap or what is left of the per-request budget.
 */
export function transientRetryDelayMs(consecutiveFailures: number, pausedMs = 0): number {
  if (!Number.isFinite(consecutiveFailures) || consecutiveFailures < TRANSIENT_PAUSE_STREAK) {
    return 0;
  }
  const step = Math.min(consecutiveFailures - TRANSIENT_PAUSE_STREAK, 16);
  const delay = Math.min(TRANSIENT_RETRY_BASE_DELAY_MS * 2 ** step, TRANSIENT_RETRY_MAX_DELAY_MS);
  const left = TRANSIENT_RETRY_TOTAL_BUDGET_MS - Math.max(0, pausedMs);
  return Math.max(0, Math.min(delay, left));
}

/**
 * Sleep that resolves `false` as soon as `signal` aborts (or immediately when it
 * already has), `true` once `ms` elapsed. The listener and timer are always
 * released.
 */
export function sleepAbortable(ms: number, signal?: AbortSignal | null): Promise<boolean> {
  if (signal?.aborted) return Promise.resolve(false);
  return new Promise((resolve) => {
    const onAbort = () => {
      clearTimeout(timer);
      resolve(false);
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve(true);
    }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * Cancel a failed response's body before a pause and return a body-less copy
 * that keeps its status, status text and headers (what the exhaustion path may
 * still surface once the loop ends).
 */
export function releaseResponseBody(response: Response): Response {
  discardResponseBody(response);
  return new Response(null, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
