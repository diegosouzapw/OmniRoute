/**
 * Speed-optimized Provider×Model Ranking
 *
 * Pure, framework-free scoring function that ranks provider×model candidates by
 * the speed/reliability combination most likely to make a request feel "fast":
 *
 *   - lower avg Time-To-First-Token (TTFT)        — perceived responsiveness
 *   - higher avg tokens-per-second (TPS)          — generation throughput
 *   - lower avg end-to-end (E2E) latency          — full completion time
 *   - lower p95 latency                           — tail-risk backup metric
 *   - higher circuit-breaker health               — must be reachable
 *   - lower failure / error rate                  — speed without flake
 *   - lower latency standard deviation (stability)— consistent, not bursty
 *
 * Every metric is optional; missing telemetry is treated as the pool median
 * (i.e. 0.5 in [0..1]) so a brand-new provider/model does not get crushed, but
 * also does not get a free pass on a metric we have no data for.  This mirrors
 * the behavior of the existing `LatencyStrategyImpl` and is intentional — the
 * function is the canonical ranking for the "fastest reliable provider-model"
 * UX in the playground + MCP `omniroute_pick_fastest_model` tool, and is
 * reused by the runtime `LatencyStrategyImpl` so the runtime router picks the
 * same winner as the user-facing preview.
 *
 * Optional weights override defaults so callers (tests, dashboards, future
 * `modePacks.speed-first`) can rebalance without duplicating the math.
 */

import type { ProviderCandidate } from "./scoring.ts";

/** Optional per-candidate telemetry surfaced by the ranking. */
export interface SpeedCandidate extends ProviderCandidate {
  /** Numeric health score [0..1]; computed from circuitBreakerState when missing. */
  health?: number;
  /** Percentage quota remaining in [0..100]. Falls back to quotaRemaining. */
  quotaRemainingPct?: number;
  /** Numeric capacity score [0..1] in case the caller wants to expose it. */
  capacityScore?: number;
  /** Cached cost-per-1k tokens (denormalized from costPer1MTokens). */
  costPer1k?: number;
  /** Optional quality score for the candidate (e.g. eval benchmark). */
  qualityScore?: number;
  /** Optional strategic boost applied for premium/internal models. */
  strategicBoost?: number;
  /** Optional SLO-violation penalty that should be subtracted from the raw score. */
  sloPenalty?: number;
}

/** Per-factor contribution of a single candidate (each value clamped to [0..1]). */
export interface SpeedFactors {
  ttft: number;
  tps: number;
  e2e: number;
  p95: number;
  health: number;
  reliability: number;
  stability: number;
}

/** Result of ranking a pool of candidates. */
export interface SpeedRankedCandidate {
  provider: string;
  model: string;
  /** Final composite score in [0..1]; higher is faster+more-reliable. */
  score: number;
  factors: SpeedFactors;
  /** Raw telemetry we observed for the candidate (in provider-native units). */
  metrics: {
    avgTtftMs: number | null;
    avgTokensPerSecond: number | null;
    avgE2ELatencyMs: number | null;
    p95LatencyMs?: number | null;
    latencyStdDev: number | null;
    failureRate: number;
    circuitBreakerState: SpeedCandidate["circuitBreakerState"];
  };
  /** Human-readable explanation of why this candidate earned its score. */
  reason: string;
}

/** Caller-tunable weights; defaults are documented at each property. */
export interface SpeedRankingWeights {
  /** Weight for TTFT (default 0.25). */
  ttft: number;
  /** Weight for tokens/sec (default 0.20). */
  tps: number;
  /** Weight for end-to-end latency (default 0.18). */
  e2e: number;
  /** Weight for p95 latency fallback (default 0.12). */
  p95: number;
  /** Weight for circuit-breaker health (default 0.05). */
  health: number;
  /** Weight for reliability = 1 - failureRate (default 0.15). */
  reliability: number;
  /** Weight for latency stability / low std-dev (default 0.05). */
  stability: number;
}

/**
 * Default weights — these sum to 1.0 and bias toward perceived speed (TTFT +
 * TPS together account for 45% of the score) while still penalizing unsafe
 * providers.  They are deliberately exported so the playground UI can render
 * the formula and tests can pin it.
 */
export const DEFAULT_SPEED_WEIGHTS: SpeedRankingWeights = {
  ttft: 0.25,
  tps: 0.2,
  e2e: 0.18,
  p95: 0.12,
  health: 0.05,
  reliability: 0.15,
  stability: 0.05,
};

