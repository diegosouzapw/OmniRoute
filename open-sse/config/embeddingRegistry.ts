/**
 * Embedding Provider Registry
 *
 * Defines providers that support the /v1/embeddings endpoint.
 * All providers use the OpenAI-compatible format.
 *
 * API keys are stored in the same provider credentials system,
 * keyed by provider ID (e.g. "nebius", "openai").
 */

export interface EmbeddingProvider {
  id: string;
  baseUrl: string;
  authType: string;
  authHeader: string;
  models: { id: string; name: string; dimensions?: number }[];
}

export interface EmbeddingProviderNodeRow {
  id?: string;
  prefix: string;
  name: string;
  baseUrl: string;
  apiType?: string;
}

/**
 * Build a dynamic EmbeddingProvider from a local provider_node.
 * Only used for local providers (localhost) — caller must filter by hostname.
 */
export function buildDynamicEmbeddingProvider(node: EmbeddingProviderNodeRow): EmbeddingProvider {
  if (!node.prefix || !node.baseUrl) {
    throw new Error(`Invalid provider_node: missing prefix or baseUrl`);
  }
  if (node.prefix.includes("/") || node.prefix.includes(" ")) {
    throw new Error(`Invalid provider_node prefix "${node.prefix}": must not contain / or spaces`);
  }
  const baseUrl = node.baseUrl.replace(/\/+$/, "");
  return {
    id: node.prefix,
    baseUrl: `${baseUrl}/embeddings`,
    authType: "none",
    authHeader: "none",
    models: [],
  };
}

export const EMBEDDING_PROVIDERS: Record<string, EmbeddingProvider> = {
  nebius: {
    id: "nebius",
    baseUrl: "https://api.tokenfactory.nebius.com/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [{ id: "Qwen/Qwen3-Embedding-8B", name: "Qwen3 Embedding 8B", dimensions: 4096 }],
  },

  openai: {
    id: "openai",
    baseUrl: "https://api.openai.com/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "text-embedding-3-small", name: "Text Embedding 3 Small", dimensions: 1536 },
      { id: "text-embedding-3-large", name: "Text Embedding 3 Large", dimensions: 3072 },
      { id: "text-embedding-ada-002", name: "Text Embedding Ada 002", dimensions: 1536 },
    ],
  },

  upstage: {
    id: "upstage",
    baseUrl: "https://api.upstage.ai/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "embedding-query", name: "Embedding Query", dimensions: 4096 },
      { id: "embedding-passage", name: "Embedding Passage", dimensions: 4096 },
    ],
  },

  mistral: {
    id: "mistral",
    baseUrl: "https://api.mistral.ai/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [{ id: "mistral-embed", name: "Mistral Embed", dimensions: 1024 }],
  },

  together: {
    id: "together",
    baseUrl: "https://api.together.xyz/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "BAAI/bge-large-en-v1.5", name: "BGE Large EN v1.5", dimensions: 1024 },
      { id: "togethercomputer/m2-bert-80M-8k-retrieval", name: "M2 BERT 80M 8K", dimensions: 768 },
    ],
  },

  fireworks: {
    id: "fireworks",
    baseUrl: "https://api.fireworks.ai/inference/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "nomic-ai/nomic-embed-text-v1.5", name: "Nomic Embed Text v1.5", dimensions: 768 },
    ],
  },

  nvidia: {
    id: "nvidia",
    baseUrl: "https://integrate.api.nvidia.com/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [{ id: "nvidia/nv-embedqa-e5-v5", name: "NV EmbedQA E5 v5", dimensions: 1024 }],
  },

  openrouter: {
    id: "openrouter",
    baseUrl: "https://openrouter.ai/api/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      {
        id: "openai/text-embedding-3-small",
        name: "Text Embedding 3 Small (OpenRouter)",
        dimensions: 1536,
      },
      {
        id: "openai/text-embedding-3-large",
        name: "Text Embedding 3 Large (OpenRouter)",
        dimensions: 3072,
      },
      {
        id: "openai/text-embedding-ada-002",
        name: "Text Embedding Ada 002 (OpenRouter)",
        dimensions: 1536,
      },
    ],
  },

  "voyage-ai": {
    id: "voyage-ai",
    baseUrl: "https://api.voyageai.com/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "voyage-4-large", name: "Voyage 4 Large", dimensions: 1024 },
      { id: "voyage-4", name: "Voyage 4", dimensions: 1024 },
      { id: "voyage-4-lite", name: "Voyage 4 Lite", dimensions: 1024 },
      { id: "voyage-code-3", name: "Voyage Code 3", dimensions: 1024 },
      { id: "voyage-finance-2", name: "Voyage Finance 2", dimensions: 1024 },
      { id: "voyage-law-2", name: "Voyage Law 2", dimensions: 1024 },
      { id: "voyage-code-2", name: "Voyage Code 2", dimensions: 1536 },
      { id: "voyage-3-large", name: "Voyage 3 Large", dimensions: 1024 },
      { id: "voyage-3.5", name: "Voyage 3.5", dimensions: 1024 },
      { id: "voyage-3.5-lite", name: "Voyage 3.5 Lite", dimensions: 1024 },
      { id: "voyage-3", name: "Voyage 3", dimensions: 1024 },
      { id: "voyage-3-lite", name: "Voyage 3 Lite", dimensions: 512 },
      { id: "voyage-multilingual-2", name: "Voyage Multilingual 2", dimensions: 1024 },
      { id: "voyage-large-2-instruct", name: "Voyage Large 2 Instruct", dimensions: 1024 },
      { id: "voyage-large-2", name: "Voyage Large 2", dimensions: 1536 },
      { id: "voyage-2", name: "Voyage 2", dimensions: 1024 },
    ],
  },

  github: {
    id: "github",
    baseUrl: "https://models.inference.ai.azure.com/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "text-embedding-3-small", name: "Text Embedding 3 Small (GitHub)", dimensions: 1536 },
      { id: "text-embedding-3-large", name: "Text Embedding 3 Large (GitHub)", dimensions: 3072 },
    ],
  },
};

