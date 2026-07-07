// Convention: when type is a relay (vercel | deno | cloudflare), the `notes` column stores JSON
// { relayAuth: "<token>" } used by proxyFetch.ts to route requests through the relay edge function
// (Vercel Edge, Deno Deploy, or Cloudflare Workers) instead of an undici ProxyAgent. All relay
// types share the exact same x-relay-target / x-relay-path / x-relay-auth header spec; only the
// deployment surface differs.
import { randomUUID } from "crypto";
import { getDbInstance } from "./core";
import { backupDbFile } from "./backup";
import type {
  JsonRecord,
  ProxyScope,
  ProxyRegistryRecord,
  ProxyAssignmentRecord,
  ProxyPayload,
  ProxyAssignmentPayload,
  ProxyMutationResult,
  LegacyProxyClearStatus,
  ProxyTransactionResult,
  LegacyProxyConfig,
  ProxyRotationStrategy,
} from "./proxies/types";
import {
  PROXY_ROTATION_STRATEGIES,
  DEFAULT_PROXY_ROTATION_STRATEGY,
} from "./proxies/types";
import {
  mapProxyRow,
  mapAssignmentRow,
  toRegistryProxyResolution,
  normalizeScope,
  normalizeAssignmentScopeId,
  toLegacyProxyLevel,
  coerceProxyPayload,
  redactProxySecrets,
} from "./proxies/mappers";
export { extractRelayAuth, redactProxySecrets } from "./proxies/mappers";

let proxyRegistryGeneration = 0;

function bumpProxyRegistryGeneration() {
  proxyRegistryGeneration++;
}

export function getProxyRegistryGeneration() {
  return proxyRegistryGeneration;
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

  // Single-assignment (replace) semantics: since #6365 lifted UNIQUE(scope,
  // scope_id) to allow proxy POOLS, this path keeps the legacy behavior where a
  // scope resolves to exactly one proxy — clear any existing pool and set a
  // 1-element pool at position 0. Pools are built explicitly via
  // addProxyToScopePool().
  replaceScopeWithSingleProxy(db, normalizedScope, normalizedScopeId, proxyId, now);
}

// Replace whatever proxies are attached to (scope, scope_id) with a single proxy
// at position 0. Uses `IS` for the scope_id match so a NULL scope_id compares
// correctly (global stores '__global__', but non-global combos may be null).
function replaceScopeWithSingleProxy(
  db: ReturnType<typeof getDbInstance>,
  normalizedScope: string,
  normalizedScopeId: string | null,
  proxyId: string,
  now: string
) {
  db.prepare("DELETE FROM proxy_assignments WHERE scope = ? AND scope_id IS ?").run(
    normalizedScope,
    normalizedScopeId
  );
  db.prepare(
    `INSERT INTO proxy_assignments (proxy_id, scope, scope_id, position, created_at, updated_at)
     VALUES (?, ?, ?, 0, ?, ?)`
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
      "SELECT id, proxy_id, scope, scope_id, position, created_at, updated_at FROM proxy_assignments WHERE scope = ? AND scope_id IS ?"
    )
    .get(normalizedScope, normalizedScopeId);
  return row ? mapAssignmentRow(row) : null;
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
          "SELECT id, proxy_id, scope, scope_id, position, created_at, updated_at FROM proxy_assignments WHERE proxy_id = ? ORDER BY scope, scope_id"
        )
        .all(filters.proxyId)
        .map(mapAssignmentRow);
    }

    if (filters?.scope) {
      return db
        .prepare(
          "SELECT id, proxy_id, scope, scope_id, position, created_at, updated_at FROM proxy_assignments WHERE scope = ? ORDER BY scope_id"
        )
        .all(normalizeScope(filters.scope))
        .map(mapAssignmentRow);
    }

    return db
      .prepare(
        "SELECT id, proxy_id, scope, scope_id, position, created_at, updated_at FROM proxy_assignments ORDER BY scope, scope_id"
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
      "SELECT id, proxy_id, scope, scope_id, position, created_at, updated_at FROM proxy_assignments WHERE proxy_id = ? ORDER BY scope, scope_id"
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
    clearRotationState(db, normalizedScope, normalizedScopeId);
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
  // Replace semantics (#6365): a plain assignProxyToScope always yields a
  // 1-element pool. Reset any round-robin cursor so the fresh single assignment
  // starts clean. Multi-proxy pools are built via addProxyToScopePool().
  replaceScopeWithSingleProxy(db, normalizedScope, normalizedScopeId, proxyId, now);
  resetRotationCursor(db, normalizedScope, normalizedScopeId);

  backupDbFile("pre-write");
  bumpProxyRegistryGeneration();

  return getAssignmentRow(db, normalizedScope, normalizedScopeId);
}

