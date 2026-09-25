import type { TierAssignment, TierConfig, ProviderTier } from "./tierTypes";
import { PROVIDER_TIER } from "./tierTypes";
import { getModelPricing } from "./providerCostData";
import { isExplicitlyFree } from "./providerCostData";
import { mergeTierConfig, DEFAULT_TIER_CONFIG } from "./tierConfig";
import { createRequire } from "node:module";
import { PROVIDER_ID_TO_ALIAS } from "../config/providerModels.ts";
import { getDefaultPricing } from "@/shared/constants/pricing";

const lazyRequire = createRequire(import.meta.url);

const tierCache = new Map<string, TierAssignment>();
let currentConfig: TierConfig = DEFAULT_TIER_CONFIG;

type DbPrice = { input: number; output: number };
const tierPricingSnapshot = new Map<string, DbPrice>();
let snapshotPinned = false;
let snapshotWarmed = false;

function snapshotKey(provider: string, model: string): string {
  return `${provider.toLowerCase()}::${model.toLowerCase()}`;
}

function refreshTierPricingSnapshot(): void {
  // An injected snapshot (see setTierPricingSnapshot) is authoritative
  // until released: never let a refresh clobber it.
  if (snapshotPinned) return;
  let getDbInstance: (() => unknown) | undefined;
  try {
    // Lazy require: mirrors setTierConfig below; no new static edge,
    // no src/lib/db <-> open-sse/services cycle (settings/pricing already
    // imports this module dynamically). The defaults layer comes from a
    // static import (same module the hardcoded table already depends on).
    // createRequire (not the bare require global) so this also resolves
    // under native ESM, where require is undefined.
    getDbInstance = lazyRequire("../../src/lib/db/core").getDbInstance;
  } catch {
    return; // fail-open: keep the previous snapshot
  }
  try {
    const db = (
      getDbInstance as () => {
        prepare(s: string): { all(...a: unknown[]): Array<{ key: string; value: string }> };
      }
    )();
    const merged: Record<string, Record<string, unknown>> = {
      ...(getDefaultPricing() as Record<string, Record<string, unknown>>),
    };
    // Layer order mirrors getPricingLayers: user rows win over synced layers.
    for (const ns of ["pricing_synced", "models_dev_pricing", "pricing"]) {
      for (const row of db
        .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
        .all(ns)) {
        try {
          const models = JSON.parse(row.value) as Record<string, unknown>;
          merged[row.key] = { ...(merged[row.key] || {}), ...models };
        } catch {
          // Corrupted row: skip, lower layers survive.
        }
      }
    }
    const next = new Map<string, DbPrice>();
    for (const [provider, models] of Object.entries(merged)) {
      for (const [model, raw] of Object.entries(models)) {
        const price = raw as { input?: unknown; output?: unknown };
        const input = Number(price?.input);
        const output = Number(price?.output);
        // Output defaults to input, mirroring classifyTierAsync below.
        if (Number.isFinite(input) && input >= 0) {
          next.set(snapshotKey(provider, model), {
            input,
            output: Number.isFinite(output) && (output as number) >= 0 ? (output as number) : input,
          });
        }
      }
    }
    tierPricingSnapshot.clear();
    for (const [k, v] of next) tierPricingSnapshot.set(k, v);
  } catch {
    // Fail-open: the previous snapshot stays authoritative.
  }
  snapshotWarmed = true;
}

function lookupSnapshot(provider: string, model: string): DbPrice | null {
  // Pure memory. Candidate-key order mirrors getPricingForModel
  // (src/lib/db/settings/pricing.ts): direct, alias, reverse alias,
  // "-cn" strip, hyphen/dot variant. No I/O on the routing hot path.
  const pLower = (provider || "").toLowerCase();
  const mLower = (model || "").toLowerCase();
  const modelKeys = [mLower];
  const hyphenModel = mLower.replace(/\./g, "-");
  if (hyphenModel !== mLower) modelKeys.push(hyphenModel);
  for (const p of providerKeysFor(pLower)) {
    for (const m of modelKeys) {
      const hit = tierPricingSnapshot.get(`${p}::${m}`);
      if (hit) return hit;
    }
  }
  return null;
}

function providerKeysFor(pLower: string): string[] {
  // Exact key First: snapshot keys are lowercased at write time, so the
  // common path is a pair of O(1) hits. Alias and variant keys follow the
  // same order as getPricingForModel (alias reads scan case-insensitively
  // like the async findKeyInsensitive).
  const keys = [pLower];
  for (const [aliasKey, aliasValue] of aliasEntries()) {
    if (
      aliasKey === pLower &&
      typeof aliasValue === "string" &&
      aliasValue.toLowerCase() !== pLower
    ) {
      keys.push(aliasValue.toLowerCase());
    }
  }
  for (const [id, mappedAlias] of aliasEntries()) {
    if (typeof mappedAlias === "string" && mappedAlias.toLowerCase() === pLower) {
      const idLower = id.toLowerCase();
      if (!keys.includes(idLower)) keys.push(idLower);
      break;
    }
  }
  const noCn = pLower.replace(/-cn$/, "");
  if (noCn && noCn !== pLower) keys.push(noCn);
  return keys;
}

