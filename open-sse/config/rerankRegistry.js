/**
 * Rerank Provider Registry
 *
 * Defines providers that support the /v1/rerank endpoint.
 * Follows the Cohere rerank API request/response format (industry standard).
 *
 * API keys are stored in the same provider credentials system,
 * keyed by provider ID (e.g. "cohere", "together").
 */

export const RERANK_PROVIDERS = {
  cohere: {
    id: "cohere",
    baseUrl: "https://api.cohere.com/v2/rerank",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "rerank-v3.5", name: "Rerank v3.5" },
      { id: "rerank-english-v3.0", name: "Rerank English v3.0" },
      { id: "rerank-multilingual-v3.0", name: "Rerank Multilingual v3.0" },
    ],
  },

  together: {
    id: "together",
    baseUrl: "https://api.together.xyz/v1/rerank",
    authType: "apikey",
    authHeader: "bearer",
    models: [{ id: "Salesforce/Llama-Rank-V2", name: "Llama Rank V2" }],
  },

  nvidia: {
    id: "nvidia",
    baseUrl: "https://integrate.api.nvidia.com/v1/ranking",
    authType: "apikey",
    authHeader: "bearer",
    format: "nvidia", // NVIDIA uses slightly different field names
    models: [{ id: "nvidia/nv-rerankqa-mistral-4b-v3", name: "NV RerankQA Mistral 4B v3" }],
  },

  fireworks: {
    id: "fireworks",
    baseUrl: "https://api.fireworks.ai/inference/v1/rerank",
    authType: "apikey",
    authHeader: "bearer",
    models: [{ id: "accounts/fireworks/models/nomic-rerank-v1", name: "Nomic Rerank v1" }],
  },
};

/**
 * Get rerank provider config by ID
 */
export function getRerankProvider(providerId) {
  return RERANK_PROVIDERS[providerId] || null;
}

/**
 * Parse rerank model string (format: "provider/model" or just "model")
 * Returns { provider, model }
 */
export function parseRerankModel(modelStr) {
  if (!modelStr) return { provider: null, model: null };

  // Try each provider prefix
  for (const [providerId, config] of Object.entries(RERANK_PROVIDERS)) {
    if (modelStr.startsWith(providerId + "/")) {
      return { provider: providerId, model: modelStr.slice(providerId.length + 1) };
    }
  }

  // No provider prefix — search all providers for the model
  for (const [providerId, config] of Object.entries(RERANK_PROVIDERS)) {
    if (config.models.some((m) => m.id === modelStr)) {
      return { provider: providerId, model: modelStr };
    }
  }

  return { provider: null, model: modelStr };
}

/**
 * Get all rerank models as a flat list
 */
export function getAllRerankModels() {
  const models = [];
  for (const [providerId, config] of Object.entries(RERANK_PROVIDERS)) {
    for (const model of config.models) {
      models.push({
        id: `${providerId}/${model.id}`,
        name: model.name,
        provider: providerId,
      });
    }
  }
  return models;
}
