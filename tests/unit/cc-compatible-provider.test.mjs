import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cc-compatible-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const {
  buildClaudeCodeCompatibleRequest,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_MAX_TOKENS,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH,
  joinClaudeCodeCompatibleUrl,
} = await import("../../open-sse/services/claudeCodeCompatible.ts");
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
const providerNodesRoute = await import("../../src/app/api/provider-nodes/route.ts");
const providerNodesValidateRoute =
  await import("../../src/app/api/provider-nodes/validate/route.ts");

const originalFetch = globalThis.fetch;
const originalFlag = process.env.ENABLE_CC_COMPATIBLE_PROVIDER;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  if (originalFlag === undefined) {
    delete process.env.ENABLE_CC_COMPATIBLE_PROVIDER;
  } else {
    process.env.ENABLE_CC_COMPATIBLE_PROVIDER = originalFlag;
  }
  await resetStorage();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  if (originalFlag === undefined) {
    delete process.env.ENABLE_CC_COMPATIBLE_PROVIDER;
  } else {
    process.env.ENABLE_CC_COMPATIBLE_PROVIDER = originalFlag;
  }
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("buildClaudeCodeCompatibleRequest keeps prior role history while dropping trailing assistant prefill", () => {
  const payload = buildClaudeCodeCompatibleRequest({
    sourceBody: {
      reasoning_effort: "xhigh",
      tool_choice: "required",
    },
    normalizedBody: {
      tools: [
        {
          type: "function",
          function: {
            name: "lookup_weather",
            description: "Fetch weather",
            parameters: {
              type: "object",
              properties: {
                city: { type: "string" },
              },
              required: ["city"],
            },
          },
        },
      ],
      messages: [
        { role: "system", content: "sys" },
        { role: "user", content: [{ type: "text", text: "u1" }, { type: "image_url" }] },
        { role: "model", content: "a1" },
        { role: "user", content: [{ type: "text", text: "u2" }, { type: "tool_result" }] },
        { role: "model", content: "prefill" },
      ],
    },
    model: "claude-sonnet-4-6",
    cwd: "/tmp/work",
    now: new Date("2026-04-01T12:00:00.000Z"),
    sessionId: "session-1",
  });

  assert.equal(payload.max_tokens, CLAUDE_CODE_COMPATIBLE_DEFAULT_MAX_TOKENS);
  assert.equal(payload.output_config.effort, "high");
  assert.deepEqual(
    payload.messages.map((message) => ({
      role: message.role,
      text: message.content.map((block) => block.text).join("\n"),
    })),
    [
      { role: "user", text: "u1" },
      { role: "assistant", text: "a1" },
      { role: "user", text: "u2" },
    ]
  );
  assert.deepEqual(payload.messages.at(-1).content.at(-1).cache_control, { type: "ephemeral" });
  assert.equal(payload.system.length, 4);
  assert.equal(payload.system.at(-1).text, "sys");
  assert.equal(payload.tools.length, 1);
  assert.deepEqual(payload.tools[0], {
    name: "lookup_weather",
    description: "Fetch weather",
    input_schema: {
      type: "object",
      properties: {
        city: { type: "string" },
      },
      required: ["city"],
    },
  });
  assert.deepEqual(payload.tool_choice, { type: "any" });
  assert.equal(payload.context_management.edits[0].type, "clear_thinking_20251015");
  assert.equal(JSON.parse(payload.metadata.user_id).session_id, "session-1");
});

test("buildClaudeCodeCompatibleRequest falls back to a user turn when the source only has assistant/model text", () => {
  const payload = buildClaudeCodeCompatibleRequest({
    sourceBody: {
      messages: [{ role: "model", content: "draft" }],
    },
    normalizedBody: {
      messages: [{ role: "model", content: "draft" }],
    },
    model: "claude-sonnet-4-6",
    sessionId: "session-only-assistant",
  });

  assert.deepEqual(payload.messages, [
    {
      role: "user",
      content: [{ type: "text", text: "draft", cache_control: { type: "ephemeral" } }],
    },
  ]);
});

test("buildClaudeCodeCompatibleRequest honors token priority fields", () => {
  const payload = buildClaudeCodeCompatibleRequest({
    sourceBody: { max_completion_tokens: 321 },
    normalizedBody: {
      max_tokens: 123,
      max_output_tokens: 456,
      messages: [{ role: "user", content: "hi" }],
    },
    model: "claude-sonnet-4-6",
    sessionId: "session-2",
  });

  assert.equal(payload.max_tokens, 321);
  assert.deepEqual(payload.tools, []);
  assert.equal(payload.tool_choice, undefined);
});

test("buildClaudeCodeCompatibleRequest omits auto tool_choice while preserving tools", () => {
  const payload = buildClaudeCodeCompatibleRequest({
    sourceBody: { tool_choice: "auto" },
    normalizedBody: {
      messages: [{ role: "user", content: "hi" }],
      tools: [
        {
          type: "function",
          function: {
            name: "ping",
            parameters: { type: "object" },
          },
        },
      ],
    },
    model: "claude-sonnet-4-6",
    sessionId: "session-4",
  });

  assert.equal(payload.tools.length, 1);
  assert.equal(payload.tool_choice, undefined);
});

