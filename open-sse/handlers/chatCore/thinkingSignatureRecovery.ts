/**
 * Request-scoped recovery for Anthropic "Invalid signature in thinking block"
 * errors (issue #7899).
 *
 * When an Anthropic target rejects a multi-turn request because a historical
 * thinking block carries a signature it cannot validate (after a routing,
 * model, or account change), the correct response is to retry the request
 * once after removing thinking blocks from completed historical assistant
 * turns — while preserving the active tool-use cycle and the latest assistant
 * message.
 *
 * Removing thinking from every request upfront is unsafe: it changes valid
 * requests and can alter prompt-cache and tool-use behaviour. The recovery
 * must only engage when the exact upstream validation error is observed.
 */

type ContentBlock = {
  type?: string;
  thinking?: string;
  signature?: string;
  [key: string]: unknown;
};

type Message = {
  role?: string;
  content?: string | ContentBlock[];
  [key: string]: unknown;
};

/**
 * Detect the Anthropic 400 "Invalid signature in thinking block" validation
 * error from the parsed upstream error fields. This is intentionally narrow:
 * generic 400s, 429s, and the separate "latest assistant message cannot be
 * modified" error must NOT trigger this recovery.
 */
export function isThinkingSignatureError(
  statusCode: number,
  message: string
): boolean {
  if (statusCode !== 400) return false;
  const lower = (message || "").toLowerCase();
  // Match the exact Anthropic validation message. The field path prefix
  // (messages.1.content.0:) varies by position, so match on the invariant
  // substring.
  return lower.includes("invalid") && lower.includes("signature") && lower.includes("thinking");
}

/**
 * Remove `thinking` (and `redacted_thinking`) blocks from completed historical
 * assistant turns. A "completed" assistant turn is any assistant message that
 * is NOT the last message in the array AND is not part of an active
 * tool_use → tool_result cycle (i.e. the following message is a user message
 * that is NOT a tool_result).
 *
 * The last assistant message is never touched: Anthropic rejects modification
 * of the latest assistant message with a separate "latest assistant message
 * cannot be modified" error, and the thinking blocks there are still valid.
 *
 * Returns { messages, removed } where removed is the count of thinking blocks
 * stripped. If no thinking could be removed safely, returns removed=0 so the
 * caller can surface the original error without retrying.
 */
export function stripHistoricalThinking(
  messages: unknown
): { messages: unknown; removed: number } {
  if (!Array.isArray(messages)) {
    return { messages, removed: 0 };
  }

  const msgs = messages as Message[];
  let removed = 0;

  const result: Message[] = [];

  for (let i = 0; i < msgs.length; i++) {
    const msg = msgs[i];

    // Only strip from assistant messages that are NOT the last message
    // (the last assistant message may be the active turn).
    if (
      msg?.role === "assistant" &&
      i < msgs.length - 1 &&
      Array.isArray(msg.content)
    ) {
      const filtered = (msg.content as ContentBlock[]).filter((block) => {
        const isThinking =
          block?.type === "thinking" || block?.type === "redacted_thinking";
        if (isThinking) {
          // Check if this thinking block is part of an active tool-use cycle:
          // if the block is immediately followed by a tool_use block in the
          // same message, the thinking belongs to that tool_use and must be
          // preserved (Anthropic requires the thinking preceding a tool_use
          // to remain in place for the tool_use to be valid).
          const blockIdx = (msg.content as ContentBlock[]).indexOf(block);
          const nextBlock = (msg.content as ContentBlock[])[blockIdx + 1];
          if (nextBlock?.type === "tool_use") {
            return true; // keep thinking — it's part of an active tool cycle
          }
          removed++;
          return false; // strip
        }
        return true;
      });

      // If we removed all content blocks, replace with a minimal text block
      // so the assistant message is not empty (Anthropic requires non-empty
      // content).
      if (filtered.length === 0) {
        result.push({
          ...msg,
          content: [{ type: "text", text: "" }],
        });
      } else {
        result.push({ ...msg, content: filtered });
      }
    } else {
      result.push(msg);
    }
  }

  return { messages: result, removed };
}