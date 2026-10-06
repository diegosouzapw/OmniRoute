/**
 * UC (uncensored.com) connection credential resolution.
 *
 * UC's persona WebSocket authenticates with a short-lived Clerk `__session` JWT
 * (60s) that the executor mints per-connect from a DURABLE credential set stored
 * in the connection's `providerSpecificData`:
 *
 *   • `clientCookie`  — the Clerk `__client` cookie (a JWT with NO `exp`; the
 *                        real long-lived credential, secured by a rotating_token
 *                        that only changes on genuine security events).
 *   • `sid`           — the Clerk session id (`sess_...`); the mint path is
 *                        `POST /v1/client/sessions/{sid}/tokens`.
 *   • `uid`           — the account UID (uuid v4); it is the WS URL path segment
 *                        AND the frame's `user_identifier`, and equals the JWT
 *                        `uid` claim (so it can be recovered from a minted token).
 *   • `cookies`       — the full cookie jar (Cloudflare `__cf_bm`/`_cfuvid`,
 *                        `__client_uat`, etc.) sent on the mint call. Persisting
 *                        the whole jar lets the executor follow cookie rotation.
 *
 * These are minted by OmniRoute's own browserless email-code login (see
 * ./emailLogin.ts), so the router is self-contained and never reads any external
 * (Hermes) token file.
 */

type ProviderSpecificData = Record<string, unknown> | null | undefined;

export interface UcCredential {
  /** Clerk `__client` durable cookie (JWT, no exp). */
  clientCookie: string;
  /** Clerk session id (`sess_...`). */
  sid: string;
  /** Account UID (uuid) — WS path + user_identifier + JWT `uid` claim. */
  uid: string;
  /** Full cookie jar to send on the Clerk mint call (name → value). */
  cookies: Record<string, string>;
}

function firstString(...values: unknown[]): string | null {
  for (const v of values) {
    if (typeof v === "string") {
      // Raw browser LocalStorage/cookie dumps sometimes wrap the value in quotes.
      const trimmed = v.trim().replace(/^"|"$/g, "");
      if (trimmed.length > 0) return trimmed;
    }
  }
  return null;
}

/** Decode a Clerk JWT payload without verifying (base64url middle segment). */
function decodeJwtClaims(jwt: string): Record<string, unknown> | null {
  try {
    const seg = jwt.split(".")[1];
    if (!seg) return null;
    const b64 = seg.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (seg.length % 4)) % 4);
    return JSON.parse(Buffer.from(b64, "base64").toString("utf8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** The `uid` claim from a Clerk `__session` JWT (== WS user_identifier), or null. */
export function uidFromSessionJwt(jwt: string): string | null {
  const claims = decodeJwtClaims(jwt);
  const uid = claims?.uid;
  return typeof uid === "string" && uid.length > 0 ? uid : null;
}

/** Epoch seconds of a Clerk JWT `exp`, or 0 when undecodable. */
export function sessionJwtExpiry(jwt: string): number {
  const claims = decodeJwtClaims(jwt);
  return typeof claims?.exp === "number" ? claims.exp : 0;
}

/**
 * Normalize a stored cookie jar into a flat `{name: value}` map. Accepts either
 * a raw CDP dump shape `{name: {value: "..."}}` (what the capture/login persists)
 * or an already-flat `{name: "value"}` map. Non-string/garbage entries are skipped.
 */
export function normalizeCookieJar(raw: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [name, val] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof val === "string") {
      out[name] = val;
    } else if (
      val &&
      typeof val === "object" &&
      typeof (val as { value?: unknown }).value === "string"
    ) {
      out[name] = (val as { value: string }).value;
    }
  }
  return out;
}

/** Serialize a cookie jar into a `Cookie:` header value (`k=v; k=v`). */
export function cookieHeader(cookies: Record<string, string>): string {
  return Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");
}

/**
 * Resolve the UC credential from a connection's providerSpecificData. Returns
 * null when not fully configured (clientCookie + sid required; uid may be
 * recovered from a minted token later, but we require it here for a clean
 * WS URL). The `__client` cookie is folded into the jar if absent so the mint
 * call always carries it.
 */
export function resolveUcCredential(psd: ProviderSpecificData): UcCredential | null {
  const clientCookie = firstString(psd?.ucClientCookie, psd?.clientCookie, psd?.__client);
  if (!clientCookie) return null;

  const sid = firstString(psd?.ucSid, psd?.sid);
  if (!sid) return null;

  const cookies = normalizeCookieJar(psd?.ucCookies ?? psd?.cookies);
  // Ensure the durable cookie is present in the jar sent to Clerk.
  if (!cookies.__client) cookies.__client = clientCookie;

  const uid = firstString(psd?.ucUid, psd?.uid);
  if (!uid) return null;

  return { clientCookie, sid, uid, cookies };
}
