/**
 * GET /api/quota/pools/[id]/usage — pool consumption snapshot with dimensions
 *
 * Resolves the pool's provider plan to get dimensions, then calls
 * poolUsageWithDimensions on the QuotaStore interface.
 *
 * Auth: requireManagementAuth
 * Sanitization: all error responses via buildErrorBody (Hard Rule #12, B25)
 *
 * Part of: Group B — REST routes for Quota Sharing (plan 22, frente F8).
 */

import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getPool } from "@/lib/localDb";
import { getQuotaStore } from "@/lib/quota/QuotaStore";
import { resolvePlan } from "@/lib/quota/planResolver";
import type { PoolUsageSnapshot } from "@/lib/quota/types";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    // 1. Get pool — 404 if not found
    const pool = getPool(id);
    if (!pool) {
      return NextResponse.json(buildErrorBody(404, "Pool not found"), { status: 404 });
    }

    // 2. Resolve the provider plan for this pool's connection
    //    Provider name is not stored on pool — use empty string to trigger catalog/empty fallback
    const plan = resolvePlan(pool.connectionId, "");

    // 3. Get the quota store and call poolUsageWithDimensions (on the interface since v3.8.12)
    const store = await getQuotaStore();

    let snapshot: PoolUsageSnapshot;
    if (plan.dimensions.length > 0) {
      snapshot = await store.poolUsageWithDimensions(id, plan.dimensions);
    } else {
      // Fallback: no plan dimensions configured — return minimal snapshot
      snapshot = await store.poolUsage(id);
    }

    return NextResponse.json({ usage: snapshot });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to get pool usage";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
