/**
 * db/apiKeys.js — API key management.
 */

import { v4 as uuidv4 } from "uuid";
import { getDbInstance, rowToCamel } from "./core";
import { backupDbFile } from "./backup";

// ──────────────── Performance Optimizations ────────────────

// Schema check memoization - only run once
let _schemaChecked = false;

// LRU cache for API key validation (valid keys only)
const _keyValidationCache = new Map<string, { valid: boolean; timestamp: number }>();
const _keyMetadataCache = new Map<string, { metadata: any; timestamp: number }>();
const CACHE_TTL = 60 * 1000; // 1 minute TTL
const MAX_CACHE_SIZE = 1000;

// Compiled regex cache for wildcard patterns
const _regexCache = new Map<string, RegExp>();

// Cache for model permission checks
const _modelPermissionCache = new Map<string, { allowed: boolean; timestamp: number }>();

// Prepared statements cache
let _stmtGetAllKeys: any = null;
let _stmtGetKeyById: any = null;
let _stmtValidateKey: any = null;
let _stmtGetKeyMetadata: any = null;
let _stmtInsertKey: any = null;
let _stmtUpdatePermissions: any = null;
let _stmtDeleteKey: any = null;

/**
 * Clear all caches (called on key create/update/delete)
 */
function invalidateCaches() {
  _keyValidationCache.clear();
  _keyMetadataCache.clear();
  _modelPermissionCache.clear();
}

/**
 * LRU eviction for cache
 */
