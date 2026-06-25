/**
 * types.ts — Type definitions for the /api/health endpoint (PR-009).
 *
 * The health endpoint exposes a stable, structured surface for load
 * balancers, Kubernetes probes, and operator dashboards. Three terminal
 * states:
 *
 *   - "healthy"   — every check passed cleanly within budget
 *   - "degraded"  — at least one check returned 'degraded' but none failed
 *   - "unhealthy" — at least one check failed (or timed out)
 *
 * The check-level `status` mirrors the same vocabulary; the per-check
 * `error` field is reserved for failure messages and is *never* present
 * on a healthy/degraded check.
 *
 * Stability contract:
 *   - Field names + types in `HealthReport` MUST NOT change without a
 *     coordinated SLO-burn-rate migration; operators depend on these
 *     for alerting.
 *   - Per-check `latency_ms` is required on every entry; the `details`
 *     object is optional and may evolve.
 */

export type HealthStatus = "healthy" | "degraded" | "unhealthy";

export type CheckStatus = "healthy" | "degraded" | "unhealthy";

export interface HealthCheck {
  readonly status: CheckStatus;
  /** Wall-clock latency of the check in milliseconds. Always present. */
  readonly latency_ms: number;
  /** Filled only when the check did not complete cleanly. */
  readonly error?: string;
  /** Probe-specific auxiliary data (hit ratios, schema versions, etc.). */
  readonly details?: Readonly<Record<string, unknown>>;
}

/**
 * Top-level report returned by GET /api/health. The shape is part of the
 * public probe contract — operators parse it from k8s probes and dashboard
 * widgets, so additive changes only.
 */
export interface HealthReport {
  readonly status: HealthStatus;
  readonly version: string;
  readonly uptime_seconds: number;
  /** ISO-8601 timestamp of when the process started (immutable). */
  readonly started_at: string;
  /** ISO-8601 timestamp of when this report was generated. */
  readonly timestamp: string;
  /** Per-check results keyed by stable check name. */
  readonly checks: Readonly<Record<string, HealthCheck>>;
}

/**
 * A probe is an async function that runs a single health check and returns
 * a partial result. The runner (`runChecks`) measures latency and applies
 * the per-check timeout policy.
 *
 * Probes must NEVER throw — any thrown error is converted by the runner
 * into an "unhealthy" result with the message captured. (This contract is
 * what the `buildReport` aggregator relies on.)
 */
export type HealthProbe = (timeoutMs: number) => Promise<{
  status: CheckStatus;
  error?: string;
  details?: Readonly<Record<string, unknown>>;
}>;
