import test from "node:test";
import assert from "node:assert/strict";

import { GrokCliExecutor } from "../../open-sse/executors/grok-cli.ts";
import { hoistGrokBuildAdditionalTools } from "../../open-sse/executors/grokCliAdditionalTools.ts";
import {
  convertGrokBuildCustomTools,
  restoreGrokBuildCustomToolCalls,
} from "../../open-sse/executors/grokCliCustomTools.ts";
import { flattenNamespaceToolName } from "../../open-sse/translator/request/openai-responses/namespaceFlatten.ts";

// Codex in its lite request mode (gpt-5.6+/gpt-6 model metadata) declares its tools in an
// `additional_tools` input item, and its main tool is the freeform `exec` inside the
// `functions` namespace. Grok Build rejects the item type with a 422.

type JsonRecord = Record<string, unknown>;

function sse(events: JsonRecord[]): Response {
  const text = events.map((e) => `event: ${e.type}\ndata: ${JSON.stringify(e)}\n\n`).join("");
  return new Response(text, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

function parseSse(text: string): JsonRecord[] {
  return text
    .split("\n\n")
    .map((block) => block.split("\n").find((line) => line.startsWith("data:")))
    .filter((line): line is string => !!line)
    .map((line) => JSON.parse(line.slice(5)));
}

function liteBody(): JsonRecord {
  return {
    model: "grok-4.6",
    stream: true,
    tool_choice: "auto",
    input: [
      {
        type: "additional_tools",
        role: "developer",
        tools: [
          {
            type: "namespace",
            name: "functions",
            tools: [
              { type: "custom", name: "exec", description: "Run code." },
              { type: "function", name: "wait", parameters: { type: "object" } },
            ],
          },
          {
            type: "namespace",
            name: "clock",
            tools: [{ type: "function", name: "sleep", parameters: { type: "object" } }],
          },
        ],
      },
      { type: "message", role: "user", content: [{ type: "input_text", text: "x" }] },
    ],
  };
}

async function runExecute(body: JsonRecord, upstream: JsonRecord[]) {
  const originalFetch = globalThis.fetch;
  let sent: JsonRecord = {};
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    sent = JSON.parse(String(init?.body || "{}"));
    return sse(upstream);
  }) as typeof fetch;
  try {
    const result = await new GrokCliExecutor().execute({
      model: "grok-4.6",
      body,
      stream: true,
      credentials: { accessToken: "grok-token" },
    });
    const text = await (result instanceof Response ? result : result.response).text();
    return { sent, events: parseSse(text) };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("grok-cli moves additional_tools into tools and restores the namespaced custom exec", async () => {
  const body = liteBody();
  const before = JSON.stringify(body);
  const execName = flattenNamespaceToolName("functions", "exec");
  const call = { type: "function_call", id: "fc_1", call_id: "c1", name: execName };
  const args = JSON.stringify({ input: "await tools.list()" });
  const { sent, events } = await runExecute(body, [
    { type: "response.output_item.added", output_index: 0, item: { ...call, arguments: "" } },
    {
      type: "response.function_call_arguments.delta",
      item_id: "fc_1",
      output_index: 0,
      delta: args,
    },
    {
      type: "response.function_call_arguments.done",
      item_id: "fc_1",
      output_index: 0,
      arguments: args,
    },
    { type: "response.output_item.done", output_index: 0, item: { ...call, arguments: args } },
  ]);

  assert.equal(JSON.stringify(body), before, "the caller's body is not mutated");
  const input = sent.input as JsonRecord[];
  assert.deepEqual(
    input.map((item) => item.type),
    ["message"]
  );
  const tools = sent.tools as JsonRecord[];
  assert.deepEqual(
    tools.map((tool) => `${tool.type}:${tool.name}`),
    [
      `function:${execName}`,
      `function:${flattenNamespaceToolName("functions", "wait")}`,
      `function:${flattenNamespaceToolName("clock", "sleep")}`,
    ]
  );
  assert.deepEqual(tools[0].parameters, {
    type: "object",
    properties: { input: { type: "string" } },
    required: ["input"],
    additionalProperties: false,
  });

  const done = events.find((event) => event.type === "response.output_item.done");
  const item = done?.item as JsonRecord;
  assert.equal(item.type, "custom_tool_call");
  assert.equal(item.namespace, "functions");
  assert.equal(item.name, "exec");
  assert.equal(item.input, "await tools.list()");
  const inputDone = events.find((event) => event.type === "response.custom_tool_call_input.done");
  assert.equal(inputDone?.input, "await tools.list()");
});

test("grok-cli replays a namespaced custom exec call from a lite-mode turn", async () => {
  const body = liteBody();
  (body.input as JsonRecord[]).push(
    { type: "custom_tool_call", call_id: "c0", namespace: "functions", name: "exec", input: "1+1" },
    { type: "custom_tool_call_output", call_id: "c0", output: "2" }
  );
  const { sent } = await runExecute(body, [{ type: "response.completed" }]);
  const input = sent.input as JsonRecord[];
  assert.deepEqual(
    input.map((item) => item.type),
    ["message", "function_call", "function_call_output"]
  );
  assert.equal(input[1].name, flattenNamespaceToolName("functions", "exec"));
  assert.equal(input[1].arguments, JSON.stringify({ input: "1+1" }));
});

test("hoistGrokBuildAdditionalTools keeps explicit tools first and leaves plain bodies alone", () => {
  const plain = { input: [{ type: "message", role: "user", content: "x" }], tools: [] };
  assert.equal(hoistGrokBuildAdditionalTools(plain), plain);

  const body = {
    tools: [{ type: "function", name: "a", description: "explicit" }],
    input: [
      {
        type: "additional_tools",
        tools: [
          { type: "function", name: "a", description: "shadowed" },
          { type: "function", name: "b" },
        ],
      },
      { type: "message", role: "user", content: "x" },
    ],
  };
  const hoisted = hoistGrokBuildAdditionalTools(body) as JsonRecord;
  assert.deepEqual(
    (hoisted.tools as JsonRecord[]).map((tool) => `${tool.name}:${tool.description ?? ""}`),
    ["a:explicit", "b:"]
  );
  assert.deepEqual(
    (hoisted.input as JsonRecord[]).map((item) => item.type),
    ["message"]
  );
  assert.equal(body.input.length, 2, "the caller's input is not mutated");
});

test("a namespaced custom tool does not capture a top-level function of the same name", async () => {
  const { body, customTools } = convertGrokBuildCustomTools({
    tools: [
      { type: "function", name: "exec", parameters: { type: "object" } },
      { type: "namespace", name: "functions", tools: [{ type: "custom", name: "exec" }] },
    ],
  });
  const ns = ((body as JsonRecord).tools as JsonRecord[])[1];
  assert.equal(((ns.tools as JsonRecord[])[0] as JsonRecord).type, "function");
  assert.ok(customTools);

  const upstream = new Response(
    JSON.stringify({
      output: [
        { type: "function_call", call_id: "a", name: "exec", arguments: "{}" },
        {
          type: "function_call",
          call_id: "b",
          namespace: "functions",
          name: "exec",
          arguments: JSON.stringify({ input: "code" }),
        },
      ],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
  const restored = await (await restoreGrokBuildCustomToolCalls(upstream, customTools!)).json();
  assert.equal(restored.output[0].type, "function_call");
  assert.equal(restored.output[1].type, "custom_tool_call");
  assert.equal(restored.output[1].input, "code");
});

test("a raw U+2028 in the exec input still restores the namespaced custom call", async () => {
  const execName = flattenNamespaceToolName("functions", "exec");
  const call = { type: "function_call", id: "fc_1", call_id: "c1", name: execName };
  // JSON.stringify leaves U+2028 unescaped, so the SSE data line carries it raw.
  const args = JSON.stringify({ input: "a b" });
  const { events } = await runExecute(liteBody(), [
    { type: "response.output_item.added", output_index: 0, item: { ...call, arguments: "" } },
    {
      type: "response.function_call_arguments.done",
      item_id: "fc_1",
      output_index: 0,
      arguments: args,
    },
    { type: "response.output_item.done", output_index: 0, item: { ...call, arguments: args } },
  ]);
  const item = events.find((event) => event.type === "response.output_item.done")
    ?.item as JsonRecord;
  assert.equal(item.type, "custom_tool_call");
  assert.equal(item.namespace, "functions");
  assert.equal(item.name, "exec");
  assert.equal(item.input, "a b");
});
