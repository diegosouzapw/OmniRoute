import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import {
  listSubscriptions,
  createSubscription,
  startSubscriptionScheduler,
  redactSubscriptionUrl,
  type ProxySubscriptionPayload,
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

function parsePayload(body: unknown): ProxySubscriptionPayload | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid JSON body" };
  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const url = typeof b.url === "string" ? b.url.trim() : "";
  if (!name) return { error: "name is required" };
  if (!url) return { error: "url is required" };

  const mode = b.mode === "rule" ? "rule" : "global";
  let ruleProviders: string[] | null = null;
  if (Array.isArray(b.ruleProviders)) {
    ruleProviders = b.ruleProviders.filter((x) => typeof x === "string");
  }
  if (mode === "rule" && (!ruleProviders || ruleProviders.length === 0)) {
    return { error: "ruleProviders is required when mode is 'rule'" };
  }

  const localCoreEndpoint =
    typeof b.localCoreEndpoint === "string" && b.localCoreEndpoint.trim()
      ? b.localCoreEndpoint.trim()
      : null;
  const updateIntervalMinutes = Number(b.updateIntervalMinutes) || 60;
  const enabled = b.enabled === true;

  return {
    name,
    url,
    mode,
    ruleProviders,
    localCoreEndpoint,
    updateIntervalMinutes,
    enabled,
  };
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const body = await request.json().catch(() => null);
    const parsed = parsePayload(body);
    if ("error" in parsed) {
      return Response.json({ error: parsed.error }, { status: 400 });
    }
    const created = await createSubscription(parsed);
    return Response.json({ ...created, url: redactSubscriptionUrl(created.url) }, { status: 201 });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to create proxy subscription");
  }
}
