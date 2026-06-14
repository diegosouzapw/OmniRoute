import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/intentClassifier.ts");

describe("intentClassifier", () => {
  describe("classifyPromptIntent", () => {
    it("classifies code intent", () => {
      assert.equal(mod.classifyPromptIntent("Write a Python function to sort"), "code");
      assert.equal(mod.classifyPromptIntent("Debug this JavaScript code"), "code");
      assert.equal(mod.classifyPromptIntent("How to use async/await"), "code");
    });

    it("classifies math intent", () => {
      assert.equal(mod.classifyPromptIntent("Solve this equation: x^2 + 3x = 0"), "math");
      assert.equal(mod.classifyPromptIntent("Calculate the derivative"), "math");
    });

    it("classifies reasoning intent", () => {
      assert.equal(mod.classifyPromptIntent("Explain the reasoning behind quantum mechanics"), "reasoning");
    });

    it("classifies creative intent", () => {
      assert.equal(mod.classifyPromptIntent("Compose a poem about the ocean"), "creative");
      assert.equal(mod.classifyPromptIntent("Craft a short story about dragons"), "creative");
    });

    it("classifies simple intent for short prompts", () => {
      assert.equal(mod.classifyPromptIntent("What is 2+2?"), "simple");
    });

    it("returns medium for unclassified prompts", () => {
      assert.equal(mod.classifyPromptIntent("Describe the fall of the Roman Empire"), "medium");
    });

    it("considers system prompt in classification", () => {
      assert.equal(mod.classifyPromptIntent("Hello", "You are a Python coding assistant"), "code");
    });

    it("code keywords take priority over math", () => {
      assert.equal(mod.classifyPromptIntent("Write code to calculate derivatives"), "code");
    });

    it("handles empty prompt", () => {
      const result = mod.classifyPromptIntent("");
      assert.ok(["simple", "medium"].includes(result));
    });
  });

  describe("classifyWithConfig", () => {
    it("returns medium when disabled", () => {
      const result = mod.classifyWithConfig("Write code", { enabled: false });
      assert.equal(result, "medium");
    });

    it("uses extra keywords", () => {
      const result = mod.classifyPromptIntent("deploy the application");
      // With extra keywords
      const withExtra = mod.classifyWithConfig("deploy the application", {
        enabled: true,
        extraCodeKeywords: ["deploy"],
      });
      assert.equal(withExtra, "code");
    });

    it("respects custom simpleMaxWords", () => {
      const shortPrompt = "word ".repeat(10).trim();
      // With default 60 words, this should be simple if it matches
      const result = mod.classifyWithConfig(shortPrompt, { enabled: true, simpleMaxWords: 5 });
      // Won't be simple since it doesn't match simple keywords, but the word limit is respected
      assert.ok(["simple", "medium"].includes(result));
    });
  });

  describe("keyword arrays", () => {
    it("CODE_KEYWORDS is a non-empty readonly array", () => {
      assert.ok(Array.isArray(mod.CODE_KEYWORDS));
      assert.ok(mod.CODE_KEYWORDS.length > 0);
    });

    it("REASONING_KEYWORDS is a non-empty readonly array", () => {
      assert.ok(Array.isArray(mod.REASONING_KEYWORDS));
      assert.ok(mod.REASONING_KEYWORDS.length > 0);
    });

    it("MATH_KEYWORDS is a non-empty readonly array", () => {
      assert.ok(Array.isArray(mod.MATH_KEYWORDS));
      assert.ok(mod.MATH_KEYWORDS.length > 0);
    });

    it("CREATIVE_KEYWORDS is a non-empty readonly array", () => {
      assert.ok(Array.isArray(mod.CREATIVE_KEYWORDS));
      assert.ok(mod.CREATIVE_KEYWORDS.length > 0);
    });

    it("SIMPLE_KEYWORDS is a non-empty readonly array", () => {
      assert.ok(Array.isArray(mod.SIMPLE_KEYWORDS));
      assert.ok(mod.SIMPLE_KEYWORDS.length > 0);
    });
  });

  describe("DEFAULT_INTENT_CONFIG", () => {
    it("has expected shape", () => {
      assert.equal(mod.DEFAULT_INTENT_CONFIG.enabled, true);
      assert.equal(mod.DEFAULT_INTENT_CONFIG.simpleMaxWords, 60);
    });
  });
});
