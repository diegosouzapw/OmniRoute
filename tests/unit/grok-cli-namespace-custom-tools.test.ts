import test from "node:test";
import assert from "node:assert/strict";

import { GrokCliExecutor } from "../../open-sse/executors/grok-cli.ts";
import { flattenNamespaceToolName } from "../../open-sse/translator/request/openai-responses/namespaceFlatten.ts";

// Namespace tools (#14596) and custom tools in one request: execute() converts custom tools
// first, then flattens namespaces, and restores both on the way back.

type JsonRecord = Record<string, unknown>;

function sse(events: JsonRecord[]): Response {
  const text = events.map((e) => `event: ${e.type}\ndata: ${JSON.stringify(e)}\n\n`).join("");
  return new Response(text, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

test("grok-cli handles namespace and custom tools in the same request", async () => {
  const body = {
    model: "grok-4.6",
    stream: true,
    input: [
      { type: "message", role: "user", content: [{ type: "input_text", text: "x" }] },
      // A replayed namespaced freeform call from an earlier turn on another target.
      {
        type: "custom_tool_call",
        call_id: "c0",
        namespace: "functions",
        name: "exec",
        input: "ls",
      },
      { type: "custom_tool_call_output", call_id: "c0", output: "a.txt" },
    ],
    tools: [
      {
        type: "namespace",
        name: "mcp__notion",
        tools: [{ type: "function", name: "API_get_self", parameters: { type: "object" } }],
      },
      { type: "custom", name: "apply_patch" },
    ],
  };
  const patchArgs = JSON.stringify({ input: "PATCH" });
  const nsCall = {
    type: "function_call",
    id: "fc_1",
    call_id: "c1",
    name: "mcp__notion__API_get_self",
  };
  const customCall = { type: "function_call", id: "fc_2", call_id: "c2", name: "apply_patch" };
  const upstream = [
    { type: "response.output_item.added", output_index: 0, item: { ...nsCall, arguments: "" } },
    { type: "response.output_item.done", output_index: 0, item: { ...nsCall, arguments: "{}" } },
    { type: "response.output_item.added", output_index: 1, item: { ...customCall, arguments: "" } },
    {
      type: "response.function_call_arguments.delta",
      item_id: "fc_2",
      output_index: 1,
      delta: patchArgs,
    },
    {
      type: "response.function_call_arguments.done",
      item_id: "fc_2",
      output_index: 1,
      arguments: patchArgs,
    },
    {
      type: "response.output_item.done",
      output_index: 1,
      item: { ...customCall, arguments: patchArgs },
    },
  ];

  const originalFetch = globalThis.fetch;
  let sent: JsonRecord = {};
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    sent = JSON.parse(String(init?.body || "{}"));
    return sse(upstream);
  }) as typeof fetch;
  let text = "";
  try {
    const result = await new GrokCliExecutor().execute({
      model: "grok-4.6",
      body,
      stream: true,
      credentials: { accessToken: "grok-token" },
    });
    text = await (result instanceof Response ? result : result.response).text();
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.deepEqual(
    (sent.tools as JsonRecord[]).map((tool) => `${tool.type}:${tool.name}`),
    ["function:mcp__notion__API_get_self", "function:apply_patch"]
  );
  const replayed = (sent.input as JsonRecord[])[1];
  assert.equal(replayed.type, "function_call");
  assert.equal(replayed.name, flattenNamespaceToolName("functions", "exec"));
  assert.equal("namespace" in replayed, false);
  assert.equal((sent.input as JsonRecord[])[2].type, "function_call_output");

  const items = text
    .split("\n\n")
    .filter(Boolean)
    .map((block) =>
      JSON.parse(
        block
          .split("\n")
          .find((l) => l.startsWith("data:"))!
          .slice(5)
      )
    )
    .filter((event) => event.type === "response.output_item.done")
    .map((event) => event.item as JsonRecord);
  assert.equal(items[0].type, "function_call");
  assert.equal(items[0].namespace, "mcp__notion");
  assert.equal(items[0].name, "API_get_self");
  assert.equal(items[1].type, "custom_tool_call");
  assert.equal(items[1].input, "PATCH");
});
