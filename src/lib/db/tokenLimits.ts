/**
 * Per-API-Key Token Limits — Persistence Layer
 *
 * Enforcement-grade token budgets attachable to an API key, scoped to a
 * specific model, a specific provider, or globally. Complements the USD cost
 * budgets in domainState.ts / src/domain/costRules.ts.
 *
 * Tables (migration 073): api_key_token_limits, api_key_token_counters,
 *                         api_key_token_limit_reset_logs.
 *
 * @module lib/db/tokenLimits
 */

import { randomUUID } from "crypto";
import { getDbInstance } from "./core";
import { getBudgetWindow, type BudgetResetInterval } from "@/domain/costRules";

export type TokenLimitScopeType = "model" | "provider" | "global";

export interface TokenLimit {
  id: string;
  apiKeyId: string;
  scopeType: TokenLimitScopeType;
  scopeValue: string;
  tokenLimit: number;
  resetInterval: BudgetResetInterval;
  resetTime: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertTokenLimitInput {
  id?: string;
  apiKeyId: string;
  scopeType: TokenLimitScopeType;
  scopeValue?: string;
  tokenLimit: number;
  resetInterval?: BudgetResetInterval;
  resetTime?: string;
  enabled?: boolean;
}

export interface TokenWindowState {
  windowStart: string;
  didReset: boolean;
  periodStartAt: number;
  nextResetAt: number;
}

type JsonRecord = Record<string, unknown>;

let _schemaChecked = false;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

function normalizeScopeType(value: unknown): TokenLimitScopeType {
  if (value === "model" || value === "provider" || value === "global") return value;
  return "global";
}

function normalizeResetInterval(value: unknown): BudgetResetInterval {
  if (value === "daily" || value === "weekly" || value === "monthly") return value;
  return "monthly";
}

function ensureSchema() {
  if (_schemaChecked) return;
  const db = getDbInstance();
  db.exec(`
    CREATE TABLE IF NOT EXISTS api_key_token_limits (
      id              TEXT PRIMARY KEY,
      api_key_id      TEXT NOT NULL,
      scope_type      TEXT NOT NULL CHECK (scope_type IN ('model', 'provider', 'global')),
      scope_value     TEXT NOT NULL DEFAULT '',
      token_limit     INTEGER NOT NULL CHECK (token_limit > 0),
      reset_interval  TEXT NOT NULL DEFAULT 'monthly' CHECK (reset_interval IN ('daily', 'weekly', 'monthly')),
      reset_time      TEXT,
      enabled         INTEGER NOT NULL DEFAULT 1,
      created_at      TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at      TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE (api_key_id, scope_type, scope_value)
    );
    CREATE INDEX IF NOT EXISTS idx_aktl_api_key_id ON api_key_token_limits (api_key_id);
    CREATE TABLE IF NOT EXISTS api_key_token_counters (
      limit_id      TEXT NOT NULL,
      window_start  TEXT NOT NULL,
      tokens_used   INTEGER NOT NULL DEFAULT 0,
      updated_at    TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (limit_id, window_start),
      FOREIGN KEY (limit_id) REFERENCES api_key_token_limits (id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS api_key_token_limit_reset_logs (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      limit_id      TEXT NOT NULL,
      reset_at      TEXT NOT NULL DEFAULT (datetime('now')),
      prev_tokens   INTEGER NOT NULL DEFAULT 0,
      window_start  TEXT NOT NULL,
      FOREIGN KEY (limit_id) REFERENCES api_key_token_limits (id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_aktlrl_limit_id ON api_key_token_limit_reset_logs (limit_id);
  `);
  _schemaChecked = true;
}

function rowToTokenLimit(row: unknown): TokenLimit {
  const r = asRecord(row);
  return {
    id: typeof r.id === "string" ? r.id : "",
    apiKeyId: typeof r.api_key_id === "string" ? r.api_key_id : "",
    scopeType: normalizeScopeType(r.scope_type),
    scopeValue: typeof r.scope_value === "string" ? r.scope_value : "",
    tokenLimit: toNumber(r.token_limit),
    resetInterval: normalizeResetInterval(r.reset_interval),
    resetTime: typeof r.reset_time === "string" && r.reset_time ? r.reset_time : "00:00",
    enabled: toNumber(r.enabled, 1) !== 0,
    createdAt: typeof r.created_at === "string" ? r.created_at : "",
    updatedAt: typeof r.updated_at === "string" ? r.updated_at : "",
  };
}

// ──────────────── CRUD ────────────────

/**
 * Insert or update a token limit. Upsert key is (api_key_id, scope_type, scope_value).
 * Returns the persisted row.
 */
export function upsertTokenLimit(input: UpsertTokenLimitInput): TokenLimit {
  ensureSchema();
  const db = getDbInstance();
  const scopeType = normalizeScopeType(input.scopeType);
  const scopeValue = scopeType === "global" ? "" : (input.scopeValue ?? "").trim();
  const resetInterval = normalizeResetInterval(input.resetInterval);
  const resetTime =
    typeof input.resetTime === "string" && input.resetTime ? input.resetTime : "00:00";
  const enabled = input.enabled === false ? 0 : 1;
  const tokenLimit = Math.floor(toNumber(input.tokenLimit));
  const id = input.id && input.id.trim() ? input.id.trim() : randomUUID();

  db.prepare(
    `INSERT INTO api_key_token_limits
       (id, api_key_id, scope_type, scope_value, token_limit, reset_interval, reset_time, enabled, created_at, updated_at)
     VALUES (@id, @apiKeyId, @scopeType, @scopeValue, @tokenLimit, @resetInterval, @resetTime, @enabled, datetime('now'), datetime('now'))
     ON CONFLICT(api_key_id, scope_type, scope_value)
     DO UPDATE SET token_limit    = excluded.token_limit,
                   reset_interval = excluded.reset_interval,
                   reset_time     = excluded.reset_time,
                   enabled        = excluded.enabled,
                   updated_at     = datetime('now')`
  ).run({ id, apiKeyId: input.apiKeyId, scopeType, scopeValue, tokenLimit, resetInterval, resetTime, enabled });

  const row = db
    .prepare(
      "SELECT * FROM api_key_token_limits WHERE api_key_id = ? AND scope_type = ? AND scope_value = ?"
    )
    .get(input.apiKeyId, scopeType, scopeValue);
  return rowToTokenLimit(row);
}

/** List all token limits for an API key (ordered most-specific first: model, provider, global). */
export function listTokenLimits(apiKeyId: string): TokenLimit[] {
  ensureSchema();
  const db = getDbInstance();
  return db
    .prepare(
      `SELECT * FROM api_key_token_limits
       WHERE api_key_id = ?
       ORDER BY CASE scope_type WHEN 'model' THEN 0 WHEN 'provider' THEN 1 ELSE 2 END, scope_value`
    )
    .all(apiKeyId)
    .map(rowToTokenLimit);
}

/**
 * Return the enabled limits that apply to a given request: the model-scoped row
 * (scope_value === model), the provider-scoped row (scope_value === provider),
 * and the global row. Used by the enforcement read.
 */
export function getTokenLimitsForRequest(
  apiKeyId: string,
  provider: string,
  model: string
): TokenLimit[] {
  ensureSchema();
  const db = getDbInstance();
  return db
    .prepare(
      `SELECT * FROM api_key_token_limits
       WHERE api_key_id = @apiKeyId
         AND enabled = 1
         AND (
           (scope_type = 'global')
           OR (scope_type = 'model' AND scope_value = @model)
           OR (scope_type = 'provider' AND scope_value = @provider)
         )`
    )
    .all({ apiKeyId, model: model || "", provider: provider || "" } as JsonRecord)
    .map(rowToTokenLimit);
}

/** Delete a token limit by id (counters + reset logs cascade in app code below). */
export function deleteTokenLimit(id: string): boolean {
  ensureSchema();
  const db = getDbInstance();
  // FK pragma is OFF in this build; delete dependents explicitly.
  db.prepare("DELETE FROM api_key_token_counters WHERE limit_id = ?").run(id);
  db.prepare("DELETE FROM api_key_token_limit_reset_logs WHERE limit_id = ?").run(id);
  const info = db.prepare("DELETE FROM api_key_token_limits WHERE id = ?").run(id);
  return info.changes > 0;
}

// ──────────────── Counters (concurrency-safe under WAL) ────────────────

/**
 * Pure boundary calculator. Resolves the active window for a limit at `now`
 * and reports whether the window has rolled since the limit's last-known window.
 * No DB writes. Window math reused from costRules.getBudgetWindow.
 */
export function resetWindowIfElapsed(limit: TokenLimit, now = Date.now()): TokenWindowState {
  const window = getBudgetWindow(limit.resetInterval, limit.resetTime, now);
  const windowStart = String(window.periodStartAt);
  return {
    windowStart,
    didReset: false, // caller compares against the stored counter row to decide rollover
    periodStartAt: window.periodStartAt,
    nextResetAt: window.nextResetAt,
  };
}

/**
 * Read-only point-read of the current window's usage for a limit.
 * Returns 0 if no counter row exists yet (cold window). DB-authoritative.
 */
export function getWindowUsage(limit: TokenLimit, now = Date.now()): number {
  ensureSchema();
  const db = getDbInstance();
  const { windowStart } = resetWindowIfElapsed(limit, now);
  const row = db
    .prepare(
      "SELECT tokens_used FROM api_key_token_counters WHERE limit_id = ? AND window_start = ?"
    )
    .get(limit.id, windowStart);
  return toNumber(asRecord(row).tokens_used);
}

/**
 * Atomically add `tokens` to the counter for (limitId, windowStart) and return
 * the new running total. Uses UPSERT (no read-then-write) so concurrent
 * increments under WAL cannot lose updates.
 */
export function incrementWindowTokens(
  limitId: string,
  windowStart: string,
  tokens: number
): number {
  ensureSchema();
  const db = getDbInstance();
  const delta = Math.max(0, Math.floor(toNumber(tokens)));
  const row = db
    .prepare(
      `INSERT INTO api_key_token_counters (limit_id, window_start, tokens_used, updated_at)
       VALUES (@limitId, @windowStart, @tokens, datetime('now'))
       ON CONFLICT(limit_id, window_start)
       DO UPDATE SET tokens_used = tokens_used + excluded.tokens_used,
                     updated_at  = datetime('now')
       RETURNING tokens_used`
    )
    .get({ limitId, windowStart, tokens: delta });
  return toNumber(asRecord(row).tokens_used);
}

/** Append a window-reset audit log row. */
export function logTokenLimitReset(
  limitId: string,
  prevTokens: number,
  windowStart: string
): void {
  ensureSchema();
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO api_key_token_limit_reset_logs (limit_id, reset_at, prev_tokens, window_start)
     VALUES (?, datetime('now'), ?, ?)`
  ).run(limitId, Math.max(0, Math.floor(toNumber(prevTokens))), windowStart);
}
