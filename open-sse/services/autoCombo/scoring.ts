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
  cacheAffinity?: number;
  sessionAvailability?: number;
  resetWindowAffinity: number;
  connectionDensity: number;
  /**
   * Feedback-driven quality signal [0,1] from the routing-event quality tracker
   * (open-sse/services/routing/quality.ts). Optional so cold candidates with no
   * observed events default to neutral (0.5) and are never penalized.
   */
  quality?: number;
  /**
   * Observed success share over the routing window: 1 - failure rate. Optional
   * so a candidate nobody has called yet reads as 1 rather than 0 -- it has not
   * failed anything. That differs from `quality` on purpose: a score with no
   * observations is neutral at 0.5, a failure rate with no observations is 0.
   */
  reliability?: number;
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
  cacheAffinity?: number;
  sessionAvailability?: number;
  resetWindowAffinity: number;
  connectionDensity: number;
  /** Weight for the feedback-driven quality factor (#feedback-foundation). */
  quality?: number;
  /** Weight for the observed failure-rate factor. 0 by default. */
  reliability?: number;
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  quota: 0.1429,
  health: 0.1605,
  costInv: 0.1429,
  latencyInv: 0.1143,
  taskFit: 0.0762,
  stability: 0.0476,
  tierPriority: 0.0476,
  tierAffinity: 0.0476,
  specificityMatch: 0.0476,
  contextAffinity: 0.0476,
  cacheAffinity: 0,
  sessionAvailability: 0.0476,
  resetWindowAffinity: 0,
  connectionDensity: 0.0476,
  // Shifted from `health` (0.1905 → 0.1605): availability stays dominant, and
  // the new quality signal (observed output quality over time) gets a real,
  // if smaller, vote. Sum remains exactly 1.0.
  quality: 0.03,
  // Declared but silent in DEFAULT (like `cacheAffinity`/`resetWindowAffinity`):
  // every candidate already carries a measured failure rate (24h of usage
  // history behind a ten-sample floor, real-time metrics otherwise) and the
  // scorer had no way to read it. Which weight it deserves is a product call
  // backed by measurement, so DEFAULT ships at 0 and leaves the ranking as
  // it was; `reliability-first` ships at 0.04 and generic packs at 0.03.
  reliability: 0,
};

/** Normalize independently configured UI weights into a scoring distribution. */
export function normalizeScoringWeights(
  weights: Partial<ScoringWeights> | null | undefined
): ScoringWeights {
  if (!weights) return { ...DEFAULT_WEIGHTS };
  const entries = Object.keys(DEFAULT_WEIGHTS) as Array<keyof ScoringWeights>;
  const sanitized = Object.fromEntries(
    entries.map((key) => {
      const value = Number(weights?.[key]);
      return [key, Number.isFinite(value) && value >= 0 ? value : 0];
    })
  ) as unknown as ScoringWeights;
  const total = entries.reduce((sum, key) => sum + Number(sanitized[key] ?? 0), 0);
  if (total <= 0) return { ...DEFAULT_WEIGHTS };
  return Object.fromEntries(
    entries.map((key) => [key, Number(sanitized[key] ?? 0) / total])
  ) as unknown as ScoringWeights;
}

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
  /** Score [0..1] for the account selected by the stable prompt-cache key. */
  cacheAffinity?: number;
  sessionAvailability?: number;
  /** Score [0..1] for quota reset-window preference; sooner selected reset windows score higher. */
  resetWindowAffinity?: number;
  /**
   * Feedback-driven quality score [0..1] for this provider/model from the
   * routing-event quality tracker (open-sse/services/routing). Omitted/undefined
   * candidates default to a neutral 0.5 in calculateFactors.
   */
  quality?: number;
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
      (weights.cacheAffinity ?? 0) * (factors.cacheAffinity ?? 0) +
      (weights.sessionAvailability ?? 0) * (factors.sessionAvailability ?? 1) +
      (weights.resetWindowAffinity ?? 0) * factors.resetWindowAffinity +
      (weights.connectionDensity ?? 0) * factors.connectionDensity +
      // Missing quality factor → neutral 0.5: a cold candidate is neither boosted
      // (which would let optimistic initialization dominate) nor penalized.
      (weights.quality ?? 0) * (factors.quality ?? 0.5) +
      // Missing reliability factor -> neutral 1, not 0.5: a candidate with no
      // observations has not failed anything. See the field doc on ScoringFactors.
      (weights.reliability ?? 0) * (factors.reliability ?? 1)
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

