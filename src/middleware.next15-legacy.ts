/**
 * Global authentication middleware for /api/* management routes.
 *
 * Validates the session JWT cookie (Edge-runtime safe via jose).
 * Routes in PUBLIC_API_ROUTES bypass this check entirely.
 *
 * Design notes:
 *   - Bearer / API-key auth requires DB access and cannot be validated here.
 *     Management routes that support API-key auth must use requireManagementAuth()
 *     per-route (which has full DB access). Phase 2 adds per-route guards to the
 *     remaining unguarded management routes.
 *   - If JWT_SECRET is not set the middleware cannot verify any cookie and passes
 *     all requests through (fail-open for the middleware layer only; per-route
 *     guards still apply on the routes that have them).
 */
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPublicApiRoute } from "@/shared/constants/publicApiRoutes";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // Only guard /api/* routes
  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Allow explicitly public routes through unconditionally
  if (isPublicApiRoute(pathname)) {
    return NextResponse.next();
  }

  // JWT_SECRET is required to verify session cookies.
  // If unset, we cannot verify any token in this Edge context — pass through.
  // Per-route requireManagementAuth() guards still apply where present.
  const jwtSecret = process.env.JWT_SECRET || process.env.INITIAL_PASSWORD;
  if (!jwtSecret) {
    return NextResponse.next();
  }

  // Attempt JWT cookie validation
  const sessionCookie = request.cookies.get("omniroute-session")?.value;
  if (sessionCookie) {
    try {
      await jwtVerify(sessionCookie, new TextEncoder().encode(jwtSecret));
      return NextResponse.next();
    } catch {
      // Invalid or expired cookie — fall through to 401
    }
  }

  // No valid session cookie. Return 401.
  // Note: Bearer/API-key auth is NOT checked here (requires DB).
  // Clients using API keys for management routes must target routes with
  // per-route requireManagementAuth() guards.
  return NextResponse.json(
    { error: "Authentication required", type: "invalid_request" },
    { status: 401 }
  );
}

export const config = {
  matcher: "/api/:path*",
};
