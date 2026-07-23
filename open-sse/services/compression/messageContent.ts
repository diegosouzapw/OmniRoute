export interface TextBlock {
  type?: string;
  text?: string;
  [key: string]: unknown;
}

export interface ChatMessageLike {
  role: string;
  content?: string | TextBlock[] | unknown[];
  [key: string]: unknown;
}

export function isTextBlock(value: unknown): value is TextBlock {
  return (
    !!value &&
    typeof value === "object" &&
    "text" in value &&
    typeof (value as TextBlock).text === "string" &&
    ((value as TextBlock).type === undefined ||
      (value as TextBlock).type === "text" ||
      (value as TextBlock).type === "input_text")
  );
}

export function extractTextContent(content: ChatMessageLike["content"]): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";

  const textParts: string[] = [];
  for (const part of content) {
    if (isTextBlock(part) && part.text) {
      textParts.push(part.text);
    }
  }
  return textParts.join("\n");
}

export function mapTextContent(
  msg: ChatMessageLike,
  transform: (text: string, index: number) => string
): ChatMessageLike {
  if (typeof msg.content === "string") {
    return { ...msg, content: transform(msg.content, 0) };
  }
  if (!Array.isArray(msg.content)) return msg;

  let textIndex = 0;
  let changed = false;
  const content = msg.content.map((part) => {
    if (!isTextBlock(part)) return part;
    const nextText = transform(part.text ?? "", textIndex);
    textIndex++;
    if (nextText === part.text) return part;
    changed = true;
    return { ...part, text: nextText };
  });

  return changed ? { ...msg, content } : msg;
}

export function replaceTextContent(msg: ChatMessageLike, newText: string): ChatMessageLike {
  if (typeof msg.content === "string" || !Array.isArray(msg.content)) {
    return { ...msg, content: newText };
  }

  // The first text block receives `newText`. Trailing text blocks are normally
  // already subsumed by `newText` (callers build it from the JOIN of all text
  // blocks via extractTextContent), so we drop them to avoid duplicating content.
  // But if a caller's `newText` does NOT contain a trailing block's text, dropping
  // it would silently lose content the model can no longer see (B-AGG-TEXTDROP) —
  // so in that case we keep the trailing block instead of returning [].
  let replaced = false;
  const content = msg.content.flatMap((part) => {
    if (!isTextBlock(part)) return [part];
    if (!replaced) {
      replaced = true;
      return [{ ...part, text: newText }];
    }
    const partText = part.text ?? "";
    if (partText && !newText.includes(partText)) return [part];
    return [];
  });

  if (!replaced) {
    return { ...msg, content: [{ type: "text", text: newText }, ...msg.content] };
  }

  return { ...msg, content };
}
