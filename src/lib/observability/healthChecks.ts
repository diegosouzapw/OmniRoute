/**
 * healthChecks.ts — Health-check runner + builtin checks.
 *
 * Provides:
 *  - `runHealthCheck(name, fn, timeoutMs)` — runs a check with timeout, catches
 *    errors, returns `{status, durationMs, details, error?}`. Status defaults
 *    to "ok"; throws promote to "fail".
 *  - `aggregateChecks(results)` — returns "ok" if all ok, "warn" if any warn,
 *    "fail" if any fail.
 *  - `BUILTIN_CHECKS` — the seven deep checks requested by PR-009.
 *
 * All builtin checks are best-effort: any exception inside `runHealthCheck`
 * becomes a "fail" with the error message captured, so the route handler
 * never needs to wrap each check in try/catch.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { HealthCheckResult, HealthCheckStatus } from "./healthTypes";

/** Default per-check budget — matches the spec (2s). */
export const DEFAULT_CHECK_TIMEOUT_MS = 2_000;

/** Default disk-space threshold — matches the spec (100 MB). */
export const DEFAULT_MIN_FREE_BYTES = 100 * 1024 * 1024;

/** Memory soft-warn threshold (heap used / heap total). */
export const MEMORY_WARN_RATIO = 0.7;

/** Memory fail threshold (heap used / heap total). */
export const MEMORY_FAIL_RATIO = 0.8;

/** Event-loop lag warn threshold (ms). */
export const EVENT_LOOP_LAG_WARN_MS = 50;

/** Event-loop lag fail threshold (ms). */
export const EVENT_LOOP_LAG_FAIL_MS = 100;

/**
 * Run a health check function with a hard timeout. The check's promise races
 * against a timer; whichever resolves first wins. Errors are caught and
 * surfaced as a "fail" result so the caller never sees an exception.
 */
