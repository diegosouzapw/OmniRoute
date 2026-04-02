/**
 * Memory store - CRUD operations with prepared statements and caching
 */

import { getDbInstance, rowToCamel } from "../db/core";
import { Memory, MemoryType } from "./types";
interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

// Memory cache configuration
const MEMORY_CACHE_TTL = 300_000; // 5 minutes
const MEMORY_MAX_CACHE_SIZE = 10_000;

// Cache for recently accessed memories
const _memoryCache = new Map<string, CacheEntry<Memory | null>>();

// Helper function to safely parse JSON strings
function parseJSON(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "string" || value.trim() === "") {
    return {};
  }
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

// Cache invalidation strategy
function invalidateMemoryCache(key: string) {
  _memoryCache.delete(key);
}

/**
 * Memory cache management with size control
 */
function evictIfNeeded<TKey, TValue>(cache: Map<TKey, TValue>) {
  if (cache.size > MEMORY_MAX_CACHE_SIZE) {
    // Remove oldest entries first
    const keysArray = Array.from(cache.keys());
    const entriesToRemove = Math.floor(cache.size * 0.2);
    for (let i = 0; i < entriesToRemove; i++) {
      cache.delete(keysArray[i]);
    }
  }
}

/**
 * Get or compile regex for wildcard pattern
 */
