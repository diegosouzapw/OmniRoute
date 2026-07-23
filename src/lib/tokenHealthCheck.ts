// @ts-nocheck
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
  getCachedProviderConnectionById,
  updateProviderConnection,
  getSettings,
  resolveProxyForConnection,
} from "@/lib/localDb";
import {
  getAccessToken,
  supportsTokenRefresh,
  isUnrecoverableRefreshError,
  refreshCopilotToken,
} from "@omniroute/open-sse/services/tokenRefresh.ts";
import { pickMaskedDisplayValue } from "@/shared/utils/maskEmail";
import { isAutomatedTestProcess } from "@/shared/utils/testProcess";
import { refreshGithubCopilotSubTokenIfNeeded } from "@/lib/tokenHealthCheckCopilot";

const LOG_PREFIX = "[HealthCheck]";
const TRUE_ENV_VALUES = new Set(["1", "true", "yes", "on"]);
const TICK_MS = 60 * 1000; // sweep interval: every 60 seconds (restored — #7719 dropped the const but kept two call sites)
const DEFAULT_BATCH_SIZE = 20;
const DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60; // default per-connection interval

function isBuildProcess(): boolean {
  return typeof process !== "undefined" && process.env.NEXT_PHASE === "phase-production-build";
}

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

function getEffectiveTokenExpiryIso(conn: any): string | null {
  if (!conn || typeof conn !== "object") return null;
  return conn.tokenExpiresAt || conn.expiresAt || null;
}

function getEffectiveTokenExpiryMs(conn: any): number {
  const effectiveExpiry = getEffectiveTokenExpiryIso(conn);
  if (!effectiveExpiry) return 0;
  const expiryMs = new Date(effectiveExpiry).getTime();
  return Number.isFinite(expiryMs) ? expiryMs : 0;
}

const TOKEN_EXPIRY_BUFFER = 5 * 60 * 1000; // 5 minutes

