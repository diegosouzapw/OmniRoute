/**
 * Auto-Combo Engine — The `auto` combo type that self-manages provider selection.
 *
 * Features:
 *   - Scoring-based provider selection from candidate pool
 *   - Bandit exploration (configurable rate, default 5%)
 *   - Budget cap enforcement
 *   - Self-healing integration
 *   - Mode pack support
 */

import {
  scorePool,
  validateWeights,
  DEFAULT_WEIGHTS,
  type ScoringWeights,
  type ProviderCandidate,
  type ScoredProvider,
} from "./scoring";
import { getTaskFitness } from "./taskFitness";
import { getModePack } from "./modePacks";
import { getSelfHealingManager } from "./selfHealing";

export interface AutoComboConfig {
  id: string;
  name: string;
  type: "auto";
  candidatePool: string[]; // provider names (empty = all)
  weights: ScoringWeights;
  modePack?: string;
  budgetCap?: number; // max cost per request in USD
  explorationRate: number; // 0.05 = 5% exploratory
}

export interface SelectionResult {
  provider: string;
  model: string;
  score: number;
  isExploration: boolean;
  factors: Record<string, number>;
  excluded: string[];
}

/**
 * Select the best provider from an auto-combo pool.
 */
export function selectProvider(
  config: AutoComboConfig,
  candidates: ProviderCandidate[],
  taskType: string = "default"
): SelectionResult {
  const healer = getSelfHealingManager();

  // Resolve weights from mode pack or config
  let weights = config.weights;
  if (config.modePack) {
    const pack = getModePack(config.modePack);
    if (pack) weights = pack;
  }
  if (!validateWeights(weights)) weights = DEFAULT_WEIGHTS;

  // Filter out excluded providers
  const excluded: string[] = [];
  const pool = candidates.filter((c) => {
    // Pool filter
    if (config.candidatePool.length > 0 && !config.candidatePool.includes(c.provider)) return false;

    // Self-healing exclusion
    const evaluation = healer.evaluate(c.provider, 0.5, c.circuitBreakerState);
    if (evaluation.excluded) {
      excluded.push(c.provider);
      return false;
    }
    return true;
  });

  if (pool.length === 0) {
    // Fallback: allow all candidates regardless of exclusions
    pool.push(...candidates);
    excluded.length = 0;
  }

  // Score all providers
  const scored = scorePool(pool, taskType, weights, getTaskFitness);

  // Apply self-healing re-evaluation with actual scores
  const finalCandidates = scored.filter((s) => {
    const eval_ = healer.evaluate(s.provider, s.score, "CLOSED");
    if (eval_.excluded) {
      excluded.push(s.provider);
      return false;
    }
    return true;
  });

  const candidates_ = finalCandidates.length > 0 ? finalCandidates : scored;

  // Incident mode check
  const incidentMode = healer.isInIncidentMode();
  const effectiveExplorationRate = incidentMode ? 0 : config.explorationRate;

  // Selection: exploration vs exploitation
  let selected: ScoredProvider;
  const isExploration = Math.random() < effectiveExplorationRate && candidates_.length > 1;

  if (isExploration) {
    // Random selection (bandit exploration)
    const idx = Math.floor(Math.random() * candidates_.length);
    selected = candidates_[idx];
  } else {
    // Greedy: highest score
    selected = candidates_[0];
  }

  // Budget cap enforcement
  if (config.budgetCap) {
    const candidate = candidates.find((c) => c.provider === selected.provider);
    if (candidate) {
      const estimatedCost = (candidate.costPer1MTokens / 1_000_000) * 1000; // approx for 1K tokens
      if (estimatedCost > config.budgetCap) {
        // Degrade to cheapest
        const cheapest = candidates_
          .map((s) => ({
            ...s,
            cost: candidates.find((c) => c.provider === s.provider)?.costPer1MTokens || 0,
          }))
          .sort((a, b) => a.cost - b.cost)[0];
        if (cheapest) selected = cheapest;
      }
    }
  }

  return {
    provider: selected.provider,
    model: selected.model,
    score: selected.score,
    isExploration,
    factors: selected.factors as unknown as Record<string, number>,
    excluded,
  };
}

// ============ In-Memory Auto-Combo Registry ============

const autoCombos = new Map<string, AutoComboConfig>();

export function createAutoCombo(config: Omit<AutoComboConfig, "type">): AutoComboConfig {
  const full: AutoComboConfig = { ...config, type: "auto" };
  autoCombos.set(config.id, full);
  return full;
}

export function getAutoCombo(id: string): AutoComboConfig | undefined {
  return autoCombos.get(id);
}

export function updateAutoCombo(
  id: string,
  update: Partial<AutoComboConfig>
): AutoComboConfig | undefined {
  const existing = autoCombos.get(id);
  if (!existing) return undefined;
  const updated = { ...existing, ...update, id, type: "auto" as const };
  autoCombos.set(id, updated);
  return updated;
}

export function deleteAutoCombo(id: string): boolean {
  return autoCombos.delete(id);
}

export function listAutoCombos(): AutoComboConfig[] {
  return [...autoCombos.values()];
}
