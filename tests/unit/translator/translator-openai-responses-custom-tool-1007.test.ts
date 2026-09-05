import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } =
  await import("../../../open-sse/translator/request/openai-responses.ts");
const { openaiToOpenAIResponsesResponse } =
  await import("../../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../../open-sse/translator/formats.ts");

function collectEvents(chunks, customToolNames = new Set(), toolSchemas = null) {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  state.customToolNames = customToolNames;
  if (toolSchemas) state.toolSchemas = toolSchemas;
  const events = [];
  for (const chunk of chunks) {
    const result = openaiToOpenAIResponsesResponse(chunk, state);
    if (result) events.push(...result);
  }
  return events;
}

// Request side: a Codex custom/freeform tool (type:"custom", no `parameters`) must be
// normalized to a { input: string } function schema — NOT an empty function schema.
test("Responses -> Chat: custom tool is normalized to a { input: string } function schema (#1007)", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-5.3-codex",
    {
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
      tools: [
        {
          type: "custom",
          name: "apply_patch",
          description: "Apply a code patch",
          format: { type: "grammar", syntax: "lark", definition: "..." },
        },
      ],
    },
    false,
    {}
  );

  assert.equal(Array.isArray(result.tools), true);
  const tool = result.tools[0];
  assert.equal(tool.type, "function");
  assert.equal(tool.function.name, "apply_patch");
  // The regression: without normalization, parameters is undefined / empty and the model
  // invokes apply_patch with {}, breaking the Codex runtime.
  assert.deepEqual(tool.function.parameters, {
    type: "object",
    properties: { input: { type: "string" } },
    required: ["input"],
    additionalProperties: false,
  });
});

// Request side: custom_tool_call / custom_tool_call_output input items round-trip.
test("Responses -> Chat: custom_tool_call + output items map to tool_calls and tool role (#1007)", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-5.3-codex",
    {
      input: [
        { type: "message", role: "user", content: [{ type: "input_text", text: "patch it" }] },
        {
          type: "custom_tool_call",
          call_id: "call_patch_1",
          name: "apply_patch",
          input: "*** Begin Patch\n*** End Patch",
        },
        {
          type: "custom_tool_call_output",
          call_id: "call_patch_1",
          output: '{"output":"applied","metadata":{"ok":true}}',
        },
      ],
    },
    false,
    {}
  );

  const assistant = result.messages.find(
    (m) => m.role === "assistant" && Array.isArray(m.tool_calls)
  );
  assert.ok(assistant, "expected an assistant message carrying the custom tool call");
  const tc = assistant.tool_calls[0];
  assert.equal(tc.id, "call_patch_1");
  assert.equal(tc.type, "function");
  assert.equal(tc.function.name, "apply_patch");
  assert.deepEqual(JSON.parse(tc.function.arguments), {
    input: "*** Begin Patch\n*** End Patch",
  });

  const toolMsg = result.messages.find((m) => m.role === "tool");
  assert.ok(toolMsg, "expected a tool result message");
  assert.equal(toolMsg.tool_call_id, "call_patch_1");
  // JSON-wrapped {"output":...} is unwrapped to the plain string.
  assert.equal(toolMsg.content, "applied");
});

