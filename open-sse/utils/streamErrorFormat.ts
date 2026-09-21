import { FORMATS } from "../translator/formats.ts";
import { buildErrorBody, sanitizeErrorMessage } from "./error.ts";
import { projectResponsesFailureOutput } from "./responsesFailureOutput.ts";

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

export type ProjectedStreamFailureEvent = {
  internalFailure: StreamFailurePayload;
  publicMessage: string;
  publicPayload: JsonRecord;
};

export type PreparedTranslatedStreamFailure = {
  record: JsonRecord;
  providerPayload: JsonRecord;
  internalFailure: StreamFailurePayload;
  publicMessage: string;
};

export function projectCompletedStreamError(
  failure: StreamFailurePayload | null | undefined
): JsonRecord | null {
  if (!failure) return null;
  const status = Number.isInteger(failure.status) ? failure.status : 502;
  return buildErrorBody(status, failure.message, undefined, {
    type: failure.type ?? "server_error",
    code: String(failure.status ?? 502),
  }).error;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

const RESPONSES_FAILURE_SCALAR_FIELDS = [
  "id",
  "object",
  "created_at",
  "completed_at",
  "background",
  "model",
  "max_output_tokens",
  "max_tool_calls",
  "parallel_tool_calls",
  "previous_response_id",
  "service_tier",
  "store",
  "temperature",
  "top_p",
  "truncation",
] as const;

const ABSOLUTE_PATH_SEGMENT =
  /(?:^|[\\/])(?:Users|app|etc|home|opt|private|root|srv|tmp|usr|var|workspace)[\\/]/i;

function projectResponsesFailureString(key: string, value: string): string {
  const sanitized = sanitizeErrorMessage(value);
  if (sanitized !== value || ABSOLUTE_PATH_SEGMENT.test(value)) return "[REDACTED]";
  if (
    (key === "id" || key === "previous_response_id") &&
    !/^[A-Za-z0-9][\w.:-]{0,511}$/.test(value)
  ) {
    return "[REDACTED]";
  }
  if (key === "model" && !/^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/.test(value)) {
    return "[REDACTED]";
  }
  return sanitized;
}

function projectResponsesFailureUsage(value: unknown): JsonRecord | null {
  const usage = asRecord(value);
  const projected: JsonRecord = {};
  for (const key of ["input_tokens", "output_tokens", "total_tokens"] as const) {
    if (typeof usage[key] === "number" && Number.isFinite(usage[key])) {
      projected[key] = usage[key];
    }
  }
  const allowedDetailFields = {
    input_tokens_details: new Set(["cached_tokens"]),
    output_tokens_details: new Set([
      "reasoning_tokens",
      "accepted_prediction_tokens",
      "rejected_prediction_tokens",
    ]),
  } as const;
  for (const key of ["input_tokens_details", "output_tokens_details"] as const) {
    const details = asRecord(usage[key]);
    const projectedDetails = Object.fromEntries(
      Object.entries(details).filter(
        ([detailKey, detail]) =>
          allowedDetailFields[key].has(detailKey) &&
          typeof detail === "number" &&
          Number.isFinite(detail)
      )
    );
    if (Object.keys(projectedDetails).length > 0) projected[key] = projectedDetails;
  }
  return Object.keys(projected).length > 0 ? projected : null;
}

function projectResponsesFailureObject(response: JsonRecord, publicError: JsonRecord): JsonRecord {
  const projected: JsonRecord = { status: "failed", error: publicError };

  // A failed Responses event is an error boundary, so copy only documented protocol
  // fields with their scalar shapes. Spreading the upstream object would also publish
  // provider-only siblings such as diagnostics, settings, raw messages, or stack traces.
  for (const key of RESPONSES_FAILURE_SCALAR_FIELDS) {
    const value = response[key];
    if (typeof value === "string") projected[key] = projectResponsesFailureString(key, value);
    else if (value === null || typeof value === "number" || typeof value === "boolean")
      projected[key] = value;
  }
  if (Array.isArray(response.output)) {
    projected.output = projectResponsesFailureOutput(
      response.output,
      projectResponsesFailureString
    );
  }
  const usage = projectResponsesFailureUsage(response.usage);
  if (usage) projected.usage = usage;
  if ("last_error" in response) projected.last_error = publicError;
  return projected;
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
  const responseError = response.error;
  const responseLastError = response.last_error;
  const rootError = record.error;
  const error = Object.keys(asRecord(responseError)).length
    ? asRecord(responseError)
    : Object.keys(asRecord(responseLastError)).length
      ? asRecord(responseLastError)
      : Object.keys(asRecord(rootError)).length
        ? asRecord(rootError)
        : record;
  const code = typeof error.code === "string" ? error.code : "upstream_error";
  const type = typeof error.type === "string" ? error.type : undefined;
  const message =
    typeof error.message === "string" && error.message.trim()
      ? error.message
      : typeof responseError === "string" && responseError.trim()
        ? responseError
        : typeof responseLastError === "string" && responseLastError.trim()
          ? responseLastError
          : typeof rootError === "string" && rootError.trim()
            ? rootError
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

export function prepareTranslatedStreamFailure(
  payload: unknown
): PreparedTranslatedStreamFailure | null {
  const record = asRecord(payload);
  const projected = projectStreamFailureEvent(record);
  if (!projected && !record.error) return null;
  return {
    record,
    providerPayload: projected?.publicPayload ?? record,
    internalFailure: projected?.internalFailure ??
      normalizeStreamFailurePayload(record) ?? {
        status: 502,
        message: "Upstream failure",
        code: "stream_error",
        type: "server_error",
      },
    publicMessage: projected?.publicMessage || "Upstream failure",
  };
}

/**
 * Project same-format upstream failure events before they cross the client/log boundary.
 *
 * `internalFailure` intentionally retains the raw provider wording: account fallback uses it
 * to classify quota/reset hints before the persistence seam sanitizes the stored message.
 * `publicPayload` is a separate protocol-preserving object whose failure subtrees are rebuilt by
 * the canonical public boundary. Callers must never forward the raw payload for these events.
 */
export function projectStreamFailureEvent(payload: unknown): ProjectedStreamFailureEvent | null {
  const record = asRecord(payload);
  const response = asRecord(record.response);
  const hasRootError =
    Object.keys(asRecord(record.error)).length > 0 ||
    (typeof record.error === "string" && record.error.trim().length > 0);
  const isResponsesFailure =
    record.type === "response.failed" ||
    (record.type === "response.completed" && response.status === "failed");
  const isClaudeFailure = record.type === "error";
  if (!isResponsesFailure && !isClaudeFailure && !hasRootError) return null;

  const internalFailure = normalizeStreamFailurePayload(record);
  if (!internalFailure) return null;

  const publicError = buildErrorBody(internalFailure.status, internalFailure.message, undefined, {
    type: internalFailure.type ?? "server_error",
    code: internalFailure.code ?? "stream_error",
  }).error;
  let publicPayload: JsonRecord;
  if (isResponsesFailure) {
    // Preserve protocol metadata and partial `output[].content[]` without passing output
    // through a bounded-depth details sanitizer, while excluding arbitrary diagnostic siblings.
    const publicResponse = projectResponsesFailureObject(response, publicError);
    publicPayload = {
      type: record.type,
      response: publicResponse,
      ...(typeof record.sequence_number === "number"
        ? { sequence_number: record.sequence_number }
        : {}),
    };
  } else if (isClaudeFailure) {
    publicPayload = { type: "error", error: publicError };
  } else {
    // OpenAI-compatible HTTP-200 streams commonly emit a bare `{ error: ... }` frame.
    // Rebuild the complete public envelope so provider-only fields cannot cross the wire.
    publicPayload = { error: publicError };
  }

  return {
    internalFailure,
    publicMessage: publicError.message,
    publicPayload,
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
