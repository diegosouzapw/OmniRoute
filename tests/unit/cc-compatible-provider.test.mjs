import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cc-compatible-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const {
  buildClaudeCodeCompatibleRequest,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_MAX_TOKENS,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH,
  joinClaudeCodeCompatibleUrl,
} = await import("../../open-sse/services/claudeCodeCompatible.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
const providerNodesRoute = await import("../../src/app/api/provider-nodes/route.ts");
const providerNodesValidateRoute =
  await import("../../src/app/api/provider-nodes/validate/route.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

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
  assert.deepEqual(payload.messages[0].content.at(-1).cache_control, { type: "ephemeral" });
  assert.deepEqual(payload.messages[1].content.at(-1).cache_control, { type: "ephemeral" });
  assert.deepEqual(payload.messages[2].content.at(-1).cache_control, { type: "ephemeral" });
  assert.equal(payload.system.length, 4);
  assert.equal(payload.system.at(-1).text, "sys");
  assert.deepEqual(payload.system[1].cache_control, { type: "ephemeral", ttl: "1h" });
  assert.deepEqual(payload.system[2].cache_control, { type: "ephemeral", ttl: "1h" });
  assert.deepEqual(payload.system[3].cache_control, { type: "ephemeral", ttl: "1h" });
  assert.equal(payload.tools.length, 1);
  const { cache_control, ...toolWithoutCacheControl } = payload.tools[0];
  assert.deepEqual(toolWithoutCacheControl, {
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
  assert.deepEqual(payload.tools[0].cache_control, { type: "ephemeral", ttl: "1h" });
  assert.deepEqual(payload.tool_choice, { type: "any" });
  assert.equal(payload.context_management.edits[0].type, "clear_thinking_20251015");
  assert.equal(JSON.parse(payload.metadata.user_id).session_id, "session-1");
});

test("buildClaudeCodeCompatibleRequest preserves Claude cache markers when requested", () => {
  const payload = buildClaudeCodeCompatibleRequest({
    sourceBody: {
      max_tokens: 64,
    },
    normalizedBody: {
      max_tokens: 64,
      messages: [{ role: "user", content: "fallback" }],
    },
    claudeBody: {
      system: [{ type: "text", text: "sys", cache_control: { type: "ephemeral", ttl: "5m" } }],
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: "u1", cache_control: { type: "ephemeral" } }],
        },
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: "a1",
              cache_control: { type: "ephemeral", ttl: "10m" },
            },
          ],
        },
        { role: "user", content: [{ type: "text", text: "u2" }] },
      ],
      tools: [
        {
          name: "lookup_weather",
          description: "Fetch weather",
          input_schema: {
            type: "object",
            properties: {
              city: { type: "string" },
            },
            required: ["city"],
          },
          cache_control: { type: "ephemeral", ttl: "30m" },
        },
      ],
    },
    model: "claude-sonnet-4-6",
    sessionId: "session-preserve",
    preserveCacheControl: true,
  });

  assert.deepEqual(payload.system.at(-1).cache_control, { type: "ephemeral", ttl: "5m" });
  assert.deepEqual(payload.messages[0].content[0].cache_control, { type: "ephemeral" });
  assert.deepEqual(payload.messages[1].content[0].cache_control, {
    type: "ephemeral",
    ttl: "10m",
  });
  assert.deepEqual(payload.messages[2].content[0].cache_control, { type: "ephemeral" });
  assert.deepEqual(payload.tools[0].cache_control, { type: "ephemeral", ttl: "30m" });
});

test("buildClaudeCodeCompatibleRequest supplements missing Claude cache markers in preserve mode", () => {
  const payload = buildClaudeCodeCompatibleRequest({
    sourceBody: {
      max_tokens: 64,
    },
    normalizedBody: {
      max_tokens: 64,
      messages: [{ role: "user", content: "fallback" }],
    },
    claudeBody: {
      system: [{ type: "text", text: "sys" }],
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: "u1" }],
        },
        {
          role: "assistant",
          content: [{ type: "text", text: "a1" }],
        },
        { role: "user", content: [{ type: "text", text: "u2" }] },
      ],
      tools: [
        {
          name: "lookup_weather",
          description: "Fetch weather",
          input_schema: {
            type: "object",
            properties: {
              city: { type: "string" },
            },
            required: ["city"],
          },
        },
      ],
    },
    model: "claude-sonnet-4-6",
    sessionId: "session-preserve-defaults",
    preserveCacheControl: true,
  });

  assert.deepEqual(payload.messages[0].content[0].cache_control, { type: "ephemeral" });
  assert.deepEqual(payload.messages[1].content[0].cache_control, { type: "ephemeral" });
  assert.deepEqual(payload.messages[2].content[0].cache_control, { type: "ephemeral" });
  assert.deepEqual(payload.system.at(-1).cache_control, { type: "ephemeral" });
  assert.deepEqual(payload.tools[0].cache_control, { type: "ephemeral", ttl: "1h" });
});

