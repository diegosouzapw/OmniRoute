import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import {
  listSubscriptions,
  createSubscription,
  startSubscriptionScheduler,
  redactSubscriptionUrl,
  proxySubscriptionCreateSchema,
  firstIssueMessage,
} from "@/lib/proxySubscription";

/**
 * GET  /api/v1/management/proxy-subscriptions — list all operator subscriptions.
 * POST /api/v1/management/proxy-subscriptions — create a subscription.
 *
 * A subscription is an operator-supplied proxy link (Karing-style). On create
 * (and whenever enabled), its nodes are fetched + synced into proxy_registry
 * and bound through the existing account/provider/global scope resolution.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    // Best-effort: once the operator opens the UI, ensure the auto-refresh
    // ticker is running (idempotent; no-op in test env).
    startSubscriptionScheduler();
    const items = await listSubscriptions();
    // Redact credentials in the subscription URL before sending to the client.
    const safe = items.map((it) => ({ ...it, url: redactSubscriptionUrl(it.url) }));
    return Response.json({ items: safe });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to list proxy subscriptions");
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const body = await request.json().catch(() => null);
    const parsed = proxySubscriptionCreateSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: firstIssueMessage(parsed.error) }, { status: 400 });
    }
    const created = await createSubscription(parsed.data);
    return Response.json({ ...created, url: redactSubscriptionUrl(created.url) }, { status: 201 });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to create proxy subscription");
  }
}
