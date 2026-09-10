/**
 * Semantic Cache Configuration
 *
 * Configurable options for OmniRoute's dual-layer semantic caching system.
 * Supports environment variable overrides via OMNIROUTE_SEMANTIC_CACHE_*.
 *
 * @module config/semanticCacheConfig
 */

export type SemanticCacheBackend = "memory" | "redis";
export type SemanticCacheType = "direct" | "semantic" | "both";

export interface SemanticCacheConfig {
  /** Master toggle for semantic caching. */
  enabled: boolean;
  /** Storage and vector backend. Defaults to "memory". */
  backend: SemanticCacheBackend;
  /** Cosine similarity threshold (0.0 - 1.0) for semantic hits. Defaults to 0.8. */
  similarityThreshold: number;
  /** Time-to-live for cached entries in milliseconds. Defaults to 30 minutes (1800000 ms). */
  ttlMs: number;
  /** Maximum number of entries stored in memory. Defaults to 1000. */
  maxEntries: number;
  /** Embedding provider to use for semantic embeddings. Defaults to "openai". */
  embeddingProvider: string;
  /** Embedding model name. Defaults to "text-embedding-3-small". */
  embeddingModel: string;
  /** Vector dimension of the embedding model (e.g. 1536). Optional/auto-detected. */
  embeddingDimension?: number;
  /** Maximum milliseconds to wait for embedding generation before failing open. Defaults to 3000 ms. */
  embeddingTimeoutMs: number;
  /** If true, cache entries are isolated per model name. Defaults to true. */
  cacheByModel: boolean;
  /** If true, cache entries are isolated per provider name. Defaults to true. */
  cacheByProvider: boolean;
  /** Number of recent conversation turns embedded and checked. Defaults to 3. */
  conversationHistoryDepth: number;
  /** Maximum message turns in conversation allowed before bypassing caching. Defaults to 50. */
  conversationHistoryThreshold: number;
  /** If true, system prompt messages are excluded from embedding and cache keys. Defaults to false. */
  excludeSystemPrompt: boolean;
  /** Optional custom base URL for embedding provider (e.g. http://192.168.31.147:13305/v1/embeddings). */
  embeddingBaseUrl?: string;
  /** Optional custom API key / Bearer token for embedding provider. */
  embeddingApiKey?: string;
  /** Redis connection URL when backend is "redis". */
  redisUrl?: string;
  /** Key prefix for Redis cache keys. Defaults to "omniroute:semcache:". */
  redisPrefix: string;
  /** If true, only temperature=0 requests are cacheable. Defaults to true for strict determinism. */
  requireZeroTemperature: boolean;
}

export const DEFAULT_SEMANTIC_CACHE_CONFIG: SemanticCacheConfig = {
  enabled: true,
  backend: "memory",
  similarityThreshold: 0.8,
  ttlMs: 1800000, // 30 minutes
  maxEntries: 1000,
  embeddingProvider: "openai",
  embeddingModel: "text-embedding-3-small",
  embeddingDimension: 1536,
  embeddingTimeoutMs: 3000,
  cacheByModel: true,
  cacheByProvider: true,
  conversationHistoryDepth: 3,
  conversationHistoryThreshold: 50,
  excludeSystemPrompt: false,
  redisUrl: undefined,
  redisPrefix: "omniroute:semcache:",
  requireZeroTemperature: true,
};

function parseBoolean(val: string | undefined, fallback: boolean): boolean {
  if (val === undefined || val === "") return fallback;
  const lower = val.toLowerCase().trim();
  if (lower === "true" || lower === "1" || lower === "yes") return true;
  if (lower === "false" || lower === "0" || lower === "no") return false;
  return fallback;
}

function parseNumber(val: string | undefined, fallback: number): number {
  if (val === undefined || val === "") return fallback;
  const parsed = Number(val);
  return Number.isFinite(parsed) ? parsed : fallback;
}

type DynamicConfigResolver = () => Partial<SemanticCacheConfig> | null | undefined;
let dynamicResolver: DynamicConfigResolver | null = null;

export function registerSemanticCacheConfigResolver(resolver: DynamicConfigResolver): void {
  dynamicResolver = resolver;
}

/**
 * Resolves semantic cache configuration from environment variables, merged
 * with optional dynamic database settings and explicit overrides.
 */
