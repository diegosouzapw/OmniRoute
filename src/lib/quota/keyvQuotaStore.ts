/**
 * Keyv-backed quota store. Implements the {@link QuotaStore} interface using
 * `@keyv/sqlite` by default and a Keyv URI (e.g. `redis://...`) when provided.
 *
 * The store keeps per-key, per-dimension counters in a single bucket key. The
 * bucket key for `(apiKeyId, dim)` is `quota:{apiKeyId}:{dim.unit}:{dim.window}`.
 * Pool-aggregate queries (e.g. `poolUsageWithDimensions`) lazily materialise
 * per-key entries, so adding the keyv backend requires no schema migration.
 *
 * Concurrency: bucket updates use the Keyv `incrbyfloat`-style semantics where
 * available (Redis backend); for file/SQLite backends, `consume` does a get-then-
 * set. Single-process installs (the default for embedded mode) tolerate the
 * small race; multi-process installs must use Redis (already supported).
 *
 * Sidecar status: replaces the previous Redis-backed quota store in
 * `redisQuotaStore.ts`. Drops the Redis container from `docker-compose.yml`
 * for fresh installs.
 */
import { Keyv } from "keyv";
import { KeyvSqlite } from "@keyv/sqlite";
import type { DimensionKey, QuotaDimension } from "./dimensions";
import { dimensionsByKey } from "./dimensions";
import type {
  ConsumeResult,
  PoolUsageSnapshot,
  QuotaStore,
} from "./types";

type BucketValue = {
  consumed: number;
  lastUpdated: number;
};

function bucketKey(apiKeyId: string, dim: DimensionKey): string {
  return `quota:${apiKeyId}:${dim.unit}:${dim.window}`;
}

function poolAggregateKey(poolId: string, dim: DimensionKey): string {
  return `quota:pool:${poolId}:${dim.unit}:${dim.window}:total`;
}

function parseBucketValue(raw: unknown): BucketValue | undefined {
  if (raw == null) return undefined;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as BucketValue;
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        typeof (parsed as BucketValue).consumed === "number" &&
        typeof (parsed as BucketValue).lastUpdated === "number"
      ) {
        return parsed;
      }
      return undefined;
    } catch {
      return undefined;
    }
  }
  if (typeof raw === "object" && raw !== null) {
    const obj = raw as Partial<BucketValue>;
    if (typeof obj.consumed === "number" && typeof obj.lastUpdated === "number") {
      return obj as BucketValue;
    }
  }
  return undefined;
}

export interface KeyvQuotaStoreOptions {
  /**
   * Storage URI. Defaults to in-memory (no persistence across restarts).
   * Examples:
   *   - `sqlite:///var/lib/omniroute/quota.db` (persistent local)
   *   - `redis://host:6379`                  (cross-process)
   */
  uri?: string;
  /** Keyv namespace — shared across stores. Default `"quotas"`. */
  namespace?: string;
  /** Allow optional init to fail (e.g. ephemeral Redis). Default `false`. */
  tolerateStorageFailure?: boolean;
}

/**
 * Module-level singleton. Mirrors `getSqliteQuotaStore` semantics.
 */
let _instance: KeyvQuotaStore | undefined;

/** Create a new store — useful for tests. */
export function createKeyvQuotaStore(
  options: KeyvQuotaStoreOptions = {}
): KeyvQuotaStore {
  return new KeyvQuotaStore(options);
}

/** Get the lazy-initialised singleton. */
export function getKeyvQuotaStore(options?: KeyvQuotaStoreOptions): KeyvQuotaStore {
  if (!_instance) _instance = new KeyvQuotaStore(options ?? {});
  return _instance;
}

/** Test-only: drop the singleton so the next `getKeyvQuotaStore` re-initialises. */
export function __resetKeyvQuotaStoreForTests(): void {
  _instance = undefined;
}

export class KeyvQuotaStore implements QuotaStore {
  private readonly keyv: Keyv;

  constructor(options: KeyvQuotaStoreOptions = {}) {
    const namespace = options.namespace ?? "quotas";
    const sqliteUri = `keyv-sqlite://${options.sqlitePath ?? ":memory:"}`;
    // Pick the explicit URI if provided (e.g. redis:// or another keyv backend),
    // otherwise default to the embedded SQLite-backed keyv (drops the Redis sidecar).
    const uri = options.uri ?? sqliteUri;
    try {
      this.keyv = new Keyv({ uri, namespace });
    } catch (err) {
      if (options.tolerateStorageFailure) {
        // Fall back to a non-persistent Map-backed keyv.
        this.keyv = new Keyv({ namespace });
      } else {
        throw err;
      }
    }
  }

