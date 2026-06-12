import { exportCallLogsSince } from "@/lib/usage/callLogs";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { exportProxyLogsSince } from "@/lib/db/proxyLogs";

/**
 * GET /api/logs/export — export logs as JSON
 * Query params: ?hours=24 (1, 6, 12, 24; default 24)
 *               &type=call-logs|request-logs|proxy-logs (default call-logs)
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const hours = Math.min(Math.max(parseInt(searchParams.get("hours") || "24") || 24, 1), 168);
    const logType = searchParams.get("type") || "call-logs";

    const since = new Date(Date.now() - hours * 3600 * 1000).toISOString();

    let rows: unknown[] = [];
    let tableName = "";

    if (logType === "call-logs" || logType === "request-logs") {
      tableName = "call_logs";
      rows = await exportCallLogsSince(since);
    } else if (logType === "proxy-logs") {
      tableName = "proxy_logs";
      // NOTE: exportProxyLogsSince returns the historical `public_ip` column, NOT `clientIp`.
      // This intentionally differs from GET /api/usage/proxy-logs which exposes the
      // value as `clientIp`. Callers of this export endpoint should read `public_ip`.
      // This inconsistency will be resolved in a future DB migration (#2880).
      rows = exportProxyLogsSince(since);
    }

    const filename = `omniroute-${tableName}-${hours}h-${new Date().toISOString().slice(0, 10)}.json`;

    return new Response(
      JSON.stringify({ logs: rows, count: rows.length, hours, type: logType }, null, 2),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      }
    );
  } catch (error) {
    return Response.json(
      { error: { message: (error as Error).message, type: "server_error" } },
      { status: 500 }
    );
  }
}
