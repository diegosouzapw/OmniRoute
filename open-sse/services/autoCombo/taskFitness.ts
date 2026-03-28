/**
 * Task Fitness Lookup Table
 *
 * Maps model patterns × task types → fitness score [0..1].
 * Supports wildcards and prefix matching.
 */

const FITNESS_TABLE: Record<string, Record<string, number>> = {
  coding: {
    "claude-sonnet": 0.95,
    "claude-opus": 0.92,
    "claude-haiku": 0.78,
    "gpt-4o": 0.9,
    "gpt-4o-mini": 0.8,
    "gpt-4-turbo": 0.88,
    o1: 0.93,
    o3: 0.95,
    "o4-mini": 0.88,
    codex: 0.98,
    "gemini-pro": 0.85,
    "gemini-flash": 0.8,
    "gemini-2.5-pro": 0.92,
    "gemini-2.5-flash": 0.82,
    "deepseek-coder": 0.9,
    "deepseek-v3": 0.85,
    "deepseek-r1": 0.88,
    "deepseek-chat": 0.84, // DeepSeek V3.2 Chat — strong code performance
    "deepseek-v3.2": 0.86, // Explicit V3.2 alias
    qwen: 0.78,
    llama: 0.72,
    mistral: 0.75,
    mixtral: 0.77,
    // Grok-4 fast — good code, ultra-low latency (1143ms P50)
    "grok-4-fast": 0.8,
    "grok-4": 0.82,
    "grok-3": 0.8,
    // Kimi K2.5 — agentic with tool calling, good at code tasks
    "kimi-k2": 0.82,
    // GLM-5.1 / GLM-5 — Z.AI reasoning models, 200K context / 128k output
    "glm-5.1": 0.78,
    "glm-5": 0.78,
    // MiniMax M2.5 — reasoning support helps complex code
    "minimax-m2.5": 0.75,
    "minimax-m2": 0.72,
  },
  review: {
    "claude-sonnet": 0.92,
    "claude-opus": 0.95,
    "claude-haiku": 0.7,
    "gpt-4o": 0.88,
    "gpt-4o-mini": 0.72,
    o1: 0.9,
    o3: 0.92,
    "gemini-pro": 0.9,
    "gemini-2.5-pro": 0.93,
    "gemini-flash": 0.75,
    "deepseek-r1": 0.85,
    "deepseek-v3": 0.8,
  },
  planning: {
    "claude-opus": 0.95,
    "claude-sonnet": 0.9,
    "gpt-4o": 0.88,
    o1: 0.92,
    o3: 0.95,
    "gemini-2.5-pro": 0.93,
    "gemini-pro": 0.88,
    "deepseek-r1": 0.85,
  },
  analysis: {
    "claude-opus": 0.95,
    "claude-sonnet": 0.92,
    "gemini-2.5-pro": 0.95,
    "gemini-pro": 0.88,
    "gemini-3.1-pro": 0.95, // Gemini 3.1 Pro — 1M context, ideal for long analysis
    "gpt-4o": 0.85,
    o1: 0.9,
    o3: 0.93,
    "deepseek-r1": 0.88,
    "deepseek-chat": 0.8,
    "kimi-k2": 0.82, // Kimi K2.5 agentic — good for analysis
    "glm-5.1": 0.82, // GLM-5.1 free reasoning, 200K context for long analysis
    "glm-5": 0.78, // GLM-5 with 128k output for long analysis
    "minimax-m2.5": 0.76,
  },
  debugging: {
    "claude-sonnet": 0.93,
    "claude-opus": 0.9,
    "gpt-4o": 0.88,
    o1: 0.85,
    "deepseek-coder": 0.9,
    "deepseek-v3": 0.82,
    "gemini-flash": 0.78,
    codex: 0.92,
  },
  documentation: {
    "claude-sonnet": 0.9,
    "claude-opus": 0.88,
    "gpt-4o": 0.92,
    "gpt-4o-mini": 0.85,
    "gemini-pro": 0.88,
    "gemini-flash": 0.82,
    "deepseek-v3": 0.78,
  },
  default: {
    "claude-sonnet": 0.85,
    "claude-opus": 0.85,
    "gpt-4o": 0.85,
    "gemini-pro": 0.8,
    "gemini-3.1-pro": 0.85,
    "deepseek-v3": 0.75,
    "deepseek-chat": 0.74,
    "gemini-flash": 0.72,
    // New models from ClawRouter analysis (2026-03-17):
    "grok-4-fast": 0.72, // ultra-fast, suitable for all tasks
    "grok-4": 0.74,
    "grok-3": 0.73,
    "kimi-k2": 0.76, // agentic multi-step tasks
    "glm-5.1": 0.75,
    "glm-5": 0.7,
    "minimax-m2.5": 0.7,
  },
};

// Wildcard patterns: model substrings → task type boosts
const WILDCARD_BOOSTS: Array<{ pattern: string; taskType: string; boost: number }> = [
  { pattern: "coder", taskType: "coding", boost: 0.15 },
  { pattern: "code", taskType: "coding", boost: 0.1 },
  { pattern: "fast", taskType: "coding", boost: 0.05 },
  { pattern: "thinking", taskType: "planning", boost: 0.1 },
  { pattern: "thinking", taskType: "analysis", boost: 0.1 },
];

/**
 * Get task fitness score for a model × taskType combination.
 * Returns 0.5 (neutral) if no mapping found.
 */
export function getTaskFitness(model: string, taskType: string): number {
  const normalizedModel = model.toLowerCase();
  const normalizedTask = taskType.toLowerCase();
  const table = FITNESS_TABLE[normalizedTask] || FITNESS_TABLE.default;

  // Direct match
  for (const [pattern, score] of Object.entries(table)) {
    if (normalizedModel.includes(pattern)) return score;
  }

  // Wildcard boost
  let baseScore = 0.5;
  for (const wc of WILDCARD_BOOSTS) {
    if (normalizedModel.includes(wc.pattern) && normalizedTask === wc.taskType) {
      baseScore += wc.boost;
    }
  }

  return Math.min(1.0, baseScore);
}

/**
 * Get all task types available.
 */
export function getTaskTypes(): string[] {
  return Object.keys(FITNESS_TABLE).filter((k) => k !== "default");
}
