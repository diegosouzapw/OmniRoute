/**
 * db/providers.js — Provider connections and nodes CRUD.
 */

import { v4 as uuidv4 } from "uuid";
import { getDbInstance, rowToCamel, cleanNulls } from "./core";
import { backupDbFile } from "./backup";
import { encryptConnectionFields, decryptConnectionFields } from "./encryption";

// ──────────────── Provider Connections ────────────────

export async function getProviderConnections(filter: any = {}) {
  const db = getDbInstance();
  let sql = "SELECT * FROM provider_connections";
  const conditions: string[] = [];
  const params: Record<string, unknown> = {};

  if (filter.provider) {
    conditions.push("provider = @provider");
    params.provider = filter.provider;
  }
  if (filter.isActive !== undefined) {
    conditions.push("is_active = @isActive");
    params.isActive = filter.isActive ? 1 : 0;
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }
  sql += " ORDER BY priority ASC, updated_at DESC";

  const rows = db.prepare(sql).all(params);
  return rows.map((r) => decryptConnectionFields(cleanNulls(rowToCamel(r))));
}

export async function getProviderConnectionById(id: string) {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM provider_connections WHERE id = ?").get(id);
  return row ? decryptConnectionFields(cleanNulls(rowToCamel(row))) : null;
}

export async function createProviderConnection(data: any) {
  const db = getDbInstance();
  const now = new Date().toISOString();

  // Upsert check
  // For Codex/OpenAI, a single email can have multiple workspaces (Team + Personal)
  // We need to check for workspace uniqueness, not just email
  let existing = null;

  if (data.authType === "oauth" && data.email) {
    // For Codex, check for existing connection with same workspace
    const workspaceId = data.providerSpecificData?.workspaceId;
    if (data.provider === "codex" && workspaceId) {
      // For Codex, check for existing connection with same workspace AND email
      // A single workspace can have multiple users (Team/Business plans)
      // We need both workspace + email uniqueness to allow multiple accounts
      existing = db
        .prepare(
          "SELECT * FROM provider_connections WHERE provider = ? AND auth_type = 'oauth' AND json_extract(provider_specific_data, '$.workspaceId') = ? AND email = ?"
        )
        .get(data.provider, workspaceId, data.email);

      // If no match with workspace+email, also check workspace-only for backward compat
      // (old connections without email should still be updated, not duplicated)
      if (!existing) {
        existing = db
          .prepare(
            "SELECT * FROM provider_connections WHERE provider = ? AND auth_type = 'oauth' AND json_extract(provider_specific_data, '$.workspaceId') = ? AND (email IS NULL OR email = '')"
          )
          .get(data.provider, workspaceId);
      }
      // For Codex with workspaceId, don't fall back to email-only check
      // This allows creating new connections for different workspaces
    } else {
      // For other providers (or Codex without workspaceId), use email check
      existing = db
        .prepare(
          "SELECT * FROM provider_connections WHERE provider = ? AND auth_type = 'oauth' AND email = ?"
        )
        .get(data.provider, data.email);
    }
  } else if (data.authType === "apikey" && data.name) {
    existing = db
      .prepare(
        "SELECT * FROM provider_connections WHERE provider = ? AND auth_type = 'apikey' AND name = ?"
      )
      .get(data.provider, data.name);
  }

  if (existing) {
    const merged = { ...rowToCamel(existing), ...data, updatedAt: now };
    _updateConnectionRow(db, existing.id, merged);
    backupDbFile("pre-write");
    return cleanNulls(merged);
  }

  // Generate name
  let connectionName = data.name || null;
  if (!connectionName && data.authType === "oauth") {
    if (data.email) {
      connectionName = data.email;
    } else {
      const count =
        db
          .prepare("SELECT COUNT(*) as cnt FROM provider_connections WHERE provider = ?")
          .get(data.provider)?.cnt || 0;
      connectionName = `Account ${count + 1}`;
    }
  }

  // Auto-increment priority
  let connectionPriority = data.priority;
  if (!connectionPriority) {
    const max = db
      .prepare("SELECT MAX(priority) as maxP FROM provider_connections WHERE provider = ?")
      .get(data.provider);
    connectionPriority = (max?.maxP || 0) + 1;
  }

  const connection: Record<string, any> = {
    id: uuidv4(),
    provider: data.provider,
    authType: data.authType || "oauth",
    name: connectionName,
    priority: connectionPriority,
    isActive: data.isActive !== undefined ? data.isActive : true,
    createdAt: now,
    updatedAt: now,
  };

  // Optional fields
  const optionalFields = [
    "displayName",
    "email",
    "globalPriority",
    "defaultModel",
    "accessToken",
    "refreshToken",
    "expiresAt",
    "tokenType",
    "scope",
    "idToken",
    "projectId",
    "apiKey",
    "testStatus",
    "lastTested",
    "lastError",
    "lastErrorAt",
    "lastErrorType",
    "lastErrorSource",
    "rateLimitedUntil",
    "expiresIn",
    "errorCode",
    "consecutiveUseCount",
    "rateLimitProtection",
  ];
  for (const field of optionalFields) {
    if (data[field] !== undefined && data[field] !== null) {
      connection[field] = data[field];
    }
  }
  if (data.providerSpecificData && Object.keys(data.providerSpecificData).length > 0) {
    connection.providerSpecificData = data.providerSpecificData;
  }

  _insertConnectionRow(db, encryptConnectionFields({ ...connection }));
  _reorderConnections(db, data.provider);
  backupDbFile("pre-write");

  return cleanNulls(connection);
}

