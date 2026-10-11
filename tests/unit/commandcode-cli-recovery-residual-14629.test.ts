import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { MockAgent, fetch as mockableFetch } from "undici";

const isolatedRoot = fs.mkdtempSync(path.join(os.tmpdir(), "commandcode-cli-14629-"));
for (const [key, directory] of Object.entries({
  HOME: "home",
  DATA_DIR: "data",
  OMNIROUTE_PLUGINS_DIR: "plugins",
  XDG_CONFIG_HOME: "config",
  XDG_CACHE_HOME: "cache",
  XDG_DATA_HOME: "xdg-data",
})) {
  const target = path.join(isolatedRoot, directory);
  fs.mkdirSync(target);
  process.env[key] = target;
}
process.env.JWT_SECRET = "synthetic-commandcode-cli-jwt-14629";
process.env.API_KEY_SECRET = "synthetic-commandcode-cli-api-14629";
process.env.INITIAL_PASSWORD = "synthetic-unused-password-14629";
delete process.env.OMNIROUTE_REASONING_EFFORT_PROBE_PROVIDERS;

const originalFetch = globalThis.fetch;
const originalConnect = net.Socket.prototype.connect;
let socketAttempts = 0;
net.Socket.prototype.connect = function () {
  socketAttempts++;
  throw new Error("CommandCode fixture forbids real sockets");
};
globalThis.fetch = async () => {
  throw new Error("CommandCode fixture requires an explicit mocked transport");
};

const { CommandCodeExecutor } = await import("../../open-sse/executors/commandCode.ts");
const { __test_resetLearnedReasoningEffortCaps } =
  await import("../../open-sse/services/learnedReasoningEffortCaps.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

type JsonRecord = Record<string, unknown>;
type FetchCall = { url: string; body: JsonRecord; headers: Headers; signal: AbortSignal | null };
type Reply = { path: string; status: number; body: string; contentType?: string };
const ORIGIN = "https://api.commandcode.ai";
const CHAT_PATH = "/provider/v1/chat/completions";
const CLI_PATH = "/alpha/generate";
const MODEL = "command-code/meituan/LongCat-2.0";
const ENUM_ERROR = JSON.stringify({
  error: {
    message: 'Invalid option: expected one of "low", "medium", "high"',
    param: "params.reasoning_effort",
  },
});
const CLI_SUCCESS =
  'data: {"type":"text-delta","text":"recovered"}\n\n' +
  'data: {"type":"finish","finishReason":"stop","usage":{"inputTokens":2,"outputTokens":3,"totalTokens":5}}\n\n';

function record(value: unknown): JsonRecord {
  assert.ok(value && typeof value === "object" && !Array.isArray(value));
  return value as JsonRecord;
}

function installTransport(
  t: test.TestContext,
  replies: Reply[],
  beforeDispatch?: (count: number) => void
): FetchCall[] {
  const agent = new MockAgent();
  agent.disableNetConnect();
  const pool = agent.get(ORIGIN);
  for (const reply of replies) {
    pool.intercept({ path: reply.path, method: "POST" }).reply(reply.status, reply.body, {
      headers: {
        "content-type":
          reply.contentType ?? (reply.status === 200 ? "text/event-stream" : "application/json"),
      },
    });
  }
  const calls: FetchCall[] = [];
  globalThis.fetch = async (input, options = {}) => {
    const url = String(input);
    calls.push({
      url,
      body: JSON.parse(String(options.body)),
      headers: new Headers(options.headers),
      signal: options.signal ?? null,
    });
    beforeDispatch?.(calls.length);
    const upstream = await mockableFetch(url, {
      method: options.method,
      headers: Object.fromEntries(new Headers(options.headers)),
      body: String(options.body),
      signal: options.signal,
      dispatcher: agent,
    });
    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: Object.fromEntries(upstream.headers),
    });
  };
  t.after(async () => {
    await agent.close();
    globalThis.fetch = originalFetch;
  });
  return calls;
}

test.beforeEach(() => {
  __test_resetLearnedReasoningEffortCaps();
});
test.after(() => {
  __test_resetLearnedReasoningEffortCaps();
  resetDbInstance();
  globalThis.fetch = originalFetch;
  net.Socket.prototype.connect = originalConnect;
  fs.rmSync(isolatedRoot, { recursive: true, force: true });
  assert.equal(socketAttempts, 0, "all dispatches must remain inside MockAgent");
});

