/**
 * Pure, dependency-free helper for the auto-refresh scheduler.
 *
 * Extracted from `subscriptionService.startSubscriptionScheduler` so the
 * "is this subscription due for a refresh?" rule is unit-testable without the
 * full Next.js / better-sqlite3 stack.
 */

export interface DueCheckInput {
  enabled: boolean;
  lastFetchedAt: string | null;
  updateIntervalMinutes: number;
}

/**
 * Whether `sub` should be auto-refreshed at time `now` (epoch milliseconds).
 *
 * Rules:
 *  - Disabled subscriptions are never due.
 *  - A subscription that has never been fetched (or has an unparseable
 *    `lastFetchedAt`) is immediately due.
 *  - Otherwise it is due once the elapsed time since the last fetch is at
 *    least `updateIntervalMinutes` (clamped to >= 0).
 */
export function isSubscriptionDue(sub: DueCheckInput, now: number = Date.now()): boolean {
  if (!sub.enabled) return false;
  const last = sub.lastFetchedAt ? Date.parse(sub.lastFetchedAt) : NaN;
  if (!Number.isFinite(last)) return true;
  const intervalMs = Math.max(0, sub.updateIntervalMinutes) * 60_000;
  return now - last >= intervalMs;
}
