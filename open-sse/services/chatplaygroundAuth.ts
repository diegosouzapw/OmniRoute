/**
 * ChatPlayground Authentication Service
 *
 * Supports short-lived Clerk session JWTs auto-minted from the `__client` cookie
 * and `sid` (derived from the `__session` cookie JWT payload), direct Clerk Bearer JWTs,
 * and Clerk user IDs.
 *
 * Multi-account load balancing and failover are handled natively by OmniRoute's
 * Combo Routing engine (combo.ts and accountFallback.ts) across connection records.
 */

export const CLERK_HOST = "https://clerk.chatplayground.ai";
export const CLERK_MINT_PATH = "/v1/client/sessions/{sid}/tokens";
export const CLERK_MINT_QUERY = "?__clerk_api_version=2025-11-10&_clerk_js_version=5.127.2";
export const WEB_ORIGIN = "https://web.chatplayground.ai";
export const DEFAULT_CLERK_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36";

export const CLERK_JWT_SKEW_SECONDS = 15;

export interface ChatPlaygroundAccount {
  id: string;
  type: "jwt" | "cookie" | "user_id";
  jwt?: string;
  sid?: string;
  client?: string;
  userId?: string;
  cookies?: Record<string, string>;
}

export interface CachedJwt {
  jwt: string;
  exp: number;
}

// In-memory cache for auto-minted Clerk JWTs keyed by session ID (sid)
const jwtCache = new Map<string, CachedJwt>();

/**
 * Decode JWT payload claims without verifying signature.
 */
