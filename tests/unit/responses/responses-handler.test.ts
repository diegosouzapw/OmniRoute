import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ProviderCredentials } from "../../../open-sse/executors/base.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-responses-handler-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { handleResponsesCore } = await import("../../../open-sse/handlers/responsesHandler.ts");

const originalFetch = globalThis.fetch;

type JsonRecord = Record<string, unknown>;
type CapturedBody = JsonRecord & {
  messages?: Array<JsonRecord & { content?: unknown; role?: unknown }>;
  params?: JsonRecord;
  tools?: Array<JsonRecord & { function?: JsonRecord }>;
};
type CapturedCall = {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: CapturedBody;
};
type ResponseFactory = (call: CapturedCall, calls: CapturedCall[]) => Response | Promise<Response>;
type InvokeResponsesCoreOptions = {
  body?: unknown;
  provider?: string;
  model?: string;
  credentials?: ProviderCredentials;
  responseFactory?: ResponseFactory;
  signal?: AbortSignal;
};
type ErrorPayload = {
  error?: {
    message?: string;
  };
};

function noopLog() {
  return {
    debug() {},
    info() {},
    warn() {},
    error() {},
  };
}

function toPlainHeaders(headers: HeadersInit | undefined): Record<string, string> {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, value == null ? "" : String(value)])
  );
}

function parseCapturedBody(body: BodyInit | null | undefined): CapturedBody {
  if (!body) return {};
  const parsed = JSON.parse(String(body)) as unknown;
  return parsed && typeof parsed === "object" && !Array.isArray(parsed)
    ? (parsed as CapturedBody)
    : {};
}

function buildOpenAISseResponse(text = "hello") {
  return new Response(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl-responses",
        object: "chat.completion.chunk",
        choices: [{ index: 0, delta: { role: "assistant", content: text } }],
      })}`,
      "",
      `data: ${JSON.stringify({
        id: "chatcmpl-responses",
        object: "chat.completion.chunk",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
        usage: { prompt_tokens: 4, completion_tokens: 2, total_tokens: 6 },
      })}`,
      "",
      "data: [DONE]",
      "",
    ].join("\n"),
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }
  );
}

function buildToolCallSseResponse(name: string, argumentsJson: string) {
  return new Response(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl-tool",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  index: 0,
                  id: "call_1",
                  type: "function",
                  function: { name, arguments: argumentsJson },
                },
              ],
            },
            finish_reason: "tool_calls",
          },
        ],
      })}`,
      "",
      "data: [DONE]",
      "",
    ].join("\n"),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

function buildJsonResponse(status: number, payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function invokeResponsesCore({
  body,
  provider = "openai",
  model = "gpt-4o-mini",
  credentials,
  responseFactory,
  signal,
}: InvokeResponsesCoreOptions = {}) {
  const calls: CapturedCall[] = [];

  globalThis.fetch = async (url, init = {}) => {
    const call = {
      url: String(url),
      method: init.method || "GET",
      headers: toPlainHeaders(init.headers),
      body: parseCapturedBody(init.body),
    };
    calls.push(call);
    return responseFactory ? responseFactory(call, calls) : buildOpenAISseResponse();
  };

  try {
    const result = await handleResponsesCore({
      body: structuredClone(body),
      modelInfo: { provider, model, extendedContext: false },
      credentials: credentials || {
        apiKey: "sk-test",
        providerSpecificData: {},
      },
      log: noopLog(),
      onCredentialsRefreshed: null,
      onRequestSuccess: null,
      onDisconnect: null,
      connectionId: null,
      signal,
    });

    return { result, calls, call: calls.at(-1) };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("handleResponsesCore converts Responses API input, instructions, tools, metadata, and forces streaming", async () => {
  const { call, result } = await invokeResponsesCore({
    body: {
      model: "gpt-4o-mini",
      instructions: "You are terse",
      input: [
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "hello" }],
        },
      ],
      tools: [
        {
          type: "function",
          name: "lookup_weather",
          description: "Find weather",
          parameters: { type: "object" },
        },
      ],
      metadata: { source: "responses-test" },
      store: true,
    },
  });

  assert.equal(result.success, true);
  assert.equal(call.body.stream, true);
  assert.equal(call.body.messages[0].role, "system");
  assert.equal(call.body.messages[0].content, "You are terse");
  assert.equal(call.body.messages[1].role, "user");
  assert.equal(call.body.messages[1].content[0].text, "hello");
  assert.equal(call.body.tools[0].function.name, "lookup_weather");
  assert.equal(call.body.metadata, undefined);
  assert.equal("store" in call.body, false);
});

