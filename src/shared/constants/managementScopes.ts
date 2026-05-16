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
 * Check whether any of the given scopes authorizes management API access.
 */
export function hasManageScope(scopes: readonly string[] = []): boolean {
  for (const scope of scopes) {
    if (MANAGEMENT_API_KEY_SCOPES.has(scope)) return true;
  }
  return false;
}
