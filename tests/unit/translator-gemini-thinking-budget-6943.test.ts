// Relocated from open-sse/translator/request/__tests__/openai-to-gemini.test.ts (#6943):
// that path is collected by NO runner (vitest excludes open-sse/translator; node:test globs
// only cover tests/**), so the suite never ran — flagged by check:test-discovery in the
// v3.8.47 release pre-flight. Converted from vitest to node:test in place.
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToGeminiRequest } = await import(
  "../../open-sse/translator/request/openai-to-gemini.ts"
);

type GeminiReq = {
  generationConfig?: { thinkingConfig?: { thinkingBudget?: number; includeThoughts?: boolean } };
};

const base = (extra: Record<string, unknown>) => ({
  model: "gemini/gemini-2.5-flash",
  messages: [{ role: "user", content: "hi" }],
  safetySettings: [],
  ...extra,
});

test("#6813: budget_tokens 0 passes through without dropping to default", () => {
  const r = openaiToGeminiRequest(
    "gemini/gemini-2.5-flash",
    base({ thinking: { type: "enabled", budget_tokens: 0 } }),
    false
  ) as GeminiReq;
  assert.equal(r.generationConfig?.thinkingConfig?.thinkingBudget, 0);
  assert.equal(r.generationConfig?.thinkingConfig?.includeThoughts, false);
});

test("#6813: budget_tokens 1 passes through", () => {
  const r = openaiToGeminiRequest(
    "gemini/gemini-2.5-flash",
    base({ thinking: { type: "enabled", budget_tokens: 1 } }),
    false
  ) as GeminiReq;
  assert.equal(r.generationConfig?.thinkingConfig?.thinkingBudget, 1);
});

test("#4170: no-knob case still injects default thinkingConfig with includeThoughts", () => {
  const r = openaiToGeminiRequest("gemini/gemini-2.5-flash", base({}), false) as GeminiReq;
  assert.equal(r.generationConfig?.thinkingConfig?.includeThoughts, true);
  assert.ok((r.generationConfig?.thinkingConfig?.thinkingBudget ?? 0) > 0);
});

test("#6813: reasoning_effort none is the explicit off-switch (budget 0, no thoughts)", () => {
  const r = openaiToGeminiRequest(
    "gemini/gemini-2.5-flash",
    base({ reasoning_effort: "none" }),
    false
  ) as GeminiReq;
  assert.equal(r.generationConfig?.thinkingConfig?.thinkingBudget, 0);
  assert.equal(r.generationConfig?.thinkingConfig?.includeThoughts, false);
});

test("reasoning_effort low maps to thinkingBudget 1024", () => {
  const r = openaiToGeminiRequest(
    "gemini/gemini-2.5-flash",
    base({ reasoning_effort: "low" }),
    false
  ) as GeminiReq;
  assert.equal(r.generationConfig?.thinkingConfig?.thinkingBudget, 1024);
});

test("reasoning_effort medium falls back to the model default budget (>=1024)", () => {
  const r = openaiToGeminiRequest(
    "custom-model",
    { ...base({ reasoning_effort: "medium" }), model: "custom-model" },
    false
  ) as GeminiReq;
  assert.ok((r.generationConfig?.thinkingConfig?.thinkingBudget ?? 0) >= 1024);
});

test("reasoning_effort high maps to the flash cap 24576", () => {
  const r = openaiToGeminiRequest(
    "gemini/gemini-2.5-flash",
    base({ reasoning_effort: "high" }),
    false
  ) as GeminiReq;
  assert.equal(r.generationConfig?.thinkingConfig?.thinkingBudget, 24576);
});
