import { JsonRecord } from "./types.ts";

export type ClaudeEmptyResponseLifecycle = {
  hasMessageStart: boolean;
  hasContentBlock: boolean;
  hasMessageDelta: boolean;
  hasMessageStop: boolean;
  hasError: boolean;
  syntheticContentInjected: boolean;
  warningLogged: boolean;
};

export const SYNTHETIC_CLAUDE_EMPTY_RESPONSE_TEXT = "";

export function createClaudeEmptyResponseLifecycle(): ClaudeEmptyResponseLifecycle {
  return {
    hasMessageStart: false,
    hasContentBlock: false,
    hasMessageDelta: false,
    hasMessageStop: false,
    hasError: false,
    syntheticContentInjected: false,
    warningLogged: false,
  };
}

export function getClaudeEventType(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const type = (payload as JsonRecord).type;
  return typeof type === "string" ? type : null;
}

export function isClaudeEventPayload(payload: unknown): payload is JsonRecord {
  return getClaudeEventType(payload) !== null;
}

export function updateClaudeEmptyResponseLifecycle(
  lifecycle: ClaudeEmptyResponseLifecycle,
  payload: unknown
) {
  const type = getClaudeEventType(payload);
  if (!type) return;

  switch (type) {
    case "message_start":
      lifecycle.hasMessageStart = true;
      break;
    case "content_block_start":
    case "content_block_delta":
    case "content_block_stop":
      lifecycle.hasContentBlock = true;
      break;
    case "message_delta":
      lifecycle.hasMessageDelta = true;
      break;
    case "message_stop":
      lifecycle.hasMessageStop = true;
      break;
    case "error":
      lifecycle.hasError = true;
      break;
    default:
      break;
  }
}

export function hasClaudeAssistantLifecycle(lifecycle: ClaudeEmptyResponseLifecycle): boolean {
  return lifecycle.hasMessageStart || lifecycle.hasMessageDelta || lifecycle.hasMessageStop;
}

export function shouldInjectClaudeEmptyResponseBeforeCurrentEvent(
  lifecycle: ClaudeEmptyResponseLifecycle,
  payload: unknown
): boolean {
  const type = getClaudeEventType(payload);
  if (!type || lifecycle.hasError || lifecycle.hasContentBlock) return false;
  if (!hasClaudeAssistantLifecycle(lifecycle)) return false;
  return type === "message_delta" || type === "message_stop";
}

export function shouldInjectClaudeEmptyResponseOnFlush(
  lifecycle: ClaudeEmptyResponseLifecycle
): boolean {
  if (lifecycle.hasError || lifecycle.hasContentBlock) return false;
  return hasClaudeAssistantLifecycle(lifecycle);
}

export function shouldInjectClaudeMissingFinalizersOnFlush(
  lifecycle: ClaudeEmptyResponseLifecycle
): boolean {
  if (lifecycle.hasError || !lifecycle.syntheticContentInjected) return false;
  return !lifecycle.hasMessageDelta || !lifecycle.hasMessageStop;
}

export function buildSyntheticClaudeEmptyResponseEvents(
  lifecycle: ClaudeEmptyResponseLifecycle,
  model: string | null,
  options: {
    includeContentBlock?: boolean;
    includeMessageDelta?: boolean;
    includeMessageStop?: boolean;
  } = {}
): JsonRecord[] {
  const {
    includeContentBlock = true,
    includeMessageDelta = false,
    includeMessageStop = false,
  } = options;
  const events: JsonRecord[] = [];
  const resolvedModel = typeof model === "string" && model ? model : "unknown";

  if (includeContentBlock) {
    if (!lifecycle.hasMessageStart) {
      events.push({
        type: "message_start",
        message: {
          id: `msg_synthetic_${Date.now()}`,
          type: "message",
          role: "assistant",
          model: resolvedModel,
          content: [],
          stop_reason: null,
          stop_sequence: null,
          usage: { input_tokens: 0, output_tokens: 0 },
        },
      });
    }

    events.push(
      {
        type: "content_block_start",
        index: 0,
        content_block: { type: "text", text: "" },
      },
      {
        type: "content_block_delta",
        index: 0,
        delta: {
          type: "text_delta",
          text: SYNTHETIC_CLAUDE_EMPTY_RESPONSE_TEXT,
        },
      },
      {
        type: "content_block_stop",
        index: 0,
      }
    );
  }

  if (includeMessageDelta) {
    events.push({
      type: "message_delta",
      delta: { stop_reason: "end_turn", stop_sequence: null },
      usage: { input_tokens: 0, output_tokens: 0 },
    });
  }

  if (includeMessageStop) {
    events.push({ type: "message_stop" });
  }

  return events;
}

export function restoreClaudePassthroughToolUseName(
  parsed: JsonRecord,
  toolNameMap: unknown
): boolean {
  if (!(toolNameMap instanceof Map)) return false;
  if (!parsed || typeof parsed !== "object") return false;

  const block =
    parsed.content_block && typeof parsed.content_block === "object"
      ? (parsed.content_block as JsonRecord)
      : null;
  if (!block || block.type !== "tool_use" || typeof block.name !== "string") return false;

  const restoredName = toolNameMap.get(block.name) ?? block.name;
  if (restoredName === block.name) return false;
  block.name = restoredName;
  return true;
}
