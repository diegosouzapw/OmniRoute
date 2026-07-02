import {
  EMBEDDING_PROVIDERS,
  buildDynamicEmbeddingProvider,
  type EmbeddingProviderNodeRow,
} from "@omniroute/open-sse/config/embeddingRegistry.ts";
import { getProviderCredentials } from "@/sse/services/auth";
import { getProviderNodes } from "@/lib/localDb";
import type { MemorySettingsExtended } from "@/shared/schemas/memory";
import type {
  EmbeddingResolution,
  EmbeddingResult,
  EmbeddingError,
  EmbeddingProviderListing,
} from "./types";
import { embedRemote } from "./remote";
import { embedStatic } from "./staticPotion";
import { embedTransformers } from "./transformersLocal";
import { buildCacheKey, get as cacheGet, set as cacheSet } from "./cache";

const STATIC_MODEL = process.env.MEMORY_STATIC_MODEL || "minishlab/potion-base-8M";
const TRANSFORMERS_MODEL = process.env.MEMORY_TRANSFORMERS_MODEL || "Xenova/all-MiniLM-L6-v2";

/** Build an EmbeddingResolution for "no source available" cases. */
function noSource(reason: string): EmbeddingResolution {
  return {
    source: null,
    model: null,
    dimensions: null,
    signature: "null:null:null",
    reason,
  };
}

/** Build a signature string. */
function makeSignature(
  source: "remote" | "static" | "transformers" | null,
  model: string | null,
  dim: number | null
): string {
  return `${source ?? "null"}:${model ?? "null"}:${dim ?? "null"}`;
}

/**
 * Resolve which embedding source is active for the given settings (D4).
 * Pure: no heavy I/O. Provider key check done via synchronous registry lookup.
 */
export function resolveEmbeddingSource(settings: MemorySettingsExtended): EmbeddingResolution {
  const source = settings.embeddingSource ?? "auto";

  if (source === "remote") {
    // Explicit remote — check if the configured model has a key
    const model = settings.embeddingProviderModel ?? null;
    if (!model) {
      return {
        source: null,
        model: null,
        dimensions: null,
        signature: makeSignature(null, null, null),
        reason: "no_key: embeddingProviderModel não configurado",
      };
    }
    // We can't do async here, so we report it as potentially available
    // and the caller will attempt embed + get no_key error on failure.
    // For resolution purposes, mark as remote (will fail at embed time if no key).
    return {
      source: "remote",
      model,
      dimensions: null,
      signature: makeSignature("remote", model, null),
      reason: `provider remoto configurado: ${model}`,
    };
  }

  if (source === "static") {
    if (settings.staticEnabled !== true) {
      return {
        source: null,
        model: null,
        dimensions: null,
        signature: makeSignature(null, null, null),
        reason: "static desabilitado nas configurações",
      };
    }
    return {
      source: "static",
      model: STATIC_MODEL,
      dimensions: 256,
      signature: makeSignature("static", STATIC_MODEL, 256),
      reason: "static (potion-base-8M) selecionado explicitamente",
    };
  }

  if (source === "transformers") {
    if (settings.transformersEnabled !== true) {
      return {
        source: null,
        model: null,
        dimensions: null,
        signature: makeSignature(null, null, null),
        reason: "transformers desabilitado nas configurações",
      };
    }
    return {
      source: "transformers",
      model: TRANSFORMERS_MODEL,
      dimensions: 384,
      signature: makeSignature("transformers", TRANSFORMERS_MODEL, 384),
      reason: "transformers.js (MiniLM-L6-v2) selecionado explicitamente",
    };
  }

  // auto: (1) remote if model configured and provider has key in registry
  // (2) static if staticEnabled
  // (3) transformers if transformersEnabled
  // (4) null
  if (source === "auto") {
    // Try remote first — check if embeddingProviderModel is set
    const providerModel = settings.embeddingProviderModel ?? null;
    if (providerModel) {
      const slashIdx = providerModel.indexOf("/");
      const providerId = slashIdx > 0 ? providerModel.slice(0, slashIdx) : null;
      if (providerId && EMBEDDING_PROVIDERS[providerId]) {
        // We defer the actual hasKey check to listEmbeddingProviders (async).
        // For resolveEmbeddingSource (sync), we report "possibly remote" when model is set.
        // If no key, embed will return EmbeddingError{reason:"no_key"}.
        return {
          source: "remote",
          model: providerModel,
          dimensions: null,
          signature: makeSignature("remote", providerModel, null),
          reason: `auto: provider ${providerId} configurado`,
        };
      }
    }

    if (settings.staticEnabled === true) {
      return {
        source: "static",
        model: STATIC_MODEL,
        dimensions: 256,
        signature: makeSignature("static", STATIC_MODEL, 256),
        reason: "auto: potion-base-8M (static) disponível",
      };
    }

    if (settings.transformersEnabled === true) {
      return {
        source: "transformers",
        model: TRANSFORMERS_MODEL,
        dimensions: 384,
        signature: makeSignature("transformers", TRANSFORMERS_MODEL, 384),
        reason: "auto: transformers.js (MiniLM-L6-v2) disponível",
      };
    }

    return noSource("auto: nenhuma fonte de embedding disponível");
  }

  return noSource("fonte de embedding desconhecida");
}

