/**
 * tests/unit/reasoning-fields-placeholder-strip.test.ts
 *
 * copyOpenAICompatibleReasoningFields() must never forward the internal
 * reasoning-replay placeholder (NON_ANTHROPIC_THINKING_PLACEHOLDER =
 * "(prior reasoning summary unavailable)") to clients — it is request
 * scaffolding, and models echo it as their own reasoning (#8081, #9765).
 * Previously only reasoning_content / reasoning were stripped; non-standard
 * fields (reasoning_text, thinking, thought) and reasoning_details items
 * passed through raw, leaking the sentinel on providers that use them
 * (e.g. Venice).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { NON_ANTHROPIC_THINKING_PLACEHOLDER } from "../../open-sse/utils/reasoningPlaceholder.ts";
import { copyOpenAICompatibleReasoningFields } from "../../open-sse/utils/reasoningFields.ts";

function copy(source: Record<string, unknown>): Record<string, unknown> {
  const target: Record<string, unknown> = {};
  copyOpenAICompatibleReasoningFields(source, target);
  return target;
}

test("real reasoning_content is preserved verbatim", () => {
  const target = copy({ reasoning_content: "Let me think carefully." });
  assert.equal(target.reasoning_content, "Let me think carefully.");
});

test("reasoning_content that is exactly the placeholder is dropped", () => {
  const target = copy({ reasoning_content: NON_ANTHROPIC_THINKING_PLACEHOLDER });
  assert.equal("reasoning_content" in target, false);
});

test("reasoning alias that is exactly the placeholder is dropped", () => {
  const target = copy({ reasoning: NON_ANTHROPIC_THINKING_PLACEHOLDER });
  assert.equal("reasoning" in target, false);
});

test("reasoning_text that is exactly the placeholder is dropped (Venice path, #9765)", () => {
  const target = copy({ reasoning_text: NON_ANTHROPIC_THINKING_PLACEHOLDER });
  assert.equal("reasoning_text" in target, false);
});

test("thinking that is exactly the placeholder is dropped", () => {
  const target = copy({ thinking: NON_ANTHROPIC_THINKING_PLACEHOLDER });
  assert.equal("thinking" in target, false);
});

test("thought that is exactly the placeholder is dropped", () => {
  const target = copy({ thought: NON_ANTHROPIC_THINKING_PLACEHOLDER });
  assert.equal("thought" in target, false);
});

test("placeholder embedded in otherwise real reasoning_text is stripped in place", () => {
  const target = copy({
    reasoning_text: `First thought. ${NON_ANTHROPIC_THINKING_PLACEHOLDER} Second thought.`,
  });
  assert.equal(target.reasoning_text, "First thought.  Second thought.");
});

test("no mirrored reasoning_content is emitted when the only signal is the placeholder", () => {
  const target = copy({ reasoning_text: NON_ANTHROPIC_THINKING_PLACEHOLDER });
  assert.equal("reasoning_content" in target, false);
  assert.equal("reasoning_text" in target, false);
});

test("all-placeholder reasoning_details are dropped entirely", () => {
  const target = copy({
    reasoning_details: [
      { type: "reasoning.text", text: NON_ANTHROPIC_THINKING_PLACEHOLDER },
      { type: "thinking", content: `  ${NON_ANTHROPIC_THINKING_PLACEHOLDER}  ` },
    ],
  });
  assert.equal("reasoning_details" in target, false);
  assert.equal("reasoning_content" in target, false);
});

test("mixed reasoning_details keep real text and drop only placeholder items", () => {
  const target = copy({
    reasoning_details: [
      { type: "reasoning.text", text: "real first step " },
      { type: "thinking", content: NON_ANTHROPIC_THINKING_PLACEHOLDER },
      { type: "reasoning.text", text: "real second step" },
    ],
  });
  assert.deepEqual(target.reasoning_details, [
    { type: "reasoning.text", text: "real first step " },
    { type: "reasoning.text", text: "real second step" },
  ]);
});

test("placeholder inside a reasoning_details text item is stripped in place", () => {
  const target = copy({
    reasoning_details: [
      { type: "reasoning.text", text: `real ${NON_ANTHROPIC_THINKING_PLACEHOLDER} tail` },
    ],
  });
  assert.deepEqual(target.reasoning_details, [{ type: "reasoning.text", text: "real  tail" }]);
});

test("real reasoning_details still mirror into reasoning_content for readable clients", () => {
  const target = copy({
    reasoning_details: [{ type: "reasoning.text", text: "real reasoning here" }],
  });
  assert.equal(target.reasoning_content, "real reasoning here");
  assert.deepEqual(target.reasoning_details, [
    { type: "reasoning.text", text: "real reasoning here" },
  ]);
});

test("non-text reasoning_details (e.g. reasoning.encrypted) survive untouched", () => {
  const target = copy({
    reasoning_details: [{ type: "reasoning.encrypted", data: "sig" }],
  });
  assert.deepEqual(target.reasoning_details, [{ type: "reasoning.encrypted", data: "sig" }]);
});
