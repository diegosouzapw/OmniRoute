/**
 * GET /api/jobs
 *
 * List all registered jobs with their last run. LOCAL_ONLY - loopback enforced by
 * routeGuard's isLocalOnlyPath() before this handler runs.
 *
 * Response: { data: JobDto[] } - DTO whitelist (no handler/timer, which are
 * non-serializable live objects).
 */
import { NextResponse } from "next/server";

import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { getJobRegistry } from "@/lib/jobRegistry";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const registry = getJobRegistry();
    const jobs = registry.listJobs().map((job) => ({
      id: job.id,
      type: job.type,
      cron: job.cron,
      intervalMs: job.intervalMs,
      enabled: job.enabled,
      envFlag: job.envFlag,
      config: job.config,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      lastRun: registry.getRuns(job.id, 1)[0] ?? null,
    }));
    return NextResponse.json({ data: jobs });
  } catch (err) {
    console.error("[API] GET /api/jobs error:", err);
    return NextResponse.json(buildErrorBody(500, "Failed to list jobs"), { status: 500 });
  }
}
