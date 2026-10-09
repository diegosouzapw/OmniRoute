import { messageContentToText, type ChatMessage } from "../../utils/cursorAgentProtobuf.ts";

export type EmbeddedCursorToolResult = {
  toolCallId: string;
  result: string;
};

const BLOCK_OPEN = "<tool_result>";
const BLOCK_CLOSE = "</tool_result>";

function unescapeXml(text: string): string {
  return text.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}

function tagValue(block: string, open: string, close: string): string | null {
  const start = block.indexOf(open);
  if (start < 0) return null;
  const from = start + open.length;
  const end = block.indexOf(close, from);
  if (end < 0) return null;
  return block.slice(from, end);
}

/**
 * Tool results the Cursor translator flattens into user-message XML.
 * role:"tool" messages are skipped: the resume loop already sends those.
 */
export function extractEmbeddedCursorToolResults(
  messages: ReadonlyArray<Pick<ChatMessage, "role" | "content">>
): EmbeddedCursorToolResult[] {
  const found: EmbeddedCursorToolResult[] = [];
  for (const msg of messages) {
    if (msg.role === "tool") continue;
    const text = messageContentToText(msg.content);
    let from = 0;
    while (from < text.length) {
      const openAt = text.indexOf(BLOCK_OPEN, from);
      if (openAt < 0) break;
      const closeAt = text.indexOf(BLOCK_CLOSE, openAt + BLOCK_OPEN.length);
      if (closeAt < 0) break;
      const block = text.slice(openAt, closeAt + BLOCK_CLOSE.length);
      const toolCallId = tagValue(block, "<tool_call_id>", "</tool_call_id>");
      if (toolCallId && toolCallId.trim().length > 0) {
        const raw = tagValue(block, "<result>", "</result>");
        found.push({
          toolCallId: unescapeXml(toolCallId.trim()),
          result: unescapeXml(raw ?? ""),
        });
      }
      from = closeAt + BLOCK_CLOSE.length;
    }
  }
  return found;
}
