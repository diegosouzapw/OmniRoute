/**
 * db/jsonMigration.ts — Shared helper to hydrate an SQLite database from a
 * legacy 9router / OmniRoute JSON backup object.
 *
 * Used by:
 *  - db/core.ts  (auto-migration at startup when db.json is found)
 *  - api/settings/import-json/route.ts  (on-demand import via dashboard)
 *
 * 🔒 Security: the caller is responsible for stripping sensitive keys
 * (password, requireLogin) from `data.settings` BEFORE passing the object
 * here, so this function never touches authentication configuration.
 */

import { DatabaseSync } from "node:sqlite";

type SqliteDatabase = InstanceType<typeof DatabaseSync>;

export interface LegacyJsonData {
  providerConnections?: Record<string, unknown>[];
  providerNodes?: Record<string, unknown>[];
  combos?: Record<string, unknown>[];
  apiKeys?: Record<string, unknown>[];
  settings?: Record<string, unknown>;
  modelAliases?: Record<string, unknown>;
  mitmAlias?: Record<string, unknown>;
  pricing?: Record<string, unknown>;
  customModels?: Record<string, unknown>;
  proxyConfig?: {
    global?: unknown;
    providers?: unknown;
    combos?: unknown;
    keys?: unknown;
  };
}

/**
 * Runs a single SQLite transaction that upserts all entities from a legacy
 * JSON backup into the provided database instance.
 *
 * Returns counts of what was inserted/replaced for logging.
 */
export function runJsonMigration(
  db: SqliteDatabase,
  data: LegacyJsonData
): { connections: number; nodes: number; combos: number; apiKeys: number } {
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

  const insertNode = db.prepare(`
    INSERT OR REPLACE INTO provider_nodes (id, type, name, prefix, api_type, base_url, created_at, updated_at)
    VALUES (@id, @type, @name, @prefix, @apiType, @baseUrl, @createdAt, @updatedAt)
  `);

  const insertKv = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  );

  const insertCombo = db.prepare(`
    INSERT OR REPLACE INTO combos (id, name, data, sort_order, created_at, updated_at)
    VALUES (@id, @name, @data, @sortOrder, @createdAt, @updatedAt)
  `);

  const insertKey = db.prepare(`
    INSERT OR REPLACE INTO api_keys (id, name, key, machine_id, allowed_models, no_log, created_at)
    VALUES (@id, @name, @key, @machineId, @allowedModels, @noLog, @createdAt)
  `);

  db.exec("BEGIN");

  let connections = 0;
  let nodes = 0;
  let combos = 0;
  let apiKeys = 0;

  try {
    // 1. Provider Connections
    for (const conn of data.providerConnections ?? []) {
      insertConn.run(
        conn.id,
        conn.provider,
        conn.authType ?? "oauth",
        conn.name ?? null,
        conn.email ?? null,
        conn.priority ?? 0,
        conn.isActive === false ? 0 : 1,
        conn.accessToken ?? null,
        conn.refreshToken ?? null,
        conn.expiresAt ?? null,
        conn.tokenExpiresAt ?? null,
        conn.scope ?? null,
        conn.projectId ?? null,
        conn.testStatus ?? null,
        conn.errorCode ?? null,
        conn.lastError ?? null,
        conn.lastErrorAt ?? null,
        conn.lastErrorType ?? null,
        conn.lastErrorSource ?? null,
        conn.backoffLevel ?? 0,
        conn.rateLimitedUntil ?? null,
        conn.healthCheckInterval ?? null,
        conn.lastHealthCheckAt ?? null,
        conn.lastTested ?? null,
        conn.apiKey ?? null,
        conn.idToken ?? null,
        conn.providerSpecificData ? JSON.stringify(conn.providerSpecificData) : null,
        conn.expiresIn ?? null,
        conn.displayName ?? null,
        conn.globalPriority ?? null,
        conn.defaultModel ?? null,
        conn.tokenType ?? null,
        conn.consecutiveUseCount ?? 0,
        conn.rateLimitProtection === true || conn.rateLimitProtection === 1 ? 1 : 0,
        conn.lastUsedAt ?? null,
        conn.createdAt ?? new Date().toISOString(),
        conn.updatedAt ?? new Date().toISOString()
      );

      connections++;
    }

    // 2. Provider Nodes
    for (const node of data.providerNodes ?? []) {
      insertNode.run(
        node.id,
        node.type,
        node.name,
        node.prefix ?? null,
        node.apiType ?? null,
        node.baseUrl ?? null,
        node.createdAt ?? new Date().toISOString(),
        node.updatedAt ?? new Date().toISOString()
      );

      nodes++;
    }

    // 3. Key-Value Settings (caller must have stripped password / requireLogin)
    for (const [key, value] of Object.entries(data.settings ?? {})) {
      insertKv.run("settings", key, JSON.stringify(value));
    }

    // 4. Legacy key-value namespaces
    for (const [alias, model] of Object.entries(data.modelAliases ?? {})) {
      insertKv.run("modelAliases", alias, JSON.stringify(model));
    }

    for (const [toolName, mappings] of Object.entries(data.mitmAlias ?? {})) {
      insertKv.run("mitmAlias", toolName, JSON.stringify(mappings));
    }

    for (const [provider, models] of Object.entries(data.pricing ?? {})) {
      insertKv.run("pricing", provider, JSON.stringify(models));
    }

    for (const [providerId, models] of Object.entries(data.customModels ?? {})) {
      insertKv.run("customModels", providerId, JSON.stringify(models));
    }

    if (data.proxyConfig) {
      insertKv.run("proxyConfig", "global", JSON.stringify(data.proxyConfig.global ?? null));
      insertKv.run("proxyConfig", "providers", JSON.stringify(data.proxyConfig.providers ?? {}));
      insertKv.run("proxyConfig", "combos", JSON.stringify(data.proxyConfig.combos ?? {}));
      insertKv.run("proxyConfig", "keys", JSON.stringify(data.proxyConfig.keys ?? {}));
    }

    // 5. Combos
    for (const [index, combo] of (data.combos ?? []).entries()) {
      const normalized = {
        ...combo,
        sortOrder: typeof combo.sortOrder === "number" ? combo.sortOrder : index + 1,
      };

      insertCombo.run(
        normalized.id,
        normalized.name,
        JSON.stringify(normalized),
        normalized.sortOrder,
        normalized.createdAt ?? new Date().toISOString(),
        normalized.updatedAt ?? new Date().toISOString()
      );

      combos++;
    }

    // 6. API Keys
    for (const apiKey of data.apiKeys ?? []) {
      insertKey.run(
        apiKey.id,
        apiKey.name,
        apiKey.key,
        apiKey.machineId ?? null,
        JSON.stringify(apiKey.allowedModels ?? []),
        apiKey.noLog ? 1 : 0,
        apiKey.createdAt ?? new Date().toISOString()
      );

      apiKeys++;
    }

    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }

  return { connections, nodes, combos, apiKeys };
}
