/**
 * Thinking Budget Control — Phase 2
 *
 * Provides proxy-level control over AI thinking/reasoning budgets.
 * Modes: auto, passthrough, custom, adaptive
 */

// Thinking budget modes
export const ThinkingMode = {
  AUTO: "auto", // Let provider decide (remove client's budget)
  PASSTHROUGH: "passthrough", // No changes (current behavior)
  CUSTOM: "custom", // Set fixed budget
  ADAPTIVE: "adaptive", // Scale based on request complexity
};
export type ThinkingModeValue = (typeof ThinkingMode)[keyof typeof ThinkingMode];

type JsonRecord = Record<string, unknown>;
type ThinkingBudgetConfig = {
  mode: ThinkingModeValue;
  customBudget: number;
  effortLevel: string;
};

import {
  capThinkingBudget,
  getDefaultThinkingBudget,
  getResolvedModelCapabilities,
  supportsReasoning,
} from "@/lib/modelCapabilities";

// Effort → budget token mapping
export const EFFORT_BUDGETS: Record<string, number> = {
  none: 0,
  low: 1024,
  medium: 10240,
  high: 131072, // Handled globally by capThinkingBudget later
  max: 131072, // T11: Claude "max" / "xhigh" — full budget
  xhigh: 131072, // T11: explicit alias used internally
};

// thinkingLevel string → budget token mapping
// Used when clients send string-based thinking levels (e.g., VS Code Copilot)
export const THINKING_LEVEL_MAP: Record<string, number> = {
  none: 0,
  low: 4096,
  medium: 8192,
  high: 24576,
  max: 131072, // T11: max = full Claude budget (sub2api: xhigh)
  xhigh: 131072, // T11: explicit xhigh alias
};

// Default config (passthrough = backward compatible)
export const DEFAULT_THINKING_CONFIG = {
  mode: ThinkingMode.PASSTHROUGH,
  customBudget: 10240,
  effortLevel: "medium",
} satisfies ThinkingBudgetConfig;

// In-memory config (loaded from DB on startup, or default)
let _config: ThinkingBudgetConfig = { ...DEFAULT_THINKING_CONFIG };

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function getStringField(record: JsonRecord, key: string): string {
  const value = record[key];
  return typeof value === "string" ? value : "";
}

/**
 * Set the thinking budget config (called from settings API or startup)
 */
export function setThinkingBudgetConfig(config: Partial<ThinkingBudgetConfig>) {
  _config = { ...DEFAULT_THINKING_CONFIG, ...config };
}

/**
 * Get current thinking budget config
 */
export function getThinkingBudgetConfig() {
  return { ..._config };
}

/**
 * Normalize thinkingLevel string fields into numeric budget.
 * Handles: body.thinkingLevel, body.thinking_level,
 * and Gemini's generationConfig.thinkingConfig.thinkingLevel
 *
 * @param {object} body - Request body
 * @returns {object} Body with string thinkingLevel converted to numeric budget
 */
