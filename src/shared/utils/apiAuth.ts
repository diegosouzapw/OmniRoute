/**
 * API Authentication Guard — Shared utility for protecting API routes.
 *
 * Management APIs require a dashboard session, while client-facing APIs may still
 * accept Bearer API keys. Route scope is inferred from the request pathname.
 *
 * @module shared/utils/apiAuth
 */

import { cookies } from "next/headers";
import { getSettings } from "@/lib/db/settings";
import {
  AUTHZ_HEADER_PEER_LOCALITY,
  PEER_IP_HEADER,
  VIA_PROXY_HEADER,
} from "@/server/authz/headers";
import { classifyStampedPeerLocality } from "@/server/authz/peerStamp";
import { classifyHostLocality } from "@/server/authz/routeGuard";
import { isPublicApiRoute } from "@/shared/constants/publicApiRoutes";
import { verifyDashboardSessionToken, DASHBOARD_SESSION_COOKIE } from "@/shared/utils/dashboardSessionToken";
import { extractApiKey } from "@/sse/services/auth";

type RequestLike = {
  cookies?: {
    get?: (name: string) => { value?: string } | undefined;
  };
  headers?: Headers;
  method?: string;
  nextUrl?: { hostname?: string | null; pathname?: string | null } | null;
  url?: string;
  /** Real socket peer, present only for direct Node / test callers (never in the proxy runtime). */
  ip?: string;
  socket?: { remoteAddress?: string };
};

export interface AuthRequiredOptions {
  /**
   * Pre-resolved trusted peer verdict. The authz policy layer already resolves
   * locality from the token-stamped real TCP peer (`peerContext.isLoopbackRequest`)
   * and hands it down, so the bootstrap gate never re-derives it from headers on
   * the ORIGINAL (pre-strip) request — where a client-supplied copy of the
   * pipeline's own locality header could still be present.
   */
  loopback?: boolean;
}

