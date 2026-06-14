/**
 * GET  /api/quota/pools  — list all quota pools with allocations
 * POST /api/quota/pools  — create a new quota pool
 *
 * Auth: requireManagementAuth (same pattern as /api/compliance/audit-log)
 * Zod:  PoolCreateSchema from @/shared/schemas/quota
 * Audit: quota.pool.created logged on POST (B26)
 * Sanitization: all error responses via buildErrorBody (Hard Rule #12, B25)
 *
 * NOT LOCAL_ONLY — does not spawn processes (B18, Hard Rules #15/#17 do not apply).
 *
 * Part of: Group B — REST routes for Quota Sharing (plan 22, frente F8).
 */

import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { PoolCreateSchema } from "@/shared/schemas/quota";
import { listPools, createPool } from "@/lib/localDb";
import { logAuditEvent, getAuditRequestContext } from "@/lib/compliance/index";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const pools = listPools();
    return NextResponse.json({ pools });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to list pools";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json().catch(() => null);
    const parsed = PoolCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, parsed.error.message), { status: 400 });
    }

    const pool = createPool(parsed.data);
    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: "quota.pool.created",
      target: pool.id,
      metadata: { connectionId: pool.connectionId, name: pool.name },
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });

    return NextResponse.json({ pool }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create pool";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
