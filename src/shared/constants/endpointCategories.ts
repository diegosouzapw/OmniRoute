/**
 * Endpoint Category Definitions — API key endpoint restrictions.
 *
 * Each category maps a stable ID to a set of `/v1/` route prefixes.
 * The `resolveEndpointCategory()` function maps an incoming request path
 * to its category for policy enforcement.
 *
 * Empty `allowedEndpoints` on a key = all endpoints allowed (backward compatible).
 *
 * @module shared/constants/endpointCategories
 */

export interface EndpointCategory {
  id: string;
  label: string;
  description: string;
  prefixes: string[];
}

export const ENDPOINT_CATEGORIES: readonly EndpointCategory[] = [
  {
    id: "chat",
    label: "Chat / Messages",
    description: "Chat completions, text completions, messages, and responses",
    prefixes: ["/v1/chat/completions", "/v1/completions", "/v1/messages", "/v1/responses"],
  },
  {
    id: "search",
    label: "Web Search",
    description: "Web search and search analytics",
    prefixes: ["/v1/search"],
  },
  {
    id: "embeddings",
    label: "Embeddings",
    description: "Text embeddings generation",
    prefixes: ["/v1/embeddings"],
  },
  {
    id: "images",
    label: "Images",
    description: "Image generation and editing",
    prefixes: ["/v1/images"],
  },
  {
    id: "audio",
    label: "Audio / Speech",
    description: "Text-to-speech and speech-to-text",
    prefixes: ["/v1/audio"],
  },
  {
    id: "video",
    label: "Video",
    description: "Video generation",
    prefixes: ["/v1/videos"],
  },
  {
    id: "music",
    label: "Music",
    description: "Music generation",
    prefixes: ["/v1/music"],
  },
  {
    id: "rerank",
    label: "Rerank",
    description: "Document reranking",
    prefixes: ["/v1/rerank"],
  },
  {
    id: "models",
    label: "Models",
    description: "List available models (read-only)",
    prefixes: ["/v1/models"],
  },
  {
    id: "moderations",
    label: "Moderations",
    description: "Content moderation",
    prefixes: ["/v1/moderations"],
  },
  {
    id: "ocr",
    label: "OCR",
    description: "Optical character recognition",
    prefixes: ["/v1/ocr"],
  },
  {
    id: "batches",
    label: "Batch Processing",
    description: "Batch API operations",
    prefixes: ["/v1/batches"],
  },
  {
    id: "files",
    label: "Files",
    description: "File upload and management",
    prefixes: ["/v1/files"],
  },
  {
    id: "web-fetch",
    label: "Web Fetch",
    description: "Web page fetching",
    prefixes: ["/v1/web"],
  },
  {
    id: "agents",
    label: "Agents / A2A",
    description: "Agent-to-agent protocol and task execution",
    prefixes: ["/v1/agents"],
  },
] as const;

/**
 * Sorted longest-prefix-first so the most specific match wins
 * (e.g. `/v1/chat/completions` before `/v1/chat`).
 */
const SORTED_PREFIXES: readonly { prefix: string; categoryId: string }[] =
  ENDPOINT_CATEGORIES.flatMap((cat) =>
    cat.prefixes.map((prefix) => ({ prefix, categoryId: cat.id }))
  ).sort((a, b) => b.prefix.length - a.prefix.length);

/**
 * Map a request pathname to its endpoint category ID.
 * Returns `null` if the path doesn't match any category (e.g. management routes).
 */
export function resolveEndpointCategory(pathname: string): string | null {
  for (const { prefix, categoryId } of SORTED_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(prefix + "/")) {
      return categoryId;
    }
  }
  return null;
}
