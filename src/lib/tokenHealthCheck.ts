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
const LOG_PREFIX = "[HealthCheck]";

// ── Logging helper ───────────────────────────────────────────────────────────
let cachedHideLogs: boolean | null = null;
let cacheTimestamp = 0;
let pendingHideLogs: Promise<boolean> | null = null;
const CACHE_TTL = 30_000; // Cache settings for 30 seconds

async function shouldHideLogs(): Promise<boolean> {
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

// ── Singleton guard ──────────────────────────────────────────────────────────
let initialized = false;
let intervalHandle = null;

/**
 * Start the health-check scheduler (idempotent).
 */
export function initTokenHealthCheck() {
  if (initialized) return;
  initialized = true;

  log(`${LOG_PREFIX} Starting proactive token health-check (tick every ${TICK_MS / 1000}s)`);

  // Run first sweep after a short delay so the server finishes booting
  setTimeout(() => {
    sweep();
    intervalHandle = setInterval(sweep, TICK_MS);
  }, 10_000);
}

/**
 * Stop the scheduler (useful for tests / hot-reload).
 */
export function stopTokenHealthCheck() {
  if (intervalHandle) {
    clearInterval(intervalHandle);
    intervalHandle = null;
  }
  initialized = false;
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

  // Skip connections already marked as expired (need re-auth, not retry)
  if (conn.testStatus === "expired") return;

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

  // Not yet due
  if (Date.now() - lastCheck < intervalMs) return;

  log(
    `${LOG_PREFIX} Refreshing ${conn.provider}/${conn.name || conn.email || conn.id} (interval: ${intervalMin}min)`
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
    // Token refreshed successfully — update DB
    const updateData: any = {
      accessToken: result.accessToken,
      lastHealthCheckAt: now,
      testStatus: "active",
      lastError: null,
      lastErrorAt: null,
      lastErrorType: null,
      lastErrorSource: null,
      errorCode: null,
    };

    if (result.refreshToken) {
      updateData.refreshToken = result.refreshToken;
    }

    if (result.expiresIn) {
      updateData.tokenExpiresAt = new Date(Date.now() + result.expiresIn * 1000).toISOString();
    }

    await updateProviderConnection(conn.id, updateData);
    log(`${LOG_PREFIX} ✓ ${conn.provider}/${conn.name || conn.email || conn.id} refreshed`);
  } else {
    // Refresh failed — record but don't disable the connection
    await updateProviderConnection(conn.id, {
      lastHealthCheckAt: now,
      testStatus: "error",
      lastError: "Health check: token refresh failed",
      lastErrorAt: now,
      lastErrorType: "token_refresh_failed",
      lastErrorSource: "oauth",
      errorCode: "refresh_failed",
    });
    logWarn(
      `${LOG_PREFIX} ✗ ${conn.provider}/${conn.name || conn.email || conn.id} refresh failed`
    );
  }
}

// Auto-start when imported
initTokenHealthCheck();

export default initTokenHealthCheck;
