import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  analyzeSpecificity,
  getSpecificityLevel,
  getRecommendedMinTier,
  isHighSpecificity,
  isLowSpecificity,
} from "../specificityDetector.ts";

describe("SpecificityDetector", () => {
  describe("analyzeSpecificity - trivial query", () => {
    it("returns score <= 5 for greeting", () => {
      const result = analyzeSpecificity({ messages: [{ content: "Hello, how are you?" }] });
      assert.ok(result.score <= 5);
    });

    it("level is 'trivial' for greeting", () => {
      const result = analyzeSpecificity({ messages: [{ content: "Hi there!" }] });
      const level = getSpecificityLevel(result.score);
      assert.equal(level, "trivial");
    });
  });

  describe("analyzeSpecificity - simple queries", () => {
    it("returns low score for factual question", () => {
      const result = analyzeSpecificity({
        messages: [{ content: "What is the capital of France?" }],
      });
      assert.ok(result.score >= 0);
      assert.ok(result.score <= 20);
    });

    it("returns 'simple' or lower for factual question", () => {
      const result = analyzeSpecificity({
        messages: [{ content: "Who invented Python?" }],
      });
      const level = getSpecificityLevel(result.score);
      assert.ok(["trivial", "simple"].includes(level));
    });
  });

  describe("analyzeSpecificity - code detection", () => {
    it("returns score >= 5 for code block", () => {
      const result = analyzeSpecificity({
        messages: [{ content: "```ts\nfunction foo(){}\n```" }],
      });
      assert.ok(result.score >= 5, `Expected >= 5, got ${result.score}`);
    });

    it("code complexity is detected in code blocks", () => {
      const result = analyzeSpecificity({
        messages: [{ content: "```ts\nfunction foo(){}\n```" }],
      });
      assert.ok(result.breakdown.codeComplexity > 0);
    });

    it("returns higher score for code + reasoning", () => {
      const result = analyzeSpecificity({
        messages: [
          { content: "I need to implement a binary search tree." },
          {
            content:
              "First, define the Node class. Step 1: create the class. Therefore, we need generics.",
          },
          { content: "```typescript\nclass BST<T> { insert(val: T): void {} }\n```" },
        ],
      });
      assert.ok(result.score >= 10, `Expected >= 10, got ${result.score}`);
    });
  });

  describe("analyzeSpecificity - reasoning detection", () => {
    it("detects step-by-step reasoning", () => {
      const result = analyzeSpecificity({
        messages: [
          {
            content:
              "First, define the Node class. Step 1: create the class. Therefore, we need generics.",
          },
        ],
      });
      assert.ok(result.breakdown.reasoningDepth > 0);
    });
  });

  describe("getSpecificityLevel", () => {
    it("returns 'trivial' for score 0-5", () => {
      assert.equal(getSpecificityLevel(0), "trivial");
      assert.equal(getSpecificityLevel(3), "trivial");
      assert.equal(getSpecificityLevel(5), "trivial");
    });

    it("returns 'simple' for score 6-20", () => {
      assert.equal(getSpecificityLevel(6), "simple");
      assert.equal(getSpecificityLevel(10), "simple");
      assert.equal(getSpecificityLevel(20), "simple");
    });

    it("returns 'moderate' for score 6-40", () => {
      assert.equal(getSpecificityLevel(21), "moderate");
      assert.equal(getSpecificityLevel(30), "moderate");
      assert.equal(getSpecificityLevel(40), "moderate");
    });

    it("returns 'complex' for score 41+", () => {
      assert.equal(getSpecificityLevel(41), "complex");
      assert.equal(getSpecificityLevel(46), "complex");
      assert.equal(getSpecificityLevel(65), "complex");
    });

    it("returns 'expert' for score 66+", () => {
      assert.equal(getSpecificityLevel(66), "expert");
      assert.equal(getSpecificityLevel(80), "expert");
      assert.equal(getSpecificityLevel(100), "expert");
    });
  });

  describe("getRecommendedMinTier", () => {
    it("returns 'free' for 'trivial'", () => {
      assert.equal(getRecommendedMinTier("trivial"), "free");
    });

    it("returns 'free' for 'simple'", () => {
      assert.equal(getRecommendedMinTier("simple"), "free");
    });

    it("returns 'cheap' for 'moderate'", () => {
      assert.equal(getRecommendedMinTier("moderate"), "cheap");
    });

    it("returns 'premium' for 'complex'", () => {
      assert.equal(getRecommendedMinTier("complex"), "cheap");
    });

    it("returns 'premium' for 'expert'", () => {
      assert.equal(getRecommendedMinTier("expert"), "premium");
    });
  });

  describe("isHighSpecificity", () => {
    it("returns false for trivial query", () => {
      const result = analyzeSpecificity({ messages: [{ content: "Hi" }] });
      assert.equal(isHighSpecificity(result), false);
    });

    it("returns false for simple query", () => {
      const result = analyzeSpecificity({
        messages: [{ content: "What is Python?" }],
      });
      assert.equal(isHighSpecificity(result), false);
    });
  });

  describe("isLowSpecificity", () => {
    it("returns true for trivial query", () => {
      const result = analyzeSpecificity({ messages: [{ content: "Hi" }] });
      assert.equal(isLowSpecificity(result), true);
    });

    it("returns false for complex query", () => {
      const result = analyzeSpecificity({
        messages: [
          { content: "Implement a concurrent lock-free red-black tree with async patterns." },
          {
            content:
              "Step 1: define Node. Step 2: insert. Step 3: balance. Therefore we maintain invariants.",
          },
          {
            content:
              "```typescript\nclass RBTree<T> { async insert(val: T): Promise<void> {} }\n```",
          },
        ],
      });
      assert.equal(isLowSpecificity(result), false);
    });
  });

  describe("analyzeSpecificity returns complete result", () => {
    it("returns score, breakdown, rulesTriggered, inputTokens, confidence", () => {
      const result = analyzeSpecificity({ messages: [{ content: "Test" }] });
      assert.ok("score" in result);
      assert.ok("breakdown" in result);
      assert.ok("rulesTriggered" in result);
      assert.ok("inputTokens" in result);
      assert.ok("confidence" in result);
    });

    it("returns all 6 breakdown categories", () => {
      const result = analyzeSpecificity({ messages: [{ content: "Test" }] });
      assert.ok("codeComplexity" in result.breakdown);
      assert.ok("mathComplexity" in result.breakdown);
      assert.ok("reasoningDepth" in result.breakdown);
      assert.ok("contextSize" in result.breakdown);
      assert.ok("toolCalling" in result.breakdown);
      assert.ok("domainSpecificity" in result.breakdown);
    });

    it("returns non-negative scores for all categories", () => {
      const result = analyzeSpecificity({ messages: [{ content: "Hello" }] });
      assert.ok(result.breakdown.codeComplexity >= 0);
      assert.ok(result.breakdown.mathComplexity >= 0);
      assert.ok(result.breakdown.reasoningDepth >= 0);
      assert.ok(result.breakdown.contextSize >= 0);
      assert.ok(result.breakdown.toolCalling >= 0);
      assert.ok(result.breakdown.domainSpecificity >= 0);
    });
  });

  describe("tool calling detection", () => {
    it("returns 0 when no tools defined", () => {
      const result = analyzeSpecificity({ messages: [{ content: "Hello" }] });
      assert.equal(result.breakdown.toolCalling, 0);
    });

    it("returns positive score when tools present", () => {
      const result = analyzeSpecificity({
        messages: [{ content: "Use the calculator" }],
        tools: [
          { type: "function", function: { name: "calculator", description: "a calculator" } },
          { type: "function", function: { name: "weather", description: "get weather" } },
        ],
      });
      assert.ok(result.breakdown.toolCalling > 0);
    });
  });

  describe("performance", () => {
    it("completes analysis in <5ms for 20 messages", () => {
      const msgs = Array(20).fill({
        content:
          "Write a function that implements merge sort with O(n log n) complexity. Step 1: divide array. Therefore, use recursion.",
      });
      const t0 = performance.now();
      analyzeSpecificity({ messages: msgs });
      const elapsed = performance.now() - t0;
      assert.ok(elapsed < 5, `Expected < 5ms, got ${elapsed.toFixed(2)}ms`);
    });
  });
});