/**
 * Pool-wide maxima used to normalize cost/latency/stability factors. These are
 * identical for every candidate in a given pool, so callers scoring many
 * candidates against the same pool should compute this ONCE via
 * computePoolMaxima() and pass it to calculateFactors — recomputing it inside
 * a per-candidate loop turns an O(n) scoring pass into O(n^2) (#OOM incident:
 * a zero-config "auto" combo with no explicit candidatePool can expand the
 * pool to 1000s of provider/model targets, at which point the repeated
 * `pool.map()` + spread here dominates heap churn and can OOM the process).
 */
export interface PoolMaxima {
  maxCost: number;
  maxLatency: number;
  maxStdDev: number;
}

export function computePoolMaxima(pool: ProviderCandidate[]): PoolMaxima {
  let maxCost = 0.001;
  let maxLatency = 1;
  let maxStdDev = 0.001;
  for (const p of pool) {
    if (p.costPer1MTokens > maxCost) maxCost = p.costPer1MTokens;
    if (p.p95LatencyMs > maxLatency) maxLatency = p.p95LatencyMs;
    if (p.latencyStdDev > maxStdDev) maxStdDev = p.latencyStdDev;
  }
  return { maxCost, maxLatency, maxStdDev };
}

/**
 * Bound an observed failure rate to [0,1], treating anything missing or
 * non-finite as 0 (nothing observed has failed). Mirrors `toBoundedRate` in
 * `speedRanking.ts` so both consumers of the same signal agree, including on
 * garbage input.
 */
function boundedRate(value: number | null | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return 0;
  return Math.min(1, value);
}

export function calculateFactors(
  candidate: ProviderCandidate,
  pool: ProviderCandidate[],
  taskType: string,
  getTaskFitness: (model: string, taskType: string) => number,
  manifestHint?: RoutingHint | null,
  precomputedMaxima?: PoolMaxima
): ScoringFactors {
  const { maxCost, maxLatency, maxStdDev } = precomputedMaxima ?? computePoolMaxima(pool);

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
    cacheAffinity: clamp01(candidate.cacheAffinity ?? 0),
    sessionAvailability: clamp01(candidate.sessionAvailability ?? 1),
    resetWindowAffinity: clamp01(candidate.resetWindowAffinity ?? 0.5),
    connectionDensity: clamp01(((candidate.connectionPoolSize ?? 1) - 1) / 10),
    // Feedback quality signal; neutral 0.5 when the tracker has no data yet
    // (cold providers are neither boosted nor unfairly penalized).
    quality: clamp01(candidate.quality ?? 0.5),
    // Same formula and same precedence as `speedRanking.ts` uses for its own
    // reliability factor: an explicit failure rate wins over the coarser error
    // rate, and an unobserved candidate reads as fully reliable. The rate is
    // bounded BEFORE the subtraction, exactly as `toBoundedRate` does there --
    // `clamp01(1 - NaN)` would be 0, i.e. "fails every call", which is the
    // opposite of what corrupt telemetry should mean.
    reliability: clamp01(1 - boundedRate(candidate.failureRate ?? candidate.errorRate)),
  };
}

export function scorePool(
  pool: ProviderCandidate[],
  taskType: string,
  weights: ScoringWeights = DEFAULT_WEIGHTS,
  getTaskFitness: (model: string, taskType: string) => number = () => 0.5,
  manifestHint?: RoutingHint | null
): ScoredProvider[] {
  const poolMaxima = computePoolMaxima(pool);
  return pool
    .map((candidate) => {
      const factors = calculateFactors(
        candidate,
        pool,
        taskType,
        getTaskFitness,
        manifestHint,
        poolMaxima
      );
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
