import { NextResponse } from "next/server";
import { pingDb } from "@/lib/db/core";

/**
 * GET /api/health/ping — Lightweight liveness probe
 *
 * Delegates to `pingDb()` (Hard Rule #5: no raw SQL in routes) to confirm
 * the server process is alive and the database is responsive. Intended
 * for high-frequency polling (e.g. MaintenanceBanner) where the heavy
 * `/api/monitoring/health` observability snapshot is too expensive.
 *
 * Returns `{ status: "ok", timestamp, latencyMs }` on success, or HTTP 503 on failure.
 * No auth required — this is a public liveness signal.
 */

export const dynamic = "force-dynamic";

export async function GET() {
  const startedAt = Date.now();
  try {
    const alive = pingDb();
    if (!alive) {
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
    console.error("[ping] Unexpected error in GET /api/health/ping:", error);
    return NextResponse.json(
      { status: "error", error: "ping_failed" },
      { status: 503 }
    );
  }
}