/**
 * Get embedding provider config by ID
 */
export function getEmbeddingProvider(providerId: string): EmbeddingProvider | null {
  return EMBEDDING_PROVIDERS[providerId] || null;
}

/**
 * Parse embedding model string (format: "provider/model" or just "model")
 * Returns { provider, model }
 */
export function parseEmbeddingModel(
  modelStr: string | null,
  dynamicProviders?: EmbeddingProvider[]
): { provider: string | null; model: string | null } {
  if (!modelStr) return { provider: null, model: null };

  // Check for "provider/model" format
  const slashIdx = modelStr.indexOf("/");
  if (slashIdx > 0) {
    // Phase 1: Try each hardcoded provider prefix
    for (const [providerId] of Object.entries(EMBEDDING_PROVIDERS)) {
      if (modelStr.startsWith(providerId + "/")) {
        return { provider: providerId, model: modelStr.slice(providerId.length + 1) };
      }
    }
    // Phase 2: Try dynamic provider_nodes prefix
    if (dynamicProviders) {
      for (const dp of dynamicProviders) {
        if (modelStr.startsWith(dp.id + "/")) {
          return { provider: dp.id, model: modelStr.slice(dp.id.length + 1) };
        }
      }
    }
    // Phase 3: Fallback — first segment is provider
    const provider = modelStr.slice(0, slashIdx);
    const model = modelStr.slice(slashIdx + 1);
    return { provider, model };
  }

  // No provider prefix — search hardcoded providers for the model
  for (const [providerId, config] of Object.entries(EMBEDDING_PROVIDERS)) {
    if (config.models.some((m) => m.id === modelStr)) {
      return { provider: providerId, model: modelStr };
    }
  }

  return { provider: null, model: modelStr };
}

/**
 * Get all embedding models as a flat list
 */
export function getAllEmbeddingModels() {
  const models = [];
  for (const [providerId, config] of Object.entries(EMBEDDING_PROVIDERS)) {
    for (const model of config.models) {
      models.push({
        id: `${providerId}/${model.id}`,
        name: model.name,
        provider: providerId,
        dimensions: model.dimensions,
      });
    }
  }
  return models;
}