export function normalizeThinkingLevel(body: unknown) {
  if (!body || typeof body !== "object") return body;
  const result: JsonRecord = { ...(body as JsonRecord) };

  // Handle top-level thinkingLevel or thinking_level string fields
  const levelStr = result.thinkingLevel || result.thinking_level;
  if (typeof levelStr === "string" && THINKING_LEVEL_MAP[levelStr.toLowerCase()] !== undefined) {
    const rawBudget = THINKING_LEVEL_MAP[levelStr.toLowerCase()];
    const budget = capThinkingBudget(getStringField(result, "model"), rawBudget);
    // Convert to Claude thinking format as canonical representation
    result.thinking = {
      type: budget > 0 ? "enabled" : "disabled",
      budget_tokens: budget,
    };
    delete result.thinkingLevel;
    delete result.thinking_level;
  }

  // Handle Gemini's generationConfig.thinkingConfig.thinkingLevel
  const generationConfig = toRecord(result.generationConfig);
  const thinkingConfig = toRecord(generationConfig.thinkingConfig);
  const thinkingConfigSnake = toRecord(generationConfig.thinking_config);
  const geminiLevel = thinkingConfig.thinkingLevel || thinkingConfigSnake.thinkingLevel;
  if (
    typeof geminiLevel === "string" &&
    THINKING_LEVEL_MAP[geminiLevel.toLowerCase()] !== undefined
  ) {
    const rawBudget = THINKING_LEVEL_MAP[geminiLevel.toLowerCase()];
    const budget = capThinkingBudget(getStringField(result, "model"), rawBudget);
    result.generationConfig = {
      ...generationConfig,
      thinkingConfig: { ...thinkingConfig, thinkingBudget: budget },
    };
    // Clean up string variants
    const nextGenerationConfig = result.generationConfig as JsonRecord;
    const nextThinkingConfig = toRecord(nextGenerationConfig.thinkingConfig);
    if (Object.keys(nextThinkingConfig).length > 0) {
      delete nextThinkingConfig.thinkingLevel;
      nextGenerationConfig.thinkingConfig = nextThinkingConfig;
    }
    if ("thinking_config" in nextGenerationConfig) {
      delete nextGenerationConfig.thinking_config;
    }
  }

  return result;
}

/**
 * Ensure models with -thinking suffix have thinking config injected.
 * Prevents 400 errors from Claude API when thinking params are missing.
 *
 * @param {object} body - Request body
 * @returns {object} Body with thinking config auto-injected if needed
 */
export function ensureThinkingConfig(body: unknown) {
  if (!body || typeof body !== "object") return body;
  const bodyRecord = body as JsonRecord;
  const model = getStringField(bodyRecord, "model");

  // Only auto-inject for models with -thinking suffix
  if (!model.endsWith("-thinking")) return body;

  // If thinking config already present, don't override
  if (bodyRecord.thinking) return body;

  const result: JsonRecord = { ...bodyRecord };
  result.thinking = {
    type: "enabled",
    budget_tokens: getDefaultThinkingBudget(model) || EFFORT_BUDGETS.medium,
  };
  return result;
}

/**
 * Apply thinking budget control to a request body.
 * Called before format-specific translation.
 *
 * Pipeline: normalizeThinkingLevel → ensureThinkingConfig → mode processing
 *
 * @param {object} body - Request body (supported formats)
 * @param {object} [config] - Override config (defaults to stored config)
 * @returns {object} Modified body
 */
export function applyThinkingBudget(
  body: unknown,
  config: Partial<ThinkingBudgetConfig> | null = null
) {
  const cfg = config || _config;
  if (!body || typeof body !== "object") return body;

  // Early exit: strip ALL reasoning/thinking params for models that don't support them.
  // Provider-specific Cloud Code restrictions should be handled at the executor boundary.
  const bodyRecord = body as JsonRecord;
  const modelStr = typeof bodyRecord.model === "string" ? bodyRecord.model : "";
  if (modelStr && !supportsReasoning(modelStr)) {
    return stripThinkingConfig(body);
  }

  // Pre-processing: convert string thinkingLevel to numeric budget
  let processed = normalizeThinkingLevel(body);

  // Pre-processing: auto-inject thinking config for -thinking suffix models
  processed = ensureThinkingConfig(processed);

  switch (cfg.mode) {
    case ThinkingMode.AUTO:
      return stripThinkingConfig(processed);

    case ThinkingMode.PASSTHROUGH:
      return processed;

    case ThinkingMode.CUSTOM:
      return setCustomBudget(processed, cfg.customBudget ?? DEFAULT_THINKING_CONFIG.customBudget);

    case ThinkingMode.ADAPTIVE:
      return applyAdaptiveBudget(processed, cfg);

    default:
      return processed;
  }
}

/**
 * AUTO mode: strip all thinking configuration, let provider decide
 */
