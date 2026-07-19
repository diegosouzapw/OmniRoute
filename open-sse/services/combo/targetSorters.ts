/**
 * Combo target-ordering / sorting helpers extracted from combo.ts.
 *
 * Weighted selection, cost / usage / power-of-two-choices ordering, and the
 * model-entry normalizer moved out of the combo.ts god-file (Quality Gate v2 /
 * Fase 9). Logic unchanged; the helpers used by the combo handlers (which stay
 * in combo.ts) are imported back from this module. No barrel import — pure leaf.
 */

import { getCircuitBreaker } from "../../../src/shared/utils/circuitBreaker";
import { secureRandomFloat, secureRandomInt } from "../../../src/shared/utils/secureRandom";
import { getComboStepTarget, getComboStepWeight } from "../../../src/lib/combos/steps.ts";
import { getComboMetrics } from "../comboMetrics.ts";
import { parseModel } from "../model.ts";
import type { ResolvedComboTarget } from "./types.ts";

/**
 * Normalize a model entry to { model, weight }
 * Supports both legacy string format and new object format
 */
export function normalizeModelEntry(entry: unknown): { model: string; weight: number } {
  return {
    model: getComboStepTarget(entry) || "",
    weight: getComboStepWeight(entry),
  };
}

export function selectWeightedTarget<T extends { weight?: number }>(targets: T[]) {
  if (targets.length === 0) return null;

  const totalWeight = targets.reduce((sum, target) => sum + (target.weight || 0), 0);
  if (totalWeight <= 0) {
    return targets[secureRandomInt(targets.length)];
  }

  let random = secureRandomFloat() * totalWeight;
  for (const target of targets) {
    random -= target.weight || 0;
    if (random <= 0) return target;
  }

  return targets.at(-1);
}

export function orderTargetsForWeightedFallback<T extends { executionKey: string; weight: number }>(
  targets: T[],
  selectedExecutionKey: string,
  preserveExistingOrder = false
): T[] {
  const selected = targets.find((target) => target.executionKey === selectedExecutionKey);
  const rest = targets.filter((target) => target.executionKey !== selectedExecutionKey);
  if (!preserveExistingOrder) {
    rest.sort((a, b) => b.weight - a.weight);
  }
  return selected ? [selected, ...rest] : rest;
}

// shuffleArray and getNextModelFromDeck moved to src/shared/utils/shuffleDeck.ts
// combo.ts now uses the shared, mutex-protected getNextFromDeck with "combo:" namespace.

/**
 * Sort models by pricing (cheapest first) for cost-optimized strategy
 * @param {Array<string>} models - Model strings in "provider/model" format
 * @returns {Promise<Array<string>>} Sorted model strings
 */
export async function sortModelsByCost(models: string[]): Promise<string[]> {
  try {
    const { getPricingForModel } = await import("../../../src/lib/localDb");
    const withCost = await Promise.all(
      models.map(async (modelStr) => {
        const parsed = parseModel(modelStr);
        const provider = parsed.provider || parsed.providerAlias || "unknown";
        const model = parsed.model || modelStr;
        try {
          const pricing = await getPricingForModel(provider, model);
          const cost = Number(pricing?.input);
          return { modelStr, cost: Number.isFinite(cost) ? cost : Infinity };
        } catch {
          return { modelStr, cost: Infinity };
        }
      })
    );
    withCost.sort((a, b) => a.cost - b.cost);
    return withCost.map((e) => e.modelStr);
  } catch {
    // If pricing lookup fails entirely, return original order
    return models;
  }
}

export async function sortTargetsByCost(targets: ResolvedComboTarget[]) {
  const orderedModels = await sortModelsByCost(targets.map((target) => target.modelStr));
  const byModel = new Map<string, ResolvedComboTarget[]>();
  for (const target of targets) {
    const queue = byModel.get(target.modelStr) || [];
    queue.push(target);
    byModel.set(target.modelStr, queue);
  }
  return orderedModels
    .map((modelStr) => {
      const queue = byModel.get(modelStr);
      return queue?.shift() || null;
    })
    .filter((target): target is ResolvedComboTarget => target !== null);
}

export function sortTargetsByUsage(targets: ResolvedComboTarget[], comboName: string) {
  const metrics = getComboMetrics(comboName);
  if (!metrics) return targets;

  // Key on executionKey (unique per model + account) so a combo that repeats the
  // same modelStr across DISTINCT accounts distributes by per-account usage
  // instead of by the shared modelStr. The old code grouped targets under
  // modelStr and read byModel[modelStr] (which aggregates every account of that
  // model), so all accounts collapsed into one bucket and the first account
  // always won — exhausting it while the others stayed idle (#7015). Per-target
  // usage lives in byTarget[executionKey]; unknown targets rank as 0.
  const withUsage = targets.map((target) => {
    const requests = metrics.byTarget?.[target.executionKey]?.requests ?? 0;
    return { target, requests };
  });
  withUsage.sort((a, b) => a.requests - b.requests);
  return withUsage.map((e) => e.target);
}

function getP2CTargetScore(
  target: ResolvedComboTarget,
  metrics: ReturnType<typeof getComboMetrics>
): number {
  const breakerState = getCircuitBreaker(target.provider)?.getStatus?.()?.state;
  if (breakerState === "OPEN") return -Infinity;
  const modelMetric = metrics?.byModel?.[target.modelStr] || null;
  const successRate = Number(modelMetric?.successRate);
  const avgLatency = Number(modelMetric?.avgLatencyMs);
  const successScore = Number.isFinite(successRate) ? successRate / 100 : 0.5;
  const latencyScore =
    Number.isFinite(avgLatency) && avgLatency > 0 ? 1 / Math.log10(avgLatency + 10) : 0.25;
  const breakerPenalty = breakerState === "HALF_OPEN" ? 0.25 : 0;
  return successScore + latencyScore - breakerPenalty;
}

export function orderTargetsByPowerOfTwoChoices(targets: ResolvedComboTarget[], comboName: string) {
  if (targets.length <= 1) return targets;
  const metrics = getComboMetrics(comboName);
  const firstIndex = secureRandomInt(targets.length);
  let secondIndex = secureRandomInt(targets.length - 1);
  if (secondIndex >= firstIndex) secondIndex++;

  const first = targets[firstIndex];
  const second = targets[secondIndex];
  const selectedIndex =
    getP2CTargetScore(second, metrics) > getP2CTargetScore(first, metrics)
      ? secondIndex
      : firstIndex;
  return [targets[selectedIndex], ...targets.filter((_, index) => index !== selectedIndex)];
}
