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
  url?: string;
}

/** A feedless subscription has an empty URL: selector-only, never fetched. */
export function isFeedlessSubscription(url: unknown): boolean {
  return typeof url === "string" && url.trim() === "";
}

export interface FeedlessSyncInput {
  url: string;
  status: "ok" | "error" | "empty";
  error: string | null;
}

export interface FeedlessSyncResult {
  nodes: number;
  needsCore: number;
  boundProxies: number;
  status: "ok" | "error" | "empty";
  error: string | null;
  applied: boolean;
}

/** Early return for a feedless subscription: no fetch, no write, status kept. */
export function feedlessSyncResult(sub: FeedlessSyncInput): FeedlessSyncResult | null {
  if (!isFeedlessSubscription(sub.url)) return null;
  return {
    nodes: 0,
    needsCore: 0,
    boundProxies: 0,
    status: sub.status,
    error: sub.error,
    applied: false,
  };
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
  if (isFeedlessSubscription(sub.url)) return false;
  if (!sub.enabled) return false;
  const last = sub.lastFetchedAt ? Date.parse(sub.lastFetchedAt) : NaN;
  if (!Number.isFinite(last)) return true;
  const intervalMs = Math.max(0, sub.updateIntervalMinutes) * 60_000;
  return now - last >= intervalMs;
}
