import { describe, it, expect } from "vitest";
import { openaiToGeminiRequest } from "../../open-sse/translator/request/openai-to-gemini";

describe("translator/request/openai-to-gemini.ts - issue #6803 timing fixes", () => {
  describe("thinking budget zero handling (regression guard)", () => {
    it("should pass budget_tokens: 0 without dropping to default", () => {
      const body = {
        model: "gemini/gemini-2.5-flash",
        messages: [{ role: "user", content: "hi" }],
        safetySettings: [],
        thinking: { type: "enabled", budget_tokens: 0 },
      };
      const result = openaiToGeminiRequest("gemini/gemini-2.5-flash", body, false);
      expect(result.generationConfig?.thinkingConfig?.thinkingBudget).toBe(0);
      expect(result.generationConfig?.thinkingConfig?.includeThoughts).toBe(true);
    });

    it("should pass budget_tokens: 1", () => {
      const body = {
        model: "gemini/gemini-2.5-flash",
        messages: [{ role: "user", content: "hi" }],
        safetySettings: [],
        thinking: { type: "enabled", budget_tokens: 1 },
      };
      const result = openaiToGeminiRequest("gemini/gemini-2.5-flash", body, false);
      expect(result.generationConfig?.thinkingConfig?.thinkingBudget).toBe(1);
    });

    it("should not inject thinkingConfig when no knobs present", () => {
      const body = {
        model: "gemini/gemini-2.5-flash",
        messages: [{ role: "user", content: "hi" }],
        safetySettings: [],
      };
      const result = openaiToGeminiRequest("gemini/gemini-2.5-flash", body, false);
      expect(result.generationConfig?.thinkingConfig).toBeUndefined();
    });

    it("should inject thinkingConfig with budget 0 when reasoning_effort: none", () => {
      const body = {
        model: "gemini/gemini-2.5-flash",
        messages: [{ role: "user", content: "hi" }],
        safetySettings: [],
        reasoning_effort: "none",
      };
      const result = openaiToGeminiRequest("gemini/gemini-2.5-flash", body, false);
      expect(result.generationConfig?.thinkingConfig?.thinkingBudget).toBe(0);
      expect(result.generationConfig?.thinkingConfig?.includeThoughts).toBe(true);
    });

    it("should map reasoning_effort: low to thinkingBudget: 1024", () => {
      const body = {
        model: "gemini/gemini-2.5-flash",
        messages: [{ role: "user", content: "hi" }],
        safetySettings: [],
        reasoning_effort: "low",
      };
      const result = openaiToGeminiRequest("gemini/gemini-2.5-flash", body, false);
      expect(result.generationConfig?.thinkingConfig?.thinkingBudget).toBe(1024);
    });

    it("should map reasoning_effort: medium to thinkingBudget >= 1024", () => {
      const body = {
        model: "custom-model",
        messages: [{ role: "user", content: "hi" }],
        safetySettings: [],
        reasoning_effort: "medium",
      };
      const result = openaiToGeminiRequest("custom-model", body, false);
      expect(result.generationConfig?.thinkingConfig?.thinkingBudget).toBeGreaterThanOrEqual(1024);
    });

    it("should map reasoning_effort: high to thinkingBudget: 24576", () => {
      const body = {
        model: "gemini/gemini-2.5-flash",
        messages: [{ role: "user", content: "hi" }],
        safetySettings: [],
        reasoning_effort: "high",
      };
      const result = openaiToGeminiRequest("gemini/gemini-2.5-flash", body, false);
      expect(result.generationConfig?.thinkingConfig?.thinkingBudget).toBe(24576);
    });
  });
});