test("#14629 control: public execute wraps a successful CLI fallback after primary403", async (t) => {
  const calls = installTransport(t, [
    { path: CHAT_PATH, status: 403, body: '{"error":"upgrade_required"}' },
    { path: CLI_PATH, status: 200, body: CLI_SUCCESS },
  ]);
  const result = await new CommandCodeExecutor().execute({
    model: MODEL,
    body: { messages: [{ role: "user", content: "hello" }] },
    stream: false,
    credentials: { apiKey: "synthetic-commandcode-key" },
  });
  assert.equal(calls.length, 2);
  assert.equal(result.response.status, 200);
  assert.equal((await result.response.json()).choices[0].message.content, "recovered");
  assert.equal(record(calls[1].body.params).model, "meituan/LongCat-2.0");
  assert.equal(record(calls[1].body.config).workingDir, "/workspace");
});

test("#14629 CLI400 enum retries params inside the original envelope and reports the sent body", async (t) => {
  const calls = installTransport(t, [
    { path: CHAT_PATH, status: 403, body: '{"error":"upgrade_required"}' },
    { path: CLI_PATH, status: 400, body: ENUM_ERROR },
    { path: CLI_PATH, status: 200, body: CLI_SUCCESS },
  ]);
  const body = {
    messages: [{ role: "user", content: "hello" }],
    reasoning_effort: "xhigh",
    max_tokens: 73,
  };
  const originalBody = structuredClone(body);
  const signal = new AbortController().signal;
  const result = await new CommandCodeExecutor().execute({
    model: MODEL,
    body,
    stream: false,
    credentials: { apiKey: "synthetic-commandcode-key" },
    signal,
    upstreamExtraHeaders: { "x-fixture-trace": "commandcode-recovery-14629" },
  });
  assert.equal(calls.length, 3, "primary403 + CLI400 + recovered CLI retry");
  assert.equal(result.response.status, 200);
  assert.deepEqual(
    calls.map((call) => call.url),
    [ORIGIN + CHAT_PATH, ORIGIN + CLI_PATH, ORIGIN + CLI_PATH]
  );
  assert.equal(record(calls[1].body.params).reasoning_effort, "xhigh");
  assert.equal(record(calls[2].body.params).reasoning_effort, "high");
  const expectedEnvelope = structuredClone(calls[1].body);
  record(expectedEnvelope.params).reasoning_effort = "high";
  assert.deepEqual(calls[2].body, expectedEnvelope, "only params effort changes on the wire");
  assert.deepEqual(result.transformedBody, calls[2].body);
  assert.equal(record(calls[2].body.config).workingDir, "/workspace");
  assert.equal(record(calls[2].body.params).model, "meituan/LongCat-2.0");
  assert.equal(record(calls[2].body.params).max_tokens, 73);
  assert.deepEqual([...calls[2].headers], [...calls[1].headers]);
  assert.equal(calls[2].headers.get("x-fixture-trace"), "commandcode-recovery-14629");
  assert.ok(calls.every((call) => call.signal === signal));
  assert.deepEqual(body, originalBody);
  const payload = await result.response.json();
  assert.equal(payload.choices[0].message.content, "recovered");
  assert.equal(payload.usage.total_tokens, 5);
});

for (const status of [400, 422, 401, 429, 503]) {
  test(`#14629 CLI ${status} without a recognized enum preserves the error without retry`, async (t) => {
    const error = JSON.stringify({ error: { message: "fixture rejection" } });
    const calls = installTransport(t, [
      { path: CHAT_PATH, status: 403, body: "forbidden" },
      { path: CLI_PATH, status, body: error },
    ]);
    const result = await new CommandCodeExecutor().execute({
      model: MODEL,
      body: { messages: [{ role: "user", content: "hello" }], reasoning_effort: "xhigh" },
      stream: false,
      credentials: { apiKey: "synthetic-commandcode-key" },
    });
    assert.equal(calls.length, 2);
    assert.equal(result.response.status, status);
    assert.equal(await result.response.text(), error);
    assert.equal(record(record(result.transformedBody).params).reasoning_effort, "xhigh");
  });
}