function _insertConnectionRow(db: any, conn: any) {
  db.prepare(
    `
    INSERT INTO provider_connections (
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
  `
  ).run({
    id: conn.id,
    provider: conn.provider,
    authType: conn.authType || null,
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
    createdAt: conn.createdAt,
    updatedAt: conn.updatedAt,
  });
}

function _updateConnectionRow(db: any, id: string, data: any) {
  const now = data.updatedAt || new Date().toISOString();
  db.prepare(
    `
    UPDATE provider_connections SET
      provider = @provider, auth_type = @authType, name = @name, email = @email,
      priority = @priority, is_active = @isActive, access_token = @accessToken,
      refresh_token = @refreshToken, expires_at = @expiresAt, token_expires_at = @tokenExpiresAt,
      scope = @scope, project_id = @projectId, test_status = @testStatus, error_code = @errorCode,
      last_error = @lastError, last_error_at = @lastErrorAt, last_error_type = @lastErrorType,
      last_error_source = @lastErrorSource, backoff_level = @backoffLevel,
      rate_limited_until = @rateLimitedUntil, health_check_interval = @healthCheckInterval,
      last_health_check_at = @lastHealthCheckAt, last_tested = @lastTested, api_key = @apiKey,
      id_token = @idToken, provider_specific_data = @providerSpecificData,
      expires_in = @expiresIn, display_name = @displayName, global_priority = @globalPriority,
      default_model = @defaultModel, token_type = @tokenType,
      consecutive_use_count = @consecutiveUseCount,
      rate_limit_protection = @rateLimitProtection,
      updated_at = @updatedAt
    WHERE id = @id
  `
  ).run({
    id,
    provider: data.provider,
    authType: data.authType || null,
    name: data.name || null,
    email: data.email || null,
    priority: data.priority || 0,
    isActive: data.isActive === false ? 0 : 1,
    accessToken: data.accessToken || null,
    refreshToken: data.refreshToken || null,
    expiresAt: data.expiresAt || null,
    tokenExpiresAt: data.tokenExpiresAt || null,
    scope: data.scope || null,
    projectId: data.projectId || null,
    testStatus: data.testStatus || null,
    errorCode: data.errorCode || null,
    lastError: data.lastError || null,
    lastErrorAt: data.lastErrorAt || null,
    lastErrorType: data.lastErrorType || null,
    lastErrorSource: data.lastErrorSource || null,
    backoffLevel: data.backoffLevel || 0,
    rateLimitedUntil: data.rateLimitedUntil || null,
    healthCheckInterval: data.healthCheckInterval || null,
    lastHealthCheckAt: data.lastHealthCheckAt || null,
    lastTested: data.lastTested || null,
    apiKey: data.apiKey || null,
    idToken: data.idToken || null,
    providerSpecificData: data.providerSpecificData
      ? JSON.stringify(data.providerSpecificData)
      : null,
    expiresIn: data.expiresIn || null,
    displayName: data.displayName || null,
    globalPriority: data.globalPriority || null,
    defaultModel: data.defaultModel || null,
    tokenType: data.tokenType || null,
    consecutiveUseCount: data.consecutiveUseCount || 0,
    rateLimitProtection:
      data.rateLimitProtection === true || data.rateLimitProtection === 1 ? 1 : 0,
    updatedAt: now,
  });
}

