/**
 * Auto-Combo barrel export
 */
export {
  calculateScore,
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
export {
  selectProvider,
  createAutoCombo,
  getAutoCombo,
  updateAutoCombo,
  deleteAutoCombo,
  listAutoCombos,
  type AutoComboConfig,
  type SelectionResult,
} from "./engine";
