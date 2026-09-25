import test from "node:test";
import assert from "node:assert/strict";

import { GrokCliExecutor } from "../../open-sse/executors/grok-cli.ts";

// Responses agents (Codex CLI, custom agents) declare freeform tools such as
// apply_patch as `type:"custom"`. Grok Build accepts only function-style tools and
// rejects the whole request with `422 tools[N].type: unknown variant \`custom\``.
// grok-cli is a same-format Responses lane, so the Chat translator's custom → function
// conversion (#1007) never runs. The executor converts custom tools (and custom-tool
// history items) before dispatch and turns Grok's function calls back into
// `custom_tool_call` items so the client can dispatch its freeform tool.

type JsonRecord = Record<string, unknown>;

// `$&` / `$1` would be expanded by a string-based String.replace; the rewrite must not.
const PATCH = '*** Begin Patch\n*** Add File: a.txt\n+say "hi" $& $1\n*** End Patch\n';
const INPUT_SCHEMA = {
  type: "object",
  properties: { input: { type: "string" } },
  required: ["input"],
  additionalProperties: false,
};

function agentBody(extra: JsonRecord = {}): JsonRecord {
  return {
    model: "grok-4.6",
    stream: true,
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "edit" }] }],
    tools: [
      {
        type: "function",
        name: "read_file",
        parameters: { type: "object", properties: { path: { type: "string" } } },
      },
      {
        type: "custom",
        name: "apply_patch",
        description: "Apply a patch",
        format: { type: "grammar", syntax: "lark", definition: "start: /.+/" },
      },
      { type: "custom", name: "exec", strict: true },
      { type: "web_search" },
    ],
    ...extra,
  };
}

async function runExecute(body: JsonRecord, upstream: () => Response, stream = true) {
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
      stream,
      credentials: { accessToken: "grok-token" },
    });
    const response = result instanceof Response ? result : result.response;
    return { response, capturedBodies };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function sseText(events: JsonRecord[], eol = "\n"): string {
  return events.map((e) => `event: ${e.type}${eol}data: ${JSON.stringify(e)}${eol}${eol}`).join("");
}

function sse(events: JsonRecord[]): Response {
  return new Response(sseText(events), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

/** Stream the same bytes in tiny chunks so SSE blocks are split mid-line. */
function chunkedSse(events: JsonRecord[], size = 7, eol = "\n"): Response {
  const bytes = new TextEncoder().encode(sseText(events, eol));
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (let i = 0; i < bytes.length; i += size) controller.enqueue(bytes.slice(i, i + size));
      controller.close();
    },
  });
  return new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

function parseBlocks(text: string): { event: string | null; data: JsonRecord }[] {
  return text
    .split(/\r?\n\r?\n/)
    .filter((block) => block.includes("data:"))
    .map((block) => {
      const lines = block.split(/\r?\n/);
      const event = lines.find((line) => line.startsWith("event:"));
      const data = lines.find((line) => line.startsWith("data:")) as string;
      return {
        event: event ? event.slice(6).trim() : null,
        data: JSON.parse(data.slice(5).trim()),
      };
    });
}

const patchArgs = JSON.stringify({ input: PATCH });
const patchCall = {
  type: "function_call",
  id: "fc_1",
  call_id: "call_1",
  name: "apply_patch",
  arguments: patchArgs,
  status: "completed",
};
const readCall = {
  type: "function_call",
  id: "fc_2",
  call_id: "call_2",
  name: "read_file",
  arguments: '{"path":"a.txt"}',
  status: "completed",
};

function grokStream(): JsonRecord[] {
  return [
    { type: "response.created", sequence_number: 0, response: { id: "resp_1", output: [] } },
    {
      type: "response.output_item.added",
      sequence_number: 1,
      output_index: 0,
      item: { ...patchCall, arguments: "", status: "in_progress" },
    },
    {
      type: "response.function_call_arguments.delta",
      sequence_number: 2,
      item_id: "fc_1",
      output_index: 0,
      delta: patchArgs.slice(0, 20),
    },
    {
      type: "response.function_call_arguments.delta",
      sequence_number: 3,
      item_id: "fc_1",
      output_index: 0,
      delta: patchArgs.slice(20),
    },
    {
      type: "response.function_call_arguments.done",
      sequence_number: 4,
      item_id: "fc_1",
      output_index: 0,
      arguments: patchArgs,
    },
    { type: "response.output_item.done", sequence_number: 5, output_index: 0, item: patchCall },
    {
      type: "response.output_item.added",
      sequence_number: 6,
      output_index: 1,
      item: { ...readCall, arguments: "", status: "in_progress" },
    },
    {
      type: "response.function_call_arguments.delta",
      sequence_number: 7,
      item_id: "fc_2",
      output_index: 1,
      delta: readCall.arguments,
    },
    {
      type: "response.function_call_arguments.done",
      sequence_number: 8,
      item_id: "fc_2",
      output_index: 1,
      arguments: readCall.arguments,
    },
    { type: "response.output_item.done", sequence_number: 9, output_index: 1, item: readCall },
    {
      type: "response.completed",
      sequence_number: 10,
      response: { id: "resp_1", status: "completed", output: [patchCall, readCall] },
    },
  ];
}

