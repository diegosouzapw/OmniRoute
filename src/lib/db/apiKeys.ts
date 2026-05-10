/**
 * db/apiKeys.js — API key management.
 */

import { createHash } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { getDbInstance, rowToCamel } from "./core";
import { backupDbFile } from "./backup";
import { registerDbStateResetter } from "./stateReset";
import { setNoLog } from "../compliance";

// ──────────────── Performance Optimizations ────────────────

// Schema check memoization - only run once
let _schemaChecked = false;

type JsonRecord = Record<string, unknown>;

interface CacheEntry<TValue> {
  timestamp: number;
  value: TValue;
}

export interface RateLimitRule {
  limit: number;
  window: number;
}

export interface AccessSchedule {
  enabled: boolean;
  from: string;
  until: string;
  days: number[];
  tz: string;
}

interface ApiKeyMetadata {
  id: string;
  name: string;
  machineId: string | null;
  allowedModels: string[];
  allowedConnections: string[];
  noLog: boolean;
  autoResolve: boolean;
  isActive: boolean;
  accessSchedule: AccessSchedule | null;
  maxRequestsPerDay: number | null;
  maxRequestsPerMinute: number | null;
  rateLimits: RateLimitRule[] | null;
  // T08: Per-key max concurrent sticky sessions (0 = unlimited)
  maxSessions: number;
  // Phase 3 lifecycle/policy fields
  revokedAt: string | null;
  expiresAt: string | null;
  ipAllowlist: string[];
  scopes: string[];
  isBanned: boolean;
  keyHash: string | null;
}

interface ApiKeyRow extends JsonRecord {
  id?: unknown;
  name?: unknown;
  key?: unknown;
  machine_id?: unknown;
  machineId?: unknown;
  allowed_models?: unknown;
  allowedModels?: unknown;
  allowed_connections?: unknown;
  allowedConnections?: unknown;
  no_log?: unknown;
  noLog?: unknown;
  auto_resolve?: unknown;
  autoResolve?: unknown;
  is_active?: unknown;
  isActive?: unknown;
  access_schedule?: unknown;
  accessSchedule?: unknown;
  rate_limits?: unknown;
  rateLimits?: unknown;
}

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes?: number };
}

interface ApiKeysDbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
  exec: (sql: string) => void;
}

interface ApiKeysStatements {
  getAllKeys: StatementLike<ApiKeyRow>;
  getKeyById: StatementLike<ApiKeyRow>;
  validateKey: StatementLike<JsonRecord>;
  getKeyMetadata: StatementLike<ApiKeyRow>;
  insertKey: StatementLike;
  deleteKey: StatementLike;
}

interface ApiKeyView extends JsonRecord {
  id?: string;
  allowedModels: string[];
  allowedConnections: string[];
  noLog: boolean;
  autoResolve: boolean;
  isActive: boolean;
  accessSchedule: AccessSchedule | null;
  rateLimits: RateLimitRule[] | null;
}

// LRU cache for API key validation (valid keys only)
const _keyValidationCache = new Map<string, { valid: boolean; timestamp: number }>();
const _keyMetadataCache = new Map<string, CacheEntry<ApiKeyMetadata>>();
const _lastUsedUpdateCache = new Map<string, number>();
const CACHE_TTL = 60 * 1000; // 1 minute TTL
const LAST_USED_UPDATE_TTL = 5 * 60 * 1000;
const MAX_CACHE_SIZE = 1000;

// Compiled regex cache for wildcard patterns
const _regexCache = new Map<string, RegExp>();

const API_KEY_COLUMN_FALLBACKS = [
  { name: "allowed_models", definition: "allowed_models TEXT" },
  { name: "no_log", definition: "no_log INTEGER NOT NULL DEFAULT 0" },
  { name: "allowed_connections", definition: "allowed_connections TEXT" },
  { name: "auto_resolve", definition: "auto_resolve INTEGER NOT NULL DEFAULT 0" },
  { name: "is_active", definition: "is_active INTEGER NOT NULL DEFAULT 1" },
  { name: "access_schedule", definition: "access_schedule TEXT" },
  { name: "max_requests_per_day", definition: "max_requests_per_day INTEGER" },
  { name: "max_requests_per_minute", definition: "max_requests_per_minute INTEGER" },
  { name: "max_sessions", definition: "max_sessions INTEGER NOT NULL DEFAULT 0" },
  { name: "revoked_at", definition: "revoked_at TEXT" },
  { name: "expires_at", definition: "expires_at TEXT" },
  { name: "last_used_at", definition: "last_used_at TEXT" },
  { name: "key_prefix", definition: "key_prefix TEXT" },
  { name: "ip_allowlist", definition: "ip_allowlist TEXT" },
  { name: "scopes", definition: "scopes TEXT" },
  { name: "rate_limits", definition: "rate_limits TEXT" },
  { name: "is_banned", definition: "is_banned INTEGER NOT NULL DEFAULT 0" },
  { name: "key_hash", definition: "key_hash TEXT" },
] as const;

