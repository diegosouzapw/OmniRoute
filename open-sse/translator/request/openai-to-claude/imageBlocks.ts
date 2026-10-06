/**
 * Convert OpenAI-style image parts (including those nested in tool results)
 * into Claude Messages `image` blocks. User-message `image_url` already did
 * this; `role: "tool"` and nested `tool_result` content previously forwarded
 * the OpenAI shape unchanged, which Anthropic rejects with HTTP 400 (#9692).
 */

const DATA_URL_RE = /^data:([^;]+);base64,(.+)$/;

type ClaudeImageBlock = {
  type: "image";
  source: { type: "base64"; media_type: string; data: string } | { type: "url"; url: string };
};

export function extractOpenAiImageUrl(imageUrl: unknown): string {
  if (typeof imageUrl === "string") return imageUrl;
  if (imageUrl && typeof imageUrl === "object" && !Array.isArray(imageUrl)) {
    const url = (imageUrl as { url?: unknown }).url;
    if (typeof url === "string") return url;
  }
  return "";
}

export function urlToClaudeImageBlock(url: string): ClaudeImageBlock | null {
  if (typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  const match = trimmed.match(DATA_URL_RE);
  if (match) {
    return {
      type: "image",
      source: { type: "base64", media_type: match[1], data: match[2] },
    };
  }
  return { type: "image", source: { type: "url", url: trimmed } };
}

/**
 * Map one OpenAI / AI-SDK image-shaped part to a Claude image block.
 * Returns null when the part is not an image (caller should keep it as-is).
 */
export function openAiImagePartToClaudeBlock(
  part: Record<string, unknown>
): ClaudeImageBlock | null {
  const type = part.type;
  if (type === "image_url") {
    return urlToClaudeImageBlock(extractOpenAiImageUrl(part.image_url));
  }
  if (type === "image") {
    if (part.source && typeof part.source === "object" && !Array.isArray(part.source)) {
      return { type: "image", source: part.source as ClaudeImageBlock["source"] };
    }
    if (typeof part.image === "string") {
      return urlToClaudeImageBlock(part.image);
    }
  }
  return null;
}

/**
 * Walk a tool_result content value and rewrite OpenAI `image_url` (and AI-SDK
 * `image`) parts to Claude `image` blocks. Nested `tool_result` arrays recurse.
 * Non-array content (plain strings) is left unchanged.
 */
export function normalizeToolResultImages(content: unknown): unknown {
  if (!Array.isArray(content)) return content;
  return content.map((block) => {
    if (!block || typeof block !== "object" || Array.isArray(block)) return block;
    const rec = block as Record<string, unknown>;
    const image = openAiImagePartToClaudeBlock(rec);
    if (image) return image;
    if (rec.type === "tool_result" && Array.isArray(rec.content)) {
      return { ...rec, content: normalizeToolResultImages(rec.content) };
    }
    return rec;
  });
}
