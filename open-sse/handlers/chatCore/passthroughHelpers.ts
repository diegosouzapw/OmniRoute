import { FORMATS } from "../../translator/formats.ts";
import { isClaudeCodeCompatibleProvider } from "../../services/claudeCodeCompatible.ts";
import { getHeaderValueCaseInsensitive } from "./headers.ts";

export function shouldUseNativeCodexPassthrough({
  provider,
  sourceFormat,
  endpointPath,
}: {
  provider?: string | null;
  sourceFormat?: string | null;
  endpointPath?: string | null;
}): boolean {
  if (provider !== "codex") return false;
  if (sourceFormat !== FORMATS.OPENAI_RESPONSES) return false;
  let normalizedEndpoint = String(endpointPath || "");
  while (normalizedEndpoint.endsWith("/")) normalizedEndpoint = normalizedEndpoint.slice(0, -1);
  const segments = normalizedEndpoint.split("/");
  return segments.includes("responses");
}

/**
 * Pass `thinking` / `redacted_thinking` blocks through UNCHANGED.
 *
 * This used to rewrite every assistant thinking block to `redacted_thinking`
 * carrying a synthetic signature, on the assumption that a thinking signature is
 * bound to the auth token that produced it and would be rejected after a token /
 * model switch with 400 "Invalid signature in thinking block" (issue #2454).
 *
 * That rewrite is the actual cause of a different, far more common failure on the
 * Anthropic-native Claude OAuth passthrough:
 *
 *   400 messages.N.content.M: `thinking` or `redacted_thinking` blocks in the
 *   latest assistant message cannot be modified. These blocks must remain as
 *   they were in the original response.
 *
 * The Messages API validates submitted thinking blocks against the original
 * response and rejects ANY modification — so converting them to
 * `redacted_thinking` makes every multi-turn request with thinking fail (most
 * visible on long Claude Code tool-loops). The thinking-block signature is
 * validated server-side by Anthropic and stays valid when the blocks are replayed,
 * including under a different OAuth token — verified by preserving the blocks
 * across a mid-conversation account switch with zero "Invalid signature"
 * responses. The redaction is therefore both unnecessary and the cause of the
 * regression, so the blocks are now returned verbatim. The `signature` parameter
 * is kept for call-site compatibility.
 */
export function redactPassthroughThinkingSignatures(
  messages: unknown,
  _signature: string
): unknown {
  return messages;
}

type MessageLike = {
  role?: unknown;
  content?: unknown;
};

type ThinkingSignatureError = {
  provider?: string | null;
  status?: number | null;
  message?: string | null;
};

function isThinkingBlock(block: unknown): boolean {
  if (!block || typeof block !== "object") return false;
  const type = (block as { type?: unknown }).type;
  return type === "thinking" || type === "redacted_thinking";
}

function hasBlock(message: MessageLike | null | undefined, type: string): boolean {
  return (
    !!message &&
    Array.isArray(message.content) &&
    message.content.some(
      (block) => !!block && typeof block === "object" && (block as { type?: unknown }).type === type
    )
  );
}

/**
 * Match only the Anthropic validation failure this recovery path understands.
 * Generic 400s and the separate "latest assistant message cannot be modified"
 * validation error must continue through the normal error path unchanged.
 */