// Cache for model permission checks
const _modelPermissionCache = new Map<string, { allowed: boolean; timestamp: number }>();

// Prepared statements cache
let _stmtGetAllKeys: ApiKeysStatements["getAllKeys"] | null = null;
let _stmtGetKeyById: ApiKeysStatements["getKeyById"] | null = null;
let _stmtValidateKey: ApiKeysStatements["validateKey"] | null = null;
let _stmtGetKeyMetadata: ApiKeysStatements["getKeyMetadata"] | null = null;
let _stmtInsertKey: ApiKeysStatements["insertKey"] | null = null;
let _stmtDeleteKey: ApiKeysStatements["deleteKey"] | null = null;

/**
 * Clear all caches (called on key create/update/delete)
 */
function invalidateCaches() {
  _keyValidationCache.clear();
  _keyMetadataCache.clear();
  _modelPermissionCache.clear();
  _lastUsedUpdateCache.clear();
}

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}

function isConfiguredEnvApiKey(key: string): boolean {
  const envKey = process.env.OMNIROUTE_API_KEY || process.env.ROUTER_API_KEY;
  return Boolean(envKey && key === envKey);
}

function markApiKeyUsed(db: ApiKeysDbLike, id: unknown, now: number): void {
  if (typeof id !== "string" || id.trim() === "") return;

  const lastUpdate = _lastUsedUpdateCache.get(id);
  if (lastUpdate && now - lastUpdate < LAST_USED_UPDATE_TTL) return;

  db.prepare("UPDATE api_keys SET last_used_at = @lastUsedAt WHERE id = @id").run({
    id,
    lastUsedAt: new Date(now).toISOString(),
  });
  _lastUsedUpdateCache.set(id, now);
}

/**
 * LRU eviction for cache
 */
function evictIfNeeded<TKey, TValue>(cache: Map<TKey, TValue>) {
  if (cache.size > MAX_CACHE_SIZE) {
    // Remove oldest 20% of entries
    const entriesToRemove = Math.floor(MAX_CACHE_SIZE * 0.2);
    let i = 0;
    for (const key of cache.keys()) {
      if (i++ >= entriesToRemove) break;
      cache.delete(key);
    }
  }
}

/**
 * Get or compile regex for wildcard pattern
 */
function getWildcardRegex(pattern: string): RegExp {
  let regex = _regexCache.get(pattern);
  if (!regex) {
    const regexStr = pattern.replace(/\*/g, ".*");
    regex = new RegExp(`^${regexStr}$`);
    _regexCache.set(pattern, regex);
    // Prevent unbounded growth
    if (_regexCache.size > 100) {
      const firstKey = _regexCache.keys().next().value;
      if (firstKey) _regexCache.delete(firstKey);
    }
  }
  return regex;
}

function ensureApiKeyColumn(
  db: ApiKeysDbLike,
  columnNames: Set<string>,
  column: (typeof API_KEY_COLUMN_FALLBACKS)[number]
): void {
  if (columnNames.has(column.name)) return;
  db.exec(`ALTER TABLE api_keys ADD COLUMN ${column.definition}`);
  console.log(`[DB] Added api_keys.${column.name} column`);
}

// Ensure api_keys extension columns exist (memoized)
function ensureApiKeysColumns(db: ApiKeysDbLike) {
  if (_schemaChecked) return;

  try {
    const columns = db.prepare<ApiKeyRow>("PRAGMA table_info(api_keys)").all();
    const columnNames = new Set(columns.map((column) => String(column.name ?? "")));
    for (const column of API_KEY_COLUMN_FALLBACKS) {
      ensureApiKeyColumn(db, columnNames, column);
    }
    _schemaChecked = true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[DB] Failed to verify api_keys schema:", message);
  }
}

/**
 * Initialize prepared statements (lazy initialization)
 */
