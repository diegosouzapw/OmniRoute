/**
 * Credential Health Check Scheduler
 *
 * Background scheduler that periodically tests provider credential health.
 * Follows the pattern from localHealthCheck.ts — runs on a configurable
 * interval with exponential backoff on failure.
 *
 * Reuses the existing testSingleConnection() infrastructure so all 20+
 * provider-specific validators work automatically.
 *
 * Schedule:
 *   - Initial delay: 30s after server boot (allows DB migrations to complete)
 *   - Interval: configurable via CREDENTIAL_HEALTH_CHECK_INTERVAL (default 5 min)
 *   - Per-connection override: provider_connections.healthCheckInterval (minutes,
 *     0 = never test this connection) paces each connection individually
 *   - Backoff on failure: 5min -> 10min -> 30min -> max 2h
 *   - Resets to default on success
 */

import { setImmediate as yieldToEventLoop } from "node:timers/promises";

import { testSingleConnection } from "@/app/api/providers/[id]/test/route";
import { getProviderConnections } from "@/lib/db/providers";
import { getCachedSettings } from "@/lib/db/readCache";
import { setCredentialHealth, initCredentialCache } from "@/lib/credentialHealth/cache";
import {
  isCredentialProbeInconclusive,
  resolveInconclusiveProbeRecheckDelayMs,
} from "@/lib/credentialHealth/probePolicy";
import { emit } from "@/lib/events/eventBus";
import { isAutomatedTestProcess } from "@/shared/utils/testProcess";
import { SEARCH_VALIDATOR_CONFIGS } from "@/lib/providers/validation/searchProviders";

// ── Config ────────────────────────────────────────────────────────────────

const BACKOFF_SCHEDULE = [300_000, 600_000, 1_800_000, 7_200_000]; // 5min, 10min, 30min, 2h
const INITIAL_DELAY_MS = 30_000; // Wait for server boot
const CONCURRENCY_LIMIT = 5; // Max simultaneous connection tests
const LOG_PREFIX = "[CredentialHealth]";
const TRUE_ENV_VALUES = new Set(["1", "true", "yes", "on"]);

// ── State (globalThis singleton) ──────────────────────────────────────────

declare global {
  var __omnirouteCredentialHC:
    | {
        initialized: boolean;
        sweepTimer: ReturnType<typeof setTimeout> | null;
        sweepInProgress: boolean;
        /** Track consecutive scheduler failures per connection for backoff */
        failureCounts: Map<string, number>;
        /**
         * Per-connection timing for time-based backoff retry.
         * `nextAttemptAt` is the earliest timestamp (ms) at which the connection
         * should be tested again. Absent entry = never tested or healthy = due now.
         */
        perConnTiming: Map<string, { lastAttemptAt: number; nextAttemptAt: number }>;
      }
    | undefined;
}

function getSchedulerState() {
  if (!globalThis.__omnirouteCredentialHC) {
    globalThis.__omnirouteCredentialHC = {
      initialized: false,
      sweepTimer: null,
      sweepInProgress: false,
      failureCounts: new Map(),
      perConnTiming: new Map(),
    };
  }
  return globalThis.__omnirouteCredentialHC;
}

// ── Helpers ───────────────────────────────────────────────────────────────

function isBuildProcess(): boolean {
  return typeof process !== "undefined" && process.env.NEXT_PHASE === "phase-production-build";
}

function isCredentialHealthCheckDisabled(): boolean {
  if (isBuildProcess() || isAutomatedTestProcess()) return true;
  const val = process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK;
  return val ? TRUE_ENV_VALUES.has(val.trim().toLowerCase()) : false;
}

/**
 * Resolve the effective global sweep cadence (ms) for connections WITHOUT a
 * per-connection override. Operator settings win over the env var; the env var
 * wins over the built-in default. Zero (settings) disables the sweep entirely.
 *
 * Returns the interval in ms, or 0 when the operator disabled the sweep.
 */
