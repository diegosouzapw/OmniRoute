import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { Socket } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, afterEach, beforeEach, mock, test } from "node:test";
import { MockAgent, getGlobalDispatcher, setGlobalDispatcher } from "undici";

const testRoot = mkdtempSync(join(tmpdir(), "omniroute-glm-residual-14629-"));
const originalEnv = { ...process.env };
const isolatedPaths = {
  HOME: "home",
  DATA_DIR: "data",
  OMNIROUTE_PLUGINS_DIR: "plugins",
  XDG_CONFIG_HOME: "config",
  XDG_CACHE_HOME: "cache",
  XDG_DATA_HOME: "xdg-data",
};
for (const [key, directory] of Object.entries(isolatedPaths)) {
  process.env[key] = join(testRoot, directory);
  mkdirSync(process.env[key]!, { recursive: true });
}
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_SKIP_SYSTEM_TRUST = "1";
process.env.OMNIROUTE_REASONING_EFFORT_PROBE_PROVIDERS = "";

const socketGuard = mock.method(Socket.prototype, "connect", () => {
  throw new Error("Unexpected network access in GLM recovery regression");
});
const originalDispatcher = getGlobalDispatcher();
const mockAgent = new MockAgent();
mockAgent.disableNetConnect();
setGlobalDispatcher(mockAgent);

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { GlmExecutor } = await import("../../open-sse/executors/glm.ts");
const { __test_resetLearnedReasoningEffortCaps } =
  await import("../../open-sse/services/learnedReasoningEffortCaps.ts");
const originalFetch = globalThis.fetch;

beforeEach(() => __test_resetLearnedReasoningEffortCaps());
afterEach(() => {
  globalThis.fetch = originalFetch;
  __test_resetLearnedReasoningEffortCaps();
});
after(async () => {
  resetDbInstance();
  await mockAgent.close();
  setGlobalDispatcher(originalDispatcher);
  socketGuard.mock.restore();
  for (const key of [
    ...Object.keys(isolatedPaths),
    "NODE_ENV",
    "DISABLE_SQLITE_AUTO_BACKUP",
    "OMNIROUTE_SKIP_SYSTEM_TRUST",
    "OMNIROUTE_REASONING_EFFORT_PROBE_PROVIDERS",
  ]) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
  rmSync(testRoot, { recursive: true, force: true });
});

interface RecordedRequest {
  url: string;
  body: Record<string, unknown>;
  headers: Headers;
  signal: AbortSignal | null | undefined;
}
interface FixtureResponse {
  status: number;
  body: unknown;
  contentType?: string;
}
function interceptRequests(responses: FixtureResponse[]) {
  const calls: RecordedRequest[] = [];
  globalThis.fetch = async (url, init) => {
    calls.push({
      url: String(url),
      body: JSON.parse(String(init?.body)),
      headers: new Headers(init?.headers),
      signal: init?.signal,
    });
    const next = responses[calls.length - 1];
    assert.ok(next, "executor exceeded the expected dispatch budget");
    return new Response(next.contentType ? String(next.body) : JSON.stringify(next.body), {
      status: next.status,
      headers: { "Content-Type": next.contentType ?? "application/json" },
    });
  };
  return calls;
}

const reasoningRejected = {
  error: {
    message: 'Invalid option: expected one of "low", "medium", "high"',
    param: "reasoning_effort",
  },
};
const success = { status: 200, body: { choices: [{ message: { content: "ok" } }] } };
const credentials = {
  apiKey: "synthetic-glm-key",
  providerSpecificData: { primaryTransport: "openai" },
};

test("#14629 GLM result describes the successful reasoning retry", async () => {
  const body = { messages: [{ role: "user", content: "hi" }], reasoning_effort: "none" };
  const originalBody = structuredClone(body);
  const calls = interceptRequests([{ status: 400, body: reasoningRejected }, success]);
  const result = await new GlmExecutor().execute({
    model: "glm-4.6",
    body,
    stream: false,
    credentials,
  });
  assert.equal(result.response.status, 200);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].body.reasoning_effort, "low");
  assert.deepEqual(result.transformedBody, calls[1].body);
  assert.deepEqual(body, originalBody);
});