const customPatchItem = {
  type: "custom_tool_call",
  id: "fc_1",
  call_id: "call_1",
  name: "apply_patch",
  input: PATCH,
  status: "completed",
};

test("grok-cli sends custom tools to Grok Build as function tools taking an input string", async () => {
  const body = agentBody();
  const snapshot = JSON.stringify(body);
  const { capturedBodies } = await runExecute(body, () => sse([{ type: "response.completed" }]));

  const tools = capturedBodies[0].tools as JsonRecord[];
  assert.deepEqual(
    tools.map((tool) => `${tool.type}:${tool.name ?? ""}`),
    ["function:read_file", "function:apply_patch", "function:exec", "web_search:"]
  );
  assert.deepEqual(tools[1], {
    type: "function",
    name: "apply_patch",
    description: "Apply a patch",
    parameters: INPUT_SCHEMA,
  });
  assert.deepEqual(tools[2], {
    type: "function",
    name: "exec",
    parameters: INPUT_SCHEMA,
    strict: true,
  });
  // Combo fallback re-dispatches the same body to targets that accept custom tools
  // natively (Codex), so the caller's body must be untouched.
  assert.equal(JSON.stringify(body), snapshot);
});

test("grok-cli maps a custom tool_choice to the converted function tool", async () => {
  const forced = await runExecute(
    agentBody({ tool_choice: { type: "custom", name: "apply_patch" } }),
    () => sse([{ type: "response.completed" }])
  );
  assert.deepEqual(forced.capturedBodies[0].tool_choice, { type: "function", name: "apply_patch" });

  const allowed = await runExecute(
    agentBody({
      tool_choice: {
        type: "allowed_tools",
        mode: "auto",
        tools: [
          { type: "custom", name: "apply_patch" },
          { type: "function", name: "read_file" },
        ],
      },
    }),
    () => sse([{ type: "response.completed" }])
  );
  assert.deepEqual(allowed.capturedBodies[0].tool_choice, {
    type: "allowed_tools",
    mode: "auto",
    tools: [
      { type: "function", name: "apply_patch" },
      { type: "function", name: "read_file" },
    ],
  });
});

test("grok-cli converts custom tool calls and outputs in the replayed history", async () => {
  const history = [
    { type: "message", role: "user", content: [{ type: "input_text", text: "edit" }] },
    {
      type: "custom_tool_call",
      id: "ctc_1",
      call_id: "call_1",
      name: "apply_patch",
      input: PATCH,
      status: "completed",
    },
    { type: "custom_tool_call_output", call_id: "call_1", output: "Done" },
  ];
  // A follow-up turn may not re-declare the custom tool; history still has to convert.
  const { capturedBodies } = await runExecute(
    { model: "grok-4.6", stream: true, input: history, tools: [{ type: "web_search" }] },
    () => sse([{ type: "response.completed" }])
  );
  const sent = capturedBodies[0].input as JsonRecord[];
  assert.deepEqual(sent[1], {
    type: "function_call",
    call_id: "call_1",
    name: "apply_patch",
    arguments: patchArgs,
    status: "completed",
  });
  assert.deepEqual(sent[2], { type: "function_call_output", call_id: "call_1", output: "Done" });
  assert.ok(sent.every((item) => !String(item.type).startsWith("custom_tool_call")));
});

test("grok-cli leaves requests without custom tools unchanged", async () => {
  const body = {
    model: "grok-4.6",
    stream: true,
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    tools: [{ type: "function", name: "read_file", parameters: { type: "object" } }],
    tool_choice: "auto",
  };
  const { capturedBodies } = await runExecute(body, () => sse([{ type: "response.completed" }]));
  assert.deepEqual(capturedBodies[0].tools, body.tools);
  assert.deepEqual(capturedBodies[0].input, body.input);
  assert.equal(capturedBodies[0].tool_choice, "auto");
});

function events(text: string): JsonRecord[] {
  const blocks = parseBlocks(text);
  for (const block of blocks) assert.equal(block.event, block.data.type, "event: must match data");
  return blocks.map((block) => block.data);
}

