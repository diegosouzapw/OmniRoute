// src/lib/quota/boundedMap.ts — size-capped Map for in-process routing/quota caches.
import { createLogger } from "@/shared/utils/logger";

/**
 * - `lru`: no expiry; over the cap the least-recently-USED entry goes first
 *   (`get` refreshes recency).
 * - `ttl`: entries expire `ttlMs` after they were last `set` (expired reads return
 *   undefined and drop the entry); over the cap expired entries are swept first,
 *   then the oldest-WRITTEN entry goes (reads do not refresh anything).
 */
export type BoundedMapPolicy = "lru" | "ttl";

export interface BoundedMapLogger {
  warn(meta: Record<string, unknown>, message: string): void;
}

export interface BoundedMapOptions<V> {
  /**
   * Return false to protect an entry from eviction. Protected entries are NEVER
   * evicted: when every remaining entry is protected the map grows past its cap
   * (and says so in the log) rather than dropping state whose loss would change
   * routing — e.g. a saturated quota bucket (fail-open) or a semantic quality pin.
   */
  shouldEvict?: (value: V, key: string, nowMs: number) => boolean;
  /** Defaults to the project logger (`quota:bounded-map`). */
  log?: BoundedMapLogger;
  /** Minimum gap between two eviction log lines for one map. Default 60s. */
  logIntervalMs?: number;
}

interface Entry<V> {
  value: V;
  ts: number;
}

export interface BoundedMap<V> {
  get(key: string, nowMs?: number): V | undefined;
  set(key: string, value: V, nowMs?: number): void;
  delete(key: string): boolean;
  clear(): void;
  readonly size: number;
  keys(): IterableIterator<string>;
  [Symbol.iterator](): IterableIterator<[string, V]>;
  /** Lifetime counters, for tests and diagnostics. */
  stats(): { evictions: number; overflowInserts: number };
}

const DEFAULT_LOG_INTERVAL_MS = 60_000;

let defaultLogger: BoundedMapLogger | null = null;
function getDefaultLogger(): BoundedMapLogger {
  defaultLogger ??= createLogger("quota:bounded-map");
  return defaultLogger;
}

export function boundedMap<V>(
  name: string,
  limit: number,
  policy: BoundedMapPolicy,
  ttlMs = 0,
  options: BoundedMapOptions<V> = {}
): BoundedMap<V> {
  const inner = new Map<string, Entry<V>>();
  const shouldEvict = options.shouldEvict ?? (() => true);
  const logIntervalMs = options.logIntervalMs ?? DEFAULT_LOG_INTERVAL_MS;
  const expires = policy === "ttl" && ttlMs > 0;

  let evictions = 0;
  let overflowInserts = 0;
  // Aggregated logging: the first event logs at once, later ones are summed and
  // reported at most once per logIntervalMs — a hot cache at its cap must not
  // produce one log line per request.
  let pendingEvictions = 0;
  let pendingOverflows = 0;
  let lastLogAt = Number.NEGATIVE_INFINITY;

  function maybeLog(nowMs: number): void {
    if (pendingEvictions === 0 && pendingOverflows === 0) return;
    if (nowMs - lastLogAt < logIntervalMs) return;
    lastLogAt = nowMs;
    (options.log ?? getDefaultLogger()).warn(
      {
        map: name,
        cap: limit,
        size: inner.size,
        evicted: pendingEvictions,
        overflowInserts: pendingOverflows,
      },
      `[boundedMap:${name}] cap ${limit} reached: evicted ${pendingEvictions} entr${pendingEvictions === 1 ? "y" : "ies"}` +
        (pendingOverflows > 0
          ? `, grew past the cap ${pendingOverflows}x (all entries protected)`
          : "")
    );
    pendingEvictions = 0;
    pendingOverflows = 0;
  }

  function isExpired(entry: Entry<V>, nowMs: number): boolean {
    return expires && nowMs - entry.ts > ttlMs;
  }

  function sweepExpired(nowMs: number): void {
    for (const [k, e] of inner) {
      if (isExpired(e, nowMs)) inner.delete(k);
    }
  }

  /** Map iteration order is recency (lru) or write order (ttl): the first evictable key wins. */
  function findVictim(nowMs: number): string | undefined {
    for (const [k, e] of inner) {
      if (shouldEvict(e.value, k, nowMs)) return k;
    }
    return undefined;
  }

  function makeRoom(nowMs: number): void {
    if (inner.size < limit) return;
    if (expires) sweepExpired(nowMs);
    while (inner.size >= limit) {
      const victim = findVictim(nowMs);
      if (victim === undefined) {
        overflowInserts += 1;
        pendingOverflows += 1;
        break;
      }
      inner.delete(victim);
      evictions += 1;
      pendingEvictions += 1;
    }
    maybeLog(nowMs);
  }

  return {
    get(key: string, nowMs: number = Date.now()): V | undefined {
      const entry = inner.get(key);
      if (!entry) return undefined;
      if (isExpired(entry, nowMs)) {
        inner.delete(key);
        return undefined;
      }
      if (policy === "lru") {
        inner.delete(key);
        inner.set(key, entry);
      }
      return entry.value;
    },
    set(key: string, value: V, nowMs: number = Date.now()): void {
      if (inner.has(key)) inner.delete(key);
      else makeRoom(nowMs);
      inner.set(key, { value, ts: nowMs });
    },
    delete(key: string): boolean {
      return inner.delete(key);
    },
    clear(): void {
      inner.clear();
    },
    get size(): number {
      return inner.size;
    },
    keys(): IterableIterator<string> {
      return inner.keys();
    },
    [Symbol.iterator](): IterableIterator<[string, V]> {
      const nowMs = Date.now();
      const it = inner.entries();
      function* gen(): Generator<[string, V]> {
        for (const [k, e] of it) {
          if (isExpired(e, nowMs)) continue;
          yield [k, e.value];
        }
      }
      return gen();
    },
    stats() {
      return { evictions, overflowInserts };
    },
  };
}