function getCopilotTokenExpiryMs(expiresAt: unknown): number {
  if (typeof expiresAt === "number" && Number.isFinite(expiresAt)) {
    return expiresAt < 1e12 ? expiresAt * 1000 : expiresAt;
  }
  if (typeof expiresAt === "string" && expiresAt.trim()) {
    const parsed = new Date(expiresAt).getTime();
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function isGitHubAccessTokenOnlyConnection(conn: any): boolean {
  return (
    String(conn?.provider || "").toLowerCase() === "github" &&
    typeof conn?.accessToken === "string" &&
    conn.accessToken.trim().length > 0
  );
}

function canClearGitHubNoRefreshTokenState(conn: any): boolean {
  return (
    !conn?.testStatus ||
    conn.testStatus === "active" ||
    (conn.testStatus === "expired" && conn.errorCode === "no_refresh_token")
  );
}

// ── Refresh circuit breaker ───────────────────────────────────────────────
// A refresh that returns null (network blip, dead proxy, unclassified error)
// leaves the connection active, so the next 60s sweep retries immediately —
// the production refresh loop (claude/aa5dd5cf 1352×, kimi 270×). We track
// consecutive failures and back off exponentially so a stuck connection stops
// hammering the upstream (and stops flooding the logs) instead of looping.
const REFRESH_CIRCUIT_BASE_MIN = 5;
const REFRESH_CIRCUIT_MAX_MIN = 240; // cap at 4h

export function getRefreshBackoffUntil(streak: number, now: string): string {
  const steps = Math.max(0, streak - 1);
  const backoffMin = Math.min(REFRESH_CIRCUIT_BASE_MIN * 2 ** steps, REFRESH_CIRCUIT_MAX_MIN);
  return new Date(new Date(now).getTime() + backoffMin * 60 * 1000).toISOString();
}

export function isInRefreshBackoff(conn: any, nowMs: number): boolean {
  const until = conn?.providerSpecificData?.refreshCircuit?.until;
  if (typeof until !== "string") return false;
  const untilMs = new Date(until).getTime();
  return Number.isFinite(untilMs) && untilMs > nowMs;
}

export function buildRefreshFailureUpdate(conn: any, now: string) {
  const wasExpired = conn.testStatus === "expired";
  const retryCount = (conn.expiredRetryCount ?? 0) + (wasExpired ? 1 : 0);

  // Circuit breaker: increment the consecutive-failure streak and set an
  // exponential backoff window so the next sweep skips this connection instead
  // of retrying every 60s. Cleared by a successful refresh (clearRefreshCircuit).
  const prevStreak = conn.providerSpecificData?.refreshCircuit?.streak ?? 0;
  const streak = prevStreak + 1;

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
    providerSpecificData: {
      ...(conn.providerSpecificData || {}),
      refreshCircuit: { streak, until: getRefreshBackoffUntil(streak, now), lastFailAt: now },
    },
    ...(wasExpired ? { expiredRetryCount: retryCount, expiredRetryAt: now } : {}),
  };
}

/**
 * Strip the refresh circuit breaker state from providerSpecificData after a
 * successful refresh, so the streak/backoff resets cleanly.
 */
export function clearRefreshCircuit(
  providerSpecificData: Record<string, unknown> | null | undefined
): Record<string, unknown> | undefined {
  if (!providerSpecificData || typeof providerSpecificData !== "object") return undefined;
  if (!("refreshCircuit" in providerSpecificData)) return undefined;
  const next = { ...providerSpecificData };
  delete next.refreshCircuit;
  return next;
}

/**
 * Concurrent-check batch size for the sweep, read per-call (not at module
 * load) so tests — and operators — can override it via HEALTHCHECK_BATCH_SIZE
 * without restarting the process. #7719 hardcoded this to a module-level
 * `const BATCH_SIZE = 20`, silently dropping the configurability restored
 * here (#7875). Falls back to DEFAULT_BATCH_SIZE on a missing/invalid value.
 */
function getConfiguredBatchSize(): number {
  const configured = parseInt(process.env.HEALTHCHECK_BATCH_SIZE || "", 10);
  return Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_BATCH_SIZE;
}

function isEnvFlagEnabled(name: string): boolean {
  const value = process.env[name];
  if (!value) return false;
  return TRUE_ENV_VALUES.has(value.trim().toLowerCase());
}

function isHealthCheckDisabled(): boolean {
  return (
    isEnvFlagEnabled("OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK") ||
    isBuildProcess() ||
    isAutomatedTestProcess()
  );
}

/**
 * Providers excluded from the PROACTIVE sweep, comma-separated, case-insensitive
 * (e.g. "codex,openai"). Targeted alternative to OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK:
 * keeps rotating-token cascade providers (Codex/OpenAI share one Auth0 family) on the
 * reactive 401 path WITHOUT starving short-TTL providers (Kimi-coding) sweep-wide.
 */
function getHealthCheckSkipProviders(): Set<string> {
  const raw = process.env.OMNIROUTE_HEALTHCHECK_SKIP_PROVIDERS || "";
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
}

// ── Logging helper ───────────────────────────────────────────────────────────
let cachedHideLogs: boolean | null = null;
let cacheTimestamp = 0;
let pendingHideLogs: Promise<boolean> | null = null;
const CACHE_TTL = 30_000; // Cache settings for 30 seconds

async function shouldHideLogs(): Promise<boolean> {
  if (
    isEnvFlagEnabled("OMNIROUTE_HIDE_HEALTHCHECK_LOGS") ||
    isBuildProcess() ||
    isAutomatedTestProcess()
  ) {
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
    | { initialized: boolean; interval: ReturnType<typeof setInterval> | null; sweeping: boolean }
    | undefined;
}
function getHCState() {
  if (!globalThis.__omnirouteTokenHC) {
    globalThis.__omnirouteTokenHC = { initialized: false, interval: null, sweeping: false };
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

// ── Core sweep (batch concurrent) ──────────────────────────────────────────
export async function sweep() {
  const state = getHCState();
  if (state.sweeping) {
    return log(`${LOG_PREFIX} Sweep skipped — previous sweep still in progress`);
  }
  state.sweeping = true;
  try {
    const connections = await getProviderConnections({ authType: "oauth" });

    if (!connections || connections.length === 0) return;

    const staggerMs = parseInt(process.env.HEALTHCHECK_STAGGER_MS || "3000", 10);
    const total = connections.length;

    // Process connections in concurrent batches. Within a single batch
    // connections are checked concurrently (same-epoch start) so the array
    // is drained faster and the event loop can service requests between
    // batches. The inter-batch stagger preserves the original burst-
    // prevention intent (Issue #1220) while reducing total sweep time from
    // O(total × staggerMs) to O(total ÷ batchSize × staggerMs).
    const batchSize = Math.min(getConfiguredBatchSize(), total);
    for (let offset = 0; offset < total; offset += batchSize) {
      const batchEnd = Math.min(offset + batchSize, total);
      const batch: Array<Promise<void>> = [];

      for (let i = offset; i < batchEnd; i++) {
        const conn = connections[i];
        batch.push(
          checkConnection(conn).catch((err: Error) => {
            logError(`${LOG_PREFIX} Error checking ${conn.name || conn.id}:`, err.message);
          })
        );
      }

      await Promise.all(batch);

      // Stagger between batches (not between individual connections) to
      // prevent sustained bursting while reducing total sweep duration.
      if (batchEnd < total) {
        if (staggerMs > 0) {
          const jitterMin = parseInt(process.env.HEALTHCHECK_JITTER_MIN_MS || "500", 10);
          const jitterMax = parseInt(process.env.HEALTHCHECK_JITTER_MAX_MS || "5000", 10);
          const jitter = jitterMin + Math.random() * Math.max(0, jitterMax - jitterMin);
          await new Promise((resolve) => setTimeout(resolve, staggerMs + jitter));
        }
        // Yield a microtask so the event loop can service pending I/O
        // (DB contention, network responses) before the next batch starts.
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
  } catch (err) {
    logError(`${LOG_PREFIX} Sweep error:`, err.message);
  } finally {
    state.sweeping = false;
  }
}

/**
 * Check a single connection and refresh if due.
 */
export async function checkConnection(conn) {
  if (!conn?.id) return;

  const latestConnection = (await getCachedProviderConnectionById(conn.id)) || conn;
  conn = latestConnection;

  // Per-provider opt-out of proactive refresh (e.g. Codex/OpenAI cascade
  // providers) — their token stays on the reactive, serialized 401 path while
  // other providers keep being refreshed proactively.
  if (getHealthCheckSkipProviders().has(String(conn.provider || "").toLowerCase())) {
    return;
  }

  // Determine interval (0 = disabled)
  const intervalMin = conn.healthCheckInterval ?? DEFAULT_HEALTH_CHECK_INTERVAL_MIN;
  if (intervalMin <= 0) return;
  if (!conn.isActive) return;

  // #8182: skip terminal connections (credits_exhausted / banned / expired).
  // These can never self-heal via a token refresh — probing them wastes
  // CPU and network on every sweep cycle. Mirrors isTerminalConnectionStatus
  // in src/sse/services/auth.ts and TERMINAL_CONNECTION_STATUSES in
  // src/lib/quota/connectionRecovery.ts.
  const terminalStatuses = new Set(["credits_exhausted", "banned", "expired"]);
  if (typeof conn.testStatus === "string" && terminalStatuses.has(conn.testStatus.toLowerCase())) {
    return;
  }

  if (!conn.refreshToken || typeof conn.refreshToken !== "string") {
    if (isGitHubAccessTokenOnlyConnection(conn)) {
      const now = new Date().toISOString();
      const providerSpecificData = conn.providerSpecificData || {};
      const hasCopilotToken =
        typeof providerSpecificData.copilotToken === "string" &&
        providerSpecificData.copilotToken.trim().length > 0;
      const copilotExpiresAtMs = getCopilotTokenExpiryMs(
        providerSpecificData.copilotTokenExpiresAt
      );
      const copilotAboutToExpire =
        !hasCopilotToken ||
        !copilotExpiresAtMs ||
        copilotExpiresAtMs - Date.now() < TOKEN_EXPIRY_BUFFER;

      let refreshedProviderSpecificData: Record<string, unknown> | null = null;
      if (copilotAboutToExpire) {
        const hideLogs = await shouldHideLogs();
        const proxyResolution = await resolveProxyForConnection(conn.id);
        const proxyConfig = extractResolvedProxyConfig(proxyResolution);
        const healthCheckLog = {
          info: (tag: string, msg: string) => {
            if (!hideLogs) console.log(LOG_PREFIX, `[${tag}]`, msg);
          },
          warn: (tag: string, msg: string) => {
            if (!hideLogs) console.warn(LOG_PREFIX, `[${tag}]`, msg);
          },
          error: (tag: string, msg: string, extra?: Record<string, unknown>) => {
            if (!hideLogs) console.error(LOG_PREFIX, `[${tag}]`, msg, extra || "");
          },
        };

        const copilotResult = await refreshCopilotToken(
          conn.accessToken,
          healthCheckLog,
          proxyConfig
        );
        if (copilotResult?.token) {
          refreshedProviderSpecificData = {
            ...providerSpecificData,
            copilotToken: copilotResult.token,
            copilotTokenExpiresAt: copilotResult.expiresAt,
          };
        }
      }

      if (canClearGitHubNoRefreshTokenState(conn)) {
        await updateProviderConnection(conn.id, {
          lastHealthCheckAt: now,
          testStatus: "active",
          lastError:
            copilotAboutToExpire && !refreshedProviderSpecificData
              ? "Health check: Copilot token refresh failed"
              : null,
          lastErrorAt: copilotAboutToExpire && !refreshedProviderSpecificData ? now : null,
          lastErrorType:
            copilotAboutToExpire && !refreshedProviderSpecificData ? "token_refresh_failed" : null,
          lastErrorSource: copilotAboutToExpire && !refreshedProviderSpecificData ? "oauth" : null,
          errorCode:
            copilotAboutToExpire && !refreshedProviderSpecificData ? "refresh_failed" : null,
          expiredRetryCount: null,
          expiredRetryAt: null,
          ...(refreshedProviderSpecificData
            ? { providerSpecificData: refreshedProviderSpecificData }
            : {}),
        });
      } else {
        await updateProviderConnection(conn.id, {
          lastHealthCheckAt: now,
          ...(refreshedProviderSpecificData
            ? { providerSpecificData: refreshedProviderSpecificData }
            : {}),
        });
      }

      log(
        `${LOG_PREFIX} ${conn.provider}/${getConnectionLogLabel(conn)} has no refresh token but has a GitHub access token; keeping connection active`
      );
      return;
    }

    // #5326: a refresh-CAPABLE provider (e.g. antigravity/gemini) with no usable
    // refresh token can never self-heal via the sweep — it genuinely needs re-auth.
    // Silently skipping here left the row at testStatus="active" while the dashboard
    // badge (which derives expiry from tokenExpiresAt||expiresAt) showed a confusing
    // cosmetic "Token Expired". Surface reality as a terminal "expired" status instead.
    // Guard tightly so we do NOT clobber:
    //   - providers that simply don't use refresh tokens (supportsTokenRefresh=false)
    //   - connections already in a terminal/specific state (expired/banned/credits_exhausted)
    //   - transient cooldown state (unavailable) owned by the request path
    const refreshCapableNeedsReauth =
      supportsTokenRefresh(conn.provider) &&
      (!conn.testStatus || conn.testStatus === "active") &&
      !(conn.apiKey && conn.apiKey.length > 0); // API-key-only connections don't need refresh tokens
    if (refreshCapableNeedsReauth) {
      const now = new Date().toISOString();
      await updateProviderConnection(conn.id, {
        testStatus: "expired",
        lastHealthCheckAt: now,
        lastError: "No refresh token available — re-authenticate this account.",
        lastErrorAt: now,
        lastErrorType: "no_refresh_token",
        lastErrorSource: "oauth",
        errorCode: "no_refresh_token",
      });
      log(
        `${LOG_PREFIX} ${conn.provider}/${getConnectionLogLabel(conn)} has no refresh token; marking expired (needs re-auth)`
      );
    }
    return;
  }

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

  // Prefer expiry-driven refresh when the provider returns a concrete expiry timestamp.
  // Rotating-token providers such as Codex should not be refreshed on a fixed hourly
  // cadence while the access token is still valid for days.
  const tokenExpiresAt = getEffectiveTokenExpiryMs(conn);
  const hasKnownExpiry = tokenExpiresAt > 0;
  const isAboutToExpire = hasKnownExpiry && tokenExpiresAt - Date.now() < TOKEN_EXPIRY_BUFFER;

  // ROTATING_REFRESH_PROVIDERS — providers whose refresh_tokens are SINGLE-USE
  // (each refresh consumes the old one and returns a new one). For these, refreshing
  // on a fixed interval — instead of strictly on imminent expiry — burns rotations
  // unnecessarily AND can trigger Auth0's token family revocation (especially OpenAI
  // Codex). 9router did not have this background sweep; it was introduced in OmniRoute
  // and is the root cause of "adding account B invalidates account A" reports.
  // The interval path is kept ONLY for non-rotating providers where token state can
  // drift silently (e.g. cookie-based, opaque sessions without expires_at).
  const ROTATING_REFRESH_PROVIDERS = new Set([
    "codex",
    "openai",
    "kimi-coding",
    "cline",
    "kiro",
    "amazon-q",
    "gitlab-duo",
    "claude",
  ]);
  const isRotatingProvider = ROTATING_REFRESH_PROVIDERS.has(
    String(conn.provider || "").toLowerCase()
  );
  const shouldRefreshByInterval =
    !hasKnownExpiry && !isRotatingProvider && Date.now() - lastCheck >= intervalMs;

  if (!isAboutToExpire && !shouldRefreshByInterval) return;

  // Circuit breaker: if recent refreshes for this connection failed, wait out
  // the exponential backoff window instead of retrying every 60s tick. This is
  // what stops the refresh loop when getAccessToken keeps returning null
  // (dead proxy / network blip / unclassified upstream error).
  if (isInRefreshBackoff(conn, Date.now())) {
    return;
  }

  const reason = isAboutToExpire ? "token expiring soon" : `interval: ${intervalMin}min`;
  log(`${LOG_PREFIX} Refreshing ${conn.provider}/${getConnectionLogLabel(conn)} (${reason})`);

  const attemptedRefreshToken = conn.refreshToken;
  const attemptedAccessToken = conn.accessToken || null;
  const credentials = {
    connectionId: conn.id,
    refreshToken: attemptedRefreshToken,
    accessToken: attemptedAccessToken,
    expiresAt: getEffectiveTokenExpiryIso(conn),
    providerSpecificData: conn.providerSpecificData,
  };

  const hideLogs = await shouldHideLogs();
  const proxyResolution = await resolveProxyForConnection(conn.id);
  const proxyConfig = extractResolvedProxyConfig(proxyResolution);

  const healthCheckLog = {
    info: (tag: string, msg: string) => {
      if (!hideLogs) console.log(LOG_PREFIX, `[${tag}]`, msg);
    },
    warn: (tag: string, msg: string) => {
      if (!hideLogs) console.warn(LOG_PREFIX, `[${tag}]`, msg);
    },
    error: (tag: string, msg: string, extra?: Record<string, unknown>) => {
      if (!hideLogs) console.error(LOG_PREFIX, `[${tag}]`, msg, extra || "");
    },
  };

  // Pass onPersist so the DB write is atomic with the network call inside the mutex.
  // This prevents a concurrent sweep or request from reading stale credentials
  // and re-using an already-consumed rotating refresh token (Codex/OpenAI).
  type RefreshResultShape = {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: string;
    expiresIn?: number;
    providerSpecificData?: Record<string, unknown>;
  };
  type ConnectionUpdate = Parameters<typeof updateProviderConnection>[1];

  let persistedResult: RefreshResultShape | null = null;
  const result = await getAccessToken(
    conn.provider,
    credentials,
    healthCheckLog,
    proxyConfig,
    async (refreshResult: RefreshResultShape) => {
      const now = new Date().toISOString();
      const updateData: ConnectionUpdate = {
        accessToken: refreshResult.accessToken,
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
      if (refreshResult.refreshToken) {
        updateData.refreshToken = refreshResult.refreshToken;
      }
      if (refreshResult.expiresAt) {
        updateData.expiresAt = refreshResult.expiresAt;
        updateData.tokenExpiresAt = refreshResult.expiresAt;
      } else if (refreshResult.expiresIn) {
        const expiresAt = new Date(Date.now() + refreshResult.expiresIn * 1000).toISOString();
        updateData.expiresAt = expiresAt;
        updateData.tokenExpiresAt = expiresAt;
      }
      // Merge new providerSpecificData and ALWAYS clear the refresh circuit
      // breaker streak on a successful refresh.
      const mergedProviderData = {
        ...(conn.providerSpecificData || {}),
        ...(refreshResult.providerSpecificData || {}),
      };
      const clearedProviderData = clearRefreshCircuit(mergedProviderData);
      if (clearedProviderData !== undefined) {
        updateData.providerSpecificData = clearedProviderData;
      } else if (refreshResult.providerSpecificData) {
        updateData.providerSpecificData = mergedProviderData;
      }
      await updateProviderConnection(conn.id, updateData);
      persistedResult = refreshResult;
    }
  );

  const now = new Date().toISOString();

  // ─── Handle unrecoverable errors (e.g. refresh_token_reused) ───────────
  // OpenAI Codex uses rotating one-time-use refresh tokens.
  // Once used, the old token is permanently invalidated.
  // Retrying will never succeed → deactivate and stop the loop.
  if (isUnrecoverableRefreshError(result)) {
    const currentConnection = await getCachedProviderConnectionById(conn.id);
    const credentialsChangedSinceSweep =
      !!currentConnection &&
      (currentConnection.refreshToken !== attemptedRefreshToken ||
        (currentConnection.accessToken || null) !== attemptedAccessToken);

    if (credentialsChangedSinceSweep) {
      await updateProviderConnection(conn.id, {
        lastHealthCheckAt: now,
      });
      logWarn(
        `${LOG_PREFIX} ! ${conn.provider}/${getConnectionLogLabel(conn)} changed during refresh; skipping stale deactivation`
      );
      return;
    }

    const accessTokenStillValid =
      getEffectiveTokenExpiryMs(currentConnection || conn) > Date.now() + TOKEN_EXPIRY_BUFFER;

    if (accessTokenStillValid) {
      await updateProviderConnection(conn.id, {
        lastHealthCheckAt: now,
        testStatus: "active",
        lastError: `Health check refresh failed (${result.error}). Re-authenticate before the current access token expires.`,
        lastErrorAt: now,
        lastErrorType: result.error,
        lastErrorSource: "oauth",
        errorCode: result.error,
      });
      logWarn(
        `${LOG_PREFIX} ! ${conn.provider}/${getConnectionLogLabel(conn)} refresh token is invalid (${result.error}), but the current access token is still valid; keeping connection active`
      );
      return;
    }

    await updateProviderConnection(conn.id, {
      lastHealthCheckAt: now,
      testStatus: "expired",
      lastError: isRotatingProvider
        ? `Refresh token consumed (${result.error}). Please re-authenticate this account.`
        : `Refresh token rejected (${result.error}). Please re-authenticate this account.`,
      lastErrorAt: now,
      lastErrorType: result.error,
      lastErrorSource: "oauth",
      errorCode: result.error,
      isActive: false,
      // Only rotating-token providers (Codex/OpenAI/etc.) have single-use refresh
      // tokens that are genuinely consumed and worthless after a failed refresh, so
      // clearing them is safe. For non-rotating providers (Google: antigravity /
      // gemini) the stored refresh_token is the user's only recovery
      // artifact — nulling it caused #3679 (the connection reports "No valid refresh
      // token available" and can never recover even after re-activation). Preserve it.
      ...(isRotatingProvider ? { refreshToken: null } : {}),
    });
    logError(
      `${LOG_PREFIX} ✗ ${conn.provider}/${getConnectionLogLabel(conn)} — ` +
        `Refresh token is permanently invalid (${result.error}). ` +
        `Connection deactivated. Re-authenticate to restore.`
    );
    return;
  }

  if (result && result.accessToken) {
    // onPersist already wrote the core token fields atomically inside the mutex.
    // Only write the lastHealthCheckAt timestamp (and any fields onPersist may have
    // missed) here, to avoid a redundant full update that would race against another
    // concurrent refresh that already wrote fresh credentials.
    if (persistedResult) {
      await updateProviderConnection(conn.id, { lastHealthCheckAt: now });
    } else {
      // No onPersist (e.g. no connectionId — token-hash dedup path). Write all fields.
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

      if (result.expiresAt) {
        updateData.expiresAt = result.expiresAt;
        updateData.tokenExpiresAt = result.expiresAt;
      } else if (result.expiresIn) {
        const expiresAt = new Date(Date.now() + result.expiresIn * 1000).toISOString();
        updateData.expiresAt = expiresAt;
        updateData.tokenExpiresAt = expiresAt;
      }

      if (result.providerSpecificData) {
        updateData.providerSpecificData = {
          ...(conn.providerSpecificData || {}),
          ...result.providerSpecificData,
        };
      }

      await updateProviderConnection(conn.id, updateData);
    }
    log(`${LOG_PREFIX} ✓ ${conn.provider}/${getConnectionLogLabel(conn)} refreshed`);

    // ── GitHub Copilot sub-token refresh ──────────────────────────────────────
    // Extracted to tokenHealthCheckCopilot.ts to keep this file under the
    // frozen file-size budget. See that file's header comment for context.
    await refreshGithubCopilotSubTokenIfNeeded({
      conn,
      result,
      proxyConfig,
      healthCheckLog,
      log,
      logWarn,
      logError,
      getConnectionLogLabel,
      logPrefix: LOG_PREFIX,
    });
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
