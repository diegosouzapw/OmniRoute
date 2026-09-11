/**
 * MaxAI access-token refresh — browserless, via one signed HTTP call.
 *
 * MaxAI issues two tokens: a ~24h `accessToken` and a ~1-year `refreshToken`.
 * The web app refreshes the access token by POSTing the refresh token to
 * `/oauth/refresh_access_token` (web-app chunk 86042, `refreshAccessToken`). That
 * endpoint carries the SAME per-request `X-Authorization` signature as every other
 * MaxAI call (see ./signing.ts) — it is NOT a browser-only OAuth hop. A residential
 * Firefox-TLS client (wreq-js firefox_150, the OmniRoute egress overlay) passes the
 * TLS gate, so OmniRoute mints fresh access tokens itself with no browser.
 *
 * The refresh token is minted out-of-band, once, by the browser Google-OAuth flow
 * (see maxaiBrowserLogin) and only needs re-minting when it itself expires (~yearly).
 * This module handles the routine daily refresh.
 *
 * Request shape (byte-faithful to the web app):
 *   POST https://api.maxai.me/oauth/refresh_access_token
 *     Authorization: Bearer <refreshToken>      // the REFRESH token, not access
 *     noAuthLogout: true
 *     X-Authorization + X-App/X-Browser headers  // standard signing
 *   body: {"app":"maxai_webapp"}                 // the app's `params` -> JSON body
 *   -> 200 { data: { access_token } }            // a fresh ~24h access JWT
 *
 * The signed path is the BARE pathname (no query string); the `app` field travels
 * in the body. `user_id` folds into the signature and is read from the refresh
 * token's own JWT subject (per the web app), falling back to a provided userId.
 */
import { buildMaxaiSignedHeaders } from "./signing.ts";
import { maxaiStaticHeaders, MAXAI_BASE_URL } from "./protocol.ts";
import { userIdFromJwt, accessTokenExpiry } from "./credentials.ts";
import { refreshMaxaiConstants } from "./constantsStore.ts";

export const MAXAI_REFRESH_PATH = "/oauth/refresh_access_token";

/** How close to expiry (seconds) an access token may be before we refresh it. */
export const MAXAI_REFRESH_MARGIN_SECONDS = 60 * 60; // 1h

export interface MaxaiRefreshInput {
  refreshToken: string;
  deviceId: string;
  /** Optional explicit user id; defaults to the refresh token's JWT subject. */
  userId?: string;
  signal?: AbortSignal | null;
  /** Injectable fetch for tests (defaults to the ambient patched fetch). */
  fetchImpl?: typeof fetch;
}

export interface MaxaiRefreshResult {
  ok: boolean;
  accessToken?: string;
  /** access token expiry (epoch seconds), when a token was minted. */
  expiresAt?: number;
  status: number;
  error?: string;
}

/** True when an access token is missing, unparseable, or within the margin of expiry. */
export function maxaiAccessTokenNeedsRefresh(
  accessToken: string | null | undefined,
  marginSeconds: number = MAXAI_REFRESH_MARGIN_SECONDS,
  now: () => number = Date.now
): boolean {
  if (!accessToken) return true;
  const exp = accessTokenExpiry(accessToken);
  if (!exp) return true;
  return exp - now() / 1000 <= marginSeconds;
}

/**
 * Mint a fresh access token from a refresh token via one signed HTTP POST.
 * Never throws; returns a structured result the caller can branch on.
 */
export async function maxaiRefreshAccessToken(
  input: MaxaiRefreshInput
): Promise<MaxaiRefreshResult> {
  const doFetch = input.fetchImpl ?? fetch;
  const userId = input.userId || userIdFromJwt(input.refreshToken) || "";
  if (!input.refreshToken || !input.deviceId || !userId) {
    return { ok: false, status: 0, error: "missing refreshToken, deviceId, or userId" };
  }

  // Daily refresh is our freshness checkpoint for the signing constants: re-extract
  // from MaxAI's public bundle so a MaxAI-side key/app-version rotation is picked up
  // within a day (self-heal). refreshMaxaiConstants persists a changed set and
  // returns the current-best; on a fetch miss it returns whatever's already stored.
  const constants = await refreshMaxaiConstants({ fetchImpl: doFetch, signal: input.signal });
  if (!constants) {
    return { ok: false, status: 0, error: "MaxAI signing constants unavailable (extraction failed)" };
  }

  const signed = buildMaxaiSignedHeaders(
    {
      path: MAXAI_REFRESH_PATH,
      userId,
      deviceId: input.deviceId,
    },
    constants
  );
  const headers: Record<string, string> = {
    ...maxaiStaticHeaders(),
    ...signed,
    Authorization: `Bearer ${input.refreshToken}`,
    noAuthLogout: "true",
    "Content-Type": "application/json",
  };

  let res: Response;
  try {
    res = await doFetch(MAXAI_BASE_URL + MAXAI_REFRESH_PATH, {
      method: "POST",
      headers,
      body: JSON.stringify({ app: "maxai_webapp" }),
      signal: input.signal ?? undefined,
    });
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  const raw = await res.text().catch(() => "");
  if (res.status !== 200) {
    return { ok: false, status: res.status, error: raw.slice(0, 200) };
  }

  let accessToken = "";
  try {
    const parsed = JSON.parse(raw) as {
      data?: { access_token?: unknown };
      access_token?: unknown;
    };
    const candidate = parsed?.data?.access_token ?? parsed?.access_token;
    if (typeof candidate === "string") accessToken = candidate;
  } catch {
    return { ok: false, status: res.status, error: "unparseable refresh response" };
  }
  if (!accessToken) {
    return { ok: false, status: res.status, error: "refresh response had no access_token" };
  }

  return {
    ok: true,
    status: 200,
    accessToken,
    expiresAt: accessTokenExpiry(accessToken) || undefined,
  };
}
