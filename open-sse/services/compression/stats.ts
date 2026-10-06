import {
  type CompressionMode,
  type CompressionStats,
  type CompressionConfig,
  DEFAULT_COMPRESSION_CONFIG,
  DEFAULT_CAVEMAN_CONFIG,
  DEFAULT_RTK_CONFIG,
  DEFAULT_COMPRESSION_LANGUAGE_CONFIG,
} from "./types.ts";
import {
  countTextTokens,
  isCodexTokenizerContext,
  tokenizerContextFromBody,
  MAX_EXACT_TOKEN_COUNT_CHARS,
} from "../../../src/shared/utils/tiktokenCounter.ts";
import {
  anthropicImageTokens,
  ANTHROPIC_IMAGE_BLOCK_OVERHEAD_TOKENS,
  openAIVisionTokens,
} from "omniglyph";
import { isInlineBase64ImageBlock } from "../contextManager.ts";
import {
  jsonLength,
  jsonLengthStrippingBase64DataUris,
  rawLengthStrippingBase64DataUris,
} from "../../utils/jsonSize.ts";

const CHARS_PER_TOKEN = 4;
const DEFAULT_IMAGE_TOKEN_ESTIMATE = 1200;

/**
 * Anthropic image block shape this estimator recognizes:
 * `{ type: "image", source: { type: "base64", media_type: "image/png", data: "<b64>" } }`.
 * Only PNG is decoded (the only format omniglyph emits); anything else falls back to
 * char-counting that block, same as before.
 */
interface AnthropicImageBlock {
  type: "image";
  source: { type: "base64"; media_type: string; data: string };
}

interface OpenAIChatImagePart {
  type: "image_url";
  image_url: { url: string; detail?: string };
}

interface OpenAIResponsesImagePart {
  type: "input_image";
  image_url: string;
  detail?: string;
}

function isAnthropicPngImageBlock(value: unknown): value is AnthropicImageBlock {
  if (!value || typeof value !== "object") return false;
  const block = value as Record<string, unknown>;
  if (block.type !== "image") return false;
  const source = block.source as Record<string, unknown> | undefined;
  if (!source || typeof source !== "object") return false;
  return (
    source.type === "base64" && source.media_type === "image/png" && typeof source.data === "string"
  );
}

function isOpenAIChatPngImagePart(value: unknown): value is OpenAIChatImagePart {
  if (!value || typeof value !== "object") return false;
  const part = value as Record<string, unknown>;
  const image = part.image_url as Record<string, unknown> | undefined;
  return (
    part.type === "image_url" &&
    !!image &&
    typeof image === "object" &&
    typeof image.url === "string" &&
    image.url.startsWith("data:image/png;base64,")
  );
}

function isOpenAIResponsesPngImagePart(value: unknown): value is OpenAIResponsesImagePart {
  const part = value as Record<string, unknown> | null;
  return (
    !!part &&
    part.type === "input_image" &&
    typeof part.image_url === "string" &&
    part.image_url.startsWith("data:image/png;base64,")
  );
}

function pngDimensionsFromDataUrl(value: string): { width: number; height: number } | null {
  const marker = ";base64,";
  const markerIndex = value.indexOf(marker);
  if (markerIndex < 0) return null;
  return decodePngDimensions(value.slice(markerIndex + marker.length));
}

/**
 * Decode PNG width/height from the IHDR chunk without decoding the whole image.
 * PNG layout: 8-byte signature, then IHDR chunk `length(4) + "IHDR"(4) + width(4) +
 * height(4) + ...`. Width/height live at bytes 16..19 / 20..23 (big-endian uint32),
 * so we need through byte 23 (24 raw bytes). We slice the first 64 base64 chars
 * → 48 raw bytes, a comfortable margin over the 24 required.
 * Returns null (never throws) on malformed/non-PNG/truncated input.
 */