// Response side: an apply_patch tool call must stream as custom_tool_call_input.* events
// and the raw patch string is unwrapped from the {"input":"..."} JSON the model produced.
test("OpenAI -> Responses: apply_patch streams as custom_tool_call with raw input (#1007)", () => {
  const events = collectEvents([
    {
      id: "chatcmpl-1",
      model: "gpt-5.3-codex",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                type: "function",
                function: { name: "apply_patch", arguments: '{"input":"PATCH' },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-1",
      model: "gpt-5.3-codex",
      choices: [
        {
          index: 0,
          delta: { tool_calls: [{ index: 0, function: { arguments: '_BODY"}' } }] },
          finish_reason: "tool_calls",
        },
      ],
    },
    // #6906: real providers may send no separate usage chunk at all — the stream-end
    // flush is what finalizes response.completed in that case.
    null,
  ]);

  const added = events.find((e) => e.event === "response.output_item.added");
  assert.ok(added);
  assert.equal(added.data.item.type, "custom_tool_call");
  assert.equal(added.data.item.name, "apply_patch");

  assert.ok(
    events.some((e) => e.event === "response.custom_tool_call_input.delta"),
    "expected a custom_tool_call_input.delta event"
  );
  // No function_call_arguments.* events should leak for a custom tool.
  assert.ok(!events.some((e) => e.event === "response.function_call_arguments.delta"));
  assert.ok(!events.some((e) => e.event === "response.function_call_arguments.done"));

  const inputDone = events.find((e) => e.event === "response.custom_tool_call_input.done");
  assert.ok(inputDone);
  assert.equal(inputDone.data.input, "PATCH_BODY");

  const itemDone = events.find(
    (e) => e.event === "response.output_item.done" && e.data.item.type === "custom_tool_call"
  );
  assert.ok(itemDone);
  assert.equal(itemDone.data.item.input, "PATCH_BODY");

  const completed = events.find((e) => e.event === "response.completed");
  assert.ok(completed);
  const customItem = completed.data.response.output.find((o) => o.type === "custom_tool_call");
  assert.ok(customItem, "final snapshot should carry the custom_tool_call item");
  assert.equal(customItem.input, "PATCH_BODY");
});

// Regression (live incident): a client (OpenClaw) that explicitly declares apply_patch
// as a plain `type:"function"` tool with its own `{input:string}` JSON-schema parameters
// must get a `function_call` item back with `arguments` as the raw JSON string it
// registered — NOT the apply_patch-is-always-custom fallback below. PR #7905 ("Restore
// Responses API custom tool calls") states this precedence should already hold ("...
// while preserving explicit function-tool precedence") but its `toolName ===
// "apply_patch"` unconditional OR never actually implemented that carve-out for
// apply_patch specifically. Forcing custom_tool_call onto a client that registered a
// function tool means the client's own dispatcher — which only knows how to handle
// function_call items for a name it declared as type:"function" — never recognizes the
// item at all: no error, no execution, no follow-up request with the tool result.
test("OpenAI -> Responses: apply_patch streams as function_call when the client declared it as a function tool (with tool defined)", () => {
  const toolSchemas = new Map([
    [
      "apply_patch",
      {
        type: "object",
        properties: { input: { type: "string" } },
        required: ["input"],
      },
    ],
  ]);
  const events = collectEvents(
    [
      {
        id: "chatcmpl-fn-apply-patch",
        model: "big-pickle",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  index: 0,
                  id: "call_1",
                  type: "function",
                  function: { name: "apply_patch", arguments: '{"input":"PATCH_BODY"}' },
                },
              ],
            },
            finish_reason: "tool_calls",
          },
        ],
      },
      null,
    ],
    new Set(), // client did not declare apply_patch as type:"custom"
    toolSchemas // ...but DID declare it as type:"function" with a parameters schema
  );

  const added = events.find((e) => e.event === "response.output_item.added");
  assert.ok(added);
  assert.equal(
    added.data.item.type,
    "function_call",
    "explicit function-tool declaration must win over the apply_patch-is-custom fallback"
  );
  assert.equal(added.data.item.name, "apply_patch");

  assert.ok(
    events.some((e) => e.event === "response.function_call_arguments.delta"),
    "expected function_call_arguments.delta events, not custom_tool_call_input.*"
  );
  assert.ok(!events.some((e) => e.event === "response.custom_tool_call_input.delta"));

  const done = events.find(
    (e) => e.event === "response.output_item.done" && e.data.item.type === "function_call"
  );
  assert.ok(done);
  // arguments must stay the raw JSON string the model produced — NOT unwrapped to the
  // bare patch text the way a genuine custom tool call would be.
  assert.equal(done.data.item.arguments, '{"input":"PATCH_BODY"}');

  const completed = events.find((e) => e.event === "response.completed");
  const finalItem = completed.data.response.output.find((o) => o.name === "apply_patch");
  assert.equal(finalItem.type, "function_call");
  assert.equal(finalItem.arguments, '{"input":"PATCH_BODY"}');
});