test("#14629 CLI repeated enum rejection is bounded to one retry", async (t) => {
  const calls = installTransport(t, [
    { path: CHAT_PATH, status: 404, body: "missing provider model" },
    { path: CLI_PATH, status: 400, body: ENUM_ERROR },
    { path: CLI_PATH, status: 400, body: ENUM_ERROR },
  ]);
  const result = await new CommandCodeExecutor().execute({
    model: MODEL,
    body: { messages: [{ role: "user", content: "hello" }], reasoning_effort: "xhigh" },
    stream: false,
    credentials: { apiKey: "synthetic-commandcode-key" },
  });
  assert.equal(calls.length, 3);
  assert.equal(result.response.status, 400);
  assert.equal(await result.response.text(), ENUM_ERROR);
  assert.deepEqual(result.transformedBody, calls[2].body);
});

test("#14629 Responses projection keeps nested reasoning and instructions through CLI422 recovery", async (t) => {
  const calls = installTransport(t, [
    { path: "/provider/v1/responses", status: 403, body: "forbidden" },
    {
      path: CLI_PATH,
      status: 422,
      body: ENUM_ERROR.replace("params.reasoning_effort", "params.reasoning.effort"),
    },
    { path: CLI_PATH, status: 200, body: CLI_SUCCESS },
  ]);
  const body = {
    input: "hello",
    instructions: "be concise",
    reasoning: { effort: "xhigh", summary: "auto" },
    max_output_tokens: 81,
  };
  const original = structuredClone(body);
  const result = await new CommandCodeExecutor().execute({
    model: MODEL,
    body,
    stream: false,
    credentials: { apiKey: "synthetic-commandcode-key" },
  });
  assert.equal(calls.length, 3);
  const params = record(calls[2].body.params);
  assert.deepEqual(params.reasoning, { effort: "high", summary: "auto" });
  assert.equal(params.system, "be concise");
  assert.equal(params.max_tokens, 81);
  assert.deepEqual(params.messages, [{ role: "user", content: "hello" }]);
  assert.deepEqual(body, original);
  assert.equal((await result.response.json()).choices[0].message.content, "recovered");
});

test("#14629 unrepresentable Responses input never reaches CLI", async (t) => {
  const calls = installTransport(t, [
    { path: "/provider/v1/responses", status: 403, body: "forbidden" },
  ]);
  const result = await new CommandCodeExecutor().execute({
    model: MODEL,
    body: { input: [{ type: "reasoning", id: "opaque" }], reasoning: { effort: "xhigh" } },
    stream: false,
    credentials: { apiKey: "synthetic-commandcode-key" },
  });
  assert.equal(calls.length, 1);
  assert.equal(result.response.status, 403);
  assert.equal(await result.response.text(), "forbidden");
});

for (const stream of [false, true]) {
  test(`#14629 CLI recovered tool names remain private and unwrap for stream=${stream}`, async (t) => {
    const success =
      'data: {"type":"tool-call","toolCallId":"call1","toolName":"omniroute_tool_search","args":{"q":"hello"}}\n\n' +
      CLI_SUCCESS;
    const calls = installTransport(t, [
      { path: CHAT_PATH, status: 403, body: "forbidden" },
      { path: CLI_PATH, status: 400, body: ENUM_ERROR },
      { path: CLI_PATH, status: 200, body: success },
    ]);
    const result = await new CommandCodeExecutor().execute({
      model: MODEL,
      body: {
        messages: [{ role: "user", content: "hello" }],
        reasoning_effort: "xhigh",
        tools: [
          { type: "function", function: { name: "tool_search", parameters: { type: "object" } } },
        ],
      },
      stream,
      credentials: { apiKey: "synthetic-commandcode-key" },
    });
    assert.equal(calls.length, 3);
    assert.deepEqual(Object.keys(calls[2].body).sort(), [
      "config",
      "memory",
      "params",
      "permissionMode",
      "skills",
      "taste",
    ]);
    assert.deepEqual(record(calls[2].body.params).tools, record(calls[1].body.params).tools);
    assert.ok(JSON.stringify(calls[2].body).includes("omniroute_tool_search"));
    const text = await result.response.text();
    assert.ok(text.includes('"name":"tool_search"'), text);
    assert.ok(!text.includes("omniroute_tool_search"));
    assert.ok(text.includes('"total_tokens":5'));
    if (stream) assert.ok(text.includes("data: [DONE]"));
  });
}

