/**
 * Prompt-cache health — turns the raw cache columns of `call_logs` into a
 * summary an operator can act on.
 *
 * Why this exists: a production diagnosis on 2026-07-27 showed the aggregate
 * ratio is close to useless on its own. The window read 24.8M cached tokens and
 * wrote 9.5M (`write/read = 0.385`) — mediocre-looking but unremarkable. The
 * real story was the CONCENTRATION: 18% of the calls carried 94% of the write,
 * while the median call wrote 848 tokens. Two models in the same window sat at
 * 0.13 (Sonnet) and 0.51 (Opus).
 *
 * So the summary reports three things the average hides:
 *   - the distribution (p50/p90/p99), because the median being cheap is exactly
 *     what makes the tail invisible;
 *   - the concentration (how few calls carry how much of the write), which is
 *     what tells you whether to chase a pattern or accept the cost;
 *   - the per-model split, because a healthy model averages away a sick one.
 */

import { getDbInstance } from "@/lib/db/core";
import type { UtilizationTimeRange } from "@/shared/types/utilization";

/** One `call_logs` row, already narrowed to the cache columns. Both counters are nullable in the schema. */
export interface CacheHealthRow {
  model: string;
  cacheRead: number | null;
  cacheCreation: number | null;
  timestamp: string;
}

export interface CacheHealthModelSummary {
  model: string;
  calls: number;
  cacheReadTotal: number;
  cacheWriteTotal: number;
  writeReadRatio: number;
  heavyWriteCalls: number;
}

export type CacheHealthVerdict = "healthy" | "degraded" | "thrash" | "no-data";

export interface CacheHealthSummary {
  totalCalls: number;
  cacheReadTotal: number;
  cacheWriteTotal: number;
  /** `write / max(read, 1)`. Below ~0.2 is a warm loop; above 1 the prefix is being repaid. */
  writeReadRatio: number;
  /** Read something and read at least as much as it wrote — the loop is working. */
  warmCalls: number;
  /** Wrote without reading: a genuinely new prefix (first turn, or the cache expired). */
  coldCalls: number;
  /** Read, but rewrote more than it read — the prefix moved under it. */
  rewriteCalls: number;
  /** Neither read nor wrote: this route simply does not cache. Not a fault. */
  uncachedCalls: number;
  writeP50: number;
  writeP90: number;
  writeP99: number;
  writeMax: number;
  /** Calls whose write is an outlier for THIS window (see `heavyWriteThreshold`). */
  heavyWriteCalls: number;
  heavyWriteCallShare: number;
  /** Share of all written tokens those few calls account for. This is the number that matters. */
  heavyWriteTokenShare: number;
  heavyWriteThreshold: number;
  verdict: CacheHealthVerdict;
  byModel: CacheHealthModelSummary[];
}

/**
 * Anthropic pads cache-creation up to a 1024-token minimum (see the note on
 * issue #2215 in `claude-to-openai.ts`), so a write below that carries no
 * signal — it is the floor, not a decision. Used as the lower bound of the
 * outlier threshold so a window of tiny conversations cannot make everything
 * look "heavy".
 */
const MIN_MEANINGFUL_WRITE = 1024;

/**
 * How many times the median a write must be to count as an outlier. Relative on
 * purpose: a fixed cutoff tuned for 130k-token conversations reports nothing at
 * all on 2k-token ones, and the whole point is to find the tail of whatever
 * window the operator is looking at.
 */
const HEAVY_WRITE_MEDIAN_FACTOR = 10;

const num = (v: number | null | undefined): number =>
  typeof v === "number" && Number.isFinite(v) && v > 0 ? v : 0;

/** Nearest-rank percentile over an ascending array. */
function percentile(sortedAsc: number[], p: number): number {
  if (sortedAsc.length === 0) return 0;
  const idx = Math.min(sortedAsc.length - 1, Math.floor(sortedAsc.length * p));
  return sortedAsc[idx];
}

function ratio(write: number, read: number): number {
  // max(read, 1) keeps this JSON-safe: a window that only ever wrote would divide
  // by zero, and Infinity does not survive JSON.stringify.
  return write / Math.max(read, 1);
}

