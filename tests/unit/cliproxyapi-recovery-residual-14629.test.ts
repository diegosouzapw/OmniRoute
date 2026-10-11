import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { Socket } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, afterEach, beforeEach, mock, test } from "node:test";
import { MockAgent, getGlobalDispatcher, setGlobalDispatcher } from "undici";

const testRoot = mkdtempSync(join(tmpdir(), "omniroute-cliproxyapi-residual-14629-"));
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
  throw new Error("Unexpected network access in CLIProxyAPI recovery regression");
});
const originalDispatcher = getGlobalDispatcher();
const mockAgent = new MockAgent();
mockAgent.disableNetConnect();
setGlobalDispatcher(mockAgent);

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { CliproxyapiExecutor, clearCliproxyapiUrlCache } =
  await import("../../open-sse/executors/cliproxyapi.ts");
const { __test_resetLearnedReasoningEffortCaps } =
  await import("../../open-sse/services/learnedReasoningEffortCaps.ts");
const originalFetch = globalThis.fetch;

beforeEach(() => {
  __test_resetLearnedReasoningEffortCaps();
  clearCliproxyapiUrlCache();
});
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
  headers?: Record<string, string>;
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
      headers: { "Content-Type": next.contentType ?? "application/json", ...next.headers },
    });
  };
  return calls;
}

await import("../../open-sse/translator/bootstrap.ts");
const { translateRequest, initState } = await import("../../open-sse/translator/index.ts");
const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { restoreClaudePassthroughToolUseName } = await import("../../open-sse/utils/stream.ts");

const reasoningRejected = {
  error: {
    message: 'Invalid option: expected one of "low", "medium", "high"',
    param: "reasoning_effort",
  },
};
const success = { status: 200, body: { choices: [{ message: { content: "ok" } }] } };
const credentials = { apiKey: "synthetic-cpa-key" };
const model = "cpa-custom-14629";

function requestBody(anthropic: boolean): Record<string, unknown> {
  return anthropic
    ? {
        system: "test system",
        messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
        tools: [{ name: "mcp_call", input_schema: { type: "object", properties: {} } }],
        thinking: { type: "enabled", budget_tokens: 1024 },
      }
    : { messages: [{ role: "user", content: "hi" }] };
}

for (const [label, status, message, extra] of [
  ["generic422", 422, "Unknown field: verbosity", { verbosity: "high" }],
  ["unauthorized", 401, "Unknown field: verbosity", { verbosity: "high" }],
  ["quota", 429, "Unknown field: verbosity", { verbosity: "high" }],
  ["server error", 500, "Unknown field: verbosity", { verbosity: "high" }],
  ["absent field", 400, "Unknown field: verbosity", {}],
  ["opaque400", 400, "Invalid request", { reasoning_effort: "none" }],
] as const) {
  test(`#14629 CPA preserves ${label} without speculative dispatch`, async () => {
    const upstream = { error: { message } };
    const calls = interceptRequests([{ status, body: upstream }]);
    const result = await new CliproxyapiExecutor().execute({
      model,
      body: { ...requestBody(false), ...extra },
      stream: false,
      credentials,
    });
    assert.equal(result.response.status, status);
    assert.equal(calls.length, 1);
    assert.deepEqual(await result.response.json(), upstream);
    assertWireBody(result.transformedBody, calls);
  });
}

for (const reasoning of [false, true]) {
  test(`#14629 CPA bounds repeated ${reasoning ? "enum422" : "field400"} rejection`, async () => {
    const response = reasoning
      ? { status: 422, body: reasoningRejected }
      : { status: 400, body: { error: { message: "Unknown field: verbosity" } } };
    const calls = interceptRequests([response, response]);
    const body = {
      ...requestBody(true),
      ...(reasoning ? { reasoning_effort: "none" } : { verbosity: "high" }),
    };
    const result = await new CliproxyapiExecutor().execute({
      model,
      body,
      stream: false,
      credentials,
    });
    assert.equal(calls.length, 2);
    assert.equal(result.response.status, response.status);
    assert.deepEqual(await result.response.json(), response.body);
    assertWireBody(result.transformedBody, calls);
    assertMcpRestoration(result.transformedBody as Record<string, unknown>);
  });
}

