/**
 * Discovery results — GET /api/discovery/results
 *
 * Lists persisted discovery findings, optionally filtered by `?providerId=`.
 *
 * Auth: Tier 3 MANAGEMENT (requireManagementAuth) + strict local-only. The
 * `/api/discovery/` prefix is in `LOCAL_ONLY_API_PREFIXES` (routeGuard.ts), so
 * the central authz pipeline (src/proxy.ts → runAuthzPipeline → managementPolicy)
 * blocks non-loopback callers with a 403 LOCAL_ONLY before this handler runs.
 * It is NOT in the manage-scope bypass list — strict loopback, no remote bypass.
 */

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { getDiscoveryResults } from "@/lib/db/discoveryResults";

export async function GET(request: Request): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const providerId = url.searchParams.get("providerId") || undefined;
    const results = getDiscoveryResults(providerId);
    return Response.json({ results });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to list discovery results");
  }
}
