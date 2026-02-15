/**
 * Rate Limit Manager — Adaptive rate limiting using Bottleneck
 *
 * Creates per-provider+connection limiters that auto-learn rate limits
 * from API response headers (x-ratelimit-*, retry-after, anthropic-ratelimit-*).
 *
 * Default: ENABLED for API key providers (safety net), DISABLED for OAuth.
 * Can be toggled per provider connection via dashboard.
 */

import Bottleneck from "bottleneck";
import { parseRetryAfterFromBody, lockModel } from "./accountFallback.js";
import { getProviderCategory } from "../config/providerRegistry.js";
import { DEFAULT_API_LIMITS } from "../config/constants.js";

// Store limiters keyed by "provider:connectionId" (and optionally ":model")
const limiters = new Map();

// Store connections that have rate limit protection enabled
const enabledConnections = new Set();

// Track initialization
let initialized = false;

// Default conservative settings (before we learn from headers)
const DEFAULT_SETTINGS = {
  maxConcurrent: 10,
  minTime: 0, // No throttle by default — let headers teach us
  reservoir: null, // No initial reservoir — unlimited until we learn
  reservoirRefreshAmount: null,
  reservoirRefreshInterval: null,
};

/**
 * Initialize rate limit protection from persisted connection settings.
 * Called once on app startup.
 */
export async function initializeRateLimits() {
  if (initialized) return;
  initialized = true;

  try {
    const { getProviderConnections } = await import("@/lib/localDb.js");
    const connections = await getProviderConnections();
    let explicitCount = 0;
    let autoCount = 0;

    for (const conn of connections) {
      if (conn.rateLimitProtection) {
        // Explicitly enabled by user
        enabledConnections.add(conn.id);
        explicitCount++;
      } else if (
        conn.provider &&
        getProviderCategory(conn.provider) === "apikey" &&
        conn.isActive
      ) {
        // Auto-enable for API key providers (safety net)
        enabledConnections.add(conn.id);
        autoCount++;

        // Create a pre-configured limiter with conservative defaults
        const key = `${conn.provider}:${conn.id}`;
        if (!limiters.has(key)) {
          limiters.set(
            key,
            new Bottleneck({
              maxConcurrent: DEFAULT_API_LIMITS.concurrentRequests,
              minTime: DEFAULT_API_LIMITS.minTimeBetweenRequests,
              reservoir: DEFAULT_API_LIMITS.requestsPerMinute,
              reservoirRefreshAmount: DEFAULT_API_LIMITS.requestsPerMinute,
              reservoirRefreshInterval: 60 * 1000, // Refresh every minute
              id: key,
            })
          );
        }
      }
    }

    if (explicitCount > 0 || autoCount > 0) {
      console.log(
        `🛡️ [RATE-LIMIT] Loaded ${explicitCount} explicit + ${autoCount} auto-enabled (API key) protection(s)`
      );
    }
  } catch (err) {
    console.error("[RATE-LIMIT] Failed to load settings:", err.message);
  }
}

/**
 * Enable rate limit protection for a connection
 */
export function enableRateLimitProtection(connectionId) {
  enabledConnections.add(connectionId);
}

/**
 * Disable rate limit protection for a connection
 */
export function disableRateLimitProtection(connectionId) {
  enabledConnections.delete(connectionId);
  // Clean up limiters for this connection
  for (const [key] of limiters) {
    if (key.includes(connectionId)) {
      const limiter = limiters.get(key);
      limiter?.disconnect();
      limiters.delete(key);
    }
  }
}

/**
 * Check if rate limit protection is enabled for a connection
 */
export function isRateLimitEnabled(connectionId) {
  return enabledConnections.has(connectionId);
}

/**
 * Get or create a limiter for a given provider+connection combination
 */
function getLimiter(provider, connectionId, model = null) {
  const key = model ? `${provider}:${connectionId}:${model}` : `${provider}:${connectionId}`;

  if (!limiters.has(key)) {
    const limiter = new Bottleneck({
      ...DEFAULT_SETTINGS,
      id: key,
    });

    // Log when jobs are queued
    limiter.on("queued", () => {
      const counts = limiter.counts();
      if (counts.QUEUED > 0) {
        console.log(
          `⏳ [RATE-LIMIT] ${key} — ${counts.QUEUED} request(s) queued, ${counts.RUNNING} running`
        );
      }
    });

    limiters.set(key, limiter);
  }

  return limiters.get(key);
}

