/**
 * buildReport.ts — Aggregate per-check results into a HealthReport (PR-009).
 *
 * The overall status uses a "worst wins" policy:
 *   - any "unhealthy" check → "unhealthy"
 *   - else any "degraded" check → "degraded"
 *   - else → "healthy"
 *
 * `started_at` is captured by the caller (process start time) and passed
 * in as an argument so the report is reproducible: two probes called
 * within the same second will report identical `started_at` / `uptime_seconds`.
 *
 * `version` is read from `package.json` via the central `APP_CONFIG`
 * constant. Tests can stub the constant by mocking the import — see
 * `tests/unit/health/build-report.test.ts`.
 */

import { APP_CONFIG } from "@/shared/constants/appConfig";

import type { CheckStatus, HealthCheck, HealthReport, HealthStatus } from "./types";

/** Map a single check status to its severity rank (higher = worse). */
function severity(s: CheckStatus): number {
  if (s === "unhealthy") return 2;
  if (s === "degraded") return 1;
  return 0;
}

/**
 * Combine per-check results into the overall report status using a
 * "worst wins" policy. The empty-checks case returns "healthy" — a
 * trivial report (no checks configured) should not be interpreted as
 * a service-wide failure.
 */
export function aggregateStatus(checks: Readonly<Record<string, HealthCheck>>): HealthStatus {
  let worst: HealthStatus = "healthy";
  for (const check of Object.values(checks)) {
    const rank = severity(check.status);
    if (rank === 2) return "unhealthy";
    if (rank === 1) worst = "degraded";
  }
  return worst;
}

/**
 * Sum the latencies of every check. Used by the "latency aggregation"
 * test and surfaced to callers that want a quick "is anything slow?"
 * signal without re-walking the report.
 */
export function aggregateLatencyMs(checks: Readonly<Record<string, HealthCheck>>): number {
  let total = 0;
  for (const check of Object.values(checks)) {
    total += check.latency_ms;
  }
  return total;
}

/**
 * Pick the worst individual check by status. Ties are broken by latency
 * (the slowest probe wins, so operators see the latency offender first).
 * Returns null when no checks are present.
 */
export function worstCheck(
  checks: Readonly<Record<string, HealthCheck>>,
): { name: string; check: HealthCheck } | null {
  let picked: { name: string; check: HealthCheck } | null = null;
  let pickedRank = -1;
  let pickedLatency = -1;
  for (const [name, check] of Object.entries(checks)) {
    const rank = severity(check.status);
    const latency = check.latency_ms;
    // Strictly worse status OR same status with slower latency wins.
    if (
      rank > pickedRank ||
      (rank === pickedRank && latency > pickedLatency)
    ) {
      picked = { name, check };
      pickedRank = rank;
      pickedLatency = latency;
    }
  }
  return picked;
}

export interface BuildReportOptions {
  /** Per-check results keyed by stable probe name. */
  readonly checks: Readonly<Record<string, HealthCheck>>;
  /** ISO-8601 string of when the process started. */
  readonly startedAt: string;
  /** Override for the version string (tests). */
  readonly version?: string;
  /** Override timestamp; defaults to `new Date().toISOString()`. */
  readonly now?: () => Date;
}

/**
 * Compose the final `HealthReport`. This is the single canonical shape
 * every consumer reads from. The route handler calls this exactly once
 * per request and serializes the result as JSON.
 */
export function buildReport(opts: BuildReportOptions): HealthReport {
  const status = aggregateStatus(opts.checks);
  const now = (opts.now ?? (() => new Date()))();
  const uptimeSeconds = Math.max(
    0,
    Math.floor((now.getTime() - new Date(opts.startedAt).getTime()) / 1000),
  );
  return {
    status,
    version: opts.version ?? APP_CONFIG.version,
    uptime_seconds: uptimeSeconds,
    started_at: opts.startedAt,
    timestamp: now.toISOString(),
    checks: opts.checks,
  };
}

/**
 * HTTP status code for the response. Mirrors the route handler's policy
 * (healthy/degraded → 200, unhealthy → 503) and is exposed here so tests
 * can assert the mapping without spinning up a Next.js request.
 */
export function httpStatusFor(report: HealthReport): number {
  return report.status === "unhealthy" ? 503 : 200;
}