function decodePngDimensions(base64: string): { width: number; height: number } | null {
  try {
    const prefix = base64.slice(0, 64);
    const bytes = Buffer.from(prefix, "base64");
    if (bytes.length < 24) return null;
    // PNG signature check (bytes 0..7): 89 50 4E 47 0D 0A 1A 0A
    const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    for (let i = 0; i < PNG_SIGNATURE.length; i++) {
      if (bytes[i] !== PNG_SIGNATURE[i]) return null;
    }
    const width = bytes.readUInt32BE(16);
    const height = bytes.readUInt32BE(20);
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
      return null;
    }
    return { width, height };
  } catch {
    return null;
  }
}

/** Char-count fallback for one value (using jsonLength to avoid allocating multi-MB strings).
 * Base64 data URIs embedded in arbitrary strings (not just structured image blocks) are
 * stripped so a tool-output screenshot doesn't inflate the token estimate (#7847 drift). */
function charTokensOf(value: unknown): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "string") {
    return Math.ceil(rawLengthStrippingBase64DataUris(value) / CHARS_PER_TOKEN);
  }
  return Math.ceil(jsonLengthStrippingBase64DataUris(value) / CHARS_PER_TOKEN);
}

/**
 * Walk `messages[].content[]` (and `system` when it is an array) looking for Anthropic
 * base64 PNG image blocks. For each recognized block: blank its `data` (shallow clone,
 * so the char-count pass below doesn't double-count the base64) and add its real
 * image-token cost (`anthropicImageTokens` + per-block overhead). Malformed/undecodable
 * blocks are left as-is and fall back to char-counting like any other value — never throw.
 * Tier is fixed to "standard": production resolves every tier to standard today (measured
 * in the omniglyph billing sweep — see anthropic-vision.ts), so there is no model-specific
 * signal available here that would change the result.
 */
function blankImageBlocksAndSumImageTokens(body: Record<string, unknown>): {
  clone: Record<string, unknown>;
  imageTokens: number;
} {
  let imageTokens = 0;
  const model = typeof body.model === "string" ? body.model : "";
  const clone: Record<string, unknown> = { ...body };

  const processContentArray = (content: unknown): unknown => {
    if (!Array.isArray(content)) return content;
    return content.map((block) => {
      if (isAnthropicPngImageBlock(block)) {
        const dims = decodePngDimensions(block.source.data);
        if (!dims) {
          // Recognized image block that can't be decoded: use a bounded estimate rather
          // than char-counting the raw base64, which would inflate the token estimate
          // multi-MB (the #7847 OOM/drift class).
          imageTokens += DEFAULT_IMAGE_TOKEN_ESTIMATE;
          return { ...block, source: { ...block.source, data: "" } };
        }
        imageTokens += anthropicImageTokens(dims.width, dims.height, "standard");
        imageTokens += ANTHROPIC_IMAGE_BLOCK_OVERHEAD_TOKENS;
        return { ...block, source: { ...block.source, data: "" } };
      }
      if (isOpenAIChatPngImagePart(block)) {
        const dims = pngDimensionsFromDataUrl(block.image_url.url);
        if (!dims) {
          imageTokens += DEFAULT_IMAGE_TOKEN_ESTIMATE;
          return { ...block, image_url: { ...block.image_url, url: "" } };
        }
        imageTokens += openAIVisionTokens(model, dims.width, dims.height);
        return { ...block, image_url: { ...block.image_url, url: "" } };
      }
      if (isOpenAIResponsesPngImagePart(block)) {
        const dims = pngDimensionsFromDataUrl(block.image_url);
        if (!dims) {
          imageTokens += DEFAULT_IMAGE_TOKEN_ESTIMATE;
          return { ...block, image_url: "" };
        }
        imageTokens += openAIVisionTokens(model, dims.width, dims.height);
        return { ...block, image_url: "" };
      }
      if (isInlineBase64ImageBlock(block as Record<string, unknown>)) {
        // Inline-base64 image content-block shape (AI SDK / Gemini / flat) not
        // covered by the PNG decoders above. Keep the estimate bounded so a
        // multi-MB screenshot doesn't inflate the token count (#7847 drift).
        imageTokens += DEFAULT_IMAGE_TOKEN_ESTIMATE;
        return { ...block, image: "" };
      }
      return block;
    });
  };

  if (Array.isArray(clone.messages)) {
    clone.messages = clone.messages.map((message) => {
      if (!message || typeof message !== "object") return message;
      const m = message as Record<string, unknown>;
      if (!Array.isArray(m.content)) return message;
      return { ...m, content: processContentArray(m.content) };
    });
  }

  if (Array.isArray(clone.system)) {
    clone.system = processContentArray(clone.system);
  }

  if (Array.isArray(clone.input)) {
    clone.input = clone.input.map((item) => {
      if (!item || typeof item !== "object") return item;
      const record = item as Record<string, unknown>;
      return Array.isArray(record.content)
        ? { ...record, content: processContentArray(record.content) }
        : record;
    });
  }

  return { clone, imageTokens };
}