export function isAnthropicThinkingSignatureError({
  provider,
  status,
  message,
}: ThinkingSignatureError): boolean {
  const isAnthropicTarget =
    provider === "claude" ||
    (typeof provider === "string" && provider.startsWith("anthropic-compatible-"));
  if (!isAnthropicTarget || status !== 400 || typeof message !== "string") return false;

  return /invalid\s+[`'\"]?signature[`'\"]?\s+in\s+[`'\"]?thinking[`'\"]?\s+block/i.test(message);
}

/**
 * Build a one-shot recovery body after Anthropic has explicitly rejected a
 * thinking signature. Historical thinking blocks are omitted, but the complete
 * active tool-use cycle is preserved verbatim: when the request ends in one or
 * more `user[tool_result]` turns, every paired assistant `tool_use` turn in that
 * still-open cycle keeps its thinking blocks. A trailing unresolved assistant
 * `tool_use` turn is protected as well.
 *
 * This helper is intentionally NOT used eagerly. Normal same-model requests must
 * retain their thinking history, cache shape, and current-model semantics.
 * Returns the original body reference when no safe recovery change is possible.
 */
export function stripHistoricalThinkingForSignatureRecovery<T>(body: T): T {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;

  const record = body as Record<string, unknown>;
  if (!Array.isArray(record.messages)) return body;

  const messages = record.messages as MessageLike[];
  const protectedAssistantIndexes = new Set<number>();
  let cursor = messages.length - 1;

  // Some internal callers can resume from an unresolved assistant tool_use.
  if (
    cursor >= 0 &&
    messages[cursor]?.role === "assistant" &&
    hasBlock(messages[cursor], "tool_use")
  ) {
    protectedAssistantIndexes.add(cursor);
    cursor -= 1;
  }

  // Walk the complete trailing tool-result chain. Interleaved thinking can span
  // several assistant/tool_result pairs, so protecting only the latest assistant
  // message is insufficient.
  while (
    cursor >= 0 &&
    messages[cursor]?.role === "user" &&
    hasBlock(messages[cursor], "tool_result")
  ) {
    cursor -= 1;
    while (cursor >= 0 && messages[cursor]?.role !== "assistant") cursor -= 1;
    if (cursor < 0 || !hasBlock(messages[cursor], "tool_use")) break;
    protectedAssistantIndexes.add(cursor);
    cursor -= 1;
  }

  let changed = false;
  const recoveredMessages = messages.map((message, index) => {
    if (
      !message ||
      message.role !== "assistant" ||
      !Array.isArray(message.content) ||
      protectedAssistantIndexes.has(index)
    ) {
      return message;
    }

    const content = message.content.filter((block) => !isThinkingBlock(block));
    if (content.length === message.content.length) return message;
    changed = true;
    return { ...message, content };
  });

  if (!changed) return body;
  return { ...record, messages: recoveredMessages } as T;
}

type SignatureRecoveryExecution<T> = {
  result: T;
  retried: boolean;
  recoveryBody: unknown | null;
};

/** Execute the normal body once, then perform at most one exact-error recovery. */
export async function executeWithAnthropicThinkingSignatureRecovery<T>(args: {
  provider?: string | null;
  body: unknown;
  execute: (body: unknown) => Promise<T>;
  getError: (
    result: T
  ) =>
    | { status?: number | null; message?: string | null }
    | null
    | Promise<{ status?: number | null; message?: string | null } | null>;
}): Promise<SignatureRecoveryExecution<T>> {
  const first = await args.execute(args.body);
  const failure = await args.getError(first);
  if (
    !failure ||
    !isAnthropicThinkingSignatureError({
      provider: args.provider,
      status: failure.status,
      message: failure.message,
    })
  ) {
    return { result: first, retried: false, recoveryBody: null };
  }

  const recoveryBody = stripHistoricalThinkingForSignatureRecovery(args.body);
  if (recoveryBody === args.body) {
    return { result: first, retried: false, recoveryBody: null };
  }

  return {
    result: await args.execute(recoveryBody),
    retried: true,
    recoveryBody,
  };
}

export function isClaudeCodeSemanticPassthroughRequest({
  provider,
  sourceFormat,
  targetFormat,
  headers,
  userAgent,
}: {
  provider?: string | null;
  sourceFormat?: string | null;
  targetFormat?: string | null;
  headers?: Record<string, unknown> | Headers | null;
  userAgent?: string | null;
}): boolean {
  const isDirectClaudeCodeProvider =
    provider === "claude" || isClaudeCodeCompatibleProvider(provider);
  if (!isDirectClaudeCodeProvider) return false;
  if (sourceFormat !== FORMATS.CLAUDE) return false;
  if (targetFormat !== FORMATS.CLAUDE) return false;

  const headerUserAgent = getHeaderValueCaseInsensitive(headers, "user-agent");
  const ua = `${userAgent || ""} ${headerUserAgent || ""}`.toLowerCase();
  if (ua.includes("claude-code") || ua.includes("claude-cli")) return true;

  const appHeader = getHeaderValueCaseInsensitive(headers, "x-app");
  if (typeof appHeader === "string" && appHeader.trim().toLowerCase() === "cli") return true;

  const sessionId = getHeaderValueCaseInsensitive(headers, "x-claude-code-session-id");
  return typeof sessionId === "string" && sessionId.trim().length > 0;
}
