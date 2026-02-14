/**
 * LRU Cache Layer — FASE-08 LLM Proxy Advanced
 *
 * In-memory LRU cache for LLM prompt/response pairs.
 * Uses content hashing for cache keys to handle semantic deduplication.
 *
 * @module lib/cacheLayer
 */

import crypto from "node:crypto";

/**
 * @typedef {Object} CacheEntry
 * @property {string} key - Cache key (hash)
 * @property {*} value - Cached value
 * @property {number} createdAt - Timestamp
 * @property {number} ttl - TTL in ms
 * @property {number} size - Approximate size in bytes
 * @property {number} hits - Number of times this entry was accessed
 */

export class LRUCache {
  /** @type {Map<string, CacheEntry>} */
  #cache = new Map();
  #maxSize;
  #defaultTTL;
  #currentSize = 0;
  #stats = { hits: 0, misses: 0, evictions: 0 };

  /**
   * @param {Object} options
   * @param {number} [options.maxSize=100] - Max number of entries
   * @param {number} [options.defaultTTL=300000] - Default TTL in ms (5 min)
   */
  constructor(options = {}) {
    this.#maxSize = options.maxSize ?? 100;
    this.#defaultTTL = options.defaultTTL ?? 300000;
  }

  /**
   * Generate a cache key from input.
   * @param {Object} params - Parameters to hash
   * @returns {string} Cache key
   */
  static generateKey(params) {
    const normalized = JSON.stringify(params, Object.keys(params).sort());
    return crypto.createHash("sha256").update(normalized).digest("hex").slice(0, 16);
  }

  /**
   * Get a value from the cache.
   * @param {string} key
   * @returns {*|undefined}
   */
  get(key) {
    const entry = this.#cache.get(key);

    if (!entry) {
      this.#stats.misses++;
      return undefined;
    }

    // Check TTL
    if (Date.now() - entry.createdAt > entry.ttl) {
      this.#cache.delete(key);
      this.#currentSize--;
      this.#stats.misses++;
      return undefined;
    }

    // Move to end (most recently used)
    this.#cache.delete(key);
    entry.hits++;
    this.#cache.set(key, entry);

    this.#stats.hits++;
    return entry.value;
  }

  /**
   * Set a value in the cache.
   * @param {string} key
   * @param {*} value
   * @param {number} [ttl] - Override default TTL
   */
  set(key, value, ttl) {
    // If key exists, delete it first (will be re-added at end)
    if (this.#cache.has(key)) {
      this.#cache.delete(key);
      this.#currentSize--;
    }

    // Evict oldest entries if at capacity
    while (this.#currentSize >= this.#maxSize) {
      const oldestKey = this.#cache.keys().next().value;
      this.#cache.delete(oldestKey);
      this.#currentSize--;
      this.#stats.evictions++;
    }

    const entry = {
      key,
      value,
      createdAt: Date.now(),
      ttl: ttl ?? this.#defaultTTL,
      size: JSON.stringify(value).length,
      hits: 0,
    };

    this.#cache.set(key, entry);
    this.#currentSize++;
  }

  /**
   * Check if a key exists (without promoting it).
   * @param {string} key
   * @returns {boolean}
   */
  has(key) {
    const entry = this.#cache.get(key);
    if (!entry) return false;
    if (Date.now() - entry.createdAt > entry.ttl) {
      this.#cache.delete(key);
      this.#currentSize--;
      return false;
    }
    return true;
  }

  /**
   * Delete a specific key.
   * @param {string} key
   * @returns {boolean}
   */
  delete(key) {
    if (this.#cache.has(key)) {
      this.#cache.delete(key);
      this.#currentSize--;
      return true;
    }
    return false;
  }

  /** Clear the entire cache. */
  clear() {
    this.#cache.clear();
    this.#currentSize = 0;
  }

  /** @returns {{ size: number, maxSize: number, hits: number, misses: number, evictions: number, hitRate: number }} */
  getStats() {
    const total = this.#stats.hits + this.#stats.misses;
    return {
      size: this.#currentSize,
      maxSize: this.#maxSize,
      ...this.#stats,
      hitRate: total > 0 ? (this.#stats.hits / total) * 100 : 0,
    };
  }
}

// ─── Prompt Cache Singleton ─────────────────

let promptCache;

/**
 * Get the global prompt cache instance.
 * @param {Object} [options]
 * @returns {LRUCache}
 */
export function getPromptCache(options) {
  if (!promptCache) {
    promptCache = new LRUCache({
      maxSize: parseInt(process.env.PROMPT_CACHE_MAX_SIZE || "200", 10),
      defaultTTL: parseInt(process.env.PROMPT_CACHE_TTL_MS || "600000", 10),
      ...options,
    });
  }
  return promptCache;
}
