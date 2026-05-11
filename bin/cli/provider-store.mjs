import { randomUUID } from "node:crypto";
import { decryptCredential, encryptCredential } from "./encryption.mjs";

const REQUIRED_PROVIDER_COLUMNS = [
  ["auth_type", "TEXT"],
  ["name", "TEXT"],
  ["email", "TEXT"],
  ["priority", "INTEGER DEFAULT 0"],
  ["is_active", "INTEGER DEFAULT 1"],
  ["access_token", "TEXT"],
  ["refresh_token", "TEXT"],
  ["expires_at", "TEXT"],
  ["token_expires_at", "TEXT"],
  ["scope", "TEXT"],
  ["project_id", "TEXT"],
  ["test_status", "TEXT"],
  ["error_code", "TEXT"],
  ["last_error", "TEXT"],
  ["last_error_at", "TEXT"],
  ["last_error_type", "TEXT"],
  ["last_error_source", "TEXT"],
  ["backoff_level", "INTEGER DEFAULT 0"],
  ["rate_limited_until", "TEXT"],
  ["health_check_interval", "INTEGER"],
  ["last_health_check_at", "TEXT"],
  ["last_tested", "TEXT"],
  ["api_key", "TEXT"],
  ["id_token", "TEXT"],
  ["provider_specific_data", "TEXT"],
  ["expires_in", "INTEGER"],
  ["display_name", "TEXT"],
  ["global_priority", "INTEGER"],
  ["default_model", "TEXT"],
  ["token_type", "TEXT"],
  ["consecutive_use_count", "INTEGER DEFAULT 0"],
  ["rate_limit_protection", "INTEGER DEFAULT 0"],
  ["last_used_at", "TEXT"],
  ['"group"', "TEXT"],
  ["max_concurrent", "INTEGER"],
  ["created_at", "TEXT"],
  ["updated_at", "TEXT"],
];

function ensureProviderColumns(db) {
  const existingColumns = new Set(
    db
      .prepare("PRAGMA table_info(provider_connections)")
      .all()
      .map((column) => column.name)
  );

  const missingColumns = REQUIRED_PROVIDER_COLUMNS.filter(([name]) => {
    const normalizedName = name.replaceAll('"', "");
    return !existingColumns.has(normalizedName);
  });

  if (missingColumns.length === 0) return;

  db.transaction(() => {
    for (const [name, type] of missingColumns) {
      db.prepare(`ALTER TABLE provider_connections ADD COLUMN ${name} ${type}`).run();
    }
  })();
}

