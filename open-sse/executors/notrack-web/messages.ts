import { MAX_INPUT_CHARS } from "./constants.ts";
import { extractContent, capitalize, truncateMiddle } from "./content.ts";
import { truncateConversation } from "./truncate.ts";
import type { OpenAIMessage } from "./types.ts";

/** Render a single OpenAI message into the inline role-tagged format. */
export function renderMessageLine(m: OpenAIMessage): string | null {
  const roleRaw = m.role || "";
  const role = capitalize(roleRaw);
  const name = typeof m.name === "string" ? m.name : undefined;
  const tag = name ? `${role}(${name})` : role;

  if (roleRaw === "tool") return renderToolResult(m);
  if (roleRaw === "assistant" && Array.isArray(m.tool_calls) && m.tool_calls.length > 0) {
    return renderAssistantToolCalls(m, tag);
  }

  const content = extractContent(m.content).trim();
  if (!content) return null;
  return `[${tag}]\n${content}`;
}

function renderToolResult(m: OpenAIMessage): string {
  const toolName =
    typeof m.name === "string" ? m.name : typeof m.tool_call_id === "string" ? m.tool_call_id : "?";
  const content = extractContent(m.content).trim();
  return `[Tool Result: ${toolName}]\n${content}`;
}

function renderAssistantToolCalls(m: OpenAIMessage, tag: string): string {
  const lines: string[] = [`[${tag}]`];
  for (const tc of m.tool_calls ?? []) {
    const fn =
      tc && typeof tc === "object" && typeof (tc as Record<string, unknown>).function === "object"
        ? ((tc as Record<string, unknown>).function as Record<string, unknown>)
        : null;
    const fnName = fn && typeof fn.name === "string" ? fn.name : "";
    const fnArgs = fn && typeof fn.arguments === "string" ? fn.arguments : "{}";
    const callJson = `{"name":"${fnName}","arguments":${fnArgs}}`;
    // U+200B inside the closing tag matches the Python reference's literal envelope.
    lines.push(`<\u200btool_call>${callJson}</\u200btool_call>`);
  }
  const text = extractContent(m.content).trim();
  if (text) lines.push(text);
  return lines.join("\n\n");
}

/** Build the `user_input` string for a tools-enabled request. */
export function messagesToInputWithTools(
  messages: OpenAIMessage[],
  toolSystemPrompt: string
): string {
  const lines: string[] = [];
  if (toolSystemPrompt) lines.push(`[System]\n${toolSystemPrompt}`);
  for (const m of messages) {
    const line = renderMessageLine(m);
    if (line !== null) lines.push(line);
  }
  let joined = lines.join("\n\n");
  if (joined.length > MAX_INPUT_CHARS) joined = truncateMiddle(joined, MAX_INPUT_CHARS);
  return joined;
}

/** Build the `user_input` string for a tools-free request (mirrors Python `messages_to_input`). */
export function messagesToInput(messages: OpenAIMessage[]): string {
  if (messages.length === 0) return "";

  if (messages.length === 1 && messages[0]?.role === "user") {
    const content = extractContent(messages[0].content);
    if (content.length > MAX_INPUT_CHARS) return truncateMiddle(content, MAX_INPUT_CHARS);
    return content;
  }

  if (messages.length === 2 && messages[0]?.role === "system" && messages[1]?.role === "user") {
    return formatSystemPlusUser(messages);
  }

  return truncateConversation(messages, MAX_INPUT_CHARS);
}

function formatSystemPlusUser(messages: OpenAIMessage[]): string {
  const sysText = extractContent(messages[0]?.content).trim();
  const userText = extractContent(messages[1]?.content).trim();
  const result = sysText ? `(请遵循以下指引回答：${sysText})\n\n${userText}` : userText;
  if (result.length > MAX_INPUT_CHARS) return truncateConversation(messages, MAX_INPUT_CHARS);
  return result;
}
