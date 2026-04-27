import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-stream-false-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");

const originalFetch = globalThis.fetch;

function noopLog() {
  return {
    debug() {},
    info() {},
    warn() {},
    error() {},
  };
}

function createComboLog() {
  const entries = [];
  return {
    info: (tag, msg) => entries.push({ level: "info", tag, msg }),
    warn: (tag, msg) => entries.push({ level: "warn", tag, msg }),
    error: (tag, msg) => entries.push({ level: "error", tag, msg }),
    entries,
  };
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function buildResponsesSse(text = "Brasilia") {
  return new Response(
    [
      "event: response.created",
      'data: {"type":"response.created","response":{"id":"resp_1","model":"gpt-5.3-codex","status":"in_progress","output":[]}}',
      "",
      "event: response.output_text.delta",
      `data: ${JSON.stringify({
        type: "response.output_text.delta",
        output_index: 0,
        delta: text,
      })}`,
      "",
      "event: response.completed",
      `data: ${JSON.stringify({
        type: "response.completed",
        response: {
          id: "resp_1",
          object: "response",
          model: "gpt-5.3-codex",
          status: "completed",
          output: [
            {
              type: "message",
              role: "assistant",
              content: [{ type: "output_text", text }],
            },
          ],
          usage: { input_tokens: 6, output_tokens: 1 },
        },
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

function buildResponsesNdjson(text = "Brasilia") {
  return new Response(
    [
      JSON.stringify({
        type: "response.created",
        response: {
          id: "resp_1",
          model: "gpt-5.3-codex",
          status: "in_progress",
          output: [],
        },
      }),
      JSON.stringify({
        type: "response.output_text.delta",
        output_index: 0,
        delta: text,
      }),
      JSON.stringify({
        type: "response.completed",
        response: {
          id: "resp_1",
          object: "response",
          model: "gpt-5.3-codex",
          status: "completed",
          output: [
            {
              type: "message",
              role: "assistant",
              content: [{ type: "output_text", text }],
            },
          ],
          usage: { input_tokens: 6, output_tokens: 1 },
        },
      }),
    ].join("\n"),
    {
      status: 200,
      headers: { "Content-Type": "application/x-ndjson" },
    }
  );
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function waitForAsyncSideEffects() {
  await new Promise((resolve) => setImmediate(resolve));
  await new Promise((resolve) => setTimeout(resolve, 10));
}

async function invokeChatCore({
  body,
  provider = "openai",
  model = "gpt-4o-mini",
  endpoint = "/v1/chat/completions",
  accept = "application/json",
  responseFactory,
} = {}) {
  const calls = [];

  globalThis.fetch = async (url, init = {}) => {
    const headers =
      init.headers instanceof Headers
        ? Object.fromEntries(init.headers.entries())
        : init.headers || {};
    const call = {
      url: String(url),
      method: init.method || "GET",
      headers,
      body: init.body ? JSON.parse(String(init.body)) : null,
    };
    calls.push(call);
    return responseFactory(call);
  };

  try {
    const requestBody = structuredClone(body);
    const result = await handleChatCore({
      body: requestBody,
      modelInfo: { provider, model, extendedContext: false },
      credentials: {
        apiKey: "sk-test",
        accessToken: "codex-token",
        providerSpecificData: {},
      },
      log: noopLog(),
      clientRawRequest: {
        endpoint,
        body: structuredClone(body),
        headers: new Headers({ accept }),
      },
      userAgent: "unit-test",
    });
    await waitForAsyncSideEffects();
    return { result, calls, call: calls.at(-1) };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("CodexExecutor.transformRequest clones the request body before forcing stream=true", () => {
  const executor = new CodexExecutor();
  const body = {
    model: "gpt-5.4",
    input: [{ role: "user", content: [{ type: "input_text", text: "Oi" }] }],
    stream: false,
    reasoning: { effort: "low" },
  };
  const original = structuredClone(body);

  const transformed = executor.transformRequest("gpt-5.4", body, false, {
    requestEndpointPath: "/responses",
  });

  assert.notStrictEqual(transformed, body);
  assert.deepEqual(body, original);
  assert.equal(transformed.stream, true);
});

test("chatCore converts Responses-style SSE fallback into JSON when stream=false", async () => {
  const { result, call } = await invokeChatCore({
    body: {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: "Qual a capital do Brasil?" }],
    },
    provider: "openai",
    model: "gpt-4o-mini",
    responseFactory: () => buildResponsesSse("Brasilia"),
  });

  const payload = (await result.response.json()) as any;

  assert.equal(result.success, true);
  assert.equal(call.headers.Accept || call.headers.accept, "application/json");
  assert.equal(payload.object, "chat.completion");
  assert.equal(payload.choices[0].message.content, "Brasilia");
  assert.ok(payload.usage.total_tokens >= 7);
  assert.ok(payload.usage.prompt_tokens > 0);
  assert.ok(payload.usage.completion_tokens > 0);
});

test("chatCore converts Responses-style NDJSON fallback into JSON when stream=false", async () => {
  const { result, call } = await invokeChatCore({
    body: {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: "Qual a capital do Brasil?" }],
    },
    provider: "openai",
    model: "gpt-4o-mini",
    responseFactory: () => buildResponsesNdjson("Brasilia"),
  });

  const payload = (await result.response.json()) as any;

  assert.equal(result.success, true);
  assert.equal(call.headers.Accept || call.headers.accept, "application/json");
  assert.equal(payload.object, "chat.completion");
  assert.equal(payload.choices[0].message.content, "Brasilia");
  assert.ok(payload.usage.total_tokens >= 7);
});

test("handleComboChat validates non-stream quality using the original client stream intent", async () => {
  const combo = {
    name: "codex-stream-false-quality",
    models: ["codex/gpt-5.4", "openai/gpt-4o-mini"],
  };
  const log = createComboLog();
  const seenModels = [];

  const result = await handleComboChat({
    body: {
      stream: false,
      messages: [{ role: "user", content: "Qual a capital do Brasil?" }],
    },
    combo,
    handleSingleModel: async (requestBody, modelStr) => {
      seenModels.push(modelStr);
      if (modelStr === "codex/gpt-5.4") {
        requestBody.stream = true;
        return jsonResponse({
          choices: [
            { index: 0, message: { role: "assistant", content: "" }, finish_reason: "stop" },
          ],
        });
      }

      return jsonResponse({
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: "Brasilia" },
            finish_reason: "stop",
          },
        ],
      });
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
  });

  const payload = (await result.json()) as any;

  assert.equal(result.ok, true);
  assert.deepEqual(seenModels, ["codex/gpt-5.4", "openai/gpt-4o-mini"]);
  assert.equal(payload.choices[0].message.content, "Brasilia");
  assert.ok(
    log.entries.some(
      (entry) =>
        entry.level === "warn" &&
        String(entry.msg).includes(
          "failed quality check: empty content and no tool_calls in response"
        )
    )
  );
});
