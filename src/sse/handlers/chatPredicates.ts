import { isLocalStreamLifecycleError } from "../../shared/utils/circuitBreaker";
import { isRequestScopedUpstreamFailure } from "./comboFailureLogging";

const PROVIDER_BREAKER_FAILURE_STATUSES = new Set([408, 500, 502, 503, 504]);

// #7907/#7908: single-model breaker trip bypasses the `isFailure` option (only applies
// inside `breaker.execute()`), so it needs its own `isLocalStreamLifecycleError` guard —
// otherwise a client abort (502 default, error='request_signal_aborted') trips the
// provider-wide breaker. Pure predicate, unit-testable without the full request path.
export function shouldTripProviderBreakerForResult(
  result: { status: number; errorCode?: string | null; errorType?: string | null; error?: unknown },
  isCombo: boolean,
  forceLiveComboTest: boolean
): boolean {
  return (
    !forceLiveComboTest &&
    !isCombo &&
    !isRequestScopedUpstreamFailure({ code: result.errorCode, type: result.errorType }) &&
    !isLocalStreamLifecycleError(result.error) &&
    PROVIDER_BREAKER_FAILURE_STATUSES.has(Number(result.status))
  );
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
