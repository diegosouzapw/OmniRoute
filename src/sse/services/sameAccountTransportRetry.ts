/**
 * Same-account retry for retryable pre-output transport failures (#9708).
 *
 * A 503/507 (connection reset, retry-buffer overflow, early EOF before useful
 * output) must not immediately cool the account and rotate. One jittered
 * same-account retry absorbs brief proxy blips and keeps Codex prompt-cache
 * affinity. A second failure then takes a short cooldown and may rotate.
 *
 * A 502 whose `error.type` is UPSTREAM_RESPONDED_ERROR_TYPE is NOT a transport
 * failure: chatCore builds it after the upstream already answered HTTP 200 with
 * a body that translated into no usable output (`upstream_empty_response`,
 * `upstream_response_failed`, `upstream_fake_success`). The upstream call was
 * already made (and most likely billed), so replaying it on the same account only
 * pays twice for the same verdict.
 */

import { UPSTREAM_RESPONDED_ERROR_TYPE } from "@omniroute/open-sse/utils/diagnostics.ts";

export const SAME_ACCOUNT_TRANSPORT_RETRY_MAX = 1;
export const SAME_ACCOUNT_TRANSPORT_RETRY_MIN_DELAY_MS = 2000;
export const SAME_ACCOUNT_TRANSPORT_RETRY_JITTER_MS = 1000;

const RETRYABLE_TRANSPORT_STATUSES = new Set([502, 503, 504, 507]);

const RETRYABLE_TRANSPORT_TEXT = [
  /upstream connect error/i,
  /disconnect\/reset before headers/i,
  /remote connection failure/i,
  /connection reset/i,
  /exceeded request buffer limit/i,
  /early eof/i,
  /econnreset/i,
  /socket hang up/i,
  /und_err_socket/i,
];

const NON_RETRYABLE_ERROR_TYPES = new Set([
  "lease_error",
  "account_semaphore_capacity",
  UPSTREAM_RESPONDED_ERROR_TYPE,
]);

export function isRetryableTransportStatus(status: unknown): boolean {
  const numeric = Number(status);
  return Number.isFinite(numeric) && RETRYABLE_TRANSPORT_STATUSES.has(numeric);
}

export function isRetryablePreOutputTransportError(
  status: unknown,
  errorText: string | null | undefined,
  errorCode?: string | null,
  errorType?: string | null
): boolean {
  if (errorType && NON_RETRYABLE_ERROR_TYPES.has(errorType)) return false;
  if (errorCode && String(errorCode).startsWith("LEASE_")) return false;

  const text = String(errorText || "");
  const numericStatus = Number(status);
  if (numericStatus === 429 || numericStatus === 401 || numericStatus === 400) return false;
  if (/quota (threshold|exhausted)|credits exhausted/i.test(text)) return false;
  if (/invalid_request|prompt is too long|context.?length|unsupported model/i.test(text)) {
    return false;
  }

  const statusRetryable = isRetryableTransportStatus(status);
  const textRetryable = RETRYABLE_TRANSPORT_TEXT.some((pattern) => pattern.test(text));
  const codeRetryable =
    errorCode === "STREAM_EARLY_EOF" ||
    errorCode === "proxy_unreachable" ||
    errorCode === "PROXY_UNREACHABLE";

  return statusRetryable || textRetryable || codeRetryable;
}

export function sameAccountTransportRetryDelayMs(random: () => number = Math.random): number {
  const draw = random();
  const unit = Number.isFinite(draw) ? Math.min(Math.max(draw, 0), 1) : 0;
  return Math.round(
    SAME_ACCOUNT_TRANSPORT_RETRY_MIN_DELAY_MS + SAME_ACCOUNT_TRANSPORT_RETRY_JITTER_MS * unit
  );
}

export function shouldRetrySameAccountTransport(options: {
  status: unknown;
  errorText?: string | null;
  errorCode?: string | null;
  errorType?: string | null;
  attempt: number;
  hasForcedConnection?: boolean;
  hasEmittedOutput?: boolean;
}): boolean {
  if (options.hasForcedConnection) return false;
  if (options.hasEmittedOutput) return false;
  if (options.attempt >= SAME_ACCOUNT_TRANSPORT_RETRY_MAX) return false;
  return isRetryablePreOutputTransportError(
    options.status,
    options.errorText,
    options.errorCode,
    options.errorType
  );
}

export function isTransportCooldownErrorCode(errorCode: unknown): boolean {
  return isRetryableTransportStatus(errorCode);
}

export function buildMixedAvailabilityError(options: {
  provider: string;
  quotaFilteredCount: number;
  transportUnavailableCount: number;
  transportStatus?: number | null;
}): { status: number; lastError: string; lastErrorCode: number } {
  const quota = Math.max(0, options.quotaFilteredCount);
  const transport = Math.max(0, options.transportUnavailableCount);
  const upstreamStatus = options.transportStatus || 503;
  return {
    status: 503,
    lastErrorCode: 503,
    lastError: `No ${options.provider} accounts currently available: ${quota} quota-filtered, ${transport} temporarily unavailable after upstream ${upstreamStatus}`,
  };
}
