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

export interface ScoringFactors {
  quota: number;
  health: number;
  costInv: number;
  latencyInv: number;
  taskFit: number;
  stability: number;
}

export interface ScoringWeights {
  quota: number;
  health: number;
  costInv: number;
  latencyInv: number;
  taskFit: number;
  stability: number;
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  quota: 0.2,
  health: 0.25,
  costInv: 0.2,
  latencyInv: 0.15,
  taskFit: 0.1,
  stability: 0.1,
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
}

export interface ScoredProvider {
  provider: string;
  model: string;
  score: number;
  factors: ScoringFactors;
}

/**
 * Calculate weighted score from factors.
 */
export function calculateScore(factors: ScoringFactors, weights: ScoringWeights): number {
  return (
    weights.quota * factors.quota +
    weights.health * factors.health +
    weights.costInv * factors.costInv +
    weights.latencyInv * factors.latencyInv +
    weights.taskFit * factors.taskFit +
    weights.stability * factors.stability
  );
}

/**
 * Calculate individual factors for a provider within its pool.
 */
export function calculateFactors(
  candidate: ProviderCandidate,
  pool: ProviderCandidate[],
  taskType: string,
  getTaskFitness: (model: string, taskType: string) => number
): ScoringFactors {
  // Pool-wide maximums for normalization
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
  };
}

/**
 * Score and rank all providers in a pool.
 */
export function scorePool(
  pool: ProviderCandidate[],
  taskType: string,
  weights: ScoringWeights = DEFAULT_WEIGHTS,
  getTaskFitness: (model: string, taskType: string) => number = () => 0.5
): ScoredProvider[] {
  return pool
    .map((candidate) => {
      const factors = calculateFactors(candidate, pool, taskType, getTaskFitness);
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