/** Human-readable label for each weight key — used in `reason` strings. */
const FACTOR_LABEL: Record<keyof SpeedRankingWeights, string> = {
  ttft: "ttft",
  tps: "tps",
  e2e: "e2e",
  p95: "p95",
  health: "health",
  reliability: "reliability",
  stability: "stability",
};

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function positiveFinite(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}

function toBoundedRate(value: number | null | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return 0;
  return Math.min(1, value);
}

/**
 * Pool-relative maximum for "lower is better" metrics.  Returns at least
 * `floor` so a candidate with the only positive measurement does not divide
 * by zero.
 */
function poolMax<T>(
  values: ReadonlyArray<T>,
  readMetric: (value: T) => number | null,
  floor = 1
): number {
  let max = floor;
  for (const value of values) {
    const v = readMetric(value);
    if (v != null && v > max) max = v;
  }
  return max;
}

/**
 * Pool-relative maximum for "higher is better" metrics.  Returns at least
 * `floor` so a missing metric does not yield Infinity downstream.
 */
function poolMaxHigherBetter<T>(
  values: ReadonlyArray<T>,
  readMetric: (value: T) => number | null,
  floor = 0.000_001
): number {
  let max = floor;
  for (const value of values) {
    const v = readMetric(value);
    if (v != null && v > max) max = v;
  }
  return max;
}

/** 1 - (value / max), clamped to [0..1]. Missing → 0.5 (pool median). */
function lowerIsBetter(value: number | null | undefined, max: number): number {
  if (value == null) return 0.5;
  if (!Number.isFinite(value) || value < 0) return 0;
  if (!Number.isFinite(max) || max <= 0) return 1;
  return clamp01(1 - value / max);
}

/** value / max, clamped to [0..1]. Missing → 0.5. */
function higherIsBetter(value: number | null | undefined, max: number): number {
  if (value == null) return 0.5;
  if (!Number.isFinite(value) || value < 0) return 0;
  if (!Number.isFinite(max) || max <= 0) return 0;
  return clamp01(value / max);
}

function healthScoreFor(state: SpeedCandidate["circuitBreakerState"]): number {
  if (state === "CLOSED") return 1;
  if (state === "HALF_OPEN") return 0.5;
  return 0; // OPEN — caller is expected to filter these out beforehand, but be defensive.
}

function speedPoolMaxima(pool: ReadonlyArray<SpeedCandidate>) {
  return {
    ttft: poolMax(pool, (c) => positiveFinite(c.avgTtftMs) ?? positiveFinite(c.p95LatencyMs)),
    e2e: poolMax(pool, (c) => positiveFinite(c.avgE2ELatencyMs) ?? positiveFinite(c.p95LatencyMs)),
    p95: poolMax(pool, (c) => positiveFinite(c.p95LatencyMs)),
    tps: poolMaxHigherBetter(pool, (c) => positiveFinite(c.avgTokensPerSecond)),
    stdDev: poolMax(pool, (c) => positiveFinite(c.latencyStdDev), 0.001),
  };
}

function speedFactorsFor(
  candidate: SpeedCandidate,
  maxima: ReturnType<typeof speedPoolMaxima>,
  failureRate: number
): SpeedFactors {
  return {
    ttft: lowerIsBetter(positiveFinite(candidate.avgTtftMs), maxima.ttft),
    tps: higherIsBetter(positiveFinite(candidate.avgTokensPerSecond), maxima.tps),
    e2e: lowerIsBetter(positiveFinite(candidate.avgE2ELatencyMs), maxima.e2e),
    p95: lowerIsBetter(positiveFinite(candidate.p95LatencyMs), maxima.p95),
    health: healthScoreFor(candidate.circuitBreakerState),
    reliability: clamp01(1 - failureRate),
    stability: lowerIsBetter(positiveFinite(candidate.latencyStdDev), maxima.stdDev),
  };
}

function weightedSpeedScore(factors: SpeedFactors, weights: SpeedRankingWeights): number {
  return (
    factors.ttft * weights.ttft +
    factors.tps * weights.tps +
    factors.e2e * weights.e2e +
    factors.p95 * weights.p95 +
    factors.health * weights.health +
    factors.reliability * weights.reliability +
    factors.stability * weights.stability
  );
}

function applySpeedPenalties(weightedSum: number, factors: SpeedFactors): number {
  const reliabilityMultiplier = Math.max(0.05, Math.pow(0.25 + 0.75 * factors.reliability, 2));
  const stabilityMultiplier = Math.max(0.05, Math.pow(0.25 + 0.75 * factors.stability, 2));
  return clamp01(weightedSum * reliabilityMultiplier * stabilityMultiplier * Math.max(0.25, factors.health));
}

