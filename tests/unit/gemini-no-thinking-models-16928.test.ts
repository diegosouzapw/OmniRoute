/**
 * #16928: some Gemini models reject ANY `generationConfig.thinkingConfig` with
 * 400 INVALID_ARGUMENT ("Thinking is not enabled for this model" /
 * "Thinking level is not supported for this model"). Verified against AI Studio
 * on 2026-10-17 for gemini-3.5-transcribe, gemini-2.5-flash-image and
 * gemini-3.8-flash-tts: each returns 200 without thinkingConfig and 400 with
 * `{ includeThoughts: false }`, `{ thinkingBudget: 0, includeThoughts: false }`
 * or `{ thinkingLevel }`. Their upstream listings carry no `thinking: true` flag.
 *
 * The translators used to send a thinkingConfig on every path (default
 * injection, reasoning_effort including "none", Claude-style thinking, explicit
 * thinkingLevel), so these models could not be called at all. They must now
 * get no thinkingConfig, while thinking-capable models keep today's behavior.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");
const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");
const { geminiModelRejectsThinkingConfig } =
  await import("../../open-sse/translator/helpers/geminiHelper.ts");

type GeminiResult = { generationConfig: { thinkingConfig?: Record<string, unknown> } };

const REJECTING_MODELS = [
  "gemini-3.5-transcribe",
  "gemini-2.5-flash-image",
  "gemini-3.8-flash-tts",
  "gemini-3.8-flash-lite-tts",
  "gemini-3.1-flash-tts-preview",
  "gemini-2.5-flash-preview-tts",
  "gemini-2.5-pro-preview-tts",
];

// Thinking-capable models whose ids look similar: the 3.x image models DO carry
// `thinking: true` upstream, so a blanket "-image" rule would be wrong.
const THINKING_MODELS = [
  "gemini-3.8-flash",
  "gemini-3.1-flash-image",
  "gemini-3-pro-image",
  "gemini-2.5-flash",
];

const OPENAI_VARIANTS: Array<[string, Record<string, unknown>]> = [
  ["no reasoning knob (default injection)", {}],
  ['reasoning_effort "none"', { reasoning_effort: "none" }],
  ['reasoning_effort "high"', { reasoning_effort: "high" }],
  ["thinking budget_tokens 0", { thinking: { type: "enabled", budget_tokens: 0 } }],
  ["thinking budget_tokens 4096", { thinking: { type: "enabled", budget_tokens: 4096 } }],
  ["explicit thinking_level", { thinking_level: "low" }],
];

const CLAUDE_VARIANTS: Array<[string, Record<string, unknown>]> = [
  ["thinking budget_tokens 0", { thinking: { type: "enabled", budget_tokens: 0 } }],
  ["thinking budget_tokens 4096", { thinking: { type: "enabled", budget_tokens: 4096 } }],
  ['output_config effort "high"', { output_config: { effort: "high" } }],
];

function openai(model: string, extra: Record<string, unknown>): GeminiResult {
  return openaiToGeminiRequest(
    model,
    { messages: [{ role: "user", content: "hi" }], ...extra },
    false
  ) as GeminiResult;
}

function claude(model: string, extra: Record<string, unknown>): GeminiResult {
  return claudeToGeminiRequest(
    model,
    { messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }], ...extra },
    false
  ) as GeminiResult;
}

test("geminiModelRejectsThinkingConfig matches the verified no-thinking families", () => {
  for (const model of REJECTING_MODELS) {
    assert.equal(geminiModelRejectsThinkingConfig(model), true, model);
  }
  // Provider- and API-prefixed ids resolve the same way.
  assert.equal(geminiModelRejectsThinkingConfig("gemini/gemini-3.5-transcribe"), true);
  assert.equal(geminiModelRejectsThinkingConfig("models/gemini-2.5-flash-image"), true);
  assert.equal(geminiModelRejectsThinkingConfig("GEMINI-3.8-FLASH-TTS"), true);
});

test("geminiModelRejectsThinkingConfig leaves thinking-capable models alone", () => {
  for (const model of [...THINKING_MODELS, "gemini-flash-lite-latest", "gemma-4-27b-it"]) {
    assert.equal(geminiModelRejectsThinkingConfig(model), false, model);
  }
  assert.equal(geminiModelRejectsThinkingConfig(undefined), false);
  assert.equal(geminiModelRejectsThinkingConfig(""), false);
});

for (const model of REJECTING_MODELS) {
  for (const [label, extra] of OPENAI_VARIANTS) {
    test(`openai→gemini: ${model} gets no thinkingConfig (${label})`, () => {
      assert.equal(openai(model, extra).generationConfig.thinkingConfig, undefined);
    });
  }
  for (const [label, extra] of CLAUDE_VARIANTS) {
    test(`claude→gemini: ${model} gets no thinkingConfig (${label})`, () => {
      assert.equal(claude(model, extra).generationConfig.thinkingConfig, undefined);
    });
  }
}

test("controls: thinking-capable models still get a thinkingConfig by default", () => {
  for (const model of THINKING_MODELS) {
    assert.ok(openai(model, {}).generationConfig.thinkingConfig, model);
  }
});

test('controls: reasoning_effort "none" keeps the explicit zero-budget contract (#6813)', () => {
  assert.deepEqual(
    openai("gemini-2.5-flash", { reasoning_effort: "none" }).generationConfig.thinkingConfig,
    {
      thinkingBudget: 0,
      includeThoughts: false,
    }
  );
  // Flash-Lite keeps its own exception: the zero budget is dropped, not the config.
  assert.deepEqual(
    openai("gemini-flash-lite-latest", { reasoning_effort: "none" }).generationConfig
      .thinkingConfig,
    { includeThoughts: false }
  );
});

test("controls: Claude-style thinking still reaches thinking-capable models", () => {
  assert.ok(
    claude("gemini-2.5-flash", { thinking: { type: "enabled", budget_tokens: 4096 } })
      .generationConfig.thinkingConfig
  );
});
