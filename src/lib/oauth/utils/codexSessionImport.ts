/**
 * Codex (OpenAI) session-JSON normalizer
 *
 * Accepts the raw JSON object copied straight from
 * `https://chatgpt.com/api/auth/session` (`{ user: {...}, accessToken, expires }`,
 * NextAuth's session-endpoint shape) and extracts a bare access token + optional
 * email, the same credential type already accepted by the bare-token import path
 * (`POST /api/oauth/codex/import-token`, #1290) — this module only widens what
 * shapes of pasted input can reach that endpoint.
 *
 * Pure: no I/O, no network, no DB import. Safe to unit-test. Mirrors the style
 * of `codexAuthImport.ts` / `codexImport.ts`, deliberately kept separate from
 * both: the bulk `auth.json` import requires a `refresh_token`; this path is
 * for a bare access token and deliberately does not.
 *
 * Ref: #6636
 */

import { decodeJwtExp } from "@/lib/oauth/services/codexImport";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ParsedCodexSession = { accessToken: string; email?: string };
export type ParseResult = { ok: true; session: ParsedCodexSession } | { ok: false; error: string };

// ── Internal helpers ──────────────────────────────────────────────────────────

function toRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function toNonEmptyString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

/** Looks like a JWT (3 dot-separated segments) — a loose shape check only. */
function looksLikeJwt(value: string): boolean {
  return value.split(".").length === 3;
}

/**
 * Field-name aliases for the access token across known Codex/ChatGPT session
 * export shapes: the literal `accessToken` returned by `chatgpt.com/api/auth/session`
 * first, then snake_case and alternate names, then the same aliases nested one
 * level under `tokens` (mirrors `unwrapCodexAuthJson` in `codexAuthImport.ts`).
 */
function findAccessToken(rec: Record<string, unknown>): string | undefined {
  const direct =
    toNonEmptyString(rec.accessToken) ||
    toNonEmptyString(rec.access_token) ||
    toNonEmptyString(rec.sessionToken) ||
    toNonEmptyString(rec.session_token);
  if (direct) return direct;

  const nested = toRecord(rec.tokens);
  if (!nested) return undefined;
  return toNonEmptyString(nested.access_token) || toNonEmptyString(nested.accessToken);
}

/** True when either expiry signal (top-level `expires` ISO string, or JWT `exp`) is in the past. */
function isExpired(rec: Record<string, unknown>, accessToken: string): boolean {
  const expiresField = toNonEmptyString(rec.expires);
  if (expiresField) {
    const ms = Date.parse(expiresField);
    if (Number.isFinite(ms) && ms <= Date.now()) return true;
  }
  const exp = decodeJwtExp(accessToken);
  return exp !== null && exp * 1000 <= Date.now();
}

// ── Public API ──────────────────────────────────────────────────────────────

/**
 * True if the pasted text looks like a JSON object (vs a bare JWT or an OAuth
 * callback URL/code) — a cheap guard so the modal only attempts the JSON
 * normalizer on plausible input and every other paste shape falls through to
 * the existing parsers unchanged.
 */
export function looksLikeCodexSessionJson(value: string): boolean {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed.startsWith("{")) return false;
  try {
    return toRecord(JSON.parse(trimmed)) !== null;
  } catch {
    return false;
  }
}

/**
 * Extract a bare access token (+ optional email) from a parsed
 * `chatgpt.com/api/auth/session`-shaped JSON value. Returns a typed error
 * (never throws) for malformed, tokenless, or expired input.
 */
export function parseCodexSessionJson(raw: unknown): ParseResult {
  const rec = toRecord(raw);
  if (!rec) {
    return { ok: false, error: "Pasted session data is not a JSON object" };
  }

  const accessToken = findAccessToken(rec);
  if (!accessToken) {
    return {
      ok: false,
      error:
        "Could not find an access token field in the pasted session JSON (expected accessToken, access_token, sessionToken, or tokens.access_token)",
    };
  }
  if (!looksLikeJwt(accessToken)) {
    return { ok: false, error: "The access token field does not look like a valid JWT" };
  }

  if (isExpired(rec, accessToken)) {
    return {
      ok: false,
      error: "Session is expired — sign in to chatgpt.com again and re-copy the session JSON",
    };
  }

  const user = toRecord(rec.user);
  const email = (user && toNonEmptyString(user.email)) || undefined;

  return { ok: true, session: { accessToken, email } };
}
