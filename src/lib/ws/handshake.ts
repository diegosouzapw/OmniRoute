import { jwtVerify } from "jose";
import { getSettings } from "@/lib/localDb";
import { validateApiKey } from "@/lib/db/apiKeys";

export const DEFAULT_WS_PATH = "/v1/ws";
const WS_QUERY_TOKEN_KEYS = ["api_key", "token", "access_token"];

export type WsAuthType = "none" | "api_key" | "session";

export interface WsRuntimeConfig {
  wsAuth: boolean;
  wsPath: string;
}

export interface WsHandshakeAuthResult extends WsRuntimeConfig {
  authorized: boolean;
  authenticated: boolean;
  authType: WsAuthType;
  hasCredential: boolean;
}

function getCookieValue(cookieHeader: string | null, cookieName: string): string | null {
  if (typeof cookieHeader !== "string" || cookieHeader.trim().length === 0) {
    return null;
  }

  for (const part of cookieHeader.split(";")) {
    const [rawName, ...rest] = part.trim().split("=");
    if (rawName === cookieName) {
      const value = rest.join("=").trim();
      return value || null;
    }
  }

  return null;
}

async function hasValidSessionCookie(request: Request): Promise<boolean> {
  const secretValue = process.env.JWT_SECRET;
  if (typeof secretValue !== "string" || secretValue.trim().length === 0) {
    return false;
  }

  const token = getCookieValue(request.headers.get("cookie"), "auth_token");
  if (!token) return false;

  try {
    await jwtVerify(token, new TextEncoder().encode(secretValue));
    return true;
  } catch {
    return false;
  }
}

export function extractWsTokenFromUrl(input: string | URL): string | null {
  const url = input instanceof URL ? input : new URL(input);
  for (const key of WS_QUERY_TOKEN_KEYS) {
    const value = url.searchParams.get(key);
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return null;
}

export function extractWsTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get("authorization") || request.headers.get("Authorization");
  if (typeof authHeader === "string" && authHeader.trim().toLowerCase().startsWith("bearer ")) {
    const token = authHeader.slice(7).trim();
    if (token) return token;
  }

  return extractWsTokenFromUrl(request.url);
}

export async function getWsRuntimeConfig(): Promise<WsRuntimeConfig> {
  const settings = await getSettings().catch(() => ({}));
  return {
    wsAuth: settings.wsAuth === true,
    wsPath: DEFAULT_WS_PATH,
  };
}

export async function authorizeWebSocketHandshake(
  request: Request
): Promise<WsHandshakeAuthResult> {
  const config = await getWsRuntimeConfig();
  const token = extractWsTokenFromRequest(request);
  const hasCredential = typeof token === "string" && token.length > 0;
  const validApiKey = hasCredential ? await validateApiKey(token) : false;

  if (!config.wsAuth) {
    return {
      ...config,
      authorized: true,
      authenticated: validApiKey,
      authType: validApiKey ? "api_key" : "none",
      hasCredential,
    };
  }

  if (validApiKey) {
    return {
      ...config,
      authorized: true,
      authenticated: true,
      authType: "api_key",
      hasCredential: true,
    };
  }

  if (await hasValidSessionCookie(request)) {
    return {
      ...config,
      authorized: true,
      authenticated: true,
      authType: "session",
      hasCredential,
    };
  }

  return {
    ...config,
    authorized: false,
    authenticated: false,
    authType: "none",
    hasCredential,
  };
}
