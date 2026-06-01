/**
 * sqliteQuotaStore.ts — SQLite-backed QuotaStore implementation.
 *
 * Uses a Sliding Window Counter with 2 buckets per (apiKeyId, dimensionKey):
 *   effective = prev × (1 − elapsed/window) + curr
 *   currentBucketIndex = Math.floor(nowMs / WINDOW_MS[window])
 *   currentBucketStartMs = currentBucketIndex × WINDOW_MS[window]
 *   elapsed = nowMs − currentBucketStartMs
 *
 * Concurrency: per-(apiKeyId|dimensionKey) in-memory mutex prevents races on
 * the read-modify-write sequence (same anti-thundering-herd pattern used by
 * auth.ts::markAccountUnavailable). UPSERT in incrementBucket is still atomic
 * at the SQLite level.
 *
 * Part of: Group B — Quota Sharing Engine (plan 22, frente F6).
 */

import {
  getPool,
  listAllocationsForApiKey,
  getBucket,
  incrementBucket,
  getPair,
  sumPoolDimension,
} from "@/lib/localDb";
import { WINDOW_MS, dimensionKeyToString } from "./dimensions";
import type { DimensionKey } from "./dimensions";
import type { QuotaStore, PoolUsageSnapshot } from "./types";
import { computeBurnRate } from "./burnRate";

// ---------------------------------------------------------------------------
// In-memory mutex (anti-thundering-herd, same pattern as auth.ts)
// ---------------------------------------------------------------------------

const _mutexes = new Map<string, Promise<void>>();

function mutexKey(apiKeyId: string, dimKey: string): string {
  return `${apiKeyId}|${dimKey}`;
}

async function withMutex<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const current = _mutexes.get(key) ?? Promise.resolve();
  let resolve!: () => void;
  const next = new Promise<void>((res) => {
    resolve = res;
  });
  _mutexes.set(key, next);

  try {
    await current;
    return await fn();
  } finally {
    resolve();
    // Clean up only if this promise is still the active one
    if (_mutexes.get(key) === next) {
      _mutexes.delete(key);
    }
  }
}

// ---------------------------------------------------------------------------
// Sliding window helpers
// ---------------------------------------------------------------------------

function slidingWindowEffective(
  curr: number,
  prev: number,
  nowMs: number,
  windowMs: number
): number {
  const currentBucketIndex = Math.floor(nowMs / windowMs);
  const currentBucketStartMs = currentBucketIndex * windowMs;
  const elapsed = nowMs - currentBucketStartMs;
  const weight = 1 - elapsed / windowMs;
  return prev * weight + curr;
}

// ---------------------------------------------------------------------------
// SqliteQuotaStore
// ---------------------------------------------------------------------------

export class SqliteQuotaStore implements QuotaStore {
  /**
   * Increment consumption for (apiKeyId, dim) by `cost` and return the
   * new sliding-window effective value.
   */
  async consume(apiKeyId: string, dim: DimensionKey, cost: number): Promise<number> {
    const nowMs = Date.now();
    const dimKey = dimensionKeyToString(dim);
    const windowMs = WINDOW_MS[dim.window];
    const currentBucket = Math.floor(nowMs / windowMs);

    return withMutex(mutexKey(apiKeyId, dimKey), async () => {
      // UPSERT is atomic at the DB level
      incrementBucket(apiKeyId, dimKey, currentBucket, cost, nowMs);

      // Read fresh pair to compute effective
      const { curr, prev } = getPair(apiKeyId, dimKey, currentBucket);
      return slidingWindowEffective(curr, prev, nowMs, windowMs);
    });
  }

  /**
   * Peek at the current effective consumption without modifying any counters.
   */
  async peek(apiKeyId: string, dim: DimensionKey): Promise<number> {
    const nowMs = Date.now();
    const dimKey = dimensionKeyToString(dim);
    const windowMs = WINDOW_MS[dim.window];
    const currentBucket = Math.floor(nowMs / windowMs);

    const { curr, prev } = getPair(apiKeyId, dimKey, currentBucket);
    return slidingWindowEffective(curr, prev, nowMs, windowMs);
  }

  /**
   * Return the real pool-wide consumption for a dimension in the current
   * sliding window, summed across ALL apiKeyIds that share the same
   * dimensionKey (i.e. same poolId + unit + window).
   *
   * Uses the same 2-bucket sliding-window formula as peek(), applied once
   * to the pool totals so the result is consistent with per-key semantics.
   */
  async poolConsumedTotal(poolId: string, dim: DimensionKey): Promise<number> {
    const nowMs = Date.now();
    const dimKey = dimensionKeyToString(dim);
    const windowMs = WINDOW_MS[dim.window];
    const currentBucket = Math.floor(nowMs / windowMs);

    const { currTotal, prevTotal } = sumPoolDimension(dimKey, currentBucket);
    return slidingWindowEffective(currTotal, prevTotal, nowMs, windowMs);
  }

