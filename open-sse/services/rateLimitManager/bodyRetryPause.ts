/**
 * rateLimitManager/bodyRetryPause — what a body-stated retry does to the queue.
 *
 * A 429 body can name its own wait (Gemini `RetryInfo.retryDelay`, "retry after
 * Ns" text). A wait the request queue can sit out is pacing, and the limiter
 * pauses for it. A wait longer than the queue budget is not: Gemini answers an
 * exhausted daily quota with `retryDelay: "86399s"`, and pausing the limiter for
 * that turned every request on the key into a full `maxWaitMs` queue wait ending
 * in a local 503, while nothing told the combo to stop picking the key.
 *
 * When the wait comes from Google's structured `RetryInfo` (an authoritative
 * hint, the `google_rpc_retry_info` provenance that may bypass the lockout
 * `maxCooldownMs` cap) and the key's limiter is already scoped to the model, it
 * becomes a model lockout on the connection instead: the scope the pause would
 * have had (narrower on Antigravity, which limits per quota family but, like its
 * other quota locks, locks the exact model), but visible, cleared by the
 * resilience reset, and honoured by account selection (and by the combo
 * pre-dispatch gate for targets pinned to the connection). Those check the name
 * the caller asked for, so when an alias resolved it to that model the requested
 * name is locked too, exactly: through the quota-family keys an alias that
 * crosses a family (antigravity) or scope (codex) would lock its own.
 * Prose hints, untyped fields and connection-wide limiters keep the pause.
 *
 * A pause the limiter does take is remembered per limiter instance, so a caller
 * whose remaining queue time ends before the pause does fails at once instead of
 * waiting that time out. Only a pause set on a limiter built for it is recorded,
 * from a time taken before the build: Bottleneck starts the refresh clock when
 * the limiter is constructed, so the recorded end never runs past the real
 * refill. An older limiter's clock may refill sooner, and an overstated pause
 * would turn away a request the queue could still serve. Any later change to the
 * reservoir or its refresh schedule forgets the record.
 *
 * @module services/rateLimitManager/bodyRetryPause
 */

import { lockExactModel, lockModel } from "../accountFallback.ts";
import { isAntigravityQuotaProvider } from "../antigravityQuotaFamily.ts";
import { retryInfoDetailsMs } from "../retryAfterJson.ts";
import { LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE, markLocalRateLimitError } from "./errors";
import { logRateLimit } from "./log";

const pausedUntil = new WeakMap<object, number>();

export interface BodyRetry {
  provider: string;
  connectionId: string;
  /** The model when the key's limiter is scoped to it; null for a connection-wide limiter. */
  scopedModel: string | null | undefined;
  /** The model name the caller asked for, before alias resolution. */
  requestedModel?: string | null;
  status: number;
  reason: string;
}

/**
 * The wait a body states in a typed Google `RetryInfo` detail (capped at 24h),
 * read exactly as `parseDetailedRetryHintFromJsonBody` reads its
 * `google_rpc_retry_info` provenance; null when there is none.
 */
export function retryInfoDelayMs(responseBody: unknown): number | null {
  let body: unknown = responseBody;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return null;
    }
  }
  const root = (body ?? {}) as { error?: { details?: unknown }; details?: unknown };
  return retryInfoDetailsMs(root.error?.details ?? root.details);
}

/**
 * Lock the model on the connection (and, exactly, the requested name when it
 * differs) for the `RetryInfo` wait when a 429 states one longer than the
 * queue budget, and return true. Returns false when the wait stays a limiter
 * pause: it fits the budget, it did not come from a typed `RetryInfo`, the
 * limiter is connection-wide, or the queue has no wait deadline (`maxWaitMs` 0,
 * #12902).
 */
export function lockModelForLongBodyRetry(
  retry: BodyRetry,
  queueBudgetMs: number,
  responseBody: unknown
): boolean {
  const { provider, connectionId, scopedModel, requestedModel, status, reason } = retry;
  if (status !== 429 || !scopedModel || queueBudgetMs <= 0) return false;
  const lockMs = retryInfoDelayMs(responseBody);
  if (lockMs === null || lockMs <= queueBudgetMs) return false;
  // Antigravity's limiter is per quota family, but its quota locks are exact (accountFallback.ts).
  const lockScoped = isAntigravityQuotaProvider(provider) ? lockExactModel : lockModel;
  lockScoped(provider, connectionId, scopedModel, reason, lockMs);
  const alias = requestedModel && requestedModel !== scopedModel ? requestedModel : null;
  if (alias) lockExactModel(provider, connectionId, alias, reason, lockMs);
  logRateLimit(
    `🔒 [RATE-LIMIT] ${provider}:${connectionId.slice(0, 8)} — RetryInfo retry ${Math.ceil(lockMs / 1000)}s (${reason}) exceeds the ${queueBudgetMs}ms queue budget; locking ${scopedModel}${alias ? ` (requested as ${alias})` : ""} on this connection instead of pausing its queue`
  );
  return true;
}

/** Record that `limiter`'s reservoir stays empty until `untilMs`. */
export function rememberLimiterPause(limiter: object, untilMs: number): void {
  pausedUntil.set(limiter, untilMs);
}

/** Forget the recorded pause when `updates` touch the reservoir or its refresh schedule. */
export function noteLimiterUpdate(limiter: object, updates: object): void {
  if (Object.keys(updates).some((key) => key.startsWith("reservoir"))) {
    pausedUntil.delete(limiter);
  }
}

/**
 * Returns a typed `RATE_LIMIT_QUEUE_TIMEOUT` error when the recorded pause runs
 * past the caller's remaining queue time `budgetMs` (queueing could only end in
 * that same timeout), or null when no pause is recorded or it ends in time.
 */
export function checkLimiterPause(
  limiter: object,
  budgetMs: number,
  identity: string,
  now: number = Date.now()
): Error | null {
  const until = pausedUntil.get(limiter);
  if (until === undefined || until - now <= budgetMs) return null;
  return markLocalRateLimitError(
    new Error(
      `Request not queued: the local rate-limit pause for ${identity} lasts ${until - now}ms more, ` +
        `past the ${budgetMs}ms left in its queue budget — this is OmniRoute's request queue ` +
        `honouring an upstream retry-after, not a new upstream rejection.`
    ),
    LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE
  );
}
