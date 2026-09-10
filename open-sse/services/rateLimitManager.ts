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
import { applyBottleneckDoExpirePatch, applyBottleneckHeartbeatPatch } from "./bottleneckPatch.ts";
import { parseRetryAfterFromBody } from "./accountFallback.ts";
import { getAntigravityQuotaFamily } from "./antigravityQuotaFamily.ts";
import { getProviderCategory } from "../config/providerRegistry.ts";
import { getCodexRateLimitKey } from "../executors/codex.ts";
import { awaitProviderDefaultSlot, setProviderQuotaOverrides } from "./providerDefaultRateLimit.ts";
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
import {
  markLocalRateLimitError,
  RATE_LIMIT_EXECUTION_TIMEOUT_CODE,
  RATE_LIMIT_QUEUE_WEDGED_CODE,
} from "./rateLimitManager/errors";
import { LimiterWedgeWatchdog, WATCHDOG_INTERVAL_MS } from "./rateLimitManager/wedgeWatchdog";
import { toNumber } from "@/shared/utils/numeric";

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
const limiterLastUsed = new Map<string, number>();
let persistTimer: ReturnType<typeof setTimeout> | null = null;
const pendingAsyncOperations = new Set<Promise<unknown>>();
const PERSIST_DEBOUNCE_MS = 60_000; // Debounce persistence to every 60s max

// Track initialization
let initialized = false;

let currentRequestQueueSettings: RequestQueueSettings = DEFAULT_RESILIENCE_SETTINGS.requestQueue;
export const ZAI_WEB_REQUEST_QUEUE_MAX_WAIT_MS = 60_000;
// MaxAI proxies reasoning models (deepseek-r1, gpt-5.6-thinking, grok-4.5,
// gemini-3.1-pro-preview, grok-4-1-fast-reasoning) whose single upstream turn
// legitimately runs tens of seconds to minutes. The 15s default execution
// expiration (Bottleneck `expiration`, applied AFTER dispatch) kills those mid
// think and surfaces a spurious local 504. Floor MaxAI at 5 min — the same
// ceiling waitForCooldown.budgetMs uses — so slow reasoning turns complete.
export const MAXAI_REQUEST_QUEUE_MAX_WAIT_MS = 300_000;

const limiterEffectiveSettings = new WeakMap<Bottleneck, Bottleneck.ConstructorOptions>();
const preservedReplacementSettings = new Map<string, Bottleneck.ConstructorOptions>();
const limiterWatchdog = new LimiterWedgeWatchdog({
  limiters,
  limiterLastUsed,
  limiterEffectiveSettings,
  preservedReplacementSettings,
  trackBackground: (promise) => {
    trackAsyncOperation(promise);
  },
  log: logRateLimit,
  warn: warnRateLimit,
});
let watchdogInterval: ReturnType<typeof setInterval> | null = null;

type LimiterFactory = (options: Bottleneck.ConstructorOptions) => Bottleneck;
const defaultLimiterFactory: LimiterFactory = (options) => new Bottleneck(options);
let limiterFactory: LimiterFactory = defaultLimiterFactory;

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

// Shared override-resolution rule for every per-connection rate-limit field:
// a positive override wins, 0 or missing falls through to `fallback`.
function resolveOverride(override: number | undefined | null, fallback: number): number {
  return typeof override === "number" && override > 0 ? override : fallback;
}

// Resolve an RPM override. 0 or missing means "infinite" (no rate cap).
function resolveRpm(override: number | undefined | null): number {
  return resolveOverride(override, EFFECTIVELY_INFINITE);
}

// Resolve a minTime override. 0 or missing means "no minimum gap".
function resolveMinTime(override: number | undefined | null): number {
  return resolveOverride(override, 0);
}

// Resolve a maxConcurrent override. 0 or missing means "effectively infinite".
function resolveMaxConcurrent(override: number | undefined | null): number {
  return resolveOverride(override, EFFECTIVELY_INFINITE_CONCURRENCY);
}