test("buildClaudeCodeCompatibleRequest upgrades built-in system cache markers when preserved system uses 1h", () => {
  const payload = buildClaudeCodeCompatibleRequest({
    sourceBody: {
      max_tokens: 64,
    },
    normalizedBody: {
      max_tokens: 64,
      messages: [{ role: "user", content: "fallback" }],
    },
    claudeBody: {
      system: [
        { type: "text", text: "prefix", cache_control: { type: "ephemeral" } },
        { type: "text", text: "stable", cache_control: { type: "ephemeral", ttl: "1h" } },
      ],
      messages: [{ role: "user", content: [{ type: "text", text: "u1" }] }],
      tools: [],
    },
    model: "claude-sonnet-4-6",
    sessionId: "session-preserve-system-upgrade",
    preserveCacheControl: true,
  });

  assert.deepEqual(payload.system[1].cache_control, { type: "ephemeral", ttl: "1h" });
  assert.deepEqual(payload.system[2].cache_control, { type: "ephemeral", ttl: "1h" });
  assert.deepEqual(payload.system[3].cache_control, { type: "ephemeral", ttl: "1h" });
  assert.deepEqual(payload.system[4].cache_control, { type: "ephemeral", ttl: "1h" });
});

test("buildClaudeCodeCompatibleRequest marks final user turn and 1h system cache in non-preserve mode", () => {
  const largeUserPrompt = Array.from(
    { length: 200 },
    (_, index) => `Context line ${index + 1}: repeated stable context for cache testing.`
  ).join("\n");

  const payload = buildClaudeCodeCompatibleRequest({
    sourceBody: {
      max_tokens: 64,
    },
    normalizedBody: {
      max_tokens: 64,
      messages: [
        { role: "system", content: "Follow the house style exactly." },
        { role: "user", content: "[Start a new chat]" },
        { role: "assistant", content: "Hello short ack" },
        { role: "user", content: largeUserPrompt },
      ],
    },
    model: "claude-sonnet-4-6",
    sessionId: "session-last-user-cache",
    preserveCacheControl: false,
  });

  assert.deepEqual(payload.system[1].cache_control, { type: "ephemeral", ttl: "1h" });
  assert.deepEqual(payload.system[2].cache_control, { type: "ephemeral", ttl: "1h" });
  assert.deepEqual(payload.system[3].cache_control, { type: "ephemeral", ttl: "1h" });
  assert.deepEqual(payload.messages[0].content[0].cache_control, { type: "ephemeral" });
  assert.deepEqual(payload.messages[1].content[0].cache_control, { type: "ephemeral" });
  assert.deepEqual(payload.messages[2].content[0].cache_control, { type: "ephemeral" });
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
  assert.deepEqual(payload.tools[0].cache_control, { type: "ephemeral", ttl: "1h" });
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
  assert.equal(calls[1].body.stream, true);
  assert.equal(calls[1].headers["x-api-key"], "sk-test");
  assert.equal(calls[1].headers.Accept, "text/event-stream");
});

test("handleChatCore forces upstream streaming for CC compatible while returning JSON to non-stream clients", async () => {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({
      url: String(url),
      method: init.method || "GET",
      headers: init.headers,
      body: init.body ? JSON.parse(String(init.body)) : null,
    });

    return new Response(
      [
        "event: message_start",
        'data: {"type":"message_start","message":{"id":"msg_1","type":"message","role":"assistant","model":"claude-sonnet-4-6","usage":{"input_tokens":7,"output_tokens":0}}}',
        "",
        "event: content_block_start",
        'data: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}',
        "",
        "event: content_block_delta",
        'data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"Hello from CC"}}',
        "",
        "event: message_delta",
        'data: {"type":"message_delta","delta":{"stop_reason":"end_turn"},"usage":{"output_tokens":5}}',
        "",
        "event: message_stop",
        'data: {"type":"message_stop"}',
        "",
      ].join("\n"),
      {
        status: 200,
        headers: {
          "content-type": "text/event-stream",
        },
      }
    );
  };

  const result = await handleChatCore({
    body: {
      model: "claude-sonnet-4-6",
      messages: [{ role: "user", content: "Ping" }],
      stream: false,
    },
    modelInfo: {
      provider: "anthropic-compatible-cc-test",
      model: "claude-sonnet-4-6",
      extendedContext: false,
    },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: {
        baseUrl: "https://proxy.example.com",
        chatPath: CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
      },
    },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: {
        model: "claude-sonnet-4-6",
        messages: [{ role: "user", content: "Ping" }],
        stream: false,
      },
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
    log: {
      debug() {},
      info() {},
      warn() {},
      error() {},
    },
  });

  assert.equal(result.success, true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].headers.Accept, "text/event-stream");
  assert.equal(calls[0].body.stream, true);

  const payload = await result.response.json();
  assert.equal(payload.choices[0].message.content, "Hello from CC");
  assert.equal(payload.choices[0].finish_reason, "stop");
  assert.equal(payload.usage.prompt_tokens, 2007);
  assert.equal(payload.usage.completion_tokens, 5);
});

