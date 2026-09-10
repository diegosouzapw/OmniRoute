/**
 * Semantic Cache — Phase 9.1
 *
 * Caches LLM responses (temperature=0) to reduce cost and latency.
 * Supports both streaming and non-streaming requests: streaming responses
 * are cached after assembly; cache hits always return JSON.
 * Two-tier: in-memory LRU (fast) + SQLite (persistent across restarts).
 *
 * Cache key = SHA-256(model + normalized messages + temperature + top_p)
 * Bypass: X-OmniRoute-No-Cache: true
 *
 * @module lib/semanticCache
 */

import crypto from "crypto";
import { LRUCache } from "./cacheLayer";
import { getDbInstance } from "./db/core";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

function ensureCacheMetricsTable() {
  try {
    const db = getDbInstance();
    db.prepare(
      `CREATE TABLE IF NOT EXISTS cache_metrics (
        key TEXT PRIMARY KEY,
        value INTEGER NOT NULL DEFAULT 0,
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`
    ).run();
    db.prepare(
      `INSERT OR IGNORE INTO cache_metrics (key, value) VALUES ('hits', 0), ('misses', 0), ('tokens_saved', 0)`
    ).run();
  } catch {
    // DB not available
  }
}

function incrementMetric(metric: "hits" | "misses" | "tokens_saved", amount = 1) {
  try {
    const db = getDbInstance();
    db.prepare(
      `UPDATE cache_metrics SET value = value + ?, updated_at = datetime('now') WHERE key = ?`
    ).run(amount, metric);
  } catch {
    // DB not available — fall back to in-memory
  }
}

function getMetricValue(metric: string): number {
  try {
    const db = getDbInstance();
    const row = db.prepare(`SELECT value FROM cache_metrics WHERE key = ?`).get(metric);
    return row ? toNumber(asRecord(row).value, 0) : 0;
  } catch {
    return 0;
  }
}

function getHeaderValue(
  headers: { get?: (name: string) => string | null } | Record<string, unknown> | null | undefined,
  name: string
): string | null {
  if (!headers) return null;

  if (typeof headers.get === "function") {
    return headers.get(name);
  }

  const needle = name.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() !== needle) continue;
    return typeof value === "string" ? value : null;
  }

  return null;
}

// ─── Singleton ─────────────────

let memoryCache: LRUCache | null = null;

function getMemoryCache() {
  if (!memoryCache) {
    memoryCache = new LRUCache({
      maxSize: parseInt(process.env.SEMANTIC_CACHE_MAX_SIZE || "50", 10),
      maxBytes: parseInt(process.env.SEMANTIC_CACHE_MAX_BYTES || String(2 * 1024 * 1024), 10),
      defaultTTL: parseInt(process.env.SEMANTIC_CACHE_TTL_MS || "1800000", 10),
    });
    ensureCacheMetricsTable();
  }
  return memoryCache;
}

/**
 * In-memory LRU stats for the semantic cache.
 *
 * Exposed for `/api/cache/stats`, which used to report `getPromptCache()` — an
 * LRU that nothing writes to, so it always answered 0 hit / 0 miss. Same shape
 * as `LRUCache.getStats()`, so callers do not have to change.
 */
export function getMemoryCacheStats(): ReturnType<LRUCache["getStats"]> {
  return getMemoryCache().getStats();
}

/** Drop the in-memory LRU without touching the `semantic_cache` table. */
export function clearMemoryCache(): void {
  getMemoryCache().clear();
}

// ─── Signature Generation ─────────────────

/**
 * Generate deterministic cache signature from request params.
 * @param {string} model
 * @param {Array} messages - Normalized messages array
 * @param {number} temperature
 * @param {number} topP
 * @param {string} [apiKeyId] - API key ID for per-key isolation (prevents cross-user cache hits)
 * @returns {string} hex signature
 */
