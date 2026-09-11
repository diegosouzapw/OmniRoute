import test from "node:test";
import assert from "node:assert/strict";
import {
  extractRequestToolMetadata,
  resolveResponseToolNameMap,
} from "../../open-sse/handlers/chatCore/requestToolIdentity.ts";

await import("../../open-sse/translator/bootstrap.ts");
const { translateRequest, translateResponse, initState } =
  await import("../../open-sse/translator/index.ts");

const names = ["mcp__graft__freshness", "mcp_graft_freshness"];
const request = {
  model: "gemini-3.7-flash-low",
  input: "Use the requested tool",
  tools: [
    {
      type: "namespace",
      name: "functions",
      tools: names.map((name) => ({
        type: "function",
        name,
        description: "Return a test value",
        parameters: {
          type: "object",
          properties: { token: { type: "string" } },
          required: ["token"],
        },
      })),
    },
    {
      type: "function",
      name: "mcp__memory__health",
      parameters: { type: "object", properties: {} },
    },
    { type: "function", name: "mcp_memory_health", parameters: { type: "object", properties: {} } },
  ],
};
type WireRequest = { tools: Array<{ functionDeclarations: Array<{ name: string }> }> };
type Event = {
  event: string;
  data: {
    item?: { type?: string; name?: string; namespace?: string; arguments?: string };
    response?: { output?: Array<{ name?: string; namespace?: string }> };
  };
};

for (const target of ["gemini", "antigravity"]) {
  test(`${target}: both namespace identities and sanitizer aliases survive chatCore extraction`, () => {
    const body = translateRequest(
      "openai-responses",
      target,
      request.model,
      structuredClone(request),
      true,
      { projectId: "test-project" },
      null,
      "antigravity"
    ) as Record<string, unknown>;
    const aliasesBefore = body._toolNameMap as Map<string, string>;
    const identitiesBefore = body._namespaceToolIdentityMap;
    assert(aliasesBefore instanceof Map);
    assert(identitiesBefore instanceof Map);
    const metadata = extractRequestToolMetadata(body);
    assert.deepEqual(metadata.toolNameAliasMap, aliasesBefore);
    assert.equal(metadata.requestToolIdentityMap, identitiesBefore);
    assert.equal(body._toolNameMap, undefined);
    assert.equal(body._namespaceToolIdentityMap, undefined);
    const serialized = JSON.stringify(body);
    assert(!serialized.includes("_toolNameMap"));
    assert(!serialized.includes("_namespaceToolIdentityMap"));
  });

  test(`${target}: sanitized colliding MCP names return exact Responses namespace/name pairs`, () => {
    const body = translateRequest(
      "openai-responses",
      target,
      request.model,
      structuredClone(request),
      true,
      { projectId: "test-project" },
      null,
      "antigravity"
    ) as Record<string, unknown>;
    const wire = (target === "antigravity" ? body.request : body) as WireRequest;
    const wireNames = wire.tools
      .flatMap((tool) => tool.functionDeclarations ?? [])
      .map((tool) => tool.name);
    assert.equal(new Set(wireNames).size, 4);
    assert(
      wireNames.some((name) => /_[a-f0-9]{8,}$/.test(name)),
      "precondition: real sanitizer collision"
    );
    const { requestToolIdentityMap, toolNameAliasMap } = extractRequestToolMetadata(body);
    const expected = [
      ...names.map((name) => ({ namespace: "functions", name })),
      { namespace: undefined, name: "mcp__memory__health" },
      { namespace: undefined, name: "mcp_memory_health" },
    ];
    wireNames.forEach((name, index) => {
      const state = initState("openai-responses") as Record<string, unknown>;
      state.requestToolIdentityMap = requestToolIdentityMap;
      state.toolNameMap = resolveResponseToolNameMap(
        body._toolNameMap ?? toolNameAliasMap,
        null,
        requestToolIdentityMap
      );
      const payload = {
        responseId: `resp-${index}`,
        modelVersion: request.model,
        candidates: [
          {
            content: { parts: [{ functionCall: { name, args: { token: "ok" } } }] },
            finishReason: "STOP",
          },
        ],
      };
      const events: Event[] = [
        ...translateResponse(
          target,
          "openai-responses",
          target === "antigravity" ? { response: payload } : payload,
          state
        ),
        ...translateResponse(target, "openai-responses", null, state),
      ];
      for (const eventName of ["response.output_item.added", "response.output_item.done"]) {
        const item = events.find(
          (event) => event.event === eventName && event.data.item?.type === "function_call"
        )?.data.item;
        assert(item, `${eventName}: missing function call`);
        assert.deepEqual(
          { namespace: item.namespace ?? undefined, name: item.name },
          expected[index]
        );
      }
      const output = events.find((event) => event.event === "response.completed")?.data.response
        ?.output;
      assert(output, "missing terminal response.completed");
      const item = output.find((item) => item.name);
      assert.deepEqual(
        { namespace: item?.namespace ?? undefined, name: item?.name },
        expected[index]
      );
    });
  });
}

test("namespace-only metadata never becomes a string alias map", () => {
  const identity = new Map([["functions__read", { namespace: "functions", name: "read" }]]);
  const metadata = extractRequestToolMetadata({
    _namespaceToolIdentityMap: identity,
    _toolNameMap: identity,
  });
  assert.equal(metadata.toolNameAliasMap, null);
  assert.equal(metadata.requestToolIdentityMap, identity);
});