let cachedAliasEntries: Array<[string, unknown]> | null = null;

function aliasEntries(): Array<[string, unknown]> {
  // Resolved once: the alias map builds lazily behind a Proxy, so enumerating
  // it on every cache miss would rebuild the key list each time.
  if (!cachedAliasEntries) {
    cachedAliasEntries = Object.entries(PROVIDER_ID_TO_ALIAS).map(([k, v]) => [k.toLowerCase(), v]);
  }
  return cachedAliasEntries;
}

/** Test-only injection: fills the pricing snapshot without a database. */
export function setTierPricingSnapshot(
  entries: Record<string, Record<string, DbPrice>> | null
): void {
  tierPricingSnapshot.clear();
  snapshotPinned = entries !== null;
  if (!entries) return;
  for (const [provider, models] of Object.entries(entries)) {
    for (const [model, price] of Object.entries(models)) {
      tierPricingSnapshot.set(snapshotKey(provider, model), price);
    }
  }
}

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

  // Below the overrides: the DB snapshot wins over the hardcoded table,
  // so a fresher stored price reclassifies without a restart. Warmed once
  // per process on First use, so a fresh boot serves stored prices without
  // waiting for the First pricing write.
  if (!snapshotWarmed && !snapshotPinned) refreshTierPricingSnapshot();
  const dbPrice = lookupSnapshot(provider, model);
  const fallbackPricing = getModelPricing(provider, model);
  const pricing = dbPrice
    ? {
        inputCostPer1M: dbPrice.input,
        outputCostPer1M: dbPrice.output,
        isFree: dbPrice.input === 0,
        freeQuotaLimit: fallbackPricing.freeQuotaLimit,
      }
    : fallbackPricing;
  let tier: ProviderTier;
  let reason: string;

  if (pricing.isFree || pricing.inputCostPer1M <= currentConfig.defaults.freeThreshold) {
    tier = PROVIDER_TIER.FREE;
    reason = dbPrice
      ? `DB cost-based: $${pricing.inputCostPer1M}/M input`
      : `Cost-based: $${pricing.inputCostPer1M}/M input ≤ free threshold ($${currentConfig.defaults.freeThreshold}/M)`;
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
  // setTierConfig below clears the assignment cache on config edits without
  // touching pricing: only this entry point refreshes the pricing snapshot.
  refreshTierPricingSnapshot();
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

export let tierAsyncFallbackTotal = 0; // exported for testability

export async function classifyTierAsync(provider: string, model: string): Promise<TierAssignment> {
  // Explicit routing policy takes precedence over price-derived classification,
  // just as it does in classifyTier. Do not let a DB/catalog lookup overwrite
  // that policy in the shared cache and change a later synchronous estimate.
  if (
    isExplicitlyFree(provider, currentConfig) ||
    currentConfig.providerOverrides.some(
      (override) => override.provider.toLowerCase() === provider.toLowerCase()
    ) ||
    currentConfig.modelOverrides.some(
      (override) =>
        override.provider.toLowerCase() === provider.toLowerCase() &&
        matchGlob(override.modelPattern, model)
    )
  ) {
    return classifyTier(provider, model);
  }
  try {
    const { getPricingForModel } = await import("@/lib/db/settings");
    const db = await getPricingForModel(provider, model);
    const input = Number((db as { input?: unknown } | null)?.input);
    const output = Number((db as { output?: unknown } | null)?.output);
    if (Number.isFinite(input) && input >= 0) {
      const out = Number.isFinite(output) && output >= 0 ? output : input;
      // Same thresholds as the sync path below; a DB $0 lands FREE by threshold
      // (the DB carries no isFree flag of its own).
      let tier: ProviderTier;
      if (input <= currentConfig.defaults.freeThreshold) tier = PROVIDER_TIER.FREE;
      else if (input <= currentConfig.defaults.cheapThreshold) tier = PROVIDER_TIER.CHEAP;
      else tier = PROVIDER_TIER.PREMIUM;
      const sync = getModelPricing(provider, model); // keeps freeQuotaLimit when DB is mute
      const assignment: TierAssignment = {
        provider,
        model,
        tier,
        reason: `DB cost-based: $${input}/M input`,
        costPer1MInput: input,
        costPer1MOutput: out,
        hasFreeTier: input === 0,
        freeQuotaLimit: sync.freeQuotaLimit,
      };
      tierCache.set(cacheKey(provider, model), assignment);
      return assignment;
    }
  } catch {
    // fall through to sync
  }
  tierAsyncFallbackTotal++;
  return classifyTier(provider, model);
}
