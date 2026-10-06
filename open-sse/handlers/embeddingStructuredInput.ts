import { MAX_EMBEDDING_INLINE_TOTAL_BYTES } from "@/shared/validation/schemas/apiV1";
import type { EmbeddingMultimodalItem } from "@/shared/validation/schemas/apiV1";
import type { EmbeddingProvider } from "../config/embeddingRegistry.ts";
import {
  isCanonicalEmbeddingItem,
  isJinaMergedContentGroup,
  isJinaNativeDoc,
  isJinaNativeEmbeddingItem,
  isPlainObject,
} from "@/shared/validation/jinaNativeEmbeddingInput";
import {
  isGeminiNativeContent,
  isGeminiNativeEmbedRequest,
  isGeminiNativePart,
} from "@/shared/validation/geminiNativeEmbeddingInput";

const AGGREGATE_SIZE_ERROR = "decoded inline media must not exceed 16 MiB per request";

export interface StructuredEmbeddingFetchOptions {
  /**
   * Fetch one HTTPS media source and return a bounded, already validated body.
   * The production implementation owns DNS/redirect/timeout/size enforcement.
   */
  fetchMedia: (url: string) => Promise<{ buffer: Buffer; contentType: string | null }>;
}

interface PreparedEmbeddingRequest {
  url: string;
  body: Record<string, unknown>;
  authHeader?: { name: string; value: string };
  normalizeResponse?: (data: Record<string, unknown>) => Record<string, unknown>;
}

function isStructuredItem(value: unknown): value is EmbeddingMultimodalItem {
  return typeof value === "object" && value !== null && "type" in value;
}

export function hasStructuredEmbeddingInput(input: unknown): input is EmbeddingMultimodalItem[] {
  return Array.isArray(input) && input.some(isStructuredItem);
}

async function sourceToInlineData(
  item: Exclude<EmbeddingMultimodalItem, { type: "text" }>,
  fetchMedia: StructuredEmbeddingFetchOptions["fetchMedia"]
): Promise<{ data: string; mediaType: string }> {
  if (item.source.type === "base64") {
    return { data: item.source.data, mediaType: item.source.media_type };
  }
  const fetched = await fetchMedia(item.source.url);
  if (!fetched.contentType) {
    throw new Error("Remote embedding media must include a Content-Type header");
  }
  return { data: fetched.buffer.toString("base64"), mediaType: fetched.contentType };
}

interface ResolvedInlineItem {
  item: EmbeddingMultimodalItem;
  inline: { data: string; mediaType: string } | null;
}

/**
 * Resolve every non-text item's inline data SEQUENTIALLY (not `Promise.all`),
 * enforcing the documented "16 MiB decoded per request" cap across ALL
 * sources — base64 AND fetched URLs.
 *
 * The Zod schema (`embeddingMultimodalInputSchema.superRefine` in
 * `src/shared/validation/schemas/apiV1.ts`) only sums base64-sourced items
 * before this handler ever runs — URL-sourced items are excluded from that
 * aggregate there. Each URL item is individually capped at 8 MiB via
 * `fetchRemoteImage(url, { maxBytes: MAX_EMBEDDING_INLINE_ITEM_BYTES })`, but
 * fetching all up to 32 items concurrently could otherwise pull ~256 MiB into
 * memory at once — 16x past the documented per-request bound. Processing
 * items one at a time and checking a running byte budget after every fetch
 * closes that gap: at most one URL fetch is ever in flight, and no further
 * URL fetch is started once the aggregate budget is already exhausted.
 */
async function resolveInlineItems(
  items: EmbeddingMultimodalItem[],
  fetchMedia: StructuredEmbeddingFetchOptions["fetchMedia"]
): Promise<ResolvedInlineItem[]> {
  const results: ResolvedInlineItem[] = [];
  let remainingBytes = MAX_EMBEDDING_INLINE_TOTAL_BYTES;

  for (const item of items) {
    if (item.type === "text") {
      results.push({ item, inline: null });
      continue;
    }
    if (item.source.type === "url" && remainingBytes <= 0) {
      throw new Error(AGGREGATE_SIZE_ERROR);
    }
    const { data, mediaType } = await sourceToInlineData(item, fetchMedia);
    const decodedBytes = Buffer.byteLength(data, "base64");
    if (decodedBytes > remainingBytes) {
      throw new Error(AGGREGATE_SIZE_ERROR);
    }
    remainingBytes -= decodedBytes;
    results.push({ item, inline: { data, mediaType } });
  }

  return results;
}

async function prepareJinaInput(
  items: EmbeddingMultimodalItem[],
  fetchMedia: StructuredEmbeddingFetchOptions["fetchMedia"]
): Promise<Array<Record<string, string>>> {
  const resolved = await resolveInlineItems(items, fetchMedia);
  return resolved.map(({ item, inline }) => {
    if (item.type === "text") return { text: item.text };
    const key = item.type === "document" ? "pdf" : item.type;
    return { [key]: `data:${inline!.mediaType};base64,${inline!.data}` };
  });
}

