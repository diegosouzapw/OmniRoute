import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/thinkingBudget.ts");

describe("thinkingBudget", () => {
  afterEach(() => {
    mod.setThinkingBudgetConfig(mod.DEFAULT_THINKING_CONFIG);
  });

  describe("constants", () => {
    it("ThinkingMode has expected values", () => {
      assert.equal(mod.ThinkingMode.AUTO, "auto");
      assert.equal(mod.ThinkingMode.PASSTHROUGH, "passthrough");
      assert.equal(mod.ThinkingMode.CUSTOM, "custom");
      assert.equal(mod.ThinkingMode.ADAPTIVE, "adaptive");
    });

    it("EFFORT_BUDGETS has expected keys", () => {
      assert.equal(mod.EFFORT_BUDGETS.none, 0);
      assert.equal(mod.EFFORT_BUDGETS.low, 1024);
      assert.equal(mod.EFFORT_BUDGETS.medium, 10240);
      assert.equal(mod.EFFORT_BUDGETS.high, 131072);
    });

    it("THINKING_LEVEL_MAP has expected keys", () => {
      assert.equal(mod.THINKING_LEVEL_MAP.none, 0);
      assert.equal(mod.THINKING_LEVEL_MAP.low, 4096);
      assert.equal(mod.THINKING_LEVEL_MAP.medium, 8192);
      assert.equal(mod.THINKING_LEVEL_MAP.high, 24576);
      assert.equal(mod.THINKING_LEVEL_MAP.max, 131072);
    });

    it("DEFAULT_THINKING_CONFIG has expected shape", () => {
      assert.equal(mod.DEFAULT_THINKING_CONFIG.mode, "passthrough");
      assert.equal(mod.DEFAULT_THINKING_CONFIG.customBudget, 10240);
      assert.equal(mod.DEFAULT_THINKING_CONFIG.effortLevel, "medium");
    });
  });

  describe("setThinkingBudgetConfig / getThinkingBudgetConfig", () => {
    it("sets and gets config", () => {
      mod.setThinkingBudgetConfig({ mode: mod.ThinkingMode.CUSTOM, customBudget: 5000 });
      const config = mod.getThinkingBudgetConfig();
      assert.equal(config.mode, "custom");
      assert.equal(config.customBudget, 5000);
    });

    it("merges with defaults", () => {
      mod.setThinkingBudgetConfig({ mode: mod.ThinkingMode.AUTO });
      const config = mod.getThinkingBudgetConfig();
      assert.equal(config.mode, "auto");
      assert.equal(config.customBudget, 10240); // default
    });

    it("getThinkingBudgetConfig returns copy", () => {
      const c1 = mod.getThinkingBudgetConfig();
      const c2 = mod.getThinkingBudgetConfig();
      assert.deepEqual(c1, c2);
      assert.notEqual(c1, c2);
    });
  });

  describe("normalizeThinkingLevel", () => {
    it("returns body unchanged for null", () => {
      assert.equal(mod.normalizeThinkingLevel(null), null);
    });

    it("converts string thinkingLevel to numeric budget", () => {
      const body = { thinkingLevel: "high", model: "test-model" };
      const result = mod.normalizeThinkingLevel(body);
      assert.ok(result.thinking !== undefined);
      assert.equal(result.thinking.type, "enabled");
      assert.ok(result.thinking.budget_tokens > 0);
      assert.equal(result.thinkingLevel, undefined);
    });

    it("handles thinking_level snake_case", () => {
      const body = { thinking_level: "medium", model: "test" };
      const result = mod.normalizeThinkingLevel(body);
      assert.ok(result.thinking !== undefined);
      assert.equal(result.thinking_level, undefined);
    });

    it("handles none level", () => {
      const body = { thinkingLevel: "none", model: "test" };
      const result = mod.normalizeThinkingLevel(body);
      assert.equal(result.thinking.type, "disabled");
      assert.equal(result.thinking.budget_tokens, 0);
    });

    it("ignores unknown level strings", () => {
      const body = { thinkingLevel: "super-ultra", model: "test" };
      const result = mod.normalizeThinkingLevel(body);
      assert.equal(result.thinking, undefined);
    });
  });

  describe("ensureThinkingConfig", () => {
    it("returns body unchanged for null", () => {
      assert.equal(mod.ensureThinkingConfig(null), null);
    });

    it("injects thinking for -thinking suffix models", () => {
      const body = { model: "claude-3-opus-thinking", messages: [] };
      const result = mod.ensureThinkingConfig(body);
      assert.ok(result.thinking !== undefined);
      assert.equal(result.thinking.type, "enabled");
      assert.ok(result.thinking.budget_tokens > 0);
    });

    it("does not override existing thinking config", () => {
      const body = { model: "claude-3-opus-thinking", thinking: { type: "enabled", budget_tokens: 999 } };
      const result = mod.ensureThinkingConfig(body);
      assert.equal(result.thinking.budget_tokens, 999);
    });

    it("ignores models without -thinking suffix", () => {
      const body = { model: "gpt-4" };
      const result = mod.ensureThinkingConfig(body);
      assert.equal(result.thinking, undefined);
    });
  });

  describe("applyThinkingBudget", () => {
    it("returns body for null input", () => {
      assert.equal(mod.applyThinkingBudget(null), null);
    });

    it("applies passthrough mode (no changes)", () => {
      mod.setThinkingBudgetConfig({ mode: mod.ThinkingMode.PASSTHROUGH });
      const body = { model: "test", messages: [] };
      const result = mod.applyThinkingBudget(body);
      assert.ok(result);
    });
  });
});
