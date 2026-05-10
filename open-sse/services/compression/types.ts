/**
 * Compression Pipeline Types — Lite, Caveman, Aggressive, Ultra, RTK, and Stacked modes.
 *
 * Shared type definitions for the compression pipeline.
 * Phase 1: 'off' and 'lite' modes.
 * Phase 2: 'standard' mode (caveman engine).
 * Phase 3: 'aggressive' mode (summarization + tool compression + aging).
 * Phase 4: 'ultra' mode (heuristic token pruning + optional SLM tier).
 * Phase 5: 'rtk' and 'stacked' modes (tool-output filters + multi-engine pipeline).
 */

export type CompressionMode =
  | "off"
  | "lite"
  | "standard"
  | "aggressive"
  | "ultra"
  | "rtk"
  | "stacked";
export type CavemanIntensity = "lite" | "full" | "ultra";
export type RtkIntensity = "minimal" | "standard" | "aggressive";
export type RtkRawOutputRetention = "never" | "failures" | "always";
export type CompressionEngineId = "lite" | "caveman" | "aggressive" | "ultra" | "rtk";

export interface CavemanRule {
  name: string;
  pattern: RegExp;
  replacement: string | ((match: string, ...groups: string[]) => string);
  context: "all" | "user" | "system" | "assistant";
  preservePatterns?: RegExp[];
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  description?: string;
  minIntensity?: CavemanIntensity;
}

export interface CavemanConfig {
  enabled: boolean;
  compressRoles: ("user" | "assistant" | "system")[];
  skipRules: string[];
  minMessageLength: number;
  preservePatterns: string[];
  intensity: CavemanIntensity;
  language?: string;
  autoDetectLanguage?: boolean;
  enabledLanguagePacks?: string[];
}

export interface CavemanOutputModeConfig {
  enabled: boolean;
  intensity: CavemanIntensity;
  autoClarity: boolean;
}

export interface RtkConfig {
  enabled: boolean;
  intensity: RtkIntensity;
  applyToToolResults: boolean;
  applyToCodeBlocks: boolean;
  applyToAssistantMessages: boolean;
  enabledFilters: string[];
  disabledFilters: string[];
  maxLinesPerResult: number;
  maxCharsPerResult: number;
  deduplicateThreshold: number;
  customFiltersEnabled: boolean;
  trustProjectFilters: boolean;
  rawOutputRetention: RtkRawOutputRetention;
  rawOutputMaxBytes: number;
}

export interface CompressionLanguageConfig {
  enabled: boolean;
  defaultLanguage: string;
  autoDetect: boolean;
  enabledPacks: string[];
}

export interface CompressionPipelineStep {
  engine: CompressionEngineId;
  intensity?: CavemanIntensity | RtkIntensity;
  config?: Record<string, unknown>;
}

export interface CompressionConfig {
  enabled: boolean;
  defaultMode: CompressionMode;
  autoTriggerMode?: CompressionMode;
  autoTriggerTokens: number;
  cacheMinutes: number;
  preserveSystemPrompt: boolean;
  mcpDescriptionCompressionEnabled?: boolean;
  comboOverrides: Record<string, CompressionMode>;
  compressionComboId?: string | null;
  stackedPipeline?: CompressionPipelineStep[];
  cavemanConfig?: CavemanConfig;
  cavemanOutputMode?: CavemanOutputModeConfig;
  rtkConfig?: RtkConfig;
  languageConfig?: CompressionLanguageConfig;
  aggressive?: AggressiveConfig;
  ultra?: UltraConfig;
}

export interface CompressionStats {
  originalTokens: number;
  compressedTokens: number;
  savingsPercent: number;
  techniquesUsed: string[];
  mode: CompressionMode;
  engine?: string;
  compressionComboId?: string | null;
  timestamp: number;
  rulesApplied?: string[];
  durationMs?: number;
  validationWarnings?: string[];
  validationErrors?: string[];
  fallbackApplied?: boolean;
  preservedBlockCount?: number;
  rtkRawOutputPointers?: Array<{
    id: string;
    path: string;
    bytes: number;
    sha256: string;
    redacted: boolean;
  }>;
  realUsage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
    source: "provider" | "estimated" | "stream";
  };
  aggressive?: {
    summarizerSavings: number;
    toolResultSavings: number;
    agingSavings: number;
  };
  engineBreakdown?: Array<{
    engine: string;
    originalTokens: number;
    compressedTokens: number;
    savingsPercent: number;
    techniquesUsed: string[];
    rulesApplied?: string[];
    durationMs?: number;
  }>;
}

export interface CompressionResult {
  body: Record<string, unknown>;
  compressed: boolean;
  stats: CompressionStats | null;
}

