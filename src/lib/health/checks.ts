/**
 * checks.ts — Health-check registry + runner (PR-009).
 *
 * The registry holds named probe functions and runs them in parallel with
 * an enforced per-check timeout. The runner is the *only* code in this
 * module that touches a clock; probe functions are pure async work.
 *
 * Design notes:
 *  - Probes never throw (the registry wraps their call in try/catch).
 *  - Each probe is timed out at `DEFAULT_CHECK_TIMEOUT_MS` (2s). A timeout
 *    produces `status="unhealthy"`, `error="timeout"`.
 *  - Probes run in parallel via `Promise.all`. A single hung probe does
 *    NOT stall the others.
 *  - The histogram `omniroute_health_check_duration_seconds{name}` is
 *    recorded on every check via the observability metrics module. The
 *    metric is a no-op when observability is disabled, so this file is
 *    safe to import unconditionally.
 *  - The registry is module-scoped and mutable: tests can register
 *    custom probes via `registerProbe`, and production code wires the
 *    six default probes in `probes.ts`.
 */

import { getOrCreateHistogram } from "@/lib/observability/metrics";

import type { CheckStatus, HealthCheck, HealthProbe } from "./types";

/** Default per-check budget. Matches the PR-009 spec. */
export const DEFAULT_CHECK_TIMEOUT_MS = 2_000;

/** Metric name used for the per-check latency histogram. */
export const HEALTH_CHECK_DURATION_METRIC = "omniroute_health_check_duration_seconds";

const durationHistogram = getOrCreateHistogram(
  HEALTH_CHECK_DURATION_METRIC,
  "Wall-clock latency of each /api/health check, in seconds.",
);

/**
 * Module-scoped registry. Keyed by stable check name (e.g. "database").
 * Order of insertion is preserved on enumeration so the report always
 * renders checks in a predictable sequence.
 */
const REGISTRY: Map<string, HealthProbe> = new Map();

/** Register (or replace) a probe under a stable name. */
export function registerProbe(name: string, probe: HealthProbe): void {
  REGISTRY.set(name, probe);
}

/** Remove a probe from the registry. Returns true if a probe was removed. */
export function unregisterProbe(name: string): boolean {
  return REGISTRY.delete(name);
}

/** Read-only view of the registered probes (in insertion order). */
export function listProbes(): ReadonlyArray<readonly [string, HealthProbe]> {
  return Array.from(REGISTRY.entries());
}

/** Clear every registered probe. Intended for tests. */
export function clearProbes(): void {
  REGISTRY.clear();
}

/**
 * Race a probe against a timer. If the timer fires first, reject with a
 * tagged error so `runProbe` can translate it to an "unhealthy" /
 * `error="timeout"` result. The timer is `unref()`'d so it never holds
 * the event loop alive on its own.
 */
function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  label: string,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`timeout: ${label} exceeded ${timeoutMs}ms`));
    }, timeoutMs);
    if (typeof timer.unref === "function") timer.unref();
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

/**
 * Run a single named probe under a hard timeout, catch every error, and
 * return a normalized `HealthCheck` (always populated; never throws).
 *
 * Latency is recorded on the histogram as `seconds` (Prometheus / OTel
 * convention), tagged with `name` so per-check distributions can be
 * queried independently for SLO burn-rate calculations.
 */
export async function runProbe(
  name: string,
  probe: HealthProbe,
  timeoutMs: number = DEFAULT_CHECK_TIMEOUT_MS,
): Promise<HealthCheck> {
  const startedAt = Date.now();
  try {
    const result = await withTimeout(probe(timeoutMs), timeoutMs, name);
    const latency_ms = Date.now() - startedAt;
    durationHistogram.record(latency_ms / 1000, { name, status: result.status });
    const check: HealthCheck = {
      status: result.status,
      latency_ms,
      ...(result.details ? { details: result.details } : {}),
    };
    return result.error ? { ...check, error: result.error } : check;
  } catch (err) {
    const latency_ms = Date.now() - startedAt;
    const raw = err instanceof Error ? err.message : String(err);
    const isTimeout = raw.startsWith("timeout:");
    const error = isTimeout ? "timeout" : raw;
    const status: CheckStatus = "unhealthy";
    durationHistogram.record(latency_ms / 1000, { name, status });
    return { status, latency_ms, error };
  }
}

/**
 * Run every registered probe in parallel and return a `name -> HealthCheck`
 * map. The overall ordering matches `listProbes()` insertion order so the
 * serialized report is deterministic.
 */
export async function runAllProbes(
  timeoutMs: number = DEFAULT_CHECK_TIMEOUT_MS,
): Promise<Record<string, HealthCheck>> {
  const entries = listProbes();
  const settled = await Promise.all(
    entries.map(async ([name, probe]) => [name, await runProbe(name, probe, timeoutMs)] as const),
  );
  const out: Record<string, HealthCheck> = {};
  for (const [name, check] of settled) out[name] = check;
  return out;
}
