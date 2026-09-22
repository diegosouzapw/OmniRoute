import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const BARREL = path.join(ROOT, "open-sse/handlers/chatCore.ts");
const LEAF = path.join(ROOT, "open-sse/handlers/chatCore/executeProviderRequest.ts");

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-epr-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleChatCore } = await import("../../../open-sse/handlers/chatCore.ts");

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

test("leaf executeProviderRequest.ts exists", () => {
  assert.equal(fs.existsSync(LEAF), true, "executeProviderRequest.ts must exist");
});

test("barrel no longer defines nested executeProviderRequest", () => {
  const src = fs.readFileSync(BARREL, "utf8");
  assert.equal(
    /const executeProviderRequest = async/.test(src),
    false,
    "nested const must move out of chatCore.ts"
  );
});

test("leaf send pins model via prepareUpstreamBody", async () => {
  const originalFetch = globalThis.fetch;
  const captured = [];
  globalThis.fetch = async (_url, init = {}) => {
    captured.push(init.body ? JSON.parse(String(init.body)) : null);
    return new Response(
      JSON.stringify({
        id: "chatcmpl-epr",
        object: "chat.completion",
        model: "gpt-4o-mini",
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: "ok" },
            finish_reason: "stop",
          },
        ],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  const body = {
    model: "gpt-4o-mini",
    stream: false,
    messages: [{ role: "user", content: "hello" }],
  };

  try {
    const result = await handleChatCore({
      body: structuredClone(body),
      modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
      credentials: { apiKey: "sk-test", providerSpecificData: {} },
      log: noopLog(),
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body: structuredClone(body),
        headers: new Headers({ accept: "application/json" }),
      },
      userAgent: "unit-test",
    });
    assert.equal(result.success, true, "non-stream request must succeed");
    assert.ok(captured.length >= 1, "upstream fetch must run");
    assert.equal(captured[0].model, "gpt-4o-mini", "prepareUpstreamBody pins the model");
  } finally {
    globalThis.fetch = originalFetch;
  }

  const leafSrc = fs.readFileSync(LEAF, "utf8");
  assert.equal(
    leafSrc.includes("prepareUpstreamBody("),
    true,
    "leaf must call prepareUpstreamBody"
  );
  const destructure = leafSrc.slice(leafSrc.indexOf("const {"), leafSrc.indexOf("} = deps;"));
  assert.equal(
    /(?:^|\n)\s*effectiveModel,/.test(destructure) || destructure.includes("\n    effectiveModel,"),
    false,
    "effectiveModel is only the default for modelToCall, not a local"
  );
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