// Sibling of the test above (without tool defined): when the client's request never
// declares apply_patch as a tool at all (native Codex CLI convention — the model just
// emits it), the original #1007 fallback behavior must be unchanged: still custom_tool_call
// with the raw patch string unwrapped from the model's {"input":"..."} JSON.
test("OpenAI -> Responses: apply_patch still streams as custom_tool_call when the client never declared it (without tool defined)", () => {
  const events = collectEvents(
    [
      {
        id: "chatcmpl-no-decl-apply-patch",
        model: "gpt-5.3-codex",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  index: 0,
                  id: "call_1",
                  type: "function",
                  function: { name: "apply_patch", arguments: '{"input":"PATCH_BODY"}' },
                },
              ],
            },
            finish_reason: "tool_calls",
          },
        ],
      },
      null,
    ]
    // no customToolNames, no toolSchemas — apply_patch was never declared by the client
  );

  const added = events.find((e) => e.event === "response.output_item.added");
  assert.ok(added);
  assert.equal(added.data.item.type, "custom_tool_call");
  assert.equal(added.data.item.name, "apply_patch");
  assert.ok(events.some((e) => e.event === "response.custom_tool_call_input.delta"));

  const done = events.find(
    (e) => e.event === "response.output_item.done" && e.data.item.type === "custom_tool_call"
  );
  assert.ok(done);
  assert.equal(done.data.item.input, "PATCH_BODY");
});

test("OpenAI -> Responses: declared custom tools round-trip through the active translator", () => {
  const events = collectEvents(
    [
      {
        id: "chatcmpl-exec",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  index: 0,
                  id: "call_exec",
                  function: { name: "exec", arguments: '{"input":"text(\\"pong\\")"}' },
                },
              ],
            },
            finish_reason: "tool_calls",
          },
        ],
      },
      null,
    ],
    new Set(["exec"])
  );

  const added = events.find((event) => event.event === "response.output_item.added");
  const done = events.find(
    (event) => event.event === "response.output_item.done" && event.data.item.name === "exec"
  );
  assert.equal(added.data.item.type, "custom_tool_call");
  assert.equal(done.data.item.type, "custom_tool_call");
  assert.equal(done.data.item.input, 'text("pong")');
  assert.ok(events.some((event) => event.event === "response.custom_tool_call_input.delta"));
  assert.ok(!events.some((event) => event.event === "response.function_call_arguments.delta"));
});

test("OpenAI -> Responses: active translator defers custom item until its name arrives", () => {
  const events = collectEvents(
    [
      {
        id: "chatcmpl-late-name",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                { index: 0, id: "call_exec", function: { arguments: '{"input":"pong"}' } },
              ],
            },
          },
        ],
      },
      {
        id: "chatcmpl-late-name",
        choices: [
          {
            index: 0,
            delta: { tool_calls: [{ index: 0, function: { name: "exec" } }] },
            finish_reason: "tool_calls",
          },
        ],
      },
      null,
    ],
    new Set(["exec"])
  );

  const added = events.filter((event) => event.event === "response.output_item.added");
  assert.equal(added.length, 1);
  assert.equal(added[0].data.item.type, "custom_tool_call");
  assert.equal(added[0].data.item.name, "exec");
  assert.ok(!events.some((event) => event.data?.item?.type === "function_call"));
  const done = events.find(
    (event) => event.event === "response.output_item.done" && event.data.item.name === "exec"
  );
  assert.equal(done.data.item.input, "pong");
});
