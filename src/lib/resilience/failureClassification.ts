export type ProviderFailureType =
  | "authentication_error"
  | "rate_limit"
  | "quota_exhausted"
  | "timeout"
  | "network_error"
  | "provider_5xx"
  | "invalid_request"
  | "model_unavailable"
  | "permission_error"
  | "unknown";

export interface ProviderFailure {
  type: ProviderFailureType;
  retryable: boolean;
  providerId: string;
  connectionId?: string;
  statusCode?: number;
  retryAfter?: number;
  message: string;
}

export function classifyProviderFailure(input: {
  providerId: string;
  connectionId?: string;
  statusCode?: number;
  code?: string;
  message?: string;
  retryAfter?: number;
}): ProviderFailure {
  const message = input.message?.trim() || "Provider request failed";
  const normalized = `${input.code ?? ""} ${message}`.toLowerCase();
  const status = input.statusCode;
  let type: ProviderFailureType = "unknown";
  let retryable = false;

  if (
    status === 401 ||
    status === 403 ||
    /invalid.*(key|token)|unauthori[sz]ed|forbidden/.test(normalized)
  ) {
    type =
      status === 403 || normalized.includes("permission")
        ? "permission_error"
        : "authentication_error";
  } else if (status === 408 || status === 504 || /timeout|timed out|etimedout/.test(normalized)) {
    type = "timeout";
    retryable = true;
  } else if (status === 429 || /rate.?limit|too many requests|retry.?after/.test(normalized)) {
    type = /quota|insufficient balance|credits exhausted|balance is \$0/.test(normalized)
      ? "quota_exhausted"
      : "rate_limit";
    retryable = type === "rate_limit";
  } else if (status !== undefined && status >= 500) {
    type = "provider_5xx";
    retryable = true;
  } else if (status === 400 || /invalid request|malformed|unsupported parameter/.test(normalized)) {
    type = "invalid_request";
  } else if (status === 404 || /model unavailable|model not found|unknown model/.test(normalized)) {
    type = "model_unavailable";
  } else if (/network|econnreset|econnrefused|enotfound|fetch failed|socket/.test(normalized)) {
    type = "network_error";
    retryable = true;
  }

  return {
    type,
    retryable,
    providerId: input.providerId,
    ...(input.connectionId ? { connectionId: input.connectionId } : {}),
    ...(status !== undefined ? { statusCode: status } : {}),
    ...(input.retryAfter !== undefined ? { retryAfter: input.retryAfter } : {}),
    message,
  };
}
