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
import { listPools, createPool, ensurePool } from "@/lib/db/quotaPools";
import { logAuditEvent, getAuditRequestContext } from "@/lib/compliance/index";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.has("limit") ? Number(searchParams.get("limit")) : undefined;
    const offset = searchParams.has("offset") ? Number(searchParams.get("offset")) : 0;
    const result = listPools(limit !== undefined ? { limit, offset } : undefined);
    return NextResponse.json({ pools: result.items, total: result.total });
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

    const ensure = new URL(request.url).searchParams.get("ensure") === "true";
    const ensured = ensure ? ensurePool(parsed.data) : null;
    const pool = ensured?.pool ?? createPool(parsed.data);
    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: ensured?.updated ? "quota.pool.updated" : "quota.pool.created",
      target: pool.id,
      metadata: {
        connectionId: pool.connectionId,
        name: pool.name,
        ensure,
        created: ensured?.created ?? true,
        updated: ensured?.updated ?? false,
      },
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });

    return NextResponse.json(
      { pool, ...(ensured ? { created: ensured.created, updated: ensured.updated } : {}) },
      { status: ensured?.created === false ? 200 : 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create pool";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
