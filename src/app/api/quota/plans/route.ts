/**
 * GET /api/quota/plans — list all resolved provider plans
 *
 * Returns plans from two sources merged into one list:
 *   1. Known catalog providers (planRegistry.knownProviders) with resolved plan
 *   2. DB-overridden plans (listProviderPlans from providerPlans table)
 *
 * Each entry includes the `source` field ("auto" | "manual") so callers can
 * distinguish catalog defaults from manual overrides.
 *
 * Auth: requireManagementAuth
 * Sanitization: all error responses via buildErrorBody (Hard Rule #12, B25)
 *
 * Part of: Group B — REST routes for Quota Sharing (plan 22, frente F8).
 */

import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { listProviderPlans } from "@/lib/localDb";
import { knownProviders, getKnownPlan } from "@/lib/quota/planRegistry";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    // 1. Catalog plans (auto-detected defaults)
    const catalogPlans = knownProviders().map((provider) => {
      const known = getKnownPlan(provider);
      return {
        connectionId: null,
        provider,
        dimensions: known?.dimensions ?? [],
        source: "auto" as const,
      };
    });

    // 2. Manual DB overrides — may overlap with catalog providers (override wins)
    const dbPlans = listProviderPlans();

    // 3. Merge: DB plans by provider key override catalog entries
    const dbByProvider = new Map(dbPlans.map((p) => [p.provider, p]));
    const merged = catalogPlans.map((catalog) => {
      const override = dbByProvider.get(catalog.provider);
      if (override) {
        // Remove from dbByProvider so we track non-catalog db plans separately
        dbByProvider.delete(catalog.provider);
        return override;
      }
      return catalog;
    });

    // 4. Any remaining DB plans not in catalog (connectionId-scoped overrides)
    for (const dbPlan of dbByProvider.values()) {
      merged.push(dbPlan);
    }

    return NextResponse.json({ plans: merged });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to list plans";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
