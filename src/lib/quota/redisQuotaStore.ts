/**
 * redisQuotaStore.ts — Optional Redis-backed QuotaStore implementation.
 *
 * Counter keys follow the pattern:
 *   omniroute:quota:<apiKeyId>:<dimensionKey>:<bucketIndex>
 *
 * Sliding window is maintained identically to the SQLite driver:
 *   effective = prev × (1 − elapsed/window) + curr
 *
 * Pool/allocation metadata (listAllocationsForApiKey, getPool) still lives in
 * SQLite (F2) — only the rolling counters are stored in Redis.
 *
 * ioredis is a SOFT dependency. If not installed, constructing a RedisQuotaStore
 * throws a clear error message.
 *
 * Part of: Group B — Quota Sharing Engine (plan 22, frente F6).
 */

import {
  getPool,
  listAllocationsForApiKey,
} from "@/lib/localDb";
import { WINDOW_MS, dimensionKeyToString } from "./dimensions";
import type { DimensionKey } from "./dimensions";
import type { QuotaStore, PoolUsageSnapshot } from "./types";
import { computeBurnRate } from "./burnRate";

// ---------------------------------------------------------------------------
// Redis connection singleton
// ---------------------------------------------------------------------------

// Lazy singleton — created on first use
let _redisClient: unknown = null; // typed as unknown; cast via RedisLike below

interface RedisLike {
  incrbyfloat(key: string, value: number): Promise<string>;
  expire(key: string, seconds: number): Promise<number>;
  mget(...keys: string[]): Promise<Array<string | null>>;
  eval(script: string, numkeys: number, ...args: unknown[]): Promise<unknown>;
  del(...keys: string[]): Promise<number>;
  quit(): Promise<string>;
}

/**
 * Return the singleton Redis client. Throws if ioredis is not installed.
 * The url parameter is only used when creating the connection for the first time.
 */
export async function getRedisClient(url: string): Promise<RedisLike> {
  if (_redisClient) {
    return _redisClient as RedisLike;
  }

  // Lazy dynamic require — ioredis is an optional dependency
  let Redis: new (url: string) => RedisLike;
  try {
    const mod = await import("ioredis");
    Redis = (mod.default ?? mod) as new (url: string) => RedisLike;
  } catch {
    throw new Error("Redis driver requires ioredis package. Run npm install ioredis.");
  }

  _redisClient = new Redis(url);
  return _redisClient as RedisLike;
}

/** Test-only: reset the Redis singleton. */
export function resetRedisClient(): void {
  _redisClient = null;
}

// ---------------------------------------------------------------------------
// Key helpers
// ---------------------------------------------------------------------------

const KEY_PREFIX = "omniroute:quota";

function bucketKey(apiKeyId: string, dimensionKey: string, bucketIndex: number): string {
  return `${KEY_PREFIX}:${apiKeyId}:${dimensionKey}:${bucketIndex}`;
}

