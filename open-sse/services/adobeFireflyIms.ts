/**
 * Adobe Firefly — Adobe IMS token exchange and access-token resolution.
 *
 * Split out of adobeFireflyClient.ts.
 */

import { sanitizeErrorMessage } from "../utils/error.ts";
import {
  ADOBE_FIREFLY_IMS_REFRESH_URL,
  ADOBE_FIREFLY_IMS_SCOPE,
  DEFAULT_USER_AGENT,
  FIREFLY_ORIGIN,
  FIREFLY_REFERER,
} from "./adobeFireflyCatalog.ts";
import {
  AdobeFireflyError,
  GUEST_COOKIE_HELP,
  adobeFireflyApiKey,
  adobeFireflyExpressClientId,
  extractAdobeCredentialToken,
  isAdobeGuestAccessToken,
  isAdobeUserAccessToken,
  looksLikeAdobeJwt,
} from "./adobeFireflyCredentials.ts";

type ImsTokenResponse = {
  access_token?: string;
  account_type?: string;
  guestId?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
};

async function imsCheckToken(opts: {
  cookie: string;
  clientId: string;
  guestAllowed: boolean;
  fetchImpl: typeof fetch;
}): Promise<
  { ok: true; token: string; data: ImsTokenResponse } | { ok: false; status: number; error: string }
> {
  const form = new URLSearchParams({
    client_id: opts.clientId,
    scope: ADOBE_FIREFLY_IMS_SCOPE,
    guest_allowed: opts.guestAllowed ? "true" : "false",
  });

  const resp = await opts.fetchImpl(ADOBE_FIREFLY_IMS_REFRESH_URL, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Cookie: opts.cookie,
      Origin: FIREFLY_ORIGIN,
      Referer: FIREFLY_REFERER,
      "User-Agent": DEFAULT_USER_AGENT,
    },
    body: form.toString(),
  });

  const text = await resp.text().catch(() => "");
  let data: ImsTokenResponse | null = null;
  try {
    data = JSON.parse(text) as ImsTokenResponse;
  } catch {
    data = null;
  }

  if (!resp.ok) {
    return {
      ok: false,
      status: resp.status,
      error: sanitizeErrorMessage(
        data?.error_description || data?.error || text.slice(0, 200) || `HTTP ${resp.status}`
      ),
    };
  }

  const token = String(data?.access_token || "").trim();
  if (!token) {
    return {
      ok: false,
      status: 401,
      error: sanitizeErrorMessage(
        data?.error_description || data?.error || "IMS response missing access_token"
      ),
    };
  }
  return { ok: true, token, data: data || {} };
}

/**
 * Exchange a browser Cookie header for an Adobe IMS **user** access_token.
 *
 * Live repro (user firefly.adobe.com Cookie export):
 * - guest_allowed=true → account_type=guest (no AdobeID) → generate 401 / balance 403
 * - guest_allowed=false → "All session cookies are empty" (IMS cookies live on adobelogin.com)
 *
 * Reliable path: paste Authorization Bearer JWT from a live firefly-3p request.
 */
