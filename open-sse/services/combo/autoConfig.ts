import { DEFAULT_WEIGHTS, type ScoringWeights } from "../autoCombo/scoring.ts";
import { isRecord } from "./comboData.ts";
import { resolveResetWindowConfig, resolveSlaRoutingPolicy } from "./quotaScoring.ts";
import type { ComboLike, ResolvedComboTarget } from "./types.ts";

/**
 * Resolve the auto-strategy routing configuration for a combo.
 *
 * Pure function of `(combo, eligibleTargets)`: derives the router strategy name,
 * candidate provider pool, scoring weights, exploration rate, budget cap, mode
 * pack, reset-window config and SLA policy from the combo's `autoConfig`/`config`.
 * No side effects, no early returns — extracted verbatim from `handleComboChat`
 * so its behavior is byte-identical to the previous inline block.
 */
export function parseAutoConfig(combo: ComboLike, eligibleTargets: ResolvedComboTarget[]) {
  const rawAutoConfigSource =
    combo?.autoConfig ||
    (isRecord(combo?.config?.auto) ? combo.config.auto : null) ||
    combo?.config ||
    {};
  const autoConfigSource: Record<string, unknown> = isRecord(rawAutoConfigSource)
    ? rawAutoConfigSource
    : {};
  const routingStrategy =
    typeof autoConfigSource.routerStrategy === "string"
      ? autoConfigSource.routerStrategy
      : typeof autoConfigSource.routingStrategy === "string"
        ? autoConfigSource.routingStrategy
        : typeof autoConfigSource.strategyName === "string"
          ? autoConfigSource.strategyName
          : "rules";

  const candidatePool = Array.isArray(autoConfigSource.candidatePool)
    ? autoConfigSource.candidatePool
    : [...new Set(eligibleTargets.map((target) => target.provider))];

  const weights =
    autoConfigSource.weights && typeof autoConfigSource.weights === "object"
      ? (autoConfigSource.weights as ScoringWeights)
      : DEFAULT_WEIGHTS;
  const explorationRate = Number.isFinite(Number(autoConfigSource.explorationRate))
    ? Number(autoConfigSource.explorationRate)
    : 0.05;
  const budgetCap = Number.isFinite(Number(autoConfigSource.budgetCap))
    ? Number(autoConfigSource.budgetCap)
    : undefined;
  const modePack =
    typeof autoConfigSource.modePack === "string" ? autoConfigSource.modePack : undefined;
  const resetWindowConfig = resolveResetWindowConfig(autoConfigSource);
  const slaPolicy = resolveSlaRoutingPolicy(autoConfigSource);

  return {
    routingStrategy,
    candidatePool,
    weights,
    explorationRate,
    budgetCap,
    modePack,
    resetWindowConfig,
    slaPolicy,
  };
}
