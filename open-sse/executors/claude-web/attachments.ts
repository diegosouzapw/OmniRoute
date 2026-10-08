/**
 * Claude Web attachment extraction (#14742).
 *
 * claude.ai's completion endpoint takes text attachments inline as
 * `{ file_name, file_type, file_size, extracted_content }`. Binary/image
 * attachments need an upload round-trip (file uuid) that is not implemented
 * yet, so only text-bearing parts are forwarded here.
 */

export interface ClaudeWebAttachment {
  file_name: string;
  file_type: string;
  file_size: number;
  extracted_content: string;
}

const DATA_URL_RE = /^data:([^;,]+)((?:;[^;,]+)*),(.*)$/s;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isTextMime(mime: string): boolean {
  return (
    mime.startsWith("text/") ||
    mime === "application/json" ||
    mime === "application/xml" ||
    mime === "application/x-yaml"
  );
}

function decodeTextDataUrl(url: string): { mime: string; text: string } | null {
  const match = DATA_URL_RE.exec(url);
  if (!match) return null;
  const mime = match[1].toLowerCase();
  if (!isTextMime(mime)) return null;
  try {
    const text = /;base64/i.test(match[2])
      ? Buffer.from(match[3], "base64").toString("utf8")
      : decodeURIComponent(match[3]);
    return { mime, text };
  } catch {
    return null;
  }
}

function partDataUrl(part: Record<string, unknown>): { url: string; name: string } | null {
  if (part.type === "file" && isRecord(part.file)) {
    const data = part.file.file_data;
    if (typeof data !== "string") return null;
    const name = typeof part.file.filename === "string" ? part.file.filename : "";
    return { url: data, name };
  }
  if (part.type === "image_url" && isRecord(part.image_url)) {
    const url = part.image_url.url;
    return typeof url === "string" ? { url, name: "" } : null;
  }
  return null;
}

function partToAttachment(part: unknown, index: number): ClaudeWebAttachment | null {
  if (!isRecord(part)) return null;
  const source = partDataUrl(part);
  if (!source) return null;
  const decoded = decodeTextDataUrl(source.url);
  if (!decoded) return null;
  return {
    file_name: source.name || `attachment-${index + 1}.txt`,
    file_type: decoded.mime,
    file_size: Buffer.byteLength(decoded.text, "utf8"),
    extracted_content: decoded.text,
  };
}

/** Collect text attachments from the latest user message of an OpenAI-shape body. */
export function extractClaudeWebAttachments(messages: unknown[]): ClaudeWebAttachment[] {
  let content: unknown;
  for (const candidate of messages) {
    if (isRecord(candidate) && candidate.role === "user") content = candidate.content;
  }
  if (!Array.isArray(content)) return [];
  const out: ClaudeWebAttachment[] = [];
  content.forEach((part, i) => {
    const attachment = partToAttachment(part, i);
    if (attachment) out.push(attachment);
  });
  return out;
}
