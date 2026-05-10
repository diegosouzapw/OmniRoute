export const PROVIDER_TIER = {
  FREE: "free",
  CHEAP: "cheap",
  PREMIUM: "premium",
} as const;

export type ProviderTier = (typeof PROVIDER_TIER)[keyof typeof PROVIDER_TIER];

export interface TierAssignment {
  provider: string;
  model: string;
  tier: ProviderTier;
  reason: string;
  costPer1MInput: number;
  costPer1MOutput: number;
  hasFreeTier: boolean;
  freeQuotaLimit?: number;
}

export interface TierConfig {
  version: string;
  defaults: {
    freeThreshold: number;
    cheapThreshold: number;
  };
  providerOverrides: ProviderTierOverride[];
  modelOverrides: ModelTierOverride[];
  freeProviders: string[];
}

export interface ProviderTierOverride {
  provider: string;
  tier: ProviderTier;
}

export interface ModelTierOverride {
  provider: string;
  modelPattern: string;
  tier: ProviderTier;
}
