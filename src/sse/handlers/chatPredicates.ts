import {
  isLocalStreamLifecycleError,
  isLocalExecutionError,
  isModelCapacityOverloadError,
} from "../../shared/utils/circuitBreaker";
import { isRequestScopedUpstreamFailure } from "./comboFailureLogging";
import { getTrustedLocalRateLimitResponse } from "@omniroute/open-sse/services/rateLimitManager/errors";

export const PROVIDER_BREAKER_FAILURE_STATUSES = new Set([408, 500, 502, 503, 504]);

export function isProviderBreakerFailureStatus(status: number): boolean {
  return PROVIDER_BREAKER_FAILURE_STATUSES.has(Number(status));
}

// #7907/#7908: single-model breaker trip bypasses the `isFailure` option (only applies
// inside `breaker.execute()`), so it needs its own `isLocalStreamLifecycleError` guard —
// otherwise a client abort (502 default, error='request_signal_aborted') trips the
// provider-wide breaker. Pure predicate, unit-testable without the full request path.
export function shouldTripProviderBreakerForResult(
  result: {
    status: number;
    response?: Response;
    errorCode?: string | null;
    errorType?: string | null;
    error?: unknown;
  },
  isCombo: boolean,
  forceLiveComboTest: boolean
): boolean {
  return (
    !forceLiveComboTest &&
    !isCombo &&
    !isRequestScopedUpstreamFailure({ code: result.errorCode, type: result.errorType }) &&
    !(result.response && getTrustedLocalRateLimitResponse(result.response)) &&
    !isLocalStreamLifecycleError(result.error) &&
    !isLocalExecutionError(result.error) &&
    // Network-layer errors (ECONNREFUSED, ETIMEDOUT) never reached the provider —
    // the provider may be healthy, only the network path is broken. OmniRoute's own
    // rate-limit queue timeouts are backpressure we applied, not a provider failure.
    result.errorCode !== "proxy_unreachable" &&
    result.errorCode !== "RATE_LIMIT_QUEUE_TIMEOUT" &&
    result.errorCode !== "RATE_LIMIT_QUEUE_WEDGED" &&
    !isModelCapacityOverloadError(result.error) &&
    !isModelCapacityOverloadError(result.status) &&
    PROVIDER_BREAKER_FAILURE_STATUSES.has(Number(result.status))
  );
}

export type ProviderBreakerResultOutcome = "success" | "failure" | "ignore";

/**
 * #12254: single source of truth for how a resolved dispatch result is accounted
 * against the per-provider breaker. `handleChatCore()` resolves with
 * `{ success: false, status: 5xx }` for most upstream failures, so `breaker.execute()`
 * cannot classify it — the call site does, exactly once:
 * - combo dispatches and live combo tests are "ignore": the combo target loop owns the
 *   accounting (`recordProviderFailure()` / `recordProviderSuccess()`), which also knows
 *   about same-provider-next and `skipProviderBreaker`;
 * - a successful single-model dispatch is a "success";
 * - a failed one is a "failure" only when `shouldTripProviderBreakerForResult()` agrees.
 */
export function classifyProviderBreakerResult(
  result: {
    success?: boolean;
    status: number;
    response?: Response;
    errorCode?: string | null;
    errorType?: string | null;
    error?: unknown;
  },
  isCombo: boolean,
  forceLiveComboTest: boolean
): ProviderBreakerResultOutcome {
  if (forceLiveComboTest || isCombo) return "ignore";
  if (result.success) return "success";
  return shouldTripProviderBreakerForResult(result, isCombo, forceLiveComboTest)
    ? "failure"
    : "ignore";
}

export function isAntigravityMissingProjectError(
  provider: string,
  result: { status?: number; errorCode?: string; errorType?: string }
): boolean {
  return (
    provider === "antigravity" &&
    result.status === 422 &&
    result.errorCode === "missing_project_id" &&
    result.errorType === "oauth_missing_project_id"
  );
}

/**
 * Keep stream-readiness routing decisions on the stable gate diagnostic.
 * The operator-facing error can contain arbitrary upstream words such as
 * "quota" or "retry after", which must not change account/combo classification.
 */
export function resolveStreamReadinessClassificationError(
  result: {
    classificationError?: unknown;
    error?: unknown;
    errorCode?: unknown;
  },
  fallback = "Antigravity stream ended before useful content"
): string {
  for (const value of [result.classificationError, result.error, result.errorCode]) {
    if (typeof value === "string" && value.trim()) return value;
  }
  return fallback;
}
