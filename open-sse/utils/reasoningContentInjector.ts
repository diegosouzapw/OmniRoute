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
const K3_AUTHENTIC_REASONING_PATTERN = /(?:^|\/)(?:kimi-)?k3(?:$|-)/i;
const NATIVE_K27_AUTHENTIC_REASONING_PATTERN = /(?:^|\/)kimi-k2\.7-code(?:$|-)/i;

/**
 * K3 requires authentic reasoning regardless of which provider serves it.
 * Native Moonshot K2.7 retains the same preserved-thinking contract. Empty
 * protocol markers remain valid only after client content and replay miss.
 */
export function requiresAuthenticReasoningContent(provider: unknown, model: unknown): boolean {
  const normalizedModel = String(model ?? "").trim();
  if (K3_AUTHENTIC_REASONING_PATTERN.test(normalizedModel)) return true;

  const normalizedProvider = String(provider ?? "")
    .trim()
    .toLowerCase();
  return (
    (normalizedProvider === "moonshot" || normalizedProvider === "kimi") &&
    NATIVE_K27_AUTHENTIC_REASONING_PATTERN.test(normalizedModel)
  );
}

export function isThinkingMessageModel(model: string | undefined | null): boolean {
  if (!model || typeof model !== "string") return false;
  return THINKING_MODEL_PATTERNS.some((re) => re.test(model));
}

/**
 * `providerRequiresEcho` is resolved by the caller (Moonshot/Kimi legacy check,
 * or a registry entry's `requiresReasoningContentEcho` capability flag — see
 * `open-sse/config/providers/shared.ts`) so the provider allowlist lives in one
 * place instead of being duplicated here. See issue #13599.
 */
export function shouldInjectReasoningContentPlaceholder(
  providerRequiresEcho: boolean,
  provider: unknown,
  model: string | undefined | null
): boolean {
  return (
    providerRequiresEcho &&
    !requiresAuthenticReasoningContent(provider, model) &&
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
