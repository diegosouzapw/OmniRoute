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
    qwen: 0.78,
    llama: 0.72,
    mistral: 0.75,
    mixtral: 0.77,
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
    "gpt-4o": 0.85,
    o1: 0.9,
    o3: 0.93,
    "deepseek-r1": 0.88,
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
    "deepseek-v3": 0.75,
    "gemini-flash": 0.72,
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
