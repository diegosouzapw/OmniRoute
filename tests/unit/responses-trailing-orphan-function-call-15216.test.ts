/**
 * #15216 — Chat Completions → Responses direction: an assistant `tool_calls`
 * turn with no matching trailing `role: "tool"` output was forwarded as an
 * unpaired `function_call` item in the Responses input, which strict Responses
 * upstreams reject with `400 No tool output found for function call <id>`.
 *
 * The fix pairs every unpaired `function_call` with a synthesized empty
 * `function_call_output` in place — the mirror image of the existing
 * orphan-output filter in the same file, and consistent with how the
 * reverse direction already repairs orphaned history.
 *
 * Run: node --import tsx/esm --test tests/unit/responses-trailing-orphan-function-call-15216.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

type InputItem = {
  type?: string;
  call_id?: string;
  output?: unknown;
  status?: string;
};

function translate(body: unknown): { input: InputItem[] } {
  return openaiToOpenAIResponsesRequest("gpt-4", body, true, {}) as { input: InputItem[] };
}

const ORPHAN_REPRO = {
  messages: [
    { role: "user", content: "Say OK." },
    {
      role: "assistant",
      content: null,
      tool_calls: [
        {
          id: "call_orphan_livecheck",
          type: "function",
          function: { name: "probe", arguments: '{"q":"alpha"}' },
        },
      ],
    },
  ],
};

test("#15216: trailing unpaired function_call is repaired with a synthesized empty output", () => {
  const result = translate(ORPHAN_REPRO);

  const calls = result.input.filter((item) => item.type === "function_call");
  const outputs = result.input.filter((item) => item.type === "function_call_output");

  assert.equal(calls.length, 1, "the orphan call itself must survive");
  assert.equal(calls[0].call_id, "call_orphan_livecheck");
  assert.equal(
    outputs.length,
    1,
    "exactly one function_call_output must exist — currently the orphan goes out unpaired and strict upstreams 400"
  );
  assert.equal(outputs[0].call_id, "call_orphan_livecheck");
  assert.equal(outputs[0].output, "");
  assert.equal(outputs[0].status, "completed");

  // The synthesized output must come AFTER its call in the input order.
  const callIdx = result.input.findIndex((item) => item.type === "function_call");
  const outputIdx = result.input.findIndex((item) => item.type === "function_call_output");
  assert.ok(outputIdx > callIdx, "synthesized output must follow its call");
});

test("#15216: a properly paired call keeps its real output untouched", () => {
  const result = translate({
    messages: [
      { role: "user", content: "Say OK." },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_real",
            type: "function",
            function: { name: "probe", arguments: "{}" },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_real", content: "real result" },
    ],
  });

  const outputs = result.input.filter((item) => item.type === "function_call_output");
  assert.equal(outputs.length, 1, "no synthesized output may be added next to a real one");
  assert.equal(outputs[0].call_id, "call_real");
  assert.equal(outputs[0].output, "real result");
});

test("#15216: mid-history unpaired call is paired in place without disturbing later items", () => {
  const result = translate({
    messages: [
      { role: "user", content: "first" },
      {
        role: "assistant",
        content: "calling tool",
        tool_calls: [
          {
            id: "call_lost",
            type: "function",
            function: { name: "probe", arguments: "{}" },
          },
        ],
      },
      { role: "user", content: "continue" },
    ],
  });

  const types = result.input.map((item) => item.type);
  const callIdx = types.indexOf("function_call");
  const outputIdx = types.indexOf("function_call_output");

  assert.ok(callIdx >= 0, "orphan call must survive translation");
  assert.notEqual(outputIdx, -1, "an output item must exist for the mid-history orphan");
  assert.equal(
    outputIdx,
    callIdx + 1,
    "synthesized output must sit immediately after the orphan call"
  );
  assert.equal(result.input[outputIdx].call_id, "call_lost");
  assert.equal(result.input[outputIdx].output, "");
  // The trailing user message keeps its position after the repaired pair.
  const continueIdx = types.lastIndexOf("message");
  assert.equal(continueIdx, outputIdx + 1, "the trailing user message follows the repaired pair");
});

test("#15216: mixed turn — only the call missing its output is synthesized", () => {
  const result = translate({
    messages: [
      { role: "user", content: "Say OK." },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call_orphan", type: "function", function: { name: "a", arguments: "{}" } },
          { id: "call_paired", type: "function", function: { name: "b", arguments: "{}" } },
        ],
      },
      { role: "tool", tool_call_id: "call_paired", content: "b result" },
    ],
  });

  const outputs = result.input.filter((item) => item.type === "function_call_output");
  assert.equal(outputs.length, 2, "orphan synthesized + real output");

  const orphanOutput = outputs.find((item) => item.call_id === "call_orphan");
  const realOutput = outputs.find((item) => item.call_id === "call_paired");
  assert.ok(orphanOutput, "the unpaired call must gain an output");
  assert.equal(orphanOutput.output, "");
  assert.ok(realOutput, "the paired call keeps its output");
  assert.equal(realOutput.output, "b result");
});
