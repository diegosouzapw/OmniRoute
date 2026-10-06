export type KiroSocialPollData = {
  error?: unknown;
  /** Kiro reports poll progress here (e.g. "authorization_pending"), not in `error`. */
  status?: unknown;
  accessToken?: unknown;
  refreshToken?: unknown;
};

export type KiroSocialPollOutcome =
  | { kind: "pending"; error: "authorization_pending" | "slow_down" }
  | { kind: "error"; error: string; status: number }
  | { kind: "success" };

/**
 * RFC 8628 requires every later device-code poll to retain a `slow_down`
 * increase. Keeping this transition pure makes the UI retry behaviour testable.
 */
export function getNextKiroSocialPollInterval(currentIntervalMs: number, error: unknown): number {
  return error === "slow_down" ? currentIntervalMs + 5000 : currentIntervalMs;
}

function errorCode(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "authorization_failed";
}

export function classifyKiroSocialPoll(
  responseOk: boolean,
  responseStatus: number,
  data: KiroSocialPollData
): KiroSocialPollOutcome {
  const progress = data.error ?? data.status;
  if (progress === "authorization_pending" || progress === "slow_down") {
    return { kind: "pending", error: progress as "authorization_pending" | "slow_down" };
  }

  if (!responseOk || data.error) {
    const status = responseStatus >= 400 && responseStatus <= 599 ? responseStatus : 400;
    return { kind: "error", error: errorCode(data.error), status };
  }

  if (!data.accessToken && !data.refreshToken) {
    return { kind: "error", error: "invalid_token_response", status: 502 };
  }

  return { kind: "success" };
}
