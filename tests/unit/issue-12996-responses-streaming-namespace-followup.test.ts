// #12996 — Responses streaming drops MCP namespace identity on a follow-up
// turn of the same Codex/MCP session, when that turn doesn't re-declare its
// `type:"namespace"` tools (relying instead on `previous_response_id` /
// session continuity, standard OpenAI Responses API semantics).
//
// Root cause: `resolveRequestToolIdentity` (the #7936/#9780 seam) only ever
// resolved a streamed Responses `function_call` item's `{namespace, name}`
// from the CURRENT request's own `requestToolIdentityMap`, built solely from
// that request's own `tools: [{type:"namespace", ...}]` declarations.
// OmniRoute is a stateless-upstream-by-default proxy for the Responses API
// (see open-sse/utils/responsesStatePolicy.ts), so nothing persists the
// namespace identity across separate top-level HTTP requests — every
// follow-up turn re-enters translation with a fresh, request-scoped map.
import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");
const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { resolveRequestToolIdentity } =
  await import("../../open-sse/translator/response/openai-responses/requestToolIdentity.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { extractRequestToolIdentityMap } =
  await import("../../open-sse/handlers/chatCore/requestToolIdentity.ts");

type NamespaceIdentity = { namespace: string; name: string };
type RuntimeState = ReturnType<typeof initState> & {
  requestToolIdentityMap?: Map<string, NamespaceIdentity> | null;
};

const WIRE_NAME = "mcp__node_repl__js";

function translateCodexTurn(declareNamespaceTool: boolean) {
  const tools = declareNamespaceTool
    ? [{ type: "namespace", name: "mcp__node_repl", tools: [{ name: "js" }] }]
    : [];
  const body = {
    tools,
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "run js" }] }],
  };
  const translatedBody = openaiResponsesToOpenAIRequest("kimi-k3", body, true, {
    provider: "kimi",
  }) as Record<string, unknown>;
  return extractRequestToolIdentityMap(translatedBody);
}

function streamToolCall(
  requestToolIdentityMap: Map<string, NamespaceIdentity> | null,
  wireName: string = WIRE_NAME
) {
  const state = initState(FORMATS.OPENAI_RESPONSES) as RuntimeState;
  state.requestToolIdentityMap = requestToolIdentityMap;
  const events = openaiToOpenAIResponsesResponse(
    {
      id: "chatcmpl-12996",
      model: "kimi-k3",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                type: "function",
                function: { name: wireName, arguments: '{"code":"1+1"}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
    },
    state
  ) as Array<{
    event: string;
    data: { item?: { type: string; name: string; namespace?: string } };
  }>;
  const added = events.find((e) => e.event === "response.output_item.added");
  assert.ok(added?.data.item, "expected response.output_item.added for the tool call");
  return added.data.item as { type: string; name: string; namespace?: string };
}

test("turn 1 (tools declared): namespace is restored on the streamed function_call", () => {
  const identityMap = translateCodexTurn(true);
  assert.ok(
    identityMap instanceof Map && identityMap.size > 0,
    "turn 1 must produce an identity map"
  );
  const item = streamToolCall(identityMap);
  assert.equal(item.name, "js");
  assert.equal(item.namespace, "mcp__node_repl");
});

test(
  "fix #12996: turn 2 of the SAME Codex session, calling the SAME mcp__node_repl__js tool, " +
    "but the follow-up request does not re-declare the namespace tool (as a Codex-style " +
    "client relying on previous_response_id / server-side session continuity would send): " +
    "the namespace identity must still be restored on the streamed function_call.",
  () => {
    const identityMap = translateCodexTurn(false);
    assert.equal(identityMap, null, "turn 2's own request carries no namespace tool declaration");

    const item = streamToolCall(identityMap);

    assert.equal(item.namespace, "mcp__node_repl", "namespace must survive a follow-up turn");
    assert.equal(item.name, "js", "leaf name must be restored, not the raw flattened wire name");
  }
);

test("fallback does not misfire on an unrelated flat tool name containing __ that was never namespace-declared", () => {
  // Never started life as a `type:"namespace"` group — a plain function tool
  // whose author happened to pick a `foo__bar`-shaped name. It must not gain
  // a namespace field just because it contains `__`.
  const item = streamToolCall(null, "foo__bar");
  assert.equal(item.name, "foo__bar");
  assert.equal("namespace" in item, false, "unrelated __ tool name must not get a namespace field");
});

test("fallback correctly splits on the LAST __ when the leaf name itself never contains __", () => {
  // Direct unit coverage of the split boundary (namespace container itself
  // legitimately contains __, e.g. mcp__<server>).
  const identity = resolveRequestToolIdentity(null, "mcp__atlassian__read_issue");
  assert.deepEqual(identity, { namespace: "mcp__atlassian", name: "read_issue" });
});

test("fallback yields null for a bare mcp__ prefix with nothing to split", () => {
  assert.equal(resolveRequestToolIdentity(null, "mcp__"), null);
  assert.equal(resolveRequestToolIdentity(new Map(), "mcp__"), null);
});

test("a populated identity map still takes precedence over the wire-name fallback", () => {
  // If a follow-up turn DOES carry a (different) identity map entry for the
  // same wire name, that explicit mapping must win over the generic split.
  const map = new Map([[WIRE_NAME, { namespace: "mcp__override", name: "js" }]]);
  const item = streamToolCall(map);
  assert.equal(item.namespace, "mcp__override");
  assert.equal(item.name, "js");
});