function getWildcardRegex(pattern: string): RegExp {
  // This function is copied from apiKeys.ts pattern
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

// Compiled regex cache for wildcard patterns
const _regexCache = new Map<string, RegExp>();

// Cache for memory validation (similar to apiKeys)
const _memoryValidationCache = new Map<string, { exists: boolean; timestamp: number }>();
const MEMORY_VALIDATION_CACHE_TTL = 60 * 1000; // 1 minute TTL

/**
 * Check if memory exists with caching
 */
async function memoryExists(id: string): Promise<boolean> {
  if (!id || typeof id !== "string") return false;

  const now = Date.now();

  // Check cache first
  const cached = _memoryValidationCache.get(id);
  if (cached && now - cached.timestamp < MEMORY_VALIDATION_CACHE_TTL) {
    return cached.exists;
  }

  const db = getDbInstance();
  const stmt = db.prepare("SELECT 1 FROM memory WHERE id = ?");
  const row = stmt.get(id);
  const exists = !!row;

  // Cache the result to prevent cache pollution
  if (exists) {
    _memoryValidationCache.set(id, { exists: true, timestamp: now });
  }

  return exists;
}

/**
 * Create a new memory entry
 */
export async function createMemory(
  memory: Omit<Memory, "id" | "createdAt" | "updatedAt">
): Promise<Memory> {
  const db = getDbInstance();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const stmt = db.prepare(
    "INSERT INTO memory (id, apiKeyId, sessionId, type, key, content, metadata, createdAt, updatedAt, expiresAt) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );

  stmt.run(
    id,
    memory.apiKeyId,
    memory.sessionId,
    memory.type,
    memory.key,
    memory.content,
    JSON.stringify(memory.metadata),
    now,
    now,
    memory.expiresAt?.toISOString() ?? null
  );

  const createdMemory: Memory = {
    id,
    apiKeyId: memory.apiKeyId,
    sessionId: memory.sessionId,
    type: memory.type,
    key: memory.key,
    content: memory.content,
    metadata: memory.metadata,
    createdAt: new Date(now),
    updatedAt: new Date(now),
    expiresAt: memory.expiresAt ?? null,
  };

  // Cache the newly created memory
  invalidateMemoryCache(id);
  evictIfNeeded(_memoryCache);
  _memoryCache.set(id, { value: createdMemory, timestamp: Date.now() });

  return createdMemory;
}

/**
 * Get a memory by ID
 */
export async function getMemory(id: string): Promise<Memory | null> {
  if (!id || typeof id !== "string") return null;

  // Check cache first
  const cached = _memoryCache.get(id);
  if (cached && Date.now() - cached.timestamp < MEMORY_CACHE_TTL) {
    return cached.value;
  }

  const db = getDbInstance();
  const stmt = db.prepare("SELECT * FROM memory WHERE id = ?");
  const row = stmt.get(id) as any;

  if (!row) {
    // Cache negative result briefly to prevent repeated DB hits
    evictIfNeeded(_memoryCache);
    _memoryCache.set(id, { value: null, timestamp: Date.now() });
    return null;
  }

  const memory: Memory = {
    id: String(row.id),
    apiKeyId: String(row.apiKeyId),
    sessionId: String(row.sessionId),
    type: row.type as MemoryType,
    key: String(row.key),
    content: String(row.content),
    metadata: parseJSON(row.metadata),
    createdAt: new Date(String(row.createdAt)),
    updatedAt: new Date(String(row.updatedAt)),
    expiresAt: row.expiresAt ? new Date(String(row.expiresAt)) : null,
  };

  // Cache the result
  evictIfNeeded(_memoryCache);
  _memoryCache.set(id, { value: memory, timestamp: Date.now() });

  return memory;
}

/**
 * Update a memory entry
 */
export async function updateMemory(
  id: string,
  updates: Partial<Omit<Memory, "id" | "createdAt">>
): Promise<boolean> {
  if (!id || typeof id !== "string") return false;

  const db = getDbInstance();
  const now = new Date().toISOString();

  // Build dynamic update query
  const fields: string[] = [];
  const values: any[] = [];

  if (updates.type !== undefined) {
    fields.push("type = ?");
    values.push(updates.type);
  }
  if (updates.key !== undefined) {
    fields.push("key = ?");
    values.push(updates.key);
  }
  if (updates.content !== undefined) {
    fields.push("content = ?");
    values.push(updates.content);
  }
  if (updates.metadata !== undefined) {
    fields.push("metadata = ?");
    values.push(JSON.stringify(updates.metadata));
  }
  if (updates.expiresAt !== undefined) {
    fields.push("expiresAt = ?");
    values.push(updates.expiresAt?.toISOString() ?? null);
  }

  // Always update the updatedAt timestamp
  fields.push("updatedAt = ?");
  values.push(now);

  if (fields.length === 0) {
    return false; // No updates to apply
  }

  values.push(id); // For WHERE clause

  const stmt = db.prepare(`UPDATE memory SET ${fields.join(", ")} WHERE id = ?`);

  const result = stmt.run(...values);

  if (result.changes === 0) {
    return false;
  }

  // Invalidate cache for this memory
  invalidateMemoryCache(id);

  return true;
}

/**
 * Delete a memory by ID
 */
export async function deleteMemory(id: string): Promise<boolean> {
  if (!id || typeof id !== "string") return false;

  const db = getDbInstance();
  const stmt = db.prepare("DELETE FROM memory WHERE id = ?");
  const result = stmt.run(id);

  if (result.changes === 0) {
    return false;
  }

  // Invalidate cache for this memory
  invalidateMemoryCache(id);

  return true;
}

/**
 * List memories with optional filtering
 */
export async function listMemories(filters: {
  apiKeyId?: string;
  type?: MemoryType;
  sessionId?: string;
  limit?: number;
  offset?: number;
}): Promise<Memory[]> {
  const db = getDbInstance();

  // Build dynamic query
  let query = "SELECT * FROM memory";
  const params: any[] = [];
  const whereClauses: string[] = [];

  if (filters.apiKeyId) {
    whereClauses.push("apiKeyId = ?");
    params.push(filters.apiKeyId);
  }

  if (filters.type) {
    whereClauses.push("type = ?");
    params.push(filters.type);
  }

  if (filters.sessionId) {
    whereClauses.push("sessionId = ?");
    params.push(filters.sessionId);
  }

  if (whereClauses.length > 0) {
    query += " WHERE " + whereClauses.join(" AND ");
  }

  // Add ordering and pagination
  query += " ORDER BY createdAt DESC";

  if (filters.limit !== undefined) {
    query += " LIMIT ?";
    params.push(filters.limit);
  }

  if (filters.offset !== undefined) {
    query += " OFFSET ?";
    params.push(filters.offset);
  }

  const stmt = db.prepare(query);
  const rows = stmt.all(...params);

  return (rows as any[]).map((row: any) => ({
    id: String(row.id),
    apiKeyId: String(row.apiKeyId),
    sessionId: String(row.sessionId),
    type: row.type as MemoryType,
    key: String(row.key),
    content: String(row.content),
    metadata: parseJSON(row.metadata),
    createdAt: new Date(String(row.createdAt)),
    updatedAt: new Date(String(row.updatedAt)),
    expiresAt: row.expiresAt ? new Date(String(row.expiresAt)) : null,
  }));
}
