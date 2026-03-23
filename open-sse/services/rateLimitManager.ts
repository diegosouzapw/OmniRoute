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
import { parseRetryAfterFromBody, lockModel } from "./accountFallback.ts";
import { getProviderCategory } from "../config/providerRegistry.ts";
import { DEFAULT_API_LIMITS } from "../config/constants.ts";
import { getCodexRateLimitKey } from "../executors/codex.ts";

interface LearnedLimitEntry {
  provider: string;
  connectionId: string;
  lastUpdated: number;
  limit?: number;
  remaining?: number;
  minTime?: number;
}

interface LimiterUpdateSettings {
  minTime: number;
  reservoir?: number | null;
  reservoirRefreshAmount?: number | null;
  reservoirRefreshInterval?: number | null;
}

type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNumber(value: unknown, fallback = 0): number {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim().length > 0
        ? Number(value)
        : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

// Store limiters keyed by "provider:connectionId" (and optionally ":model")
const limiters = new Map<string, Bottleneck>();

// Store connections that have rate limit protection enabled
const enabledConnections = new Set<string>();

// Store learned limits for persistence (debounced)
const learnedLimits: Record<string, LearnedLimitEntry> = {};
let persistTimer: ReturnType<typeof setTimeout> | null = null;
const PERSIST_DEBOUNCE_MS = 60_000; // Debounce persistence to every 60s max

// Track initialization
let initialized = false;

// Max time (ms) a job can wait in queue before failing with a timeout error.
// Prevents infinite queuing when all providers are exhausted after a 429.
// Configurable via RATE_LIMIT_MAX_WAIT_MS env var (default: 2 minutes).
const MAX_WAIT_MS = parseInt(process.env.RATE_LIMIT_MAX_WAIT_MS || "120000", 10);

// Default conservative settings (before we learn from headers)
const DEFAULT_SETTINGS = {
  maxConcurrent: 10,
  minTime: 0, // No throttle by default — let headers teach us
  reservoir: null, // No initial reservoir — unlimited until we learn
  reservoirRefreshAmount: null,
  reservoirRefreshInterval: null,
  maxWait: MAX_WAIT_MS, // Fail-fast: don't queue forever on 429 exhaustion
};

/**
 * Initialize rate limit protection from persisted connection settings.
 * Called once on app startup.
 */
export async function initializeRateLimits() {
  if (initialized) return;
  initialized = true;

  try {
    const { getProviderConnections } = await import("@/lib/localDb");
    const connections = await getProviderConnections();
    let explicitCount = 0;
    let autoCount = 0;
    let customCount = 0;

    for (const connRaw of connections as unknown[]) {
      const conn = toRecord(connRaw);
      const connectionId = typeof conn.id === "string" ? conn.id : "";
      const provider = typeof conn.provider === "string" ? conn.provider : "";
      const isActive = conn.isActive === true;
      const rateLimitProtection = conn.rateLimitProtection === true;
      const customRpm = toNumber(conn.customRpm, 0);
      const customTpm = toNumber(conn.customTpm, 0);
      if (!connectionId || !provider) continue;

      // Custom rpm/tpm configured — enable rate limiting with user-defined values (#198)
      if (customRpm > 0 || customTpm > 0) {
        enabledConnections.add(connectionId);
        customCount++;

        const key = `${provider}:${connectionId}`;
        const rpm = customRpm > 0 ? customRpm : DEFAULT_API_LIMITS.requestsPerMinute;
        const minTime = Math.max(0, Math.floor(60000 / rpm) - 10);

        if (!limiters.has(key)) {
          limiters.set(
            key,
            new Bottleneck({
              maxConcurrent: DEFAULT_API_LIMITS.concurrentRequests,
              minTime,
              reservoir: rpm,
              reservoirRefreshAmount: rpm,
              reservoirRefreshInterval: 60 * 1000,
              maxWait: MAX_WAIT_MS,
              id: key,
            })
          );
        }
      } else if (rateLimitProtection) {
        // Explicitly enabled by user
        enabledConnections.add(connectionId);
        explicitCount++;
      } else if (getProviderCategory(provider) === "apikey" && isActive) {
        // Auto-enable for API key providers (safety net)
        enabledConnections.add(connectionId);
        autoCount++;

        // Create a pre-configured limiter with conservative defaults
        const key = `${provider}:${connectionId}`;
        if (!limiters.has(key)) {
          limiters.set(
            key,
            new Bottleneck({
              maxConcurrent: DEFAULT_API_LIMITS.concurrentRequests,
              minTime: DEFAULT_API_LIMITS.minTimeBetweenRequests,
              reservoir: DEFAULT_API_LIMITS.requestsPerMinute,
              reservoirRefreshAmount: DEFAULT_API_LIMITS.requestsPerMinute,
              reservoirRefreshInterval: 60 * 1000, // Refresh every minute
              maxWait: MAX_WAIT_MS,
              id: key,
            })
          );
        }
      }
    }

    if (explicitCount > 0 || autoCount > 0 || customCount > 0) {
      console.log(
        `🛡️ [RATE-LIMIT] Loaded ${explicitCount} explicit + ${autoCount} auto-enabled + ${customCount} custom rpm/tpm protection(s)`
      );
    }

    // Load persisted learned limits
    await loadPersistedLimits();
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
function getLimiterKey(provider, connectionId, model = null) {
  if (provider === "codex" && model) {
    return `${provider}:${getCodexRateLimitKey(connectionId, model)}`;
  }
  return `${provider}:${connectionId}`;
}

function getLimiter(provider, connectionId, model = null) {
  const key = getLimiterKey(provider, connectionId, model);

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
 * @returns {Promise<unknown>} Result of fn()
 */
export async function withRateLimit(provider, connectionId, model, fn) {
  if (!enabledConnections.has(connectionId)) {
    return fn();
  }

  const limiter = getLimiter(provider, connectionId, model);
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

  const limiter = getLimiter(provider, connectionId, model);
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
    const counts = limiter.counts();
    const limiterKey = getLimiterKey(provider, connectionId, model);
    console.log(
      `🚫 [RATE-LIMIT] ${provider}:${connectionId.slice(0, 8)} — 429 received, pausing for ${Math.ceil(retryAfterMs / 1000)}s, dropping ${counts.QUEUED} queued request(s)`
    );

    // Stop the limiter and drop all waiting jobs so they fail immediately
    // instead of hanging in the queue until reservoir refreshes (which can
    // be hours for providers like Codex with long rate limit windows).
    // This lets upstream callers (e.g. LiteLLM) trigger fallback to other providers.
    // After stop, delete from Map so getLimiter() creates a fresh instance.
    limiter.stop({ dropWaitingJobs: true }).finally(() => {
      limiters.delete(limiterKey);
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

    const updates: LimiterUpdateSettings = { minTime };

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

    // Persist learned limits (debounced)
    recordLearnedLimit(
      provider,
      connectionId,
      { limit, remaining, minTime: updates.minTime },
      model
    );
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
  const result: Record<string, { queued: number; running: number; executing: number }> = {};
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
 * Get all learned limits (for dashboard display).
 */
export function getLearnedLimits() {
  return { ...learnedLimits };
}

// ─── Persistence ────────────────────────────────────────────────────────────

/**
 * Record a learned limit for debounced persistence.
 */
function recordLearnedLimit(
  provider: string,
  connectionId: string,
  limits: Partial<Omit<LearnedLimitEntry, "provider" | "connectionId" | "lastUpdated">>,
  model: string | null = null
) {
  const key = getLimiterKey(provider, connectionId, model);
  learnedLimits[key] = {
    ...limits,
    provider,
    connectionId,
    lastUpdated: Date.now(),
  };

  // Debounce: save at most once per PERSIST_DEBOUNCE_MS
  if (!persistTimer) {
    persistTimer = setTimeout(async () => {
      persistTimer = null;
      try {
        const { updateSettings } = await import("@/lib/db/settings");
        await updateSettings({ learnedRateLimits: JSON.stringify(learnedLimits) });
        console.log(
          `💾 [RATE-LIMIT] Persisted learned limits for ${Object.keys(learnedLimits).length} provider(s)`
        );
      } catch (err) {
        console.error("[RATE-LIMIT] Failed to persist learned limits:", err.message);
      }
    }, PERSIST_DEBOUNCE_MS);
  }
}

/**
 * Load persisted learned limits on startup.
 */
async function loadPersistedLimits() {
  try {
    const { getSettings } = await import("@/lib/db/settings");
    const settings = await getSettings();
    const raw = settings?.learnedRateLimits;
    if (typeof raw !== "string" || raw.trim().length === 0) return;

    const parsed = toRecord(JSON.parse(raw) as unknown);
    let count = 0;

    for (const [key, dataRaw] of Object.entries(parsed)) {
      const data = toRecord(dataRaw);
      const lastUpdated = toNumber(data.lastUpdated, 0);
      // Skip stale entries (older than 24h)
      if (lastUpdated > 0 && Date.now() - lastUpdated > 24 * 60 * 60 * 1000) continue;

      const connectionId = typeof data.connectionId === "string" ? data.connectionId : "";
      const provider = typeof data.provider === "string" ? data.provider : "";
      const limit = toNumber(data.limit, 0);
      const remaining = toNumber(data.remaining, 0);
      const minTime = toNumber(data.minTime, 0);

      learnedLimits[key] = {
        provider,
        connectionId,
        lastUpdated,
        ...(limit > 0 ? { limit } : {}),
        ...(remaining >= 0 ? { remaining } : {}),
        ...(minTime >= 0 ? { minTime } : {}),
      };

      // Apply to limiter if it exists and has rate limit enabled
      if (connectionId && enabledConnections.has(connectionId)) {
        const limiter = limiters.get(key);
        if (limiter && limit > 0) {
          const inferredMinTime = minTime || Math.max(0, Math.floor(60000 / limit) - 10);
          limiter.updateSettings({ minTime: inferredMinTime });
          count++;
        }
      }
    }

    if (count > 0) {
      console.log(`📥 [RATE-LIMIT] Restored ${count} learned rate limit(s) from persistence`);
    }
  } catch (err) {
    console.error("[RATE-LIMIT] Failed to load persisted limits:", err.message);
  }
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
