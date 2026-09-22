// @ts-nocheck
// #13789 — built-in OpenAI-format providers forward non-function tool types unchanged.
//
// normalizeOpenAICompatibleTools() only ran for custom `openai-compatible-*` providers,
// so a built-in provider like agentrouter (OpenAI Chat wire) forwarded client tools such
// as `{ type: "web_search" }` verbatim and the GLM backend rejected the WHOLE request
// with `400 tools[0].type:type is illegal`. The fix extends the normalization to a
// conservative allowlist of built-in providers observed to accept function tools only,
// gated on the OpenAI Chat target format. OpenAI itself is NOT on the list, so its
// `custom` tools keep passing through untouched (acceptance criterion 2).
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13789-nonfunction-tools-"));
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

function chatCompletionResponse(model) {
  return new Response(
    JSON.stringify({
      id: "chatcmpl_13789",
      object: "chat.completion",
      model,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "OK" },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 4, completion_tokens: 1, total_tokens: 5 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
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

async function runChatRequest({ provider, model, apiKey, tools }) {
  let captured = null;
  globalThis.fetch = async (url, init = {}) => {
    captured = {
      url: String(url),
      body: JSON.parse(String(init.body || "{}")),
    };
    return chatCompletionResponse(model);
  };

  const body = {
    model: `${provider}/${model}`,
    messages: [{ role: "user", content: "Reply with exactly OK" }],
    max_tokens: 16,
    stream: false,
    tools,
  };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider, model, extendedContext: false },
    credentials: { apiKey, providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "test-client/1.0",
  });
  return { result, captured };
}

test("#13789 agentrouter+glm: a request with non-function tools reaches the executor with none", async () => {
  const { result, captured } = await runChatRequest({
    provider: "agentrouter",
    model: "glm-5.3",
    apiKey: "test-...ey",
    tools: [
      {
        type: "function",
        function: {
          name: "get_weather",
          description: "Get weather",
          parameters: { type: "object", properties: {} },
        },
      },
      // Acceptance shape from the issue: a hosted `{ type: "web_search" }` tool.
      // The web-search fallback converts this to the omniroute_web_search function
      // tool on this provider, so it never reaches upstream as a non-function type.
      { type: "web_search" },
      // The shapes that actually leak on the current tip: a named Claude server
      // tool (must convert to function) and a nameless hosted tool (must drop).
      // Both forwarded verbatim, agentrouter GLM 400s the WHOLE request with
      // `tools[0].type:type is illegal`.
      { type: "computer_20241022", name: "computer", display_width_px: 1024 },
      { type: "code_interpreter" },
    ],
  });

  assert.equal(result.success, true);
  assert.ok(captured, "the executor was reached");
  assert.equal(captured.url, "https://agentrouter.org/v1/chat/completions");

  const tools = captured.body.tools ?? [];
  for (const tool of tools) {
    assert.equal(
      tool.type,
      "function",
      `non-function tool reached agentrouter upstream: ${JSON.stringify(tool)}`
    );
  }
  const names = new Set(tools.map((t) => t.function?.name));
  assert.ok(names.has("get_weather"), "the plain function tool survives");
  assert.ok(names.has("computer"), "the named server tool is converted, not forwarded raw");
  assert.ok(names.has("omniroute_web_search"), "web_search lands as the fallback function tool");
  assert.equal(
    names.has("code_interpreter"),
    false,
    "the nameless hosted tool is dropped, not forwarded"
  );
});

test("#13789 openai: `custom` tools stay untouched (allowlist is conservative)", async () => {
  const customTool = {
    type: "custom",
    name: "exec",
    format: { type: "grammar", grammar: "lark" },
  };
  const { result, captured } = await runChatRequest({
    provider: "openai",
    model: "gpt-4o",
    apiKey: "test-openai-key",
    tools: [customTool],
  });

  assert.equal(result.success, true);
  assert.ok(captured, "the executor was reached");
  const tools = captured.body.tools ?? [];
  assert.equal(tools.length, 1);
  assert.equal(tools[0].type, "custom", "openai keeps its own custom tool type");
  assert.equal(tools[0].name, "exec");
});
