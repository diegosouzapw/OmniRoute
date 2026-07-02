import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chatcore-gateway-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const core = await import("../../src/lib/db/core.ts");

function noopLog() {
  return {
    debug() {},
    info() {},
    warn() {},
    error() {},
  };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("chatCore preserves max_tokens for named OpenAI-format gateways", async () => {
  const originalFetch = globalThis.fetch;
  const calls: Array<{ body: Record<string, unknown> | null }> = [];

  globalThis.fetch = async (_url, init = {}) => {
    calls.push({
      body: init.body ? (JSON.parse(String(init.body)) as Record<string, unknown>) : null,
    });
    return new Response(
      JSON.stringify({
        id: "chatcmpl-json",
        object: "chat.completion",
        model: "openai/o3-mini",
        choices: [{ index: 0, message: { role: "assistant", content: "ok" } }],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  try {
    const result = await handleChatCore({
      body: {
        model: "openrouter/openai/o3-mini",
        messages: [{ role: "user", content: "hello" }],
        max_tokens: 123,
      },
      modelInfo: { provider: "openrouter", model: "openai/o3-mini", extendedContext: false },
      credentials: { apiKey: "sk-test", providerSpecificData: {} },
      log: noopLog(),
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body: {},
        headers: new Headers({ accept: "application/json" }),
      },
      userAgent: "unit-test",
    });

    assert.equal(result.success, true);
    assert.equal(calls[0]?.body?.max_tokens, 123);
    assert.equal(calls[0]?.body?.max_completion_tokens, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