function hasConfiguredPassword(settings: Record<string, unknown>): boolean {
  return typeof settings.password === "string" && settings.password.length > 0;
}
function hasConfiguredOidc(settings: Record<string, unknown>): boolean {
  return (
    settings.oidcEnabled === true &&
    typeof settings.oidcIssuer === "string" &&
    settings.oidcIssuer.trim().length > 0 &&
    typeof settings.oidcClientId === "string" &&
    settings.oidcClientId.trim().length > 0 &&
    typeof settings.oidcClientSecret === "string" &&
    settings.oidcClientSecret.trim().length > 0
  );
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

function isRequireLoginBootstrapWritePath(pathname: string | null, method: string): boolean {
  return pathname === "/api/settings/require-login" && method.toUpperCase() === "POST";
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

function getHeaderValue(
  request: RequestLike | Request | null | undefined,
  name: string
): string | null {
  const requestHeaders =
    request && typeof request === "object" && "headers" in request ? request.headers : undefined;
  return requestHeaders?.get?.(name) ?? null;
}

function getSocketPeerAddress(request: RequestLike | Request | null | undefined): string | null {
  if (!request || typeof request !== "object") return null;
  const candidate = request as RequestLike;
  if (typeof candidate.ip === "string" && candidate.ip) return candidate.ip;
  const remoteAddress = candidate.socket?.remoteAddress;
  return typeof remoteAddress === "string" && remoteAddress ? remoteAddress : null;
}

/**
 * Trusted peer locality for the fresh-install bootstrap gate.
 *
 * NEVER derived from `Host` / `nextUrl.hostname` / the request URL — all three
 * are client-controlled, so a remote caller sending `Host: localhost` used to be
 * treated as the local operator (GHSA-7pq4-8pvv-rx7r). The verdict comes from
 * the same primitives the authz pipeline already trusts, in this order:
 *
 *   1. The token-stamped real TCP peer (`PEER_IP_HEADER` + `VIA_PROXY_HEADER`,
 *      written by the custom Node server from `req.socket.remoteAddress` after
 *      deleting any client-supplied value, validated against
 *      OMNIROUTE_PEER_STAMP_TOKEN). This is what the policy layer sees on the
 *      ORIGINAL request. A stamp present but failing validation → not loopback.
 *      A loopback socket flagged as a reverse-proxy hop → not loopback.
 *   2. The pipeline's own locality verdict (`AUTHZ_HEADER_PEER_LOCALITY`), which
 *      route handlers see after `runAuthzPipeline` stripped every client-supplied
 *      copy and re-stamped it from (1). Trusted only while the per-process stamp
 *      token exists — i.e. a stamping server is actually in front of Next, in
 *      which case every request that reached the policy carried (1) and this
 *      branch can only be the post-strip route-handler view.
 *   3. A real socket peer (`request.ip` / `request.socket.remoteAddress`) for
 *      direct Node / unit-test callers that never went through the pipeline.
 *      The proxy runtime exposes neither, so nothing here is client-reachable.
 *
 * Anything else → not loopback (fail closed), matching
 * `src/server/authz/peerContext.ts::isLoopbackRequest`.
 */
export function isLoopbackRequest(request: RequestLike | Request | null | undefined): boolean {
  if (!request || typeof request !== "object") return false;

  const stampToken = process.env.OMNIROUTE_PEER_STAMP_TOKEN;

  const stampedPeer = getHeaderValue(request, PEER_IP_HEADER);
  if (stampedPeer !== null) {
    return (
      classifyStampedPeerLocality(
        stampedPeer,
        getHeaderValue(request, VIA_PROXY_HEADER),
        stampToken
      ) === "loopback"
    );
  }

  const pipelineVerdict = getHeaderValue(request, AUTHZ_HEADER_PEER_LOCALITY);
  if (pipelineVerdict !== null && stampToken) {
    return pipelineVerdict === "loopback";
  }

  const socketPeer = getSocketPeerAddress(request);
  if (socketPeer) return classifyHostLocality(socketPeer) === "loopback";

  // A stamping server is in front (every supported runtime — run-next dev/start and
  // standalone-server-ws for Docker, the npm CLI and Electron — calls
  // ensurePeerStampToken() at boot) but neither trusted signal is on this request:
  // fail closed. The Host header is never consulted in that process.
  if (stampToken) return false;

  // No stamping server in this process at all: route handlers invoked directly (the
  // unit-test harness) or a raw `next` launch that also bypasses every LOCAL_ONLY
  // gate in peerContext. There is no real peer to read, so keep the historical
  // URL/Host verdict rather than turning every direct handler call into a remote one.
  return isLegacyHostLoopback(request);
}

function isLegacyHostLoopback(request: RequestLike | Request): boolean {
  let hostname: string | null = null;
  const candidate = request as RequestLike;
  if (candidate.nextUrl && typeof candidate.nextUrl.hostname === "string") {
    hostname = candidate.nextUrl.hostname;
  } else if (typeof candidate.url === "string" && candidate.url) {
    try {
      hostname = new URL(candidate.url, "http://localhost").hostname;
    } catch {
      hostname = null;
    }
  }
  if (!hostname) {
    const host = getHeaderValue(request, "host");
    if (!host) return false;
    try {
      hostname = new URL(`http://${host}`).hostname;
    } catch {
      hostname = host.split(":")[0] || null;
    }
  }
  if (!hostname) return false;
  const normalized = hostname
    .trim()
    .toLowerCase()
    .replace(/^\[(.*)\]$/, "$1");
  return (
    normalized === "localhost" || normalized === "::1" || /^127(?:\.\d{1,3}){3}$/.test(normalized)
  );
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

function getRequestApiKey(
  request: RequestLike | Request | null | undefined,
  opts?: { allowUrl?: boolean }
): string | null {
  if (!request || typeof request !== "object") return null;

  const headers = "headers" in request ? request.headers : undefined;
  const rawUrl = "url" in request && typeof request.url === "string" ? request.url : null;
  const pathname = getRequestPathname(request);
  const syntheticUrl = rawUrl || (pathname ? `http://localhost${pathname}` : null);

  // Management auth never honours a URL-borne credential (defence-in-depth: the
  // path-scoped token is a client-API affordance only — a credential in the URL
  // must not authenticate a management route). See the #3300 security follow-up.
  const allowUrl = opts?.allowUrl !== false;

  return extractApiKey({ headers, url: allowUrl ? syntheticUrl : null }, { allowUrl });
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

/**
 * Check whether a Bearer API key is valid AND carries a scope that authorizes
 * it on management API routes (`/api/*` excluding `/api/v1/*` and the public
 * allowlist). Returns `false` for unscoped keys so that the existing
 * default-deny posture on management routes is preserved.
 *
 * Scope set is sourced from `@/shared/constants/managementScopes` so this
 * helper stays in lockstep with `requireManagementAuth.hasManageScope`.
 */
async function validateBearerApiKeyForManagement(apiKey: string | null): Promise<boolean> {
  if (!apiKey) return false;

  try {
    const [{ validateApiKey, getApiKeyMetadata }, { hasManageScope }] = await Promise.all([
      import("@/lib/db/apiKeys"),
      import("@/shared/constants/managementScopes"),
    ]);
    const valid = await validateApiKey(apiKey);
    if (!valid) return false;

    const metadata = await getApiKeyMetadata(apiKey);
    if (!metadata) return false;

    return hasManageScope(metadata.scopes);
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
    request.cookies?.get?.(DASHBOARD_SESSION_COOKIE)?.value
      ? request.cookies.get(DASHBOARD_SESSION_COOKIE)?.value || null
      : null;

  const requestHeaders =
    request && typeof request === "object" && "headers" in request ? request.headers : undefined;

  if (!token) {
    token = getCookieValueFromHeader(requestHeaders, DASHBOARD_SESSION_COOKIE);
  }

  if (!token) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(DASHBOARD_SESSION_COOKIE)?.value || null;
    } catch {
      token = null;
    }
  }

  if (!token) return false;

  return (await verifyDashboardSessionToken(token)) !== null;
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

  const isManagement = isManagementApiRequest(request);
  const apiKey = getRequestApiKey(request, { allowUrl: !isManagement });
  if (isManagement) {
    if (await validateBearerApiKeyForManagement(apiKey)) {
      return null;
    }
    return apiKey ? "Invalid management token" : "Authentication required";
  }

  if (await validateBearerApiKey(apiKey)) {
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

  const isManagement = isManagementApiRequest(request);
  const apiKey = getRequestApiKey(request, { allowUrl: !isManagement });
  if (isManagement) {
    return validateBearerApiKeyForManagement(apiKey);
  }

  return validateBearerApiKey(apiKey);
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
 *
 * "Loopback" is the trusted peer verdict (`isLoopbackRequest` above, or the
 * policy-supplied `options.loopback`), never the Host header.
 */
export async function isAuthRequired(
  request?: RequestLike | Request | null | undefined,
  options?: AuthRequiredOptions
): Promise<boolean> {
  try {
    const settings = await getSettings();
    if (settings.requireLogin === false) return false;

    if (
      !hasConfiguredPassword(settings) &&
      !hasConfiguredOidc(settings) &&
      !process.env.INITIAL_PASSWORD
    ) {
      if (!request) return false;

      const pathname = getRequestPathname(request);
      const method = getRequestMethod(request);
      if (isOnboardingBootstrapPath(pathname)) {
        return false;
      }

      if (pathname && isPublicApiRoute(pathname, method)) {
        return false;
      }

      const loopback = options?.loopback ?? isLoopbackRequest(request);

      // The first-password write is the switch that disarms every other guard
      // (requireLogin=false makes isAuthenticated() true everywhere), so it is
      // the one bootstrap path that MUST honour the loopback constraint — it
      // used to be an unconditional `return false`, open to any network peer
      // during the window (GHSA-7pq4-8pvv-rx7r). It stays open for the local
      // operator even after onboarding completed without a password.
      if (isRequireLoginBootstrapWritePath(pathname, method)) {
        return !loopback;
      }

      return settings.setupComplete === true || !loopback;
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
