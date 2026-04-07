/**
 * Proactive Token Health Check Scheduler
 *
 * Background job that periodically refreshes OAuth tokens before they expire.
 * Each connection can configure its own `healthCheckInterval` (minutes).
 * Default: 60 minutes.  0 = disabled.
 *
 * The scheduler runs a lightweight sweep every TICK_MS (60 s).
 * For each eligible connection it calls the provider-specific refresh function,
 * updates the DB, and logs the result.
 */

import { getProviderConnections, updateProviderConnection, getSettings } from "@/lib/localDb";
import {
  getAccessToken,
  supportsTokenRefresh,
  isUnrecoverableRefreshError,
} from "@omniroute/open-sse/services/tokenRefresh.ts";

// ── Constants ────────────────────────────────────────────────────────────────
const TICK_MS = 60 * 1000; // sweep interval: every 60 seconds
const DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60; // default per-connection interval
const EXPIRED_RETRY_MAX = 3; // max retry attempts for expired connections before giving up
const EXPIRED_RETRY_BACKOFF_MIN = 5; // backoff between expired retries (minutes)
const LOG_PREFIX = "[HealthCheck]";
const TRUE_ENV_VALUES = new Set(["1", "true", "yes", "on"]);

function isEnvFlagEnabled(name: string): boolean {
  const value = process.env[name];
  if (!value) return false;
  return TRUE_ENV_VALUES.has(value.trim().toLowerCase());
}

function isHealthCheckDisabled(): boolean {
  return isEnvFlagEnabled("OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK") || process.env.NODE_ENV === "test";
}

// ── Logging helper ───────────────────────────────────────────────────────────
let cachedHideLogs: boolean | null = null;
let cacheTimestamp = 0;
let pendingHideLogs: Promise<boolean> | null = null;
const CACHE_TTL = 30_000; // Cache settings for 30 seconds

async function shouldHideLogs(): Promise<boolean> {
  if (isEnvFlagEnabled("OMNIROUTE_HIDE_HEALTHCHECK_LOGS") || process.env.NODE_ENV === "test") {
    return true;
  }

  const now = Date.now();

  // Return cached value if valid
  if (cachedHideLogs !== null && now - cacheTimestamp < CACHE_TTL) {
    return cachedHideLogs;
  }

  // Return pending promise if a query is already in progress (request coalescing)
  if (pendingHideLogs !== null) {
    return pendingHideLogs;
  }

  // Create new promise for DB query
  pendingHideLogs = (async () => {
    try {
      const settings = await getSettings();
      cachedHideLogs = settings.hideHealthCheckLogs === true;
      cacheTimestamp = now;
      return cachedHideLogs;
    } catch {
      return false;
    } finally {
      pendingHideLogs = null;
    }
  })();

  return pendingHideLogs;
}

function log(message: string, ...args: any[]) {
  shouldHideLogs().then((hide) => {
    if (!hide) console.log(message, ...args);
  });
}

function logWarn(message: string, ...args: any[]) {
  shouldHideLogs().then((hide) => {
    if (!hide) console.warn(message, ...args);
  });
}

function logError(message: string, ...args: any[]) {
  shouldHideLogs().then((hide) => {
    if (!hide) console.error(message, ...args);
  });
}

/**
 * Clear the cached hideLogs setting (call when settings are updated).
 */
export function clearHealthCheckLogCache() {
  cachedHideLogs = null;
  cacheTimestamp = 0;
}

// ── Singleton guard (globalThis survives HMR re-evaluation) ─────────────────

declare global {
  var __omnirouteTokenHC:
    | { initialized: boolean; interval: ReturnType<typeof setInterval> | null }
    | undefined;
}

function getHCState() {
  if (!globalThis.__omnirouteTokenHC) {
    globalThis.__omnirouteTokenHC = { initialized: false, interval: null };
  }
  return globalThis.__omnirouteTokenHC;
}

/**
 * Start the health-check scheduler (idempotent).
 */
export function initTokenHealthCheck() {
  const state = getHCState();
  if (state.initialized || isHealthCheckDisabled()) return;
  state.initialized = true;

  log(`${LOG_PREFIX} Starting proactive token health-check (tick every ${TICK_MS / 1000}s)`);

  const timer = setTimeout(() => {
    sweep();
    state.interval = setInterval(sweep, TICK_MS);
    if (state.interval && typeof state.interval === "object" && "unref" in state.interval) {
      (state.interval as { unref?: () => void }).unref?.();
    }
  }, 10_000);
  if (timer && typeof timer === "object" && "unref" in timer) {
    (timer as { unref?: () => void }).unref?.();
  }
}

