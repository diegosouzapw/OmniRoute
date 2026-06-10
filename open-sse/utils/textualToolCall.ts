export function stripZeroWidth(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(/[\u200B-\u200D\uFEFF]/g, "");
  }
  if (Array.isArray(value)) {
    return value.map((item) => stripZeroWidth(item));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        stripZeroWidth(item),
      ])
    );
  }
  return value;
}

export function isValidToolCallHeaderPrefix(candidate: string): boolean {
  if (!candidate.startsWith("[Tool call:")) return false;

  const bracketIndex = candidate.indexOf("]");
  if (bracketIndex === -1) {
    const namePart = candidate.slice("[Tool call:".length);
    if (namePart.includes("\n") || namePart.includes("[")) return false;
    return true;
  }

  const namePart = candidate.slice("[Tool call:".length, bracketIndex);
  if (namePart.includes("\n") || namePart.trim().length === 0) return false;

  const afterBracket = candidate.slice(bracketIndex + 1);
  const leadingWhitespaceMatch = afterBracket.match(/^[\s\r\n]*/);
  const leadingWhitespace = leadingWhitespaceMatch ? leadingWhitespaceMatch[0] : "";
  const textAfterWhitespace = afterBracket.slice(leadingWhitespace.length);

  if (textAfterWhitespace.length === 0) {
    return true;
  }

  if (!leadingWhitespace.includes("\n")) {
    return false;
  }

  const expectedText = "Arguments:";
  if (expectedText.startsWith(textAfterWhitespace)) {
    return true;
  }

  if (textAfterWhitespace.startsWith(expectedText)) {
    return true;
  }

  return false;
}

export function parseTextualToolCallCandidate(
  text: unknown
): { kind: "complete"; name: string; args: unknown } | { kind: "partial" } | null {
  if (typeof text !== "string") return null;
  const normalized = text.replace(/[\u200B-\u200D\uFEFF]/g, "");
  const toolCallIndex = normalized.lastIndexOf("[Tool call:");
  if (toolCallIndex < 0) {
    const lastParen = normalized.lastIndexOf("(");
    if (lastParen !== -1 && "(empty)[Tool call:".startsWith(normalized.slice(lastParen))) {
      return { kind: "partial" };
    }
    const lastBracket = normalized.lastIndexOf("[");
    if (lastBracket !== -1 && "[Tool call:".startsWith(normalized.slice(lastBracket))) {
      return { kind: "partial" };
    }
    return null;
  }
  const candidate = normalized.slice(toolCallIndex);
  if (!isValidToolCallHeaderPrefix(candidate)) {
    return null;
  }
  const headerMatch = candidate.match(/^\[Tool call:\s*([^\]\n]+)\]\s*\nArguments:\s*/);
  if (!headerMatch) return { kind: "partial" };
  const name = headerMatch[1]?.trim();
  const rawArgs = candidate.slice(headerMatch[0].length).trim();
  if (!name || !rawArgs) return { kind: "partial" };
  const decoders = [
    (value: string) => value,
    (value: string) => {
      if (value.startsWith('"') && value.endsWith('"')) {
        const decoded = JSON.parse(value);
        return typeof decoded === "string" ? decoded : value;
      }
      return value;
    },
  ];
  for (const decode of decoders) {
    try {
      const decoded = decode(rawArgs);
      const parsed = JSON.parse(decoded);
      return { kind: "complete", name, args: stripZeroWidth(parsed) };
    } catch {}
  }
  return { kind: "partial" };
}

export function containsTextualToolCallMarker(text: unknown): boolean {
  if (typeof text !== "string") return false;
  const normalized = text.replace(/[\u200B-\u200D\uFEFF]/g, "");

  if (!normalized.includes("[Tool call:")) return false;
  if (normalized.includes("Arguments:")) return true;

  const trimmed = normalized.trim();
  return trimmed.startsWith("[Tool call:") || trimmed.startsWith("(empty)[Tool call:");
}
