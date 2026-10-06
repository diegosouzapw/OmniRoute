// Public API surface, split by SHAPE — this file is matched two different ways
// and the distinction is load-bearing (GHSA-74g9-q8f6-793h).
//
// A prefix is matched with `startsWith()`, so it also matches every adjacent
// path that merely shares its leading characters. `/api/usage/om-usage` as a
// prefix marked `/api/usage/om-usage<anything>` PUBLIC — and Next resolves that
// to the dynamic route `/api/usage/[connectionId]`, whose handler carries no
// auth of its own because it relies on being classified MANAGEMENT. Ten other
// entries had no shadowing sibling in the route tree today, but any route added
// later under a dynamic segment adjacent to one of them would inherit the same
// bypass silently.
//
// So: PREFIXES are genuine subtrees and MUST end in "/" (asserted by
// tests/unit/authz/public-route-exact-match.test.ts); single routes live in an
// EXACT set instead.

// Genuine subtrees. Every entry MUST end in "/".
const PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/",
  "/api/oauth/",
  // Public, ticket-gated Codex device-flow completion (validate + persist).
  // The handler enforces its own single-use ticket check; no dashboard auth.
  "/api/codex/connect/",
  // Telegram Bot API update webhook + Mini App proxy. Telegram POSTs updates
  // here without any dashboard cookie/API key; the handler enforces its own
  // auth (503 when TELEGRAM_BOT_TOKEN is unset; 401 on invalid initData
  // HMAC). See src/app/api/telegram/update/route.ts. Do not widen.
  "/api/telegram/",
  // Cursor CLI passthrough (CURSOR_API_ENDPOINT -> OmniRoute -> api2.cursor.sh).
  // The handler enforces its own auth: /auth/exchange_user_api_key requires an
  // OmniRoute API key (validateApiKey); every other path requires the
  // OmniRoute-minted session JWT that exchange returns. See
  // open-sse/handlers/cursorCliProxy.ts. Do not widen.
  "/api/cursor-cli/",
];

// Single routes, public by EXACT path (both spellings) — never by prefix.
const PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  // Remote-mode bootstrap: exchange the management password for a scoped CLI
  // access token. The handler enforces its own password check + lockout — there
  // is no token yet at this point, so it cannot require management auth.
  "/api/cli/connect",
  // Terminal-friendly @@om-usage equivalent for CLI clients (Claude Code/Codex).
  // The handler enforces its own auth via extractUsageCommandApiKey/isValidApiKey
  // and the allowUsageCommand flag — it must not be gated by management auth.
  // EXACT: the sibling `/api/usage/[connectionId]` has no auth of its own.
  "/api/usage/om-usage",
  // Chaos Mode external dispatch endpoint (POST /api/skills/collect/chaos).
  // This entry only bypasses the dashboard requireLogin (cookie) gate — the
  // handler enforces its own Bearer-token auth (validateApiKey +
  // chaosModeEnabled check) before doing any work. See src/app/api/skills/
  // collect/chaos/route.ts. Do not widen it to other /api/skills/collect/*
  // routes without the same per-handler auth.
  "/api/skills/collect/chaos",
]);

// Read-only single routes that ALSO take the CORS origin relaxation: they
// classify as `public_readonly_prefix`, which authz/pipeline.ts keys on.
const PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Read-only routes public by EXACT path, WITHOUT the CORS relaxation.
//
// `/api/health` has to be reachable without a key — a probe has none, and a 401 there is
// indistinguishable from a wrong key or a missing route. It stays in its own set (rather than
// joining PUBLIC_READONLY_CORS_API_ROUTES) so it keeps classifying as `public_prefix`: moving it
// would silently widen CORS on it.
const PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

const PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

const PUBLIC_CLOUD_API_ROUTES = [
  { path: "/api/cloud/auth", methods: new Set(["POST", "OPTIONS"]) },
  { path: "/api/cloud/model/resolve", methods: new Set(["POST", "OPTIONS"]) },
  { path: "/api/cloud/models/alias", methods: new Set(["GET", "HEAD", "OPTIONS"]) },
];

function pathMatchesExactRoute(pathname: string, routePath: string): boolean {
  return pathname === routePath || pathname === `${routePath}/`;
}

function matchesAnyExactRoute(pathname: string, routes: Iterable<string>): boolean {
  for (const route of routes) {
    if (pathMatchesExactRoute(pathname, route)) return true;
  }
  return false;
}

function isPublicCloudApiRoute(pathname: string, method: string): boolean {
  const normalizedMethod = String(method).toUpperCase();
  return PUBLIC_CLOUD_API_ROUTES.some(
    ({ path, methods }) => pathMatchesExactRoute(pathname, path) && methods.has(normalizedMethod)
  );
}

// OAuth "auto-import" routes read host-local credential files (Cursor / Kiro
// tokens). The broad `/api/oauth/` PUBLIC prefix would classify them
// PUBLIC, which skips the LOCAL_ONLY tier entirely (GHSA-wgwc-crjm-pmwv) and
// exposes the host credential to a remote caller (GHSA-gxv4-955v-v6cm). Exclude
// them so they fall through to MANAGEMENT and reach the loopback-only gate.
const LOCAL_ONLY_OAUTH_IMPORT_ROUTES = [
  "/api/oauth/cursor/auto-import",
  "/api/oauth/kiro/auto-import",
];

/**
 * Whether the route classifies as read-only PUBLIC *with* the CORS origin
 * relaxation (authz/classify.ts reason `public_readonly_prefix`). Exported as a
 * predicate rather than as the raw list so a caller cannot reintroduce the
 * prefix match this file exists to prevent.
 */
export function isPublicReadonlyCorsRoute(pathname: string, method = "GET"): boolean {
  if (!PUBLIC_READONLY_METHODS.has(String(method).toUpperCase())) return false;
  return matchesAnyExactRoute(pathname, PUBLIC_READONLY_CORS_API_ROUTES);
}

export function isPublicApiRoute(pathname: string, method = "GET"): boolean {
  if (
    LOCAL_ONLY_OAUTH_IMPORT_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )
  ) {
    return false;
  }

  if (isPublicCloudApiRoute(pathname, method)) {
    return true;
  }

  if (matchesAnyExactRoute(pathname, PUBLIC_API_ROUTES_EXACT)) {
    return true;
  }

  if (PUBLIC_API_ROUTE_PREFIXES.some((route) => pathname.startsWith(route))) {
    return true;
  }

  if (!PUBLIC_READONLY_METHODS.has(String(method).toUpperCase())) {
    return false;
  }

  if (matchesAnyExactRoute(pathname, PUBLIC_READONLY_API_ROUTES_EXACT)) {
    return true;
  }

  return isPublicReadonlyCorsRoute(pathname, method);
}

export {
  PUBLIC_API_ROUTE_PREFIXES,
  PUBLIC_API_ROUTES_EXACT,
  PUBLIC_READONLY_CORS_API_ROUTES,
  PUBLIC_READONLY_API_ROUTES_EXACT,
  PUBLIC_READONLY_METHODS,
};