test("#14629 CPA preserves native Anthropic thinking and strips its premium extras before dispatch", async () => {
  const calls = interceptRequests([success]);
  const body = {
    ...requestBody(true),
    output_config: { effort: "xhigh" },
    context_management: { edits: [] },
  };
  const result = await new CliproxyapiExecutor().execute({
    model,
    body,
    stream: false,
    credentials,
  });
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0].body.thinking, { type: "enabled", budget_tokens: 1024 });
  assert.equal(calls[0].body.output_config, undefined);
  assert.equal(calls[0].body.context_management, undefined);
  assertWireBody(result.transformedBody, calls);
});

test("#14629 CPA learned caps stay scoped to provider/model and leave accepted effort intact", async () => {
  const { recordLearnedReasoningEffort } =
    await import("../../open-sse/services/learnedReasoningEffortCaps.ts");
  recordLearnedReasoningEffort("unrelated-provider", model, ["low"]);
  const calls = interceptRequests([
    success,
    { status: 400, body: reasoningRejected },
    success,
    success,
    success,
  ]);
  const executor = new CliproxyapiExecutor();
  const input = {
    model,
    body: { ...requestBody(false), reasoning_effort: "none" },
    stream: false,
    credentials,
  };
  await executor.execute(input);
  assert.equal(calls[0].body.reasoning_effort, "none");
  await executor.execute(input);
  await executor.execute({ ...input, model: "another-cpa-model" });
  assert.equal(calls[3].body.reasoning_effort, "none");
  await executor.execute({ ...input, body: { ...requestBody(false), reasoning_effort: "medium" } });
  assert.equal(calls[4].body.reasoning_effort, "medium");
  assert.equal(calls.length, 5);
});

test("#14629 CPA returns the streaming response and trace attribution after field recovery", async () => {
  const sse =
    'data: {"choices":[{"delta":{"content":"ok"},"finish_reason":null}]}\n\ndata: [DONE]\n\n';
  const calls = interceptRequests([
    { status: 400, body: { error: { message: "Unknown field: verbosity" } } },
    {
      status: 200,
      body: sse,
      contentType: "text/event-stream",
      headers: { "x-cpa-trace-id": "synthetic-cpa-slot" },
    },
  ]);
  const result = await new CliproxyapiExecutor().execute({
    model,
    body: { ...requestBody(false), verbosity: "high" },
    stream: true,
    credentials,
  });
  assert.equal(calls.length, 2);
  assert.equal(result.transport, "cliproxyapi");
  const { readCpaAuthIndex } =
    await import("../../open-sse/handlers/chatCore/cpaTraceAuthIndex.ts");
  result.response.headers.delete("x-cpa-trace-id");
  assert.equal(readCpaAuthIndex(result.response), "synthetic-cpa-slot");
  assert.equal(result.response.headers.get("content-type"), "text/event-stream");
  assert.equal(await result.response.text(), sse);
  assert.equal(calls[1].headers.get("accept"), "text/event-stream");
  assertWireBody(result.transformedBody, calls);
});

function assertWireBody(result: unknown, calls: RecordedRequest[]) {
  const publicBody = { ...(result as Record<string, unknown>) };
  delete publicBody._toolNameMap;
  delete publicBody._namespaceToolIdentityMap;
  assert.deepEqual(JSON.parse(JSON.stringify(publicBody)), calls.at(-1)!.body);
  for (const call of calls) {
    assert.equal("_toolNameMap" in call.body, false);
    assert.equal("_namespaceToolIdentityMap" in call.body, false);
  }
}

function assertMcpRestoration(body: Record<string, unknown>) {
  const descriptor = Object.getOwnPropertyDescriptor(body, "_toolNameMap");
  assert.ok(descriptor?.value instanceof Map);
  assert.deepEqual(
    {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
    },
    { enumerable: false, configurable: true, writable: true }
  );
  const event = { content_block: { type: "tool_use", id: "call-cpa", name: "Mcp_call" } };
  assert.equal(restoreClaudePassthroughToolUseName(event, descriptor.value), true);
  assert.equal(event.content_block.name, "mcp_call");
}