test("handleChatCore applies OmniRoute-managed cache strategy for CC-compatible requests in auto mode", async () => {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({
      url: String(url),
      method: init.method || "GET",
      headers: init.headers,
      body: init.body ? JSON.parse(String(init.body)) : null,
    });

    return new Response(
      [
        "event: message_start",
        'data: {"type":"message_start","message":{"id":"msg_2","type":"message","role":"assistant","model":"claude-sonnet-4-6","usage":{"input_tokens":12,"output_tokens":0}}}',
        "",
        "event: content_block_start",
        'data: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}',
        "",
        "event: content_block_delta",
        'data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"Preserved"}}',
        "",
        "event: message_delta",
        'data: {"type":"message_delta","delta":{"stop_reason":"end_turn"},"usage":{"output_tokens":3}}',
        "",
        "event: message_stop",
        'data: {"type":"message_stop"}',
        "",
      ].join("\n"),
      {
        status: 200,
        headers: {
          "content-type": "text/event-stream",
        },
      }
    );
  };

  const claudeBody = {
    model: "claude-sonnet-4-6",
    max_tokens: 64,
    system: [{ type: "text", text: "system", cache_control: { type: "ephemeral", ttl: "5m" } }],
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: "u1", cache_control: { type: "ephemeral" } }],
      },
      {
        role: "assistant",
        content: [
          {
            type: "text",
            text: "a1",
            cache_control: { type: "ephemeral", ttl: "10m" },
          },
        ],
      },
      { role: "user", content: [{ type: "text", text: "u2" }] },
    ],
    tools: [
      {
        name: "lookup_weather",
        description: "Fetch weather",
        input_schema: {
          type: "object",
          properties: {
            city: { type: "string" },
          },
        },
        cache_control: { type: "ephemeral", ttl: "30m" },
      },
    ],
  };

  const result = await handleChatCore({
    body: claudeBody,
    modelInfo: {
      provider: "anthropic-compatible-cc-test",
      model: "claude-sonnet-4-6",
      extendedContext: false,
    },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: {
        baseUrl: "https://proxy.example.com",
        chatPath: CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
      },
    },
    clientRawRequest: {
      endpoint: "/v1/messages",
      body: claudeBody,
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "Claude-Code/1.0.0",
    log: {
      debug() {},
      info() {},
      warn() {},
      error() {},
    },
  });

  assert.equal(result.success, true);
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0].body.system.at(-1).cache_control, {
    type: "ephemeral",
    ttl: "1h",
  });
  assert.deepEqual(calls[0].body.messages[0].content[0].cache_control, {
    type: "ephemeral",
  });
  assert.deepEqual(calls[0].body.messages[1].content[0].cache_control, {
    type: "ephemeral",
  });
  assert.deepEqual(calls[0].body.messages[2].content[0].cache_control, {
    type: "ephemeral",
  });
  assert.deepEqual(calls[0].body.tools[0].cache_control, {
    type: "ephemeral",
    ttl: "1h",
  });
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
  assert.equal(data.node.modelsPath, null);
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

test("provider models route reports CC compatible providers do not support models listing", async () => {
  process.env.ENABLE_CC_COMPATIBLE_PROVIDER = "true";

  const connection = await providersDb.createProviderConnection({
    provider: "anthropic-compatible-cc-test",
    authType: "apikey",
    name: "cc-live",
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
      chatPath: CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
    },
  });

  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models`),
    { params: { id: connection.id } }
  );

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: "Provider anthropic-compatible-cc-test does not support models listing",
  });
});
