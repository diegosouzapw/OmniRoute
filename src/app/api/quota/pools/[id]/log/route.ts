/**
 * GET /api/quota/pools/[id]/log — recent consumption events for a pool
 *
 * Returns the most-recent rows from quota_consumption whose dimension_key
 * starts with "<poolId>:" (i.e. all buckets that belong to this pool).
 *
 * Query params:
 *   limit — integer, default 50, max 200
 *
 * Auth:        requireManagementAuth (management-gated, NOT local-only — read-only data, no spawning)
 * Sanitization: all error responses via buildErrorBody (Hard Rule #12)
 *
 * Part of: Task 7 — Quota Share UX polish (plan 2026-05-31).
 */

import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { listConsumptionForPool } from "@/lib/db/quotaConsumption";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    const url = new URL(request.url);
    const rawLimit = url.searchParams.get("limit");
    const parsedLimit = rawLimit !== null ? parseInt(rawLimit, 10) : 50;
    const limit = Number.isFinite(parsedLimit) && parsedLimit > 0
      ? Math.min(parsedLimit, 200)
      : 50;

    const events = listConsumptionForPool(id, limit);
    return NextResponse.json({ events });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to get pool log";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
