/**
 * openaiToClaudeRequest — strip `temperature` for Claude models with extended thinking.
 *
 * Claude's Messages API rejects `temperature` when extended thinking is active.
 * Two cases the translator handles:
 *   (a) Model-name detection for forced-thinking families (/claude-(opus|sonnet)-4/),
 *       used by Claude OAuth which always sends the interleaved-thinking beta header.
 *   (b) A final guard that drops `temperature` whenever `result.thinking` was set from
 *       `body.thinking` or `body.reasoning_effort`.
 *
 * Ported from decolua/9router PR #1264 (thanks @noestelar).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } = await import(
  "../../open-sse/translator/request/openai-to-claude.ts"
);

const baseBody = () => ({
  messages: [{ role: "user", content: "hi" }],
  temperature: 0.7,
});

test("strips temperature for claude-opus-4 family (forced thinking)", () => {
  const result = openaiToClaudeRequest("claude-opus-4-6", baseBody(), false);
  assert.equal(result.temperature, undefined);
});

test("strips temperature for claude-sonnet-4 family (forced thinking)", () => {
  const result = openaiToClaudeRequest("claude-sonnet-4-5", baseBody(), false);
  assert.equal(result.temperature, undefined);
});

test("preserves temperature for non-thinking models (haiku, older sonnets)", () => {
  const haiku = openaiToClaudeRequest("claude-haiku-5-20251001", baseBody(), false);
  assert.equal(haiku.temperature, 0.7);

  const sonnet35 = openaiToClaudeRequest("claude-3-5-sonnet-20241022", baseBody(), false);
  assert.equal(sonnet35.temperature, 0.7);
});

test("strips temperature when body.thinking is explicitly set (final guard)", () => {
  // Non-thinking-forced model so the model-based strip doesn't fire; the final
  // guard must catch this case.
  const body = {
    ...baseBody(),
    thinking: { type: "enabled", budget_tokens: 4096 },
  };
  const result = openaiToClaudeRequest("claude-haiku-5-20251001", body, false);
  assert.equal(result.temperature, undefined);
  assert.ok(result.thinking, "thinking should still be present");
});

test("strips temperature when reasoning_effort triggers thinking (final guard)", () => {
  const body = { ...baseBody(), reasoning_effort: "medium" };
  const result = openaiToClaudeRequest("claude-haiku-5-20251001", body, false);
  assert.equal(result.temperature, undefined);
  assert.ok(result.thinking, "reasoning_effort should produce a thinking block");
});

test("preserves temperature when reasoning_effort is unrecognized on a non-thinking model", () => {
  // "none" is not in the effort→budget map, so no thinking block is produced and
  // temperature must survive on a model that does not force thinking.
  const body = { ...baseBody(), reasoning_effort: "none" };
  const result = openaiToClaudeRequest("claude-haiku-5-20251001", body, false);
  assert.equal(result.temperature, 0.7);
  assert.equal(result.thinking, undefined);
});
