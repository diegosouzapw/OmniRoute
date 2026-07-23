const PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/oidc/",
  "/api/init",
  "/api/v1/",
  "/api/sync/bundle",
  "/api/oauth/",
  // Public, ticket-gated Codex device-flow completion (validate + persist).
  // The handler enforces its own single-use ticket check; no dashboard auth.
  "/api/codex/connect/",
  // Remote-mode bootstrap: exchange the management password for a scoped CLI
  // access token. The handler enforces its own password check + lockout — there
  // is no token yet at this point, so it cannot require management auth.
  "/api/cli/connect",
  // Terminal-friendly @@om-usage equivalent for CLI clients (Claude Code/Codex).
  // The handler enforces its own auth via extractUsageCommandApiKey/isValidApiKey
  // and the allowUsageCommand flag — it must not be gated by management auth.
  "/api/usage/om-usage",
  // Chaos Mode external dispatch endpoint (POST /api/skills/collect/chaos).
  // This entry only bypasses the dashboard requireLogin (cookie) gate — the
  // handler enforces its own Bearer-token auth (validateApiKey +
  // chaosModeEnabled check) before doing any work. See src/app/api/skills/
  // collect/chaos/route.ts. Do not widen this prefix to cover other
  // /api/skills/collect/* routes without the same per-handler auth.
  "/api/skills/collect/chaos",
];

const PUBLIC_READONLY_API_ROUTE_PREFIXES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

const PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

const PUBLIC_CLOUD_API_ROUTES = [
  { path: "/api/cloud/auth", methods: new Set(["POST", "OPTIONS"]) },
  { path: "/api/cloud/model/resolve", methods: new Set(["POST", "OPTIONS"]) },
  { path: "/api/cloud/models/alias", methods: new Set(["GET", "HEAD", "OPTIONS"]) },
];

function pathMatchesExactRoute(pathname: string, routePath: string): boolean {
  return pathname === routePath || pathname === `${routePath}/`;
}

function isPublicCloudApiRoute(pathname: string, method: string): boolean {
  const normalizedMethod = String(method).toUpperCase();
  return PUBLIC_CLOUD_API_ROUTES.some(
    ({ path, methods }) => pathMatchesExactRoute(pathname, path) && methods.has(normalizedMethod)
  );
}

export function isPublicApiRoute(pathname: string, method = "GET"): boolean {
  if (isPublicCloudApiRoute(pathname, method)) {
    return true;
  }

  if (PUBLIC_API_ROUTE_PREFIXES.some((route) => pathname.startsWith(route))) {
    return true;
  }

  if (!PUBLIC_READONLY_METHODS.has(String(method).toUpperCase())) {
    return false;
  }

  return PUBLIC_READONLY_API_ROUTE_PREFIXES.some((route) => pathname.startsWith(route));
}

export { PUBLIC_API_ROUTE_PREFIXES, PUBLIC_READONLY_API_ROUTE_PREFIXES, PUBLIC_READONLY_METHODS };
