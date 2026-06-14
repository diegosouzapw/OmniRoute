/**
 * GET /api/quota/keys/[id]/models
 *
 * Returns the `qtSd/` virtual model IDs that a given API key would see in
 * /v1/models, by reusing the SAME catalog.ts approach:
 *   resolveQuotaKeyScope(key.allowedQuotas) → scope.poolSlugs
 *   filterModelsToQuotaPools(candidates, scope.poolSlugs)
 *
 * Candidates are the combo names from getCombos() mapped to { id: combo.name }
 * (same shape catalog.ts passes to filterModelsToQuotaPools).
 *
 * Auth: requireManagementAuth (management-gated, not quota-key-gated).
 * Error sanitization: buildErrorBody (Hard Rule #12).
 * NOT LOCAL_ONLY — does not spawn processes.
 *
 * Part of: Task 2 — quota-share-v2 plan (2026-06-01).
 */

import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getApiKeyById, getCombos } from "@/lib/localDb";
import { resolveQuotaKeyScope } from "@/lib/quota/quotaKey";
import { filterModelsToQuotaPools } from "@/lib/quota/quotaCombos";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    const key = await getApiKeyById(id);
    if (!key) {
      return NextResponse.json(buildErrorBody(404, "API key not found"), { status: 404 });
    }

    const allowedQuotas: string[] = Array.isArray(
      (key as Record<string, unknown>).allowedQuotas,
    )
      ? ((key as Record<string, unknown>).allowedQuotas as string[])
      : [];

    const scope = await resolveQuotaKeyScope(allowedQuotas);

    // Build the candidate list from all combo names — same shape catalog.ts uses:
    // objects with an `id` field (combo.name) passed to filterModelsToQuotaPools.
    let allCombos: Awaited<ReturnType<typeof getCombos>> = [];
    try {
      allCombos = await getCombos();
    } catch {
      // DB unavailable — treat as empty combo list; models will be [].
    }

    const candidates = allCombos
      .filter((c) => typeof c.name === "string" && c.name.length > 0)
      .map((c) => ({ id: c.name as string }));

    const models = filterModelsToQuotaPools(candidates, scope.poolSlugs).map((m) => m.id);

    return NextResponse.json({ models });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to resolve key models";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
