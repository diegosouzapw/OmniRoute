import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getPendingRequestDetails } from "@/lib/usageDb";
import { getProviderConnections } from "@/lib/localDb";
import { getAccountDisplayName } from "@/lib/display/names";

export const dynamic = "force-dynamic";

type ConnectionLookup = {
  id?: string | null;
  name?: string | null;
  displayName?: string | null;
  email?: string | null;
};

export async function GET(request: Request) {
  try {
    const authError = await requireManagementAuth(request);
    if (authError) return authError;

    const activeRequests = getPendingRequestDetails();
    if (activeRequests.length === 0) {
      return NextResponse.json({ activeRequests: [] });
    }

    const connections = (await getProviderConnections().catch(() => [])) as ConnectionLookup[];
    const connectionMap = new Map<string, ConnectionLookup>();
    for (const connection of connections) {
      if (typeof connection?.id === "string" && connection.id.trim().length > 0) {
        connectionMap.set(connection.id, connection);
      }
    }

    const now = Date.now();
    return NextResponse.json({
      activeRequests: activeRequests.map((detail) => {
        const connection =
          detail.connectionId && connectionMap.has(detail.connectionId)
            ? connectionMap.get(detail.connectionId)
            : null;

        return {
          model: detail.model,
          provider: detail.provider,
          account: detail.connectionId
            ? getAccountDisplayName(connection || { id: detail.connectionId })
            : "-",
          connectionId: detail.connectionId,
          count: detail.count,
          startedAt: detail.startedAt,
          runningTimeMs: Math.max(0, now - detail.startedAt),
          requestBody: detail.requestBody ?? null,
          apiKeyId: detail.apiKeyId || null,
          apiKeyName: detail.apiKeyName || null,
        };
      }),
    });
  } catch (error) {
    console.error("[API ERROR] /api/logs/active failed:", error);
    return NextResponse.json({ error: "Failed to fetch active requests" }, { status: 500 });
  }
}
