export type {
  CompressionMode,
  CompressionConfig,
  CompressionStats,
  CompressionResult,
  CavemanConfig,
  CavemanRule,
  CavemanIntensity,
  CavemanOutputModeConfig,
  RtkConfig,
  RtkIntensity,
  RtkRawOutputRetention,
  CompressionEngineId,
  CompressionLanguageConfig,
  CompressionPipelineStep,
  AggressiveConfig,
  AgingThresholds,
  ToolStrategiesConfig,
  SummarizerOpts,
  Summarizer,
} from "./types.ts";

export {
  DEFAULT_COMPRESSION_CONFIG,
  DEFAULT_CAVEMAN_CONFIG,
  DEFAULT_CAVEMAN_OUTPUT_MODE_CONFIG,
  DEFAULT_RTK_CONFIG,
  DEFAULT_COMPRESSION_LANGUAGE_CONFIG,
  DEFAULT_AGGRESSIVE_CONFIG,
} from "./types.ts";

export {
  applyLiteCompression,
  collapseWhitespace,
  dedupSystemPrompt,
  compressToolResults,
  removeRedundantContent,
  replaceImageUrls,
} from "./lite.ts";

export { cavemanCompress, applyRulesToText } from "./caveman.ts";
export { getRulesForContext, getCavemanRuleMetadata, CAVEMAN_RULES } from "./cavemanRules.ts";
export {
  getAvailableLanguagePacks,
  listCavemanRulePacks,
  loadAllRulesForLanguage,
  loadCavemanFileRules,
  loadRulePack,
  validateRulePack,
} from "./ruleLoader.ts";
export type { RulePackMetadata } from "./ruleLoader.ts";
export {
  detectCompressionLanguage,
  listSupportedCompressionLanguages,
} from "./languageDetector.ts";
export {
  extractPreservedBlocks,
  restorePreservedBlocks,
  findFencedCodeBlocks,
} from "./preservation.ts";
export type { PreservedBlock, PreservationOptions } from "./preservation.ts";
export { validateCompression } from "./validation.ts";
export type { ValidationResult } from "./validation.ts";
export {
  applyCavemanOutputMode,
  buildCavemanOutputInstruction,
  shouldBypassCavemanOutputMode,
} from "./outputMode.ts";
export type { CavemanOutputModeResult } from "./outputMode.ts";
export { buildCompressionDiff, buildCompressionPreviewDiff } from "./diffHelper.ts";
export type { CompressionDiffSegment, CompressionPreviewDiff } from "./diffHelper.ts";

export {
  estimateCompressionTokens,
  createCompressionStats,
  trackCompressionStats,
  getDefaultCompressionConfig,
} from "./stats.ts";

export {
  selectCompressionStrategy,
  getEffectiveMode,
  applyCompression,
  checkComboOverride,
  shouldAutoTrigger,
  applyStackedCompression,
} from "./strategySelector.ts";

export type {
  CompressionEngine,
  CompressionEngineApplyOptions,
  CompressionEngineMetadata,
  CompressionEngineTarget,
  EngineConfigField,
  EngineRegistryEntry,
  EngineValidationResult,
} from "./engines/types.ts";

export {
  registerEngine,
  registerCompressionEngine,
  unregisterCompressionEngine,
  getEngine,
  getEngineEntry,
  getCompressionEngine,
  listEngines,
  listCompressionEngines,
  listEnabledEngines,
  setEngineEnabled,
  updateEngineConfig,
  clearCompressionEngineRegistry,
} from "./engines/registry.ts";
export { registerBuiltinCompressionEngines } from "./engines/index.ts";

export { applyRtkCompression, processRtkText, rtkEngine } from "./engines/rtk/index.ts";
export {
  detectCommandFromText,
  detectCommandOutput,
  detectCommandType,
  type CommandDetectionResult,
} from "./engines/rtk/commandDetector.ts";
export {
  loadRtkFilters,
  getRtkFilterCatalog,
  matchRtkFilter,
  getRtkFilterLoadDiagnostics,
} from "./engines/rtk/filterLoader.ts";
export { runRtkFilterTests } from "./engines/rtk/verify.ts";
export {
  maybePersistRtkRawOutput,
  readRtkRawOutput,
  redactRtkRawOutput,
} from "./engines/rtk/rawOutput.ts";
export {
  detectCodeLanguage,
  normalizeCodeLanguage,
  stripCode,
  stripCodeComments,
} from "./engines/rtk/codeStripper.ts";
export type { CodeLanguage, CodeStripperOptions } from "./engines/rtk/codeStripper.ts";

export { RuleBasedSummarizer, createSummarizer } from "./summarizer.ts";

export { compressToolResult } from "./toolResultCompressor.ts";
export type { CompressionResult as ToolCompressionResult } from "./toolResultCompressor.ts";

export { applyAging } from "./progressiveAging.ts";

export { compressAggressive } from "./aggressive.ts";

export { STOPWORDS, FORCE_PRESERVE_RE, scoreToken, pruneByScore } from "./ultraHeuristic.ts";

export type { SLMInterface, UltraCompressResult } from "./ultra.ts";
export { createSLMStub, ultraCompress } from "./ultra.ts";

export type { UltraConfig } from "./types.ts";
export { DEFAULT_ULTRA_CONFIG } from "./types.ts";
