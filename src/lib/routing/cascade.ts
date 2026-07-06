/**
 * routing/cascade.ts — WP-S7: per-combo cascade routing.
 *
 * Given an ordered list of candidate (provider, model) pairs, tries
 * each one in order, stopping at the first success. Two pre-check
 * filters short-circuit candidates that would violate a per-request
 * cost ceiling or the tenant's monthly USD cap.
 *
 * The cascade is the simplest viable "try the next provider on
 * failure" pattern; richer strategies (weighted, cost-aware) live
 * elsewhere (intelligentRouting.ts).
 *
 * @module open-sse/routing/cascade
 */

export interface CascadeCandidate {
  provider: string;
  model: string;
  estCostUsd: number;
}

export interface CascadeContext {
  requestId: string;
  monthlyUsdSpent: number;
  monthlyUsdCap: number | null;
  perRequestUsdCap: number | null;
}

export type CascadeOutcome = "success" | "quota_exceeded" | "all_failed" | "cost_ceiling_exceeded";

export interface CascadeAttempt {
  provider: string;
  model: string;
  estCostUsd: number;
  status: "skipped_quota" | "skipped_cost_ceiling" | "tried" | "succeeded" | "failed";
  error?: string;
}

export interface CascadeResult {
  outcome: CascadeOutcome;
  selected?: CascadeCandidate;
  attempts: CascadeAttempt[];
  totalEstCostUsd: number;
}

export interface ExecuteFn {
  (candidate: CascadeCandidate): Promise<{ ok: boolean; error?: string }>;
}

/**
 * Run the cascade. The execute function is called per candidate in
 * order. Pre-checks happen synchronously before execute is called.
 */
export async function cascadeRoute(
  candidates: CascadeCandidate[],
  ctx: CascadeContext,
  execute: ExecuteFn,
): Promise<CascadeResult> {
  const attempts: CascadeAttempt[] = [];
  let totalEstCostUsd = 0;
  for (const c of candidates) {
    if (ctx.monthlyUsdCap !== null && ctx.monthlyUsdSpent + c.estCostUsd > ctx.monthlyUsdCap) {
      attempts.push({ provider: c.provider, model: c.model, estCostUsd: c.estCostUsd, status: "skipped_quota" });
      continue;
    }
    if (ctx.perRequestUsdCap !== null && c.estCostUsd > ctx.perRequestUsdCap) {
      attempts.push({ provider: c.provider, model: c.model, estCostUsd: c.estCostUsd, status: "skipped_cost_ceiling" });
      continue;
    }
    let result;
    try {
      result = await execute(c);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      attempts.push({ provider: c.provider, model: c.model, estCostUsd: c.estCostUsd, status: "failed", error: msg });
      continue;
    }
    if (result.ok) {
      attempts.push({ provider: c.provider, model: c.model, estCostUsd: c.estCostUsd, status: "succeeded" });
      totalEstCostUsd += c.estCostUsd;
      return { outcome: "success", selected: c, attempts, totalEstCostUsd };
    }
    attempts.push({ provider: c.provider, model: c.model, estCostUsd: c.estCostUsd, status: "failed", error: result.error });
  }
  // An empty candidate list (nothing tried) is all_failed, not quota_exceeded.
  if (attempts.length === 0) {
    return { outcome: "all_failed", attempts, totalEstCostUsd };
  }
  const allSkipped = attempts.every((a) => a.status === "skipped_quota");
  return {
    outcome: allSkipped ? "quota_exceeded" : "all_failed",
    attempts,
    totalEstCostUsd,
  };
}