function stripThinkingConfig(body: unknown) {
  const result: JsonRecord = { ...toRecord(body) };

  // Claude format
  delete result.thinking;

  // OpenAI format
  delete result.reasoning_effort;
  delete result.reasoning;

  // Gemini format
  if (result.generationConfig) {
    const generationConfig = { ...toRecord(result.generationConfig) };
    delete generationConfig.thinking_config;
    delete generationConfig.thinkingConfig;
    result.generationConfig = generationConfig;
  }

  return result;
}

/**
 * CUSTOM mode: set exact budget tokens
 */
function setCustomBudget(body: unknown, budget: number) {
  const result: JsonRecord = { ...toRecord(body) };

  // If body already has thinking config in Claude format, update it
  if (result.thinking || hasThinkingCapableModel(result)) {
    result.thinking = {
      type: budget > 0 ? "enabled" : "disabled",
      budget_tokens: budget,
    };
  }

  // OpenAI reasoning_effort mapping.
  // GPT-5/Codex accepts xhigh for the top tier; keep full budget aligned.
  if (result.reasoning_effort !== undefined || result.reasoning !== undefined) {
    if (budget <= 0) {
      delete result.reasoning_effort;
      delete result.reasoning;
    } else if (budget <= 1024) {
      result.reasoning_effort = "low";
    } else if (budget <= 10240) {
      result.reasoning_effort = "medium";
    } else if (budget < 131072) {
      result.reasoning_effort = "high";
    } else {
      result.reasoning_effort = "xhigh";
    }
  }

  // Gemini thinking_config
  const generationConfig = toRecord(result.generationConfig);
  if (generationConfig.thinking_config || generationConfig.thinkingConfig) {
    result.generationConfig = {
      ...generationConfig,
      thinking_config: { thinking_budget: budget },
    };
  }

  return result;
}

/**
 * ADAPTIVE mode: scale budget based on request complexity
 */
function applyAdaptiveBudget(body: unknown, cfg: Partial<ThinkingBudgetConfig>) {
  const bodyRecord = toRecord(body);
  const messages = Array.isArray(bodyRecord.messages)
    ? bodyRecord.messages
    : Array.isArray(bodyRecord.input)
      ? bodyRecord.input
      : [];
  const messageCount = messages.length;
  const tools = Array.isArray(bodyRecord.tools) ? bodyRecord.tools : [];
  const toolCount = tools.length;

  // Get last user message length
  let lastMsgLength = 0;
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    const msgRecord = toRecord(msg);
    if (msgRecord.role === "user") {
      lastMsgLength =
        typeof msgRecord.content === "string"
          ? msgRecord.content.length
          : JSON.stringify(msgRecord.content || "").length;
      break;
    }
  }

  // Calculate multiplier
  let multiplier = 1.0;
  if (messageCount > 10) multiplier += 0.5;
  if (toolCount > 3) multiplier += 0.5;
  if (lastMsgLength > 2000) multiplier += 0.3;

  const baseBudget =
    EFFORT_BUDGETS[typeof cfg.effortLevel === "string" ? cfg.effortLevel : "medium"] ||
    getDefaultThinkingBudget(getStringField(bodyRecord, "model")) ||
    EFFORT_BUDGETS.medium;
  const budget = capThinkingBudget(
    getStringField(bodyRecord, "model"),
    Math.ceil(baseBudget * multiplier)
  );

  return setCustomBudget(body, budget);
}

/**
 * Check if model name suggests thinking capability
 */
export function hasThinkingCapableModel(body: unknown) {
  const model = getStringField(toRecord(body), "model");
  const resolved = getResolvedModelCapabilities(model);
  if (resolved.supportsThinking === true) return true;
  if (resolved.supportsThinking === false) return false;
  return (
    model.includes("claude") ||
    model.includes("o1") ||
    model.includes("o3") ||
    model.includes("o4") ||
    model.includes("gemini") ||
    model.endsWith("-thinking") ||
    model.includes("thinking")
  );
}
