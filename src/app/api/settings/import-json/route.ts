import { NextResponse } from "next/server";
import { getDbInstance } from "@/lib/db/core";
import { backupDbFile } from "@/lib/db/backup";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";

/**
 * POST /api/settings/import-json
 * Imports a legacy 9router configuration from a JSON file to SQLite
 */
export async function POST(request: Request) {
  if (await isAuthRequired()) {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    let rawData: string | null = null;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      if (!file) return NextResponse.json({ error: "No json file provided" }, { status: 400 });
      rawData = await file.text();
    } else {
      rawData = await request.text();
    }

    if (!rawData) {
      return NextResponse.json({ error: "Empty request payload" }, { status: 400 });
    }

    const data = JSON.parse(rawData);

    const db = getDbInstance();

    // 1. Create a safety backup before overwriting the entries
    backupDbFile("pre-json-import");

    // 2. Perform Migration within transaction
    const migrate = db.transaction(() => {

      // Provider Connections
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
          providerSpecificData: conn.providerSpecificData ? JSON.stringify(conn.providerSpecificData) : null,
          expiresIn: conn.expiresIn || null,
          displayName: conn.displayName || null,
          globalPriority: conn.globalPriority || null,
          defaultModel: conn.defaultModel || null,
          tokenType: conn.tokenType || null,
          consecutiveUseCount: conn.consecutiveUseCount || 0,
          lastUsedAt: conn.lastUsedAt || null,
          rateLimitProtection: conn.rateLimitProtection === true || conn.rateLimitProtection === 1 ? 1 : 0,
          createdAt: conn.createdAt || new Date().toISOString(),
          updatedAt: conn.updatedAt || new Date().toISOString(),
        });
      }

      // Provider Nodes
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

      // Key-Value Settings (ZERO-TRUST filter)
      const insertKv = db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)");

      for (const [key, value] of Object.entries((data.settings || {}) as Record<string, any>)) {
        // Redact auth and lockdown settings to prevent lockout or unauthorized access
        if (key === "password" || key === "requireLogin") {
          continue; 
        }
        insertKv.run("settings", key, JSON.stringify(value));
      }

      // Combos
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

      // API Keys
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

    return NextResponse.json({
      success: true,
      message: "Legacy JSON database imported successfully"
    });

  } catch (err) {
    console.error("[API] Error importing JSON backup:", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
