import { getProviderConnections } from "@/lib/db/providers";
import { getSyncedAvailableModels, getCustomModels } from "@/lib/db/models";
import {
  EMBEDDING_PROVIDERS,
  getEmbeddingProvider,
} from "@omniroute/open-sse/config/embeddingRegistry.ts";

export interface AvailableEmbeddingModelOption {
  id: string;
  rawId: string;
  name: string;
  dimensions?: number;
  maxTokens?: number;
  supportedInputTypes: string[];
}

export interface EmbeddingProviderOption {
  id: string;
  name: string;
  hasConnection: boolean;
  baseUrl?: string;
  models: AvailableEmbeddingModelOption[];
}

function getProviderBaseUrl(providerSpecificData: unknown): string | undefined {
  if (providerSpecificData && typeof providerSpecificData === "object") {
    const data = providerSpecificData as Record<string, unknown>;
    if (typeof data.baseUrl === "string" && data.baseUrl.trim().length > 0) {
      return data.baseUrl.trim();
    }
  }
  return undefined;
}

export async function getEmbeddingOptions(): Promise<EmbeddingProviderOption[]> {
  const connections = await getProviderConnections().catch(() => []);
  const connectionsByProvider = new Map<string, typeof connections>();

  for (const conn of connections) {
    const p = conn.provider;
    if (!p) continue;
    const list = connectionsByProvider.get(p) || [];
    list.push(conn);
    connectionsByProvider.set(p, list);
  }

  // Collect all candidate providers: configured connections + curated EMBEDDING_PROVIDERS
  const candidateProviders = new Set<string>([
    ...Object.keys(EMBEDDING_PROVIDERS),
    ...connectionsByProvider.keys(),
  ]);

  const providerOptions: EmbeddingProviderOption[] = [];

  for (const providerId of candidateProviders) {
    const conns = connectionsByProvider.get(providerId) || [];
    const activeConn = conns.find((c) => c.isActive !== false) || conns[0];
    const hasConnection = conns.length > 0;

    const curated = getEmbeddingProvider(providerId);
    const configuredBaseUrl = activeConn
      ? getProviderBaseUrl(activeConn.providerSpecificData)
      : undefined;
    const baseUrl = configuredBaseUrl || curated?.baseUrl;

    // Collect models for this provider
    const modelsMap = new Map<string, AvailableEmbeddingModelOption>();

    // 1. Add curated models from embedding registry
    if (curated?.models) {
      for (const m of curated.models) {
        modelsMap.set(m.id, {
          id: `${providerId}/${m.id}`,
          rawId: m.id,
          name: m.name || m.id,
          dimensions: m.dimensions,
          maxTokens: undefined,
          supportedInputTypes: (m.modalities as string[]) || ["text"],
        });
      }
    }

    // 2. Add synced models from DB
    try {
      const synced = await getSyncedAvailableModels(providerId);
      for (const sm of synced) {
        const isEmbedding =
          sm.modelType === "embedding" ||
          sm.apiFormat === "embeddings" ||
          sm.supportedEndpoints?.includes("embeddings") ||
          modelsMap.has(sm.id);

        if (isEmbedding) {
          const existing = modelsMap.get(sm.id);
          modelsMap.set(sm.id, {
            id: `${providerId}/${sm.id}`,
            rawId: sm.id,
            name: sm.name || existing?.name || sm.id,
            dimensions: sm.dimensions || existing?.dimensions,
            maxTokens: sm.inputTokenLimit || existing?.maxTokens,
            supportedInputTypes: sm.supportedInputTypes ||
              existing?.supportedInputTypes || ["text"],
          });
        }
      }
    } catch {
      // Fall through on DB error
    }

    // 3. Add custom models from DB
    try {
      const custom = await getCustomModels(providerId);
      if (Array.isArray(custom)) {
        for (const cm of custom) {
          const isEmbedding =
            cm.modelType === "embedding" ||
            cm.apiFormat === "embeddings" ||
            (Array.isArray(cm.supportedEndpoints) &&
              cm.supportedEndpoints.includes("embeddings")) ||
            modelsMap.has(cm.id);

          if (isEmbedding) {
            const existing = modelsMap.get(cm.id);
            modelsMap.set(cm.id, {
              id: `${providerId}/${cm.id}`,
              rawId: cm.id,
              name: cm.name || existing?.name || cm.id,
              dimensions: cm.dimensions || existing?.dimensions,
              maxTokens: cm.inputTokenLimit || existing?.maxTokens,
              supportedInputTypes: cm.supportedInputTypes ||
                existing?.supportedInputTypes || ["text"],
            });
          }
        }
      }
    } catch {
      // Fall through on DB error
    }

    if (modelsMap.size > 0 || curated !== undefined) {
      providerOptions.push({
        id: providerId,
        name: activeConn?.name || (curated ? providerId : providerId),
        hasConnection,
        baseUrl,
        models: Array.from(modelsMap.values()),
      });
    }
  }

  providerOptions.sort((a, b) => {
    if (a.hasConnection !== b.hasConnection) {
      return a.hasConnection ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  return providerOptions;
}