export function generateSignature(
  model,
  conversation,
  temperature = 0,
  topP = 1,
  apiKeyId?: string
) {
  const payload = JSON.stringify({
    model,
    messages: normalizeConversation(conversation),
    temperature,
    top_p: topP,
  });
  const digest = crypto.createHash("sha256").update(payload).digest("hex");
  // Per-key cache isolation (#3740) namespaces the signature with the apiKeyId as a
  // PLAINTEXT prefix instead of folding it into the digest. The apiKeyId is an internal
  // identifier used purely to namespace a deterministic cache key — not a stored
  // credential — so it must never flow into a hash (a salted/slow password hash would
  // also break the determinism the cache relies on). Keeping it out of the digest
  // preserves isolation + determinism and avoids the false-positive
  // CodeQL js/insufficient-password-hash on a cache signature.
  return apiKeyId ? `${apiKeyId}.${digest}` : digest;
}

function stringifyForSignature(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

/**
 * Normalize conversation items for consistent hashing.
 * Supports both Chat Completions `messages[]` and Responses API `input[]`.
 */
function normalizeConversation(conversation: unknown) {
  if (typeof conversation === "string") {
    return [{ role: "user", content: conversation }];
  }
  if (!Array.isArray(conversation)) return [];

  return conversation.map((item: Record<string, unknown>) => ({
    role: typeof item?.role === "string" && item.role.trim().length > 0 ? item.role : "user",
    content: stringifyForSignature(item?.content),
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
    incrementMetric("hits");
    incrementMetric("tokens_saved", memResult.tokensSaved || 0);
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
      const record = asRecord(row);
      const responsePayload = typeof record.response === "string" ? record.response : null;
      if (!responsePayload) {
        incrementMetric("misses");
        return null;
      }
      const parsed = JSON.parse(responsePayload);
      const tokensSaved = toNumber(record.tokens_saved, 0);
      // Promote to memory cache
      getMemoryCache().set(signature, {
        response: parsed,
        tokensSaved,
      });
      // Update hit count in DB
      db.prepare("UPDATE semantic_cache SET hit_count = hit_count + 1 WHERE signature = ?").run(
        signature
      );

      incrementMetric("hits");
      incrementMetric("tokens_saved", tokensSaved);
      return parsed;
    }
  } catch {
    // DB not available — fail open
  }

  incrementMetric("misses");
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

/**
 * Invalidate cache entries by model name.
 * Useful when a model is updated/changed and cached responses are stale.
 * @param {string} model - Model name to invalidate (exact match)
 * @returns {number} Number of entries removed
 */
export function invalidateByModel(model: string): number {
  getMemoryCache().clear(); // Memory cache doesn't track model; full clear
  try {
    const db = getDbInstance();
    const result = db.prepare("DELETE FROM semantic_cache WHERE model = ?").run(model);
    return result.changes || 0;
  } catch {
    return 0;
  }
}

/**
 * Invalidate a single cache entry by its signature.
 * @param {string} signature - Cache signature to invalidate
 * @returns {boolean} Whether the entry was found and removed
 */
export function invalidateBySignature(signature: string): boolean {
  getMemoryCache().delete(signature);
  try {
    const db = getDbInstance();
    const result = db.prepare("DELETE FROM semantic_cache WHERE signature = ?").run(signature);
    return (result.changes || 0) > 0;
  } catch {
    return false;
  }
}

/**
 * Invalidate entries older than a given age.
 * @param {number} maxAgeMs - Maximum age in milliseconds
 * @returns {number} Number of entries removed
 */
export function invalidateStale(maxAgeMs: number): number {
  getMemoryCache().clear();
  try {
    const db = getDbInstance();
    const cutoff = new Date(Date.now() - maxAgeMs).toISOString();
    const result = db.prepare("DELETE FROM semantic_cache WHERE created_at < ?").run(cutoff);
    return result.changes || 0;
  } catch {
    return 0;
  }
}

/**
 * Clear all cache entries.
 */
export function clearCache(): number {
  getMemoryCache().clear();
  let removed = 0;
  try {
    const db = getDbInstance();
    const result = db.prepare("DELETE FROM semantic_cache").run();
    removed = result.changes || 0;
    db.prepare("UPDATE cache_metrics SET value = 0").run();
  } catch {
    // DB not available
  }
  return removed;
}

export function getCacheStats() {
  const memStats = getMemoryCache().getStats();
  let dbSize = 0;
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT COUNT(*) as count FROM semantic_cache WHERE expires_at > datetime('now')")
      .get();
    dbSize = toNumber(asRecord(row).count, 0);
  } catch {
    // DB not available
  }

  const hits = getMetricValue("hits");
  const misses = getMetricValue("misses");
  const tokensSaved = getMetricValue("tokens_saved");
  const total = hits + misses;

  return {
    memoryEntries: memStats.size,
    dbEntries: dbSize,
    hits,
    misses,
    hitRate: total > 0 ? ((hits / total) * 100).toFixed(1) : "0.0",
    tokensSaved,
  };
}

/**
 * Check if a cached response can be served for this request.
 * Works for both streaming and non-streaming requests (cache hit returns JSON).
 * Requires explicit numeric `temperature: 0` — omitted temperature is NOT cached
 * because the provider default may be non-deterministic (e.g. random/creative tasks).
 */
export function isCacheableForRead(body, headers) {
  if ((getHeaderValue(headers, "x-omniroute-no-cache") || "").toLowerCase() === "true") {
    return false;
  }
  if (typeof body.temperature !== "number" || body.temperature !== 0) return false;
  return true;
}

/**
 * Check if a response should be stored in cache after completion.
 * Works for both streaming and non-streaming responses.
 * Requires explicit `temperature: 0` — omitted temperature is NOT cacheable
 * because the provider default may be non-deterministic.
 */
export function isCacheableForWrite(body, headers) {
  if ((getHeaderValue(headers, "x-omniroute-no-cache") || "").toLowerCase() === "true") {
    return false;
  }
  if (body.temperature !== 0) return false;
  return true;
}

/**
 * A response cut short by the output-token ceiling is a partial answer, not a
 * reusable one. Caching it under a temperature:0 signature pins the truncation
 * for every later identical request — the caller sees a mid-sentence reply that
 * no retry clears, because each retry is served the same poisoned entry.
 *
 * Only `length` (and its Claude-side spelling `max_tokens`) is treated as
 * truncation. `stop`, `tool_calls`, and a missing/unknown reason are complete
 * responses and stay cacheable, so this never narrows the cache beyond the bug.
 */
const TRUNCATED_FINISH_REASONS = new Set(["length", "max_tokens"]);

export function isTruncatedCompletion(response: unknown): boolean {
  if (!response || typeof response !== "object") return false;
  const r = response as {
    choices?: Array<{ finish_reason?: unknown }>;
    stop_reason?: unknown;
  };
  if (Array.isArray(r.choices)) {
    for (const choice of r.choices) {
      const reason = choice?.finish_reason;
      if (typeof reason === "string" && TRUNCATED_FINISH_REASONS.has(reason)) return true;
    }
  }
  // Claude-format responses carry the reason at the top level instead.
  if (typeof r.stop_reason === "string" && TRUNCATED_FINISH_REASONS.has(r.stop_reason)) {
    return true;
  }
  return false;
}

/**
 * Streaming variant: the assembled SSE body is scanned for a truncating
 * finish_reason. Parsing is intentionally tolerant — an unparseable chunk is
 * treated as "not known to be truncated" so a malformed frame never silently
 * disables caching.
 */
export function isTruncatedStreamBody(streamBody: unknown): boolean {
  if (typeof streamBody !== "string" || streamBody.length === 0) return false;
  for (const line of streamBody.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      if (isTruncatedCompletion(JSON.parse(payload))) return true;
    } catch {
      // Non-JSON frame — ignore.
    }
  }
  return false;
}
