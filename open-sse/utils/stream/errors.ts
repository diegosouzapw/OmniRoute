import { convertOpenAIToResponsesToolCall } from "../handlers/responseTranslator.ts";
import { v4 as uuidv4 } from "uuid";

import { asRecord } from "./utils.ts";
import { JsonRecord, StreamFailurePayload } from "./types.ts";

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

function resolveErrorSource(response: JsonRecord, record: JsonRecord): JsonRecord {
  const responseError = asRecord(response.error);
  if (Object.keys(responseError).length) return responseError;
  const recordError = asRecord(record.error);
  if (Object.keys(recordError).length) return recordError;
  return record;
}

function resolveStreamFailureMessage(error: JsonRecord, record: JsonRecord): string {
  if (typeof error.message === "string" && error.message.trim()) {
    return error.message;
  }
  if (typeof record.message === "string" && record.message.trim()) {
    return record.message;
  }
  return "Upstream failure";
}

function resolveStreamFailureStatus(
  error: JsonRecord,
  response: JsonRecord,
  record: JsonRecord,
  code: string,
  type: string | undefined,
  message: string
): number {
  const candidates: unknown[] = [
    error.status_code,
    error.status,
    response.status_code,
    response.status,
    record.status_code,
    record.status,
  ];
  for (const candidate of candidates) {
    const result = toStreamFailureStatus(candidate);
    if (result !== null) return result;
  }
  return looksLikeStreamRateLimit(code, type || "", message) ? 429 : 502;
}

export function normalizeStreamFailurePayload(payload: unknown): StreamFailurePayload | null {
  const record = payload && typeof payload === "object" ? (payload as JsonRecord) : {};
  const response = asRecord(record.response);
  const error = resolveErrorSource(response, record);
  const code = typeof error.code === "string" ? error.code : "upstream_error";
  const type = typeof error.type === "string" ? error.type : undefined;
  const message = resolveStreamFailureMessage(error, record);
  const status = resolveStreamFailureStatus(error, response, record, code, type, message);

  return {
    status,
    message,
    code,
    ...(type ? { type } : {}),
  };
}
