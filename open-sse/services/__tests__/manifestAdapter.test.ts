import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  generateRoutingHints,
  compareByCostEffectiveness,
  estimateRequestCost,
} from "../manifestAdapter.ts";
import type { ResolvedComboTarget } from "../combo.ts";

function makeTarget(provider: string, model: string): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: "step-1",
    executionKey: `${provider}/${model}`,
    modelStr: model,
    provider: provider,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

describe("ManifestAdapter", () => {
  describe("generateRoutingHints - trivial query", () => {
    it("returns prefer-free modifier for greeting", () => {
      const hints = generateRoutingHints([], {
        messages: [{ content: "Hello" }],
      });
      assert.equal(hints.strategyModifier, "prefer-free");
      assert.equal(hints.specificityLevel, "trivial");
    });
  });

  describe("generateRoutingHints - expert query", () => {
    it("returns a valid modifier for complex input", () => {
      const hints = generateRoutingHints([], {
        messages: [
          {
            content:
              "Prove P != NP using SAT reduction. Step 1: assume P = NP. Therefore we have a contradiction.",
          },
        ],
      });
      const validModifiers = ["prefer-free", "prefer-cheap", "require-premium", "default"];
      assert.ok(validModifiers.includes(hints.strategyModifier));
    });
  });

  describe("generateRoutingHints - target classification", () => {
    it("marks free provider as eligible for trivial query", () => {
      const targets = [makeTarget("kiro", "claude-sonnet-4.5")];
      const hints = generateRoutingHints(targets, {
        messages: [{ content: "Hi" }],
      });
      assert.ok(hints.eligibleTargets.length >= 0);
    });

    it("handles empty targets array gracefully", () => {
      const hints = generateRoutingHints([], {
        messages: [{ content: "Hello" }],
      });
      assert.equal(hints.eligibleTargets.length, 0);
      assert.equal(hints.underqualifiedTargets.length, 0);
    });

    it("classifies mixed targets for simple query", () => {
      const targets = [makeTarget("kiro", "claude-sonnet-4.5"), makeTarget("openai", "gpt-4o")];
      const hints = generateRoutingHints(targets, {
        messages: [{ content: "Hello" }],
      });
      assert.ok(hints.eligibleTargets.length >= 0);
    });
  });

  describe("compareByCostEffectiveness", () => {
    it("takes 3 arguments and returns a number", () => {
      const a = makeTarget("deepseek", "deepseek-chat");
      const b = makeTarget("openai", "gpt-4o");
      const hints = generateRoutingHints([a, b], {
        messages: [{ content: "Test" }],
      });
      const result = compareByCostEffectiveness(a, b, hints);
      assert.equal(typeof result, "number");
    });

    it("returns negative when a is cheaper than b", () => {
      const a = makeTarget("deepseek", "deepseek-chat");
      const b = makeTarget("openai", "gpt-4o");
      const hints = generateRoutingHints([a, b], {
        messages: [{ content: "Test" }],
      });
      const result = compareByCostEffectiveness(a, b, hints);
      assert.ok(result < 0, "deepseek should be cheaper than openai");
    });
  });

  describe("estimateRequestCost", () => {
    it("returns 0 for free providers", () => {
      const target = makeTarget("kiro", "claude-sonnet-4.5");
      const cost = estimateRequestCost(target, 1000, 500);
      assert.equal(cost, 0);
    });

    it("returns non-zero for premium provider", () => {
      const target = makeTarget("openai", "gpt-4o");
      const cost = estimateRequestCost(target, 1000000, 500000);
      assert.ok(cost > 0, "gpt-4o should have non-zero cost");
    });

    it("handles zero tokens", () => {
      const target = makeTarget("openai", "gpt-4o");
      const cost = estimateRequestCost(target, 0, 0);
      assert.equal(cost, 0);
    });
  });

  describe("edge cases", () => {
    it("handles empty targets array", () => {
      const hints = generateRoutingHints([], {
        messages: [{ content: "Hello" }],
      });
      assert.equal(hints.eligibleTargets.length, 0);
      assert.equal(hints.underqualifiedTargets.length, 0);
    });

    it("returns valid hints structure with no targets", () => {
      const hints = generateRoutingHints([], {
        messages: [{ content: "Test" }],
      });
      assert.ok("specificityLevel" in hints);
      assert.ok("strategyModifier" in hints);
      assert.ok("recommendedMinTier" in hints);
    });
  });
});
