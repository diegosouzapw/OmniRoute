import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { syncSubscription } from "@/lib/proxySubscription";

type RouteCtx = { params: Promise<{ id: string }> };

/**
 * POST /api/v1/management/proxy-subscriptions/:id/refresh — re-fetch + re-parse
 * the subscription, sync its nodes into proxy_registry, and (re)bind the pool.
 * Returns the SyncResult (node counts, bound count, status, warning).
 */
export async function POST(request: Request, ctx: RouteCtx) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { id } = await ctx.params;
    const result = await syncSubscription(id);
    return Response.json(result);
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to refresh proxy subscription");
  }
}
