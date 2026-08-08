// #9780 — the Responses namespace identity map must survive the hub-and-spoke
// pivot in translator/index.ts. Step 1 flattens namespace sub-tools (#8295) and
// records `{namespace, name}`; step 2 returns a new object and used to drop it,
// leaving the #7936 seam with null and Codex rejecting `unsupported call`.
// A naive copy-through is not an option: openai-to-claude/gemini publish their
// own alias map on `_toolNameMap`, hence the dedicated channel asserted here.
import test from "node:test";
import assert from "node:assert/strict";

await import("../../open-sse/translator/bootstrap.ts");
const { translateRequest, initState } = await import("../../open-sse/translator/index.ts");
const { openaiToOpenAIResponsesResponse } = await import(
  "../../open-sse/translator/response/openai-responses.ts"
);
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type NamespaceIdentity = { namespace: string; name: string };

const NAMESPACE_REQUEST = {
  model: "any-model",
  instructions: "coding agent",
  input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "go" }] }],
  tools: [
    {
      type: "namespace",
      name: "functions",
      tools: [
        {
          name: "exec",
          description: "Run a shell command",
          parameters: {
            type: "object",
            properties: { cmd: { type: "string" } },
            required: ["cmd"],
          },
        },
      ],
    },
  ],
};

function pivot(targetFormat: string): Record<string, unknown> {
  return translateRequest(
    "openai-responses",
    targetFormat,
    "any-model",
    structuredClone(NAMESPACE_REQUEST),
    true,
    null,
    null,
    null
  ) as Record<string, unknown>;
}

function identityOf(body: Record<string, unknown>) {
  const map = body._namespaceToolIdentityMap;
  assert.ok(map instanceof Map, "expected a _namespaceToolIdentityMap after the pivot");
  return map as Map<string, NamespaceIdentity>;
}

test("#9780: namespace identity survives the openai-responses -> kiro pivot", () => {
  const identity = identityOf(pivot("kiro"));

  assert.equal(identity.size, 1);
  assert.deepEqual(identity.get("functions__exec"), { namespace: "functions", name: "exec" });
});

test("#9780: namespace identity survives the openai-responses -> cursor pivot", () => {
  const identity = identityOf(pivot("cursor"));

  assert.deepEqual(identity.get("functions__exec"), { namespace: "functions", name: "exec" });
});

// Regression guard: these two appeared to "keep" a map before the fix, but it
// was the alias map.
for (const target of ["claude", "gemini"]) {
  test(`#9780: ${target} pivot keeps its alias map AND the namespace identity`, () => {
    const body = pivot(target);
    const identity = identityOf(body);

    assert.deepEqual(identity.get("functions__exec"), { namespace: "functions", name: "exec" });

    // The alias channel must be untouched: string values, not identities.
    const aliases = body._toolNameMap;
    assert.ok(aliases instanceof Map, `${target} must still publish its alias map`);
    for (const value of (aliases as Map<string, unknown>).values()) {
      assert.equal(typeof value, "string", `${target} alias values must stay strings`);
    }
  });
}

// Same-format requests are never flattened, so an absent map is correct here.
test("#9780: same-format openai-responses request is not flattened at all", () => {
  const body = pivot("openai-responses");
  const tools = body.tools as Array<Record<string, unknown>>;

  assert.equal(tools[0].type, "namespace");
  assert.equal((tools[0].tools as Array<{ name: string }>)[0].name, "exec");
  assert.equal(body._namespaceToolIdentityMap, undefined);
});

test("#9780: the identity channel is non-enumerable and never serializes", () => {
  const body = pivot("kiro");

  assert.ok(body._namespaceToolIdentityMap instanceof Map);
  assert.equal(
    Object.prototype.propertyIsEnumerable.call(body, "_namespaceToolIdentityMap"),
    false
  );
  assert.equal("_namespaceToolIdentityMap" in JSON.parse(JSON.stringify(body)), false);
});

// End-to-end: request pivot + response seam, i.e. what the Codex adjudicator
// actually receives. Before the fix every target emitted `functions__exec` with
// no namespace, which is the reported `unsupported call`.
for (const target of ["kiro", "cursor", "claude", "gemini"]) {
  test(`#9780: ${target} round-trip returns the declared name and its namespace`, () => {
    const body = pivot(target);
    const state = initState(FORMATS.OPENAI_RESPONSES) as Record<string, unknown>;
    state.requestToolIdentityMap = body._namespaceToolIdentityMap;

    // The upstream echoes the flattened wire name (#8295).
    const events = openaiToOpenAIResponsesResponse(
      {
        id: "chatcmpl-9780",
        model: "any-model",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  index: 0,
                  id: "call_9780",
                  type: "function",
                  function: { name: "functions__exec", arguments: '{"cmd":"git status"}' },
                },
              ],
            },
            finish_reason: "tool_calls",
          },
        ],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      },
      state
    ) as Array<{ event: string; data: { item?: NamespaceIdentity } }>;

    const added = events.find((e) => e.event === "response.output_item.added")?.data.item;
    assert.ok(added, "expected response.output_item.added");
    assert.deepEqual(
      { name: added.name, namespace: added.namespace },
      { name: "exec", namespace: "functions" }
    );
  });
}