function getPreparedStatements(db: ApiKeysDbLike): ApiKeysStatements {
  ensureApiKeysColumns(db);

  if (
    !_stmtGetAllKeys ||
    !_stmtGetKeyById ||
    !_stmtValidateKey ||
    !_stmtGetKeyMetadata ||
    !_stmtInsertKey ||
    !_stmtDeleteKey
  ) {
    _stmtGetAllKeys = db.prepare<ApiKeyRow>("SELECT * FROM api_keys ORDER BY created_at");
    _stmtGetKeyById = db.prepare<ApiKeyRow>("SELECT * FROM api_keys WHERE id = ?");
    _stmtValidateKey = db.prepare<JsonRecord>(
      "SELECT id, expires_at, revoked_at, is_active, is_banned FROM api_keys WHERE key = ? OR key_hash = ?"
    );
    _stmtGetKeyMetadata = db.prepare<ApiKeyRow>(
      "SELECT id, name, machine_id, allowed_models, allowed_connections, no_log, auto_resolve, is_active, access_schedule, max_requests_per_day, max_requests_per_minute, max_sessions, revoked_at, expires_at, ip_allowlist, scopes, rate_limits, is_banned, key_hash FROM api_keys WHERE key = ? OR key_hash = ?"
    );
    _stmtInsertKey = db.prepare(
      "INSERT INTO api_keys (id, name, key, machine_id, allowed_models, no_log, created_at, key_prefix, key_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
      "INSERT INTO api_keys (id, name, key, machine_id, allowed_models, no_log, created_at, key_prefix, scopes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    _stmtDeleteKey = db.prepare("DELETE FROM api_keys WHERE id = ?");
  }

  if (
    !_stmtGetAllKeys ||
    !_stmtGetKeyById ||
    !_stmtValidateKey ||
    !_stmtGetKeyMetadata ||
    !_stmtInsertKey ||
    !_stmtDeleteKey
  ) {
    throw new Error("Failed to initialize API key prepared statements");
  }

  return {
    getAllKeys: _stmtGetAllKeys,
    getKeyById: _stmtGetKeyById,
    validateKey: _stmtValidateKey,
    getKeyMetadata: _stmtGetKeyMetadata,
    insertKey: _stmtInsertKey,
    deleteKey: _stmtDeleteKey,
  };
}

export async function getApiKeys() {
  const db = getDbInstance() as ApiKeysDbLike;
  const stmt = getPreparedStatements(db);
  const rows = stmt.getAllKeys.all();
  return rows.map((row) => {
    const camelRow = toRecord(rowToCamel(row)) as ApiKeyView;
    camelRow.allowedModels = parseAllowedModels(camelRow.allowedModels);
    camelRow.allowedConnections = parseAllowedConnections(camelRow.allowedConnections);
    camelRow.noLog = parseNoLog(camelRow.noLog);
    camelRow.autoResolve = parseAutoResolve(camelRow.autoResolve);
    camelRow.isActive = parseIsActive(camelRow.isActive);
    camelRow.accessSchedule = parseAccessSchedule(camelRow.accessSchedule);
    camelRow.rateLimits = parseRateLimits(camelRow.rateLimits);
    camelRow.isBanned = parseIsBanned(camelRow.isBanned);
    if (typeof camelRow.id === "string" && camelRow.id.length > 0) {
      setNoLog(camelRow.id, camelRow.noLog === true);
    }
    return camelRow;
  });
}

export async function getApiKeyById(id: string) {
  const db = getDbInstance() as ApiKeysDbLike;
  const stmt = getPreparedStatements(db);
  const row = stmt.getKeyById.get(id);
  if (!row) return null;
  const camelRow = toRecord(rowToCamel(row)) as ApiKeyView;
  camelRow.allowedModels = parseAllowedModels(camelRow.allowedModels);
  camelRow.allowedConnections = parseAllowedConnections(camelRow.allowedConnections);
  camelRow.noLog = parseNoLog(camelRow.noLog);
  camelRow.autoResolve = parseAutoResolve(camelRow.autoResolve);
  camelRow.isActive = parseIsActive(camelRow.isActive);
  camelRow.accessSchedule = parseAccessSchedule(camelRow.accessSchedule);
  camelRow.rateLimits = parseRateLimits(camelRow.rateLimits);
  camelRow.isBanned = parseIsBanned(camelRow.isBanned);
  if (typeof camelRow.id === "string" && camelRow.id.length > 0) {
    setNoLog(camelRow.id, camelRow.noLog === true);
  }
  return camelRow;
}

/**
 * Helper function to safely parse allowed_models JSON
 */
function parseAllowedModels(value: unknown): string[] {
  if (!value || typeof value !== "string" || value.trim() === "") {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((entry): entry is string => typeof entry === "string")
      : [];
  } catch {
    return [];
  }
}

function parseNoLog(value: unknown): boolean {
  return value === true || value === 1 || value === "1";
}

function parseAutoResolve(value: unknown): boolean {
  return value === true || value === 1 || value === "1";
}

function parseIsActive(value: unknown): boolean {
  // DEFAULT 1 — active unless explicitly set to 0
  if (value === 0 || value === "0" || value === false) return false;
  return true;
}

function parseAccessSchedule(value: unknown): AccessSchedule | null {
  if (!value || typeof value !== "string" || value.trim() === "") return null;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const obj = parsed as Record<string, unknown>;
    if (
      typeof obj["enabled"] !== "boolean" ||
      typeof obj["from"] !== "string" ||
      typeof obj["until"] !== "string" ||
      !Array.isArray(obj["days"]) ||
      typeof obj["tz"] !== "string"
    ) {
      return null;
    }
    const days = (obj["days"] as unknown[]).filter(
      (d): d is number => typeof d === "number" && Number.isInteger(d) && d >= 0 && d <= 6
    );
    return {
      enabled: obj["enabled"],
      from: obj["from"],
      until: obj["until"],
      days,
      tz: obj["tz"],
    };
  } catch {
    return null;
  }
}

