/**
 * db/quotaConsumption.ts — Sliding Window Counter primitives for quota tracking.
 *
 * Implements low-level bucket read/write operations for the 2-bucket sliding
 * window counter algorithm. Each row is keyed on (api_key_id, dimension_key,
 * bucket_index) where dimension_key = "<poolId>:<unit>:<window>" and
 * bucket_index = floor(now_ms / window_ms).
 *
 * Atomicity: incrementBucket uses INSERT ... ON CONFLICT DO UPDATE (UPSERT)
 * which is a single atomic SQLite statement — no separate read-modify-write.
 *
 * Part of: Group B — Quota Sharing Engine (plan 22, frente F2).
 */

import { getDbInstance } from "./core";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

function getDb(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

interface BucketRow {
  consumed: number;
}

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

/**
 * A single consumption event row, as returned by listConsumptionForPool.
 * Derived from the quota_consumption table; the poolId is stripped from
 * dimension_key (format "<poolId>:<unit>:<window>") and the unit/window
 * fragments are surfaced separately.
 */
export interface ConsumptionEvent {
  apiKeyId: string;
  /** The full dimension_key string: "<poolId>:<unit>:<window>" */
  dimensionKey: string;
  /** The <unit> segment of dimension_key (e.g. "tokens", "requests", "usd") */
  unit: string;
  /** The <window> segment of dimension_key (e.g. "hourly", "daily") */
  window: string;
  bucketIndex: number;
  consumed: number;
  /** epoch ms */
  updatedAt: number;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Read the consumed value for a single bucket. Returns 0 if no row exists.
 */
export function getBucket(
  apiKeyId: string,
  dimensionKey: string,
  bucketIndex: number
): number {
  const row = getDb()
    .prepare<BucketRow>(
      `SELECT consumed FROM quota_consumption
       WHERE api_key_id = ? AND dimension_key = ? AND bucket_index = ?`
    )
    .get(apiKeyId, dimensionKey, bucketIndex);
  return row?.consumed ?? 0;
}

/**
 * Atomically increment the consumed counter for a bucket.
 * Uses UPSERT: if the row does not exist it is created; if it exists the
 * delta is added to the existing consumed value and updated_at is refreshed.
 *
 * @param apiKeyId      The API key being tracked.
 * @param dimensionKey  "<poolId>:<unit>:<window>" string.
 * @param bucketIndex   floor(nowMs / windowMs).
 * @param delta         Amount to add (positive number).
 * @param nowMs         Current epoch milliseconds (used for updated_at).
 */
export function incrementBucket(
  apiKeyId: string,
  dimensionKey: string,
  bucketIndex: number,
  delta: number,
  nowMs: number
): void {
  getDb()
    .prepare(
      `INSERT INTO quota_consumption (api_key_id, dimension_key, bucket_index, consumed, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(api_key_id, dimension_key, bucket_index)
       DO UPDATE SET
         consumed = consumed + excluded.consumed,
         updated_at = excluded.updated_at`
    )
    .run(apiKeyId, dimensionKey, bucketIndex, delta, nowMs);
}

/**
 * Read the current and previous bucket values for the sliding window formula:
 *   effective = prev × (1 − elapsed/window) + curr
 *
 * @param apiKeyId      The API key being tracked.
 * @param dimensionKey  "<poolId>:<unit>:<window>" string.
 * @param currentBucket The current bucket index (floor(nowMs / windowMs)).
 * @returns             { curr, prev } — both default to 0 when row is absent.
 */
export function getPair(
  apiKeyId: string,
  dimensionKey: string,
  currentBucket: number
): { curr: number; prev: number } {
  const prevBucket = currentBucket - 1;

  const currRow = getDb()
    .prepare<BucketRow>(
      `SELECT consumed FROM quota_consumption
       WHERE api_key_id = ? AND dimension_key = ? AND bucket_index = ?`
    )
    .get(apiKeyId, dimensionKey, currentBucket);

  const prevRow = getDb()
    .prepare<BucketRow>(
      `SELECT consumed FROM quota_consumption
       WHERE api_key_id = ? AND dimension_key = ? AND bucket_index = ?`
    )
    .get(apiKeyId, dimensionKey, prevBucket);

  return {
    curr: currRow?.consumed ?? 0,
    prev: prevRow?.consumed ?? 0,
  };
}

// ---------------------------------------------------------------------------
// List recent consumption for a pool
// ---------------------------------------------------------------------------

interface ConsumptionRow {
  api_key_id: string;
  dimension_key: string;
  bucket_index: number;
  consumed: number;
  updated_at: number;
}

/**
 * Return the most-recent consumption rows for a given pool, ordered by
 * updated_at DESC. The poolId is the first segment of dimension_key
 * (format "<poolId>:<unit>:<window>"), so we filter with a LIKE prefix.
 *
 * @param poolId  The quota pool identifier.
 * @param limit   Maximum rows to return (caller should clamp; default 50).
 * @returns       Array of ConsumptionEvent (may be empty if no data yet).
 */
export function listConsumptionForPool(poolId: string, limit: number): ConsumptionEvent[] {
  const safeLimit = Math.max(1, Math.min(limit, 500));
  // dimension_key format: "<poolId>:<unit>:<window>"
  // The LIKE pattern uses "%" — escape literal "%" or "_" in poolId defensively.
  const prefix = poolId.replace(/[%_\\]/g, "\\$&") + ":%";
  const rows = getDb()
    .prepare<ConsumptionRow>(
      `SELECT api_key_id, dimension_key, bucket_index, consumed, updated_at
       FROM quota_consumption
       WHERE dimension_key LIKE ? ESCAPE '\\'
       ORDER BY updated_at DESC
       LIMIT ?`
    )
    .all(prefix, safeLimit);

  return rows.map((r) => {
    const parts = r.dimension_key.split(":");
    // parts[0] = poolId, parts[1] = unit, parts[2..] = window (rejoin in case window has colons)
    const unit = parts[1] ?? "";
    const window = parts.slice(2).join(":") ?? "";
    return {
      apiKeyId: r.api_key_id,
      dimensionKey: r.dimension_key,
      unit,
      window,
      bucketIndex: r.bucket_index,
      consumed: r.consumed,
      updatedAt: r.updated_at,
    };
  });
}

// ---------------------------------------------------------------------------
// Pool-wide aggregate
// ---------------------------------------------------------------------------

interface BucketPairRow {
  api_key_id: string;
  curr: number;
  prev: number;
}

/**
 * Sum the consumed values for a given (dimensionKey, currentBucketIndex) and
 * (dimensionKey, currentBucketIndex - 1) across ALL api_key_id values.
 *
 * Returns { currTotal, prevTotal } so the caller can apply the sliding-window
 * formula once with the pool-wide totals instead of summing per-key.
 *
 * @param dimensionKey   "<poolId>:<unit>:<window>" string — same format as consume/peek.
 * @param currentBucket  floor(nowMs / windowMs) — caller must pass the same value.
 */
export function sumPoolDimension(
  dimensionKey: string,
  currentBucket: number
): { currTotal: number; prevTotal: number } {
  const prevBucket = currentBucket - 1;

  interface SumRow {
    total: number;
  }

  const currRow = getDb()
    .prepare<SumRow>(
      `SELECT COALESCE(SUM(consumed), 0) AS total
       FROM quota_consumption
       WHERE dimension_key = ? AND bucket_index = ?`
    )
    .get(dimensionKey, currentBucket);

  const prevRow = getDb()
    .prepare<SumRow>(
      `SELECT COALESCE(SUM(consumed), 0) AS total
       FROM quota_consumption
       WHERE dimension_key = ? AND bucket_index = ?`
    )
    .get(dimensionKey, prevBucket);

  return {
    currTotal: currRow?.total ?? 0,
    prevTotal: prevRow?.total ?? 0,
  };
}

// ---------------------------------------------------------------------------
// GC
// ---------------------------------------------------------------------------

/**
 * Delete rows whose updated_at is strictly less than maxUpdatedAtMs.
 * Used by GC background job to clean up stale bucket rows.
 *
 * Boundary semantics: rows with updated_at === maxUpdatedAtMs are KEPT.
 * Only rows with updated_at < maxUpdatedAtMs (strictly older) are deleted.
 *
 * @param maxUpdatedAtMs Epoch ms threshold (exclusive lower bound for kept rows).
 * @returns              Number of rows deleted.
 */
export function gcOlderThan(maxUpdatedAtMs: number): number {
  const result = getDb()
    .prepare("DELETE FROM quota_consumption WHERE updated_at < ?")
    .run(maxUpdatedAtMs);
  return result.changes;
}
