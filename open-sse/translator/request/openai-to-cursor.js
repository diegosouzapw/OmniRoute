/**
 * OpenAI to Cursor Request Translator
 * Converts OpenAI messages to Cursor simple format
 */
import { register } from "../index.js";
import { FORMATS } from "../formats.js";

/**
 * Convert OpenAI messages to Cursor format with native tool_results support
 * - system → user with [System Instructions] prefix
 * - tool → accumulate into tool_results array for next user/assistant message
 * - assistant with tool_calls → keep tool_calls structure (Cursor supports it natively)
 */
function convertMessages(messages) {
  const result = [];
  let pendingToolResults = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    if (msg.role === "system") {
      result.push({
        role: "user",
        content: `[System Instructions]\n${msg.content}`,
      });
      continue;
    }

    if (msg.role === "tool") {
      let toolContent = "";
      if (typeof msg.content === "string") {
        toolContent = msg.content;
      } else if (Array.isArray(msg.content)) {
        for (const part of msg.content) {
          if (part.type === "text") {
            toolContent += part.text;
          }
        }
      }

      const toolName = msg.name || "tool";
      const toolCallId = msg.tool_call_id || "";

      // Accumulate tool result
      pendingToolResults.push({
        tool_call_id: toolCallId,
        name: toolName,
        index: pendingToolResults.length,
        raw_args: toolContent,
      });
      continue;
    }

    if (msg.role === "user" || msg.role === "assistant") {
      let content = "";

      if (typeof msg.content === "string") {
        content = msg.content;
      } else if (Array.isArray(msg.content)) {
        for (const part of msg.content) {
          if (part.type === "text") {
            content += part.text;
          }
        }
      }

      // Keep tool_calls structure for assistant messages
      if (msg.role === "assistant" && msg.tool_calls && msg.tool_calls.length > 0) {
        const assistantMsg = { role: "assistant" };
        if (content) {
          assistantMsg.content = content;
        }
        assistantMsg.tool_calls = msg.tool_calls;

        // Attach pending tool results to assistant message with tool_calls
        if (pendingToolResults.length > 0) {
          assistantMsg.tool_results = pendingToolResults;
          pendingToolResults = [];
        }

        result.push(assistantMsg);
      } else if (content || pendingToolResults.length > 0) {
        const msgObj = {
          role: msg.role,
          content: content || "",
        };

        // Attach pending tool results to this message
        if (pendingToolResults.length > 0) {
          msgObj.tool_results = pendingToolResults;
          pendingToolResults = [];
        }

        result.push(msgObj);
      }
    }
  }

  return result;
}

/**
 * Transform OpenAI request to Cursor format
 * Returns modified body with converted messages
 */
export function buildCursorRequest(model, body, stream, credentials) {
  const messages = convertMessages(body.messages || []);

  return {
    ...body,
    messages,
  };
}

register(FORMATS.OPENAI, FORMATS.CURSOR, buildCursorRequest, null);
