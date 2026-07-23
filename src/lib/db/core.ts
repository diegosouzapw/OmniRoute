/**
 * db/core.js — Database infrastructure: schema, singleton, utils, migration.
 *
 * All domain modules import `getDbInstance` and helpers from here.
 */

import type { SqliteAdapter } from "./adapters/types";
import {
  tryOpenSync,
  getSqlJsAdapter,
  preInitSqlJs,
  getSqlJsPreInitError,
  openDatabaseAsync,
} from "./adapters/driverFactory";
import path from "path";
import fs from "fs";
import { resolveWritableDataDir, getLegacyDotDataDir } from "../dataPaths";
import { runMigrations } from "./migrationRunner";
import { runDbHealthCheck } from "./healthCheck";
import { resetAllDbModuleState } from "./stateReset";
import { parseStoredPayload } from "../logPayloads";
import { DEFAULT_DATABASE_SETTINGS, type DatabaseSettings } from "@/types/databaseSettings";
import {
  applyDatabaseOptimizationSettingsForDb,
  applyStoredDatabaseOptimizationSettings,
  getAutoVacuumModeForDb,
  setAutoVacuumForDb,
  setCacheSizeForDb,
  setPageSizeForDb,
} from "./optimizationSettings";
import {
  buildArtifactRelativePath,
  writeCallArtifact,
  type CallLogArtifact,
} from "../usage/callLogArtifacts";
import { migrateLegacyEncryptedString } from "./encryption";
import { invalidateDbCache } from "./readCache";
import { rowToCamel } from "./caseMapping";
import { isAutomatedTestProcess } from "@/shared/utils/testProcess";
// Re-exported so existing call sites that pull these helpers off the core module keep working.
export { toSnakeCase, toCamelCase, objToSnake, rowToCamel, cleanNulls } from "./caseMapping";
import {
  ensureProviderConnectionsColumns,
  ensureUsageHistoryAccountIndex,
  ensureUsageHistoryColumns,
  ensureCallLogsColumns,
  hasTable,
  quoteIdentifier,
  getTableColumns,
} from "./schemaColumns";

type SqliteDatabase = SqliteAdapter;
type JsonRecord = Record<string, unknown>;
type CheckpointMode = "PASSIVE" | "FULL" | "RESTART" | "TRUNCATE";
type DatabaseOptimizationSettings = DatabaseSettings["optimization"];
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

export const DATA_DIR = resolveWritableDataDir({ isCloud });
const LEGACY_DATA_DIR = isCloud ? null : getLegacyDotDataDir();
export const SQLITE_FILE = isCloud ? null : path.join(DATA_DIR, "storage.sqlite");
const JSON_DB_FILE = isCloud ? null : path.join(DATA_DIR, "db.json");
export const DB_BACKUPS_DIR = isCloud ? null : path.join(DATA_DIR, "db_backups");
const DEFAULT_CRITICAL_TABLE_ROW_LIMIT = 10_000;
const SKIP_PRESERVE_NAMESPACES = new Set([
  "syncedAvailableModels",
  "providerLimitsCache",
  "lkgp",
  "gemini_thought_signatures",
]);
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

export function isNativeSqliteLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  const code = getErrorCode(error);
  return (
    message.includes("Module did not self-register") ||
    message.includes("NODE_MODULE_VERSION") ||
    message.includes("ERR_DLOPEN_FAILED") ||
    // bun and similar runtimes that skip the postinstall script never download
    // the prebuilt *.node binary, so `bindings()` fails with this message
    // before any DLOPEN even happens (#2358).
    message.includes("Could not locate the bindings file") ||
    message.includes("Cannot find module 'better-sqlite3'") ||
    code === "ERR_DLOPEN_FAILED" ||
    code === "MODULE_NOT_FOUND"
  );
}

export function isSqliteDriverUnavailableError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);

  return (
    message.includes("Nenhum driver SQLite disponível") ||
    message.includes("Chame ensureDbInitialized() no startup") ||
    message.includes("sql.js WASM ainda não foi pré-inicializado")
  );
}

function getErrorCode(error: unknown): string | undefined {
  if (!error || typeof error !== "object" || !("code" in error)) return undefined;
  const code = (error as { code?: unknown }).code;
  return typeof code === "string" ? code : undefined;
}

