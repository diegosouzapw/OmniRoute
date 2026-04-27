/**
 * db/core.js — Database infrastructure: schema, singleton, utils, migration.
 *
 * All domain modules import `getDbInstance` and helpers from here.
 */

import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { resolveDataDir, getLegacyDotDataDir } from "../dataPaths";
import { runMigrations } from "./migrationRunner";
import { runDbHealthCheck } from "./healthCheck";
import { parseStoredPayload } from "../logPayloads";
import {
  buildArtifactRelativePath,
  writeCallArtifact,
  type CallLogArtifact,
} from "../usage/callLogArtifacts";

type SqliteDatabase = import("better-sqlite3").Database;
type JsonRecord = Record<string, unknown>;
type CheckpointMode = "PASSIVE" | "FULL" | "RESTART" | "TRUNCATE";
type PreservedTableSnapshot = {
  table: string;
  rowCount: number;
  maxRows: number;
  columns: string[];
  rows: JsonRecord[];
};
type SkippedTableSnapshot = {
  table: string;
  rowCount: number;
  maxRows: number;
  reason: string;
};
type PreservedCriticalDbState = {
  captureSucceeded: boolean;
  captureError: string | null;
  preservedTables: PreservedTableSnapshot[];
  skippedTables: SkippedTableSnapshot[];
};
type CriticalTableSpec = {
  table: string;
  maxRows?: number;
  readRows?: (db: SqliteDatabase) => JsonRecord[];
};

// ──────────────── Environment Detection ────────────────

export const isCloud = typeof globalThis.caches === "object" && globalThis.caches !== null;

export const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

// ──────────────── Paths ────────────────

export const DATA_DIR = resolveDataDir({ isCloud });
const LEGACY_DATA_DIR = isCloud ? null : getLegacyDotDataDir();
export const SQLITE_FILE = isCloud ? null : path.join(DATA_DIR, "storage.sqlite");
const JSON_DB_FILE = isCloud ? null : path.join(DATA_DIR, "db.json");
export const DB_BACKUPS_DIR = isCloud ? null : path.join(DATA_DIR, "db_backups");
const DEFAULT_CRITICAL_TABLE_ROW_LIMIT = 10_000;
const SKIP_PRESERVE_NAMESPACES = new Set(["syncedAvailableModels", "providerLimitsCache", "lkgp"]);
const CRITICAL_DB_TABLES: CriticalTableSpec[] = [
  {
    table: "key_value",
    maxRows: 10_000,
    readRows(db) {
      return (
        (db.prepare("SELECT namespace, key, value FROM key_value").all() as JsonRecord[]) ?? []
      ).filter(
        (row) => typeof row.namespace !== "string" || !SKIP_PRESERVE_NAMESPACES.has(row.namespace)
      );
    },
  },
  { table: "provider_connections", maxRows: 5_000 },
  { table: "provider_nodes", maxRows: 5_000 },
  { table: "combos", maxRows: 5_000 },
  { table: "api_keys", maxRows: 5_000 },
  { table: "proxy_registry", maxRows: 5_000 },
  { table: "proxy_assignments", maxRows: 10_000 },
  { table: "model_combo_mappings", maxRows: 5_000 },
  { table: "sync_tokens", maxRows: 5_000 },
  { table: "registered_keys", maxRows: 10_000 },
  { table: "provider_key_limits", maxRows: 10_000 },
  { table: "account_key_limits", maxRows: 10_000 },
  { table: "upstream_proxy_config", maxRows: 5_000 },
  { table: "webhooks", maxRows: 5_000 },
];

// Ensure data directory exists — with fallback for restricted home directories (#133)
if (!isCloud && !fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(
      `[DB] Cannot create data directory '${DATA_DIR}': ${msg}\n` +
        `[DB] Set the DATA_DIR environment variable to a writable path, e.g.:\n` +
        `[DB]   DATA_DIR=/path/to/writable/dir omniroute`
    );
  }
}

// ──────────────── Schema ────────────────

