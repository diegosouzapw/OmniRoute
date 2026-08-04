// #7532 — Responses -> Chat translation silently dropped `tool_search`, breaking
// Codex's deferred tool-discovery protocol for any built-in (non-openai-compatible-*)
// provider that gets downgraded from a Responses-shaped request to Chat Completions.
//
// Fix: `tool_search` (execution: "client", per Codex's wire shape) is a client-executed
// tool exactly like the existing `local_shell` -> `shell` mapping a few lines below it in
// the same file — the client (Codex CLI) resolves the call locally regardless of whether
// the wire format is Responses `{type:"tool_search"}` or Chat `{type:"function"}`. So
// instead of dropping it, the translator now maps it onto a proper Chat Completions
// function-tool declaration (mirroring the proven `local_shell` pattern), which lets the
// model see and call `tool_search` when the request is downgraded to Chat Completions.
import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } = await import(
  "../../open-sse/translator/request/openai-responses.ts"
);

function codexRequestWithToolSearch() {
  return {
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    tools: [
      {
        type: "function",
        name: "bash",
        description: "Execute shell commands",
        parameters: {
          type: "object",
          properties: { command: { type: "string" } },
          required: ["command"],
        },
      },
      {
        type: "tool_search",
        name: "tool_search",
        description: "Search for additional deferred tools by query",
        execution: "client",
      },
    ],
  };
}

test("#7532: tool_search survives the Responses->Chat translator as a function tool", () => {
  const body = codexRequestWithToolSearch();
  const out = openaiResponsesToOpenAIRequest("opencode-go/big-pickle", body, false, {}) as {
    tools: { type?: string; function?: { name: string; description?: string } }[];
  };

  assert.ok(out.tools.some((t) => t.function?.name === "bash"));

  const toolSearch = out.tools.find((t) => t.function?.name === "tool_search");
  assert.ok(toolSearch, "tool_search must not be silently dropped during Responses->Chat downgrade");
  assert.equal(toolSearch?.type, "function");
  assert.equal(
    toolSearch?.function?.description,
    "Search for additional deferred tools by query"
  );
});

test("#7532: tool_search without an explicit schema gets a usable default `query` parameter", () => {
  const body = {
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    tools: [{ type: "tool_search", name: "tool_search", execution: "client" }],
  };
  const out = openaiResponsesToOpenAIRequest("opencode-go/big-pickle", body, false, {}) as {
    tools: { function?: { name: string; parameters?: { properties?: Record<string, unknown> } } }[];
  };
  const toolSearch = out.tools.find((t) => t.function?.name === "tool_search");
  assert.ok(toolSearch);
  assert.ok(toolSearch?.function?.parameters?.properties?.query, "expected a `query` parameter");
});

test("#7532: image_generation (a genuine server-side hosted tool, #2950) is still dropped", () => {
  const body = {
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    tools: [{ type: "image_generation", output_format: "png" }],
  };
  const out = openaiResponsesToOpenAIRequest("opencode-go/big-pickle", body, false, {}) as {
    tools: unknown[];
  };
  assert.equal(out.tools.length, 0);
});
