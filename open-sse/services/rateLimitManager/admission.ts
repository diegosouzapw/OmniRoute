/**
 * rateLimitManager/admission — queue-depth admission check (pure).
 *
 * `maxQueueDepth` (RequestQueueSettings, issue #6593) is an opt-in admission
 * cap on the local rate-limit queue: when set (>0), a request that would be
 * queued behind `maxQueueDepth` already-queued jobs is fast-rejected before
 * it ever reaches Bottleneck's `schedule()`, instead of growing the queue
 * unboundedly. Default `0` = disabled, preserving today's behavior exactly.
 *
 * Extracted as a pure function (no Bottleneck/limiter dependency) so it is
 * unit-testable without spinning up a real limiter.
 *
 * @module services/rateLimitManager/admission
 */

export interface QueueFullError extends Error {
  code: "RATE_LIMIT_QUEUE_FULL";
  status: 429;
}

/**
 * Returns a typed `RATE_LIMIT_QUEUE_FULL` error when `queuedCount` is at or
 * above `maxQueueDepth`, or `null` when admission should proceed (cap
 * disabled, i.e. `maxQueueDepth <= 0`, or the queue has room).
 */
export function checkQueueAdmission(
  queuedCount: number,
  maxQueueDepth: number,
  identity: string
): QueueFullError | null {
  if (!maxQueueDepth || maxQueueDepth <= 0) return null;
  if (queuedCount < maxQueueDepth) return null;

  const err = new Error(
    `Request rejected: the local rate-limit queue for ${identity} already holds ${queuedCount} ` +
      `queued request(s), at or above the configured admission cap maxQueueDepth (${maxQueueDepth}) ` +
      `— this is OmniRoute's request queue (resilienceSettings.requestQueue.maxQueueDepth), not an ` +
      `upstream rejection. Raise it in Settings → Resilience if this is expected burst traffic.`
  ) as Error & { code?: string; status?: number };
  err.code = "RATE_LIMIT_QUEUE_FULL";
  // chatCore's generic catch-all fallback (open-sse/handlers/chatCore.ts) maps a
  // status-less error to HTTP 502 — which also risks tripping the whole-provider
  // circuit breaker (PROVIDER_BREAKER_FAILURE_STATUSES includes 502) for what is a
  // purely local, in-process admission decision. Tag 429 explicitly so it is read
  // via `error.status` before that fallback kicks in.
  err.status = 429;
  return err as QueueFullError;
}
