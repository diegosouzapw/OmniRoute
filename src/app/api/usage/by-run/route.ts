import { NextResponse } from "next/server";
import { z } from "zod";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getCostBySessionTag } from "@/lib/db/costLedger";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

const RUN_ID_REQUIRED = "run_id query param is required";

const querySchema = z.object({
  run_id: z
    .string({ error: RUN_ID_REQUIRED })
    .trim()
    .min(1, { error: RUN_ID_REQUIRED })
    .max(256, { error: "run_id must be at most 256 characters" }),
});

/**
 * GET /api/usage/by-run?run_id=<id> — per-run cost rows, read from the
 * per-request ledger for every call tagged with `run_id`.
 *
 * `run_id` is the value the client sent as `x-omniroute-session-id`
 * (`call_logs.session_tag`) and is matched EXACTLY — no wildcard. Callers
 * following the `<lane>/<run-id>` convention can pass the bare lane string to
 * get the rows tagged with the lane itself.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      run_id: searchParams.get("run_id") || undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        buildErrorBody(400, parsed.error.issues[0]?.message ?? "Invalid query parameters"),
        { status: 400 }
      );
    }

    const rows = getCostBySessionTag(parsed.data.run_id);
    return NextResponse.json({ runId: parsed.data.run_id, rows });
  } catch (error) {
    console.error("[API] GET /api/usage/by-run error:", error);
    return NextResponse.json(buildErrorBody(500, "Failed to fetch per-run costs"), {
      status: 500,
    });
  }
}
