import { appendBoundedText } from "./streamHelpers.ts";

type ClaudeDeltaState = {
  accumulatedContent?: string;
  accumulatedReasoning?: string;
};

export function collectClaudeDelta(delta: unknown, state?: ClaudeDeltaState) {
  const record =
    delta && typeof delta === "object" && !Array.isArray(delta)
      ? (delta as Record<string, unknown>)
      : {};
  const text = record.text;
  const thinking = record.thinking;
  let contentLength = 0;

  if (typeof text === "string" && text) {
    contentLength += text.length;
    if (state?.accumulatedContent !== undefined)
      state.accumulatedContent = appendBoundedText(state.accumulatedContent, text);
  }
  if (typeof thinking === "string" && thinking) {
    contentLength += thinking.length;
    if (state?.accumulatedReasoning !== undefined)
      state.accumulatedReasoning = appendBoundedText(state.accumulatedReasoning, thinking);
  }

  return { contentLength, hasText: typeof text === "string" };
}

type JsonRecord = Record<string, unknown>;

const MAX_TOOL_USE_NAMES = 20;

/**
 * Non-enumerable field on the assembled chat message that carries Claude passthrough tool names
 * to the session-turn extractor only. JSON.stringify, object spreads and structuredClone all skip
 * it, so call logs, the semantic cache and reasoning replay see the body exactly as before.
 */
export const TOOL_USE_NAMES_FIELD = "_omnirouteToolNames";

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

/**
 * Claude passthrough forwards `tool_use` blocks verbatim, so the call-log body never saw them.
 * Records the block's name (after the caller restored the client-facing name), bounded and
 * de-duplicated. Read-only: the forwarded event is not modified.
 */
export function collectToolUseName(toolNames: string[], event: unknown): void {
  const record = asRecord(event);
  if (record?.type !== "content_block_start") return;
  const block = asRecord(record.content_block);
  const name =
    block?.type === "tool_use" && typeof block.name === "string" ? block.name.trim() : "";
  if (!name || toolNames.length >= MAX_TOOL_USE_NAMES || toolNames.includes(name)) return;
  toolNames.push(name);
}

/** Attaches the collected names under {@link TOOL_USE_NAMES_FIELD}; the message stays as is. */
export function attachToolUseNames(message: JsonRecord, toolNames: readonly string[]): void {
  if (toolNames.length === 0) return;
  Object.defineProperty(message, TOOL_USE_NAMES_FIELD, {
    value: [...toolNames],
    enumerable: false,
    configurable: true,
  });
}
