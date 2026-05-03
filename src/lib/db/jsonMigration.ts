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

import type Database from "better-sqlite3";
import { normalizeRoutingStrategy } from "@/shared/constants/routingStrategies";

type SqliteDatabase = InstanceType<typeof Database>;

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

  const migrate = db.transaction(() => {
    // 1. Provider Connections
    for (const conn of data.providerConnections ?? []) {
      insertConn.run({
        id: conn.id,
        provider: conn.provider,
        authType: conn.authType ?? "oauth",
        name: conn.name ?? null,
        email: conn.email ?? null,
        priority: conn.priority ?? 0,
        isActive: conn.isActive === false ? 0 : 1,
        accessToken: conn.accessToken ?? null,
        refreshToken: conn.refreshToken ?? null,
        expiresAt: conn.expiresAt ?? null,
        tokenExpiresAt: conn.tokenExpiresAt ?? null,
        scope: conn.scope ?? null,
        projectId: conn.projectId ?? null,
        testStatus: conn.testStatus ?? null,
        errorCode: conn.errorCode ?? null,
        lastError: conn.lastError ?? null,
        lastErrorAt: conn.lastErrorAt ?? null,
        lastErrorType: conn.lastErrorType ?? null,
        lastErrorSource: conn.lastErrorSource ?? null,
        backoffLevel: conn.backoffLevel ?? 0,
        rateLimitedUntil: conn.rateLimitedUntil ?? null,
        healthCheckInterval: conn.healthCheckInterval ?? null,
        lastHealthCheckAt: conn.lastHealthCheckAt ?? null,
        lastTested: conn.lastTested ?? null,
        apiKey: conn.apiKey ?? null,
        idToken: conn.idToken ?? null,
        providerSpecificData: conn.providerSpecificData
          ? JSON.stringify(conn.providerSpecificData)
          : null,
        expiresIn: conn.expiresIn ?? null,
        displayName: conn.displayName ?? null,
        globalPriority: conn.globalPriority ?? null,
        defaultModel: conn.defaultModel ?? null,
        tokenType: conn.tokenType ?? null,
        consecutiveUseCount: conn.consecutiveUseCount ?? 0,
        lastUsedAt: conn.lastUsedAt ?? null,
        rateLimitProtection:
          conn.rateLimitProtection === true || conn.rateLimitProtection === 1 ? 1 : 0,
        createdAt: conn.createdAt ?? new Date().toISOString(),
        updatedAt: conn.updatedAt ?? new Date().toISOString(),
      });
    }

    // 2. Provider Nodes
    for (const node of data.providerNodes ?? []) {
      insertNode.run({
        id: node.id,
        type: node.type,
        name: node.name,
        prefix: node.prefix ?? null,
        apiType: node.apiType ?? null,
        baseUrl: node.baseUrl ?? null,
        createdAt: node.createdAt ?? new Date().toISOString(),
        updatedAt: node.updatedAt ?? new Date().toISOString(),
      });
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
      const config =
        combo.config && typeof combo.config === "object" && !Array.isArray(combo.config)
          ? { ...(combo.config as Record<string, unknown>) }
          : combo.config;
      if (config && typeof config === "object" && !Array.isArray(config) && "strategy" in config) {
        (config as Record<string, unknown>).strategy = normalizeRoutingStrategy(
          (config as Record<string, unknown>).strategy
        );
      }
      const normalizedCombo: Record<string, unknown> = {
        ...combo,
        strategy: normalizeRoutingStrategy(combo.strategy),
        config,
        sortOrder: typeof combo.sortOrder === "number" ? combo.sortOrder : index + 1,
      };
      insertCombo.run({
        id: normalizedCombo.id,
        name: normalizedCombo.name,
        data: JSON.stringify(normalizedCombo),
        sortOrder: normalizedCombo.sortOrder,
        createdAt: normalizedCombo.createdAt ?? new Date().toISOString(),
        updatedAt: normalizedCombo.updatedAt ?? new Date().toISOString(),
      });
    }

    // 6. API Keys
    for (const apiKey of data.apiKeys ?? []) {
      insertKey.run({
        id: apiKey.id,
        name: apiKey.name,
        key: apiKey.key,
        machineId: apiKey.machineId ?? null,
        allowedModels: JSON.stringify(apiKey.allowedModels ?? []),
        noLog: apiKey.noLog ? 1 : 0,
        createdAt: apiKey.createdAt ?? new Date().toISOString(),
      });
    }
  });

  migrate();

  return {
    connections: (data.providerConnections ?? []).length,
    nodes: (data.providerNodes ?? []).length,
    combos: (data.combos ?? []).length,
    apiKeys: (data.apiKeys ?? []).length,
  };
}
