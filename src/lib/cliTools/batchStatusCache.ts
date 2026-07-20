// DRY: shared between /api/cli-tools/status and /api/cli-tools/all-statuses (plan 14 F2)
// In-memory mtime-based cache for batch CLI tool status results.
// Cache invalidated when mtime changes or its short TTL expires.

import type { ToolBatchStatus } from "@/shared/types/cliBatchStatus";

export interface CacheEntry {
  mtimeMs: number;
  cachedAt: number;
  result: ToolBatchStatus;
}

const CACHE_TTL_MS = 30_000;

/** Singleton in-memory cache: toolId → { mtimeMs, result } */
const _cache = new Map<string, CacheEntry>();

/**
 * Get cached result for a toolId if mtime matches.
 * Returns null if:
 *  - entry doesn't exist
 *  - stored mtimeMs !== provided mtimeMs (config file changed)
 */
export function getCached(
  toolId: string,
  mtimeMs: number,
  now: number = Date.now()
): ToolBatchStatus | null {
  const entry = _cache.get(toolId);
  if (!entry) return null;
  if (entry.mtimeMs !== mtimeMs) return null;
  if (now - entry.cachedAt >= CACHE_TTL_MS) {
    _cache.delete(toolId);
    return null;
  }
  return entry.result;
}

/**
 * Store a result in the cache for a toolId with its mtime.
 */
export function setCached(
  toolId: string,
  mtimeMs: number,
  result: ToolBatchStatus,
  now: number = Date.now()
): void {
  _cache.set(toolId, { mtimeMs, cachedAt: now, result });
}

/**
 * Remove a specific toolId from the cache (e.g. after config write).
 */
export function invalidate(toolId: string): void {
  _cache.delete(toolId);
}

/**
 * Clear all cached entries. Primarily for testing isolation.
 */
export function clearCache(): void {
  _cache.clear();
}
