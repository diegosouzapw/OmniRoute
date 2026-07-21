import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");
const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function collectEvents(chunks, customToolNames = new Set()) {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  state.customToolNames = customToolNames;
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
