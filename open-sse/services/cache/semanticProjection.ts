/** Only embed conversations whose complete input is represented by the text projection. */
export function isCompleteTextProjection(
  conversation: unknown,
  historyDepth: number,
  excludeSystemPrompt: boolean
): boolean {
  if (typeof conversation === "string") return true;
  if (!Array.isArray(conversation) || conversation.length === 0) return false;
  if (historyDepth > 0 && conversation.length > historyDepth) return false;
  return conversation.every((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return false;
    const message = item as Record<string, unknown>;
    if (message.type !== undefined && message.type !== "message") return false;
    if (excludeSystemPrompt && ["system", "developer"].includes(String(message.role))) return false;
    // Unknown item fields can carry a tool call or another input the projection drops.
    if (Object.keys(message).some((key) => !["role", "content", "type"].includes(key)))
      return false;
    if (typeof message.content === "string") return true;
    return (
      Array.isArray(message.content) &&
      message.content.every(
        (part) =>
          part &&
          typeof part === "object" &&
          ["text", "input_text"].includes(part.type) &&
          typeof part.text === "string" &&
          Object.keys(part).every((key) => ["type", "text"].includes(key))
      )
    );
  });
}