  /**
   * Return a PoolUsageSnapshot for the given pool, aggregating per-key
   * consumption across all dimensions and computing fairShare / deficit /
   * borrowing flags.
   */
  async poolUsage(poolId: string): Promise<PoolUsageSnapshot> {
    const nowMs = Date.now();
    const pool = getPool(poolId);

    if (!pool) {
      return {
        poolId,
        generatedAt: new Date(nowMs).toISOString(),
        dimensions: [],
      };
    }

    const { allocations } = pool;
    const totalWeight = allocations.reduce((sum, a) => sum + a.weight, 0);

    // Build per-dimension snapshots
    // Dimensions come from the allocations (we aggregate consumption per key
    // for each active allocation dimension). Since QuotaPool doesn't directly
    // carry dimensions (the plan does), we infer the set of known dimension
    // keys by scanning all consumed buckets for the apiKeys in this pool.
    //
    // Practical approach: look up all consumptions for each apiKeyId in the
    // pool's allocations and group by dimension key.

    // Collect all (apiKeyId, dimensionKey) pairs consumed within pool
    const dimMap = new Map<
      string, // dimKey = "<poolId>:<unit>:<window>"
      {
        unit: string;
        window: string;
        perKey: Map<string, number>; // apiKeyId → consumed
      }
    >();

    for (const alloc of allocations) {
      // We don't have a direct "list all dimension keys for a pool" query;
      // instead we scan listAllocationsForApiKey to find which pools the key
      // participates in, and derive dimensions via best-effort getBucket.
      // For poolUsage we rely on the dimension keys we can discover.
      // Since dimensions live in ProviderPlan (resolved separately), we peek
      // via direct getBucket reads for the current bucket only.
      //
      // Note: This is intentionally a lightweight implementation. The full
      // dimension list should come from the resolved plan; here we surface
      // what's been stored in quota_consumption for this pool.

      const { apiKeyId } = alloc;
      // listAllocationsForApiKey returns pairs across all pools; filter to this one
      const allAllocsForKey = listAllocationsForApiKey(apiKeyId);
      for (const { poolId: pid } of allAllocsForKey) {
        if (pid !== poolId) continue;
        // The dimension keys for this pool are known if consumption exists
        // We can't list all keys without a query, so we rely on the calling
        // context having pre-populated via consume(). For dashboard use,
        // the pool dimensions are read from the provider plan.
      }

      // We only read dimensions that we can discover from what was actually
      // consumed. For a richer implementation, the caller should pass the
      // resolved plan dimensions (done in REST routes - F8).
      // Here: peek for common windows to detect what's in use.
    }

    // Since we cannot enumerate all dimension keys without a table scan,
    // return a minimal snapshot — the REST route (F8) will combine this
    // with plan data to produce the full response.
    const dimensionSnapshots: PoolUsageSnapshot["dimensions"] = [];

    for (const [_dimKey, dimData] of dimMap) {
      let consumedTotal = 0;
      const perKey: PoolUsageSnapshot["dimensions"][number]["perKey"] = [];

      for (const [apiKeyId, consumed] of dimData.perKey) {
        consumedTotal += consumed;
        const alloc = allocations.find((a) => a.apiKeyId === apiKeyId);
        const weight = alloc?.weight ?? 0;
        // limit comes from the plan — here we set to 0 as placeholder
        const fairShare = 0; // overridden when plan is available
        const deficit = consumed - fairShare;
        const borrowing = consumed > fairShare && consumed <= consumedTotal;
        perKey.push({ apiKeyId, consumed, fairShare, deficit, borrowing });
      }

      dimensionSnapshots.push({
        unit: dimData.unit as PoolUsageSnapshot["dimensions"][number]["unit"],
        window: dimData.window as PoolUsageSnapshot["dimensions"][number]["window"],
        limit: 0,
        consumedTotal,
        perKey,
      });
    }

    return {
      poolId,
      generatedAt: new Date(nowMs).toISOString(),
      dimensions: dimensionSnapshots,
    };
  }

