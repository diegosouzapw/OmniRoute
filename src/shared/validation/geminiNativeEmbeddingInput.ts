/**
 * Gemini Embedding 2 native items (Google AI Studio embedContent / batchEmbedContents).
 *
 * Official 2026 contract (ai.google.dev/gemini-api/docs/embeddings):
 *   - Model id: gemini-embedding-2 (GA April 2026). Legacy text-only: gemini-embedding-001.
 *   - One Content (parts[]) → one embedding. Multiple parts in one Content fuse.
 *   - N Content objects / N batchEmbedContents requests → N embeddings.
 *   - Parts: { text }, { inline_data: { mime_type, data } }, { file_data: { mime_type, file_uri } }.
 *     CamelCase SDK spellings (inlineData / fileData) are accepted and forwarded.
 *
 * These are not OmniRoute's canonical `{ type, source }` items. For gemini
 * they must reach generativelanguage.googleapis.com as Content parts — do
 * not collapse the OpenAI `input` array to string[].
 */

import { isCanonicalEmbeddingItem, isPlainObject } from "./jinaNativeEmbeddingInput";

export type GeminiEmbeddingModality = "text" | "image" | "audio" | "video" | "document";

const GEMINI_EMBEDDING_2_IDS = new Set(["gemini-embedding-2", "gemini-embedding-2-preview"]);

export function isGeminiEmbedding2Family(modelId: string | null | undefined): boolean {
  return typeof modelId === "string" && GEMINI_EMBEDDING_2_IDS.has(modelId);
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return isPlainObject(value) ? value : null;
}

function mimeFromInline(value: Record<string, unknown>): string | null {
  const snake = asRecord(value.inline_data);
  if (typeof snake?.mime_type === "string") return snake.mime_type;
  const camel = asRecord(value.inlineData);
  if (typeof camel?.mimeType === "string") return camel.mimeType;
  return null;
}

function mimeFromFile(value: Record<string, unknown>): string | null {
  const snake = asRecord(value.file_data);
  if (typeof snake?.mime_type === "string") return snake.mime_type;
  const camel = asRecord(value.fileData);
  if (typeof camel?.mimeType === "string") return camel.mimeType;
  return null;
}

export function modalityFromGeminiMime(mimeType: string): GeminiEmbeddingModality {
  const mime = mimeType.trim().toLowerCase();
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("audio/")) return "audio";
  if (mime.startsWith("video/")) return "video";
  if (mime === "application/pdf" || mime.startsWith("application/pdf")) return "document";
  return "document";
}

export function isGeminiNativePart(value: unknown): boolean {
  const record = asRecord(value);
  if (!record || isCanonicalEmbeddingItem(record)) return false;
  if (typeof record.text === "string" && record.text.trim().length > 0) {
    return !("image" in record) && !("audio" in record) && !("video" in record) && !("pdf" in record);
  }
  if (asRecord(record.inline_data)?.data || asRecord(record.inlineData)?.data) return true;
  if (asRecord(record.file_data)?.file_uri || asRecord(record.fileData)?.fileUri) return true;
  return false;
}

export function isGeminiNativeContent(value: unknown): boolean {
  const record = asRecord(value);
  if (!record || isCanonicalEmbeddingItem(record)) return false;
  if (!Array.isArray(record.parts) || record.parts.length === 0) return false;
  return record.parts.every((part) => isGeminiNativePart(part));
}

export function isGeminiNativeEmbedRequest(value: unknown): boolean {
  const record = asRecord(value);
  if (!record || isCanonicalEmbeddingItem(record)) return false;
  const content = record.content;
  if (Array.isArray(content)) return false;
  return isGeminiNativeContent(content);
}

export function isGeminiNativeEmbeddingItem(value: unknown): boolean {
  return isGeminiNativePart(value) || isGeminiNativeContent(value) || isGeminiNativeEmbedRequest(value);
}

/**
 * True when the request already uses Gemini's documented multimodal contract
 * (a part, a Content with parts, or an EmbedContentRequest).
 */
export function isGeminiNativeEmbeddingInput(input: unknown): boolean {
  if (isGeminiNativeEmbeddingItem(input)) return true;
  if (!Array.isArray(input)) return false;
  return input.some((item) => isGeminiNativeEmbeddingItem(item));
}

export function collectGeminiNativeModalities(input: unknown): GeminiEmbeddingModality[] {
  const found = new Set<GeminiEmbeddingModality>();

  const visitPart = (value: unknown) => {
    const record = asRecord(value);
    if (!record) return;
    if (typeof record.text === "string" && record.text.trim().length > 0) found.add("text");
    const inlineMime = mimeFromInline(record);
    if (inlineMime) found.add(modalityFromGeminiMime(inlineMime));
    const fileMime = mimeFromFile(record);
    if (fileMime) found.add(modalityFromGeminiMime(fileMime));
  };

  const visit = (value: unknown) => {
    if (isGeminiNativeEmbedRequest(value)) {
      visit((value as { content: unknown }).content);
      return;
    }
    if (isGeminiNativeContent(value)) {
      for (const part of (value as { parts: unknown[] }).parts) visitPart(part);
      return;
    }
    if (isGeminiNativePart(value)) visitPart(value);
  };

  if (Array.isArray(input)) {
    for (const item of input) visit(item);
  } else {
    visit(input);
  }
  return [...found];
}
