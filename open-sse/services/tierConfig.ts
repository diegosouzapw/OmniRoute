/**
 * Tier configuration schema with Zod validation and sensible defaults.
 */

import { z } from "zod";
import type { TierConfig, ProviderTierOverride, ModelTierOverride } from "./tierTypes";
import { PROVIDER_TIER } from "./tierTypes";

export const providerTierOverrideSchema = z.object({
  provider: z.string().min(1),
  tier: z.enum(["free", "cheap", "premium"]),
});

export const modelTierOverrideSchema = z.object({
  provider: z.string().min(1),
  modelPattern: z.string().min(1),
  tier: z.enum(["free", "cheap", "premium"]),
});

export const tierConfigSchema = z.object({
  version: z.string().default("1.0.0"),
  defaults: z.object({
    freeThreshold: z.number().min(0).default(0),
    cheapThreshold: z.number().min(0).default(1.0),
  }),
  providerOverrides: z.array(providerTierOverrideSchema).default([]),
  modelOverrides: z.array(modelTierOverrideSchema).default([]),
  freeProviders: z.array(z.string()).default([]),
});

export const DEFAULT_TIER_CONFIG: TierConfig = {
  version: "1.0.0",
  defaults: {
    freeThreshold: 0,
    cheapThreshold: 1.0,
  },
  providerOverrides: [],
  modelOverrides: [],
  freeProviders: [
    "kiro",
    "qoder",
    "pollinations",
    "longcat",
    "cloudflare-ai",
    "qwen",
    "gemini-cli",
    "nvidia-nim",
    "cerebras",
    "groq",
  ],
};

export function validateTierConfig(raw: unknown): TierConfig {
  return tierConfigSchema.parse(raw);
}

export function mergeTierConfig(userConfig?: Partial<TierConfig>): TierConfig {
  if (!userConfig) return DEFAULT_TIER_CONFIG;
  return {
    ...DEFAULT_TIER_CONFIG,
    ...userConfig,
    defaults: {
      ...DEFAULT_TIER_CONFIG.defaults,
      ...userConfig.defaults,
    },
    providerOverrides: [
      ...DEFAULT_TIER_CONFIG.providerOverrides,
      ...(userConfig.providerOverrides || []),
    ],
    modelOverrides: [...DEFAULT_TIER_CONFIG.modelOverrides, ...(userConfig.modelOverrides || [])],
    freeProviders: [
      ...new Set([...DEFAULT_TIER_CONFIG.freeProviders, ...(userConfig.freeProviders || [])]),
    ],
  };
}
