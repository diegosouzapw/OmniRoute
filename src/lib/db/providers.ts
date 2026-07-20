/**
 * db/providers.js — Provider connections and nodes CRUD.
 */

import { v4 as uuidv4 } from "uuid";
import { getDbInstance, rowToCamel, cleanNulls } from "./core";
import { backupDbFile } from "./backup";
import {
  encryptConnectionFields,
  decryptConnectionFields,
  migrateLegacyEncryptedString,
} from "./encryption";
import { createLazyRowProxy } from "./providers/lazyConnectionView";
import { invalidateDbCache, getCachedRawProviderConnections } from "./readCache";
import {
  removeConnectionHealth,
  removeConnectionIndex,
} from "@omniroute/open-sse/services/apiKeyRotator.ts";
import { invalidateReasoningRoutingRuleCache } from "./reasoningRoutingRules";
import { normalizeProviderSpecificData } from "@/lib/providers/requestDefaults";
import { bumpProxyConfigGeneration } from "./settings";
import { webSessionCredentialKey, parseProviderSpecificData } from "./webSessionDedup";
import { resolveUsageAccountIdentity } from "@/lib/usage/accountIdentity";
import {
  withNullableMaxConcurrent,
  withNullableQuotaWindowThresholds,
  withNullableRateLimitOverrides,
  normalizeBooleanColumn,
  sanitizeRateLimitOverrides,
  serializeJsonField,
  toRecord,
  sanitizeQuotaWindowThresholds,
  toStringOrNull,
  toNumberOrZero,
} from "./providers/columns";

type JsonRecord = Record<string, unknown>;

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes?: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
  transaction: <T>(fn: () => T) => () => T;
}

// Real column set for provider_connections (must match the CREATE TABLE in
// core.ts's SCHEMA_SQL). getProviderConnections()'s optional `columns`
// projection is interpolated directly into the SELECT clause, so every
// requested name must be validated against this allowlist before use —
// there is no current caller that passes untrusted input, but the
// projection API itself must never accept an arbitrary string.
const PROVIDER_CONNECTIONS_COLUMNS = new Set([
  "id",
  "provider",
  "auth_type",
  "name",
  "email",
  "priority",
  "is_active",
  "access_token",
  "refresh_token",
  "expires_at",
  "token_expires_at",
  "scope",
  "project_id",
  "test_status",
  "error_code",
  "last_error",
  "last_error_at",
  "last_error_type",
  "last_error_source",
  "backoff_level",
  "rate_limited_until",
  "health_check_interval",
  "last_health_check_at",
  "last_tested",
  "api_key",
  "id_token",
  "provider_specific_data",
  "expires_in",
  "display_name",
  "global_priority",
  "default_model",
  "token_type",
  "consecutive_use_count",
  "rate_limit_protection",
  "last_used_at",
  "group",
  "max_concurrent",
  "proxy_enabled",
  "per_key_proxy_enabled",
  "quota_window_thresholds_json",
  "rate_limit_overrides_json",
  "created_at",
  "updated_at",
]);

// ──────────────── Provider Connections ────────────────

/**
 * Returns provider connections as lazy-decrypting proxies: encrypted
 * credential fields (apiKey, accessToken, refreshToken, idToken) are only
 * decrypted on first property access, not eagerly for every row. Column-
 * projected reads (`columns` passed) bypass the raw-row cache — the cache
 * key doesn't account for projection, so a projected read could otherwise
 * poison the cache for a subsequent full-row read of the same filter.
 *
 * When `limit`/`offset` are provided, the cache is also bypassed since
 * the cache key doesn't account for pagination.
 */
export async function getProviderConnections(
  filter: JsonRecord = {},
  limit?: number,
  offset?: number,
  columns?: string[],
) {
  const useCache = !columns?.length && limit === undefined && offset === undefined;
  const raw = useCache
    ? await getCachedRawProviderConnections(filter)
    : await getRawProviderConnections(filter, limit, offset, columns);
  return raw.map(createLazyRowProxy);
}

