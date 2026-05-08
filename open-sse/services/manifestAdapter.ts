import type { TierAssignment, ProviderTier } from "./tierTypes";
import { PROVIDER_TIER } from "./tierTypes";
import type { SpecificityResult, SpecificityLevel } from "./specificityTypes";
import { classifyTier } from "./tierResolver";
import {
  analyzeSpecificity,
  getSpecificityLevel,
  getRecommendedMinTier,
} from "./specificityDetector";
import type { RuleInput } from "./specificityTypes";
import type { ResolvedComboTarget } from "./combo";

export type StrategyModifier =
  | "default"
  | "prefer-free"
  | "prefer-cheap"
  | "require-premium"
  | "cost-save"
  | "quality-first";

export interface RoutingHint {
  tierAssignments: Map<string, TierAssignment>;
  specificity: SpecificityResult;
  specificityLevel: SpecificityLevel;
  recommendedMinTier: ProviderTier;
  eligibleTargets: ResolvedComboTarget[];
  overqualifiedTargets: ResolvedComboTarget[];
  underqualifiedTargets: ResolvedComboTarget[];
  strategyModifier: StrategyModifier;
}

export function generateRoutingHints(
  targets: ResolvedComboTarget[],
  input: RuleInput
): RoutingHint {
  const tierAssignments = new Map<string, TierAssignment>();
  for (const target of targets) {
    if (target.kind !== "model") continue;
    const key = `${target.provider}::${target.modelStr}`;
    if (!tierAssignments.has(key)) {
      tierAssignments.set(key, classifyTier(target.provider, target.modelStr));
    }
  }

  const specificity = analyzeSpecificity(input);
  const specificityLevel = getSpecificityLevel(specificity.score);
  const recommendedMinTier = getRecommendedMinTier(specificityLevel) as ProviderTier;

  const tierOrder: ProviderTier[] = ["free", "cheap", "premium"];
  const minTierIndex = tierOrder.indexOf(recommendedMinTier);

  const eligibleTargets: ResolvedComboTarget[] = [];
  const overqualifiedTargets: ResolvedComboTarget[] = [];
  const underqualifiedTargets: ResolvedComboTarget[] = [];

  for (const target of targets) {
    if (target.kind !== "model") continue;
    const key = `${target.provider}::${target.modelStr}`;
    const assignment = tierAssignments.get(key);
    if (!assignment) continue;

    const targetTierIndex = tierOrder.indexOf(assignment.tier);
    if (targetTierIndex >= minTierIndex) {
      eligibleTargets.push(target);
      if (targetTierIndex > minTierIndex) {
        overqualifiedTargets.push(target);
      }
    } else {
      underqualifiedTargets.push(target);
    }
  }

  const strategyModifier = determineStrategyModifier(
    specificityLevel,
    eligibleTargets.length,
    underqualifiedTargets.length
  );

  return {
    tierAssignments,
    specificity,
    specificityLevel,
    recommendedMinTier,
    eligibleTargets,
    overqualifiedTargets,
    underqualifiedTargets,
    strategyModifier,
  };
}

function determineStrategyModifier(
  level: SpecificityLevel,
  eligibleCount: number,
  underqualifiedCount: number
): StrategyModifier {
  if (level === "expert") return "require-premium";
  if (level === "complex") return "prefer-cheap";
  if (level === "moderate") return "prefer-cheap";
  if (level === "simple" || level === "trivial") return "prefer-free";
  return "default";
}

export function getTargetTier(target: ResolvedComboTarget): TierAssignment {
  return classifyTier(target.provider, target.modelStr);
}

export function estimateRequestCost(
  target: ResolvedComboTarget,
  inputTokens: number,
  estimatedOutputTokens: number
): number {
  const pricing = getTargetTier(target);
  const inputCost = (inputTokens / 1_000_000) * pricing.costPer1MInput;
  const outputCost = (estimatedOutputTokens / 1_000_000) * pricing.costPer1MOutput;
  return inputCost + outputCost;
}

export function compareByCostEffectiveness(
  a: ResolvedComboTarget,
  b: ResolvedComboTarget,
  hint: RoutingHint
): number {
  const aTier = getTargetTier(a);
  const bTier = getTargetTier(b);
  const tierOrder: ProviderTier[] = ["free", "cheap", "premium"];

  const aEligible = tierOrder.indexOf(aTier.tier) >= tierOrder.indexOf(hint.recommendedMinTier);
  const bEligible = tierOrder.indexOf(bTier.tier) >= tierOrder.indexOf(hint.recommendedMinTier);

  if (aEligible && !bEligible) return -1;
  if (!aEligible && bEligible) return 1;

  return tierOrder.indexOf(aTier.tier) - tierOrder.indexOf(bTier.tier);
}
