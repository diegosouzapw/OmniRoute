import type { CompressionConfig } from "./types.ts";
import type { CachingDetectionContext } from "./cachingAware.ts";
import { detectCachingContext, getCacheAwareStrategy } from "./cachingAware.ts";
import {
  normalizePreserveSystemPromptMode,
  resolvePreserveSystemPrompt,
} from "./preserveSystemPromptMode.ts";
import {
  resolvePrefixFreezeConfig,
  extractStablePrefixHash,
  observePrefix,
  isPrefixFrozen,
} from "./prefixFreeze.ts";

/**
 * T08/H5 — augment the static cache signal with usage-observed prefix freeze. Opt-in
 * (default off): when a system prompt has recurred `>= threshold` times, treat it as a stable
 * cacheable prefix to preserve even for a provider the static check does not flag as caching.
 * "Freeze" only *preserves* the prefix, so it never corrupts a payload.
 */
function observeAndCheckPrefixFreeze(body: Record<string, unknown>): boolean {
  const cfg = resolvePrefixFreezeConfig();
  if (!cfg.enabled) return false;
  const hash = extractStablePrefixHash(body);
  if (!hash) return false;
  observePrefix(hash);
  return isPrefixFrozen(hash, cfg.threshold);
}

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
  // The signal is the static caching heuristic OR (H5, opt-in) a usage-observed stable prefix.
  const staticCache = body
    ? getCacheAwareStrategy(config.defaultMode, detectCachingContext(body, context)).skipSystemPrompt
    : false;
  const hasCache = staticCache || (body ? observeAndCheckPrefixFreeze(body) : false);
  const effective = resolvePreserveSystemPrompt(mode, { hasCache });
  if (effective === config.preserveSystemPrompt) return config;
  return { ...config, preserveSystemPrompt: effective };
}
