/**
 * Semantic Cache — Phase 9.1
 *
 * Caches non-streaming LLM responses (temperature=0) to reduce cost and latency.
 * Two-tier: in-memory LRU (fast) + SQLite (persistent across restarts).
 *
 * Cache key = SHA-256(model + normalized messages + temperature + top_p)
 * Bypass: X-OmniRoute-No-Cache: true
 *
 * @module lib/semanticCache
 */

import crypto from "node:crypto";
import { LRUCache } from "./cacheLayer";
import { getDbInstance } from "./db/core";

// ─── Singleton ─────────────────

let memoryCache;
let stats = { hits: 0, misses: 0, tokensSaved: 0 };

function getMemoryCache() {
  if (!memoryCache) {
    memoryCache = new LRUCache({
      maxSize: parseInt(process.env.SEMANTIC_CACHE_MAX_SIZE || "500", 10),
      defaultTTL: parseInt(process.env.SEMANTIC_CACHE_TTL_MS || "3600000", 10), // 1h
    });
  }
  return memoryCache;
}

// ─── Signature Generation ─────────────────

/**
 * Generate deterministic cache signature from request params.
 * @param {string} model
 * @param {Array} messages - Normalized messages array
 * @param {number} temperature
 * @param {number} topP
 * @returns {string} hex signature
 */
export function generateSignature(model, messages, temperature = 0, topP = 1) {
  const payload = JSON.stringify({
    model,
    messages: normalizeMessages(messages),
    temperature,
    top_p: topP,
  });
  return crypto.createHash("sha256").update(payload).digest("hex");
}

/**
 * Normalize messages for consistent hashing.
 * Strips metadata, keeps only role + content.
 */
function normalizeMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages.map((m) => ({
    role: m.role || "user",
    content: typeof m.content === "string" ? m.content : JSON.stringify(m.content),
  }));
}

// ─── Cache Operations ─────────────────

/**
 * Check if a cached response exists for the given signature.
 * Checks memory first, then SQLite.
 * @param {string} signature
 * @returns {object|null} Cached response or null
 */
export function getCachedResponse(signature) {
  // 1. Check memory cache
  const memResult = getMemoryCache().get(signature);
  if (memResult) {
    stats.hits++;
    stats.tokensSaved += memResult.tokensSaved || 0;
    return memResult.response;
  }

  // 2. Check SQLite
  try {
    const db = getDbInstance();
    const row = db
      .prepare(
        "SELECT response, tokens_saved FROM semantic_cache WHERE signature = ? AND expires_at > datetime('now')"
      )
      .get(signature);

    if (row) {
      const parsed = JSON.parse(row.response);
      // Promote to memory cache
      getMemoryCache().set(signature, {
        response: parsed,
        tokensSaved: row.tokens_saved,
      });
      // Update hit count in DB
      db.prepare("UPDATE semantic_cache SET hit_count = hit_count + 1 WHERE signature = ?").run(
        signature
      );

      stats.hits++;
      stats.tokensSaved += row.tokens_saved || 0;
      return parsed;
    }
  } catch {
    // DB not available — fail open
  }

  stats.misses++;
  return null;
}

/**
 * Store a response in cache.
 * @param {string} signature
 * @param {string} model
 * @param {object} response - The API response to cache
 * @param {number} tokensSaved - Estimated tokens saved
 * @param {number} [ttlMs] - TTL in ms (default: 1 hour)
 */
export function setCachedResponse(signature, model, response, tokensSaved = 0, ttlMs = 3600000) {
  const ttl = parseInt(process.env.SEMANTIC_CACHE_TTL_MS || String(ttlMs), 10);

  // 1. Memory cache
  getMemoryCache().set(signature, { response, tokensSaved }, ttl);

  // 2. SQLite
  try {
    const db = getDbInstance();
    const id = crypto.randomUUID();
    const promptHash = signature.slice(0, 16);
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + ttl).toISOString();

    db.prepare(
      `INSERT OR REPLACE INTO semantic_cache (id, signature, model, prompt_hash, response, tokens_saved, hit_count, created_at, expires_at)
       VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)`
    ).run(id, signature, model, promptHash, JSON.stringify(response), tokensSaved, now, expiresAt);
  } catch {
    // DB write failed — cache still in memory
  }
}

// ─── Maintenance ─────────────────

/**
 * Remove expired entries from SQLite.
 * @returns {number} Number of entries removed
 */
export function cleanExpiredEntries() {
  try {
    const db = getDbInstance();
    const result = db
      .prepare("DELETE FROM semantic_cache WHERE expires_at <= datetime('now')")
      .run();
    return result.changes;
  } catch {
    return 0;
  }
}

/**
 * Clear all cache entries.
 */
export function clearCache() {
  getMemoryCache().clear();
  try {
    const db = getDbInstance();
    db.prepare("DELETE FROM semantic_cache").run();
  } catch {
    // DB not available
  }
  stats = { hits: 0, misses: 0, tokensSaved: 0 };
}

// ─── Stats ─────────────────

/**
 * Get cache statistics.
 */
export function getCacheStats() {
  const memStats = getMemoryCache().getStats();
  let dbSize = 0;
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT COUNT(*) as count FROM semantic_cache WHERE expires_at > datetime('now')")
      .get();
    dbSize = row?.count || 0;
  } catch {
    // DB not available
  }

  const total = stats.hits + stats.misses;
  return {
    memoryEntries: memStats.size,
    dbEntries: dbSize,
    hits: stats.hits,
    misses: stats.misses,
    hitRate: total > 0 ? ((stats.hits / total) * 100).toFixed(1) : "0.0",
    tokensSaved: stats.tokensSaved,
  };
}

/**
 * Check if a request is cacheable.
 * Only non-streaming, deterministic (temperature=0) requests.
 */
export function isCacheable(body, headers) {
  if (headers?.get?.("x-omniroute-no-cache") === "true") return false;
  if (body.stream !== false) return false;
  if ((body.temperature ?? 0) !== 0) return false;
  return true;
}
