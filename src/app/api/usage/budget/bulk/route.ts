import { NextResponse } from "next/server";
import { getCostSummary, checkBudget } from "@/domain/costRules";
import { getApiKeys } from "@/lib/db/apiKeys";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

/**
 * GET /api/usage/budget/bulk — Bulk budget summary for every API key.
 *
 * Avoids N+1 in dashboard views that need a per-key snapshot of spend and
 * limits in one round-trip. Returns a record keyed by apiKeyId so callers
 * can lookup by id without scanning.
 *
 * Requires management auth: this exposes spend + budget limits for ALL keys,
 * so it must not be reachable without the dashboard/management token.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const keys = await getApiKeys();
    const budgets: Record<
      string,
      ReturnType<typeof getCostSummary> & { budgetCheck: ReturnType<typeof checkBudget> }
    > = {};
    for (const k of keys) {
      const id = (k as { id?: string }).id;
      if (typeof id !== "string" || !id) continue;
      const summary = getCostSummary(id);
      budgets[id] = { ...summary, budgetCheck: checkBudget(id) };
    }
    return NextResponse.json({ budgets });
  } catch (error) {
    console.error("Error fetching bulk budget summary:", error);
    return NextResponse.json({ error: "Failed to fetch bulk budget summary" }, { status: 500 });
  }
}
