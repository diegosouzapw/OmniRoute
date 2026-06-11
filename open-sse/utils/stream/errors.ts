import { asRecord } from "./utils.ts";
import type { JsonRecord, StreamFailurePayload } from "./types.ts";

export function toStreamFailureStatus(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value) && value >= 400 && value <= 599) {
    return value;
  }
  if (typeof value === "string" && /^\d{3}$/.test(value.trim())) {
    const parsed = Number(value.trim());
    return parsed >= 400 && parsed <= 599 ? parsed : null;
  }
  return null;
}

export function looksLikeStreamRateLimit(code: string, type: string, message: string): boolean {
  const haystack = `${code} ${type} ${message}`.toLowerCase();
  return (
    haystack.includes("usage_limit_reached") ||
    haystack.includes("rate_limit") ||
    haystack.includes("rate limit") ||
    haystack.includes("quota") ||
    haystack.includes("too many requests") ||
    haystack.includes("limit reached") ||
    haystack.includes("limit has been reached")
  );
}

export function normalizeStreamFailurePayload(payload: unknown): StreamFailurePayload | null {
  const record = payload && typeof payload === "object" ? (payload as JsonRecord) : {};
  const response = asRecord(record.response);
  const error = Object.keys(asRecord(response.error)).length
    ? asRecord(response.error)
    : Object.keys(asRecord(record.error)).length
      ? asRecord(record.error)
      : record;
  const code = typeof error.code === "string" ? error.code : "upstream_error";
  const type = typeof error.type === "string" ? error.type : undefined;
  const message =
    typeof error.message === "string" && error.message.trim()
      ? error.message
      : typeof record.message === "string" && record.message.trim()
        ? record.message
        : "Upstream failure";
  const status =
    toStreamFailureStatus(error.status_code) ??
    toStreamFailureStatus(error.status) ??
    toStreamFailureStatus(response.status_code) ??
    toStreamFailureStatus(response.status) ??
    toStreamFailureStatus(record.status_code) ??
    toStreamFailureStatus(record.status) ??
    (looksLikeStreamRateLimit(code, type || "", message) ? 429 : 502);

  return {
    status,
    message,
    code,
    ...(type ? { type } : {}),
  };
}