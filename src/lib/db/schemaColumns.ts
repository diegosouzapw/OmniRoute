/**
 * db/schemaColumns.ts — idempotent schema-column reconciliation + table introspection.
 *
 * Extracted from db/core.ts (god-file decomposition): the helpers that bring older SQLite
 * files up to the current column set (ALTER TABLE … ADD COLUMN, guarded by PRAGMA
 * table_info) plus the small introspection utilities they build on. Each takes the db
 * handle explicitly — no module state — so they live as a co-located leaf that core.ts
 * calls during getDbInstance() bootstrap. Behavior-preserving move.
 */

import type { SqliteAdapter } from "./adapters/types";

type SqliteDatabase = SqliteAdapter;

export function ensureProviderConnectionsColumns(db: SqliteDatabase) {
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
    if (!columnNames.has("proxy_enabled")) {
      db.exec(
        "ALTER TABLE provider_connections ADD COLUMN proxy_enabled INTEGER NOT NULL DEFAULT 1"
      );
      console.log("[DB] Added provider_connections.proxy_enabled column");
    }
    if (!columnNames.has("per_key_proxy_enabled")) {
      db.exec(
        "ALTER TABLE provider_connections ADD COLUMN per_key_proxy_enabled INTEGER NOT NULL DEFAULT 0"
      );
      console.log("[DB] Added provider_connections.per_key_proxy_enabled column");
    }
    if (!columnNames.has("quota_visible")) {
      db.exec(
        "ALTER TABLE provider_connections ADD COLUMN quota_visible INTEGER NOT NULL DEFAULT 1"
      );
      console.log("[DB] Added provider_connections.quota_visible column");
    }
    if (!columnNames.has("quota_window_thresholds_json")) {
      db.exec("ALTER TABLE provider_connections ADD COLUMN quota_window_thresholds_json TEXT");
      console.log("[DB] Added provider_connections.quota_window_thresholds_json column");
    }
    if (!columnNames.has("rate_limit_overrides_json")) {
      db.exec("ALTER TABLE provider_connections ADD COLUMN rate_limit_overrides_json TEXT");
      console.log("[DB] Added provider_connections.rate_limit_overrides_json column");
    }
    // `refresh_token` is part of 001_initial_schema.sql, but `CREATE TABLE IF NOT EXISTS`
    // is a no-op on a pre-existing legacy table that predates it — heal it defensively
    // before the index below relies on it, or a very old DB fails startup entirely.
    if (!columnNames.has("refresh_token")) {
      db.exec("ALTER TABLE provider_connections ADD COLUMN refresh_token TEXT");
      console.log("[DB] Added provider_connections.refresh_token column");
    }
    db.exec(
      "CREATE INDEX IF NOT EXISTS idx_pc_max_concurrent ON provider_connections(provider, max_concurrent)"
    );
    db.exec(
      "CREATE INDEX IF NOT EXISTS idx_pc_auth_active_refresh ON provider_connections(auth_type, is_active, refresh_token)"
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[DB] Failed to verify provider_connections schema:", message);
  }
}

export function ensureUsageHistoryColumns(db: SqliteDatabase) {
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
    if (!columnNames.has("service_tier")) {
      db.exec("ALTER TABLE usage_history ADD COLUMN service_tier TEXT DEFAULT 'standard'");
      console.log("[DB] Added usage_history.service_tier column");
    }
    db.exec("CREATE INDEX IF NOT EXISTS idx_uh_service_tier ON usage_history(service_tier)");
    if (!columnNames.has("combo_strategy")) {
      db.exec("ALTER TABLE usage_history ADD COLUMN combo_strategy TEXT DEFAULT 'direct'");
      console.log("[DB] Added usage_history.combo_strategy column");
    }
    db.exec("CREATE INDEX IF NOT EXISTS idx_uh_combo_strategy ON usage_history(combo_strategy)");
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[DB] Failed to verify usage_history schema:", message);
  }
}

export function ensureCallLogsColumns(db: SqliteDatabase) {
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
    if (!columnNames.has("correlation_id")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN correlation_id TEXT DEFAULT NULL");
      console.log("[DB] Added call_logs.correlation_id column");
    }
    if (!columnNames.has("model_pinned")) {
      db.exec("ALTER TABLE call_logs ADD COLUMN model_pinned INTEGER DEFAULT 0");
      console.log("[DB] Added call_logs.model_pinned column");
    }

    db.exec(
      "CREATE INDEX IF NOT EXISTS idx_call_logs_requested_model ON call_logs(requested_model)"
    );
    db.exec("CREATE INDEX IF NOT EXISTS idx_call_logs_request_type ON call_logs(request_type)");
    db.exec(
      "CREATE INDEX IF NOT EXISTS idx_cl_combo_target ON call_logs(combo_name, combo_execution_key, timestamp)"
    );
    db.exec("CREATE INDEX IF NOT EXISTS idx_cl_correlation_id ON call_logs(correlation_id)");
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[DB] Failed to verify call_logs schema:", message);
  }
}

export function hasColumn(db: SqliteDatabase, tableName: string, columnName: string): boolean {
  const rows = db.prepare(`PRAGMA table_info(${tableName})`).all() as Array<{ name?: string }>;
  return rows.some((row) => row.name === columnName);
}

export function hasTable(db: SqliteDatabase, tableName: string): boolean {
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(tableName)
  );
}

export function quoteIdentifier(identifier: string): string {
  return `"${identifier.replace(/"/g, '""')}"`;
}

export function getTableColumns(db: SqliteDatabase, tableName: string): string[] {
  return (
    db.prepare(`PRAGMA table_info(${quoteIdentifier(tableName)})`).all() as Array<{ name?: string }>
  )
    .map((column) => String(column.name ?? ""))
    .filter((column) => column.length > 0);
}
