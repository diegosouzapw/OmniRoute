import { FORMATS } from "../translator/formats.ts";
import { buildErrorBody } from "./error.ts";

/**
 * Upstream stream-failure normalization + client-format error framing.
 *
 * Extracted from stream.ts (file-size gate, #9314) — pure functions operating only
 * on plain payload objects, no dependency on the SSE stream/controller state.
 */

type JsonRecord = Record<string, unknown>;

export type StreamFailurePayload = {
  status: number;
  message: string;
  code?: string;
  type?: string;
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toStreamFailureStatus(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value) && value >= 400 && value <= 599) {
    return value;
  }
  if (typeof value === "string" && /^\d{3}$/.test(value.trim())) {
    const parsed = Number(value.trim());
    return parsed >= 400 && parsed <= 599 ? parsed : null;
  }
  return null;
}

function looksLikeStreamRateLimit(code: string, type: string, message: string): boolean {
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

export function formatTranslatedStreamError(payload: unknown, sourceFormat?: string): string {
  const failure = normalizeStreamFailurePayload(payload) ?? {
    status: 502,
    message: "Upstream stream error",
    code: "stream_error",
    type: "server_error",
  };
  const errorBody = buildErrorBody(failure.status, failure.message, undefined, {
    type: failure.type ?? "server_error",
    code: failure.code ?? "stream_error",
  });

  if (sourceFormat === FORMATS.OPENAI_RESPONSES) {
    const failed = {
      type: "response.failed",
      response: {
        id: `resp_error_${Date.now()}`,
        object: "response",
        created_at: Math.floor(Date.now() / 1000),
        status: "failed",
        background: false,
        error: errorBody.error,
        output: [],
      },
      sequence_number: 0,
    };
    return `event: response.failed\ndata: ${JSON.stringify(failed)}\n\n`;
  }

  if (sourceFormat === FORMATS.CLAUDE) {
    return `event: error\ndata: ${JSON.stringify({ type: "error", error: errorBody.error })}\n\n`;
  }

  return `data: ${JSON.stringify(errorBody)}\n\ndata: [DONE]\n\n`;
}
