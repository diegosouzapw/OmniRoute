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

  let replaced = false;
  const content = msg.content.flatMap((part) => {
    if (!isTextBlock(part)) return [part];
    if (replaced) return [];
    replaced = true;
    return [{ ...part, text: newText }];
  });

  if (!replaced) {
    return { ...msg, content: [{ type: "text", text: newText }, ...msg.content] };
  }

  return { ...msg, content };
}
