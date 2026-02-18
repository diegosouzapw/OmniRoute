/**
 * API Authentication Guard — Shared utility for protecting management API routes.
 *
 * Provides dual-mode auth: JWT cookie (dashboard session) or Bearer API key.
 * Used by the middleware (proxy.ts) to guard /api/* management routes.
 *
 * @module shared/utils/apiAuth
 */

import { jwtVerify } from "jose";
import { getSettings } from "@/lib/localDb";

// ──────────────── Public Routes (No Auth Required) ────────────────

/**
 * Routes that are ALWAYS accessible without authentication.
 * Pattern matching: startsWith check against the pathname.
 */
const PUBLIC_API_ROUTES = [
  // Auth flow — must be accessible to unauthenticated users
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",

  // Settings check — used by login page / onboarding
  "/api/settings/require-login",

  // Init — first-run setup
  "/api/init",

  // Health monitoring — probes must work without auth
  "/api/monitoring/health",

  // LLM proxy routes — use their own API key auth in the SSE layer
  "/api/v1/",

  // Cloud routes — use Bearer API key auth internally
  "/api/cloud/",

  // OAuth callback routes — provider redirects back here
  "/api/oauth/",
];

// ──────────────── Auth Verification ────────────────

/**
 * Check if a request is authenticated via JWT cookie or Bearer API key.
 *
 * @returns null if authenticated, error message string if not
 */
export async function verifyAuth(request: any): Promise<string | null> {
  // 1. Check JWT cookie (dashboard session)
  const token = request.cookies.get("auth_token")?.value;
  if (token && process.env.JWT_SECRET) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return null; // ✔ Authenticated via cookie
    } catch {
      // Invalid/expired token — fall through to API key check
    }
  }

  // 2. Check Bearer API key
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const apiKey = authHeader.slice(7);
    try {
      // Dynamic import to avoid circular dependencies during build
      const { validateApiKey } = await import("@/lib/db/apiKeys");
      const isValid = await validateApiKey(apiKey);
      if (isValid) return null; // ✔ Authenticated via API key
    } catch {
      // DB not ready or import error — deny access
    }
  }

  return "Authentication required";
}

/**
 * Check if a route is in the public (no-auth) allowlist.
 */
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_API_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * Check if authentication is required based on settings.
 * If requireLogin is false AND no password is set, auth is skipped.
 */
export async function isAuthRequired(): Promise<boolean> {
  try {
    const settings = await getSettings();
    if (settings.requireLogin === false) return false;
    // If no password set and no env override, don't require auth (fresh install)
    if (!settings.password && !process.env.INITIAL_PASSWORD) return false;
    return true;
  } catch {
    // On error, require auth (secure by default)
    return true;
  }
}
