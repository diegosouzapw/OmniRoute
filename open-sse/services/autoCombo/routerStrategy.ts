/**
 * RouterStrategy — Pluggable Routing Strategy System
 *
 * Inspired by ClawRouter commit 14c83c258 "refactor: extract routing into pluggable RouterStrategy system".
 * Provides a RouterStrategy interface and two built-in implementations:
 *   - RulesStrategy (default): wraps the existing 6-factor scoring engine
 *   - CostStrategy: always picks cheapest available model
 */

import type { ProviderCandidate, ScoredProvider } from "./scoring.ts";
import { scorePool } from "./scoring.ts";
import { getTaskFitness } from "./taskFitness.ts";

export interface RoutingContext {
  taskType: string;
  requestHasTools?: boolean;
  requestHasVision?: boolean;
  estimatedInputTokens?: number;
  lastKnownGoodProvider?: string;
  lkgpEnabled?: boolean;
}

export interface RoutingDecision {
  provider: string;
  model: string;
  strategy: string;
  reason: string;
  candidatesConsidered: number;
  finalScore: number;
}

export interface RouterStrategy {
  readonly name: string;
  readonly description: string;
  select(pool: ProviderCandidate[], context: RoutingContext): RoutingDecision;
}

// ── RulesStrategy: wraps 6-factor scoring engine ────────────────────────────

class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description =
    "6-factor weighted scoring: quota, health, cost, latency, taskFit, stability";

  select(pool: ProviderCandidate[], context: RoutingContext): RoutingDecision {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked: ScoredProvider[] = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    const best = ranked[0];
    if (!best) throw new Error("[RulesStrategy] No candidates to score");
    return {
      provider: best.provider,
      model: best.model,
      strategy: this.name,
      reason: `RulesStrategy: score=${best.score.toFixed(3)} (quota=${best.factors.quota.toFixed(2)}, health=${best.factors.health.toFixed(2)}, cost=${best.factors.costInv.toFixed(2)}, taskFit=${best.factors.taskFit.toFixed(2)})`,
      candidatesConsidered: ranked.length,
      finalScore: best.score,
    };
  }
}

// ── CostStrategy: always picks cheapest healthy provider ─────────────────────

class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider (by costPer1MTokens)";

  select(pool: ProviderCandidate[], context: RoutingContext): RoutingDecision {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const candidates = healthy.length > 0 ? healthy : pool;
    const sorted = [...candidates].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    const best = sorted[0];
    if (!best) throw new Error("[CostStrategy] No candidates available");
    return {
      provider: best.provider,
      model: best.model,
      strategy: this.name,
      reason: `CostStrategy: cheapest at $${best.costPer1MTokens.toFixed(3)}/1M tokens`,
      candidatesConsidered: candidates.length,
      finalScore: best.costPer1MTokens === 0 ? 1.0 : 1 / best.costPer1MTokens,
    };
  }
}

// ── LatencyStrategy: prioritize low latency + reliability ───────────────────

class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool: ProviderCandidate[], context: RoutingContext): RoutingDecision {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const candidates = healthy.length > 0 ? healthy : pool;
    const sorted = [...candidates].sort((a, b) => {
      const aPenalty = a.errorRate * 1000;
      const bPenalty = b.errorRate * 1000;
      return a.p95LatencyMs + aPenalty - (b.p95LatencyMs + bPenalty);
    });
    const best = sorted[0];
    if (!best) throw new Error("[LatencyStrategy] No candidates available");

    const latencyScore = best.p95LatencyMs > 0 ? Math.max(0.001, 10_000 / best.p95LatencyMs) : 1;
    const reliability = Math.max(0, 1 - best.errorRate);
    const finalScore = latencyScore * 0.7 + reliability * 0.3;

    return {
      provider: best.provider,
      model: best.model,
      strategy: this.name,
      reason: `LatencyStrategy: p95=${best.p95LatencyMs}ms, errorRate=${(best.errorRate * 100).toFixed(2)}%`,
      candidatesConsidered: candidates.length,
      finalScore,
    };
  }
}

// ── LKGPStrategy: tries last known good provider first ───────────────────────

class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool: ProviderCandidate[], context: RoutingContext): RoutingDecision {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        const best = candidates[0];
        return {
          provider: best.provider,
          model: best.model,
          strategy: this.name,
          reason: `LKGP: using last known good provider ${best.provider}`,
          candidatesConsidered: 1,
          finalScore: 1.0,
        };
      }
    }

    // Fallback to rules strategy
    return getStrategy("rules").select(pool, context);
  }
}

// ── Registry ──────────────────────────────────────────────────────────────────

const strategyRegistry = new Map<string, RouterStrategy>();

const rulesStrategy = new RulesStrategyImpl();
const costStrategy = new CostStrategyImpl();
const latencyStrategy = new LatencyStrategyImpl();
const lkgpStrategy = new LKGPStrategyImpl();

strategyRegistry.set("rules", rulesStrategy);
strategyRegistry.set("cost", costStrategy);
strategyRegistry.set("eco", costStrategy); // alias
strategyRegistry.set("latency", latencyStrategy);
strategyRegistry.set("fast", latencyStrategy); // alias
strategyRegistry.set("lkgp", lkgpStrategy);

export function getStrategy(name: string): RouterStrategy {
  const strategy = strategyRegistry.get(name);
  if (!strategy) {
    console.warn(`[RouterStrategy] Strategy '${name}' not found, falling back to 'rules'`);
    return rulesStrategy;
  }
  return strategy;
}

export function registerStrategy(name: string, strategy: RouterStrategy): void {
  if (strategyRegistry.has(name)) {
    console.warn(`[RouterStrategy] Overwriting strategy '${name}'`);
  }
  strategyRegistry.set(name, strategy);
}

export function listStrategies(): Array<{ name: string; description: string }> {
  return [...strategyRegistry.entries()].map(([name, s]) => ({ name, description: s.description }));
}

export function selectWithStrategy(
  pool: ProviderCandidate[],
  context: RoutingContext,
  strategyName = "rules"
): RoutingDecision {
  return getStrategy(strategyName).select(pool, context);
}
