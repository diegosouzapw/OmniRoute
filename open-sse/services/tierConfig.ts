/**
 * Tier configuration schema with Zod validation and sensible defaults.
 *
 * `freeProviders` is the union of two sources:
 *   1. Legacy explicit list (`LEGACY_FREE_PROVIDERS`) — keeps historical behavior
 *      for providers that aren't noAuth (e.g., groq, cerebras) so the old test
 *      suite and existing DB overrides keep working.
 *   2. Auto-derived from `NOAUTH_PROVIDERS` where `noAuth === true` AND
 *      `serviceKinds` is empty or includes "llm" (excludes free audio/video
 *      gateways like veo-free that would never feed the chat tier resolver).
 *      See `deriveNoAuthFreeProviders()`.
 *
 * The two are merged into `DEFAULT_TIER_CONFIG.freeProviders` at module load.
 */

import { z } from "zod";
import type { TierConfig, ProviderTierOverride, ModelTierOverride } from "./tierTypes";
import { PROVIDER_TIER } from "./tierTypes";
import { NOAUTH_PROVIDERS } from "@/shared/constants/providers";

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

/**
 * Legacy explicit free providers — kept for back-compat with existing DB rows
 * and test fixtures. New free providers should be added by registering them
 * in `NOAUTH_PROVIDERS` with `noAuth: true` instead of editing this list.
 */
export const LEGACY_FREE_PROVIDERS: readonly string[] = [
  "kiro",
  "qoder",
  "pollinations",
  "longcat",
  "cloudflare-ai",
  "nvidia-nim",
  "cerebras",
  "groq",
];

/**
 * Derive free provider IDs from `NOAUTH_PROVIDERS`. Only chat-tier noAuth
 * providers count (serviceKinds === undefined || includes "llm"), so the
 * free video / audio / image noAuth entries (e.g. veo-free, muse-spark) don't
 * accidentally mark themselves as chat-free.
 *
 * Wrapped in try/catch to tolerate the import failing in non-Node runtimes
 * (vitest worker setup, MCP server entry) — the legacy list still applies.
 */
export function deriveNoAuthFreeProviders(): string[] {
  try {
    const ids: string[] = [];
    for (const def of Object.values(NOAUTH_PROVIDERS)) {
      if (!def || typeof def !== "object") continue;
      if (def.noAuth !== true) continue;
      const kinds = (def as { serviceKinds?: unknown }).serviceKinds;
      const isLlm =
        !Array.isArray(kinds) || kinds.length === 0 || (kinds as unknown[]).includes("llm");
      if (!isLlm) continue;
      if (typeof def.id === "string" && def.id.length > 0) {
        ids.push(def.id);
      }
    }
    return ids;
  } catch {
    return [];
  }
}

const NOAUTH_FREE_PROVIDERS = deriveNoAuthFreeProviders();

export const DEFAULT_TIER_CONFIG: TierConfig = {
  version: "1.0.0",
  defaults: {
    freeThreshold: 0,
    cheapThreshold: 1.0,
  },
  providerOverrides: [],
  modelOverrides: [],
  freeProviders: [...new Set([...LEGACY_FREE_PROVIDERS, ...NOAUTH_FREE_PROVIDERS])],
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
