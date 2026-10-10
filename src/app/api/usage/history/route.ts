import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getUsageStats, buildActiveRequests } from "@/lib/usageDb";
import { serveAnalyticsCached } from "@/lib/usage/analyticsResponseCache";
import { getPendingRequests } from "@/lib/usage/usageHistory";
import { getAccountDisplayName } from "@/lib/display/names";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const cached = await serveAnalyticsCached("history", async () => {
    try {
      const stats = await getUsageStats();
      return NextResponse.json(stats);
    } catch (error) {
      console.error("Error fetching usage stats:", error);
      return NextResponse.json({ error: "Failed to fetch usage stats" }, { status: 500 });
    }
  });

  return withFreshPendingOverlay(cached);
}

async function withFreshPendingOverlay(response: Response): Promise<Response> {
  if (response.status !== 200) return response;
  if (response.headers.get("x-analytics-cache") !== "hit") return response;

  let payload: Record<string, unknown>;
  try {
    payload = (await response.clone().json()) as Record<string, unknown>;
  } catch {
    return response;
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return response;

  const pendingRequests = getPendingRequests();
  payload.pending = {
    byModel: pendingRequests.byModel,
    byAccount: pendingRequests.byAccount,
  };
  payload.activeRequests = buildActiveRequestsFromPending(pendingRequests.byAccount);

  return new Response(JSON.stringify(payload), {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") || "application/json",
      "cache-control": response.headers.get("cache-control") || "private, no-store",
      "x-analytics-cache": response.headers.get("x-analytics-cache") || "miss",
    },
  });
}

function buildActiveRequestsFromPending(
  pendingByAccount: Record<string, Record<string, number>>
): Array<{ model: string; provider: string; account: string; count: number }> {
  return buildActiveRequests(pendingByAccount, {}, (id) => getAccountDisplayName({ id }));
}
