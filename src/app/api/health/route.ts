import { NextResponse } from "next/server";

/**
 * GET /api/health — canonical liveness probe, no auth required.
 *
 * Without this route, `/api/health` fell through to the `/api/*` catch-all, and the
 * management-auth boundary answered before routing: an unauthenticated caller got a 401,
 * which is exactly what a wrong or missing key returns. An orchestrator (Docker HEALTHCHECK,
 * a Kubernetes probe, a monitoring curl) cannot tell "service down" from "bad credentials"
 * from "no such route" — the ambiguity the #6424 catch-all was written to remove for
 * authenticated callers, still intact for the one caller that never authenticates.
 *
 * Deliberately minimal: `{ status, timestamp }` and nothing else. Whatever this returns is
 * public on an exposed instance, so version, uptime and memory stay behind the authenticated
 * `/api/monitoring/health`. For a probe that also confirms the database answers, use
 * `/api/health/ping`.
 * Readiness (DB-backed) lives at /api/health/ping (pingDb, 503 when down); this route stays liveness-only so a slow DB never restarts the container.
 */

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { status: "ok", timestamp: new Date().toISOString() },
    {
      status: 200,
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    }
  );
}
