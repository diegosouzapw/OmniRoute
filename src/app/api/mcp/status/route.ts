import { NextResponse } from "next/server";
import { getAuditStats, queryAuditEntries } from "@omniroute/open-sse/mcp-server/audit";
import {
  isMcpHeartbeatOnline,
  isProcessAlive,
  readMcpHeartbeat,
  resolveMcpHeartbeatPath,
} from "@omniroute/open-sse/mcp-server/runtimeHeartbeat";
import {
  getMcpHttpStatus,
  isMcpHttpTransportReady,
} from "../../../../../open-sse/mcp-server/httpTransport";
import { getSettings } from "@/lib/db/settings";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const [heartbeat, stats, lastCallPage, settings] = await Promise.all([
      readMcpHeartbeat(),
      getAuditStats(),
      queryAuditEntries({ limit: 1, offset: 0 }),
      getSettings(),
    ]);

    const mcpEnabled = !!settings.mcpEnabled;
    const mcpTransport = (settings.mcpTransport as string) || "stdio";

    // Check HTTP transport active-session state separately from endpoint readiness.
    const httpStatus = getMcpHttpStatus();

    // stdio uses an external process heartbeat. HTTP transports are in-process and lazy-start
    // on first request, so an enabled HTTP endpoint is online even before any session exists.
    const stdioOnline = isMcpHeartbeatOnline(heartbeat, { requireLivePid: true });
    const online =
      mcpTransport === "stdio"
        ? mcpEnabled && stdioOnline
        : isMcpHttpTransportReady(mcpEnabled, mcpTransport);

    const scopesEnforced = process.env.OMNIROUTE_MCP_ENFORCE_SCOPES === "true";

    const lastCall = lastCallPage.entries[0] || null;
    const now = Date.now();
    const lastHeartbeatAtMs = heartbeat ? new Date(heartbeat.lastHeartbeatAt).getTime() : null;
    const startedAtMs = heartbeat ? new Date(heartbeat.startedAt).getTime() : null;
    const heartbeatAgeMs =
      typeof lastHeartbeatAtMs === "number" && Number.isFinite(lastHeartbeatAtMs)
        ? Math.max(0, now - lastHeartbeatAtMs)
        : null;
    const uptimeMs =
      typeof startedAtMs === "number" && Number.isFinite(startedAtMs)
        ? Math.max(0, now - startedAtMs)
        : null;

    return NextResponse.json({
      status: online ? "online" : "offline",
      online,
      enabled: mcpEnabled,
      transport: mcpTransport,
      scopesEnforced,
      heartbeatPath: resolveMcpHeartbeatPath(),
      heartbeat: heartbeat
        ? {
            ...heartbeat,
            pidAlive: isProcessAlive(heartbeat.pid),
            heartbeatAgeMs,
            uptimeMs,
          }
        : null,
      httpTransport: httpStatus,
      activity: {
        totalCalls24h: stats.totalCalls,
        successRate: stats.successRate,
        avgDurationMs: stats.avgDurationMs,
        topTools: stats.topTools,
        lastCallAt: lastCall?.createdAt || null,
        lastCallTool: lastCall?.toolName || null,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load MCP status";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
