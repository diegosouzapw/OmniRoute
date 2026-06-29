import type { ContextBudgetConfig, ContextBudgetPolicy } from "./types.ts";

/**
 * Pure target-token computation (design D-C1). No clock, no DB, no tokenizer.
 *
 * @param policy            active target policy
 * @param modelContextLimit the resolved upstream model's context window (impure caller looks it up)
 * @param requestMaxTokens  request.max_tokens, if the client sent one (reserve-output only)
 * @param config            reserves / margin / pct / absoluteBudget
 * @returns the maximum prompt-token target the compressed request should fit within
 */
export function computeTarget(
  policy: ContextBudgetPolicy,
  modelContextLimit: number,
  requestMaxTokens: number | null,
  config: Pick<ContextBudgetConfig, "outputReserve" | "safetyMargin" | "pct" | "absoluteBudget">
): number {
  if (policy === "absolute") {
    return Math.max(0, Math.floor(config.absoluteBudget));
  }
  if (policy === "percentage") {
    const pct = config.pct > 0 && config.pct <= 1 ? config.pct : 1;
    return Math.max(0, Math.floor(modelContextLimit * pct));
  }
  // reserve-output (default): limit − output reservation − safety margin.
  const reserve =
    typeof requestMaxTokens === "number" && requestMaxTokens > 0
      ? requestMaxTokens
      : config.outputReserve;
  return Math.max(0, Math.floor(modelContextLimit - reserve - config.safetyMargin));
}
