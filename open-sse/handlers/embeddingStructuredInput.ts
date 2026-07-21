import type { EmbeddingMultimodalItem } from "@/shared/validation/schemas/apiV1";
import type { EmbeddingProvider } from "../config/embeddingRegistry.ts";

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

async function prepareJinaInput(
  items: EmbeddingMultimodalItem[],
  fetchMedia: StructuredEmbeddingFetchOptions["fetchMedia"]
): Promise<Array<Record<string, string>>> {
  return Promise.all(
    items.map(async (item) => {
      if (item.type === "text") return { text: item.text };
      const { data, mediaType } = await sourceToInlineData(item, fetchMedia);
      const key = item.type === "document" ? "pdf" : item.type;
      return { [key]: `data:${mediaType};base64,${data}` };
    })
  );
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
  return Promise.all(
    items.map(async (item) => {
      if (item.type === "text") return { text: item.text };
      const { data, mediaType } = await sourceToInlineData(item, fetchMedia);
      return { inline_data: { mime_type: mediaType, data } };
    })
  );
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
