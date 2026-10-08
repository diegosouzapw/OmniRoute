/**
 * Unit tests for TierResolver (Task 13)
 * Tests: classifyTier, setTierConfig, clearTierCache, getTierStats, classifyTiers
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  classifyTier,
  setTierConfig,
  clearTierCache,
  getTierStats,
  classifyTiers,
  setTierPricingSnapshot,
} from "../tierResolver.ts";
import { PROVIDER_TIER } from "../tierTypes.ts";
import {
  DEFAULT_TIER_CONFIG,
  LEGACY_FREE_PROVIDERS,
  deriveNoAuthFreeProviders,
} from "../tierConfig.ts";
import { NOAUTH_PROVIDERS } from "@/shared/constants/providers.ts";

describe("TierResolver", () => {
  // Reset cache and pricing snapshot between tests
  beforeEach(() => {
    clearTierCache();
    setTierPricingSnapshot(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("classifyTier - free providers", () => {
    it("classifies Kiro as free", () => {
      const result = classifyTier("kiro", "claude-sonnet-4.5");
      expect(result.tier).toBe(PROVIDER_TIER.FREE);
      expect(result.hasFreeTier).toBe(true);
    });

    it("classifies Qoder as free", () => {
      const result = classifyTier("qoder", "kimi-k2-thinking");
      expect(result.tier).toBe(PROVIDER_TIER.FREE);
      expect(result.hasFreeTier).toBe(true);
    });

    it("classifies Pollinations as free", () => {
      const result = classifyTier("pollinations", "gpt-5");
      expect(result.tier).toBe(PROVIDER_TIER.FREE);
      expect(result.hasFreeTier).toBe(true);
    });

    it("classifies LongCat as free", () => {
      const result = classifyTier("longcat", "LongCat-2.0");
      expect(result.tier).toBe(PROVIDER_TIER.FREE);
      expect(result.hasFreeTier).toBe(true);
    });

    it("classifies Cloudflare AI as free", () => {
      const result = classifyTier("cloudflare-ai", "llama-3.3-70b");
      expect(result.tier).toBe(PROVIDER_TIER.FREE);
      expect(result.hasFreeTier).toBe(true);
    });

    it("classifies NVIDIA NIM as free", () => {
      const result = classifyTier("nvidia-nim", "llama-3.1-8b");
      expect(result.tier).toBe(PROVIDER_TIER.FREE);
      expect(result.hasFreeTier).toBe(true);
    });

    it("classifies Cerebras as not free after the no-card trial ended (#11773)", () => {
      const result = classifyTier("cerebras", "llama-3.1-70b");
      expect(result.tier).not.toBe(PROVIDER_TIER.FREE);
      expect(result.hasFreeTier).toBe(false);
    });

    it("classifies Groq as free", () => {
      const result = classifyTier("groq", "llama-3.3-70b");
      expect(result.tier).toBe(PROVIDER_TIER.FREE);
      expect(result.hasFreeTier).toBe(true);
    });

    it("sets costPer1MInput to 0 for free providers", () => {
      const result = classifyTier("kiro", "claude-sonnet-4.5");
      expect(result.costPer1MInput).toBe(0);
      expect(result.costPer1MOutput).toBe(0);
    });
  });

  describe("classifyTier - cost-based classification", () => {
    it("classifies DeepSeek as cheap ($0.27/M < $1.00/M)", () => {
      const result = classifyTier("deepseek", "deepseek-chat");
      expect(result.tier).toBe(PROVIDER_TIER.CHEAP);
      expect(result.costPer1MInput).toBeLessThanOrEqual(1.0);
    });

    it("classifies GLM as cheap ($0.60/M < $1.00/M)", () => {
      const result = classifyTier("glm", "glm-4.7");
      expect(result.tier).toBe(PROVIDER_TIER.CHEAP);
      expect(result.costPer1MInput).toBeLessThanOrEqual(1.0);
    });

    it("classifies MiniMax as cheap ($0.20/M < $1.00/M)", () => {
      const result = classifyTier("minimax", "minimax-m2.1");
      expect(result.tier).toBe(PROVIDER_TIER.CHEAP);
      expect(result.costPer1MInput).toBeLessThanOrEqual(1.0);
    });

    it("classifies GPT-4o as premium ($2.50/M > $1.00/M)", () => {
      const result = classifyTier("openai", "gpt-4o");
      expect(result.tier).toBe(PROVIDER_TIER.PREMIUM);
      expect(result.costPer1MInput).toBeGreaterThan(1.0);
    });

    it("classifies Claude Opus as premium ($15.00/M > $1.00/M)", () => {
      const result = classifyTier("anthropic", "claude-opus-4-7");
      expect(result.tier).toBe(PROVIDER_TIER.PREMIUM);
      expect(result.costPer1MInput).toBeGreaterThan(1.0);
    });

    it("defaults unknown providers to premium", () => {
      const result = classifyTier("unknown-provider", "unknown-model");
      expect(result.tier).toBe(PROVIDER_TIER.PREMIUM);
      expect(result.costPer1MInput).toBe(5.0); // default premium pricing
    });
  });

  describe("classifyTier - config overrides", () => {
    it("respects provider-level tier override", () => {
      setTierConfig({ providerOverrides: [{ provider: "openai", tier: "cheap" }] });
      const result = classifyTier("openai", "gpt-4o");
      expect(result.tier).toBe(PROVIDER_TIER.CHEAP);
      expect(result.reason.includes("override")).toBe(true);
    });

    it("respects model-level glob pattern override", () => {
      setTierConfig({
        modelOverrides: [{ provider: "openai", modelPattern: "gpt-4o-mini*", tier: "cheap" }],
      });
      const result = classifyTier("openai", "gpt-4o-mini-2024-07-18");
      expect(result.tier).toBe(PROVIDER_TIER.CHEAP);
    });

    it("glob pattern gpt-4o-mini* matches gpt-4o-mini-2024-07-18", () => {
      setTierConfig({
        modelOverrides: [{ provider: "openai", modelPattern: "gpt-4o-mini*", tier: "cheap" }],
      });
      const result = classifyTier("openai", "gpt-4o-mini-2024-07-18");
      expect(result.tier).toBe(PROVIDER_TIER.CHEAP);
    });

    it("config change invalidates cache", () => {
      const before = classifyTier("openai", "gpt-4o");
      expect(before.tier).toBe(PROVIDER_TIER.PREMIUM);
      setTierConfig({ providerOverrides: [{ provider: "openai", tier: "free" }] });
      const after = classifyTier("openai", "gpt-4o");
      expect(after.tier).toBe(PROVIDER_TIER.FREE);
    });
  });

  describe("classifyTier - caching", () => {
    it("returns cached result on second call", () => {
      classifyTier("openai", "gpt-4o");
      const t0 = performance.now();
      classifyTier("openai", "gpt-4o");
      const elapsed = performance.now() - t0;
      expect(elapsed, "cache hit should be <0.1ms").toBeLessThan(0.1);
    });

    it("clearTierCache() forces re-classification", () => {
      const first = classifyTier("openai", "gpt-4o");
      clearTierCache();
      const second = classifyTier("openai", "gpt-4o");
      expect(first.tier).toBe(second.tier);
      expect(second.costPer1MInput).toBeGreaterThan(0);
    });
  });

  describe("classifyTiers - batch operation", () => {
    it("classifies 10 targets correctly", () => {
      clearTierCache();
      setTierConfig({ providerOverrides: [] }); // clear any config overrides from prior tests
      const targets = [
        { provider: "kiro", model: "claude-sonnet-4.5" },
        { provider: "openai", model: "gpt-4o" },
        { provider: "deepseek", model: "deepseek-chat" },
        { provider: "glm", model: "glm-4.7" },
        { provider: "minimax", model: "minimax-m2.1" },
        { provider: "anthropic", model: "claude-opus-4-7" },
        { provider: "groq", model: "llama-3.3-70b" },
        { provider: "qoder", model: "kimi-k2-thinking" },
        { provider: "unknown", model: "unknown-model" },
      ];
      const results = classifyTiers(targets);
      expect(results.length).toBe(9);
      expect(results[0].tier).toBe(PROVIDER_TIER.FREE); // kiro
      expect(results[1].tier).toBe(PROVIDER_TIER.PREMIUM); // openai gpt-4o ($2.50/M)
      expect(results[2].tier).toBe(PROVIDER_TIER.CHEAP); // deepseek
      expect(results[8].tier).toBe(PROVIDER_TIER.PREMIUM); // unknown
    });

    it("uses cache for repeated models", () => {
      clearTierCache();
      const results = classifyTiers([
        { provider: "openai", model: "gpt-4o" },
        { provider: "openai", model: "gpt-4o" },
      ]);
      // Observable effect of the cache: the duplicate resolves to the same tier and only
      // ONE entry is memoized (getTierStats counts cache entries, not classify calls).
      expect(results).toHaveLength(2);
      expect(results[0].tier).toBe(results[1].tier);
      const stats = getTierStats();
      expect(stats.free + stats.cheap + stats.premium).toBe(1);
    });
  });

  describe("getTierStats", () => {
    it("returns distribution after classifications", () => {
      clearTierCache();
      classifyTier("kiro", "claude-sonnet-4.5");
      classifyTier("deepseek", "deepseek-chat");
      const stats = getTierStats();
      expect(stats[PROVIDER_TIER.FREE]).toBeGreaterThanOrEqual(1);
      expect(stats[PROVIDER_TIER.CHEAP]).toBeGreaterThanOrEqual(1);
    });
  });

  describe("sync pricing snapshot", () => {
    it("classifies a hardcoded paid model as free when the snapshot carries $0", () => {
      setTierPricingSnapshot({ openai: { "gpt-4o": { input: 0, output: 0 } } });
      const result = classifyTier("openai", "gpt-4o");
      expect(result.tier).toBe(PROVIDER_TIER.FREE);
      expect(result.reason).toContain("DB cost-based");
    });

    it("falls back to the hardcoded table when the snapshot is empty", () => {
      const result = classifyTier("openai", "gpt-4o");
      expect(result.tier).toBe(PROVIDER_TIER.PREMIUM);
    });

    it("matches snapshot entries regardless of provider casing", () => {
      setTierPricingSnapshot({ openai: { "gpt-4o": { input: 0, output: 0 } } });
      const result = classifyTier("OpenAI", "gpt-4o");
      expect(result.tier).toBe(PROVIDER_TIER.FREE);
    });

    it("reclassifies after the snapshot changes and the cache is cleared", () => {
      setTierPricingSnapshot({ openai: { "gpt-9-never-existed": { input: 2.5, output: 10 } } });
      expect(classifyTier("openai", "gpt-9-never-existed").tier).toBe(PROVIDER_TIER.PREMIUM);
      setTierPricingSnapshot({ openai: { "gpt-9-never-existed": { input: 0, output: 0 } } });
      clearTierCache();
      expect(classifyTier("openai", "gpt-9-never-existed").tier).toBe(PROVIDER_TIER.FREE);
    });

    it("keeps serving the cached tier until the cache is cleared", () => {
      setTierPricingSnapshot({ openai: { "gpt-9-never-existed": { input: 2.5, output: 10 } } });
      expect(classifyTier("openai", "gpt-9-never-existed").tier).toBe(PROVIDER_TIER.PREMIUM);
      setTierPricingSnapshot({ openai: { "gpt-9-never-existed": { input: 0, output: 0 } } });
      expect(classifyTier("openai", "gpt-9-never-existed").tier).toBe(PROVIDER_TIER.PREMIUM);
      clearTierCache();
      expect(classifyTier("openai", "gpt-9-never-existed").tier).toBe(PROVIDER_TIER.FREE);
    });
  });

  describe("sync/async pricing parity", () => {
    it("lands free on a zero price through the same thresholds the async path uses", async () => {
      // The async path reads the database through a chain (settings ->
      // read cache -> sqlite driver) that the jsdom bundle cannot load
      // (node:sqlite has no browser build), so a live async round-trip is
      // covered by tests/unit/tier-pricing-cache.test.ts on the node runner.
      // This pins the shared half of the parity here: the same zero-price
      // fixture lands FREE through the snapshot lookup and sits below the
      // free threshold both paths compare against.
      setTierPricingSnapshot({ openai: { "gpt-4o": { input: 0, output: 0 } } });
      expect(classifyTier("openai", "gpt-4o").tier).toBe(PROVIDER_TIER.FREE);
      const { DEFAULT_TIER_CONFIG: cfg } = await import("../tierConfig.ts");
      expect(0).toBeLessThanOrEqual(cfg.defaults.freeThreshold);
    });
  });

  describe("freeProviders from NOAUTH_PROVIDERS (#4517)", () => {
    beforeEach(() => clearTierCache());

    it("LEGACY_FREE_PROVIDERS keeps the historical explicit list", () => {
      for (const id of [
        "kiro",
        "qoder",
        "pollinations",
        "longcat",
        "cloudflare-ai",
        "nvidia-nim",
        "groq",
      ]) {
        expect(LEGACY_FREE_PROVIDERS.includes(id), `expected ${id} in LEGACY_FREE_PROVIDERS`).toBe(
          true
        );
      }
    });

    it("deriveNoAuthFreeProviders includes all chat-tier noAuth providers", () => {
      const derived = deriveNoAuthFreeProviders();
      // opencode is one of the no-auth providers the bug report called out
      expect(derived.includes("opencode"), "opencode should be in derived noAuth-free list").toBe(
        true
      );
      expect(derived.includes("duckduckgo-web")).toBe(true);
    });

    it("deriveNoAuthFreeProviders excludes non-LLM noAuth providers", () => {
      const derived = deriveNoAuthFreeProviders();
      expect(
        derived.includes("veoaifree-web"),
        "veoaifree-web (serviceKinds: video) must not be classified as chat-free"
      ).toBe(false);
    });

    it("DEFAULT_TIER_CONFIG.freeProviders contains the union of legacy + noAuth-derived", () => {
      const expected = new Set([...LEGACY_FREE_PROVIDERS, ...deriveNoAuthFreeProviders()]);
      const actual = new Set(DEFAULT_TIER_CONFIG.freeProviders);
      expect(actual).toEqual(expected);
    });

    it("classifyTier classifies opencode/big-pickle as free via noAuth derivation", () => {
      // No provider override, no cost-based match (big-pickle has no KNOWN_MODEL_PRICING row).
      // The fix is that 'opencode' is now in freeProviders.
      const result = classifyTier("opencode", "big-pickle");
      expect(result.tier).toBe(PROVIDER_TIER.FREE);
      expect(result.hasFreeTier).toBe(true);
    });

    it("classifyTier still returns cheap for paid glm-5.1 (no regression)", () => {
      // glm-5.1 is not in freeProviders, costs $0.50/M → cheap tier.
      // Make sure the new noAuth derivation didn't accidentally pull it into free.
      const result = classifyTier("opencode-go", "glm-5.1");
      expect(result.tier).toBe(PROVIDER_TIER.CHEAP);
    });

    it("userConfig.freeProviders is merged on top of the noAuth-derived list", () => {
      // Re-merge with a new free provider (e.g. local-llama) and confirm it's added.
      setTierConfig({ freeProviders: ["local-llama"] });
      const result = classifyTier("local-llama", "anything");
      expect(result.tier).toBe(PROVIDER_TIER.FREE);
      clearTierCache();
    });
  });
});