// ──────────────── Proxy Pools & Rotation (#6365) ────────────────

// Rotation state keys off the SAME normalized scope_id as assignments so a global
// pool ('__global__') and a per-scope pool share one deterministic cursor row.
function normalizeRotationScopeId(scope: ProxyScope, scopeId?: string | null): string {
  return normalizeAssignmentScopeId(scope, scopeId) ?? "";
}

function clearRotationState(
  db: ReturnType<typeof getDbInstance>,
  scope: string,
  normalizedScopeId: string | null
) {
  db.prepare("DELETE FROM proxy_scope_rotation WHERE scope = ? AND scope_id IS ?").run(
    scope,
    normalizedScopeId ?? ""
  );
}

function resetRotationCursor(
  db: ReturnType<typeof getDbInstance>,
  scope: string,
  normalizedScopeId: string | null
) {
  db.prepare(
    "UPDATE proxy_scope_rotation SET cursor = 0, rotated_at = NULL, updated_at = ? WHERE scope = ? AND scope_id IS ?"
  ).run(new Date().toISOString(), scope, normalizedScopeId ?? "");
}

function normalizeRotationStrategy(strategy: unknown): ProxyRotationStrategy {
  return PROXY_ROTATION_STRATEGIES.includes(strategy as ProxyRotationStrategy)
    ? (strategy as ProxyRotationStrategy)
    : DEFAULT_PROXY_ROTATION_STRATEGY;
}

/**
 * Add a proxy to a scope's rotation POOL (#6365). Idempotent per
 * (scope, scope_id, proxy_id): re-adding the same proxy is a no-op. New members
 * are appended after the current highest `position` so round-robin order is stable.
 */
