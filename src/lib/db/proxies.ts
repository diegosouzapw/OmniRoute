import { randomUUID } from "crypto";
import { getDbInstance } from "./core";
import { backupDbFile } from "./backup";

type JsonRecord = Record<string, unknown>;
type ProxyScope = "global" | "provider" | "account" | "combo";

interface ProxyRegistryRecord {
  id: string;
  name: string;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  region: string | null;
  notes: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ProxyAssignmentRecord {
  id: number;
  proxyId: string;
  scope: ProxyScope;
  scopeId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ProxyPayload {
  name: string;
  type: string;
  host: string;
  port: number;
  username?: string;
  password?: string;
  region?: string | null;
  notes?: string | null;
  status?: string;
}

interface LegacyProxyConfig {
  global?: unknown;
  providers?: Record<string, unknown>;
  combos?: Record<string, unknown>;
  keys?: Record<string, unknown>;
}

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}

function mapProxyRow(row: unknown): ProxyRegistryRecord {
  const r = toRecord(row);
  return {
    id: typeof r.id === "string" ? r.id : "",
    name: typeof r.name === "string" ? r.name : "",
    type: typeof r.type === "string" ? r.type : "http",
    host: typeof r.host === "string" ? r.host : "",
    port: Number(r.port) || 0,
    username: typeof r.username === "string" ? r.username : "",
    password: typeof r.password === "string" ? r.password : "",
    region: typeof r.region === "string" ? r.region : null,
    notes: typeof r.notes === "string" ? r.notes : null,
    status: typeof r.status === "string" ? r.status : "active",
    createdAt: typeof r.created_at === "string" ? r.created_at : "",
    updatedAt: typeof r.updated_at === "string" ? r.updated_at : "",
  };
}

function mapAssignmentRow(row: unknown): ProxyAssignmentRecord {
  const r = toRecord(row);
  const scope = (typeof r.scope === "string" ? r.scope : "global") as ProxyScope;
  const rawScopeId = typeof r.scope_id === "string" ? r.scope_id : null;
  return {
    id: Number(r.id) || 0,
    proxyId: typeof r.proxy_id === "string" ? r.proxy_id : "",
    scope,
    scopeId: scope === "global" && rawScopeId === "__global__" ? null : rawScopeId,
    createdAt: typeof r.created_at === "string" ? r.created_at : "",
    updatedAt: typeof r.updated_at === "string" ? r.updated_at : "",
  };
}

function normalizeScope(scope: string): ProxyScope {
  const value = String(scope || "").toLowerCase();
  if (value === "key") return "account";
  if (value === "provider") return "provider";
  if (value === "account") return "account";
  if (value === "combo") return "combo";
  return "global";
}

function coerceProxyPayload(value: unknown, fallbackName: string): ProxyPayload | null {
  if (!value) return null;

  if (typeof value === "string") {
    try {
      const parsed = new URL(value);
      return {
        name: fallbackName,
        type: parsed.protocol.replace(":", "") || "http",
        host: parsed.hostname,
        port: Number(parsed.port || (parsed.protocol === "https:" ? "443" : "8080")),
        username: parsed.username ? decodeURIComponent(parsed.username) : "",
        password: parsed.password ? decodeURIComponent(parsed.password) : "",
        status: "active",
      };
    } catch {
      return null;
    }
  }

  if (typeof value !== "object" || Array.isArray(value)) return null;
  const record = toRecord(value);
  const host = typeof record.host === "string" ? record.host.trim() : "";
  if (!host) return null;
  const port = Number(record.port) || 8080;

  return {
    name: fallbackName,
    type: typeof record.type === "string" ? record.type : "http",
    host,
    port,
    username: typeof record.username === "string" ? record.username : "",
    password: typeof record.password === "string" ? record.password : "",
    status: "active",
  };
}

export function redactProxySecrets(proxy: ProxyRegistryRecord): ProxyRegistryRecord {
  return {
    ...proxy,
    username: proxy.username ? "***" : "",
    password: proxy.password ? "***" : "",
  };
}

export async function listProxies(options?: { includeSecrets?: boolean }) {
  const includeSecrets = options?.includeSecrets === true;
  const db = getDbInstance();
  const rows = db
    .prepare(
      "SELECT id, name, type, host, port, username, password, region, notes, status, created_at, updated_at FROM proxy_registry ORDER BY datetime(updated_at) DESC, name ASC"
    )
    .all();

  const proxies = rows.map(mapProxyRow);
  return includeSecrets ? proxies : proxies.map(redactProxySecrets);
}

export async function getProxyById(id: string, options?: { includeSecrets?: boolean }) {
  const includeSecrets = options?.includeSecrets === true;
  const db = getDbInstance();
  const row = db
    .prepare(
      "SELECT id, name, type, host, port, username, password, region, notes, status, created_at, updated_at FROM proxy_registry WHERE id = ?"
    )
    .get(id);
  if (!row) return null;
  const proxy = mapProxyRow(row);
  return includeSecrets ? proxy : redactProxySecrets(proxy);
}

export async function createProxy(payload: ProxyPayload) {
  const db = getDbInstance();
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO proxy_registry
      (id, name, type, host, port, username, password, region, notes, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    payload.name,
    payload.type,
    payload.host,
    Number(payload.port),
    payload.username || "",
    payload.password || "",
    payload.region || null,
    payload.notes || null,
    payload.status || "active",
    now,
    now
  );

  backupDbFile("pre-write");
  return getProxyById(id, { includeSecrets: false });
}

/**
 * Upsert a proxy by host+port.
 * If a proxy with the same host and port already exists, update it.
 * Otherwise, create a new one. Used by the bulk import feature.
 */
export async function upsertProxy(payload: ProxyPayload): Promise<{
  proxy: ProxyRegistryRecord | null;
  action: "created" | "updated";
}> {
  const db = getDbInstance();
  const host = (payload.host || "").trim();
  const port = Number(payload.port);

  const existing = db
    .prepare("SELECT id FROM proxy_registry WHERE host = ? AND port = ? LIMIT 1")
    .get(host, port) as { id?: string } | undefined;

  if (existing?.id) {
    const updated = await updateProxy(existing.id, payload);
    return { proxy: updated, action: "updated" };
  }

  const created = await createProxy(payload);
  return { proxy: created, action: "created" };
}

export async function updateProxy(id: string, payload: Partial<ProxyPayload>) {
  const db = getDbInstance();
  const existing = await getProxyById(id, { includeSecrets: true });
  if (!existing) return null;

  const incomingUsername =
    typeof payload.username === "string" ? payload.username.trim() : undefined;
  const incomingPassword =
    typeof payload.password === "string" ? payload.password.trim() : undefined;

  const merged = {
    ...existing,
    ...payload,
    // Preserve stored credentials unless caller explicitly sends non-empty replacements.
    username:
      incomingUsername === undefined || incomingUsername.length === 0
        ? existing.username
        : incomingUsername,
    password:
      incomingPassword === undefined || incomingPassword.length === 0
        ? existing.password
        : incomingPassword,
    updatedAt: new Date().toISOString(),
  };

  db.prepare(
    `UPDATE proxy_registry
       SET name = ?, type = ?, host = ?, port = ?, username = ?, password = ?, region = ?, notes = ?, status = ?, updated_at = ?
     WHERE id = ?`
  ).run(
    merged.name,
    merged.type,
    merged.host,
    Number(merged.port),
    merged.username || "",
    merged.password || "",
    merged.region || null,
    merged.notes || null,
    merged.status || "active",
    merged.updatedAt,
    id
  );

  backupDbFile("pre-write");
  return getProxyById(id, { includeSecrets: false });
}

export async function getProxyAssignments(filters?: { proxyId?: string; scope?: string }) {
  try {
    const db = getDbInstance();

    if (filters?.proxyId) {
      return db
        .prepare(
          "SELECT id, proxy_id, scope, scope_id, created_at, updated_at FROM proxy_assignments WHERE proxy_id = ? ORDER BY scope, scope_id"
        )
        .all(filters.proxyId)
        .map(mapAssignmentRow);
    }

    if (filters?.scope) {
      return db
        .prepare(
          "SELECT id, proxy_id, scope, scope_id, created_at, updated_at FROM proxy_assignments WHERE scope = ? ORDER BY scope_id"
        )
        .all(normalizeScope(filters.scope))
        .map(mapAssignmentRow);
    }

    return db
      .prepare(
        "SELECT id, proxy_id, scope, scope_id, created_at, updated_at FROM proxy_assignments ORDER BY scope, scope_id"
      )
      .all()
      .map(mapAssignmentRow);
  } catch (error: unknown) {
    // Fix #1706: Gracefully handle missing proxy_assignments table on fresh
    // Electron installs where migration 004 hasn't run yet.
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("no such table")) return [];
    throw error;
  }
}

