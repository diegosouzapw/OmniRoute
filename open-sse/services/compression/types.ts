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

import { ENGINE_IDS } from "./engineCatalog.ts";
import type { ContextBudgetConfig } from "./adaptiveCompression/types.ts";

// Re-export so consumers that already import from this module (e.g. src/lib/db/compression.ts)
// can get ENGINE_IDS without a second bare `@omniroute/open-sse/...engineCatalog.ts` specifier.
// That bare alias resolves under tsc/tsx but NOT under vitest (Vite externalizes a brand-new
// open-sse module to Node, which then can't load the `.ts` subpath), whereas this module is
// already in Vite's graph and its relative `./engineCatalog.ts` import resolves in-pipeline.
export { ENGINE_IDS };

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
export type CompressionEngineId =
  | "lite"
  | "caveman"
  | "aggressive"
  | "ultra"
  | "rtk"
  | "session-dedup"
  | "headroom"
  | "ccr"
  | "llmlingua";

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

export type OutputStyleLevel = "lite" | "full" | "ultra";

export interface OutputStyleSelectionEntry {
  id: string;
  level: OutputStyleLevel;
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
  /** R5: enable grouping of near-equivalent consecutive lines. Default: false. */
  enableGrouping?: boolean;
  /** R5: minimum consecutive similar-line run to trigger grouping. Default: 3. */
  groupingThreshold?: number;
  /** R1/N3: remove comments from fenced code blocks when stripping code. Default: false. */
  stripCodeComments?: boolean;
  /** R1/N3: keep JSDoc/docstring block comments when removing comments. Default: true. */
  preserveDocstrings?: boolean;
}

export interface CompressionLanguageConfig {
  enabled: boolean;
  defaultLanguage: string;
  autoDetect: boolean;
  enabledPacks: string[];
}

/**
 * Provider-delegated compression (Anthropic "Context Editing", beta
 * `context-management-2025-06-27`). Claude/Anthropic only — the provider clears
 * old tool-use blocks server-side. This config only carries the on/off flag; the
 * request-time header/body injection is a separate slice.
 */
export interface ContextEditingConfig {
  enabled: boolean;
}

export interface CompressionPipelineStep {
  engine: CompressionEngineId;
  intensity?: CavemanIntensity | RtkIntensity;
  config?: Record<string, unknown>;
}

export interface EngineToggle {
  enabled: boolean;
  level?: string;
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
  /** Phase 4A: selected output styles (supersedes cavemanOutputMode via a back-compat shim). */
  outputStyles?: OutputStyleSelectionEntry[];
  rtkConfig?: RtkConfig;
  languageConfig?: CompressionLanguageConfig;
  aggressive?: AggressiveConfig;
  ultra?: UltraConfig;
  /** Provider-delegated context editing (Claude/Anthropic only). */
  contextEditing?: ContextEditingConfig;
  /** Per-engine opt-in toggles for the config panel. */
  engines: Record<string, EngineToggle>;
  /** Active combo preset id, or null if none selected. */
  activeComboId: string | null;
  /**
   * Runtime-only (NOT persisted): true when a stored `engines` row exists, i.e. the operator
   * configured engines via the panel. When false, the `engines` map is a display-only backfill
   * and dispatch falls back to the legacy `defaultMode`/default-combo path (zero behaviour
   * change for installs that predate the panel). Set by `getCompressionSettings`.
   */
  enginesExplicit?: boolean;
  /**
   * Context-budget adaptive compression (Sub-project C). Absent / mode:"off" = legacy
   * binary auto-trigger (byte-identical). When mode is "floor" or "replace-autotrigger"
   * the adaptive resolver owns automatic-by-size escalation and the legacy
   * shouldAutoTrigger branch is bypassed.
   */
  contextBudget?: ContextBudgetConfig;
  /**
   * Phase 4 (B): which tier the `ultra` mode uses.
   * "heuristic" = Tier-A token pruner (`pruneByScore`, default, byte-identical to pre-B).
   * "slm" = Tier-B LLMLingua-2 ONNX worker when available, else fail-open to Tier-A.
   */
  ultraEngine?: "heuristic" | "slm";
  /**
   * Phase 4 (B): best-effort pre-warm of the SLM model on the enable transition
   * and on a cold restart when `ultraEngine: "slm"` is already set. Failures are
   * swallowed; the lazy first-call path still applies. Default false.
   */
  ultraSlmPrewarm?: boolean;
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
  /**
   * Phase 4 (B): which `ultra` tier actually ran for this request.
   * "slm" — Tier-B ran and produced the output.
   * "heuristic-fallback" — Tier-B was selected but failed/timed out → Tier-A used.
   * "heuristic" — Tier-A used directly (ultraEngine !== "slm" or SLM unavailable).
   * Consumed by D0's persister as `CompressionRunTelemetry.ultraTier`.
   */
  ultraTier?: "slm" | "heuristic-fallback" | "heuristic";
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
  engines: Object.fromEntries(ENGINE_IDS.map((id) => [id, { enabled: false }])),
  activeComboId: null,
  ultraEngine: "heuristic",
  ultraSlmPrewarm: false,
};

export const DEFAULT_CAVEMAN_CONFIG: CavemanConfig = {
  enabled: false,
  compressRoles: ["user"],
  skipRules: [],
  minMessageLength: 50,
  // Protect code blocks, inline code, file paths, URLs, and error/stack lines
  // from caveman compression so signal-carrying content is never mangled.
  preservePatterns: [
    "```[\\s\\S]*?```",
    "`[^`\\n]+`",
    "\\b(https?://\\S+)",
    "(?:^|\\s)(\\.{0,2}/[\\w./\\-]+)",
    "^\\s*(Error|TypeError|RangeError|SyntaxError|ReferenceError):",
    "^\\s+at\\s",
  ],
  intensity: "lite",
};

export const DEFAULT_CAVEMAN_OUTPUT_MODE_CONFIG: CavemanOutputModeConfig = {
  enabled: false,
  intensity: "lite",
  autoClarity: true,
};

export const DEFAULT_RTK_CONFIG: RtkConfig = {
  enabled: false,
  intensity: "minimal",
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
  enableGrouping: false,
  groupingThreshold: 3,
  stripCodeComments: false,
  preserveDocstrings: true,
};

export const DEFAULT_COMPRESSION_LANGUAGE_CONFIG: CompressionLanguageConfig = {
  enabled: false,
  defaultLanguage: "en",
  autoDetect: true,
  enabledPacks: ["en"],
};

export const DEFAULT_CONTEXT_EDITING_CONFIG: ContextEditingConfig = {
  enabled: false,
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

export type { McpAccessibilityConfig } from "./engines/mcpAccessibility/constants.ts";
export {
  DEFAULT_MCP_ACCESSIBILITY_CONFIG,
  clampMcpAccessibilityConfig,
} from "./engines/mcpAccessibility/constants.ts";
