// @ts-nocheck
// ─── Shared helpers for per-provider token-refresh modules ─────────────────
//
// Extracted from open-sse/services/tokenRefresh.ts (originally ported from
// KooshaPari's PR #7338, redone here on the current tip — see #7338 for the
// original provider-module-split idea). These helpers are used by more than
// one provider refresh function under ./providers/, plus by
// ../tokenRefresh.ts itself, so they live in one place to avoid duplication.

export type RefreshLogger = {
  info?: (tag: string, message: string, data?: Record<string, unknown>) => void;
  warn?: (tag: string, message: string, data?: Record<string, unknown>) => void;
  error?: (tag: string, message: string, data?: Record<string, unknown>) => void;
  debug?: (tag: string, message: string, data?: Record<string, unknown>) => void;
} | null;

export function buildFormParams(entries: Record<string, unknown>): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(entries)) {
    if (typeof value === "string" && value.length > 0) {
      params.set(key, value);
    }
  }
  return params;
}

/**
 * OAuth2 error codes that mean the refresh token is permanently dead and
 * retrying will never succeed → callers must emit the unrecoverable sentinel
 * so the HealthCheck deactivates the account instead of looping every 60s.
 * Deliberately EXCLUDES transient codes (server_error, temporarily_unavailable,
 * slow_down) so we never deactivate an account over a recoverable blip.
 */
const UNRECOVERABLE_OAUTH_ERROR_CODES = new Set([
  "invalid_grant",
  "invalid_request",
  "refresh_token_reused",
  "invalid_token",
  "expired_token",
  "unauthorized_client",
  "access_denied",
]);

/**
 * Extract a canonical OAuth error code from a refresh-endpoint error body of
 * ANY shape. Production proxies/MITMs deliver the same `invalid_grant` 400 in
 * several shapes — a plain object `{error:"invalid_grant"}`, a nested
 * `{error:{code:"invalid_grant"}}`, a JSON **string** (double-encoded body),
 * or the raw JSON text wrapped as `{error:"<json text>"}` by a catch branch.
 * The old `errorBody.error === "invalid_grant"` only matched the first shape,
 * so the others returned `null` → the HealthCheck refresh loop (root cause of
 * the 1352× claude/aa5dd5cf invalidation storm).
 *
 * Returns the matched code (only if it is in UNRECOVERABLE_OAUTH_ERROR_CODES)
 * or null. Never matches loosely — a known code is accepted only when it is a
 * bare code string or the value of an `"error"`/`"error_code"` field, so a 502
 * HTML page or a `server_error` body never becomes a false positive.
 */
export function extractOAuthErrorCode(raw: unknown, depth = 0): string | null {
  if (raw == null || depth > 6) return null;

  if (typeof raw === "string") {
    const s = raw.trim();
    if (!s) return null;
    if (UNRECOVERABLE_OAUTH_ERROR_CODES.has(s)) return s;
    // The string may itself be JSON (a double-encoded body, or the raw text).
    if (s[0] === "{" || s[0] === "[" || s[0] === '"') {
      try {
        const nested = extractOAuthErrorCode(JSON.parse(s), depth + 1);
        if (nested) return nested;
      } catch {
        // not valid JSON — fall through to the field scan
      }
    }
    // Safety net: a known code appearing as the value of an "error"/"error_code"
    // field inside otherwise-unparsed text. Scoped to avoid false positives.
    const m = s.match(/"error(?:_code)?"\s*:\s*"([a-z_]+)"/i);
    if (m && UNRECOVERABLE_OAUTH_ERROR_CODES.has(m[1])) return m[1];
    return null;
  }

  if (typeof raw === "object") {
    const o = raw as Record<string, unknown>;
    return (
      extractOAuthErrorCode(o.error, depth + 1) ??
      extractOAuthErrorCode(o.code, depth + 1) ??
      extractOAuthErrorCode(o.error_code, depth + 1)
    );
  }

  return null;
}

/**
 * Read an error response body ONCE and classify it. Returns the raw text (for
 * logging) and the extracted unrecoverable OAuth code (or null). Reading once
 * avoids the double-read bug where `response.json()` consumes the stream and a
 * later `response.text()` returns empty.
 */
export async function readRefreshErrorBody(
  response: Response
): Promise<{ rawText: string; code: string | null }> {
  const rawText = await response.text().catch(() => "");
  let parsed: unknown = rawText;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    // keep rawText as-is
  }
  const code = extractOAuthErrorCode(parsed) ?? extractOAuthErrorCode(rawText);
  return { rawText, code };
}
