/**
 * Search Cache — in-memory TTL cache with request coalescing
 *
 * Bounded at MAX_CACHE_ENTRIES to prevent OOM.
 * Request coalescing deduplicates concurrent identical queries
 * to prevent cache stampede (critical for agentic tools).
 */

import { createHash } from "crypto";

const MAX_CACHE_ENTRIES = 5000;
const DEFAULT_TTL_MS = parseInt(process.env.SEARCH_CACHE_TTL_MS || String(5 * 60 * 1000), 10);

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const inflight = new Map<string, Promise<unknown>>();

let hits = 0;
let misses = 0;

/**
 * Normalize a query for cache key computation.
 * NFKC normalization, lowercase, trim, collapse whitespace.
 */
function normalizeQuery(query: string): string {
  return query.normalize("NFKC").toLowerCase().trim().replace(/\s+/g, " ");
}

/**
 * Compute a deterministic cache key from search parameters.
 */
export function computeCacheKey(
  query: string,
  provider: string,
  searchType: string,
  maxResults: number,
  country?: string,
  language?: string,
  filters?: unknown
): string {
  const normalized = normalizeQuery(query);
  const payload = JSON.stringify({
    q: normalized,
    p: provider,
    t: searchType,
    n: maxResults,
    c: country || null,
    l: language || null,
    f: filters || null,
  });
  return createHash("sha256").update(payload).digest("hex");
}

/**
 * Evict expired entries and enforce size bound.
 * Called lazily on writes. O(n) worst case but amortized O(1).
 */
function evictIfNeeded(): void {
  const now = Date.now();

  // Remove expired entries first
  for (const [key, entry] of cache) {
    if (entry.expiresAt <= now) {
      cache.delete(key);
    }
  }

  // FIFO eviction if still over limit
  while (cache.size >= MAX_CACHE_ENTRIES) {
    const firstKey = cache.keys().next().value;
    if (firstKey !== undefined) {
      cache.delete(firstKey);
    } else {
      break;
    }
  }
}

/**
 * Get or coalesce: return cached data, join an inflight request,
 * or execute the fetch function and cache the result.
 *
 * @param key - Cache key from computeCacheKey()
 * @param ttlMs - TTL in milliseconds (0 to bypass cache AND coalescing)
 * @param fetchFn - Function to execute on cache miss
 * @returns The cached or freshly fetched data
 */
export async function getOrCoalesce<T>(
  key: string,
  ttlMs: number,
  fetchFn: () => Promise<T>
): Promise<{ data: T; cached: boolean }> {
  // When ttlMs === 0 the caller explicitly wants to bypass the cache.
  // Skip both the cache lookup AND the inflight-coalescing step so every
  // concurrent call gets its own independent upstream fetch.  Without this
  // guard, ttlMs=0 callers still get coalesced results and receive
  // { cached: true } even though caching was explicitly disabled.
  if (ttlMs <= 0) {
    misses++;
    const data = await fetchFn();
    return { data, cached: false };
  }

  // 1. Check cache
  const cached = cache.get(key) as CacheEntry<T> | undefined;
  if (cached && cached.expiresAt > Date.now()) {
    hits++;
    return { data: cached.data, cached: true };
  }

  // 2. Join inflight request if one exists (request coalescing)
  const existing = inflight.get(key) as Promise<T> | undefined;
  if (existing) {
    hits++;
    const data = await existing;
    return { data, cached: true };
  }

  // 3. Cache miss — execute fetch
  misses++;
  const promise = fetchFn();
  inflight.set(key, promise);

  try {
    const data = await promise;

    evictIfNeeded();
    cache.set(key, { data, expiresAt: Date.now() + ttlMs });

    return { data, cached: false };
  } finally {
    inflight.delete(key);
  }
}

/**
 * Get cache statistics for monitoring.
 */
export function getCacheStats(): { size: number; hits: number; misses: number } {
  return { size: cache.size, hits, misses };
}

/**
 * Default TTL for search cache entries.
 */
export const SEARCH_CACHE_DEFAULT_TTL_MS = DEFAULT_TTL_MS;
