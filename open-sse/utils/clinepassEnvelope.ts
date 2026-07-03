// ClinePass upstream wraps non-streaming JSON responses in a {success, data}
// envelope (errors use {success: false, error}). Detect and unwrap; pass the
// payload through untouched for every other provider / shape.

export interface ClinepassEnvelopeError {
  message: string;
  status: number | null;
}

export interface ClinepassEnvelopeResult {
  body: unknown;
  error: ClinepassEnvelopeError | null;
}

/**
 * Unwrap a ClinePass {success, data} envelope.
 *
 * - Non-clinepass provider, non-object, array, or object without a `success`
 *   key → pass through untouched ({ body, error: null }).
 * - { success: false, ... } → { body: null, error: { message, status } } with
 *   the upstream error string extracted (never a local stack — the caller must
 *   still route it through sanitizeErrorMessage before emitting a response).
 * - { success: true, data: {...} } → unwrap to `data`.
 */
export function unwrapClinepassEnvelope(
  body: unknown,
  provider: string | null | undefined
): ClinepassEnvelopeResult {
  if (provider !== "clinepass") return { body, error: null };
  if (!body || typeof body !== "object" || Array.isArray(body)) return { body, error: null };

  const record = body as Record<string, unknown>;
  if (!("success" in record)) return { body, error: null };

  if (record.success === false) {
    const rawError = record.error;
    const message =
      typeof rawError === "string"
        ? rawError
        : (rawError && typeof rawError === "object"
            ? ((rawError as Record<string, unknown>).message as string | undefined)
            : undefined) ||
          (typeof record.message === "string" ? record.message : undefined) ||
          "Upstream error";
    const statusCode = typeof record.statusCode === "number" ? record.statusCode : null;
    return { body: null, error: { message, status: statusCode } };
  }

  if (
    record.success === true &&
    "data" in record &&
    record.data !== null &&
    typeof record.data === "object"
  ) {
    return { body: record.data, error: null };
  }

  return { body, error: null };
}
