// @ts-nocheck
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// Port of decolua/9router#3685: a built-in-tool provider (z.ai/glm `analyze_image`)
// emits `server_tool_use` blocks with OpenAI-style `call_` ids. When a combo later
// routes the conversation to Anthropic, the id fails `^srvtoolu_` and every turn 400s.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-foreign-srvtoolu-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { dropForeignServerToolUseBlocks } =
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
    { role: "user", content: [{ type: "text", text: "describe the image" }] },
    {
      role: "assistant",
      content: [
        { type: "text", text: "Looking at it." },
        {
          type: "server_tool_use",
          id: "call_50b82aba1b754d82a4408a53",
          name: "analyze_image",
          input: {},
        },
        {
          type: "web_search_tool_result",
          tool_use_id: "call_50b82aba1b754d82a4408a53",
          content: [],
        },
        { type: "text", text: "It is a cat." },
      ],
    },
    { role: "user", content: [{ type: "text", text: "search the web" }] },
    {
      role: "assistant",
      content: [
        { type: "server_tool_use", id: "srvtoolu_01ABC", name: "web_search", input: { q: "x" } },
        { type: "web_search_tool_result", tool_use_id: "srvtoolu_01ABC", content: [] },
        { type: "text", text: "Found it." },
      ],
    },
    { role: "user", content: [{ type: "text", text: "thanks" }] },
  ];
}

test("drops a foreign server_tool_use id and its paired result, keeps srvtoolu_ blocks", () => {
  const messages = makeMessages();
  const before = JSON.stringify(messages);

  const out = dropForeignServerToolUseBlocks(messages);

  assert.equal(JSON.stringify(messages), before, "input is not mutated");
  assert.deepEqual(out[1].content, [
    { type: "text", text: "Looking at it." },
    { type: "text", text: "It is a cat." },
  ]);
  assert.equal(out[3], messages[3], "valid srvtoolu_ turn keeps its reference");
  assert.equal(out[0], messages[0]);
});

test("drops a paired result that lives in another message (tool_result in a user turn)", () => {
  const messages = [
    { role: "user", content: "q" },
    {
      role: "assistant",
      content: [{ type: "server_tool_use", id: "call_x", name: "analyze_image", input: {} }],
    },
    {
      role: "user",
      content: [
        { type: "tool_result", tool_use_id: "call_x", content: "r" },
        { type: "text", text: "next" },
      ],
    },
  ];
  const out = dropForeignServerToolUseBlocks(messages);
  assert.deepEqual(out, [
    { role: "user", content: "q" },
    { role: "user", content: [{ type: "text", text: "next" }] },
  ]);
});

test("a message left empty after removal is dropped instead of sending empty content", () => {
  const messages = [
    { role: "user", content: "a" },
    {
      role: "assistant",
      content: [
        { type: "server_tool_use", id: "call_only", name: "analyze_image", input: {} },
        { type: "web_search_tool_result", tool_use_id: "call_only", content: [] },
      ],
    },
    { role: "user", content: "b" },
  ];
  const out = dropForeignServerToolUseBlocks(messages);
  assert.deepEqual(
    out.map((m) => m.role),
    ["user", "user"]
  );
  assert.ok(out.every((m) => typeof m.content === "string" || m.content.length > 0));
});

test("returns the same reference when nothing is foreign", () => {
  const messages = [makeMessages()[3]];
  assert.equal(dropForeignServerToolUseBlocks(messages), messages);
  assert.equal(dropForeignServerToolUseBlocks(undefined), undefined);
  assert.equal(dropForeignServerToolUseBlocks(null), null);
});

async function runPassthrough(provider, model = "claude-opus-5") {
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
    model,
    max_tokens: 64,
    messages: makeMessages(),
    stream: false,
  };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider, model, extendedContext: false },
    credentials: { apiKey: "test-key", providerSpecificData: {} },
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
  return { captured, result };
}

test("claude passthrough never forwards a foreign server_tool_use id to api.anthropic.com", async () => {
  const { captured, result } = await runPassthrough("claude");
  assert.ok(captured, "fetch was not called");
  assert.ok(captured.url.startsWith("https://api.anthropic.com/v1/messages"));
  assert.equal(result.success, true);

  const blocks = captured.body.messages.flatMap((m) => (Array.isArray(m.content) ? m.content : []));
  const ids = blocks.filter((b) => b.type === "server_tool_use").map((b) => b.id);
  assert.deepEqual(ids, ["srvtoolu_01ABC"]);
  const resultIds = blocks.filter((b) => b.tool_use_id).map((b) => b.tool_use_id);
  assert.deepEqual(resultIds, ["srvtoolu_01ABC"]);
  assert.ok(
    blocks.some((b) => b.text === "It is a cat."),
    "visible text is preserved"
  );
});

test("non-Anthropic Claude-format target (zai) receives the history unchanged", async () => {
  const { captured, result } = await runPassthrough("zai", "glm-5.1");
  assert.ok(captured, "fetch was not called");
  assert.ok(!captured.url.includes("api.anthropic.com"));
  assert.equal(result.success, true);

  const blocks = captured.body.messages.flatMap((m) => (Array.isArray(m.content) ? m.content : []));
  const ids = blocks.filter((b) => b.type === "server_tool_use").map((b) => b.id);
  assert.deepEqual(ids, ["call_50b82aba1b754d82a4408a53", "srvtoolu_01ABC"]);
});
