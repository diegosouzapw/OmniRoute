import { NextResponse } from "next/server";
import { buildTelemetryPayload } from "@/lib/monitoring/observability";
import { getTelemetrySummary } from "@/shared/utils/requestTelemetry";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const windowMs = parseInt(searchParams.get("windowMs") || "300000", 10);
    const summary = getTelemetrySummary(windowMs);
    const { getQuotaMonitorSummary } = await import("@omniroute/open-sse/services/quotaMonitor.ts");
    const { getActiveSessions } = await import("@omniroute/open-sse/services/sessionManager.ts");
    const quotaMonitorSummary = getQuotaMonitorSummary();
    const activeSessions = getActiveSessions();
    const payload = buildTelemetryPayload({
      summary,
      quotaMonitorSummary,
      activeSessions,
    });
    const totalRequests = payload.totalRequests || 0;
    return NextResponse.json({
      ...payload,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      activeConnections: activeSessions.length,
      errorRate:
        totalRequests > 0 ? (quotaMonitorSummary.errors / Math.max(totalRequests, 1)) * 100 : 0,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
