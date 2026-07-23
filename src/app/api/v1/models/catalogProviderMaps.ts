import { PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS } from "@/shared/constants/models";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import { parseModel } from "@omniroute/open-sse/services/model";

// Alias <-> providerId resolution maps for the unified model catalog. Extracted
// verbatim from ./catalog.ts. `FALLBACK_ALIAS_TO_PROVIDER` is also consumed directly by
// the catalog host's `resolveCanonicalProviderId`, so it is exported alongside the builder.
export const FALLBACK_ALIAS_TO_PROVIDER = {
  ag: "antigravity",
  cc: "claude",
  cl: "cline",
  cu: "cursor",
  cx: "codex",
  gh: "github",
  kc: "kilocode",
  kmc: "kimi-coding",
  kr: "kiro",
};

export function buildAliasMaps() {
  const aliasToProviderId: Record<string, string> = {};
  const providerIdToAlias: Record<string, string> = {};

  // Canonical source for ID/alias pairs used across dashboard/provider config.
  for (const provider of Object.values(AI_PROVIDERS)) {
    const providerId = provider?.id;
    const alias = provider?.alias || providerId;
    if (!providerId) continue;
    aliasToProviderId[providerId] = providerId;
    aliasToProviderId[alias] = providerId;
    if (!providerIdToAlias[providerId]) {
      providerIdToAlias[providerId] = alias;
    }
  }

  for (const [left, right] of Object.entries(PROVIDER_ID_TO_ALIAS)) {
    // Handle both possible directions:
    // - providerId -> alias
    // - alias -> providerId
    if (PROVIDER_MODELS[left]) {
      aliasToProviderId[left] = aliasToProviderId[left] || right;
      continue;
    }
    if (PROVIDER_MODELS[right]) {
      aliasToProviderId[right] = aliasToProviderId[right] || left;
      continue;
    }
    aliasToProviderId[right] = aliasToProviderId[right] || left;
  }

  for (const alias of Object.keys(PROVIDER_MODELS)) {
    if (!aliasToProviderId[alias]) {
      aliasToProviderId[alias] = alias;
    }
  }

  for (const [alias, providerId] of Object.entries(aliasToProviderId)) {
    if (!providerIdToAlias[providerId]) {
      providerIdToAlias[providerId] = alias;
    }
  }

  // Safety net for environments where alias maps are partially loaded during
  // module initialization/circular imports.
  for (const [alias, providerId] of Object.entries(FALLBACK_ALIAS_TO_PROVIDER)) {
    if (!aliasToProviderId[alias]) aliasToProviderId[alias] = providerId;
    if (!aliasToProviderId[providerId]) aliasToProviderId[providerId] = providerId;
    if (!providerIdToAlias[providerId]) providerIdToAlias[providerId] = alias;
  }

  return { aliasToProviderId, providerIdToAlias };
}

export type AliasMaps = ReturnType<typeof buildAliasMaps>;

/** A minimal combo target shape — just enough to resolve a provider+model pair. */
export type ProviderPrefixedTarget = {
  modelStr?: string;
  provider?: string | null;
};

/**
 * Resolve an alias or providerId to its canonical providerId, matching the
 * catalog host's local `resolveCanonicalProviderId` closure (./catalog.ts)
 * byte-for-byte. Extracted here so every caller resolves prefixes the exact
 * same way instead of drifting into a slightly different algorithm.
 */
export function resolveCanonicalProviderId(
  aliasToProviderId: AliasMaps["aliasToProviderId"],
  aliasOrProviderId: string,
  fallbackProviderId?: string
): string {
  return (
    aliasToProviderId[aliasOrProviderId] ||
    (fallbackProviderId ? aliasToProviderId[fallbackProviderId] : undefined) ||
    FALLBACK_ALIAS_TO_PROVIDER[aliasOrProviderId as keyof typeof FALLBACK_ALIAS_TO_PROVIDER] ||
    fallbackProviderId ||
    aliasOrProviderId
  );
}

/** True when `${prefix}/__omniroute_probe__` parses back to the given providerId. */
export function prefixRoutesToProvider(prefix: string, providerId: string): boolean {
  const parsed = parseModel(`${prefix}/__omniroute_probe__`);
  return parsed.provider === providerId;
}

/**
 * Every prefix (providerId, raw alias, and any alias mapped to this providerId)
 * that a combo `modelStr` might be qualified with for this provider — filtered
 * to only the prefixes that `parseModel()` actually routes back to `providerId`.
 * Extracted verbatim from the catalog host's local `getProviderPrefixes` closure.
 */
export function getProviderPrefixes(
  maps: AliasMaps,
  providerId: string,
  rawProvider: string
): string[] {
  const { aliasToProviderId, providerIdToAlias } = maps;
  const prefixes = new Set<string>([providerId, rawProvider, providerIdToAlias[providerId]]);
  for (const [alias, mappedProviderId] of Object.entries(aliasToProviderId)) {
    if (mappedProviderId === providerId) prefixes.add(alias);
  }
  return [...prefixes].filter(
    (prefix): prefix is string =>
      typeof prefix === "string" && prefix.length > 0 && prefixRoutesToProvider(prefix, providerId)
  );
}

/**
 * Strip a provider/alias prefix off a combo target's `modelStr` and resolve its
 * canonical providerId, so downstream registry/spec/synced-capability lookups
 * are keyed by the BARE model id (e.g. "glm-5.2") rather than a qualified
 * "provider/model" string that only curated MODEL_SPECS aliases happen to match.
 *
 * Extracted verbatim from the catalog host's local `getComboTargetModelId`
 * closure (./catalog.ts) so every combo-context consumer — the catalog's own
 * per-target metadata AND src/lib/combos/comboContext.ts's context-length
 * aggregation — stays in lockstep instead of re-implementing this resolution.
 */
export function getComboTargetModelId(
  maps: AliasMaps,
  target: ProviderPrefixedTarget
): { providerId: string; modelId: string } | null {
  const rawProvider = typeof target.provider === "string" ? target.provider.trim() : "";
  const modelStr = typeof target.modelStr === "string" ? target.modelStr.trim() : "";
  if (!rawProvider || rawProvider === "unknown" || !modelStr) return null;

  const providerId = resolveCanonicalProviderId(maps.aliasToProviderId, rawProvider);
  if (!providerId || providerId === "unknown") return null;

  for (const prefix of getProviderPrefixes(maps, providerId, rawProvider)) {
    const prefixWithSlash = `${prefix}/`;
    if (modelStr.startsWith(prefixWithSlash)) {
      const modelId = modelStr.slice(prefixWithSlash.length).trim();
      return modelId ? { providerId, modelId } : null;
    }
  }

  return { providerId, modelId: modelStr };
}