/**
 * Mixed batches: keep Jina-native docs / strings intact and only translate
 * OmniRoute canonical `{ type, source }` items into Jina ImageDoc/TextDoc.
 */
export async function prepareJinaMixedEmbeddingInput(
  input: unknown[],
  fetchMedia: StructuredEmbeddingFetchOptions["fetchMedia"]
): Promise<unknown[]> {
  const out: unknown[] = [];
  for (const item of input) {
    if (typeof item === "string" || isJinaNativeEmbeddingItem(item)) {
      out.push(item);
      continue;
    }
    if (isCanonicalEmbeddingItem(item)) {
      const [translated] = await prepareJinaInput([item as EmbeddingMultimodalItem], fetchMedia);
      out.push(translated);
      continue;
    }
    out.push(item);
  }
  return out;
}

function mapGeminiTaskType(value: unknown): unknown {
  if (value === "retrieval.query") return "RETRIEVAL_QUERY";
  if (value === "retrieval.passage") return "RETRIEVAL_DOCUMENT";
  return value;
}

function geminiNativeUrl(model: string, method: "embedContent" | "batchEmbedContents"): string {
  return `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:${method}`;
}

function geminiRequestExtras(body: Record<string, unknown>): Record<string, unknown> {
  const extras: Record<string, unknown> = {};
  if (body.dimensions !== undefined) extras.output_dimensionality = body.dimensions;
  if (body.task !== undefined) extras.task_type = mapGeminiTaskType(body.task);
  return extras;
}

function embeddingValues(entry: unknown): unknown[] {
  if (!entry || typeof entry !== "object") return [];
  const values = (entry as { values?: unknown }).values;
  return Array.isArray(values) ? values : [];
}

function normalizeGeminiEmbedContentResponse(
  data: Record<string, unknown>
): Record<string, unknown> {
  return {
    object: "list",
    data: [{ object: "embedding", embedding: embeddingValues(data.embedding), index: 0 }],
    usage: { prompt_tokens: 0, total_tokens: 0 },
  };
}

function normalizeGeminiBatchResponse(data: Record<string, unknown>): Record<string, unknown> {
  const embeddings = Array.isArray(data.embeddings) ? data.embeddings : [];
  return {
    object: "list",
    data: embeddings.map((entry, index) => ({
      object: "embedding",
      embedding: embeddingValues(entry),
      index,
    })),
    usage: { prompt_tokens: 0, total_tokens: 0 },
  };
}

function dataUriToInlineData(value: string): { mime_type: string; data: string } | null {
  const match = /^data:([^;,]+);base64,(.+)$/i.exec(value.trim());
  if (!match) return null;
  return { mime_type: match[1], data: match[2] };
}

async function mediaStringToGeminiPart(
  raw: string,
  fallbackMime: string,
  fetchMedia: StructuredEmbeddingFetchOptions["fetchMedia"]
): Promise<Record<string, unknown>> {
  const trimmed = raw.trim();
  const fromDataUri = dataUriToInlineData(trimmed);
  if (fromDataUri) return { inline_data: fromDataUri };
  if (/^https:\/\//i.test(trimmed)) {
    const fetched = await fetchMedia(trimmed);
    if (!fetched.contentType) {
      throw new Error("Remote embedding media must include a Content-Type header");
    }
    return {
      inline_data: {
        mime_type: fetched.contentType,
        data: fetched.buffer.toString("base64"),
      },
    };
  }
  return { inline_data: { mime_type: fallbackMime, data: trimmed } };
}

async function jinaDocToGeminiPart(
  item: Record<string, unknown>,
  fetchMedia: StructuredEmbeddingFetchOptions["fetchMedia"]
): Promise<Record<string, unknown>> {
  if (typeof item.text === "string") return { text: item.text };
  if (typeof item.image === "string") {
    return mediaStringToGeminiPart(item.image, "image/png", fetchMedia);
  }
  if (typeof item.audio === "string") {
    return mediaStringToGeminiPart(item.audio, "audio/mpeg", fetchMedia);
  }
  if (typeof item.video === "string") {
    return mediaStringToGeminiPart(item.video, "video/mp4", fetchMedia);
  }
  if (typeof item.pdf === "string") {
    return mediaStringToGeminiPart(item.pdf, "application/pdf", fetchMedia);
  }
  throw new Error("Unsupported Jina-native embedding item for Gemini");
}

/**
 * Map one OpenAI-compat input element to one Gemini Content.
 * A fused multimodal item (native parts / Jina content group / one canonical
 * object) stays one Content. Do not dump sibling array elements into parts.
 */
