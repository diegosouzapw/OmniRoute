/**
 * GET /api/models/openrouter-catalog
 * Feature 09 — Retorna catálogo OpenRouter com cache persistente.
 *
 * Query params:
 *   ?refresh=true  — Force-refresh, ignores TTL
 */

import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getOpenRouterCatalog, refreshOpenRouterCatalog } from "@/lib/catalog/openrouterCatalog";
import { getSettings } from "@/lib/db/settings";
import { isFreeModel } from "@/shared/utils/freeModels";

export async function GET(req: NextRequest) {
  // Require authentication (dashboard/API key)
  if (!(await isAuthenticated(req))) {
    return NextResponse.json(
      { error: { message: "Authentication required", type: "invalid_request_error" } },
      { status: 401 }
    );
  }

  // #6328 (follow-up to #6495): REMOVE — not just hide — paid models from the
  // OpenRouter catalog echo when hidePaidModels is on. Fail open on settings read.
  let hidePaid = false;
  try {
    const settings = await getSettings();
    hidePaid = settings?.hidePaidModels === true;
  } catch {}
  const applyFilter = <T extends { id?: string }>(data: T[]): T[] =>
    hidePaid ? data.filter((m) => isFreeModel("or", m as { id: string; pricing?: unknown })) : data;

  const forceRefresh = req.nextUrl.searchParams.get("refresh") === "true";

  if (forceRefresh) {
    const result = await refreshOpenRouterCatalog();
    const data = applyFilter(result.data);
    return NextResponse.json({
      object: "list",
      data,
      meta: {
        source: result.ok ? "fresh" : "error",
        count: data.length,
        error: result.error ?? undefined,
      },
    });
  }

  const result = await getOpenRouterCatalog();
  const data = applyFilter(result.data);
  return NextResponse.json({
    object: "list",
    data,
    meta: {
      source: result.fromCache ? (result.stale ? "stale-cache" : "cache") : "fresh",
      cachedAt: result.cachedAt ?? undefined,
      stale: result.stale,
      count: data.length,
    },
  });
}