/**
 * Acquire a rate limit slot before making a request.
 * If rate limiting is disabled for this connection, returns immediately.
 *
 * @param {string} provider - Provider ID
 * @param {string} connectionId - Connection ID
 * @param {string} model - Model name (optional, for per-model limits)
 * @param {Function} fn - The async function to execute (e.g., executor.execute)
 * @returns {Promise<any>} Result of fn()
 */
export async function withRateLimit(provider, connectionId, model, fn) {
  if (!enabledConnections.has(connectionId)) {
    return fn();
  }

  const limiter = getLimiter(provider, connectionId, null);
  return limiter.schedule(fn);
}

// ─── Header Parsing ──────────────────────────────────────────────────────────

/**
 * Standard headers used by most providers (OpenAI, Fireworks, etc.)
 */
const STANDARD_HEADERS = {
  limit: "x-ratelimit-limit-requests",
  remaining: "x-ratelimit-remaining-requests",
  reset: "x-ratelimit-reset-requests",
  limitTokens: "x-ratelimit-limit-tokens",
  remainingTokens: "x-ratelimit-remaining-tokens",
  resetTokens: "x-ratelimit-reset-tokens",
  retryAfter: "retry-after",
  overLimit: "x-ratelimit-over-limit",
};

/**
 * Anthropic uses custom headers
 */
const ANTHROPIC_HEADERS = {
  limit: "anthropic-ratelimit-requests-limit",
  remaining: "anthropic-ratelimit-requests-remaining",
  reset: "anthropic-ratelimit-requests-reset",
  limitTokens: "anthropic-ratelimit-input-tokens-limit",
  remainingTokens: "anthropic-ratelimit-input-tokens-remaining",
  resetTokens: "anthropic-ratelimit-input-tokens-reset",
  retryAfter: "retry-after",
};

/**
 * Parse a reset time string into milliseconds.
 * Formats: "1s", "1m", "1h", "1ms", "60", ISO date, Unix timestamp
 */
function parseResetTime(value) {
  if (!value) return null;

  // Duration strings: "1s", "500ms", "1m30s"
  const durationMatch = value.match(/^(?:(\d+)h)?(?:(\d+)m(?!s))?(?:(\d+)s)?(?:(\d+)ms)?$/);
  if (durationMatch) {
    const [, h, m, s, ms] = durationMatch;
    return (
      (parseInt(h || 0) * 3600 + parseInt(m || 0) * 60 + parseInt(s || 0)) * 1000 +
      parseInt(ms || 0)
    );
  }

  // Pure number: assume seconds
  const num = parseFloat(value);
  if (!isNaN(num) && num > 0) {
    // If it looks like a Unix timestamp (> year 2025)
    if (num > 1700000000) {
      return Math.max(0, num * 1000 - Date.now());
    }
    return num * 1000;
  }

  // ISO date string
  try {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return Math.max(0, date.getTime() - Date.now());
    }
  } catch {}

  return null;
}

/**
 * Update rate limiter based on API response headers.
 * Called after every successful or failed response from a provider.
 *
 * @param {string} provider - Provider ID
 * @param {string} connectionId - Connection ID
 * @param {Headers} headers - Response headers
 * @param {number} status - HTTP status code
 * @param {string} model - Model name
 */
