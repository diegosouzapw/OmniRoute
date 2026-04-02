import { isAccountDeactivated, isCreditsExhausted } from "./accountFallback.ts";

export const PROVIDER_ERROR_TYPES = {
  RATE_LIMITED: "rate_limited", // 429 — transient, retry with backoff
  UNAUTHORIZED: "unauthorized", // 401 — token expired, refresh
  ACCOUNT_DEACTIVATED: "account_deactivated", // 401 + deactivation signal
  FORBIDDEN: "forbidden", // 403 — account banned/revoked, disable node
  SERVER_ERROR: "server_error", // 500/502/503 — retry limited
  QUOTA_EXHAUSTED: "quota_exhausted", // 402/429/400 + billing signals
  PROJECT_ROUTE_ERROR: "project_route_error", // 403 + stale project — transient, not a ban
};

function responseBodyToString(responseBody: unknown): string {
  if (typeof responseBody === "string") return responseBody;
  if (responseBody !== null && typeof responseBody === "object") {
    try {
      return JSON.stringify(responseBody);
    } catch {
      return "";
    }
  }
  return "";
}

export function classifyProviderError(statusCode: number, responseBody: unknown): string | null {
  const bodyStr = responseBodyToString(responseBody);
  const creditsExhausted = isCreditsExhausted(bodyStr);
  const accountDeactivated = isAccountDeactivated(bodyStr);

  // T10: credits exhausted is terminal and can appear as 400/402/429 depending on provider.
  if (
    creditsExhausted &&
    (statusCode === 400 || statusCode === 402 || statusCode === 429 || statusCode === 403)
  ) {
    return PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED;
  }

  if (statusCode === 429) {
    return PROVIDER_ERROR_TYPES.RATE_LIMITED;
  }

  // T06: only deactivation-like 401s should be treated as permanent account expiry.
  if (statusCode === 401) {
    return accountDeactivated
      ? PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED
      : PROVIDER_ERROR_TYPES.UNAUTHORIZED;
  }

  if (statusCode === 402) return PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED;
  if (statusCode === 403 && accountDeactivated) {
    return PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED;
  }
  if (statusCode === 403) {
    // Cloud Code API returns 403 with "has not been used in project X" when the project
    // field is wrong or stale. This is a routing/config error, not an account ban.
    // Classify as project_route_error so the account stays active but the error is tracked.
    if (bodyStr.includes("has not been used in project")) {
      return PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR;
    }
    return PROVIDER_ERROR_TYPES.FORBIDDEN;
  }
  if (statusCode >= 500) return PROVIDER_ERROR_TYPES.SERVER_ERROR;

  return null;
}
