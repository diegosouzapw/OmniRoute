import { fetchAndPersistProviderLimits } from "@/lib/usage/providerLimits";

/**
 * GET /api/usage/[connectionId] - Get live usage data for a specific connection
 * and persist the refreshed Provider Limits cache.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ connectionId: string }> }
) {
  try {
    const { connectionId } = await params;
    const { usage } = await fetchAndPersistProviderLimits(connectionId, "manual");
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
