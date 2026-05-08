/**
 * Assessment Engine Types
 *
 * Type definitions for the auto-assessment, categorization,
 * and self-healing system.
 *
 * @module domain/assessment/types
 */

// ── Model Assessment ────────────────────────────────────────────────────────

/** Assessment status for a model/provider pair */
export type AssessmentStatus =
  | "working" // Responds correctly to probes
  | "broken" // Returns errors (4xx, 5xx) or invalid responses
  | "rate_limited" // Temporarily rate-limited (retries may succeed later)
  | "timeout" // Request exceeds probe timeout
  | "auth_error" // Authentication failed (invalid key, expired token)
  | "unknown"; // Not yet assessed

/** Capability categories for model classification */
export type ModelCategory =
  | "coding" // Code generation, debugging, refactoring
  | "reasoning" // Logical reasoning, math, analysis
  | "reasoning_deep" // Extended thinking, complex multi-step reasoning
  | "chat" // Conversational ability, general Q&A
  | "fast" // Sub-2s response time for short prompts
  | "vision" // Image input support
  | "tool_call" // Function/tool calling support
  | "structured_output"; // JSON mode / structured output support;

/** Provider account tier classification */
export type ModelTier = "premium" | "balanced" | "fast" | "free";

/** Probe intensity level */
export type ProbeLevel = "quick" | "standard" | "deep";

/** Scope for assessment runs */
export type AssessmentScope =
  | { type: "all" }
  | { type: "provider"; providerId: string }
  | { type: "model"; modelId: string };

/** Complete assessment result for a model/provider pair */
export interface ModelAssessment {
  /** Unique ID: `${providerId}/${modelId}` */
  id: string;
  /** Model identifier (e.g., "claude-sonnet-4.5") */
  modelId: string;
  /** Provider identifier (e.g., "kiro") */
  providerId: string;
  /** Current assessment status */
  status: AssessmentStatus;
  /** Median latency in milliseconds */
  latencyP50: number | null;
  /** P95 latency in milliseconds */
  latencyP95: number | null;
  /** Success rate over recent probes (0..1) */
  successRate: number;
  /** Whether model supports image inputs */
  supportsVision: boolean;
  /** Whether model supports function/tool calling */
  supportsToolCall: boolean;
  /** Whether model supports streaming */
  supportsStreaming: boolean;
  /** Whether model supports JSON/structured output */
  supportsStructuredOutput: boolean;
  /** Maximum context window in tokens */
  maxContextWindow: number | null;
  /** Maximum output tokens */
  maxOutputTokens: number | null;
  /** Capability categories */
  categories: ModelCategory[];
  /** Fitness score per category (0..1) */
  fitnessScores: Record<ModelCategory, number>;
  /** Overall tier classification */
  tier: ModelTier;
  /** ISO timestamp of last probe */
  lastTested: string | null;
  /** Last error message if any */
  lastError: string | null;
  /** Consecutive failed probes */
  consecutiveFails: number;
  /** Total probes executed */
  probeCount: number;
  /** ISO timestamp of creation */
  createdAt: string;
  /** ISO timestamp of last update */
  updatedAt: string;
}

// ── Assessment Run ───────────────────────────────────────────────────────────

/** Trigger source for an assessment run */
export type AssessmentTrigger =
  | "scheduled"
  | "on_demand"
  | "on_provider_change"
  | "on_error"
  | "startup";

/** Record of a single assessment run */
export interface AssessmentRun {
  id: string;
  startedAt: string;
  completedAt: string | null;
  modelsTested: number;
  modelsPassed: number;
  modelsFailed: number;
  modelsRateLimited: number;
  durationMs: number | null;
  trigger: AssessmentTrigger;
  createdAt: string;
}

// ── Combo Health ─────────────────────────────────────────────────────────────

/** Health status for a combo */
export interface ComboHealth {
  comboId: string;
  healthyModelCount: number;
  deadModelCount: number;
  totalModelCount: number;
  healthScore: number; // 0..1, weighted by model health
  lastAutoFix: string | null;
  autoFixCount: number;
  updatedAt: string;
}

// ── Self-Heal Actions ────────────────────────────────────────────────────────

/** Types of actions the self-healer can take */
export type HealActionType =
  | "remove_model" // Remove broken model from combo
  | "reduce_weight" // Reduce weight of rate-limited model
  | "restore_weight" // Restore weight of recovered model
  | "add_model" // Add working model to combo
  | "emergency_replace"; // Replace all dead models in empty combo;

/** Record of a self-heal action */
export interface HealAction {
  id: string;
  comboId: string;
  actionType: HealActionType;
  modelId: string;
  providerId: string;
  reason: string;
  previousWeight: number | null;
  newWeight: number | null;
  timestamp: string;
}

// ── Probe Configuration ──────────────────────────────────────────────────────

/** Configuration for assessment probes */
export interface AssessmentConfig {
  /** Interval between quick probes (ms) */
  quickProbeIntervalMs: number;
  /** Interval between standard probes (ms) */
  standardProbeIntervalMs: number;
  /** Interval between deep probes (ms) */
  deepProbeIntervalMs: number;
  /** Maximum timeout for a single probe (ms) */
  probeTimeoutMs: number;
  /** Number of consecutive failures before marking as broken */
  brokenThreshold: number;
  /** Number of consecutive successes to restore a model */
  restoreThreshold: number;
  /** Maximum weight reduction factor (0..1, 0.5 = halve the weight) */
  maxWeightReduction: number;
  /** Minimum weight for rate-limited models */
  minimumWeight: number;
  /** Whether self-healing is enabled */
  selfHealEnabled: boolean;
  /** Whether auto-generation of combos is enabled */
  autoGenerateEnabled: boolean;
  /** Whether to skip broken models in combo resolver */
  skipBrokenModels: boolean;
}

