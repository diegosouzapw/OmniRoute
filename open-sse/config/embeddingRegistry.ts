/**
 * Embedding Provider Registry
 *
 * Defines providers that support the /v1/embeddings endpoint.
 * All providers use the OpenAI-compatible format.
 *
 * API keys are stored in the same provider credentials system,
 * keyed by provider ID (e.g. "nebius", "openai").
 */

export type EmbeddingModality = "text" | "image" | "audio" | "video" | "document";
export type StructuredEmbeddingProtocol = "jina-v1" | "gemini-embed-content";
export type SingleTextEmbeddingProtocol = "clova-v2";

export interface EmbeddingModel {
  id: string;
  name: string;
  dimensions?: number;
  /** Structured input modalities explicitly supported by this registry model. */
  modalities?: EmbeddingModality[];
  /**
   * Model-level default request parameters injected into the upstream body when
   * the client did not already supply them. Used for asymmetric embedding models
   * that require a mandatory parameter — e.g. NVIDIA NIM `nv-embedqa-*` models
   * reject requests without `input_type` ("query" | "passage"). See issue #1378.
   */
  defaultParams?: Record<string, unknown>;
}

export interface EmbeddingProvider {
  id: string;
  baseUrl: string;
  authType: string;
  authHeader: string;
  models: EmbeddingModel[];
  /** Provider-native serializer required for canonical structured input. */
  structuredInputProtocol?: StructuredEmbeddingProtocol;
  /**
   * Set when the endpoint embeds exactly ONE text per request (`{"text": …}` →
   * one vector) instead of accepting OpenAI's `input` array. A batched
   * `/v1/embeddings` call is then fanned out into N sequential upstream calls and
   * merged back into a single OpenAI list response.
   */
  singleTextProtocol?: SingleTextEmbeddingProtocol;
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
  cohere: {
    id: "cohere",
    baseUrl: "https://api.cohere.com/v2/embed",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "embed-v4.0", name: "Embed v4.0" },
      { id: "embed-multilingual-v3.0", name: "Embed Multilingual v3.0" },
      { id: "embed-multilingual-v3.0-images", name: "Embed Multilingual v3.0 Image" },
      { id: "embed-multilingual-light-v3.0", name: "Embed Multilingual Light v3.0" },
      { id: "embed-multilingual-light-v3.0-images", name: "Embed Multilingual Light v3.0 Image" },
    ],
  },

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

  "vercel-ai-gateway": {
    id: "vercel-ai-gateway",
    baseUrl: "https://ai-gateway.vercel.sh/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "text-embedding-3-small", name: "Text Embedding 3 Small", dimensions: 1536 },
      { id: "text-embedding-3-large", name: "Text Embedding 3 Large", dimensions: 3072 },
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
      {
        id: "accounts/fireworks/models/qwen3-embedding-8b",
        name: "Qwen3 Embedding 8B",
        dimensions: 4096,
      },
    ],
  },

  nvidia: {
    id: "nvidia",
    baseUrl: "https://integrate.api.nvidia.com/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    // nv-embedqa-* are asymmetric models: NVIDIA NIM rejects requests without an
    // `input_type` ("query" | "passage") with 400 "'input_type' parameter is
    // required". Default to "query" when the client omits it (issue #1378).
    models: [
      {
        id: "nvidia/nv-embedqa-e5-v5",
        name: "NV EmbedQA E5 v5",
        dimensions: 1024,
        defaultParams: { input_type: "query" },
      },
    ],
  },

  // Issue #2298: Adding DeepInfra to the embedding registry so custom
  // embedding models on the DeepInfra provider don't fail with "Unknown
  // embedding provider" when the user adds them via the dashboard.
  deepinfra: {
    id: "deepinfra",
    baseUrl: "https://api.deepinfra.com/v1/openai/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "Qwen/Qwen3-Embedding-8B", name: "Qwen3 Embedding 8B", dimensions: 4096 },
      { id: "Qwen/Qwen3-Embedding-4B", name: "Qwen3 Embedding 4B", dimensions: 2560 },
      { id: "Qwen/Qwen3-Embedding-0.6B", name: "Qwen3 Embedding 0.6B", dimensions: 1024 },
      { id: "BAAI/bge-large-en-v1.5", name: "BGE Large EN v1.5", dimensions: 1024 },
      { id: "BAAI/bge-base-en-v1.5", name: "BGE Base EN v1.5", dimensions: 768 },
      { id: "BAAI/bge-m3", name: "BGE-M3", dimensions: 1024 },
      { id: "intfloat/e5-large-v2", name: "E5 Large v2", dimensions: 1024 },
      { id: "thenlper/gte-large", name: "GTE Large", dimensions: 1024 },
    ],
  },

  // #6976 — OpenRouter serves embeddings via a dedicated OpenAI-compatible
  // /api/v1/embeddings endpoint (omitted from /v1/models, so this catalog is
  // curated rather than live-discovered). Ids verified against the API
  // reference (not the display-name collections page) at refresh time:
  // https://openrouter.ai/docs/api/reference/embeddings and
  // https://openrouter.ai/collections/embedding-models
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
        id: "qwen/qwen3-embedding-8b",
        name: "Qwen3 Embedding 8B (OpenRouter)",
        dimensions: 4096,
      },
      {
        id: "qwen/qwen3-embedding-4b",
        name: "Qwen3 Embedding 4B (OpenRouter)",
        dimensions: 2560,
      },
      {
        id: "baai/bge-m3",
        name: "BGE-M3 (OpenRouter)",
        dimensions: 1024,
      },
      {
        id: "mistralai/mistral-embed-2312",
        name: "Mistral Embed (OpenRouter)",
        dimensions: 1024,
      },
      {
        id: "google/gemini-embedding-001",
        name: "Gemini Embedding 001 (OpenRouter)",
        dimensions: 3072,
      },
      {
        id: "google/gemini-embedding-2",
        name: "Gemini Embedding 2 (OpenRouter)",
        dimensions: 3072,
      },
      {
        id: "google/gemini-embedding-2-preview",
        name: "Gemini Embedding 2 Preview (OpenRouter)",
        dimensions: 3072,
      },
    ],
  },

  gemini: {
    id: "gemini",
    structuredInputProtocol: "gemini-embed-content",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      {
        id: "gemini-embedding-2",
        name: "Gemini Embedding 2",
        dimensions: 3072,
        modalities: ["text", "image", "audio", "video", "document"],
      },
      {
        id: "gemini-embedding-2-preview",
        name: "Gemini Embedding 2 Preview",
        dimensions: 3072,
        modalities: ["text", "image", "audio", "video", "document"],
      },
      { id: "gemini-embedding-001", name: "Gemini Embedding 001", dimensions: 768 },
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
      { id: "voyage-3-large", name: "Voyage 3 Large", dimensions: 1024 },
      { id: "voyage-3.5", name: "Voyage 3.5", dimensions: 1024 },
      { id: "voyage-3.5-lite", name: "Voyage 3.5 Lite", dimensions: 512 },
      { id: "voyage-multilingual-2", name: "Voyage Multilingual 2", dimensions: 1024 },
      { id: "voyage-code-3", name: "Voyage Code 3", dimensions: 1024 },
      { id: "voyage-code-2", name: "Voyage Code 2", dimensions: 1536 },
      { id: "voyage-finance-2", name: "Voyage Finance 2", dimensions: 1024 },
      { id: "voyage-law-2", name: "Voyage Law 2", dimensions: 1024 },
    ],
  },

  // Naver CLOVA Studio — embedding v2. The endpoint takes a single `{"text": …}`
  // body and returns `{status, result:{embedding:[…1024 floats], inputTokens}}`,
  // with no batch array and no `usage` object, hence `singleTextProtocol`.
  "clova-studio": {
    id: "clova-studio",
    baseUrl: "https://clovastudio.stream.ntruss.com/v1/api-tools/embedding/v2",
    authType: "apikey",
    authHeader: "bearer",
    singleTextProtocol: "clova-v2",
    models: [{ id: "clova-embedding-v2", name: "CLOVA Embedding v2", dimensions: 1024 }],
  },

  "jina-ai": {
    id: "jina-ai",
    structuredInputProtocol: "jina-v1",
    baseUrl: "https://api.jina.ai/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      {
        id: "jina-embeddings-v5-text-small",
        name: "Jina Embeddings v5 Text Small",
        dimensions: 1024,
      },
      { id: "jina-embeddings-v5-text-nano", name: "Jina Embeddings v5 Text Nano", dimensions: 768 },
      {
        id: "jina-embeddings-v5-omni-small",
        name: "Jina Embeddings v5 Omni Small",
        dimensions: 1024,
        modalities: ["text", "image", "audio", "video", "document"],
      },
      {
        id: "jina-embeddings-v5-omni-nano",
        name: "Jina Embeddings v5 Omni Nano",
        dimensions: 768,
        modalities: ["text", "image", "audio", "video", "document"],
      },
      { id: "jina-code-embeddings-1.5b", name: "Jina Code Embeddings 1.5B", dimensions: 1536 },
      { id: "jina-code-embeddings-0.5b", name: "Jina Code Embeddings 0.5B", dimensions: 896 },
      {
        id: "jina-embeddings-v4",
        name: "Jina Embeddings v4",
        dimensions: 2048,
        modalities: ["text", "image", "document"],
      },
      {
        id: "jina-clip-v2",
        name: "Jina CLIP v2",
        dimensions: 1024,
        modalities: ["text", "image"],
      },
      { id: "jina-colbert-v2", name: "Jina ColBERT v2", dimensions: 128 },
    ],
  },

  // LM Studio — local OpenAI-compatible server. No auth required.
  // Models are passthrough (LM Studio exposes its own model list), so the
  // models array is empty. The baseUrl is the default LM Studio endpoint;
  // users with a configured provider_node will use that URL instead.
  lmstudio: {
    id: "lmstudio",
    baseUrl: "http://localhost:1234/v1/embeddings",
    authType: "none",
    authHeader: "none",
    models: [],
  },

  // llama.cpp — local OpenAI-compatible server (llama-server).
  // API key optional. Models are passthrough (empty models array).
  "llama-cpp": {
    id: "llama-cpp",
    baseUrl: "http://127.0.0.1:8080/v1/embeddings",
    authType: "none",
    authHeader: "bearer",
    models: [],
  },

  // Lemonade Server — local OpenAI-compatible AI runtime backed by llama.cpp.
  // API key optional (defaults to bearer auth if key configured).
  // Includes harrier-oss-v1-0.6b (1024-dim GGUF) as a curated model.
  lemonade: {
    id: "lemonade",
    baseUrl: "http://localhost:13305/v1/embeddings",
    authType: "none",
    authHeader: "bearer",
    models: [{ id: "harrier-oss-v1-0.6b", name: "Harrier OSS v1 0.6B", dimensions: 1024 }],
  },

  // Ollama Local — OpenAI-compatible embeddings endpoint. Ollama exposes its
  // own model catalog, but these common embedding models are useful defaults
  // for model selection and validation.
  "ollama-local": {
    id: "ollama-local",
    baseUrl: "http://localhost:11434/v1/embeddings",
    authType: "none",
    authHeader: "none",
    models: [
      { id: "embeddinggemma", name: "EmbeddingGemma" },
      { id: "nomic-embed-text", name: "Nomic Embed Text" },
      { id: "bge-m3", name: "BGE M3" },
    ],
  },

  // Issue #6660: Mixedbread AI — OpenAI-compatible /v1/embeddings, free tier
  // available (API key via signup, no card required). Model ids are the
  // upstream-qualified "mixedbread-ai/<model>" form, mirroring how `together`/
  // `fireworks` register fully-qualified upstream model ids above.
  mixedbread: {
    id: "mixedbread",
    baseUrl: "https://api.mixedbread.com/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      {
        id: "mixedbread-ai/mxbai-embed-large-v1",
        name: "Mixedbread Embed Large v1",
        dimensions: 1024,
      },
      {
        id: "mixedbread-ai/mxbai-embed-2d-large-v1",
        name: "Mixedbread Embed 2D Large v1",
        dimensions: 1024,
      },
    ],
  },

  nanogpt: {
    id: "nanogpt",
    baseUrl: "https://nano-gpt.com/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      {
        id: "text-embedding-3-small",
        name: "Text Embedding 3 Small",
        dimensions: 1536,
      },
      {
        id: "text-embedding-3-large",
        name: "Text Embedding 3 Large",
        dimensions: 3072,
      },
    ],
  },
};

