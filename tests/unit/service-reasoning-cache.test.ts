import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/reasoningCache.ts");

describe("reasoningCache helpers", () => {
  describe("isDeepSeekReasoningModel", () => {
    it("returns true for deepseek-v4 models with thinking enabled", () => {
      assert.equal(mod.isDeepSeekReasoningModel({ provider: "deepseek", model: "deepseek-v4-flash", thinkingEnabled: true }), true);
      assert.equal(mod.isDeepSeekReasoningModel({ provider: "deepseek", model: "deepseek/v4-pro", thinkingEnabled: true }), true);
    });

    it("returns false without thinkingEnabled", () => {
      assert.equal(mod.isDeepSeekReasoningModel({ provider: "deepseek", model: "deepseek-v4-flash" }), false);
      assert.equal(mod.isDeepSeekReasoningModel({ provider: "deepseek", model: "deepseek-v4-flash", thinkingEnabled: false }), false);
    });

    it("returns false for non-v4 models", () => {
      assert.equal(mod.isDeepSeekReasoningModel({ provider: "deepseek", model: "deepseek-chat", thinkingEnabled: true }), false);
    });
  });

  describe("requiresReasoningReplay", () => {
    it("returns true for reasoning_content interleaved field", () => {
      assert.equal(mod.requiresReasoningReplay({ provider: "any", model: "any", interleavedField: "reasoning_content" }), true);
    });

    it("returns false for reasoning_details interleaved field", () => {
      assert.equal(mod.requiresReasoningReplay({ provider: "any", model: "any", interleavedField: "reasoning_details" }), false);
    });

    it("returns false for deepseek-reasoner", () => {
      assert.equal(mod.requiresReasoningReplay({ provider: "deepseek", model: "deepseek-reasoner" }), false);
    });

    it("returns false for deepseek-r1", () => {
      assert.equal(mod.requiresReasoningReplay({ provider: "deepseek", model: "deepseek-r1" }), false);
    });

    it("returns true for DeepSeek V4 thinking models", () => {
      assert.equal(mod.requiresReasoningReplay({ provider: "deepseek", model: "deepseek-v4-flash", thinkingEnabled: true }), true);
    });

    it("returns true for known replay providers", () => {
      assert.equal(mod.requiresReasoningReplay({ provider: "deepseek", model: "some-model" }), true);
    });

    it("returns false when allowLegacyFallback is false and no explicit signal", () => {
      assert.equal(mod.requiresReasoningReplay({ provider: "unknown", model: "unknown", allowLegacyFallback: false }), false);
    });
  });

  describe("cache operations", () => {
    it("getReasoningCacheServiceStats returns expected shape", () => {
      const stats = mod.getReasoningCacheServiceStats();
      assert.equal(typeof stats.hits, "number");
      assert.equal(typeof stats.misses, "number");
      assert.equal(typeof stats.replays, "number");
      assert.equal(typeof stats.memoryEntries, "number");
    });

    it("clearReasoningCacheAll returns a number", () => {
      const cleared = mod.clearReasoningCacheAll();
      assert.equal(typeof cleared, "number");
    });

    it("lookupReasoning returns null for unknown key", () => {
      const result = mod.lookupReasoning("nonexistent-key-" + Date.now());
      assert.equal(result, null);
    });

    it("deleteReasoningCacheEntry returns 0 for unknown key", () => {
      const result = mod.deleteReasoningCacheEntry("nonexistent-" + Date.now());
      assert.equal(result, 0);
    });

    it("cleanupReasoningCache returns a number", () => {
      const cleaned = mod.cleanupReasoningCache();
      assert.equal(typeof cleaned, "number");
    });
  });
});