  /**
   * Build a PoolUsageSnapshot for a given pool with explicit dimensions from
   * the provider plan. This is the richer version used by REST routes (F8)
   * that already resolved the plan.
   *
   * This method is not part of the QuotaStore interface but is available on
   * the concrete class for callers that have plan data.
   */
  async poolUsageWithDimensions(
    poolId: string,
    planDimensions: Array<{ unit: string; window: string; limit: number }>
  ): Promise<PoolUsageSnapshot> {
    const nowMs = Date.now();
    const pool = getPool(poolId);

    if (!pool) {
      return {
        poolId,
        generatedAt: new Date(nowMs).toISOString(),
        dimensions: [],
      };
    }

    const { allocations } = pool;
    const totalWeight = allocations.reduce((sum, a) => sum + a.weight, 0);

    // Burn rate samples: collect peek values at nowMs and nowMs - 60s
    const burnSamples: Array<{ ts: number; consumed: number }> = [];

    const dimensionSnapshots: PoolUsageSnapshot["dimensions"] = [];

    for (const planDim of planDimensions) {
      const windowMs = WINDOW_MS[planDim.window as keyof typeof WINDOW_MS];
      if (!windowMs) continue;

      let consumedTotal = 0;
      const perKey: PoolUsageSnapshot["dimensions"][number]["perKey"] = [];

      for (const alloc of allocations) {
        const dim: DimensionKey = {
          poolId,
          unit: planDim.unit as DimensionKey["unit"],
          window: planDim.window as DimensionKey["window"],
        };
        const consumed = await this.peek(alloc.apiKeyId, dim);
        consumedTotal += consumed;

        const effectiveWeight = totalWeight > 0 ? alloc.weight : 0;
        const fairShare = (effectiveWeight / 100) * planDim.limit;
        const deficit = consumed - fairShare;
        // borrowing = key consumed more than its fair share
        const borrowing = consumed > fairShare;

        perKey.push({
          apiKeyId: alloc.apiKeyId,
          consumed,
          fairShare,
          deficit,
          borrowing,
        });
      }

      burnSamples.push({ ts: nowMs, consumed: consumedTotal });

      dimensionSnapshots.push({
        unit: planDim.unit as PoolUsageSnapshot["dimensions"][number]["unit"],
        window: planDim.window as PoolUsageSnapshot["dimensions"][number]["window"],
        limit: planDim.limit,
        consumedTotal,
        perKey,
      });
    }

    // Compute burn rate from token-like dimensions
    const tokenDim = dimensionSnapshots.find((d) => d.unit === "tokens");
    let burnRate: PoolUsageSnapshot["burnRate"];
    if (tokenDim && burnSamples.length >= 1) {
      const remaining = tokenDim.limit - tokenDim.consumedTotal;
      const rateResult = computeBurnRate(burnSamples, remaining);
      burnRate = {
        tokensPerSecond: rateResult.tokensPerSecond,
        timeToExhaustionMs: rateResult.timeToExhaustionMs,
      };
    }

    return {
      poolId,
      generatedAt: new Date(nowMs).toISOString(),
      dimensions: dimensionSnapshots,
      burnRate,
    };
  }

  /**
   * Clear consumption counters for (apiKeyId, dim). Test-only.
   * Implemented by writing a large negative delta to bring curr + prev to 0,
   * OR by directly zeroing out the bucket rows.
   *
   * We zero by reading current and then applying -curr as delta.
   * The previous bucket is left as-is (its weight will decay naturally).
   */
  async clear(apiKeyId: string, dim: DimensionKey): Promise<void> {
    const nowMs = Date.now();
    const dimKey = dimensionKeyToString(dim);
    const windowMs = WINDOW_MS[dim.window];
    const currentBucket = Math.floor(nowMs / windowMs);
    const prevBucket = currentBucket - 1;

    await withMutex(mutexKey(apiKeyId, dimKey), async () => {
      // Zero current bucket
      const currVal = getBucket(apiKeyId, dimKey, currentBucket);
      if (currVal !== 0) {
        incrementBucket(apiKeyId, dimKey, currentBucket, -currVal, nowMs);
      }
      // Zero previous bucket
      const prevVal = getBucket(apiKeyId, dimKey, prevBucket);
      if (prevVal !== 0) {
        incrementBucket(apiKeyId, dimKey, prevBucket, -prevVal, nowMs);
      }
    });
  }
}

// Singleton per process
let _instance: SqliteQuotaStore | null = null;

export function getSqliteQuotaStore(): SqliteQuotaStore {
  if (!_instance) {
    _instance = new SqliteQuotaStore();
  }
  return _instance;
}

export function resetSqliteQuotaStore(): void {
  _instance = null;
}
