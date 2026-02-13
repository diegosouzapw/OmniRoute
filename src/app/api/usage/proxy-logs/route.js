import { getProxyLogs, clearProxyLogs, getProxyLogStats } from "@/lib/proxyLogger";

/**
 * GET /api/usage/proxy-logs — get proxy usage logs
 * Query params: ?status=ok|error|timeout&type=http|socks5&provider=xxx&level=global|provider|combo|key&search=xxx&limit=300
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const filters = {};
    if (searchParams.get("status")) filters.status = searchParams.get("status");
    if (searchParams.get("type")) filters.type = searchParams.get("type");
    if (searchParams.get("provider")) filters.provider = searchParams.get("provider");
    if (searchParams.get("level")) filters.level = searchParams.get("level");
    if (searchParams.get("search")) filters.search = searchParams.get("search");
    if (searchParams.get("limit")) filters.limit = parseInt(searchParams.get("limit"), 10);

    const logs = getProxyLogs(filters);
    return Response.json(logs);
  } catch (error) {
    return Response.json(
      { error: { message: error.message, type: "server_error" } },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/usage/proxy-logs — clear all proxy logs
 */
export async function DELETE() {
  try {
    clearProxyLogs();
    return Response.json({ cleared: true });
  } catch (error) {
    return Response.json(
      { error: { message: error.message, type: "server_error" } },
      { status: 500 }
    );
  }
}