/**
 * Closes a probe/throwaway connection obtained from `openSqliteDatabase()` —
 * but ONLY when it is safe to do so. better-sqlite3/node:sqlite hand back an
 * independent handle per open() call, so closing a probe never affects a
 * later "real" connection to the same file. sql.js has no such notion: its
 * fallback path (`getSqlJsAdapter()`) always returns the SAME module-global
 * cached singleton for a given filePath, so closing "the probe" closes the
 * ONLY connection that file will ever get until process restart — every
 * subsequent query (including the "real" connection opened right after)
 * throws sql.js's raw "Database closed" string (#7494). Skip the close for
 * sql.js and let the same live adapter flow through untouched.
 */
export function closeProbeIfSafe(adapter: SqliteDatabase | null | undefined): void {
  if (!adapter || adapter.driver === "sql.js") return;
  if (adapter.open) adapter.close();
}

function openSqliteDatabase(sqliteFile: string, options?: Record<string, unknown>): SqliteDatabase {
  const adapter = tryOpenSync(sqliteFile, options);
  if (adapter) return adapter;

  const sqlJs = getSqlJsAdapter(sqliteFile);
  if (sqlJs) return sqlJs;

  // sql.js pre-init was genuinely attempted (e.g. by the top-level eager
  // barrier below) and failed — surface the real cause instead of the
  // generic/misleading "not pre-initialized yet" message (#7288).
  const preInitError = getSqlJsPreInitError(sqliteFile);
  const syncDrivers = process.versions.bun
    ? "bun:sqlite (failed)"
    : "better-sqlite3 (failed), node:sqlite (unavailable)";
  if (preInitError) {
    throw new Error(
      `[DB] Nenhum driver SQLite disponível para '${sqliteFile}'. ` +
        `Drivers testados: ${syncDrivers}, ` +
        `sql.js (falhou: ${preInitError}).`
    );
  }

  throw new Error(
    `[DB] Nenhum driver SQLite disponível para '${sqliteFile}'. ` +
      "Chame ensureDbInitialized() no startup. " +
      `Drivers testados: ${syncDrivers}. ` +
      "sql.js WASM ainda não foi pré-inicializado."
  );
}

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
    proxy_enabled INTEGER NOT NULL DEFAULT 1,
    per_key_proxy_enabled INTEGER NOT NULL DEFAULT 0,
    quota_visible INTEGER NOT NULL DEFAULT 1,
    quota_window_thresholds_json TEXT,
    rate_limit_overrides_json TEXT,
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
    chat_path TEXT,
    models_path TEXT,
    custom_headers_json TEXT,
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
    account_key TEXT,
    account_label TEXT,
    account_label_priority INTEGER DEFAULT 0,
    api_key_id TEXT,
    api_key_name TEXT,
    tokens_input INTEGER DEFAULT 0,
    tokens_output INTEGER DEFAULT 0,
    tokens_cache_read INTEGER DEFAULT 0,
    tokens_cache_creation INTEGER DEFAULT 0,
    tokens_reasoning INTEGER DEFAULT 0,
    service_tier TEXT DEFAULT 'standard',
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
    tokens_compressed INTEGER DEFAULT NULL,
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
    request_summary TEXT,
    correlation_id TEXT
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

  CREATE TABLE IF NOT EXISTS quota_snapshots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    provider TEXT NOT NULL,
    connection_id TEXT NOT NULL,
    window_key TEXT NOT NULL,
    remaining_percentage REAL,
    is_exhausted INTEGER DEFAULT 0,
    next_reset_at TEXT,
    window_duration_ms INTEGER,
    raw_data TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_quota_snapshots_provider_time ON quota_snapshots(provider, created_at);
  CREATE INDEX IF NOT EXISTS idx_quota_snapshots_connection_time ON quota_snapshots(connection_id, created_at);
  CREATE INDEX IF NOT EXISTS idx_quota_snapshots_created_at ON quota_snapshots(created_at);