export function resolveRequestQueueMaxWaitMs(
  provider: string,
  configuredMaxWaitMs: number = currentRequestQueueSettings.maxWaitMs,
  connectionId?: string
): number {
  const p = provider.trim().toLowerCase();
  let legacyDefault = configuredMaxWaitMs;
  if (p === "zai-web") {
    legacyDefault = Math.max(configuredMaxWaitMs, ZAI_WEB_REQUEST_QUEUE_MAX_WAIT_MS);
  } else if (p === "maxai" || p === "mx") {
    // MaxAI's slow reasoning models legitimately need up to ~5 min; floor the
    // per-request execution budget so they aren't cut off early.
    legacyDefault = Math.max(configuredMaxWaitMs, MAXAI_REQUEST_QUEUE_MAX_WAIT_MS);
  }
  const override = connectionId
    ? connectionRateLimitOverrides.get(connectionId)?.maxWaitMs
    : undefined;
  return resolveOverride(override, legacyDefault);
}

/**
 * Limiter-managed execution backstop (Bottleneck `expiration`). Starts only
 * after a job leaves QUEUED; bounds execution, never queue wait. Kept strictly
 * separate from the queue-wait budget (`maxWaitMs`) so the backstop cannot
 * undercut upstream fetch-start timeouts on non-incremental gateways.
 */
