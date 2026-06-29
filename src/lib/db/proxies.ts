// Convention: when type is a relay (vercel | deno | cloudflare), the `notes` column stores JSON
// { relayAuth: "<token>" } used by proxyFetch.ts to route requests through the relay edge function
// (Vercel Edge, Deno Deploy, or Cloudflare Workers) instead of an undici ProxyAgent. All relay
// types share the exact same x-relay-target / x-relay-path / x-relay-auth header spec; only the
// deployment surface differs.
import { randomUUID } from "crypto";
import { getDbInstance } from "./core";
import { backupDbFile } from "./backup";
import { decrypt } from "./encryption";

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
  source: string;
  family: string;
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
  source?: string;
  family?: string;
}

interface ProxyAssignmentPayload {
  scope: string;
  scopeId?: string | null;
}

interface ProxyMutationResult {
  proxy: ProxyRegistryRecord;
  assignment: ProxyAssignmentRecord | null;
}

type LegacyProxyClearStatus = "cleared" | "absent";

interface ProxyTransactionResult extends ProxyMutationResult {
  legacyClearStatus: LegacyProxyClearStatus;
}

interface LegacyProxyConfig {
  global?: unknown;
  providers?: Record<string, unknown>;
  combos?: Record<string, unknown>;
  keys?: Record<string, unknown>;
}

let proxyRegistryGeneration = 0;

function bumpProxyRegistryGeneration() {
  proxyRegistryGeneration++;
}

