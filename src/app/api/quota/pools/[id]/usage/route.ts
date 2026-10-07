/**
 * GET /api/quota/pools/[id]/usage — pool consumption snapshot with dimensions
 *
 * Resolves the pool's provider plan to get dimensions, scales each dimension
 * limit by the pool's member-connection count (the same summed budget
 * enforce.ts applies), then calls poolUsageWithDimensions on the QuotaStore
 * interface.
 *
 * Auth: requireManagementAuth
 * Sanitization: all error responses via buildErrorBody (Hard Rule #12, B25)
 *
 * Part of: Group B — REST routes for Quota Sharing (plan 22, frente F8).
 */

import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getPool } from "@/lib/db/quotaPools";
import { getQuotaStore } from "@/lib/quota/QuotaStore";
import { resolvePlan } from "@/lib/quota/planResolver";
import { resolveConnectionProvider } from "@/lib/quota/connectionProvider";
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

    // 2. Resolve the provider plan for this pool's connection.
    //    The provider name is not stored on the pool — resolve it from the
    //    connection so catalog-only pools surface their plan dimensions
    //    (passing "" here previously degraded every catalog pool to empty).
    const provider = await resolveConnectionProvider(pool.connectionId);
    const plan = resolvePlan(pool.connectionId, provider);

    // 3. Scale each dimension by the pool's member count, mirroring enforce.ts:
    //    a pool with N same-type connections has an effective budget of
    //    perAccountLimit × N per dimension. Without this the snapshot reports
    //    per-account limits and fair shares while enforcement uses the summed
    //    budget, so a multi-connection pool looks ~N× more utilised than it is
    //    (and per-key `borrowing` flags trip N× too early).
    const accountCount =
      Array.isArray(pool.connectionIds) && pool.connectionIds.length > 0
        ? pool.connectionIds.length
        : 1;
    const effectiveDimensions = plan.dimensions.map((dim) => ({
      ...dim,
      limit: dim.limit * accountCount,
    }));

    // 4. Get the quota store and call poolUsageWithDimensions (on the interface since v3.8.12)
    const store = await getQuotaStore();

    let snapshot: PoolUsageSnapshot;
    if (effectiveDimensions.length > 0) {
      snapshot = await store.poolUsageWithDimensions(id, effectiveDimensions);
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
