// @ts-check
/**
 * Combo Resolver — FASE-09 Domain Extraction (T-46)
 *
 * Extracts combo resolution logic from handleChat into a dedicated
 * domain service. Handles model selection based on combo strategy
 * (priority, round-robin, random, least-used).
 *
 * @module domain/comboResolver
 */

/**
 * @typedef {import('./types.js').Combo} Combo
 */

/** @type {Map<string, number>} Persistent round-robin counters per combo */
const roundRobinCounters = new Map();

/**
 * Resolve which model to use from a combo based on its strategy.
 *
 * @param {Combo} combo - The combo configuration
 * @param {{ modelUsageCounts?: Record<string, number> }} [context] - Optional context
 * @returns {{ model: string, index: number }}
 * @throws {Error} If combo has no models
 */
export function resolveComboModel(combo: any, context: any = {}) {
  const models = combo.models || [];
  if (models.length === 0) {
    throw new Error(`Combo "${combo.name}" has no models configured`);
  }

  // Normalize models to { model, weight } format
  const normalized = models.map((m) => (typeof m === "string" ? { model: m, weight: 1 } : m));

  const strategy = combo.strategy || "priority";

  switch (strategy) {
    case "priority":
      return { model: normalized[0].model, index: 0 };

    case "round-robin": {
      // Persistent counter per combo for deterministic round-robin
      const comboKey = combo.id || combo.name || "default";
      if (!roundRobinCounters.has(comboKey)) {
        roundRobinCounters.set(comboKey, 0);
      }
      const counter = roundRobinCounters.get(comboKey);
      const index = counter % normalized.length;
      roundRobinCounters.set(comboKey, counter + 1);
      return { model: normalized[index].model, index };
    }

    case "random": {
      // Weighted random selection
      const totalWeight = normalized.reduce((sum, m) => sum + (m.weight || 1), 0);
      let rand = Math.random() * totalWeight;

      for (let i = 0; i < normalized.length; i++) {
        rand -= normalized[i].weight || 1;
        if (rand <= 0) {
          return { model: normalized[i].model, index: i };
        }
      }
      return { model: normalized[0].model, index: 0 };
    }

    case "least-used": {
      const usageCounts = context.modelUsageCounts || {};
      let minUsage = Infinity;
      let minIndex = 0;

      for (let i = 0; i < normalized.length; i++) {
        const usage = usageCounts[normalized[i].model] || 0;
        if (usage < minUsage) {
          minUsage = usage;
          minIndex = i;
        }
      }

      return { model: normalized[minIndex].model, index: minIndex };
    }

    default:
      return { model: normalized[0].model, index: 0 };
  }
}

/**
 * Get the fallback models for a combo (all models except the primary).
 *
 * @param {Combo} combo
 * @param {number} primaryIndex - Index of the primary model
 * @returns {string[]} Remaining models in order
 */
export function getComboFallbacks(combo, primaryIndex) {
  const models = (combo.models || []).map((m) => (typeof m === "string" ? m : m.model));
  return [...models.slice(primaryIndex + 1), ...models.slice(0, primaryIndex)];
}