function parseRateLimits(value: unknown): RateLimitRule[] | null {
  if (!value || typeof value !== "string" || value.trim() === "") return null;
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter(
      (rule: any) =>
        typeof rule === "object" &&
        rule !== null &&
        typeof rule.limit === "number" &&
        typeof rule.window === "number"
    ) as RateLimitRule[];
  } catch {
    return null;
  }
}

/**
 * Helper function to safely parse allowed_connections JSON
 */
function parseAllowedConnections(value: unknown): string[] {
  if (!value || typeof value !== "string" || value.trim() === "") {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((entry): entry is string => typeof entry === "string")
      : [];
  } catch {
    return [];
  }
}

function parseStringList(value: unknown): string[] {
  if (!value || typeof value !== "string" || value.trim() === "") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((entry): entry is string => typeof entry === "string")
      : [];
  } catch {
    return [];
  }
}

function parseNullableTimestamp(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

function parseIsBanned(value: unknown): boolean {
  return value === 1 || value === "1" || value === true;
}

async function hashKey(key: string): Promise<string> {
  if (!key || typeof key !== "string") return "";
  return createHash("sha256").update(key).digest("hex");
}

export async function createApiKey(name: string, machineId: string) {
export async function createApiKey(name: string, machineId: string, scopes: string[] = []) {
  if (!machineId) {
    throw new Error("machineId is required");
  }

  const db = getDbInstance() as ApiKeysDbLike;
  const now = new Date().toISOString();

  const { generateApiKeyWithMachine } = await import("@/shared/utils/apiKey");
  const result = generateApiKeyWithMachine(machineId);

  const apiKey = {
    id: uuidv4(),
    name: name,
    key: result.key,
    machineId: machineId,
    allowedModels: [], // Empty array means all models allowed
    allowedConnections: [], // Empty array means all connections allowed
    noLog: false,
    createdAt: now,
    scopes,
  };

  const stmt = getPreparedStatements(db);
  stmt.insertKey.run(
    apiKey.id,
    apiKey.name,
    apiKey.key,
    apiKey.machineId,
    "[]",
    0,
    apiKey.createdAt,
    apiKey.key.slice(0, 12),
    await hashKey(apiKey.key)
    JSON.stringify(scopes)
  );
  setNoLog(apiKey.id, false);

  backupDbFile("pre-write");
  return apiKey;
}

export async function regenerateApiKey(id: string) {
  const db = getDbInstance() as ApiKeysDbLike;
  const stmt = getPreparedStatements(db);
  const row = stmt.getKeyById.get(id) as ApiKeyRow | undefined;
  if (!row) return null;

  const { generateApiKeyWithMachine } = await import("@/shared/utils/apiKey");
  const machineId = (row.machine_id || row.machineId || "0000000000000000") as string;
  const { key: newKey } = generateApiKeyWithMachine(machineId);
  const newHash = await hashKey(newKey);
  const newPrefix = newKey.slice(0, 12);

  // Update in DB
  const updateStmt = db.prepare(
    "UPDATE api_keys SET key = ?, key_hash = ?, key_prefix = ? WHERE id = ?"
  );
  updateStmt.run(newKey, newHash, newPrefix, id);

  // Invalidate all caches
  clearApiKeyCaches();

  // Redis invalidation
  try {
    const { getRedisClient } = await import("@/shared/utils/rateLimiter");
    const redis = getRedisClient();
    if (typeof row.key_hash === "string") await redis.del(`auth:api_key:${row.key_hash}`);
    await redis.del(`auth:api_key:${newHash}`);
  } catch (err) {
    // Fail silent
  }

  const { logAuditEvent } = await import("@/lib/compliance");
  logAuditEvent({
    action: "apiKey.regenerate",
    target: id,
    details: { name: String(row.name || "") },
  });

  return { id, key: newKey };
}

export async function updateApiKeyPermissions(
  id: string,
  update:
    | string[]
    | {
        name?: string;
        allowedModels?: string[];
        allowedConnections?: string[];
        noLog?: boolean;
        autoResolve?: boolean;
        isActive?: boolean;
        accessSchedule?: AccessSchedule | null;
        maxRequestsPerDay?: number | null;
        maxRequestsPerMinute?: number | null;
        rateLimits?: RateLimitRule[] | null;
        isBanned?: boolean;
        expiresAt?: string | null;
        // T08: max concurrent sessions for this key (0 = unlimited)
        maxSessions?: number | null;
        scopes?: string[] | null;
      }
) {
  const db = getDbInstance() as ApiKeysDbLike;
  getPreparedStatements(db);

  const normalized =
    Array.isArray(update) || update === undefined
      ? { allowedModels: update || [] }
      : {
          name: update.name,
          allowedModels: update.allowedModels,
          allowedConnections: update.allowedConnections,
          noLog: update.noLog,
          autoResolve: update.autoResolve,
          isActive: update.isActive,
          accessSchedule: update.accessSchedule,
          maxRequestsPerDay: update.maxRequestsPerDay,
          maxRequestsPerMinute: update.maxRequestsPerMinute,
          rateLimits: update.rateLimits,
          isBanned: update.isBanned,
          expiresAt: update.expiresAt,
          maxSessions: (update as { maxSessions?: number | null; expiresAt?: string | null })
            .maxSessions,
          maxSessions: (update as { maxSessions?: number | null }).maxSessions,
          scopes: (update as { scopes?: string[] | null }).scopes,
        };

  if (
    normalized.name === undefined &&
    normalized.allowedModels === undefined &&
    normalized.allowedConnections === undefined &&
    normalized.noLog === undefined &&
    normalized.autoResolve === undefined &&
    normalized.isActive === undefined &&
    normalized.accessSchedule === undefined &&
    normalized.maxRequestsPerDay === undefined &&
    normalized.maxRequestsPerMinute === undefined &&
    normalized.rateLimits === undefined &&
    normalized.isBanned === undefined &&
    normalized.expiresAt === undefined &&
    (normalized as Record<string, unknown>).maxSessions === undefined
    (normalized as Record<string, unknown>).maxSessions === undefined &&
    (normalized as Record<string, unknown>).scopes === undefined
  ) {
    return false;
  }

  const updates: string[] = [];
  const params: {
    id: string;
    name?: string;
    allowedModels?: string;
    allowedConnections?: string;
    noLog?: number;
    autoResolve?: number;
    isActive?: number;
    accessSchedule?: string | null;
    maxRequestsPerDay?: number | null;
    maxRequestsPerMinute?: number | null;
    rateLimits?: string | null;
    isBanned?: number;
    maxSessions?: number;
    expiresAt?: string | null;
    scopes?: string;
  } = { id };

  if (normalized.name !== undefined) {
    updates.push("name = @name");
    params.name = normalized.name;
  }

  if (normalized.allowedModels !== undefined) {
    // Empty array means all models are allowed
    updates.push("allowed_models = @allowedModels");
    params.allowedModels = JSON.stringify(normalized.allowedModels || []);
  }

  if (normalized.allowedConnections !== undefined) {
    // Empty array means all connections are allowed
    updates.push("allowed_connections = @allowedConnections");
    params.allowedConnections = JSON.stringify(normalized.allowedConnections || []);
  }

  if (normalized.noLog !== undefined) {
    updates.push("no_log = @noLog");
    params.noLog = normalized.noLog ? 1 : 0;
  }

  if (normalized.autoResolve !== undefined) {
    updates.push("auto_resolve = @autoResolve");
    params.autoResolve = normalized.autoResolve ? 1 : 0;
  }

  if (normalized.isActive !== undefined) {
    updates.push("is_active = @isActive");
    params.isActive = normalized.isActive ? 1 : 0;
  }

  if (normalized.accessSchedule !== undefined) {
    updates.push("access_schedule = @accessSchedule");
    params.accessSchedule =
      normalized.accessSchedule !== null ? JSON.stringify(normalized.accessSchedule) : null;
  }

  if (normalized.maxRequestsPerDay !== undefined) {
    updates.push("max_requests_per_day = @maxRequestsPerDay");
    params.maxRequestsPerDay = normalized.maxRequestsPerDay;
  }

  if (normalized.maxRequestsPerMinute !== undefined) {
    updates.push("max_requests_per_minute = @maxRequestsPerMinute");
    params.maxRequestsPerMinute = normalized.maxRequestsPerMinute;
  }

  if (normalized.rateLimits !== undefined) {
    updates.push("rate_limits = @rateLimits");
    params.rateLimits =
      normalized.rateLimits !== null ? JSON.stringify(normalized.rateLimits) : null;
  }

  if (normalized.isBanned !== undefined) {
    updates.push("is_banned = @isBanned");
    params.isBanned = normalized.isBanned ? 1 : 0;
  }

  if (normalized.expiresAt !== undefined) {
    updates.push("expires_at = @expiresAt");
    params.expiresAt = normalized.expiresAt;
  }

  const maxSessionsUpdate = (normalized as Record<string, unknown>).maxSessions;
  if (maxSessionsUpdate !== undefined) {
    updates.push("max_sessions = @maxSessions");
    params.maxSessions = typeof maxSessionsUpdate === "number" ? Math.max(0, maxSessionsUpdate) : 0;
  }

  const scopesUpdate = (normalized as Record<string, unknown>).scopes;
  if (scopesUpdate !== undefined) {
    updates.push("scopes = @scopes");
    params.scopes = JSON.stringify(Array.isArray(scopesUpdate) ? scopesUpdate : []);
  }

  const result = db.prepare(`UPDATE api_keys SET ${updates.join(", ")} WHERE id = @id`).run(params);

  if (result.changes === 0) return false;

  const { logAuditEvent } = await import("@/lib/compliance");

  if (normalized.isBanned !== undefined) {
    logAuditEvent({
      action: normalized.isBanned ? "apiKey.ban" : "apiKey.unban",
      target: id,
    });
  }

  if (normalized.isActive !== undefined) {
    logAuditEvent({
      action: normalized.isActive ? "apiKey.activate" : "apiKey.deactivate",
      target: id,
    });
  }

  if (normalized.noLog !== undefined) {
    setNoLog(id, normalized.noLog);
  }

  // Invalidate caches since permissions changed
  invalidateCaches();

  // Also invalidate Redis if key_hash is available
  try {
    const row = db.prepare("SELECT key_hash FROM api_keys WHERE id = ?").get(id) as { key_hash: string | null } | undefined;
    if (row?.key_hash) {
      const { getRedisClient } = await import("@/shared/utils/rateLimiter");
      const redis = getRedisClient();
      await redis.del(`auth:api_key:${row.key_hash}`);
    }
  } catch (err) {
    // Fail silent
  }

  backupDbFile("pre-write");
  return true;
}

export async function deleteApiKey(id: string) {
  const db = getDbInstance() as ApiKeysDbLike;
  const stmt = getPreparedStatements(db);
  const result = stmt.deleteKey.run(id);

  if (result.changes === 0) return false;

  db.prepare("DELETE FROM domain_budgets WHERE api_key_id = ?").run(id);
  db.prepare("DELETE FROM domain_cost_history WHERE api_key_id = ?").run(id);
  setNoLog(id, false);

  // Invalidate caches since a key was removed
  invalidateCaches();

  backupDbFile("pre-write");
  return true;
}

/**
 * Revoke an API key by id. Logical, not destructive: the row stays so it can
 * be audited, but validateApiKey() rejects it immediately after caches expire
 * (or sooner because invalidateCaches() runs here).
 */
export async function revokeApiKey(id: string): Promise<boolean> {
  const db = getDbInstance() as ApiKeysDbLike;
  getPreparedStatements(db);

  const result = db
    .prepare(
      "UPDATE api_keys SET revoked_at = COALESCE(revoked_at, @ts), is_active = 0 WHERE id = @id"
    )
    .run({ id, ts: new Date().toISOString() });

  if ((result.changes ?? 0) === 0) return false;

  invalidateCaches();
  backupDbFile("pre-write");
  return true;
}

/**
 * Set or clear the expiry of an API key. Pass null to remove the expiry.
 */
export async function setApiKeyExpiry(id: string, expiresAt: string | null): Promise<boolean> {
  const db = getDbInstance() as ApiKeysDbLike;
  getPreparedStatements(db);

  const result = db
    .prepare("UPDATE api_keys SET expires_at = @expiresAt WHERE id = @id")
    .run({ id, expiresAt });

  if ((result.changes ?? 0) === 0) return false;

  invalidateCaches();
  backupDbFile("pre-write");
  return true;
}

/**
 * Validate API key with lifecycle gates and caching.
 *
 * A key is valid only when ALL of the following are true:
 *   - the row exists,
 *   - is_active = 1,
 *   - revoked_at IS NULL,
 *   - expires_at IS NULL OR expires_at > now.
 *
 * Cache TTL is short (CACHE_TTL) and the metadata cache is also invalidated
 * by revokeApiKey/updateApiKeyPermissions/deleteApiKey, so a revoke takes
 * effect within at most CACHE_TTL even without an explicit clear in the
 * caller.
 */
export async function validateApiKey(key: string | null | undefined) {
  if (!key || typeof key !== "string") return false;

  if (isConfiguredEnvApiKey(key)) return true;

  const now = Date.now();
  const hashedKey = await hashKey(key);
  const cacheKey = hashedKey;

  const cached = _keyValidationCache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.valid;
  }

  // Try Redis cache for multi-instance consistency
  try {
    const { getRedisClient } = await import("@/shared/utils/rateLimiter");
    const redis = getRedisClient();
    const redisKey = `auth:api_key:${hashedKey}`;
    const redisData = await redis.get(redisKey);
    if (redisData) {
      const data = JSON.parse(redisData);
      const isBanned = !!data.isBanned;
      const isActive = !!data.isActive;
      const revokedAt = data.revokedAt;
      const expiresAt = data.expiresAt;

      if (isBanned || !isActive) return false;
      if (typeof revokedAt === "string" && revokedAt.trim() !== "") return false;
      if (typeof expiresAt === "string" && expiresAt.trim() !== "") {
        const expiresMs = Date.parse(expiresAt);
        if (Number.isFinite(expiresMs) && expiresMs <= now) return false;
      }
      return true;
    }
  } catch (err) {
    // Fail silent for Redis lookup
  }

  const db = getDbInstance() as ApiKeysDbLike;
  const stmt = getPreparedStatements(db);
  const row = stmt.validateKey.get(key, hashedKey) as JsonRecord | undefined;

  if (!row) return false;

  const isBanned = parseIsBanned(row.is_banned ?? row.isBanned);
  if (isBanned) return false;

  const isActive = parseIsActive(row.is_active ?? row.isActive);
  if (!isActive) return false;

  const revokedAt = row.revoked_at ?? row.revokedAt;
  if (typeof revokedAt === "string" && revokedAt.trim() !== "") return false;

  const expiresAt = row.expires_at ?? row.expiresAt;
  if (typeof expiresAt === "string" && expiresAt.trim() !== "") {
    const expiresMs = Date.parse(expiresAt);
    if (Number.isFinite(expiresMs) && expiresMs <= now) return false;
  }

  evictIfNeeded(_keyValidationCache);
  _keyValidationCache.set(cacheKey, { valid: true, timestamp: now });

  // Update Redis cache for fast validation
  try {
    const { getRedisClient } = await import("@/shared/utils/rateLimiter");
    const redis = getRedisClient();
    const redisKey = `auth:api_key:${hashedKey}`;
    await redis.set(
      redisKey,
      JSON.stringify({
        id: row.id,
        isBanned: parseIsBanned(row.is_banned),
        isActive: parseIsActive(row.is_active),
        expiresAt: row.expires_at,
        revokedAt: row.revoked_at,
      }),
      "EX",
      3600 // 1 hour cache
    );
  } catch (err) {
    // Fail silent for Redis cache update
  }

  markApiKeyUsed(db, row.id, now);

  return true;
}

/**
 * Get API key metadata with caching for performance
 */
export async function getApiKeyMetadata(
  key: string | null | undefined
): Promise<ApiKeyMetadata | null> {
  if (!key || typeof key !== "string") return null;

  const now = Date.now();

  // persistent env-var key support (persistent passthrough keys) (#1350)
  if (isConfiguredEnvApiKey(key)) {
    return {
      id: "env-key",
      name: "Environment Key",
      machineId: "server-env",
      allowedModels: [],
      allowedConnections: [],
      noLog: false,
      autoResolve: true,
      isActive: true,
      accessSchedule: null,
      rateLimits: null,
      maxRequestsPerDay: null,
      maxRequestsPerMinute: null,
      maxSessions: 0,
      revokedAt: null,
      expiresAt: null,
      ipAllowlist: [],
      scopes: [],
      isBanned: false,
      keyHash: null,
      scopes: ["manage"],
    };
  }

  // Check cache first
  const hashedKey = await hashKey(key);
  const cached = _keyMetadataCache.get(hashedKey);
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.value;
  }

  const db = getDbInstance() as ApiKeysDbLike;
  const stmt = getPreparedStatements(db);
  const row = stmt.getKeyMetadata.get(key, hashedKey);

  if (!row) return null;

  const record = toRecord(row) as ApiKeyRow;
  const metadataId = typeof record.id === "string" ? record.id : "";
  const metadataName = typeof record.name === "string" ? record.name : "";
  const machineIdRaw = record.machine_id ?? record.machineId;
  const metadataMachineId = typeof machineIdRaw === "string" ? machineIdRaw : null;

  const rawMaxRPD = record.max_requests_per_day ?? record.maxRequestsPerDay;
  const rawMaxRPM = record.max_requests_per_minute ?? record.maxRequestsPerMinute;

  const rawMaxSessions = record.max_sessions ?? record.maxSessions;

  const metadata: ApiKeyMetadata = {
    id: metadataId,
    name: metadataName,
    machineId: metadataMachineId,
    allowedModels: parseAllowedModels(record.allowed_models ?? record.allowedModels),
    allowedConnections: parseAllowedConnections(
      record.allowed_connections ?? record.allowedConnections
    ),
    noLog: parseNoLog(record.no_log ?? record.noLog),
    autoResolve: parseAutoResolve(record.auto_resolve ?? record.autoResolve),
    isActive: parseIsActive(record.is_active ?? record.isActive),
    accessSchedule: parseAccessSchedule(record.access_schedule ?? record.accessSchedule),
    rateLimits: parseRateLimits(record.rate_limits ?? (record as JsonRecord).rateLimits),
    maxRequestsPerDay: typeof rawMaxRPD === "number" && rawMaxRPD > 0 ? rawMaxRPD : null,
    maxRequestsPerMinute: typeof rawMaxRPM === "number" && rawMaxRPM > 0 ? rawMaxRPM : null,
    // T08: max concurrent sessions; 0 = unlimited (default & backward-compatible)
    maxSessions: typeof rawMaxSessions === "number" && rawMaxSessions > 0 ? rawMaxSessions : 0,
    revokedAt: parseNullableTimestamp(record.revoked_at ?? (record as JsonRecord).revokedAt),
    expiresAt: parseNullableTimestamp(record.expires_at ?? (record as JsonRecord).expiresAt),
    ipAllowlist: parseStringList(record.ip_allowlist ?? (record as JsonRecord).ipAllowlist),
    scopes: parseStringList((record as JsonRecord).scopes),
    isBanned: parseIsBanned(record.is_banned ?? (record as JsonRecord).isBanned),
    keyHash: (record.key_hash ?? (record as JsonRecord).keyHash) as string | null,
  };

  if (!metadata.id) {
    return null;
  }

  setNoLog(metadata.id, metadata.noLog === true);

  // Cache the result
  evictIfNeeded(_keyMetadataCache);
  _keyMetadataCache.set(hashedKey, { value: metadata, timestamp: now });

  return metadata;
}

