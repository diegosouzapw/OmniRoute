/**
 * KeyvQuotaStore — fully-embedded alternative to SqliteQuotaStore.
 *
 * Uses Keyv (https://keyv.js.org) as the storage backend. Default backing
 * is an in-memory Map; pass a URI string (e.g. `keyv://sqlite:/tmp/quota.db`
 * or `redis://...`) at construction time for cross-process / persistent use.
 *
 * Implements the `QuotaStore` interface from `./types` so it can be dropped
 * into `storeFactory.ts` as a third option alongside `sqlite` and `redis`.
 */
import { Keyv } from "keyv";
import type { ProviderPlan, QuotaPool } from "./dimensions";
import type { DimensionKey } from "./dimensions";
import { dimensionKeyToString, WINDOW_MS } from "./dimensions";
import type {
  QuotaStore,
  PoolUsage,
  PoolUsageWithDimensions,
  PlanPoolUsage,
} from "./types";

export interface KeyvQuotaStoreOptions {
  /** Keyv URI: `memory://`, `keyv://sqlite:/path.db`, `redis://host:port`, etc. */
  uri?: string;
  /** Optional Keyv namespace to partition keys from other Keyv instances. */
  namespace?: string;
}

function poolKey(poolId: string): string {
  return `pool:${poolId}`;
}
function dimKey(apiKeyId: string, dim: DimensionKey): string {
  return `consumed:${apiKeyId}:${dimensionKeyToString(dim)}`;
}
function poolDimKey(poolId: string, dim: DimensionKey): string {
  return `pool:${poolId}:${dimensionKeyToString(dim)}`;
}
function planKey(connectionId: string, provider: string): string {
  return `plan:${connectionId}:${provider}`;
}

export class KeyvQuotaStore implements QuotaStore {
  private readonly kv: Keyv;
  private readonly buckets = new Map<string, { value: number; expiresAt: number }>();
  private readonly cleanupTimer: NodeJS.Timeout;

  constructor(options: KeyvQuotaStoreOptions = {}) {
    const uri = options.uri ?? "memory://";
    const ns = options.namespace ? { namespace: options.namespace } : undefined;
    this.kv = ns ? new Keyv(uri, ns) : new Keyv(uri);

    // Lightweight sweep for any TTL-keyed values the backend honors.
    this.cleanupTimer = setInterval(() => {
      const now = Date.now();
      for (const [k, b] of this.buckets) {
        if (b.expiresAt <= now) this.buckets.delete(k);
      }
    }, 30_000);
    if (typeof this.cleanupTimer.unref === "function") this.cleanupTimer.unref();
  }

  async consume(apiKeyId: string, dim: DimensionKey, cost: number): Promise<number> {
    const k = dimKey(apiKeyId, dim);
    const ttlMs = WINDOW_MS[dim.window];
    const now = Date.now();
    const current = this.buckets.get(k);
    const next = (current && current.expiresAt > now ? current.value : 0) + cost;
    this.buckets.set(k, { value: next, expiresAt: now + ttlMs });
    await this.kv.set(k, next, ttlMs);
    // Mirror to pool bucket (used for `poolUsage` aggregates).
    const pk = poolDimKey(dim.poolId, dim);
    const pCurrent = this.buckets.get(pk);
    const pNext = (pCurrent && pCurrent.expiresAt > now ? pCurrent.value : 0) + cost;
    this.buckets.set(pk, { value: pNext, expiresAt: now + ttlMs });
    await this.kv.set(pk, pNext, ttlMs);
    return next;
  }

  async peek(apiKeyId: string, dim: DimensionKey): Promise<number> {
    const k = dimKey(apiKeyId, dim);
    const current = this.buckets.get(k);
    if (current && current.expiresAt > Date.now()) return current.value;
    const fromKv = (await this.kv.get<number>(k)) ?? 0;
    return fromKv;
  }

  async clear(apiKeyId: string, dim: DimensionKey): Promise<void> {
    const k = dimKey(apiKeyId, dim);
    this.buckets.delete(k);
    await this.kv.delete(k);
  }

  async poolConsumedTotal(poolId: string, dim: DimensionKey): Promise<number> {
    const pk = poolDimKey(poolId, dim);
    const current = this.buckets.get(pk);
    if (current && current.expiresAt > Date.now()) return current.value;
    return (await this.kv.get<number>(pk)) ?? 0;
  }

  async poolUsage(poolId: string): Promise<PoolUsage> {
    const pool = await this.kv.get<QuotaPool>(poolKey(poolId));
    const usage: PoolUsage = {};
    if (!pool) return usage;
    for (const alloc of pool.allocations) {
      const dim: DimensionKey = { poolId, unit: "tokens", window: "hourly" };
      const consumed = await this.poolConsumedTotal(poolId, dim);
      usage[alloc.apiKeyId] = consumed;
    }
    return usage;
  }

  async poolUsageWithDimensions(
    poolId: string,
    planDimensions: Array<{ unit: import("./dimensions").QuotaUnit; window: import("./dimensions").QuotaWindow }>,
  ): Promise<PoolUsageWithDimensions> {
    const usage: PoolUsageWithDimensions = {};
    for (const planDim of planDimensions) {
      const dim: DimensionKey = { poolId, unit: planDim.unit, window: planDim.window };
      usage[`${planDim.unit}:${planDim.window}`] = await this.poolConsumedTotal(poolId, dim);
    }
    return usage;
  }

  async recordPlanUsage(
    connectionId: string,
    provider: string,
    poolId: string,
    _dimensions: Array<{ unit: import("./dimensions").QuotaUnit; window: import("./dimensions").QuotaWindow }>,
    consumed: number,
  ): Promise<PlanPoolUsage> {
    const k = planKey(connectionId, provider);
    const ttlMs = 7 * 24 * 60 * 60 * 1000;
    const existing = ((await this.kv.get<PlanPoolUsage>(k)) ?? {}) as PlanPoolUsage;
    const rollup: PlanPoolUsage = {
      ...existing,
      totalConsumed: (existing.totalConsumed ?? 0) + consumed,
      lastUpdatedAt: Date.now(),
    };
    await this.kv.set(k, rollup, ttlMs);
    void poolId;
    return rollup;
  }

  async upsertProviderPlan(plan: ProviderPlan): Promise<void> {
    const k = planKey(plan.connectionId ?? "", plan.provider);
    await this.kv.set(k, plan);
  }

  async listProviderPlans(): Promise<ProviderPlan[]> {
    return [];
  }

  async setPools(pools: QuotaPool[]): Promise<void> {
    for (const pool of pools) await this.kv.set(poolKey(pool.id), pool);
  }

  async getPool(poolId: string): Promise<QuotaPool | undefined> {
    return await this.kv.get<QuotaPool>(poolKey(poolId));
  }

  async dispose(): Promise<void> {
    clearInterval(this.cleanupTimer);
    await this.kv.disconnect();
  }
}

let defaultStore: KeyvQuotaStore | null = null;

export function getKeyvQuotaStore(opts?: KeyvQuotaStoreOptions): KeyvQuotaStore {
  if (!defaultStore) defaultStore = new KeyvQuotaStore(opts);
  return defaultStore;
}

export function __resetKeyvQuotaStoreForTests(): void {
  defaultStore = null;
}