export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.trim().split(".");
  if (parts.length !== 3) return null;
  try {
    const raw = Buffer.from(parts[1], "base64url").toString("utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Extract `sid` claim from a Clerk `__session` JWT cookie value.
 */
export function extractSidFromSessionJwt(sessionCookie: string): string {
  if (!sessionCookie) return "";
  const payload = decodeJwtPayload(sessionCookie);
  if (payload && typeof payload.sid === "string") {
    return payload.sid;
  }
  return "";
}

/**
 * Extract `exp` timestamp (in seconds) from a JWT token.
 */
export function extractExpFromJwt(token: string): number {
  const payload = decodeJwtPayload(token);
  if (payload && typeof payload.exp === "number") {
    return payload.exp;
  }
  return 0;
}

/**
 * Parse cookie export string into a key-value record and extract `sid` if present.
 */
export function parseCookieString(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieString || typeof cookieString !== "string") return cookies;

  const normalized = cookieString.replace(/^Cookie:\s*/i, "").trim();
  for (const part of normalized.split(";")) {
    const trimmed = part.trim();
    if (!trimmed || !trimmed.includes("=")) continue;
    const eqIdx = trimmed.indexOf("=");
    const name = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (name) {
      cookies[name] = value;
    }
  }

  if (cookies.__session && !cookies.sid) {
    const derivedSid = extractSidFromSessionJwt(cookies.__session);
    if (derivedSid) {
      cookies.sid = derivedSid;
    }
  }

  return cookies;
}

/**
 * Parse input credentials for a single ChatPlayground connection.
 */
export function parseChatPlaygroundAccount(rawInput: string): ChatPlaygroundAccount | null {
  let raw = (rawInput || "").trim();
  if (!raw) return null;

  if (raw.startsWith("Bearer ")) {
    raw = raw.slice(7).trim();
  }

  // 1. Direct JWT check (header.payload.signature)
  if (raw.startsWith("eyJ") && raw.split(".").length === 3) {
    return {
      id: "direct_jwt",
      type: "jwt",
      jwt: raw,
    };
  }

  // 2. Clerk user ID check (e.g. user_2...)
  if (raw.startsWith("user_") && !raw.includes("=")) {
    return {
      id: raw,
      type: "user_id",
      userId: raw,
    };
  }

  // 3. Cookie header parsing
  const cookies = parseCookieString(raw);
  const client = cookies.__client || "";
  const sid = cookies.sid || (cookies.__session ? extractSidFromSessionJwt(cookies.__session) : "");

  if (client && sid) {
    return {
      id: sid,
      type: "cookie",
      sid,
      client,
      cookies,
    };
  }

  // 4. Session cookie with embedded JWT
  if (cookies.__session && cookies.__session.startsWith("eyJ")) {
    return {
      id: "session_jwt",
      type: "jwt",
      jwt: cookies.__session,
    };
  }

  // 5. Fallback string
  return {
    id: "raw_credential",
    type: raw.startsWith("eyJ") ? "jwt" : "user_id",
    jwt: raw.startsWith("eyJ") ? raw : undefined,
    userId: !raw.startsWith("eyJ") ? raw : undefined,
  };
}

/**
 * Mint a fresh Clerk session JWT for an account via Clerk's tokens endpoint.
 */
export async function mintClerkJwt(
  account: { sid: string; client: string },
  timeoutMs = 15_000
): Promise<CachedJwt> {
  const url = `${CLERK_HOST}${CLERK_MINT_PATH.replace("{sid}", encodeURIComponent(account.sid))}${CLERK_MINT_QUERY}`;
  const headers = {
    accept: "*/*",
    "content-type": "application/x-www-form-urlencoded",
    origin: WEB_ORIGIN,
    referer: `${WEB_ORIGIN}/`,
    "user-agent": DEFAULT_CLERK_UA,
    cookie: `__client=${account.client}`,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: "organization_id=&token=",
      signal: controller.signal,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Clerk mint failed with HTTP ${res.status}: ${errText.slice(0, 160)}`);
    }

    const data = (await res.json()) as { jwt?: string };
    if (!data.jwt) {
      throw new Error("Clerk mint returned empty response (no jwt field)");
    }

    const exp = extractExpFromJwt(data.jwt) || Math.floor(Date.now() / 1000) + 60;
    const cached: CachedJwt = { jwt: data.jwt, exp };
    jwtCache.set(account.sid, cached);
    return cached;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Resolve credentials and produce authentication headers for ChatPlayground API.
 * Handles auto-minting and in-memory token caching.
 */
export async function resolveChatPlaygroundAuth(
  credentials?: unknown,
  options?: { timeoutMs?: number }
): Promise<{ headers: Record<string, string>; accountKey: string }> {
  let rawCred = "";

  if (typeof credentials === "string") {
    rawCred = credentials;
  } else if (credentials && typeof credentials === "object") {
    const credObj = credentials as Record<string, unknown>;
    const ps = (credObj.providerSpecificData || {}) as Record<string, unknown>;

    rawCred =
      (typeof credObj.apiKey === "string" ? credObj.apiKey : "") ||
      (typeof credObj.cookie === "string" ? credObj.cookie : "") ||
      (typeof credObj.accessToken === "string" ? credObj.accessToken : "") ||
      (typeof ps.cookie === "string" ? ps.cookie : "") ||
      (typeof ps.jwt === "string" ? ps.jwt : "") ||
      "";
  }

  const account = parseChatPlaygroundAccount(rawCred);
  if (!account) {
    throw new Error(
      "No valid ChatPlayground credentials found. Provide a Clerk session cookie (__client + __session) or Clerk JWT."
    );
  }

  const userAgent =
    (typeof process !== "undefined" && process.env?.CHATPLAYGROUND_USER_AGENT?.trim()) ||
    DEFAULT_CLERK_UA;

  const headers: Record<string, string> = {
    accept: "*/*",
    "content-type": "text/plain;charset=UTF-8",
    origin: WEB_ORIGIN,
    referer: `${WEB_ORIGIN}/`,
    "user-agent": userAgent,
  };

  if (account.type === "jwt" && account.jwt) {
    headers.authorization = `Bearer ${account.jwt}`;
    return { headers, accountKey: account.id };
  }

  if (account.type === "cookie" && account.sid && account.client) {
    const nowSec = Date.now() / 1000;
    const cached = jwtCache.get(account.sid);

    if (cached && nowSec < cached.exp - CLERK_JWT_SKEW_SECONDS) {
      headers.authorization = `Bearer ${cached.jwt}`;
      return { headers, accountKey: account.sid };
    }

    try {
      const minted = await mintClerkJwt(
        { sid: account.sid, client: account.client },
        options?.timeoutMs
      );
      headers.authorization = `Bearer ${minted.jwt}`;
      return { headers, accountKey: account.sid };
    } catch (err) {
      // Fallback to cached token if available even if slightly stale
      if (cached?.jwt) {
        headers.authorization = `Bearer ${cached.jwt}`;
        return { headers, accountKey: account.sid };
      }
      throw err;
    }
  }

  if (account.type === "user_id" && account.userId) {
    headers["x-clerk-user-id"] = account.userId;
    return { headers, accountKey: account.userId };
  }

  throw new Error("Unable to resolve usable ChatPlayground credentials from provided input.");
}

/** Clear the in-memory JWT cache (useful in tests). */
export function clearChatPlaygroundJwtCache(): void {
  jwtCache.clear();
}
