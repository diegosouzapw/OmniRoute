import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { fetchWithTimeout } from "./shared/utils/fetchTimeout.js";
import { generateRequestId } from "./shared/utils/requestId.js";

// FASE-01: Fail-fast — no hardcoded fallback. Server must have JWT_SECRET configured.
if (!process.env.JWT_SECRET) {
  console.error("[SECURITY] JWT_SECRET is not set. Authentication will fail.");
}

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Pipeline: Add request ID header for end-to-end tracing
  const requestId = generateRequestId();
  const response = NextResponse.next();
  response.headers.set("X-Request-Id", requestId);

  // Protect all dashboard routes (except onboarding)
  if (pathname.startsWith("/dashboard")) {
    // Always allow onboarding — it has its own setupComplete guard
    if (pathname.startsWith("/dashboard/onboarding")) {
      return response;
    }

    const token = request.cookies.get("auth_token")?.value;

    if (token) {
      try {
        await jwtVerify(token, SECRET);
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

    const origin = request.nextUrl.origin;
    try {
      // Pipeline: Use fetchWithTimeout instead of bare fetch
      const res = await fetchWithTimeout(`${origin}/api/settings`, { timeoutMs: 5000 });
      const data = await res.json();
      // Skip auth if login is not required
      if (data.requireLogin === false) {
        return response;
      }
      // Skip auth if no password has been set yet (fresh install)
      // This prevents an unresolvable loop where requireLogin=true but no password exists
      if (!data.hasPassword) {
        return response;
      }
    } catch (err) {
      // FASE-01: Log settings fetch errors instead of silencing them
      console.error("[Middleware] settings_error: Settings fetch failed:", err.message, {
        path: pathname,
        origin,
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
  matcher: ["/", "/dashboard/:path*"],
};