const EMBEDDING_PROVIDER_ALIASES: Record<string, string> = {
  jina: "jina-ai",
  voyage: "voyage-ai",
  // The dashboard stores LM Studio connections under the hyphenated provider
  // id "lm-studio" while the embedding registry keys the provider "lmstudio"
  // (#11233). Alias the dashboard id so "lm-studio/<model>" resolves instead
  // of failing with an unknown-provider 400.
  "lm-studio": "lmstudio",
  llamacpp: "llama-cpp",
  "llama.cpp": "llama-cpp",
};

/** Family name used by clients; Jina's public SKU is omni-small. */
const EMBEDDING_MODEL_ALIASES: Record<string, string> = {
  "jina-embeddings-v5-omni": "jina-embeddings-v5-omni-small",
  // Live native catalog is gemini/gemini-embedding-2. Clients that send the
  // OpenRouter-style google/ prefix still resolve to the Gemini provider —
  // do not steal a custom provider_node whose prefix is `google`.
  "google/gemini-embedding-2": "gemini/gemini-embedding-2",
  "google/gemini-embedding-2-preview": "gemini/gemini-embedding-2-preview",
};

function applyEmbeddingModelAliases(modelStr: string): string {
  for (const [alias, canonical] of Object.entries(EMBEDDING_MODEL_ALIASES)) {
    if (modelStr === alias) return canonical;
    // Slash-containing aliases are exact-match only so
    // openrouter/google/gemini-embedding-2 stays on OpenRouter.
    if (!alias.includes("/") && modelStr.endsWith(`/${alias}`)) {
      return `${modelStr.slice(0, -alias.length)}${canonical}`;
    }
  }
  return modelStr;
}