export function estimateCompressionTokens(text: string | object | null | undefined): number {
  if (!text) return 0;
  if (typeof text === "string") {
    return charTokensOf(text);
  }
  try {
    const tokenizerContext = tokenizerContextFromBody(text);
    const useExactTokenizer = isCodexTokenizerContext(tokenizerContext);
    const { clone, imageTokens } = blankImageBlocksAndSumImageTokens(
      text as Record<string, unknown>
    );
    if (imageTokens === 0) {
      // countTextTokens falls back to a char heuristic above MAX_EXACT_TOKEN_COUNT_CHARS,
      // so materializing JSON.stringify(text) for a large body would only allocate a
      // multi-MB transient that's immediately discarded (#7847 OOM class). Measure the
      // serialized length via jsonLength instead and skip the allocation when oversized.
      if (useExactTokenizer && jsonLength(text) <= MAX_EXACT_TOKEN_COUNT_CHARS) {
        return countTextTokens(JSON.stringify(text), tokenizerContext);
      }
      return charTokensOf(text);
    }
    if (useExactTokenizer && jsonLength(clone) <= MAX_EXACT_TOKEN_COUNT_CHARS) {
      return countTextTokens(JSON.stringify(clone), tokenizerContext) + imageTokens;
    }
    return charTokensOf(clone) + imageTokens;
  } catch {
    // Non-serializable/unexpected shape → fall back to the legacy char-count,
    // never throw out of an estimator.
    return charTokensOf(text);
  }
}

export function createCompressionStats(
  originalBody: Record<string, unknown>,
  compressedBody: Record<string, unknown>,
  mode: CompressionMode,
  techniquesUsed: string[],
  rulesApplied?: string[],
  durationMs?: number
): CompressionStats {
  const originalTokens = estimateCompressionTokens(originalBody);
  const compressedTokens = estimateCompressionTokens(compressedBody);
  const savingsPercent =
    originalTokens > 0
      ? Math.round(((originalTokens - compressedTokens) / originalTokens) * 10000) / 100
      : 0;
  return {
    originalTokens,
    compressedTokens,
    savingsPercent,
    techniquesUsed,
    mode,
    timestamp: Date.now(),
    ...(rulesApplied && rulesApplied.length > 0 ? { rulesApplied } : {}),
    ...(durationMs !== undefined ? { durationMs } : {}),
  };
}

export function trackCompressionStats(stats: CompressionStats): void {
  if (stats.originalTokens <= 0) return;
  const rulesInfo = stats.rulesApplied?.length ? ` rules=${stats.rulesApplied.join(",")}` : "";
  const durationInfo = stats.durationMs !== undefined ? ` ${stats.durationMs}ms` : "";
  // Compression stats tracking — no-op in production (use structured logging if needed)
}

export function getDefaultCompressionConfig(): CompressionConfig {
  return {
    ...DEFAULT_COMPRESSION_CONFIG,
    cavemanConfig: { ...DEFAULT_CAVEMAN_CONFIG },
    rtkConfig: { ...DEFAULT_RTK_CONFIG },
    languageConfig: { ...DEFAULT_COMPRESSION_LANGUAGE_CONFIG },
  };
}
