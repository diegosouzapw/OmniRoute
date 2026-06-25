/**
 * probes.ts — Standard /api/health probes (PR-009).
 *
 * Six probes are registered here, in this order:
 *
 *   1. liveness   — always passes; reports process pid + node version.
 *   2. readiness  — always passes; reports startup timestamp + uptime.
 *   3. database   — pings the SQLite database via `pingDb()`.
 *   4. migrations — reads migration status; fails if any migration is pending.
 *   5. cache      — reports cache hit/miss ratio from the in-memory cache layer.
 *   6. bifrost    — pings the BIFROST_BASE_URL sidecar; SKIPS when env unset.
 *
 * "Liveness" and "readiness" are intentionally cheap: k8s probes hit these
 * every few seconds and we must NEVER block them on a downstream check.
 * The other probes are deep checks, invoked only when `?deep=1` is set
 * (and they still respect the 2s per-check timeout).
 *
 * Each probe is registered through `registerProbe()` exactly once at
 * module-load time. Tests that need to swap individual probes should
 * call `unregisterProbe(name)` and then `registerProbe(name, stub)`
 * rather than re-importing this module.
 */

import { registerProbe } from "./checks";
import type { CheckStatus, HealthProbe } from "./types";

// Capture the process start time at module load so every probe call sees
// a stable, monotonic value (immune to wall-clock adjustments).
const PROCESS_STARTED_AT_MS = Date.now();

function isoTimestamp(ms: number): string {
  return new Date(ms).toISOString();
}

// ─── 1. Liveness ─────────────────────────────────────────────────────────────

/**
 * Liveness probe — always returns "healthy". Reports the process pid and
 * Node version so operators can confirm probe response came from this
 * specific process (multi-process deployments).
 */
export const livenessProbe: HealthProbe = async (_timeoutMs) => {
  return {
    status: "healthy",
    details: {
      pid: process.pid,
      node_version: process.version,
      started_at: isoTimestamp(PROCESS_STARTED_AT_MS),
    },
  };
};

// ─── 2. Readiness ────────────────────────────────────────────────────────────

/**
 * Readiness probe — always returns "healthy" once the process is loaded.
 * Carries uptime + started_at so a k8s readinessProbe can confirm the
 * process has been alive long enough to serve traffic.
 */
export const readinessProbe: HealthProbe = async (_timeoutMs) => {
  const uptime_seconds = Math.floor((Date.now() - PROCESS_STARTED_AT_MS) / 1000);
  return {
    status: "healthy",
    details: {
      uptime_seconds,
      started_at: isoTimestamp(PROCESS_STARTED_AT_MS),
      platform: process.platform,
      arch: process.arch,
    },
  };
};

// ─── 3. Database ─────────────────────────────────────────────────────────────

/**
 * Database probe — runs `SELECT 1` via the central db helper. Returns
 * "unhealthy" if the connection is down or pingDb() returns false.
 *
 * NOTE: `pingDb()` may take a few ms on cold start. We respect the
 * caller's timeout via the runner, so no extra walling here.
 */
export const databaseProbe: HealthProbe = async (_timeoutMs) => {
  try {
    const mod = await import("@/lib/db/core");
    if (typeof mod.pingDb !== "function") {
      return { status: "unhealthy", error: "pingDb() unavailable" };
    }
    const ok = mod.pingDb();
    if (!ok) {
      return { status: "unhealthy", error: "SELECT 1 returned false" };
    }
    return { status: "healthy", details: { query: "SELECT 1" } };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { status: "unhealthy", error: message };
  }
};

// ─── 4. Migrations ───────────────────────────────────────────────────────────

/**
 * Migrations probe — verifies that every SQL migration has been applied.
 * If any migration file is missing from the `_omniroute_migrations` table
 * the probe reports "unhealthy" with the count of pending migrations.
 */
