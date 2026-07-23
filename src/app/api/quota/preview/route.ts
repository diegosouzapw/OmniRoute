/**
 * GET /api/quota/preview — dry-run quota enforcement check
 *
 * Resolves the pool/connection for the given apiKeyId + poolId, then calls
 * enforceQuotaShare() with the estimated cost WITHOUT consuming any counters.
 * The enforceQuotaShare function is itself a read-only "peek" operation on the
 * hot path — it does not call store.consume(), only store.peek().
 *
 * Query params (Zod: QuotaPreviewQuerySchema):
 *   - apiKeyId: string (required)
 *   - poolId: string (required)
 *   - estimatedTokens?: number
 *   - estimatedUsd?: number
 *   - estimatedRequests?: number
 *
 * Response: { decision: EnforceDecision }
 *
 * Auth: requireManagementAuth
 * Sanitization: all error responses via buildErrorBody (Hard Rule #12, B25)
 *
 * Part of: Group B — REST routes for Quota Sharing (plan 22, frente F8).
 */

import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { QuotaPreviewQuerySchema } from "@/shared/schemas/quota";
import { getPool } from "@/lib/localDb";
import { enforceQuotaShare } from "@/lib/quota/enforce";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate query params
    const parsed = QuotaPreviewQuerySchema.safeParse({
      apiKeyId: searchParams.get("apiKeyId") ?? undefined,
      poolId: searchParams.get("poolId") ?? undefined,
      estimatedTokens: searchParams.get("estimatedTokens") ?? undefined,
      estimatedUsd: searchParams.get("estimatedUsd") ?? undefined,
      estimatedRequests: searchParams.get("estimatedRequests") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, parsed.error.message), { status: 400 });
    }

    const { apiKeyId, poolId, estimatedTokens, estimatedUsd, estimatedRequests } = parsed.data;

    // Resolve pool to get connectionId and provider
    const pool = getPool(poolId);
    if (!pool) {
      return NextResponse.json(buildErrorBody(404, "Pool not found"), { status: 404 });
    }

    // Dry-run enforcement — enforceQuotaShare only peeks (does not consume)
    const decision = await enforceQuotaShare({
      apiKeyId,
      connectionId: pool.connectionId,
      provider: "", // Unknown at this level; planResolver will handle catalog/empty fallback
      estimatedCost: {
        tokens: estimatedTokens,
        usd: estimatedUsd,
        requests: estimatedRequests,
      },
    });

    return NextResponse.json({ decision });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to preview quota enforcement";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
