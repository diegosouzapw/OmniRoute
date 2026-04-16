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

import {
  getProviderConnections,
  updateProviderConnection,
  getSettings,
  resolveProxyForConnection,
} from "@/lib/localDb";
import {
  getAccessToken,
  supportsTokenRefresh,
  isUnrecoverableRefreshError,
} from "@omniroute/open-sse/services/tokenRefresh.ts";
import { pickMaskedDisplayValue } from "@/shared/utils/maskEmail";

// ── Constants ────────────────────────────────────────────────────────────────
const TICK_MS = 60 * 1000; // sweep interval: every 60 seconds
const DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60; // default per-connection interval
const EXPIRED_RETRY_MAX = 3; // max retry attempts for expired connections before giving up
const EXPIRED_RETRY_BACKOFF_MIN = 5; // backoff between expired retries (minutes)
const LOG_PREFIX = "[HealthCheck]";
const TRUE_ENV_VALUES = new Set(["1", "true", "yes", "on"]);

function getConnectionLogLabel(conn: { name?: string; email?: string; id?: string }): string {
  return pickMaskedDisplayValue([conn.name, conn.email], conn.id || "-");
}

export function extractResolvedProxyConfig(resolvedProxy: unknown) {
  if (
    resolvedProxy &&
    typeof resolvedProxy === "object" &&
    !Array.isArray(resolvedProxy) &&
    "proxy" in resolvedProxy
  ) {
    return (resolvedProxy as { proxy?: unknown }).proxy ?? null;
  }

  return resolvedProxy ?? null;
}

export function buildRefreshFailureUpdate(conn: any, now: string) {
  const wasExpired = conn.testStatus === "expired";
  const retryCount = (conn.expiredRetryCount ?? 0) + (wasExpired ? 1 : 0);

  return {
    lastHealthCheckAt: now,
    // A failed background refresh should not evict otherwise healthy accounts
    // from request routing. Keep non-expired connections active and only persist
    // the refresh error metadata for observability.
    testStatus: wasExpired ? "expired" : "active",
    lastError: "Health check: token refresh failed",
    lastErrorAt: now,
    lastErrorType: "token_refresh_failed",
    lastErrorSource: "oauth",
    errorCode: "refresh_failed",
    ...(wasExpired ? { expiredRetryCount: retryCount, expiredRetryAt: now } : {}),
  };
}

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

    const staggerMs = parseInt(process.env.HEALTHCHECK_STAGGER_MS || "3000", 10);

    for (let i = 0; i < connections.length; i++) {
      const conn = connections[i];
      try {
        await checkConnection(conn);
      } catch (err) {
        // Per-connection isolation: one failure never blocks others
        logError(`${LOG_PREFIX} Error checking ${conn.name || conn.id}:`, err.message);
      }

      // Stagger delay between checks to prevent bursting (Issue #1220)
      if (staggerMs > 0 && i < connections.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, staggerMs));
      }
    }
  } catch (err) {
    logError(`${LOG_PREFIX} Sweep error:`, err.message);
  }
}

/**
 * Check a single connection and refresh if due.
 */
export async function checkConnection(conn) {
  // Determine interval (0 = disabled)
  const intervalMin = conn.healthCheckInterval ?? DEFAULT_HEALTH_CHECK_INTERVAL_MIN;
  if (intervalMin <= 0) return;
  if (!conn.isActive) return;
  if (!conn.refreshToken || typeof conn.refreshToken !== "string") return;

  // Retry expired connections with exponential backoff up to EXPIRED_RETRY_MAX times.
  if (conn.testStatus === "expired") {
    const retryCount = conn.expiredRetryCount ?? 0;
    if (retryCount >= EXPIRED_RETRY_MAX) return;

    const lastRetry = conn.expiredRetryAt ? new Date(conn.expiredRetryAt).getTime() : 0;
    const backoffMs = EXPIRED_RETRY_BACKOFF_MIN * 60 * 1000 * Math.pow(2, retryCount);
    if (Date.now() - lastRetry < backoffMs) return;

    log(
      `${LOG_PREFIX} Retrying expired ${conn.provider}/${getConnectionLogLabel(conn)} (attempt ${retryCount + 1}/${EXPIRED_RETRY_MAX})`
    );
  }

  if (!supportsTokenRefresh(conn.provider)) {
    const now = new Date().toISOString();
    await updateProviderConnection(conn.id, { lastHealthCheckAt: now });
    log(
      `${LOG_PREFIX} Skipping ${conn.provider}/${getConnectionLogLabel(conn)} (refresh unsupported)`
    );
    return;
  }

  const intervalMs = intervalMin * 60 * 1000;
  const lastCheck = conn.lastHealthCheckAt ? new Date(conn.lastHealthCheckAt).getTime() : 0;

  // Proactive pre-expiry check (#631): if token is about to expire, refresh immediately
  // regardless of the health check interval — prevents request failures between checks
  const TOKEN_EXPIRY_BUFFER = 5 * 60 * 1000; // 5 minutes
  const tokenExpiresAt = conn.tokenExpiresAt ? new Date(conn.tokenExpiresAt).getTime() : 0;
  const isAboutToExpire = tokenExpiresAt > 0 && tokenExpiresAt - Date.now() < TOKEN_EXPIRY_BUFFER;

  // Not yet due: skip if (a) interval hasn't elapsed AND (b) token is not about to expire
  if (Date.now() - lastCheck < intervalMs && !isAboutToExpire) return;

  const reason = isAboutToExpire ? "token expiring soon" : `interval: ${intervalMin}min`;
  log(`${LOG_PREFIX} Refreshing ${conn.provider}/${getConnectionLogLabel(conn)} (${reason})`);

  const credentials = {
    refreshToken: conn.refreshToken,
    accessToken: conn.accessToken,
    expiresAt: conn.tokenExpiresAt,
    providerSpecificData: conn.providerSpecificData,
  };

  const hideLogs = await shouldHideLogs();
  const proxyResolution = await resolveProxyForConnection(conn.id);
  const proxyConfig = extractResolvedProxyConfig(proxyResolution);
  const result = await getAccessToken(
    conn.provider,
    credentials,
    {
      info: (tag, msg) => {
        if (!hideLogs) console.log(`${LOG_PREFIX} [${tag}] ${msg}`);
      },
      warn: (tag, msg) => {
        if (!hideLogs) console.warn(`${LOG_PREFIX} [${tag}] ${msg}`);
      },
      error: (tag, msg, extra) => {
        if (!hideLogs) console.error(`${LOG_PREFIX} [${tag}] ${msg}`, extra || "");
      },
    },
    proxyConfig
  );

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
      `${LOG_PREFIX} ✗ ${conn.provider}/${getConnectionLogLabel(conn)} — ` +
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
    log(`${LOG_PREFIX} ✓ ${conn.provider}/${getConnectionLogLabel(conn)} refreshed`);
  } else {
    const updateData = buildRefreshFailureUpdate(conn, now);
    await updateProviderConnection(conn.id, updateData);
    logWarn(
      `${LOG_PREFIX} ✗ ${conn.provider}/${getConnectionLogLabel(conn)} refresh failed` +
        (conn.testStatus === "expired"
          ? ` (${updateData.expiredRetryCount}/${EXPIRED_RETRY_MAX} expired retries used)`
          : "")
    );
  }
}

// Auto-start when imported
initTokenHealthCheck();

export default initTokenHealthCheck;