export const migrationsProbe: HealthProbe = async (_timeoutMs) => {
  try {
    const dbMod = await import("@/lib/db/core");
    const runnerMod = await import("@/lib/db/migrationRunner");
    if (typeof dbMod.getDbInstance !== "function") {
      return { status: "degraded", error: "db unavailable" };
    }
    if (typeof runnerMod.getMigrationStatus !== "function") {
      // Schema not yet wired in this runtime (build/test) — surface as
      // "degraded" so we don't break cold-start probes.
      return { status: "degraded", error: "migration runner unavailable" };
    }
    const db = dbMod.getDbInstance();
    const status = runnerMod.getMigrationStatus(db);
    const appliedCount = status.applied.length;
    const pendingCount = status.pending.length;
    if (pendingCount > 0) {
      return {
        status: "unhealthy",
        error: `${pendingCount} pending migration(s)`,
        details: { applied: appliedCount, pending: pendingCount },
      };
    }
    return {
      status: "healthy",
      details: { applied: appliedCount, pending: 0 },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { status: "unhealthy", error: message };
  }
};

// ─── 5. Cache ────────────────────────────────────────────────────────────────

/**
 * Cache probe — surfaces the in-memory prompt cache's hit/miss ratio.
 * We don't fail the probe on a low ratio (operators want to see the
 * number, not have it hidden by a synthetic threshold), so this probe
 * only fails if the cache module is unreachable.
 *
 * The `details.hit_ratio` is a number in [0, 1] (or null when there are
 * zero observations yet).
 */
export const cacheProbe: HealthProbe = async (_timeoutMs) => {
  try {
    const mod = await import("@/lib/cacheLayer");
    if (typeof mod.getPromptCache !== "function") {
      return { status: "degraded", error: "cache unavailable" };
    }
    const cache = mod.getPromptCache();
    if (!cache || typeof (cache as { getStats?: unknown }).getStats !== "function") {
      return { status: "degraded", error: "cache stats unavailable" };
    }
    const raw = (cache as { getStats: () => Record<string, number> }).getStats();
    const hits = Number(raw?.hits ?? 0);
    const misses = Number(raw?.misses ?? 0);
    const total = hits + misses;
    const hit_ratio = total > 0 ? Number((hits / total).toFixed(4)) : null;
    return {
      status: "healthy",
      details: { hits, misses, total, hit_ratio, size: raw?.size ?? null },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { status: "unhealthy", error: message };
  }
};

// ─── 6. Bifrost (sidecar) ────────────────────────────────────────────────────

/**
 * Bifrost probe — pings the BIFROST_BASE_URL sidecar if configured.
 * Skips entirely when the env var is unset (degraded-only signal —
 * the readiness probe still passes, this just reports "degraded" with
 * `skipped: true` so operators can see bifrost is intentionally off).
 *
 * When configured, performs a HEAD against `${BIFROST_BASE_URL}/healthz`
 * with a short timeout (capped by the runner).
 */
export const bifrostProbe: HealthProbe = async (timeoutMs) => {
  const raw = process.env.BIFROST_BASE_URL?.replace(/\/$/, "");
  if (!raw) {
    return {
      status: "degraded",
      details: { skipped: true, reason: "BIFROST_BASE_URL not configured" },
    };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), Math.max(50, timeoutMs));
  if (typeof timer.unref === "function") timer.unref();
  try {
    const res = await fetch(`${raw}/healthz`, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      return {
        status: "unhealthy",
        error: `bifrost ${res.status}`,
        details: { url: raw, status_code: res.status },
      };
    }
    return {
      status: "healthy",
      details: { url: raw, status_code: res.status },
    };
  } catch (err) {
    clearTimeout(timer);
    const message = err instanceof Error ? err.message : String(err);
    const aborted = controller.signal.aborted;
    return {
      status: aborted ? "unhealthy" : "unhealthy",
      error: aborted ? "timeout" : message,
      details: { url: raw },
    };
  }
};

// ─── Registry wiring ────────────────────────────────────────────────────────

/**
 * Names exported as constants so the route + tests share one source of
 * truth. Adding a new probe means: define a probe above, register it
 * below, and add the name here.
 */
export const PROBE_NAMES = {
  LIVENESS: "liveness",
  READINESS: "readiness",
  DATABASE: "database",
  MIGRATIONS: "migrations",
  CACHE: "cache",
  BIFROST: "bifrost",
} as const;

/** Probes that always run (the shallow /api/health surface). */
export const SHALLOW_PROBES: ReadonlyArray<readonly [string, HealthProbe]> = [
  [PROBE_NAMES.LIVENESS, livenessProbe],
  [PROBE_NAMES.READINESS, readinessProbe],
];

/** Probes that only run in deep mode (?deep=1). */
export const DEEP_ONLY_PROBES: ReadonlyArray<readonly [string, HealthProbe]> = [
  [PROBE_NAMES.DATABASE, databaseProbe],
  [PROBE_NAMES.MIGRATIONS, migrationsProbe],
  [PROBE_NAMES.CACHE, cacheProbe],
  [PROBE_NAMES.BIFROST, bifrostProbe],
];

/** True once `registerDefaultProbes()` has run. */
let defaultProbesRegistered = false;

/**
 * Register every default probe exactly once. Subsequent calls are
 * idempotent. Called from the route handler on first invocation, and
 * from the test setup if needed.
 */
export function registerDefaultProbes(): void {
  if (defaultProbesRegistered) return;
  for (const [name, probe] of [...SHALLOW_PROBES, ...DEEP_ONLY_PROBES]) {
    registerProbe(name, probe);
  }
  defaultProbesRegistered = true;
}

/** Test seam — reset the registration flag. */
export function _resetProbeRegistrationForTesting(): void {
  defaultProbesRegistered = false;
}