export async function exchangeAdobeCookieForAccessToken(
  cookieHeader: string,
  fetchImpl: typeof fetch = fetch
): Promise<string> {
  const cookie = String(cookieHeader || "").trim();
  if (!cookie) {
    throw new AdobeFireflyError("Adobe Firefly cookie is empty", 401, "missing_cookie");
  }

  // HAR / mixed paste that already contains a user JWT
  const embedded = extractAdobeCredentialToken(cookie);
  if (embedded !== cookie && looksLikeAdobeJwt(embedded)) {
    if (isAdobeGuestAccessToken(embedded)) {
      throw new AdobeFireflyError(GUEST_COOKIE_HELP, 401, "guest_token");
    }
    return embedded;
  }

  const clientIds = [adobeFireflyApiKey(), adobeFireflyExpressClientId()].filter(
    (id, i, arr) => id && arr.indexOf(id) === i
  );

  let sawEmptySession = false;
  let lastError = "";
  let lastStatus = 502;
  let guestTokenSeen = false;

  for (const clientId of clientIds) {
    // 1) Authenticated session only (needs IMS cookies from adobelogin.com)
    const authed = await imsCheckToken({
      cookie,
      clientId,
      guestAllowed: false,
      fetchImpl,
    });
    if (authed.ok === true) {
      if (
        isAdobeGuestAccessToken(authed.token) ||
        authed.data.account_type === "guest" ||
        authed.data.guestId
      ) {
        guestTokenSeen = true;
      } else {
        return authed.token;
      }
    } else {
      lastStatus = authed.status;
      lastError = authed.error;
      if (/session cookies are empty/i.test(authed.error)) sawEmptySession = true;
    }

    // 2) Guest path — never accept guest tokens for Firefly media/limits
    const guest = await imsCheckToken({
      cookie,
      clientId,
      guestAllowed: true,
      fetchImpl,
    });
    if (guest.ok === true) {
      if (
        guest.data.account_type === "guest" ||
        guest.data.guestId ||
        isAdobeGuestAccessToken(guest.token)
      ) {
        guestTokenSeen = true;
        lastError = "IMS returned a guest token (no AdobeID session)";
        lastStatus = 401;
        continue;
      }
      return guest.token;
    }
    lastStatus = guest.status;
    lastError = guest.error;
    if (/session cookies are empty/i.test(guest.error)) sawEmptySession = true;
  }

  if (guestTokenSeen || sawEmptySession) {
    throw new AdobeFireflyError(GUEST_COOKIE_HELP, 401, "guest_token");
  }

  throw new AdobeFireflyError(
    `Adobe IMS token exchange failed (${lastStatus}): ${lastError || "no access_token"}. ${GUEST_COOKIE_HELP}`,
    lastStatus === 401 || lastStatus === 403 ? 401 : 502,
    "ims_refresh_failed"
  );
}

/**
 * Resolve credentials into a usable **user** IMS access token (rejects guest tokens).
 */
export async function resolveAdobeAccessToken(
  credentials:
    | {
        apiKey?: string;
        accessToken?: string;
        providerSpecificData?: {
          cookie?: unknown;
          access_token?: unknown;
          accessToken?: unknown;
        } | null;
      }
    | null
    | undefined,
  fetchImpl: typeof fetch = fetch
): Promise<string> {
  const psd = credentials?.providerSpecificData;
  const candidates: string[] = [];
  const push = (v: unknown) => {
    if (typeof v === "string" && v.trim()) candidates.push(v.trim());
  };
  push(credentials?.apiKey);
  push(credentials?.accessToken);
  push(psd?.access_token);
  push(psd?.accessToken);
  push(psd?.cookie);

  if (candidates.length === 0) {
    throw new AdobeFireflyError(
      "Adobe Firefly credentials missing. " + GUEST_COOKIE_HELP,
      401,
      "missing_credentials"
    );
  }

  for (const c of candidates) {
    const extracted = extractAdobeCredentialToken(c);
    if (looksLikeAdobeJwt(extracted) && isAdobeUserAccessToken(extracted)) {
      return extracted;
    }
  }

  for (const c of candidates) {
    const extracted = extractAdobeCredentialToken(c);
    if (looksLikeAdobeJwt(extracted) && isAdobeGuestAccessToken(extracted)) {
      throw new AdobeFireflyError(GUEST_COOKIE_HELP, 401, "guest_token");
    }
  }

  const cookieBlob =
    candidates.find(
      (c) =>
        c.includes(";") ||
        c.toLowerCase().includes("aux_sid") ||
        c.toLowerCase().includes("ff_session")
    ) || candidates[0];

  const token = await exchangeAdobeCookieForAccessToken(cookieBlob, fetchImpl);
  if (isAdobeGuestAccessToken(token)) {
    throw new AdobeFireflyError(GUEST_COOKIE_HELP, 401, "guest_token");
  }
  return token;
}

// ── Credits balance (Limits) ────────────────────────────────────────────────
