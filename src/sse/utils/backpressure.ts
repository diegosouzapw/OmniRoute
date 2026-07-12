import { getActiveSessionCount } from "@omniroute/open-sse/services/sessionManager.ts";

/**
 * Connection back-pressure for SSE / streaming endpoints.
 *
 * Caps in-flight requests to prevent memory exhaustion.  Reads the live
 * session count from `sessionManager` — the same source the health endpoint
 * uses to report `activeConnections`.
 *
 * Set `OMNI_MAX_CONCURRENT_CONNECTIONS` to a positive integer to enable.
 * Default is 0 (disabled) so existing deployments are unaffected until
 * an operator explicitly opts in.
 */

type CapacityOk = { shouldReject: false };
type CapacityExceeded = { shouldReject: true; response: Response };
export type CapacityResult = CapacityOk | CapacityExceeded;

/**
 * Pure capacity evaluator — given an active count and a cap, returns the
 * appropriate result.  Cap ≤ 0 means disabled (never reject).
 *
 * Exported for unit testing without mocking any module boundaries.
 */
export function evalCapacity(active: number, cap: number): CapacityResult {
  if (cap <= 0 || active < cap) {
    return { shouldReject: false };
  }
  const retryAfter = Math.max(1, Math.ceil((active / cap) * 30));
  return {
    shouldReject: true,
    response: new Response(
      JSON.stringify({
        error: {
          message: `Server busy — ${active} active connections (limit ${cap}). Retry after ${retryAfter}s.`,
          type: "rate_limit",
          retry_after: retryAfter,
        },
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(cap),
          "X-RateLimit-Remaining": "0",
        },
      }
    ),
  };
}

/** Read cap from env on every call so tests can mutate process.env freely. */
function readCap(): number {
  const raw = parseInt(process.env.OMNI_MAX_CONCURRENT_CONNECTIONS ?? "0", 10);
  return Number.isFinite(raw) && raw > 0 ? raw : 0;
}

/**
 * Check whether the server is over its configured connection cap.
 *
 * Returns `{ shouldReject: true, response }` when at limit, or
 * `{ shouldReject: false }` when a slot is free (or the cap is disabled).
 */
export function checkConnectionCapacity(): CapacityResult {
  return evalCapacity(getActiveSessionCount(), readCap());
}
