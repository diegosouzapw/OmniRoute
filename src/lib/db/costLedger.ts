/**
 * db/costLedger.ts — Per-request cost ledger (RIC-741 / M3 D2).
 *
 * The `request_cost_ledger` table stores one row per completed call with the
 * full cost breakdown (provider / model / token counts / unit prices /
 * computed amount), so every request is traceable to a USD figure without
 * re-aggregating usage_history through pricing on every read.
 *
 * KISS: the ledger is a single-writer append-only table. Writes go through
 * {@link recordLedgerEntry} (batched inside the caller where needed); reads are
 * plain SUM/COUNT aggregations over a time window.
 *
 * @module db/costLedger
 */

import { getDbInstance } from "./core";
import { toNumber } from "@/shared/utils/numeric";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CostLedgerEntry {
  apiKeyId: string;
  provider: string;
  model: string;
  tokensInput?: number;
  tokensOutput?: number;
  tokensCacheRead?: number;
  tokensCacheCreation?: number;
  tokensReasoning?: number;
  unitPriceInput?: number;
  unitPriceOutput?: number;
  amountUsd: number;
  serviceTier?: string;
  success?: boolean;
  timestamp?: string;
  requestId?: string | null;
}

export interface LedgerAggregate {
  amountUsd: number;
  requestCount: number;
}

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonNegative(value: unknown): number {
  return Math.max(0, toNumber(value));
}

// ---------------------------------------------------------------------------
// Write path
// ---------------------------------------------------------------------------

/**
 * Insert a single cost-ledger row. Fire-and-forget callers should use
 * {@link recordLedgerEntrySafe} so a ledger failure never crashes the request.
 */
