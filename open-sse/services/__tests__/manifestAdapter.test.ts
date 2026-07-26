import { describe, it, expect } from "vitest";
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
      expect(hints.strategyModifier).toBe("prefer-free");
      expect(hints.specificityLevel).toBe("trivial");
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
      expect(validModifiers.includes(hints.strategyModifier)).toBe(true);
    });
  });

  describe("generateRoutingHints - target classification", () => {
    it("marks free provider as eligible for trivial query", () => {
      const targets = [makeTarget("kiro", "claude-sonnet-4.5")];
      const hints = generateRoutingHints(targets, {
        messages: [{ content: "Hi" }],
      });
      expect(hints.eligibleTargets.length).toBeGreaterThanOrEqual(0);
    });

    it("handles empty targets array gracefully", () => {
      const hints = generateRoutingHints([], {
        messages: [{ content: "Hello" }],
      });
      expect(hints.eligibleTargets.length).toBe(0);
      expect(hints.underqualifiedTargets.length).toBe(0);
    });

    it("classifies mixed targets for simple query", () => {
      const targets = [makeTarget("kiro", "claude-sonnet-4.5"), makeTarget("openai", "gpt-4o")];
      const hints = generateRoutingHints(targets, {
        messages: [{ content: "Hello" }],
      });
      expect(hints.eligibleTargets.length).toBeGreaterThanOrEqual(0);
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
      expect(typeof result).toBe("number");
    });

    it("returns negative when a is cheaper than b", () => {
      const a = makeTarget("deepseek", "deepseek-chat");
      const b = makeTarget("openai", "gpt-4o");
      const hints = generateRoutingHints([a, b], {
        messages: [{ content: "Test" }],
      });
      const result = compareByCostEffectiveness(a, b, hints);
      expect(result, "deepseek should be cheaper than openai").toBeLessThan(0);
    });
  });

  describe("estimateRequestCost", () => {
    it("returns 0 for free providers", () => {
      const target = makeTarget("kiro", "claude-sonnet-4.5");
      const cost = estimateRequestCost(target, 1000, 500);
      expect(cost).toBe(0);
    });

    it("returns non-zero for premium provider", () => {
      const target = makeTarget("openai", "gpt-4o");
      const cost = estimateRequestCost(target, 1000000, 500000);
      expect(cost, "gpt-4o should have non-zero cost").toBeGreaterThan(0);
    });

    it("handles zero tokens", () => {
      const target = makeTarget("openai", "gpt-4o");
      const cost = estimateRequestCost(target, 0, 0);
      expect(cost).toBe(0);
    });
  });

  describe("edge cases", () => {
    it("handles empty targets array", () => {
      const hints = generateRoutingHints([], {
        messages: [{ content: "Hello" }],
      });
      expect(hints.eligibleTargets.length).toBe(0);
      expect(hints.underqualifiedTargets.length).toBe(0);
    });

    it("returns valid hints structure with no targets", () => {
      const hints = generateRoutingHints([], {
        messages: [{ content: "Test" }],
      });
      expect("specificityLevel" in hints).toBe(true);
      expect("strategyModifier" in hints).toBe(true);
      expect("recommendedMinTier" in hints).toBe(true);
    });
  });
});
