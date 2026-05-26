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
 *   - OAuth connections: tested less frequently (2x interval)
 *   - Backoff on failure: 5min -> 10min -> 30min -> max 2h
 *   - Resets to default on success
 */

import { testSingleConnection } from "@/app/api/providers/[id]/test/route";
import { getProviderConnections } from "@/lib/localDb";
import {
  setCredentialHealth,
  removeCredentialHealth,
  initCredentialCache,
} from "@/lib/credentialHealth/cache";
import { emit } from "@/lib/events/eventBus";

// ── Config ────────────────────────────────────────────────────────────────

const BACKOFF_SCHEDULE = [300_000, 600_000, 1_800_000, 7_200_000]; // 5min, 10min, 30min, 2h
const INITIAL_DELAY_MS = 30_000; // Wait for server boot
const OAUTH_INTERVAL_MULTIPLIER = 2; // OAuth tested 2x less frequently
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
    };
  }
  return globalThis.__omnirouteCredentialHC;
}

// ── Helpers ───────────────────────────────────────────────────────────────

function isBuildProcess(): boolean {
  return typeof process !== "undefined" && process.env.NEXT_PHASE === "phase-production-build";
}

function isAutomatedTestProcess(): boolean {
  return (
    typeof process !== "undefined" &&
    (process.env.NODE_ENV === "test" ||
      process.env.VITEST !== undefined ||
      process.argv.some((arg) => arg.includes("test")))
  );
}

function isCredentialHealthCheckDisabled(): boolean {
  if (isBuildProcess() || isAutomatedTestProcess()) return true;
  const val = process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK;
  return val ? TRUE_ENV_VALUES.has(val.trim().toLowerCase()) : false;
}

function getSweepInterval(): number {
  const envVal = process.env.CREDENTIAL_HEALTH_CHECK_INTERVAL;
  if (envVal) {
    const parsed = parseInt(envVal, 10);
    if (!isNaN(parsed) && parsed >= 10_000) return parsed;
  }
  return 300_000; // default 5 min
}

function getNextBackoff(connectionId: string): number {
  const state = getSchedulerState();
  const failures = state.failureCounts.get(connectionId) ?? 0;
  return BACKOFF_SCHEDULE[Math.min(failures, BACKOFF_SCHEDULE.length - 1)];
}

function getMaxFailuresAcrossConnections(): number {
  const state = getSchedulerState();
  let max = 0;
  for (const count of state.failureCounts.values()) {
    if (count > max) max = count;
  }
  return max;
}

// ── Core Sweep Logic ─────────────────────────────────────────────────────

async function testConnection(
  connectionId: string,
  provider: string,
  isOAuth: boolean
): Promise<void> {
  const startTime = Date.now();

  let oldStatus: string | undefined;
  try {
    const { getCredentialHealth } = await import("@/lib/credentialHealth/cache");
    const prev = getCredentialHealth(connectionId);
    oldStatus = prev?.status;
  } catch {}
  try {
    const result = await testSingleConnection(connectionId);

    const latencyMs = Date.now() - startTime;
    const state = getSchedulerState();

    if (result.valid) {
      // Success — reset failure count, update cache
      state.failureCounts.delete(connectionId);
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
      // Failure — increment failure count, update cache with error
      const currentFailures = (state.failureCounts.get(connectionId) ?? 0) + 1;
      state.failureCounts.set(connectionId, currentFailures);

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
    // Get all provider connections (API-key + OAuth)
    let connections: Array<{
      id: string;
      provider: string;
      authType?: string;
    }>;

    try {
      const raw = await getProviderConnections({});
      connections = (Array.isArray(raw) ? raw : []).filter(
        (conn: any) => conn && conn.id && (conn.authType === "apikey" || conn.authType === "oauth")
      ) as Array<{
        id: string;
        provider: string;
        authType?: string;
      }>;
    } catch (err) {
      console.error(LOG_PREFIX, "Failed to load provider connections:", err);
      return;
    }

    if (connections.length === 0) return;

    // Compute backoff per connection — skip connections that aren't due yet
    const now = Date.now();
    const interval = getSweepInterval();

    const dueConnections = connections.filter((conn) => {
      const isOAuth = conn.authType === "oauth";
      const connInterval = isOAuth ? interval * OAUTH_INTERVAL_MULTIPLIER : interval;
      const backoff = getNextBackoff(conn.id);
      const effectiveInterval = Math.max(connInterval, backoff);
      // If we don't have a failure count, it hasn't been tested this session
      const state_ = getSchedulerState();
      return !state_.failureCounts.has(conn.id) || effectiveInterval <= interval;
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
      await Promise.allSettled(
        batch.map((conn) => testConnection(conn.id, conn.provider, conn.authType === "oauth"))
      );
    }
  } finally {
    state.sweepInProgress = false;
    scheduleSweep();
  }
}

function scheduleSweep(): void {
  const state = getSchedulerState();
  if (!state.initialized) return;
  if (state.sweepTimer) clearTimeout(state.sweepTimer);

  const maxFailures = getMaxFailuresAcrossConnections();
  const baseInterval = getSweepInterval();
  const backoffInterval = BACKOFF_SCHEDULE[Math.min(maxFailures, BACKOFF_SCHEDULE.length - 1)];
  const interval = Math.max(baseInterval, backoffInterval);

  state.sweepTimer = setTimeout(sweep, interval);
}

// ── Public API ────────────────────────────────────────────────────────────

/**
 * Start the credential health check scheduler (idempotent).
 */
export function initCredentialHealthCheck(): void {
  const state = getSchedulerState();
  if (state.initialized || isCredentialHealthCheckDisabled()) return;
  state.initialized = true;
  initCredentialCache();

  console.log(
    LOG_PREFIX,
    `Starting credential health check (initial delay ${INITIAL_DELAY_MS / 1000}s, interval ${getSweepInterval() / 1000}s)`
  );

  state.sweepTimer = setTimeout(() => {
    sweep().catch((err) => console.error(LOG_PREFIX, "Initial sweep failed:", err));
  }, INITIAL_DELAY_MS);
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
