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
  private readonly maxSize: number;

  constructor(ttlMs: number, maxSize?: number) {
    this.ttlMs = ttlMs;
    this.maxSize = maxSize ?? 0;
  }

  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }
    // LRU: move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  set(key: string, value: T): void {
    // Evict LRU (first key in insertion order) when at capacity
    if (this.maxSize > 0 && this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const oldest = this.cache.keys().next().value;
      if (oldest !== undefined) this.cache.delete(oldest);
    }
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
const connectionsCache = new TTLCache<unknown[]>(CONNECTIONS_TTL_MS, 500);

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
 * Used in request hot-paths (usageStats, callLogs, usageHistory, catalog, virtualFactory).
 * Now caches ALL query variants (filtered and unfiltered) for 5s.
 */
export async function getCachedProviderConnections(
  filter?: Record<string, unknown>
): Promise<unknown[]> {
  const cacheKey = filter && Object.keys(filter).length > 0
    ? JSON.stringify(filter)
    : "all";

  const cached = connectionsCache.get(cacheKey);
  if (cached) return cached;

  const { getProviderConnections } = await import("@/lib/db/providers");
  const value = await getProviderConnections(filter);
  connectionsCache.set(cacheKey, value);
  return value;
}

const rawConnectionsCache = new TTLCache<unknown[]>(CONNECTIONS_TTL_MS, 500);

/**
 * Cached wrapper for getRawProviderConnections.
 * Same 5s TTL as the encrypted variant but preserves ciphertext fields
 * for lazy decryption — used by the auth selection hot path where 10k+
 * connections are filtered to find the winner but only 1 row needs
 * credential decryption.
 */
export async function getCachedRawProviderConnections(
  filter?: Record<string, unknown>
): Promise<unknown[]> {
  const key = JSON.stringify(filter ?? {});
  const cached = rawConnectionsCache.get(key);
  if (cached !== undefined) return cached;
  const { getRawProviderConnections } = await import("./providers");
  const rows = await getRawProviderConnections(filter);
  rawConnectionsCache.set(key, rows);
  return rows;
}

const connectionByIdCache = new TTLCache<Record<string, unknown> | null>(CONNECTIONS_TTL_MS, 10_000);
const nodesCache = new TTLCache<unknown[]>(CONNECTIONS_TTL_MS);

/**
 * Cached wrapper for getProviderConnectionById.
 * Keyed by connection ID, shared 5s TTL.
 * Invalidated on every provider_connections write.
 */
export async function getCachedProviderConnectionById(
  id: string
): Promise<Record<string, unknown> | null> {
  if (!id) return null;
  const cached = connectionByIdCache.get(id);
  if (cached !== undefined) return cached;

  const { getProviderConnectionById } = await import("@/lib/db/providers");
  const value = await getProviderConnectionById(id);
  connectionByIdCache.set(id, value);
  return value;
}

/**
 * Cached wrapper for getProviderNodes.
 * Keyed by JSON-serialized filter, shared 5s TTL.
 * Invalidated on every provider_nodes write.
 */
export async function getCachedProviderNodes(
  filter?: Record<string, unknown>
): Promise<unknown[]> {
  const cacheKey = filter ? JSON.stringify(filter) : "all";
  const cached = nodesCache.get(cacheKey);
  if (cached) return cached;

  const { getProviderNodes } = await import("@/lib/db/providers");
  const value = await getProviderNodes(filter);
  nodesCache.set(cacheKey, value);
  return value;
}

// ──────────────── LKGP Cache Wrappers ────────────────

interface LKGPRecordCache {
  provider: string;
  connectionId?: string;
}

const lkgpCache = new TTLCache<LKGPRecordCache | null>(SETTINGS_TTL_MS);

