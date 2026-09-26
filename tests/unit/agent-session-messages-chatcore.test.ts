// Wiring guard for #14864: both handleChatCore usage call sites (non-streaming and streaming)
// must hand the resolved session turn to saveRequestUsage. Real handleChatCore, mocked upstream.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-session-turn-wiring-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const featureFlagsDb = await import("../../src/lib/db/featureFlags.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const CAPTURE_FLAG = "AGENT_SESSION_MESSAGES_ENABLED";
const originalFetch = globalThis.fetch;

test.before(() => {
  featureFlagsDb.setFeatureFlagOverride(CAPTURE_FLAG, "true");
});

test.after(() => {
  globalThis.fetch = originalFetch;
  featureFlagsDb.removeFeatureFlagOverride(CAPTURE_FLAG);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const noopLog = () => ({ debug() {}, info() {}, warn() {}, error() {} });

async function flushAsyncSideEffects() {
  for (let i = 0; i < 10; i++) await new Promise((resolve) => setImmediate(resolve));
}

function storedTurn(prompt: string) {
  return core
    .getDbInstance()
    .prepare(
      "SELECT user_text, assistant_text, tool_names FROM agent_session_messages WHERE user_text = ?"
    )
    .get(prompt) as { user_text: string; assistant_text: string; tool_names: string } | undefined;
}

async function runChatCore(prompt: string, stream: boolean, sessionId: string) {
  const body = {
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 16,
    stream,
  };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "sk-test-not-real", providerSpecificData: {} },
    log: noopLog(),
    apiKeyInfo: { id: "key-alice-id", name: "key-alice", noLog: false },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "application/json", "x-claude-code-session-id": sessionId }),
    },
    userAgent: "claude-cli/2.1.0 (external, cli)",
  });
  assert.equal(result.success, true);
  if (stream) await result.response.text();
  await flushAsyncSideEffects();
}

test("non-streaming handleChatCore stores the session turn", async () => {
  globalThis.fetch = async () =>
    Response.json({
      id: "chatcmpl_wire_1",
      object: "chat.completion",
      created: 1,
      model: "gpt-4o-mini",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "Non-streamed answer." },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 5, completion_tokens: 3, total_tokens: 8 },
    });

  await runChatCore("wiring non-stream prompt", false, "wire-session-json");

  const row = storedTurn("wiring non-stream prompt");
  assert.ok(row, "a turn row is stored");
  assert.equal(row.assistant_text, "Non-streamed answer.");
});

test("streaming handleChatCore stores the session turn with tool names", async () => {
  const chunk = (delta: Record<string, unknown>, finishReason: string | null = null) =>
    `data: ${JSON.stringify({
      id: "chatcmpl_wire_2",
      object: "chat.completion.chunk",
      created: 1,
      model: "gpt-4o-mini",
      choices: [{ index: 0, delta, finish_reason: finishReason }],
    })}\n\n`;
  const sse = [
    chunk({ role: "assistant", content: "Streamed answer." }),
    chunk({
      tool_calls: [
        { index: 0, id: "call_1", type: "function", function: { name: "Bash", arguments: "{}" } },
      ],
    }),
    chunk({}, "tool_calls"),
    "data: [DONE]\n\n",
  ].join("");
  globalThis.fetch = async () =>
    new Response(sse, { status: 200, headers: { "Content-Type": "text/event-stream" } });

  await runChatCore("wiring stream prompt", true, "wire-session-sse");

  const row = storedTurn("wiring stream prompt");
  assert.ok(row, "a turn row is stored");
  assert.equal(row.assistant_text, "Streamed answer.");
  assert.deepEqual(JSON.parse(row.tool_names), ["Bash"]);
});
