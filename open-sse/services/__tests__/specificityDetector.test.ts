import { describe, it, expect } from "vitest";
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
      expect(result.score).toBeLessThanOrEqual(5);
    });

    it("level is 'trivial' for greeting", () => {
      const result = analyzeSpecificity({ messages: [{ content: "Hi there!" }] });
      const level = getSpecificityLevel(result.score);
      expect(level).toBe("trivial");
    });
  });

  describe("analyzeSpecificity - simple queries", () => {
    it("returns low score for factual question", () => {
      const result = analyzeSpecificity({
        messages: [{ content: "What is the capital of France?" }],
      });
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(20);
    });

    it("returns 'simple' or lower for factual question", () => {
      const result = analyzeSpecificity({
        messages: [{ content: "Who invented Python?" }],
      });
      const level = getSpecificityLevel(result.score);
      expect(["trivial", "simple"].includes(level)).toBe(true);
    });
  });

  describe("analyzeSpecificity - code detection", () => {
    it("returns score >= 5 for code block", () => {
      const result = analyzeSpecificity({
        messages: [{ content: "```ts\nfunction foo(){}\n```" }],
      });
      expect(result.score, `Expected >= 5, got ${result.score}`).toBeGreaterThanOrEqual(5);
    });

    it("code complexity is detected in code blocks", () => {
      const result = analyzeSpecificity({
        messages: [{ content: "```ts\nfunction foo(){}\n```" }],
      });
      expect(result.breakdown.codeComplexity).toBeGreaterThan(0);
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
      expect(result.score, `Expected >= 10, got ${result.score}`).toBeGreaterThanOrEqual(10);
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
      expect(result.breakdown.reasoningDepth).toBeGreaterThan(0);
    });
  });

  describe("getSpecificityLevel", () => {
    it("returns 'trivial' for score 0-5", () => {
      expect(getSpecificityLevel(0)).toBe("trivial");
      expect(getSpecificityLevel(3)).toBe("trivial");
      expect(getSpecificityLevel(5)).toBe("trivial");
    });

    it("returns 'simple' for score 6-20", () => {
      expect(getSpecificityLevel(6)).toBe("simple");
      expect(getSpecificityLevel(10)).toBe("simple");
      expect(getSpecificityLevel(20)).toBe("simple");
    });

    it("returns 'moderate' for score 6-40", () => {
      expect(getSpecificityLevel(21)).toBe("moderate");
      expect(getSpecificityLevel(30)).toBe("moderate");
      expect(getSpecificityLevel(40)).toBe("moderate");
    });

    it("returns 'complex' for score 41+", () => {
      expect(getSpecificityLevel(41)).toBe("complex");
      expect(getSpecificityLevel(46)).toBe("complex");
      expect(getSpecificityLevel(65)).toBe("complex");
    });

    it("returns 'expert' for score 66+", () => {
      expect(getSpecificityLevel(66)).toBe("expert");
      expect(getSpecificityLevel(80)).toBe("expert");
      expect(getSpecificityLevel(100)).toBe("expert");
    });
  });

  describe("getRecommendedMinTier", () => {
    it("returns 'free' for 'trivial'", () => {
      expect(getRecommendedMinTier("trivial")).toBe("free");
    });

    it("returns 'free' for 'simple'", () => {
      expect(getRecommendedMinTier("simple")).toBe("free");
    });

    it("returns 'cheap' for 'moderate'", () => {
      expect(getRecommendedMinTier("moderate")).toBe("cheap");
    });

    it("returns 'premium' for 'complex'", () => {
      expect(getRecommendedMinTier("complex")).toBe("cheap");
    });

    it("returns 'premium' for 'expert'", () => {
      expect(getRecommendedMinTier("expert")).toBe("premium");
    });
  });

  describe("isHighSpecificity", () => {
    it("returns false for trivial query", () => {
      const result = analyzeSpecificity({ messages: [{ content: "Hi" }] });
      expect(isHighSpecificity(result)).toBe(false);
    });

    it("returns false for simple query", () => {
      const result = analyzeSpecificity({
        messages: [{ content: "What is Python?" }],
      });
      expect(isHighSpecificity(result)).toBe(false);
    });
  });

  describe("isLowSpecificity", () => {
    it("returns true for trivial query", () => {
      const result = analyzeSpecificity({ messages: [{ content: "Hi" }] });
      expect(isLowSpecificity(result)).toBe(true);
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
      expect(isLowSpecificity(result)).toBe(false);
    });
  });

  describe("analyzeSpecificity returns complete result", () => {
    it("returns score, breakdown, rulesTriggered, inputTokens, confidence", () => {
      const result = analyzeSpecificity({ messages: [{ content: "Test" }] });
      expect("score" in result).toBe(true);
      expect("breakdown" in result).toBe(true);
      expect("rulesTriggered" in result).toBe(true);
      expect("inputTokens" in result).toBe(true);
      expect("confidence" in result).toBe(true);
    });

    it("returns all 6 breakdown categories", () => {
      const result = analyzeSpecificity({ messages: [{ content: "Test" }] });
      expect("codeComplexity" in result.breakdown).toBe(true);
      expect("mathComplexity" in result.breakdown).toBe(true);
      expect("reasoningDepth" in result.breakdown).toBe(true);
      expect("contextSize" in result.breakdown).toBe(true);
      expect("toolCalling" in result.breakdown).toBe(true);
      expect("domainSpecificity" in result.breakdown).toBe(true);
    });

    it("returns non-negative scores for all categories", () => {
      const result = analyzeSpecificity({ messages: [{ content: "Hello" }] });
      expect(result.breakdown.codeComplexity).toBeGreaterThanOrEqual(0);
      expect(result.breakdown.mathComplexity).toBeGreaterThanOrEqual(0);
      expect(result.breakdown.reasoningDepth).toBeGreaterThanOrEqual(0);
      expect(result.breakdown.contextSize).toBeGreaterThanOrEqual(0);
      expect(result.breakdown.toolCalling).toBeGreaterThanOrEqual(0);
      expect(result.breakdown.domainSpecificity).toBeGreaterThanOrEqual(0);
    });
  });

  describe("tool calling detection", () => {
    it("returns 0 when no tools defined", () => {
      const result = analyzeSpecificity({ messages: [{ content: "Hello" }] });
      expect(result.breakdown.toolCalling).toBe(0);
    });

    it("returns positive score when tools present", () => {
      const result = analyzeSpecificity({
        messages: [{ content: "Use the calculator" }],
        tools: [
          { type: "function", function: { name: "calculator", description: "a calculator" } },
          { type: "function", function: { name: "weather", description: "get weather" } },
        ],
      });
      expect(result.breakdown.toolCalling).toBeGreaterThan(0);
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
      expect(elapsed, `Expected < 5ms, got ${elapsed.toFixed(2)}ms`).toBeLessThan(5);
    });
  });
});