export async function updateProviderConnection(id: string, data: any) {
  const db = getDbInstance();
  const existing = db.prepare("SELECT * FROM provider_connections WHERE id = ?").get(id);
  if (!existing) return null;

  const merged = { ...rowToCamel(existing), ...data, updatedAt: new Date().toISOString() };
  _updateConnectionRow(db, id, encryptConnectionFields({ ...merged }));
  backupDbFile("pre-write");

  if (data.priority !== undefined) {
    _reorderConnections(db, existing.provider);
  }

  return cleanNulls(merged);
}

export async function deleteProviderConnection(id: string) {
  const db = getDbInstance();
  const existing = db.prepare("SELECT provider FROM provider_connections WHERE id = ?").get(id);
  if (!existing) return false;

  db.prepare("DELETE FROM provider_connections WHERE id = ?").run(id);
  _reorderConnections(db, existing.provider);
  backupDbFile("pre-write");
  return true;
}

export async function deleteProviderConnectionsByProvider(providerId: string) {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM provider_connections WHERE provider = ?").run(providerId);
  backupDbFile("pre-write");
  return result.changes;
}

export async function reorderProviderConnections(providerId: string) {
  const db = getDbInstance();
  _reorderConnections(db, providerId);
}

function _reorderConnections(db: any, providerId: string) {
  const rows = db
    .prepare(
      "SELECT id, priority, updated_at FROM provider_connections WHERE provider = ? ORDER BY priority ASC, updated_at DESC"
    )
    .all(providerId);

  const update = db.prepare("UPDATE provider_connections SET priority = ? WHERE id = ?");
  rows.forEach((row, index) => {
    update.run(index + 1, row.id);
  });
}

export async function cleanupProviderConnections() {
  return 0;
}

// ──────────────── Provider Nodes ────────────────

export async function getProviderNodes(filter: any = {}) {
  const db = getDbInstance();
  let sql = "SELECT * FROM provider_nodes";
  const params: Record<string, unknown> = {};

  if (filter.type) {
    sql += " WHERE type = @type";
    params.type = filter.type;
  }

  return db.prepare(sql).all(params).map(rowToCamel);
}

export async function getProviderNodeById(id: string) {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM provider_nodes WHERE id = ?").get(id);
  return row ? rowToCamel(row) : null;
}

export async function createProviderNode(data: any) {
  const db = getDbInstance();
  const now = new Date().toISOString();

  const node = {
    id: data.id || uuidv4(),
    type: data.type,
    name: data.name,
    prefix: data.prefix || null,
    apiType: data.apiType || null,
    baseUrl: data.baseUrl || null,
    createdAt: now,
    updatedAt: now,
  };

  db.prepare(
    `
    INSERT INTO provider_nodes (id, type, name, prefix, api_type, base_url, created_at, updated_at)
    VALUES (@id, @type, @name, @prefix, @apiType, @baseUrl, @createdAt, @updatedAt)
  `
  ).run(node);

  backupDbFile("pre-write");
  return node;
}

export async function updateProviderNode(id: string, data: any) {
  const db = getDbInstance();
  const existing = db.prepare("SELECT * FROM provider_nodes WHERE id = ?").get(id);
  if (!existing) return null;

  const merged = { ...rowToCamel(existing), ...data, updatedAt: new Date().toISOString() };

  db.prepare(
    `
    UPDATE provider_nodes SET type = @type, name = @name, prefix = @prefix,
    api_type = @apiType, base_url = @baseUrl, updated_at = @updatedAt
    WHERE id = @id
  `
  ).run({
    id,
    type: merged.type,
    name: merged.name,
    prefix: merged.prefix || null,
    apiType: merged.apiType || null,
    baseUrl: merged.baseUrl || null,
    updatedAt: merged.updatedAt,
  });

  backupDbFile("pre-write");
  return merged;
}

export async function deleteProviderNode(id: string) {
  const db = getDbInstance();
  const existing = db.prepare("SELECT * FROM provider_nodes WHERE id = ?").get(id);
  if (!existing) return null;

  db.prepare("DELETE FROM provider_nodes WHERE id = ?").run(id);
  backupDbFile("pre-write");
  return rowToCamel(existing);
}
