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
  getBucket,
  incrementBucket,
  getPair,
  sumPoolDimension,
} from "@/lib/localDb";
import { WINDOW_MS, dimensionKeyToString } from "./dimensions";
import type { DimensionKey } from "./dimensions";
import type { QuotaStore, PoolUsageSnapshot } from "./types";
import { computeBurnRateFromWindow } from "./burnRate";

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

    // QuotaPool does not carry dimension definitions — those live in the
    // ProviderPlan, resolved separately. Without a plan we cannot enumerate
    // dimension keys here, so this lightweight snapshot returns no dimensions.
    // The REST route (F8) calls poolUsageWithDimensions() with the resolved
    // plan to produce the full per-dimension response.
    return {
      poolId,
      generatedAt: new Date(nowMs).toISOString(),
      dimensions: [],
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
        const borrowing = consumed > fairShare;

        perKey.push({
          apiKeyId: alloc.apiKeyId,
          consumed,
          fairShare,
          deficit,
          borrowing,
        });
      }

      dimensionSnapshots.push({
        unit: planDim.unit as PoolUsageSnapshot["dimensions"][number]["unit"],
        window: planDim.window as PoolUsageSnapshot["dimensions"][number]["window"],
        limit: planDim.limit,
        consumedTotal,
        perKey,
      });
    }

    // Burn rate: derive from the sliding window (single-snapshot, no history needed).
    const tokenDim = dimensionSnapshots.find((d) => d.unit === "tokens");
    let burnRate: PoolUsageSnapshot["burnRate"];
    if (tokenDim && tokenDim.consumedTotal > 0) {
      const windowMs = WINDOW_MS[tokenDim.window as keyof typeof WINDOW_MS];
      const remaining = tokenDim.limit - tokenDim.consumedTotal;
      const rateResult = computeBurnRateFromWindow(tokenDim.consumedTotal, windowMs, remaining);
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