export function recordLedgerEntry(entry: CostLedgerEntry): void {
  if (!entry?.apiKeyId) return;
  const db = getDbInstance();
  db.prepare(
    `
    INSERT INTO request_cost_ledger (
      api_key_id, provider, model,
      tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation, tokens_reasoning,
      unit_price_input, unit_price_output, amount_usd,
      service_tier, success, timestamp, request_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
  ).run(
    entry.apiKeyId,
    entry.provider || "unknown",
    entry.model || "unknown",
    toNonNegative(entry.tokensInput),
    toNonNegative(entry.tokensOutput),
    toNonNegative(entry.tokensCacheRead),
    toNonNegative(entry.tokensCacheCreation),
    toNonNegative(entry.tokensReasoning),
    toNonNegative(entry.unitPriceInput),
    toNonNegative(entry.unitPriceOutput),
    toNonNegative(entry.amountUsd),
    entry.serviceTier || "standard",
    entry.success === false ? 0 : 1,
    entry.timestamp || new Date().toISOString(),
    entry.requestId ?? null
  );
}

/**
 * Best-effort variant for hot-path callers: never throws, so a ledger hiccup
 * can never block an LLM response. Mirrors recordCost's swallow-and-log.
 */
export function recordLedgerEntrySafe(entry: CostLedgerEntry): void {
  try {
    recordLedgerEntry(entry);
  } catch (error) {
    console.error("[CostLedger] Failed to record ledger entry:", error);
  }
}

/**
 * Batch-insert ledger rows inside one transaction (used by flush paths).
 */
export function recordLedgerEntries(entries: CostLedgerEntry[]): void {
  if (!Array.isArray(entries) || entries.length === 0) return;
  const db = getDbInstance();
  const stmt = db.prepare(
    `
    INSERT INTO request_cost_ledger (
      api_key_id, provider, model,
      tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation, tokens_reasoning,
      unit_price_input, unit_price_output, amount_usd,
      service_tier, success, timestamp, request_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
  );
  const tx = db.transaction((rows: CostLedgerEntry[]) => {
    for (const entry of rows) {
      if (!entry?.apiKeyId) continue;
      stmt.run(
        entry.apiKeyId,
        entry.provider || "unknown",
        entry.model || "unknown",
        toNonNegative(entry.tokensInput),
        toNonNegative(entry.tokensOutput),
        toNonNegative(entry.tokensCacheRead),
        toNonNegative(entry.tokensCacheCreation),
        toNonNegative(entry.tokensReasoning),
        toNonNegative(entry.unitPriceInput),
        toNonNegative(entry.unitPriceOutput),
        toNonNegative(entry.amountUsd),
        entry.serviceTier || "standard",
        entry.success === false ? 0 : 1,
        entry.timestamp || new Date().toISOString(),
        entry.requestId ?? null
      );
    }
  });
  tx(entries);
}

// ---------------------------------------------------------------------------
// Read path
// ---------------------------------------------------------------------------

function getAggRow(row: unknown): LedgerAggregate {
  const r = asRecord(row);
  return {
    amountUsd: toNumber(r.amount_usd ?? r.totalUsd),
    requestCount: toNumber(r.request_count ?? r.cnt),
  };
}

/**
 * Sum ledger amount (in USD) and count rows for an api key since an ISO
 * timestamp. `whereClause` is trusted internal SQL appended after `WHERE
 * api_key_id = ?` — callers must only pass fixed fragments, never user input.
 */
export function aggregateLedger(
  apiKeyId: string,
  sinceIso: string,
  opts: { successOnly?: boolean } = {}
): LedgerAggregate {
  if (!apiKeyId) return { amountUsd: 0, requestCount: 0 };
  const successClause = opts.successOnly === true ? " AND success = 1" : "";
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT
         COALESCE(SUM(amount_usd), 0) AS amount_usd,
         COUNT(*) AS request_count
       FROM request_cost_ledger
       WHERE api_key_id = ? AND timestamp >= ?${successClause}`
    )
    .get(apiKeyId, sinceIso);
  return getAggRow(row);
}

/**
 * Return ledger rows for an api key within a window (descending timestamp).
 * Used by tests and future dashboard surfaces. `limit` is clamped to 500.
 */
export function listLedgerEntries(
  apiKeyId: string,
  opts: { sinceIso?: string; limit?: number } = {}
): CostLedgerEntry[] {
  if (!apiKeyId) return [];
  const limit = Math.max(1, Math.min(opts.limit ?? 100, 500));
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT *
       FROM request_cost_ledger
       WHERE api_key_id = ?
         ${opts.sinceIso ? "AND timestamp >= ?" : ""}
       ORDER BY timestamp DESC
       LIMIT ?`
    )
    .all(apiKeyId, ...(opts.sinceIso ? [opts.sinceIso] : []), limit) as unknown as Array<
    Record<string, unknown>
  >;

  return rows.map((r) => {
    const row = asRecord(r);
    return {
      apiKeyId,
      provider: typeof row.provider === "string" ? row.provider : "",
      model: typeof row.model === "string" ? row.model : "",
      tokensInput: toNumber(row.tokens_input),
      tokensOutput: toNumber(row.tokens_output),
      tokensCacheRead: toNumber(row.tokens_cache_read),
      tokensCacheCreation: toNumber(row.tokens_cache_creation),
      tokensReasoning: toNumber(row.tokens_reasoning),
      unitPriceInput: toNumber(row.unit_price_input),
      unitPriceOutput: toNumber(row.unit_price_output),
      amountUsd: toNumber(row.amount_usd),
      serviceTier: typeof row.service_tier === "string" ? row.service_tier : "standard",
      success: toNumber(row.success) !== 0,
      timestamp: typeof row.timestamp === "string" ? row.timestamp : "",
      requestId: typeof row.request_id === "string" ? row.request_id : null,
    } satisfies CostLedgerEntry;
  });
}

/**
 * Total ledger spend for an api key within the current calendar month (ISO
 * month window). Used by the monthly-amount quota check so the counter does not
 * need its own window bookkeeping — the ledger IS the counter.
 */
export function aggregateLedgerThisMonth(apiKeyId: string, nowIso?: string): LedgerAggregate {
  const now = nowIso ? new Date(nowIso) : new Date();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
  return aggregateLedger(apiKeyId, monthStart, { successOnly: true });
}