function speedReason(candidate: SpeedCandidate, factors: SpeedFactors, metrics: SpeedRankedCandidate["metrics"]): string {
  const reasonParts = [
    `ttft=${metrics.avgTtftMs == null ? "n/a" : `${Math.round(metrics.avgTtftMs)}ms`}`,
    `tps=${metrics.avgTokensPerSecond == null ? "n/a" : metrics.avgTokensPerSecond.toFixed(1)}`,
    `e2e=${metrics.avgE2ELatencyMs == null ? "n/a" : `${Math.round(metrics.avgE2ELatencyMs)}ms`}`,
    `p95=${metrics.p95LatencyMs == null ? "n/a" : `${Math.round(metrics.p95LatencyMs)}ms`}`,
    `failRate=${(metrics.failureRate * 100).toFixed(2)}%`,
    `cb=${candidate.circuitBreakerState}`,
  ];
  return `SpeedRanking[${FACTOR_LABEL.ttft}=${factors.ttft.toFixed(2)}, ${FACTOR_LABEL.tps}=${factors.tps.toFixed(2)}, ${FACTOR_LABEL.e2e}=${factors.e2e.toFixed(2)}, ${FACTOR_LABEL.p95}=${factors.p95.toFixed(2)}, ${FACTOR_LABEL.reliability}=${factors.reliability.toFixed(2)}, ${FACTOR_LABEL.health}=${factors.health.toFixed(2)}, ${FACTOR_LABEL.stability}=${factors.stability.toFixed(2)}] → ${reasonParts.join(", ")}`;
}

/**
 * Rank candidates for the speed-optimized routing mode.
 *
 * @param candidates Pool of provider×model candidates (typically the candidates
 *   inside an auto combo's provider pool, or any list assembled by the
 *   playground / MCP tool).
 * @param weights Optional weight overrides — defaults to {@link DEFAULT_SPEED_WEIGHTS}.
 * @param options.includeUnhealthy If false (default), OPEN circuit-breaker
 *   candidates are dropped before scoring. If true, they are scored with a
 *   health factor of 0 and a reliability factor of 0 so they sort to the
 *   bottom without changing the rest of the ranking.
 * @returns The full ranked list, highest score first.  The first entry is the
 *   "fastest reliable provider-model pair" for this pool.
 */
export function rankBySpeed(
  candidates: ReadonlyArray<SpeedCandidate>,
  weights: SpeedRankingWeights = DEFAULT_SPEED_WEIGHTS,
  options: { includeUnhealthy?: boolean } = {}
): SpeedRankedCandidate[] {
  if (candidates.length === 0) return [];

  const pool = options.includeUnhealthy
    ? [...candidates]
    : candidates.filter((c) => c.circuitBreakerState !== "OPEN");
  if (pool.length === 0) return [];

  const maxima = speedPoolMaxima(pool);

  const ranked = pool.map((candidate) => {
    const p95 = positiveFinite(candidate.p95LatencyMs);
    const ttft = positiveFinite(candidate.avgTtftMs);
    const e2e = positiveFinite(candidate.avgE2ELatencyMs);
    const tps = positiveFinite(candidate.avgTokensPerSecond);
    const stdDev = positiveFinite(candidate.latencyStdDev);
    const failureRate = toBoundedRate(
      candidate.failureRate ?? (typeof candidate.errorRate === "number" ? candidate.errorRate : 0)
    );
    const factors = speedFactorsFor(candidate, maxima, failureRate);
    const score = applySpeedPenalties(weightedSpeedScore(factors, weights), factors);
    const metrics = {
      avgTtftMs: ttft,
      avgTokensPerSecond: tps,
      avgE2ELatencyMs: e2e,
      p95LatencyMs: p95,
      latencyStdDev: stdDev,
      failureRate,
      circuitBreakerState: candidate.circuitBreakerState,
    };

    return {
      provider: candidate.provider,
      model: candidate.model,
      score,
      factors,
      metrics,
      reason: speedReason(candidate, factors, metrics),
    };
  });

  return ranked.sort((a, b) => b.score - a.score);
}

/**
 * Convenience selector — returns the top-ranked candidate or `null` when the
 * pool is empty.  Used by the runtime `LatencyStrategyImpl` and the MCP
 * `omniroute_pick_fastest_model` tool when only the winner is needed.
 */
export function pickFastest(
  candidates: ReadonlyArray<SpeedCandidate>,
  weights: SpeedRankingWeights = DEFAULT_SPEED_WEIGHTS
): SpeedRankedCandidate | null {
  const ranked = rankBySpeed(candidates, weights);
  return ranked.length > 0 ? ranked[0] : null;
}
