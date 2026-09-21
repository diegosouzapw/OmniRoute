import test from "node:test";
import assert from "node:assert/strict";

// hasActiveClaudeThinking lives in open-sse/utils/thinkingBudget.ts (the pure
// thinking-budget helpers), distinct from open-sse/services/thinkingBudget.ts.
const { hasActiveClaudeThinking } = await import("../../open-sse/utils/thinkingBudget.ts");

test("hasActiveClaudeThinking: enabled is active", () => {
  assert.equal(hasActiveClaudeThinking({ thinking: { type: "enabled" } }), true);
});

test("hasActiveClaudeThinking: adaptive is active", () => {
  // Claude Code sends {type:"adaptive"} to opt into reasoning. The helper must
  // recognise adaptive exactly as it recognises enabled, so the response
  // translator relays upstream reasoning_content as a thinking block.
  assert.equal(hasActiveClaudeThinking({ thinking: { type: "adaptive" } }), true);
});

test("hasActiveClaudeThinking: disabled is NOT active", () => {
  assert.equal(hasActiveClaudeThinking({ thinking: { type: "disabled" } }), false);
});

test("hasActiveClaudeThinking: absent thinking is NOT active", () => {
  assert.equal(hasActiveClaudeThinking({}), false);
  assert.equal(hasActiveClaudeThinking({ thinking: undefined }), false);
});

test("hasActiveClaudeThinking: thinking without type is NOT active", () => {
  assert.equal(hasActiveClaudeThinking({ thinking: {} }), false);
});
