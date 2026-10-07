/**
 * Idempotency Layer — Phase 9.2
 *
 * In-memory deduplication of requests with the same idempotency key.
 * If a request with the same key arrives within 5 seconds, returns
 * the cached response instead of making a new API call.
 *
 * Headers: X-Request-Id or Idempotency-Key
 *
 * @module lib/idempotencyLayer
 */

import { getCachedSettings } from "@/lib/db/readCache";

const DEFAULT_WINDOW_MS = 5000;

/** @type {Map<string, { response: object, status: number, expiresAt: number }>} */
const idempotencyStore = new Map();

// Periodic cleanup every 30s
let cleanupInterval;

function ensureCleanup() {
  if (cleanupInterval) return;
  cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of idempotencyStore) {
      if (now >= entry.expiresAt) {
        idempotencyStore.delete(key);
      }
    }
  }, 30000);
  // Don't prevent process exit
  if (cleanupInterval.unref) cleanupInterval.unref();
}

/**
 * Extract idempotency key from request headers.
 * @param {Headers|object} headers
 * @returns {string|null}
 */
export function getIdempotencyKey(headers) {
  if (!headers) return null;
  const get = typeof headers.get === "function" ? (k) => headers.get(k) : (k) => headers[k];
  return get("idempotency-key") || get("x-request-id") || null;
}

/**
 * Check if a response exists for the given idempotency key.
 * @param {string} key
 * @returns {{ response: object, status: number }|null}
 */
export function checkIdempotency(key) {
  if (!key) return null;
  const entry = idempotencyStore.get(key);
  if (!entry) return null;
  if (Date.now() >= entry.expiresAt) {
    idempotencyStore.delete(key);
    return null;
  }
  return { response: entry.response, status: entry.status };
}

/**
 * Save a response for idempotency dedup.
 * @param {string} key
 * @param {object} response - Response body to cache
 * @param {number} status - HTTP status code
 * @param {number} [windowMs=5000] - Dedup window in ms
 */
export function saveIdempotency(key, response, status, windowMs = DEFAULT_WINDOW_MS) {
  if (!key) return;
  ensureCleanup();
  idempotencyStore.set(key, {
    response,
    status,
    expiresAt: Date.now() + windowMs,
  });
}

/**
 * Resolve the dedup window from the `idempotencyWindowMs` setting (Settings → Cache),
 * falling back to the 5s default when it is unset, invalid, or settings are unavailable.
 * The read is cached, so it is cheap enough to call on every save.
 */
export async function getIdempotencyWindowMs() {
  try {
    const settings = await getCachedSettings();
    const configured = settings.idempotencyWindowMs;
    if (typeof configured === "number" && Number.isFinite(configured) && configured > 0) {
      return configured;
    }
  } catch {
    // Fallback to default if settings unavailable
  }
  return DEFAULT_WINDOW_MS;
}

/**
 * Save a response for idempotency dedup using the configured window
 * (Settings → Cache → idempotencyWindowMs). The settings read only happens when there is a key.
 */
export async function saveIdempotencyWithConfiguredWindow(key, response, status) {
  if (!key) return;
  saveIdempotency(key, response, status, await getIdempotencyWindowMs());
}

/**
 * Get current idempotency store stats.
 */
export async function getIdempotencyStats() {
  return {
    activeKeys: idempotencyStore.size,
    windowMs: await getIdempotencyWindowMs(),
  };
}

/**
 * Clear all idempotency entries (for testing).
 */
export function clearIdempotency() {
  idempotencyStore.clear();
}