/**
 * Same as getProviderConnections but WITHOUT decryptConnectionFields.
 * Returns raw rows with encrypted credential fields intact — callers
 * that only need metadata (id, priority, backoffLevel, etc.) avoid
 * the O(n) AES-GCM decrypt cost on every cache fill.
 *
 * Used by the lazy-decryption path in auth selection (auth.ts) where
 * 10k+ connections are filtered in JS but only 1 needs its apiKey
 * decrypted.
 *
 * @param limit — Optional SQL LIMIT clause to cap rows returned
 * @param offset — Optional SQL OFFSET for pagination
 */
export async function getRawProviderConnections(
  filter: JsonRecord = {},
  limit?: number,
  offset?: number,
  columns?: string[],
) {
  const db = getDbInstance() as unknown as DbLike;
  let selectCols = "*";
  if (columns?.length) {
    const invalidColumns = columns.filter((col) => !PROVIDER_CONNECTIONS_COLUMNS.has(col));
    if (invalidColumns.length > 0) {
      throw new Error(
        `getProviderConnections: invalid column(s) requested: ${invalidColumns.join(", ")}`
      );
    }
    // "group" is a reserved SQL keyword — the schema declares it quoted, so
    // it must be re-quoted here too or the generated SELECT is a syntax error.
    selectCols = columns.map((col) => (col === "group" ? `"group"` : col)).join(", ");
  }
  let sql = `SELECT ${selectCols} FROM provider_connections`;
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
  if (filter.authType) {
    conditions.push("auth_type = @authType");
    params.authType = filter.authType;
  }



  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }
  sql += " ORDER BY priority ASC, updated_at DESC";
  if (limit !== undefined) {
    sql += " LIMIT @limit OFFSET @offset";
    params.limit = limit;
    params.offset = offset ?? 0;
  }

  const rows = db.prepare(sql).all(params);
  return rows.map((r) => {
    const camelRow = rowToCamel(r);
    return withNullableRateLimitOverrides(
      withNullableQuotaWindowThresholds(
        withNullableMaxConcurrent(cleanNulls(camelRow), camelRow),
        camelRow
      ),
      camelRow
    );
  });
 }

