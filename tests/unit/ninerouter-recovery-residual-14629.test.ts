import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { Socket } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, afterEach, beforeEach, mock, test } from "node:test";
import { MockAgent, getGlobalDispatcher, setGlobalDispatcher } from "undici";

const testRoot = mkdtempSync(join(tmpdir(), "omniroute-ninerouter-residual-14629-"));
const originalEnv = { ...process.env };
for (const [key, directory] of Object.entries({
  HOME: "home",
  DATA_DIR: "data",
  OMNIROUTE_PLUGINS_DIR: "plugins",
})) {
  process.env[key] = join(testRoot, directory);
  mkdirSync(process.env[key]!, { recursive: true });
}
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_SKIP_SYSTEM_TRUST = "1";
process.env.OMNIROUTE_REASONING_EFFORT_PROBE_PROVIDERS = "";

// Deny every socket, including explicit dispatchers that bypass the global MockAgent.
const socketGuard = mock.method(Socket.prototype, "connect", () => {
  throw new Error("Unexpected network access in NineRouter recovery regression");
});
const originalDispatcher = getGlobalDispatcher();
const mockAgent = new MockAgent();
mockAgent.disableNetConnect();
setGlobalDispatcher(mockAgent);

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { upsertVersionManagerTool } = await import("../../src/lib/db/versionManager.ts");
const { registerSupervisor, unregisterSupervisor } =
  await import("../../src/lib/services/registry.ts");
const { ServiceSupervisor } = await import("../../src/lib/services/ServiceSupervisor.ts");
const { NineRouterExecutor } = await import("../../open-sse/executors/ninerouter.ts");
const { __test_resetLearnedReasoningEffortCaps } =
  await import("../../open-sse/services/learnedReasoningEffortCaps.ts");

const originalFetch = globalThis.fetch;
const supervisor = new ServiceSupervisor({
  tool: "9router",
  port: 23146,
  spawnArgs: () => {
    throw new Error("This fixture must never spawn the embedded service");
  },
  healthUrl: () => "http://127.0.0.1:23146/api/health",
  healthIntervalMs: 2000,
  stopTimeoutMs: 3000,
  logsBufferBytes: 64 * 1024,
});
const stoppedStatus = supervisor.getStatus();
const statusMock = mock.method(supervisor, "getStatus", () => ({
  ...stoppedStatus,
  state: "running" as const,
}));

beforeEach(async () => {
  __test_resetLearnedReasoningEffortCaps();
  await upsertVersionManagerTool({ tool: "9router", port: 23146, status: "stopped" });
  registerSupervisor(supervisor);
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  unregisterSupervisor("9router");
  __test_resetLearnedReasoningEffortCaps();
});

