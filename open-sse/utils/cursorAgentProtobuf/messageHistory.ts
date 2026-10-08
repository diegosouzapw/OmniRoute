import { scrubKimiNarrationText } from "../kimiToolCallNarration.ts";

// ─── User message extractor (for chat-completions input) ───────────────────

export type ChatMessage = {
  role: "user" | "assistant" | "system" | "tool";
  content?: string | Array<{ type: string; text?: string }> | null;
  tool_calls?: Array<{
    id: string;
    type?: "function" | string;
    function: { name: string; arguments: string };
  }>;
  tool_call_id?: string;
};

export function messageContentToText(content: ChatMessage["content"]): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => (typeof part?.text === "string" ? part.text : ""))
    .filter(Boolean)
    .join("\n");
}

function assistantMessageLines(message: ChatMessage, text: string): string[] {
  // History hygiene (PR #12723 follow-up): scrub gateway-dialect constructs
  // from prior assistant visible text. A previously leaked narration /
  // "User: <tool_result>" block re-sent in history re-anchors model mimicry
  // of the gateway's own serialization on every subsequent turn — this
  // breaks the compounding loop at the carrier. Only ASSISTANT text is
  // scrubbed: a user legitimately quoting a dialect line must reach the model.
  const lines = text ? [`Assistant: ${scrubKimiNarrationText(text).content || text}`] : [];
  for (const toolCall of message.tool_calls ?? []) {
    const name = toolCall.function?.name ?? "(unknown)";
    const args = toolCall.function?.arguments ?? "";
    lines.push(`Assistant called tool ${name} (${toolCall.id}) with arguments: ${args}`);
  }
  return lines;
}

function chatMessageLines(message: ChatMessage): string[] {
  const text = messageContentToText(message.content);
  if (message.role === "user") return text ? [`User: ${text}`] : [];
  if (message.role === "assistant") return assistantMessageLines(message, text);
  if (message.role === "tool") {
    return [`Tool result (${message.tool_call_id ?? "(unknown)"}): ${text}`];
  }
  return text ? [`${message.role}: ${text}`] : [];
}

function joinSystemText(systemTexts: string[], body: string): string {
  return systemTexts.length > 0 ? `${systemTexts.join("\n\n")}\n\n${body}` : body;
}

/**
 * Flatten an OpenAI-shaped message list down to a single user-text string
 * suitable for cursor's UserMessage. The agent endpoint expects ONE user
 * message per Run; we concatenate prior conversation as context.
 *
 * Phase 6 cold-resume support: handles `role:"tool"` results and
 * `assistant.tool_calls` so that follow-up turns after an OpenAI tool call
 * round-trip coherently. Format follows kaitranntt's reference impl —
 * cursor's model has been observed to handle this layout reliably.
 */
export function flattenMessages(messages: ChatMessage[]): string {
  if (!Array.isArray(messages) || messages.length === 0) return "";

  // System instructions go first as a labeled prefix. (The cursor executor
  // routes system messages through the KV blob channel — see Phase 7 — but
  // this branch is kept for non-cursor callers.)
  const systemTexts = messages
    .filter((m) => m.role === "system")
    .map((m) => messageContentToText(m.content))
    .filter(Boolean);

  const turn = messages.filter((m) => m.role !== "system");

  // Single-user-message fast path (no tool_calls, no labels).
  if (turn.length === 1 && turn[0].role === "user" && !turn[0].tool_calls) {
    return joinSystemText(systemTexts, messageContentToText(turn[0].content));
  }

  // Multi-turn / tool-using format. Each message is labeled. Tool calls
  // and tool results get their own labeled lines.
  const labelled = turn.flatMap(chatMessageLines).join("\n\n");
  return joinSystemText(systemTexts, labelled);
}
