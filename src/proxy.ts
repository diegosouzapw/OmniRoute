import { NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import { generateRequestId } from "./shared/utils/requestId";
import { getSettings } from "./lib/localDb";
import { isPublicRoute, verifyAuth, isAuthRequired } from "./shared/utils/apiAuth";
import { checkBodySize, getBodySizeLimit } from "./shared/middleware/bodySizeGuard";
import { isDraining } from "./lib/gracefulShutdown";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "");

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Pipeline: Add request ID header for end-to-end tracing
  const requestId = generateRequestId();
  const response = NextResponse.next();
  response.headers.set("X-Request-Id", requestId);

  // ──────────────── Pre-flight: Reject during shutdown drain ────────────────
  if (isDraining() && pathname.startsWith("/api/")) {
    return NextResponse.json(
      {
        error: {
          code: "SERVICE_UNAVAILABLE",
          message: "Server is shutting down",
          correlation_id: requestId,
        },
      },
      { status: 503 }
    );
  }

  // ──────────────── Pre-flight: Reject oversized bodies ────────────────
  if (pathname.startsWith("/api/") && request.method !== "GET" && request.method !== "OPTIONS") {
    const bodySizeRejection = checkBodySize(request, getBodySizeLimit(pathname));
    if (bodySizeRejection) return bodySizeRejection;
  }

  // ──────────────── Protect Management API Routes ────────────────
  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/v1/")) {
    // Allow public routes (login, logout, health, etc.)
    if (isPublicRoute(pathname)) {
      return response;
    }

    // Check if auth is required at all (respects requireLogin setting)
    const authRequired = await isAuthRequired();
    if (!authRequired) {
      return response;
    }

    // Verify authentication (JWT cookie or Bearer API key)
    const authError = await verifyAuth(request);
    if (authError) {
      return NextResponse.json(
        {
          error: {
            code: "AUTH_001",
            message: authError,
            correlation_id: requestId,
          },
        },
        { status: 401 }
      );
    }
  }

  // ──────────────── Protect Dashboard Routes ────────────────
  if (pathname.startsWith("/dashboard")) {
    // Always allow onboarding — it has its own setupComplete guard
    if (pathname.startsWith("/dashboard/onboarding")) {
      return response;
    }

    const token = request.cookies.get("auth_token")?.value;

    if (token) {
      try {
        const { payload } = await jwtVerify(token, SECRET);

        // Auto-refresh: if token expires within 7 days, issue a fresh 30-day token
        const exp = payload.exp as number;
        const now = Math.floor(Date.now() / 1000);
        const REFRESH_WINDOW = 7 * 24 * 60 * 60; // 7 days in seconds
        if (exp && exp - now < REFRESH_WINDOW) {
          try {
            const freshToken = await new SignJWT({ authenticated: true })
              .setProtectedHeader({ alg: "HS256" })
              .setExpirationTime("30d")
              .sign(SECRET);

            // Detect secure context
            const fwdProto = (request.headers.get("x-forwarded-proto") || "")
              .split(",")[0]
              .trim()
              .toLowerCase();
            const isHttps = fwdProto === "https" || request.nextUrl?.protocol === "https:";
            const useSecure = process.env.AUTH_COOKIE_SECURE === "true" || isHttps;

            response.cookies.set("auth_token", freshToken, {
              httpOnly: true,
              secure: useSecure,
              sameSite: "lax",
              path: "/",
            });
            console.log(
              `[Middleware] JWT auto-refreshed for ${pathname} (was expiring in ${Math.round((exp - now) / 3600)}h)`
            );
          } catch (refreshErr) {
            // Refresh failed — continue with existing valid token
            console.error("[Middleware] JWT auto-refresh failed:", refreshErr.message);
          }
        }

        return response;
      } catch (err) {
        // FASE-01: Log auth errors instead of silently redirecting
        console.error("[Middleware] auth_error: JWT verification failed:", err.message, {
          path: pathname,
          tokenPresent: true,
          requestId,
        });
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    try {
      // Direct import — no HTTP self-fetch overhead
      const settings = await getSettings();
      // Skip auth if login is not required
      if (settings.requireLogin === false) {
        return response;
      }
      // Skip auth if no password has been set yet (fresh install with no env override)
      // This prevents an unresolvable loop where requireLogin=true but no password exists
      if (!settings.password && !process.env.INITIAL_PASSWORD) {
        return response;
      }
    } catch (err) {
      // FASE-01: Log settings fetch errors instead of silencing them
      console.error("[Middleware] settings_error: Settings read failed:", err.message, {
        path: pathname,
        requestId,
      });
      // On error, require login
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect / to /dashboard if logged in, or /dashboard if it's the root
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/api/:path*"],
};
