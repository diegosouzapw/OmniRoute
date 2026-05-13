/**
 * 429 response classifier — distinguish rate-limit from quota-exhausted.
 *
 * Most LLM providers return HTTP 429 for two semantically different reasons:
 *
 * 1. **Rate-limit**: short transient back-off ("too many requests in
 *    the last minute"). Fix: wait the Retry-After window and retry.
 * 2. **Quota-exhausted**: long-period cap hit ("daily/monthly limit
 *    reached"). Fix: wait until the period rolls over (could be hours
 *    or days). Retrying every 60s wastes calls and burns alerts.
 *
 * The HTTP status alone cannot disambiguate. This helper inspects the
 * response body and headers to return a `FailureKind` the circuit
 * breaker can use to pick the right cooldown.
 *
 * Companion to OmniRoute issue #2100.
 *
 * @module shared/utils/classify429
 */

export type FailureKind = "rate_limit" | "quota_exhausted" | "transient";

/**
 * Heuristic regexes for "explicit quota exhausted" vs "rate-limited"
 * detection in 429 error bodies. A 429 alone never implies quota
 * exhausted — only an explicit keyword does.
 *
 * Patterns observed across OpenAI, Anthropic, Groq, Cerebras, Mistral,
 * Google Gemini, and OpenRouter free-tier responses.
 */
const QUOTA_PATTERNS: ReadonlyArray<RegExp> = [
  /daily.*limit/i,
  /daily.*quota/i,
  /per.?day.*limit/i,
  /monthly.*limit/i,
  /monthly.*quota/i,
  /per.?month.*limit/i,
  /quota.*exceed/i,
  /exceed.*quota/i,
  /insufficient.*quota/i,
  /billing.*cap/i,
  /credit.*exhaust/i,
  /out of credits/i,
  /hard.?limit/i,
  /plan.*limit/i,
];

/**
 * Best-effort case-insensitive header lookup.
 */
function getHeader(headers: Record<string, string> | undefined, name: string): string | undefined {
  if (!headers) return undefined;
  const target = name.toLowerCase();
  for (const [k, v] of Object.entries(headers)) {
    if (k.toLowerCase() === target) return v;
  }
  return undefined;
}

/**
 * Coerce a body of unknown shape to a string for keyword scanning.
 * - string: returned as-is
 * - object: JSON-stringified (so nested error.message gets scanned)
 * - undefined/null: empty string
 */
function bodyToText(body: unknown): string {
  if (typeof body === "string") return body;
  if (body == null) return "";
  try {
    return JSON.stringify(body);
  } catch {
    return "";
  }
}

/**
 * Returns true if the body looks like an explicit quota-exhausted
 * error — i.e. the upstream is telling us a long-period cap was hit.
 */
export function looksLikeQuotaExhausted(body: unknown): boolean {
  const text = bodyToText(body);
  if (!text) return false;
  return QUOTA_PATTERNS.some((pat) => pat.test(text));
}

/**
 * Classify a 429 (or any) response into a `FailureKind`.
 *
 * Decision order:
 * 1. status !== 429 → `"transient"` (don't pretend to know more than
 *    the caller does about non-429 failures).
 * 2. body matches a quota keyword → `"quota_exhausted"`.
 * 3. otherwise → `"rate_limit"` (default for 429 — even without
 *    Retry-After, a 429 is per definition a rate-limit signal).
 *
 * @param response - the upstream response with status, optional headers,
 *                   optional body. Headers are looked up
 *                   case-insensitively.
 */
export function classify429(response: {
  status: number;
  headers?: Record<string, string>;
  body?: unknown;
}): FailureKind {
  if (response.status !== 429) return "transient";
  if (looksLikeQuotaExhausted(response.body)) return "quota_exhausted";
  return "rate_limit";
}

/**
 * Parse a `Retry-After` header value into seconds.
 *
 * Accepts:
 * - integer seconds: `"60"`
 * - HTTP date: `"Wed, 08 May 2026 03:00:00 GMT"`
 * - Groq-style relative: `"60s"`, `"5m"`, `"2h"`
 *
 * Returns `null` if unparseable.
 *
 * Note: integer seconds vs Groq relative units are easy to confuse —
 * `parseInt("5m", 10)` returns `5` (parses leading digits and ignores
 * trailing). This helper checks the relative-unit pattern FIRST.
 */