function resolveEmbeddingProviderId(providerId: string): string {
  return EMBEDDING_PROVIDER_ALIASES[providerId] || providerId;
}

function normalizeProviderScopedModelId(providerId: string, modelId: string): string {
  const resolvedProvider = resolveEmbeddingProviderId(providerId);
  const provider = EMBEDDING_PROVIDERS[resolvedProvider];
  if (provider?.models.some((model) => model.id === modelId)) return modelId;

  const providerScopedModelId = `${resolvedProvider}/${modelId}`;
  if (provider?.models.some((model) => model.id === providerScopedModelId)) {
    return providerScopedModelId;
  }

  return modelId.startsWith(`${providerId}/`) ? modelId.slice(providerId.length + 1) : modelId;
}

function toProviderScopedModelId(providerId: string, modelId: string): string {
  return modelId.startsWith(`${providerId}/`) ? modelId : `${providerId}/${modelId}`;
}

/**
 * Get embedding provider config by ID
 */
export function getEmbeddingProvider(providerId: string): EmbeddingProvider | null {
  return EMBEDDING_PROVIDERS[resolveEmbeddingProviderId(providerId)] || null;
}

function findDynamicEmbeddingProvider(
  modelStr: string,
  dynamicProviders: EmbeddingProvider[] | undefined
): { provider: string; model: string } | null {
  const match = dynamicProviders?.find((provider) => modelStr.startsWith(`${provider.id}/`));
  return match ? { provider: match.id, model: modelStr.slice(match.id.length + 1) } : null;
}

