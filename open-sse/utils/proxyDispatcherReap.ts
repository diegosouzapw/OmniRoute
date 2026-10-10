import {
  clearDispatcherCache,
  evictDispatcherPool,
  type DispatcherPoolScope,
} from "./proxyDispatcherCache.ts";

/**
 * Minimum delay between two reaps of a bounded pool. Under a real outage
 * every request fails, so reaping on each failure would rebuild the pool on
 * every request; the window keeps one reap per interval instead. Well above
 * the retry backoff (10 ms) and the keep-alive timeout (4 s), so the reap
 * stays observable in tests and out of the hot path.
 */
export const REAP_MIN_INTERVAL_MS = 30_000;

const lastReapByScope = new Map<DispatcherPoolScope, number>();

/** Test seam: drop the stored reap timestamps between tests. */
export function __resetDispatcherReapForTest(): void {
  lastReapByScope.clear();
}

/** Test seam: how many reap timestamps are stored (always at most 2). */
export function __dispatcherReapSizeForTest(): number {
  return lastReapByScope.size;
}

function reapBounded(scope: DispatcherPoolScope, now: number): void {
  const last = lastReapByScope.get(scope);
  if (last !== undefined && now - last < REAP_MIN_INTERVAL_MS) return;
  lastReapByScope.set(scope, now);
  evictDispatcherPool(scope);
}

/**
 * Evict the dispatcher pool named by hostname after an unreachable error, so
 * the next request rebuilds it with fresh sockets. Local hostnames reap on
 * every failure; other hostnames reap at most once per window. An empty
 * hostname cannot be classified, so both pools reap instead.
 */
export function maybeReapDispatcherPool(
  hostname: string | null | undefined,
  isLocal: boolean,
  now: number = Date.now()
): void {
  if (!hostname) {
    clearDispatcherCache();
    lastReapByScope.set("local", now);
    lastReapByScope.set("cloud", now);
    return;
  }
  if (isLocal) {
    evictDispatcherPool("local");
    return;
  }
  reapBounded("cloud", now);
}
