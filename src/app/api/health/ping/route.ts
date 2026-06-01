import { NextResponse } from "next/server";
import { getDbInstance } from "@/lib/db/core";

/**
 * GET /api/health/ping — Lightweight liveness probe
 *
 * Performs a trivial `SELECT 1` against the SQLite database to confirm
 * the server process is alive and the database is responsive. Intended
 * for high-frequency polling (e.g. MaintenanceBanner) where the heavy
 * `/api/monitoring/health` observability snapshot is too expensive.
 *
 * Returns `{ status: "ok", timestamp }` on success, or HTTP 503 on failure.
 * No auth required — this is a public liveness signal.
 */

export const dynamic = "force-dynamic";

export async function GET() {
  const startedAt = Date.now();
  try {
    const db = getDbInstance();
    // Single integer query, no row materialization beyond the value.
    const result = db.prepare("SELECT 1 AS ok").get() as { ok: number } | undefined;
    if (!result || result.ok !== 1) {
      return NextResponse.json(
        { status: "error", error: "db_query_failed" },
        { status: 503 }
      );
    }
    return NextResponse.json(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
        latencyMs: Date.now() - startedAt,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : "unknown",
      },
      { status: 503 }
    );
  }
}
