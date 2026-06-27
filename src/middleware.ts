/**
 * Next.js Edge Middleware — per-request Content-Security-Policy (#5083).
 *
 * The static CSP in next.config.mjs only covers loopback origins in
 * connect-src. When OmniRoute is reached from a LAN, Tailscale, or public
 * hostname the dashboard cannot establish WebSocket connections because
 * ws://<hostname>:* is absent from the static policy.
 *
 * This middleware reads the trusted Host header, validates it with a strict
 * regex, and — for valid non-loopback hosts — appends
 *   ws://<host>:*  http://<host>:*
 * to connect-src before the response reaches the browser.
 *
 * The CSP header set here overrides the static next.config.mjs header
 * because middleware runs before the static route headers are applied.
 * The static CSP is kept in next.config.mjs as a build-time fallback for
 * environments where middleware is disabled.
 *
 * Security:
 *   - Host values are validated with a bounded hostname/IPv4 regex before
 *     interpolation. Invalid / injection-shaped values are ignored.
 *   - /dashboard/providers/services/*/embed/* keeps "frame-ancestors 'self'"
 *     (overrides the baseline "frame-ancestors 'none'") so the embedded
 *     service UI can be iframed by the OmniRoute dashboard.
 *   - All other hard-coded security directives (object-src, form-action …)
 *     are preserved verbatim from the baseline.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { buildCspForHost } from "@/server/csp";

/** Path prefix for embedded service reverse-proxy pages (Hard Rule #17). */
const EMBED_PREFIX = "/dashboard/providers/services/";

export function middleware(request: NextRequest): NextResponse {
  const response = NextResponse.next();

  const { pathname } = request.nextUrl;
  const host = request.headers.get("host");

  // Embedded service UI pages need `frame-ancestors 'self'` so that the
  // OmniRoute dashboard can render them inside an <iframe>.  The route is
  // already LOCAL_ONLY (routeGuard.ts) so non-loopback callers cannot reach
  // it — the relaxed frame-ancestors is safe in that context.
  if (pathname.startsWith(EMBED_PREFIX) && pathname.includes("/embed/")) {
    response.headers.set("Content-Security-Policy", "frame-ancestors 'self'");
    return response;
  }

  // All other paths: build a host-aware CSP.
  response.headers.set("Content-Security-Policy", buildCspForHost(host));
  return response;
}

export const config = {
  /**
   * Run on every page / API route.
   * Excludes:
   *   _next/static  — static asset chunks (no HTML/headers needed)
   *   _next/image   — image optimisation endpoint
   *   favicon.ico   — no CSP needed on icon requests
   */
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
