/**
 * Cursor user API keys (`crsr_…`, minted at cursor.com/dashboard/api) are not
 * accepted as a Bearer credential by api2.cursor.sh (401). cursor-agent first
 * POSTs the key to `/auth/exchange_user_api_key` and receives a 1-hour session
 * JWT (`type: "api_key_token"`); the accompanying refreshToken carries the same
 * `exp`, so "refresh" simply means re-exchanging the key. This module owns that
 * exchange plus a per-key cache so the executor and the Cursor CLI passthrough
 * share one live session token per key.
 */

import crypto from "node:crypto";

export const CURSOR_API_BASE_URL = "https://api2.cursor.sh";
export const CURSOR_API_KEY_PREFIX = "crsr_";
export const CURSOR_API_KEY_EXCHANGE_PATH = "/auth/exchange_user_api_key";
export const CURSOR_API_KEY_EXCHANGE_URL = `${CURSOR_API_BASE_URL}${CURSOR_API_KEY_EXCHANGE_PATH}`;

const REFRESH_SKEW_MS = 5 * 60 * 1000;
const FALLBACK_TTL_MS = 55 * 60 * 1000;
const EXCHANGE_TIMEOUT_MS = 15_000;

export type CursorSessionToken = {
  accessToken: string;
  refreshToken: string | null;
  expiresAt: number;
};

export class CursorApiKeyExchangeError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "CursorApiKeyExchangeError";
    this.status = status;
  }
}

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

export type CursorApiKeyAuthOptions = {
  fetchImpl?: FetchLike;
  signal?: AbortSignal;
  now?: () => number;
};

const sessionCache = new Map<string, CursorSessionToken>();
const inflightExchanges = new Map<string, Promise<CursorSessionToken>>();

export function isCursorApiKey(value: unknown): value is string {
  return typeof value === "string" && value.startsWith(CURSOR_API_KEY_PREFIX);
}

// Session-cache key fingerprint, not a password/credential hash — keyed with a fixed context
// label so it reads as a domain-separated digest rather than a bare password hash.
function cacheKeyFor(apiKey: string): string {
  return crypto.createHmac("sha256", "omniroute-cursor-session-cache-fingerprint-v1")
    .update(apiKey)
    .digest("hex");
}

export function readJwtExpiryMs(token: string): number | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8")) as {
      exp?: unknown;
    };
    return typeof payload.exp === "number" && Number.isFinite(payload.exp)
      ? payload.exp * 1000
      : null;
  } catch {
    return null;
  }
}

function parseExchangeBody(raw: string): { accessToken: string; refreshToken: string | null } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new CursorApiKeyExchangeError("Cursor API key exchange returned a non-JSON body", 502);
  }
  if (!parsed || typeof parsed !== "object") {
    throw new CursorApiKeyExchangeError("Cursor API key exchange returned an empty body", 502);
  }
  const { accessToken, refreshToken } = parsed as { accessToken?: unknown; refreshToken?: unknown };
  if (typeof accessToken !== "string" || accessToken.length === 0) {
    throw new CursorApiKeyExchangeError("Cursor API key exchange returned no accessToken", 502);
  }
  return {
    accessToken,
    refreshToken: typeof refreshToken === "string" && refreshToken.length > 0 ? refreshToken : null,
  };
}

export async function exchangeCursorApiKey(
  apiKey: string,
  options: CursorApiKeyAuthOptions = {}
): Promise<CursorSessionToken> {
  if (!isCursorApiKey(apiKey)) {
    throw new CursorApiKeyExchangeError(
      `Cursor API keys start with "${CURSOR_API_KEY_PREFIX}"`,
      400
    );
  }
  const fetchImpl = options.fetchImpl ?? fetch;
  const now = options.now ?? Date.now;
  const signal = options.signal ?? AbortSignal.timeout(EXCHANGE_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetchImpl(CURSOR_API_KEY_EXCHANGE_URL, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: "{}",
      signal,
    });
  } catch {
    throw new CursorApiKeyExchangeError("Cursor API key exchange request failed", 502);
  }

  if (response.status === 401 || response.status === 403) {
    throw new CursorApiKeyExchangeError("Cursor rejected the API key", 401);
  }
  if (!response.ok) {
    throw new CursorApiKeyExchangeError(
      `Cursor API key exchange failed with HTTP ${response.status}`,
      response.status >= 500 ? 502 : response.status
    );
  }

  const { accessToken, refreshToken } = parseExchangeBody(await response.text());
  const expiresAt = readJwtExpiryMs(accessToken) ?? now() + FALLBACK_TTL_MS;
  return { accessToken, refreshToken, expiresAt };
}

function isFresh(token: CursorSessionToken, nowMs: number): boolean {
  return token.expiresAt - REFRESH_SKEW_MS > nowMs;
}

export async function resolveCursorSessionToken(
  apiKey: string,
  options: CursorApiKeyAuthOptions = {}
): Promise<CursorSessionToken> {
  const now = options.now ?? Date.now;
  const key = cacheKeyFor(apiKey);
  const cached = sessionCache.get(key);
  if (cached && isFresh(cached, now())) return cached;

  const pending = inflightExchanges.get(key);
  if (pending) return pending;

  const exchange = exchangeCursorApiKey(apiKey, options)
    .then((token) => {
      sessionCache.set(key, token);
      return token;
    })
    .finally(() => {
      inflightExchanges.delete(key);
    });
  inflightExchanges.set(key, exchange);
  return exchange;
}

export function invalidateCursorSessionToken(apiKey: string): void {
  sessionCache.delete(cacheKeyFor(apiKey));
}

export function stripCursorOAuthTokenPrefix(accessToken: string): string {
  return accessToken.includes("::") ? accessToken.split("::")[1] : accessToken;
}

export type CursorBearerCredentials = {
  apiKey?: string | null;
  accessToken?: string | null;
};

export async function resolveCursorBearerToken(
  credentials: CursorBearerCredentials,
  options: CursorApiKeyAuthOptions = {}
): Promise<string> {
  if (isCursorApiKey(credentials.apiKey)) {
    const session = await resolveCursorSessionToken(credentials.apiKey, options);
    return session.accessToken;
  }
  if (typeof credentials.accessToken === "string" && credentials.accessToken.length > 0) {
    return stripCursorOAuthTokenPrefix(credentials.accessToken);
  }
  throw new CursorApiKeyExchangeError(
    "Cursor connection has neither an API key nor a session token",
    401
  );
}

export function __resetCursorApiKeyAuthForTest(): void {
  sessionCache.clear();
  inflightExchanges.clear();
}