export function getProviderConnectionsCount(filter: JsonRecord = {}): number {
  const db = getDbInstance() as unknown as DbLike;
  let sql = "SELECT count(*) as cnt FROM provider_connections";
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
  if (filter.authType) {
    conditions.push("auth_type = @authType");
    params.authType = filter.authType;
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  const row = db.prepare(sql).get(params) as { cnt: number };
  return row.cnt;
}

export async function getProviderConnectionById(id: string) {
  const db = getDbInstance() as unknown as DbLike;
  const row = db.prepare("SELECT * FROM provider_connections WHERE id = ?").get(id);
  if (!row) return null;

  const camelRow = rowToCamel(row);
  return decryptConnectionFields(
    withNullableRateLimitOverrides(
      withNullableQuotaWindowThresholds(
        withNullableMaxConcurrent(cleanNulls(camelRow), camelRow),
        camelRow
      ),
      camelRow
    )
  );
}

// #3368 PR6 — dedup web-session cookie/token credentials on connection create.
// Re-importing the same session (e.g. via bulk web-session import) under a
// different or blank name must update the existing connection instead of
// inserting a duplicate, mirroring the apikey dedup (#3023). Extracted from
// createProviderConnection to keep that function below the complexity baseline.
// provider_specific_data is plaintext JSON, so the value is compared directly
// without decryption.
function findExistingCookieConnection(
  db: DbLike,
  provider: unknown,
  name: unknown,
  normalizedProviderSpecificData: unknown
): JsonRecord | null {
  // 1) Name-based upsert for parity with the apikey path.
  if (name) {
    const byName =
      (db
        .prepare(
          "SELECT * FROM provider_connections WHERE provider = ? AND auth_type = 'cookie' AND name = ?"
        )
        .get(provider, name) as JsonRecord | undefined) || null;
    if (byName) return byName;
  }
  // 2) Credential-value dedup against existing cookie rows.
  const newCredKey = webSessionCredentialKey(normalizedProviderSpecificData);
  if (!newCredKey) return null;
  const cookieRows = db
    .prepare("SELECT * FROM provider_connections WHERE provider = ? AND auth_type = 'cookie'")
    .all(provider) as JsonRecord[];
  for (const row of cookieRows) {
    const psd = parseProviderSpecificData(row.provider_specific_data);
    if (psd && webSessionCredentialKey(psd) === newCredKey) return row;
  }
  return null;
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
  let legacyCodexWorkspaceMatch = false;

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
        legacyCodexWorkspaceMatch = existing !== null;
      }
      // For Codex with workspaceId, don't fall back to email-only check
      // This allows creating new connections for different workspaces
    } else if (data.provider === "codex") {
      // Codex without a workspaceId — do NOT fall through to the generic
      // bare-email dedup below. Codex never sets providerSpecificData.username,
      // so that path's disambiguation is a no-op and two distinct Codex logins
      // sharing an email (but missing a verifiable workspace/account id) would
      // silently collapse into one row, overwriting the first login's token
      // pair. Require a matching chatgptUserId (a stable per-account id from
      // the JWT) before merging; otherwise treat this as a new connection.
      const chatgptUserId = toStringOrNull(providerSpecificData.chatgptUserId);
      if (chatgptUserId) {
        existing =
          (db
            .prepare(
              "SELECT * FROM provider_connections WHERE provider = ? AND auth_type = 'oauth' AND json_extract(provider_specific_data, '$.chatgptUserId') = ? AND email = ?"
            )
            .get(data.provider, chatgptUserId, data.email) as JsonRecord | undefined) || null;
      }
      // No chatgptUserId on the incoming row (or no existing match) — leave
      // `existing` null so a new connection row is inserted.
    } else {
      // For other providers (or Codex without workspaceId), match on email —
      // disambiguated by providerSpecificData.username when present on both
      // sides. Two different IdPs can share the same email address (e.g. a
      // Google account and a HuggingFace account); matching on email alone
      // would silently overwrite the other account's connection on the
      // second login. Only fall back to the bare email-only match when
      // neither side carries a username (legacy rows created before this
      // disambiguation existed).
      const incomingUsername = toStringOrNull(providerSpecificData.username);
      const emailMatches = db
        .prepare(
          "SELECT * FROM provider_connections WHERE provider = ? AND auth_type = 'oauth' AND email = ?"
        )
        .all(data.provider, data.email) as JsonRecord[];
      existing =
        emailMatches.find((row) => {
          const existingUsername = toStringOrNull(
            parseProviderSpecificData(row.provider_specific_data)?.username
          );
          if (incomingUsername && existingUsername) {
            return incomingUsername === existingUsername;
          }
          if (incomingUsername || existingUsername) return false;
          return true;
        }) || null;
    }
  } else if (data.authType === "apikey") {
    // Name-based upsert (existing behavior): same provider + same name → update.
    if (data.name) {
      existing =
        (db
          .prepare(
            "SELECT * FROM provider_connections WHERE provider = ? AND auth_type = 'apikey' AND name = ?"
          )
          .get(data.provider, data.name) as JsonRecord | undefined) || null;
    }
    // #3023 — dedup by API key value: re-adding the same key (under a different
    // or blank name) must update the existing connection, not insert a duplicate
    // row. Stored keys use non-deterministic AES-GCM, so ciphertext can't be
    // compared directly — decrypt each apikey row for this provider and match the
    // plaintext (trimmed) instead.
    const newApiKey = typeof data.apiKey === "string" ? data.apiKey.trim() : "";
    if (!existing && newApiKey) {
      const apiKeyRows = db
        .prepare("SELECT * FROM provider_connections WHERE provider = ? AND auth_type = 'apikey'")
        .all(data.provider) as JsonRecord[];
      for (const row of apiKeyRows) {
        const decrypted = decryptConnectionFields(toRecord(rowToCamel(row)));
        if (toStringOrNull(decrypted.apiKey)?.trim() === newApiKey) {
          existing = row;
          break;
        }
      }
    }
  } else if (data.authType === "cookie") {
    existing = findExistingCookieConnection(
      db,
      data.provider,
      data.name,
      normalizedProviderSpecificData
    );
  } else if (data.authType === "access_token") {
    // #1290 — bare access-token imports (e.g. a raw ChatGPT website access
    // token with no refresh token) are intentionally never deduped: every
    // import creates a new connection. Unlike oauth (workspace+email) or
    // apikey (key-value) imports, a bare access token has no refresh token
    // and no stable long-lived identity to safely dedup against — matching
    // on email alone here would risk silently overwriting an existing full
    // oauth connection for the same account.
  }

  if (existing) {
    const existingId = toStringOrNull(existing.id);
    if (!existingId) return null;
    const merged: JsonRecord = { ...toRecord(rowToCamel(existing)), ...data, updatedAt: now };
    merged.providerSpecificData = normalizeProviderSpecificData(
      toStringOrNull(merged.provider),
      merged.providerSpecificData
    );
    db.transaction(() => {
      if (legacyCodexWorkspaceMatch) {
        const oldIdentity = resolveUsageAccountIdentity(existing);
        const newIdentity = resolveUsageAccountIdentity(merged);
        db.prepare(
          `UPDATE usage_history
           SET account_key = @newAccountKey,
               account_label = CASE
                 WHEN @newLabelPriority > COALESCE(account_label_priority, 0)
                 THEN @newLabel
                 ELSE account_label
               END,
               account_label_priority = MAX(
                 COALESCE(account_label_priority, 0),
                 @newLabelPriority
               )
           WHERE connection_id = @connectionId
             AND account_key = @oldAccountKey`
        ).run({
          connectionId: existingId,
          oldAccountKey: oldIdentity.accountKey,
          newAccountKey: newIdentity.accountKey,
          newLabel: newIdentity.accountLabel,
          newLabelPriority: newIdentity.accountLabelPriority,
        });
      }
      _updateConnectionRow(db, existingId, merged);
    })();
    backupDbFile("pre-write");
    return withNullableRateLimitOverrides(
      withNullableQuotaWindowThresholds(
        withNullableMaxConcurrent(cleanNulls(merged), merged),
        merged
      ),
      merged
    );
  }

  // Generate name: prefer explicit name, then email, then a stable short-ID label.
  // Avoid sequential "Account N" — it reassigns when accounts are deleted/reordered.
  let connectionName = data.name || null;
  if (!connectionName && (data.authType === "oauth" || data.authType === "access_token")) {
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
    proxyEnabled: normalizeBooleanColumn(data.proxyEnabled, true),
    perKeyProxyEnabled: normalizeBooleanColumn(data.perKeyProxyEnabled, false),
    quotaVisible: normalizeBooleanColumn(data.quotaVisible, true),
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
    "proxyEnabled",
    "perKeyProxyEnabled",
    "quotaVisible",
    "quotaWindowThresholds",
    "rateLimitOverrides",
    "healthCheckInterval",
  ];
  for (const field of optionalFields) {
    if (data[field] !== undefined && data[field] !== null) {
      connection[field] = data[field];
    }
  }
  if (normalizedProviderSpecificData && Object.keys(normalizedProviderSpecificData).length > 0) {
    connection.providerSpecificData = normalizedProviderSpecificData;
  }
  // Sanitize the window-thresholds map up front so the in-memory `connection`
  // matches the row we're about to insert. The serialize path runs the same
  // sanitizer on the way to SQLite. Assigning null (when sanitize collapses
  // to no-overrides) keeps the field present on the returned object so the
  // UI can tell "field was read, no overrides" apart from "field absent."
  if ("quotaWindowThresholds" in connection) {
    connection.quotaWindowThresholds = sanitizeQuotaWindowThresholds(
      connection.quotaWindowThresholds
    );
  }

  // Same sanitization for rateLimitOverrides — keep in-memory representation
  // in sync with what gets persisted.
  if ("rateLimitOverrides" in connection) {
    connection.rateLimitOverrides = sanitizeRateLimitOverrides(connection.rateLimitOverrides);
  }

  _insertConnectionRow(db, encryptConnectionFields({ ...connection }));
  const providerId = toStringOrNull(data.provider);
  if (providerId) {
    _reorderConnections(db, providerId);
  }
  backupDbFile("pre-write");
  invalidateDbCache("connections"); // Bust connections read cache

  return withNullableRateLimitOverrides(
    withNullableQuotaWindowThresholds(
      withNullableMaxConcurrent(cleanNulls(connection), connection),
      connection
    ),
    connection
  );
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
      proxy_enabled, per_key_proxy_enabled, quota_visible, quota_window_thresholds_json, rate_limit_overrides_json,
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
      @proxyEnabled, @perKeyProxyEnabled, @quotaVisible, @quotaWindowThresholdsJson, @rateLimitOverridesJson,
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
    healthCheckInterval: conn.healthCheckInterval ?? null,
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
    proxyEnabled: normalizeBooleanColumn(conn.proxyEnabled, true) ? 1 : 0,
    perKeyProxyEnabled: normalizeBooleanColumn(conn.perKeyProxyEnabled, false) ? 1 : 0,
    quotaVisible: normalizeBooleanColumn(conn.quotaVisible, true) ? 1 : 0,
    quotaWindowThresholdsJson: serializeJsonField(conn.quotaWindowThresholds),
    rateLimitOverridesJson: serializeJsonField(conn.rateLimitOverrides),
    createdAt: conn.createdAt,
    updatedAt: conn.updatedAt,
  });
}