/**
 * Check if a model is allowed for a given API key
 * @param {string} key - The API key
 * @param {string} modelId - The model ID to check
 * @returns {boolean} - true if allowed, false if not
 */
export async function isModelAllowedForKey(
  key: string | null | undefined,
  modelId: string | null | undefined
) {
  // If no key provided, allow (request may be using different auth method like JWT)
  // If no modelId provided, deny (invalid request)
  if (!key) return true;
  if (!modelId) return false;

  // Create cache key
  const cacheKey = `${key}:${modelId}`;
  const now = Date.now();

  // Check permission cache
  const cached = _modelPermissionCache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.allowed;
  }

  const metadata = await getApiKeyMetadata(key);
  // SECURITY: Key not found in database = deny access (invalid/non-existent key)
  if (!metadata) return false;

  const { allowedModels } = metadata;

  // Empty array means all models allowed
  if (!allowedModels || allowedModels.length === 0) {
    return true;
  }

  let allowed = false;

  // Check if model matches each allowed pattern
  // Support exact match and prefix match (e.g., "openai/*" allows all OpenAI models)
  for (const pattern of allowedModels) {
    if (pattern === modelId) {
      allowed = true;
      break;
    }
    if (pattern.endsWith("/*")) {
      const prefix = pattern.slice(0, -2); // Remove "/*"
      if (modelId.startsWith(prefix + "/") || modelId.startsWith(prefix)) {
        allowed = true;
        break;
      }
    }
    // Support wildcard patterns using cached regex
    if (pattern.includes("*")) {
      const regex = getWildcardRegex(pattern);
      if (regex.test(modelId)) {
        allowed = true;
        break;
      }
    }
  }

  // Cache the result
  evictIfNeeded(_modelPermissionCache);
  _modelPermissionCache.set(cacheKey, { allowed, timestamp: now });

  return allowed;
}

/**
 * Clear prepared statements cache (called on database reset/restore)
 * Prepared statements are bound to a specific database connection,
 * so they must be cleared when the connection is reset.
 */
function clearPreparedStatementCache() {
  _stmtGetAllKeys = null;
  _stmtGetKeyById = null;
  _stmtValidateKey = null;
  _stmtGetKeyMetadata = null;
  _stmtInsertKey = null;
  _stmtDeleteKey = null;
  _schemaChecked = false; // Also reset schema check for new connection
}

/**
 * Clear all caches (exported for testing/debugging)
 */
export function clearApiKeyCaches() {
  invalidateCaches();
  _lastUsedUpdateCache.clear();
  _modelPermissionCache.clear();
  _regexCache.clear();
}

/**
 * Reset all cached state for database connection reset/restore.
 * Called by backup.ts when the database is restored.
 */
export function resetApiKeyState() {
  clearPreparedStatementCache();
  clearApiKeyCaches();
}

registerDbStateResetter(resetApiKeyState);
