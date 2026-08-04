/**
 * Route-level authentication guard for CLIENT_API (`/api/v1/*`) handlers.
 *
 * Defence-in-depth companion to `clientApiPolicy`
 * (src/server/authz/policies/clientApi.ts), which already fronts these routes
 * through `src/proxy.ts`. The handler-level check must never be *stricter*
 * than the middleware, otherwise callers the pipeline admits get a 401 from
 * the route instead:
 *
 *  - a presented key must be valid, but is only rejected while
 *    `REQUIRE_API_KEY=true`; with enforcement off a stale CLI key degrades to
 *    anonymous instead of failing the whole request (#2257);
 *  - a cookie-authenticated dashboard session is accepted in place of a key —
 *    the dashboard Media page and Playground call these routes with a session
 *    only (same fix as the preset auth mismatch in
 *    `src/app/api/playground/presets/route.ts`);
 *  - anonymous traffic stays allowed while `REQUIRE_API_KEY=false`.
 *
 * @module shared/utils/clientApiRouteAuth
 */

import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";
import { isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";

/**
 * Authenticate a client-API request at the route level.
 *
 * @param request - The incoming request.
 * @returns A 401 `Response` the handler must return, or `null` when the
 *          request may proceed to policy enforcement.
 */
export async function enforceClientApiRouteAuth(request: Request): Promise<Response | null> {
  const apiKeyRaw = extractApiKey(request);

  if (apiKeyRaw) {
    if (await isValidApiKey(apiKeyRaw)) return null;
    return isRequireApiKeyEnabled()
      ? errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key")
      : null;
  }

  if (await isDashboardSessionAuthenticated(request)) return null;

  return isRequireApiKeyEnabled()
    ? errorResponse(HTTP_STATUS.UNAUTHORIZED, "Authentication required")
    : null;
}
