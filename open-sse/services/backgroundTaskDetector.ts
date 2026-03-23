/**
 * Background Task Detector — Feature 3
 *
 * Detects when CLI tools send "background" requests (title generation,
 * summarization, short descriptions) and provides model degradation
 * recommendations to save premium model quota.
 *
 * Detection heuristics:
 * - System prompt patterns indicating background/utility tasks
 * - Very short conversations with summary-like system prompts
 * - X-Request-Priority header
 */

// ── Configuration ───────────────────────────────────────────────────────────

interface DegradationConfig {
  enabled: boolean;
  degradationMap: Record<string, string>; // original → cheaper model
  detectionPatterns: string[]; // regex patterns for system prompt matching
  stats: {
    detected: number;
    tokensSaved: number;
  };
}

const DEFAULT_DETECTION_PATTERNS = [
  "generate a title",
  "generate title",
  "create a title",
  "create a short",
  "summarize this",
  "summarize the",
  "write a brief",
  "write a summary",
  "one-line summary",
  "one line summary",
  "short description",
  "brief description",
  "conversation title",
  "chat title",
  "name this conversation",
  "name this chat",
  "title for this",
  "suggest a title",
  "label this",
];

const DEFAULT_DEGRADATION_MAP: Record<string, string> = {
  // Premium → Cheap alternatives
  "claude-opus-4-6": "gemini-3-flash",
  "claude-opus-4-6-thinking": "gemini-3-flash",
  "claude-opus-4-5-20251101": "gemini-3-flash",
  "claude-sonnet-4-5-20250929": "gemini-3-flash",
  "claude-sonnet-4-20250514": "gemini-3-flash",
  "claude-sonnet-4": "gemini-3-flash",
  "gemini-3.1-pro": "gemini-3-flash",
  "gemini-3.1-pro-high": "gemini-3-flash",
  "gemini-3-pro-preview": "gemini-3-flash-preview",
  "gemini-2.5-pro": "gemini-3-flash",
  "gpt-4o": "gpt-4o-mini",
  "gpt-5": "gpt-5-mini",
  "gpt-5.1": "gpt-5-mini",
  "gpt-5.1-codex": "gpt-5.1-codex-mini",
};

// ── State ───────────────────────────────────────────────────────────────────

let _config: DegradationConfig = {
  enabled: false, // Disabled by default — user must opt in
  degradationMap: { ...DEFAULT_DEGRADATION_MAP },
  detectionPatterns: [...DEFAULT_DETECTION_PATTERNS],
  stats: { detected: 0, tokensSaved: 0 },
};

// ── Config Management ───────────────────────────────────────────────────────

/**
 * Set the background degradation config (called from settings API or startup).
 */
export function setBackgroundDegradationConfig(config: Partial<DegradationConfig>): void {
  _config = {
    ..._config,
    ...config,
    stats: _config.stats, // preserve stats across config changes
  };
}

/**
 * Get current background degradation config.
 */
export function getBackgroundDegradationConfig(): DegradationConfig {
  return {
    ..._config,
    degradationMap: { ..._config.degradationMap },
    detectionPatterns: [..._config.detectionPatterns],
    stats: { ..._config.stats },
  };
}

/**
 * Reset stats counters.
 */
export function resetStats(): void {
  _config.stats = { detected: 0, tokensSaved: 0 };
}

// ── Detection ───────────────────────────────────────────────────────────────

interface BackgroundMessage {
  role?: string;
  content?: unknown;
}

interface BackgroundTaskBody {
  messages?: BackgroundMessage[];
  input?: BackgroundMessage[];
  max_tokens?: unknown;
  max_completion_tokens?: unknown;
  max_output_tokens?: unknown;
}

function toMessageArray(value: unknown): BackgroundMessage[] {
  return Array.isArray(value) ? (value as BackgroundMessage[]) : [];
}

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function headerValue(headers: Record<string, string> | null, key: string): string {
  if (!headers) return "";
  const value = headers[key] ?? headers[key.toLowerCase()] ?? headers[key.toUpperCase()];
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Get reason label when request is a background/utility task.
 *
 * @param {object} body - Request body
 * @param {object} [headers] - Request headers (optional)
 * @returns {string | null} Reason label or null when not detected
 */
export function getBackgroundTaskReason(
  body: BackgroundTaskBody | unknown,
  headers: Record<string, string> | null = null
): string | null {
  if (!body || typeof body !== "object") return null;
  const typedBody = body as BackgroundTaskBody;

  // 1. Check explicit header
  if (headers) {
    const taskType = headerValue(headers, "x-task-type");
    const priority = headerValue(headers, "x-request-priority");
    const initiator = headerValue(headers, "x-initiator");
    const explicitValue = [taskType, priority, initiator].find(Boolean);
    if (explicitValue && explicitValue.toLowerCase() === "background") {
      return "header_background";
    }
  }

  // 2. Very low max tokens usually indicates utility/background tasks
  const maxTokens = toFiniteNumber(
    typedBody.max_tokens ?? typedBody.max_completion_tokens ?? typedBody.max_output_tokens
  );
  if (maxTokens !== null && maxTokens > 0 && maxTokens < 50) {
    return "low_max_tokens";
  }

  // 3. Check system prompt for background task patterns
  const messages = toMessageArray(typedBody.messages ?? typedBody.input ?? []);
  if (!Array.isArray(messages) || messages.length === 0) return null;

  // Find system message
  const systemMsg = messages.find(
    (message: BackgroundMessage) => message.role === "system" || message.role === "developer"
  );
  if (!systemMsg) return null;

  const systemContent =
    typeof systemMsg.content === "string" ? systemMsg.content.toLowerCase() : "";

  if (!systemContent) return null;

  // Check against detection patterns
  const matched = _config.detectionPatterns.some((pattern) =>
    systemContent.includes(pattern.toLowerCase())
  );

  if (!matched) return null;

  // 4. Additional heuristic: background tasks typically have very few messages
  // (system + 1-2 user messages)
  const userMessages = messages.filter((message: BackgroundMessage) => message.role === "user");
  if (userMessages.length > 3) return null; // Too many turns for a background task

  return "system_prompt_pattern";
}

/**
 * Check if a request is a background/utility task.
 *
 * @param {object} body - Request body
 * @param {object} [headers] - Request headers (optional)
 * @returns {boolean} True if the request looks like a background task
 */
export function isBackgroundTask(
  body: BackgroundTaskBody | unknown,
  headers: Record<string, string> | null = null
): boolean {
  return getBackgroundTaskReason(body, headers) !== null;
}

/**
 * Get the degraded (cheaper) model for a given model.
 *
 * @param {string} originalModel - The original model ID
 * @returns {string} The cheaper model or original if no mapping exists
 */
export function getDegradedModel(originalModel: string): string {
  if (!originalModel) return originalModel;

  const degraded = _config.degradationMap[originalModel];
  if (degraded) {
    _config.stats.detected++;
    return degraded;
  }

  return originalModel;
}

/**
 * Get default degradation map (for UI reset).
 */
export function getDefaultDegradationMap(): Record<string, string> {
  return { ...DEFAULT_DEGRADATION_MAP };
}

/**
 * Get default detection patterns (for UI reset).
 */
export function getDefaultDetectionPatterns(): string[] {
  return [...DEFAULT_DETECTION_PATTERNS];
}