const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS provider_connections (
    id TEXT PRIMARY KEY,
    provider TEXT NOT NULL,
    auth_type TEXT,
    name TEXT,
    email TEXT,
    priority INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TEXT,
    token_expires_at TEXT,
    scope TEXT,
    project_id TEXT,
    test_status TEXT,
    error_code TEXT,
    last_error TEXT,
    last_error_at TEXT,
    last_error_type TEXT,
    last_error_source TEXT,
    backoff_level INTEGER DEFAULT 0,
    rate_limited_until TEXT,
    health_check_interval INTEGER,
    last_health_check_at TEXT,
    last_tested TEXT,
    api_key TEXT,
    id_token TEXT,
    provider_specific_data TEXT,
    expires_in INTEGER,
    display_name TEXT,
    global_priority INTEGER,
    default_model TEXT,
    token_type TEXT,
    consecutive_use_count INTEGER DEFAULT 0,
    rate_limit_protection INTEGER DEFAULT 0,
    last_used_at TEXT,
    "group" TEXT,
    max_concurrent INTEGER,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_pc_provider ON provider_connections(provider);
  CREATE INDEX IF NOT EXISTS idx_pc_active ON provider_connections(is_active);
  CREATE INDEX IF NOT EXISTS idx_pc_priority ON provider_connections(provider, priority);

  CREATE TABLE IF NOT EXISTS provider_nodes (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    prefix TEXT,
    api_type TEXT,
    base_url TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS key_value (
    namespace TEXT NOT NULL,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    PRIMARY KEY (namespace, key)
  );

  CREATE TABLE IF NOT EXISTS combos (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    data TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS api_keys (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    key TEXT NOT NULL UNIQUE,
    machine_id TEXT,
    allowed_models TEXT DEFAULT '[]',
    no_log INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_ak_key ON api_keys(key);

  CREATE TABLE IF NOT EXISTS db_meta (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS usage_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    provider TEXT,
    model TEXT,
    connection_id TEXT,
    api_key_id TEXT,
    api_key_name TEXT,
    tokens_input INTEGER DEFAULT 0,
    tokens_output INTEGER DEFAULT 0,
    tokens_cache_read INTEGER DEFAULT 0,
    tokens_cache_creation INTEGER DEFAULT 0,
    tokens_reasoning INTEGER DEFAULT 0,
    status TEXT,
    success INTEGER DEFAULT 1,
    latency_ms INTEGER DEFAULT 0,
    ttft_ms INTEGER DEFAULT 0,
    error_code TEXT,
    timestamp TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_uh_timestamp ON usage_history(timestamp);
  CREATE INDEX IF NOT EXISTS idx_uh_provider ON usage_history(provider);
  CREATE INDEX IF NOT EXISTS idx_uh_model ON usage_history(model);

  CREATE TABLE IF NOT EXISTS call_logs (
    id TEXT PRIMARY KEY,
    timestamp TEXT NOT NULL,
    method TEXT,
    path TEXT,
    status INTEGER,
    model TEXT,
    requested_model TEXT,
    provider TEXT,
    account TEXT,
    connection_id TEXT,
    duration INTEGER DEFAULT 0,
    tokens_in INTEGER DEFAULT 0,
    tokens_out INTEGER DEFAULT 0,
    tokens_cache_read INTEGER DEFAULT NULL,
    tokens_cache_creation INTEGER DEFAULT NULL,
    tokens_reasoning INTEGER DEFAULT NULL,
    cache_source TEXT DEFAULT "upstream",
    request_type TEXT,
    source_format TEXT,
    target_format TEXT,
    api_key_id TEXT,
    api_key_name TEXT,
    combo_name TEXT,
    combo_step_id TEXT,
    combo_execution_key TEXT,
    error_summary TEXT,
    detail_state TEXT DEFAULT 'none',
    artifact_relpath TEXT,
    artifact_size_bytes INTEGER DEFAULT NULL,
    artifact_sha256 TEXT DEFAULT NULL,
    has_request_body INTEGER DEFAULT 0,
    has_response_body INTEGER DEFAULT 0,
    has_pipeline_details INTEGER DEFAULT 0,
    request_summary TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_cl_timestamp ON call_logs(timestamp);
  CREATE INDEX IF NOT EXISTS idx_cl_status ON call_logs(status);

  CREATE TABLE IF NOT EXISTS proxy_logs (
    id TEXT PRIMARY KEY,
    timestamp TEXT NOT NULL,
    status TEXT,
    proxy_type TEXT,
    proxy_host TEXT,
    proxy_port INTEGER,
    level TEXT,
    level_id TEXT,
    provider TEXT,
    target_url TEXT,
    public_ip TEXT,
    latency_ms INTEGER DEFAULT 0,
    error TEXT,
    connection_id TEXT,
    combo_id TEXT,
    account TEXT,
    tls_fingerprint INTEGER DEFAULT 0
  );
  CREATE INDEX IF NOT EXISTS idx_pl_timestamp ON proxy_logs(timestamp);
  CREATE INDEX IF NOT EXISTS idx_pl_status ON proxy_logs(status);
  CREATE INDEX IF NOT EXISTS idx_pl_provider ON proxy_logs(provider);

  -- Domain State Persistence (Phase 5)
  CREATE TABLE IF NOT EXISTS domain_fallback_chains (
    model TEXT PRIMARY KEY,
    chain TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS domain_budgets (
    api_key_id TEXT PRIMARY KEY,
    daily_limit_usd REAL NOT NULL,
    weekly_limit_usd REAL DEFAULT 0,
    monthly_limit_usd REAL DEFAULT 0,
    warning_threshold REAL DEFAULT 0.8,
    reset_interval TEXT DEFAULT 'daily',
    reset_time TEXT DEFAULT '00:00',
    budget_reset_at INTEGER,
    last_budget_reset_at INTEGER,
    warning_emitted_at INTEGER,
    warning_period_start INTEGER
  );

  CREATE TABLE IF NOT EXISTS domain_budget_reset_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    api_key_id TEXT NOT NULL,
    reset_interval TEXT NOT NULL,
    previous_spend REAL NOT NULL DEFAULT 0,
    reset_at INTEGER NOT NULL,
    next_reset_at INTEGER NOT NULL,
    period_start INTEGER NOT NULL,
    period_end INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_dbrl_key_reset ON domain_budget_reset_logs(api_key_id, reset_at DESC);

  CREATE TABLE IF NOT EXISTS domain_cost_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    api_key_id TEXT NOT NULL,
    cost REAL NOT NULL,
    timestamp INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_dch_key ON domain_cost_history(api_key_id);
  CREATE INDEX IF NOT EXISTS idx_dch_ts ON domain_cost_history(timestamp);

  CREATE TABLE IF NOT EXISTS domain_lockout_state (
    identifier TEXT PRIMARY KEY,
    attempts TEXT NOT NULL,
    locked_until INTEGER
  );

  CREATE TABLE IF NOT EXISTS domain_circuit_breakers (
    name TEXT PRIMARY KEY,
    state TEXT NOT NULL DEFAULT 'CLOSED',
    failure_count INTEGER DEFAULT 0,
    last_failure_time INTEGER,
    options TEXT
  );

  CREATE TABLE IF NOT EXISTS semantic_cache (
    id TEXT PRIMARY KEY,
    signature TEXT NOT NULL UNIQUE,
    model TEXT NOT NULL,
    prompt_hash TEXT NOT NULL,
    response TEXT NOT NULL,
    tokens_saved INTEGER DEFAULT 0,
    hit_count INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_sc_sig ON semantic_cache(signature);
  CREATE INDEX IF NOT EXISTS idx_sc_model ON semantic_cache(model);
`;

// ──────────────── Column Mapping ────────────────

export function toSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_: string, c: string) => c.toUpperCase());
}

export function objToSnake(obj: unknown): unknown {
  if (!obj || typeof obj !== "object") return obj;
  const result: JsonRecord = {};
  for (const [k, v] of Object.entries(obj as JsonRecord)) {
    result[toSnakeCase(k)] = v;
  }
  return result;
}

export function rowToCamel(row: unknown): JsonRecord | null {
  if (!row) return null;
  const result: JsonRecord = {};
  for (const [k, v] of Object.entries(row as JsonRecord)) {
    const camelKey = toCamelCase(k);
    if (camelKey === "isActive" || camelKey === "rateLimitProtection") {
      result[camelKey] = v === 1 || v === true;
    } else if (camelKey === "providerSpecificData" && typeof v === "string") {
      try {
        result[camelKey] = JSON.parse(v);
      } catch {
        result[camelKey] = v;
      }
    } else {
      result[camelKey] = v;
    }
  }
  return result;
}

export function cleanNulls(obj: unknown): JsonRecord {
  const result: JsonRecord = {};
  for (const [k, v] of Object.entries((obj as JsonRecord) || {})) {
    if (v !== null && v !== undefined) {
      result[k] = v;
    }
  }
  return result;
}

// ──────────────── Singleton DB Instance ────────────────
// Use globalThis to survive Next.js dev HMR module re-evaluation.
// Module-level `let` resets on every webpack recompile, causing connection leaks.

declare global {
  var __omnirouteDb: import("better-sqlite3").Database | undefined;
}

function getDb(): SqliteDatabase | null {
  return globalThis.__omnirouteDb ?? null;
}

function setDb(db: SqliteDatabase | null): void {
  if (db) {
    globalThis.__omnirouteDb = db;
  } else {
    delete globalThis.__omnirouteDb;
  }
}

function checkpointDb(db: SqliteDatabase, mode: CheckpointMode = "TRUNCATE"): boolean {
  if (isCloud || isBuildPhase || !SQLITE_FILE) return false;
  db.pragma(`wal_checkpoint(${mode})`);
  return true;
}

function ensureProviderConnectionsColumns(db: SqliteDatabase) {
  try {
    const columns = db.prepare("PRAGMA table_info(provider_connections)").all() as Array<{
      name?: string;
    }>;
    const columnNames = new Set(columns.map((column) => String(column.name ?? "")));
    if (!columnNames.has("rate_limit_protection")) {
      db.exec(
        "ALTER TABLE provider_connections ADD COLUMN rate_limit_protection INTEGER DEFAULT 0"
      );
      console.log("[DB] Added provider_connections.rate_limit_protection column");
    }
    if (!columnNames.has("last_used_at")) {
      db.exec("ALTER TABLE provider_connections ADD COLUMN last_used_at TEXT");
      console.log("[DB] Added provider_connections.last_used_at column");
    }
    if (!columnNames.has("group")) {
      db.exec('ALTER TABLE provider_connections ADD COLUMN "group" TEXT');
      console.log('[DB] Added provider_connections."group" column');
    }
    if (!columnNames.has("max_concurrent")) {
      db.exec("ALTER TABLE provider_connections ADD COLUMN max_concurrent INTEGER");
      console.log("[DB] Added provider_connections.max_concurrent column");
    }
    db.exec(
      "CREATE INDEX IF NOT EXISTS idx_pc_max_concurrent ON provider_connections(provider, max_concurrent)"
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[DB] Failed to verify provider_connections schema:", message);
  }
}

function ensureUsageHistoryColumns(db: SqliteDatabase) {
  try {
    const columns = db.prepare("PRAGMA table_info(usage_history)").all() as Array<{
      name?: string;
    }>;
    const columnNames = new Set(columns.map((column) => String(column.name ?? "")));

    if (!columnNames.has("success")) {
      db.exec("ALTER TABLE usage_history ADD COLUMN success INTEGER DEFAULT 1");
      console.log("[DB] Added usage_history.success column");
    }
    if (!columnNames.has("latency_ms")) {
      db.exec("ALTER TABLE usage_history ADD COLUMN latency_ms INTEGER DEFAULT 0");
      console.log("[DB] Added usage_history.latency_ms column");
    }
    if (!columnNames.has("ttft_ms")) {
      db.exec("ALTER TABLE usage_history ADD COLUMN ttft_ms INTEGER DEFAULT 0");
      console.log("[DB] Added usage_history.ttft_ms column");
    }
    if (!columnNames.has("error_code")) {
      db.exec("ALTER TABLE usage_history ADD COLUMN error_code TEXT");
      console.log("[DB] Added usage_history.error_code column");
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[DB] Failed to verify usage_history schema:", message);
  }
}

function ensureCallLogsColumns(db: SqliteDatabase) {
  try {
    const columns = db.prepare("PRAGMA table_info(call_logs)").all() as Array<{
      name?: string;
    }>;
    const columnNames = new Set(columns.map((column) => String(column.name ?? "")));

    if (!columnNames.has("artifact_relpath")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN artifact_relpath TEXT");
      console.log("[DB] Added call_logs.artifact_relpath column");
    }
    if (!columnNames.has("has_pipeline_details")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN has_pipeline_details INTEGER DEFAULT 0");
      console.log("[DB] Added call_logs.has_pipeline_details column");
    }
    if (!columnNames.has("requested_model")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN requested_model TEXT DEFAULT NULL");
      console.log("[DB] Added call_logs.requested_model column");
    }
    if (!columnNames.has("request_type")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN request_type TEXT DEFAULT NULL");
      console.log("[DB] Added call_logs.request_type column");
    }
    if (!columnNames.has("tokens_cache_read")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN tokens_cache_read INTEGER DEFAULT NULL");
      console.log("[DB] Added call_logs.tokens_cache_read column");
    }
    if (!columnNames.has("tokens_cache_creation")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN tokens_cache_creation INTEGER DEFAULT NULL");
      console.log("[DB] Added call_logs.tokens_cache_creation column");
    }
    if (!columnNames.has("tokens_reasoning")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN tokens_reasoning INTEGER DEFAULT NULL");
      console.log("[DB] Added call_logs.tokens_reasoning column");
    }
    if (!columnNames.has("cache_source")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN cache_source TEXT DEFAULT 'upstream'");
      console.log("[DB] Added call_logs.cache_source column");
    }
    if (!columnNames.has("combo_step_id")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN combo_step_id TEXT DEFAULT NULL");
      console.log("[DB] Added call_logs.combo_step_id column");
    }
    if (!columnNames.has("combo_execution_key")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN combo_execution_key TEXT DEFAULT NULL");
      console.log("[DB] Added call_logs.combo_execution_key column");
    }
    if (!columnNames.has("error_summary")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN error_summary TEXT DEFAULT NULL");
      console.log("[DB] Added call_logs.error_summary column");
    }
    if (!columnNames.has("detail_state")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN detail_state TEXT DEFAULT 'none'");
      console.log("[DB] Added call_logs.detail_state column");
    }
    if (!columnNames.has("artifact_size_bytes")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN artifact_size_bytes INTEGER DEFAULT NULL");
      console.log("[DB] Added call_logs.artifact_size_bytes column");
    }
    if (!columnNames.has("artifact_sha256")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN artifact_sha256 TEXT DEFAULT NULL");
      console.log("[DB] Added call_logs.artifact_sha256 column");
    }
    if (!columnNames.has("has_request_body")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN has_request_body INTEGER DEFAULT 0");
      console.log("[DB] Added call_logs.has_request_body column");
    }
    if (!columnNames.has("has_response_body")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN has_response_body INTEGER DEFAULT 0");
      console.log("[DB] Added call_logs.has_response_body column");
    }
    if (!columnNames.has("request_summary")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN request_summary TEXT DEFAULT NULL");
      console.log("[DB] Added call_logs.request_summary column");
    }

    db.exec(
      "CREATE INDEX IF NOT EXISTS idx_call_logs_requested_model ON call_logs(requested_model)"
    );
    db.exec("CREATE INDEX IF NOT EXISTS idx_call_logs_request_type ON call_logs(request_type)");
    db.exec(
      "CREATE INDEX IF NOT EXISTS idx_cl_combo_target ON call_logs(combo_name, combo_execution_key, timestamp)"
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[DB] Failed to verify call_logs schema:", message);
  }
}

function hasColumn(db: SqliteDatabase, tableName: string, columnName: string): boolean {
  const rows = db.prepare(`PRAGMA table_info(${tableName})`).all() as Array<{ name?: string }>;
  return rows.some((row) => row.name === columnName);
}

function hasTable(db: SqliteDatabase, tableName: string): boolean {
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(tableName)
  );
}

function quoteIdentifier(identifier: string): string {
  return `"${identifier.replace(/"/g, '""')}"`;
}

function getTableColumns(db: SqliteDatabase, tableName: string): string[] {
  return (
    db.prepare(`PRAGMA table_info(${quoteIdentifier(tableName)})`).all() as Array<{ name?: string }>
  )
    .map((column) => String(column.name ?? ""))
    .filter((column) => column.length > 0);
}

function summarizePreservedTables(tables: PreservedTableSnapshot[]): string {
  if (tables.length === 0) return "none";
  return tables.map((table) => `${table.table}(${table.rowCount})`).join(", ");
}

function summarizeSkippedTables(tables: SkippedTableSnapshot[]): string {
  if (tables.length === 0) return "none";
  return tables
    .map((table) => `${table.table}(${table.rowCount}/${table.maxRows}: ${table.reason})`)
    .join(", ");
}

function listProbeFailureBackups(sqliteFile: string): string[] {
  const directory = path.dirname(sqliteFile);
  const baseName = path.basename(sqliteFile);
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((name) => name.startsWith(`${baseName}.probe-failed-`))
    .map((name) => path.join(directory, name))
    .sort((left, right) => {
      const leftMtime = fs.statSync(left).mtimeMs;
      const rightMtime = fs.statSync(right).mtimeMs;
      return rightMtime - leftMtime;
    });
}

function captureCriticalDbState(sqliteFile: string): PreservedCriticalDbState {
  const snapshot: PreservedCriticalDbState = {
    captureSucceeded: false,
    captureError: null,
    preservedTables: [],
    skippedTables: [],
  };

  if (!fs.existsSync(sqliteFile)) {
    snapshot.captureSucceeded = true;
    return snapshot;
  }

  let probe: SqliteDatabase | null = null;
  try {
    probe = new Database(sqliteFile, { readonly: true });

    for (const tableSpec of CRITICAL_DB_TABLES) {
      if (!hasTable(probe, tableSpec.table)) continue;

      const maxRows = tableSpec.maxRows ?? DEFAULT_CRITICAL_TABLE_ROW_LIMIT;
      const rows = (tableSpec.readRows?.(probe) ??
        (probe
          .prepare(`SELECT * FROM ${quoteIdentifier(tableSpec.table)}`)
          .all() as JsonRecord[])) as JsonRecord[];
      const rowCount = rows.length;

      if (rowCount === 0) continue;

      if (rowCount > maxRows) {
        snapshot.skippedTables.push({
          table: tableSpec.table,
          rowCount,
          maxRows,
          reason: "row_limit_exceeded",
        });
        continue;
      }

      snapshot.preservedTables.push({
        table: tableSpec.table,
        rowCount,
        maxRows,
        columns: getTableColumns(probe, tableSpec.table),
        rows,
      });
    }

    snapshot.captureSucceeded = true;
    return snapshot;
  } catch (error: unknown) {
    snapshot.captureError = error instanceof Error ? error.message : String(error);
    return snapshot;
  } finally {
    try {
      probe?.close();
    } catch {
      /* ignore */
    }
  }
}

function restoreCriticalDbState(
  db: SqliteDatabase,
  snapshot: PreservedCriticalDbState
): PreservedTableSnapshot[] {
  const restoredTables: PreservedTableSnapshot[] = [];

  const restore = db.transaction(() => {
    for (const table of snapshot.preservedTables) {
      if (table.rows.length === 0) continue;
      if (!hasTable(db, table.table)) {
        throw new Error(`Current schema is missing preserved table "${table.table}"`);
      }

      const currentColumns = new Set(getTableColumns(db, table.table));
      const restoreColumns = table.columns.filter((column) => currentColumns.has(column));
      if (restoreColumns.length === 0) {
        throw new Error(`No compatible columns remain for preserved table "${table.table}"`);
      }

      const sql = `INSERT OR REPLACE INTO ${quoteIdentifier(table.table)} (${restoreColumns
        .map((column) => quoteIdentifier(column))
        .join(", ")}) VALUES (${restoreColumns.map(() => "?").join(", ")})`;
      const insert = db.prepare(sql);

      for (const row of table.rows) {
        insert.run(...restoreColumns.map((column) => row[column] ?? null));
      }

      restoredTables.push(table);
    }
  });

  restore();
  return restoredTables;
}

function cleanupRecreatedSqliteFiles(sqliteFile: string) {
  for (const filePath of [
    sqliteFile,
    `${sqliteFile}-wal`,
    `${sqliteFile}-shm`,
    `${sqliteFile}-journal`,
  ]) {
    try {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch {
      /* ignore */
    }
  }
}

function parseLegacyError(value: unknown): unknown {
  if (typeof value !== "string" || value.trim().length === 0) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function offloadLegacyCallLogDetails(db: SqliteDatabase) {
  if (!hasTable(db, "call_logs_v1_legacy")) return;

  type LegacyCallLogRow = {
    id: string;
    timestamp: string | null;
    method: string | null;
    path: string | null;
    status: number | null;
    model: string | null;
    requested_model: string | null;
    provider: string | null;
    account: string | null;
    connection_id: string | null;
    duration: number | null;
    tokens_in: number | null;
    tokens_out: number | null;
    tokens_cache_read: number | null;
    tokens_cache_creation: number | null;
    tokens_reasoning: number | null;
    request_type: string | null;
    source_format: string | null;
    target_format: string | null;
    api_key_id: string | null;
    api_key_name: string | null;
    combo_name: string | null;
    combo_step_id: string | null;
    combo_execution_key: string | null;
    request_body: string | null;
    response_body: string | null;
    error: string | null;
  };

  const pendingRows = db
    .prepare(
      `
      SELECT legacy.*
      FROM call_logs_v1_legacy AS legacy
      JOIN call_logs AS current ON current.id = legacy.id
      WHERE current.detail_state = 'legacy-inline'
      ORDER BY legacy.timestamp ASC
    `
    )
    .all() as LegacyCallLogRow[];

  if (pendingRows.length === 0) {
    db.exec("DROP TABLE IF EXISTS call_logs_v1_legacy");
    return;
  }

  const updateStmt = db.prepare(`
    UPDATE call_logs
    SET artifact_relpath = @artifactRelPath,
        artifact_size_bytes = @artifactSizeBytes,
        artifact_sha256 = @artifactSha256,
        detail_state = 'ready'
    WHERE id = @id
  `);
  const markMissingStmt = db.prepare(`
    UPDATE call_logs
    SET detail_state = 'missing',
        artifact_relpath = NULL,
        artifact_size_bytes = NULL,
        artifact_sha256 = NULL
    WHERE id = ?
  `);

  let failed = 0;
  const tx = db.transaction(() => {
    for (const row of pendingRows) {
      const artifact: CallLogArtifact = {
        schemaVersion: 4,
        summary: {
          id: row.id,
          timestamp: row.timestamp || new Date().toISOString(),
          method: row.method || "POST",
          path: row.path || "/v1/chat/completions",
          status: row.status || 0,
          model: row.model || "-",
          requestedModel: row.requested_model || null,
          provider: row.provider || "-",
          account: row.account || "-",
          connectionId: row.connection_id || null,
          duration: row.duration || 0,
          tokens: {
            in: row.tokens_in || 0,
            out: row.tokens_out || 0,
            cacheRead: row.tokens_cache_read ?? null,
            cacheWrite: row.tokens_cache_creation ?? null,
            reasoning: row.tokens_reasoning ?? null,
          },
          requestType: row.request_type || null,
          sourceFormat: row.source_format || null,
          targetFormat: row.target_format || null,
          apiKeyId: row.api_key_id || null,
          apiKeyName: row.api_key_name || null,
          comboName: row.combo_name || null,
          comboStepId: row.combo_step_id || null,
          comboExecutionKey: row.combo_execution_key || null,
        },
        requestBody: parseStoredPayload(row.request_body),
        responseBody: parseStoredPayload(row.response_body),
        error: parseLegacyError(row.error),
      };

      const artifactResult = writeCallArtifact(
        artifact,
        buildArtifactRelativePath(artifact.summary.timestamp, artifact.summary.id)
      );
      if (!artifactResult) {
        failed++;
        markMissingStmt.run(row.id);
        continue;
      }

      updateStmt.run({
        id: row.id,
        artifactRelPath: artifactResult.relPath,
        artifactSizeBytes: artifactResult.sizeBytes,
        artifactSha256: artifactResult.sha256,
      });
    }
  });

  tx();

  if (failed > 0) {
    console.warn(
      `[DB] Kept call_logs_v1_legacy after partial call log offload (${failed} failed row(s)).`
    );
    return;
  }

  db.exec("DROP TABLE IF EXISTS call_logs_v1_legacy");
  try {
    db.pragma("wal_checkpoint(TRUNCATE)");
    db.exec("VACUUM");
    console.log(`[DB] Offloaded ${pendingRows.length} legacy call log detail row(s) to artifacts.`);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[DB] Legacy call log compaction finished without VACUUM:", message);
  }
}

function isAutomatedTestProcess(): boolean {
  return (
    typeof process !== "undefined" &&
    (process.env.NODE_ENV === "test" ||
      process.env.VITEST !== undefined ||
      process.argv.some((arg) => arg.includes("test")))
  );
}

function shouldRunStartupDbHealthCheck(): boolean {
  if (process.env.OMNIROUTE_FORCE_DB_HEALTHCHECK === "1") return true;
  return !isAutomatedTestProcess();
}

function createHealthCheckBackup(db: SqliteDatabase): boolean {
  const isTest = isAutomatedTestProcess();
  if (isTest) return false;

  try {
    const backupDir = DB_BACKUPS_DIR || path.join(DATA_DIR, "db_backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = path.join(backupDir, `db_${timestamp}_health-check-repair.sqlite`);
    const escapedBackupPath = backupPath.replace(/'/g, "''");

    db.exec(`VACUUM INTO '${escapedBackupPath}'`);
    console.log(`[DB] Health-check backup created: ${backupPath}`);
    return true;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[DB] Failed to create health-check backup:", message);
    return false;
  }
}

let dbHealthCheckTimer: NodeJS.Timeout | null = null;

function getDbHealthCheckIntervalMs(): number {
  const rawValue = process.env.OMNIROUTE_DB_HEALTHCHECK_INTERVAL_MS;
  if (typeof rawValue === "string" && rawValue.trim().length > 0) {
    const parsed = Number(rawValue);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  }
  return 6 * 60 * 60 * 1000;
}

function clearDbHealthCheckScheduler() {
  if (dbHealthCheckTimer) {
    clearInterval(dbHealthCheckTimer);
    dbHealthCheckTimer = null;
  }
}

function startDbHealthCheckScheduler(db: SqliteDatabase) {
  clearDbHealthCheckScheduler();
  if (isCloud || isBuildPhase || isAutomatedTestProcess()) return;

  const intervalMs = getDbHealthCheckIntervalMs();
  if (intervalMs <= 0) return;

  dbHealthCheckTimer = setInterval(() => {
    try {
      if (!db.open) return;
      runDbHealthCheck(db, {
        autoRepair: true,
        expectedSchemaVersion: "1",
        createBackupBeforeRepair: () => createHealthCheckBackup(db),
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn("[DB] Periodic health-check failed:", message);
    }
  }, intervalMs);
  dbHealthCheckTimer.unref?.();
}

export function runManagedDbHealthCheck(options?: { autoRepair?: boolean }) {
  const db = getDbInstance();
  return runDbHealthCheck(db, {
    autoRepair: options?.autoRepair === true,
    expectedSchemaVersion: "1",
    createBackupBeforeRepair: () => createHealthCheckBackup(db),
  });
}

export function getDbInstance(): SqliteDatabase {
  const existing = getDb();
  if (existing) return existing;

  if (isCloud || isBuildPhase) {
    if (isBuildPhase) {
      console.log("[DB] Build phase detected — using in-memory SQLite (read-only)");
    }
    const memoryDb = new Database(":memory:");
    memoryDb.pragma("journal_mode = WAL");
    memoryDb.exec(SCHEMA_SQL);
    ensureUsageHistoryColumns(memoryDb);
    ensureCallLogsColumns(memoryDb);
    setDb(memoryDb);
    return memoryDb;
  }

  const sqliteFile = SQLITE_FILE;
  if (!sqliteFile) {
    throw new Error("SQLITE_FILE is unavailable for local mode");
  }
  const jsonDbFile = JSON_DB_FILE;
  const probeFailureBackups = listProbeFailureBackups(sqliteFile);
  if (!fs.existsSync(sqliteFile) && probeFailureBackups.length > 0) {
    throw new Error(
      `[DB] Manual recovery required before startup. ` +
        `Detected preserved database from a previous probe failure: ${probeFailureBackups[0]}. ` +
        `Restore the preserved file or another backup to ${sqliteFile} before restarting.`
    );
  }

  let preservedCriticalState: PreservedCriticalDbState = {
    captureSucceeded: true,
    captureError: null,
    preservedTables: [],
    skippedTables: [],
  };
  let failedProbePath: string | null = null;
  let failedProbeMessage: string | null = null;

  if (fs.existsSync(sqliteFile)) {
    preservedCriticalState = captureCriticalDbState(sqliteFile);
    if (preservedCriticalState.captureSucceeded) {
      if (preservedCriticalState.preservedTables.length > 0) {
        console.log(
          `[DB] Preserved critical DB state before potential recreation: ${summarizePreservedTables(
            preservedCriticalState.preservedTables
          )}`
        );
      }
      if (preservedCriticalState.skippedTables.length > 0) {
        console.warn(
          `[DB] Critical DB tables skipped during preservation: ${summarizeSkippedTables(
            preservedCriticalState.skippedTables
          )}`
        );
      }
    } else if (preservedCriticalState.captureError) {
      console.warn(
        `[DB] Could not preserve critical DB state before recreation: ${preservedCriticalState.captureError}`
      );
    }
  }

  // Track whether the DB file is brand new (fresh DATA_DIR / Docker volume).
  // This is needed so the migration runner skips the mass-migration safety abort
  // that would otherwise trigger because heuristic seeding marks some migrations
  // as applied, making the fresh DB look like a wiped existing DB (#1328).
  const isNewDb = !fs.existsSync(sqliteFile);

  // Detect and handle old schema format — preserve data when possible (#146)
  // Uses a single probe connection that becomes the real connection when possible.
  if (fs.existsSync(sqliteFile)) {
    try {
      const probe = new Database(sqliteFile, { readonly: true });
      const hasOldSchema = probe
        .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='schema_migrations'")
        .get();

      if (hasOldSchema) {
        let hasData = false;
        try {
          const count = probe.prepare("SELECT COUNT(*) as c FROM provider_connections").get() as
            | { c: number }
            | undefined;
          hasData = Boolean(count && count.c > 0);
        } catch {
          // Table might not exist at all — truly incompatible
        }
        probe.close();

        if (hasData) {
          console.log(
            `[DB] Old schema_migrations table found but data exists — preserving data (#146)`
          );
          const fixDb = new Database(sqliteFile);
          try {
            fixDb.exec("DROP TABLE IF EXISTS schema_migrations");
            fixDb.pragma("wal_checkpoint(TRUNCATE)");
          } catch (e: unknown) {
            const message = e instanceof Error ? e.message : String(e);
            console.warn("[DB] Could not clean up old schema table:", message);
          } finally {
            fixDb.close();
          }
        } else {
          const oldPath = sqliteFile + ".old-schema";
          console.log(
            `[DB] Old incompatible schema detected (empty) — renaming to ${path.basename(oldPath)}`
          );
          fs.renameSync(sqliteFile, oldPath);
          for (const ext of ["-wal", "-shm"]) {
            try {
              if (fs.existsSync(sqliteFile + ext)) fs.unlinkSync(sqliteFile + ext);
            } catch {
              /* ok */
            }
          }
        }
      } else {
        probe.close();
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      console.warn("[DB] Could not probe existing DB:", message);

      // If the error is a Node module/ABI failure, throw it immediately to avoid renaming the database
      if (
        message.includes("Module did not self-register") ||
        message.includes("could not be found") ||
        message.includes("ERR_DLOPEN_FAILED") ||
        (e as any)?.code === "ERR_DLOPEN_FAILED"
      ) {
        throw e;
      }

      // SAFETY: Never delete the database — rename to backup so data can be recovered.
      // The old code would silently destroy all user data on any probe failure.
      const failedPath = sqliteFile + `.probe-failed-${Date.now()}`;
      try {
        fs.renameSync(sqliteFile, failedPath);
        console.warn(`[DB] Renamed corrupt DB to ${path.basename(failedPath)}`);
        failedProbePath = failedPath;
        failedProbeMessage = message;
      } catch {
        /* ok */
      }
    }
  }

  if (failedProbePath) {
    const hasUnsafeSkippedTables = preservedCriticalState.skippedTables.length > 0;
    const missingSnapshot = !preservedCriticalState.captureSucceeded;
    if (hasUnsafeSkippedTables || missingSnapshot) {
      const details = missingSnapshot
        ? `snapshot_failed=${preservedCriticalState.captureError || "unknown"}`
        : `skipped_tables=${summarizeSkippedTables(preservedCriticalState.skippedTables)}`;
      throw new Error(
        `[DB] Manual recovery required after probe failure. ` +
          `Preserved database: ${failedProbePath}. ` +
          `Automatic recovery was aborted because ${details}. ` +
          `Original probe error: ${failedProbeMessage || "unknown"}.`
      );
    }
  }

  const db = new Database(sqliteFile);
  db.pragma("journal_mode = WAL");
  db.pragma("busy_timeout = 5000");
  db.pragma("synchronous = NORMAL");
  db.exec(SCHEMA_SQL);
  ensureProviderConnectionsColumns(db);
  ensureUsageHistoryColumns(db);
  ensureCallLogsColumns(db);

  // ── Versioned Migrations ──
  // Auto-seed 001 as applied (the inline SCHEMA_SQL already created these tables)
  // then run any new migrations (002+)
  db.exec(`
    CREATE TABLE IF NOT EXISTS _omniroute_migrations (
      version TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    INSERT OR IGNORE INTO _omniroute_migrations (version, name)
    VALUES ('001', 'initial_schema');
  `);
  if (hasColumn(db, "combos", "sort_order")) {
    db.prepare("INSERT OR IGNORE INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
      "020",
      "combo_sort_order"
    );
  }
  if (hasColumn(db, "provider_connections", "max_concurrent")) {
    db.prepare("INSERT OR IGNORE INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
      "029",
      "provider_connection_max_concurrent"
    );
  }
  if (hasColumn(db, "call_logs", "request_type")) {
    db.prepare("INSERT OR IGNORE INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
      "007",
      "search_request_type"
    );
  }
  if (hasColumn(db, "call_logs", "requested_model")) {
    db.prepare("INSERT OR IGNORE INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
      "009",
      "requested_model"
    );
  }
  if (
    hasColumn(db, "call_logs", "tokens_cache_read") &&
    hasColumn(db, "call_logs", "tokens_cache_creation") &&
    hasColumn(db, "call_logs", "tokens_reasoning")
  ) {
    db.prepare("INSERT OR IGNORE INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
      "018",
      "call_logs_detailed_tokens"
    );
  }
  if (
    hasColumn(db, "call_logs", "combo_step_id") &&
    hasColumn(db, "call_logs", "combo_execution_key")
  ) {
    db.prepare("INSERT OR IGNORE INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
      "021",
      "combo_call_log_targets"
    );
  }
  const hasCacheSource = hasColumn(db, "call_logs", "cache_source");
  if (hasCacheSource) {
    const cacheSourceLegacy = db
      .prepare("SELECT version FROM _omniroute_migrations WHERE version = ? AND name = ?")
      .get("022", "call_logs_cache_source") as { version?: string } | undefined;
    if (cacheSourceLegacy) {
      const cacheSourceCurrent = db
        .prepare("SELECT version FROM _omniroute_migrations WHERE version = ?")
        .get("026") as { version?: string } | undefined;
      if (cacheSourceCurrent) {
        db.prepare("DELETE FROM _omniroute_migrations WHERE version = ? AND name = ?").run(
          "022",
          "call_logs_cache_source"
        );
      } else {
        db.prepare(
          "UPDATE _omniroute_migrations SET version = ?, name = ? WHERE version = ? AND name = ?"
        ).run("026", "call_logs_cache_source", "022", "call_logs_cache_source");
      }
    }
    db.prepare("INSERT OR IGNORE INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
      "026",
      "call_logs_cache_source"
    );
  }
  if (
    hasColumn(db, "call_logs", "detail_state") &&
    hasColumn(db, "call_logs", "request_summary") &&
    hasColumn(db, "call_logs", "has_request_body") &&
    hasColumn(db, "call_logs", "has_response_body") &&
    !hasColumn(db, "call_logs", "request_body") &&
    !hasColumn(db, "call_logs", "response_body") &&
    !hasColumn(db, "call_logs", "error")
  ) {
    db.prepare("INSERT OR IGNORE INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
      "025",
      "call_logs_summary_storage"
    );
  }
  runMigrations(db, { isNewDb });

  // ── Post-migration safety guards ──────────────────────────────────────────
  // The heuristic seeding above can mark migration versions as "applied" based
  // on column detection, causing the migration runner to skip newer migrations
  // whose tables/columns don't have heuristic detectors yet.
  // These guards ensure critical schema elements exist regardless of migration
  // state, fixing upgrade failures reported in #1648 and #1657.

  // Guard: combos.sort_order (migration 020)
  if (hasTable(db, "combos") && !hasColumn(db, "combos", "sort_order")) {
    try {
      db.exec(`
        ALTER TABLE combos ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 0;
        WITH ordered_combos AS (
          SELECT id, ROW_NUMBER() OVER (
            ORDER BY created_at ASC, updated_at ASC, name COLLATE NOCASE ASC
          ) AS next_sort_order
          FROM combos
        )
        UPDATE combos SET sort_order = (
          SELECT next_sort_order FROM ordered_combos
          WHERE ordered_combos.id = combos.id
        );
      `);
      console.log("[DB] Post-migration guard: added missing combos.sort_order column (#1657)");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (!msg.includes("duplicate column")) {
        console.warn("[DB] Post-migration guard: combos.sort_order failed:", msg);
      }
    }
  }

  // Guard: batches table (migration 028)
  if (!hasTable(db, "batches")) {
    try {
      db.exec(`
        CREATE TABLE IF NOT EXISTS files (
          id TEXT PRIMARY KEY,
          bytes INTEGER NOT NULL,
          created_at INTEGER NOT NULL,
          filename TEXT NOT NULL,
          purpose TEXT NOT NULL,
          content BLOB,
          mime_type TEXT,
          api_key_id TEXT,
          deleted_at INTEGER,
          status TEXT DEFAULT 'validating',
          expires_at INTEGER
        );
        CREATE INDEX IF NOT EXISTS idx_files_api_key ON files(api_key_id);

        CREATE TABLE IF NOT EXISTS batches (
          id TEXT PRIMARY KEY,
          endpoint TEXT NOT NULL,
          completion_window TEXT NOT NULL,
          status TEXT NOT NULL,
          input_file_id TEXT NOT NULL,
          output_file_id TEXT,
          error_file_id TEXT,
          created_at INTEGER NOT NULL,
          in_progress_at INTEGER,
          expires_at INTEGER,
          finalizing_at INTEGER,
          completed_at INTEGER,
          failed_at INTEGER,
          expired_at INTEGER,
          cancelling_at INTEGER,
          cancelled_at INTEGER,
          request_counts_total INTEGER DEFAULT 0,
          request_counts_completed INTEGER DEFAULT 0,
          request_counts_failed INTEGER DEFAULT 0,
          metadata TEXT,
          api_key_id TEXT,
          errors TEXT,
          model TEXT,
          usage TEXT,
          output_expires_after_seconds INTEGER,
          output_expires_after_anchor TEXT,
          FOREIGN KEY(input_file_id) REFERENCES files(id),
          FOREIGN KEY(output_file_id) REFERENCES files(id),
          FOREIGN KEY(error_file_id) REFERENCES files(id)
        );
        CREATE INDEX IF NOT EXISTS idx_batches_api_key ON batches(api_key_id);
        CREATE INDEX IF NOT EXISTS idx_batches_status ON batches(status);
      `);
      console.log("[DB] Post-migration guard: created missing batches/files tables (#1648)");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (!msg.includes("already exists")) {
        console.warn("[DB] Post-migration guard: batches/files creation failed:", msg);
      }
    }
  }

  offloadLegacyCallLogDetails(db);

  // Auto-migrate from db.json if exists
  if (jsonDbFile && fs.existsSync(jsonDbFile)) {
    migrateFromJson(db, jsonDbFile);
  }

  if (failedProbePath && preservedCriticalState.preservedTables.length > 0) {
    try {
      const restoredTables = restoreCriticalDbState(db, preservedCriticalState);
      console.log(
        `[DB] Restored preserved critical DB state after probe failure: ${summarizePreservedTables(
          restoredTables
        )}`
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      try {
        if (db.open) db.close();
      } catch {
        /* ignore */
      }
      cleanupRecreatedSqliteFiles(sqliteFile);
      throw new Error(
        `[DB] Automatic recovery aborted after probe failure. ` +
          `Preserved database: ${failedProbePath}. ` +
          `Restore failure: ${message}.`
      );
    }
  }

  // Store schema version
  const versionStmt = db.prepare(
    "INSERT OR REPLACE INTO db_meta (key, value) VALUES ('schema_version', '1')"
  );
  versionStmt.run();
  if (shouldRunStartupDbHealthCheck()) {
    runDbHealthCheck(db, {
      autoRepair: true,
      expectedSchemaVersion: "1",
      createBackupBeforeRepair: () => createHealthCheckBackup(db),
    });
  }

  setDb(db);
  startDbHealthCheckScheduler(db);
  console.log(`[DB] SQLite database ready: ${sqliteFile}`);
  return db;
}

export function closeDbInstance(options?: { checkpointMode?: CheckpointMode | null }): boolean {
  clearDbHealthCheckScheduler();
  const db = getDb();
  if (!db) return false;

  const checkpointMode = options?.checkpointMode ?? "TRUNCATE";

  try {
    if (checkpointMode) {
      try {
        if (checkpointDb(db, checkpointMode)) {
          console.log(`[DB] SQLite WAL checkpoint completed (${checkpointMode}).`);
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`[DB] WAL checkpoint failed during close (${checkpointMode}):`, message);
      }
    }
  } finally {
    try {
      if (db.open) db.close();
    } finally {
      setDb(null);
    }
  }

  return true;
}

/**
 * Reset the singleton (used by restore).
 */
export function resetDbInstance() {
  closeDbInstance();
}

// ──────────────── JSON → SQLite Migration ────────────────

function migrateFromJson(db: SqliteDatabase, jsonPath: string) {
  try {
    const raw = fs.readFileSync(jsonPath, "utf-8");
    const data = JSON.parse(raw);

    const connCount = (data.providerConnections || []).length;
    const nodeCount = (data.providerNodes || []).length;
    const keyCount = (data.apiKeys || []).length;

    if (connCount === 0 && nodeCount === 0 && keyCount === 0) {
      console.log("[DB] db.json has no data to migrate, skipping");
      fs.renameSync(jsonPath, jsonPath + ".empty");
      return;
    }

    console.log(
      `[DB] Migrating db.json → SQLite (${connCount} connections, ${nodeCount} nodes, ${keyCount} keys)...`
    );

    const migrate = db.transaction(() => {
      // 1. Provider Connections
      const insertConn = db.prepare(`
        INSERT OR REPLACE INTO provider_connections (
          id, provider, auth_type, name, email, priority, is_active,
          access_token, refresh_token, expires_at, token_expires_at,
          scope, project_id, test_status, error_code, last_error,
          last_error_at, last_error_type, last_error_source, backoff_level,
          rate_limited_until, health_check_interval, last_health_check_at,
          last_tested, api_key, id_token, provider_specific_data,
          expires_in, display_name, global_priority, default_model,
          token_type, consecutive_use_count, rate_limit_protection, last_used_at, created_at, updated_at
        ) VALUES (
          @id, @provider, @authType, @name, @email, @priority, @isActive,
          @accessToken, @refreshToken, @expiresAt, @tokenExpiresAt,
          @scope, @projectId, @testStatus, @errorCode, @lastError,
          @lastErrorAt, @lastErrorType, @lastErrorSource, @backoffLevel,
          @rateLimitedUntil, @healthCheckInterval, @lastHealthCheckAt,
          @lastTested, @apiKey, @idToken, @providerSpecificData,
          @expiresIn, @displayName, @globalPriority, @defaultModel,
          @tokenType, @consecutiveUseCount, @rateLimitProtection, @lastUsedAt, @createdAt, @updatedAt
        )
      `);

      for (const conn of data.providerConnections || []) {
        insertConn.run({
          id: conn.id,
          provider: conn.provider,
          authType: conn.authType || "oauth",
          name: conn.name || null,
          email: conn.email || null,
          priority: conn.priority || 0,
          isActive: conn.isActive === false ? 0 : 1,
          accessToken: conn.accessToken || null,
          refreshToken: conn.refreshToken || null,
          expiresAt: conn.expiresAt || null,
          tokenExpiresAt: conn.tokenExpiresAt || null,
          scope: conn.scope || null,
          projectId: conn.projectId || null,
          testStatus: conn.testStatus || null,
          errorCode: conn.errorCode || null,
          lastError: conn.lastError || null,
          lastErrorAt: conn.lastErrorAt || null,
          lastErrorType: conn.lastErrorType || null,
          lastErrorSource: conn.lastErrorSource || null,
          backoffLevel: conn.backoffLevel || 0,
          rateLimitedUntil: conn.rateLimitedUntil || null,
          healthCheckInterval: conn.healthCheckInterval || null,
          lastHealthCheckAt: conn.lastHealthCheckAt || null,
          lastTested: conn.lastTested || null,
          apiKey: conn.apiKey || null,
          idToken: conn.idToken || null,
          providerSpecificData: conn.providerSpecificData
            ? JSON.stringify(conn.providerSpecificData)
            : null,
          expiresIn: conn.expiresIn || null,
          displayName: conn.displayName || null,
          globalPriority: conn.globalPriority || null,
          defaultModel: conn.defaultModel || null,
          tokenType: conn.tokenType || null,
          consecutiveUseCount: conn.consecutiveUseCount || 0,
          lastUsedAt: conn.lastUsedAt || null,
          rateLimitProtection:
            conn.rateLimitProtection === true || conn.rateLimitProtection === 1 ? 1 : 0,
          createdAt: conn.createdAt || new Date().toISOString(),
          updatedAt: conn.updatedAt || new Date().toISOString(),
        });
      }

      // 2. Provider Nodes
      const insertNode = db.prepare(`
        INSERT OR REPLACE INTO provider_nodes (id, type, name, prefix, api_type, base_url, created_at, updated_at)
        VALUES (@id, @type, @name, @prefix, @apiType, @baseUrl, @createdAt, @updatedAt)
      `);
      for (const node of data.providerNodes || []) {
        insertNode.run({
          id: node.id,
          type: node.type,
          name: node.name,
          prefix: node.prefix || null,
          apiType: node.apiType || null,
          baseUrl: node.baseUrl || null,
          createdAt: node.createdAt || new Date().toISOString(),
          updatedAt: node.updatedAt || new Date().toISOString(),
        });
      }

      // 3. Key-Value pairs
      const insertKv = db.prepare(
        "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
      );

      for (const [alias, model] of Object.entries(data.modelAliases || {})) {
        insertKv.run("modelAliases", alias, JSON.stringify(model));
      }
      for (const [toolName, mappings] of Object.entries(data.mitmAlias || {})) {
        insertKv.run("mitmAlias", toolName, JSON.stringify(mappings));
      }
      for (const [key, value] of Object.entries(data.settings || {})) {
        insertKv.run("settings", key, JSON.stringify(value));
      }
      for (const [provider, models] of Object.entries(data.pricing || {})) {
        insertKv.run("pricing", provider, JSON.stringify(models));
      }
      for (const [providerId, models] of Object.entries(data.customModels || {})) {
        insertKv.run("customModels", providerId, JSON.stringify(models));
      }
      if (data.proxyConfig) {
        insertKv.run("proxyConfig", "global", JSON.stringify(data.proxyConfig.global || null));
        insertKv.run("proxyConfig", "providers", JSON.stringify(data.proxyConfig.providers || {}));
        insertKv.run("proxyConfig", "combos", JSON.stringify(data.proxyConfig.combos || {}));
        insertKv.run("proxyConfig", "keys", JSON.stringify(data.proxyConfig.keys || {}));
      }

      // 4. Combos
      const insertCombo = db.prepare(`
        INSERT OR REPLACE INTO combos (id, name, data, sort_order, created_at, updated_at)
        VALUES (@id, @name, @data, @sortOrder, @createdAt, @updatedAt)
      `);
      for (const [index, combo] of (data.combos || []).entries()) {
        const normalizedCombo = {
          ...combo,
          sortOrder: typeof combo.sortOrder === "number" ? combo.sortOrder : index + 1,
        };
        insertCombo.run({
          id: normalizedCombo.id,
          name: normalizedCombo.name,
          data: JSON.stringify(normalizedCombo),
          sortOrder: normalizedCombo.sortOrder,
          createdAt: normalizedCombo.createdAt || new Date().toISOString(),
          updatedAt: normalizedCombo.updatedAt || new Date().toISOString(),
        });
      }

      // 5. API Keys
      const insertKey = db.prepare(`
        INSERT OR REPLACE INTO api_keys (id, name, key, machine_id, allowed_models, no_log, created_at)
        VALUES (@id, @name, @key, @machineId, @allowedModels, @noLog, @createdAt)
      `);
      for (const apiKey of data.apiKeys || []) {
        insertKey.run({
          id: apiKey.id,
          name: apiKey.name,
          key: apiKey.key,
          machineId: apiKey.machineId || null,
          allowedModels: JSON.stringify(apiKey.allowedModels || []),
          noLog: apiKey.noLog ? 1 : 0,
          createdAt: apiKey.createdAt || new Date().toISOString(),
        });
      }
    });

    migrate();

    const migratedPath = jsonPath + ".migrated";
    fs.renameSync(jsonPath, migratedPath);
    console.log(`[DB] ✓ Migration complete. Original saved as ${migratedPath}`);

    const legacyBackupDir = path.join(DATA_DIR, "db_backups");
    if (fs.existsSync(legacyBackupDir)) {
      const jsonBackups = fs.readdirSync(legacyBackupDir).filter((f) => f.endsWith(".json"));
      if (jsonBackups.length > 0) {
        console.log(
          `[DB] Note: ${jsonBackups.length} legacy .json backups remain in ${legacyBackupDir}`
        );
      }
    }
  } catch (err) {
    console.error("[DB] Migration from db.json failed:", err.message);
  }
}