after(async () => {
  resetDbInstance();
  statusMock.mock.restore();
  await mockAgent.close();
  setGlobalDispatcher(originalDispatcher);
  socketGuard.mock.restore();
  for (const key of [
    "HOME",
    "DATA_DIR",
    "OMNIROUTE_PLUGINS_DIR",
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

function interceptRequests(responses: Array<{ status: number; body: unknown }>) {
  const calls: RecordedRequest[] = [];
  globalThis.fetch = async (url, init) => {
    calls.push({
      url: String(url),
      body: JSON.parse(String(init?.body)),
      headers: new Headers(init?.headers),
      signal: init?.signal,
    });
    const next = responses[calls.length - 1];
    assert.ok(next, "executor exceeded the expected retry budget");
    return new Response(JSON.stringify(next.body), {
      status: next.status,
      headers: { "Content-Type": "application/json" },
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

test("#14629 returned body describes the successful reasoning retry", async () => {
  const body = {
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "none",
  };
  const originalBody = structuredClone(body);
  const calls = interceptRequests([{ status: 400, body: reasoningRejected }, success]);
  const result = await new NineRouterExecutor().execute({
    model: "9router/cx/reasoning-model",
    body,
    stream: false,
    credentials: {},
  });

  assert.equal(result.response.status, 200);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].body.reasoning_effort, "low");
  assert.equal(calls[1].body.model, "cx/reasoning-model");
  assert.deepEqual(result.transformedBody, calls[1].body);
  assert.deepEqual(body, originalBody);
});

test("#14629 models without learned caps keep transparent first attempts", async () => {
  const body = { messages: [], reasoning_effort: "none", verbosity: "high" };
  const calls = interceptRequests([success]);
  const result = await new NineRouterExecutor().execute({
    model: "9router/cx/glm-5.3",
    body,
    stream: false,
    credentials: {},
  });
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0].body, { ...body, model: "cx/glm-5.3" });
  assert.deepEqual(result.transformedBody, calls[0].body);
});

for (const { field, extra, endpoint } of [
  { field: "verbosity", extra: {}, endpoint: "/v1/chat/completions" },
  { field: "context_management", extra: { system: "be helpful" }, endpoint: "/v1/messages" },
]) {
  test(`#14629 retries a 400 rejecting ${field} on ${endpoint}`, async () => {
    const body = {
      messages: [{ role: "user", content: "hi" }],
      temperature: 0.25,
      [field]: "unsupported",
      ...extra,
    };
    const originalBody = structuredClone(body);
    const calls = interceptRequests([
      { status: 400, body: { error: { message: `Unknown field: ${field}` } } },
      success,
    ]);
    const controller = new AbortController();
    const result = await new NineRouterExecutor().execute({
      model: "9router/vendor/model-with/slashes",
      body,
      stream: false,
      credentials: {},
      signal: controller.signal,
      upstreamExtraHeaders: { "x-test-recovery": "preserved" },
    });

    assert.equal(result.response.status, 200);
    assert.equal(calls.length, 2);
    assert.equal(calls[0].url, `http://127.0.0.1:23146${endpoint}`);
    assert.equal(calls[1].url, calls[0].url);
    assert.deepEqual(calls[1].headers, calls[0].headers);
    assert.equal(calls[1].headers.get("x-test-recovery"), "preserved");
    assert.ok(calls[1].headers.get("authorization")?.startsWith("Bearer nr_"));
    assert.equal(calls[1].signal, calls[0].signal);
    controller.abort();
    assert.equal(calls[1].signal?.aborted, true);
    const expected = { ...originalBody, model: "vendor/model-with/slashes" };
    delete expected[field];
    assert.deepEqual(calls[1].body, expected);
    assert.deepEqual(result.transformedBody, expected);
    assert.deepEqual(body, originalBody);
  });
}

for (const { label, status, message, extra } of [
  {
    label: "generic 422",
    status: 422,
    message: "Unknown field: verbosity",
    extra: { verbosity: "high" },
  },
  {
    label: "unauthorized",
    status: 401,
    message: "Unknown field: verbosity",
    extra: { verbosity: "high" },
  },
  {
    label: "quota",
    status: 429,
    message: "Unknown field: verbosity",
    extra: { verbosity: "high" },
  },
  {
    label: "server error",
    status: 500,
    message: "Unknown field: verbosity",
    extra: { verbosity: "high" },
  },
  { label: "field absent", status: 400, message: "Unknown field: verbosity", extra: {} },
  {
    label: "opaque rejection",
    status: 400,
    message: "Invalid request parameters",
    extra: { reasoning_effort: "xhigh" },
  },
  { label: "required messages", status: 400, message: "messages: field required", extra: {} },
]) {
  test(`#14629 preserves ${label} without an unrelated retry`, async () => {
    const responseBody = { error: { message } };
    const body = { messages: [], ...extra };
    const calls = interceptRequests([{ status, body: responseBody }]);
    const result = await new NineRouterExecutor().execute({
      model: "9router/vendor/negative-control",
      body,
      stream: false,
      credentials: {},
    });

    assert.equal(calls.length, 1);
    assert.equal(result.response.status, status);
    assert.deepEqual(await result.response.json(), responseBody);
    assert.deepEqual(result.transformedBody, calls[0].body);
    assert.deepEqual(calls[0].body, { ...body, model: "vendor/negative-control" });
  });
}

test("#14629 stops after one field retry and preserves the final error body", async () => {
  const rejected = { error: { message: "Unknown field: verbosity" } };
  const calls = interceptRequests([
    { status: 400, body: rejected },
    { status: 400, body: rejected },
  ]);
  const result = await new NineRouterExecutor().execute({
    model: "9router/vendor/rejecting-model",
    body: { messages: [], verbosity: "high" },
    stream: false,
    credentials: {},
  });

  assert.equal(calls.length, 2);
  assert.equal(result.response.status, 400);
  assert.deepEqual(await result.response.json(), rejected);
  assert.deepEqual(result.transformedBody, calls[1].body);
  assert.equal("verbosity" in calls[1].body, false);
});

test("#14629 keeps the service-unavailable short circuit before dispatch", async () => {
  unregisterSupervisor("9router");
  const calls = interceptRequests([]);
  const result = await new NineRouterExecutor().execute({
    model: "9router/vendor/model",
    body: { messages: [], reasoning_effort: "none", verbosity: "high" },
    stream: false,
    credentials: {},
  });
  assert.equal(calls.length, 0);
  assert.equal(result.response.status, 503);
  assert.equal(result.response.headers.get("X-Omni-Fallback-Hint"), "connection_cooldown");
});

test("#14629 field recovery follows reasoning recovery with the current body", async () => {
  const body = { messages: [], reasoning_effort: "none", verbosity: "high" };
  const calls = interceptRequests([
    { status: 400, body: reasoningRejected },
    { status: 400, body: { error: { message: "Unknown field: verbosity" } } },
    success,
  ]);
  const result = await new NineRouterExecutor().execute({
    model: "9router/vendor/reasoning-model",
    body,
    stream: false,
    credentials: {},
  });

  assert.equal(result.response.status, 200);
  assert.equal(calls.length, 3);
  assert.equal(calls[0].body.reasoning_effort, "none");
  assert.equal(calls[1].body.reasoning_effort, "low");
  assert.equal(calls[1].body.verbosity, "high");
  assert.deepEqual(calls[2].body, {
    model: "vendor/reasoning-model",
    messages: [],
    reasoning_effort: "low",
  });
  assert.deepEqual(result.transformedBody, calls[2].body);
  assert.equal(new Set(calls.map((call) => call.url)).size, 1);
  assert.equal(new Set(calls.map((call) => call.signal)).size, 1);
  assert.deepEqual(body, { messages: [], reasoning_effort: "none", verbosity: "high" });
});

for (const { name, requested, accepted } of [
  {
    name: "OpenAI",
    requested: { reasoning_effort: "none" },
    accepted: { reasoning_effort: "low" },
  },
  {
    name: "Responses carrier",
    requested: { reasoning: { effort: "none", summary: "auto" } },
    accepted: { reasoning: { effort: "low", summary: "auto" } },
  },
  {
    name: "Anthropic",
    requested: { system: "be helpful", output_config: { effort: "none" } },
    accepted: { system: "be helpful", output_config: { effort: "low" } },
  },
]) {
  test(`#14629 reuses learned ${name} effort for the same forwarded model`, async () => {
    const body = { messages: [], ...requested };
    const originalBody = structuredClone(body);
    const calls = interceptRequests([
      { status: 422, body: reasoningRejected },
      success,
      success,
      success,
      success,
    ]);
    const executor = new NineRouterExecutor();
    const execute = (model: string) =>
      executor.execute({ model, body, stream: false, credentials: {} });
    assert.equal((await execute("9router/vendor/model/with-slashes")).response.status, 200);
    const expected = { messages: [], ...accepted, model: "vendor/model/with-slashes" };
    assert.deepEqual(calls[1].body, expected);

    const repeated = await execute("9router/vendor/model/with-slashes");
    assert.equal(calls.length, 3, "the repeated call must not pay another reasoning retry");
    assert.deepEqual(calls[2].body, expected);
    assert.deepEqual(repeated.transformedBody, expected);

    const unprefixed = await execute("vendor/model/with-slashes");
    assert.equal(calls.length, 4);
    assert.deepEqual(calls[3].body, expected);
    assert.deepEqual(unprefixed.transformedBody, expected);

    await execute("9router/other/model/with-slashes");
    assert.equal(calls.length, 5);
    assert.deepEqual(calls[4].body, { ...originalBody, model: "other/model/with-slashes" });
    assert.deepEqual(body, originalBody);
  });
}