export const DEFAULT_COMPRESSION_CONFIG: CompressionConfig = {
  enabled: false,
  defaultMode: "off",
  autoTriggerMode: "lite",
  autoTriggerTokens: 0,
  cacheMinutes: 5,
  preserveSystemPrompt: true,
  mcpDescriptionCompressionEnabled: true,
  comboOverrides: {},
  compressionComboId: null,
  stackedPipeline: [
    { engine: "rtk", intensity: "standard" },
    { engine: "caveman", intensity: "full" },
  ],
};

export const DEFAULT_CAVEMAN_CONFIG: CavemanConfig = {
  enabled: true,
  compressRoles: ["user"],
  skipRules: [],
  minMessageLength: 50,
  preservePatterns: [],
  intensity: "full",
};

export const DEFAULT_CAVEMAN_OUTPUT_MODE_CONFIG: CavemanOutputModeConfig = {
  enabled: false,
  intensity: "full",
  autoClarity: true,
};

export const DEFAULT_RTK_CONFIG: RtkConfig = {
  enabled: true,
  intensity: "standard",
  applyToToolResults: true,
  applyToCodeBlocks: false,
  applyToAssistantMessages: false,
  enabledFilters: [],
  disabledFilters: [],
  maxLinesPerResult: 120,
  maxCharsPerResult: 12000,
  deduplicateThreshold: 3,
  customFiltersEnabled: true,
  trustProjectFilters: false,
  rawOutputRetention: "never",
  rawOutputMaxBytes: 1_048_576,
};

export const DEFAULT_COMPRESSION_LANGUAGE_CONFIG: CompressionLanguageConfig = {
  enabled: false,
  defaultLanguage: "en",
  autoDetect: true,
  enabledPacks: ["en"],
};

/** Aging thresholds for progressive message degradation (Phase 3) */
export interface AgingThresholds {
  fullSummary: number;
  moderate: number;
  light: number;
  verbatim: number;
}

/** Tool result compression strategy toggles (Phase 3) */
export interface ToolStrategiesConfig {
  fileContent: boolean;
  grepSearch: boolean;
  shellOutput: boolean;
  json: boolean;
  errorMessage: boolean;
}

/** Configuration for aggressive compression mode (Phase 3) */
export interface AggressiveConfig {
  thresholds: AgingThresholds;
  toolStrategies: ToolStrategiesConfig;
  summarizerEnabled: boolean;
  maxTokensPerMessage: number;
  minSavingsThreshold: number;
  preserveSystemPrompt?: boolean;
}

/** Options for the Summarizer interface (Phase 3) */
export interface SummarizerOpts {
  maxLen?: number;
  preserveCode?: boolean;
}

/** Summarizer interface — rule-based default, LLM-ready for future drop-in (Phase 3) */
export interface Summarizer {
  summarize(messages: unknown[], opts?: SummarizerOpts): string;
}

/** Default aggressive configuration (Phase 3) */
export const DEFAULT_AGGRESSIVE_CONFIG: AggressiveConfig = {
  thresholds: { fullSummary: 5, moderate: 3, light: 2, verbatim: 2 },
  toolStrategies: {
    fileContent: true,
    grepSearch: true,
    shellOutput: true,
    json: true,
    errorMessage: true,
  },
  summarizerEnabled: true,
  maxTokensPerMessage: 2048,
  minSavingsThreshold: 0.05,
};

// ─── Phase 4: Ultra Compression ──────────────────────────────────────────────

export interface UltraConfig {
  /** Enable ultra compression (disabled by default). */
  enabled: boolean;
  /**
   * Fraction of tokens to keep after heuristic pruning (0–1).
   * Default 0.5 = keep 50 % of scored tokens.
   */
  compressionRate: number;
  /**
   * Minimum score threshold below which a token is eligible for pruning.
   * Tokens scoring below this value are candidates for removal.
   */
  minScoreThreshold: number;
  /**
   * When true, fall back to aggressive mode if SLM tier is requested but
   * no modelPath is configured.
   */
  slmFallbackToAggressive: boolean;
  /**
   * Optional path to a local SLM ONNX model file.
   * When absent, only the heuristic (Tier A) is used.
   */
  modelPath?: string;
  /**
   * Maximum tokens per message before ultra compression is applied.
   * 0 = always apply when mode is "ultra".
   */
  maxTokensPerMessage: number;
  preserveSystemPrompt?: boolean;
}

export const DEFAULT_ULTRA_CONFIG: UltraConfig = {
  enabled: false,
  compressionRate: 0.5,
  minScoreThreshold: 0.3,
  slmFallbackToAggressive: true,
  maxTokensPerMessage: 0,
};
