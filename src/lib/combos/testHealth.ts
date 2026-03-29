type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function extractTextFromContent(content: unknown): string {
  if (typeof content === "string") return content.trim();

  if (!Array.isArray(content)) return "";

  return content
    .map((part) => {
      if (typeof part === "string") return part.trim();

      const block = asRecord(part);
      const blockType = typeof block.type === "string" ? block.type : "";
      const blockText = typeof block.text === "string" ? block.text.trim() : "";

      if (blockText && (blockType === "" || blockType === "text" || blockType === "output_text")) {
        return blockText;
      }

      return "";
    })
    .filter(Boolean)
    .join("\n")
    .trim();
}

export function buildComboTestRequestBody(modelStr: string) {
  return {
    model: modelStr,
    messages: [{ role: "user", content: "Reply with OK only." }],
    // Keep this close to a real client request without inflating cost.
    max_tokens: 16,
    stream: false,
  };
}

export function extractComboTestResponseText(responseBody: unknown): string {
  const body = asRecord(responseBody);

  if (typeof body.output_text === "string" && body.output_text.trim()) {
    return body.output_text.trim();
  }

  if (Array.isArray(body.choices)) {
    for (const choice of body.choices) {
      const choiceRecord = asRecord(choice);
      const message = asRecord(choiceRecord.message);
      const messageText = extractTextFromContent(message.content);
      if (messageText) return messageText;

      if (typeof choiceRecord.text === "string" && choiceRecord.text.trim()) {
        return choiceRecord.text.trim();
      }
    }
  }

  if (Array.isArray(body.output)) {
    for (const item of body.output) {
      const itemRecord = asRecord(item);
      const contentText = extractTextFromContent(itemRecord.content);
      if (contentText) return contentText;
    }
  }

  return extractTextFromContent(body.content);
}
