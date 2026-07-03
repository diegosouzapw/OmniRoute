/**
 * Auto-Combo Scoring Function
 *
 * Calculates a weighted score for each provider candidate.
 */

import type { RoutingHint } from "../manifestAdapter";
import { clamp01 } from "../../utils/number";
import { classifyTier } from "../tierResolver";

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
  contextAffinity: number;
  resetWindowAffinity: number;
  connectionDensity: number;
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
  contextAffinity: number;
  resetWindowAffinity: number;
  connectionDensity: number;
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  quota: 0.15,
  health: 0.2,
  costInv: 0.15,
  latencyInv: 0.12,
  taskFit: 0.08,
  stability: 0.05,
  tierPriority: 0.05,
  tierAffinity: 0.05,
  specificityMatch: 0.05,
  contextAffinity: 0.05,
  resetWindowAffinity: 0,
  connectionDensity: 0.05,
};

export interface ProviderCandidate {
  provider: string;
  model: string;
  quotaRemaining: number; // percentage 0..100
  quotaTotal: number;
  circuitBreakerState: "CLOSED" | "HALF_OPEN" | "OPEN";
  costPer1MTokens: number;
  p95LatencyMs: number;
  /** Average time-to-first-token in ms, when stream telemetry is available. */
  avgTtftMs?: number;
  /** Average end-to-end request latency in ms, when usage telemetry is available. */
  avgE2ELatencyMs?: number;
  /** Average generation throughput in output tokens/sec, when token telemetry is available. */
  avgTokensPerSecond?: number;
  latencyStdDev: number;
  errorRate: number;
  /** Optional provider/model observed failure rate. Falls back to errorRate. */
  failureRate?: number;
  /** T10: Optional account tier for priority boosting (Ultra > Pro > Free) */
  accountTier?: "ultra" | "pro" | "standard" | "free";
  /** T10: Optional quota reset interval in seconds (shorter = higher priority when same quota) */
  quotaResetIntervalSecs?: number;
  /** Score [0..1] for staying on the current session's provider/account/model path. */
  contextAffinity?: number;
  /** Score [0..1] for quota reset-window preference; sooner selected reset windows score higher. */
  resetWindowAffinity?: number;
  connectionPoolSize?: number;
  connectionId?: string;
}

export interface ScoredProvider {
  provider: string;
  model: string;
  score: number;
  factors: ScoringFactors;
  connectionId?: string;
}

/**
 * Calculate weighted score from factors.
 * Supports tierAffinity + specificityMatch weights when manifest routing is enabled.
 */
export function calculateScore(factors: ScoringFactors, weights: ScoringWeights): number {
  // clamp01 bounds the result to [0,1] and maps a non-finite sum (a NaN factor)
  // to 0, so a single bad input can't yield NaN (which sorts nondeterministically)
  // or a score >1 from float drift in weights that nominally sum to 1.
  return clamp01(
    weights.quota * factors.quota +
      weights.health * factors.health +
      weights.costInv * factors.costInv +
      weights.latencyInv * factors.latencyInv +
      weights.taskFit * factors.taskFit +
      weights.stability * factors.stability +
      weights.tierPriority * factors.tierPriority +
      (weights.tierAffinity ?? 0) * factors.tierAffinity +
      (weights.specificityMatch ?? 0) * factors.specificityMatch +
      (weights.contextAffinity ?? 0) * factors.contextAffinity +
      (weights.resetWindowAffinity ?? 0) * factors.resetWindowAffinity +
      (weights.connectionDensity ?? 0) * factors.connectionDensity
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

  // Every factor is contractually [0,1]. clamp01 guards against bad telemetry
  // (negative quota / cost / latency, NaN, out-of-range candidate-supplied
  // affinities) so a single bad input can't produce a negative or >1 factor
  // that distorts the weighted score.
  return {
    quota: clamp01(candidate.quotaRemaining / 100),
    health:
      candidate.circuitBreakerState === "CLOSED"
        ? 1.0
        : candidate.circuitBreakerState === "HALF_OPEN"
          ? 0.5
          : 0.0,
    costInv: clamp01(1 - candidate.costPer1MTokens / maxCost),
    latencyInv: clamp01(1 - candidate.p95LatencyMs / maxLatency),
    taskFit: clamp01(getTaskFitness(candidate.model, taskType)),
    stability: clamp01(1 - candidate.latencyStdDev / maxStdDev),
    tierPriority: calculateTierScore(candidate.accountTier, candidate.quotaResetIntervalSecs),
    tierAffinity: calculateTierAffinity(candidate, manifestHint),
    specificityMatch: calculateSpecificityMatch(candidate, manifestHint),
    contextAffinity: clamp01(candidate.contextAffinity ?? 0.5),
    resetWindowAffinity: clamp01(candidate.resetWindowAffinity ?? 0.5),
    connectionDensity: clamp01(((candidate.connectionPoolSize ?? 1) - 1) / 10),
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
        connectionId: candidate.connectionId,
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
