/**
 * Management API key scopes — the set of API key scopes that authorize a
 * Bearer key on management routes (`/api/*` excluding `/api/v1/*` and the
 * public allowlist).
 *
 * Single source of truth shared by:
 *   - `src/lib/api/requireManagementAuth.ts` (`hasManageScope`)
 *   - `src/shared/utils/apiAuth.ts` (`validateBearerApiKeyForManagement`)
 *
 * Keep both helpers in sync by importing `MANAGEMENT_API_KEY_SCOPES` from
 * here — never re-declare the list inline.
 */

/** Canonical scope name granted to the default environment key. */
export const MANAGE_SCOPE = "manage";

/**
 * Set of scopes that grant access to management API routes.
 * `admin` is treated as a superset of `manage`.
 */
export const MANAGEMENT_API_KEY_SCOPES = new Set<string>(["manage", "admin"]);

/**
 * Narrow, additive scope (#7895) that grants a non-loopback caller ONLY the
 * `/api/mcp/` LOCAL_ONLY carve-out (see `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`
 * in `src/server/authz/routeGuard.ts`) — it does NOT grant broader management
 * API access. Deliberately kept OUT of `MANAGEMENT_API_KEY_SCOPES`, mirroring the
 * existing narrow-additive-scope precedent (`SELF_USAGE_SCOPE`,
 * `API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE`). A key holding `manage`/`admin` still
 * passes the carve-out unchanged; `mcp:connect` is an alternative, lower-privilege
 * path for remote MCP-only callers.
 */
export const MCP_CONNECT_SCOPE = "mcp:connect";

/**
 * Check whether any of the given scopes authorizes the `/api/mcp/` LOCAL_ONLY
 * carve-out specifically — i.e. either a full management scope (`manage`/`admin`)
 * or the narrow `mcp:connect` scope. Use this ONLY for the `/api/mcp/` bypass
 * check; every other management route must keep using `hasManageScope`.
 */
export function hasMcpConnectOrManageScope(scopes: readonly string[] = []): boolean {
  if (hasManageScope(scopes)) return true;
  return scopes.includes(MCP_CONNECT_SCOPE);
}

/**
 * Check whether any of the given scopes authorizes management API access.
 */
export function hasManageScope(scopes: readonly string[] = []): boolean {
  for (const scope of scopes) {
    if (MANAGEMENT_API_KEY_SCOPES.has(scope)) return true;
  }
  return false;
}