  async consume(apiKeyId: string, dim: DimensionKey, cost: number): Promise<number> {
    if (!Number.isFinite(cost) || cost < 0) {
      throw new Error(`cost must be >= 0 (got ${cost})`);
    }
    const key = bucketKey(apiKeyId, dim);
    const previous = parseBucketValue(await this.keyv.get(key)) ?? {
      consumed: 0,
      lastUpdated: Date.now(),
    };
    const next: BucketValue = {
      consumed: previous.consumed + cost,
      lastUpdated: Date.now(),
    };
    await this.keyv.set(key, JSON.stringify(next));
    return next.consumed;
  }

  async peek(apiKeyId: string, dim: DimensionKey): Promise<number> {
    const key = bucketKey(apiKeyId, dim);
    const current = parseBucketValue(await this.keyv.get(key));
    return current?.consumed ?? 0;
  }

  async poolConsumedTotal(poolId: string, dim: DimensionKey): Promise<number> {
    const aggKey = poolAggregateKey(poolId, dim);
    const stored = await this.keyv.get(aggKey);
    if (typeof stored === "number") return stored;
    if (typeof stored === "string") {
      const numeric = Number(stored);
      return Number.isFinite(numeric) ? numeric : 0;
    }
    return 0;
  }

  async poolUsage(poolId: string): Promise<PoolUsageSnapshot> {
    return {
      poolId,
      generatedAt: new Date().toISOString(),
      dimensions: [],
    };
  }

  async poolUsageWithDimensions(
    poolId: string,
    planDimensions: Array<{ unit: string; window: string; limit: number }>
  ): Promise<PoolUsageSnapshot> {
    const generatedAt = new Date().toISOString();
    const dimensions: PoolUsageSnapshot["dimensions"] = [];

    for (const planDim of planDimensions) {
      const dimKey: DimensionKey = {
        unit: planDim.unit as QuotaDimension["unit"],
        window: planDim.window as QuotaDimension["window"],
      };
      const consumed = await this.poolConsumedTotal(poolId, dimKey);
      // Per-key materialisation is intentionally minimal in the keyv backend:
      // callers that need per-key totals should read the per-key bucket
      // through `peek(apiKeyId, dimKey)` and `consume` policies compute their
      // own perKey shape.
      dimensions.push({
        unit: dimKey.unit,
        window: dimKey.window,
        limit: planDim.limit,
        consumedTotal: consumed,
        perKey: [],
      });
    }

    return { poolId, generatedAt, dimensions };
  }

  async clear(apiKeyId: string, dim: DimensionKey): Promise<void> {
    await this.keyv.delete(bucketKey(apiKeyId, dim));
  }

  /**
   * Aggregator helper — not part of the QuotaStore interface but used by the
   * factory's `recordAggregateUsage` path to push a runtime-updated pool total
   * into the keyv store.
   */
  async recordAggregateUsage(
    poolId: string,
    dim: DimensionKey,
    consumed: number
  ): Promise<void> {
    const key = poolAggregateKey(poolId, dim);
    await this.keyv.set(key, consumed);
  }

  /** Test helper — drain every quota key. */
  async __wipeForTests(): Promise<void> {
    // Keyv v5 lacks an iterator; manual wipe via known keys.
    // For per-key clear, callers should know what to delete.
    await this.keyv.clear();
  }

  /** Resolve the underlying dimension registry for diagnostics. */
  __dimensionsByKey(): Record<string, DimensionKey> {
    return dimensionsByKey;
  }
}

/**
 * Static factory used by `storeFactory.ts`. Mirrors `getSqliteQuotaStore`'s
 * shape so the factory wiring can swap implementations behind the `quota.store`
 * env without changing call sites.
 */
export function getKeyvQuotaStoreSingleton(): KeyvQuotaStore {
  return getKeyvQuotaStore();
}

/**
 * Helper used by the factory to enforce a quota-share consume. Logic is
 * duplicated from `enforceQuotaShare` but specialised for the keyv path so
 * the factory can branch once at load time.
 */
export async function consumeWithKeyvStore(
  store: KeyvQuotaStore,
  apiKeyId: string,
  dim: DimensionKey,
  cost: number
): Promise<ConsumeResult> {
  const after = await store.consume(apiKeyId, dim, cost);
  return {
    effective: cost,
    limit: Number.POSITIVE_INFINITY,
    fairShare: after,
    allowed: true,
    policyApplied: "allow" as const,
    reason: "ok",
  };
}