function ttlSeconds(windowMs: number): number {
  // Keep both current + previous bucket alive → 2 × window
  return Math.ceil((2 * windowMs) / 1000);
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
// RedisQuotaStore
// ---------------------------------------------------------------------------

export class RedisQuotaStore implements QuotaStore {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  private async client(): Promise<RedisLike> {
    return getRedisClient(this.url);
  }

  /**
   * Increment consumption by `cost` using INCRBYFLOAT (atomic) and refresh TTL.
   * Returns the new sliding-window effective value.
   */
  async consume(apiKeyId: string, dim: DimensionKey, cost: number): Promise<number> {
    const nowMs = Date.now();
    const dimKey = dimensionKeyToString(dim);
    const windowMs = WINDOW_MS[dim.window];
    const currentBucket = Math.floor(nowMs / windowMs);

    const client = await this.client();
    const currKey = bucketKey(apiKeyId, dimKey, currentBucket);
    const prevKey = bucketKey(apiKeyId, dimKey, currentBucket - 1);
    const ttl = ttlSeconds(windowMs);

    // Atomic increment + refresh TTL
    const newCurrStr = await client.incrbyfloat(currKey, cost);
    await client.expire(currKey, ttl);
    // Also ensure prev key TTL is refreshed so it doesn't disappear prematurely
    await client.expire(prevKey, ttl);

    const newCurr = parseFloat(newCurrStr) || 0;

    // Read prev to compute sliding window
    const [prevStr] = await client.mget(prevKey);
    const prev = parseFloat(prevStr ?? "0") || 0;

    return slidingWindowEffective(newCurr, prev, nowMs, windowMs);
  }

  /**
   * Read the sliding-window effective value without modification.
   */
  async peek(apiKeyId: string, dim: DimensionKey): Promise<number> {
    const nowMs = Date.now();
    const dimKey = dimensionKeyToString(dim);
    const windowMs = WINDOW_MS[dim.window];
    const currentBucket = Math.floor(nowMs / windowMs);

    const client = await this.client();
    const currKey = bucketKey(apiKeyId, dimKey, currentBucket);
    const prevKey = bucketKey(apiKeyId, dimKey, currentBucket - 1);

    const [currStr, prevStr] = await client.mget(currKey, prevKey);
    const curr = parseFloat(currStr ?? "0") || 0;
    const prev = parseFloat(prevStr ?? "0") || 0;

    return slidingWindowEffective(curr, prev, nowMs, windowMs);
  }

  /**
   * Return the real pool-wide consumption for a dimension in the current
   * sliding window, summed across ALL apiKeyIds in the pool's allocations.
   *
   * Strategy: pool/allocation metadata lives in SQLite (F2), so we fetch the
   * allocation list for the pool, then issue a single MGET for all
   * (apiKeyId, curr-bucket) and (apiKeyId, prev-bucket) keys. The Redis keys
   * are per-key counters — there is no pool-level aggregate key — so we read
   * each key's two buckets and sum the raw values before applying the
   * sliding-window formula once on the totals.
   *
   * If the pool does not exist or has no allocations, returns 0.
   * Keys absent in Redis are treated as 0 (MGET returns null).
   */
  async poolConsumedTotal(poolId: string, dim: DimensionKey): Promise<number> {
    const pool = getPool(poolId);
    if (!pool || pool.allocations.length === 0) return 0;

    const nowMs = Date.now();
    const dimKey = dimensionKeyToString(dim);
    const windowMs = WINDOW_MS[dim.window];
    const currentBucket = Math.floor(nowMs / windowMs);
    const prevBucket = currentBucket - 1;

    const client = await this.client();

    // Build [currKey0, prevKey0, currKey1, prevKey1, ...] for all allocated keys
    const redisKeys: string[] = [];
    for (const alloc of pool.allocations) {
      redisKeys.push(bucketKey(alloc.apiKeyId, dimKey, currentBucket));
      redisKeys.push(bucketKey(alloc.apiKeyId, dimKey, prevBucket));
    }

    const values = await client.mget(...redisKeys);

    let currTotal = 0;
    let prevTotal = 0;
    for (let i = 0; i < values.length; i += 2) {
      currTotal += parseFloat(values[i] ?? "0") || 0;
      prevTotal += parseFloat(values[i + 1] ?? "0") || 0;
    }

    return slidingWindowEffective(currTotal, prevTotal, nowMs, windowMs);
  }

  /**
   * Aggregate pool usage. Pool and allocation metadata come from SQLite (F2);
   * rolling counters come from Redis.
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

    // Pool dimensions are not directly available here (they come from plan
    // resolver). Return empty for now — REST routes (F8) call poolUsageWithDimensions.
    return {
      poolId,
      generatedAt: new Date(nowMs).toISOString(),
      dimensions: [],
    };
  }

  /**
   * Build a PoolUsageSnapshot with explicit plan dimensions.
   * Mirrors SqliteQuotaStore.poolUsageWithDimensions().
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
   * Clear both current and previous bucket counters. Test-only.
   */
  async clear(apiKeyId: string, dim: DimensionKey): Promise<void> {
    const nowMs = Date.now();
    const dimKey = dimensionKeyToString(dim);
    const windowMs = WINDOW_MS[dim.window];
    const currentBucket = Math.floor(nowMs / windowMs);

    const client = await this.client();
    const currKey = bucketKey(apiKeyId, dimKey, currentBucket);
    const prevKey = bucketKey(apiKeyId, dimKey, currentBucket - 1);

    await client.del(currKey, prevKey);
  }
}

// Singleton per URL
let _storeInstance: RedisQuotaStore | null = null;
let _storeUrl: string | null = null;

export function getRedisQuotaStore(url: string): RedisQuotaStore {
  if (!_storeInstance || _storeUrl !== url) {
    _storeInstance = new RedisQuotaStore(url);
    _storeUrl = url;
  }
  return _storeInstance;
}

export function resetRedisQuotaStore(): void {
  _storeInstance = null;
  _storeUrl = null;
}