function evictIfNeeded(cache: Map<any, any>) {
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

// Ensure the allowed_models column exists (memoized)
function ensureAllowedModelsColumn(db) {
  if (_schemaChecked) return;

  try {
    const columns = db.prepare("PRAGMA table_info(api_keys)").all();
    const columnNames = new Set(columns.map((column) => column.name));
    if (!columnNames.has("allowed_models")) {
      db.exec("ALTER TABLE api_keys ADD COLUMN allowed_models TEXT");
      console.log("[DB] Added api_keys.allowed_models column");
    }
    _schemaChecked = true;
  } catch (error) {
    console.warn("[DB] Failed to verify api_keys schema:", error.message);
  }
}

/**
 * Initialize prepared statements (lazy initialization)
 */
function getPreparedStatements(db: any) {
  if (!_stmtGetAllKeys) {
    _stmtGetAllKeys = db.prepare("SELECT * FROM api_keys ORDER BY created_at");
    _stmtGetKeyById = db.prepare("SELECT * FROM api_keys WHERE id = ?");
    _stmtValidateKey = db.prepare("SELECT 1 FROM api_keys WHERE key = ?");
    _stmtGetKeyMetadata = db.prepare(
      "SELECT id, name, machine_id, allowed_models FROM api_keys WHERE key = ?"
    );
    _stmtInsertKey = db.prepare(
      "INSERT INTO api_keys (id, name, key, machine_id, allowed_models, created_at) VALUES (?, ?, ?, ?, ?, ?)"
    );
    _stmtUpdatePermissions = db.prepare("UPDATE api_keys SET allowed_models = ? WHERE id = ?");
    _stmtDeleteKey = db.prepare("DELETE FROM api_keys WHERE id = ?");
  }
  return {
    getAllKeys: _stmtGetAllKeys,
    getKeyById: _stmtGetKeyById,
    validateKey: _stmtValidateKey,
    getKeyMetadata: _stmtGetKeyMetadata,
    insertKey: _stmtInsertKey,
    updatePermissions: _stmtUpdatePermissions,
    deleteKey: _stmtDeleteKey,
  };
}

export async function getApiKeys() {
  const db = getDbInstance();
  ensureAllowedModelsColumn(db);
  const stmt = getPreparedStatements(db);
  const rows = stmt.getAllKeys.all() as Record<string, any>[];
  return rows.map((row) => {
    const camelRow = rowToCamel(row) as Record<string, any>;
    // Parse allowed_models from JSON string to array
    camelRow.allowedModels = parseAllowedModels(camelRow.allowedModels);
    return camelRow;
  });
}

export async function getApiKeyById(id: string) {
  const db = getDbInstance();
  ensureAllowedModelsColumn(db);
  const stmt = getPreparedStatements(db);
  const row = stmt.getKeyById.get(id) as Record<string, any> | undefined;
  if (!row) return null;
  const camelRow = rowToCamel(row) as Record<string, any>;
  camelRow.allowedModels = parseAllowedModels(camelRow.allowedModels);
  return camelRow;
}

/**
 * Helper function to safely parse allowed_models JSON
 */
function parseAllowedModels(value: any): string[] {
  if (!value || typeof value !== "string" || value.trim() === "") {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function createApiKey(name, machineId) {
  if (!machineId) {
    throw new Error("machineId is required");
  }

  const db = getDbInstance();
  ensureAllowedModelsColumn(db);
  const now = new Date().toISOString();

  const { generateApiKeyWithMachine } = await import("@/shared/utils/apiKey");
  const result = generateApiKeyWithMachine(machineId);

  const apiKey = {
    id: uuidv4(),
    name: name,
    key: result.key,
    machineId: machineId,
    allowedModels: [], // Empty array means all models allowed
    createdAt: now,
  };

  const stmt = getPreparedStatements(db);
  stmt.insertKey.run(apiKey.id, apiKey.name, apiKey.key, apiKey.machineId, "[]", apiKey.createdAt);

  backupDbFile("pre-write");
  return apiKey;
}

export async function updateApiKeyPermissions(id, allowedModels) {
  const db = getDbInstance();
  ensureAllowedModelsColumn(db);

  // allowedModels should be an array of model IDs (strings)
  // Empty array means all models are allowed
  const modelsJson = JSON.stringify(allowedModels || []);

  const stmt = getPreparedStatements(db);
  const result = stmt.updatePermissions.run(modelsJson, id);

  if (result.changes === 0) return false;

  // Invalidate caches since permissions changed
  invalidateCaches();

  backupDbFile("pre-write");
  return true;
}

export async function deleteApiKey(id) {
  const db = getDbInstance();
  const stmt = getPreparedStatements(db);
  const result = stmt.deleteKey.run(id);

  if (result.changes === 0) return false;

  // Invalidate caches since a key was removed
  invalidateCaches();

  backupDbFile("pre-write");
  return true;
}

/**
 * Validate API key with caching for performance
 * Cached valid keys reduce DB hits on every request
 */
export async function validateApiKey(key) {
  if (!key || typeof key !== "string") return false;

  const now = Date.now();

  // Check cache first
  const cached = _keyValidationCache.get(key);
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.valid;
  }

  const db = getDbInstance();
  const stmt = getPreparedStatements(db);
  const row = stmt.validateKey.get(key);
  const valid = !!row;

  // Only cache valid keys to prevent cache pollution
  if (valid) {
    evictIfNeeded(_keyValidationCache);
    _keyValidationCache.set(key, { valid: true, timestamp: now });
  }

  return valid;
}

/**
 * Get API key metadata with caching for performance
 */
export async function getApiKeyMetadata(key) {
  if (!key || typeof key !== "string") return null;

  const now = Date.now();

  // Check cache first
  const cached = _keyMetadataCache.get(key);
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.metadata;
  }

  const db = getDbInstance();
  ensureAllowedModelsColumn(db);
  const stmt = getPreparedStatements(db);
  const row = stmt.getKeyMetadata.get(key) as Record<string, any> | undefined;

  if (!row) return null;

  const metadata = {
    id: row.id,
    name: row.name,
    machineId: row.machine_id,
    allowedModels: parseAllowedModels(row.allowed_models),
  };

  // Cache the result
  evictIfNeeded(_keyMetadataCache);
  _keyMetadataCache.set(key, { metadata, timestamp: now });

  return metadata;
}

/**
 * Check if a model is allowed for a given API key
 * @param {string} key - The API key
 * @param {string} modelId - The model ID to check
 * @returns {boolean} - true if allowed, false if not
 */
export async function isModelAllowedForKey(key, modelId) {
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

  // Check if model matches any allowed pattern
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
  _stmtUpdatePermissions = null;
  _stmtDeleteKey = null;
  _schemaChecked = false; // Also reset schema check for new connection
}

/**
 * Clear all caches (exported for testing/debugging)
 */
export function clearApiKeyCaches() {
  invalidateCaches();
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
