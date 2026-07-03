type ClaudeContentBlock = Record<string, unknown>;
type ClaudeMessage = {
  role: string;
  content: ClaudeContentBlock[];
};

// Anthropic requires each user tool_result turn to immediately follow the
// assistant turn containing the matching tool_use. OpenAI-compatible clients can
// send intervening user text before a later role:"tool" message, so repair the
// ordering here and drop true orphan results.
export function enforceToolResultAdjacency(messages: ClaudeMessage[]): ClaudeMessage[] {
  const assistantByToolUseId = indexAssistantToolUses(messages);
  const resultsByAssistant = new Map<ClaudeMessage, ClaudeContentBlock[]>();
  const strippedMessages: ClaudeMessage[] = [];

  for (const msg of messages) {
    stripAndCollectToolResults(
      msg,
      assistantByToolUseId,
      resultsByAssistant,
      strippedMessages
    );
  }

  return insertAdjacentToolResults(strippedMessages, resultsByAssistant);
}

function indexAssistantToolUses(messages: ClaudeMessage[]): Map<string, ClaudeMessage> {
  const assistantByToolUseId = new Map<string, ClaudeMessage>();
  for (const msg of messages) {
    if (msg.role !== "assistant" || !Array.isArray(msg.content)) continue;
    for (const block of msg.content) {
      if (block.type === "tool_use" && block.id && !assistantByToolUseId.has(String(block.id))) {
        assistantByToolUseId.set(String(block.id), msg);
      }
    }
  }
  return assistantByToolUseId;
}

function stripAndCollectToolResults(
  msg: ClaudeMessage,
  assistantByToolUseId: Map<string, ClaudeMessage>,
  resultsByAssistant: Map<ClaudeMessage, ClaudeContentBlock[]>,
  strippedMessages: ClaudeMessage[]
): void {
  if (msg.role !== "user" || !Array.isArray(msg.content)) {
    strippedMessages.push(msg);
    return;
  }

  const remainingBlocks: ClaudeContentBlock[] = [];
  for (const block of msg.content) {
    if (block.type !== "tool_result") {
      remainingBlocks.push(block);
    } else {
      collectMatchedToolResult(block, assistantByToolUseId, resultsByAssistant);
    }
  }

  if (remainingBlocks.length > 0) {
    strippedMessages.push({ ...msg, content: remainingBlocks });
  }
}

function collectMatchedToolResult(
  block: ClaudeContentBlock,
  assistantByToolUseId: Map<string, ClaudeMessage>,
  resultsByAssistant: Map<ClaudeMessage, ClaudeContentBlock[]>
): void {
  const toolUseId = typeof block.tool_use_id === "string" ? block.tool_use_id : "";
  const assistant = toolUseId ? assistantByToolUseId.get(toolUseId) : undefined;
  if (!assistant) return;

  const grouped = resultsByAssistant.get(assistant) ?? [];
  if (grouped.some((toolResult) => toolResult.tool_use_id === toolUseId)) return;

  grouped.push(block);
  resultsByAssistant.set(assistant, grouped);
}

function insertAdjacentToolResults(
  messages: ClaudeMessage[],
  resultsByAssistant: Map<ClaudeMessage, ClaudeContentBlock[]>
): ClaudeMessage[] {
  const reordered: ClaudeMessage[] = [];
  for (const msg of messages) {
    reordered.push(msg);
    const adjacentResults = orderedResultsForAssistant(msg, resultsByAssistant);
    if (adjacentResults.length > 0) reordered.push({ role: "user", content: adjacentResults });
  }
  return reordered;
}

function orderedResultsForAssistant(
  msg: ClaudeMessage,
  resultsByAssistant: Map<ClaudeMessage, ClaudeContentBlock[]>
): ClaudeContentBlock[] {
  if (msg.role !== "assistant" || !Array.isArray(msg.content)) return [];

  const grouped = resultsByAssistant.get(msg) ?? [];
  return msg.content.flatMap((block) => {
    if (block.type !== "tool_use" || !block.id) return [];
    return grouped.filter((toolResult) => toolResult.tool_use_id === String(block.id));
  });
}
