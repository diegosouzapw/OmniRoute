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

// RetryInfo.retryDelay / "please retry in Ns" are short per-request throttling
// hints (Gemini free-tier RPM/TPM), not long-lived quota resets like Antigravity's
// "Resets in 160h" — cap them independently of the caller's maxMs so a malformed or
// adversarial upstream value cannot masquerade as a multi-day reset (#7940).
export const MAX_SHORT_RETRY_HINT_MS = 24 * 60 * 60 * 1000; // 24h

/**
 * Parse delay strings like "33s", "26.660853464s", "2m", "1h", "1500ms", or a bare
 * number of seconds. Shared by `parseRetryAfterFromBody` (rateLimitManager wiring)
 * and `parseRetryHintFromJsonBody` (model-lockout wiring) so both honor the same
 * upstream `RetryInfo.retryDelay` grammar (#7940).
 */
export function parseDelayString(value: unknown): number | null {
  if (!value) return null;
  const str = String(value).trim();
  const msMatch = /^(\d+(?:\.\d+)?)\s*ms$/i.exec(str);
  if (msMatch) return Math.round(Number.parseFloat(msMatch[1]));
  const secMatch = /^(\d+(?:\.\d+)?)\s*s$/i.exec(str);
  if (secMatch) return Math.round(Number.parseFloat(secMatch[1]) * 1000);
  const minMatch = /^(\d+(?:\.\d+)?)\s*m$/i.exec(str);
  if (minMatch) return Math.round(Number.parseFloat(minMatch[1]) * 60 * 1000);
  const hrMatch = /^(\d+(?:\.\d+)?)\s*h$/i.exec(str);
  if (hrMatch) return Math.round(Number.parseFloat(hrMatch[1]) * 3600 * 1000);
  // Bare number → seconds
  const num = Number.parseFloat(str);
  return Number.isFinite(num) ? Math.round(num * 1000) : null;
}

// Gemini/Google RPC 429 bodies embed the short throttle hint as
// `error.details[].{"@type": ".../google.rpc.RetryInfo", "retryDelay": "26s"}`.
function retryInfoDetailsMs(details: unknown): number | null {
  for (const detail of Array.isArray(details) ? details : []) {
    const detailRecord = objectRecord(detail);
    const type = String(detailRecord["@type"] ?? "");
    if (!type.includes("RetryInfo")) continue;
    const ms = parseDelayString(detailRecord.retryDelay);
    if (ms !== null && ms > 0) return Math.min(ms, MAX_SHORT_RETRY_HINT_MS);
  }
  return null;
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

  const retryInfoMs = retryInfoDetailsMs(errorObj.details ?? root.details);
  if (retryInfoMs !== null) return retryInfoMs;

  const isoHint = futureTimestampMs(errorObj.retryAfter ?? root.retryAfter, maxMs);
  if (isoHint !== null) return isoHint;

  return positiveCappedMs(
    errorObj.retry_after_ms ?? root.retry_after_ms ?? errorObj.retryAfterMs ?? root.retryAfterMs,
    maxMs
  );
}
