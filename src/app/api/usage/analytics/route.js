import { NextResponse } from "next/server";
import { getUsageDb } from "@/lib/usageDb.js";
import { computeAnalytics } from "@/lib/usageAnalytics.js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30d";

    const db = await getUsageDb();
    const history = db.data.history || [];

    // Build connection map for account names
    const { getProviderConnections } = await import("@/lib/localDb.js");
    let connectionMap = {};
    try {
      const connections = await getProviderConnections();
      for (const conn of connections) {
        connectionMap[conn.id] = conn.name || conn.email || conn.id;
      }
    } catch {
      /* ignore */
    }

    const analytics = await computeAnalytics(history, range, connectionMap);

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error computing analytics:", error);
    return NextResponse.json({ error: "Failed to compute analytics" }, { status: 500 });
  }
}
