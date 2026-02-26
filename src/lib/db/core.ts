/**
 * db/core.js — Database infrastructure: schema, singleton, utils, migration.
 *
 * All domain modules import `getDbInstance` and helpers from here.
 */

import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import { resolveDataDir, getLegacyDotDataDir } from "../dataPaths";
import { runMigrations } from "./migrationRunner";

// ──────────────── Environment Detection ────────────────

export const isCloud = typeof globalThis.caches === "object" && globalThis.caches !== null;

export const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

// ──────────────── Paths ────────────────

export const DATA_DIR = resolveDataDir({ isCloud });
const LEGACY_DATA_DIR = isCloud ? null : getLegacyDotDataDir();
export const SQLITE_FILE = isCloud ? null : path.join(DATA_DIR, "storage.sqlite");
const JSON_DB_FILE = isCloud ? null : path.join(DATA_DIR, "db.json");
export const DB_BACKUPS_DIR = isCloud ? null : path.join(DATA_DIR, "db_backups");

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
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS api_keys (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    key TEXT NOT NULL UNIQUE,
    machine_id TEXT,
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
    provider TEXT,
    account TEXT,
    connection_id TEXT,
    duration INTEGER DEFAULT 0,
    tokens_in INTEGER DEFAULT 0,
    tokens_out INTEGER DEFAULT 0,
    source_format TEXT,
    target_format TEXT,
    api_key_id TEXT,
    api_key_name TEXT,
    combo_name TEXT,
    request_body TEXT,
    response_body TEXT,
    error TEXT
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
    monthly_limit_usd REAL DEFAULT 0,
    warning_threshold REAL DEFAULT 0.8
  );

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

export function toSnakeCase(str) {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

export function objToSnake(obj) {
  if (!obj || typeof obj !== "object") return obj;
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    result[toSnakeCase(k)] = v;
  }
  return result;
}

export function rowToCamel(row) {
  if (!row) return null;
  const result = {};
  for (const [k, v] of Object.entries(row)) {
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

export function cleanNulls(obj) {
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== null && v !== undefined) {
      result[k] = v;
    }
  }
  return result;
}

// ──────────────── Singleton DB Instance ────────────────

let _db = null;

function ensureProviderConnectionsColumns(db) {
  try {
    const columns = db.prepare("PRAGMA table_info(provider_connections)").all();
    const columnNames = new Set(columns.map((column) => column.name));
    if (!columnNames.has("rate_limit_protection")) {
      db.exec(
        "ALTER TABLE provider_connections ADD COLUMN rate_limit_protection INTEGER DEFAULT 0"
      );
      console.log("[DB] Added provider_connections.rate_limit_protection column");
    }
  } catch (error) {
    console.warn("[DB] Failed to verify provider_connections schema:", error.message);
  }
}

export function getDbInstance() {
  if (_db) return _db;

  if (isCloud || isBuildPhase) {
    if (isBuildPhase) {
      console.log("[DB] Build phase detected — using in-memory SQLite (read-only)");
    }
    _db = new Database(":memory:");
    _db.pragma("journal_mode = WAL");
    _db.exec(SCHEMA_SQL);
    return _db;
  }

  // Detect and replace old incompatible schema
  if (fs.existsSync(SQLITE_FILE)) {
    try {
      const probe = new Database(SQLITE_FILE, { readonly: true });
      const hasOldSchema = probe
        .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='schema_migrations'")
        .get();
      probe.close();

      if (hasOldSchema) {
        const oldPath = SQLITE_FILE + ".old-schema";
        console.log(
          `[DB] Old incompatible schema detected — renaming to ${path.basename(oldPath)}`
        );
        fs.renameSync(SQLITE_FILE, oldPath);
        for (const ext of ["-wal", "-shm"]) {
          try {
            if (fs.existsSync(SQLITE_FILE + ext)) fs.unlinkSync(SQLITE_FILE + ext);
          } catch {
            /* ok */
          }
        }
      }
    } catch (e) {
      console.warn("[DB] Could not probe existing DB, will create fresh:", e.message);
      try {
        fs.unlinkSync(SQLITE_FILE);
      } catch {
        /* ok */
      }
    }
  }

  _db = new Database(SQLITE_FILE);
  _db.pragma("journal_mode = WAL");
  _db.pragma("busy_timeout = 5000");
  _db.pragma("synchronous = NORMAL");
  _db.exec(SCHEMA_SQL);
  ensureProviderConnectionsColumns(_db);

  // ── Versioned Migrations ──
  // Auto-seed 001 as applied (the inline SCHEMA_SQL already created these tables)
  // then run any new migrations (002+)
  _db.exec(`
    CREATE TABLE IF NOT EXISTS _omniroute_migrations (
      version TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    INSERT OR IGNORE INTO _omniroute_migrations (version, name)
    VALUES ('001', 'initial_schema');
  `);
  runMigrations(_db);

  // Auto-migrate from db.json if exists
  if (JSON_DB_FILE && fs.existsSync(JSON_DB_FILE)) {
    migrateFromJson(_db, JSON_DB_FILE);
  }

  // Store schema version
  const versionStmt = _db.prepare(
    "INSERT OR REPLACE INTO db_meta (key, value) VALUES ('schema_version', '1')"
  );
  versionStmt.run();

  console.log(`[DB] SQLite database ready: ${SQLITE_FILE}`);
  return _db;
}

/**
 * Reset the singleton (used by restore).
 */
export function resetDbInstance() {
  if (_db) {
    _db.close();
    _db = null;
  }
}

// ──────────────── JSON → SQLite Migration ────────────────

function migrateFromJson(db, jsonPath) {
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
          token_type, consecutive_use_count, rate_limit_protection, created_at, updated_at
        ) VALUES (
          @id, @provider, @authType, @name, @email, @priority, @isActive,
          @accessToken, @refreshToken, @expiresAt, @tokenExpiresAt,
          @scope, @projectId, @testStatus, @errorCode, @lastError,
          @lastErrorAt, @lastErrorType, @lastErrorSource, @backoffLevel,
          @rateLimitedUntil, @healthCheckInterval, @lastHealthCheckAt,
          @lastTested, @apiKey, @idToken, @providerSpecificData,
          @expiresIn, @displayName, @globalPriority, @defaultModel,
          @tokenType, @consecutiveUseCount, @rateLimitProtection, @createdAt, @updatedAt
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
        INSERT OR REPLACE INTO combos (id, name, data, created_at, updated_at)
        VALUES (@id, @name, @data, @createdAt, @updatedAt)
      `);
      for (const combo of data.combos || []) {
        insertCombo.run({
          id: combo.id,
          name: combo.name,
          data: JSON.stringify(combo),
          createdAt: combo.createdAt || new Date().toISOString(),
          updatedAt: combo.updatedAt || new Date().toISOString(),
        });
      }

      // 5. API Keys
      const insertKey = db.prepare(`
        INSERT OR REPLACE INTO api_keys (id, name, key, machine_id, created_at)
        VALUES (@id, @name, @key, @machineId, @createdAt)
      `);
      for (const apiKey of data.apiKeys || []) {
        insertKey.run({
          id: apiKey.id,
          name: apiKey.name,
          key: apiKey.key,
          machineId: apiKey.machineId || null,
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
