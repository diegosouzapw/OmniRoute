/**
 * db/providers.js — Provider connections and nodes CRUD.
 */

import { v4 as uuidv4 } from "uuid";
import { getDbInstance, rowToCamel, cleanNulls } from "./core";
import { backupDbFile } from "./backup";
import { encryptConnectionFields, decryptConnectionFields } from "./encryption";
import { invalidateDbCache } from "./readCache";
import { normalizeProviderSpecificData } from "@/lib/providers/requestDefaults";

type JsonRecord = Record<string, unknown>;

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes?: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

function withNullableMaxConcurrent(
  record: JsonRecord,
  source: JsonRecord | null | undefined
): JsonRecord {
  if (!source || !Object.hasOwn(source, "maxConcurrent")) {
    return record;
  }

  const sourceMaxConcurrent = source.maxConcurrent;
  const normalizedMaxConcurrent =
    typeof sourceMaxConcurrent === "number" || sourceMaxConcurrent === null
      ? sourceMaxConcurrent
      : record.maxConcurrent;

  return {
    ...record,
    maxConcurrent: normalizedMaxConcurrent,
  };
}

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function toNumberOrZero(value: unknown): number {
  return typeof value === "number" ? value : 0;
}

// ──────────────── Provider Connections ────────────────

export async function getProviderConnections(filter: JsonRecord = {}) {
  const db = getDbInstance() as unknown as DbLike;
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
  return rows.map((r) => {
    const camelRow = rowToCamel(r);
    return decryptConnectionFields(withNullableMaxConcurrent(cleanNulls(camelRow), camelRow));
  });
}

export async function getProviderConnectionById(id: string) {
  const db = getDbInstance() as unknown as DbLike;
  const row = db.prepare("SELECT * FROM provider_connections WHERE id = ?").get(id);
  if (!row) return null;

  const camelRow = rowToCamel(row);
  return decryptConnectionFields(withNullableMaxConcurrent(cleanNulls(camelRow), camelRow));
}

export async function createProviderConnection(data: JsonRecord) {
  const db = getDbInstance() as unknown as DbLike;
  const now = new Date().toISOString();
  const normalizedProviderSpecificData = normalizeProviderSpecificData(
    toStringOrNull(data.provider),
    data.providerSpecificData
  );

  // Upsert check
  // For Codex/OpenAI, a single email can have multiple workspaces (Team + Personal)
  // We need to check for workspace uniqueness, not just email
  let existing: JsonRecord | null = null;

  if (data.authType === "oauth" && data.email) {
    // For Codex, check for existing connection with same workspace
    const providerSpecificData = toRecord(data.providerSpecificData);
    const workspaceId = toStringOrNull(providerSpecificData.workspaceId);
    if (data.provider === "codex" && workspaceId) {
      // For Codex, check for existing connection with same workspace AND email
      // A single workspace can have multiple users (Team/Business plans)
      // We need both workspace + email uniqueness to allow multiple accounts
      existing =
        (db
          .prepare(
            "SELECT * FROM provider_connections WHERE provider = ? AND auth_type = 'oauth' AND json_extract(provider_specific_data, '$.workspaceId') = ? AND email = ?"
          )
          .get(data.provider, workspaceId, data.email) as JsonRecord | undefined) || null;

      // If no match with workspace+email, also check workspace-only for backward compat
      // (old connections without email should still be updated, not duplicated)
      if (!existing) {
        existing =
          (db
            .prepare(
              "SELECT * FROM provider_connections WHERE provider = ? AND auth_type = 'oauth' AND json_extract(provider_specific_data, '$.workspaceId') = ? AND (email IS NULL OR email = '')"
            )
            .get(data.provider, workspaceId) as JsonRecord | undefined) || null;
      }
      // For Codex with workspaceId, don't fall back to email-only check
      // This allows creating new connections for different workspaces
    } else {
      // For other providers (or Codex without workspaceId), use email check
      existing =
        (db
          .prepare(
            "SELECT * FROM provider_connections WHERE provider = ? AND auth_type = 'oauth' AND email = ?"
          )
          .get(data.provider, data.email) as JsonRecord | undefined) || null;
    }
  } else if (data.authType === "apikey" && data.name) {
    existing =
      (db
        .prepare(
          "SELECT * FROM provider_connections WHERE provider = ? AND auth_type = 'apikey' AND name = ?"
        )
        .get(data.provider, data.name) as JsonRecord | undefined) || null;
  }

  if (existing) {
    const existingId = toStringOrNull(existing.id);
    if (!existingId) return null;
    const merged: JsonRecord = { ...toRecord(rowToCamel(existing)), ...data, updatedAt: now };
    merged.providerSpecificData = normalizeProviderSpecificData(
      toStringOrNull(merged.provider),
      merged.providerSpecificData
    );
    _updateConnectionRow(db, existingId, merged);
    backupDbFile("pre-write");
    return withNullableMaxConcurrent(cleanNulls(merged), merged);
  }

  // Generate name: prefer explicit name, then email, then a stable short-ID label.
  // Avoid sequential "Account N" — it reassigns when accounts are deleted/reordered.
  let connectionName = data.name || null;
  if (!connectionName && data.authType === "oauth") {
    if (data.email) {
      connectionName = data.email as string;
    } else if (data.displayName) {
      connectionName = data.displayName as string;
    }
    // Otherwise leave null — UI will fall back to getAccountDisplayName() → "Account #<id>"
  }

  // Auto-increment priority
  let connectionPriority = data.priority;
  if (!connectionPriority) {
    const max = db
      .prepare("SELECT MAX(priority) as maxP FROM provider_connections WHERE provider = ?")
      .get(data.provider) as JsonRecord | undefined;
    const maxPriority = toNumberOrZero(toRecord(max).maxP);
    connectionPriority = maxPriority + 1;
  }

  const connection: Record<string, unknown> = {
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
    "group",
    "maxConcurrent",
  ];
  for (const field of optionalFields) {
    if (data[field] !== undefined && data[field] !== null) {
      connection[field] = data[field];
    }
  }
  if (normalizedProviderSpecificData && Object.keys(normalizedProviderSpecificData).length > 0) {
    connection.providerSpecificData = normalizedProviderSpecificData;
  }

  _insertConnectionRow(db, encryptConnectionFields({ ...connection }));
  const providerId = toStringOrNull(data.provider);
  if (providerId) {
    _reorderConnections(db, providerId);
  }
  backupDbFile("pre-write");
  invalidateDbCache("connections"); // Bust connections read cache

  return withNullableMaxConcurrent(cleanNulls(connection), connection);
}

