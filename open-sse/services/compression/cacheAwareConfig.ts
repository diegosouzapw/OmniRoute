import type { CompressionConfig } from "./types.ts";
import type { CachingDetectionContext } from "./cachingAware.ts";
import { detectCachingContext, getCacheAwareStrategy } from "./cachingAware.ts";

/**
 * #3890: honor the cache-aware `skipSystemPrompt` decision that
 * `getCacheAwareStrategy` already computes but `selectCompressionStrategy`
 * cannot return. In a caching context the system prompt is part of the
 * cacheable prefix, so compressing it breaks the upstream prompt cache.
 */
export function resolveCacheAwareConfig(
  config: CompressionConfig,
  body?: Record<string, unknown>,
  context?: CachingDetectionContext
): CompressionConfig {
  if (!body) return config;
  const ctx = detectCachingContext(body, context);
  const cacheAware = getCacheAwareStrategy(config.defaultMode, ctx);
  if (cacheAware.skipSystemPrompt && config.preserveSystemPrompt === false) {
    return { ...config, preserveSystemPrompt: true };
  }
  return config;
}