test("joinClaudeCodeCompatibleUrl preserves a single /v1 segment for CC paths", () => {
  assert.equal(
    joinClaudeCodeCompatibleUrl(
      "https://proxy.example.com",
      CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH
    ),
    "https://proxy.example.com/v1/messages?beta=true"
  );
  assert.equal(
    joinClaudeCodeCompatibleUrl(
      "https://proxy.example.com/v1",
      CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH
    ),
    "https://proxy.example.com/v1/messages?beta=true"
  );
  assert.equal(
    joinClaudeCodeCompatibleUrl(
      "https://proxy.example.com/v1/messages?beta=true",
      CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH
    ),
    "https://proxy.example.com/v1/messages?beta=true"
  );
});

test("DefaultExecutor uses CC-compatible path and headers", () => {
  const executor = new DefaultExecutor("anthropic-compatible-cc-test");
  const credentials = {
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com/v1/",
      chatPath: "",
      ccSessionId: "session-3",
    },
  };

  assert.equal(
    executor.buildUrl("claude-sonnet-4-6", true, 0, credentials),
    "https://proxy.example.com/v1/messages?beta=true"
  );

  const headers = executor.buildHeaders(credentials, true);
  assert.equal(headers["x-api-key"], "sk-test");
  assert.equal(headers["X-Claude-Code-Session-Id"], "session-3");
  assert.equal(headers.Accept, "text/event-stream");
  assert.equal(headers.Authorization, undefined);
});

test("validateProviderApiKey uses CC skeleton request after /models fallback", async () => {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({
      url: String(url),
      method: init.method || "GET",
      headers: init.headers,
      body: init.body ? JSON.parse(String(init.body)) : null,
    });

    if (String(url).endsWith(CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH)) {
      return new Response(JSON.stringify({ error: "missing models" }), { status: 500 });
    }

    return new Response(JSON.stringify({ error: "bad model" }), { status: 400 });
  };

  const result = await validateProviderApiKey({
    provider: "anthropic-compatible-cc-test",
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com/v1/messages?beta=true",
      validationModelId: "claude-sonnet-4-6",
    },
  });

  assert.equal(result.valid, true);
  assert.equal(result.method, "cc_bridge_request");
  assert.match(result.warning, /reached upstream/i);
  assert.deepEqual(
    calls.map((call) => `${call.method} ${call.url}`),
    ["GET https://proxy.example.com/models", "POST https://proxy.example.com/v1/messages?beta=true"]
  );
  assert.equal(calls[1].body.model, "claude-sonnet-4-6");
  assert.equal(calls[1].body.messages[0].role, "user");
  assert.equal(calls[1].headers["x-api-key"], "sk-test");
});

test("provider-nodes create route rejects CC mode when feature flag is disabled", async () => {
  delete process.env.ENABLE_CC_COMPATIBLE_PROVIDER;

  const response = await providerNodesRoute.POST(
    new Request("http://localhost/api/provider-nodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Hidden CC",
        prefix: "cc",
        baseUrl: "https://proxy.example.com/v1",
        type: "anthropic-compatible",
        compatMode: "cc",
      }),
    })
  );

  assert.equal(response.status, 403);
});

test("provider-nodes create route creates CC node with dedicated prefix when enabled", async () => {
  process.env.ENABLE_CC_COMPATIBLE_PROVIDER = "true";

  const response = await providerNodesRoute.POST(
    new Request("http://localhost/api/provider-nodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Hidden CC",
        prefix: "cc",
        baseUrl: "https://proxy.example.com/v1/messages?beta=true",
        type: "anthropic-compatible",
        compatMode: "cc",
        chatPath: CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
        modelsPath: CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH,
      }),
    })
  );

  assert.equal(response.status, 201);
  const data = await response.json();
  assert.match(data.node.id, /^anthropic-compatible-cc-/);
  assert.equal(data.node.baseUrl, "https://proxy.example.com");
  assert.equal(data.node.chatPath, CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH);
  assert.equal(data.node.modelsPath, CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH);
});

test("provider-nodes validate route rejects CC mode when feature flag is disabled", async () => {
  delete process.env.ENABLE_CC_COMPATIBLE_PROVIDER;

  const response = await providerNodesValidateRoute.POST(
    new Request("http://localhost/api/provider-nodes/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        baseUrl: "https://proxy.example.com/v1",
        apiKey: "sk-test",
        type: "anthropic-compatible",
        compatMode: "cc",
      }),
    })
  );

  assert.equal(response.status, 403);
});

test("provider-nodes list route exposes CC flag state from server env", async () => {
  process.env.ENABLE_CC_COMPATIBLE_PROVIDER = "true";

  const response = await providerNodesRoute.GET();
  assert.equal(response.status, 200);

  const data = await response.json();
  assert.equal(data.ccCompatibleProviderEnabled, true);
});
