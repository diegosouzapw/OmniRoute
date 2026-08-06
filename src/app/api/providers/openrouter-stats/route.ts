/**
 * GET /api/providers/openrouter-stats
 * Returns OpenRouter-sourced provider enrichment (popularity rank, HQ, data
 * policy, ToS/privacy links) with persistent cache — see openrouterProviderStats.ts.
 *
 * Query params:
 *   ?refresh=true  — Force-refresh, ignores TTL
 */

import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import {
  getOpenRouterProviderStats,
  refreshOpenRouterProviderStats,
} from "@/lib/catalog/openrouterProviderStats";

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json(
      { error: { message: "Authentication required", type: "invalid_request_error" } },
      { status: 401 }
    );
  }

  const forceRefresh = req.nextUrl.searchParams.get("refresh") === "true";

  if (forceRefresh) {
    const result = await refreshOpenRouterProviderStats();
    return NextResponse.json({
      object: "list",
      data: result.data,
      meta: {
        source: result.ok ? "fresh" : "error",
        count: result.data.length,
        error: result.error ?? undefined,
      },
    });
  }

  const result = await getOpenRouterProviderStats();
  return NextResponse.json({
    object: "list",
    data: result.data,
    meta: {
      source: result.fromCache ? (result.stale ? "stale-cache" : "cache") : "fresh",
      cachedAt: result.cachedAt ?? undefined,
      stale: result.stale,
      count: result.data.length,
    },
  });
}