/**
 * Stop the scheduler (useful for tests / hot-reload).
 */
export function stopTokenHealthCheck() {
  const state = getHCState();
  if (state.interval) {
    clearInterval(state.interval);
    state.interval = null;
  }
  state.initialized = false;
}

// ── Core sweep ───────────────────────────────────────────────────────────────
async function sweep() {
  try {
    const connections = await getProviderConnections({ authType: "oauth" });

    if (!connections || connections.length === 0) return;

    for (const conn of connections) {
      try {
        await checkConnection(conn);
      } catch (err) {
        // Per-connection isolation: one failure never blocks others
        logError(`${LOG_PREFIX} Error checking ${conn.name || conn.id}:`, err.message);
      }
    }
  } catch (err) {
    logError(`${LOG_PREFIX} Sweep error:`, err.message);
  }
}

/**
 * Check a single connection and refresh if due.
 */
async function checkConnection(conn) {
  // Determine interval (0 = disabled)
  const intervalMin = conn.healthCheckInterval ?? DEFAULT_HEALTH_CHECK_INTERVAL_MIN;
  if (intervalMin <= 0) return;
  if (!conn.isActive) return;
  if (!conn.refreshToken || typeof conn.refreshToken !== "string") return;

  const nowMs = Date.now();

  // Proactive pre-expiry check (#631): if token is about to expire, refresh immediately.
  // When a connection still has a healthy access token, avoid forcing a refresh purely
  // because the interval elapsed. Some providers may reject older refresh tokens while
  // the current access token remains valid, and treating that as a hard auth failure
  // produces false "re-authenticate" warnings.
  const TOKEN_EXPIRY_BUFFER = 5 * 60 * 1000; // 5 minutes
  const tokenExpiresAtMs = conn.tokenExpiresAt ? new Date(conn.tokenExpiresAt).getTime() : 0;
  const hasHealthyAccessToken =
    tokenExpiresAtMs > 0 && Number.isFinite(tokenExpiresAtMs) && tokenExpiresAtMs - nowMs > TOKEN_EXPIRY_BUFFER;
  const isAboutToExpire =
    tokenExpiresAtMs > 0 && Number.isFinite(tokenExpiresAtMs) && tokenExpiresAtMs - nowMs <= TOKEN_EXPIRY_BUFFER;

  // Retry expired connections with exponential backoff up to EXPIRED_RETRY_MAX times.
  if (conn.testStatus === "expired" && hasHealthyAccessToken) {
    const now = new Date().toISOString();
    await updateProviderConnection(conn.id, {
      lastHealthCheckAt: now,
      testStatus: "active",
      lastError: null,
      lastErrorAt: null,
      lastErrorType: null,
      lastErrorSource: null,
      errorCode: null,
      expiredRetryCount: null,
      expiredRetryAt: null,
    });
    log(
      `${LOG_PREFIX} ✓ ${conn.provider}/${conn.name || conn.email || conn.id} marked active (access token still valid)`
    );
    return;
  }

  if (conn.testStatus === "expired") {
    const retryCount = conn.expiredRetryCount ?? 0;
    if (retryCount >= EXPIRED_RETRY_MAX) return;

    const lastRetry = conn.expiredRetryAt ? new Date(conn.expiredRetryAt).getTime() : 0;
    const backoffMs = EXPIRED_RETRY_BACKOFF_MIN * 60 * 1000 * Math.pow(2, retryCount);
    if (Date.now() - lastRetry < backoffMs) return;

    log(
      `${LOG_PREFIX} Retrying expired ${conn.provider}/${conn.name || conn.email || conn.id} (attempt ${retryCount + 1}/${EXPIRED_RETRY_MAX})`
    );
  }

  if (!supportsTokenRefresh(conn.provider)) {
    const now = new Date().toISOString();
    await updateProviderConnection(conn.id, { lastHealthCheckAt: now });
    log(
      `${LOG_PREFIX} Skipping ${conn.provider}/${conn.name || conn.email || conn.id} (refresh unsupported)`
    );
    return;
  }

  const intervalMs = intervalMin * 60 * 1000;
  const lastCheck = conn.lastHealthCheckAt ? new Date(conn.lastHealthCheckAt).getTime() : 0;

  // If the access token is still healthy, don't force a refresh merely because the
  // periodic interval elapsed. Keep the status active and re-check later.
  if (hasHealthyAccessToken) {
    if (nowMs - lastCheck >= intervalMs) {
      const now = new Date().toISOString();
      await updateProviderConnection(conn.id, {
        lastHealthCheckAt: now,
        testStatus: "active",
        lastError: null,
        lastErrorAt: null,
        lastErrorType: null,
        lastErrorSource: null,
        errorCode: null,
        expiredRetryCount: null,
        expiredRetryAt: null,
      });
    }
    return;
  }

  // Not yet due: skip if interval hasn't elapsed and the token isn't near expiry.
  if (nowMs - lastCheck < intervalMs && !isAboutToExpire) return;

  const reason = isAboutToExpire ? "token expiring soon" : `interval: ${intervalMin}min`;
  log(
    `${LOG_PREFIX} Refreshing ${conn.provider}/${conn.name || conn.email || conn.id} (${reason})`
  );

  const credentials = {
    refreshToken: conn.refreshToken,
    accessToken: conn.accessToken,
    expiresAt: conn.tokenExpiresAt,
    providerSpecificData: conn.providerSpecificData,
  };

  const hideLogs = await shouldHideLogs();
  const result = await getAccessToken(conn.provider, credentials, {
    info: (tag, msg) => {
      if (!hideLogs) console.log(`${LOG_PREFIX} [${tag}] ${msg}`);
    },
    warn: (tag, msg) => {
      if (!hideLogs) console.warn(`${LOG_PREFIX} [${tag}] ${msg}`);
    },
    error: (tag, msg, extra) => {
      if (!hideLogs) console.error(`${LOG_PREFIX} [${tag}] ${msg}`, extra || "");
    },
  });

  const now = new Date().toISOString();

  // ─── Handle unrecoverable errors (e.g. refresh_token_reused) ───────────
  // OpenAI Codex uses rotating one-time-use refresh tokens.
  // Once used, the old token is permanently invalidated.
  // Retrying will never succeed → deactivate and stop the loop.
  if (isUnrecoverableRefreshError(result)) {
    await updateProviderConnection(conn.id, {
      lastHealthCheckAt: now,
      testStatus: "expired",
      lastError: `Refresh token consumed (${result.error}). Please re-authenticate this account.`,
      lastErrorAt: now,
      lastErrorType: result.error,
      lastErrorSource: "oauth",
      errorCode: result.error,
      isActive: false,
      refreshToken: null,
    });
    logError(
      `${LOG_PREFIX} ✗ ${conn.provider}/${conn.name || conn.email || conn.id} — ` +
        `Refresh token is permanently invalid (${result.error}). ` +
        `Connection deactivated. Re-authenticate to restore.`
    );
    return;
  }

  if (result && result.accessToken) {
    const updateData: any = {
      accessToken: result.accessToken,
      lastHealthCheckAt: now,
      testStatus: "active",
      lastError: null,
      lastErrorAt: null,
      lastErrorType: null,
      lastErrorSource: null,
      errorCode: null,
      expiredRetryCount: null,
      expiredRetryAt: null,
    };

    if (result.refreshToken) {
      updateData.refreshToken = result.refreshToken;
    }

    if (result.expiresIn) {
      updateData.tokenExpiresAt = new Date(Date.now() + result.expiresIn * 1000).toISOString();
    }

    if (result.providerSpecificData) {
      updateData.providerSpecificData = {
        ...(conn.providerSpecificData || {}),
        ...result.providerSpecificData,
      };
    }

    await updateProviderConnection(conn.id, updateData);
    log(`${LOG_PREFIX} ✓ ${conn.provider}/${conn.name || conn.email || conn.id} refreshed`);
  } else {
    const wasExpired = conn.testStatus === "expired";
    const retryCount = (conn.expiredRetryCount ?? 0) + (wasExpired ? 1 : 0);

    await updateProviderConnection(conn.id, {
      lastHealthCheckAt: now,
      testStatus: wasExpired ? "expired" : "error",
      lastError: "Health check: token refresh failed",
      lastErrorAt: now,
      lastErrorType: "token_refresh_failed",
      lastErrorSource: "oauth",
      errorCode: "refresh_failed",
      ...(wasExpired ? { expiredRetryCount: retryCount, expiredRetryAt: now } : {}),
    });
    logWarn(
      `${LOG_PREFIX} ✗ ${conn.provider}/${conn.name || conn.email || conn.id} refresh failed` +
        (wasExpired ? ` (expired retry ${retryCount}/${EXPIRED_RETRY_MAX})` : "")
    );
  }
}

// Auto-start when imported
initTokenHealthCheck();

export default initTokenHealthCheck;
