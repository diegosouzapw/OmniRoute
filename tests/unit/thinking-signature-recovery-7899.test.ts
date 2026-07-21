import test from "node:test";
import assert from "node:assert/strict";

const {
  isThinkingSignatureError,
  stripHistoricalThinking,
} = await import("../../open-sse/handlers/chatCore/thinkingSignatureRecovery.ts");

// ── isThinkingSignatureError ──────────────────────────────────────────────

test("isThinkingSignatureError: matches exact Anthropic 400 validation error", () => {
  assert.ok(isThinkingSignatureError(400, "messages.1.content.0: Invalid `signature` in `thinking` block"));
  assert.ok(isThinkingSignatureError(400, "messages.3.content.2: Invalid signature in thinking block"));
});

test("isThinkingSignatureError: rejects generic 400s", () => {
  assert.equal(isThinkingSignatureError(400, "Bad request"), false);
  assert.equal(isThinkingSignatureError(400, "Invalid model"), false);
  assert.equal(isThinkingSignatureError(400, "messages.1.content.0: `thinking` or `redacted_thinking` blocks in the latest assistant message cannot be modified"), false);
});

test("isThinkingSignatureError: rejects non-400 statuses", () => {
  assert.equal(isThinkingSignatureError(429, "Invalid signature in thinking block"), false);
  assert.equal(isThinkingSignatureError(401, "Invalid signature in thinking block"), false);
  assert.equal(isThinkingSignatureError(500, "Invalid signature in thinking block"), false);
});

test("isThinkingSignatureError: handles empty/undefined messages", () => {
  assert.equal(isThinkingSignatureError(400, ""), false);
  assert.equal(isThinkingSignatureError(400, undefined as unknown as string), false);
});

// ── stripHistoricalThinking ───────────────────────────────────────────────

test("stripHistoricalThinking: removes thinking from completed historical assistant turns", () => {
  const messages = [
    { role: "user", content: [{ type: "text", text: "What is 12*12?" }] },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: "calculating", signature: "STALE_SIG" },
        { type: "text", text: "144." },
      ],
    },
    { role: "user", content: [{ type: "text", text: "Now multiply by 2" }] },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: "easy", signature: "VALID_SIG" },
        { type: "text", text: "288." },
      ],
    },
  ];

  const result = stripHistoricalThinking(messages);
  assert.equal(result.removed, 1, "only the historical (non-last) thinking block is removed");

  // First assistant turn: thinking stripped, text preserved
  const firstAssistant = result.messages[1] as { content: { type: string }[] };
  assert.equal(firstAssistant.content.length, 1, "first assistant has only text block");
  assert.equal(firstAssistant.content[0].type, "text");

  // Last assistant turn: thinking preserved
  const lastAssistant = result.messages[3] as { content: { type: string }[] };
  assert.equal(lastAssistant.content.length, 2, "last assistant still has thinking + text");
  assert.equal(lastAssistant.content[0].type, "thinking");
});

test("stripHistoricalThinking: preserves thinking in active tool_use cycles", () => {
  const messages = [
    { role: "user", content: [{ type: "text", text: "run ls" }] },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: "need to run ls", signature: "SIG_1" },
        { type: "tool_use", id: "toolu_1", name: "Bash", input: { cmd: "ls" } },
      ],
    },
    { role: "user", content: [{ type: "tool_result", tool_use_id: "toolu_1", content: "file.txt" }] },
    {
      role: "assistant",
      content: [
        { type: "text", text: "Here is the file." },
      ],
    },
  ];

  const result = stripHistoricalThinking(messages);
  // The thinking block is immediately followed by tool_use → preserved
  assert.equal(result.removed, 0, "thinking preceding tool_use is preserved");
});

test("stripHistoricalThinking: handles redacted_thinking blocks", () => {
  const messages = [
    { role: "user", content: [{ type: "text", text: "hi" }] },
    {
      role: "assistant",
      content: [
        { type: "redacted_thinking", data: "redacted", signature: "SIG" },
        { type: "text", text: "hello" },
      ],
    },
    { role: "user", content: [{ type: "text", text: "bye" }] },
    {
      role: "assistant",
      content: [
        { type: "text", text: "goodbye" },
      ],
    },
  ];

  const result = stripHistoricalThinking(messages);
  assert.equal(result.removed, 1, "redacted_thinking block is stripped");
});

test("stripHistoricalThinking: returns removed=0 when no thinking blocks exist", () => {
  const messages = [
    { role: "user", content: [{ type: "text", text: "hi" }] },
    { role: "assistant", content: [{ type: "text", text: "hello" }] },
    { role: "user", content: [{ type: "text", text: "bye" }] },
  ];

  const result = stripHistoricalThinking(messages);
  assert.equal(result.removed, 0);
  assert.equal(result.messages.length, messages.length);
});

test("stripHistoricalThinking: handles non-array input", () => {
  assert.deepEqual(stripHistoricalThinking(undefined), { messages: undefined, removed: 0 });
  assert.deepEqual(stripHistoricalThinking(null), { messages: null, removed: 0 });
  assert.deepEqual(stripHistoricalThinking("not array"), { messages: "not array", removed: 0 });
});

test("stripHistoricalThinking: replaces empty content with minimal text block", () => {
  const messages = [
    { role: "user", content: [{ type: "text", text: "hi" }] },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: "only thinking", signature: "SIG" },
      ],
    },
    { role: "user", content: [{ type: "text", text: "bye" }] },
    {
      role: "assistant",
      content: [
        { type: "text", text: "final" },
      ],
    },
  ];

  const result = stripHistoricalThinking(messages);
  assert.equal(result.removed, 1);
  const stripped = result.messages[1] as { content: { type: string; text: string }[] };
  assert.equal(stripped.content.length, 1);
  assert.equal(stripped.content[0].type, "text");
});

test("stripHistoricalThinking: does not modify last assistant message", () => {
  const messages = [
    { role: "user", content: [{ type: "text", text: "hi" }] },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: "last turn thinking", signature: "SIG" },
        { type: "text", text: "response" },
      ],
    },
  ];

  const result = stripHistoricalThinking(messages);
  assert.equal(result.removed, 0, "last assistant message is never stripped");
});

test("stripHistoricalThinking: handles string content (not array)", () => {
  const messages = [
    { role: "user", content: "hi" },
    { role: "assistant", content: "hello" },
    { role: "user", content: "bye" },
  ];

  const result = stripHistoricalThinking(messages);
  assert.equal(result.removed, 0);
});