for (const anthropic of [false, true]) {
  test(`#14629 CPA reports the reasoning retry body (${anthropic ? "messages" : "chat"})`, async () => {
    const body = { ...requestBody(anthropic), reasoning_effort: "none" };
    const originalBody = structuredClone(body);
    const calls = interceptRequests([{ status: 400, body: reasoningRejected }, success]);
    const result = await new CliproxyapiExecutor().execute({
      model,
      body,
      stream: false,
      credentials,
    });
    assert.equal(result.response.status, 200);
    assert.equal(calls.length, 2);
    assert.match(calls[0].url, anthropic ? /\/v1\/messages$/ : /\/v1\/chat\/completions$/);
    assert.equal(calls[1].body.reasoning_effort, "low");
    assertWireBody(result.transformedBody, calls);
    if (anthropic) assertMcpRestoration(result.transformedBody as Record<string, unknown>);
    assert.deepEqual(body, originalBody);
  });

  for (const recovered of [false, true]) {
    test(`#14629 CPA preserves namespace descriptors and downstream identity (${anthropic ? "messages" : "chat"}, recovery=${recovered})`, async () => {
      const body = translateRequest(
        "openai-responses",
        anthropic ? "claude" : "openai",
        model,
        {
          model,
          instructions: "test system",
          input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "go" }] }],
          tools: [
            {
              type: "namespace",
              name: "functions",
              tools: [{ name: "exec", parameters: { type: "object", properties: {} } }],
            },
          ],
        },
        true,
        null,
        null,
        null
      ) as Record<string, unknown>;
      const descriptor = Object.getOwnPropertyDescriptor(body, "_namespaceToolIdentityMap");
      assert.ok(
        descriptor?.value instanceof Map,
        "real translation must produce namespace metadata"
      );
      const aliases = Object.getOwnPropertyDescriptor(body, "_toolNameMap");
      const originalAliases = aliases ? new Map(aliases.value) : null;
      if (recovered) body.reasoning_effort = "none";
      const calls = interceptRequests(
        recovered ? [{ status: 400, body: reasoningRejected }, success, success] : [success]
      );
      const executor = new CliproxyapiExecutor();
      const input = { model, body, stream: false, credentials };
      const first = await executor.execute(input);
      assert.deepEqual(
        Object.getOwnPropertyDescriptor(first.transformedBody, "_namespaceToolIdentityMap"),
        descriptor
      );
      const result = recovered ? await executor.execute(input) : first;
      assert.equal(calls.length, recovered ? 3 : 1);
      if (recovered) assert.equal(calls[2].body.reasoning_effort, "low");
      assert.deepEqual(
        Object.getOwnPropertyDescriptor(result.transformedBody, "_namespaceToolIdentityMap"),
        descriptor
      );
      if (aliases) {
        const returned = Object.getOwnPropertyDescriptor(result.transformedBody, "_toolNameMap")!;
        assert.deepEqual({ ...returned, value: null }, { ...aliases, value: null });
        for (const [alias, original] of originalAliases!)
          assert.equal(returned.value.get(alias), original);
        assert.deepEqual(
          aliases.value,
          originalAliases,
          "CPA cloak must not mutate the caller's aliases"
        );
      }
      assertWireBody(result.transformedBody, calls);
      const wireTools = calls.at(-1)!.body.tools as Array<{
        name?: string;
        function?: { name: string };
      }>;
      const echoed = {
        content_block: {
          type: "tool_use",
          name: (anthropic ? wireTools[0].name : wireTools[0].function?.name)!,
        },
      };
      if (anthropic)
        restoreClaudePassthroughToolUseName(
          echoed,
          (result.transformedBody as Record<string, unknown>)._toolNameMap
        );
      const state = initState("openai-responses");
      state.requestToolIdentityMap = (
        result.transformedBody as Record<string, unknown>
      )._namespaceToolIdentityMap;
      const events = openaiToOpenAIResponsesResponse(
        {
          id: "chatcmpl-cpa",
          model,
          choices: [
            {
              index: 0,
              delta: {
                tool_calls: [
                  {
                    index: 0,
                    id: "call-cpa",
                    type: "function",
                    function: { name: echoed.content_block.name, arguments: "{}" },
                  },
                ],
              },
              finish_reason: "tool_calls",
            },
          ],
        },
        state
      );
      const added = events.find((event) => event.event === "response.output_item.added");
      assert.equal(added?.data.item.name, "exec");
      assert.equal(added?.data.item.namespace, "functions");
      assert.deepEqual(
        Object.getOwnPropertyDescriptor(body, "_namespaceToolIdentityMap"),
        descriptor
      );
    });
  }
}

