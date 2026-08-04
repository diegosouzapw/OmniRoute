/**
 * GET    /api/quota/plans/[connectionId]  — get resolved plan for a connection
 * PUT    /api/quota/plans/[connectionId]  — upsert manual plan override
 * DELETE /api/quota/plans/[connectionId]  — clear manual override (revert to auto/catalog)
 *
 * Auth: requireManagementAuth
 * Zod:  PlanUpsertSchema from @/shared/schemas/quota (PUT only)
 * Audit: quota.plan.updated on PUT and DELETE (B26 — DELETE reverts override to auto/catalog)
 * Sanitization: all error responses via buildErrorBody (Hard Rule #12, B25)
 *
 * For PUT: provider is derived from the connectionId via getProviderConnectionById.
 * If the connection lookup fails (e.g. provider not found), provider defaults to
 * "unknown" — the override is still stored so operator can correct later.
 *
 * Part of: Group B — REST routes for Quota Sharing (plan 22, frente F8).
 */

import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { PlanUpsertSchema } from "@/shared/schemas/quota";
import {
  getProviderPlan,
  upsertProviderPlan,
  deleteProviderPlan,
} from "@/lib/localDb";
import { resolvePlan } from "@/lib/quota/planResolver";
import { resolveConnectionProvider } from "@/lib/quota/connectionProvider";
import { logAuditEvent, getAuditRequestContext } from "@/lib/compliance/index";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ connectionId: string }> };

export async function GET(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { connectionId } = await params;

    // Try DB override first, then fall back to resolved plan (catalog/empty)
    const dbPlan = getProviderPlan(connectionId);
    if (dbPlan) {
      return NextResponse.json({ plan: dbPlan });
    }

    // Resolve via catalog (may return empty plan)
    const provider = await resolveConnectionProvider(connectionId);
    const plan = resolvePlan(connectionId, provider);
    return NextResponse.json({ plan });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to get plan";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { connectionId } = await params;
    const body = await request.json().catch(() => null);
    const parsed = PlanUpsertSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, parsed.error.message), { status: 400 });
    }

    // Derive provider for the connection
    const provider = await resolveConnectionProvider(connectionId);

    upsertProviderPlan(connectionId, provider, parsed.data.dimensions, "manual");

    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: "quota.plan.updated",
      target: connectionId,
      metadata: { provider, dimensions: parsed.data.dimensions, source: "manual" },
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });

    // Return the stored plan
    const plan = getProviderPlan(connectionId);
    return NextResponse.json({ plan });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to upsert plan";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { connectionId } = await params;

    const existing = getProviderPlan(connectionId);
    const provider = existing?.provider ?? (await resolveConnectionProvider(connectionId));

    deleteProviderPlan(connectionId);

    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: "quota.plan.updated",
      target: connectionId,
      metadata: { provider, source: "auto", reverted: true },
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });

    return new Response(null, { status: 204 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete plan";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
