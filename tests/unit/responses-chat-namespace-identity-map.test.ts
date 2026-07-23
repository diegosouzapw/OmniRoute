import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

type NamespaceIdentity = { namespace: string; name: string };
type ChatRequest = {
  tools: Array<{ function: { name: string } }>;
  _toolNameMap?: Map<string, NamespaceIdentity>;
};

function translate(tools: unknown[]): ChatRequest {
  return openaiResponsesToOpenAIRequest(
    "any-model",
    {
      input: [
        { type: "additional_tools", tools },
        { type: "message", role: "user", content: [{ type: "input_text", text: "go" }] },
      ],
    },
    false,
    { provider: "any-provider" }
  ) as ChatRequest;
}

// #7936 — namespace sub-tools are flattened to Chat with the BARE LEAF as the
// wire-visible `tool.function.name` (per #7905's chat-completions contract), while
// the original `{namespace, name}` pair is carried in a side-band `_toolNameMap`
// for the response translator to restore on `response.output_item.*` items.
test("namespace children keep bare-leaf wire name + side-band identity ledger", () => {
  const result = translate([
    {
      type: "namespace",
      name: "mcp__alpha",
      tools: [{ name: "read", parameters: { type: "object" } }],
    },
    {
      type: "namespace",
      name: "mcp__beta",
      tools: [{ name: "read", parameters: { type: "object" } }],
    },
    {
      type: "namespace",
      name: "mcp__trailing__",
      tools: [{ name: "write", parameters: { type: "object" } }],
    },
    { type: "function", name: "top_level", parameters: { type: "object" } },
  ]);

  // Wire-visible names stay as bare leaves (mcp__alpha sends the model "read", not
  // "mcp__alpha__read", avoiding upstream truncation/rewriting of long `__` names
  // by non-OpenAI providers).
  assert.deepEqual(
    result.tools.map((tool) => tool.function.name),
    ["read", "read", "write", "top_level"]
  );

  // Side-band identity ledger keys on the bare leaf emitted on the wire, so the
  // response translator can resolve back to `{namespace, name}` without parsing.
  // When the same leaf belongs to two different namespaces (mcp__alpha/read and
  // mcp__beta/read), the entry is ambiguous and dropped — the response translator
  // then echoes the bare leaf with no `namespace`, leaving the codex client to
  // fall back to its native dispatch table.
  assert.ok(result._toolNameMap instanceof Map);
  assert.deepEqual(
    [...result._toolNameMap.entries()],
    [["write", { namespace: "mcp__trailing__", name: "write" }]]
  );
  assert.ok(!result._toolNameMap.has("read"), "ambiguous read leaf must be dropped");
});