function _insertConnectionRow(db: DbLike, conn: JsonRecord) {
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
      token_type, consecutive_use_count, rate_limit_protection, last_used_at, "group", max_concurrent,
      created_at, updated_at
    ) VALUES (
      @id, @provider, @authType, @name, @email, @priority, @isActive,
      @accessToken, @refreshToken, @expiresAt, @tokenExpiresAt,
      @scope, @projectId, @testStatus, @errorCode, @lastError,
      @lastErrorAt, @lastErrorType, @lastErrorSource, @backoffLevel,
      @rateLimitedUntil, @healthCheckInterval, @lastHealthCheckAt,
      @lastTested, @apiKey, @idToken, @providerSpecificData,
      @expiresIn, @displayName, @globalPriority, @defaultModel,
      @tokenType, @consecutiveUseCount, @rateLimitProtection, @lastUsedAt, @group, @maxConcurrent,
      @createdAt, @updatedAt
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
    lastUsedAt: conn.lastUsedAt || null,
    group: conn.group || null,
    maxConcurrent: conn.maxConcurrent ?? null,
    createdAt: conn.createdAt,
    updatedAt: conn.updatedAt,
  });
}

function _updateConnectionRow(db: DbLike, id: string, data: JsonRecord) {
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
      last_used_at = @lastUsedAt,
      "group" = @group,
      max_concurrent = @maxConcurrent,
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
    lastUsedAt: data.lastUsedAt || null,
    group: data.group || null,
    maxConcurrent: data.maxConcurrent ?? null,
    updatedAt: now,
  });
}

export async function updateProviderConnection(id: string, data: JsonRecord) {
  const db = getDbInstance() as unknown as DbLike;
  const existing = db.prepare("SELECT * FROM provider_connections WHERE id = ?").get(id);
  if (!existing) return null;

  const merged: JsonRecord = {
    ...toRecord(rowToCamel(existing)),
    ...data,
    updatedAt: new Date().toISOString(),
  };
  merged.providerSpecificData = normalizeProviderSpecificData(
    toStringOrNull(merged.provider),
    merged.providerSpecificData
  );
  _updateConnectionRow(db, id, encryptConnectionFields({ ...merged }));
  backupDbFile("pre-write");
  invalidateDbCache("connections"); // Bust connections read cache

  if (data.priority !== undefined) {
    const existingRecord = toRecord(existing);
    const providerId =
      typeof existingRecord.provider === "string"
        ? existingRecord.provider
        : String(existingRecord.provider || "");
    _reorderConnections(db, providerId);
  }

  return withNullableMaxConcurrent(cleanNulls(merged), merged);
}

