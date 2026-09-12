import { exportCallLogsSince } from "@/lib/usage/callLogs";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { exportProxyLogsSince } from "@/lib/db/proxyLogs";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

/**
 * GET /api/logs/export — export logs as JSON (streamed)
 * Query params: ?hours=24 (1, 6, 12, 24; default 24)
 *               &type=call-logs|request-logs|proxy-logs (default call-logs)
 *               &limit=10000 (max rows; default 10000, max 50000)
 *
 * #13123: The previous implementation buffered every matching row into a single
 * JSON.stringify call with pretty-printing, which roughly doubled the string
 * size and could OOM the process on large tables. Now:
 *  - Rows are capped by default (configurable via `limit`).
 *  - The response is streamed via ReadableStream so only one row is serialized
 *    at a time, keeping peak memory bounded.
 *  - Pretty-printing is removed (callers that need formatting can pretty-print
 *    client-side).
 */
const MAX_ROWS = 50_000;
const DEFAULT_ROWS = 10_000;

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const hours = Math.min(
      Math.max(parseInt(searchParams.get("hours") || "24") || 24, 1),
      168
    );
    const logType = searchParams.get("type") || "call-logs";
    const limit = Math.min(
      Math.max(
        parseInt(searchParams.get("limit") || String(DEFAULT_ROWS)) || DEFAULT_ROWS,
        1
      ),
      MAX_ROWS
    );

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

    const totalAvailable = rows.length;
    const capped = totalAvailable > limit;
    const exportRows = capped ? rows.slice(0, limit) : rows;
    // Free the original array so GC can reclaim it before streaming starts.
    rows = [];

    const filename = `omniroute-${tableName}-${hours}h-${new Date().toISOString().slice(0, 10)}.json`;

    // Stream the JSON response to avoid buffering the entire serialized string
    // in memory. Each row is serialized individually.
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Write the envelope header with metadata fields.
        const count = exportRows.length;
        const header = JSON.stringify({ count, hours, type: logType });
        // header ends with `}`, we strip it to append `,"logs":[...]}`
        controller.enqueue(encoder.encode(header.slice(0, -1) + ',"logs":['));
        for (let i = 0; i < exportRows.length; i++) {
          if (i > 0) controller.enqueue(encoder.encode(","));
          controller.enqueue(encoder.encode(JSON.stringify(exportRows[i])));
        }
        const trailer = capped
          ? `],"capped":true,"limit":${limit},"totalAvailable":${totalAvailable}}\n`
          : "]}\n";
        controller.enqueue(encoder.encode(trailer));
        controller.close();
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return Response.json(
      {
        error: {
          message: sanitizeErrorMessage(
            error instanceof Error ? error.message : String(error)
          ),
          type: "server_error",
        },
      },
      { status: 500 }
    );
  }
}
