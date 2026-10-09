import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

/**
 * Regression coverage for the Codex/`functions.exec` report: a Responses client
 * declares a freeform tool as `type:"namespace"` `functions` + `type:"custom"`
 * `exec` (flattened to the Chat wire name `functions__exec`). Two provider
 * behaviours used to strip that identity and hand Codex a plain `function_call`
 * with no `namespace` — which its freeform dispatcher rejects:
 *
 *   1. the declared name arriving split across streaming deltas, and
 *   2. the declared name arriving as the bare leaf `exec`.
 *
 * The identity ledger + custom set here mirror what the request side produces.
 */
function collectEvents(
  chunks,
  { customToolNames = new Set(), toolSchemas = null, identityMap = null } = {}
) {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  state.customToolNames = customToolNames;
  if (toolSchemas) state.toolSchemas = toolSchemas;
  if (identityMap) state.requestToolIdentityMap = identityMap;
  const events = [];
  for (const chunk of chunks) {
    const result = openaiToOpenAIResponsesResponse(chunk, state);
    if (result) events.push(...result);
  }
  return events;
}

const chunk = (input, finish = null) => ({
  id: "chatcmpl-1",
  model: "deepseek-v4.1-flash",
  choices: [{ index: 0, delta: input, finish_reason: finish }],
});

const NAME_ONLY = (name) => chunk({ tool_calls: [{ index: 0, id: "call_1", type: "function", function: { name } }] });
const ARGS_ONLY = (name, args) =>
  chunk({
    tool_calls: [{ index: 0, id: "call_1", type: "function", function: { name, arguments: args } }],
  });
const FINISH = chunk({}, "tool_calls");

const EXEC_ARGS = '{"input":"console.log(1)"}';
const functionsExecSchema = {
  type: "object",
  properties: { input: { type: "string" } },
  required: ["input"],
  additionalProperties: false,
};
const functionsExecIdentity = new Map([
  ["functions__exec", { namespace: "functions", name: "exec" }],
]);
const functionsExecCustom = new Set(["functions__exec"]);

const doneItems = (events) =>
  events.filter((e) => e.event === "response.output_item.done").map((e) => e.data.item);

test("OpenAI -> Responses: a name split across deltas is accumulated before classification", () => {
  const events = collectEvents([NAME_ONLY("functions__"), ARGS_ONLY("exec", EXEC_ARGS), FINISH, null], {
    customToolNames: functionsExecCustom,
    toolSchemas: new Map([["functions__exec", functionsExecSchema]]),
    identityMap: functionsExecIdentity,
  });

  const items = doneItems(events);
  const custom = items.find((item) => item.type === "custom_tool_call");
  assert.ok(custom, "expected a custom_tool_call item");
  assert.equal(custom.name, "exec");
  assert.equal(custom.namespace, "functions");
  assert.equal(custom.input, "console.log(1)");
  assert.equal(
    items.some((item) => item.type === "function_call"),
    false,
    "the freeform tool must not be announced as a plain function_call"
  );
});

test("OpenAI -> Responses: a bare leaf name resolves to the declared namespace custom tool", () => {
  const events = collectEvents([ARGS_ONLY("exec", EXEC_ARGS), FINISH, null], {
    customToolNames: functionsExecCustom,
    toolSchemas: new Map([["functions__exec", functionsExecSchema]]),
    identityMap: functionsExecIdentity,
  });

  const items = doneItems(events);
  const custom = items.find((item) => item.type === "custom_tool_call");
  assert.ok(custom, "expected a custom_tool_call item for the bare leaf");
  assert.equal(custom.name, "exec");
  assert.equal(custom.namespace, "functions");
  assert.equal(custom.input, "console.log(1)");
});

test("OpenAI -> Responses: an ambiguous bare leaf stays a plain function_call", () => {
  const events = collectEvents([ARGS_ONLY("exec", EXEC_ARGS), FINISH, null], {
    customToolNames: new Set(["a__exec", "b__exec"]),
    identityMap: new Map([
      ["a__exec", { namespace: "a", name: "exec" }],
      ["b__exec", { namespace: "b", name: "exec" }],
    ]),
  });

  const items = doneItems(events);
  const call = items.find((item) => item.type === "function_call");
  assert.ok(call, "expected a function_call item");
  assert.equal(call.name, "exec");
  assert.equal(call.namespace, undefined);
  assert.equal(items.some((item) => item.type === "custom_tool_call"), false);
});

test("OpenAI -> Responses: an explicit flat declaration of the bare name keeps its identity", () => {
  const events = collectEvents([ARGS_ONLY("exec", EXEC_ARGS), FINISH, null], {
    customToolNames: functionsExecCustom,
    // The client also declared a flat `exec` tool (type:"function"), so the bare
    // name must not be folded into the namespaced custom sibling.
    toolSchemas: new Map<string, unknown>([
      ["exec", { type: "object", properties: {} }],
      ["functions__exec", functionsExecSchema],
    ]),
    identityMap: functionsExecIdentity,
  });

  const items = doneItems(events);
  const call = items.find((item) => item.type === "function_call");
  assert.ok(call, "expected a function_call item for the flat declaration");
  assert.equal(call.name, "exec");
  assert.equal(call.namespace, undefined);
  assert.equal(items.some((item) => item.type === "custom_tool_call"), false);
});
