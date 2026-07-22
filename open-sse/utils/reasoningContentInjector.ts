/**
 * Thinking-mode upstreams (DeepSeek V4 Flash, Kimi, MiniMax, xiaomi-tokenplan
 * mimo, ...) require
 * `reasoning_content` to be echoed back on every assistant message in the
 * conversation history. Standard OpenAI clients do not preserve that field
 * across turns, so we inject a non-empty placeholder before forwarding.
 *
 * Without the placeholder these upstreams return:
 *   400 Bad Request — reasoning_content must be passed back
 *
 * Ported from decolua/9router#1099 (issue #1543). Pure helper — no I/O, no
 * cross-module deps — kept narrow so it can be reused by other meta-providers
 * that proxy to thinking-mode models.
 */

const PLACEHOLDER = " ";

type JsonRecord = Record<string, unknown>;

/**
 * Model-id predicates for thinking-mode families that need the echo.
 * Matched case-insensitively against the resolved model id (post upstream
 * routing, e.g. `oc/deepseek-v4-flash-free` for the OpenCode meta-provider).
 */
const THINKING_MODEL_PATTERNS: RegExp[] = [
  /deepseek/i,
  /\bkimi\b/i,
  /\bk2\b/i, // moonshot kimi k2 family alias
  /\bminimax\b/i,
  /\bmimo\b/i, // xiaomi-tokenplan mimo family (e.g. xiaomi-tokenplan/mimo-v2.5-pro)
];

const AUTHENTIC_REASONING_MODEL_PATTERN = /(?:^|\/)kimi-k(?:3|2\.7-code)(?:$|-)/i;

/**
 * Native Moonshot K3/K2.7 replay must use the original reasoning content.
 * A fabricated placeholder changes preserved-thinking history and is not a
 * valid substitute when the client and reasoning cache both lack the field.
 */
export function requiresAuthenticReasoningContent(provider: unknown, model: unknown): boolean {
  const normalizedProvider = String(provider ?? "")
    .trim()
    .toLowerCase();
  const normalizedModel = String(model ?? "").trim();
  return (
    (normalizedProvider === "moonshot" || normalizedProvider === "kimi") &&
    AUTHENTIC_REASONING_MODEL_PATTERN.test(normalizedModel)
  );
}

export function isThinkingMessageModel(model: string | undefined | null): boolean {
  if (!model || typeof model !== "string") return false;
  return THINKING_MODEL_PATTERNS.some((re) => re.test(model));
}

export function shouldInjectReasoningContentPlaceholder(
  provider: unknown,
  model: string | undefined | null
): boolean {
  const normalizedProvider = String(provider ?? "")
    .trim()
    .toLowerCase();
  return (
    (normalizedProvider === "moonshot" || normalizedProvider === "kimi") &&
    !requiresAuthenticReasoningContent(normalizedProvider, model) &&
    isThinkingMessageModel(model)
  );
}

function hasNonEmptyReasoningContent(message: JsonRecord): boolean {
  return (
    typeof message.reasoning_content === "string" &&
    (message.reasoning_content as string).trim().length > 0
  );
}

function isAssistantMessage(value: unknown): value is JsonRecord {
  return (
    !!value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    (value as JsonRecord).role === "assistant"
  );
}

/**
 * Inject a placeholder `reasoning_content` on every assistant message in
 * `body.messages` that lacks one. Returns the original object if no mutation
 * was needed, or a shallow-copied body with a new messages array otherwise.
 *
 * No-op when the body shape is unexpected (defensive).
 */
export function injectReasoningContentForThinkingModel(body: unknown): unknown {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  const record = body as JsonRecord;
  if (!Array.isArray(record.messages)) return body;

  let modified = false;
  const messages = record.messages.map((message) => {
    if (!isAssistantMessage(message)) return message;
    if (hasNonEmptyReasoningContent(message)) return message;
    modified = true;
    return { ...message, reasoning_content: PLACEHOLDER };
  });

  return modified ? { ...record, messages } : body;
}