function assertIncreasingSequence(list: JsonRecord[]) {
  const seqs = list
    .map((event) => event.sequence_number)
    .filter((value): value is number => typeof value === "number");
  for (let i = 1; i < seqs.length; i++) {
    assert.ok(seqs[i] > seqs[i - 1], `sequence_number must increase: ${seqs.join(",")}`);
  }
}

function assertRestoredStream(text: string) {
  const list = events(text);
  assert.deepEqual(
    list.map((event) => event.type),
    [
      "response.created",
      "response.output_item.added",
      "response.custom_tool_call_input.delta",
      "response.custom_tool_call_input.delta",
      "response.custom_tool_call_input.done",
      "response.output_item.done",
      "response.output_item.added",
      "response.function_call_arguments.delta",
      "response.function_call_arguments.done",
      "response.output_item.done",
      "response.completed",
    ]
  );
  assert.deepEqual(list[1].item, {
    type: "custom_tool_call",
    id: "fc_1",
    call_id: "call_1",
    name: "apply_patch",
    input: "",
    status: "in_progress",
  });
  // Each upstream argument delta becomes one decoded input delta with its own number.
  assert.deepEqual(
    [list[2], list[3]].map((event) => [event.sequence_number, event.item_id, event.output_index]),
    [
      [2, "fc_1", 0],
      [3, "fc_1", 0],
    ]
  );
  assert.equal(`${list[2].delta}${list[3].delta}`, PATCH);
  assert.deepEqual(list[4], {
    type: "response.custom_tool_call_input.done",
    sequence_number: 4,
    item_id: "fc_1",
    output_index: 0,
    input: PATCH,
  });
  assert.deepEqual(list[5].item, customPatchItem);
  // The plain function tool in the same stream is untouched.
  assert.deepEqual(list.slice(6, 10), grokStream().slice(6, 10));
  assert.deepEqual((list[10].response as JsonRecord).output, [customPatchItem, readCall]);
  assertIncreasingSequence(list);
}

test("grok-cli streams custom tool calls back as custom_tool_call items", async () => {
  const { response } = await runExecute(agentBody(), () => sse(grokStream()));
  assert.equal(response.status, 200);
  assertRestoredStream(await response.text());
});

test("grok-cli restores custom tool calls when SSE blocks arrive split across chunks", async () => {
  const { response } = await runExecute(agentBody(), () => chunkedSse(grokStream()));
  assertRestoredStream(await response.text());
  const crlf = await runExecute(agentBody(), () => chunkedSse(grokStream(), 5, "\r\n"));
  assertRestoredStream(await crlf.response.text());
});

test("the restored stream keeps every custom event through the Responses passthrough", async () => {
  // The passthrough drops any event at or below the last forwarded sequence_number (#5786);
  // the client-side tool handoff watcher needs custom_tool_call_input.done to arrive.
  const { createPassthroughStreamWithLogger } = await import("../../open-sse/utils/stream.ts");
  const { response } = await runExecute(agentBody(), () => sse(grokStream()));
  const passthrough = createPassthroughStreamWithLogger(
    "grok-cli",
    null,
    null,
    "grok-4.6",
    null,
    null,
    null,
    null,
    null,
    "openai-responses"
  );
  const text = await new Response(response.body!.pipeThrough(passthrough)).text();
  const types = parseBlocks(text).map((block) => block.data.type);
  assert.equal(types.filter((type) => type === "response.custom_tool_call_input.delta").length, 2);
  assert.ok(types.includes("response.custom_tool_call_input.done"), types.join(","));
});

test("grok-cli decodes escapes split across argument deltas", async () => {
  const input = 'a"b\\c\n\td é \u0001 😀 end';
  const args = JSON.stringify({ input });
  const deltas = [];
  for (let i = 0; i < args.length; i += 3) deltas.push(args.slice(i, i + 3));
  const call = { type: "function_call", id: "fc_9", call_id: "call_9", name: "apply_patch" };
  const upstream = [
    { type: "response.output_item.added", output_index: 0, item: { ...call, arguments: "" } },
    ...deltas.map((delta) => ({
      type: "response.function_call_arguments.delta",
      item_id: "fc_9",
      output_index: 0,
      delta,
    })),
    {
      type: "response.function_call_arguments.done",
      item_id: "fc_9",
      output_index: 0,
      arguments: args,
    },
    { type: "response.output_item.done", output_index: 0, item: { ...call, arguments: args } },
  ];
  const { response } = await runExecute(agentBody(), () => sse(upstream));
  const list = events(await response.text());
  const decoded = list
    .filter((event) => event.type === "response.custom_tool_call_input.delta")
    .map((event) => event.delta)
    .join("");
  assert.equal(decoded, input);
  const done = list.find((event) => event.type === "response.custom_tool_call_input.done");
  assert.equal(done?.input, input);
  assert.ok(list.every((event) => event.type !== "response.function_call_arguments.delta"));
});

