// @ts-nocheck
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-timing-inline-tools-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { FORWARDABLE_CLIENT_BETAS, mergeClientAnthropicBeta } =
  await import("../../open-sse/config/anthropicHeaders.ts");

const PER_TURN_BETA = "per-turn-control-2026-07-01";
const TIMING_BETA = "timing-2026-09-09";
const INLINE_TOOLS_BETA = "inline-tools-2026-09-15";
const CLAUDE_CODE_BETA_HEADER = [
  "claude-code-20250219",
  "interleaved-thinking-2025-05-14",
  "context-management-2025-06-27",
  "effort-2025-11-24",
  "mid-conversation-system-2026-04-07",
  PER_TURN_BETA,
  TIMING_BETA,
  INLINE_TOOLS_BETA,
].join(",");

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

for (const beta of [TIMING_BETA, INLINE_TOOLS_BETA]) {
  test(`mergeClientAnthropicBeta forwards the client-negotiated ${beta}`, () => {
    assert.ok(FORWARDABLE_CLIENT_BETAS.includes(beta));
    const merged = mergeClientAnthropicBeta("claude-code-20250219", CLAUDE_CODE_BETA_HEADER);
    assert.ok(merged.split(",").includes(beta), `${beta} must reach the upstream`);
  });
}

test("mergeClientAnthropicBeta does not invent timing or inline-tools betas", () => {
  const merged = mergeClientAnthropicBeta("claude-code-20250219", "effort-2025-11-24");
  for (const beta of [TIMING_BETA, INLINE_TOOLS_BETA]) {
    assert.ok(!merged.split(",").includes(beta), `${beta} was never negotiated by the client`);
  }
});

test("claude passthrough sends timing and inline-tools betas with the fields they gate", async () => {
  let captured = null;

  globalThis.fetch = async (url, init = {}) => {
    captured = {
      url: String(url),
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
    tools: [
      { type: "advisor_20260301", name: "advisor", model: "claude-fable-5-1" },
      { name: "Bash", description: "Run a command", input_schema: { type: "object" } },
    ],
    messages: [
      { role: "user", content: "hello" },
      {
        role: "system",
        content: [
          { type: "text", text: "Subagent context." },
          { type: "tool_addition", tool: { type: "tool_reference", name: "advisor" } },
        ],
        output_config: { effort: "medium" },
      },
      { role: "user", content: "go" },
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
        "user-agent": "claude-code/2.1.284",
        "anthropic-beta": CLAUDE_CODE_BETA_HEADER,
      }),
    },
    userAgent: "claude-code/2.1.284",
  });

  assert.ok(captured, "fetch was not called");
  assert.ok(captured.url.startsWith("https://api.anthropic.com/v1/messages"));
  assert.equal(result.success, true);

  const forwarded = (captured.headers.get("anthropic-beta") ?? "").split(",");
  assert.ok(forwarded.includes(PER_TURN_BETA), "per-turn-control beta missing upstream");
  assert.ok(forwarded.includes(TIMING_BETA), "timing beta missing upstream");
  assert.ok(forwarded.includes(INLINE_TOOLS_BETA), "inline-tools beta missing upstream");

  const systemMessage = captured.body.messages.find((message) => message.role === "system");
  assert.ok(systemMessage, "mid-conversation system message missing upstream");
  assert.deepEqual(systemMessage.output_config, { effort: "medium" });
  assert.ok(systemMessage.content.some((block) => block.type === "tool_addition"));
});