export async function getCachedLKGP(
  comboName: string,
  modelId: string
): Promise<LKGPRecordCache | null> {
  const cacheKey = `lkgp:${comboName}:${modelId}`;
  const cached = lkgpCache.get(cacheKey);
  if (cached !== undefined) return cached;

  const { getLKGP } = await import("@/lib/db/settings");
  const value = await getLKGP(comboName, modelId);
  lkgpCache.set(cacheKey, value);
  return value;
}

export async function setCachedLKGP(
  comboName: string,
  modelId: string,
  providerId: string,
  connectionId?: string
): Promise<void> {
  const { setLKGP } = await import("@/lib/db/settings");
  await setLKGP(comboName, modelId, providerId, connectionId);
  lkgpCache.invalidate(`lkgp:${comboName}:${modelId}`);
}

// ──────────────── Combo Cache Invalidation Signal ────────────────
//
// The nested-combo expansion caches live in request handlers
// (`src/sse/handlers/chat.ts` getCombosCachedForChat and
// `open-sse/handlers/chatCore.ts` getCombosCached), each with a 10s TTL. A db
// module must NOT import a request handler (that would create an import cycle),
// so instead those caches consult this monotonically-incrementing version.
// Combo writes call `invalidateDbCache("combos")`, which bumps the version;
// the handlers compare the version they were populated at against the current
// one and treat a mismatch as a cache miss — so combo edits take effect
// immediately instead of after the 10s window (#3147).
let combosCacheVersion = 0;

/**
 * Current combo-cache version. Cache layers snapshot this when they populate
 * and re-read it on every access; a change means the underlying combos were
 * written and the cached expansion must be refreshed.
 */
export function getCombosCacheVersion(): number {
  return combosCacheVersion;
}

// ──────────────── Model Catalog Cache Invalidation Signal ────────────────
//
// #6408 added a request-shape-keyed (prefix/isCodex/apiKey) TTL cache around the
// unified /v1/models builder (src/app/api/v1/models/catalog.ts) to coalesce
// concurrent/bursty GETs. That cache key does not vary with the underlying DB
// state the builder reads (connections, settings, combos), so a write followed by
// a read within the ~1.5s TTL replayed the pre-write response. Same import-cycle
// constraint as combosCacheVersion above (a db module must not import the route
// module) — catalog.ts instead compares this version on every access and drops its
// whole cache the moment it moves, so any write that calls invalidateDbCache() makes
// the next read miss immediately instead of waiting out the TTL.
let modelCatalogCacheVersion = 0;

/**
 * Current model-catalog-cache version. `getUnifiedModelsResponse()` folds this
 * into its response cache key; a change means settings/connections/combos were
 * written since the cache was populated and the cached body is stale.
 */
export function getModelCatalogCacheVersion(): number {
  return modelCatalogCacheVersion;
}

/**
 * Invalidate caches (call after writes to any of: settings, pricing,
 * connections, combos, nodes).
 *
 * When scope is `"connections"` and an `id` is provided, only that
 * connection's by-ID cache entry is invalidated (the filter-keyed raw
 * cache must still be fully cleared since overlapping filter results
 * cannot be selectively invalidated).
 */
export function invalidateDbCache(
  scope?: "settings" | "pricing" | "connections" | "combos" | "nodes",
  id?: string
): void {
  if (!scope || scope === "settings") settingsCache.invalidate();
  if (!scope || scope === "pricing") pricingCache.invalidate();
  if (!scope || scope === "connections") {
    connectionsCache.invalidate();
    rawConnectionsCache.invalidate();
    if (id) {
      connectionByIdCache.invalidate(id);
    } else {
      connectionByIdCache.invalidate();
    }
  }
  if (!scope || scope === "nodes") nodesCache.invalidate();
  if (!scope || scope === "combos") combosCacheVersion++;
  // Settings/connections/combos all feed the unified model catalog builder
  // (blockedProviders + hidePaidModels, provider connections + excludedModels,
  // combo definitions, respectively) — pricing does too, via isFreeModel().
  modelCatalogCacheVersion++;
}