function parsePrefixedEmbeddingModel(
  modelStr: string,
  slashIdx: number,
  dynamicProviders: EmbeddingProvider[] | undefined
): { provider: string; model: string } {
  const rawProvider = modelStr.slice(0, slashIdx);
  const dynamicExact = dynamicProviders?.find((provider) => provider.id === rawProvider);
  if (dynamicExact) {
    return { provider: rawProvider, model: modelStr.slice(slashIdx + 1) };
  }

  const resolvedProvider = resolveEmbeddingProviderId(rawProvider);
  if (EMBEDDING_PROVIDERS[resolvedProvider]) {
    return {
      provider: resolvedProvider,
      model: normalizeProviderScopedModelId(resolvedProvider, modelStr.slice(slashIdx + 1)),
    };
  }

  const hardcodedProvider = Object.keys(EMBEDDING_PROVIDERS).find((providerId) =>
    modelStr.startsWith(`${providerId}/`)
  );
  if (hardcodedProvider) {
    return {
      provider: hardcodedProvider,
      model: normalizeProviderScopedModelId(
        hardcodedProvider,
        modelStr.slice(hardcodedProvider.length + 1)
      ),
    };
  }

  return (
    findDynamicEmbeddingProvider(modelStr, dynamicProviders) ?? {
      provider: rawProvider,
      model: modelStr.slice(slashIdx + 1),
    }
  );
}

function findEmbeddingModelProvider(modelStr: string): string | null {
  return (
    Object.entries(EMBEDDING_PROVIDERS).find(([, config]) =>
      config.models.some((model) => model.id === modelStr)
    )?.[0] ?? null
  );
}

