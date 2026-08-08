/**
 * POST /api/jobs/:id/run-now -- manually trigger a job run.
 * LOCAL_ONLY (enforced by routeGuard).
 *
 * The timeout bounds the CALL, not the job. runNow() dispatches the handler
 * with `void` and returns as soon as it has decided to start, so on the normal
 * path this resolves in milliseconds and the timer never fires. It only has
 * something to bound when the job is already running: runNow() then returns a
 * promise that waits for the in-flight run to finish before starting the queued
 * one. Cancelling here does not cancel the job -- the handler keeps running.
 */
import { NextResponse } from "next/server";

import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { getJobRegistry } from "@/lib/jobRegistry";

export const dynamic = "force-dynamic";

const DEFAULT_TIMEOUT_MS = 30_000;

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const registry = getJobRegistry();
    if (!registry.listJobs().some((j) => j.id === id)) {
      return NextResponse.json(buildErrorBody(404, "Job not found"), { status: 404 });
    }
    const timeoutMs = Number(process.env.OMNIROUTE_RUNNOW_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS;
    // Clear the loser: Promise.race settles on the first result but leaves the
    // other timer armed, so without this every call keeps a live timeout for
    // the full window even though it resolved in milliseconds.
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const result = await Promise.race([
        registry.runNow(id),
        new Promise<never>((_, reject) => {
          timer = setTimeout(
            () => reject(new Error(`runNow timed out after ${timeoutMs}ms`)),
            timeoutMs
          );
        }),
      ]);
      return NextResponse.json({ data: result });
    } finally {
      if (timer) clearTimeout(timer);
    }
  } catch (err) {
    console.error("[API] POST /api/jobs/:id/run-now error:", err);
    return NextResponse.json(buildErrorBody(500, "Failed to run job"), { status: 500 });
  }
}
