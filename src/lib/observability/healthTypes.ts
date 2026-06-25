/**
 * healthTypes.ts — Type definitions for /api/health.
 *
 * The health response is intentionally structured: each check is independently
 * evaluated (so a single failing check doesn't mask a passing one) and the
 * overall status is computed by `aggregateChecks` (defined in healthChecks.ts).
 *
 * Three terminal states:
 *  - "ok"    — check passed cleanly within budget
 *  - "warn"  — check passed but tripped a soft threshold (e.g. memory 70%+)
 *  - "fail"  — check failed (timeout, exception, threshold exceeded)
 */

/** Discrete state for a single check or aggregated health response. */
export type HealthCheckStatus = "ok" | "warn" | "fail";

/** Result of a single named check. */
export interface HealthCheckResult {
  readonly status: HealthCheckStatus;
  readonly durationMs: number;
  readonly details?: Readonly<Record<string, unknown>>;
  /** Filled when the check failed due to an exception or timeout. */
  readonly error?: string;
}

/** Top-level HTTP response body for /api/health. */
export interface HealthResponse {
  readonly status: HealthCheckStatus;
  readonly version: string;
  readonly uptimeSeconds: number;
  readonly timestamp: string;
  readonly checks: Readonly<Record<string, HealthCheckResult>>;
  /** Present only when at least one check failed. */
  readonly errors?: ReadonlyArray<{ check: string; message: string }>;
}