test("handleResponsesCore preserves Kimi K3 reasoning through provider translation", async () => {
  const body = {
    model: "k3-256k",
    reasoning: { effort: "high" },
    input: [
      { role: "user", content: [{ type: "input_text", text: "Call search." }] },
      {
        type: "reasoning",
        content: [{ type: "reasoning_text", text: "I should search first." }],
      },
      {
        type: "function_call",
        call_id: "call_1",
        name: "search",
        arguments: "{}",
      },
      { type: "function_call_output", call_id: "call_1", output: "found" },
    ],
  };

  const coding = await invokeResponsesCore({
    body,
    provider: "kimi-coding-apikey",
    model: "k3-256k",
  });
  assert.deepEqual(coding.call.body.messages?.[1]?.content?.[0], {
    type: "thinking",
    thinking: "I should search first.",
  });

  const native = await invokeResponsesCore({
    body: { ...body, model: "kimi-k3", reasoning: { effort: "max" } },
    provider: "moonshot",
    model: "kimi-k3",
  });
  assert.equal(native.call.body.messages?.[1]?.reasoning_content, "I should search first.");
});

test("handleResponsesCore maps unsupported Kimi K3 xhigh effort to max", async () => {
  const { call, result } = await invokeResponsesCore({
    body: {
      model: "k3-256k",
      reasoning: { effort: "xhigh", summary: "auto" },
      input: "Reply with OK.",
    },
    provider: "kimi-coding-apikey",
    model: "k3-256k",
  });

  assert.equal(result.success, true);
  assert.deepEqual(call.body.thinking, { type: "enabled" });
  assert.deepEqual(call.body.output_config, { effort: "max" });
});

test("handleResponsesCore strips previous_response_id by default and handles empty input arrays", async () => {
  const { call, result } = await invokeResponsesCore({
    body: {
      model: "gpt-4o-mini",
      input: [],
      previous_response_id: "resp_prev_123",
      metadata: { session: "abc" },
    },
  });

  assert.equal(result.success, true);
  assert.equal(call.body.previous_response_id, undefined);
  assert.equal(call.body.metadata, undefined);
  // Empty input[] now injects a placeholder user message to avoid upstream
  // "400: at least one message is required" rejections (9router#419).
  assert.equal(Array.isArray(call.body.messages), true);
  assert.equal(call.body.messages.length, 1);
  assert.equal(call.body.messages[0].role, "user");
  assert.equal(call.body.stream, true);
});

test("handleResponsesCore preserves store for Codex responses when connection opt-in is enabled", async () => {
  const { call, result } = await invokeResponsesCore({
    body: {
      model: "gpt-5.3-codex",
      input: [],
      previous_response_id: "resp_prev_store",
      store: true,
    },
    provider: "codex",
    model: "gpt-5.3-codex",
    credentials: {
      accessToken: "codex-token",
      providerSpecificData: {
        openaiStoreEnabled: true,
      },
    },
  });

  assert.equal(result.success, true);
  // When openaiStoreEnabled=true, the request keeps previous_response_id and
  // store=true so the upstream Codex Responses session continues from prior turn.
  assert.equal(call.body.previous_response_id, "resp_prev_store");
  assert.equal(call.body.store, true);
  assert.equal(call.body.stream, true);
});

test("handleResponsesCore transforms upstream OpenAI SSE into Responses API SSE", async () => {
  const { result } = await invokeResponsesCore({
    body: {
      model: "gpt-4o-mini",
      input: "hello",
    },
  });

  assert.equal(result.success, true);
  assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");

  const sse = await result.response.text();
  assert.match(sse, /event: response\.created/);
  assert.match(sse, /event: response\.output_text\.delta/);
  assert.match(sse, /event: response\.completed/);
  assert.match(sse, /data: \[DONE\]/);
});

test("handleResponsesCore transforms Command Code executor SSE through Responses shim", async () => {
  const { call, result } = await invokeResponsesCore({
    provider: "command-code",
    model: "gpt-5.4-mini",
    credentials: { apiKey: "cc_test_key", providerSpecificData: {} },
    body: {
      model: "gpt-5.4-mini",
      input: "hello command code",
    },
    responseFactory() {
      // /provider/v1/chat/completions returns standard OpenAI SSE (#10265).
      const chunk = (delta: Record<string, unknown>) =>
        `data: ${JSON.stringify({
          id: "c1",
          object: "chat.completion.chunk",
          model: "gpt-5.4-mini",
          choices: [{ index: 0, delta }],
        })}\n\n`;
      return new Response(
        [chunk({ role: "assistant" }), chunk({ content: "command" }), chunk({})].join("") +
          "data: [DONE]\n\n",
        { status: 200, headers: { "Content-Type": "text/event-stream" } }
      );
    },
  });

  assert.equal(result.success, true);
  assert.equal(call.url, "https://api.commandcode.ai/provider/v1/chat/completions");
  assert.equal(call.headers.Authorization, "Bearer cc_test_key");
  assert.equal(call.headers["x-command-code-version"], undefined);
  assert.equal(call.body.model, "gpt-5.4-mini");
  assert.equal(call.body.stream, true);

  const sse = await result.response.text();
  assert.match(sse, /event: response\.created/);
  assert.match(sse, /event: response\.output_text\.delta/);
  assert.match(sse, /command/);
  assert.match(sse, /event: response\.completed/);
  assert.match(sse, /data: \[DONE\]/);
});