`;

// ──────────────── Singleton DB Instance ────────────────
// Use globalThis to survive Next.js dev HMR module re-evaluation.
// Module-level `let` resets on every webpack recompile, causing connection leaks.

declare global {
  var __omnirouteDb: SqliteAdapter | undefined;
  // Cycle-breaker counter for the probe-failed/restore cascade. Survives
  // Next.js HMR re-evaluations so concurrent subsystems all see the same
  // count and we abort with a clear error instead of looping forever.
  var __omnirouteDbProbeRestoreCount: number | undefined;
  // Cycle-breaker counter for the OOM-during-probe path (#6835). Unlike the
  // generic corruption path above, an OOM probe failure never renames the
  // file away (intentional — the DB may be perfectly fine, just too large
  // for the current heap), so the restore-count cap above is structurally
  // unreachable here. Without an independent cap, every background poller
  // (BATCH, HealthCheck, ProviderLimitsSync, ModelSync) re-throws the same
  // OOM error forever with no terminal diagnostic.
  var __omnirouteDbOomFailureCount: number | undefined;
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
  const prefix = `${baseName}.probe-failed-`;
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((name) => name.startsWith(prefix))
    .map((name) => ({
      path: path.join(directory, name),
      timestamp: Number(name.slice(prefix.length)),
    }))
    .sort((left, right) => {
      const leftTimestamp = Number.isFinite(left.timestamp) ? left.timestamp : 0;
      const rightTimestamp = Number.isFinite(right.timestamp) ? right.timestamp : 0;
      return rightTimestamp - leftTimestamp || right.path.localeCompare(left.path);
    })
    .map((backup) => backup.path);
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
    probe = openSqliteDatabase(sqliteFile, { readonly: true });

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
      closeProbeIfSafe(probe);
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
    tokens_compressed: number | null;
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
        schemaVersion: 5,
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
            compressed: row.tokens_compressed ?? null,
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

function shouldRunStartupDbHealthCheck(): boolean {
  if (process.env.OMNIROUTE_FORCE_DB_HEALTHCHECK === "1") return true;
  return !isAutomatedTestProcess();
}

function createManagedDbBackup(db: SqliteDatabase, reason: string): boolean {
  const isTest = isAutomatedTestProcess();
  if (isTest) return false;

  try {
    const backupDir = DB_BACKUPS_DIR || path.join(DATA_DIR, "db_backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = path.join(backupDir, `db_${timestamp}_${reason}.sqlite`);
    const escapedBackupPath = backupPath.replace(/'/g, "''");

    db.exec(`VACUUM INTO '${escapedBackupPath}'`);
    console.log(`[DB] Backup created (${reason}): ${backupPath}`);
    return true;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[DB] Failed to create ${reason} backup:`, message);
    return false;
  }
}

function createHealthCheckBackup(db: SqliteDatabase): boolean {
  return createManagedDbBackup(db, "health-check-repair");
}

