import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getProviderConnections } from "@/lib/localDb";
import { getPendingRequests, clearPendingRequests } from "@/lib/usage/usageHistory";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const pending = getPendingRequests();
    const connections = await getProviderConnections();
    const connectionNames = new Map(
      connections.map((connection: any) => [
        connection.id,
        connection.displayName || connection.name || connection.email || connection.id,
      ])
    );

    const now = Date.now();
    const activeRequests = Object.entries(pending.details || {})
      .flatMap(([connectionId, models]) =>
        Object.entries(models).map(([modelKey, detail]) => ({
          modelKey,
          model: detail.model,
          provider: detail.provider,
          connectionId,
          account:
            connectionNames.get(connectionId) || detail.connectionId || connectionId || "unknown",
          startedAt: detail.startedAt,
          runningTimeMs: Math.max(0, now - detail.startedAt),
          count: pending.byAccount?.[connectionId]?.[modelKey] || 0,
          clientEndpoint: detail.clientEndpoint || null,
          clientRequest: detail.clientRequest ?? null,
          providerRequest: detail.providerRequest ?? null,
          providerUrl: detail.providerUrl || null,
        }))
      )
      .filter((requestRow) => requestRow.count > 0)
      .sort((a, b) => a.startedAt - b.startedAt);

    return NextResponse.json({ activeRequests, count: activeRequests.length });
  } catch (error) {
    console.log("Error loading active requests:", error);
    return NextResponse.json({ error: "Failed to load active requests" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  clearPendingRequests();
  return NextResponse.json({ success: true, message: "Pending request counts cleared" });
}
