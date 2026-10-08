/**
 * GET /api/quota/pools/[id]/schedules — list the pool's time-aware quota windows
 * PUT /api/quota/pools/[id]/schedules — replace the whole set
 *
 * Auth: requireManagementAuth (same pattern as the sibling pool routes)
 * Zod:  SchedulesReplaceSchema from @/shared/schemas/quota
 * Audit: quota.schedules.updated logged on PUT (B26)
 * Sanitization: all error responses via buildErrorBody (Hard Rule #12, B25)
 *
 * PUT replaces rather than patches: the resolution rules are overlap- and
 * priority-sensitive, so a caller has to reason about the complete set anyway.
 *
 * Part of: Quota Sharing Engine — time-aware quotas.
 */

import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { SchedulesReplaceSchema } from "@/shared/schemas/quota";
import { getPool } from "@/lib/db/quotaPools";
import { listSchedules, replaceSchedules } from "@/lib/db/quotaSchedules";
import { logAuditEvent, getAuditRequestContext } from "@/lib/compliance/index";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    if (!getPool(id)) {
      return NextResponse.json(buildErrorBody(404, "Pool not found"), { status: 404 });
    }
    return NextResponse.json({ schedules: listSchedules(id) });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to list schedules";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    if (!getPool(id)) {
      return NextResponse.json(buildErrorBody(404, "Pool not found"), { status: 404 });
    }

    const body = await request.json().catch(() => null);
    const parsed = SchedulesReplaceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, parsed.error.message), { status: 400 });
    }

    const schedules = replaceSchedules(id, parsed.data.schedules);

    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: "quota.schedules.updated",
      target: id,
      metadata: { count: schedules.length },
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });

    return NextResponse.json({ schedules });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update schedules";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
