// src/lib/quota/boundedMap.ts — leaf module, zero upstream imports.

export type BoundedMapPolicy = "lru" | "refetch-lazy" | "hard-expire";

export interface BoundedMapOptions<V> {
  /** Return false to protect an entry from eviction (e.g. quality semantic pin). */
  shouldEvict?: (value: V, key: string) => boolean;
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
}

export function boundedMap<V>(name: string, limit: number, policy: BoundedMapPolicy, ttlMs = 0, options: BoundedMapOptions<V> = {}): BoundedMap<V> {
  const inner = new Map<string, Entry<V>>();
  const shouldEvict = options.shouldEvict ?? (() => true);

  function isExpired(entry: Entry<V>, nowMs: number): boolean {
    if (policy === "lru" || ttlMs <= 0) return false;
    return nowMs - entry.ts > ttlMs;
  }

  function findVictim(pass: "evictable" | "any"): string | undefined {
    for (const [k, e] of inner) {
      if (pass === "any" || shouldEvict(e.value, k)) return k;
    }
    return undefined;
  }

  function evictOne(victim: string): void {
    inner.delete(victim);
    console.warn(`[boundedMap:${name}] evicted key past cap ${limit}`);
  }

  function evictIfNeeded(): void {
    // Pass 1: LRU among evictable entries (shouldEvict). Pass 2, last resort: oldest even if protected.
    for (const pass of ["evictable", "any"] as const) {
      while (inner.size >= limit) {
        const victim = findVictim(pass);
        if (victim === undefined) break;
        evictOne(victim);
        if (pass === "any") break;
      }
      if (inner.size < limit) break;
    }
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
        // Refresh recency: reinsert at tail.
        inner.delete(key);
        inner.set(key, entry);
      }
      return entry.value;
    },
    set(key: string, value: V, nowMs: number = Date.now()): void {
      if (inner.has(key)) inner.delete(key);
      else {
        // Lazily sweep expired entries before evicting (avoids evicting fresh ones).
        if (policy !== "lru" && ttlMs > 0) {
          for (const [k, e] of inner) {
            if (isExpired(e, nowMs)) inner.delete(k);
          }
        }
        evictIfNeeded();
      }
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
      const it = inner.entries();
      // Adapt [k, Entry] → [k, V], filtering expired entries without mutating during iteration.
      function* gen(): Generator<[string, V]> {
        const nowMs = Date.now();
        for (const [k, e] of it) {
          if (isExpired(e, nowMs)) continue;
          yield [k, e.value];
        }
      }
      return gen();
    },
  };
}
