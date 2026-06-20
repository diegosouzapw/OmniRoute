/**
 * Helpers for generating/maintaining the Codex CLI `config.toml`.
 */

interface ParsedCodexToml {
  _root: Record<string, unknown>;
  _sections: Record<string, Record<string, unknown>>;
}

/**
 * Migrate the deprecated Codex `[features].codex_hooks` flag to `[features].hooks`.
 *
 * Codex renamed the feature flag; recent Codex CLI versions ignore the old key and
 * print a deprecation notice. When OmniRoute rewrites an existing `config.toml` it
 * should carry the user's intent forward by renaming the key (preserving its value)
 * and dropping the deprecated one. A no-op when `[features]` or `codex_hooks` is
 * absent, and it never clobbers an already-present `hooks` value. (#1327)
 *
 * Operates in place on the route's parsed-TOML shape (`{ _root, _sections }`).
 */
export function migrateCodexFeatureFlags(parsed: ParsedCodexToml): ParsedCodexToml {
  const features = parsed?._sections?.features;
  if (!features || typeof features !== "object") return parsed;
  if (!Object.prototype.hasOwnProperty.call(features, "codex_hooks")) return parsed;
  if (!Object.prototype.hasOwnProperty.call(features, "hooks")) {
    features.hooks = features.codex_hooks;
  }
  delete features.codex_hooks;
  return parsed;
}
