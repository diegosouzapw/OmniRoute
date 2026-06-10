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
import { parseRetryAfterFromBody } from "./accountFallback.ts";
import { getProviderCategory } from "../config/providerRegistry.ts";
import { getCodexRateLimitKey } from "../executors/codex.ts";
import {
  DEFAULT_RESILIENCE_SETTINGS,
  resolveResilienceSettings,
  type RequestQueueSettings,
} from "../../src/lib/resilience/settings";

interface LearnedLimitEntry {
  provider: string;
  connectionId: string;
  lastUpdated: number;
  limit?: number;
  remaining?: number;
  minTime?: number;
}

interface LimiterUpdateSettings {
  maxConcurrent?: number | null;
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

function isNodeTestRunnerChild(): boolean {
  return typeof process.env.NODE_TEST_CONTEXT === "string";
}

function logRateLimit(...args: unknown[]): void {
  if (!isNodeTestRunnerChild()) console.log(...args);
}

function warnRateLimit(...args: unknown[]): void {
  if (!isNodeTestRunnerChild()) console.warn(...args);
}

function errorRateLimit(...args: unknown[]): void {
  if (!isNodeTestRunnerChild()) console.error(...args);
}

// Store limiters keyed by "provider:connectionId" (and optionally ":model")
const limiters = new Map<string, Bottleneck>();

// Store connections that have rate limit protection enabled
const enabledConnections = new Set<string>();

// Store per-connection rate limit overrides (RPM, TPM, TPD, minTime, maxConcurrent)
// Populated from provider_connections.rateLimitOverrides on startup and refresh.
const connectionRateLimitOverrides = new Map<string, Record<string, number>>();

// Store learned limits for persistence (debounced)
const learnedLimits: Record<string, LearnedLimitEntry> = {};
const MAX_LEARNED_LIMITS = 200;
const INACTIVE_LIMITER_MS = 10 * 60 * 1000;
const limiterLastUsed = new Map<string, number>();
let persistTimer: ReturnType<typeof setTimeout> | null = null;
const pendingAsyncOperations = new Set<Promise<unknown>>();
const PERSIST_DEBOUNCE_MS = 60_000; // Debounce persistence to every 60s max

// Track initialization
let initialized = false;

let currentRequestQueueSettings: RequestQueueSettings = DEFAULT_RESILIENCE_SETTINGS.requestQueue;

// Watchdog: detect Bottleneck limiters that are wedged (queue has work, but no
// jobs are dispatched). When the reservoir/refresh state desyncs from reality,
// this catches it and force-resets so traffic isn't stuck forever.
const lastDispatchAt = new Map<string, number>();
let watchdogInterval: ReturnType<typeof setInterval> | null = null;
const WATCHDOG_INTERVAL_MS = 30_000;
// Threshold has to exceed any *legitimate* gap between dispatches:
//  - default reservoirRefreshInterval is 60s
//  - adaptive minTime can climb to ~60s for 1-RPM providers (see updateFromHeaders)
// 120s gives a 2× margin against both, while still catching the actual wedge
// case we observed (queue stalled for 3+ minutes with no progress).
const WEDGE_THRESHOLD_MS = 120_000;

/**
 * Env-var override for the auto-enable safety net. Highest priority — wins
 * over the persisted dashboard setting. Use to disable in an incident without
 * needing dashboard access.
 *   RATE_LIMIT_AUTO_ENABLE=false  → never auto-enable
 *   RATE_LIMIT_AUTO_ENABLE=true   → force on regardless of dashboard
 *   (unset)                        → use dashboard setting
 */
function isAutoEnableActive(settings: RequestQueueSettings): boolean {
  const env = process.env.RATE_LIMIT_AUTO_ENABLE?.trim().toLowerCase();
  if (env === "false" || env === "0" || env === "off") return false;
  if (env === "true" || env === "1" || env === "on") return true;
  return settings.autoEnableApiKeyProviders;
}

// Sentinels for "no rate limit" / effectively infinite capacity. The reservoir
// value uses Number.MAX_SAFE_INTEGER so the bucket can never realistically be
// exhausted; maxConcurrent uses a smaller-but-still-vast ceiling since
// Bottleneck tracks concurrent jobs in memory and an unbounded number would
// risk internal counter overflow under sustained pressure.
const EFFECTIVELY_INFINITE = Number.MAX_SAFE_INTEGER;
const EFFECTIVELY_INFINITE_CONCURRENCY = 1000;

// Resolve an RPM override. 0 or missing means "infinite" (no rate cap).
function resolveRpm(override: number | undefined | null): number {
  return typeof override === "number" && override > 0 ? override : EFFECTIVELY_INFINITE;
}

// Resolve a minTime override. 0 or missing means "no minimum gap".
function resolveMinTime(override: number | undefined | null): number {
  return typeof override === "number" && override > 0 ? override : 0;
}

// Resolve a maxConcurrent override. 0 or missing means "effectively infinite".
function resolveMaxConcurrent(override: number | undefined | null): number {
  return typeof override === "number" && override > 0
    ? override
    : EFFECTIVELY_INFINITE_CONCURRENCY;
}

function buildLimiterDefaults() {
  // 0 or missing values mean "infinite" / no rate limit applies. This treats
  // the global request-queue settings the same way per-connection overrides
  // are interpreted (see resolveRpm / resolveMinTime / resolveMaxConcurrent).
  return {
    maxConcurrent: resolveMaxConcurrent(currentRequestQueueSettings.concurrentRequests),
    minTime: resolveMinTime(currentRequestQueueSettings.minTimeBetweenRequestsMs),
    reservoir: resolveRpm(currentRequestQueueSettings.requestsPerMinute),
    reservoirRefreshAmount: resolveRpm(currentRequestQueueSettings.requestsPerMinute),
    reservoirRefreshInterval: 60 * 1000,
  };
}

function updateAllLimiterSettings() {
  for (const limiter of limiters.values()) {
    limiter.updateSettings({
      maxConcurrent: currentRequestQueueSettings.concurrentRequests,
      minTime: currentRequestQueueSettings.minTimeBetweenRequestsMs,
      reservoir: currentRequestQueueSettings.requestsPerMinute,
      reservoirRefreshAmount: currentRequestQueueSettings.requestsPerMinute,
      reservoirRefreshInterval: 60 * 1000,
    });
  }
}

function reconcileEnabledConnections(
  connectionsRaw: unknown[],
  requestQueueSettings: RequestQueueSettings
) {
  const nextEnabledConnections = new Set<string>();
  let explicitCount = 0;
  let autoCount = 0;

  for (const connRaw of connectionsRaw) {
    const conn = toRecord(connRaw);
    const connectionId = typeof conn.id === "string" ? conn.id : "";
    const provider = typeof conn.provider === "string" ? conn.provider : "";
    const isActive = conn.isActive === true;
    const rateLimitProtection = conn.rateLimitProtection === true;
    if (!connectionId || !provider) continue;

    if (rateLimitProtection) {
      nextEnabledConnections.add(connectionId);
      explicitCount++;
      continue;
    }

    if (
      isAutoEnableActive(requestQueueSettings) &&
      getProviderCategory(provider) === "apikey" &&
      isActive
    ) {
      nextEnabledConnections.add(connectionId);
      autoCount++;

      // Route through getLimiter so the `queued`/`executing` listeners and
      // lastDispatchAt heartbeat are wired up — otherwise the watchdog sees
      // `stalledMs = now - 0` and falsely flags healthy idle limiters as wedged.
      getLimiter(provider, connectionId);
    }
  }

  for (const connectionId of Array.from(enabledConnections)) {
    if (!nextEnabledConnections.has(connectionId)) {
      disableRateLimitProtection(connectionId);
    }
  }

  for (const connectionId of nextEnabledConnections) {
    enabledConnections.add(connectionId);
  }

  return {
    explicitCount,
    autoCount,
  };
}

function watchdogTick() {
  const now = Date.now();
  // Clean up idle limiters that haven't been used recently
  for (const [key, limiter] of Array.from(limiters)) {
    const lastUsed = limiterLastUsed.get(key) ?? 0;
    if (now - lastUsed > INACTIVE_LIMITER_MS) {
      const counts = limiter.counts();
      if (counts.QUEUED === 0 && counts.RUNNING === 0 && counts.EXECUTING === 0) {
        limiters.delete(key);
        lastDispatchAt.delete(key);
        limiterLastUsed.delete(key);
        logRateLimit(`🧹 [RATE-LIMIT] Evicting idle limiter: ${key} (inactive for ${Math.round((now - lastUsed) / 1000)}s)`);
        trackAsyncOperation(limiter.disconnect());
      }
    }
  }
  for (const [key, limiter] of Array.from(limiters)) {
    const counts = limiter.counts();
    if (counts.QUEUED === 0) continue;
    if (counts.RUNNING > 0 || counts.EXECUTING > 0) continue;
    const lastDispatch = lastDispatchAt.get(key);
    // No heartbeat yet → seed it and skip this tick. Prevents false wedge
    // detection on a brand-new limiter or one created outside getLimiter.
    if (lastDispatch === undefined) {
      lastDispatchAt.set(key, now);
      continue;
    }
    const stalledMs = now - lastDispatch;
    if (stalledMs < WEDGE_THRESHOLD_MS) continue;

    warnRateLimit(
      `🚨 [RATE-LIMIT] WEDGED: ${key} queued=${counts.QUEUED} running=0 executing=0 stalled=${stalledMs}ms — force-resetting`
    );
    limiters.delete(key);
    lastDispatchAt.delete(key);
    limiterLastUsed.delete(key);
    // Do NOT call limiter.stop() — it permanently rejects future .schedule() calls with
    // "This limiter has been stopped". In-flight requests still holding a reference to
    // the old instance cannot be redirected to a new one, causing spurious 502 bursts.
    // Call disconnect() (not stop()) to release Bottleneck's internal heartbeat timer
    // without poisoning the queue for any remaining in-flight jobs. This prevents the
    // heartbeat-timer memory leak observed when many limiters are evicted at runtime.
    // getLimiter() lazily allocates a fresh Bottleneck on the next call.
    trackAsyncOperation(limiter.disconnect());
  }
}

let shutdownHandlersRegistered = false;

export function startRateLimitWatchdog(): void {
  if (watchdogInterval) return;
  watchdogInterval = setInterval(watchdogTick, WATCHDOG_INTERVAL_MS);
  watchdogInterval.unref?.();
  // Register SIGTERM/SIGINT shutdown handlers once, lazily, on first watchdog start.
  // Registering here (rather than at module load) avoids interfering with test runner
  // subprocess IPC teardown — the test suite does not call startRateLimitWatchdog().
  if (!shutdownHandlersRegistered) {
    shutdownHandlersRegistered = true;
    process.once("SIGTERM", shutdownLimiters);
    process.once("SIGINT", shutdownLimiters);
  }
}

export function stopRateLimitWatchdog(): void {
  if (!watchdogInterval) return;
  clearInterval(watchdogInterval);
  watchdogInterval = null;
}

/**
 * Gracefully stop all limiters for process shutdown.
 * ONLY call this from SIGTERM/SIGINT handlers — not during runtime resets.
 * Calling .stop() during runtime (e.g. on 429 or connection disable) permanently
 * rejects future .schedule() calls, causing 502 bursts. This function is the
 * sole legitimate use of limiter.stop() in this module.
 */
function shutdownLimiters(): void {
  for (const limiter of limiters.values()) {
    limiter.stop({ dropWaitingJobs: false });
  }
  limiters.clear();
  lastDispatchAt.clear();
  limiterLastUsed.clear();
}

// Only register shutdown handlers when there are active limiters to shut down.
// Guard with once() so repeated registrations (e.g. test resets) don't stack.
// Note: these are registered lazily in startRateLimitWatchdog() to avoid
// interfering with test runner subprocess IPC teardown.

function trackAsyncOperation<T>(promise: Promise<T>): Promise<T> {
  pendingAsyncOperations.add(promise);
  // Do not use a fire-and-forget `.finally()` here: it creates a derived
  // Promise that mirrors rejections from `promise`. When the caller intentionally
  // tracks a background cleanup without awaiting it, that derived Promise can be
  // reported as an unhandled rejection during Node's test-runner IPC teardown.
  void promise.then(
    () => {
      pendingAsyncOperations.delete(promise);
    },
    () => {
      pendingAsyncOperations.delete(promise);
    }
  );
  return promise;
}

/**
 * Initialize rate limit protection from persisted connection settings.
 * Called once on app startup.
 */
export async function initializeRateLimits() {
  if (initialized) return;
  initialized = true;

  try {
    const { getProviderConnections, getSettings } = await import("@/lib/localDb");
    const [connections, settings] = await Promise.all([getProviderConnections(), getSettings()]);
    const resilience = resolveResilienceSettings(settings);
    currentRequestQueueSettings = { ...resilience.requestQueue };
    const { explicitCount, autoCount } = reconcileEnabledConnections(
      connections as unknown[],
      currentRequestQueueSettings
    );
    updateAllLimiterSettings();

    // Load per-connection rate limit overrides
    connectionRateLimitOverrides.clear();
    for (const conn of connections as Array<Record<string, unknown>>) {
      const overrides = conn.rateLimitOverrides;
      if (overrides && typeof overrides === "object" && !Array.isArray(overrides)) {
        connectionRateLimitOverrides.set(String(conn.id), overrides as Record<string, number>);
      }
    }

    if (explicitCount > 0 || autoCount > 0) {
      logRateLimit(
        `🛡️ [RATE-LIMIT] Loaded ${explicitCount} explicit + ${autoCount} auto-enabled protection(s)`
      );
    }

    // Load persisted learned limits
    await loadPersistedLimits();

    // Watchdog runs unconditionally — cheap, only fires when something is
    // actually wedged.
    startRateLimitWatchdog();
  } catch (err) {
    errorRateLimit("[RATE-LIMIT] Failed to load settings:", err.message);
  }
}

export async function applyRequestQueueSettings(nextSettings: RequestQueueSettings) {
  currentRequestQueueSettings = { ...nextSettings };
  const { getProviderConnections } = await import("@/lib/localDb");
  const connections = await getProviderConnections();
  reconcileEnabledConnections(connections as unknown[], currentRequestQueueSettings);
  updateAllLimiterSettings();
}

/**
 * Get or create a limiter for a given provider+connection combination
 */
export function enableRateLimitProtection(connectionId) {
  enabledConnections.add(connectionId);
}

/**
 * Disable rate limit protection for a connection
 */
export function disableRateLimitProtection(connectionId) {
  enabledConnections.delete(connectionId);
  // Evict limiters for this connection from the cache. Do NOT call limiter.stop() —
  // it permanently rejects future .schedule() calls with "This limiter has been stopped",
  // and in-flight requests holding a reference to the old instance would fail with 502.
  // Call disconnect() (not stop()) to release Bottleneck's internal heartbeat timer
  // without permanently poisoning the instance for any remaining in-flight jobs.
  // Eviction-only would leak the heartbeat timer until GC; disconnect() releases it
  // synchronously so the runtime memory footprint stays flat under heavy connection churn.
  // .stop() is reserved exclusively for SIGTERM/SIGINT shutdown (see shutdownLimiters).
  for (const [key, limiter] of Array.from(limiters)) {
    if (key.includes(connectionId)) {
      limiters.delete(key);
      lastDispatchAt.delete(key);
      limiterLastUsed.delete(key);
      trackAsyncOperation(limiter.disconnect());
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
 * Refresh per-connection rate limit overrides.
 *
 * Called after a PATCH update to `rateLimitOverrides` on a provider connection.
 * Updates the in-memory map and evicts existing Bottleneck limiters for the
 * connection so the next request gets a fresh limiter with the new settings.
 *
 * @param {string} connectionId
 * @param {Record<string, number> | null} overrides - New overrides (null/undefined clears)
 */
export function refreshConnectionRateLimits(connectionId, overrides) {
  if (overrides === null || overrides === undefined) {
    connectionRateLimitOverrides.delete(connectionId);
  } else {
    connectionRateLimitOverrides.set(connectionId, overrides);
  }
  // Evict limiters referencing this connection so they get recreated on next use
  for (const [key, limiter] of Array.from(limiters)) {
    if (key.includes(connectionId)) {
      limiters.delete(key);
      lastDispatchAt.delete(key);
      limiterLastUsed.delete(key);
      trackAsyncOperation(limiter.disconnect());
    }
  }
}

/**
 * Get or create a limiter for a given provider+connection combination
 */
function getLimiterKey(provider, connectionId, model = null) {
  if (provider === "codex" && model) {
    return `${provider}:${getCodexRateLimitKey(connectionId, model)}`;
  }
  // Gemini AI Studio and GitHub Copilot have per-model quotas — use model-scoped
  // limiter keys so a 429 on one model doesn't pause requests for other models.
  if ((provider === "gemini" || provider === "github") && model) {
    return `${provider}:${connectionId}:${model}`;
  }
  return `${provider}:${connectionId}`;
}

function getLimiter(provider, connectionId, model = null) {
  const key = getLimiterKey(provider, connectionId, model);

  if (!limiters.has(key)) {
    const defaults = buildLimiterDefaults();
    const overrides = connectionRateLimitOverrides.get(connectionId);
    if (overrides) {
      // 0 (or missing) means "no override — fall through to buildLimiterDefaults()".
      // Without this guard, an rpm of 0 sets reservoir=0, which Bottleneck treats
      // as "depleted" and blocks ALL requests indefinitely. Treating 0 as "use
      // default" lets users effectively disable per-connection limits without
      // globally raising the system default.
      if (typeof overrides.maxConcurrent === "number" && overrides.maxConcurrent > 0) {
        defaults.maxConcurrent = overrides.maxConcurrent;
      }
      if (typeof overrides.minTime === "number" && overrides.minTime > 0) {
        defaults.minTime = overrides.minTime;
      }
      if (typeof overrides.rpm === "number" && overrides.rpm > 0) {
        defaults.reservoir = overrides.rpm;
        defaults.reservoirRefreshAmount = overrides.rpm;
        defaults.reservoirRefreshInterval = 60 * 1000;
      }
      // TODO: TPM/TPD integration — requires a token-bucket vs request-bucket
      // separation (Bottleneck's reservoir is request-count, not token-count).
      // When added, treat 0/missing the same way: fall through to system default.
    }
    const limiter = new Bottleneck({
      ...defaults,
      id: key,
    });
    // Heartbeat: timestamp every dispatch so the watchdog can tell a healthy
    // queue (just dispatched a job) from a wedged one (queue has work but
    // nothing has been dispatched in a while).
    limiter.on("executing", () => {
      lastDispatchAt.set(key, Date.now());
    });

    limiters.set(key, limiter);
    lastDispatchAt.set(key, Date.now());
    limiterLastUsed.set(key, Date.now());
  }

  limiterLastUsed.set(key, Date.now());
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
 * @param {AbortSignal} signal - Optional abort signal to cancel waiting
 * @returns {Promise<unknown>} Result of fn()
 */
export async function withRateLimit(provider, connectionId, model, fn, signal = null) {
  if (!enabledConnections.has(connectionId)) {
    return fn();
  }

  if (signal?.aborted) {
    const reason = signal.reason;
    if (reason instanceof Error) throw reason;
    const err = new Error(typeof reason === "string" ? reason : "The operation was aborted");
    err.name = "AbortError";
    throw err;
  }

  const limiter = getLimiter(provider, connectionId, model);
  const maxWaitMs = currentRequestQueueSettings.maxWaitMs;
  const scheduleOpts = maxWaitMs && maxWaitMs > 0 ? { expiration: maxWaitMs } : {};

  try {
    if (signal) {
      let abortListener: (() => void) | undefined;
      const abortPromise = new Promise<never>((_, reject) => {
        const onAbort = () => {
          const reason = signal.reason;
          const err =
            reason instanceof Error
              ? reason
              : new Error(typeof reason === "string" ? reason : "The operation was aborted");
          err.name = "AbortError";
          reject(err);
        };
        if (signal.aborted) {
          onAbort();
          return;
        }
        abortListener = onAbort;
        signal.addEventListener("abort", abortListener, { once: true });
      });

      try {
        return await Promise.race([limiter.schedule(scheduleOpts, fn), abortPromise]);
      } finally {
        if (abortListener) {
          signal.removeEventListener("abort", abortListener);
        }
      }
    } else {
      return await limiter.schedule(scheduleOpts, fn);
    }
  } catch (err) {
    // Bottleneck throws when a job exceeds its expiration timeout.
    // Surface as a clear rate-limit timeout so callers can fallback.
    if (err?.message?.includes("This job timed out")) {
      const key = getLimiterKey(provider, connectionId, model);
      logRateLimit(
        `⏰ [RATE-LIMIT] ${key} — job expired after ${Math.ceil((maxWaitMs || 0) / 1000)}s in queue, dropping`
      );
    }
    throw err;
  }
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

function toPlainHeaders(headers: unknown): Record<string, string> {
  if (!headers) return {};
  const plain: Record<string, string> = {};
  const obj = headers as Record<string, unknown>;
  if (typeof obj.forEach === "function") {
    try {
      (obj.forEach as (cb: (v: string, k: string) => void) => void)((v: string, k: string) => {
        plain[k.toLowerCase()] = v;
      });
      return plain;
    } catch {}
  }
  if (typeof obj.entries === "function") {
    try {
      for (const [k, v] of (obj.entries as () => Iterable<[string, string]>)()) {
        plain[k.toLowerCase()] = v;
      }
      return plain;
    } catch {}
  }
  try {
    for (const [k, v] of Object.entries(obj)) {
      plain[k.toLowerCase()] = v == null ? "" : String(v);
    }
  } catch {}
  return plain;
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

  const plainHeaders = toPlainHeaders(headers);
  const limiter = getLimiter(provider, connectionId, model);
  const headerMap =
    provider === "claude" || provider === "anthropic" ? ANTHROPIC_HEADERS : STANDARD_HEADERS;

  // Get header values (handle both Headers object and plain object)
  const getHeader = (name: string) => {
    return plainHeaders[name.toLowerCase()] || null;
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
    logRateLimit(
      `🚫 [RATE-LIMIT] ${provider}:${connectionId.slice(0, 8)} — 429 received, pausing for ${Math.ceil(retryAfterMs / 1000)}s, dropping ${counts.QUEUED} queued request(s)`
    );

    // Evict from the cache so follow-up learning from the same error body
    // can materialize a fresh limiter immediately. Do NOT call limiter.stop() —
    // it permanently rejects future .schedule() calls with "This limiter has been stopped".
    // In-flight requests holding a reference to the evicted instance will fail (they
    // were already going to fail — the 429 means the API rejected them), but future
    // requests will get a fresh Bottleneck instance via getLimiter().
    // Call disconnect() (not stop()) to release Bottleneck's internal heartbeat timer
    // without permanently poisoning the instance for any remaining in-flight jobs.
    // Without disconnect() here, every 429 leaks a heartbeat timer until GC reclaims
    // the abandoned Bottleneck; under sustained quota pressure that is a real leak.
    limiters.delete(limiterKey);
    lastDispatchAt.delete(limiterKey);
    limiterLastUsed.delete(limiterKey);
    trackAsyncOperation(limiter.disconnect());
    return;
  }

  // Handle "over limit" soft warning (Fireworks)
  if (overLimit === "yes") {
    logRateLimit(
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
        logRateLimit(
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

async function persistLearnedLimitsNow() {
  try {
    const { updateSettings } = await import("@/lib/db/settings");
    await updateSettings({ learnedRateLimits: JSON.stringify(learnedLimits) });
    logRateLimit(
      `💾 [RATE-LIMIT] Persisted learned limits for ${Object.keys(learnedLimits).length} provider(s)`
    );
  } catch (err) {
    errorRateLimit("[RATE-LIMIT] Failed to persist learned limits:", err.message);
  }
}

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
      await trackAsyncOperation(persistLearnedLimitsNow());
    }, PERSIST_DEBOUNCE_MS);
  }
}

export async function __flushLearnedLimitsForTests() {
  if (persistTimer) {
    clearTimeout(persistTimer);
    persistTimer = null;
  }
  await trackAsyncOperation(persistLearnedLimitsNow());
  if (pendingAsyncOperations.size > 0) {
    await Promise.allSettled(Array.from(pendingAsyncOperations));
  }
}

export async function __resetRateLimitManagerForTests() {
  if (persistTimer) {
    clearTimeout(persistTimer);
    persistTimer = null;
  }

  // Collect and await all disconnect() Promises so Bottleneck's internal
  // yieldLoop(0) calls settle before the next test starts. Not awaiting
  // these can cause the Node.js test runner IPC channel to receive a
  // corrupted message when the pending Promise fires during IPC serialization.
  const disconnectPromises: Promise<unknown>[] = [];
  for (const limiter of limiters.values()) {
    disconnectPromises.push(limiter.disconnect());
  }
  limiters.clear();
  enabledConnections.clear();
  initialized = false;
  lastDispatchAt.clear();
  limiterLastUsed.clear();
  shutdownHandlersRegistered = false;

  for (const key of Object.keys(learnedLimits)) {
    delete learnedLimits[key];
  }

  if (pendingAsyncOperations.size > 0) {
    await Promise.allSettled(Array.from(pendingAsyncOperations));
  }
  if (disconnectPromises.length > 0) {
    await Promise.allSettled(disconnectPromises);
  }
}

export async function __getLimiterStateForTests(provider, connectionId, model = null) {
  const key = getLimiterKey(provider, connectionId, model);
  const limiter = limiters.get(key);
  if (!limiter) return null;

  const counts = limiter.counts();
  const reservoir = await limiter.currentReservoir();
  return {
    key,
    reservoir,
    queued: counts.QUEUED || 0,
    running: counts.RUNNING || 0,
    executing: counts.EXECUTING || 0,
    done: counts.DONE || 0,
  };
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
      logRateLimit(`📥 [RATE-LIMIT] Restored ${count} learned rate limit(s) from persistence`);
    }
  } catch (err) {
    errorRateLimit("[RATE-LIMIT] Failed to load persisted limits:", err.message);
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
    const limiter = getLimiter(provider, connectionId, model);
    logRateLimit(
      `🚫 [RATE-LIMIT] ${provider}:${connectionId.slice(0, 8)} — body-parsed retry: ${Math.ceil(retryAfterMs / 1000)}s (${reason})`
    );

    limiter.updateSettings({
      reservoir: 0,
      reservoirRefreshAmount: 60,
      reservoirRefreshInterval: retryAfterMs,
    });
  }
}
