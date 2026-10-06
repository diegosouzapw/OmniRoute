/**
 * xAI rejects a request with HTTP 413 when chat history exceeds 800 items:
 *   "Chat history exceeds the 800-message limit; compact the conversation and retry."
 *
 * Token-based compression does not catch this: a long agent loop of tiny
 * tool calls still fits a 256k–500k window. Cap the arrays xAI actually
 * counts — Chat Completions `messages` and Responses `input` — at the
 * executor edge, after any chat→Responses expansion.
 */
import {
  fixToolAdjacency,
  fixToolPairs,
  stripTrailingAssistantOrphanToolUse,
} from "./contextManager.ts";

export const XAI_CHAT_HISTORY_LIMIT = 800;

type HistoryItem = Record<string, unknown>;

function isSystemRole(item: HistoryItem): boolean {
  return item.role === "system" || item.role === "developer";
}

function repairChatMessages(messages: HistoryItem[]): HistoryItem[] {
  let result = fixToolPairs(messages);
  result = fixToolAdjacency(result);
  result = fixToolPairs(result);
  return stripTrailingAssistantOrphanToolUse(result);
}

/**
 * Keep system/developer messages plus the newest tail, then drop tool-call
 * orphans created by the cut. If the repaired list is still over the limit
 * (lots of system messages), take the newest `limit` items and repair again.
 */
export function capXaiChatMessages(
  messages: HistoryItem[],
  limit = XAI_CHAT_HISTORY_LIMIT
): HistoryItem[] {
  if (!Array.isArray(messages) || messages.length <= limit) return messages;

  const system = messages.filter(isSystemRole);
  const nonSystem = messages.filter((item) => !isSystemRole(item));
  const budget = Math.max(2, limit - system.length);
  let result = repairChatMessages([...system, ...nonSystem.slice(-budget)]);

  if (result.length > limit) {
    result = repairChatMessages(result.slice(-limit));
  }
  return result;
}

function lastUserIndex(items: HistoryItem[]): number {
  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i].role === "user") return i;
  }
  return -1;
}

/**
 * Responses `input` expands one assistant+tools chat turn into many items
 * (`function_call` + `function_call_output`). Drop orphans left by a tail cut:
 * outputs whose call was dropped, and mid-history calls whose output was
 * dropped. Trailing unmatched `function_call`s (the in-flight turn) stay.
 */
export function repairXaiResponsesInput(items: HistoryItem[]): HistoryItem[] {
  const callIds = new Set<string>();
  const outputIds = new Set<string>();
  for (const item of items) {
    if (typeof item.call_id !== "string") continue;
    if (item.type === "function_call") callIds.add(item.call_id);
    if (item.type === "function_call_output") outputIds.add(item.call_id);
  }

  const lastUser = lastUserIndex(items);
  return items.filter((item, idx) => {
    if (item.type === "function_call_output") {
      return typeof item.call_id === "string" && callIds.has(item.call_id);
    }
    if (item.type === "function_call") {
      if (typeof item.call_id === "string" && outputIds.has(item.call_id)) return true;
      return lastUser < 0 || idx > lastUser;
    }
    return true;
  });
}

export function capXaiResponsesInput(
  input: HistoryItem[],
  limit = XAI_CHAT_HISTORY_LIMIT
): HistoryItem[] {
  if (!Array.isArray(input) || input.length <= limit) return input;

  let result = repairXaiResponsesInput(input.slice(-limit));
  if (result.length > limit) {
    result = repairXaiResponsesInput(result.slice(-limit));
  }
  return result;
}

/**
 * Cap whichever history array the body is using. No-op (same object /
 * same array refs) when already within the limit.
 */
export function capXaiRequestHistory(
  body: Record<string, unknown>
): Record<string, unknown> {
  if (!body || typeof body !== "object") return body;

  const next: Record<string, unknown> = { ...body };
  let changed = false;

  if (Array.isArray(body.messages)) {
    const messages = capXaiChatMessages(body.messages as HistoryItem[]);
    if (messages !== body.messages) {
      next.messages = messages;
      changed = true;
    }
  }
  if (Array.isArray(body.input)) {
    const input = capXaiResponsesInput(body.input as HistoryItem[]);
    if (input !== body.input) {
      next.input = input;
      changed = true;
    }
  }

  return changed ? next : body;
}
