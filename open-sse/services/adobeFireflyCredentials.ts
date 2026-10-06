/**
 * Adobe Firefly — credential shapes: IMS token / cookie-blob recognition and extraction.
 *
 * Split out of adobeFireflyClient.ts.
 */

import { resolvePublicCred } from "../utils/publicCreds.ts";
import {
  decodeAdobeJwtPayload,
  findAllAdobeJwts,
  isExactAdobeJwt,
  stripAdobeJwts,
} from "./adobeFireflySecurity.ts";

export class AdobeFireflyError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status = 502, code?: string) {
    super(message);
    this.name = "AdobeFireflyError";
    this.status = status;
    this.code = code;
  }
}

/** Public x-api-key + primary IMS client_id for firefly.adobe.com (`clio-playground-web`). */
export function adobeFireflyApiKey(): string {
  return resolvePublicCred("adobe_firefly_api_key", "ADOBE_FIREFLY_API_KEY");
}

/** Express IMS client_id fallback for cookie exchange (`projectx_webapp`). */
export function adobeFireflyExpressClientId(): string {
  return resolvePublicCred("adobe_firefly_express_client_id", "ADOBE_FIREFLY_EXPRESS_CLIENT_ID");
}

/** Public x-api-key for GET firefly.adobe.io/v1/credits/balance (`SunbreakWebUI1`). */
export function adobeFireflyBalanceApiKey(): string {
  return resolvePublicCred("adobe_firefly_balance_api_key", "ADOBE_FIREFLY_BALANCE_API_KEY");
}

/** Decode IMS JWT payload (no signature verification — client-side claim read only). */
/** AdobeID subject for x-account-id on balance / account_cluster calls. */
export function extractAdobeAccountIdFromToken(token: string): string {
  const payload = decodeAdobeJwtPayload(token);
  if (!payload) return "";
  const candidates = [payload.user_id, payload.aa_id, payload.sub, payload.id];
  for (const c of candidates) {
    if (typeof c === "string" && c.includes("@")) return c.trim();
  }
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c.trim();
  }
  return "";
}

export function looksLikeAdobeJwt(value: string): boolean {
  const raw = value.trim();
  if (!raw) return false;
  // Avoid treating cookie blobs that happen to have two dots as JWT.
  if (raw.includes(";") || (raw.includes("=") && !raw.startsWith("eyJ"))) return false;
  // Allow a single space after optional Bearer prefix (stripped earlier).
  if (/\s/.test(raw) && !/^bearer\s+/i.test(raw)) return false;
  const token = raw.replace(/^bearer\s+/i, "").trim();
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  // Adobe IMS access tokens are sizable; reject tiny accidental 3-segment strings.
  if (token.length < 80) return false;
  return parts.every((p) => p.length > 0 && /^[A-Za-z0-9_-]+$/.test(p));
}

/**
 * True when IMS issued a guest token (no signed-in AdobeID).
 * Live repro: firefly.adobe.com page cookies alone → account_type=guest → generate 401 /
 * balance 403 ErrMismatchOauthToken.
 */
export function isAdobeGuestAccessToken(token: string): boolean {
  const payload = decodeAdobeJwtPayload(token);
  if (!payload) return false;
  const userId = typeof payload.user_id === "string" ? payload.user_id : "";
  const aaId = typeof payload.aa_id === "string" ? payload.aa_id : "";
  const type = typeof payload.type === "string" ? payload.type.toLowerCase() : "";
  // Authenticated Firefly tokens always carry an @AdobeID (or similar) subject.
  if (userId.includes("@AdobeID") || aaId.includes("@AdobeID")) return false;
  if (userId.includes("@GuestID") || aaId.includes("@GuestID")) return true;
  if (type === "guest" || type.includes("guest")) return true;
  // Guest tokens from ims/check often omit type/user_id entirely.
  if (!userId && !aaId) return true;
  return false;
}

export function isAdobeUserAccessToken(token: string): boolean {
  return looksLikeAdobeJwt(token) && !isAdobeGuestAccessToken(token);
}

/**
 * Pull an IMS JWT out of free-form paste: raw JWT, Bearer …, access_token=…,
 * IMS sessionStorage JSON (`tokenValue`), multi-line Network/HAR dumps.
 * Prefer the longest user (non-guest) eyJ… JWT found.
 */