export async function deleteProviderConnection(id: string) {
  const db = getDbInstance() as unknown as DbLike;
  const existing = db.prepare("SELECT provider FROM provider_connections WHERE id = ?").get(id);
  if (!existing) return false;

  db.prepare("DELETE FROM quota_snapshots WHERE connection_id = ?").run(id);
  db.prepare("DELETE FROM provider_connections WHERE id = ?").run(id);
  const existingRecord = toRecord(existing);
  const providerId =
    typeof existingRecord.provider === "string"
      ? existingRecord.provider
      : String(existingRecord.provider || "");
  _reorderConnections(db, providerId);
  backupDbFile("pre-write");
  invalidateDbCache("connections"); // Bust connections read cache
  return true;
}

export async function deleteProviderConnectionsByProvider(providerId: string) {
  const db = getDbInstance() as unknown as DbLike;
  const connectionIds = db
    .prepare("SELECT id FROM provider_connections WHERE provider = ?")
    .all(providerId)
    .map((row) => {
      const record = toRecord(row);
      return typeof record.id === "string" ? record.id : null;
    })
    .filter((id): id is string => id !== null);

  if (connectionIds.length > 0) {
    const deleteSnapshots = db.prepare("DELETE FROM quota_snapshots WHERE connection_id = ?");
    for (const connectionId of connectionIds) {
      deleteSnapshots.run(connectionId);
    }
  }

  const result = db.prepare("DELETE FROM provider_connections WHERE provider = ?").run(providerId);
  backupDbFile("pre-write");
  return result.changes;
}

export async function reorderProviderConnections(providerId: string) {
  const db = getDbInstance() as unknown as DbLike;
  _reorderConnections(db, providerId);
}

function _reorderConnections(db: DbLike, providerId: string) {
  const rows = db
    .prepare(
      "SELECT id, priority, updated_at FROM provider_connections WHERE provider = ? ORDER BY priority ASC, updated_at DESC"
    )
    .all(providerId);

  const update = db.prepare("UPDATE provider_connections SET priority = ? WHERE id = ?");
  rows.forEach((row, index) => {
    const current = toRecord(row);
    update.run(index + 1, current.id);
  });
}

export async function cleanupProviderConnections() {
  return 0;
}

export async function getDistinctGroups(): Promise<string[]> {
  const db = getDbInstance() as unknown as DbLike;
  const rows = db
    .prepare(
      'SELECT DISTINCT "group" FROM provider_connections WHERE "group" IS NOT NULL ORDER BY "group"'
    )
    .all() as Array<{ group?: string }>;
  return rows.map((r) => String(r.group ?? "")).filter(Boolean);
}

// ──────────────── Provider Nodes ────────────────

export async function getProviderNodes(filter: JsonRecord = {}) {
  const db = getDbInstance() as unknown as DbLike;
  let sql = "SELECT * FROM provider_nodes";
  const params: Record<string, unknown> = {};

  if (filter.type) {
    sql += " WHERE type = @type";
    params.type = filter.type;
  }

  return db.prepare(sql).all(params).map(rowToCamel);
}

export async function getProviderNodeById(id: string) {
  const db = getDbInstance() as unknown as DbLike;
  const row = db.prepare("SELECT * FROM provider_nodes WHERE id = ?").get(id);
  return row ? rowToCamel(row) : null;
}

export async function createProviderNode(data: JsonRecord) {
  const db = getDbInstance() as unknown as DbLike;
  const now = new Date().toISOString();

  const node = {
    id: data.id || uuidv4(),
    type: data.type,
    name: data.name,
    prefix: data.prefix || null,
    apiType: data.apiType || null,
    baseUrl: data.baseUrl || null,
    chatPath: data.chatPath || null,
    modelsPath: data.modelsPath || null,
    createdAt: now,
    updatedAt: now,
  };

  db.prepare(
    `
    INSERT INTO provider_nodes (id, type, name, prefix, api_type, base_url, chat_path, models_path, created_at, updated_at)
    VALUES (@id, @type, @name, @prefix, @apiType, @baseUrl, @chatPath, @modelsPath, @createdAt, @updatedAt)
  `
  ).run(node);

  backupDbFile("pre-write");
  return node;
}

export async function updateProviderNode(id: string, data: JsonRecord) {
  const db = getDbInstance() as unknown as DbLike;
  const existing = db.prepare("SELECT * FROM provider_nodes WHERE id = ?").get(id);
  if (!existing) return null;

  const merged: JsonRecord = {
    ...toRecord(rowToCamel(existing)),
    ...data,
    updatedAt: new Date().toISOString(),
  };

  db.prepare(
    `
    UPDATE provider_nodes SET type = @type, name = @name, prefix = @prefix,
    api_type = @apiType, base_url = @baseUrl, chat_path = @chatPath,
    models_path = @modelsPath, updated_at = @updatedAt
    WHERE id = @id
  `
  ).run({
    id,
    type: merged["type"],
    name: merged["name"],
    prefix: merged["prefix"] || null,
    apiType: merged["apiType"] || null,
    baseUrl: merged["baseUrl"] || null,
    chatPath: merged["chatPath"] || null,
    modelsPath: merged["modelsPath"] || null,
    updatedAt: merged["updatedAt"],
  });

  backupDbFile("pre-write");
  return merged;
}

