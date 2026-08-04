import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { getSubscriptionById } from "@/lib/proxySubscription";

type RouteCtx = { params: Promise<{ id: string }> };

/**
 * GET /api/v1/management/proxy-subscriptions/:id/nodes — return the last-parsed
 * node summary for display without re-fetching the (possibly slow) subscription.
 */
export async function GET(request: Request, ctx: RouteCtx) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { id } = await ctx.params;
    const sub = await getSubscriptionById(id);
    if (!sub) return Response.json({ error: "Subscription not found" }, { status: 404 });
    return Response.json({
      id: sub.id,
      name: sub.name,
      mode: sub.mode,
      enabled: sub.enabled,
      status: sub.status,
      error: sub.error,
      lastFetchedAt: sub.lastFetchedAt,
      nodes: sub.lastNodes ?? [],
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load proxy subscription nodes");
  }
}
