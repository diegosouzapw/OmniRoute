// @ts-nocheck
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-unsigned-thinking-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { dropUnsignedPassthroughThinkingBlocks } =
  await import("../../open-sse/handlers/chatCore/passthroughHelpers.ts");

const originalFetch = globalThis.fetch;

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

async function flushAsyncSideEffects() {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await flushAsyncSideEffects();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function makeMessages() {
  return [
    { role: "user", content: [{ type: "text", text: "q1" }] },
    {
      // relayed from an OpenAI-compatible leg: reasoning surfaced as an UNSIGNED thinking block
      role: "assistant",
      content: [
        { type: "thinking", thinking: "unsigned relay" },
        { type: "text", text: "a1" },
      ],
    },
    { role: "user", content: [{ type: "text", text: "q2" }] },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: "empty sig", signature: "" },
        { type: "redacted_thinking" },
        { type: "thinking", thinking: "genuine", signature: "GENUINE_SIG" },
        { type: "redacted_thinking", data: "GENUINE_DATA" },
        { type: "text", text: "a2" },
      ],
    },
    { role: "user", content: [{ type: "text", text: "q3" }] },
  ];
}

test("helper drops thinking/redacted_thinking blocks without a signature and keeps the rest", () => {
  const messages = makeMessages();
  const before = JSON.stringify(messages);

  const out = dropUnsignedPassthroughThinkingBlocks(messages);

  assert.equal(JSON.stringify(messages), before, "input is not mutated");
  assert.deepEqual(out[1].content, [{ type: "text", text: "a1" }]);
  assert.deepEqual(out[3].content, [
    { type: "thinking", thinking: "genuine", signature: "GENUINE_SIG" },
    { type: "redacted_thinking", data: "GENUINE_DATA" },
    { type: "text", text: "a2" },
  ]);
  assert.equal(out[0], messages[0], "untouched messages keep their reference");
});

test("helper returns the same reference when every thinking block is signed", () => {
  const messages = [
    { role: "user", content: "hi" },
    {
      role: "assistant",
      content: [
        { type: "thinking", thinking: "r", signature: "SIG" },
        { type: "tool_use", id: "toolu_1", name: "Bash", input: {} },
      ],
    },
  ];
  assert.equal(dropUnsignedPassthroughThinkingBlocks(messages), messages);
  assert.equal(dropUnsignedPassthroughThinkingBlocks(undefined), undefined);
  assert.equal(dropUnsignedPassthroughThinkingBlocks(null), null);
});

test("helper drops an assistant message whose only content was unsigned thinking", () => {
  const messages = [
    { role: "user", content: "a" },
    { role: "assistant", content: [{ type: "thinking", thinking: "only reasoning" }] },
    { role: "user", content: "b" },
  ];
  const out = dropUnsignedPassthroughThinkingBlocks(messages);
  assert.deepEqual(
    out.map((m) => m.role),
    ["user", "user"]
  );
});

test("claude passthrough never replays unsigned thinking history to api.anthropic.com", async () => {
  let captured = null;

  globalThis.fetch = async (url, init = {}) => {
    captured = { url: String(url), body: JSON.parse(String(init.body || "{}")) };
    return new Response(
      JSON.stringify({
        id: "msg_test",
        type: "message",
        role: "assistant",
        model: "claude-opus-5",
        content: [{ type: "text", text: "OK" }],
        usage: { input_tokens: 4, output_tokens: 1 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  const body = {
    model: "claude-opus-5",
    max_tokens: 64,
    system: [{ type: "text", text: "You are Claude." }],
    messages: makeMessages(),
    stream: false,
  };

  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "claude", model: "claude-opus-5", extendedContext: false },
    credentials: { apiKey: "test-claude-key", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/messages",
      body: structuredClone(body),
      headers: new Headers({
        accept: "application/json",
        "content-type": "application/json",
        "user-agent": "claude-code/2.1.154",
      }),
    },
    userAgent: "claude-code/2.1.154",
  });

  assert.ok(captured, "fetch was not called");
  assert.ok(captured.url.startsWith("https://api.anthropic.com/v1/messages"));
  assert.equal(result.success, true);

  const sentBlocks = captured.body.messages
    .filter((m) => m.role === "assistant")
    .flatMap((m) => m.content)
    .filter((b) => b.type === "thinking" || b.type === "redacted_thinking");
  assert.deepEqual(sentBlocks, [
    { type: "thinking", thinking: "genuine", signature: "GENUINE_SIG" },
    { type: "redacted_thinking", data: "GENUINE_DATA" },
  ]);
  assert.ok(
    captured.body.messages.some(
      (m) => Array.isArray(m.content) && m.content.some((b) => b.text === "a1")
    ),
    "the visible answer text of the affected turn is preserved"
  );
});
