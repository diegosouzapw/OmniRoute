import test from "node:test";
import assert from "node:assert/strict";

const { prepareClaudeRequest, NON_ANTHROPIC_THINKING_PLACEHOLDER: PLACEHOLDER } = await import("../../open-sse/translator/helpers/claudeHelper.ts");
const { DEFAULT_THINKING_CLAUDE_SIGNATURE } =
  await import("../../open-sse/config/defaultThinkingSignature.ts");
const reasoningCache = await import("../../open-sse/services/reasoningCache.ts");


function multiTurnBodyWithoutThinkingBlock() {
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

function multiTurnBodyWithThinkingBlock(thinkingText: string, toolUseId = "call_y") {
  return {
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [
      { role: "user", content: [{ type: "text", text: "hi" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: thinkingText, signature: "client-stored-sig" },
          { type: "tool_use", id: toolUseId, name: "ls", input: {} },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: toolUseId, content: "ok" }],
      },
    ],
  };
}

// ──────────────── Anthropic-native (claude, anthropic-compatible-*) ────────────────

test("claude provider — empty content, injects redacted_thinking{data} before tool_use", () => {
  const body = multiTurnBodyWithoutThinkingBlock();
  const result = prepareClaudeRequest(body as any, "claude");
  const content = (result as any).messages[1].content;
  assert.equal(content.length, 2);
  assert.equal(content[0].type, "redacted_thinking");
  assert.equal(content[0].data, DEFAULT_THINKING_CLAUDE_SIGNATURE);
  assert.equal(content[0].thinking, undefined);
  assert.equal(content[0].signature, undefined);
  assert.equal(content[1].type, "tool_use");
});

test("claude provider — existing thinking block converted to redacted_thinking{data} on older messages", () => {
  // Uses a two-assistant-turn body: the first assistant (with thinking) is an
  // older turn; the second (latest) assistant's thinking must stay verbatim.
  // This verifies that older assistant thinking blocks ARE rewritten.
  const body: any = {
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [
      { role: "user", content: [{ type: "text", text: "hi" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "real thinking text", signature: "client-stored-sig" },
          { type: "tool_use", id: "call_y", name: "ls", input: {} },
        ],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: "call_y", content: "ok" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "latest thinking", signature: "latest-sig" },
          { type: "tool_use", id: "call_z", name: "ls", input: {} },
        ],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: "call_z", content: "ok" }] },
    ],
  };
  prepareClaudeRequest(body, "claude");
  // Older assistant: thinking rewritten to redacted_thinking
  const olderContent = body.messages[1].content;
  assert.equal(olderContent.length, 2, "no double-inject");
  assert.equal(olderContent[0].type, "redacted_thinking");
  assert.equal(olderContent[0].data, DEFAULT_THINKING_CLAUDE_SIGNATURE);
  assert.equal(
    olderContent[0].thinking,
    undefined,
    "plain text stripped (Anthropic does not trust replay text)"
  );
  assert.equal(olderContent[0].signature, undefined);
  assert.equal(olderContent[1].type, "tool_use");
  // Latest assistant: thinking preserved verbatim
  const latestContent = body.messages[3].content;
  assert.equal(latestContent[0].type, "thinking");
  assert.equal(latestContent[0].thinking, "latest thinking");
  assert.equal(latestContent[0].signature, "latest-sig");
});

test("anthropic-compatible-* provider — same as claude (redacted_thinking)", () => {
  const body = multiTurnBodyWithoutThinkingBlock();
  const result = prepareClaudeRequest(body as any, "anthropic-compatible-abc123");
  const content = (result as any).messages[1].content;
  assert.equal(content[0].type, "redacted_thinking");
  assert.equal(content[0].data, DEFAULT_THINKING_CLAUDE_SIGNATURE);
});

// ──────────────── Non-Anthropic Claude-shape (kimi-coding, glmt, zai, …) ────────────────

test("kimi-coding provider — empty content, injects plain thinking{text} with placeholder (cache miss)", () => {
  reasoningCache.clearReasoningCacheAll();
  const body = multiTurnBodyWithoutThinkingBlock();
  const result = prepareClaudeRequest(body as any, "kimi-coding");
  const content = (result as any).messages[1].content;
  assert.equal(content.length, 2);
  assert.equal(content[0].type, "thinking");
  assert.equal(content[0].thinking, PLACEHOLDER);
  assert.equal(content[0].data, undefined, "no data field on plain thinking");
  assert.equal(content[0].signature, undefined, "no signature field on cross-provider replay");
  assert.equal(content[1].type, "tool_use");
});

test("kimi-coding provider — empty content + cache hit on tool_use.id, injects real reasoning text", () => {
  reasoningCache.clearReasoningCacheAll();
  reasoningCache.cacheReasoning(
    "call_x",
    "kimi-coding",
    "kimi-k2.6",
    "the model actually thought this"
  );
  const body = multiTurnBodyWithoutThinkingBlock();
  const result = prepareClaudeRequest(body as any, "kimi-coding");
  const content = (result as any).messages[1].content;
  assert.equal(content[0].type, "thinking");
  assert.equal(content[0].thinking, "the model actually thought this");
});

test("kimi-coding provider — existing thinking block: client text preserved, signature stripped, data NOT added", () => {
  reasoningCache.clearReasoningCacheAll();
  const body = multiTurnBodyWithThinkingBlock("client preserved reasoning", "call_y");
  const result = prepareClaudeRequest(body as any, "kimi-coding");
  const content = (result as any).messages[1].content;
  assert.equal(content.length, 2);
  assert.equal(content[0].type, "thinking");
  assert.equal(content[0].thinking, "client preserved reasoning", "client text preserved");
  assert.equal(content[0].data, undefined);
  assert.equal(
    content[0].signature,
    undefined,
    "client-stored signature stripped (no value for kimi)"
  );
});

