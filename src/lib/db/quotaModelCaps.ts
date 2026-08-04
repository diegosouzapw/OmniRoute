/**
 * db/quotaModelCaps.ts — CRUD for quota_allocation_model_caps table.
 *
 * Per-(pool_id, api_key_id, model) budget caps for the Quota Share Engine.
 * Closes the "one key drains the pool on a single model" attack (Fase 3 #7).
 *
 * cap_unit aligns with QuotaUnit: "requests" | "tokens" | "usd" | "percent".
 * cap_value of ≤ Number.EPSILON is treated as a placeholder by the enforce
 * layer (not enforced), consistent with the planRegistry EPSILON convention.
 *
 * All SQL goes through prepared statements — never raw string interpolation
 * (Hard Rule #5).
 */

import { getDbInstance } from "./core";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type QuotaUnit = "percent" | "requests" | "tokens" | "usd";

export interface ModelCap {
  poolId: string;
  apiKeyId: string;
  model: string;
  capValue: number;
  capUnit: QuotaUnit;
}

interface ModelCapRow {
  pool_id: string;
  api_key_id: string;
  model: string;
  cap_value: number;
  cap_unit: string;
}

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

function rowToModelCap(row: ModelCapRow): ModelCap {
  return {
    poolId: row.pool_id,
    apiKeyId: row.api_key_id,
    model: row.model,
    capValue: row.cap_value,
    capUnit: row.cap_unit as QuotaUnit,
  };
}

function getDb(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Retrieve the cap for a specific (pool, key, model) triple.
 * Returns null if no cap is configured.
 */
export function getModelCap(poolId: string, apiKeyId: string, model: string): ModelCap | null {
  const row = getDb()
    .prepare<ModelCapRow>(
      `SELECT pool_id, api_key_id, model, cap_value, cap_unit
       FROM quota_allocation_model_caps
       WHERE pool_id = ? AND api_key_id = ? AND model = ?`
    )
    .get(poolId, apiKeyId, model);
  return row ? rowToModelCap(row) : null;
}

/**
 * List all model caps for a given (pool, key) pair.
 */
export function listModelCaps(poolId: string, apiKeyId: string): ModelCap[] {
  const rows = getDb()
    .prepare<ModelCapRow>(
      `SELECT pool_id, api_key_id, model, cap_value, cap_unit
       FROM quota_allocation_model_caps
       WHERE pool_id = ? AND api_key_id = ?`
    )
    .all(poolId, apiKeyId);
  return rows.map(rowToModelCap);
}

/**
 * Insert or replace a model cap.
 * cap_value must be > 0 (enforced by DB CHECK constraint).
 */
export function setModelCap(cap: ModelCap): void {
  getDb()
    .prepare(
      `INSERT INTO quota_allocation_model_caps
         (pool_id, api_key_id, model, cap_value, cap_unit)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(pool_id, api_key_id, model) DO UPDATE SET
         cap_value = excluded.cap_value,
         cap_unit  = excluded.cap_unit`
    )
    .run(cap.poolId, cap.apiKeyId, cap.model, cap.capValue, cap.capUnit);
}

/**
 * Remove the cap for a specific (pool, key, model) triple.
 * No-op if it does not exist.
 */
export function deleteModelCap(poolId: string, apiKeyId: string, model: string): void {
  getDb()
    .prepare(
      `DELETE FROM quota_allocation_model_caps
       WHERE pool_id = ? AND api_key_id = ? AND model = ?`
    )
    .run(poolId, apiKeyId, model);
}
