import test from "node:test";
import assert from "node:assert/strict";

// Regression for port-from-9router#1534: when a Codex CLI client routes a
// Responses-API request to a non-Codex backend (e.g. kr/claude-opus-4.7), MCP
// servers are declared as `namespace` tools — { type:"namespace", name, tools:[...] }.
// The Responses→Chat translator had no namespace branch, so each namespace
// collapsed into a single empty-schema function named `mcp__<server>__`, dropping
// every sub-tool. Any MCP call then failed with `unsupported call: mcp__<server>__`.
const { openaiResponsesToOpenAIRequest } = await import(
  "../../open-sse/translator/request/openai-responses.ts"
);

test("#1534: namespace MCP tools flatten into one Chat function per sub-tool", () => {
  const body = {
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    tools: [
      {
        type: "namespace",
        name: "mcp__ctx7__",
        tools: [
          {
            name: "mcp__ctx7__get_docs",
            description: "Get library docs",
            parameters: {
              type: "object",
              properties: { id: { type: "string" } },
              required: ["id"],
            },
          },
          {
            name: "mcp__ctx7__search",
            description: "Search docs",
            parameters: { type: "object", properties: { q: { type: "string" } } },
          },
        ],
      },
    ],
  };

  const out = openaiResponsesToOpenAIRequest("kr/claude-opus-4.7", body, false, {}) as {
    tools: { type: string; function: { name: string; parameters?: unknown } }[];
  };

  const names = out.tools.map((t) => t.function?.name).sort();
  assert.deepEqual(names, ["mcp__ctx7__get_docs", "mcp__ctx7__search"]);

  // The empty namespace placeholder must NOT survive.
  assert.equal(
    out.tools.some((t) => t.function?.name === "mcp__ctx7__"),
    false,
    "the empty `mcp__ctx7__` namespace placeholder must not be emitted"
  );

  // Each flattened function keeps its own parameters.
  const getDocs = out.tools.find((t) => t.function.name === "mcp__ctx7__get_docs");
  assert.ok(getDocs?.function.parameters, "sub-tool parameters must be preserved");
  assert.deepEqual((getDocs!.function.parameters as { required?: string[] }).required, ["id"]);
});

test("#1534: an empty namespace (no sub-tools) is dropped, not turned into a broken function", () => {
  const body = {
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    tools: [{ type: "namespace", name: "mcp__empty__", tools: [] }],
  };

  const out = openaiResponsesToOpenAIRequest("kr/claude-opus-4.7", body, false, {}) as {
    tools: unknown[];
  };

  assert.equal(out.tools.length, 0, "an empty namespace yields no tools");
});