test("grok-cli holds arguments that are not {input} and emits them once at the end", async () => {
  const call = { type: "function_call", id: "fc_3", call_id: "call_3", name: "exec" };
  const upstream = [
    {
      type: "response.output_item.added",
      sequence_number: 1,
      output_index: 0,
      item: { ...call, arguments: "" },
    },
    {
      type: "response.function_call_arguments.delta",
      sequence_number: 2,
      item_id: "fc_3",
      output_index: 0,
      delta: "ls ",
    },
    {
      type: "response.function_call_arguments.delta",
      sequence_number: 3,
      item_id: "fc_3",
      output_index: 0,
      delta: "-la",
    },
    {
      type: "response.function_call_arguments.done",
      sequence_number: 4,
      item_id: "fc_3",
      output_index: 0,
      arguments: "ls -la",
    },
    {
      type: "response.output_item.done",
      sequence_number: 5,
      output_index: 0,
      item: { ...call, arguments: "ls -la" },
    },
  ];
  const { response } = await runExecute(agentBody(), () => sse(upstream));
  const text = await response.text();
  const list = events(text);
  assert.deepEqual(
    list.map((event) => event.type),
    [
      "response.output_item.added",
      "response.custom_tool_call_input.delta",
      "response.custom_tool_call_input.done",
      "response.output_item.done",
    ]
  );
  // The held deltas left SSE comments behind (idle watchdogs see bytes; clients ignore them).
  assert.equal(text.match(/^:$/gm)?.length, 2);
  assert.deepEqual(list[1], {
    type: "response.custom_tool_call_input.delta",
    item_id: "fc_3",
    output_index: 0,
    delta: "ls -la",
  });
  assert.equal(list[2].input, "ls -la");
  assert.equal(list[2].sequence_number, 4);
  assert.equal((list[3].item as JsonRecord).input, "ls -la");
  assertIncreasingSequence(list);
});

test("grok-cli closes a custom call whose stream has no arguments.done", async () => {
  const call = { type: "function_call", call_id: "call_4", name: "apply_patch" };
  // No item id on the call: argument events are matched by output_index.
  const upstream = [
    { type: "response.output_item.added", output_index: 2, item: { ...call, arguments: "" } },
    {
      type: "response.function_call_arguments.delta",
      output_index: 2,
      delta: patchArgs.slice(0, 15),
    },
    { type: "response.function_call_arguments.delta", output_index: 2, delta: patchArgs.slice(15) },
    { type: "response.output_item.done", output_index: 2, item: { ...call, arguments: patchArgs } },
  ];
  const { response } = await runExecute(agentBody(), () => sse(upstream));
  const list = events(await response.text());
  assert.deepEqual(
    list.map((event) => event.type),
    [
      "response.output_item.added",
      "response.custom_tool_call_input.delta",
      "response.custom_tool_call_input.delta",
      "response.custom_tool_call_input.done",
      "response.output_item.done",
    ]
  );
  assert.equal(`${list[1].delta}${list[2].delta}`, PATCH);
  assert.deepEqual(list[3], {
    type: "response.custom_tool_call_input.done",
    output_index: 2,
    input: PATCH,
  });
  assert.equal((list[4].item as JsonRecord).type, "custom_tool_call");
});

test("grok-cli terminates a final arguments.done block that has no trailing blank line", async () => {
  const call = { type: "function_call", id: "fc_5", call_id: "call_5", name: "exec" };
  const text =
    sseText([
      { type: "response.output_item.added", output_index: 0, item: { ...call, arguments: "" } },
    ]) +
    `event: response.function_call_arguments.done\ndata: ${JSON.stringify({
      type: "response.function_call_arguments.done",
      item_id: "fc_5",
      output_index: 0,
      arguments: "pwd",
    })}`;
  const { response } = await runExecute(
    agentBody(),
    () => new Response(text, { headers: { "Content-Type": "text/event-stream" } })
  );
  const list = events(await response.text());
  assert.deepEqual(
    list.map((event) => event.type),
    [
      "response.output_item.added",
      "response.custom_tool_call_input.delta",
      "response.custom_tool_call_input.done",
    ]
  );
});

