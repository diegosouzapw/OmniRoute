/**
 * Mode Packs — Pre-defined weight profiles for Auto-Combo scoring.
 *
 * Each pack optimizes for a different priority:
 *   - ship-fast:       Prioritize latency and health
 *   - cost-saver:      Prioritize cost efficiency
 *   - quality-first:   Prioritize task fitness and stability (quality vitrine 0.03)
 *   - offline-friendly: Prioritize quota availability
 *   - reliability-first: Prioritize health+stability, reliability vitrine 0.04
 *   - chaos-mode:      Fault-injection — health > stability > taskFit
 */

import type { ScoringWeights } from "./scoring";

export const MODE_PACKS: Record<string, ScoringWeights> = {
  // Prioritize latency → health. tierPriority replaces 0.05 from stability.
  // tierAffinity/specificityMatch stay at 0 (manifest-routing-only weights).
  "ship-fast": {
    quota: 0.1133,
    health: 0.2667,
    costInv: 0.0276,
    latencyInv: 0.3048,
    taskFit: 0.0952,
    stability: 0,
    tierPriority: 0.0376,
    tierAffinity: 0,
    specificityMatch: 0,
    contextAffinity: 0.0095,
    sessionAvailability: 0.0476,
    resetWindowAffinity: 0,
    connectionDensity: 0.0476,
    quality: 0.02,
    reliability: 0.03,
  },
  // Prioritize cost. tierPriority replaces 0.05 from stability.
  "cost-saver": {
    quota: 0.1133,
    health: 0.181,
    costInv: 0.3324,
    latencyInv: 0.0476,
    taskFit: 0.0952,
    stability: 0.0476,
    tierPriority: 0.0376,
    tierAffinity: 0,
    specificityMatch: 0,
    contextAffinity: 0,
    sessionAvailability: 0.0476,
    resetWindowAffinity: 0,
    connectionDensity: 0.0476,
    quality: 0.02,
    reliability: 0.03,
  },
  // Prioritize task fitness. tierPriority replaces 0.05 from latencyInv.
  "quality-first": {
    quota: 0.0752,
    health: 0.1714,
    costInv: 0.0276,
    latencyInv: 0.0476,
    taskFit: 0.3524,
    stability: 0.1429,
    tierPriority: 0.0276,
    tierAffinity: 0,
    specificityMatch: 0,
    contextAffinity: 0,
    sessionAvailability: 0.0476,
    resetWindowAffinity: 0,
    connectionDensity: 0.0476,
    quality: 0.03,
    reliability: 0.03,
  },
  // Prioritize quota availability. tierPriority replaces 0.05 from taskFit.
  "offline-friendly": {
    quota: 0.3324,
    health: 0.2667,
    costInv: 0.0752,
    latencyInv: 0.0476,
    taskFit: 0,
    stability: 0.0952,
    tierPriority: 0.0376,
    tierAffinity: 0,
    specificityMatch: 0,
    contextAffinity: 0,
    sessionAvailability: 0.0476,
    resetWindowAffinity: 0,
    connectionDensity: 0.0476,
    quality: 0.02,
    reliability: 0.03,
  },
  // #4235 `:reliable` — prioritize healthy, low-variance providers (high availability).
  // health (circuit-breaker) + stability (latency std-dev) dominate; weights sum to ~1.0
  // (re-normalized after #8940 added sessionAvailability without rebalancing — #9985).
  "reliability-first": {
    quota: 0.1133,
    health: 0.3524,
    costInv: 0.0181,
    latencyInv: 0.0476,
    taskFit: 0.0952,
    stability: 0.1905,
    tierPriority: 0.0276,
    tierAffinity: 0,
    specificityMatch: 0,
    contextAffinity: 0,
    sessionAvailability: 0.0476,
    resetWindowAffinity: 0,
    connectionDensity: 0.0476,
    quality: 0.02,
    reliability: 0.04,
  },
  // Chaos mode — priority: health > stability > taskFit > latency.
  // Selects top-N healthy providers for parallel dispatch. Favors providers with
  // closed circuit breakers, low latency variance, and high task fitness.
  // quota weight reduced (chaos fans out in parallel, quota diversity is secondary
  // to picking the most stable providers); connectionDensity boosted slightly to
  // prefer providers with multiple accounts (more resilient to per-account rate limits).
  "chaos-mode": {
    quota: 0.0376,
    health: 0.4,
    costInv: 0.014,
    latencyInv: 0.0186,
    taskFit: 0.1905,
    stability: 0.1714,
    tierPriority: 0.004,
    tierAffinity: 0,
    specificityMatch: 0,
    contextAffinity: 0.0186,
    sessionAvailability: 0.0476,
    resetWindowAffinity: 0,
    connectionDensity: 0.0476,
    quality: 0.02,
    reliability: 0.03,
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
