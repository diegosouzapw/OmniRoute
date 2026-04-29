/**
 * Memory store - CRUD operations with prepared statements and caching
 */

import { getDbInstance } from "../db/core";
import { Memory, MemoryType } from "./types";
import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("MEMORY_STORE");

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

interface MemoryRow {
  id: string;
  api_key_id: string;
  session_id: string | null;
  type: MemoryType;
  key: string | null;
  content: string;
  metadata: string | null;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
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

function invalidateMemoryCache(key: string) {
  _memoryCache.delete(key);
}

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

function rowToMemory(row: MemoryRow): Memory {
  return {
    id: String(row.id),
    apiKeyId: String(row.api_key_id),
    sessionId: typeof row.session_id === "string" ? row.session_id : "",
    type: row.type as MemoryType,
    key: typeof row.key === "string" ? row.key : "",
    content: String(row.content),
    metadata: parseJSON(row.metadata),
    createdAt: new Date(String(row.created_at)),
    updatedAt: new Date(String(row.updated_at)),
    expiresAt: row.expires_at ? new Date(String(row.expires_at)) : null,
  };
}

/**
 * Find existing memory by apiKeyId and key (for UPSERT logic)
 */
function findExistingMemory(
  db: ReturnType<typeof getDbInstance>,
  apiKeyId: string,
  key: string
): MemoryRow | undefined {
  if (!key) return undefined;
  const stmt = db.prepare(
    "SELECT * FROM memories WHERE api_key_id = ? AND key = ? ORDER BY created_at DESC LIMIT 1"
  );
  return stmt.get(apiKeyId, key) as MemoryRow | undefined;
}

/**
 * Create a new memory entry (UPSERT: updates existing if same apiKeyId + key)
 */
export async function createMemory(
  memory: Omit<Memory, "id" | "createdAt" | "updatedAt">
): Promise<Memory> {
  const db = getDbInstance();
  const now = new Date().toISOString();

  // Check for existing memory with same apiKeyId + key (UPSERT logic)
  const existing = memory.key ? findExistingMemory(db, memory.apiKeyId, memory.key) : undefined;

  if (existing) {
    // UPDATE existing record
    const updatedMetadata = { ...parseJSON(existing.metadata), ...memory.metadata };
    const stmt = db.prepare(
      "UPDATE memories SET content = ?, metadata = ?, updated_at = ?, session_id = ?, type = ?, expires_at = ? WHERE id = ?"
    );
    stmt.run(
      memory.content,
      JSON.stringify(updatedMetadata),
      now,
      memory.sessionId,
      memory.type,
      memory.expiresAt ?? null,
      existing.id
    );

    const updatedMemory: Memory = {
      id: String(existing.id),
      apiKeyId: memory.apiKeyId,
      sessionId: memory.sessionId,
      type: memory.type,
      key: memory.key,
      content: memory.content,
      metadata: updatedMetadata,
      createdAt: new Date(String(existing.created_at)),
      updatedAt: new Date(now),
      expiresAt: memory.expiresAt ?? null,
    };

    // Invalidate and update cache
    invalidateMemoryCache(existing.id);
    evictIfNeeded(_memoryCache);
    _memoryCache.set(existing.id, { value: updatedMemory, timestamp: Date.now() });

    log.info("memory.updated", {
      apiKeyId: memory.apiKeyId,
      type: memory.type,
      id: existing.id,
      key: memory.key,
    });

    return updatedMemory;
  }

  // INSERT new record if not exists
  const id = crypto.randomUUID();
  const stmt = db.prepare(
    "INSERT INTO memories (id, api_key_id, session_id, type, key, content, metadata, created_at, updated_at, expires_at) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );

  stmt.run(
    id,
    memory.apiKeyId,
    memory.sessionId,
    memory.type,
    memory.key,
    memory.content,
    JSON.stringify(memory.metadata ?? {}),
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

  log.info("memory.stored", { apiKeyId: memory.apiKeyId, type: memory.type, id });

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
  const stmt = db.prepare("SELECT * FROM memories WHERE id = ?");
  const row = stmt.get(id) as MemoryRow | undefined;

  if (!row) {
    // Cache negative result briefly to prevent repeated DB hits
    evictIfNeeded(_memoryCache);
    _memoryCache.set(id, { value: null, timestamp: Date.now() });
    return null;
  }

  const memory = rowToMemory(row);

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
  const values: unknown[] = [];

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
    fields.push("expires_at = ?");
    values.push(updates.expiresAt?.toISOString() ?? null);
  }

  // Always update the updatedAt timestamp
  fields.push("updated_at = ?");
  values.push(now);

  values.push(id); // For WHERE clause

  const stmt = db.prepare(`UPDATE memories SET ${fields.join(", ")} WHERE id = ?`);

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
  const stmt = db.prepare("DELETE FROM memories WHERE id = ?");
  const result = stmt.run(id);

  if (result.changes === 0) {
    return false;
  }

  // Invalidate cache for this memory
  invalidateMemoryCache(id);

  log.info("memory.deleted", { id });

  return true;
}

/**
 * List memories with optional filtering and pagination
 */
export async function listMemories(filters: {
  apiKeyId?: string;
  type?: MemoryType;
  sessionId?: string;
  query?: string;
  limit?: number;
  offset?: number;
  page?: number;
}): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }> {
  const db = getDbInstance();

  // Build dynamic query conditions
  const whereClauses: string[] = [];
  const whereParams: unknown[] = [];

  if (filters.apiKeyId) {
    whereClauses.push("api_key_id = ?");
    whereParams.push(filters.apiKeyId);
  }

  if (filters.type) {
    whereClauses.push("type = ?");
    whereParams.push(filters.type);
  }

  if (filters.sessionId) {
    whereClauses.push("session_id = ?");
    whereParams.push(filters.sessionId);
  }

  if (typeof filters.query === "string" && filters.query.trim().length > 0) {
    const likeQuery = `%${filters.query.trim().toLowerCase()}%`;
    whereClauses.push("(LOWER(content) LIKE ? OR LOWER(key) LIKE ?)");
    whereParams.push(likeQuery, likeQuery);
  }

  // Run COUNT query + byType aggregation in a single query
  let countQuery = "SELECT COUNT(*) as total FROM memories";
  if (whereClauses.length > 0) {
    countQuery += " WHERE " + whereClauses.join(" AND ");
  }
  const countStmt = db.prepare(countQuery);
  const countRow = countStmt.get(...whereParams) as { total: number };
  const total = countRow.total;

  // Build byType aggregation (counts ALL matching rows, not just the page)
  let byTypeQuery = "SELECT type, COUNT(*) as count FROM memories";
  const byTypeParams: unknown[] = [...whereParams];
  if (whereClauses.length > 0) {
    byTypeQuery += " WHERE " + whereClauses.join(" AND ");
  }
  byTypeQuery += " GROUP BY type";
  const byTypeStmt = db.prepare(byTypeQuery);
  const byTypeRows = byTypeStmt.all(...byTypeParams) as { type: string; count: number }[];
  const byType = Object.fromEntries(byTypeRows.map((r) => [r.type, r.count])) as Record<
    string,
    number
  >;

  // Calculate effective limit and offset
  const effectiveLimit = filters.limit ?? 50;
  const effectivePage = filters.page ?? 1;
  const effectiveOffset = filters.offset ?? (effectivePage - 1) * effectiveLimit;

  // Build SELECT query with pagination
  let query = "SELECT * FROM memories";
  if (whereClauses.length > 0) {
    query += " WHERE " + whereClauses.join(" AND ");
  }

  // Add ordering and pagination
  query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";

  // Build params for SELECT query (WHERE params + pagination params)
  const params = [...whereParams, effectiveLimit, effectiveOffset];

  const stmt = db.prepare(query);
  const rows = stmt.all(...params);

  return {
    data: (rows as MemoryRow[]).map(rowToMemory),
    total,
    byType,
  };
}