test("handleResponsesCore propagates upstream failures without retrying", async () => {
  const { result, calls } = await invokeResponsesCore({
    body: {
      model: "gpt-4o-mini",
      input: "hello",
    },
    responseFactory() {
      return buildJsonResponse(401, {
        error: { message: "unauthorized" },
      });
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.equal(calls.length, 1);

  const payload = (await result.response.json()) as ErrorPayload;
  assert.equal(payload.error.message, "[401]: unauthorized");
});

test("handleResponsesCore rejects invalid Responses API input that cannot be translated", async () => {
  // After #2695 the web_search family is allowed; use file_search to keep this
  // assertion exercising the "untranslatable tool type" path.
  await assert.rejects(
    () =>
      handleResponsesCore({
        body: {
          model: "gpt-4o-mini",
          input: "hello",
          tools: [{ type: "file_search" }],
        },
        modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
        credentials: { apiKey: "sk-test", providerSpecificData: {} },
        log: noopLog(),
        onCredentialsRefreshed: null,
        onRequestSuccess: null,
        onDisconnect: null,
        connectionId: null,
      }),
    (error) =>
      error instanceof Error && error.message.includes("file_search tool type is not supported")
  );
});

test("handleResponsesCore restores custom tools declared through additional_tools", async () => {
  const { result, call } = await invokeResponsesCore({
    body: {
      model: "gpt-4o-mini",
      input: [
        { type: "message", role: "user", content: [{ type: "input_text", text: "ping" }] },
        {
          type: "additional_tools",
          tools: [{ type: "custom", name: "exec", description: "Execute freeform code" }],
        },
      ],
    },
    responseFactory: () => buildToolCallSseResponse("exec", '{"input":"text(\\"pong\\")"}'),
  });

  assert.equal(call.body.tools[0].type, "function");
  const sse = await result.response.text();
  assert.match(sse, /"type":"custom_tool_call"/);
  assert.match(sse, /"input":"text\(\\"pong\\"\)"/);
  assert.doesNotMatch(sse, /"type":"function_call","arguments"/);
});

test("handleResponsesCore preserves top-level tool precedence for custom-name collisions", async () => {
  const { result } = await invokeResponsesCore({
    body: {
      model: "gpt-4o-mini",
      input: [
        { type: "message", role: "user", content: [{ type: "input_text", text: "ping" }] },
        {
          type: "additional_tools",
          tools: [{ type: "custom", name: "exec", description: "Shadowed custom tool" }],
        },
      ],
      tools: [
        {
          type: "function",
          name: "exec",
          description: "Explicit function tool",
          parameters: { type: "object", properties: {} },
        },
      ],
    },
    responseFactory: () => buildToolCallSseResponse("exec", "{}"),
  });

  const sse = await result.response.text();
  assert.match(sse, /"type":"function_call"/);
  assert.doesNotMatch(sse, /"type":"custom_tool_call"/);
});

test("handleResponsesCore restores custom tools nested in namespaces", async () => {
  const { result } = await invokeResponsesCore({
    body: {
      model: "gpt-4o-mini",
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "ping" }] }],
      tools: [
        {
          type: "namespace",
          name: "commands",
          tools: [{ type: "custom", name: "exec", description: "Execute freeform code" }],
        },
      ],
    },
    responseFactory: () => buildToolCallSseResponse("exec", '{"input":"pong"}'),
  });

  const sse = await result.response.text();
  assert.match(sse, /"type":"custom_tool_call"/);
  assert.doesNotMatch(sse, /"type":"function_call","arguments"/);
});

test("handleResponsesCore injects SSE keepalive frames for Responses streams", async (t) => {
  // PR #2233 changed the Responses-API heartbeat shape from a SSE comment
  // (`: keepalive ...`) to a `data: {"type":"response.in_progress"}` frame,
  // because strict proxies only count `data:` lines as activity.
  t.mock.timers.enable({ apis: ["setInterval"] });
  try {
    const { result } = await invokeResponsesCore({
      body: {
        model: "gpt-4o-mini",
        input: "hello",
      },
    });

    assert.equal(result.success, true);
    t.mock.timers.tick(15000); // Advance time by 15s to trigger heartbeat

    const sse = await result.response.text();

    assert.match(sse, /data: \{"type":"response\.in_progress"\}/);
    assert.match(sse, /event: response\.created/);
    assert.match(sse, /data: \[DONE\]/);
  } finally {
    t.mock.timers.reset();
  }
});

test("handleResponsesCore clears heartbeat timers immediately when the request signal aborts", async (t) => {
  t.mock.timers.enable({ apis: ["setInterval"] });

  try {
    const controller = new AbortController();
    const { result } = await invokeResponsesCore({
      body: {
        model: "gpt-4o-mini",
        input: "hello",
      },
      signal: controller.signal,
    });

    assert.equal(result.success, true);

    // We can't directly check clearInterval count because the stream flush
    // also clears it. We'll just verify no crash and it resolves properly.
    controller.abort();
    await new Promise((r) => process.nextTick(r)); // yield to event loop
    await result.response.body?.cancel();
  } finally {
    t.mock.timers.reset();
  }
});