// Assembles the `.run()` params for _updateConnectionRow's UPDATE statement.
// Split out purely to keep _updateConnectionRow under the max-lines-per-function
// gate — same field mapping/normalization as before, just relocated.
function _buildUpdateConnectionRowParams(id: string, data: JsonRecord, now: unknown) {
  return {
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
    healthCheckInterval: data.healthCheckInterval ?? null,
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
    quotaWindowThresholdsJson: serializeJsonField(data.quotaWindowThresholds),
    proxyEnabled: normalizeBooleanColumn(data.proxyEnabled, true) ? 1 : 0,
    perKeyProxyEnabled: normalizeBooleanColumn(data.perKeyProxyEnabled, false) ? 1 : 0,
    quotaVisible: normalizeBooleanColumn(data.quotaVisible, true) ? 1 : 0,
    rateLimitOverridesJson: serializeJsonField(data.rateLimitOverrides),
    lastPingAt: data.lastPingAt || null,
    lastPingedResetKey: data.lastPingedResetKey || null,
    updatedAt: now,
  };
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
      quota_window_thresholds_json = @quotaWindowThresholdsJson,
      proxy_enabled = @proxyEnabled,
      per_key_proxy_enabled = @perKeyProxyEnabled,
      quota_visible = @quotaVisible,
      rate_limit_overrides_json = @rateLimitOverridesJson,
      last_ping_at = @lastPingAt,
      last_pinged_reset_key = @lastPingedResetKey,
      updated_at = @updatedAt
    WHERE id = @id
  `
  ).run(_buildUpdateConnectionRowParams(id, data, now));
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
  // Mirror the sanitization the create path applies — keep the returned
  // object in lockstep with what we persist.
  if ("quotaWindowThresholds" in merged) {
    const sanitized = sanitizeQuotaWindowThresholds(merged.quotaWindowThresholds);
    // For updates we always carry the key forward (even as null) so the read
    // path surfaces the cleared state to callers that just patched it.
    merged.quotaWindowThresholds = sanitized;
  }
  if ("rateLimitOverrides" in merged) {
    merged.rateLimitOverrides = sanitizeRateLimitOverrides(merged.rateLimitOverrides);
  }
  _updateConnectionRow(db, id, encryptConnectionFields({ ...merged }));
  backupDbFile("pre-write");
  invalidateDbCache("connections"); // Bust connections read cache
  bumpProxyConfigGeneration();

  if (data.priority !== undefined) {
    const existingRecord = toRecord(existing);
    const providerId =
      typeof existingRecord.provider === "string"
        ? existingRecord.provider
        : String(existingRecord.provider || "");
    _reorderConnections(db, providerId);
  }

  return withNullableRateLimitOverrides(
    withNullableQuotaWindowThresholds(
      withNullableMaxConcurrent(cleanNulls(merged), merged),
      merged
    ),
    merged
  );
}

/**
 * Atomic conditional clear of recoverable error state on a connection row.
 *
 * Returns true when the row was cleared, false when a concurrent writer
 * (markAccountUnavailable, connectionRecovery tick, test, etc.) changed the
 * row between the caller's snapshot read and this UPDATE — in which case the
 * clear is skipped to preserve the freshest error state. Closes the TOCTOU
 * window in the quota-recovery path.
 *
 * CAS token = (test_status, last_error_at, rate_limited_until).
 * markAccountUnavailable always bumps last_error_at on every cooldown/error
 * write, so an unchanged last_error_at reliably indicates no concurrent write.
 */
export async function clearConnectionErrorIfUnchanged(
  id: string,
  expected: {
    testStatus: string | null | undefined;
    lastErrorAt: string | null | undefined;
    rateLimitedUntil: string | null | undefined;
  }
): Promise<boolean> {
  const db = getDbInstance() as unknown as DbLike;
  const result = db
    .prepare(
      `
    UPDATE provider_connections SET
      test_status = 'active',
      last_error = NULL,
      last_error_at = NULL,
      last_error_type = NULL,
      last_error_source = NULL,
      error_code = NULL,
      rate_limited_until = NULL,
      backoff_level = 0,
      updated_at = ?
    WHERE id = ?
      AND IFNULL(test_status, '') = ?
      AND IFNULL(last_error_at, '') = ?
      AND IFNULL(rate_limited_until, '') = ?
    `
    )
    .run(
      new Date().toISOString(),
      id,
      expected.testStatus ?? "",
      expected.lastErrorAt ?? "",
      expected.rateLimitedUntil ?? ""
    );
  const applied = (result.changes ?? 0) > 0;
  if (applied) {
    backupDbFile("pre-write");
    invalidateDbCache("connections");
    bumpProxyConfigGeneration();
  }
  return applied;
}

/**
 * Lightweight stat bump — updates lastUsedAt and consecutiveUseCount without
 * SELECT, re-encrypt, cache invalidation, or file backup.
 * Safe for the hot getProviderCredentials path where only usage stats change.
 * Fixes the cache-thrashing bug where every credential selection invalidated
 * the 5s TTL cache and paid 3000-row decryption cost on the next request.
 */
export async function touchConnectionLastUsed(
  id: string,
  consecutiveUseCount: number
): Promise<void> {
  if (!id) return;
  const db = getDbInstance() as unknown as DbLike;
  const now = new Date().toISOString();
  db.prepare(
    `UPDATE provider_connections SET
      last_used_at = @lastUsedAt,
      consecutive_use_count = @consecutiveUseCount,
      updated_at = @updatedAt
    WHERE id = @id`
  ).run({
    lastUsedAt: now,
    consecutiveUseCount,
    updatedAt: now,
    id,
  });
}

export async function deleteProviderConnection(id: string) {
  const db = getDbInstance() as unknown as DbLike;
  const existing = db.prepare("SELECT provider FROM provider_connections WHERE id = ?").get(id);
  if (!existing) return false;

  db.prepare("DELETE FROM quota_snapshots WHERE connection_id = ?").run(id);
  db.prepare("DELETE FROM provider_connections WHERE id = ?").run(id);
  removeConnectionHealth(id);
  removeConnectionIndex(id);
  bumpProxyConfigGeneration();
  const existingRecord = toRecord(existing);
  const providerId =
    typeof existingRecord.provider === "string"
      ? existingRecord.provider
      : String(existingRecord.provider || "");
  _reorderConnections(db, providerId);
  backupDbFile("pre-write");
  invalidateDbCache("connections"); // Bust connections read cache
  invalidateReasoningRoutingRuleCache();
  return true;
}

export async function deleteProviderConnections(ids: string[]): Promise<number> {
  if (ids.length === 0) return 0;
  const db = getDbInstance();

  const deletedCount = db.transaction(() => {
    const placeholders = ids.map(() => "?").join(",");
    db.prepare(`DELETE FROM quota_snapshots WHERE connection_id IN (${placeholders})`).run(...ids);
    const result = db
      .prepare(`DELETE FROM provider_connections WHERE id IN (${placeholders})`)
      .run(...ids);
    return result.changes ?? 0;
  })();

  for (const id of ids) {
    removeConnectionHealth(id);
    removeConnectionIndex(id);
  }
  backupDbFile("pre-write");
  invalidateDbCache("connections");
  invalidateReasoningRoutingRuleCache();
  return deletedCount;
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
  for (const connectionId of connectionIds) {
    removeConnectionHealth(connectionId);
    removeConnectionIndex(connectionId);
  }
  backupDbFile("pre-write");
  invalidateDbCache("connections");
  invalidateReasoningRoutingRuleCache();
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

// ──────────────── Auto Migration ────────────────

/**
 * Scans all connections and re-encrypts any fields using the old dynamic salt
 * so they use the new canonical static salt.
 */
export function autoMigrateLegacyEncryptedConnections(): number {
  const db = getDbInstance() as unknown as DbLike;
  const rows = db.prepare("SELECT * FROM provider_connections").all();
  let migratedCount = 0;

  for (const row of rows) {
    const camelRow = rowToCamel(row);
    if (!camelRow) continue;

    let updatedRow = false;

    const encryptedFields = ["apiKey", "idToken", "accessToken", "refreshToken"];
    for (const field of encryptedFields) {
      if (typeof camelRow[field] === "string") {
        const { updated, value } = migrateLegacyEncryptedString(camelRow[field] as string);
        if (updated) {
          camelRow[field] = value;
          updatedRow = true;
        }
      }
    }

    if (updatedRow) {
      // camelRow[field] is already re-encrypted!
      // But _updateConnectionRow does not re-encrypt automatically, so we pass it safely.
      // Wait, _updateConnectionRow runs the full data through `encryptConnectionFields`,
      // but `encryptConnectionFields` will re-encrypt plain text.
      // BUT `migrateLegacyEncryptedString` returns ALREADY ENCRYPTED ciphertext!
      // Wait... if we pass ALREADY ENCRYPTED text to `_updateConnectionRow`,
      // `encryptConnectionFields` in `_updateConnectionRow` will encrypt it AGAIN!
      // Let's modify the DB directly so we don't double encrypt.

      db.prepare(
        "UPDATE provider_connections SET api_key = @apiKey, id_token = @idToken, access_token = @accessToken, refresh_token = @refreshToken, updated_at = @updatedAt WHERE id = @id"
      ).run({
        id: camelRow.id,
        apiKey: camelRow.apiKey ?? null,
        idToken: camelRow.idToken ?? null,
        accessToken: camelRow.accessToken ?? null,
        refreshToken: camelRow.refreshToken ?? null,
        updatedAt: new Date().toISOString(),
      });
      migratedCount++;
    }
  }

  if (migratedCount > 0) {
    backupDbFile("pre-write");
    invalidateDbCache("connections");
    console.log(`[DB] Auto-migrated ${migratedCount} connection(s) to new static-salt encryption.`);
  }

  return migratedCount;
}

export function getGheCopilotHosts(): string[] {
  const hosts = new Set<string>();
  try {
    const db = getDbInstance();
    const rows = db
      .prepare(
        "SELECT provider_specific_data FROM provider_connections WHERE provider = 'ghe-copilot' AND is_active = 1"
      )
      .all() as { provider_specific_data: string | null }[];
    for (const row of rows) {
      if (!row.provider_specific_data) continue;
      try {
        const psd = JSON.parse(row.provider_specific_data);
        const urls = [psd.gheUrl, psd.copilotApiUrl, psd.copilotProxyUrl];
        for (const urlStr of urls) {
          if (typeof urlStr === "string" && urlStr.trim()) {
            try {
              const url = new URL(urlStr);
              if (url.hostname) {
                hosts.add(url.hostname.toLowerCase());
              }
            } catch {
              // Ignore invalid URLs
            }
          }
        }
      } catch {
        // Ignore JSON parse errors
      }
    }
  } catch (err) {
    console.error("[DB] getGheCopilotHosts: failed to read GHE Copilot connections", err);
  }
  return [...hosts];
}

// ──────────────── Re-exports from leaf modules ────────────────

export {
  getProviderNodes,
  getProviderNodesCount,
  getProviderNodeById,
  resolveProviderNodeForConnection,
  createProviderNode,
  updateProviderNode,
  deleteProviderNode,
} from "./providers/nodes";
export {
  setConnectionRateLimitUntil,
  markConnectionRateLimitedUntil,
  clearConnectionRateLimit,
  getEffectiveQuotaUsage,
  clearStaleCrashCooldowns,
  formatResetCountdown,
  isConnectionRateLimited,
  getRateLimitedConnections,
} from "./providers/rateLimit";
