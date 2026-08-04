/**
 * OpenAI-format media parts reach the Claude-Code-compatible bridge
 * untranslated when the source client speaks OpenAI (chatCore skips the
 * OpenAI→Claude translator for CC-compatible providers), so `image_url` /
 * AI SDK `image` / Chat Completions `file` parts must become Claude blocks
 * before dispatch or the upstream silently ignores them (#7777).
 * Claude-native blocks (`image`/`document` carrying `source`) are left for
 * the caller to pass through unchanged.
 */

const DATA_URL_BASE64_PATTERN = /^data:([^;]+);base64,(.+)$/;

/** Returns a Claude block for an OpenAI media part, or null for non-media blocks. */
export function convertOpenAiMediaBlock(
  record: Record<string, unknown>
): Record<string, unknown> | null {
  if (record.type === "image_url") {
    const rawUrl =
      typeof record.image_url === "string" ? record.image_url : readRecord(record.image_url)?.url;
    return claudeImageBlockFromUrl(rawUrl);
  }

  if (record.type === "image" && !readRecord(record.source) && typeof record.image === "string") {
    return claudeImageBlockFromUrl(record.image);
  }

  if (record.type === "file") {
    const file = readRecord(record.file);
    const fileData = toNonEmptyString(file?.file_data) || toNonEmptyString(file?.data);
    if (!fileData) return null;
    const title = toNonEmptyString(file?.filename);
    const match = fileData.match(DATA_URL_BASE64_PATTERN);
    if (match) {
      const mediaType = match[1];
      const source = { type: "base64", media_type: mediaType, data: match[2] };
      if (mediaType === "application/pdf") {
        return { type: "document", source, ...(title ? { title } : {}) };
      }
      if (mediaType.startsWith("image/")) {
        return { type: "image", source };
      }
      return null;
    }
    if (/^https?:\/\//i.test(fileData)) {
      return {
        type: "document",
        source: { type: "url", url: fileData },
        ...(title ? { title } : {}),
      };
    }
    return null;
  }

  return null;
}

/**
 * Collects the Claude-shaped media blocks of a message's content array:
 * OpenAI media parts are converted, Claude-native `image`/`document` blocks
 * are cloned through as-is, everything else is ignored.
 */
export function collectClaudeMediaBlocks(content: unknown): Array<Record<string, unknown>> {
  if (!Array.isArray(content)) return [];

  const blocks: Array<Record<string, unknown>> = [];
  for (const part of content) {
    const record = readRecord(cloneValue(part));
    if (!record) continue;
    const media = convertOpenAiMediaBlock(record);
    if (media) {
      blocks.push(media);
      continue;
    }
    if ((record.type === "image" || record.type === "document") && readRecord(record.source)) {
      blocks.push(record);
    }
  }
  return blocks;
}

function claudeImageBlockFromUrl(rawUrl: unknown): Record<string, unknown> | null {
  const url = toNonEmptyString(rawUrl);
  if (!url) return null;
  const match = url.match(DATA_URL_BASE64_PATTERN);
  if (match) {
    return { type: "image", source: { type: "base64", media_type: match[1], data: match[2] } };
  }
  return { type: "image", source: { type: "url", url } };
}

function readRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function cloneValue<T>(value: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
}