export async function getProxyWhereUsed(proxyId: string) {
  const db = getDbInstance();
  const rows = db
    .prepare(
      "SELECT id, proxy_id, scope, scope_id, created_at, updated_at FROM proxy_assignments WHERE proxy_id = ? ORDER BY scope, scope_id"
    )
    .all(proxyId)
    .map(mapAssignmentRow);

  return {
    count: rows.length,
    assignments: rows,
  };
}

export async function assignProxyToScope(
  scope: string,
  scopeId: string | null,
  proxyId: string | null
): Promise<ProxyAssignmentRecord | null> {
  const normalizedScope = normalizeScope(scope);
  const normalizedScopeId = normalizedScope === "global" ? "__global__" : scopeId;
  const db = getDbInstance();

  if (!proxyId) {
    db.prepare("DELETE FROM proxy_assignments WHERE scope = ? AND scope_id IS ?").run(
      normalizedScope,
      normalizedScopeId
    );
    backupDbFile("pre-write");
    return null;
  }

  const proxy = await getProxyById(proxyId, { includeSecrets: true });
  if (!proxy) {
    const err = new Error(`Proxy not found: ${proxyId}`) as Error & { status?: number };
    err.status = 404;
    throw err;
  }

  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO proxy_assignments (proxy_id, scope, scope_id, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(scope, scope_id)
     DO UPDATE SET proxy_id = excluded.proxy_id, updated_at = excluded.updated_at`
  ).run(proxyId, normalizedScope, normalizedScopeId, now, now);

  backupDbFile("pre-write");

  const row = db
    .prepare(
      "SELECT id, proxy_id, scope, scope_id, created_at, updated_at FROM proxy_assignments WHERE scope = ? AND scope_id IS ?"
    )
    .get(normalizedScope, normalizedScopeId);
  return row ? mapAssignmentRow(row) : null;
}

export async function deleteProxyById(id: string, options?: { force?: boolean }) {
  const force = options?.force === true;
  const db = getDbInstance();
  const usage = await getProxyWhereUsed(id);

  if (!force && usage.count > 0) {
    const err = new Error(
      "Proxy is still assigned. Remove assignments first or use force=true"
    ) as Error & {
      status?: number;
      code?: string;
    };
    err.status = 409;
    err.code = "proxy_in_use";
    throw err;
  }

  if (force && usage.count > 0) {
    db.prepare("DELETE FROM proxy_assignments WHERE proxy_id = ?").run(id);
  }

  const result = db.prepare("DELETE FROM proxy_registry WHERE id = ?").run(id);
  backupDbFile("pre-write");
  return result.changes > 0;
}

export async function resolveProxyForConnectionFromRegistry(connectionId: string) {
  try {
    const db = getDbInstance();

    const accountAssignment = db
      .prepare(
        "SELECT p.id, p.type, p.host, p.port, p.username, p.password FROM proxy_assignments a JOIN proxy_registry p ON p.id = a.proxy_id WHERE a.scope = 'account' AND a.scope_id = ? LIMIT 1"
      )
      .get(connectionId);
    if (accountAssignment) {
      const record = toRecord(accountAssignment);
      return {
        proxy: {
          type: record.type,
          host: record.host,
          port: record.port,
          username: record.username,
          password: record.password,
        },
        level: "account",
        levelId: connectionId,
        source: "registry",
      };
    }

    const connection = db
      .prepare("SELECT provider FROM provider_connections WHERE id = ?")
      .get(connectionId) as { provider?: string } | undefined;

    if (connection?.provider) {
      const providerAssignment = db
        .prepare(
          "SELECT p.id, p.type, p.host, p.port, p.username, p.password FROM proxy_assignments a JOIN proxy_registry p ON p.id = a.proxy_id WHERE a.scope = 'provider' AND a.scope_id = ? LIMIT 1"
        )
        .get(connection.provider);
      if (providerAssignment) {
        const record = toRecord(providerAssignment);
        return {
          proxy: {
            type: record.type,
            host: record.host,
            port: record.port,
            username: record.username,
            password: record.password,
          },
          level: "provider",
          levelId: connection.provider,
          source: "registry",
        };
      }
    }

    const globalAssignment = db
      .prepare(
        "SELECT p.id, p.type, p.host, p.port, p.username, p.password FROM proxy_assignments a JOIN proxy_registry p ON p.id = a.proxy_id WHERE a.scope = 'global' LIMIT 1"
      )
      .get();
    if (globalAssignment) {
      const record = toRecord(globalAssignment);
      return {
        proxy: {
          type: record.type,
          host: record.host,
          port: record.port,
          username: record.username,
          password: record.password,
        },
        level: "global",
        levelId: null,
        source: "registry",
      };
    }

    return null;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("no such table")) return null;
    throw error;
  }
}

export async function migrateLegacyProxyConfigToRegistry(options?: { force?: boolean }) {
  const force = options?.force === true;
  const db = getDbInstance();

  const existingCountRow = db.prepare("SELECT COUNT(*) AS cnt FROM proxy_registry").get() as
    | { cnt?: number }
    | undefined;
  const existingCount = Number(existingCountRow?.cnt || 0);
  if (!force && existingCount > 0) {
    return { migrated: 0, skipped: true, reason: "registry_not_empty" as const };
  }

  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'proxyConfig'")
    .all() as Array<{ key?: string; value?: string }>;

  const raw: LegacyProxyConfig = {};
  for (const row of rows) {
    if (!row?.key || typeof row.value !== "string") continue;
    try {
      raw[row.key as keyof LegacyProxyConfig] = JSON.parse(row.value);
    } catch {
      // ignore malformed legacy entry
    }
  }

  let migrated = 0;

  if (raw.global) {
    const payload = coerceProxyPayload(raw.global, "Legacy Global Proxy");
    if (payload) {
      const created = await createProxy(payload);
      if (created?.id) {
        await assignProxyToScope("global", null, created.id);
        migrated++;
      }
    }
  }

  for (const [providerId, proxyValue] of Object.entries(raw.providers || {})) {
    const payload = coerceProxyPayload(proxyValue, `Legacy Provider Proxy (${providerId})`);
    if (!payload) continue;
    const created = await createProxy(payload);
    if (created?.id) {
      await assignProxyToScope("provider", providerId, created.id);
      migrated++;
    }
  }

  for (const [comboId, proxyValue] of Object.entries(raw.combos || {})) {
    const payload = coerceProxyPayload(proxyValue, `Legacy Combo Proxy (${comboId})`);
    if (!payload) continue;
    const created = await createProxy(payload);
    if (created?.id) {
      await assignProxyToScope("combo", comboId, created.id);
      migrated++;
    }
  }

  for (const [connectionId, proxyValue] of Object.entries(raw.keys || {})) {
    const payload = coerceProxyPayload(proxyValue, `Legacy Account Proxy (${connectionId})`);
    if (!payload) continue;
    const created = await createProxy(payload);
    if (created?.id) {
      await assignProxyToScope("account", connectionId, created.id);
      migrated++;
    }
  }

  return { migrated, skipped: false as const };
}

export async function getProxyHealthStats(options?: { hours?: number }) {
  const db = getDbInstance();
  const hours = Math.max(1, Math.min(24 * 30, Number(options?.hours || 24)));
  const sinceIso = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

  const rows = db
    .prepare(
      `SELECT
         p.id as proxy_id,
         p.name as proxy_name,
         p.type as proxy_type,
         p.host as proxy_host,
         p.port as proxy_port,
         COUNT(l.id) as total_requests,
         SUM(CASE WHEN l.status = 'success' THEN 1 ELSE 0 END) as success_count,
         SUM(CASE WHEN l.status = 'error' THEN 1 ELSE 0 END) as error_count,
         SUM(CASE WHEN l.status = 'timeout' THEN 1 ELSE 0 END) as timeout_count,
         AVG(CASE WHEN l.latency_ms IS NOT NULL THEN l.latency_ms END) as avg_latency_ms,
         MAX(l.timestamp) as last_seen_at
       FROM proxy_registry p
       LEFT JOIN proxy_logs l
         ON l.proxy_host = p.host
        AND l.proxy_type = p.type
        AND l.proxy_port = p.port
        AND l.timestamp >= ?
       GROUP BY p.id, p.name, p.type, p.host, p.port
       ORDER BY p.name ASC`
    )
    .all(sinceIso) as Array<Record<string, unknown>>;

  return rows.map((row) => {
    const total = Number(row.total_requests || 0);
    const success = Number(row.success_count || 0);
    const error = Number(row.error_count || 0);
    const timeout = Number(row.timeout_count || 0);
    const successRate = total > 0 ? Math.round((success / total) * 10000) / 100 : null;

    return {
      proxyId: String(row.proxy_id || ""),
      name: String(row.proxy_name || ""),
      type: String(row.proxy_type || "http"),
      host: String(row.proxy_host || ""),
      port: Number(row.proxy_port || 0),
      totalRequests: total,
      successCount: success,
      errorCount: error,
      timeoutCount: timeout,
      successRate,
      avgLatencyMs:
        row.avg_latency_ms === null || row.avg_latency_ms === undefined
          ? null
          : Math.round(Number(row.avg_latency_ms)),
      lastSeenAt: row.last_seen_at ? String(row.last_seen_at) : null,
    };
  });
}

export async function bulkAssignProxyToScope(
  scope: string,
  scopeIds: string[],
  proxyId: string | null
): Promise<{ updated: number; failed: Array<{ scopeId: string; reason: string }> }> {
  const uniqueScopeIds = [
    ...new Set((scopeIds || []).map((id) => String(id).trim()).filter(Boolean)),
  ];
  const failed: Array<{ scopeId: string; reason: string }> = [];
  let updated = 0;

  if (scope === "global") {
    await assignProxyToScope("global", null, proxyId);
    return { updated: 1, failed: [] };
  }

  for (const scopeId of uniqueScopeIds) {
    try {
      await assignProxyToScope(scope, scopeId, proxyId);
      updated++;
    } catch (error) {
      failed.push({
        scopeId,
        reason: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return { updated, failed };
}

/**
 * Resolve proxy for a provider (without connection ID).
 * Used during OAuth flow before connection is created.
 * Priority: provider-level → global → null
 */
export async function resolveProxyForProvider(providerId: string) {
  try {
    const db = getDbInstance();

    // Check provider-level proxy
    const providerAssignment = db
      .prepare(
        "SELECT p.id, p.type, p.host, p.port, p.username, p.password FROM proxy_assignments a JOIN proxy_registry p ON p.id = a.proxy_id WHERE a.scope = 'provider' AND a.scope_id = ? LIMIT 1"
      )
      .get(providerId);
    if (providerAssignment) {
      const record = toRecord(providerAssignment);
      return {
        type: record.type,
        host: record.host,
        port: record.port,
        username: record.username,
        password: record.password,
      };
    }

    // Check global proxy
    const globalAssignment = db
      .prepare(
        "SELECT p.id, p.type, p.host, p.port, p.username, p.password FROM proxy_assignments a JOIN proxy_registry p ON p.id = a.proxy_id WHERE a.scope = 'global' LIMIT 1"
      )
      .get();
    if (globalAssignment) {
      const record = toRecord(globalAssignment);
      return {
        type: record.type,
        host: record.host,
        port: record.port,
        username: record.username,
        password: record.password,
      };
    }

    return null;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("no such table")) return null;
    throw error;
  }
}
