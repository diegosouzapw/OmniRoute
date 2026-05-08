/**
 * API Authentication Guard — Shared utility for protecting API routes.
 *
 * Management APIs require a dashboard session, while client-facing APIs may still
 * accept Bearer API keys. Route scope is inferred from the request pathname.
 *
 * @module shared/utils/apiAuth
 */

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getSettings } from "@/lib/localDb";
import { isPublicApiRoute } from "@/shared/constants/publicApiRoutes";

type RequestLike = {
  cookies?: {
    get?: (name: string) => { value?: string } | undefined;
  };
  headers?: Headers;
  method?: string;
  nextUrl?: { hostname?: string | null; pathname?: string | null } | null;
  url?: string;
};

const LOOPBACK_HOSTNAMES = new Set(["localhost", "::1"]);

function hasConfiguredPassword(settings: Record<string, unknown>): boolean {
  return typeof settings.password === "string" && settings.password.length > 0;
}

function getRequestPathname(request: RequestLike | Request | null | undefined): string | null {
  const nextPathname =
    request &&
    typeof request === "object" &&
    "nextUrl" in request &&
    request.nextUrl &&
    typeof request.nextUrl.pathname === "string"
      ? request.nextUrl.pathname
      : null;

  if (nextPathname) return nextPathname;

  const rawUrl =
    request && typeof request === "object" && "url" in request && typeof request.url === "string"
      ? request.url
      : "";

  if (!rawUrl) return null;

  try {
    return new URL(rawUrl, "http://localhost").pathname;
  } catch {
    return null;
  }
}

function isOnboardingBootstrapPath(pathname: string | null): boolean {
  return pathname === "/dashboard/onboarding";
}

function getRequestMethod(request: RequestLike | Request | null | undefined): string {
  if (
    request &&
    typeof request === "object" &&
    "method" in request &&
    typeof request.method === "string"
  ) {
    return request.method.toUpperCase();
  }
  return "GET";
}

function getRequestHostname(request: RequestLike | Request | null | undefined): string | null {
  const nextHostname =
    request &&
    typeof request === "object" &&
    "nextUrl" in request &&
    request.nextUrl &&
    typeof request.nextUrl.hostname === "string"
      ? request.nextUrl.hostname
      : null;

  if (nextHostname) return nextHostname;

  const rawUrl =
    request && typeof request === "object" && "url" in request && typeof request.url === "string"
      ? request.url
      : "";

  if (rawUrl) {
    try {
      return new URL(rawUrl, "http://localhost").hostname;
    } catch {
      // Fall through to Host header parsing.
    }
  }

  const requestHeaders =
    request && typeof request === "object" && "headers" in request ? request.headers : undefined;
  const host = requestHeaders?.get("host") || requestHeaders?.get("Host") || null;
  if (!host) return null;

  try {
    return new URL(`http://${host}`).hostname;
  } catch {
    return host.split(":")[0] || null;
  }
}

export function isLoopbackRequest(request: RequestLike | Request | null | undefined): boolean {
  const hostname = getRequestHostname(request);
  if (!hostname) return false;

  const normalized = hostname
    .trim()
    .toLowerCase()
    .replace(/^\[(.*)\]$/, "$1");
  if (LOOPBACK_HOSTNAMES.has(normalized)) return true;
  if (/^127(?:\.\d{1,3}){3}$/.test(normalized)) return true;
  return false;
}

function getCookieValueFromHeader(headers: Headers | undefined, name: string): string | null {
  const cookieHeader = headers?.get("cookie") || headers?.get("Cookie");
  if (!cookieHeader) return null;

  for (const segment of cookieHeader.split(";")) {
    const [rawKey, ...rawValue] = segment.split("=");
    if (!rawKey || rawValue.length === 0) continue;
    if (rawKey.trim() !== name) continue;
    return rawValue.join("=").trim();
  }

  return null;
}

function getBearerToken(request: RequestLike | Request | null | undefined): string | null {
  const headers =
    request && typeof request === "object" && "headers" in request ? request.headers : undefined;
  const authHeader = headers?.get("authorization") || headers?.get("Authorization");
  if (typeof authHeader !== "string") return null;

  const trimmedHeader = authHeader.trim();
  if (!trimmedHeader.toLowerCase().startsWith("bearer ")) return null;
  return trimmedHeader.slice(7).trim() || null;
}