export function summarizeCacheHealth(rows: CacheHealthRow[]): CacheHealthSummary {
  const empty: CacheHealthSummary = {
    totalCalls: 0,
    cacheReadTotal: 0,
    cacheWriteTotal: 0,
    writeReadRatio: 0,
    warmCalls: 0,
    coldCalls: 0,
    rewriteCalls: 0,
    uncachedCalls: 0,
    writeP50: 0,
    writeP90: 0,
    writeP99: 0,
    writeMax: 0,
    heavyWriteCalls: 0,
    heavyWriteCallShare: 0,
    heavyWriteTokenShare: 0,
    heavyWriteThreshold: 0,
    verdict: "no-data",
    byModel: [],
  };
  if (rows.length === 0) return empty;

  let readTotal = 0;
  let writeTotal = 0;
  let warm = 0;
  let cold = 0;
  let rewrite = 0;
  let uncached = 0;
  const writes: number[] = [];
  const perModel = new Map<string, { calls: number; read: number; write: number; heavy: number }>();

  for (const r of rows) {
    const read = num(r.cacheRead);
    const write = num(r.cacheCreation);
    readTotal += read;
    writeTotal += write;
    writes.push(write);

    if (read === 0 && write === 0) uncached++;
    else if (read === 0) cold++;
    else if (read >= write) warm++;
    else rewrite++;

    const key = r.model || "unknown";
    const m = perModel.get(key) || { calls: 0, read: 0, write: 0, heavy: 0 };
    m.calls++;
    m.read += read;
    m.write += write;
    perModel.set(key, m);
  }

  const sorted = [...writes].sort((a, b) => a - b);
  const median = percentile(sorted, 0.5);
  const heavyWriteThreshold = Math.max(median * HEAVY_WRITE_MEDIAN_FACTOR, MIN_MEANINGFUL_WRITE);

  let heavyCalls = 0;
  let heavyTokens = 0;
  for (const r of rows) {
    const write = num(r.cacheCreation);
    if (write <= heavyWriteThreshold) continue;
    heavyCalls++;
    heavyTokens += write;
    const m = perModel.get(r.model || "unknown");
    if (m) m.heavy++;
  }

  // Only calls that touched the cache at all get a say in the verdict — a route
  // that never caches is an absence of caching, not a sick cache.
  const cacheTouching = warm + cold + rewrite;
  const warmShare = cacheTouching > 0 ? warm / cacheTouching : 1;
  const verdict: CacheHealthVerdict =
    warmShare >= 0.6 ? "healthy" : warmShare >= 0.3 ? "degraded" : "thrash";

  const byModel: CacheHealthModelSummary[] = [...perModel.entries()]
    .map(([model, m]) => ({
      model,
      calls: m.calls,
      cacheReadTotal: m.read,
      cacheWriteTotal: m.write,
      writeReadRatio: ratio(m.write, m.read),
      heavyWriteCalls: m.heavy,
    }))
    .sort((a, b) => b.writeReadRatio - a.writeReadRatio || b.cacheWriteTotal - a.cacheWriteTotal);

  return {
    totalCalls: rows.length,
    cacheReadTotal: readTotal,
    cacheWriteTotal: writeTotal,
    writeReadRatio: ratio(writeTotal, readTotal),
    warmCalls: warm,
    coldCalls: cold,
    rewriteCalls: rewrite,
    uncachedCalls: uncached,
    writeP50: median,
    writeP90: percentile(sorted, 0.9),
    writeP99: percentile(sorted, 0.99),
    writeMax: sorted[sorted.length - 1] ?? 0,
    heavyWriteCalls: heavyCalls,
    heavyWriteCallShare: heavyCalls / rows.length,
    heavyWriteTokenShare: writeTotal > 0 ? heavyTokens / writeTotal : 0,
    heavyWriteThreshold,
    verdict,
    byModel,
  };
}

const RANGE_MS: Record<UtilizationTimeRange, number> = {
  "1h": 60 * 60 * 1000,
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

/**
 * Cap on rows pulled into memory for one summary. A busy box logs thousands of
 * calls a day; the summary is statistical, so the newest N is representative
 * and bounded. `truncated` in the response tells the caller when this bit.
 */
const MAX_ROWS = 5000;

type CacheHealthDbRow = {
  model: string | null;
  requested_model: string | null;
  tokens_cache_read: number | null;
  tokens_cache_creation: number | null;
  timestamp: string | null;
};

export interface CacheHealthResponse extends CacheHealthSummary {
  timeRange: UtilizationTimeRange;
  since: string;
  /** True when the window held more calls than `MAX_ROWS` and only the newest were summarized. */
  truncated: boolean;
}

/**
 * Reads the cache columns of `call_logs` for the window and summarizes them.
 *
 * Only successful calls count: a 4xx/5xx never reached the provider cache, so
 * including them would dilute the ratio with requests that never had a chance
 * to hit. Rows where both counters are NULL are excluded at the SQL level —
 * those pre-date cache accounting and would show up as fake "uncached" calls.
 */
export function buildCacheHealthResponse(opts: {
  range: UtilizationTimeRange;
  model?: string;
  now?: number;
}): CacheHealthResponse {
  const since = new Date((opts.now ?? Date.now()) - RANGE_MS[opts.range]).toISOString();
  const db = getDbInstance();

  const params: (string | number)[] = [since];
  let modelFilter = "";
  if (opts.model) {
    modelFilter = " AND (model = ? OR requested_model = ?)";
    params.push(opts.model, opts.model);
  }
  params.push(MAX_ROWS + 1);

  const rows = db
    .prepare(
      `SELECT model, requested_model, tokens_cache_read, tokens_cache_creation, timestamp
         FROM call_logs
        WHERE timestamp >= ?
          AND status = 200
          AND (tokens_cache_read IS NOT NULL OR tokens_cache_creation IS NOT NULL)
          ${modelFilter}
        ORDER BY timestamp DESC
        LIMIT ?`
    )
    .all(...params) as CacheHealthDbRow[];

  const truncated = rows.length > MAX_ROWS;
  const summary = summarizeCacheHealth(
    rows.slice(0, MAX_ROWS).map((r) => ({
      // requested_model carries the alias the caller actually asked for
      // (e.g. a quota-share `qtSd/...` id); model is what the upstream saw.
      // The alias is the useful grouping key for an operator.
      model: r.requested_model || r.model || "unknown",
      cacheRead: r.tokens_cache_read,
      cacheCreation: r.tokens_cache_creation,
      timestamp: r.timestamp || "",
    }))
  );

  return { ...summary, timeRange: opts.range, since, truncated };
}
