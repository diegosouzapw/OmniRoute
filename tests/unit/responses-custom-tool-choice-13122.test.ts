import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");
const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

// #13122: Codex CLI (wire_api="responses") sends tool_choice.type = "custom" when it wants
// to force the model to call a declared freeform/custom tool (e.g. functions__exec). OmniRoute
// rejects this with an unsupported_feature error, even though the same request's `tools[].type
// = "custom"` declaration is already accepted and normalized into a Chat { input: string }
// function schema a few lines above (see translator-openai-responses-custom-tool-1007.test.ts).
test("Responses -> Chat: tool_choice.type = 'custom' forces the named custom tool instead of throwing (#13122)", () => {
  const body = {
    model: "kr/gpt-5.6-sol",
    tools: [
      {
        type: "custom",
        name: "functions__exec",
        description: "Execute freeform code",
      },
    ],
    tool_choice: {
      type: "custom",
      name: "functions__exec",
    },
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: 'Call functions__exec with exactly: text("ok")' }],
      },
    ],
    stream: false,
  };

  // Previously (buggy) this threw:
  //   "Unsupported Responses API feature: tool_choice type 'custom' is not supported by omniroute"
  // reproducing the exact error body from issue #13122's Reproduction 1 curl.
  const result = openaiResponsesToOpenAIRequest("kr/gpt-5.6-sol", body, false, {});

  assert.deepEqual(result.tool_choice, {
    type: "function",
    function: { name: "functions__exec" },
  });
});

// A {type:"custom"} tool_choice with no `name` is not spec-compliant (Responses API's
// ToolChoiceCustom always requires `name`) — it must still fall through to the existing
// unsupported_feature throw rather than silently producing a malformed tool_choice.
test("Responses -> Chat: tool_choice.type = 'custom' without a name still throws unsupported_feature (#13122)", () => {
  const body = {
    model: "kr/gpt-5.6-sol",
    tools: [{ type: "custom", name: "functions__exec", description: "Execute freeform code" }],
    tool_choice: { type: "custom" },
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "hi" }],
      },
    ],
    stream: false,
  };

  assert.throws(
    () => openaiResponsesToOpenAIRequest("kr/gpt-5.6-sol", body, false, {}),
    /Unsupported Responses API feature: tool_choice type 'custom' is not supported by omniroute/
  );
});

// End-to-end: the Chat tool_choice produced above (forcing a call to the declared custom
// tool) must, once the model actually calls it, round-trip back out through the Responses
// response translator as a `custom_tool_call` item with a raw (unwrapped) `input` string —
// not a `function_call` item with JSON arguments. This is the behavior Codex CLI actually
// depends on to complete the custom_tool_call / custom_tool_call_output lifecycle.
test("OpenAI -> Responses: forced custom tool call round-trips as custom_tool_call with raw input (#13122)", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  state.customToolNames = new Set(["functions__exec"]);

  const events: unknown[] = [];
  const chunks = [
    {
      id: "chatcmpl-1",
      model: "kr/gpt-5.6-sol",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                type: "function",
                function: { name: "functions__exec", arguments: '{"input":"text(' },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "chatcmpl-1",
      model: "kr/gpt-5.6-sol",
      choices: [
        {
          index: 0,
          delta: { tool_calls: [{ index: 0, function: { arguments: '\\"ok\\")"}' } }] },
          finish_reason: "tool_calls",
        },
      ],
    },
    null,
  ];
  for (const chunk of chunks) {
    const result = openaiToOpenAIResponsesResponse(chunk, state);
    if (result) events.push(...result);
  }

  const added = events.find((e: { event?: string }) => e.event === "response.output_item.added") as
    { data: { item: { type: string; name: string } } } | undefined;
  assert.ok(added);
  assert.equal(added.data.item.type, "custom_tool_call");
  assert.equal(added.data.item.name, "functions__exec");

  const itemDone = events.find(
    (e: { event?: string; data?: { item?: { type?: string } } }) =>
      e.event === "response.output_item.done" && e.data?.item?.type === "custom_tool_call"
  ) as { data: { item: { input: string } } } | undefined;
  assert.ok(itemDone);
  assert.equal(itemDone.data.item.input, 'text("ok")');
});
