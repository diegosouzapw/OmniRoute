/**
 * The openai->gemini transform injects a default thinkingConfig when the client sent no
 * reasoning knob (#4170), so thought parts come back tagged `thought: true`. The injected
 * budget was the model default (24576 on registered flash tiers) regardless of the
 * client's `max_tokens`. Gemini counts thinking tokens against `maxOutputTokens`, so a
 * request such as `max_tokens: 50` went upstream with `thinkingBudget: 24576` and the
 * model could spend the whole output cap thinking, returning an empty `content`.
 *
 * The default (not client-requested) budget must stay below the output cap so part of it
 * is left for the visible answer. An explicit client budget is not touched.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");

type GenConfig = {
  maxOutputTokens?: number;
  thinkingConfig?: { thinkingBudget: number; includeThoughts: boolean };
};

function build(body: Record<string, unknown>, model = "gemini-2.5-flash"): GenConfig {
  const result = openaiToGeminiRequest(
    model,
    { messages: [{ role: "user", content: "hi" }], ...body },
    false
  ) as { generationConfig: GenConfig };
  return result.generationConfig;
}

test("default thinking budget is kept below a small max_tokens", () => {
  const cfg = build({ max_tokens: 50 });
  assert.equal(cfg.maxOutputTokens, 50);
  assert.ok(cfg.thinkingConfig, "default thinkingConfig is still injected (#4170)");
  assert.equal(cfg.thinkingConfig.includeThoughts, true);
  assert.ok(
    cfg.thinkingConfig.thinkingBudget < 50,
    `thinkingBudget ${cfg.thinkingConfig.thinkingBudget} must leave room under maxOutputTokens 50`
  );
  assert.equal(cfg.thinkingConfig.thinkingBudget, 25);
});

test("max_completion_tokens is honored the same way", () => {
  const cfg = build({ max_completion_tokens: 1000 });
  assert.equal(cfg.maxOutputTokens, 1000);
  assert.equal(cfg.thinkingConfig?.thinkingBudget, 500);
});

test("default budget is unchanged when max_tokens already leaves room for it", () => {
  const big = build({ max_tokens: 60000 });
  const none = build({});
  assert.equal(big.thinkingConfig?.thinkingBudget, none.thinkingConfig?.thinkingBudget);
  assert.ok((big.thinkingConfig?.thinkingBudget ?? 0) < 60000);
});

test("explicit client thinking budget is not rewritten", () => {
  const cfg = build({ max_tokens: 50, thinking: { type: "enabled", budget_tokens: 2048 } });
  assert.equal(cfg.thinkingConfig?.thinkingBudget, 2048);
});

test("explicit reasoning_effort budget is not rewritten", () => {
  const cfg = build({ max_tokens: 50, reasoning_effort: "low" });
  assert.equal(cfg.thinkingConfig?.thinkingBudget, 1024);
});

test("the shrunk budget does not go below a tier's documented minimum", () => {
  // 2.5 Pro cannot turn thinking off and documents 128 as its minimum budget;
  // 2.5 Flash-Lite documents 512. Halving would send 100 and 500 respectively.
  assert.equal(build({ max_tokens: 200 }, "gemini-2.5-pro").thinkingConfig?.thinkingBudget, 128);
  assert.equal(
    build({ max_tokens: 1000 }, "gemini-2.5-flash-lite").thinkingConfig?.thinkingBudget,
    512
  );
  // Above the minimum, halving still applies.
  assert.equal(build({ max_tokens: 1000 }, "gemini-2.5-pro").thinkingConfig?.thinkingBudget, 500);
});
