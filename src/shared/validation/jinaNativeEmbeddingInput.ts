/**
 * Jina Search Foundation native embedding items (api.jina.ai EmbeddingsV5Request).
 *
 * Official 2026 input shapes (OpenAPI 2026.07.27):
 *   TextDoc  { text }
 *   ImageDoc { image }   URL or base64 / data URI
 *   AudioDoc { audio }
 *   VideoDoc { video }
 *   PDFDoc   { pdf }     single input only upstream; we still accept it in a list
 *   MergedContentGroup { content: [TextDoc|ImageDoc|AudioDoc|VideoDoc, ...] }
 *
 * These are not OmniRoute's canonical `{ type, source }` items. For jina-ai
 * they must be forwarded intact — do not stringify, do not fetch image URLs
 * into data URIs. Jina fetches public media itself.
 */

export const JINA_NATIVE_MEDIA_KEYS = ["text", "image", "audio", "video", "pdf"] as const;
export type JinaNativeMediaKey = (typeof JINA_NATIVE_MEDIA_KEYS)[number];

const NATIVE_KEY_TO_MODALITY: Record<JinaNativeMediaKey, "text" | "image" | "audio" | "video" | "document"> =
  {
    text: "text",
    image: "image",
    audio: "audio",
    video: "video",
    pdf: "document",
  };

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** OmniRoute canonical structured item — leave those on the translator path. */
export function isCanonicalEmbeddingItem(value: unknown): boolean {
  return isPlainObject(value) && "type" in value && typeof value.type === "string";
}

export function isJinaNativeDoc(value: unknown): boolean {
  if (!isPlainObject(value) || isCanonicalEmbeddingItem(value)) return false;
  if ("content" in value && Array.isArray(value.content)) return false;
  const present = JINA_NATIVE_MEDIA_KEYS.filter((key) => key in value);
  if (present.length !== 1) return false;
  return typeof value[present[0]] === "string" && String(value[present[0]]).trim().length > 0;
}

export function isJinaMergedContentGroup(value: unknown): boolean {
  if (!isPlainObject(value) || isCanonicalEmbeddingItem(value)) return false;
  if (!Array.isArray(value.content) || value.content.length === 0) return false;
  return value.content.every((item) => isJinaNativeDoc(item) && !("pdf" in (item as object)));
}

export function isJinaNativeEmbeddingItem(value: unknown): boolean {
  return isJinaNativeDoc(value) || isJinaMergedContentGroup(value);
}

/**
 * True when the request already uses Jina's documented multimodal contract
 * (single doc, mixed string+doc batch, or fused content groups).
 */
export function isJinaNativeEmbeddingInput(input: unknown): boolean {
  if (isJinaNativeEmbeddingItem(input)) return true;
  if (!Array.isArray(input)) return false;
  return input.some((item) => isJinaNativeEmbeddingItem(item));
}

export function collectJinaNativeModalities(
  input: unknown
): Array<"text" | "image" | "audio" | "video" | "document"> {
  const found = new Set<"text" | "image" | "audio" | "video" | "document">();

  const visit = (value: unknown) => {
    if (isJinaMergedContentGroup(value)) {
      for (const item of (value as { content: unknown[] }).content) visit(item);
      return;
    }
    if (!isJinaNativeDoc(value)) return;
    const key = JINA_NATIVE_MEDIA_KEYS.find((mediaKey) => mediaKey in (value as object));
    if (key) found.add(NATIVE_KEY_TO_MODALITY[key]);
  };

  if (Array.isArray(input)) {
    for (const item of input) visit(item);
  } else {
    visit(input);
  }
  return [...found];
}