test("#14629 GLM unknown first attempt retains the requested effort", async () => {
  const calls = interceptRequests([success]);
  const result = await new GlmExecutor().execute({
    model: "glm-custom-14629",
    body: { messages: [{ role: "user", content: "hi" }], reasoning_effort: "xhigh" },
    stream: false,
    credentials,
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].body.reasoning_effort, "xhigh");
  assert.deepEqual(result.transformedBody, calls[0].body);
});

for (const chained of [false, true]) {
  test(`#14629 GLM recovers a known field400${chained ? " after an effort retry" : ""}`, async () => {
    const body = {
      model: "glm-4.6",
      messages: [{ role: "user", content: "hi" }],
      verbosity: "high",
      temperature: 0.2,
      ...(chained ? { reasoning_effort: "none" } : {}),
    };
    const originalBody = structuredClone(body);
    const responses = [
      ...(chained ? [{ status: 400, body: reasoningRejected }] : []),
      { status: 400, body: { error: { message: "Unknown field: verbosity" } } },
      success,
    ];
    const calls = interceptRequests(responses);
    const controller = new AbortController();
    const result = await new GlmExecutor().execute({
      model: "glm-4.6",
      body,
      stream: false,
      credentials,
      signal: controller.signal,
      upstreamExtraHeaders: { "x-test-recovery": "preserved" },
    });
    assert.equal(result.response.status, 200);
    assert.equal(calls.length, chained ? 3 : 2);
    const last = calls.at(-1)!;
    assert.equal(last.body.verbosity, undefined);
    assert.equal(last.body.temperature, 0.2);
    assert.equal(last.body.model, "glm-4.6");
    if (chained) assert.equal(last.body.reasoning_effort, "low");
    for (const call of calls) {
      assert.equal(call.url, calls[0].url);
      assert.match(call.url, /\/chat\/completions$/);
      assert.deepEqual(call.headers, calls[0].headers);
      assert.equal(call.headers.get("x-test-recovery"), "preserved");
      assert.equal(call.headers.get("authorization"), "Bearer synthetic-glm-key");
      assert.equal(call.signal, calls[0].signal);
    }
    controller.abort();
    assert.equal(last.signal?.aborted, true);
    assert.deepEqual(result.transformedBody, last.body);
    assert.deepEqual(body, originalBody);
  });
}

for (const carrier of ["reasoning_effort", "reasoning", "output_config"]) {
  test(`#14629 GLM reuses learned ${carrier} on the next request`, async () => {
    const effort = carrier === "reasoning_effort" ? "none" : { effort: "none" };
    const body = { messages: [{ role: "user", content: "hi" }], [carrier]: effort };
    const originalBody = structuredClone(body);
    const calls = interceptRequests([{ status: 400, body: reasoningRejected }, success, success]);
    const executor = new GlmExecutor();
    const input = { model: "glm-4.6", body, stream: false, credentials };
    assert.equal((await executor.execute(input)).response.status, 200);
    const result = await executor.execute(input);
    assert.equal(result.response.status, 200);
    assert.equal(calls.length, 3);
    assert.deepEqual(
      calls[2].body[carrier],
      carrier === "reasoning_effort" ? "low" : { effort: "low" }
    );
    assert.deepEqual(result.transformedBody, calls[2].body);
    assert.deepEqual(body, originalBody);
  });
}

for (const [label, status, message, extra] of [
  ["generic422", 422, "Unknown field: verbosity", { verbosity: "high" }],
  ["unauthorized", 401, "Unknown field: verbosity", { verbosity: "high" }],
  ["quota", 429, "Unknown field: verbosity", { verbosity: "high" }],
  ["server error", 500, "Unknown field: verbosity", { verbosity: "high" }],
  ["absent field", 400, "Unknown field: verbosity", {}],
  ["opaque validation", 400, "Invalid parameters", { reasoning_effort: "xhigh" }],
  ["required field", 400, "messages: field required", {}],
] as const) {
  test(`#14629 GLM preserves ${label} without field recovery`, async () => {
    const error = { error: { message } };
    const calls = interceptRequests([{ status, body: error }]);
    // This existing effort alias selects OpenAI directly, without transport fallback.
    const result = await new GlmExecutor().execute({
      model: "glm-5.3-high",
      body: { messages: [{ role: "user", content: "hi" }], ...extra },
      stream: false,
      credentials,
    });
    assert.equal(calls.length, 1);
    assert.equal(result.response.status, status);
    assert.deepEqual(await result.response.json(), error);
    assert.equal(calls[0].body.model, "glm-5.3");
    assert.equal(calls[0].body.reasoning_effort, "high");
    assert.deepEqual(result.transformedBody, calls[0].body);
  });
}