/** Default assessment configuration */
export const DEFAULT_ASSESSMENT_CONFIG: AssessmentConfig = {
  quickProbeIntervalMs: 5 * 60 * 1000, // 5 minutes
  standardProbeIntervalMs: 30 * 60 * 1000, // 30 minutes
  deepProbeIntervalMs: 6 * 60 * 60 * 1000, // 6 hours
  probeTimeoutMs: 30 * 1000, // 30 seconds
  brokenThreshold: 3, // 3 consecutive failures
  restoreThreshold: 2, // 2 consecutive successes
  maxWeightReduction: 0.5, // Halve weight
  minimumWeight: 5, // Minimum weight is 5%
  selfHealEnabled: true,
  autoGenerateEnabled: true,
  skipBrokenModels: true,
};

// ── Probe Messages ───────────────────────────────────────────────────────────

/** Probe messages for different assessment levels */
export const PROBE_MESSAGES = {
  quick: [{ role: "user" as const, content: "ok" }],
  standard: [
    {
      role: "user" as const,
      content: "Write a function that adds two numbers. Reply with just the function.",
    },
  ],
  deep: [{ role: "user" as const, content: "What is 17 * 23? Reply with just the number." }],
} as const;

/** Max tokens for each probe level */
export const PROBE_MAX_TOKENS = {
  quick: 3,
  standard: 100,
  deep: 50,
} as const;

// ── Auto-Combo Templates ────────────────────────────────────────────────────

/** Template for auto-generating combos from assessment results */
export interface AutoComboTemplate {
  name: string;
  displayName: string;
  categories: ModelCategory[];
  tiers: ModelTier[];
  strategy: "priority" | "weighted" | "round-robin" | "random" | "least-used";
  /** System message for this combo type */
  systemMessage?: string;
}

/** Default auto-combo templates */
export const AUTO_COMBO_TEMPLATES: AutoComboTemplate[] = [
  {
    name: "auto/best-coding",
    displayName: "Best Coding",
    categories: ["coding"],
    tiers: ["premium", "balanced"],
    strategy: "weighted",
    systemMessage:
      "You are an expert coding assistant. Write clean, efficient, well-documented code.",
  },
  {
    name: "auto/best-reasoning",
    displayName: "Best Reasoning",
    categories: ["reasoning_deep", "reasoning"],
    tiers: ["premium"],
    strategy: "weighted",
    systemMessage: "You are a deep reasoning assistant. Think carefully step by step.",
  },
  {
    name: "auto/best-fast",
    displayName: "Best Fast",
    categories: ["fast"],
    tiers: ["fast", "balanced"],
    strategy: "weighted",
  },
  {
    name: "auto/best-vision",
    displayName: "Best Vision",
    categories: ["vision"],
    tiers: ["premium", "balanced"],
    strategy: "weighted",
  },
  {
    name: "auto/best-chat",
    displayName: "Best Chat",
    categories: ["chat"],
    tiers: ["balanced", "premium"],
    strategy: "weighted",
  },
  {
    name: "auto/best-coding-fast",
    displayName: "Best Coding Fast",
    categories: ["coding", "fast"],
    tiers: ["fast", "balanced"],
    strategy: "weighted",
  },
  {
    name: "auto/pro-coding",
    displayName: "Pro Coding",
    categories: ["coding"],
    tiers: ["premium"],
    strategy: "priority",
    systemMessage:
      "You are an expert coding assistant. Write clean, efficient, well-documented code.",
  },
  {
    name: "auto/pro-reasoning",
    displayName: "Pro Reasoning",
    categories: ["reasoning_deep"],
    tiers: ["premium"],
    strategy: "priority",
    systemMessage: "You are a deep reasoning assistant. Think carefully step by step.",
  },
  {
    name: "auto/pro-vision",
    displayName: "Pro Vision",
    categories: ["vision"],
    tiers: ["premium"],
    strategy: "priority",
  },
  {
    name: "auto/pro-chat",
    displayName: "Pro Chat",
    categories: ["chat"],
    tiers: ["premium"],
    strategy: "priority",
  },
  {
    name: "auto/pro-fast",
    displayName: "Pro Fast",
    categories: ["fast"],
    tiers: ["fast"],
    strategy: "priority",
  },
  {
    name: "auto/coding",
    displayName: "Coding",
    categories: ["coding"],
    tiers: ["balanced", "fast", "premium"],
    strategy: "weighted",
  },
  {
    name: "auto/fast",
    displayName: "Fast",
    categories: ["fast"],
    tiers: ["fast"],
    strategy: "weighted",
  },
  {
    name: "auto/chat",
    displayName: "Chat",
    categories: ["chat"],
    tiers: ["balanced", "fast"],
    strategy: "weighted",
  },
  {
    name: "auto/claude-opus",
    displayName: "Claude Opus",
    categories: ["reasoning_deep", "coding", "reasoning"],
    tiers: ["premium"],
    strategy: "priority",
  },
  {
    name: "auto/claude-sonnet",
    displayName: "Claude Sonnet",
    categories: ["coding", "reasoning", "chat"],
    tiers: ["premium", "balanced"],
    strategy: "priority",
  },
];

export {};
