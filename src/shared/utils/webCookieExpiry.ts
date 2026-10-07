/**
 * Cookie expiry derivation (#11497).
 *
 * Some web-cookie credentials embed a standard JWT whose payload carries an
 * `exp` claim (ChatGPT's `__Secure-next-auth.session-token`, the Qwen/Z.ai
 * localStorage tokens users paste as their cookie). Others are opaque
 * (`claude` sessionKey, grok `sso`) and MUST stay undated — no false precision.
 *
 * Pure module: no DB, no network. Shared by the connection save path (server)
 * and the dashboard expiry badges (client), hence it lives under src/shared.
 */

const MAX_SCANNED_VALUE_CHARS = 4096;

function base64UrlToJson(value: string): unknown {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  // Guard against prototype-pollution style payloads: JSON.parse only, no reviver.
  return JSON.parse(Buffer.from(padded, "base64").toString("utf8"));
}

function expMsFromPayload(payload: unknown): number | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
  const exp = (payload as Record<string, unknown>).exp;
  if (typeof exp !== "number" || !Number.isFinite(exp) || exp <= 0) return null;
  return exp * 1000;
}

/**
 * Decode the `exp` claim of a JWT-shaped string into epoch milliseconds.
 * Returns null for anything that is not exactly `header.payload.signature`
 * with a JSON-object payload carrying a positive numeric `exp`.
 */
export function decodeJwtPayloadExp(value: unknown): number | null {
  if (typeof value !== "string") return null;
  const raw = value.trim();
  if (!raw || raw.length > MAX_SCANNED_VALUE_CHARS) return null;
  const parts = raw.split(".");
  if (parts.length !== 3) return null;
  const [header, payloadSeg] = parts;
  if (!header || !payloadSeg) return null;
  try {
    return expMsFromPayload(base64UrlToJson(payloadSeg));
  } catch {
    return null;
  }
}

function* candidateJwtValues(credential: string): Generator<string> {
  const trimmed = credential.trim();
  if (!trimmed || trimmed.length > MAX_SCANNED_VALUE_CHARS * 8) return;
  // Whole-credential first (users often paste just the token), then each
  // cookie-pair value of a pasted Cookie header.
  yield trimmed;
  for (const pair of trimmed.split(";")) {
    const eq = pair.indexOf("=");
    if (eq <= 0) continue;
    const value = pair.slice(eq + 1).trim();
    if (value) yield value;
  }
}

/**
 * First derivable expiry (epoch ms) found in a pasted cookie credential —
 * either the credential itself is a JWT or one of its cookie-pair values is.
 */
export function deriveCookieExpiryMs(credential: unknown): number | null {
  if (typeof credential !== "string") return null;
  for (const value of candidateJwtValues(credential)) {
    const ms = decodeJwtPayloadExp(value);
    if (ms !== null) return ms;
  }
  return null;
}

/** ISO string form of {@link deriveCookieExpiryMs}, or null. */
export function deriveCookieExpiryIso(credential: unknown): string | null {
  const ms = deriveCookieExpiryMs(credential);
  return ms === null ? null : new Date(ms).toISOString();
}

/** Structural view of stored providerSpecificData this module reads/writes. */
export interface CookieExpiryData {
  cookieExpiresAt?: string | null;
}

export function readCookieExpiresAt(providerSpecificData: unknown): string | null {
  if (!providerSpecificData || typeof providerSpecificData !== "object") return null;
  const value = (providerSpecificData as Record<string, unknown>).cookieExpiresAt;
  return typeof value === "string" && value ? value : null;
}

/**
 * Merge a derived `cookieExpiresAt` into providerSpecificData for a save.
 *
 * Recomputed on EVERY call so re-pasting a fresh cookie refreshes the date,
 * and an opaque replacement cookie DROPS the stale date instead of leaving a
 * lie on the row. Explicit user-provided values win only when no credential
 * is present to re-derive from.
 */
export function withDerivedCookieExpiry(
  providerSpecificData: unknown,
  credential: unknown
): Record<string, unknown> {
  const base =
    providerSpecificData && typeof providerSpecificData === "object"
      ? { ...(providerSpecificData as Record<string, unknown>) }
      : {};
  if (typeof credential !== "string" || !credential.trim()) return base;
  const iso = deriveCookieExpiryIso(credential);
  if (iso) {
    base.cookieExpiresAt = iso;
  } else {
    delete base.cookieExpiresAt;
  }
  return base;
}
