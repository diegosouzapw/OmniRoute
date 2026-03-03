/**
 * Mode Packs — Pre-defined weight profiles for Auto-Combo scoring.
 *
 * Each pack optimizes for a different priority:
 *   - ship-fast:       Prioritize latency and health
 *   - cost-saver:      Prioritize cost efficiency
 *   - quality-first:   Prioritize task fitness and stability
 *   - offline-friendly: Prioritize quota availability
 */

import type { ScoringWeights } from "./scoring";

export const MODE_PACKS: Record<string, ScoringWeights> = {
  "ship-fast": {
    quota: 0.15,
    health: 0.3,
    costInv: 0.05,
    latencyInv: 0.35,
    taskFit: 0.1,
    stability: 0.05,
  },
  "cost-saver": {
    quota: 0.15,
    health: 0.2,
    costInv: 0.4,
    latencyInv: 0.05,
    taskFit: 0.1,
    stability: 0.1,
  },
  "quality-first": {
    quota: 0.1,
    health: 0.2,
    costInv: 0.05,
    latencyInv: 0.1,
    taskFit: 0.4,
    stability: 0.15,
  },
  "offline-friendly": {
    quota: 0.4,
    health: 0.3,
    costInv: 0.1,
    latencyInv: 0.05,
    taskFit: 0.05,
    stability: 0.1,
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
