type JsonRecord = Record<string, unknown>;

export type JsonRetryHintProvenance = "google_rpc_retry_info" | "body";

export type DetailedJsonRetryHint = {
  retryAfterMs: number;
  provenance: JsonRetryHintProvenance;
};

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
 * Meta Muse / CLIProxyAPI subscription quota uses `error.resets_at` as a unix
 * epoch (seconds). Accept seconds, milliseconds, numeric strings, and ISO.
 */
function futureResetAtMs(value: unknown, maxMs: number): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    const ms = value < 1e12 ? value * 1000 : value;
    const waitMs = ms - Date.now();
    return waitMs > 0 ? Math.min(waitMs, maxMs) : null;
  }
  if (typeof value === "string" && /^\d+(?:\.\d+)?$/.test(value.trim())) {
    return futureResetAtMs(Number(value), maxMs);
  }
  return futureTimestampMs(value, maxMs);
}

// RetryInfo.retryDelay / "please retry in Ns" are short per-request throttling
// hints (Gemini free-tier RPM/TPM), not long-lived quota resets like Antigravity's
// "Resets in 160h" — cap them independently of the caller's maxMs so a malformed or
// adversarial upstream value cannot masquerade as a multi-day reset (#7940).
export const MAX_SHORT_RETRY_HINT_MS = 24 * 60 * 60 * 1000; // 24h

// Compound Go-style duration ("151h58m18.015s", "2h7m", "45m3s"). Anchored, every
// quantifier bounded and each group ends in a distinct unit letter, so the pattern
// cannot backtrack catastrophically on untrusted input (ReDoS rule). At least two units
// are required — single-unit strings keep their dedicated branches above.
const COMPOUND_DURATION_RE =
  /^(?:(\d{1,9})h(\d{1,9})m(?:(\d{1,9}(?:\.\d{1,12})?)s)?|(\d{1,9})h(\d{1,9}(?:\.\d{1,12})?)s|(\d{1,9})m(\d{1,9}(?:\.\d{1,12})?)s)$/i;

function compoundDurationMs(str: string): number | null {
  const match = COMPOUND_DURATION_RE.exec(str);
  if (!match) return null;
  const hours = Number(match[1] ?? match[4] ?? 0);
  const minutes = Number(match[2] ?? match[6] ?? 0);
  const seconds = Number.parseFloat(match[3] ?? match[5] ?? match[7] ?? "0");
  return Math.round(hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000);
}

/**
 * Parse delay strings like "33s", "26.660853464s", "2m", "1h", "1500ms", compound
 * Go-style durations ("151h58m18.015s", "2h7m", "45m3s"), or a bare number of seconds.
 * Shared by `parseRetryAfterFromBody` (rateLimitManager wiring) and
 * `parseRetryHintFromJsonBody` (model-lockout wiring) so both honor the same upstream
 * `RetryInfo.retryDelay` / `ErrorInfo.metadata.quotaResetDelay` grammar (#7940).
 * `src/shared/utils/classify429.ts::parseDelaySeconds` mirrors this grammar.
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
  const compoundMs = compoundDurationMs(str);
  if (compoundMs !== null) return compoundMs;
  // Bare number → seconds
  const num = Number.parseFloat(str);
  return Number.isFinite(num) ? Math.round(num * 1000) : null;
}

// Gemini/Google RPC 429 bodies embed the short throttle hint as
// `error.details[].{"@type": ".../google.rpc.RetryInfo", "retryDelay": "26s"}`.
export function retryInfoDetailsMs(details: unknown): number | null {
  for (const detail of Array.isArray(details) ? details : []) {
    const detailRecord = objectRecord(detail);
    const type = String(detailRecord["@type"] ?? "");
    if (!type.includes("RetryInfo")) continue;
    const ms = parseDelayString(detailRecord.retryDelay);
    if (ms !== null && ms > 0) return Math.min(ms, MAX_SHORT_RETRY_HINT_MS);
  }
  return null;
}

// Google RPC quota-exhaustion 429s (Antigravity / Cloud Code) can carry the long-lived
// reset only in `error.details[].{"@type": ".../google.rpc.ErrorInfo", "metadata":
// {"quotaResetTimeStamp": "<ISO>", "quotaResetDelay": "151h58m18.015s"}}`. Unlike
// RetryInfo this is a quota reset, not a short throttle, so it is capped by the
// caller's maxMs instead of MAX_SHORT_RETRY_HINT_MS. The absolute timestamp wins over
// the relative delay when both are present.
function errorInfoQuotaResetMs(details: unknown, maxMs: number): number | null {
  for (const detail of Array.isArray(details) ? details : []) {
    const detailRecord = objectRecord(detail);
    const type = String(detailRecord["@type"] ?? "");
    if (!type.includes("ErrorInfo")) continue;
    const metadata = objectRecord(detailRecord.metadata);
    const timestampMs = futureTimestampMs(metadata.quotaResetTimeStamp, maxMs);
    if (timestampMs !== null) return timestampMs;
    const delayMs = parseDelayString(metadata.quotaResetDelay);
    if (delayMs !== null && delayMs > 0) return Math.min(delayMs, maxMs);
  }
  return null;
}

/**
 * Parse Retry-After hints from a 429 JSON response body. Providers use both
 * top-level and nested `error` fields for ISO timestamps and millisecond values.
 *
 * Precedence: google.rpc.RetryInfo.retryDelay > google.rpc.ErrorInfo quota-reset
 * metadata > resets_at/resetsAt > retryAfter (ISO) > retry_after_ms/retryAfterMs.
 * Response headers and prose hints are handled by the callers (headers first, prose last).
 */