export function parseRetryAfter(headerValue: string | undefined): number | null {
  if (!headerValue) return null;
  const trimmed = headerValue.trim();
  if (!trimmed) return null;

  // Groq-style relative: must check BEFORE plain int parse.
  const relMatch = trimmed.match(/^(\d+)([smh])$/i);
  if (relMatch) {
    const n = Number(relMatch[1]);
    const unit = relMatch[2].toLowerCase();
    if (Number.isFinite(n)) {
      if (unit === "s") return n;
      if (unit === "m") return n * 60;
      if (unit === "h") return n * 3600;
    }
  }

  // Pure integer seconds.
  if (/^\d+$/.test(trimmed)) {
    const n = Number(trimmed);
    return Number.isFinite(n) ? n : null;
  }

  // HTTP date.
  const ts = Date.parse(trimmed);
  if (Number.isFinite(ts)) {
    return Math.max(0, Math.floor((ts - Date.now()) / 1000));
  }

  return null;
}

/**
 * Convenience wrapper: pull the Retry-After from a response's headers
 * and parse it to seconds. Returns null if absent or unparseable.
 */
export function retryAfterFromResponse(response: {
  headers?: Record<string, string>;
}): number | null {
  return parseRetryAfter(getHeader(response.headers, "retry-after"));
}

/**
 * Normalize an unknown headers-like value into a plain `Record<string, string>`.
 * Native `Headers` (from `fetch`) does NOT respond to `Object.entries` — it
 * exposes `.entries()` instead. Without this normalization, `getHeader` would
 * silently miss every header on a Headers instance.
 */
function normalizeHeaders(raw: unknown): Record<string, string> | undefined {
  if (raw === null || typeof raw !== "object") return undefined;
  const maybeIter = (raw as { entries?: unknown }).entries;
  if (typeof maybeIter === "function") {
    try {
      return Object.fromEntries((raw as { entries: () => Iterable<[string, string]> }).entries());
    } catch {
      // fall through to plain-object treatment
    }
  }
  return raw as Record<string, string>;
}

/**
 * Adapter that takes an error thrown by an HTTP client (fetch wrapper, axios,
 * upstream SDK, etc.) and produces a {@link FailureKind} suitable for the
 * `classifyError` option of the circuit breaker.
 *
 * Recognises the common error shapes:
 * - `err.status` + `err.headers` + `err.body` (low-level fetch wrapper)
 * - `err.response.status` + `err.response.headers` + `err.response.data` (axios-style)
 * - `err.message` (last-resort body for keyword scan)
 *
 * Returns `undefined` when the error doesn't carry enough information to
 * classify, so the breaker can decide what to do without a kind tag.
 *
 * Companion to issue #2100 follow-up.
 */
export function classify429FromError(err: unknown): FailureKind | undefined {
  if (err === null || typeof err !== "object") return undefined;
  const e = err as Record<string, unknown>;

  let status: number | undefined;
  let headers: Record<string, string> | undefined;
  let body: unknown;

  if (typeof e.status === "number") {
    status = e.status;
  }
  if (typeof e.statusCode === "number" && status === undefined) {
    status = e.statusCode;
  }

  if (e.response && typeof e.response === "object") {
    const resp = e.response as Record<string, unknown>;
    if (typeof resp.status === "number" && status === undefined) {
      status = resp.status;
    }
    if (resp.headers && typeof resp.headers === "object") {
      headers = normalizeHeaders(resp.headers);
    }
    if (resp.data !== undefined) {
      body = resp.data;
    } else if (typeof resp.body !== "undefined") {
      body = resp.body;
    }
  }

  if (headers === undefined && e.headers && typeof e.headers === "object") {
    headers = normalizeHeaders(e.headers);
  }
  if (body === undefined) {
    if (typeof e.body !== "undefined") {
      body = e.body;
    } else if (typeof e.message === "string") {
      body = e.message;
    }
  }

  if (typeof status !== "number") return undefined;
  return classify429({ status, headers, body });
}
