import { NextResponse } from "next/server";
import { getUsageDb } from "@/lib/usageDb";
import { computeAnalytics } from "@/lib/usageAnalytics";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30d";

    const db = await getUsageDb();
    const history = db.data.history || [];

    // Build connection map (connectionId → display name) and provider name map (provider → label)
    // Fix #356: providerNameMap resolves internal provider IDs to human-readable labels
    const { getProviderConnections } = await import("@/lib/localDb");
    const connectionMap: Record<string, string> = {};
    const providerNameMap: Record<string, string> = {};
    try {
      const connections = await getProviderConnections();
      for (const connRaw of connections as unknown[]) {
        const conn =
          connRaw && typeof connRaw === "object" && !Array.isArray(connRaw)
            ? (connRaw as Record<string, unknown>)
            : {};
        const connectionId =
          typeof conn.id === "string" && conn.id.trim().length > 0 ? conn.id : null;
        if (!connectionId) continue;

        const name =
          (typeof conn.name === "string" && conn.name.trim()) ||
          (typeof conn.email === "string" && conn.email.trim()) ||
          connectionId;
        connectionMap[connectionId] = name;

        // Map provider internal ID → display name (for Analytics charts)
        const providerId = typeof conn.provider === "string" ? conn.provider : null;
        if (providerId && !providerNameMap[providerId]) {
          const providerLabel =
            (typeof conn.providerLabel === "string" && conn.providerLabel.trim()) ||
            (typeof conn.providerName === "string" && conn.providerName.trim()) ||
            providerId;
          providerNameMap[providerId] = providerLabel;
        }
      }
    } catch {
      /* ignore */
    }

    const analytics = await computeAnalytics(history, range, connectionMap, providerNameMap);

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error computing analytics:", error);
    return NextResponse.json({ error: "Failed to compute analytics" }, { status: 500 });
  }
}
