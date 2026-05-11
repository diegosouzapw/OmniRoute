/**
 * Auto-Combo barrel export
 */
export {
  calculateScore,
  calculateTierScore,
  scorePool,
  validateWeights,
  DEFAULT_WEIGHTS,
  type ScoringWeights,
  type ScoringFactors,
  type ProviderCandidate,
  type ScoredProvider,
} from "./scoring";
export { getTaskFitness, getTaskTypes } from "./taskFitness";
export { SelfHealingManager, getSelfHealingManager } from "./selfHealing";
export { MODE_PACKS, getModePack, getModePackNames } from "./modePacks";
export { selectProvider, type AutoComboConfig, type SelectionResult } from "./engine";