test("#14629 CPA unknown first attempt retains requested effort", async () => {
  const calls = interceptRequests([success]);
  await new CliproxyapiExecutor().execute({
    model,
    body: { ...requestBody(false), reasoning_effort: "xhigh" },
    stream: false,
    credentials,
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].body.reasoning_effort, "xhigh");
});

test("#14629 CPA retains existing tool aliases when adding its MCP rewrite", async () => {
  const body = requestBody(true);
  const aliases = new Map([["legacy_alias", "OriginalTool"]]);
  Object.defineProperty(body, "_toolNameMap", {
    value: aliases,
    enumerable: false,
    configurable: true,
    writable: true,
  });
  const calls = interceptRequests([success]);
  const result = await new CliproxyapiExecutor().execute({
    model,
    body,
    stream: false,
    credentials,
  });
  const returned = result.transformedBody as Record<string, unknown>;
  assertMcpRestoration(returned);
  const event = { content_block: { type: "tool_use", id: "call-legacy", name: "legacy_alias" } };
  assert.equal(restoreClaudePassthroughToolUseName(event, returned._toolNameMap), true);
  assert.equal(event.content_block.name, "OriginalTool");
  assert.equal(aliases.size, 1, "the caller's alias map remains immutable");
  assertWireBody(returned, calls);
});

for (const anthropic of [false, true]) {
  for (const chained of [false, true]) {
    test(`#14629 CPA field400 ${anthropic ? "messages" : "chat"}${chained ? " follows reasoning" : " directly"}`, async () => {
      const body = {
        ...requestBody(anthropic),
        verbosity: "high",
        temperature: 0.2,
        ...(chained ? { reasoning_effort: "none" } : {}),
      };
      const originalBody = structuredClone(body);
      const calls = interceptRequests([
        ...(chained ? [{ status: 400, body: reasoningRejected }] : []),
        { status: 400, body: { error: { message: "Unknown field: verbosity" } } },
        success,
      ]);
      const controller = new AbortController();
      const result = await new CliproxyapiExecutor().execute({
        model,
        body,
        stream: false,
        credentials,
        signal: controller.signal,
        upstreamExtraHeaders: { "x-test-recovery": "preserved" },
      });
      assert.equal(result.response.status, 200);
      assert.equal(calls.length, chained ? 3 : 2);
      assert.equal(calls.at(-1)!.body.verbosity, undefined);
      assert.equal(calls.at(-1)!.body.temperature, 0.2);
      if (chained) assert.equal(calls.at(-1)!.body.reasoning_effort, "low");
      for (const call of calls) {
        assert.equal(call.url, calls[0].url);
        assert.deepEqual(call.headers, calls[0].headers);
        assert.equal(call.headers.get("x-test-recovery"), "preserved");
        assert.equal(call.headers.get("authorization"), "Bearer synthetic-cpa-key");
        assert.equal(call.signal, calls[0].signal);
      }
      controller.abort();
      assert.equal(calls.at(-1)!.signal?.aborted, true);
      assertWireBody(result.transformedBody, calls);
      if (anthropic) assertMcpRestoration(result.transformedBody as Record<string, unknown>);
      assert.deepEqual(body, originalBody);
    });
  }
}

for (const anthropic of [false, true]) {
  for (const carrier of anthropic
    ? ["reasoning_effort", "reasoning"]
    : ["reasoning_effort", "reasoning", "output_config"]) {
    test(`#14629 CPA reuses learned ${carrier} (${anthropic ? "messages" : "chat"})`, async () => {
      const effort = carrier === "reasoning_effort" ? "none" : { effort: "none" };
      const body = { ...requestBody(anthropic), [carrier]: effort };
      const originalBody = structuredClone(body);
      const calls = interceptRequests([{ status: 400, body: reasoningRejected }, success, success]);
      const executor = new CliproxyapiExecutor();
      const input = { model, body, stream: false, credentials };
      assert.equal((await executor.execute(input)).response.status, 200);
      const result = await executor.execute(input);
      assert.equal(result.response.status, 200);
      assert.equal(calls.length, 3);
      assert.deepEqual(
        calls[2].body[carrier],
        carrier === "reasoning_effort" ? "low" : { effort: "low" }
      );
      assertWireBody(result.transformedBody, calls);
      if (anthropic) assertMcpRestoration(result.transformedBody as Record<string, unknown>);
      assert.deepEqual(body, originalBody);
    });
  }
}
