/**
 * Flatten tool turns (OpenAI tool/function role + tool_calls, and
 * Anthropic-style tool_use / tool_result content blocks) into plain
 * assistant prose.
 *
 * Why: when a combo leg (or any prose-only fan-out) strips the tools
 * definitions but the prior history still carries structured tool turns,
 * agentic models keep emitting tool_calls — returning empty prose and
 * triggering an upstream 503. Flattening keeps the context but removes
 * the tool-loop trigger.
 *
 * Pure function. Does not mutate input.
 *
 * Ported from upstream decolua/9router PR #1910 (commits 86162eeb + 9ab14e77).
 */
import { extractTextContent } from "../translator/helpers/geminiHelper.ts";

export const TOOL_CALL_PREFIX = "[Called tools: ";
export const TOOL_RESULT_PREFIX = "[Tool result: ";

type ContentBlock = {
  type?: string;
  text?: string;
  name?: string;
  content?: unknown;
  [k: string]: unknown;
};

type ToolCall = {
  function?: { name?: string };
  name?: string;
  [k: string]: unknown;
};

type Message = {
  role?: string;
  content?: unknown;
  tool_calls?: ToolCall[];
  [k: string]: unknown;
};

function isMessage(m: unknown): m is Message {
  return m != null && typeof m === "object";
}

export function flattenToolHistory<T extends Message>(
  messages: ReadonlyArray<T | null | undefined>
): Message[] {
  const out: Message[] = [];
  for (const raw of messages) {
    if (!isMessage(raw)) continue;
    const msg = raw as Message;

    // OpenAI tool / function role -> assistant prose
    if (msg.role === "tool" || msg.role === "function") {
      const text =
        extractTextContent(msg.content) || String(msg.content ?? "");
      out.push({
        role: "assistant",
        content: `${TOOL_RESULT_PREFIX}${text}]`,
      });
      continue;
    }

    // OpenAI assistant with structured tool_calls -> flatten into prose
    if (msg.role === "assistant" && Array.isArray(msg.tool_calls)) {
      const { tool_calls, ...rest } = msg;
      const names = tool_calls
        .map((c) => c?.function?.name || c?.name || "tool")
        .join(", ");
      const base =
        extractTextContent(rest.content) ||
        (typeof rest.content === "string" ? rest.content : "");
      out.push({
        ...rest,
        content: `${base}${base ? "\n" : ""}${TOOL_CALL_PREFIX}${names}]`,
      });
      continue;
    }

    // Anthropic-style tool_use / tool_result blocks in content array
    if (Array.isArray(msg.content)) {
      const blocks = msg.content as ContentBlock[];
      const hasToolUse = blocks.some((c) => c?.type === "tool_use");
      const hasToolResult = blocks.some((c) => c?.type === "tool_result");
      if (hasToolUse || hasToolResult) {
        const textParts: string[] = [];
        const toolNames: string[] = [];
        const toolResults: string[] = [];
        for (const block of blocks) {
          if (block?.type === "text" && typeof block.text === "string") {
            textParts.push(block.text);
          } else if (block?.type === "tool_use") {
            toolNames.push(block.name || "tool");
          } else if (block?.type === "tool_result") {
            toolResults.push(
              extractTextContent(block.content) || String(block.content ?? "")
            );
          }
        }
        let newContent = textParts.join("\n");
        if (toolNames.length > 0) {
          newContent = `${newContent}${newContent ? "\n" : ""}${TOOL_CALL_PREFIX}${toolNames.join(", ")}]`;
        }
        if (toolResults.length > 0) {
          newContent = `${newContent}${newContent ? "\n" : ""}${TOOL_RESULT_PREFIX}${toolResults.join("\n")}]`;
        }
        out.push({ ...msg, content: newContent });
        continue;
      }
    }

    out.push(msg);
  }
  return out;
}
