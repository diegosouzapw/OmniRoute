/**
 * Tests for provider thinking compatibility fixes ported from decolua/9router#2043.
 *
 * Covers:
 *   (a) DeepSeek unsigned thinking placeholders — no `signature` field in injected blocks.
 *   (b) DeepSeek keeps existing thinking blocks as-is (not overwritten by cache/placeholder).
 *   (c) Gemini `reasoning_effort: "auto"` maps to high budget (not silent fallback to default).
 *   (d) Gemini `reasoning_effort: "max"` / `"xhigh"` clamp to high budget.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { prepareClaudeRequest } = await import("../../open-sse/translator/helpers/claudeHelper.ts");
const reasoningCache = await import("../../open-sse/services/reasoningCache.ts");
const { openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");
const { capThinkingBudget } = await import("../../src/lib/modelCapabilities.ts");

// ──────────────── Fix (a): DeepSeek placeholder has NO signature field ────────────────

test("deepseek: injected thinking placeholder has no signature field", () => {
  reasoningCache.clearReasoningCacheAll();
  const body = {
    model: "deepseek-v4-pro",
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [
      { role: "user", content: [{ type: "text", text: "q" }] },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "toolu_1", name: "Read", input: { file_path: "x" } }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu_1", content: "ok" }],
      },
    ],
  };
  const out = prepareClaudeRequest(body as any, "deepseek");
  const assistant = (out as any).messages.find((m: any) => m.role === "assistant");
  assert.ok(assistant, "assistant message should exist");
  assert.equal(assistant.content[0].type, "thinking", "injected block should be type=thinking");
  assert.equal(
    assistant.content[0].signature,
    undefined,
    "DeepSeek placeholder must NOT have a signature field"
  );
  assert.equal(assistant.content[1].type, "tool_use", "tool_use should follow the thinking block");
});

// ──────────────── Fix (b): DeepSeek keeps existing thinking blocks as-is ────────────────

test("deepseek: existing thinking blocks are preserved as-is (text and type unchanged)", () => {
  reasoningCache.clearReasoningCacheAll();
  const body = {
    model: "deepseek-v4-pro",
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [
      { role: "user", content: [{ type: "text", text: "q" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "my actual reasoning", signature: "ds-sig" },
          { type: "tool_use", id: "toolu_2", name: "Read", input: {} },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu_2", content: "ok" }],
      },
    ],
  };
  const out = prepareClaudeRequest(body as any, "deepseek");
  const assistant = (out as any).messages.find((m: any) => m.role === "assistant");
  assert.equal(assistant.content[0].type, "thinking");
  assert.equal(
    assistant.content[0].thinking,
    "my actual reasoning",
    "DeepSeek must keep existing thinking text verbatim"
  );
  // Signature stripping is acceptable (DeepSeek doesn't need it), but text must not
  // be overwritten with placeholder or cache content.
  assert.ok(
    assistant.content.length >= 2,
    "should not drop blocks: thinking + tool_use both present"
  );
  assert.equal(assistant.content[1].type, "tool_use");
});

test("deepseek: injected placeholder thinking text is non-empty dot sentinel", () => {
  // The upstream uses "." as placeholder text for DeepSeek (not the long NON_ANTHROPIC placeholder)
  reasoningCache.clearReasoningCacheAll();
  const body = {
    model: "deepseek-v4-pro",
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [
      { role: "user", content: [{ type: "text", text: "q" }] },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "toolu_3", name: "Write", input: {} }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu_3", content: "done" }],
      },
    ],
  };
  const out = prepareClaudeRequest(body as any, "deepseek");
  const assistant = (out as any).messages.find((m: any) => m.role === "assistant");
  assert.equal(assistant.content[0].type, "thinking");
  // Placeholder must be non-empty (DeepSeek rejects empty thinking text).
  // The value is either "." (upstream canonical) or another non-empty fallback.
  assert.ok(
    typeof assistant.content[0].thinking === "string" && assistant.content[0].thinking.length > 0,
    `thinking placeholder must be non-empty, got: ${JSON.stringify(assistant.content[0].thinking)}`
  );
  assert.equal(
    assistant.content[0].signature,
    undefined,
    "no signature on injected DeepSeek block"
  );
});

// ──────────────── Fix (c): Gemini reasoning_effort "auto" → high budget ────────────────

test("Gemini: reasoning_effort 'auto' maps to a defined (non-zero) thinking budget", () => {
  const out = openaiToGeminiRequest(
    "gemini-3-pro",
    {
      messages: [{ role: "user", content: "hello" }],
      reasoning_effort: "auto",
    },
    false
  ) as any;

  const thinkingBudget = out.generationConfig?.thinkingConfig?.thinkingBudget;
  assert.ok(
    typeof thinkingBudget === "number" && thinkingBudget > 0,
    `reasoning_effort 'auto' should produce a positive thinkingBudget, got: ${thinkingBudget}`
  );
  // Specifically should be at least the high-tier budget level (clamped to model max)
  const highBudget = capThinkingBudget("gemini-3-pro", 32768);
  assert.equal(
    thinkingBudget,
    highBudget,
    `reasoning_effort 'auto' should map to high budget (${highBudget})`
  );
});

// ──────────────── Fix (d): Gemini reasoning_effort "max"/"xhigh" → high budget ────────────────

test("Gemini: reasoning_effort 'max' clamps to high budget (not default fallback)", () => {
  const out = openaiToGeminiRequest(
    "gemini-3-pro",
    {
      messages: [{ role: "user", content: "hello" }],
      reasoning_effort: "max",
    },
    false
  ) as any;

  const thinkingBudget = out.generationConfig?.thinkingConfig?.thinkingBudget;
  const highBudget = capThinkingBudget("gemini-3-pro", 32768);
  assert.equal(
    thinkingBudget,
    highBudget,
    `reasoning_effort 'max' should clamp to high budget (${highBudget})`
  );
});

test("Gemini: reasoning_effort 'xhigh' clamps to high budget (not default fallback)", () => {
  const out = openaiToGeminiRequest(
    "gemini-3-pro",
    {
      messages: [{ role: "user", content: "hello" }],
      reasoning_effort: "xhigh",
    },
    false
  ) as any;

  const thinkingBudget = out.generationConfig?.thinkingConfig?.thinkingBudget;
  const highBudget = capThinkingBudget("gemini-3-pro", 32768);
  assert.equal(
    thinkingBudget,
    highBudget,
    `reasoning_effort 'xhigh' should clamp to high budget (${highBudget})`
  );
});