export async function addProxyToScopePool(
  scope: string,
  scopeId: string | null,
  proxyId: string
): Promise<ProxyAssignmentRecord | null> {
  const normalizedScope = normalizeScope(scope);
  const normalizedScopeId = normalizeAssignmentScopeId(normalizedScope, scopeId);
  if (normalizedScope !== "global" && !normalizedScopeId) {
    throw new Error("scopeId is required for non-global proxy assignments");
  }

  const db = getDbInstance();
  const proxy = await getProxyById(proxyId, { includeSecrets: true });
  if (!proxy) {
    const err = new Error(`Proxy not found: ${proxyId}`) as Error & { status?: number };
    err.status = 404;
    throw err;
  }

  const existing = db
    .prepare(
      "SELECT id FROM proxy_assignments WHERE scope = ? AND scope_id IS ? AND proxy_id = ? LIMIT 1"
    )
    .get(normalizedScope, normalizedScopeId, proxyId);

  if (!existing) {
    const now = new Date().toISOString();
    const maxRow = db
      .prepare(
        "SELECT MAX(position) AS maxPos FROM proxy_assignments WHERE scope = ? AND scope_id IS ?"
      )
      .get(normalizedScope, normalizedScopeId) as { maxPos?: number | null } | undefined;
    const nextPosition = maxRow && typeof maxRow.maxPos === "number" ? maxRow.maxPos + 1 : 0;
    db.prepare(
      `INSERT INTO proxy_assignments (proxy_id, scope, scope_id, position, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(proxyId, normalizedScope, normalizedScopeId, nextPosition, now, now);

    backupDbFile("pre-write");
    bumpProxyRegistryGeneration();
  }

  const row = db
    .prepare(
      "SELECT id, proxy_id, scope, scope_id, position, created_at, updated_at FROM proxy_assignments WHERE scope = ? AND scope_id IS ? AND proxy_id = ? LIMIT 1"
    )
    .get(normalizedScope, normalizedScopeId, proxyId);
  return row ? mapAssignmentRow(row) : null;
}

/**
 * Remove one proxy from a scope's pool (#6365). Returns true if a row was deleted.
 * Leaves other pool members (and the rotation cursor) intact.
 */
export async function removeProxyFromScopePool(
  scope: string,
  scopeId: string | null,
  proxyId: string
): Promise<boolean> {
  const normalizedScope = normalizeScope(scope);
  const normalizedScopeId = normalizeAssignmentScopeId(normalizedScope, scopeId);
  const db = getDbInstance();
  const result = db
    .prepare("DELETE FROM proxy_assignments WHERE scope = ? AND scope_id IS ? AND proxy_id = ?")
    .run(normalizedScope, normalizedScopeId, proxyId);
  if (result.changes > 0) {
    backupDbFile("pre-write");
    bumpProxyRegistryGeneration();
  }
  return result.changes > 0;
}

/**
 * List a scope's pool members in rotation order (position ASC). Includes every
 * assigned proxy regardless of alive status — callers that only want serviceable
 * members should filter by proxy status themselves.
 */
export async function getScopeProxyPool(
  scope: string,
  scopeId?: string | null
): Promise<ProxyAssignmentRecord[]> {
  const normalizedScope = normalizeScope(scope);
  const normalizedScopeId = normalizeAssignmentScopeId(normalizedScope, scopeId);
  const db = getDbInstance();
  return db
    .prepare(
      "SELECT id, proxy_id, scope, scope_id, position, created_at, updated_at FROM proxy_assignments WHERE scope = ? AND scope_id IS ? ORDER BY position ASC, datetime(created_at) ASC, id ASC"
    )
    .all(normalizedScope, normalizedScopeId)
    .map(mapAssignmentRow);
}

/**
 * Set the rotation strategy for a scope's pool (#6365). Unknown values fall back
 * to the default (`round-robin`). Preserves the existing cursor so switching to
 * and back from `random` does not reset round-robin fairness.
 */
export async function setScopeRotationStrategy(
  scope: string,
  scopeId: string | null,
  strategy: ProxyRotationStrategy | string,
  options?: { stickyWindowMinutes?: number }
): Promise<ProxyRotationStrategy> {
  const normalizedScope = normalizeScope(scope);
  const rotationScopeId = normalizeRotationScopeId(normalizedScope, scopeId);
  const normalizedStrategy = normalizeRotationStrategy(strategy);
  const now = new Date().toISOString();
  const db = getDbInstance();

  const stickyWindow =
    options?.stickyWindowMinutes !== undefined && Number.isFinite(options.stickyWindowMinutes)
      ? Math.max(1, Math.floor(options.stickyWindowMinutes))
      : null;

  if (stickyWindow !== null) {
    db.prepare(
      `INSERT INTO proxy_scope_rotation (scope, scope_id, strategy, sticky_window_minutes, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(scope, scope_id)
       DO UPDATE SET strategy = excluded.strategy, sticky_window_minutes = excluded.sticky_window_minutes, updated_at = excluded.updated_at`
    ).run(normalizedScope, rotationScopeId, normalizedStrategy, stickyWindow, now);
  } else {
    db.prepare(
      `INSERT INTO proxy_scope_rotation (scope, scope_id, strategy, updated_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(scope, scope_id)
       DO UPDATE SET strategy = excluded.strategy, updated_at = excluded.updated_at`
    ).run(normalizedScope, rotationScopeId, normalizedStrategy, now);
  }

  bumpProxyRegistryGeneration();
  return normalizedStrategy;
}

/** Read a scope's rotation strategy (#6365). Defaults to `round-robin`. */
export async function getScopeRotationStrategy(
  scope: string,
  scopeId?: string | null
): Promise<ProxyRotationStrategy> {
  const normalizedScope = normalizeScope(scope);
  const rotationScopeId = normalizeRotationScopeId(normalizedScope, scopeId);
  const db = getDbInstance();
  const row = db
    .prepare("SELECT strategy FROM proxy_scope_rotation WHERE scope = ? AND scope_id IS ?")
    .get(normalizedScope, rotationScopeId) as { strategy?: string } | undefined;
  return normalizeRotationStrategy(row?.strategy);
}

// Read the rotation row for a scope, creating a default one lazily so the
// round-robin cursor has somewhere to live. Best-effort: any write failure leaves
// the caller on the default strategy with an ephemeral cursor.
function getOrCreateRotationRow(
  db: ReturnType<typeof getDbInstance>,
  normalizedScope: string,
  rotationScopeId: string
): { strategy: ProxyRotationStrategy; cursor: number; stickyWindowMinutes: number; rotatedAt: string | null } {
  const row = db
    .prepare(
      "SELECT strategy, cursor, sticky_window_minutes, rotated_at FROM proxy_scope_rotation WHERE scope = ? AND scope_id IS ?"
    )
    .get(normalizedScope, rotationScopeId) as
    | { strategy?: string; cursor?: number; sticky_window_minutes?: number; rotated_at?: string | null }
    | undefined;

  if (row) {
    return {
      strategy: normalizeRotationStrategy(row.strategy),
      cursor: Number(row.cursor) || 0,
      stickyWindowMinutes: Number(row.sticky_window_minutes) || 30,
      rotatedAt: typeof row.rotated_at === "string" ? row.rotated_at : null,
    };
  }

  const now = new Date().toISOString();
  db.prepare(
    "INSERT OR IGNORE INTO proxy_scope_rotation (scope, scope_id, strategy, cursor, updated_at) VALUES (?, ?, ?, 0, ?)"
  ).run(normalizedScope, rotationScopeId, DEFAULT_PROXY_ROTATION_STRATEGY, now);
  return {
    strategy: DEFAULT_PROXY_ROTATION_STRATEGY,
    cursor: 0,
    stickyWindowMinutes: 30,
    rotatedAt: null,
  };
}

/**
 * Pick one member from an already-alive candidate list according to the scope's
 * rotation strategy. Assumes `candidates` is non-empty and ordered by position.
 * Round-robin uses (and persists) a monotonic cursor; random uses Math.random;
 * sticky holds the current member until its window elapses, then advances.
 */
function pickFromCandidates<T>(
  db: ReturnType<typeof getDbInstance>,
  normalizedScope: string,
  rotationScopeId: string,
  candidates: T[]
): T {
  if (candidates.length === 1) return candidates[0];

  const state = getOrCreateRotationRow(db, normalizedScope, rotationScopeId);

  if (state.strategy === "random") {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  if (state.strategy === "sticky") {
    const windowMs = state.stickyWindowMinutes * 60_000;
    const lastRotated = state.rotatedAt ? Date.parse(state.rotatedAt) : NaN;
    const expired = !Number.isFinite(lastRotated) || Date.now() - lastRotated >= windowMs;
    let cursor = state.cursor;
    if (expired) {
      cursor = state.cursor + 1;
      db.prepare(
        "UPDATE proxy_scope_rotation SET cursor = ?, rotated_at = ?, updated_at = ? WHERE scope = ? AND scope_id IS ?"
      ).run(cursor, new Date().toISOString(), new Date().toISOString(), normalizedScope, rotationScopeId);
    }
    const idx = ((cursor % candidates.length) + candidates.length) % candidates.length;
    return candidates[idx];
  }

  // round-robin (default): pick at the current cursor, then advance it monotonically.
  const idx = ((state.cursor % candidates.length) + candidates.length) % candidates.length;
  db.prepare(
    "UPDATE proxy_scope_rotation SET cursor = ?, updated_at = ? WHERE scope = ? AND scope_id IS ?"
  ).run(state.cursor + 1, new Date().toISOString(), normalizedScope, rotationScopeId);
  return candidates[idx];
}

// Fetch the alive, position-ordered candidate rows for a (scope, scope_id) pool.
// `scope_id` is matched with `IS` (NULL-safe); pass the query-level scope_id
// (connection id / provider / '__global__' / combo id) — global callers pass null
// to match the historical "any global row" behavior.
function fetchAlivePoolRows(
  db: ReturnType<typeof getDbInstance>,
  scope: string,
  scopeIdFilter: string | null,
  matchAnyScopeId: boolean
): JsonRecord[] {
  const baseSelect =
    "SELECT p.id, p.type, p.host, p.port, p.username, p.password, p.notes, p.family, a.position AS __pos, a.id AS __aid " +
    "FROM proxy_assignments a JOIN proxy_registry p ON p.id = a.proxy_id WHERE a.scope = ? ";
  const order = " ORDER BY a.position ASC, a.id ASC";
  if (matchAnyScopeId) {
    return db
      .prepare(`${baseSelect}AND ${PROXY_ALIVE_PREDICATE}${order}`)
      .all(scope) as JsonRecord[];
  }
  return db
    .prepare(`${baseSelect}AND a.scope_id IS ? AND ${PROXY_ALIVE_PREDICATE}${order}`)
    .all(scope, scopeIdFilter) as JsonRecord[];
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

// Resolve one scope's alive pool to a single proxy via its rotation strategy.
// Returns the standard registry resolution shape, or null when the pool is empty
// or every member is dead (preserving the #6246 fail-closed contract — a dead
// pool never falls through to direct egress; the caller's guard blocks it).
function resolveScopePoolInternal(
  db: ReturnType<typeof getDbInstance>,
  scope: ProxyScope,
  levelId: string | null,
  options: { rotationScopeId: string; matchAnyScopeId?: boolean; scopeIdFilter?: string | null }
): ReturnType<typeof toRegistryProxyResolution> | null {
  const rows = fetchAlivePoolRows(
    db,
    scope,
    options.scopeIdFilter ?? null,
    options.matchAnyScopeId === true
  );
  if (rows.length === 0) return null;
  const picked = pickFromCandidates(db, scope, options.rotationScopeId, rows);
  return toRegistryProxyResolution(picked, scope, levelId);
}

export async function resolveProxyForConnectionFromRegistry(connectionId: string) {
  try {
    const db = getDbInstance();

    const account = resolveScopePoolInternal(db, "account", connectionId, {
      rotationScopeId: connectionId,
      scopeIdFilter: connectionId,
    });
    if (account) return account;

    const connection = db
      .prepare("SELECT provider FROM provider_connections WHERE id = ?")
      .get(connectionId) as { provider?: string } | undefined;

    if (connection?.provider) {
      const provider = resolveScopePoolInternal(db, "provider", connection.provider, {
        rotationScopeId: connection.provider,
        scopeIdFilter: connection.provider,
      });
      if (provider) return provider;
    }

    const global = resolveScopePoolInternal(db, "global", null, {
      rotationScopeId: normalizeRotationScopeId("global", null),
      matchAnyScopeId: true,
    });
    if (global) return global;

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
      return resolveScopePoolInternal(db, "global", null, {
        rotationScopeId: normalizeRotationScopeId("global", null),
        matchAnyScopeId: true,
      });
    }

    const normalizedScopeId = scopeId || null;
    if (!normalizedScopeId) return null;

    return resolveScopePoolInternal(db, normalizedScope, normalizedScopeId, {
      rotationScopeId: normalizeRotationScopeId(normalizedScope, normalizedScopeId),
      scopeIdFilter: normalizedScopeId,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("no such table")) return null;
    throw error;
  }
}

/**
 * #6246 fail-closed guard. Returns true when a connection would egress DIRECTLY
 * ONLY because its ASSIGNED proxy (account/provider/global scope) is dead/inactive
 * — i.e. the request must be BLOCKED, not silently sent on the real IP.
 *
 * Callers use this after `resolveProxyForConnection` returns a direct result: if
 * the operator assigned a proxy but every assigned proxy is dead, leaking the IP
 * is worse than failing the request. An explicit "proxy off" (global or per
 * connection) is a deliberate direct choice and is NOT treated as a leak. Read-only
 * and best-effort: any DB error fails OPEN (returns false) so a guard never breaks
 * the request path.
 */
export function hasBlockingProxyAssignment(connectionId: string): boolean {
  try {
    const db = getDbInstance();

    // Explicit global "proxy off" → direct is intended, never a leak.
    const globalRow = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'proxyEnabled'")
      .get() as { value?: string } | undefined;
    if (globalRow?.value) {
      try {
        if (JSON.parse(globalRow.value) === false) return false;
      } catch {
        /* malformed → treat as enabled */
      }
    }

    // Explicit per-connection "proxy off" → direct is intended.
    const conn = db
      .prepare("SELECT provider, proxy_enabled FROM provider_connections WHERE id = ?")
      .get(connectionId) as { provider?: string | null; proxy_enabled?: number } | undefined;
    if (conn && conn.proxy_enabled === 0) return false;
    const provider = conn?.provider ?? null;

    // A proxy is assigned to this connection at some scope, but every assigned
    // proxy is dead (the alive filter would have resolved a live one already).
    const dead = db
      .prepare(
        `SELECT 1 FROM proxy_assignments a JOIN proxy_registry p ON p.id = a.proxy_id
           WHERE ((a.scope = 'account' AND a.scope_id = ?)
               OR (a.scope = 'provider' AND a.scope_id = ?)
               OR (a.scope = 'global'))
             AND NOT ${PROXY_ALIVE_PREDICATE}
           LIMIT 1`
      )
      .get(connectionId, provider);
    return !!dead;
  } catch {
    return false;
  }
}

export async function migrateLegacyProxyConfigToRegistry(options?: { force?: boolean }) {
  const force = options?.force === true;
  const db = getDbInstance();

  const existingCountRow = db.prepare("SELECT COUNT(*) AS cnt FROM proxy_registry").get() as
    { cnt?: number } | undefined;
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
