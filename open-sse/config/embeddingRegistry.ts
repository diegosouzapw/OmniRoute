/**
 * Embedding Provider Registry
 *
 * Defines providers that support the /v1/embeddings endpoint.
 * All providers use the OpenAI-compatible format.
 *
 * API keys are stored in the same provider credentials system,
 * keyed by provider ID (e.g. "nebius", "openai").
 */

export const EMBEDDING_PROVIDERS = {
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
};

/**
 * Get embedding provider config by ID
 */
export function getEmbeddingProvider(providerId) {
  return EMBEDDING_PROVIDERS[providerId] || null;
}

/**
 * Parse embedding model string (format: "provider/model" or just "model")
 * Returns { provider, model }
 */
export function parseEmbeddingModel(modelStr) {
  if (!modelStr) return { provider: null, model: null };

  // Check for "provider/model" format
  const slashIdx = modelStr.indexOf("/");
  if (slashIdx > 0) {
    // Handle nested model IDs like "nebius/Qwen/Qwen3-Embedding-8B"
    // Try each provider prefix
    for (const [providerId, config] of Object.entries(EMBEDDING_PROVIDERS)) {
      if (modelStr.startsWith(providerId + "/")) {
        return { provider: providerId, model: modelStr.slice(providerId.length + 1) };
      }
    }
    // Fallback: first segment is provider
    const provider = modelStr.slice(0, slashIdx);
    const model = modelStr.slice(slashIdx + 1);
    return { provider, model };
  }

  // No provider prefix — search all providers for the model
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