export function resolveSemanticCacheConfig(
  overrides?: Partial<SemanticCacheConfig>
): SemanticCacheConfig {
  const dynamic = dynamicResolver ? dynamicResolver() : null;
  const env = process.env;

  const backendEnv = (env.OMNIROUTE_SEMANTIC_CACHE_BACKEND || "").toLowerCase().trim();
  const backend: SemanticCacheBackend =
    backendEnv === "redis"
      ? "redis"
      : backendEnv === "memory"
        ? "memory"
        : (dynamic?.backend ?? DEFAULT_SEMANTIC_CACHE_CONFIG.backend);

  const resolved: SemanticCacheConfig = {
    enabled:
      env.OMNIROUTE_SEMANTIC_CACHE_ENABLED !== undefined
        ? parseBoolean(env.OMNIROUTE_SEMANTIC_CACHE_ENABLED, DEFAULT_SEMANTIC_CACHE_CONFIG.enabled)
        : (dynamic?.enabled ?? DEFAULT_SEMANTIC_CACHE_CONFIG.enabled),
    backend,
    similarityThreshold:
      env.OMNIROUTE_SEMANTIC_CACHE_THRESHOLD !== undefined
        ? parseNumber(
            env.OMNIROUTE_SEMANTIC_CACHE_THRESHOLD,
            DEFAULT_SEMANTIC_CACHE_CONFIG.similarityThreshold
          )
        : (dynamic?.similarityThreshold ?? DEFAULT_SEMANTIC_CACHE_CONFIG.similarityThreshold),
    ttlMs:
      env.OMNIROUTE_SEMANTIC_CACHE_TTL_MS !== undefined
        ? parseNumber(env.OMNIROUTE_SEMANTIC_CACHE_TTL_MS, DEFAULT_SEMANTIC_CACHE_CONFIG.ttlMs)
        : (dynamic?.ttlMs ?? DEFAULT_SEMANTIC_CACHE_CONFIG.ttlMs),
    maxEntries:
      env.OMNIROUTE_SEMANTIC_CACHE_MAX_ENTRIES !== undefined
        ? parseNumber(
            env.OMNIROUTE_SEMANTIC_CACHE_MAX_ENTRIES,
            DEFAULT_SEMANTIC_CACHE_CONFIG.maxEntries
          )
        : (dynamic?.maxEntries ?? DEFAULT_SEMANTIC_CACHE_CONFIG.maxEntries),
    embeddingProvider:
      env.OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_PROVIDER?.trim() ||
      dynamic?.embeddingProvider ||
      DEFAULT_SEMANTIC_CACHE_CONFIG.embeddingProvider,
    embeddingModel:
      env.OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_MODEL?.trim() ||
      dynamic?.embeddingModel ||
      DEFAULT_SEMANTIC_CACHE_CONFIG.embeddingModel,
    embeddingDimension: env.OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_DIMENSION
      ? parseNumber(env.OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_DIMENSION, 1536)
      : (dynamic?.embeddingDimension ?? DEFAULT_SEMANTIC_CACHE_CONFIG.embeddingDimension),
    embeddingTimeoutMs: parseNumber(
      env.OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_TIMEOUT_MS,
      dynamic?.embeddingTimeoutMs ?? DEFAULT_SEMANTIC_CACHE_CONFIG.embeddingTimeoutMs
    ),
    cacheByModel: parseBoolean(
      env.OMNIROUTE_SEMANTIC_CACHE_BY_MODEL,
      dynamic?.cacheByModel ?? DEFAULT_SEMANTIC_CACHE_CONFIG.cacheByModel
    ),
    cacheByProvider: parseBoolean(
      env.OMNIROUTE_SEMANTIC_CACHE_BY_PROVIDER,
      dynamic?.cacheByProvider ?? DEFAULT_SEMANTIC_CACHE_CONFIG.cacheByProvider
    ),
    conversationHistoryDepth: parseNumber(
      env.OMNIROUTE_SEMANTIC_CACHE_HISTORY_DEPTH,
      dynamic?.conversationHistoryDepth ?? DEFAULT_SEMANTIC_CACHE_CONFIG.conversationHistoryDepth
    ),
    conversationHistoryThreshold: parseNumber(
      env.OMNIROUTE_SEMANTIC_CACHE_HISTORY_THRESHOLD,
      dynamic?.conversationHistoryThreshold ??
        DEFAULT_SEMANTIC_CACHE_CONFIG.conversationHistoryThreshold
    ),
    excludeSystemPrompt: parseBoolean(
      env.OMNIROUTE_SEMANTIC_CACHE_EXCLUDE_SYSTEM,
      dynamic?.excludeSystemPrompt ?? DEFAULT_SEMANTIC_CACHE_CONFIG.excludeSystemPrompt
    ),
    embeddingBaseUrl:
      env.OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_BASE_URL?.trim() ||
      dynamic?.embeddingBaseUrl ||
      overrides?.embeddingBaseUrl ||
      undefined,
    embeddingApiKey:
      env.OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_API_KEY?.trim() ||
      dynamic?.embeddingApiKey ||
      overrides?.embeddingApiKey ||
      undefined,
    redisUrl:
      env.OMNIROUTE_SEMANTIC_CACHE_REDIS_URL || env.REDIS_URL || dynamic?.redisUrl || undefined,
    redisPrefix:
      env.OMNIROUTE_SEMANTIC_CACHE_REDIS_PREFIX?.trim() ||
      dynamic?.redisPrefix ||
      DEFAULT_SEMANTIC_CACHE_CONFIG.redisPrefix,
    requireZeroTemperature:
      env.OMNIROUTE_SEMANTIC_CACHE_REQUIRE_ZERO_TEMP !== undefined
        ? parseBoolean(
            env.OMNIROUTE_SEMANTIC_CACHE_REQUIRE_ZERO_TEMP,
            DEFAULT_SEMANTIC_CACHE_CONFIG.requireZeroTemperature
          )
        : (dynamic?.requireZeroTemperature ?? DEFAULT_SEMANTIC_CACHE_CONFIG.requireZeroTemperature),
    ...overrides,
  };

  // Clamp similarity threshold to [0.0, 1.0]
  if (resolved.similarityThreshold < 0) resolved.similarityThreshold = 0;
  if (resolved.similarityThreshold > 1) resolved.similarityThreshold = 1;

  return resolved;
}