export function resolveExecutionMaxWaitMs(): number {
  return currentRequestQueueSettings.executionMaxWaitMs;
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

function updateLimiterSettings(
  limiter: Bottleneck,
  updates: Bottleneck.ConstructorOptions
): Bottleneck {
  const effective = limiterEffectiveSettings.get(limiter) ?? {};
  limiterEffectiveSettings.set(limiter, { ...effective, ...updates });
  return limiter.updateSettings(updates);
}

function updateAllLimiterSettings() {
  const defaults = buildLimiterDefaults();
  for (const limiter of limiters.values()) {
    updateLimiterSettings(limiter, defaults);
  }
}

function clearPreservedReplacementSettings(connectionId: string): void {
  for (const key of preservedReplacementSettings.keys()) {
    if (key.includes(connectionId)) preservedReplacementSettings.delete(key);
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

      // Route through getLimiter so the queue-progress listeners are wired up.
      // Otherwise a limiter created here could not be evaluated safely by the watchdog.
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

let shutdownHandlersRegistered = false;

export function startRateLimitWatchdog(): void {
  if (watchdogInterval) return;
  watchdogInterval = setInterval(() => {
    const run = trackAsyncOperation(limiterWatchdog.run());
    void run.then(undefined, (error) => {
      errorRateLimit("[RATE-LIMIT] Watchdog scan failed:", error);
    });
  }, WATCHDOG_INTERVAL_MS);
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
 * Runtime wedge recovery also uses stop(), but only after synchronously
 * removing that limiter from the cache so it can never accept new work.
 */
function shutdownLimiters(): void {
  for (const limiter of limiters.values()) {
    limiter.stop({ dropWaitingJobs: false });
  }
  limiters.clear();
  limiterLastUsed.clear();
  preservedReplacementSettings.clear();
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
  // Fix Bottleneck v2.19.5 doExpire bug before any limiter is created.
  applyBottleneckDoExpirePatch();
  applyBottleneckHeartbeatPatch();

  try {
    const { getCachedProviderConnections } = await import("@/lib/db/readCache");
    const { getSettings } = await import("@/lib/db/settings");
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
  // Global policy changes invalidate snapshots from the previous generation.
  preservedReplacementSettings.clear();
  const { getCachedProviderConnections } = await import("@/lib/db/readCache");
  const connections = await getCachedProviderConnections();
  // Also discard any snapshot created while the asynchronous DB read yielded.
  preservedReplacementSettings.clear();
  reconcileEnabledConnections(connections as unknown[], currentRequestQueueSettings);
  updateAllLimiterSettings();
}

/**
 * Get or create a limiter for a given provider+connection combination
 */
export function enableRateLimitProtection(connectionId) {
  if (!enabledConnections.has(connectionId)) clearPreservedReplacementSettings(connectionId);
  enabledConnections.add(connectionId);
}

/**
 * Disable rate limit protection for a connection
 */
export function disableRateLimitProtection(connectionId) {
  enabledConnections.delete(connectionId);
  clearPreservedReplacementSettings(connectionId);
  // Ordinary administrative eviction uses disconnect(), not stop(), so
  // in-flight requests can finish. Wedge recovery is the deliberate exception:
  // it removes the limiter from the cache first, then stops it to settle jobs
  // that were already proven stranded.
  for (const [key, limiter] of Array.from(limiters)) {
    if (key.includes(connectionId)) {
      limiters.delete(key);
      limiterWatchdog.forget(limiter);
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
  clearPreservedReplacementSettings(connectionId);
  // Evict limiters referencing this connection so they get recreated on next use
  for (const [key, limiter] of Array.from(limiters)) {
    if (key.includes(connectionId)) {
      limiters.delete(key);
      limiterWatchdog.forget(limiter);
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

function getLimiter(provider, connectionId, model = null) {
  const key = getLimiterKey(provider, connectionId, model);

  if (!limiters.has(key)) {
    // Idempotent — covers callers (and tests) that reach limiter creation
    // without going through initializeRateLimits().
    applyBottleneckDoExpirePatch();
    applyBottleneckHeartbeatPatch();
    const preserved = preservedReplacementSettings.get(key);
    let options: Bottleneck.ConstructorOptions;
    if (preserved) {
      preservedReplacementSettings.delete(key);
      options = { ...preserved, id: key };
    } else {
      const defaults = buildLimiterDefaults();
      const overrides = connectionRateLimitOverrides.get(connectionId);
      if (overrides) {
        // 0 (or missing) means "no override — fall through to buildLimiterDefaults()".
        // Without this guard, an rpm of 0 sets reservoir=0, which Bottleneck treats
        // as depleted and blocks all requests indefinitely.
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
        // TODO: TPM/TPD integration requires separate token and request buckets.
      }
      options = { ...defaults, id: key };
    }
    const limiter = limiterFactory(options);
    limiterEffectiveSettings.set(limiter, { ...options });
    limiter.on("queued", () => {
      limiterWatchdog.noteQueued(key, limiter);
    });
    const markQueueProgress = () => {
      limiterWatchdog.noteProgress(key, limiter);
    };
    limiter.on("executing", markQueueProgress);
    // A long-running job can leave older work queued. Start the idle grace
    // from its completion, not from when that waiting work first arrived.
    limiter.on("done", markQueueProgress);

    limiters.set(key, limiter);
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

  // Proactive sliding-window fallback for header-less providers with a declared cap
  // (Fase 8.2). No-op unless PROVIDER_DEFAULT_RATE_LIMITS has an entry for `provider`.
  const maxWaitMs = resolveRequestQueueMaxWaitMs(provider, undefined, connectionId);
  await awaitProviderDefaultSlot(provider, connectionId, signal, maxWaitMs);

  const limiter = getLimiter(provider, connectionId, model);
  // Bottleneck's `expiration` starts only after a job leaves QUEUED, so it
  // bounds limiter-managed execution — not queue wait. It is therefore fed by
  // the dedicated execution backstop (`requestQueue.executionMaxWaitMs`),
  // never by the queue-wait budget: non-incremental gateways legitimately run
  // for minutes before first bytes, and an expiration at the queue budget
  // killed them mid-flight (false 504s on opencode-go/glm-5.3-flash).
  const executionExpirationMs = resolveExecutionMaxWaitMs();
  const scheduleOpts =
    executionExpirationMs && executionExpirationMs > 0 ? { expiration: executionExpirationMs } : {};

  // Issue #6593: opt-in admission cap — fast-reject before Bottleneck's
  // schedule() (and before any downstream compression/prompt work runs) when
  // the queue is already at/over maxQueueDepth. Default 0 = disabled.
  const admissionErr = checkQueueAdmission(
    limiter.counts().QUEUED,
    currentRequestQueueSettings.maxQueueDepth,
    model ? `${provider}/${model}` : provider
  );
  if (admissionErr) {
    logRateLimit(
      `🚧 [RATE-LIMIT] ${getLimiterKey(provider, connectionId, model)} — queue full, rejecting fast (maxQueueDepth=${currentRequestQueueSettings.maxQueueDepth})`
    );
    throw admissionErr;
  }

  try {
    if (signal) {
      let abortListener: (() => void) | undefined;
      const { promise: abortPromise, reject: rejectAbort } = Promise.withResolvers<never>();
      const onAbort = () => {
        const reason = signal.reason;
        // Preserve native Error reasons (including AbortController's
        // read-only DOMException) instead of mutating or wrapping them.
        if (reason instanceof Error) {
          rejectAbort(reason);
          return;
        }
        const err = new Error(typeof reason === "string" ? reason : "The operation was aborted");
        err.name = "AbortError";
        if (reason !== undefined) {
          (err as Error & { cause?: unknown }).cause = reason;
        }
        rejectAbort(err);
      };
      if (signal.aborted) {
        onAbort();
      } else {
        abortListener = onAbort;
        signal.addEventListener("abort", abortListener, { once: true });
      }

      try {
        // Race the work against the abort signal. When abort wins, fn is still
        // running inside Bottleneck's limiter — its eventual rejection must not
        // surface as an unhandledRejection. The .catch(noop) silences only the
        // orphaned branch; the real rejection comes from abortPromise.
        const scheduled = limiter.schedule(scheduleOpts, fn);
        scheduled.catch(() => {}); // prevent unhandledRejection when abort wins
        abortPromise.catch(() => {}); // prevent unhandledRejection when scheduled wins
        return await Promise.race([scheduled, abortPromise]);
      } finally {
        if (abortListener) {
          signal.removeEventListener("abort", abortListener);
        }
      }
    } else {
      return await limiter.schedule(scheduleOpts, fn);
    }
  } catch (err) {
    // Only Bottleneck-owned failures are rewritten. Application code can throw
    // the same text and must retain its original identity and semantics.
    if (
      err instanceof Bottleneck.BottleneckError &&
      /^This job timed out after \d+ ms\.$/.test(err.message)
    ) {
      const key = getLimiterKey(provider, connectionId, model);
      logRateLimit(
        `⏰ [RATE-LIMIT] ${key} — limiter-managed execution expired after ${Math.ceil((executionExpirationMs || 0) / 1000)}s`
      );
      throw markLocalRateLimitError(
        new Error(
          `Request exceeded OmniRoute's local rate-limit execution expiration ` +
            `(resilienceSettings.requestQueue.executionMaxWaitMs=${executionExpirationMs}ms) for ` +
            `${model ? `${provider}/${model}` : provider}. Bottleneck applies this deadline only ` +
            `after dispatch; it does not bound queue wait and is not an upstream-generated timeout.`,
          { cause: err }
        ),
        RATE_LIMIT_EXECUTION_TIMEOUT_CODE
      );
    }

    if (
      err instanceof Bottleneck.BottleneckError &&
      err.message === "rate-limit-watchdog-wedge-reset"
    ) {
      const cleanup = limiterWatchdog.getEviction(limiter);
      if (!cleanup) throw err;

      let cleanupError: unknown;
      try {
        await cleanup;
      } catch (error) {
        cleanupError = error;
        errorRateLimit("[RATE-LIMIT] Wedge cleanup failed:", error);
      }

      const key = getLimiterKey(provider, connectionId, model);
      logRateLimit(`↪️ [RATE-LIMIT] ${key} — surfacing local wedge; caller will not be replayed`);
      const wedgeErr = new Error(
        `Request dropped: the local rate-limit queue for ${model ? `${provider}/${model}` : provider} ` +
          `was detected as wedged (stalled with nothing executing) and force-reset. OmniRoute does ` +
          `not replay dropped work automatically; combo routing may fall back to another target.`,
        { cause: err }
      ) as Error & { cleanupError?: unknown };
      if (cleanupError !== undefined) wedgeErr.cleanupError = cleanupError;
      throw markLocalRateLimitError(wedgeErr, RATE_LIMIT_QUEUE_WEDGED_CODE);
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
    limiterWatchdog.forget(limiter);
    limiterLastUsed.delete(limiterKey);
    preservedReplacementSettings.delete(limiterKey);
    trackAsyncOperation(limiter.disconnect());
    return;
  }

  // Handle "over limit" soft warning (Fireworks)
  if (overLimit === "yes") {
    logRateLimit(
      `⚠️ [RATE-LIMIT] ${provider}:${connectionId.slice(0, 8)} — near capacity, slowing down`
    );
    updateLimiterSettings(limiter, {
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
        updates.minTime = resolveMinTime(currentRequestQueueSettings.minTimeBetweenRequestsMs);
        updates.reservoir = null;
        updates.reservoirRefreshAmount = null;
        updates.reservoirRefreshInterval = null;
      }
    }

    updateLimiterSettings(limiter, updates);

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

export function __setLimiterFactoryForTests(factory: LimiterFactory): void {
  limiterFactory = factory;
}

export async function __runLimiterWatchdogForTests(now = Date.now()): Promise<void> {
  await limiterWatchdog.run(now);
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
  limiterLastUsed.clear();
  preservedReplacementSettings.clear();
  limiterFactory = defaultLimiterFactory;
  limiterWatchdog.reset();
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
          updateLimiterSettings(limiter, { minTime: inferredMinTime });
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

    updateLimiterSettings(limiter, {
      reservoir: 0,
      reservoirRefreshAmount: 60,
      reservoirRefreshInterval: retryAfterMs,
    });
  }
}
