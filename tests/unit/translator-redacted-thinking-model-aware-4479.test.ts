/**
 * Regression for #4479 (port: model-aware supportsRedactedThinking for mixed-format providers).
 *
 * Mixed-format providers like `opencode-go` have some models that target Anthropic's
 * Messages API (targetFormat="claude", e.g. minimax-m3) and others that target OpenAI's
 * /chat/completions (default, e.g. glm-5.1). The Anthropic-format models hit a real
 * Anthropic endpoint that validates signatures, so they need `redacted_thinking` blocks —
 * but `supportsRedactedThinking` used to be decided by provider name alone, so those models
 * received plain `thinking` blocks without a signature and got a 400.
 *
 * prepareClaudeRequest now takes a `model` param and also enables redacted_thinking when
 * getModelTargetFormat(provider, model) === "claude". These tests pin both branches plus
 * the backward-compatible no-model call.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { prepareClaudeRequest } = await import("../../open-sse/translator/helpers/claudeHelper.ts");
const { DEFAULT_THINKING_CLAUDE_SIGNATURE } = await import(
  "../../open-sse/config/defaultThinkingSignature.ts"
);

// Assistant turn with only a tool_use → prepareClaudeRequest injects a thinking block before
// it. Anthropic-format upstreams get redacted_thinking{data}; everyone else gets plain
// thinking{text}. Mirrors the shape in translator-claude-helper-thinking.test.ts.
function bodyWithToolUseNeedingThinking() {
  return {
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [
      { role: "user", content: [{ type: "text", text: "hi" }] },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "call_x", name: "ls", input: { path: "." } }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "call_x", content: "README.md" }],
      },
    ],
  };
}

test("opencode-go + claude-format model (minimax-m3) → redacted_thinking with synthetic data", () => {
  const result = prepareClaudeRequest(
    bodyWithToolUseNeedingThinking() as any,
    "opencode-go",
    false,
    "minimax-m3"
  );
  const content = (result as any).messages[1].content;
  assert.equal(content[0].type, "redacted_thinking", "claude-targetFormat model needs redacted_thinking");
  assert.equal(content[0].data, DEFAULT_THINKING_CLAUDE_SIGNATURE);
  assert.equal(content[0].thinking, undefined);
});

test("opencode-go + OpenAI-format model (glm-5.1) → plain thinking (no redaction)", () => {
  const result = prepareClaudeRequest(
    bodyWithToolUseNeedingThinking() as any,
    "opencode-go",
    false,
    "glm-5.1"
  );
  const content = (result as any).messages[1].content;
  assert.equal(content[0].type, "thinking", "OpenAI-targetFormat model must stay plain thinking");
  assert.equal(content[0].data, undefined, "no synthetic redacted data for non-Anthropic upstream");
});

test("opencode-go without model param → plain thinking (backward-compatible)", () => {
  const result = prepareClaudeRequest(bodyWithToolUseNeedingThinking() as any, "opencode-go");
  const content = (result as any).messages[1].content;
  assert.equal(content[0].type, "thinking", "no model → old provider-name behavior preserved");
});
