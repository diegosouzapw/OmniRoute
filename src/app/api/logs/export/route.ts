import { countCallLogsSince, iterateCallLogsSince } from "@/lib/usage/callLogs";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { countProxyLogsSince, iterateProxyLogsSince } from "@/lib/db/proxyLogs";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { logger } from "@/shared/utils/logger";

const log = logger.child({ module: "logs-export" });

/**
 * GET /api/logs/export — export logs as JSON (streamed)
 * Query params: ?hours=24 (1, 6, 12, 24; default 24)
 *               &type=call-logs|request-logs|proxy-logs (default call-logs)
 *               &limit=10000 (max rows; default 10000, max 50000)
 *
 * #13123: The original implementation buffered every matching row into a single
 * JSON.stringify call with pretty-printing, which roughly doubled the string
 * size and could OOM the process on large tables. A first fix pass added
 * streaming + a row cap at the ROUTE layer only, but `exportCallLogsSince()`/
 * `exportProxyLogsSince()` still hydrated and buffered every matching row
 * (including rows beyond the cap) before the cap was ever applied — the peak
 * V8 heap was essentially unchanged. This version pushes the cap down to the
 * DB layer itself:
 *  - `countCallLogsSince()`/`countProxyLogsSince()` run a cheap COUNT(*) for
 *    `totalAvailable`, never touching the matching rows.
 *  - `iterateCallLogsSince()`/`iterateProxyLogsSince()` bound the query with
 *    SQL LIMIT and hydrate/yield one row at a time (fixed-size LIMIT/OFFSET
 *    pages for proxy_logs, a generator over a LIMIT-bounded id list for
 *    call_logs), so the full matching row set is never fully buffered.
 *  - Pretty-printing stays removed (callers that need formatting can
 *    pretty-print client-side).
 *  - BREAKING (documented in changelog): `limit` still defaults to 10,000 —
 *    exports that previously returned every row are silently truncated
 *    unless the caller passes a larger `limit`.
 */
const MAX_ROWS = 50_000;
const DEFAULT_ROWS = 10_000;

/**
 * Build the streamed JSON body for a log export.
 *
 * Streams one row at a time — the row source (`rows`) is a cursor/generator
 * bounded by SQL LIMIT, so peak memory is bounded by one hydrated row, not the
 * full matching set (#13123). `capped`/`limit`/`totalAvailable` travel in the
 * HEADER (not a trailer, as before) so a client consuming the stream
 * incrementally learns about truncation before it has processed every row.
 */
function buildLogExportStream({
  rows,
  header,
  logType,
  hours,
}: {
  rows: AsyncIterable<unknown> | Iterable<unknown>;
  header: Record<string, unknown>;
  logType: string;
  hours: number;
}): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      // header ends with `}`, we strip it to append `,"logs":[...]}`
      controller.enqueue(encoder.encode(JSON.stringify(header).slice(0, -1) + ',"logs":['));
      let index = 0;
      let streamError: unknown = null;
      try {
        for await (const row of rows) {
          if (index > 0) controller.enqueue(encoder.encode(","));
          controller.enqueue(encoder.encode(JSON.stringify(row)));
          index++;
        }
      } catch (err) {
        // #13999: the row source (a DB cursor/generator) can throw partway through
        // iteration, after headers and some rows have already gone out over the wire.
        // Letting the exception propagate out of an async `start()` auto-errors the
        // underlying Web ReadableStream, but once that stream is bridged onto a real
        // Node HTTP response (as any Node-based adapter does), a source error does not
        // end or destroy the destination response — the client's fetch() never resolves
        // and never rejects, and it hangs forever (proven by
        // tests/unit/repro-13999-mid-stream-error.test.ts). Instead of erroring the
        // stream, close the JSON document out cleanly with a trailing `error`/`emitted`
        // marker so the HTTP response always completes, and log the failure server-side.
        streamError = err;
        log.error(
          { err, emitted: index, type: logType, hours },
          "logs export stream failed mid-iteration"
        );
      }
      controller.enqueue(encoder.encode("]"));
      controller.enqueue(encoder.encode(streamError ? errorTail(index, streamError) : "}\n"));
      controller.close();
    },
  });
}

/**
 * `,"emitted":N,"error":"..."}` — the sibling fields that close a truncated
 * export out as well-formed JSON (#13999).
 */
function errorTail(emitted: number, streamError: unknown): string {
  const tail = JSON.stringify({
    emitted,
    error: sanitizeErrorMessage(
      streamError instanceof Error ? streamError.message : String(streamError)
    ),
  });
  return "," + tail.slice(1, -1) + "}\n";
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const hours = Math.min(Math.max(parseInt(searchParams.get("hours") || "24") || 24, 1), 168);
    const logType = searchParams.get("type") || "call-logs";
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") || String(DEFAULT_ROWS)) || DEFAULT_ROWS, 1),
      MAX_ROWS
    );

    const since = new Date(Date.now() - hours * 3600 * 1000).toISOString();

    let tableName = "";
    let totalAvailable = 0;
    let rows: AsyncIterable<unknown> | Iterable<unknown> = [];

    if (logType === "call-logs" || logType === "request-logs") {
      tableName = "call_logs";
      totalAvailable = countCallLogsSince(since);
      rows = iterateCallLogsSince(since, limit);
    } else if (logType === "proxy-logs") {
      tableName = "proxy_logs";
      // NOTE: iterateProxyLogsSince returns the historical `public_ip` column, NOT
      // `clientIp`. This intentionally differs from GET /api/usage/proxy-logs which
      // exposes the value as `clientIp`. Callers of this export endpoint should read
      // `public_ip`. This inconsistency will be resolved in a future DB migration
      // (#2880).
      totalAvailable = countProxyLogsSince(since);
      rows = iterateProxyLogsSince(since, limit);
    }

    const capped = totalAvailable > limit;
    const count = Math.min(totalAvailable, limit);
    const filename = `omniroute-${tableName}-${hours}h-${new Date().toISOString().slice(0, 10)}.json`;

    const stream = buildLogExportStream({
      rows,
      header: {
        count,
        hours,
        type: logType,
        ...(capped ? { capped: true, limit, totalAvailable } : {}),
      },
      logType,
      hours,
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
          message: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
          type: "server_error",
        },
      },
      { status: 500 }
    );
  }
}
