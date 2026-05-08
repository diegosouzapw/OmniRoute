/**
 * Cache-aware strategy selection for AI model compression.
 * Implements logic to detect caching context from request body and adjust strategies accordingly.
 *
 * @file cachingAware.ts
 * @exports CachingContext, CacheAwareStrategy, detectCachingContext, getCacheAwareStrategy
 */

import { providerSupportsCaching } from "../../utils/cacheControlPolicy.ts";

type JsonRecord = Record<string, unknown>;

export interface CachingDetectionContext {
  provider?: string | null;
  targetFormat?: string | null;
  model?: string | null;
}

export interface CachingContext {
  hasCacheControl: boolean;
  provider: string | null;
  targetFormat: string | null;
  isCachingProvider: boolean;
}

export interface CacheAwareStrategy {
  strategy: string;
  skipSystemPrompt: boolean;
  deterministicOnly: boolean;
}

function isRecord(value: unknown): value is JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function inferProviderFromModel(model: unknown): string | null {
  const normalized = normalizeString(model);
  if (!normalized) return null;
  const slashIndex = normalized.indexOf("/");
  if (slashIndex <= 0) return null;
  return normalized.slice(0, slashIndex).toLowerCase();
}

function hasOwnCacheControl(value: unknown): boolean {
  return isRecord(value) && value.cache_control !== undefined && value.cache_control !== null;
}

function arrayHasCacheControl(values: unknown): boolean {
  return Array.isArray(values) && values.some((value) => hasCacheControl(value));
}

function hasCacheControl(value: unknown): boolean {
  if (hasOwnCacheControl(value)) return true;
  if (Array.isArray(value)) return value.some((item) => hasCacheControl(item));
  if (!isRecord(value)) return false;

  if (arrayHasCacheControl(value.system)) return true;
  if (arrayHasCacheControl(value.tools)) return true;
  if (arrayHasCacheControl(value.messages)) return true;
  if (arrayHasCacheControl(value.input)) return true;
  if (arrayHasCacheControl(value.contents)) return true;

  if (isRecord(value.request) && arrayHasCacheControl(value.request.contents)) return true;
  if (isRecord(value.content) || Array.isArray(value.content)) {
    return hasCacheControl(value.content);
  }

  return false;
}

/**
 * Detect the caching context from the request body.
 *
 * @param body - The request body to analyze
 * @param context - Explicit provider/format/model metadata from the routing pipeline
 * @returns A CachingContext object
 */
export function detectCachingContext(
  body: unknown,
  context: CachingDetectionContext = {}
): CachingContext {
  const bodyRecord = isRecord(body) ? body : {};
  const provider =
    normalizeString(context.provider)?.toLowerCase() ??
    inferProviderFromModel(context.model) ??
    inferProviderFromModel(bodyRecord.model);
  const targetFormat = normalizeString(context.targetFormat)?.toLowerCase() ?? null;

  return {
    hasCacheControl: hasCacheControl(body),
    provider,
    targetFormat,
    isCachingProvider: providerSupportsCaching(provider, targetFormat),
  };
}

/**
 * Get a cache-aware strategy based on the given strategy and caching context.
 *
 * @param strategy - The initial strategy (e.g., "aggressive", "ultra", etc.)
 * @param ctx - The caching context
 * @returns A CacheAwareStrategy object
 */
export function getCacheAwareStrategy(strategy: string, ctx: CachingContext): CacheAwareStrategy {
  if (ctx.isCachingProvider && ctx.hasCacheControl) {
    // Adjust strategy for caching providers with cache control
    return {
      strategy: ["aggressive", "ultra"].includes(strategy) ? "standard" : strategy,
      skipSystemPrompt: true,
      deterministicOnly: true,
    };
  }

  // Return the original strategy with no modifications
  return {
    strategy,
    skipSystemPrompt: false,
    deterministicOnly: false,
  };
}
