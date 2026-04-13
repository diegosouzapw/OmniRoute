/**
 * Public API routes that are accessible without authentication.
 * This module is intentionally Edge-runtime safe — no next/headers or DB imports.
 * Used by both src/middleware.ts (Edge) and src/shared/utils/apiAuth.ts (Node).
 */

/**
 * Routes always accessible without authentication.
 * Rules:
 *   - Entries ending with "/" use prefix matching (e.g. "/api/v1/" matches all sub-routes)
 *   - All other entries use exact matching to prevent unintentional bypass
 *     (e.g. "/api/init" does NOT match "/api/init-anything")
 */
export const PUBLIC_API_ROUTES = [
  // Auth flow — must be accessible to unauthenticated users
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",

  // Settings check — used by login page / onboarding
  "/api/settings/require-login",

  // Init — first-run setup (exact match only)
  "/api/init",

  // Health monitoring — probes must work without auth
  "/api/monitoring/health",

  // LLM proxy routes — use their own API key auth in the SSE layer (prefix)
  "/api/v1/",

  // Cloud routes — use Bearer API key auth internally (prefix)
  "/api/cloud/",

  // OAuth callback routes — provider redirects back here (prefix)
  "/api/oauth/",
] as const;

/**
 * Returns true if the pathname should bypass global auth middleware.
 * Uses exact matching for leaf routes, prefix matching for routes ending with "/".
 */
export function isPublicApiRoute(pathname: string): boolean {
  return PUBLIC_API_ROUTES.some((route) =>
    route.endsWith("/") ? pathname.startsWith(route) : pathname === route
  );
}