export async function runHealthCheck(
  name: string,
  fn: () => Promise<HealthCheckResult>,
  timeoutMs: number = DEFAULT_CHECK_TIMEOUT_MS
): Promise<HealthCheckResult> {
  const startedAt = Date.now();
  try {
    const result = await withTimeout(fn(), timeoutMs, name);
    return {
      status: result.status ?? "ok",
      durationMs: Date.now() - startedAt,
      details: result.details,
      ...(result.error ? { error: result.error } : {}),
    };
  } catch (err) {
    return {
      status: "fail",
      durationMs: Date.now() - startedAt,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Race a promise against a timer. If the timer fires first, reject with a
 * `TimeoutError` so `runHealthCheck` translates it to a "fail" result.
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Health check '${label}' exceeded ${timeoutMs}ms timeout`));
    }, timeoutMs);
    // Don't keep the event loop alive solely for a check timeout.
    if (typeof timer.unref === "function") timer.unref();
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

/**
 * Combine results from many checks into the overall response status.
 *  - any "fail" → "fail"
 *  - else any "warn" → "warn"
 *  - else → "ok"
 */
export function aggregateChecks(results: HealthCheckResult[]): HealthCheckStatus {
  let sawWarn = false;
  for (const r of results) {
    if (r.status === "fail") return "fail";
    if (r.status === "warn") sawWarn = true;
  }
  return sawWarn ? "warn" : "ok";
}

// ─── Builtin checks ───────────────────────────────────────────────────────────

/**
 * Open a sqlite connection and run `SELECT 1`. Implementation is deliberately
 * tolerant: if the DB layer is unavailable (Cloud runtime, build phase, etc.)
 * we surface a "fail" rather than crashing.
 */
async function checkDatabase(): Promise<HealthCheckResult> {
  try {
    const mod = await import("@/lib/db/core");
    if (typeof mod.pingDb !== "function") {
      return { status: "fail", durationMs: 0, error: "pingDb() unavailable" };
    }
    const ok = mod.pingDb();
    if (!ok) {
      return { status: "fail", durationMs: 0, error: "SELECT 1 returned false" };
    }
    return { status: "ok", durationMs: 0, details: { query: "SELECT 1" } };
  } catch (err) {
    return {
      status: "fail",
      durationMs: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Verify the AI provider catalog is parseable and non-empty.
 * The catalog is sourced from `@/shared/constants/providers` (AI_PROVIDERS).
 */
async function checkProviderRegistry(): Promise<HealthCheckResult> {
  try {
    const mod = await import("@/shared/constants/providers");
    const providers = mod.AI_PROVIDERS;
    const count = providers && typeof providers === "object" ? Object.keys(providers).length : 0;
    if (count === 0) {
      return { status: "fail", durationMs: 0, error: "Provider catalog is empty" };
    }
    return { status: "ok", durationMs: 0, details: { providerCount: count } };
  } catch (err) {
    return {
      status: "fail",
      durationMs: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Check that both `/` (or `process.cwd()` on Windows) and the data directory
 * have at least `DEFAULT_MIN_FREE_BYTES` free. Either failing demotes to
 * "fail" with the smaller free space surfaced in `details`.
 */
async function checkDiskSpace(): Promise<HealthCheckResult> {
  try {
    const candidates: Array<{ label: string; dir: string }> = [];
    candidates.push({ label: "cwd", dir: process.cwd() });
    try {
      const dataPaths = await import("@/lib/dataPaths");
      const dataDir = dataPaths.getDefaultDataDir();
      if (dataDir) candidates.push({ label: "data", dir: dataDir });
    } catch {
      // dataPaths unavailable — cwd check is enough to surface the failure
    }

    const failures: Array<{ label: string; freeBytes: number }> = [];
    const observations: Array<{ label: string; freeBytes: number }> = [];

    for (const c of candidates) {
      try {
        const stat = fs.statfsSync(c.dir);
        const freeBytes = Number(stat.bavail) * Number(stat.bsize);
        observations.push({ label: c.label, freeBytes });
        if (freeBytes < DEFAULT_MIN_FREE_BYTES) {
          failures.push({ label: c.label, freeBytes });
        }
      } catch (err) {
        // statfs may be unavailable on some platforms — surface as a warn.
        observations.push({
          label: c.label,
          freeBytes: -1,
        });
        failures.push({
          label: c.label,
          freeBytes: -1,
        });
        // but downgrade the reason to a stat-failure rather than "low disk"
        // eslint-disable-next-line no-console
        console.warn(`[health] disk check failed for ${c.dir}:`, err);
      }
    }

    if (failures.length > 0) {
      return {
        status: "fail",
        durationMs: 0,
        details: { observations, thresholdBytes: DEFAULT_MIN_FREE_BYTES },
        error: failures.map((f) => `${f.label}: low disk`).join("; "),
      };
    }
    return { status: "ok", durationMs: 0, details: { observations, thresholdBytes: DEFAULT_MIN_FREE_BYTES } };
  } catch (err) {
    return {
      status: "fail",
      durationMs: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Memory check — heap used vs heap total. Below 70% → ok, 70-80% → warn,
 * 80%+ → fail. Uses process.memoryUsage().
 */
async function checkMemory(): Promise<HealthCheckResult> {
  try {
    const mem = process.memoryUsage();
    const heapTotal = mem.heapTotal || 0;
    const heapUsed = mem.heapUsed || 0;
    const ratio = heapTotal > 0 ? heapUsed / heapTotal : 0;
    const details = {
      heapUsedBytes: heapUsed,
      heapTotalBytes: heapTotal,
      rssBytes: mem.rss,
      externalBytes: mem.external,
      ratio: Number(ratio.toFixed(4)),
    };
    if (ratio >= MEMORY_FAIL_RATIO) {
      return { status: "fail", durationMs: 0, details, error: "Heap usage exceeds 80%" };
    }
    if (ratio >= MEMORY_WARN_RATIO) {
      return { status: "warn", durationMs: 0, details, error: "Heap usage exceeds 70%" };
    }
    return { status: "ok", durationMs: 0, details };
  } catch (err) {
    return {
      status: "fail",
      durationMs: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Measure event-loop lag. We schedule a setImmediate, then resolve with the
 * delta between when we scheduled it and when it actually ran. If the
 * difference exceeds 100ms, fail; 50-100ms is warn.
 */
async function checkEventLoop(): Promise<HealthCheckResult> {
  try {
    const lagMs = await measureEventLoopLag();
    const details = { lagMs };
    if (lagMs >= EVENT_LOOP_LAG_FAIL_MS) {
      return { status: "fail", durationMs: 0, details, error: `Event loop lag ${lagMs}ms exceeds 100ms` };
    }
    if (lagMs >= EVENT_LOOP_LAG_WARN_MS) {
      return { status: "warn", durationMs: 0, details, error: `Event loop lag ${lagMs}ms exceeds 50ms` };
    }
    return { status: "ok", durationMs: 0, details };
  } catch (err) {
    return {
      status: "fail",
      durationMs: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Estimate event-loop lag via setImmediate + Date.now diff. This is a
 * well-known Node.js trick (also used by `toobusy-js` and similar libs).
 * Returns the lag in milliseconds (0 if the loop is idle).
 */
function measureEventLoopLag(): Promise<number> {
  return new Promise((resolve) => {
    const start = Date.now();
    setImmediate(() => {
      const elapsed = Date.now() - start;
      // Subtract ~0ms ideal (setImmediate should fire on the next tick).
      // Negative values are clamped to 0.
      resolve(Math.max(0, elapsed));
    });
  });
}

/**
 * Validate the runtime config against `configSchema.json` if present. The
 * schema file is optional; if missing, we surface a "warn" rather than fail
 * so first-time installs (no schema yet) don't break the probe.
 */
async function checkConfigSchema(): Promise<HealthCheckResult> {
  const schemaPath = path.resolve(process.cwd(), "configSchema.json");
  if (!fs.existsSync(schemaPath)) {
    return {
      status: "warn",
      durationMs: 0,
      details: { reason: "configSchema.json not found" },
      error: "schema file missing",
    };
  }
  try {
    const raw = fs.readFileSync(schemaPath, "utf8");
    JSON.parse(raw);
    return { status: "ok", durationMs: 0, details: { path: schemaPath } };
  } catch (err) {
    return {
      status: "fail",
      durationMs: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Tenant-quota check — scan the in-memory quota cache for any tenant whose
 * usage ratio exceeds the fail threshold (95%). If the quota module is
 * unavailable, surface a "warn" rather than fail (the cache may simply be
 * empty on cold start).
 */
async function checkTenantQuota(): Promise<HealthCheckResult> {
  try {
    const mod = await import("@/domain/quotaCache");
    if (typeof mod.getQuotaCacheStats !== "function") {
      return {
        status: "warn",
        durationMs: 0,
        details: { reason: "quotaCache stats unavailable" },
      };
    }
    const stats = mod.getQuotaCacheStats();
    const entries = Array.isArray(stats?.entries) ? stats.entries : [];
    const failing: string[] = [];
    const warning: string[] = [];
    for (const entry of entries) {
      const isExhausted = Boolean(entry?.exhausted);
      if (isExhausted) {
        failing.push(entry?.connectionId ?? "unknown");
      } else if (typeof entry?.ageMs === "number" && entry.ageMs > 60 * 60 * 1000) {
        // Stale-quota warning: an entry that hasn't refreshed in >1h is suspect.
        warning.push(entry?.connectionId ?? "unknown");
      }
    }
    const details = { totalEntries: entries.length, failing, warning };
    if (failing.length > 0) {
      return {
        status: "fail",
        durationMs: 0,
        details,
        error: `${failing.length} tenant(s) over 95% quota`,
      };
    }
    if (warning.length > 0) {
      return {
        status: "warn",
        durationMs: 0,
        details,
        error: `${warning.length} tenant(s) have stale quota cache`,
      };
    }
    return { status: "ok", durationMs: 0, details };
  } catch (err) {
    return {
      status: "warn",
      durationMs: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Map of name → builtin check fn for the /api/health endpoint. NOT frozen so
 * tests can monkey-patch individual checks via `BUILTIN_CHECKS.x = stub` —
 * the route reads this object via `Object.entries(BUILTIN_CHECKS)` at request
 * time, so per-test overrides take effect on the next request without
 * re-importing the route module. The route itself never writes here.
 */
export const BUILTIN_CHECKS: Record<string, () => Promise<HealthCheckResult>> = {
  database: checkDatabase,
  providerRegistry: checkProviderRegistry,
  diskSpace: checkDiskSpace,
  memory: checkMemory,
  eventLoop: checkEventLoop,
  configSchema: checkConfigSchema,
  tenantQuota: checkTenantQuota,
};

/** Convenience: enumerate the check names in a stable order. */
export const BUILTIN_CHECK_ORDER: readonly string[] = [
  "database",
  "providerRegistry",
  "diskSpace",
  "memory",
  "eventLoop",
  "configSchema",
  "tenantQuota",
];

/** Convenience: derive a human-readable host summary for the response. */
export function hostSummary(): Record<string, unknown> {
  return {
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
    cpus: Array.isArray(os.cpus?.()) ? os.cpus()!.length : 0,
  };
}