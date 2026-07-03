type JsonRecord = Record<string, unknown>;

function objectRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function positiveCappedMs(value: unknown, maxMs: number): number | null {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? Math.min(value, maxMs)
    : null;
}

function futureTimestampMs(value: unknown, maxMs: number): number | null {
  if (typeof value !== "string") return null;
  const parsedTs = Date.parse(value);
  if (!Number.isFinite(parsedTs)) return null;
  const waitMs = parsedTs - Date.now();
  return waitMs > 0 ? Math.min(waitMs, maxMs) : null;
}

/**
 * Parse Retry-After hints from a 429 JSON response body. Providers use both
 * top-level and nested `error` fields for ISO timestamps and millisecond values.
 */
export function parseRetryHintFromJsonBody(body: string, maxMs: number): number | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    return null;
  }

  const root = objectRecord(parsed);
  if (!Object.keys(root).length) return null;
  const errorObj = objectRecord(root.error);

  const isoHint = futureTimestampMs(errorObj.retryAfter ?? root.retryAfter, maxMs);
  if (isoHint !== null) return isoHint;

  return positiveCappedMs(
    errorObj.retry_after_ms ?? root.retry_after_ms ?? errorObj.retryAfterMs ?? root.retryAfterMs,
    maxMs
  );
}
