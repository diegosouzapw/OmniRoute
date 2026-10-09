/** Extract plain text from an OpenAI message `content` field. */
export function extractContent(content: unknown): string {
  if (content === null || content === undefined) return "";
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return String(content);
  return extractArrayContent(content);
}

function extractArrayContent(parts: unknown[]): string {
  const out: string[] = [];
  for (const part of parts) {
    if (typeof part === "string") {
      out.push(part);
      continue;
    }
    if (!part || typeof part !== "object") continue;
    const item = part as Record<string, unknown>;
    if ((item.type === "text" || item.type === "input_text") && typeof item.text === "string") {
      out.push(item.text);
      continue;
    }
    if (item.type === "image_url") out.push("[image]");
  }
  return out.join("\n");
}

/** Truncate a single string, keeping 70% head + 30% tail with a marker. */
export function truncateMiddle(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const headLen = Math.floor(maxLen * 0.7);
  const tailLen = Math.max(maxLen - headLen - 20, 0);
  return `${text.slice(0, headLen)}\n[…truncated…]\n${text.slice(text.length - tailLen)}`;
}

export function capitalize(role: string): string {
  if (!role) return "";
  return role[0].toUpperCase() + role.slice(1);
}
