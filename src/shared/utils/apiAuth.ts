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
  nextUrl?: { pathname?: string | null } | null;
  url?: string;
};

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
  // MCP transports are client-facing protocol endpoints and must support
  // Bearer API key auth (no dashboard cookie required).
  if (pathname.startsWith("/api/mcp/stream") || pathname.startsWith("/api/mcp/sse")) {
    return false;
  }
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
  if (!(await isAuthRequired())) {
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
 * If requireLogin is false AND no password is set, auth is skipped.
 */
export async function isAuthRequired(): Promise<boolean> {
  try {
    const settings = await getSettings();
    if (settings.requireLogin === false) return false;
    // Allow access with no password set — there's nothing to authenticate against.
    // This covers two cases:
    //   1. Fresh installs (setupComplete=false) — first-run, no password yet
    //   2. setupComplete=true but password was skipped during onboarding (#256)
    //      The user needs unauthenticated access to /dashboard/settings to set a password.
    // Note: this is safe because Bearer API key auth is still checked in verifyAuth().
    // The security concern from #151 (password row lost after being set) is handled by the
    // hasPassword flag — if a password WAS set and then somehow lost, the user can use the
    // reset-password CLI tool (bin/reset-password.mjs).
    if (!settings.password && !process.env.INITIAL_PASSWORD) return false;
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