export function parseDetailedRetryHintFromJsonBody(
  body: string,
  maxMs: number
): DetailedJsonRetryHint | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    return null;
  }

  const root = objectRecord(parsed);
  if (!Object.keys(root).length) return null;
  const errorObj = objectRecord(root.error);

  const details = errorObj.details ?? root.details;
  const retryInfoMs = retryInfoDetailsMs(details);
  if (retryInfoMs !== null) {
    return { retryAfterMs: retryInfoMs, provenance: "google_rpc_retry_info" };
  }

  const errorInfoMs = errorInfoQuotaResetMs(details, maxMs);
  if (errorInfoMs !== null) return { retryAfterMs: errorInfoMs, provenance: "body" };

  const resetAtHint = futureResetAtMs(
    errorObj.resets_at ?? root.resets_at ?? errorObj.resetsAt ?? root.resetsAt,
    maxMs
  );
  if (resetAtHint !== null) return { retryAfterMs: resetAtHint, provenance: "body" };

  const isoHint = futureTimestampMs(errorObj.retryAfter ?? root.retryAfter, maxMs);
  if (isoHint !== null) return { retryAfterMs: isoHint, provenance: "body" };

  const numericHint = positiveCappedMs(
    errorObj.retry_after_ms ?? root.retry_after_ms ?? errorObj.retryAfterMs ?? root.retryAfterMs,
    maxMs
  );
  return numericHint === null ? null : { retryAfterMs: numericHint, provenance: "body" };
}

export function parseRetryHintFromJsonBody(body: string, maxMs: number): number | null {
  return parseDetailedRetryHintFromJsonBody(body, maxMs)?.retryAfterMs ?? null;
}

// Google RPC quota 429s list the exhausted quotas as
// `error.details[].{"@type": ".../google.rpc.QuotaFailure", "violations": [{"quotaId": ...}]}`.
// A `quotaId` naming a per-day quota (e.g. "GenerateRequestsPerDayPerProjectPerModel-FreeTier")
// will not clear when the seconds-scale RetryInfo that rides along expires.
const QUOTA_FAILURE_TYPE_RE = /google\.rpc\.QuotaFailure/;
const PER_DAY_QUOTA_ID_RE = /perday/i;
// Raw-text fallback for bodies that are not (only) JSON. Bounded quantifiers and a
// negated class keep it linear on untrusted input (ReDoS rule).
const PER_DAY_QUOTA_ID_TEXT_RE = /"quotaId"\s{0,8}:\s{0,8}"[^"]{0,200}perday/i;

function detailsDailyQuotaIds(details: unknown): string[] {
  const quotaIds: string[] = [];
  for (const detail of Array.isArray(details) ? details : []) {
    const detailRecord = objectRecord(detail);
    if (!QUOTA_FAILURE_TYPE_RE.test(String(detailRecord["@type"] ?? ""))) continue;
    const violations = detailRecord.violations;
    for (const violation of Array.isArray(violations) ? violations : []) {
      const quotaId = objectRecord(violation).quotaId;
      if (typeof quotaId === "string" && PER_DAY_QUOTA_ID_RE.test(quotaId)) quotaIds.push(quotaId);
    }
  }
  return quotaIds;
}

/**
 * The daily (`quotaId` ...PerDay...) quota ids a Google-shaped 429 body reports in its
 * `google.rpc.QuotaFailure` details. Accepts a parsed body or its JSON text; [] otherwise.
 */
export function googleDailyQuotaIds(body: unknown): string[] {
  let parsed = body;
  if (typeof body === "string") {
    try {
      parsed = JSON.parse(body);
    } catch {
      return [];
    }
  }
  if (!parsed || typeof parsed !== "object") return [];
  const root = objectRecord(parsed);
  return detailsDailyQuotaIds(objectRecord(root.error).details ?? root.details);
}

/**
 * True when a Google-shaped 429 body reports a daily quota violation. Accepts the raw
 * body text, an already-parsed body, or a prose message carrying the QuotaFailure detail.
 */
export function hasGoogleDailyQuotaViolation(body: unknown): boolean {
  if (googleDailyQuotaIds(body).length > 0) return true;
  return (
    typeof body === "string" &&
    QUOTA_FAILURE_TYPE_RE.test(body) &&
    PER_DAY_QUOTA_ID_TEXT_RE.test(body)
  );
}