test("#14629 CLI learned effort is reused only for the same provider/model", async (t) => {
  const calls = installTransport(t, [
    { path: CHAT_PATH, status: 403, body: "forbidden" },
    { path: CLI_PATH, status: 400, body: ENUM_ERROR },
    { path: CLI_PATH, status: 200, body: CLI_SUCCESS },
    { path: CHAT_PATH, status: 403, body: "forbidden" },
    { path: CLI_PATH, status: 200, body: CLI_SUCCESS },
    { path: CHAT_PATH, status: 403, body: "forbidden" },
    { path: CLI_PATH, status: 200, body: CLI_SUCCESS },
  ]);
  const executor = new CommandCodeExecutor();
  for (const model of [MODEL, MODEL, "command-code/another-model"]) {
    const result = await executor.execute({
      model,
      body: { messages: [{ role: "user", content: "hello" }], reasoning_effort: "xhigh" },
      stream: false,
      credentials: { apiKey: "synthetic-commandcode-key" },
    });
    assert.equal(result.response.status, 200);
    await result.response.text();
  }
  assert.equal(calls.length, 7);
  assert.equal(calls[3].body.reasoning_effort, "high");
  assert.equal(record(calls[4].body.params).reasoning_effort, "high");
  assert.equal(calls[5].body.reasoning_effort, "xhigh");
  assert.equal(record(calls[6].body.params).reasoning_effort, "xhigh");
});

const FIELD_ERROR = JSON.stringify({ error: { message: "Unsupported parameter: verbosity" } });
const PRIMARY_SUCCESS = JSON.stringify({
  id: "primary-recovered",
  choices: [{ message: { content: "primary recovered" } }],
  usage: { total_tokens: 5 },
});
for (const reasoningFirst of [false, true]) {
  test(`#14629 primary known-field400 recovery after reasoning=${reasoningFirst} preserves the actual request`, async (t) => {
    const calls = installTransport(t, [
      ...(reasoningFirst
        ? [
            {
              path: CHAT_PATH,
              status: 400,
              body: ENUM_ERROR.replace("params.reasoning_effort", "reasoning_effort"),
            },
          ]
        : []),
      { path: CHAT_PATH, status: 400, body: FIELD_ERROR },
      { path: CHAT_PATH, status: 200, body: PRIMARY_SUCCESS },
    ]);
    const body = {
      messages: [{ role: "user", content: "hello" }],
      verbosity: "high",
      reasoning_effort: "xhigh",
      max_tokens: 97,
    };
    const original = structuredClone(body);
    const signal = new AbortController().signal;
    const result = await new CommandCodeExecutor().execute({
      model: MODEL,
      body,
      stream: false,
      credentials: { apiKey: "synthetic-commandcode-key" },
      signal,
      upstreamExtraHeaders: { "x-fixture-trace": "primary-recovery" },
    });
    assert.equal(calls.length, reasoningFirst ? 3 : 2);
    assert.equal(result.response.status, 200);
    assert.equal(await result.response.text(), PRIMARY_SUCCESS);
    const expected = structuredClone(calls[0].body);
    delete expected.verbosity;
    if (reasoningFirst) expected.reasoning_effort = "high";
    const last = calls.at(-1)!;
    assert.deepEqual(last.body, expected);
    assert.deepEqual(result.transformedBody, last.body);
    assert.ok(calls.every((call) => call.url === ORIGIN + CHAT_PATH && call.signal === signal));
    for (const call of calls) assert.deepEqual([...call.headers], [...calls[0].headers]);
    assert.equal(last.headers.get("x-fixture-trace"), "primary-recovery");
    assert.deepEqual(body, original);
  });
}

for (const [name, status, error, verbosity] of [
  ["opaque400", 400, '{"error":{"message":"invalid request"}}', "high"],
  ["field absent", 400, FIELD_ERROR, undefined],
  ["422 field", 422, FIELD_ERROR, "high"],
  ["401 field", 401, FIELD_ERROR, "high"],
  ["429 field", 429, FIELD_ERROR, "high"],
  ["503 field", 503, FIELD_ERROR, "high"],
] as const) {
  test(`#14629 primary ${name} remains unchanged without a field retry`, async (t) => {
    const calls = installTransport(t, [{ path: CHAT_PATH, status, body: error }]);
    const result = await new CommandCodeExecutor().execute({
      model: MODEL,
      body: { messages: [{ role: "user", content: "hello" }], verbosity },
      stream: false,
      credentials: { apiKey: "synthetic-commandcode-key" },
    });
    assert.equal(calls.length, 1);
    assert.equal(result.response.status, status);
    assert.equal(await result.response.text(), error);
  });
}