export function resolveCredentialHealthSweepInterval(
  settings: Record<string, unknown> | null | undefined
): number {
  const record =
    settings && typeof settings === "object" && !Array.isArray(settings)
      ? (settings as Record<string, unknown>)
      : null;
  const resilienceRecord =
    record &&
    record.resilienceSettings &&
    typeof record.resilienceSettings === "object" &&
    !Array.isArray(record.resilienceSettings)
      ? (record.resilienceSettings as Record<string, unknown>)
      : null;
  const healthRecord =
    resilienceRecord &&
    resilienceRecord.credentialHealthCheck &&
    typeof resilienceRecord.credentialHealthCheck === "object" &&
    !Array.isArray(resilienceRecord.credentialHealthCheck)
      ? (resilienceRecord.credentialHealthCheck as Record<string, unknown>)
      : null;

  // Operator setting (DB) wins whenever the section exists — including an
  // explicit 0, which disables the sweep entirely.
  if (healthRecord && healthRecord.intervalMinutes !== undefined) {
    const minutes = Number(healthRecord.intervalMinutes);
    if (Number.isFinite(minutes)) {
      if (minutes <= 0) return 0;
      return Math.min(Math.trunc(minutes), 1440) * 60_000;
    }
  }

  const envVal = process.env.CREDENTIAL_HEALTH_CHECK_INTERVAL;
  if (envVal) {
    const parsed = parseInt(envVal, 10);
    if (!isNaN(parsed) && parsed >= 10_000) return parsed;
  }
  return 3_600_000; // default 60 min
}

/**
 * Built-in env/default fallback used before the first operator settings read,
 * and by the log line at scheduler start.
 */
function getSweepInterval(): number {
  const envVal = process.env.CREDENTIAL_HEALTH_CHECK_INTERVAL;
  if (envVal) {
    const parsed = parseInt(envVal, 10);
    if (!isNaN(parsed) && parsed >= 10_000) return parsed;
  }
  return 3_600_000; // default 60 min
}

/**
 * Resolve the per-connection sweep interval (ms).
 * - `healthCheckInterval > 0` → minutes × 60 000 (per-connection override)
 * - `healthCheckInterval <= 0` → null (never test this connection — opt-out)
 * - absent → global sweep cadence (operator resilience setting, else env, else default)
 */
function getConnIntervalMs(
  conn: { healthCheckInterval?: number | null },
  globalIntervalMs = 300_000
): number | null {
  const minutes = conn.healthCheckInterval;
  if (minutes === null || minutes === undefined) return globalIntervalMs;
  if (minutes <= 0) return null;
  return minutes * 60_000;
}

function getNextBackoff(connectionId: string): number {
  const state = getSchedulerState();
  const failures = state.failureCounts.get(connectionId) ?? 0;
  return BACKOFF_SCHEDULE[Math.min(failures, BACKOFF_SCHEDULE.length - 1)];
}

// ── Core Sweep Logic ─────────────────────────────────────────────────────

