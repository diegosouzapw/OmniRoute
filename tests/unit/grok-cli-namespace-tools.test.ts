import test from "node:test";
import assert from "node:assert/strict";

import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { GrokCliExecutor } from "../../open-sse/executors/grok-cli.ts";

// Codex CLI declares MCP servers (and its own multi-agent tools) as Responses
// `type:"namespace"` tool groups. Grok Build's Responses endpoint only accepts
// flat tool types and rejects the whole request with
// `422 tools[N].type: unknown variant \`namespace\``, so the executor must
// flatten them before dispatch and restore `{namespace, name}` on the
// function calls it streams back to the client.

type JsonRecord = Record<string, unknown>;

function codexBody(): JsonRecord {
  return {
    model: "grok-4.6",
    stream: true,
    input: [
      { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
      {
        type: "function_call",
        call_id: "call_prev",
        namespace: "mcp__notion",
        name: "API_get_self",
        arguments: "{}",
      },
      { type: "function_call_output", call_id: "call_prev", output: "{}" },
    ],
    tools: [
      { type: "web_search" },
      { type: "function", name: "exec_command", parameters: { type: "object" } },
      {
        type: "namespace",
        name: "mcp__notion",
        description: "Notion MCP",
        tools: [
          {
            type: "function",
            name: "API_get_self",
            description: "who am i",
            parameters: { type: "object", properties: {} },
          },
          { type: "function", name: "API_post_search", parameters: { type: "object" } },
        ],
      },
      {
        type: "namespace",
        name: "multi_agent_v1",
        tools: [{ type: "function", name: "spawn_agent", parameters: { type: "object" } }],
      },
    ],
  };
}

async function runExecute(body: JsonRecord, upstream: () => Response) {
  const executor = new GrokCliExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: JsonRecord[] = [];
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    capturedBodies.push(JSON.parse(String(init?.body || "{}")));
    return upstream();
  }) as typeof fetch;
  try {
    const result = await executor.execute({
      model: "grok-4.6",
      body,
      stream: true,
      credentials: { accessToken: "grok-token" },
    });
    const response = result instanceof Response ? result : result.response;
    return { response, capturedBodies };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function sse(events: JsonRecord[]): Response {
  const text = events.map((e) => `event: ${e.type}\ndata: ${JSON.stringify(e)}\n\n`).join("");
  return new Response(text, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

function parseSse(text: string): JsonRecord[] {
  return text
    .split(/\n\n/)
    .map((block) => block.split("\n").find((line) => line.startsWith("data:")))
    .filter((line): line is string => !!line)
    .map((line) => JSON.parse(line.slice(5).trim()));
}

test("grok-cli flattens Responses namespace tool groups into function tools", async () => {
  const body = codexBody();
  const snapshot = JSON.stringify(body);
  const { capturedBodies } = await runExecute(body, () => sse([{ type: "response.completed" }]));

  const sent = capturedBodies[0];
  const tools = sent.tools as JsonRecord[];
  assert.ok(
    tools.every((tool) => tool.type !== "namespace"),
    "no namespace tool may reach Grok Build"
  );
  assert.deepEqual(
    tools.map((tool) => `${tool.type}:${tool.name ?? ""}`),
    [
      "web_search:",
      "function:exec_command",
      "function:mcp__notion__API_get_self",
      "function:mcp__notion__API_post_search",
      "function:multi_agent_v1__spawn_agent",
    ]
  );
  const notionSelf = tools[2];
  assert.equal(notionSelf.description, "who am i");
  assert.deepEqual(notionSelf.parameters, { type: "object", properties: {} });

  // Prior namespaced calls in the history must match the flattened tool names.
  const priorCall = (sent.input as JsonRecord[]).find((item) => item.type === "function_call");
  assert.equal(priorCall?.name, "mcp__notion__API_get_self");
  assert.equal("namespace" in (priorCall ?? {}), false);

  // Combo fallback re-dispatches the same body to other targets (e.g. Codex,
  // which supports namespaces natively), so the caller's body must be untouched.
  assert.equal(JSON.stringify(body), snapshot);
});

test("grok-cli restores namespace identity on streamed function calls", async () => {
  const flatCall = {
    type: "function_call",
    id: "fc_1",
    call_id: "call_1",
    name: "mcp__notion__API_post_search",
    arguments: "",
  };
  const agentCall = {
    type: "function_call",
    id: "fc_2",
    call_id: "call_2",
    name: "multi_agent_v1__spawn_agent",
    arguments: "{}",
  };
  const { response } = await runExecute(codexBody(), () =>
    sse([
      { type: "response.output_item.added", output_index: 0, item: flatCall },
      {
        type: "response.output_item.done",
        output_index: 0,
        item: { ...flatCall, arguments: '{"q":"x"}' },
      },
      { type: "response.output_item.done", output_index: 1, item: agentCall },
      {
        type: "response.completed",
        response: { output: [{ ...flatCall, arguments: '{"q":"x"}' }, agentCall] },
      },
    ])
  );

  const events = parseSse(await response.text());
  const added = events[0].item as JsonRecord;
  assert.equal(added.namespace, "mcp__notion");
  assert.equal(added.name, "API_post_search");
  const done = events[1].item as JsonRecord;
  assert.equal(done.namespace, "mcp__notion");
  assert.equal(done.name, "API_post_search");
  assert.equal(done.arguments, '{"q":"x"}');
  const agentDone = events[2].item as JsonRecord;
  assert.equal(agentDone.namespace, "multi_agent_v1");
  assert.equal(agentDone.name, "spawn_agent");
  const output = (events[3].response as JsonRecord).output as JsonRecord[];
  assert.deepEqual(
    output.map((item) => `${item.namespace}/${item.name}`),
    ["mcp__notion/API_post_search", "multi_agent_v1/spawn_agent"]
  );
});

test("grok-cli restores namespace identity on non-streaming Responses JSON", async () => {
  const { response } = await runExecute(
    codexBody(),
    () =>
      new Response(
        JSON.stringify({
          id: "resp_1",
          object: "response",
          output: [
            {
              type: "function_call",
              call_id: "call_1",
              name: "mcp__notion__API_get_self",
              arguments: "{}",
            },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
  );
  const json = (await response.json()) as JsonRecord;
  const item = (json.output as JsonRecord[])[0];
  assert.equal(item.namespace, "mcp__notion");
  assert.equal(item.name, "API_get_self");
});

test("grok-cli leaves requests without namespace tools and their responses untouched", async () => {
  const body = {
    model: "grok-4.6",
    input: "hi",
    tools: [{ type: "function", name: "exec_command", parameters: { type: "object" } }],
  };
  const upstreamEvents = [
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "c", name: "exec_command", arguments: "{}" },
    },
  ];
  const { response, capturedBodies } = await runExecute(body, () => sse(upstreamEvents));

  assert.deepEqual(
    (capturedBodies[0].tools as JsonRecord[]).map((tool) => tool.name),
    ["exec_command"]
  );
  const events = parseSse(await response.text());
  const item = events[0].item as JsonRecord;
  assert.equal(item.name, "exec_command");
  assert.equal("namespace" in item, false);
});

test("grok-cli restores namespace on a leaf that already contains `__`", async () => {
  const body = codexBody();
  (body.tools as JsonRecord[]).push({
    type: "namespace",
    name: "mcp__srv",
    tools: [{ type: "function", name: "a__b", parameters: { type: "object" } }],
  });
  const call = { type: "function_call", call_id: "c", name: "a__b", arguments: "{}" };
  const { response } = await runExecute(body, () =>
    sse([{ type: "response.output_item.done", item: call }])
  );
  const item = parseSse(await response.text())[0].item as JsonRecord;
  assert.equal(item.namespace, "mcp__srv");
  assert.equal(item.name, "a__b");
});

test("grok-cli drops non-function namespace children instead of faking them", async () => {
  const body = codexBody();
  (body.tools as JsonRecord[]).push({
    type: "namespace",
    name: "mcp__edit",
    tools: [
      { type: "custom", name: "apply_patch", format: { type: "grammar" } },
      { type: "function", name: "read", parameters: { type: "object" } },
    ],
  });
  const { capturedBodies } = await runExecute(body, () => sse([{ type: "response.completed" }]));
  const names = (capturedBodies[0].tools as JsonRecord[]).map((tool) => tool.name);
  assert.ok(names.includes("mcp__edit__read"));
  assert.ok(!names.some((name) => String(name).includes("apply_patch")));
});

test("grok-cli flattens namespaced history even when the turn declares no namespace tools", async () => {
  const body = codexBody();
  body.tools = [{ type: "function", name: "exec_command", parameters: { type: "object" } }];
  const { capturedBodies } = await runExecute(body, () => sse([{ type: "response.completed" }]));
  const priorCall = (capturedBodies[0].input as JsonRecord[]).find(
    (item) => item.type === "function_call"
  );
  assert.equal(priorCall?.name, "mcp__notion__API_get_self");
  assert.equal("namespace" in (priorCall ?? {}), false);
});

test("grok-cli sends flattened namespace tools through the BaseExecutor transport (#7244)", async () => {
  const originalExecute = BaseExecutor.prototype.execute;
  const seen: unknown[] = [];
  BaseExecutor.prototype.execute = async function (input) {
    seen.push(input.body);
    return { response: sse([{ type: "response.completed" }]) };
  };
  try {
    await new GrokCliExecutor().execute({
      model: "grok-4.6",
      body: codexBody(),
      stream: true,
      credentials: {},
    });
  } finally {
    BaseExecutor.prototype.execute = originalExecute;
  }
  assert.equal(seen.length, 1);
  const tools = (seen[0] as JsonRecord).tools as JsonRecord[];
  assert.ok(tools.every((tool) => tool.type !== "namespace"));
});