test("#14629 GLM stops when the field retry is rejected again", async () => {
  const error = { error: { message: "Unknown field: verbosity" } };
  const calls = interceptRequests([
    { status: 400, body: error },
    { status: 400, body: error },
  ]);
  const result = await new GlmExecutor().execute({
    model: "glm-4.6",
    body: { messages: [{ role: "user", content: "hi" }], verbosity: "high" },
    stream: false,
    credentials,
  });
  assert.equal(calls.length, 2);
  assert.equal(result.response.status, 400);
  assert.deepEqual(await result.response.json(), error);
  assert.deepEqual(result.transformedBody, calls[1].body);
});

test("#14629 GLM preserves enum422 recovery and separates learned model/provider identities", async () => {
  const calls = interceptRequests([
    { status: 422, body: reasoningRejected },
    success,
    success,
    success,
  ]);
  const body = { messages: [{ role: "user", content: "hi" }], reasoning_effort: "none" };
  const input = { model: "glm-4.6", body, stream: false, credentials };
  const result = await new GlmExecutor().execute(input);
  assert.equal(result.response.status, 200);
  assert.equal(calls[1].body.reasoning_effort, "low");
  assert.deepEqual(result.transformedBody, calls[1].body);
  await new GlmExecutor().execute({ ...input, model: "glm-custom-14629" });
  await new GlmExecutor("glm-cn").execute(input);
  assert.equal(calls.length, 4);
  assert.equal(calls[2].body.reasoning_effort, "none");
  assert.equal(calls[3].body.reasoning_effort, "none");
});

test("#14629 GLM keeps Anthropic payload and policy unchanged after OpenAI learns", async () => {
  const nativeSuccess = {
    status: 200,
    body: {
      id: "message-14629",
      type: "message",
      role: "assistant",
      model: "glm-4.6",
      content: [{ type: "text", text: "ok" }],
      stop_reason: "end_turn",
      usage: { input_tokens: 1, output_tokens: 1 },
    },
  };
  const nativeError = {
    status: 400,
    body: {
      type: "error",
      error: { type: "invalid_request_error", message: "Unknown field: verbosity" },
    },
  };
  const calls = interceptRequests([
    nativeSuccess,
    { status: 400, body: reasoningRejected },
    success,
    nativeSuccess,
    nativeError,
  ]);
  const executor = new GlmExecutor();
  const body = {
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "none",
    verbosity: "high",
  };
  const input = { model: "glm-4.6", body, stream: false, credentials };
  const anthropic = {
    ...input,
    credentials: { ...credentials, providerSpecificData: { primaryTransport: "anthropic" } },
  };
  assert.equal((await executor.execute(anthropic)).response.status, 200);
  assert.equal((await executor.execute(input)).response.status, 200);
  assert.equal((await executor.execute(anthropic)).response.status, 200);
  assert.deepEqual(calls[3].body, calls[0].body);
  assert.equal(calls[3].body.verbosity, undefined);
  assert.equal(calls[3].body.reasoning_effort, undefined);
  assert.match(calls[3].url, /\/messages\?beta=true$/);
  assert.equal(calls[3].headers.get("x-api-key"), "synthetic-glm-key");
  assert.ok(calls[3].headers.get("anthropic-version"));
  assert.equal((await executor.execute(anthropic)).response.status, 400);
  assert.equal(calls.length, 5);
});

test("#14629 GLM streams useful content after field recovery", async () => {
  const sse = [
    'data: {"choices":[{"index":0,"delta":{"content":"hello"},"finish_reason":null}]}',
    'data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}',
    "data: [DONE]",
    "",
  ].join("\n\n");
  const calls = interceptRequests([
    { status: 400, body: { error: { message: "Unknown field: verbosity" } } },
    { status: 200, body: sse, contentType: "text/event-stream" },
  ]);
  const result = await new GlmExecutor().execute({
    model: "glm-4.6",
    body: { messages: [{ role: "user", content: "hi" }], verbosity: "high" },
    stream: true,
    credentials,
  });
  assert.equal(calls.length, 2);
  assert.equal(result.response.status, 200);
  assert.match(result.response.headers.get("content-type") ?? "", /text\/event-stream/);
  assert.equal(await result.response.text(), sse);
  assert.deepEqual(result.transformedBody, calls[1].body);
});
