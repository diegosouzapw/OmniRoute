import {
  pickCacheCreationTokens,
  resolveCacheCreationInPrompt,
} from "./pickCacheCreationTokens.ts";

type CacheUsageSource = {
  cache_creation_input_tokens?: number;
  cache_write_tokens?: number;
  input_tokens_details?: {
    cached_tokens?: number;
    cache_creation_tokens?: number;
    cache_write_tokens?: number;
    cache_creation_in_prompt?: boolean;
  };
  prompt_tokens_details?: {
    cached_tokens?: number;
    cache_creation_tokens?: number;
    cache_write_tokens?: number;
    cache_creation_in_prompt?: boolean;
  };
};

/**
 * Resolve the `input_tokens_details` object for a Responses API usage payload,
 * merging cache READ (`cached_tokens`) and cache CREATION (`cache_creation_tokens`)
 * tokens from any upstream shape instead of dropping the creation leg (#13472).
 * The `cache_creation_in_prompt` marker rides along so a client can tell whether
 * `input_tokens` already includes the write.
 */
export function resolveResponsesCacheUsageDetails(usage: CacheUsageSource) {
  const cachedTokens =
    usage.input_tokens_details?.cached_tokens ?? usage.prompt_tokens_details?.cached_tokens;
  const cacheCreationTokens = pickCacheCreationTokens(usage);
  if (!cachedTokens && !cacheCreationTokens) return undefined;
  const cacheCreationInPrompt = cacheCreationTokens
    ? resolveCacheCreationInPrompt(usage)
    : undefined;
  return {
    ...(cachedTokens ? { cached_tokens: cachedTokens } : {}),
    ...(cacheCreationTokens ? { cache_creation_tokens: cacheCreationTokens } : {}),
    ...(cacheCreationInPrompt !== undefined
      ? { cache_creation_in_prompt: cacheCreationInPrompt }
      : {}),
  };
}