export async function deleteProviderNode(id: string) {
  const db = getDbInstance() as unknown as DbLike;
  const existing = db.prepare("SELECT * FROM provider_nodes WHERE id = ?").get(id);
  if (!existing) return null;

  db.prepare("DELETE FROM provider_nodes WHERE id = ?").run(id);
  backupDbFile("pre-write");
  return rowToCamel(existing);
}

// ──────────────── T05: Rate-Limit DB Persistence ──────────────────────────
// Allows rate-limit state to survive token refresh without being accidentally
// cleared. DB column rate_limited_until already exists in schema.
// Ref: sub2api PR #1218 (fix(openai): prevent rescheduling rate-limited accounts)

/**
 * T05: Persist when a connection is rate-limited, directly in DB.
 * This survives token refresh — OAuth flows must NOT override this field.
 *
 * @param connectionId - The provider_connections.id
 * @param until - Epoch ms when the rate limit expires (null to clear)
 */
export function setConnectionRateLimitUntil(connectionId: string, until: number | null): void {
  const db = getDbInstance() as unknown as DbLike;
  db.prepare(
    "UPDATE provider_connections SET rate_limited_until = ?, updated_at = ? WHERE id = ?"
  ).run(until, new Date().toISOString(), connectionId);
  invalidateDbCache("connections");
}

/**
 * T05: Check if a connection is currently rate-limited (DB-backed).
 * Use this before account selection to skip transiently rate-limited accounts.
 *
 * @returns true if rate_limited_until is set and in the future
 */
export function isConnectionRateLimited(connectionId: string): boolean {
  const db = getDbInstance() as unknown as DbLike;
  const row = db
    .prepare("SELECT rate_limited_until FROM provider_connections WHERE id = ?")
    .get(connectionId) as { rate_limited_until?: number | null } | undefined;
  if (!row?.rate_limited_until) return false;
  return Date.now() < row.rate_limited_until;
}

/**
 * T05: Get all connections for a provider that are currently rate-limited.
 * Returns an array of { id, rateLimitedUntil } for dashboard display.
 */
export function getRateLimitedConnections(
  provider: string
): Array<{ id: string; rateLimitedUntil: number }> {
  const db = getDbInstance() as unknown as DbLike;
  const now = Date.now();
  const rows = db
    .prepare(
      "SELECT id, rate_limited_until FROM provider_connections WHERE provider = ? AND rate_limited_until > ?"
    )
    .all(provider, now) as Array<{ id: string; rate_limited_until: number }>;
  return rows.map((r) => ({ id: r.id, rateLimitedUntil: r.rate_limited_until }));
}

// ──────────────── T13: Stale Quota Display Fix ─────────────────────────────
// Codex/Claude quotas display stale cumulative usage after the window resets.
// By comparing resetAt timestamp to now(), we can show 0 when window has passed.
// Ref: sub2api PR #1171 (fix: quota display shows stale cumulative usage after reset)

/**
 * T13: Get effective quota usage, zeroing it out if the window has already reset.
 *
 * @param used - Stored usage value (tokens used in the window)
 * @param resetAt - ISO-8601 string or epoch ms when the window resets, or null
 * @returns Effective usage: 0 if window expired, original value otherwise
 */
export function getEffectiveQuotaUsage(
  used: number,
  resetAt: string | number | null | undefined
): number {
  if (!resetAt) return used;
  const resetTime = typeof resetAt === "number" ? resetAt : new Date(resetAt).getTime();
  if (isNaN(resetTime)) return used;
  // Window has passed — display should show 0 (pending next snapshot)
  if (Date.now() >= resetTime) return 0;
  return used;
}

/**
 * T13: Format a reset countdown as a human-readable string: "2h 35m" or "4m 30s".
 * Returns null if resetAt is in the past or not set.
 */
export function formatResetCountdown(resetAt: string | number | null | undefined): string | null {
  if (!resetAt) return null;
  const resetTime = typeof resetAt === "number" ? resetAt : new Date(resetAt).getTime();
  if (isNaN(resetTime)) return null;
  const diffMs = resetTime - Date.now();
  if (diffMs <= 0) return null;
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}