async function itemToGeminiContent(
  item: unknown,
  fetchMedia: StructuredEmbeddingFetchOptions["fetchMedia"]
): Promise<Record<string, unknown>> {
  if (typeof item === "string") return { parts: [{ text: item }] };
  if (isGeminiNativeEmbedRequest(item)) {
    return (item as { content: Record<string, unknown> }).content;
  }
  if (isGeminiNativeContent(item)) {
    return item as Record<string, unknown>;
  }
  if (isGeminiNativePart(item)) {
    return { parts: [item as Record<string, unknown>] };
  }
  if (isJinaMergedContentGroup(item)) {
    const parts: Record<string, unknown>[] = [];
    for (const chunk of (item as { content: unknown[] }).content) {
      if (isPlainObject(chunk)) parts.push(await jinaDocToGeminiPart(chunk, fetchMedia));
    }
    return { parts };
  }
  if (isJinaNativeDoc(item) && isPlainObject(item)) {
    return { parts: [await jinaDocToGeminiPart(item, fetchMedia)] };
  }
  if (isCanonicalEmbeddingItem(item)) {
    const [part] = await prepareGeminiParts([item as EmbeddingMultimodalItem], fetchMedia);
    return { parts: [part] };
  }
  throw new Error("Unsupported Gemini embedding input item");
}

async function prepareGeminiParts(
  items: EmbeddingMultimodalItem[],
  fetchMedia: StructuredEmbeddingFetchOptions["fetchMedia"]
): Promise<Array<Record<string, unknown>>> {
  const resolved = await resolveInlineItems(items, fetchMedia);
  return resolved.map(({ item, inline }) => {
    if (item.type === "text") return { text: item.text };
    return { inline_data: { mime_type: inline!.mediaType, data: inline!.data } };
  });
}

function normalizeEmbeddingInputItems(input: unknown): unknown[] {
  if (Array.isArray(input)) return input;
  if (input === undefined || input === null) return [];
  return [input];
}

/**
 * Translate OmniRoute's provider-neutral structured input into a documented
 * provider-native transport. Each top-level input array element is one
 * embedding. Gemini Embedding 2 fuses multiple parts inside one Content;
 * N OpenAI `input` items must become N vectors via batchEmbedContents.
 */
export async function prepareStructuredEmbeddingRequest(
  provider: EmbeddingProvider,
  model: string,
  body: Record<string, unknown>,
  token: string,
  options: StructuredEmbeddingFetchOptions
): Promise<PreparedEmbeddingRequest> {
  const items = normalizeEmbeddingInputItems(body.input);
  if (provider.structuredInputProtocol === "jina-v1") {
    return {
      url: provider.baseUrl,
      body: {
        ...body,
        model,
        input: await prepareJinaInput(items as EmbeddingMultimodalItem[], options.fetchMedia),
      },
    };
  }
  if (provider.structuredInputProtocol === "gemini-embed-content") {
    const contents: Record<string, unknown>[] = [];
    for (const item of items) {
      contents.push(await itemToGeminiContent(item, options.fetchMedia));
    }
    if (contents.length === 0) {
      throw new Error("Gemini embedding input must contain at least one item");
    }
    const extras = geminiRequestExtras(body);
    const authHeader = { name: "x-goog-api-key", value: token };
    if (contents.length === 1) {
      return {
        url: geminiNativeUrl(model, "embedContent"),
        body: { content: contents[0], ...extras },
        authHeader,
        normalizeResponse: normalizeGeminiEmbedContentResponse,
      };
    }
    return {
      url: geminiNativeUrl(model, "batchEmbedContents"),
      body: {
        requests: contents.map((content) => ({
          model: `models/${model}`,
          content,
          ...extras,
        })),
      },
      authHeader,
      normalizeResponse: normalizeGeminiBatchResponse,
    };
  }
  throw new Error(`Provider ${provider.id} has no structured embedding input translator`);
}

/**
 * Normalize a single-text embedding endpoint's response into OpenAI's
 * `/v1/embeddings` list shape.
 *
 * CLOVA Studio's embedding v2 answers:
 *
 * ```
 * {"status":{"code":"20000","message":"OK"},
 *  "result":{"embedding":[…1024 floats],"inputTokens":4}}
 * ```
 *
 * There is no `data[]` and no `usage` object, so both are synthesized. `index` is
 * left at 0 here — the batching loop in `embeddings.ts` rewrites it to the
 * caller's position before the response is returned.
 *
 * A non-20000 status or malformed success envelope throws so an HTTP-200 error
 * envelope can never be exposed as an empty successful embedding response.
 */
export function normalizeClovaEmbeddingV2Response(
  rawData: Record<string, unknown>
): Record<string, unknown> {
  const statusCode = (rawData?.status as { code?: unknown } | undefined)?.code;
  if (String(statusCode) !== "20000") {
    throw new Error("CLOVA Studio embedding v2 returned an unsuccessful status");
  }

  const result = (rawData?.result ?? {}) as Record<string, unknown>;
  if (!Array.isArray(result.embedding)) {
    throw new Error("CLOVA Studio embedding v2 response is missing an embedding vector");
  }

  const inputTokens = Number(result.inputTokens) || 0;
  return {
    data: [{ object: "embedding", index: 0, embedding: result.embedding }],
    usage: { prompt_tokens: inputTokens, total_tokens: inputTokens },
  };
}