test("#14629 primary repeated field400 stops after a single retry", async (t) => {
  const calls = installTransport(t, [
    { path: CHAT_PATH, status: 400, body: FIELD_ERROR },
    { path: CHAT_PATH, status: 400, body: FIELD_ERROR },
  ]);
  const result = await new CommandCodeExecutor().execute({
    model: MODEL,
    body: { messages: [{ role: "user", content: "hello" }], verbosity: "high" },
    stream: false,
    credentials: { apiKey: "synthetic-commandcode-key" },
  });
  assert.equal(calls.length, 2);
  assert.equal(result.response.status, 400);
  assert.equal(await result.response.text(), FIELD_ERROR);
  assert.equal(calls[1].body.verbosity, undefined);
  assert.deepEqual(result.transformedBody, calls[1].body);
});

for (const surface of ["responses", "claude", "chat-stream"] as const) {
  test(`#14629 primary field retry preserves ${surface} wire protocol`, async (t) => {
    const urlPath =
      surface === "responses"
        ? "/provider/v1/responses"
        : surface === "claude"
          ? "/provider/v1/messages"
          : CHAT_PATH;
    const stream = surface === "chat-stream";
    const responseBody =
      surface === "responses"
        ? '{"id":"resp1","object":"response","output":[]}'
        : surface === "claude"
          ? '{"id":"msg1","type":"message","content":[{"type":"text","text":"hello"}],"stop_reason":"end_turn"}'
          : 'data: {"choices":[{"delta":{"content":"hello"}}]}\n\ndata: [DONE]\n\n';
    const contentType = stream ? "text/event-stream" : "application/json";
    const calls = installTransport(t, [
      { path: urlPath, status: 400, body: FIELD_ERROR },
      { path: urlPath, status: 200, body: responseBody, contentType },
    ]);
    const body =
      surface === "responses"
        ? { input: "hello", instructions: "be concise", max_output_tokens: 67, verbosity: "high" }
        : { messages: [{ role: "user", content: "hello" }], max_tokens: 67, verbosity: "high" };
    const original = structuredClone(body);
    const result = await new CommandCodeExecutor().execute({
      model: surface === "claude" ? "claude-sonnet-4-6" : MODEL,
      body,
      stream,
      credentials: { apiKey: "synthetic-commandcode-key" },
    });
    assert.equal(calls.length, 2);
    assert.equal(result.url, ORIGIN + urlPath);
    assert.equal(result.response.status, 200);
    assert.equal(result.response.headers.get("content-type"), contentType);
    assert.equal(await result.response.text(), responseBody);
    const expected = structuredClone(calls[0].body);
    delete expected.verbosity;
    assert.deepEqual(calls[1].body, expected);
    assert.deepEqual(result.transformedBody, expected);
    assert.deepEqual(body, original);
    assert.deepEqual([...calls[1].headers], [...calls[0].headers]);
    if (surface === "claude") assert.ok(calls[1].headers.has("anthropic-version"));
    if (surface === "responses") {
      assert.equal(calls[1].body.max_output_tokens, 67);
      assert.equal(calls[1].body.max_tokens, undefined);
      assert.equal(calls[1].body.input, "hello");
    }
  });
}

test("#14629 cancelling before the CLI retry preserves AbortError and stops dispatch", async (t) => {
  const controller = new AbortController();
  const calls = installTransport(
    t,
    [
      { path: CHAT_PATH, status: 403, body: "forbidden" },
      { path: CLI_PATH, status: 400, body: ENUM_ERROR },
    ],
    (count) => {
      if (count === 3) controller.abort();
    }
  );
  await assert.rejects(
    new CommandCodeExecutor().execute({
      model: MODEL,
      body: { messages: [{ role: "user", content: "hello" }], reasoning_effort: "xhigh" },
      stream: false,
      signal: controller.signal,
      credentials: { apiKey: "synthetic-commandcode-key" },
    }),
    { name: "AbortError" }
  );
  assert.equal(calls.length, 3, "third fetch invocation is cancelled before mock dispatch");
  assert.ok(calls.every((call) => call.signal === controller.signal));
});
