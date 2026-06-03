import { fetchAndPersistProviderLimits } from "@/lib/usage/providerLimits";

/**
 * GET /api/usage/[connectionId] - Get live usage data for a specific connection
 * and persist the refreshed Provider Limits cache.
 *
 * This is the on-demand, per-connection path (the dashboard quota page fetches
 * only the connections it shows through here, not all of them at once). It opts
 * into refreshing rotating-refresh providers (Codex/OpenAI) so an account with an
 * expired access_token still surfaces live quota — made cascade-safe by
 * `serializeRefresh` (one token mint at a time per Auth0 group). The bulk
 * scheduler keeps the #3019 behaviour of never refreshing rotating providers.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ connectionId: string }> }
) {
  try {
    const { connectionId } = await params;
    const { usage } = await fetchAndPersistProviderLimits(connectionId, "manual", {
      allowRotatingRefresh: true,
    });
    return Response.json(usage);
  } catch (error) {
    const status =
      typeof (error as { status?: unknown })?.status === "number"
        ? (error as { status: number }).status
        : 500;
    const message = (error as Error)?.message || "Failed to fetch usage";
    console.error("[Usage API] Error fetching usage:", error);
    return Response.json({ error: message }, { status });
  }
}