export function updateFromHeaders(provider, connectionId, headers, status, model = null) {
  if (!enabledConnections.has(connectionId)) return;
  if (!headers) return;

  const limiter = getLimiter(provider, connectionId, null);
  const headerMap =
    provider === "claude" || provider === "anthropic" ? ANTHROPIC_HEADERS : STANDARD_HEADERS;

  // Get header values (handle both Headers object and plain object)
  const getHeader = (name) => {
    if (typeof headers.get === "function") return headers.get(name);
    return headers[name] || null;
  };

  const limit = parseInt(getHeader(headerMap.limit));
  const remaining = parseInt(getHeader(headerMap.remaining));
  const resetStr = getHeader(headerMap.reset);
  const retryAfterStr = getHeader(headerMap.retryAfter);
  const overLimit = getHeader(STANDARD_HEADERS.overLimit);

  // Handle 429 — rate limited
  if (status === 429) {
    const retryAfterMs = parseResetTime(retryAfterStr) || 60000; // Default 60s
    console.log(
      `🚫 [RATE-LIMIT] ${provider}:${connectionId.slice(0, 8)} — 429 received, pausing for ${Math.ceil(retryAfterMs / 1000)}s`
    );

    limiter.updateSettings({
      reservoir: 0,
      reservoirRefreshAmount: limit || 60,
      reservoirRefreshInterval: retryAfterMs,
    });
    return;
  }

  // Handle "over limit" soft warning (Fireworks)
  if (overLimit === "yes") {
    console.log(
      `⚠️ [RATE-LIMIT] ${provider}:${connectionId.slice(0, 8)} — near capacity, slowing down`
    );
    limiter.updateSettings({
      minTime: 200, // Add 200ms between requests
    });
    return;
  }

  // Normal response — update limiter from headers
  if (!isNaN(limit) && limit > 0) {
    const resetMs = parseResetTime(resetStr) || 60000;

    // Calculate optimal minTime from RPM limit
    const minTime = Math.max(0, Math.floor(60000 / limit) - 10); // Small buffer

    const updates = { minTime };

    // If remaining is low (< 10% of limit), set reservoir to throttle immediately
    if (!isNaN(remaining)) {
      if (remaining < limit * 0.1) {
        updates.reservoir = remaining;
        updates.reservoirRefreshAmount = limit;
        updates.reservoirRefreshInterval = resetMs;
        console.log(
          `⚠️ [RATE-LIMIT] ${provider}:${connectionId.slice(0, 8)} — ${remaining}/${limit} remaining, throttling`
        );
      } else if (remaining > limit * 0.5) {
        // Plenty of headroom — relax the limiter
        updates.minTime = 0;
        updates.reservoir = null;
        updates.reservoirRefreshAmount = null;
        updates.reservoirRefreshInterval = null;
      }
    }

    limiter.updateSettings(updates);
  }
}

/**
 * Get current rate limit status for a provider+connection (for dashboard display)
 */
export function getRateLimitStatus(provider, connectionId) {
  const key = `${provider}:${connectionId}`;
  const limiter = limiters.get(key);

  if (!limiter) {
    return {
      enabled: enabledConnections.has(connectionId),
      active: false,
      queued: 0,
      running: 0,
    };
  }

  const counts = limiter.counts();
  return {
    enabled: enabledConnections.has(connectionId),
    active: true,
    queued: counts.QUEUED || 0,
    running: counts.RUNNING || 0,
    executing: counts.EXECUTING || 0,
    done: counts.DONE || 0,
  };
}

/**
 * Get all active limiters status (for dashboard overview)
 */
export function getAllRateLimitStatus() {
  const result = {};
  for (const [key, limiter] of limiters) {
    const counts = limiter.counts();
    result[key] = {
      queued: counts.QUEUED || 0,
      running: counts.RUNNING || 0,
      executing: counts.EXECUTING || 0,
    };
  }
  return result;
}

/**
 * Update rate limiter based on API response body (JSON error responses).
 * Providers embed retry info in JSON payloads in different formats.
 * Should be called alongside updateFromHeaders for 4xx/5xx responses.
 *
 * @param {string} provider - Provider ID
 * @param {string} connectionId - Connection ID
 * @param {string|object} responseBody - Response body (string or parsed JSON)
 * @param {number} status - HTTP status code
 * @param {string} model - Model name (for per-model lockouts)
 */
export function updateFromResponseBody(provider, connectionId, responseBody, status, model = null) {
  if (!enabledConnections.has(connectionId)) return;

  const { retryAfterMs, reason } = parseRetryAfterFromBody(responseBody);

  if (retryAfterMs && retryAfterMs > 0) {
    const limiter = getLimiter(provider, connectionId, null);
    console.log(
      `🚫 [RATE-LIMIT] ${provider}:${connectionId.slice(0, 8)} — body-parsed retry: ${Math.ceil(retryAfterMs / 1000)}s (${reason})`
    );

    limiter.updateSettings({
      reservoir: 0,
      reservoirRefreshAmount: 60,
      reservoirRefreshInterval: retryAfterMs,
    });

    // Also apply model-level lockout if model is known
    if (model) {
      lockModel(provider, connectionId, model, reason, retryAfterMs);
    }
  }
}
