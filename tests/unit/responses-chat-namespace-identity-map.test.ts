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

// #8295 — namespace sub-tools are flattened to Chat with the NAMESPACE-QUALIFIED
// name as the wire-visible `tool.function.name` (folding the namespace into the
// wire name, superseding #7905/#7936's bare-leaf contract), so two namespaces that
// declare a child with the same leaf name never collapse into duplicate Chat
// `tool.function.name` entries. The original `{namespace, name}` pair is carried
// in a side-band `_toolNameMap` for the response translator to restore on
// `response.output_item.*` items.
test("namespace children get namespace-qualified wire names + side-band identity ledger", () => {
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

  // Wire-visible names fold the namespace in, so mcp__alpha/read and mcp__beta/read
  // (same leaf, different namespace) never collide into duplicate Chat tool names.
  assert.deepEqual(
    result.tools.map((tool) => tool.function.name),
    ["mcp__alpha__read", "mcp__beta__read", "mcp__trailing__write", "top_level"]
  );

  // Side-band identity ledger keys on the qualified wire name, so the response
  // translator can resolve back to `{namespace, name}` without parsing. Qualified
  // names cannot collide across namespaces, so every namespace child gets an entry
  // — there is no more ambiguity to detect/drop.
  assert.ok(result._toolNameMap instanceof Map);
  assert.deepEqual(
    [...result._toolNameMap.entries()],
    [
      ["mcp__alpha__read", { namespace: "mcp__alpha", name: "read" }],
      ["mcp__beta__read", { namespace: "mcp__beta", name: "read" }],
      ["mcp__trailing__write", { namespace: "mcp__trailing__", name: "write" }],
    ]
  );
});
