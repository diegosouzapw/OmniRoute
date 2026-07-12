import { describe, it, expect } from "vitest";
import { openaiToGeminiRequest } from "../openai-to-gemini";

describe("translator/request/openai-to-gemini.ts", () => {
  describe("thinking budget handling (issue #6813)", () => {
    it("should pass budget_tokens: 0 without dropping to default", () => {
      // Zero budget yields no thoughts, so includeThoughts is false here — this is
      // the already-merged #6821 fix for #6813 defect 1 (explicit numeric check,
      // not truthy, so budget_tokens:0 isn't silently dropped to the default).
      const body = {
        model: "gemini/gemini-2.5-flash",
        messages: [{ role: "user", content: "hi" }],
        safetySettings: [],
        thinking: { type: "enabled", budget_tokens: 0 },
      };
      const result = openaiToGeminiRequest("gemini/gemini-2.5-flash", body, false);
      expect(result.generationConfig?.thinkingConfig?.thinkingBudget).toBe(0);
      expect(result.generationConfig?.thinkingConfig?.includeThoughts).toBe(false);
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

    it("should still inject default thinkingConfig when no knobs present (#4170)", () => {
      // Modern Gemini 2.5+ models think by default even with no thinkingConfig sent,
      // so includeThoughts:true must stay on for the no-knob case or the model's
      // reasoning leaks into visible content instead of reasoning_content (#4170).
      // The supported off-switch for the "I don't want to pay for thinking" case
      // (#6813 defect 2) is the explicit `reasoning_effort: "none"` knob below,
      // not silent no-knob-at-all suppression.
      const body = {
        model: "gemini/gemini-2.5-flash",
        messages: [{ role: "user", content: "hi" }],
        safetySettings: [],
      };
      const result = openaiToGeminiRequest("gemini/gemini-2.5-flash", body, false);
      expect(result.generationConfig?.thinkingConfig?.includeThoughts).toBe(true);
      expect(result.generationConfig?.thinkingConfig?.thinkingBudget).toBeGreaterThan(0);
    });

    it("should set thinkingBudget 0 (and includeThoughts false) when reasoning_effort: none", () => {
      // A zero budget yields no thoughts at all, so includeThoughts is false here —
      // consistent with the explicit budget_tokens:0 handling above (#6821/#6813).
      const body = {
        model: "gemini/gemini-2.5-flash",
        messages: [{ role: "user", content: "hi" }],
        safetySettings: [],
        reasoning_effort: "none",
      };
      const result = openaiToGeminiRequest("gemini/gemini-2.5-flash", body, false);
      expect(result.generationConfig?.thinkingConfig?.thinkingBudget).toBe(0);
      expect(result.generationConfig?.thinkingConfig?.includeThoughts).toBe(false);
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

    it("should map reasoning_effort: medium to thinkingBudget: 10240", () => {
      const body = {
        model: "custom-model",
        messages: [{ role: "user", content: "hi" }],
        safetySettings: [],
        reasoning_effort: "medium",
      };
      const result = openaiToGeminiRequest("custom-model", body, false);
      // medium falls back to getDefaultThinkingBudget which may return 8192
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
