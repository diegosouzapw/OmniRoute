import { pickCacheCreationTokens } from "./pickCacheCreationTokens.ts";

type CacheUsageSource = {
  cache_creation_input_tokens?: number;
  cache_write_tokens?: number;
  input_tokens_details?: { cached_tokens?: number; cache_creation_tokens?: number };
  prompt_tokens_details?: { cached_tokens?: number; cache_creation_tokens?: number };
};

/**
 * Resolve the `input_tokens_details` object for a Responses API usage payload,
 * merging cache READ (`cached_tokens`) and cache CREATION (`cache_creation_tokens`)
 * tokens from any upstream shape instead of dropping the creation leg (#13472).
 */
export function resolveResponsesCacheUsageDetails(usage: CacheUsageSource) {
  const cachedTokens =
    usage.input_tokens_details?.cached_tokens ?? usage.prompt_tokens_details?.cached_tokens;
  const cacheCreationTokens = pickCacheCreationTokens(usage);
  if (!cachedTokens && !cacheCreationTokens) return undefined;
  return {
    ...(cachedTokens ? { cached_tokens: cachedTokens } : {}),
    ...(cacheCreationTokens ? { cache_creation_tokens: cacheCreationTokens } : {}),
  };
}