/**
 * Generate an embedding for the given text using the active source.
 * Caches results in memory (D6).
 */
export async function embed(
  text: string,
  settings: MemorySettingsExtended
): Promise<EmbeddingResult | EmbeddingError> {
  const resolution = resolveEmbeddingSource(settings);

  if (!resolution.source) {
    return {
      source: "remote",
      model: null,
      reason: "unknown",
      message: resolution.reason,
    };
  }

  const cacheKey = buildCacheKey(resolution.source, resolution.model, resolution.dimensions, text);

  const cached = cacheGet(cacheKey);
  if (cached) {
    return {
      vector: cached,
      source: resolution.source,
      model: resolution.model ?? "",
      dimensions: cached.length,
      latencyMs: 0,
      cached: true,
    };
  }

  let result: EmbeddingResult | EmbeddingError;

  if (resolution.source === "remote") {
    result = await embedRemote(text, resolution.model ?? "");
  } else if (resolution.source === "static") {
    result = await embedStatic(text);
  } else {
    result = await embedTransformers(text);
  }

  if ("vector" in result) {
    cacheSet(cacheKey, result.vector);
  }

  return result;
}

/**
 * List providers that have embedding models, marking which ones have a configured API key.
 * Aggregates from EMBEDDING_PROVIDERS + local provider_nodes.
 */
export async function listEmbeddingProviders(): Promise<EmbeddingProviderListing[]> {
  // Get dynamic local providers
  let dynamicProviders: ReturnType<typeof buildDynamicEmbeddingProvider>[] = [];
  try {
    const nodes = (await getProviderNodes()) as unknown as EmbeddingProviderNodeRow[];
    dynamicProviders = (Array.isArray(nodes) ? nodes : [])
      .filter((n) => {
        const validTypes = ["chat", "responses", "embeddings"];
        return validTypes.includes(n.apiType || "");
      })
      .map((n) => {
        try {
          return buildDynamicEmbeddingProvider(n);
        } catch {
          return null;
        }
      })
      .filter((p): p is NonNullable<typeof p> => p !== null);
  } catch {
    // Ignore failures — just return static providers
  }

  const result: EmbeddingProviderListing[] = [];

  // Process hardcoded EMBEDDING_PROVIDERS
  for (const [providerId, config] of Object.entries(EMBEDDING_PROVIDERS)) {
    let hasKey = false;
    try {
      const creds = await getProviderCredentials(providerId);
      hasKey = !!(
        creds &&
        !("allRateLimited" in creds && creds.allRateLimited) &&
        (("apiKey" in creds ? !!creds.apiKey : false) ||
          ("accessToken" in creds ? !!creds.accessToken : false))
      );
    } catch {
      hasKey = false;
    }

    result.push({
      provider: providerId,
      hasKey,
      models: config.models.map((m) => ({
        id: `${providerId}/${m.id}`,
        name: m.name,
        dimensions: m.dimensions ?? null,
      })),
    });
  }

  // Process dynamic providers (local nodes)
  for (const dp of dynamicProviders) {
    // Dynamic local providers typically have authType="none"
    result.push({
      provider: dp.id,
      hasKey: true, // local providers don't need keys
      models: dp.models.map((m) => ({
        id: `${dp.id}/${m.id}`,
        name: m.name,
        dimensions: m.dimensions ?? null,
      })),
    });
  }

  return result;
}
