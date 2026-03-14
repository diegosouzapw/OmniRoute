/**
 * DB Read Cache — In-memory TTL cache for hot read paths.
 *
 * SQLite reads are already fast since better-sqlite3 is synchronous and
 * memory-mapped. However, some functions (getSettings, getPricing,
 * getProviderConnections) are called on every request by multiple callers.
 * A short TTL cache (5s) eliminates redundant I/O without staling data for
 * long enough to matter (settings changes are applied within one cache cycle).
 *
 * Usage:
 *   import { dbCache } from '@/lib/db/readCache';
 *   const settings = await dbCache.getSettings();
 */

type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

class TTLCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private readonly ttlMs: number;

  constructor(ttlMs: number) {
    this.ttlMs = ttlMs;
  }

  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key: string, value: T): void {
    this.cache.set(key, { value, expiresAt: Date.now() + this.ttlMs });
  }

  invalidate(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
}

// Cache with 5s TTL — short enough to pick up dashboard changes quickly,
// long enough to serve burst request bursts without hammering SQLite.
const SETTINGS_TTL_MS = 5_000;
const PRICING_TTL_MS = 30_000;
const CONNECTIONS_TTL_MS = 5_000;

const settingsCache = new TTLCache<Record<string, unknown>>(SETTINGS_TTL_MS);
const pricingCache = new TTLCache<Record<string, unknown>>(PRICING_TTL_MS);
const connectionsCache = new TTLCache<unknown[]>(CONNECTIONS_TTL_MS);

/**
 * Cached wrapper for getSettings.
 * Invalidated on every updateSettings() call.
 */
export async function getCachedSettings(): Promise<Record<string, unknown>> {
  const cached = settingsCache.get("settings");
  if (cached) return cached;

  const { getSettings } = await import("@/lib/db/settings");
  const value = await getSettings();
  settingsCache.set("settings", value);
  return value;
}

/**
 * Cached wrapper for getPricing.
 * Longer TTL since pricing rarely changes mid-session.
 */
export async function getCachedPricing(): Promise<Record<string, unknown>> {
  const cached = pricingCache.get("pricing");
  if (cached) return cached as Record<string, unknown>;

  const { getPricing } = await import("@/lib/db/settings");
  const value = await getPricing();
  pricingCache.set("pricing", value);
  return value;
}

/**
 * Cached wrapper for getProviderConnections.
 * Used in request hot-paths (usageStats, callLogs, usageHistory).
 */
export async function getCachedProviderConnections(
  filter?: Record<string, unknown>
): Promise<unknown[]> {
  // Only cache the unfiltered "all connections" query (most common)
  if (filter && Object.keys(filter).length > 0) {
    const { getProviderConnections } = await import("@/lib/db/providers");
    return getProviderConnections(filter);
  }

  const cached = connectionsCache.get("all");
  if (cached) return cached;

  const { getProviderConnections } = await import("@/lib/db/providers");
  const value = await getProviderConnections();
  connectionsCache.set("all", value);
  return value;
}

/**
 * Invalidate all caches (call after writes to any of: settings, pricing, connections).
 */
export function invalidateDbCache(scope?: "settings" | "pricing" | "connections"): void {
  if (!scope || scope === "settings") settingsCache.invalidate();
  if (!scope || scope === "pricing") pricingCache.invalidate();
  if (!scope || scope === "connections") connectionsCache.invalidate();
}
