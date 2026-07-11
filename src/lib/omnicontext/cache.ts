/**
 * In-process TTL cache for OmniContext retrieve responses.
 * Modeled on open-sse/services/searchCache.ts (bounded + coalescing).
 */
import { createHash } from "node:crypto";

const MAX_CACHE_ENTRIES = 200;
export const OMNICONTEXT_RETRIEVE_CACHE_TTL_MS = 30_000;

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const inflight = new Map<string, Promise<unknown>>();

let hits = 0;
let misses = 0;

function normalizeQuery(query: string): string {
  return query.normalize("NFKC").toLowerCase().trim().replace(/\s+/g, " ");
}

export function computeRetrieveCacheKey(params: {
  projectId: string;
  query: string;
  viewerApiKeyId?: string | null;
  limit?: number;
}): string {
  const payload = JSON.stringify({
    p: params.projectId,
    q: normalizeQuery(params.query || ""),
    v: params.viewerApiKeyId || null,
    n: params.limit ?? 12,
  });
  return createHash("sha256").update(payload).digest("hex");
}

function evictIfNeeded(): void {
  const now = Date.now();
  for (const [key, entry] of cache) {
    if (entry.expiresAt <= now) cache.delete(key);
  }
  while (cache.size >= MAX_CACHE_ENTRIES) {
    const firstKey = cache.keys().next().value;
    if (firstKey === undefined) break;
    cache.delete(firstKey);
  }
}

export async function getOrCoalesceRetrieve<T>(
  key: string,
  ttlMs: number,
  fetchFn: () => Promise<T>
): Promise<{ data: T; cached: boolean }> {
  if (ttlMs <= 0) {
    misses++;
    const data = await fetchFn();
    return { data, cached: false };
  }

  const cached = cache.get(key) as CacheEntry<T> | undefined;
  if (cached && cached.expiresAt > Date.now()) {
    hits++;
    return { data: cached.data, cached: true };
  }

  const existing = inflight.get(key) as Promise<T> | undefined;
  if (existing) {
    hits++;
    const data = await existing;
    return { data, cached: true };
  }

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

export function getRetrieveCacheStats(): { size: number; hits: number; misses: number } {
  return { size: cache.size, hits, misses };
}

export function peekCacheEntry<T>(key: string): T | null {
  const cached = cache.get(key) as CacheEntry<T> | undefined;
  if (cached && cached.expiresAt > Date.now()) return cached.data;
  return null;
}

export function clearRetrieveCache(): void {
  cache.clear();
  inflight.clear();
  hits = 0;
  misses = 0;
}

/** Invalidate all entries (publish/approve/delete should call this). */
export function invalidateRetrieveCache(): void {
  cache.clear();
  inflight.clear();
}
