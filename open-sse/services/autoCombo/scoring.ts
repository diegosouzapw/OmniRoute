/**
 * Auto-Combo Scoring Function
 *
 * Calculates a weighted score for each provider candidate based on 6 factors:
 *   1. Quota        (0.20) — residual capacity [0..1]
 *   2. Health       (0.25) — circuit breaker state
 *   3. CostInv      (0.20) — inverse cost normalized to pool
 *   4. LatencyInv   (0.15) — inverse p95 latency normalized to pool
 *   5. TaskFit      (0.10) — model × taskType fitness score
 *   6. Stability    (0.10) — variance-based prediction of consistency
 */

import type { RoutingHint } from "../manifestAdapter";

export interface ScoringFactors {
  quota: number;
  health: number;
  costInv: number;
  latencyInv: number;
  taskFit: number;
  stability: number;
  tierPriority: number;
  tierAffinity: number;
  specificityMatch: number;
}

export interface ScoringWeights {
  quota: number;
  health: number;
  costInv: number;
  latencyInv: number;
  taskFit: number;
  stability: number;
  tierPriority: number;
  tierAffinity: number;
  specificityMatch: number;
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  quota: 0.17,
  health: 0.22,
  costInv: 0.17,
  latencyInv: 0.13,
  taskFit: 0.08,
  stability: 0.05,
  tierPriority: 0.05,
  tierAffinity: 0.05,
  specificityMatch: 0.08,
};

export interface ProviderCandidate {
  provider: string;
  model: string;
  quotaRemaining: number; // percentage 0..100
  quotaTotal: number;
  circuitBreakerState: "CLOSED" | "HALF_OPEN" | "OPEN";
  costPer1MTokens: number;
  p95LatencyMs: number;
  latencyStdDev: number;
  errorRate: number;
  /** T10: Optional account tier for priority boosting (Ultra > Pro > Free) */
  accountTier?: "ultra" | "pro" | "standard" | "free";
  /** T10: Optional quota reset interval in seconds (shorter = higher priority when same quota) */
  quotaResetIntervalSecs?: number;
}

export interface ScoredProvider {
  provider: string;
  model: string;
  score: number;
  factors: ScoringFactors;
}

/**
 * Calculate weighted score from factors.
 * Supports tierAffinity + specificityMatch weights when manifest routing is enabled.
 */
export function calculateScore(factors: ScoringFactors, weights: ScoringWeights): number {
  return (
    weights.quota * factors.quota +
    weights.health * factors.health +
    weights.costInv * factors.costInv +
    weights.latencyInv * factors.latencyInv +
    weights.taskFit * factors.taskFit +
    weights.stability * factors.stability +
    weights.tierPriority * factors.tierPriority +
    (weights.tierAffinity ?? 0) * factors.tierAffinity +
    (weights.specificityMatch ?? 0) * factors.specificityMatch
  );
}

/**
 * T10: Convert account tier string to a normalized score [0..1].
 */
export function calculateTierScore(
  tier: string | undefined,
  quotaResetIntervalSecs: number | undefined
): number {
  const BASE_TIER_SCORES: Record<string, number> = {
    ultra: 1.0,
    pro: 0.67,
    standard: 0.33,
    free: 0.0,
  };
  const baseScore = BASE_TIER_SCORES[tier?.toLowerCase() ?? ""] ?? 0.33;

  const resetBonus =
    quotaResetIntervalSecs != null && quotaResetIntervalSecs > 0
      ? Math.max(0, 1 - quotaResetIntervalSecs / 2_592_000)
      : 0;

  return Math.min(1, baseScore * 0.8 + resetBonus * 0.2);
}

function calculateTierAffinity(
  candidate: ProviderCandidate,
  hint: RoutingHint | undefined | null
): number {
  if (!hint) return 0.5;
  try {
    const { classifyTier } = require("../tierResolver");
    const assignment = classifyTier(candidate.provider, candidate.model);
    const tierOrder = ["free", "cheap", "premium"];
    const providerTierIdx = tierOrder.indexOf(assignment.tier);
    const minTierIdx = tierOrder.indexOf(hint.recommendedMinTier);

    if (providerTierIdx === minTierIdx) return 1.0;
    if (Math.abs(providerTierIdx - minTierIdx) === 1) return 0.7;
    return 0.3;
  } catch {
    return 0.5;
  }
}

function calculateSpecificityMatch(
  candidate: ProviderCandidate,
  hint: RoutingHint | undefined | null
): number {
  if (!hint) return 0.5;
  try {
    const { classifyTier } = require("../tierResolver");
    const assignment = classifyTier(candidate.provider, candidate.model);
    const specificityScore = hint.specificity.score;

    if (assignment.tier === "free") return specificityScore <= 15 ? 0.9 : 0.2;
    if (assignment.tier === "cheap")
      return specificityScore > 15 && specificityScore <= 50 ? 0.9 : 0.4;
    if (assignment.tier === "premium") return specificityScore > 50 ? 0.9 : 0.3;
    return 0.5;
  } catch {
    return 0.5;
  }
}

export function calculateFactors(
  candidate: ProviderCandidate,
  pool: ProviderCandidate[],
  taskType: string,
  getTaskFitness: (model: string, taskType: string) => number,
  manifestHint?: RoutingHint | null
): ScoringFactors {
  const maxCost = Math.max(...pool.map((p) => p.costPer1MTokens), 0.001);
  const maxLatency = Math.max(...pool.map((p) => p.p95LatencyMs), 1);
  const maxStdDev = Math.max(...pool.map((p) => p.latencyStdDev), 0.001);

  return {
    quota: Math.min(1, candidate.quotaRemaining / 100),
    health:
      candidate.circuitBreakerState === "CLOSED"
        ? 1.0
        : candidate.circuitBreakerState === "HALF_OPEN"
          ? 0.5
          : 0.0,
    costInv: 1 - candidate.costPer1MTokens / maxCost,
    latencyInv: 1 - candidate.p95LatencyMs / maxLatency,
    taskFit: getTaskFitness(candidate.model, taskType),
    stability: 1 - candidate.latencyStdDev / maxStdDev,
    tierPriority: calculateTierScore(candidate.accountTier, candidate.quotaResetIntervalSecs),
    tierAffinity: calculateTierAffinity(candidate, manifestHint),
    specificityMatch: calculateSpecificityMatch(candidate, manifestHint),
  };
}

export function scorePool(
  pool: ProviderCandidate[],
  taskType: string,
  weights: ScoringWeights = DEFAULT_WEIGHTS,
  getTaskFitness: (model: string, taskType: string) => number = () => 0.5,
  manifestHint?: RoutingHint | null
): ScoredProvider[] {
  return pool
    .map((candidate) => {
      const factors = calculateFactors(candidate, pool, taskType, getTaskFitness, manifestHint);
      return {
        provider: candidate.provider,
        model: candidate.model,
        score: calculateScore(factors, weights),
        factors,
      };
    })
    .sort((a, b) => b.score - a.score);
}

/**
 * Validate that weights sum to 1.0 (±0.01 tolerance).
 */
export function validateWeights(weights: ScoringWeights): boolean {
  const sum = Object.values(weights).reduce((a, b) => a + b, 0);
  return Math.abs(sum - 1.0) < 0.01;
}
