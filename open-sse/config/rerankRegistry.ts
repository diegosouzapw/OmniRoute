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
      { id: "rerank-v4.0-pro", name: "Rerank v4.0 Pro" },
      { id: "rerank-v4.0-fast", name: "Rerank v4.0 Fast" },
      { id: "rerank-v3.5", name: "Rerank v3.5" },
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
    models: [
      { id: "accounts/fireworks/models/nomic-rerank-v1", name: "Nomic Rerank v1" },
      { id: "accounts/fireworks/models/qwen3-reranker-8b", name: "Qwen3 Reranker 8B" },
    ],
  },

  // Voyage AI is NOT Cohere-compatible: uses `top_k` (not `top_n`), rejects empty-string
  // documents, and returns `{data:[{relevance_score,index}]}` instead of `{results:[…]}`.
  // The `voyage` format adapter in open-sse/handlers/rerank.ts handles both directions (#7809).
  "voyage-ai": {
    id: "voyage-ai",
    baseUrl: "https://api.voyageai.com/v1/rerank",
    authType: "apikey",
    authHeader: "bearer",
    format: "voyage",
    models: [
      { id: "rerank-2.5", name: "Rerank 2.5" },
      { id: "rerank-2.5-lite", name: "Rerank 2.5 Lite" },
    ],
  },

  "jina-ai": {
    id: "jina-ai",
    baseUrl: "https://api.jina.ai/v1/rerank",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "jina-reranker-v3", name: "Jina Reranker v3" },
      { id: "jina-reranker-m0", name: "Jina Reranker m0" },
    ],
  },

  // SiliconFlow rerank is Cohere-compatible (POST /v1/rerank, {model,query,documents}). The
  // reranker models arrive in /v1/models via live model-sync; without this entry the rerank
  // router rejected them with "Invalid rerank model" (#5332). Model IDs keep their vendor slash
  // (e.g. "Qwen/Qwen3-Reranker-8B") — parseRerankModel splits on the FIRST slash, so it's safe.
  siliconflow: {
    id: "siliconflow",
    baseUrl: "https://api.siliconflow.com/v1/rerank",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "Qwen/Qwen3-Reranker-8B", name: "Qwen3 Reranker 8B" },
      { id: "Qwen/Qwen3-Reranker-4B", name: "Qwen3 Reranker 4B" },
      { id: "Qwen/Qwen3-Reranker-0.6B", name: "Qwen3 Reranker 0.6B" },
      { id: "BAAI/bge-reranker-v2-m3", name: "BGE Reranker v2 m3" },
    ],
  },

  // OpenRouter exposes a separate, Cohere-compatible POST /api/v1/rerank endpoint
  // (not surfaced by its live /v1/models feed, which contains 0 rerank ids — confirmed
  // by direct curl). Model IDs keep their vendor slash (e.g. "cohere/rerank-4-pro");
  // parseRerankModel splits on the FIRST slash, so 3-segment ids resolve safely, same
  // as siliconflow above. Seeded by hand and must be maintained here as OpenRouter adds
  // more rerank models (#6574).
  openrouter: {
    id: "openrouter",
    baseUrl: "https://openrouter.ai/api/v1/rerank",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "cohere/rerank-4-pro", name: "Cohere Rerank 4 Pro (via OpenRouter)" },
      { id: "cohere/rerank-4-fast", name: "Cohere Rerank 4 Fast (via OpenRouter)" },
      { id: "cohere/rerank-v3.5", name: "Cohere Rerank v3.5 (via OpenRouter)" },
    ],
  },

  // DeepInfra rerank is NOT Cohere-shaped: POST /v1/inference/<MODEL> with {queries:[q],documents}
  // returning {scores:[…]} (one score per document, positional). The `deepinfra` format adapter in
  // open-sse/handlers/rerank.ts builds the per-model URL and maps scores → Cohere results (#5332).
  deepinfra: {
    id: "deepinfra",
    baseUrl: "https://api.deepinfra.com/v1/inference",
    authType: "apikey",
    authHeader: "bearer",
    format: "deepinfra",
    models: [
      { id: "Qwen/Qwen3-Reranker-8B", name: "Qwen3 Reranker 8B" },
      { id: "Qwen/Qwen3-Reranker-4B", name: "Qwen3 Reranker 4B" },
      { id: "Qwen/Qwen3-Reranker-0.6B", name: "Qwen3 Reranker 0.6B" },
    ],
  },
};

const RERANK_PROVIDER_ALIASES = {
  jina: "jina-ai",
  voyage: "voyage-ai",
};

function resolveRerankProviderId(providerId) {
  return RERANK_PROVIDER_ALIASES[providerId] || providerId;
}

function normalizeProviderScopedModelId(providerId, modelId) {
  const resolvedProvider = resolveRerankProviderId(providerId);
  const provider = RERANK_PROVIDERS[resolvedProvider];
  if (provider?.models.some((model) => model.id === modelId)) return modelId;

  const providerScopedModelId = `${resolvedProvider}/${modelId}`;
  if (provider?.models.some((model) => model.id === providerScopedModelId)) {
    return providerScopedModelId;
  }

  return modelId.startsWith(`${providerId}/`) ? modelId.slice(providerId.length + 1) : modelId;
}

function toProviderScopedModelId(providerId, modelId) {
  return modelId.startsWith(`${providerId}/`) ? modelId : `${providerId}/${modelId}`;
}

/**
 * Get rerank provider config by ID
 */
export function getRerankProvider(providerId) {
  return RERANK_PROVIDERS[resolveRerankProviderId(providerId)] || null;
}

/**
 * Parse rerank model string (format: "provider/model" or just "model")
 * Returns { provider, model }
 */
export function parseRerankModel(modelStr) {
  if (!modelStr) return { provider: null, model: null };

  const slashIdx = modelStr.indexOf("/");
  if (slashIdx > 0) {
    const rawProvider = modelStr.slice(0, slashIdx);
    const resolvedProvider = resolveRerankProviderId(rawProvider);
    if (RERANK_PROVIDERS[resolvedProvider]) {
      return {
        provider: resolvedProvider,
        model: normalizeProviderScopedModelId(resolvedProvider, modelStr.slice(slashIdx + 1)),
      };
    }
  }

  // Try each provider prefix
  for (const [providerId, config] of Object.entries(RERANK_PROVIDERS)) {
    if (modelStr.startsWith(providerId + "/")) {
      return {
        provider: providerId,
        model: normalizeProviderScopedModelId(providerId, modelStr.slice(providerId.length + 1)),
      };
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
        id: toProviderScopedModelId(providerId, model.id),
        name: model.name,
        provider: providerId,
      });
    }
  }
  return models;
}