export function ensureProviderSchema(db) {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS provider_connections (
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
    )`
  ).run();
  ensureProviderColumns(db);
  db.prepare("CREATE INDEX IF NOT EXISTS idx_pc_provider ON provider_connections(provider)").run();
  db.prepare("CREATE INDEX IF NOT EXISTS idx_pc_active ON provider_connections(is_active)").run();
  db.prepare(
    "CREATE INDEX IF NOT EXISTS idx_pc_priority ON provider_connections(provider, priority)"
  ).run();
}

function nextPriority(db, provider) {
  const row = db
    .prepare("SELECT MAX(priority) as max_priority FROM provider_connections WHERE provider = ?")
    .get(provider);
  return Number(row?.max_priority || 0) + 1;
}

function parseJsonObject(value) {
  if (!value || typeof value !== "string") return undefined;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function rowToConnection(row) {
  return {
    id: row.id,
    provider: row.provider,
    authType: row.auth_type || "oauth",
    name: row.name || row.display_name || row.email || row.provider,
    email: row.email || null,
    priority: row.priority || 0,
    isActive: row.is_active !== 0,
    apiKey: row.api_key || null,
    accessToken: row.access_token || null,
    refreshToken: row.refresh_token || null,
    idToken: row.id_token || null,
    providerSpecificData: parseJsonObject(row.provider_specific_data),
    testStatus: row.test_status || "unknown",
    defaultModel: row.default_model || null,
    lastTested: row.last_tested || null,
    lastError: row.last_error || null,
    updatedAt: row.updated_at || null,
    createdAt: row.created_at || null,
  };
}

export function listProviderConnections(db) {
  ensureProviderSchema(db);
  return db
    .prepare(
      `SELECT * FROM provider_connections
       ORDER BY provider ASC, priority ASC, updated_at DESC`
    )
    .all()
    .map(rowToConnection);
}

export function findProviderConnection(db, selector) {
  const normalized = String(selector || "")
    .trim()
    .toLowerCase();
  if (!normalized) return null;

  const connections = listProviderConnections(db);
  return (
    connections.find((connection) => connection.id.toLowerCase() === normalized) ||
    connections.find((connection) => connection.id.toLowerCase().startsWith(normalized)) ||
    connections.find((connection) => String(connection.name || "").toLowerCase() === normalized) ||
    connections.find((connection) => connection.provider.toLowerCase() === normalized) ||
    null
  );
}

export function getProviderApiKey(connection) {
  if (connection.authType !== "apikey") {
    throw new Error(`Connection ${connection.name} is not an API-key provider.`);
  }
  if (!connection.apiKey) {
    throw new Error(`Connection ${connection.name} has no API key configured.`);
  }
  return decryptCredential(connection.apiKey);
}

export function upsertApiKeyProviderConnection(db, input) {
  ensureProviderSchema(db);

  const provider = input.provider;
  const name = input.name || provider;
  const now = new Date().toISOString();
  const existing = db
    .prepare(
      "SELECT id, priority FROM provider_connections WHERE provider = ? AND auth_type = 'apikey' AND name = ?"
    )
    .get(provider, name);

  const connection = {
    id: existing?.id || randomUUID(),
    provider,
    authType: "apikey",
    name,
    priority: existing?.priority || nextPriority(db, provider),
    isActive: 1,
    apiKey: encryptCredential(input.apiKey),
    testStatus: input.testStatus || "unknown",
    defaultModel: input.defaultModel || null,
    providerSpecificData: input.providerSpecificData
      ? JSON.stringify(input.providerSpecificData)
      : null,
    createdAt: input.createdAt || now,
    updatedAt: now,
  };

  db.prepare(
    `INSERT INTO provider_connections (
      id, provider, auth_type, name, priority, is_active, api_key, provider_specific_data,
      test_status, default_model, created_at, updated_at
    ) VALUES (
      @id, @provider, @authType, @name, @priority, @isActive, @apiKey, @providerSpecificData,
      @testStatus, @defaultModel, @createdAt, @updatedAt
    )
    ON CONFLICT(id) DO UPDATE SET
      api_key = excluded.api_key,
      provider_specific_data = excluded.provider_specific_data,
      test_status = excluded.test_status,
      default_model = excluded.default_model,
      is_active = excluded.is_active,
      updated_at = excluded.updated_at`
  ).run(connection);

  return connection;
}

export function updateProviderTestResult(db, connectionId, result) {
  ensureProviderSchema(db);
  const now = new Date().toISOString();
  const valid = result?.valid === true;

  db.prepare(
    `UPDATE provider_connections SET
      test_status = @testStatus,
      last_error = @lastError,
      last_error_at = @lastErrorAt,
      last_error_type = @lastErrorType,
      last_error_source = @lastErrorSource,
      error_code = @errorCode,
      last_tested = @lastTested,
      updated_at = @updatedAt
    WHERE id = @id`
  ).run({
    id: connectionId,
    testStatus: valid ? "active" : "error",
    lastError: valid ? null : result?.error || "Provider test failed",
    lastErrorAt: valid ? null : now,
    lastErrorType: valid ? null : "connection_test_failed",
    lastErrorSource: valid ? null : "upstream",
    errorCode: valid ? null : result?.statusCode || null,
    lastTested: now,
    updatedAt: now,
  });

  return {
    ...result,
    testedAt: now,
  };
}
