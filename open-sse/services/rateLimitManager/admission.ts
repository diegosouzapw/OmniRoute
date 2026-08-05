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

export interface QueueWaitTimeoutError extends Error {
  code: "RATE_LIMIT_QUEUE_TIMEOUT";
  status: 429;
}

function abortError(signal: AbortSignal): Error {
  const reason = signal.reason;
  if (reason instanceof Error) return reason;
  const err = new Error(typeof reason === "string" ? reason : "The operation was aborted");
  err.name = "AbortError";
  if (reason !== undefined) {
    (err as Error & { cause?: unknown }).cause = reason;
  }
  return err;
}

export function createQueueWaitTimeoutError(
  maxWaitMs: number,
  identity: string
): QueueWaitTimeoutError {
  const err = new Error(
    `Request dropped after waiting longer than the local rate-limit queue budget maxWaitMs ` +
      `(${maxWaitMs}ms) for ${identity} — this is OmniRoute's request queue ` +
      `(resilienceSettings.requestQueue.maxWaitMs), not an upstream timeout or provider failure. ` +
      `Raise it in Settings → Resilience only when the expected queueing delay is longer.`
  ) as Error & { code?: string; status?: number };
  err.code = "RATE_LIMIT_QUEUE_TIMEOUT";
  err.status = 429;
  return err as QueueWaitTimeoutError;
}

/**
 * Schedule through a limiter while applying maxWaitMs only to queue admission.
 * Once the job begins executing, its lifetime is governed by the upstream request
 * timeouts and AbortSignal rather than the local queue-wait budget.
 *
 * A timed-out or aborted queued placeholder may remain inside Bottleneck until a
 * slot opens, but it throws before invoking `job`, so delayed upstream work cannot
 * start after the caller has already received a local capacity error.
 */
export async function scheduleWithQueueWaitBudget<T>(
  schedule: (job: () => Promise<T>) => Promise<T>,
  job: () => Promise<T> | T,
  maxWaitMs: number,
  identity: string,
  signal: AbortSignal | null = null
): Promise<T> {
  let admitted = false;
  let cancelledBeforeAdmission: Error | null = null;
  let queueTimer: ReturnType<typeof setTimeout> | null = null;
  let abortListener: (() => void) | undefined;

  const scheduled = schedule(async () => {
    admitted = true;
    if (queueTimer) {
      clearTimeout(queueTimer);
      queueTimer = null;
    }
    if (cancelledBeforeAdmission) throw cancelledBeforeAdmission;
    return await job();
  });

  const contenders: Promise<T>[] = [scheduled];

  if (maxWaitMs > 0) {
    contenders.push(
      new Promise<T>((_, reject) => {
        queueTimer = setTimeout(() => {
          if (admitted) return;
          const err = createQueueWaitTimeoutError(maxWaitMs, identity);
          cancelledBeforeAdmission = err;
          reject(err);
        }, maxWaitMs);
      })
    );
  }

  if (signal) {
    contenders.push(
      new Promise<T>((_, reject) => {
        const onAbort = () => {
          const err = abortError(signal);
          if (!admitted) cancelledBeforeAdmission = err;
          reject(err);
        };
        if (signal.aborted) {
          onAbort();
          return;
        }
        abortListener = onAbort;
        signal.addEventListener("abort", abortListener, { once: true });
      })
    );
  }

  try {
    return await Promise.race(contenders);
  } finally {
    if (queueTimer) clearTimeout(queueTimer);
    if (signal && abortListener) signal.removeEventListener("abort", abortListener);
  }
}
