// @ts-nocheck
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-directive-midconv-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;

function noopLog() {
  return {
    debug() {},
    info() {},
    warn() {},
    error() {},
  };
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

test("claude mid-conversation-system passthrough relocates a directive-only messages[0]", async () => {
  let captured = null;

  globalThis.fetch = async (url, init = {}) => {
    captured = {
      url: String(url),
      method: init.method ?? "GET",
      headers: new Headers(init.headers),
      body: JSON.parse(String(init.body || "{}")),
    };
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
    tools: [{ name: "Bash", description: "Run a command", input_schema: { type: "object" } }],
    messages: [
      { role: "system", content: [], output_config: { effort: "medium" } },
      { role: "user", content: "hello" },
    ],
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
  assert.equal(captured.method, "POST");
  assert.ok(captured.headers.get("x-api-key"), "x-api-key header missing");
  assert.ok(captured.headers.get("anthropic-version"), "anthropic-version header missing");
  assert.equal(result.success, true);
  // The directive-only message must not sit at messages[0] when it reaches upstream.
  const upstreamMessages = captured.body.messages;
  assert.equal(upstreamMessages[0].role, "user");
  assert.equal(upstreamMessages[1].role, "system");
  assert.deepEqual(upstreamMessages[1].output_config, { effort: "medium" });
  // The relocation must not disturb anything else the client sent.
  assert.deepEqual(upstreamMessages[1].content, []);
  assert.equal(upstreamMessages[0].content, "hello");
  // The claude identity layer prepends its own blocks; assert the client's
  // block survived rather than an exact count.
  assert.ok(
    captured.body.system.some((block) => block.type === "text" && block.text === "You are Claude.")
  );
  assert.equal(captured.body.tools.length, 1);
  // The directive stays message-level; the top level (if set) is the base
  // executor's own default injection, not the hoisted directive value.
  assert.notDeepEqual(captured.body.output_config, { effort: "medium" });
});
