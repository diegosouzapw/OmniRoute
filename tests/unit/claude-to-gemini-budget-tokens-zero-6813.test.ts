import test from "node:test";
import assert from "node:assert/strict";

const { claudeToGeminiRequest } = await import(
  "../../open-sse/translator/request/claude-to-gemini.ts"
);

// Regression for #6813 — the Claude→Gemini thinking transform used a truthy
// check (`body.thinking.budget_tokens`) that silently dropped `budget_tokens: 0`
// (dynamic thinking). The value must be preserved as `thinkingBudget: 0`.

test("Claude -> Gemini preserves thinking.budget_tokens: 0 (dynamic thinking) (#6813)", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
      thinking: { type: "enabled", budget_tokens: 0 },
    },
    false
  );

  assert.deepEqual(result.generationConfig.thinkingConfig, {
    thinkingBudget: 0,
    includeThoughts: true,
  });
});

test("Claude -> Gemini prefers a positive thinking.budget_tokens over budget 0 semantics", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
      thinking: { type: "enabled", budget_tokens: 8192 },
    },
    false
  );

  assert.deepEqual(result.generationConfig.thinkingConfig, {
    thinkingBudget: 8192,
    includeThoughts: true,
  });
});
