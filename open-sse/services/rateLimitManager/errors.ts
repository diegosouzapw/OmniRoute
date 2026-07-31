export const RATE_LIMIT_EXECUTION_TIMEOUT_CODE = "RATE_LIMIT_EXECUTION_TIMEOUT";
export const RATE_LIMIT_QUEUE_FULL_CODE = "RATE_LIMIT_QUEUE_FULL";
export const RATE_LIMIT_QUEUE_WEDGED_CODE = "RATE_LIMIT_QUEUE_WEDGED";

export type LocalRateLimitErrorCode =
  | typeof RATE_LIMIT_EXECUTION_TIMEOUT_CODE
  | typeof RATE_LIMIT_QUEUE_FULL_CODE
  | typeof RATE_LIMIT_QUEUE_WEDGED_CODE;

const LOCAL_RATE_LIMIT_ERROR_CODES: Record<string, true> = {
  [RATE_LIMIT_EXECUTION_TIMEOUT_CODE]: true,
  [RATE_LIMIT_QUEUE_FULL_CODE]: true,
  [RATE_LIMIT_QUEUE_WEDGED_CODE]: true,
  // Compatibility for persisted/remote results produced before the execution
  // expiration was named accurately. New code must not emit this legacy value.
  RATE_LIMIT_QUEUE_TIMEOUT: true,
};

/** Local scheduler failures are request-scoped and must never poison upstream health state. */
export function isLocalRateLimitErrorCode(code: unknown): boolean {
  return typeof code === "string" && LOCAL_RATE_LIMIT_ERROR_CODES[code.toUpperCase()] === true;
}

/** HTTP status used when chatCore surfaces an OmniRoute-owned limiter failure. */
export function getLocalRateLimitFailureStatus(code: unknown): number | null {
  if (typeof code !== "string") return null;
  switch (code.toUpperCase()) {
    case RATE_LIMIT_QUEUE_FULL_CODE:
      return 429;
    case RATE_LIMIT_EXECUTION_TIMEOUT_CODE:
      return 504;
    case RATE_LIMIT_QUEUE_WEDGED_CODE:
    case "RATE_LIMIT_QUEUE_TIMEOUT":
      return 503;
    default:
      return null;
  }
}
