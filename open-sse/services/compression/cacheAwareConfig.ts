import type { CompressionConfig } from "./types.ts";
import type { CachingDetectionContext } from "./cachingAware.ts";
import { detectCachingContext, getCacheAwareStrategy } from "./cachingAware.ts";
import {
  normalizePreserveSystemPromptMode,
  resolvePreserveSystemPrompt,
} from "./preserveSystemPromptMode.ts";

/**
 * #3890/#3955 + T05/C5: materialize the engine-facing `preserveSystemPrompt`
 * boolean from the authoritative `preserveSystemPromptMode` intent, using the
 * cache-aware `skipSystemPrompt` signal that `getCacheAwareStrategy` already
 * computes (a caching provider — or `cache_control` — means the system prompt is
 * part of the cacheable prefix, so compressing it breaks the upstream cache).
 *
 * This generalizes the previous hard-coded "force `true` when a cache is present
 * and the operator disabled preservation" into the three modes:
 * - `always`      → always `true`.
 * - `whenNoCache` → `true` only when a cache is present (the legacy `false`
 *   behaviour — preserved exactly for back-compat).
 * - `never`       → always `false`, even when it breaks a prompt cache.
 */
export function resolveCacheAwareConfig(
  config: CompressionConfig,
  body?: Record<string, unknown>,
  context?: CachingDetectionContext
): CompressionConfig {
  const mode = normalizePreserveSystemPromptMode(config);
  // No request body → no cacheable prefix to detect; honor the mode at its no-cache baseline.
  const hasCache = body
    ? getCacheAwareStrategy(config.defaultMode, detectCachingContext(body, context)).skipSystemPrompt
    : false;
  const effective = resolvePreserveSystemPrompt(mode, { hasCache });
  if (effective === config.preserveSystemPrompt) return config;
  return { ...config, preserveSystemPrompt: effective };
}
