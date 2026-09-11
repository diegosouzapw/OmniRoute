/**
 * UC (uncensored.com) Clerk auth — mint the short-lived `__session` JWT that
 * authenticates the persona WebSocket.
 *
 * UC uses Clerk. The socket URL carries a `?token=<jwt>` that is a 60-second
 * Clerk session JWT (RS256, `iss: clerk.uncensored.com`, `exp - iat = 60`). It is
 * minted from the durable `__client` cookie:
 *
 *   POST https://clerk.uncensored.com/v1/client/sessions/{sid}/tokens
 *     ?_clerk_js_version=5.x
 *     Origin: https://uncensored.com
 *     Referer: https://uncensored.com/
 *     Cookie: <full jar incl. __client>
 *     Content-Type: application/x-www-form-urlencoded
 *     body: (empty)
 *   -> 200 { "object": "token", "jwt": "<RS256 60s JWT>" }
 *
 * The token is only needed at the WS handshake (the socket outlives the 60s
 * expiry — the backend does not re-check mid-stream). We cache the minted JWT per
 * session id and re-mint ~8s before expiry, exactly like the reference client.
 *
 * A mint call rotates only Cloudflare cookies (`__cf_bm`), never `__client`, so
 * the durable credential is stable; we still capture any `Set-Cookie` rotation so
 * the caller can persist a refreshed jar.
 */
import {
  UC_CLERK_FAPI,
  UC_CLERK_JS_VERSION,
  UC_ORIGIN,
  UC_TOKEN_REFRESH_SKEW_S,
} from "./constants.ts";
import { cookieHeader, sessionJwtExpiry } from "./credentials.ts";

/** A minted session token plus metadata. */
export interface UcSessionToken {
  jwt: string;
  /** epoch seconds of the JWT `exp` (0 when undecodable). */
  expiresAt: number;
}

export interface UcMintInput {
  sid: string;
  /** Full cookie jar (must include `__client`). */
  cookies: Record<string, string>;
  signal?: AbortSignal | null;
  /** Injectable fetch for tests (defaults to the ambient patched fetch). */
  fetchImpl?: typeof fetch;
}

export interface UcMintResult {
  ok: boolean;
  token?: UcSessionToken;
  /** Cookies observed rotating in the response `Set-Cookie` (name → value). */
  rotatedCookies?: Record<string, string>;
  status: number;
  error?: string;
}

/** Cookie directive attributes we never treat as an actual cookie name/value. */
const COOKIE_ATTRS = new Set([
  "expires",
  "path",
  "domain",
  "samesite",
  "secure",
  "httponly",
  "max-age",
]);

/** Parse rotated cookie name=value pairs out of a raw `Set-Cookie` header. */
export function parseSetCookie(setCookie: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!setCookie) return out;
  for (const m of setCookie.matchAll(/(?:^|,\s*)([A-Za-z0-9_]+)=([^;,\s]+)/g)) {
    const name = m[1];
    const val = m[2];
    if (COOKIE_ATTRS.has(name.toLowerCase())) continue;
    out[name] = val;
  }
  return out;
}

/**
 * Mint a fresh 60s Clerk session JWT from the durable cookie jar. Never throws;
 * returns a structured result the caller branches on. A 401/403 means the durable
 * login is invalid (the ~30-day window lapsed or the cookie was revoked) — the
 * caller should surface a re-login prompt.
 */
export async function mintUcSessionToken(input: UcMintInput): Promise<UcMintResult> {
  const doFetch = input.fetchImpl ?? fetch;
  if (!input.sid || !input.cookies?.__client) {
    return { ok: false, status: 0, error: "missing sid or __client cookie" };
  }

  const url = `${UC_CLERK_FAPI}/v1/client/sessions/${input.sid}/tokens?_clerk_js_version=${UC_CLERK_JS_VERSION}`;
  const headers: Record<string, string> = {
    Origin: UC_ORIGIN,
    Referer: UC_ORIGIN + "/",
    Cookie: cookieHeader(input.cookies),
    "Content-Type": "application/x-www-form-urlencoded",
  };

  let res: Response;
  try {
    res = await doFetch(url, {
      method: "POST",
      headers,
      body: "",
      signal: input.signal ?? undefined,
    });
  } catch (err) {
    return { ok: false, status: 0, error: err instanceof Error ? err.message : String(err) };
  }

  const rotatedCookies = parseSetCookie(res.headers.get("set-cookie") ?? "");
  const raw = await res.text().catch(() => "");
  if (res.status !== 200) {
    return {
      ok: false,
      status: res.status,
      error: raw.slice(0, 200) || `Clerk mint HTTP ${res.status}`,
      rotatedCookies,
    };
  }

  let jwt = "";
  try {
    const parsed = JSON.parse(raw) as { jwt?: unknown; token?: unknown };
    if (typeof parsed?.jwt === "string") jwt = parsed.jwt;
    else if (typeof parsed?.token === "string") jwt = parsed.token;
  } catch {
    return {
      ok: false,
      status: res.status,
      error: "unparseable Clerk token response",
      rotatedCookies,
    };
  }
  if (!jwt) {
    return {
      ok: false,
      status: res.status,
      error: "Clerk token response had no jwt",
      rotatedCookies,
    };
  }

  return {
    ok: true,
    status: 200,
    token: { jwt, expiresAt: sessionJwtExpiry(jwt) },
    rotatedCookies,
  };
}

/**
 * A tiny per-session token cache. UC mints a 60s JWT per connect; caching it and
 * re-minting ~8s early avoids a mint on every single turn while never handing out
 * a token within the skew window of expiry. Keyed by Clerk session id.
 */
export class UcTokenCache {
  private cache = new Map<string, UcSessionToken>();

  /** Return a still-fresh cached token for `sid`, or null when a mint is needed. */
  get(sid: string, now: () => number = Date.now): string | null {
    const tok = this.cache.get(sid);
    if (!tok) return null;
    if (tok.expiresAt - now() / 1000 > UC_TOKEN_REFRESH_SKEW_S) return tok.jwt;
    return null;
  }

  set(sid: string, token: UcSessionToken): void {
    this.cache.set(sid, token);
  }

  clear(sid?: string): void {
    if (sid) this.cache.delete(sid);
    else this.cache.clear();
  }
}

/** Process-wide token cache (mirrors the reference client's per-adapter cache). */
export const ucTokenCache = new UcTokenCache();
