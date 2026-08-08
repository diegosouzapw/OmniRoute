/**
 * GET /api/jobs/:id/runs
 *
 * Return run history for a single job (newest-first). LOCAL_ONLY.
 * Next 16 async params: `const { id } = await params`.
 */
import { NextResponse } from "next/server";

import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { getJobRegistry } from "@/lib/jobRegistry";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const registry = getJobRegistry();
    if (!registry.listJobs().some((j) => j.id === id)) {
      return NextResponse.json(buildErrorBody(404, "Job not found"), { status: 404 });
    }
    return NextResponse.json({ data: registry.getRuns(id) });
  } catch (err) {
    console.error("[API] GET /api/jobs/:id/runs error:", err);
    return NextResponse.json(buildErrorBody(500, "Failed to load runs"), { status: 500 });
  }
}
