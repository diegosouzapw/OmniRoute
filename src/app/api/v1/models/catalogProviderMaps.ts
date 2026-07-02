import { PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS } from "@/shared/constants/models";
import { AI_PROVIDERS } from "@/shared/constants/providers";

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
  qw: "qwen",
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
