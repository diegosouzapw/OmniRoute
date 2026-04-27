import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-responses-handler-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleResponsesCore } = await import("../../open-sse/handlers/responsesHandler.ts");

const originalFetch = globalThis.fetch;

function noopLog() {
  return {
    debug() {},
    info() {},
    warn() {},
    error() {},
  };
}

function toPlainHeaders(headers) {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, value == null ? "" : String(value)])
  );
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

function buildJsonResponse(status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function invokeResponsesCore({
  body,
  provider = "openai",
  model = "gpt-4o-mini",
  credentials,
  responseFactory,
  signal,
} = {}) {
  const calls = [];

  globalThis.fetch = async (url, init = {}) => {
    const call = {
      url: String(url),
      method: init.method || "GET",
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
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

test("handleResponsesCore preserves previous_response_id and handles empty input arrays", async () => {
  const { call, result } = await invokeResponsesCore({
    body: {
      model: "gpt-4o-mini",
      input: [],
      previous_response_id: "resp_prev_123",
      metadata: { session: "abc" },
    },
  });

  assert.equal(result.success, true);
  assert.equal(call.body.previous_response_id, "resp_prev_123");
  assert.equal(call.body.metadata, undefined);
  assert.deepEqual(call.body.messages, []);
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
  assert.equal(call.body.previous_response_id, undefined);
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

test("handleResponsesCore propagates upstream failures from chatCore unchanged", async () => {
  const { result } = await invokeResponsesCore({
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

  const payload = (await result.response.json()) as any;
  assert.equal(payload.error.message, "[401]: unauthorized");
});

test("handleResponsesCore rejects invalid Responses API input that cannot be translated", async () => {
  await assert.rejects(
    () =>
      handleResponsesCore({
        body: {
          model: "gpt-4o-mini",
          input: "hello",
          tools: [{ type: "web_search_preview" }],
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
      error instanceof Error &&
      error.message.includes("web_search_preview tool type is not supported")
  );
});

test("handleResponsesCore injects SSE keepalive comments for Responses streams", async () => {
  const originalSetInterval = globalThis.setInterval;
  const originalClearInterval = globalThis.clearInterval;
  const intervals = [];
  let nextId = 0;

  globalThis.setInterval = (callback, delay = 0, ...args) => {
    const interval = {
      id: ++nextId,
      callback,
      delay,
      args,
      cleared: false,
    };
    intervals.push(interval);
    return interval;
  };

  globalThis.clearInterval = (interval) => {
    if (interval && typeof interval === "object") {
      interval.cleared = true;
    }
  };

  try {
    const { result } = await invokeResponsesCore({
      body: {
        model: "gpt-4o-mini",
        input: "hello",
      },
    });

    assert.equal(result.success, true);
    const heartbeatInterval = intervals.find((interval) => interval.delay === 15000);
    assert.ok(heartbeatInterval, "expected a 15s heartbeat interval");

    await heartbeatInterval.callback(...heartbeatInterval.args);
    const sse = await result.response.text();

    assert.match(sse, /^: keepalive .*$/m);
    assert.match(sse, /event: response\.created/);
    assert.match(sse, /data: \[DONE\]/);
    assert.equal(heartbeatInterval.cleared, true);
  } finally {
    globalThis.setInterval = originalSetInterval;
    globalThis.clearInterval = originalClearInterval;
  }
});

test("handleResponsesCore clears heartbeat timers immediately when the request signal aborts", async () => {
  const originalSetInterval = globalThis.setInterval;
  const originalClearInterval = globalThis.clearInterval;
  const intervals = [];
  let nextId = 0;

  globalThis.setInterval = (callback, delay = 0, ...args) => {
    const interval = {
      id: ++nextId,
      callback,
      delay,
      args,
      cleared: false,
    };
    intervals.push(interval);
    return interval;
  };

  globalThis.clearInterval = (interval) => {
    if (interval && typeof interval === "object") {
      interval.cleared = true;
    }
  };

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
    const heartbeatInterval = intervals.find((interval) => interval.delay === 15000);
    assert.ok(heartbeatInterval, "expected a 15s heartbeat interval");

    controller.abort();
    assert.equal(heartbeatInterval.cleared, true);
    await result.response.body?.cancel();
  } finally {
    globalThis.setInterval = originalSetInterval;
    globalThis.clearInterval = originalClearInterval;
  }
});
