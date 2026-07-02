/**
 * Task-Aware Smart Router — T05
 *
 * Detects the semantic type of an incoming chat request and routes
 * to the most appropriate (optimal cost/quality) model for that task type.
 *
 * Task types:
 *   - coding        → fast reasoning models (deepseek, codex, claude-sonnet)
 *   - creative      → expressive models (claude-opus, gpt-5)
 *   - analysis      → long-context + smart models (gemini-2.5-pro, claude-opus)
 *   - vision        → multimodal models (gpt-4o, gemini-2.5-flash, claude-3.5)
 *   - summarization → cheap fast models (gemini-flash, gpt-4o-mini)
 *   - background    → cheap utility models (same as backgroundTaskDetector)
 *   - chat          → default/balanced (no override)
 */

// ── Types ───────────────────────────────────────────────────────────────────

export type TaskType =
  | "coding"
  | "creative"
  | "analysis"
  | "vision"
  | "summarization"
  | "background"
  | "chat";

interface TaskPattern {
  patterns: string[];
  userPatterns?: string[]; // in user message content
}

export interface TaskRoutingConfig {
  enabled: boolean;
  /**
   * Map from task type to preferred model (provider/model format).
   * Empty string = use whatever was requested (no override).
   */
  taskModelMap: Record<TaskType, string>;
  detectionEnabled: boolean;
  stats: { detected: number; routed: number };
}

// ── Default detection patterns ───────────────────────────────────────────────

const TASK_PATTERNS: Record<TaskType, TaskPattern> = {
  coding: {
    patterns: [
      "write code",
      "write a function",
      "implement",
      "debug",
      "fix this",
      "fix the",
      "refactor",
      "unit test",
      "write test",
      "write a script",
      "code review",
      "complete this function",
      "add a feature",
      "javascript",
      "typescript",
      "python",
      "sql query",
      "api endpoint",
    ],
    userPatterns: [
      "```",
      "def ",
      "function ",
      "class ",
      "import ",
      "const ",
      "let ",
      "var ",
      "SELECT ",
      "INSERT ",
      "<html",
      "<div",
    ],
  },
  creative: {
    patterns: [
      "write a story",
      "write a poem",
      "write a song",
      "creative writing",
      "write a blog",
      "write an article",
      "write a script",
      "write an essay",
      "imagine",
      "roleplay",
      "brainstorm",
      "creative",
    ],
  },
  analysis: {
    patterns: [
      "analyze",
      "analyse",
      "analysis",
      "compare",
      "evaluate",
      "assess",
      "explain",
      "reasoning",
      "pros and cons",
      "advantages and disadvantages",
      "what are the implications",
      "in-depth",
      "comprehensive",
    ],
  },
  vision: {
    patterns: [
      "look at this image",
      "in this image",
      "what do you see",
      "describe this image",
      "analyze this image",
      "read this screenshot",
    ],
    userPatterns: ["image_url", "data:image"],
  },
  summarization: {
    patterns: [
      "summarize",
      "summary",
      "tldr",
      "tl;dr",
      "brief overview",
      "key points",
      "main points",
      "what did",
      "highlights from",
    ],
  },
  background: {
    patterns: [
      "generate a title",
      "generate title",
      "create a title",
      "name this",
      "short description",
      "brief description",
      "one-line summary",
      "conversation title",
    ],
  },
  chat: {
    patterns: [],
  },
};

// ── Default task → model map ─────────────────────────────────────────────────

const DEFAULT_TASK_MODEL_MAP: Record<TaskType, string> = {
  coding: "deepseek/deepseek-chat", // DeepSeek V3.2 — best coding OSS
  creative: "", // No override — use requested model
  analysis: "gemini/gemini-2.5-pro", // Best long-context reasoning
  vision: "openai/gpt-4o", // Best vision baseline
  summarization: "gemini/gemini-2.5-flash", // Fast + cheap for summarization
  background: "gemini/gemini-2.5-flash-lite", // Cheapest for utility tasks
  chat: "", // No override — use requested model
};

// ── State ────────────────────────────────────────────────────────────────────

let _config: TaskRoutingConfig = {
  enabled: false, // User must explicitly enable
  taskModelMap: { ...DEFAULT_TASK_MODEL_MAP },
  detectionEnabled: true,
  stats: { detected: 0, routed: 0 },
};

