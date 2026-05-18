/**
 * Mode Packs - Pre-defined weight profiles for Auto-Combo scoring.
 *
 * Each pack optimizes for a different priority:
 *   - ship-fast:       Prioritize latency and health
 *   - cost-saver:      Prioritize cost efficiency
 *   - quality-first:   Prioritize task fitness and stability
 *   - offline-friendly: Prioritize quota availability
 */

import type { ScoringWeights } from "./scoring";

export const MODE_PACKS: Record<string, ScoringWeights> = {
  // Prioritize latency and health.
  "ship-fast": {
    quota: 0.15,
    health: 0.25,
    costInv: 0.05,
    latencyInv: 0.3,
    taskFit: 0.1,
    stability: 0.0,
    tierPriority: 0.05,
    tierAffinity: 0.05,
    specificityMatch: 0.05,
  },
  // Prioritize cost.
  "cost-saver": {
    quota: 0.15,
    health: 0.15,
    costInv: 0.35,
    latencyInv: 0.05,
    taskFit: 0.1,
    stability: 0.05,
    tierPriority: 0.05,
    tierAffinity: 0.02,
    specificityMatch: 0.03,
  },
  // Prioritize task fitness.
  "quality-first": {
    quota: 0.1,
    health: 0.15,
    costInv: 0.05,
    latencyInv: 0.05,
    taskFit: 0.35,
    stability: 0.1,
    tierPriority: 0.05,
    tierAffinity: 0.05,
    specificityMatch: 0.1,
  },
  // Prioritize quota availability.
  "offline-friendly": {
    quota: 0.35,
    health: 0.25,
    costInv: 0.1,
    latencyInv: 0.05,
    taskFit: 0.0,
    stability: 0.1,
    tierPriority: 0.05,
    tierAffinity: 0.05,
    specificityMatch: 0.05,
  },
};

/**
 * Get a mode pack by name, falling back to default weights.
 */
export function getModePack(name: string): ScoringWeights | undefined {
  return MODE_PACKS[name];
}

/**
 * Get all available mode pack names.
 */
export function getModePackNames(): string[] {
  return Object.keys(MODE_PACKS);
}