async function testConnection(
  connectionId: string,
  provider: string,
  intervalMs: number | null
): Promise<void> {
  const startTime = Date.now();

  // Per-connection opt-out: healthCheckInterval <= 0 → never test.
  if (intervalMs === null) return;

  let oldStatus: string | undefined;
  try {
    const { getCredentialHealth } = await import("@/lib/credentialHealth/cache");
    const prev = getCredentialHealth(connectionId);
    oldStatus = prev?.status;
  } catch {}
  try {
    const result = await testSingleConnection(connectionId);

    // Deliberate skips never rewrite credential health or failure state.
    // Unsupported validation capability is stable enough to honor the
    // connection's configured interval; an exclusive-lease skip intentionally
    // remains due on the next global sweep so recovery is not delayed.
    if (result.skipped === true) {
      const diagnosis = result.diagnosis as { code?: string } | undefined;
      if (diagnosis?.code === "unsupported") {
        getSchedulerState().perConnTiming.set(connectionId, {
          lastAttemptAt: startTime,
          nextAttemptAt: startTime + intervalMs,
        });
      }
      return;
    }

    const latencyMs = Date.now() - startTime;
    const state = getSchedulerState();

    if (result.valid) {
      // Success resets failure state. Credential-inconclusive probes remain
      // active but are checked less often because repeating an expensive probe
      // does not add authentication evidence; an ordinary success is paced by
      // the per-connection interval (absent → global sweep interval).
      state.failureCounts.delete(connectionId);

      if (isCredentialProbeInconclusive(result)) {
        const recheckDelayMs = resolveInconclusiveProbeRecheckDelayMs(getSweepInterval());
        state.perConnTiming.set(connectionId, {
          lastAttemptAt: startTime,
          nextAttemptAt: Date.now() + recheckDelayMs,
        });
      } else {
        state.perConnTiming.set(connectionId, {
          lastAttemptAt: startTime,
          nextAttemptAt: startTime + intervalMs,
        });
      }

      setCredentialHealth(
        connectionId,
        provider,
        "active",
        undefined,
        undefined,
        undefined,
        latencyMs
      );
      emit("credential.health.changed", {
        connectionId,
        provider,
        oldStatus: oldStatus || "unknown",
        newStatus: "active",
        timestamp: Date.now(),
      });
    } else {
      // Failure — increment failure count, update cache with error, set retry timing
      const currentFailures = (state.failureCounts.get(connectionId) ?? 0) + 1;
      state.failureCounts.set(connectionId, currentFailures);
      const nextBackoff = getNextBackoff(connectionId);
      state.perConnTiming.set(connectionId, {
        lastAttemptAt: startTime,
        nextAttemptAt: Date.now() + nextBackoff,
      });

      const diagnosis = result.diagnosis as { type?: string; source?: string } | undefined;

      setCredentialHealth(
        connectionId,
        provider,
        "error",
        result.error || "Unknown error",
        diagnosis?.type || "unknown",
        diagnosis?.source || "unknown",
        latencyMs
      );
      emit("credential.health.changed", {
        connectionId,
        provider,
        oldStatus: oldStatus || "unknown",
        newStatus: "error",
        timestamp: Date.now(),
      });

      // Log state transition on consecutive failures
      if (currentFailures <= 2) {
        const backoff = getNextBackoff(connectionId);
        console.log(
          LOG_PREFIX,
          `❌ ${provider}/${connectionId} — ${result.error || "Connection failed"}` +
            ` [${latencyMs}ms] (failure #${currentFailures}, next check in ${backoff / 1000}s)`
        );
      }
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Scheduler error";
    const latencyMs = Date.now() - startTime;
    const state = getSchedulerState();

    const currentFailures = (state.failureCounts.get(connectionId) ?? 0) + 1;
    state.failureCounts.set(connectionId, currentFailures);
    const nextBackoff = getNextBackoff(connectionId);
    state.perConnTiming.set(connectionId, {
      lastAttemptAt: startTime,
      nextAttemptAt: Date.now() + nextBackoff,
    });

    setCredentialHealth(connectionId, provider, "error", message);

    if (currentFailures <= 2) {
      console.log(
        LOG_PREFIX,
        `⚠️ ${provider}/${connectionId} — ${message} [${latencyMs}ms] (failure #${currentFailures})`
      );
    }
  }
}

/**
 * Single sweep: test all provider connections in parallel (with concurrency limit).
 */
export async function sweep(): Promise<void> {
  const state = getSchedulerState();
  if (state.sweepInProgress) return;
  state.sweepInProgress = true;

  try {
    // Operator-configured global cadence (resilienceSettings). 0 disables the
    // sweep for every connection without a per-connection override.
    let globalIntervalMs: number;
    try {
      const settings = (await getCachedSettings()) as Record<string, unknown> | null;
      globalIntervalMs = resolveCredentialHealthSweepInterval(settings);
    } catch {
      globalIntervalMs = resolveCredentialHealthSweepInterval(null);
    }

    // Get active provider connections only (API-key + OAuth). Disabled
    // connections are excluded from routing and must not consume health-check
    // concurrency or delay the scheduler with avoidable upstream timeouts.
    let connections: Array<{
      id: string;
      provider: string;
      authType?: string;
      healthCheckInterval?: number | null;
    }>;

    try {
      const raw = await getProviderConnections({ isActive: true });
      connections = (Array.isArray(raw) ? raw : []).filter(
        (conn: any) =>
          conn &&
          conn.id &&
          (conn.authType === "apikey" || conn.authType === "oauth") &&
          // #9970: search-provider "validation" fires a REAL billed upstream
          // query (e.g. POST api.tavily.com/search) — never sweep these.
          !(conn.provider in SEARCH_VALIDATOR_CONFIGS)
      ) as Array<{
        id: string;
        provider: string;
        authType?: string;
        healthCheckInterval?: number | null;
      }>;
    } catch (err) {
      console.error(LOG_PREFIX, "Failed to load provider connections:", err);
      return;
    }

    if (connections.length === 0) return;

    // Compute backoff per connection — skip connections that aren't due yet
    const now = Date.now();

    const dueConnections = connections.filter((conn) => {
      const intervalMs = getConnIntervalMs(conn, globalIntervalMs);
      // Per-connection opt-out: never tested.
      if (intervalMs === null) return false;
      const state_ = getSchedulerState();
      const timing = state_.perConnTiming.get(conn.id);
      // No timing entry = never tested since boot → due now
      if (!timing) return true;
      // Time-based: due when the current time has passed the next attempt time
      return now >= timing.nextAttemptAt;
    });

    if (dueConnections.length === 0) return;

    console.log(
      LOG_PREFIX,
      `Testing ${dueConnections.length}/${connections.length} connections...`
    );

    // Process with concurrency limit
    const batches: Array<typeof dueConnections> = [];
    for (let i = 0; i < dueConnections.length; i += CONCURRENCY_LIMIT) {
      batches.push(dueConnections.slice(i, i + CONCURRENCY_LIMIT));
    }

    for (const batch of batches) {
      // Yield so GET /healthz and cached /api/monitoring/health can drain
      // while this background sweep talks to providers (#12532).
      await yieldToEventLoop();
      await Promise.allSettled(
        batch.map((conn) =>
          testConnection(conn.id, conn.provider, getConnIntervalMs(conn, globalIntervalMs))
        )
      );
    }
    // Remember the cadence this cycle ran at so scheduleSweep can re-arm with
    // the operator's configured interval instead of the built-in default.
    lastGlobalIntervalMs = globalIntervalMs;
  } finally {
    state.sweepInProgress = false;
    scheduleSweep();
  }
}

let lastGlobalIntervalMs: number | null = null;

/** Test-only: reset scheduler state derived from operator settings. */
export function __test_resetCredentialHealthScheduler(): void {
  lastGlobalIntervalMs = null;
}

function scheduleSweep(): void {
  const state = getSchedulerState();
  if (!state.initialized) return;
  if (state.sweepTimer) clearTimeout(state.sweepTimer);

  // Use a stable sweep interval — per-connection retry timing is now managed
  // independently via perConnTiming, so one failed connection should not delay
  // the global sweep for all connections. Prefer the operator-configured
  // cadence observed during the last sweep; fall back to env/default.
  const interval = lastGlobalIntervalMs ?? getSweepInterval();

  state.sweepTimer = setTimeout(sweep, interval);
}

// ── Public API ────────────────────────────────────────────────────────────

/**
 * Start the credential health check scheduler (idempotent).
 * Returns whether the sweep is armed. False when
 * OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK is set (#11016).
 */
export function initCredentialHealthCheck(): boolean {
  const state = getSchedulerState();
  if (isCredentialHealthCheckDisabled()) return false;
  if (state.initialized) return true;
  state.initialized = true;
  initCredentialCache();

  console.log(
    LOG_PREFIX,
    `Starting credential health check (initial delay ${INITIAL_DELAY_MS / 1000}s, interval ${getSweepInterval() / 1000}s)`
  );

  state.sweepTimer = setTimeout(() => {
    sweep().catch((err) => console.error(LOG_PREFIX, "Initial sweep failed:", err));
  }, INITIAL_DELAY_MS);
  return true;
}

/**
 * Stop the scheduler (for tests / hot-reload).
 */
export function stopCredentialHealthCheck(): void {
  const state = getSchedulerState();
  if (state.sweepTimer) {
    clearTimeout(state.sweepTimer);
    state.sweepTimer = null;
  }
  state.initialized = false;
}

/**
 * Force an immediate sweep (for manual refresh / testing).
 */
export async function forceSweep(): Promise<void> {
  const state = getSchedulerState();
  state.initialized = true;
  initCredentialCache();
  await sweep();
}

// Auto-initialize on first import
initCredentialHealthCheck();