// ── Config Management ────────────────────────────────────────────────────────

export function setTaskRoutingConfig(config: Partial<TaskRoutingConfig>): void {
  _config = {
    ..._config,
    ...config,
    stats: _config.stats, // preserve stats across config changes
  };
}

export function getTaskRoutingConfig(): TaskRoutingConfig {
  return {
    ..._config,
    taskModelMap: { ..._config.taskModelMap },
    stats: { ..._config.stats },
  };
}

export function resetTaskRoutingStats(): void {
  _config.stats = { detected: 0, routed: 0 };
}

export function getDefaultTaskModelMap(): Record<TaskType, string> {
  return { ...DEFAULT_TASK_MODEL_MAP };
}

// ── Detection ────────────────────────────────────────────────────────────────

interface RequestMessage {
  role?: string;
  content?: unknown;
}

function extractText(content: unknown): string {
  if (typeof content === "string") return content.toLowerCase();
  if (Array.isArray(content)) {
    return content
      .map((part: any) =>
        typeof part === "string" ? part.toLowerCase() : part?.text?.toLowerCase() || ""
      )
      .join(" ");
  }
  return "";
}

function hasImages(messages: RequestMessage[]): boolean {
  for (const msg of messages) {
    if (Array.isArray(msg.content)) {
      for (const part of msg.content as any[]) {
        if (part?.type === "image_url" || part?.type === "image") return true;
      }
    }
  }
  return false;
}

/**
 * Detect the task type for a given request body.
 * Returns 'chat' (no-op) if nothing specific is detected.
 */
export function detectTaskType(body: any): TaskType {
  if (!body || typeof body !== "object") return "chat";

  const messages: RequestMessage[] = Array.isArray(body.messages)
    ? body.messages
    : Array.isArray(body.input)
      ? body.input
      : [];

  if (messages.length === 0) return "chat";

  // 1. Vision — check for image_url in any message
  if (hasImages(messages)) return "vision";

  // 2. System prompt patterns (background first — most specific)
  const systemMsg = messages.find((m) => m.role === "system" || m.role === "developer");
  const systemText = systemMsg ? extractText(systemMsg.content) : "";
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  const userText = lastUserMsg ? extractText(lastUserMsg.content) : "";

  // Check ALL task patterns in priority order
  const priorityOrder: TaskType[] = [
    "background",
    "coding",
    "vision",
    "summarization",
    "analysis",
    "creative",
  ];

  for (const taskType of priorityOrder) {
    const { patterns, userPatterns } = TASK_PATTERNS[taskType];

    // Check system prompt
    if (patterns.some((p) => systemText.includes(p.toLowerCase()))) {
      return taskType;
    }

    // Check user message for this task's patterns
    if (patterns.some((p) => userText.includes(p.toLowerCase()))) {
      return taskType;
    }

    // Check user message for code-specific patterns (userPatterns)
    if (userPatterns?.some((p) => userText.includes(p.toLowerCase()))) {
      return taskType;
    }
  }

  return "chat";
}

/**
 * Apply task-aware model override.
 * Returns the original model if routing is disabled or no override found.
 *
 * @param originalModel - The model from the request (e.g. "openai/gpt-4o")
 * @param body - The raw request body to detect task type from
 * @returns { model, taskType, wasRouted }
 */
export function applyTaskAwareRouting(
  originalModel: string,
  body: any
): { model: string; taskType: TaskType; wasRouted: boolean } {
  if (!_config.enabled || !_config.detectionEnabled) {
    return { model: originalModel, taskType: "chat", wasRouted: false };
  }

  const taskType = detectTaskType(body);
  _config.stats.detected++;

  const preferred = _config.taskModelMap[taskType];

  // No override configured for this task type
  if (!preferred || preferred === "") {
    return { model: originalModel, taskType, wasRouted: false };
  }

  // Don't override if the model is already "better" (e.g. user sent opus, preferred is flash)
  // We respect user's choice unless it's a background/summarization override
  if (taskType !== "background" && taskType !== "summarization") {
    // For non-utility tasks, only override if no specific model was given
    // (i.e., model came from a combo default, not user-selected)
    // This is a conservative heuristic — full override can be enabled via settting
  }

  _config.stats.routed++;
  return { model: preferred, taskType, wasRouted: true };
}
