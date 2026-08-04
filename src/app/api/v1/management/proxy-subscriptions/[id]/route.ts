import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import {
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  redactSubscriptionUrl,
  proxySubscriptionUpdateSchema,
  firstIssueMessage,
} from "@/lib/proxySubscription";

type RouteCtx = { params: Promise<{ id: string }> };

/**
 * GET    /api/v1/management/proxy-subscriptions/:id — fetch one subscription.
 * PATCH  /api/v1/management/proxy-subscriptions/:id — update (name/url/mode/
 *        ruleProviders/localCoreEndpoint/updateIntervalMinutes/enabled).
 * DELETE /api/v1/management/proxy-subscriptions/:id — remove (unbinds + drops
 *        the synced proxy rows).
 */
export async function GET(_request: Request, ctx: RouteCtx) {
  const authError = await requireManagementAuth(_request);
  if (authError) return authError;
  try {
    const { id } = await ctx.params;
    const sub = await getSubscriptionById(id);
    if (!sub) return Response.json({ error: "Subscription not found" }, { status: 404 });
    return Response.json({ ...sub, url: redactSubscriptionUrl(sub.url) });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load proxy subscription");
  }
}

export async function PATCH(request: Request, ctx: RouteCtx) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { id } = await ctx.params;
    const body = await request.json().catch(() => null);
    const parsed = proxySubscriptionUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: firstIssueMessage(parsed.error) }, { status: 400 });
    }

    const updated = await updateSubscription(id, parsed.data);
    if (!updated) return Response.json({ error: "Subscription not found" }, { status: 404 });
    return Response.json({ ...updated, url: redactSubscriptionUrl(updated.url) });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to update proxy subscription");
  }
}

export async function DELETE(request: Request, ctx: RouteCtx) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { id } = await ctx.params;
    const ok = await deleteSubscription(id);
    if (!ok) return Response.json({ error: "Subscription not found" }, { status: 404 });
    return Response.json({ deleted: true });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to delete proxy subscription");
  }
}