test("kimi-coding provider — existing redacted_thinking block (no text), cache hit injects real text", () => {
  reasoningCache.clearReasoningCacheAll();
  reasoningCache.cacheReasoning("call_z", "kimi-coding", "kimi-k2.6", "cached reasoning v2");
  const body = {
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [
      { role: "user", content: [{ type: "text", text: "hi" }] },
      {
        role: "assistant",
        content: [
          { type: "redacted_thinking", data: "opaque-blob-from-prior-anthropic-turn" },
          { type: "tool_use", id: "call_z", name: "ls", input: {} },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "call_z", content: "ok" }],
      },
    ],
  };
  const result = prepareClaudeRequest(body as any, "kimi-coding");
  const content = (result as any).messages[1].content;
  assert.equal(content[0].type, "thinking");
  assert.equal(content[0].thinking, "cached reasoning v2", "cache substitutes redacted data");
  assert.equal(content[0].data, undefined);
});

test("kimi-coding provider — existing redacted_thinking block (no text), cache miss → placeholder", () => {
  reasoningCache.clearReasoningCacheAll();
  const body = {
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [
      { role: "user", content: [{ type: "text", text: "hi" }] },
      {
        role: "assistant",
        content: [
          { type: "redacted_thinking", data: "opaque-blob" },
          { type: "tool_use", id: "call_z_miss", name: "ls", input: {} },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "call_z_miss", content: "ok" }],
      },
    ],
  };
  const result = prepareClaudeRequest(body as any, "kimi-coding");
  const content = (result as any).messages[1].content;
  assert.equal(content[0].type, "thinking");
  assert.equal(content[0].thinking, PLACEHOLDER);
});

// ──────────────── Disabled / no-op paths ────────────────

test("thinking disabled — no inject regardless of provider or tool_use", () => {
  for (const provider of ["claude", "kimi-coding", "anthropic-compatible-x"]) {
    const body = {
      thinking: { type: "disabled" },
      messages: [
        { role: "user", content: [{ type: "text", text: "hi" }] },
        { role: "assistant", content: [{ type: "tool_use", id: "x", name: "ls", input: {} }] },
        { role: "user", content: [{ type: "tool_result", tool_use_id: "x", content: "ok" }] },
      ],
    };
    const result = prepareClaudeRequest(body as any, provider);
    const content = (result as any).messages[1].content;
    assert.equal(content.length, 1, `${provider}: no inject when thinking disabled`);
    assert.equal(content[0].type, "tool_use");
  }
});

test("thinking enabled + no tool_use — no precursor inject (single-turn text)", () => {
  for (const provider of ["claude", "kimi-coding"]) {
    const body = {
      thinking: { type: "enabled", budget_tokens: 4096 },
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
    };
    const result = prepareClaudeRequest(body as any, provider);
    const content = (result as any).messages[0].content;
    assert.ok(Array.isArray(content));
    assert.equal(content.length, 1);
    assert.equal(content[0].type, "text");
  }
});

// ──────────────── Latest-assistant preservation (Anthropic & non-Anthropic) ────────────────

test("preserves verbatim thinking on the LATEST assistant message; rewrites only older ones", () => {
  const body: any = {
    thinking: { type: "enabled", budget_tokens: 4096 },
    model: "claude-opus-4-7",
    messages: [
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "older thought", signature: "sig-OLD" },
          { type: "tool_use", id: "tool_1", name: "do_x", input: {} },
        ],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: "tool_1", content: "ok" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "latest thought", signature: "sig-LATEST" },
          { type: "tool_use", id: "tool_2", name: "do_y", input: {} },
        ],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: "tool_2", content: "ok" }] },
    ],
  };

  prepareClaudeRequest(body, "claude");

  const olderAssistant = body.messages[0];
  const latestAssistant = body.messages[2];

  // Older assistant thinking: rewritten to redacted_thinking { data }
  assert.equal(olderAssistant.content[0].type, "redacted_thinking");
  assert.ok(
    typeof olderAssistant.content[0].data === "string" && olderAssistant.content[0].data.length > 0
  );
  assert.equal(olderAssistant.content[0].thinking, undefined);
  assert.equal(olderAssistant.content[0].signature, undefined);

  // Latest assistant thinking: untouched (type, text, signature all preserved)
  assert.equal(latestAssistant.content[0].type, "thinking");
  assert.equal(latestAssistant.content[0].thinking, "latest thought");
  assert.equal(latestAssistant.content[0].signature, "sig-LATEST");
  assert.equal(latestAssistant.content[0].data, undefined);
});

test("non-Anthropic upstream: preserves latest assistant thinking text verbatim, only fills older from cache/placeholder", () => {
  reasoningCache.clearReasoningCacheAll();
  const body: any = {
    thinking: { type: "enabled", budget_tokens: 4096 },
    model: "kimi-k2.6-thinking",
    messages: [
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "" /* stripped on wire */ },
          { type: "tool_use", id: "tool_1", name: "do_x", input: {} },
        ],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: "tool_1", content: "ok" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "latest reasoning text" },
          { type: "tool_use", id: "tool_2", name: "do_y", input: {} },
        ],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: "tool_2", content: "ok" }] },
    ],
  };

  prepareClaudeRequest(body, "kimi-coding");

  // Latest assistant: text preserved verbatim
  assert.equal(body.messages[2].content[0].type, "thinking");
  assert.equal(body.messages[2].content[0].thinking, "latest reasoning text");

  // Older assistant: empty text -> placeholder (cache miss path)
  assert.equal(body.messages[0].content[0].type, "thinking");
  assert.ok(
    typeof body.messages[0].content[0].thinking === "string" &&
      body.messages[0].content[0].thinking.length > 0
  );
});
