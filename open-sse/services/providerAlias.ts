import { PROVIDER_ID_TO_ALIAS } from "../config/providerModels.ts";

// Derive alias→provider mapping from the single source of truth (PROVIDER_ID_TO_ALIAS)
// This prevents the two maps from drifting out of sync
export const ALIAS_TO_PROVIDER_ID: Record<string, string> = {};
for (const [id, alias] of Object.entries(PROVIDER_ID_TO_ALIAS)) {
  if (ALIAS_TO_PROVIDER_ID[alias]) {
    console.log(
      `[MODEL] Warning: alias "${alias}" maps to both "${ALIAS_TO_PROVIDER_ID[alias]}" and "${id}". Using "${id}".`
    );
  }
  ALIAS_TO_PROVIDER_ID[alias] = id;
}
// Manual alias overrides — maps slug-style prefixes to canonical provider IDs.
// These live outside the registry because they represent multiple providers
// or backward-compatible slug changes, not a single provider's display name.
// opencode/ → opencode-zen (the main free/open tier; opencode-go is a separate paid tier)
ALIAS_TO_PROVIDER_ID["opencode"] = "opencode-zen";
// xiaomi/ is the user-visible prefix for MiMo models; register it so
// parseModel("xiaomi/mimo-v2-flash") resolves provider = "xiaomi-mimo" instead
// of falling through to the identity fallback ("xiaomi").
ALIAS_TO_PROVIDER_ID["xiaomi"] = "xiaomi-mimo";
// llamacpp/ is the user-visible alias for the llama-cpp self-hosted provider.
// The canonical ID is "llama-cpp" (with a hyphen), but the catalog and user-facing
// prefix is "llamacpp". Register it so parseModel("llamacpp/<model>") resolves
// provider = "llama-cpp" instead of the identity fallback ("llamacpp").
ALIAS_TO_PROVIDER_ID["llamacpp"] = "llama-cpp";
// agy/ is the short alias for antigravity provider.
ALIAS_TO_PROVIDER_ID["agy"] = "antigravity";
// aq/ is the user-visible prefix for the Amazon Q (AWS Builder ID) provider.
// The canonical provider ID is "amazon-q". Register it so parseModel("aq/<model>")
// resolves provider = "amazon-q" instead of falling through to the identity fallback.
ALIAS_TO_PROVIDER_ID["aq"] = "amazon-q";

/**
 * Resolve provider alias to provider ID
 */
export function resolveProviderAlias(aliasOrId: string | null | undefined): string | null {
  if (typeof aliasOrId !== "string") return null;
  // Follow the alias chain transitively so intermediate alias-only hops resolve
  // to the final target, but STOP as soon as a hop lands on a registered
  // provider id (#2901): "oc" must resolve to the no-auth "opencode" provider,
  // NOT continue through the manual "opencode" → "opencode-zen" slug override —
  // that override is for user-typed `opencode/` prefixes only. Without this
  // boundary the no-auth provider becomes unreachable by any prefix.
  // Guarded against infinite loops with both a depth limit and a seen-set.
  let current = aliasOrId;
  const seen = new Set<string>();
  for (let i = 0; i < 10; i++) {
    const next = ALIAS_TO_PROVIDER_ID[current];
    if (!next || next === current) return current;
    if (next in PROVIDER_ID_TO_ALIAS) return next;
    if (seen.has(next)) return next;
    seen.add(next);
    current = next;
  }
  return current;
}