async function validateBearerApiKey(apiKey: string | null): Promise<boolean> {
  if (!apiKey) return false;

  try {
    const { validateApiKey } = await import("@/lib/db/apiKeys");
    return await validateApiKey(apiKey);
  } catch {
    return false;
  }
}

export function isManagementApiRequest(request: RequestLike | Request): boolean {
  const pathname = getRequestPathname(request);
  if (!pathname?.startsWith("/api/")) return false;
  if (pathname.startsWith("/api/v1/")) return false;
  return !isPublicApiRoute(pathname, getRequestMethod(request));
}

export async function isDashboardSessionAuthenticated(
  request?: RequestLike | Request | null
): Promise<boolean> {
  if (!process.env.JWT_SECRET) return false;

  let token =
    request &&
    typeof request === "object" &&
    "cookies" in request &&
    request.cookies?.get?.("auth_token")?.value
      ? request.cookies.get("auth_token")?.value || null
      : null;

  const requestHeaders =
    request && typeof request === "object" && "headers" in request ? request.headers : undefined;

  if (!token) {
    token = getCookieValueFromHeader(requestHeaders, "auth_token");
  }

  if (!token) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get("auth_token")?.value || null;
    } catch {
      token = null;
    }
  }

  if (!token) return false;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

// ──────────────── Auth Verification ────────────────

/**
 * Check if a request is authenticated.
 *
 * @returns null if authenticated, error message string if not
 */
export async function verifyAuth(request: any): Promise<string | null> {
  if (await isDashboardSessionAuthenticated(request)) {
    return null;
  }

  const bearerToken = getBearerToken(request);
  if (isManagementApiRequest(request)) {
    return bearerToken ? "Invalid management token" : "Authentication required";
  }

  if (await validateBearerApiKey(bearerToken)) {
    return null;
  }

  return "Authentication required";
}

/**
 * Check if a request is authenticated — boolean convenience wrapper for route handlers.
 *
 * Uses `cookies()` from next/headers (App Router compatible) and Bearer API key.
 * Returns true if authenticated, false otherwise.
 *
 * Unlike `verifyAuth`, this does NOT check `isAuthRequired()` — callers that
 * need to conditionally skip auth should check that separately.
 */
export async function isAuthenticated(request: Request): Promise<boolean> {
  // If settings say login/auth is disabled, treat all requests as authenticated
  if (!(await isAuthRequired(request))) {
    return true;
  }

  if (await isDashboardSessionAuthenticated(request)) {
    return true;
  }

  if (isManagementApiRequest(request)) {
    return false;
  }

  return validateBearerApiKey(getBearerToken(request));
}

/**
 * Check if a route is in the public (no-auth) allowlist.
 */
export function isPublicRoute(pathname: string, method = "GET"): boolean {
  return isPublicApiRoute(pathname, method);
}

/**
 * Check if authentication is required based on settings.
 * If requireLogin is explicitly false, auth is skipped. Fresh installs without
 * a password keep their unauthenticated bootstrap path only on loopback
 * requests; exposed network requests must configure INITIAL_PASSWORD or log in.
 */
export async function isAuthRequired(
  request?: RequestLike | Request | null | undefined
): Promise<boolean> {
  try {
    const settings = await getSettings();
    if (settings.requireLogin === false) return false;

    if (!hasConfiguredPassword(settings) && !process.env.INITIAL_PASSWORD) {
      if (!request) return false;

      const pathname = getRequestPathname(request);
      if (isOnboardingBootstrapPath(pathname)) {
        return false;
      }

      if (pathname && isPublicApiRoute(pathname, getRequestMethod(request))) {
        return false;
      }

      return settings.setupComplete === true || !isLoopbackRequest(request);
    }

    return true;
  } catch (error: any) {
    // On error, require auth (secure by default)
    // Log the error so failures (e.g., SQLITE_BUSY) aren't silent 401s
    console.error(
      "[API_AUTH_GUARD] isAuthRequired failed, defaulting to true:",
      error?.message || error
    );
    return true;
  }
}
