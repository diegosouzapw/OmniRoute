// Tencent / CodeBuddy wrap errors as {Response.Error}, {data.Response.Error},
// or {code, msg}. Detect and unwrap; other shapes pass through as empty fields.
// Callers must still route the message through sanitizeErrorMessage / buildErrorBody.

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readNestedTencentError(record: Record<string, unknown> | null): {
  message: string | null;
  errorCode: unknown;
} {
  if (!record) return { message: null, errorCode: undefined };
  const response = asRecord(record.Response);
  if (!response) return { message: null, errorCode: undefined };
  const err = asRecord(response.Error);
  if (!err) return { message: null, errorCode: undefined };
  return {
    message: typeof err.Message === "string" ? err.Message : null,
    errorCode: err.Code,
  };
}

export interface TencentEnvelopeFields {
  message: string | null;
  errorCode: unknown;
}

/**
 * Unwrap a Tencent/CodeBuddy error envelope.
 *
 * Precedence matches parseUpstreamError's original fallback chain: top-level
 * `{code, msg}` wins over `{Response.Error}` and `{data.Response.Error}`.
 * Non-objects and OpenAI/Anthropic shapes return empty fields.
 */
export function unwrapTencentEnvelope(json: unknown): TencentEnvelopeFields {
  const record = asRecord(json);
  if (!record) return { message: null, errorCode: undefined };

  if (typeof record.msg === "string") {
    return { message: record.msg, errorCode: record.code };
  }

  const nested = readNestedTencentError(record);
  if (nested.message != null || nested.errorCode !== undefined) return nested;

  const fromData = readNestedTencentError(asRecord(record.data));
  if (fromData.message != null || fromData.errorCode !== undefined) return fromData;

  return { message: null, errorCode: undefined };
}

/**
 * JSON error-field reader for parseUpstreamError: OpenAI-shaped fields first,
 * then Tencent/CodeBuddy envelope fallbacks. Lives here so frozen error.ts
 * does not grow. `envelopeMessage` is the ClinePass unwrap, when present.
 */
export function extractJsonErrorFields(
  json: unknown,
  envelopeMessage?: string | null
): { message: unknown; errorCode: unknown; errorType: unknown } {
  const record = asRecord(json) ?? {};
  const tencent = unwrapTencentEnvelope(record);
  const errorObj = asRecord(record.error);
  return {
    message:
      envelopeMessage ||
      errorObj?.message ||
      record.message ||
      (typeof record.detail === "string" ? record.detail : null) ||
      tencent.message ||
      (typeof record.error === "string" ? record.error : null),
    errorCode: errorObj?.code || record.code || tencent.errorCode,
    errorType: errorObj?.type || record.type,
  };
}