export function getProxyRegistryGeneration() {
  return proxyRegistryGeneration;
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
    source: typeof r.source === "string" ? r.source : "manual",
    family: typeof r.family === "string" ? r.family : "auto",
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

// Edge-relay proxy types. Mirrors RELAY_TYPES in open-sse/utils/proxyDispatcher.
// Duplicated here (not imported) to keep src/lib/db/ free of open-sse runtime
// imports; if a third relay backend lands, update BOTH sets.
const RELAY_PROXY_TYPES = new Set(["vercel", "deno", "cloudflare"]);

function isRelayProxyType(type: unknown): boolean {
  return typeof type === "string" && RELAY_PROXY_TYPES.has(type);
}

export function extractRelayAuth(notes: unknown): string | undefined {
  if (typeof notes !== "string") return undefined;
  try {
    const parsed = JSON.parse(notes) as {
      relayAuth?: string;
      relayAuthEnc?: string;
    };
    // Prefer the encrypted form when both are present (legacy plaintext rows
    // are still readable until migrated). decrypt() is a no-op when encryption
    // is disabled, matching the existing convention for webhook secrets.
    if (parsed.relayAuthEnc) {
      const dec = decrypt(parsed.relayAuthEnc);
      if (dec) return dec;
    }
    return parsed.relayAuth || undefined;
  } catch {
    return undefined;
  }
}

function toRegistryProxyResolution(row: unknown, level: ProxyScope, levelId: string | null) {
  const record = toRecord(row);
  const relayAuth = isRelayProxyType(record.type) ? extractRelayAuth(record.notes) : undefined;
  return {
    proxy: {
      type: record.type,
      host: record.host,
      port: record.port,
      username: record.username,
      password: record.password,
      family: typeof record.family === "string" ? record.family : "auto",
      ...(relayAuth !== undefined ? { relayAuth } : {}),
    },
    level,
    levelId,
    source: "registry",
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

function normalizeAssignmentScopeId(scope: ProxyScope, scopeId?: string | null) {
  return scope === "global" ? "__global__" : scopeId || null;
}

function toLegacyProxyLevel(scope: ProxyScope) {
  return scope === "account" ? "key" : scope;
}

// Mutate legacy proxyConfig rows directly so these writes stay inside the same
// SQLite transaction as the proxy registry row and assignment upsert.
function clearLegacyProxyForAssignment(
  db: ReturnType<typeof getDbInstance>,
  assignment: ProxyAssignmentPayload
): LegacyProxyClearStatus {
  const normalizedScope = normalizeScope(assignment.scope);
  const scopeId = normalizeAssignmentScopeId(normalizedScope, assignment.scopeId);
  const level = toLegacyProxyLevel(normalizedScope);

  const writeProxyConfig = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('proxyConfig', ?, ?)"
  );

  if (level === "global") {
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'proxyConfig' AND key = 'global'")
      .get() as { value?: string } | undefined;
    if (!row) return "absent";

    try {
      if (typeof row.value === "string" && JSON.parse(row.value) === null) return "absent";
    } catch {
      // Malformed global proxy config still needs to be overwritten with null.
    }

    writeProxyConfig.run("global", JSON.stringify(null));
    return "cleared";
  }

  if (!scopeId) return "absent";

  const mapKey = `${level}s`;
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'proxyConfig' AND key = ?")
    .get(mapKey) as { value?: string } | undefined;
  if (!row) return "absent";

  let map: JsonRecord = {};
  let shouldWrite = false;
  if (typeof row.value === "string") {
    try {
      const parsed = JSON.parse(row.value);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        map = parsed as JsonRecord;
      } else {
        shouldWrite = true;
      }
    } catch {
      shouldWrite = true;
    }
  }

  if (Object.prototype.hasOwnProperty.call(map, scopeId)) {
    delete map[scopeId];
    shouldWrite = true;
  }

  if (!shouldWrite) return "absent";

  writeProxyConfig.run(mapKey, JSON.stringify(map));
  return "cleared";
}

function insertProxyRow(
  db: ReturnType<typeof getDbInstance>,
  id: string,
  payload: ProxyPayload,
  now: string
) {
  db.prepare(
    `INSERT INTO proxy_registry
      (id, name, type, host, port, username, password, region, notes, status, source, family, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
    payload.source || "manual",
    payload.family || "auto",
    now,
    now
  );
}

function updateProxyRow(
  db: ReturnType<typeof getDbInstance>,
  id: string,
  existing: ProxyRegistryRecord,
  payload: Partial<ProxyPayload>,
  now: string
) {
  const incomingUsername =
    typeof payload.username === "string" ? payload.username.trim() : undefined;
  const incomingPassword =
    typeof payload.password === "string" ? payload.password.trim() : undefined;

  const merged = {
    ...existing,
    ...payload,
    // Omitted credentials mean preserve; explicitly provided blanks clear stored auth.
    username: incomingUsername === undefined ? existing.username : incomingUsername,
    password: incomingPassword === undefined ? existing.password : incomingPassword,
    updatedAt: now,
  };

  db.prepare(
    `UPDATE proxy_registry
       SET name = ?, type = ?, host = ?, port = ?, username = ?, password = ?, region = ?, notes = ?, status = ?, source = ?, family = ?, updated_at = ?
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
    merged.source || "manual",
    merged.family || "auto",
    merged.updatedAt,
    id
  );
}

function upsertAssignmentRow(
  db: ReturnType<typeof getDbInstance>,
  assignment: ProxyAssignmentPayload,
  proxyId: string,
  now: string
) {
  const normalizedScope = normalizeScope(assignment.scope);
  const normalizedScopeId = normalizeAssignmentScopeId(normalizedScope, assignment.scopeId);
  if (normalizedScope !== "global" && !normalizedScopeId) {
    throw new Error("scopeId is required for non-global proxy assignments");
  }

  db.prepare(
    `INSERT INTO proxy_assignments (proxy_id, scope, scope_id, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(scope, scope_id)
     DO UPDATE SET proxy_id = excluded.proxy_id, updated_at = excluded.updated_at`
  ).run(proxyId, normalizedScope, normalizedScopeId, now, now);
}

function getAssignmentRow(
  db: ReturnType<typeof getDbInstance>,
  scope: string,
  scopeId?: string | null
) {
  const normalizedScope = normalizeScope(scope);
  const normalizedScopeId = normalizeAssignmentScopeId(normalizedScope, scopeId);
  const row = db
    .prepare(
      "SELECT id, proxy_id, scope, scope_id, created_at, updated_at FROM proxy_assignments WHERE scope = ? AND scope_id IS ?"
    )
    .get(normalizedScope, normalizedScopeId);
  return row ? mapAssignmentRow(row) : null;
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
  let redactedNotes = proxy.notes;
  if (isRelayProxyType(proxy.type) && proxy.notes) {
    try {
      const parsed = JSON.parse(proxy.notes);
      if (parsed && typeof parsed === "object") {
        const next: Record<string, unknown> = { ...parsed };
        let touched = false;
        if ("relayAuth" in next) {
          next.relayAuth = "***";
          touched = true;
        }
        if ("relayAuthEnc" in next) {
          next.relayAuthEnc = "***";
          touched = true;
        }
        if (touched) {
          redactedNotes = JSON.stringify(next);
        }
      }
    } catch {
      // Non-JSON notes pass through unchanged
    }
  }
  return {
    ...proxy,
    username: proxy.username ? "***" : "",
    password: proxy.password ? "***" : "",
    notes: redactedNotes,
  };
}

export async function listProxies(options?: { includeSecrets?: boolean }) {
  const includeSecrets = options?.includeSecrets === true;
  const db = getDbInstance();
  const rows = db
    .prepare(
      "SELECT id, name, type, host, port, username, password, region, notes, status, source, family, created_at, updated_at FROM proxy_registry ORDER BY datetime(updated_at) DESC, name ASC"
    )
    .all();

  const proxies = rows.map(mapProxyRow);
  return includeSecrets ? proxies : proxies.map(redactProxySecrets);
}

export async function getProxyById(id: string, options?: { includeSecrets?: boolean }) {
  const db = getDbInstance();
  return getProxyRowById(db, id, options);
}

function getProxyRowById(
  db: ReturnType<typeof getDbInstance>,
  id: string,
  options?: { includeSecrets?: boolean }
) {
  const includeSecrets = options?.includeSecrets === true;
  const row = db
    .prepare(
      "SELECT id, name, type, host, port, username, password, region, notes, status, source, family, created_at, updated_at FROM proxy_registry WHERE id = ?"
    )
    .get(id);
  if (!row) return null;
  const proxy = mapProxyRow(row);
  return includeSecrets ? proxy : redactProxySecrets(proxy);
}

function getProxyRowByIdOrThrow(
  db: ReturnType<typeof getDbInstance>,
  id: string,
  options?: { includeSecrets?: boolean }
) {
  const proxy = getProxyRowById(db, id, options);
  if (!proxy) {
    throw new Error(`Failed to read proxy after mutation: ${id}`);
  }
  return proxy;
}

export async function createProxy(payload: ProxyPayload) {
  const db = getDbInstance();
  const id = randomUUID();
  const now = new Date().toISOString();

  insertProxyRow(db, id, payload, now);

  backupDbFile("pre-write");
  bumpProxyRegistryGeneration();
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

  updateProxyRow(db, id, existing, payload, new Date().toISOString());

  backupDbFile("pre-write");
  bumpProxyRegistryGeneration();
  return getProxyById(id, { includeSecrets: false });
}

export async function createProxyAndAssign(
  payload: ProxyPayload,
  assignment: ProxyAssignmentPayload
): Promise<ProxyMutationResult> {
  const db = getDbInstance();
  const id = randomUUID();
  const now = new Date().toISOString();

  const tx = db.transaction((): ProxyTransactionResult => {
    insertProxyRow(db, id, payload, now);
    upsertAssignmentRow(db, assignment, id, now);
    const legacyClearStatus = clearLegacyProxyForAssignment(db, assignment);
    return {
      legacyClearStatus,
      proxy: getProxyRowByIdOrThrow(db, id, { includeSecrets: false }),
      assignment: getAssignmentRow(db, assignment.scope, assignment.scopeId),
    };
  });
  const result = tx();

  backupDbFile("pre-write");
  bumpProxyRegistryGeneration();
  if (result.legacyClearStatus === "cleared") {
    // Dynamic import avoids a static proxies.ts -> settings.ts cycle; settings.ts
    // imports registry helpers for proxy resolution.
    const { bumpProxyConfigGeneration } = await import("./settings");
    bumpProxyConfigGeneration();
  }
  return {
    proxy: result.proxy,
    assignment: result.assignment,
  };
}

export async function updateProxyAndAssign(
  id: string,
  payload: Partial<ProxyPayload>,
  assignment: ProxyAssignmentPayload
): Promise<ProxyMutationResult | null> {
  const db = getDbInstance();
  const now = new Date().toISOString();

  const tx = db.transaction((): ProxyTransactionResult | null => {
    const existing = getProxyRowById(db, id, { includeSecrets: true });
    if (!existing) return null;

    updateProxyRow(db, id, existing, payload, now);
    upsertAssignmentRow(db, assignment, id, now);
    const legacyClearStatus = clearLegacyProxyForAssignment(db, assignment);
    return {
      legacyClearStatus,
      proxy: getProxyRowByIdOrThrow(db, id, { includeSecrets: false }),
      assignment: getAssignmentRow(db, assignment.scope, assignment.scopeId),
    };
  });
  const result = tx();
  if (!result) return null;

  backupDbFile("pre-write");
  bumpProxyRegistryGeneration();
  if (result.legacyClearStatus === "cleared") {
    // Dynamic import avoids a static proxies.ts -> settings.ts cycle; settings.ts
    // imports registry helpers for proxy resolution.
    const { bumpProxyConfigGeneration } = await import("./settings");
    bumpProxyConfigGeneration();
  }
  return {
    proxy: result.proxy,
    assignment: result.assignment,
  };
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
  const normalizedScopeId = normalizeAssignmentScopeId(normalizedScope, scopeId);
  const db = getDbInstance();

  if (!proxyId) {
    db.prepare("DELETE FROM proxy_assignments WHERE scope = ? AND scope_id IS ?").run(
      normalizedScope,
      normalizedScopeId
    );
    backupDbFile("pre-write");
    bumpProxyRegistryGeneration();
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
  bumpProxyRegistryGeneration();

  return getAssignmentRow(db, normalizedScope, normalizedScopeId);
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
  bumpProxyRegistryGeneration();
  return result.changes > 0;
}

// A proxy is "alive" for resolution unless it has been explicitly marked dead
// (by an operator or a health check). Conservative: active/null/unknown stay
// usable so a working proxy is never stranded; only known-dead states are
// excluded so a dead proxy stops being handed out (every request would
// otherwise pay the timeout or leak out the host IP).
const PROXY_ALIVE_PREDICATE =
  "(p.status IS NULL OR LOWER(p.status) NOT IN ('inactive','error','disabled','dead','down'))";

export async function resolveProxyForConnectionFromRegistry(connectionId: string) {
  try {
    const db = getDbInstance();

    const accountAssignment = db
      .prepare(
        `SELECT p.id, p.type, p.host, p.port, p.username, p.password, p.notes, p.family FROM proxy_assignments a JOIN proxy_registry p ON p.id = a.proxy_id WHERE a.scope = 'account' AND a.scope_id = ? AND ${PROXY_ALIVE_PREDICATE} LIMIT 1`
      )
      .get(connectionId);
    if (accountAssignment) {
      const record = toRecord(accountAssignment);
      const relayAuth = isRelayProxyType(record.type) ? extractRelayAuth(record.notes) : undefined;
      return {
        proxy: {
          type: record.type,
          host: record.host,
          port: record.port,
          username: record.username,
          password: record.password,
          family: typeof record.family === "string" ? record.family : "auto",
          ...(relayAuth !== undefined ? { relayAuth } : {}),
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
          `SELECT p.id, p.type, p.host, p.port, p.username, p.password, p.notes, p.family FROM proxy_assignments a JOIN proxy_registry p ON p.id = a.proxy_id WHERE a.scope = 'provider' AND a.scope_id = ? AND ${PROXY_ALIVE_PREDICATE} LIMIT 1`
        )
        .get(connection.provider);
      if (providerAssignment) {
        const record = toRecord(providerAssignment);
        const relayAuth = isRelayProxyType(record.type) ? extractRelayAuth(record.notes) : undefined;
        return {
          proxy: {
            type: record.type,
            host: record.host,
            port: record.port,
            username: record.username,
            password: record.password,
            family: typeof record.family === "string" ? record.family : "auto",
            ...(relayAuth !== undefined ? { relayAuth } : {}),
          },
          level: "provider",
          levelId: connection.provider,
          source: "registry",
        };
      }
    }

    const globalAssignment = db
      .prepare(
        `SELECT p.id, p.type, p.host, p.port, p.username, p.password, p.notes, p.family FROM proxy_assignments a JOIN proxy_registry p ON p.id = a.proxy_id WHERE a.scope = 'global' AND ${PROXY_ALIVE_PREDICATE} LIMIT 1`
      )
      .get();
    if (globalAssignment) {
      const record = toRecord(globalAssignment);
      const relayAuth = isRelayProxyType(record.type) ? extractRelayAuth(record.notes) : undefined;
      return {
        proxy: {
          type: record.type,
          host: record.host,
          port: record.port,
          username: record.username,
          password: record.password,
          family: typeof record.family === "string" ? record.family : "auto",
          ...(relayAuth !== undefined ? { relayAuth } : {}),
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

export async function resolveProxyForScopeFromRegistry(scope: string, scopeId?: string | null) {
  try {
    const db = getDbInstance();
    const normalizedScope = normalizeScope(scope);

    if (normalizedScope === "global") {
      const globalAssignment = db
        .prepare(
          `SELECT p.id, p.type, p.host, p.port, p.username, p.password, p.notes, p.family FROM proxy_assignments a JOIN proxy_registry p ON p.id = a.proxy_id WHERE a.scope = 'global' AND ${PROXY_ALIVE_PREDICATE} LIMIT 1`
        )
        .get();
      return globalAssignment ? toRegistryProxyResolution(globalAssignment, "global", null) : null;
    }

    const normalizedScopeId = scopeId || null;
    if (!normalizedScopeId) return null;

    const assignment = db
      .prepare(
        `SELECT p.id, p.type, p.host, p.port, p.username, p.password, p.notes, p.family FROM proxy_assignments a JOIN proxy_registry p ON p.id = a.proxy_id WHERE a.scope = ? AND a.scope_id = ? AND ${PROXY_ALIVE_PREDICATE} LIMIT 1`
      )
      .get(normalizedScope, normalizedScopeId);

    return assignment
      ? toRegistryProxyResolution(assignment, normalizedScope, normalizedScopeId)
      : null;
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
    // Resolve by specificity across both storage backends. The GUI Custom tab
    // still writes provider/global proxies to the legacy config, while Saved
    // Proxy uses the registry. A registry-global fallback must not shadow a
    // more-specific legacy provider proxy (#2601).
    const registryProvider = await resolveProxyForScopeFromRegistry("provider", providerId);
    if (registryProvider?.proxy) return registryProvider.proxy;

    // Fallback: honor the legacy per-provider / global proxy config (set via
    // /api/settings/proxy?level=provider&id=...). The proxy registry only tracks
    // explicit assignments; without this fallback the OAuth token exchange and
    // token-refresh paths ignore a proxy configured the legacy way and connect
    // directly — which on a VPS trips Anthropic's IP rate limit (#2456).
    // resolveProxyForConnection already has this fallback; mirror it here.
    // Dynamic import avoids a static cycle (settings.ts imports from proxies.ts).
    const { getProxyForLevel } = await import("./settings");
    const legacyProvider = await getProxyForLevel("provider", providerId);
    if (legacyProvider && typeof legacyProvider === "object" && legacyProvider.host) {
      return {
        type: legacyProvider.type,
        host: legacyProvider.host,
        port: legacyProvider.port,
        username: legacyProvider.username,
        password: legacyProvider.password,
      };
    }

    const registryGlobal = await resolveProxyForScopeFromRegistry("global");
    if (registryGlobal?.proxy) return registryGlobal.proxy;

    const legacyGlobal = await getProxyForLevel("global");
    if (legacyGlobal && typeof legacyGlobal === "object" && legacyGlobal.host) {
      return {
        type: legacyGlobal.type,
        host: legacyGlobal.host,
        port: legacyGlobal.port,
        username: legacyGlobal.username,
        password: legacyGlobal.password,
      };
    }

    return null;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("no such table")) return null;
    throw error;
  }
}