export function extractAdobeCredentialToken(raw: string): string {
  const value = String(raw || "").trim();
  if (!value) return "";

  if (/^bearer\s+/i.test(value)) {
    const bare =
      value
        .replace(/^bearer\s+/i, "")
        .trim()
        .split(/\s+/)[0] || "";
    if (looksLikeAdobeJwt(bare)) return bare;
  }

  // access_token=... in cookie-ish or form paste
  const accessMatch = value.match(/(?:^|[;\s&])access_token=([^;\s&]+)/i);
  if (accessMatch?.[1]) {
    const t = decodeURIComponent(accessMatch[1].trim());
    if (looksLikeAdobeJwt(t)) return t;
  }

  // IMS sessionStorage / localStorage JSON: "tokenValue":"eyJ..."
  const tokenValueMatch = value.match(/"tokenValue"\s*:\s*"(eyJ[^"]+)"/i);
  if (tokenValueMatch?.[1] && looksLikeAdobeJwt(tokenValueMatch[1])) {
    return tokenValueMatch[1];
  }

  // Authorization: Bearer eyJ...
  const authMatch = value.match(
    /Authorization\s*:\s*Bearer\s+([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)/i
  );
  if (authMatch?.[1] && looksLikeAdobeJwt(authMatch[1])) return authMatch[1];

  // Any eyJ… JWT in the blob (HAR / multi-line). Prefer user AdobeID tokens.
  const jwtMatches = findAllAdobeJwts(value);
  if (jwtMatches && jwtMatches.length > 0) {
    const sorted = [...jwtMatches].sort((a, b) => b.length - a.length);
    const user = sorted.find((t) => looksLikeAdobeJwt(t) && isAdobeUserAccessToken(t));
    if (user) return user;
    const best = sorted[0];
    if (looksLikeAdobeJwt(best)) return best;
  }

  // Pure JWT
  if (looksLikeAdobeJwt(value)) return value.replace(/^bearer\s+/i, "").trim();

  // Cookie / other blob unchanged for IMS exchange
  return value;
}

/**
 * True when the paste still looks like a Cookie header (not a bare JWT).
 * Used to attach Cookie + sherlockToken → x-arp-session-id on generate.
 */
export function looksLikeAdobeCookieBlob(value: string): boolean {
  const raw = String(value || "").trim();
  if (!raw || looksLikeAdobeJwt(raw)) return false;
  if (raw.includes(";") && raw.includes("=")) return true;
  if (/(?:^|[;\s])(?:aux_sid|ff_session|sherlockToken|forterToken|arkose)=/i.test(raw)) {
    return true;
  }
  return false;
}

/**
 * Strip JWTs / Authorization lines from a mixed paste so only Cookie pairs remain.
 * Undici Headers.append rejects multi-line Cookie values (throws Headers.append: "eyJ…").
 */
export function extractAdobeCookieHeader(raw: string): string {
  const value = String(raw || "").trim();
  if (!value) return "";
  if (looksLikeAdobeJwt(value)) return "";

  // Drop pure JWT lines and Authorization: Bearer lines
  const cleaned = value
    .split(/[\r\n]+/)
    .map((line) => line.trim())
    .filter((line) => {
      if (!line) return false;
      if (/^authorization\s*:/i.test(line)) return false;
      if (/^bearer\s+/i.test(line)) return false;
      if (looksLikeAdobeJwt(line)) return false;
      // Drop standalone eyJ… segments
      if (isExactAdobeJwt(line)) return false;
      return true;
    })
    .join("; ");

  // Also strip inline eyJ JWT tokens that may sit inside a cookie string
  const noJwt = stripAdobeJwts(cleaned)
    .replace(/;\s*;/g, ";")
    .replace(/^;\s*|\s*;$/g, "")
    .trim();

  if (!noJwt || !looksLikeAdobeCookieBlob(noJwt)) return "";
  // Final safety: Cookie header must be single-line
  return noJwt.replace(/[\r\n]+/g, "; ").trim();
}

export const GUEST_COOKIE_HELP =
  "Firefly page cookies alone only mint a GUEST IMS token (no AdobeID) — generate returns 401 and Limits 403. " +
  "Fix: open firefly.adobe.com signed-in → F12 → Network → click a request to firefly-3p.ff.adobe.io " +
  "(generate-async or models/discovery) → Request Headers → Authorization → copy the token AFTER 'Bearer ' " +
  "(starts with eyJ…). Paste that JWT as the credential. " +
  "Cookie-only works only if you also export IMS session cookies from adobelogin.com / adobeid-na1 " +
  "(Cookie-Editor → export all Adobe domains); firefly.adobe.com cookies by themselves are not enough.";