test("grok-cli restores echoed tool definitions to the client's custom tools", async () => {
  const echoed = [
    { type: "function", name: "read_file", parameters: { type: "object" } },
    { type: "function", name: "apply_patch", parameters: INPUT_SCHEMA },
  ];
  const upstream = [
    { type: "response.created", response: { id: "resp_1", tools: echoed, output: [] } },
    { type: "response.completed", response: { id: "resp_1", tools: echoed, output: [] } },
  ];
  const body = agentBody();
  const { response } = await runExecute(body, () => sse(upstream));
  const list = events(await response.text());
  for (const event of list) {
    const tools = (event.response as JsonRecord).tools as JsonRecord[];
    assert.deepEqual(tools[0], echoed[0]);
    assert.deepEqual(tools[1], (body.tools as JsonRecord[])[1]);
  }
});

test("grok-cli leaves a custom tool alone when a function tool already uses its name", async () => {
  const body = agentBody({
    tools: [
      { type: "function", name: "apply_patch", parameters: { type: "object" } },
      { type: "custom", name: "apply_patch" },
    ],
  });
  const call = { ...patchCall, arguments: '{"path":"x"}' };
  const { response, capturedBodies } = await runExecute(body, () =>
    sse([{ type: "response.output_item.done", output_index: 0, item: call }])
  );
  assert.deepEqual(capturedBodies[0].tools, body.tools);
  assert.deepEqual(events(await response.text())[0].item, call);
});

test("grok-cli forwards rewritten events before the upstream stream ends", async () => {
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => (release = resolve));
  const encoder = new TextEncoder();
  const upstreamBody = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(encoder.encode(sseText(grokStream().slice(0, 2))));
      await gate;
      controller.enqueue(encoder.encode(sseText(grokStream().slice(2))));
      controller.close();
    },
  });
  const { response } = await runExecute(
    agentBody(),
    () => new Response(upstreamBody, { headers: { "Content-Type": "text/event-stream" } })
  );
  const reader = response.body!.getReader();
  let first = "";
  while (!first.includes("response.output_item.added")) {
    const { value, done } = await reader.read();
    assert.equal(done, false, "stream ended before the first events arrived");
    first += new TextDecoder().decode(value);
  }
  assert.match(first, /"type":"custom_tool_call"/);
  release();
  while (!(await reader.read()).done) {
    // drain
  }
});

test("grok-cli falls back to the received deltas when arguments.done carries no arguments", async () => {
  const call = { type: "function_call", id: "fc_6", call_id: "call_6", name: "apply_patch" };
  // U+2028 is valid raw inside a JSON string and must not break the data-line match.
  const input = "line one\u2028line two";
  const args = JSON.stringify({ input }).replace("\\u2028", "\u2028");
  const upstream = [
    { type: "response.output_item.added", output_index: 0, item: { ...call, arguments: "" } },
    {
      type: "response.function_call_arguments.delta",
      item_id: "fc_6",
      output_index: 0,
      delta: args,
    },
    {
      type: "response.function_call_arguments.done",
      item_id: "fc_6",
      output_index: 0,
      arguments: "",
    },
  ];
  const { response } = await runExecute(agentBody(), () => sse(upstream));
  const list = events(await response.text());
  assert.deepEqual(
    list.map((event) => event.type),
    [
      "response.output_item.added",
      "response.custom_tool_call_input.delta",
      "response.custom_tool_call_input.done",
    ]
  );
  assert.equal(list[1].delta, input);
  assert.equal(list[2].input, input);
});

test("grok-cli restores custom tool calls in a non-streaming JSON response", async () => {
  const rawCall = {
    type: "function_call",
    id: "fc_3",
    call_id: "call_3",
    name: "exec",
    arguments: "ls -la",
    status: "completed",
  };
  const upstream = () =>
    Response.json({
      id: "resp_2",
      object: "response",
      status: "completed",
      output: [patchCall, rawCall, readCall],
    });
  const { response } = await runExecute(agentBody({ stream: false }), upstream, false);
  const json = (await response.json()) as JsonRecord;
  assert.deepEqual(json.output, [
    customPatchItem,
    {
      type: "custom_tool_call",
      id: "fc_3",
      call_id: "call_3",
      name: "exec",
      input: "ls -la",
      status: "completed",
    },
    readCall,
  ]);
});

test("grok-cli passes upstream error responses through unchanged", async () => {
  const errorBody = JSON.stringify({ error: { message: "bad request" } });
  const { response } = await runExecute(
    agentBody(),
    () => new Response(errorBody, { status: 400, headers: { "Content-Type": "application/json" } })
  );
  assert.equal(response.status, 400);
  assert.equal(await response.text(), errorBody);
});
