import { NextResponse } from "next/server";
import { getProviderConnections, updateProviderConnection } from "@/lib/localDb";
import {
  enableRateLimitProtection,
  disableRateLimitProtection,
  getRateLimitStatus,
  getAllRateLimitStatus,
} from "@omniroute/open-sse/services/rateLimitManager.js";

/**
 * GET /api/rate-limit — Get rate limit status for all connections
 */
export async function GET() {
  try {
    const connections = await getProviderConnections();
    const statuses = connections.map((conn) => ({
      connectionId: conn.id,
      provider: conn.provider,
      name: conn.name || conn.email || conn.id.slice(0, 8),
      rateLimitProtection: !!conn.rateLimitProtection,
      ...getRateLimitStatus(conn.provider, conn.id),
    }));

    return NextResponse.json({
      connections: statuses,
      overview: getAllRateLimitStatus(),
    });
  } catch (error) {
    console.error("[API ERROR] /api/rate-limit GET:", error);
    return NextResponse.json({ error: "Failed to get rate limit status" }, { status: 500 });
  }
}

/**
 * POST /api/rate-limit — Toggle rate limit protection for a connection
 * Body: { connectionId: string, enabled: boolean }
 */
export async function POST(request) {
  try {
    const { connectionId, enabled } = await request.json();

    if (!connectionId) {
      return NextResponse.json({ error: "Missing connectionId" }, { status: 400 });
    }

    // Update in-memory state
    if (enabled) {
      enableRateLimitProtection(connectionId);
    } else {
      disableRateLimitProtection(connectionId);
    }

    // Persist to database
    await updateProviderConnection(connectionId, {
      rateLimitProtection: !!enabled,
    });

    return NextResponse.json({ success: true, connectionId, enabled: !!enabled });
  } catch (error) {
    console.error("[API ERROR] /api/rate-limit POST:", error);
    return NextResponse.json({ error: "Failed to toggle rate limit" }, { status: 500 });
  }
}
