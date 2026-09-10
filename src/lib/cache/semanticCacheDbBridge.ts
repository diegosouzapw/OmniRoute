import { getDatabaseSettings } from "@/lib/db/databaseSettings";
import { getDbInstance } from "@/lib/db/core";
import { decryptConnectionFields } from "@/lib/db/encryption";
import { registerSemanticCacheConfigResolver } from "@omniroute/open-sse/config/semanticCacheConfig.ts";

let registered = false;

export function resolveProviderConnectionDetails(provider: string): {
  baseUrl?: string;
  apiKey?: string;
} {
  if (!provider) return {};
  try {
    const db = getDbInstance();
    const row = db
      .prepare(
        "SELECT * FROM provider_connections WHERE provider = ? AND is_active != 0 ORDER BY priority ASC, id ASC LIMIT 1"
      )
      .get(provider) as Record<string, unknown> | undefined;

    if (!row) return {};
    const decrypted = decryptConnectionFields(row);
    let baseUrl: string | undefined;
    if (decrypted.provider_specific_data) {
      try {
        const parsed =
          typeof decrypted.provider_specific_data === "string"
            ? JSON.parse(decrypted.provider_specific_data)
            : decrypted.provider_specific_data;
        if (typeof parsed?.baseUrl === "string" && parsed.baseUrl.trim()) {
          baseUrl = parsed.baseUrl.trim();
        }
      } catch {
        // Ignore parse error
      }
    }
    const rawKey = decrypted.api_key || decrypted.apiKey;
    const apiKey = typeof rawKey === "string" && rawKey.trim() ? rawKey.trim() : undefined;
    return { baseUrl, apiKey };
  } catch {
    return {};
  }
}

export function ensureSemanticCacheDbBridge(): void {
  if (registered) return;
  registered = true;
  registerSemanticCacheConfigResolver(() => {
    try {
      const s = getDatabaseSettings().cache;
      if (!s) return null;

      const conn = s.semanticCacheEmbeddingProvider
        ? resolveProviderConnectionDetails(s.semanticCacheEmbeddingProvider)
        : {};

      const embeddingBaseUrl = s.semanticCacheEmbeddingBaseUrl || conn.baseUrl;
      const embeddingApiKey = s.semanticCacheEmbeddingApiKey || conn.apiKey;

      return {
        enabled: s.semanticCacheEnabled,
        backend: s.semanticCacheBackend,
        similarityThreshold: s.semanticCacheThreshold,
        ttlMs: s.semanticCacheTTL,
        maxEntries: s.semanticCacheMaxSize,
        embeddingProvider: s.semanticCacheEmbeddingProvider,
        embeddingModel: s.semanticCacheEmbeddingModel,
        embeddingDimension: s.semanticCacheEmbeddingDimension,
        embeddingBaseUrl,
        embeddingApiKey,
        redisUrl: s.semanticCacheRedisUrl,
        redisPrefix: s.semanticCacheRedisPrefix,
        requireZeroTemperature: s.semanticCacheRequireZeroTemp,
      };
    } catch {
      return null;
    }
  });
}