function autoMigrateLegacyEncryptedConnections(db: SqliteDatabase): number {
  const rows = db.prepare("SELECT * FROM provider_connections").all() as JsonRecord[];
  const updateStmt = db.prepare(
    "UPDATE provider_connections SET api_key = @apiKey, id_token = @idToken, access_token = @accessToken, refresh_token = @refreshToken, updated_at = @updatedAt WHERE id = @id"
  );
  const encryptedFields = ["apiKey", "idToken", "accessToken", "refreshToken"] as const;
  let migratedCount = 0;
  let backupCreated = false;

  for (const row of rows) {
    const camelRow = rowToCamel(row);
    if (!camelRow) continue;

    let updatedRow = false;
    for (const field of encryptedFields) {
      if (typeof camelRow[field] !== "string") continue;

      const { updated, value } = migrateLegacyEncryptedString(camelRow[field]);
      if (updated) {
        camelRow[field] = value;
        updatedRow = true;
      }
    }

    if (!updatedRow) continue;
    if (!backupCreated) {
      createManagedDbBackup(db, "legacy-encryption-migration");
      backupCreated = true;
    }

    updateStmt.run({
      id: camelRow.id,
      apiKey: camelRow.apiKey ?? null,
      idToken: camelRow.idToken ?? null,
      accessToken: camelRow.accessToken ?? null,
      refreshToken: camelRow.refreshToken ?? null,
      updatedAt: new Date().toISOString(),
    });
    migratedCount++;
  }

  if (migratedCount > 0) {
    invalidateDbCache("connections");
    console.log(`[DB] Auto-migrated ${migratedCount} connection(s) to new static-salt encryption.`);
  }

  return migratedCount;
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
        skipIntegrityCheck: process.env.OMNIROUTE_SKIP_DB_HEALTHCHECK === "1",
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
    const memoryDb = openSqliteDatabase(":memory:");
    memoryDb.pragma("journal_mode = WAL");
    memoryDb.exec(SCHEMA_SQL);
    ensureUsageHistoryColumns(memoryDb);
    ensureUsageHistoryAccountIndex(memoryDb);
    ensureCallLogsColumns(memoryDb);
    ensureProviderConnectionsColumns(memoryDb);
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
    // Cycle-breaker: a previous probe failure renamed the DB to
    // `storage.sqlite.probe-failed-<ts>` and the next caller auto-restored it.
    // When the same DB continues to fail the probe (typically an OOM on a
    // large sql.js WASM load), the rename/restore cascade loops forever
    // because every subsystem (BATCH, HealthCheck, ProviderLimitsSync, ...)
    // hits the same code path during boot. Track restoration attempts on
    // globalThis; abort with a clear recovery message after 3 attempts so
    // the user gets a real error instead of a hung "Starting server...".
    if (
      (globalThis.__omnirouteDbProbeRestoreCount =
        (globalThis.__omnirouteDbProbeRestoreCount || 0) + 1) > 3
    ) {
      throw new Error(
        `[DB] Aborting startup: probe-failed/restore loop detected after 3 attempts. ` +
          `The preserved database at ${path.dirname(sqliteFile)} is unloadable under this runtime. ` +
          `Remove the probe-failed backups (storage.sqlite.probe-failed-*) from ${path.dirname(
            sqliteFile
          )} and restart, or restore the database from a known-good backup.`
      );
    }
    const latestBackup = probeFailureBackups[0];
    try {
      fs.renameSync(latestBackup, sqliteFile);
      console.log(
        `[DB] Auto-restored preserved database from previous probe failure: ${path.basename(latestBackup)}`
      );
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(
        `[DB] Manual recovery required before startup. ` +
          `Failed to auto-restore preserved database ${latestBackup}: ${msg}. ` +
          `Restore the preserved file or another backup to ${sqliteFile} before restarting.`
      );
    }
  }

  let preservedCriticalState: PreservedCriticalDbState = {
    captureSucceeded: true,
    captureError: null,
    preservedTables: [],
    skippedTables: [],
  };
  let failedProbePath: string | null = null;
  let failedProbeMessage: string | null = null;

  // Track whether the DB file is brand new (fresh DATA_DIR / Docker volume).
  // This is needed so the migration runner skips the mass-migration safety abort
  // that would otherwise trigger because heuristic seeding marks some migrations
  // as applied, making the fresh DB look like a wiped existing DB (#1328).
  const isNewDb = !fs.existsSync(sqliteFile);

  // Detect and handle old schema format — preserve data when possible (#146)
  // Uses a single probe connection that becomes the real connection when possible.
  if (fs.existsSync(sqliteFile)) {
    try {
      const probe = openSqliteDatabase(sqliteFile, { readonly: true });
      const hasOldSchema = probe
        .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='schema_migrations'")
        .get();

      if (hasOldSchema) {
        let hasData = false;
        try {
          const count = probe.prepare("SELECT COUNT(*) as c FROM provider_connections").get() as
            { c: number } | undefined;
          hasData = Boolean(count && count.c > 0);
        } catch {
          // Table might not exist at all — truly incompatible
        }
        closeProbeIfSafe(probe);

        if (hasData) {
          console.log(
            `[DB] Old schema_migrations table found but data exists — preserving data (#146)`
          );
          const fixDb = openSqliteDatabase(sqliteFile);
          try {
            fixDb.exec("DROP TABLE IF EXISTS schema_migrations");
            fixDb.pragma("wal_checkpoint(TRUNCATE)");
          } catch (e: unknown) {
            const message = e instanceof Error ? e.message : String(e);
            console.warn("[DB] Could not clean up old schema table:", message);
          } finally {
            closeProbeIfSafe(fixDb);
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
        closeProbeIfSafe(probe);
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      console.warn("[DB] Could not probe existing DB:", message);

      // If the error is a Node module/ABI failure, throw it immediately to avoid renaming the database
      if (
        isNativeSqliteLoadError(e) ||
        isSqliteDriverUnavailableError(e) ||
        message.includes("could not be found")
      ) {
        throw e;
      }
      // OOM during probe = the DB is too large to load under the current
      // V8 heap (sql.js loads the whole file into WASM memory). Throwing
      // immediately gives the user a clear "increase --max-old-space-size"
      // signal instead of silently renaming a perfectly good DB.
      if (
        /out of memory|allocation failure|Array buffer allocation failed|allocation failed/i.test(
          message
        )
      ) {
        // Cycle-breaker (#6835): the OOM path never renames the file away,
        // so it never trips the generic probe-failed/restore cap above. Cap
        // it independently after 3 consecutive OOM failures (same threshold
        // as the generic path) so repeated polling doesn't hang forever with
        // no actionable terminal diagnostic.
        if (
          (globalThis.__omnirouteDbOomFailureCount =
            (globalThis.__omnirouteDbOomFailureCount || 0) + 1) > 3
        ) {
          throw new Error(
            `[DB] Aborting startup: persistent out-of-memory probing ${sqliteFile} after 3 attempts. ` +
              `Increase the V8 heap with NODE_OPTIONS=--max-old-space-size=4096 (or higher) — the ` +
              `current heap is insufficient for this database — and restart, or shrink/restore the ` +
              `database from a backup. Original error: ${message}`
          );
        }
        throw new Error(
          `[DB] Out of memory while probing ${sqliteFile}. ` +
            `The bundled sql.js driver loads the entire file into WASM memory; ` +
            `increase the V8 heap with NODE_OPTIONS=--max-old-space-size=4096 (or higher) ` +
            `and restart, or restore the database from a backup. ` +
            `Original error: ${message}`
        );
      }
      preservedCriticalState = captureCriticalDbState(sqliteFile);

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

  const db = openSqliteDatabase(sqliteFile);
  db.pragma("journal_mode = WAL");
  // better-sqlite3 is synchronous, so a contended write parks the Node event loop for up to
  // busy_timeout ms (a 0-CPU freeze that stacks under load → /health stops responding). The
  // hot-path writers here (usage_history, call_logs) are best-effort and the WinUI host opens
  // the same DB, so cap the block at 2s instead of 5s: normal writes complete in <1ms, and a
  // contended op can no longer freeze the loop past the host watchdog's 6s liveness probe.
  db.pragma("busy_timeout = 2000");
  db.pragma("synchronous = NORMAL");
  db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
  db.pragma("temp_store = MEMORY");
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

  runMigrations(db, { isNewDb });
  // Fresh installs need the same post-migration index guarantee as upgraded
  // databases, including recovery from an interrupted migration 127 attempt.
  ensureUsageHistoryAccountIndex(db);

  applyStoredDatabaseOptimizationSettings(db);

  // Apply mmap_size from stored settings (migration 046), fallback to 256MiB
  try {
    const mmapRow = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get("databaseSettings", "mmapSize") as { value: string } | undefined;
    const mmapSize = mmapRow ? Math.max(0, parseInt(mmapRow.value, 10) || 0) : 268435456;
    if (mmapSize > 0) {
      db.pragma(`mmap_size = ${mmapSize}`);
    }
  } catch {
    // mmap_size is best-effort; not available in all runtimes (e.g. web)
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
        closeProbeIfSafe(db);
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
    const skipIntegrityCheck = process.env.OMNIROUTE_SKIP_DB_HEALTHCHECK === "1";
    if (skipIntegrityCheck) {
      console.log("[DB] Health check skipped (OMNIROUTE_SKIP_DB_HEALTHCHECK=1)");
    }
    runDbHealthCheck(db, {
      autoRepair: true,
      expectedSchemaVersion: "1",
      skipIntegrityCheck,
      createBackupBeforeRepair: () => createHealthCheckBackup(db),
    });
  }

  setDb(db);

  // Re-encrypt any tokens using the legacy dynamic salt to canonical static salt
  try {
    autoMigrateLegacyEncryptedConnections(db);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[DB] Legacy encryption migration failed: ${message}`);
  }

  startDbHealthCheckScheduler(db);
  // Log the resolved absolute DATA_DIR + SQLITE_FILE once at init so a
  // multi-replica / Docker volume-topology mismatch (each replica opening a
  // different on-disk DB → "phantom"/missing combos & connections) is
  // diagnosable straight from the logs. (#3147)
  console.log(
    `[DB] SQLite database ready: ${sqliteFile} ` +
      `(DATA_DIR=${path.resolve(DATA_DIR)}, SQLITE_FILE=${path.resolve(sqliteFile)})`
  );
  return db;
}

/**
 * Lightweight liveness probe — runs `SELECT 1` against the singleton DB.
 * Returns `true` if the database is reachable, `false` on any error.
 * Intended for use by the `/api/health/ping` route (Hard Rule #5: no raw SQL in routes).
 */
export function pingDb(): boolean {
  try {
    const result = getDbInstance().prepare("SELECT 1 AS ok").get() as { ok: number } | undefined;
    return result?.ok === 1;
  } catch {
    return false;
  }
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
      // Module-level caches (prepared statements, schema-check memos — e.g.
      // apiKeys.ts) are bound to the closed connection. Without this, a recreated
      // DB (tests, backup restore of an older snapshot) hits "no such column"
      // on the stale re-prepare path. backup.ts already does this on restore;
      // close/reset must too (found by the 6A.1 orphan-test re-wire, 2026-06-09).
      resetAllDbModuleState();
    }
  }

  return true;
}

/**
 * Reset the singleton (used by restore).
 */
export function resetDbInstance() {
  closeDbInstance();
  // Read caches outlive the SQLite singleton. A reset swaps the backing
  // database, so retaining cached rows can leak the previous database's
  // connections/settings into the newly opened instance (tests and restore).
  invalidateDbCache();
}

// ──────────────── Runtime Driver Info ────────────────

type DbDriverInfo = { source: string; kind: string };
let driverInfoCached: DbDriverInfo | null = null;

function setDriverInfo(info: DbDriverInfo) {
  driverInfoCached = info;
}

/** Returns how better-sqlite3 was resolved (bundled / runtime / etc.). Null if not yet init. */
export function getDriverInfo(): DbDriverInfo | null {
  return driverInfoCached;
}

/**
 * Async initializer that pre-resolves the SQLite runtime before first DB access.
 *
 * Call this at process startup (before any call to getDbInstance()) so that
 * if the bundled better-sqlite3 binary is unavailable, the runtime installer
 * can place it in ~/.omniroute/runtime/ without blocking a synchronous caller.
 *
 * Idempotent — safe to call multiple times.
 */
export async function ensureDbInitialized(): Promise<void> {
  if (getDb()) return;

  // Cloud/build: getDbInstance() cria in-memory, sem necessidade de pré-init
  if (isCloud || isBuildPhase || !SQLITE_FILE) {
    getDbInstance();
    return;
  }

  // Tenta drivers síncronos primeiro
  const sync = tryOpenSync(SQLITE_FILE);
  if (sync) {
    // Drivers síncronos disponíveis — fechar o probe, getDbInstance() vai abrir com setup completo
    sync.close();
    getDbInstance();
    return;
  }

  // No synchronous driver available — pre-initialize sql.js (WASM, async)
  console.warn("[DB] Pre-initializing sql.js WASM (synchronous drivers unavailable)...");
  await preInitSqlJs(SQLITE_FILE);
  // Agora getSqlJsAdapter() retornará o adapter, e getDbInstance() vai usá-lo
  getDbInstance();
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

// ──────────────── Auto-Vacuum Management ────────────────

export function applyDatabaseOptimizationSettings(settings: DatabaseOptimizationSettings): void {
  applyDatabaseOptimizationSettingsForDb(getDbInstance(), settings, { applyPersistent: true });
}

export function setAutoVacuum(mode: "NONE" | "FULL" | "INCREMENTAL"): void {
  setAutoVacuumForDb(getDbInstance(), mode);
}

export function getAutoVacuumMode(): "NONE" | "FULL" | "INCREMENTAL" {
  return getAutoVacuumModeForDb(getDbInstance());
}

export function runManualVacuum(): { success: boolean; duration: number; error?: string } {
  const db = getDbInstance();
  const startTime = Date.now();

  try {
    console.log("[DB] Starting manual VACUUM...");
    db.exec("VACUUM");
    const duration = Date.now() - startTime;
    console.log(`[DB] Manual VACUUM completed in ${duration}ms`);
    return { success: true, duration };
  } catch (err: unknown) {
    const duration = Date.now() - startTime;
    console.error("[DB] Manual VACUUM failed:", err);
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, duration, error: message };
  }
}

export function setPageSize(pageSize: number): void {
  setPageSizeForDb(getDbInstance(), pageSize);
}

export function setCacheSize(cacheSizeKb: number): void {
  setCacheSizeForDb(getDbInstance(), cacheSizeKb);
}
