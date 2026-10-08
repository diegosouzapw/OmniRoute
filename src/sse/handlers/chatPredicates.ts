import {
  isLocalStreamLifecycleError,
  isLocalExecutionError,
  isModelCapacityOverloadError,
} from "../../shared/utils/circuitBreaker";
import { isRequestScopedUpstreamFailure } from "./comboFailureLogging";
import { getTrustedLocalRateLimitResponse } from "@omniroute/open-sse/services/rateLimitManager/errors";
import { TRANSLATION_FAILURE_CODE } from "@omniroute/open-sse/handlers/chatCore/translationFailure";
import { isProviderCircuitOpenResult } from "@omniroute/open-sse/services/combo/comboPredicates.ts";

export const PROVIDER_BREAKER_FAILURE_STATUSES = new Set([408, 500, 502, 503, 504]);

export function isProviderBreakerFailureStatus(status: number): boolean {
  return PROVIDER_BREAKER_FAILURE_STATUSES.has(Number(status));
}

/**
 * ChatGPT Web clean-room bridge failures are local integration failures, not
 * evidence that the browser credential or the provider is unavailable. They
 * commonly surface as synthetic 502s and must not disable the connection or
 * open the provider-wide breaker after one malformed/stale browser bridge.
 *
 * The pattern list mirrors the messages `chatgptWebFirstParty.ts` and
 * `chatgptWebBrowserSession.ts` actually throw; keep it aligned when those
 * change, or a local browser failure silently re-enables account cooldown.
 */
export function isChatGptWebBridgeFailure(
  provider: string | null | undefined,
  error: unknown
): boolean {
  if (provider !== "chatgpt-web") return false;
  const message =
    typeof error === "string"
      ? error
      : error &&
          typeof error === "object" &&
          typeof (error as { message?: unknown }).message === "string"
        ? (error as { message: string }).message
        : "";
  // A missing/unlaunchable browser binary is a local install problem, not a dead
  // account: Playwright reports `browserType.launch: Executable doesn't exist at …`.
  if (
    /browserType\.launch|Executable doesn't exist|browser launch (?:timed out|failed)/i.test(
      message
    )
  ) {
    return true;
  }
  return /ChatGPT Web (?:first-party )?(?:request client is unavailable|challenge bridge is incomplete|conversation request scope is unavailable|request cancellation scope is unavailable|request scope is unavailable|bridge did not initialize|bridge module failed to load|request module was not loaded|module contract (?:was not found|exports were not found)|conversation returned (?:an invalid response|an empty stream|a non-SSE response)|browser turn timed out|browser launch timed out|sentinel headers are unavailable)/i.test(
    message
  );
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
  forceLiveComboTest: boolean,
  provider?: string | null
): boolean {
  return (
    !forceLiveComboTest &&
    !isCombo &&
    !isProviderCircuitOpenResult(
      result.response ?? {},
      String(result.errorCode ?? result.error ?? "")
    ) &&
    !isRequestScopedUpstreamFailure({ code: result.errorCode, type: result.errorType }) &&
    !(result.response && getTrustedLocalRateLimitResponse(result.response)) &&
    !isLocalStreamLifecycleError(result.error) &&
    !isChatGptWebBridgeFailure(provider, result.error) &&
    !isLocalExecutionError(result.error) &&
    // Network-layer errors (ECONNREFUSED, ETIMEDOUT) never reached the provider —
    // the provider may be healthy, only the network path is broken. OmniRoute's own
    // rate-limit queue timeouts are backpressure we applied, not a provider failure.
    result.errorCode !== "proxy_unreachable" &&
    result.errorCode !== "RATE_LIMIT_QUEUE_TIMEOUT" &&
    result.errorCode !== "RATE_LIMIT_QUEUE_WEDGED" &&
    // #14815: a request that failed translation never left OmniRoute.
    result.errorCode !== TRANSLATION_FAILURE_CODE &&
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
  forceLiveComboTest: boolean,
  provider?: string | null
): ProviderBreakerResultOutcome {
  if (forceLiveComboTest || isCombo) return "ignore";
  if (result.success) return "success";
  return shouldTripProviderBreakerForResult(result, isCombo, forceLiveComboTest, provider)
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