/**
 * Derive an OpenAI-compatible embeddings config for a chat provider that has NO
 * curated EMBEDDING_PROVIDERS entry. Works for any registry provider whose base
 * URL ends in /chat/completions by swapping that suffix for /embeddings (groq,
 * mistral, together, upstage, fireworks, nvidia, vercel-ai-gateway, ...).
 * Dynamic-URL providers (no usable static base) derive to
 * null — they need bespoke URL handling, not a bogus endpoint.
 *
 * This is a FALLBACK only: callers must check getEmbeddingProvider() first so
 * curated entries keep their specialized configuration.
 */
export function deriveEmbeddingProviderForChatProvider(
  providerId: string,
  chatEntry: { id?: string; baseUrl?: string | string[] } | null | undefined
): EmbeddingProvider | null {
  if (!chatEntry) return null;
  const rawBase = Array.isArray(chatEntry.baseUrl) ? chatEntry.baseUrl[0] : chatEntry.baseUrl;
  if (!rawBase || typeof rawBase !== "string") return null;
  // stripTrailingSlashes-equivalent without importing open-sse utils here:
  const base = rawBase.replace(/\/+$/, "");
  if (!base.endsWith("/chat/completions")) return null;
  return {
    id: providerId,
    baseUrl: `${base.slice(0, -"/chat/completions".length)}/embeddings`,
    authType: "apikey",
    authHeader: "bearer",
    models: [],
  };
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
  modelStr = applyEmbeddingModelAliases(modelStr);

  // Check for "provider/model" format
  const slashIdx = modelStr.indexOf("/");
  if (slashIdx > 0) {
    return parsePrefixedEmbeddingModel(modelStr, slashIdx, dynamicProviders);
  }

  // No provider prefix — search hardcoded providers for the model
  return { provider: findEmbeddingModelProvider(modelStr), model: modelStr };
}

/**
 * Resolve the known vector dimension of an embedding model string
 * (format: "provider/model"). Returns undefined when the provider/model is
 * unknown or the registry has no dimension recorded for it (e.g. local/custom
 * providers) — callers treat undefined as "can't assert", not "zero".
 */
export function getEmbeddingDimension(modelStr: string): number | undefined {
  const { provider, model } = parseEmbeddingModel(modelStr);
  if (!provider || !model) return undefined;
  const config = getEmbeddingProvider(provider);
  if (!config) return undefined;
  return config.models.find((m) => m.id === model)?.dimensions;
}

/**
 * Detect whether a set of embedding model strings spans more than one known
 * vector dimension. Vectors from models of different dimensions live in
 * incompatible spaces, so failing over between them silently corrupts any
 * vector store built on top of the proxy. Models with an *unknown* dimension
 * are ignored (conservative: we never flag a conflict we can't prove).
 */
export function detectEmbeddingDimensionConflict(modelStrs: string[]): {
  conflict: boolean;
  dimensions: Record<string, number>;
  distinct: number[];
} {
  const dimensions: Record<string, number> = {};
  for (const modelStr of modelStrs) {
    const dim = getEmbeddingDimension(modelStr);
    if (typeof dim === "number") dimensions[modelStr] = dim;
  }
  const distinct = [...new Set(Object.values(dimensions))].sort((a, b) => a - b);
  return { conflict: distinct.length > 1, dimensions, distinct };
}

/**
 * Resolve the model-level default request params for a given provider config and
 * model id. Returns undefined when the model has no defaults (the common case),
 * so callers only inject for models that actually carry one (e.g. NVIDIA NIM
 * asymmetric embedders requiring `input_type`). See issue #1378.
 */
export function getEmbeddingModelDefaultParams(
  providerConfig: EmbeddingProvider | null,
  modelId: string | null
): Record<string, unknown> | undefined {
  if (!providerConfig || !modelId) return undefined;
  return providerConfig.models.find((m) => m.id === modelId)?.defaultParams;
}

export function getEmbeddingModelModalities(
  providerConfig: EmbeddingProvider | null,
  modelId: string | null
): EmbeddingModality[] | undefined {
  if (!providerConfig || !modelId) return undefined;
  return providerConfig.models.find((model) => model.id === modelId)?.modalities;
}

/**
 * Get all embedding models as a flat list
 */
export function getAllEmbeddingModels() {
  const models: Array<{
    id: string;
    name: string;
    provider: string;
    dimensions: number | undefined;
  }> = [];
  for (const [providerId, config] of Object.entries(EMBEDDING_PROVIDERS)) {
    for (const model of config.models) {
      models.push({
        id: toProviderScopedModelId(providerId, model.id),
        name: model.name,
        provider: providerId,
        dimensions: model.dimensions,
      });
    }
  }
  return models;
}
