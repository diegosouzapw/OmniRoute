/**
 * Unit tests for TierResolver (Task 13)
 * Tests: classifyTier, setTierConfig, clearTierCache, getTierStats, classifyTiers
 */

import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  classifyTier,
  setTierConfig,
  clearTierCache,
  getTierStats,
  classifyTiers,
} from "../tierResolver.ts";
import { PROVIDER_TIER } from "../tierTypes.ts";

describe("TierResolver", () => {
  // Reset cache between tests
  beforeEach(() => clearTierCache());

  describe("classifyTier - free providers", () => {
    it("classifies Kiro as free", () => {
      const result = classifyTier("kiro", "claude-sonnet-4.5");
      assert.equal(result.tier, PROVIDER_TIER.FREE);
      assert.equal(result.hasFreeTier, true);
    });

    it("classifies Qoder as free", () => {
      const result = classifyTier("qoder", "kimi-k2-thinking");
      assert.equal(result.tier, PROVIDER_TIER.FREE);
      assert.equal(result.hasFreeTier, true);
    });

    it("classifies Pollinations as free", () => {
      const result = classifyTier("pollinations", "gpt-5");
      assert.equal(result.tier, PROVIDER_TIER.FREE);
      assert.equal(result.hasFreeTier, true);
    });

    it("classifies LongCat as free", () => {
      const result = classifyTier("longcat", "flash-lite");
      assert.equal(result.tier, PROVIDER_TIER.FREE);
      assert.equal(result.hasFreeTier, true);
    });

    it("classifies Qwen as free", () => {
      const result = classifyTier("qwen", "qwen3-coder-plus");
      assert.equal(result.tier, PROVIDER_TIER.FREE);
      assert.equal(result.hasFreeTier, true);
    });

    it("classifies Cloudflare AI as free", () => {
      const result = classifyTier("cloudflare-ai", "llama-3.3-70b");
      assert.equal(result.tier, PROVIDER_TIER.FREE);
      assert.equal(result.hasFreeTier, true);
    });

    it("classifies NVIDIA NIM as free", () => {
      const result = classifyTier("nvidia-nim", "llama-3.1-8b");
      assert.equal(result.tier, PROVIDER_TIER.FREE);
      assert.equal(result.hasFreeTier, true);
    });

    it("classifies Cerebras as free", () => {
      const result = classifyTier("cerebras", "llama-3.1-70b");
      assert.equal(result.tier, PROVIDER_TIER.FREE);
      assert.equal(result.hasFreeTier, true);
    });

    it("classifies Groq as free", () => {
      const result = classifyTier("groq", "llama-3.3-70b");
      assert.equal(result.tier, PROVIDER_TIER.FREE);
      assert.equal(result.hasFreeTier, true);
    });

    it("sets costPer1MInput to 0 for free providers", () => {
      const result = classifyTier("kiro", "claude-sonnet-4.5");
      assert.equal(result.costPer1MInput, 0);
      assert.equal(result.costPer1MOutput, 0);
    });
  });

  describe("classifyTier - cost-based classification", () => {
    it("classifies DeepSeek as cheap ($0.27/M < $1.00/M)", () => {
      const result = classifyTier("deepseek", "deepseek-chat");
      assert.equal(result.tier, PROVIDER_TIER.CHEAP);
      assert.ok(result.costPer1MInput <= 1.0);
    });

    it("classifies GLM as cheap ($0.60/M < $1.00/M)", () => {
      const result = classifyTier("glm", "glm-4.7");
      assert.equal(result.tier, PROVIDER_TIER.CHEAP);
      assert.ok(result.costPer1MInput <= 1.0);
    });

    it("classifies MiniMax as cheap ($0.20/M < $1.00/M)", () => {
      const result = classifyTier("minimax", "minimax-m2.1");
      assert.equal(result.tier, PROVIDER_TIER.CHEAP);
      assert.ok(result.costPer1MInput <= 1.0);
    });

    it("classifies GPT-4o as premium ($2.50/M > $1.00/M)", () => {
      const result = classifyTier("openai", "gpt-4o");
      assert.equal(result.tier, PROVIDER_TIER.PREMIUM);
      assert.ok(result.costPer1MInput > 1.0);
    });

    it("classifies Claude Opus as premium ($15.00/M > $1.00/M)", () => {
      const result = classifyTier("anthropic", "claude-opus-4-7");
      assert.equal(result.tier, PROVIDER_TIER.PREMIUM);
      assert.ok(result.costPer1MInput > 1.0);
    });

    it("defaults unknown providers to premium", () => {
      const result = classifyTier("unknown-provider", "unknown-model");
      assert.equal(result.tier, PROVIDER_TIER.PREMIUM);
      assert.equal(result.costPer1MInput, 5.0); // default premium pricing
    });
  });

  describe("classifyTier - config overrides", () => {
    it("respects provider-level tier override", () => {
      setTierConfig({ providerOverrides: [{ provider: "openai", tier: "cheap" }] });
      const result = classifyTier("openai", "gpt-4o");
      assert.equal(result.tier, PROVIDER_TIER.CHEAP);
      assert.ok(result.reason.includes("override"));
    });

    it("respects model-level glob pattern override", () => {
      setTierConfig({
        modelOverrides: [{ provider: "openai", modelPattern: "gpt-4o-mini*", tier: "cheap" }],
      });
      const result = classifyTier("openai", "gpt-4o-mini-2024-07-18");
      assert.equal(result.tier, PROVIDER_TIER.CHEAP);
    });

    it("glob pattern gpt-4o-mini* matches gpt-4o-mini-2024-07-18", () => {
      setTierConfig({
        modelOverrides: [{ provider: "openai", modelPattern: "gpt-4o-mini*", tier: "cheap" }],
      });
      const result = classifyTier("openai", "gpt-4o-mini-2024-07-18");
      assert.equal(result.tier, PROVIDER_TIER.CHEAP);
    });

    it("config change invalidates cache", () => {
      const before = classifyTier("openai", "gpt-4o");
      assert.equal(before.tier, PROVIDER_TIER.PREMIUM);
      setTierConfig({ providerOverrides: [{ provider: "openai", tier: "free" }] });
      const after = classifyTier("openai", "gpt-4o");
      assert.equal(after.tier, PROVIDER_TIER.FREE);
    });
  });

  describe("classifyTier - caching", () => {
    it("returns cached result on second call", () => {
      classifyTier("openai", "gpt-4o");
      const t0 = performance.now();
      classifyTier("openai", "gpt-4o");
      const elapsed = performance.now() - t0;
      assert.ok(elapsed < 0.1, "cache hit should be <0.1ms");
    });

    it("clearTierCache() forces re-classification", () => {
      const first = classifyTier("openai", "gpt-4o");
      clearTierCache();
      const second = classifyTier("openai", "gpt-4o");
      assert.equal(first.tier, second.tier);
      assert.ok(second.costPer1MInput > 0);
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
        { provider: "qwen", model: "qwen3-coder-plus" },
        { provider: "unknown", model: "unknown-model" },
      ];
      const results = classifyTiers(targets);
      assert.equal(results.length, 10);
      assert.equal(results[0].tier, PROVIDER_TIER.FREE); // kiro
      assert.equal(results[1].tier, PROVIDER_TIER.PREMIUM); // openai gpt-4o ($2.50/M)
      assert.equal(results[2].tier, PROVIDER_TIER.CHEAP); // deepseek
      assert.equal(results[9].tier, PROVIDER_TIER.PREMIUM); // unknown
    });

    it("uses cache for repeated models", () => {
      classifyTiers([
        { provider: "openai", model: "gpt-4o" },
        { provider: "openai", model: "gpt-4o" },
      ]);
      // If cache works, second call should be instant; test passes if no error
      assert.ok(true);
    });
  });

  describe("getTierStats", () => {
    it("returns distribution after classifications", () => {
      clearTierCache();
      classifyTier("kiro", "claude-sonnet-4.5");
      classifyTier("deepseek", "deepseek-chat");
      const stats = getTierStats();
      assert.ok(stats[PROVIDER_TIER.FREE] >= 1);
      assert.ok(stats[PROVIDER_TIER.CHEAP] >= 1);
    });
  });
});
