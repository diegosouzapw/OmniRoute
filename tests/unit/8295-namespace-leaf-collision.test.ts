// #8295 — two Responses "namespace" tool groups that declare a child with the
// same leaf name must not collapse into duplicate Chat Completions
// `tool.function.name` entries. Every strict-name-uniqueness upstream
// (DeepSeek, reported in the issue) 400s on `{name:"_search"},{name:"_search"}`.
import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } = await import(
  "../../open-sse/translator/request/openai-responses.ts"
);

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

test("#8295: two namespaces sharing a leaf name must not produce duplicate Chat tool names", () => {
  const result = translate([
    {
      type: "namespace",
      name: "mcp__codex_apps__atlassian_rovo",
      tools: [{ name: "_search", parameters: { type: "object" } }],
    },
    {
      type: "namespace",
      name: "mcp__codex_apps__linear",
      tools: [{ name: "_search", parameters: { type: "object" } }],
    },
  ]);

  const names = result.tools.map((tool) => tool.function.name);
  assert.equal(
    new Set(names).size,
    names.length,
    `translated Chat tool names must be unique, got: ${JSON.stringify(names)}`
  );
  assert.deepEqual(names, [
    "mcp__codex_apps__atlassian_rovo___search",
    "mcp__codex_apps__linear___search",
  ]);
});

test("#8295: qualified wire names round-trip back to {namespace, name} via the identity ledger", () => {
  const result = translate([
    {
      type: "namespace",
      name: "mcp__codex_apps__atlassian_rovo",
      tools: [{ name: "_search", parameters: { type: "object" } }],
    },
    {
      type: "namespace",
      name: "mcp__codex_apps__linear",
      tools: [{ name: "_search", parameters: { type: "object" } }],
    },
  ]);

  assert.ok(result._toolNameMap instanceof Map);
  const rovo = result._toolNameMap.get("mcp__codex_apps__atlassian_rovo___search");
  const linear = result._toolNameMap.get("mcp__codex_apps__linear___search");
  assert.deepEqual(rovo, { namespace: "mcp__codex_apps__atlassian_rovo", name: "_search" });
  assert.deepEqual(linear, { namespace: "mcp__codex_apps__linear", name: "_search" });
});
