import { MAX_EMBEDDING_INLINE_TOTAL_BYTES } from "@/shared/validation/schemas/apiV1";
import type { EmbeddingMultimodalItem } from "@/shared/validation/schemas/apiV1";
import type { EmbeddingProvider } from "../config/embeddingRegistry.ts";

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

function mapGeminiTaskType(value: unknown): unknown {
  if (value === "retrieval.query") return "RETRIEVAL_QUERY";
  if (value === "retrieval.passage") return "RETRIEVAL_DOCUMENT";
  return value;
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

function normalizeGeminiResponse(data: Record<string, unknown>): Record<string, unknown> {
  const embedding = data.embedding as { values?: unknown } | undefined;
  return {
    object: "list",
    data: [{ object: "embedding", embedding: embedding?.values ?? [], index: 0 }],
    usage: { prompt_tokens: 0, total_tokens: 0 },
  };
}

/**
 * Translate OmniRoute's provider-neutral structured input into a documented
 * provider-native transport. Each top-level canonical array is one logical
 * multimodal item for Gemini and one vector-per-item batch for Jina.
 */
export async function prepareStructuredEmbeddingRequest(
  provider: EmbeddingProvider,
  model: string,
  body: Record<string, unknown>,
  token: string,
  options: StructuredEmbeddingFetchOptions
): Promise<PreparedEmbeddingRequest> {
  const items = body.input as EmbeddingMultimodalItem[];
  if (provider.structuredInputProtocol === "jina-v1") {
    return {
      url: provider.baseUrl,
      body: { ...body, model, input: await prepareJinaInput(items, options.fetchMedia) },
    };
  }
  if (provider.structuredInputProtocol === "gemini-embed-content") {
    const parts = await prepareGeminiParts(items, options.fetchMedia);
    const request: Record<string, unknown> = {
      content: { parts },
    };
    if (body.dimensions !== undefined) request.output_dimensionality = body.dimensions;
    if (body.task !== undefined) request.task_type = mapGeminiTaskType(body.task);
    return {
      url: `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:embedContent`,
      body: request,
      authHeader: { name: "x-goog-api-key", value: token },
      normalizeResponse: normalizeGeminiResponse,
    };
  }
  throw new Error(`Provider ${provider.id} has no structured embedding input translator`);
}
