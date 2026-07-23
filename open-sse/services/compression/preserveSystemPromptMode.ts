import type { CompressionConfig, PreserveSystemPromptMode } from "./types.ts";

/**
 * T05/C5 — system-prompt preservation mode.
 *
 * The engine-facing field is the boolean `CompressionConfig.preserveSystemPrompt`
 * (truthy = skip/preserve the system prompt). Its authoritative *intent* is the
 * `preserveSystemPromptMode` enum, resolved to that boolean at the cache-aware layer
 * (`resolveCacheAwareConfig`), which already runs upstream in `chatCore` with the
 * caching context. This module is the single source of the enum<->boolean mapping so
 * the legacy boolean and the new enum can never drift.
 *
 * Mode semantics:
 * - `always`      → preserve the system prompt unconditionally.
 * - `whenNoCache` → preserve it only when there is a cache to protect (provider caches
 *                   the prefix or `cache_control` is present); compress it otherwise.
 *                   This is exactly what the legacy `preserveSystemPrompt: false` already
 *                   did via the #3890/#3955 cache guard.
 * - `never`       → compress the system prompt even when it breaks a prompt cache.
 */
export const PRESERVE_SYSTEM_PROMPT_MODES: readonly PreserveSystemPromptMode[] = [
  "always",
  "whenNoCache",
  "never",
];

export function isPreserveSystemPromptMode(value: unknown): value is PreserveSystemPromptMode {
  return (
    typeof value === "string" &&
    (PRESERVE_SYSTEM_PROMPT_MODES as readonly string[]).includes(value)
  );
}

/**
 * Back-compat shim: derive the authoritative mode from a config. An explicit
 * `preserveSystemPromptMode` always wins; otherwise the legacy boolean is mapped
 * 1:1 to the behaviour it already had (`false → whenNoCache`, anything else → `always`).
 */
export function normalizePreserveSystemPromptMode(
  config: Pick<CompressionConfig, "preserveSystemPrompt" | "preserveSystemPromptMode">
): PreserveSystemPromptMode {
  if (isPreserveSystemPromptMode(config.preserveSystemPromptMode)) {
    return config.preserveSystemPromptMode;
  }
  return config.preserveSystemPrompt === false ? "whenNoCache" : "always";
}

/**
 * Resolve a mode to the effective engine-facing boolean given whether a cacheable
 * prefix is present. `true` = preserve (skip), `false` = compress the system prompt.
 */
export function resolvePreserveSystemPrompt(
  mode: PreserveSystemPromptMode,
  { hasCache }: { hasCache: boolean }
): boolean {
  switch (mode) {
    case "always":
      return true;
    case "never":
      return false;
    case "whenNoCache":
      return hasCache;
  }
}

/**
 * The no-cache projection of a mode — the stored/effective boolean used as a sane
 * default for any reader that runs before the cache-aware layer materializes it.
 */
export function modeToBaselineBoolean(mode: PreserveSystemPromptMode): boolean {
  return resolvePreserveSystemPrompt(mode, { hasCache: false });
}
