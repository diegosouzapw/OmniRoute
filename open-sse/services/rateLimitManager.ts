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
import { getAntigravityQuotaFamily } from "./antigravityQuotaFamily.ts";
import { getProviderCategory } from "../config/providerRegistry.ts";
import { getCodexRateLimitKey } from "../executors/codex.ts";
import {
  getProviderDefaultRateLimit,
  setProviderQuotaOverrides,
} from "./providerDefaultRateLimit.ts";
import { keyContainsConnection, RollingRpmGate } from "./rollingRpmGate.ts";
import { toNumber } from "@/shared/utils/numeric";
import {
  DEFAULT_RESILIENCE_SETTINGS,
  resolveResilienceSettings,
  type RequestQueueSettings,
} from "../../src/lib/resilience/settings";
import {
  STANDARD_HEADERS,
  ANTHROPIC_HEADERS,
  parseResetTime,
  toPlainHeaders,
} from "./rateLimitManager/headers";
import { checkQueueAdmission } from "./rateLimitManager/admission";

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
}

type JsonRecord = Record<string, unknown>;
type QueueTimeoutReason = "local-queue" | "upstream-cooldown";

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function createQueueTimeoutError(
  provider: string,
  model: string | null,
  maxWaitMs: number,
  reason: QueueTimeoutReason = "local-queue",
  cause?: unknown
) {
  const target = model ? `${provider}/${model}` : provider;
  const message =
    reason === "upstream-cooldown"
      ? `Request dropped after waiting ${maxWaitMs}ms for an upstream rate-limit cooldown for ${target}. ` +
        `The provider cooldown outlasted OmniRoute's local wait budget; this is not local queue saturation.`
      : `Request dropped after exceeding the local rate-limit queue budget maxWaitMs (${maxWaitMs}ms) for ` +
        `${target} — this is OmniRoute's request queue ` +
        `(resilienceSettings.requestQueue.maxWaitMs), not an upstream timeout. Raise it in ` +
        `Settings → Resilience if this is queue saturation rather than a slow provider.`;
  const queueErr = new Error(message, cause === undefined ? undefined : { cause }) as Error & {
    code?: string;
  };
  queueErr.code = "RATE_LIMIT_QUEUE_TIMEOUT";
  return queueErr;
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
// jobs are dispatched). RPM admission happens before Bottleneck, so a queued
// Bottleneck job with no active work is a concurrency scheduler failure.
const lastDispatchAt = new Map<string, number>();
let nextJobTraceId = 1;
let watchdogInterval: ReturnType<typeof setInterval> | null = null;
const WATCHDOG_INTERVAL_MS = 30_000;
// Threshold has to exceed any legitimate gap caused by adaptive minTime while
// still catching the actual wedge case we observed (queue stalled for 3+
// minutes with no progress).
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

// Bottleneck handles concurrency and pacing. RPM is enforced by the rolling
// lease limiter above rather than by a fixed-window reservoir.
const EFFECTIVELY_INFINITE_CONCURRENCY = 1000;

// Resolve a minTime override. 0 or missing means "no minimum gap".
function resolveMinTime(override: number | undefined | null): number {
  return typeof override === "number" && override > 0 ? override : 0;
}

// Resolve a maxConcurrent override. 0 or missing means "effectively infinite".
function resolveMaxConcurrent(override: number | undefined | null): number {
  return typeof override === "number" && override > 0 ? override : EFFECTIVELY_INFINITE_CONCURRENCY;
}

function buildLimiterDefaults() {
  return {
    maxConcurrent: resolveMaxConcurrent(currentRequestQueueSettings.concurrentRequests),
    minTime: resolveMinTime(currentRequestQueueSettings.minTimeBetweenRequestsMs),
  };
}

/**
 * Apply new settings to a Bottleneck limiter and re-arm its reservoir-refresh
 * heartbeat.
 *
 * Bottleneck 2.19.5 (frozen upstream dependency, no release since 2019) has a
 * bug in `LocalDatastore#_startHeartbeat()`
 * (node_modules/bottleneck/lib/LocalDatastore.js:29,56): the guard
 * `if (this.heartbeat == null && ...)` only (re)creates the periodic
 * reservoir-refresh interval the FIRST time it runs. Every later call —
 * including the one `updateSettings()` itself triggers internally — falls
 * into the `else` branch and does `clearInterval(this.heartbeat)` WITHOUT
 * resetting `this.heartbeat` back to `null`. Because the stale reference is
 * left in place, every future `_startHeartbeat()` call keeps taking the same
 * dead `else` branch: the periodic reservoir refresh is gone forever after
 * the FIRST manual `updateSettings()` call on a limiter — every limiter here
 * starts with a live heartbeat (buildLimiterDefaults() always sets
 * reservoirRefreshInterval/reservoirRefreshAmount), so that "first call" is
 * whichever of the 5 updateSettings() call sites in this file runs first.
 *
 * Work around it here instead of patching node_modules: null out the stale
 * reference ourselves and re-invoke `_startHeartbeat()` so it takes the
 * "start a fresh interval" branch again. Every `limiter.updateSettings(...)`
 * call in this file MUST go through this helper, never Bottleneck's method
 * directly.
 */
async function applyLimiterSettings(
  limiter: Bottleneck,
  updates: Bottleneck.ConstructorOptions
): Promise<void> {
  await limiter.updateSettings(updates);
  const store = (
    limiter as unknown as {
      _store?: {
        heartbeat?: ReturnType<typeof setInterval> | null;
        _startHeartbeat?: () => void;
      };
    }
  )._store;
  if (store && typeof store._startHeartbeat === "function") {
    if (store.heartbeat != null) clearInterval(store.heartbeat);
    store.heartbeat = null;
    store._startHeartbeat();
  }
}

async function updateAllLimiterSettings() {
  const defaults = buildLimiterDefaults();
  await Promise.all(
    Array.from(limiters.values(), (limiter) => applyLimiterSettings(limiter, defaults))
  );
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
  rpmGate.cleanupExpired(now);
  // Clean up idle limiters that haven't been used recently
  for (const [key, limiter] of Array.from(limiters)) {
    const lastUsed = limiterLastUsed.get(key) ?? 0;
    if (now - lastUsed > INACTIVE_LIMITER_MS) {
      const counts = limiter.counts();
      if (
        counts.RECEIVED === 0 &&
        counts.QUEUED === 0 &&
        counts.RUNNING === 0 &&
        counts.EXECUTING === 0
      ) {
        limiters.delete(key);
        lastDispatchAt.delete(key);
        limiterLastUsed.delete(key);
        logRateLimit(
          `🧹 [RATE-LIMIT] Evicting idle limiter: ${key} (inactive for ${Math.round((now - lastUsed) / 1000)}s)`
        );
        trackAsyncOperation(limiter.disconnect());
      }
    }
  }
  for (const [key, limiter] of Array.from(limiters)) {
    const counts = limiter.counts();
    // RECEIVED-only work is still active and must not be evicted. Once a job
    // is stably queued, Bottleneck reports it in QUEUED with RECEIVED=0; that
    // is the state the wedge detector is designed to recover.
    if (counts.RECEIVED > 0 || counts.QUEUED === 0) continue;
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
      `🚨 [RATE-LIMIT] WEDGED: ${key} received=${counts.RECEIVED} queued=${counts.QUEUED} running=0 executing=0 stalled=${stalledMs}ms — force-resetting`
    );
    // Live incident (log id 1784465227489-a2cbc0): disconnect() releases the
    // heartbeat timer but does NOT reject the QUEUED jobs already sitting on
    // this instance — withRateLimit's `limiter.schedule()` for those callers
    // then just hangs forever (nothing will ever dequeue them; getLimiter()
    // only hands out a FRESH instance to future callers), leaving the
    // dispatch orphaned until the outer ~300s per-target timeout eventually
    // aborts it. Real clients routinely give up (and retry) well before that
    // — this specific incident's client aborted at ~60s having never reached
    // the provider at all (queued=2 running=0 executing=0 the entire time).
    //
    // stop({ dropWaitingJobs: true }) rejects exactly the RECEIVED/QUEUED/
    // RUNNING jobs on THIS instance immediately (Bottleneck's own contract —
    // see node_modules/bottleneck/bottleneck.d.ts StopOptions) so those
    // withRateLimit() callers reject right away instead of hanging, letting
    // combo's fallback/cooldown-wait engage within seconds instead of minutes.
    // This is safe against the previously-documented "spurious 502 bursts"
    // concern: the wedge condition checked above already requires
    // RUNNING === 0 && EXECUTING === 0, so no job that's actually progressing
    // can be caught by this — only ones already confirmed stuck. The instance
    // is deleted from `limiters` synchronously (above) before this call, so
    // no future getLimiter() call can ever hand out this now-stopped instance
    // — the "permanently rejects future .schedule()" behavior stop() has is
    // therefore moot; nothing will call .schedule() on it again.
    evictWedgeLimiter(key, limiter);
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

export function __installLimiterForTests(
  provider: string,
  connectionId: string,
  limiter: Bottleneck,
  model = null
): void {
  const key = getLimiterKey(provider, connectionId, model);
  limiters.set(key, limiter);
  lastDispatchAt.set(key, Date.now());
  limiterLastUsed.set(key, Date.now());
}

export function __runRateLimitWatchdogForTests(): void {
  watchdogTick();
}

export function __getLimiterForTests(provider: string, connectionId: string, model = null) {
  return getLimiter(provider, connectionId, model);
}

export function __setLastDispatchAtForTests(
  provider: string,
  connectionId: string,
  model: string | null,
  timestamp: number
): void {
  lastDispatchAt.set(getLimiterKey(provider, connectionId, model), timestamp);
}

function evictWedgeLimiter(key: string, limiter: Bottleneck): void {
  if (limiters.get(key) !== limiter) return;
  evictLimiterAndDropQueued(key, limiter, "rate-limit-watchdog-wedge-reset");
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
    const { getCachedProviderConnections, getSettings } = await import("@/lib/localDb");
    const [connections, settings] = await Promise.all([
      getCachedProviderConnections(),
      getSettings(),
    ]);
    const resilience = resolveResilienceSettings(settings);
    currentRequestQueueSettings = { ...resilience.requestQueue };
    // #6846 Phase 1: operator overrides for header-less providers' static RPM
    // budget + concurrency cap (nvidia today). No-op for every provider without
    // an entry in either providerQuotaOverrides or PROVIDER_DEFAULT_RATE_LIMITS.
    setProviderQuotaOverrides(resilience.providerQuotaOverrides);

    // Load per-connection rate limit overrides before reconciliation can create
    // any limiter. The RPM gate reads these overrides at admission time, and
    // Bottleneck still needs the non-RPM connection settings immediately.
    connectionRateLimitOverrides.clear();
    for (const conn of connections as Array<Record<string, unknown>>) {
      const overrides = conn.rateLimitOverrides;
      if (overrides && typeof overrides === "object" && !Array.isArray(overrides)) {
        connectionRateLimitOverrides.set(String(conn.id), overrides as Record<string, number>);
      }
    }

    const { explicitCount, autoCount } = reconcileEnabledConnections(
      connections as unknown[],
      currentRequestQueueSettings
    );
    updateAllLimiterSettings();

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
  const { getCachedProviderConnections } = await import("@/lib/localDb");
  const connections = await getCachedProviderConnections();
  reconcileEnabledConnections(connections as unknown[], currentRequestQueueSettings);
  await updateAllLimiterSettings();
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
  // Drop queued jobs before evicting the limiter. Otherwise disconnect() leaves
  // callers waiting on an instance that is no longer reachable from the cache.
  for (const [key, limiter] of Array.from(limiters)) {
    if (keyContainsConnection(key, connectionId)) {
      evictLimiterAndDropQueued(key, limiter, "rate-limit-connection-disabled");
    }
  }
  rpmGate.clearConnection(connectionId);
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
    if (keyContainsConnection(key, connectionId)) {
      evictLimiterAndDropQueued(key, limiter, "rate-limit-settings-refresh");
    }
  }
  rpmGate.clearConnection(connectionId);
}

/**
 * Get or create a limiter for a given provider+connection combination
 */
function getLimiterKey(provider, connectionId, model = null) {
  if (provider === "codex" && model) {
    return `${provider}:${getCodexRateLimitKey(connectionId, model)}`;
  }
  if ((provider === "antigravity" || provider === "agy") && model) {
    const family = getAntigravityQuotaFamily(model);
    const scope = family === "other" ? model : family;
    return `${provider}:${connectionId}:${scope}`;
  }
  // Gemini AI Studio and GitHub Copilot have per-model quotas — use model-scoped
  // limiter keys so a 429 on one model doesn't pause requests for other models.
  if ((provider === "gemini" || provider === "github") && model) {
    return `${provider}:${connectionId}:${model}`;
  }
  return `${provider}:${connectionId}`;
}

const rpmGate = new RollingRpmGate({
  getGlobalRpm: () => currentRequestQueueSettings.requestsPerMinute,
  getProviderWindow: getProviderDefaultRateLimit,
  getConnectionRpm: (connectionId) => connectionRateLimitOverrides.get(connectionId)?.rpm,
  getLimiterKey,
  createQueueTimeoutError: (provider, model, maxWaitMs, reason) =>
    createQueueTimeoutError(provider, model, maxWaitMs, reason),
});

function getLimiter(provider, connectionId, model = null) {
  const key = getLimiterKey(provider, connectionId, model);

  if (!limiters.has(key)) {
    const defaults = buildLimiterDefaults();
    const overrides = connectionRateLimitOverrides.get(connectionId);
    if (overrides) {
      // 0 (or missing) means "no override — fall through to buildLimiterDefaults()".
      if (typeof overrides.maxConcurrent === "number" && overrides.maxConcurrent > 0) {
        defaults.maxConcurrent = overrides.maxConcurrent;
      }
      if (typeof overrides.minTime === "number" && overrides.minTime > 0) {
        defaults.minTime = overrides.minTime;
      }
      // TODO: TPM/TPD integration — requires a token-bucket vs request-bucket
      // separation. RPM is handled by the rolling lease gate below.
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

function evictLimiterAndDropQueued(key: string, limiter: Bottleneck, reason: string): void {
  if (limiters.get(key) === limiter) {
    limiters.delete(key);
    lastDispatchAt.delete(key);
    limiterLastUsed.delete(key);
  }
  trackAsyncOperation(limiter.stop({ dropWaitingJobs: true, dropErrorMessage: reason }));
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

  const maxWaitMs = currentRequestQueueSettings.maxWaitMs;
  const queueStartedAt = Date.now();
  const rpmLease = await rpmGate.acquire(
    provider,
    connectionId,
    model,
    signal,
    maxWaitMs,
    queueStartedAt
  );
  const limiter = getLimiter(provider, connectionId, model);
  const key = getLimiterKey(provider, connectionId, model);
  const jobId = `${key}:job-${nextJobTraceId++}`;
  const scheduleOpts = { id: jobId };

  // Issue #6593: opt-in admission cap — fast-reject before Bottleneck's
  // schedule() (and before any downstream compression/prompt work runs) when
  // the queue is already at/over maxQueueDepth. Default 0 = disabled.
  const admissionErr = checkQueueAdmission(
    limiter.counts().QUEUED,
    currentRequestQueueSettings.maxQueueDepth,
    model ? `${provider}/${model}` : provider
  );
  if (admissionErr) {
    rpmLease?.release();
    logRateLimit(
      `🚧 [RATE-LIMIT] ${getLimiterKey(provider, connectionId, model)} — queue full, rejecting fast (maxQueueDepth=${currentRequestQueueSettings.maxQueueDepth})`
    );
    throw admissionErr;
  }

  let dispatched = false;
  let queueExpired = false;
  let dispatchCancelled = false;
  let queueTimer: ReturnType<typeof setTimeout> | undefined;
  const remainingWaitMs =
    maxWaitMs > 0 ? Math.max(1, maxWaitMs - (Date.now() - queueStartedAt)) : 0;
  const queueTimeoutPromise =
    remainingWaitMs > 0
      ? new Promise<never>((_, reject) => {
          queueTimer = setTimeout(() => {
            if (dispatched) return;
            queueExpired = true;
            logRateLimit(
              `⏰ [RATE-LIMIT] ${key} — job exceeded ${Math.ceil(maxWaitMs / 1000)}s queue wait budget, dropping`
            );
            reject(new Error("rate-limit-queue-timeout"));
          }, remainingWaitMs);
        })
      : null;
  const scheduled = limiter.schedule(scheduleOpts, async () => {
    if (queueExpired) {
      throw createQueueTimeoutError(provider, model, maxWaitMs);
    }
    if (dispatchCancelled) {
      const error = new Error("The operation was aborted before limiter dispatch");
      error.name = "AbortError";
      throw error;
    }
    if (signal?.aborted) {
      const error = new Error("The operation was aborted before limiter dispatch");
      error.name = "AbortError";
      throw error;
    }
    dispatched = true;
    if (queueTimer) clearTimeout(queueTimer);
    return fn();
  });

  try {
    if (signal) {
      let abortListener: (() => void) | undefined;
      const abortPromise = new Promise<never>((_, reject) => {
        const onAbort = () => {
          const reason = signal.reason;
          // Reject before evicting the queued job so the caller observes its
          // abort reason instead of Bottleneck's internal drop error.
          if (reason instanceof Error) {
            reject(reason);
          } else {
            const err = new Error(
              typeof reason === "string" ? reason : "The operation was aborted"
            );
            err.name = "AbortError";
            if (reason !== undefined) {
              (err as Error & { cause?: unknown }).cause = reason;
            }
            reject(err);
          }
          if (!dispatched) {
            dispatchCancelled = true;
            if (queueTimer) clearTimeout(queueTimer);
            // Leave the cancelled job in Bottleneck so queued peers are not dropped.
            // Its scheduled callback will consume one queue turn and exit before fn().
          }
        };
        if (signal.aborted) {
          onAbort();
          return;
        }
        abortListener = onAbort;
        signal.addEventListener("abort", abortListener, { once: true });
      });

      try {
        const races: Promise<unknown>[] = [scheduled, abortPromise];
        if (queueTimeoutPromise) races.push(queueTimeoutPromise);
        return await Promise.race(races);
      } finally {
        if (abortListener) {
          signal.removeEventListener("abort", abortListener);
        }
      }
    } else {
      return await (queueTimeoutPromise
        ? Promise.race([scheduled, queueTimeoutPromise])
        : scheduled);
    }
  } catch (err) {
    if (queueTimer) clearTimeout(queueTimer);
    if (!dispatched) rpmLease?.release();
    if (err?.message === "rate-limit-upstream-429") {
      const rateLimitErr = new Error(
        `Request dropped while the ${provider} connection was under an upstream rate-limit cooldown`,
        { cause: err }
      ) as Error & { code?: string; status?: number };
      rateLimitErr.code = "RATE_LIMIT_UPSTREAM_429";
      rateLimitErr.status = 429;
      throw rateLimitErr;
    }
    // The watchdog's stop({ dropWaitingJobs: true }) wedge-recovery (above) rejects
    // queued jobs with this exact message. Rewrite it the same way as the timeout
    // case — a clear, OmniRoute-owned, classifiable error — so combo's transient-error
    // handling (which already treats a 502 as retryable) falls back to the next target
    // immediately instead of surfacing Bottleneck's internal wording.
    if (err?.message === "rate-limit-watchdog-wedge-reset") {
      const wedgeErr = new Error(
        `Request dropped: the local rate-limit queue for ${model ? `${provider}/${model}` : provider} ` +
          `was detected as wedged (stalled with nothing executing) and force-reset. This is OmniRoute's ` +
          `own queue recovering, not an upstream error.`,
        { cause: err }
      ) as Error & { code?: string };
      wedgeErr.code = "RATE_LIMIT_QUEUE_WEDGED";
      throw wedgeErr;
    }
    if (err?.message === "rate-limit-queue-timeout") {
      throw createQueueTimeoutError(provider, model, maxWaitMs);
    }
    throw err;
  }
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

    rpmGate.block(provider, connectionId, model, retryAfterMs);

    // Evict from the cache before stopping so follow-up requests get a fresh
    // instance. Stopping the unreachable instance rejects its queued jobs and
    // releases its heartbeat without poisoning the replacement limiter.
    evictLimiterAndDropQueued(limiterKey, limiter, "rate-limit-upstream-429");
    return;
  }

  // Handle "over limit" soft warning (Fireworks)
  if (overLimit === "yes") {
    logRateLimit(
      `⚠️ [RATE-LIMIT] ${provider}:${connectionId.slice(0, 8)} — near capacity, slowing down`
    );
    trackAsyncOperation(applyLimiterSettings(limiter, { minTime: 200 }));
    return;
  }

  // Normal response — update limiter from headers
  if (!isNaN(limit) && limit > 0) {
    // Calculate optimal minTime from RPM limit
    const minTime = Math.max(0, Math.floor(60000 / limit) - 10); // Small buffer

    const updates: LimiterUpdateSettings = { minTime };
    const resetMs = parseResetTime(resetStr) || 60000;

    // Keep adaptive pacing from response headers, but do not mutate an RPM
    // reservoir. RPM admission is enforced by the rolling lease gate.
    if (!isNaN(remaining)) {
      if (remaining < limit * 0.1) {
        rpmGate.learnHeaderWindow(
          provider,
          connectionId,
          model,
          remaining,
          resetMs,
          Date.now() + resetMs
        );
        logRateLimit(
          `⚠️ [RATE-LIMIT] ${provider}:${connectionId.slice(0, 8)} — ${remaining}/${limit} remaining, throttling`
        );
      } else if (remaining > limit * 0.5) {
        // Plenty of headroom — relax the limiter
        updates.minTime = 0;
        rpmGate.clearLearnedHeaderWindow(provider, connectionId, model);
      }
    }

    trackAsyncOperation(applyLimiterSettings(limiter, updates));

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
  connectionRateLimitOverrides.clear();
  rpmGate.reset();
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
          await applyLimiterSettings(limiter, { minTime: inferredMinTime });
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
    getLimiter(provider, connectionId, model);
    logRateLimit(
      `🚫 [RATE-LIMIT] ${provider}:${connectionId.slice(0, 8)} — body-parsed retry: ${Math.ceil(retryAfterMs / 1000)}s (${reason})`
    );
    rpmGate.block(provider, connectionId, model, retryAfterMs);
  }
}