test("parallel native MCP calls after reasoning keep distinct output identities", () => {
  const expected = [
    { namespace: "mcp__graft", name: "graft_check_freshness" },
    { namespace: "mcp__openviking_memory", name: "health" },
  ];
  const body = translateRequest(
    "openai-responses",
    "antigravity",
    request.model,
    {
      input: "Call both health tools",
      tools: expected.map((tool) => ({
        type: "namespace",
        name: tool.namespace,
        tools: [
          {
            type: "function",
            name: tool.name,
            parameters: { type: "object", properties: {} },
          },
        ],
      })),
    },
    true,
    { projectId: "test-project" },
    null,
    "antigravity"
  ) as Record<string, unknown>;
  const wireNames = (body.request as WireRequest).tools
    .flatMap((tool) => tool.functionDeclarations)
    .map((tool) => tool.name);
  const metadata = extractRequestToolMetadata(body);
  const state = initState("openai-responses") as Record<string, unknown>;
  state.requestToolIdentityMap = metadata.requestToolIdentityMap;
  state.toolNameMap = metadata.toolNameAliasMap;
  const events = [
    ...translateResponse(
      "antigravity",
      "openai-responses",
      {
        response: {
          responseId: "parallel",
          candidates: [{ content: { parts: [{ text: "Checking both tools", thought: true }] } }],
        },
      },
      state
    ),
    ...translateResponse(
      "antigravity",
      "openai-responses",
      {
        response: {
          responseId: "parallel",
          candidates: [
            {
              content: {
                parts: wireNames.map((name, index) => ({
                  functionCall: { id: `parallel-${index}`, name, args: {} },
                })),
              },
              finishReason: "STOP",
            },
          ],
        },
      },
      state
    ),
    ...translateResponse("antigravity", "openai-responses", null, state),
  ];
  const terminal = events.filter((event) => event.event === "response.completed");
  assert.equal(terminal.length, 1);
  const calls = terminal[0].data.response.output.filter((item) => item.type === "function_call");
  assert.equal(calls.length, 2);
  assert.equal(new Set(calls.map((item) => item.call_id)).size, 2);
  assert.deepEqual(
    calls.map((item) => ({ namespace: item.namespace, name: item.name })),
    expected
  );
  for (const eventName of ["response.output_item.added", "response.output_item.done"]) {
    const items = events.filter(
      (event) => event.event === eventName && event.data.item?.type === "function_call"
    );
    assert.equal(items.length, 2);
    assert.equal(new Set(items.map((event) => event.data.output_index)).size, 2);
    assert.deepEqual(
      items.map((event) => ({ namespace: event.data.item.namespace, name: event.data.item.name })),
      expected
    );
  }
});

test("alias-only extraction remains compatible and empty requests have no metadata", () => {
  const aliases = new Map([["mcp_graft_health", "mcp__graft__health"]]);
  const body = { _toolNameMap: aliases };
  const metadata = extractRequestToolMetadata(body);
  assert.deepEqual(metadata.toolNameAliasMap, aliases);
  assert.equal(body._toolNameMap, undefined);
  assert.deepEqual(extractRequestToolMetadata({}), {
    requestToolIdentityMap: null,
    toolNameAliasMap: null,
  });
});

for (const target of ["gemini", "antigravity"]) {
  test(`${target}: tool-result replay does not grow collision hashes over repeated turns`, () => {
    const input: Array<Record<string, unknown>> = [{ role: "user", content: "Use the first tool" }];
    let previousWireNames: string[] | undefined;
    for (let turn = 0; turn < 4; turn++) {
      const body = translateRequest(
        "openai-responses",
        target,
        request.model,
        { ...structuredClone(request), input: structuredClone(input) },
        true,
        { projectId: "test-project" },
        null,
        "antigravity"
      ) as Record<string, unknown>;
      const wire = (target === "antigravity" ? body.request : body) as WireRequest;
      const wireNames = wire.tools
        .flatMap((tool) => tool.functionDeclarations ?? [])
        .map((tool) => tool.name);
      if (previousWireNames) assert.deepEqual(wireNames, previousWireNames);
      previousWireNames = wireNames;
      const { requestToolIdentityMap, toolNameAliasMap } = extractRequestToolMetadata(body);
      const state = initState("openai-responses") as Record<string, unknown>;
      state.requestToolIdentityMap = requestToolIdentityMap;
      state.toolNameMap = resolveResponseToolNameMap(
        body._toolNameMap ?? toolNameAliasMap,
        null,
        requestToolIdentityMap
      );
      const payload = {
        responseId: `replay-${turn}`,
        modelVersion: request.model,
        candidates: [
          {
            content: { parts: [{ functionCall: { name: wireNames[0], args: { token: "ok" } } }] },
            finishReason: "STOP",
          },
        ],
      };
      const events = [
        ...translateResponse(
          target,
          "openai-responses",
          target === "antigravity" ? { response: payload } : payload,
          state
        ),
        ...translateResponse(target, "openai-responses", null, state),
      ];
      const item = events.find(
        (event) =>
          event.event === "response.output_item.done" && event.data.item?.type === "function_call"
      )?.data.item;
      assert(item);
      assert.equal(item.name, names[0]);
      assert.equal(item.namespace, "functions");
      input.push(item, { type: "function_call_output", call_id: item.call_id, output: "ok" });
    }
  });
}
