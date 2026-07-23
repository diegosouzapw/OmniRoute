import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import {
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  redactSubscriptionUrl,
  type ProxySubscriptionPayload,
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
    if (!body || typeof body !== "object") {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const b = body as Record<string, unknown>;
    const payload: Partial<ProxySubscriptionPayload> = {};
    if (typeof b.name === "string") payload.name = b.name.trim();
    if (typeof b.url === "string") payload.url = b.url.trim();
    if (typeof b.mode === "string") payload.mode = b.mode === "rule" ? "rule" : "global";
    if (typeof b.enabled === "boolean") payload.enabled = b.enabled;
    if (typeof b.localCoreEndpoint === "string") {
      payload.localCoreEndpoint = b.localCoreEndpoint.trim() || null;
    }
    if (typeof b.updateIntervalMinutes === "number") {
      payload.updateIntervalMinutes = b.updateIntervalMinutes;
    }
    if (Array.isArray(b.ruleProviders)) {
      payload.ruleProviders = b.ruleProviders.filter((x) => typeof x === "string");
    }

    const updated = await updateSubscription(id, payload);
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
