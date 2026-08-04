/**
 * #6813 (defect 1) — the openai->gemini transform forwards the Claude-style
 * `thinking.budget_tokens` into `generationConfig.thinkingConfig.thinkingBudget`, but the
 * presence check was truthy (`&& thinking.budget_tokens`). An explicit `budget_tokens: 0`
 * (the natural "disable thinking" request) is falsy, so it was dropped and the request fell
 * through to the default thinkingConfig injection — the model thought despite an explicit
 * request for zero. A `budget_tokens: 0` must be honored as thinkingBudget: 0.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToGeminiRequest } = await import(
  "../../open-sse/translator/request/openai-to-gemini.ts"
);

test("thinking.budget_tokens: 0 is honored as thinkingBudget 0 (not dropped) (#6813)", () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [{ role: "user", content: "hi" }],
      thinking: { type: "enabled", budget_tokens: 0 },
    },
    false
  ) as { generationConfig: { thinkingConfig?: { thinkingBudget: number; includeThoughts: boolean } } };

  assert.equal(
    result.generationConfig.thinkingConfig?.thinkingBudget,
    0,
    "explicit budget_tokens: 0 must map to thinkingBudget: 0"
  );
  assert.equal(
    result.generationConfig.thinkingConfig?.includeThoughts,
    false,
    "with a zero budget there are no thoughts to include"
  );
});

test("thinking.budget_tokens: positive value still maps through with includeThoughts true (#6813 no-regression)", () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [{ role: "user", content: "hi" }],
      thinking: { type: "enabled", budget_tokens: 2048 },
    },
    false
  ) as { generationConfig: { thinkingConfig?: { thinkingBudget: number; includeThoughts: boolean } } };

  assert.equal(result.generationConfig.thinkingConfig?.thinkingBudget, 2048);
  assert.equal(result.generationConfig.thinkingConfig?.includeThoughts, true);
});
