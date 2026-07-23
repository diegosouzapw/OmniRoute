import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");
const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type NamespaceIdentity = { namespace: string; name: string };
type RuntimeState = ReturnType<typeof initState> & {
  requestToolIdentityMap?: Map<string, NamespaceIdentity>;
};

// Build the side-band identity ledger for a single namespace sub-tool. The
// ledger keys on the BARE LEAF the model echoes back on the Chat wire; the
// response translator resolves back to `{namespace, name}` without splitting.
function identityMapFor(namespace: string, name: string) {
  const request = openaiResponsesToOpenAIRequest(
    "any-model",
    {
      input: [
        {
          type: "additional_tools",
          tools: [{ type: "namespace", name: namespace, tools: [{ name }] }],
        },
        { type: "message", role: "user", content: [{ type: "input_text", text: "go" }] },
      ],
    },
    false,
    { provider: "any-provider" }
  ) as {
    _toolNameMap?: Map<string, NamespaceIdentity>;
    tools: Array<{ function: { name: string } }>;
  };
  assert.ok(request._toolNameMap instanceof Map);
  return request._toolNameMap;
}

function collectToolEvents(
  name: string,
  callId: string,
  requestToolIdentityMap?: Map<string, NamespaceIdentity>
) {
  const state = initState(FORMATS.OPENAI_RESPONSES) as RuntimeState;
  state.requestToolIdentityMap = requestToolIdentityMap;
  const first = openaiToOpenAIResponsesResponse(
    {
      id: "chatcmpl-namespace-identity",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: callId,
                type: "function",
                function: { name, arguments: '{"path":"/tmp/file"}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
    },
    state
  );
  return first;
}

type ResponseItem = { type: string; name: string; namespace?: string };
type ResponseEvent = {
  event: string;
  data: { item?: ResponseItem; response?: { output?: ResponseItem[] } };
};

function functionItems(events: ResponseEvent[]) {
  const added = events.find((event) => event.event === "response.output_item.added");
  const done = events.find((event) => event.event === "response.output_item.done");
  const completed = events.find((event) => event.event === "response.completed");
  assert.ok(added?.data.item, "expected response.output_item.added");
  assert.ok(done?.data.item, "expected response.output_item.done");
  assert.ok(completed?.data.response?.output?.[0], "expected response.completed");
  return {
    added: added.data.item,
    done: done.data.item,
    completed: completed.data.response.output[0],
  };
}

// The model echoes back `tool_list` (the bare leaf we stamped on the Chat wire in
// #7905). The response translator resolves that leaf against the side-band ledger
// and emits the codex-compatible `{namespace, name}` tuple on every output item.
test("Chat -> Responses emits namespace tuple in added, done, and completed output", () => {
  const leaf = "tool_list";
  const events = collectToolEvents(leaf, "call_1mcp", identityMapFor("mcp__1mcp", "tool_list"));
  for (const item of Object.values(functionItems(events))) {
    assert.deepEqual(
      { namespace: item.namespace, name: item.name },
      { namespace: "mcp__1mcp", name: "tool_list" }
    );
  }
});

// Multiple namespaces share the same leaf name. The ledger entry for that leaf is
// ambiguous and dropped (see openai-responses.ts request translator), so the bare
// leaf echoes back verbatim with no `namespace` field — the codex client falls
// back to its own native dispatch table lookup by `name`.
test("Chat -> Responses leaves ambiguous leaves without a namespace (collision safety)", () => {
  // Build one ledger whose leaf "read" exists from two namespaces: ambiguous → dropped.
  const request = openaiResponsesToOpenAIRequest(
    "any-model",
    {
      input: [
        {
          type: "additional_tools",
          tools: [
            { type: "namespace", name: "mcp__alpha", tools: [{ name: "read" }] },
            { type: "namespace", name: "mcp__beta", tools: [{ name: "read" }] },
          ],
        },
        { type: "message", role: "user", content: [{ type: "input_text", text: "go" }] },
      ],
    },
    false,
    { provider: "any-provider" }
  ) as { _toolNameMap?: Map<string, NamespaceIdentity> };
  // Ambiguous leaf dropped → whole ledger is empty → _toolNameMap not injected at
  // all (translator skips defineProperty when size === 0).
  assert.ok(!request._toolNameMap || request._toolNameMap.size === 0);

  const events = collectToolEvents("read", "call_amb", request._toolNameMap);
  for (const item of Object.values(functionItems(events))) {
    assert.equal(item.name, "read");
    assert.equal("namespace" in item, false);
  }
});

// A precompiled ledger (e.g. #2195 Atlassian nested namespace tenant) supplies
// its own mapped identity, overriding the leaf lookup. The response translator
// resolves whatever key the model echoed back against this ledger.
test("Chat -> Responses restores a precompiled Atlassian nested namespace", () => {
  const leaf = "read_issue";
  const events = collectToolEvents(
    leaf,
    "call_atlassian",
    new Map([[leaf, { namespace: "mcp__atlassian__cloud__tenant", name: "read_issue" }]])
  );
  for (const item of Object.values(functionItems(events))) {
    assert.deepEqual(
      { namespace: item.namespace, name: item.name },
      { namespace: "mcp__atlassian__cloud__tenant", name: "read_issue" }
    );
  }
});

test("Chat -> Responses leaves unmapped top-level tools without a namespace", () => {
  const events = collectToolEvents("list_mcp_resources", "call_top_level");
  for (const item of Object.values(functionItems(events))) {
    assert.equal(item.name, "list_mcp_resources");
    assert.equal("namespace" in item, false);
  }
});

test("Chat -> Responses keeps apply_patch as a custom tool without namespace restoration", () => {
  const events = collectToolEvents("apply_patch", "call_patch");
  const added = events.find((event) => event.event === "response.output_item.added");
  const done = events.find((event) => event.event === "response.output_item.done");
  const completed = events.find((event) => event.event === "response.completed");
  assert.ok(added);
  assert.ok(done);
  assert.ok(completed);
  for (const item of [added.data.item, done.data.item, completed.data.response.output[0]]) {
    assert.equal(item.type, "custom_tool_call");
    assert.equal(item.name, "apply_patch");
    assert.equal("namespace" in item, false);
  }
});

test("Chat -> Responses keeps same leaves isolated between per-request stream states", () => {
  // Two independent streams issuing the same bare leaf "read" resolve to
  // different namespaces because the ledger is per-request, not global.
  const firstMap = identityMapFor("mcp__shared", "read");
  const secondMap = new Map(firstMap);
  secondMap.delete("read");
  secondMap.set("read", { namespace: "mcp__two", name: "read" });

  const first = functionItems(collectToolEvents("read", "call_one", firstMap));
  const second = functionItems(collectToolEvents("read", "call_two", secondMap));
  assert.deepEqual(
    { namespace: first.completed.namespace, name: first.completed.name },
    { namespace: "mcp__shared", name: "read" }
  );
  assert.deepEqual(
    { namespace: second.completed.namespace, name: second.completed.name },
    { namespace: "mcp__two", name: "read" }
  );
});
