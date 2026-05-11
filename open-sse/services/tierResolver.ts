import type { TierAssignment, TierConfig, ProviderTier } from "./tierTypes";
import { PROVIDER_TIER } from "./tierTypes";
import { getModelPricing } from "./providerCostData";
import { isExplicitlyFree } from "./providerCostData";
import { mergeTierConfig, DEFAULT_TIER_CONFIG } from "./tierConfig";

let dbPersistenceChecked = false;

const tierCache = new Map<string, TierAssignment>();
let currentConfig: TierConfig = DEFAULT_TIER_CONFIG;

function cacheKey(provider: string, model: string): string {
  return `${provider}::${model}`;
}

function matchGlob(pattern: string, text: string): boolean {
  const regexStr = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(`^${regexStr}$`, "i").test(text);
}

export function classifyTier(provider: string, model: string): TierAssignment {
  const key = cacheKey(provider, model);

  if (tierCache.has(key)) {
    return tierCache.get(key)!;
  }

  if (isExplicitlyFree(provider, currentConfig)) {
    const assignment: TierAssignment = {
      provider,
      model,
      tier: PROVIDER_TIER.FREE,
      reason: `Provider '${provider}' is in explicit free providers list`,
      costPer1MInput: 0,
      costPer1MOutput: 0,
      hasFreeTier: true,
    };
    tierCache.set(key, assignment);
    return assignment;
  }

  const providerOverride = currentConfig.providerOverrides.find(
    (o) => o.provider.toLowerCase() === provider.toLowerCase()
  );
  if (providerOverride) {
    const pricing = getModelPricing(provider, model);
    const assignment: TierAssignment = {
      provider,
      model,
      tier: providerOverride.tier,
      reason: `Provider-level override: '${provider}' → ${providerOverride.tier}`,
      costPer1MInput: pricing.inputCostPer1M,
      costPer1MOutput: pricing.outputCostPer1M,
      hasFreeTier: pricing.isFree,
      freeQuotaLimit: pricing.freeQuotaLimit,
    };
    tierCache.set(key, assignment);
    return assignment;
  }

  const modelOverride = currentConfig.modelOverrides.find(
    (o) => o.provider.toLowerCase() === provider.toLowerCase() && matchGlob(o.modelPattern, model)
  );
  if (modelOverride) {
    const pricing = getModelPricing(provider, model);
    const assignment: TierAssignment = {
      provider,
      model,
      tier: modelOverride.tier,
      reason: `Model-level override: '${provider}/${model}' matches '${modelOverride.modelPattern}' → ${modelOverride.tier}`,
      costPer1MInput: pricing.inputCostPer1M,
      costPer1MOutput: pricing.outputCostPer1M,
      hasFreeTier: pricing.isFree,
      freeQuotaLimit: pricing.freeQuotaLimit,
    };
    tierCache.set(key, assignment);
    return assignment;
  }

  const pricing = getModelPricing(provider, model);
  let tier: ProviderTier;
  let reason: string;

  if (pricing.isFree || pricing.inputCostPer1M <= currentConfig.defaults.freeThreshold) {
    tier = PROVIDER_TIER.FREE;
    reason = `Cost-based: $${pricing.inputCostPer1M}/M input ≤ free threshold ($${currentConfig.defaults.freeThreshold}/M)`;
  } else if (pricing.inputCostPer1M <= currentConfig.defaults.cheapThreshold) {
    tier = PROVIDER_TIER.CHEAP;
    reason = `Cost-based: $${pricing.inputCostPer1M}/M input ≤ cheap threshold ($${currentConfig.defaults.cheapThreshold}/M)`;
  } else {
    tier = PROVIDER_TIER.PREMIUM;
    reason = `Cost-based: $${pricing.inputCostPer1M}/M input > cheap threshold ($${currentConfig.defaults.cheapThreshold}/M)`;
  }

  const assignment: TierAssignment = {
    provider,
    model,
    tier,
    reason,
    costPer1MInput: pricing.inputCostPer1M,
    costPer1MOutput: pricing.outputCostPer1M,
    hasFreeTier: pricing.isFree,
    freeQuotaLimit: pricing.freeQuotaLimit,
  };

  tierCache.set(key, assignment);
  return assignment;
}

export function setTierConfig(config?: Partial<TierConfig> | null): void {
  if (config === null || config === undefined) {
    try {
      const { loadTierConfig } = require("../../src/lib/db/tierConfig");
      currentConfig = loadTierConfig();
    } catch {
      currentConfig = DEFAULT_TIER_CONFIG;
    }
  } else {
    currentConfig = mergeTierConfig(config);
  }
  tierCache.clear();
}

export function getTierConfig(): TierConfig {
  return { ...currentConfig };
}

export function clearTierCache(): void {
  tierCache.clear();
}

export function classifyTiers(
  targets: Array<{ provider: string; model: string }>
): TierAssignment[] {
  return targets.map((t) => classifyTier(t.provider, t.model));
}

export function getTierStats(): Record<ProviderTier, number> {
  const stats: Record<ProviderTier, number> = { free: 0, cheap: 0, premium: 0 };
  for (const assignment of tierCache.values()) {
    stats[assignment.tier]++;
  }
  return stats;
}
