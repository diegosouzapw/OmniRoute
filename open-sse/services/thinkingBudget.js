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

// Effort → budget token mapping
export const EFFORT_BUDGETS = {
  none: 0,
  low: 1024,
  medium: 10240,
  high: 131072,
};

// Default config (passthrough = backward compatible)
export const DEFAULT_THINKING_CONFIG = {
  mode: ThinkingMode.PASSTHROUGH,
  customBudget: 10240,
  effortLevel: "medium",
};

// In-memory config (loaded from DB on startup, or default)
let _config = { ...DEFAULT_THINKING_CONFIG };

/**
 * Set the thinking budget config (called from settings API or startup)
 */
export function setThinkingBudgetConfig(config) {
  _config = { ...DEFAULT_THINKING_CONFIG, ...config };
}

/**
 * Get current thinking budget config
 */
export function getThinkingBudgetConfig() {
  return { ..._config };
}

/**
 * Apply thinking budget control to a request body.
 * Called before format-specific translation.
 *
 * @param {object} body - Request body (any format)
 * @param {object} [config] - Override config (defaults to stored config)
 * @returns {object} Modified body
 */
export function applyThinkingBudget(body, config = null) {
  const cfg = config || _config;
  if (!body || typeof body !== "object") return body;

  switch (cfg.mode) {
    case ThinkingMode.AUTO:
      return stripThinkingConfig(body);

    case ThinkingMode.PASSTHROUGH:
      return body; // No changes

    case ThinkingMode.CUSTOM:
      return setCustomBudget(body, cfg.customBudget);

    case ThinkingMode.ADAPTIVE:
      return applyAdaptiveBudget(body, cfg);

    default:
      return body;
  }
}

/**
 * AUTO mode: strip all thinking configuration, let provider decide
 */
function stripThinkingConfig(body) {
  const result = { ...body };

  // Claude format
  delete result.thinking;

  // OpenAI format
  delete result.reasoning_effort;
  delete result.reasoning;

  // Gemini format
  if (result.generationConfig) {
    result.generationConfig = { ...result.generationConfig };
    delete result.generationConfig.thinking_config;
    delete result.generationConfig.thinkingConfig;
  }

  return result;
}

/**
 * CUSTOM mode: set exact budget tokens
 */
function setCustomBudget(body, budget) {
  const result = { ...body };

  // If body already has thinking config in Claude format, update it
  if (result.thinking || hasThinkingCapableModel(result)) {
    result.thinking = {
      type: budget > 0 ? "enabled" : "disabled",
      budget_tokens: budget,
    };
  }

  // OpenAI reasoning_effort mapping
  if (result.reasoning_effort !== undefined || result.reasoning !== undefined) {
    if (budget <= 0) {
      delete result.reasoning_effort;
      delete result.reasoning;
    } else if (budget <= 1024) {
      result.reasoning_effort = "low";
    } else if (budget <= 10240) {
      result.reasoning_effort = "medium";
    } else {
      result.reasoning_effort = "high";
    }
  }

  // Gemini thinking_config
  if (result.generationConfig?.thinking_config || result.generationConfig?.thinkingConfig) {
    result.generationConfig = {
      ...result.generationConfig,
      thinking_config: { thinking_budget: budget },
    };
  }

  return result;
}

/**
 * ADAPTIVE mode: scale budget based on request complexity
 */
function applyAdaptiveBudget(body, cfg) {
  const messages = body.messages || body.input || [];
  const messageCount = messages.length;
  const tools = body.tools || [];
  const toolCount = tools.length;

  // Get last user message length
  let lastMsgLength = 0;
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role === "user") {
      lastMsgLength = typeof msg.content === "string"
        ? msg.content.length
        : JSON.stringify(msg.content || "").length;
      break;
    }
  }

  // Calculate multiplier
  let multiplier = 1.0;
  if (messageCount > 10) multiplier += 0.5;
  if (toolCount > 3) multiplier += 0.5;
  if (lastMsgLength > 2000) multiplier += 0.3;

  const baseBudget = EFFORT_BUDGETS[cfg.effortLevel] || EFFORT_BUDGETS.medium;
  const budget = Math.min(Math.ceil(baseBudget * multiplier), 131072);

  return setCustomBudget(body, budget);
}

/**
 * Check if model name suggests thinking capability
 */
function hasThinkingCapableModel(body) {
  const model = body.model || "";
  return (
    model.includes("claude") ||
    model.includes("o1") ||
    model.includes("o3") ||
    model.includes("o4") ||
    model.includes("gemini") ||
    model.includes("thinking")
  );
}
