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
  // Prioritize latency → health. tierPriority replaces 0.05 from stability.
  // tierAffinity/specificityMatch stay at 0 (manifest-routing-only weights).
  "ship-fast": {
    quota: 0.14,
    health: 0.28,
    costInv: 0.05,
    latencyInv: 0.32,
    taskFit: 0.1,
    stability: 0.0,
    tierPriority: 0.05,
    tierAffinity: 0,
    specificityMatch: 0,
    contextAffinity: 0.01,
    resetWindowAffinity: 0,
    connectionDensity: 0.05,
  },
  // Prioritize cost. tierPriority replaces 0.05 from stability.
  "cost-saver": {
    quota: 0.14,
    health: 0.19,
    costInv: 0.37,
    latencyInv: 0.05,
    taskFit: 0.1,
    stability: 0.05,
    tierPriority: 0.05,
    tierAffinity: 0,
    specificityMatch: 0,
    contextAffinity: 0.0,
    resetWindowAffinity: 0,
    connectionDensity: 0.05,
  },
  // Prioritize task fitness. tierPriority replaces 0.05 from latencyInv.
  "quality-first": {
    quota: 0.1,
    health: 0.18,
    costInv: 0.05,
    latencyInv: 0.05,
    taskFit: 0.37,
    stability: 0.15,
    tierPriority: 0.05,
    tierAffinity: 0,
    specificityMatch: 0,
    contextAffinity: 0.0,
    resetWindowAffinity: 0,
    connectionDensity: 0.05,
  },
  // Prioritize quota availability. tierPriority replaces 0.05 from taskFit.
  "offline-friendly": {
    quota: 0.37,
    health: 0.28,
    costInv: 0.1,
    latencyInv: 0.05,
    taskFit: 0.0,
    stability: 0.1,
    tierPriority: 0.05,
    tierAffinity: 0,
    specificityMatch: 0,
    contextAffinity: 0.0,
    resetWindowAffinity: 0,
    connectionDensity: 0.05,
  },
  // #4235 `:reliable` — prioritize healthy, low-variance providers (high availability).
  // health (circuit-breaker) + stability (latency std-dev) dominate; weights sum to 1.0.
  "reliability-first": {
    quota: 0.14,
    health: 0.37,
    costInv: 0.04,
    latencyInv: 0.05,
    taskFit: 0.1,
    stability: 0.2,
    tierPriority: 0.05,
    tierAffinity: 0,
    specificityMatch: 0,
    contextAffinity: 0.0,
    resetWindowAffinity: 0,
    connectionDensity: 0.05,
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
