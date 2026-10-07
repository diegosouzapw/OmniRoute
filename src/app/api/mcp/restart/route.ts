import { NextResponse } from "next/server";
import { getMcpHttpStatus, shutdownMcpHttp } from "@omniroute/open-sse/mcp-server/httpTransport";
import { getCachedSettings } from "@/lib/db/settings";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

/**
 * POST /api/mcp/restart — resets the in-process MCP HTTP/SSE transport so the
 * next MCP request re-initializes cleanly (mirrors the lazy-start design
 * documented at the top of open-sse/mcp-server/httpTransport.ts). There is no
 * external MCP process to restart the way `/api/restart` self-restarts the
 * whole server — this only tears down active SSE/Streamable HTTP sessions.
 *
 * Fixes #13012: the CLI's `omniroute mcp restart` POSTs here but the route
 * never existed, so every call 404d.
 */
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request, { acceptMcpConnectScope: true });
  if (authError) return authError;

  const settings = await getCachedSettings();
  const mcpEnabled = !!settings.mcpEnabled;
  const mcpTransport = (settings.mcpTransport as string) || "stdio";

  if (!mcpEnabled) {
    return NextResponse.json(
      {
        error: "MCP is disabled; enable it first (`omniroute mcp enable`).",
      },
      { status: 409 }
    );
  }

  if (mcpTransport === "stdio") {
    return NextResponse.json(
      {
        error:
          "MCP restart is not supported for the stdio transport — stdio clients spawn their " +
          "own subprocess with no in-process handle to restart. Switch to sse/streamable-http " +
          "(`omniroute mcp enable --transport sse`) or restart the client instead.",
      },
      { status: 501 }
    );
  }

  shutdownMcpHttp();

  return NextResponse.json({
    status: "restarted",
    enabled: mcpEnabled,
    transport: mcpTransport,
    httpTransport: getMcpHttpStatus(),
  });
}
