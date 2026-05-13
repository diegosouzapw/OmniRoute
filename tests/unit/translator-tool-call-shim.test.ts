import test from "node:test";
import assert from "node:assert/strict";

const { applyToolCallShimToBuffer, hasToolCallShim, __test } = await import(
  "../../open-sse/translator/helpers/toolCallShim.ts"
);
const { openaiToClaudeResponse } = await import(
  "../../open-sse/translator/response/openai-to-claude.ts"
);

const { coerceToArray } = __test as { coerceToArray: (v: unknown) => unknown[] };

// -------- Helper-level tests --------

test("hasToolCallShim: returns true for submit_pr_review only", () => {
  assert.equal(hasToolCallShim("submit_pr_review"), true);
  assert.equal(hasToolCallShim("some_other_tool"), false);
  assert.equal(hasToolCallShim(""), false);
  assert.equal(hasToolCallShim(undefined), false);
  assert.equal(hasToolCallShim(null), false);
});

test("coerceToArray: passes arrays through unchanged", () => {
  assert.deepEqual(coerceToArray([]), []);
  assert.deepEqual(coerceToArray([{ a: 1 }]), [{ a: 1 }]);
});

test("coerceToArray: null/undefined -> []", () => {
  assert.deepEqual(coerceToArray(null), []);
  assert.deepEqual(coerceToArray(undefined), []);
});

test("coerceToArray: plain object -> []", () => {
  assert.deepEqual(coerceToArray({}), []);
  assert.deepEqual(coerceToArray({ a: 1 }), []);
});

test("coerceToArray: empty string -> []", () => {
  assert.deepEqual(coerceToArray(""), []);
});

test("coerceToArray: stringified array parsed", () => {
  assert.deepEqual(coerceToArray("[]"), []);
  assert.deepEqual(coerceToArray('[{"title":"x"}]'), [{ title: "x" }]);
});

test("coerceToArray: unparseable string -> []", () => {
  assert.deepEqual(coerceToArray("not json"), []);
  assert.deepEqual(coerceToArray("{"), []);
});

test("coerceToArray: stringified non-array -> []", () => {
  assert.deepEqual(coerceToArray('{"a":1}'), []);
  assert.deepEqual(coerceToArray('"a string"'), []);
});

test("applyToolCallShimToBuffer: submit_pr_review with valid arrays preserved", () => {
  const raw = JSON.stringify({
    summary: "ok",
    functionalChanges: [{ description: "x" }],
    findings: [{ title: "y" }],
  });
  const out = JSON.parse(applyToolCallShimToBuffer("submit_pr_review", raw));
  assert.equal(out.summary, "ok");
  assert.deepEqual(out.functionalChanges, [{ description: "x" }]);
  assert.deepEqual(out.findings, [{ title: "y" }]);
});

test("applyToolCallShimToBuffer: submit_pr_review missing both keys -> arrays injected", () => {
  const raw = JSON.stringify({ summary: "no findings" });
  const out = JSON.parse(applyToolCallShimToBuffer("submit_pr_review", raw));
  assert.equal(out.summary, "no findings");
  assert.deepEqual(out.functionalChanges, []);
  assert.deepEqual(out.findings, []);
});

test("applyToolCallShimToBuffer: submit_pr_review with functionalChanges=null replaced", () => {
  const raw = JSON.stringify({ functionalChanges: null, findings: [] });
  const out = JSON.parse(applyToolCallShimToBuffer("submit_pr_review", raw));
  assert.deepEqual(out.functionalChanges, []);
  assert.deepEqual(out.findings, []);
});

test("applyToolCallShimToBuffer: submit_pr_review with findings={} replaced", () => {
  const raw = JSON.stringify({ functionalChanges: [], findings: {} });
  const out = JSON.parse(applyToolCallShimToBuffer("submit_pr_review", raw));
  assert.deepEqual(out.findings, []);
});

test("applyToolCallShimToBuffer: submit_pr_review with findings='' replaced", () => {
  const raw = JSON.stringify({ functionalChanges: [], findings: "" });
  const out = JSON.parse(applyToolCallShimToBuffer("submit_pr_review", raw));
  assert.deepEqual(out.findings, []);
});

test("applyToolCallShimToBuffer: submit_pr_review with findings='[]' parsed", () => {
  const raw = JSON.stringify({ functionalChanges: [], findings: "[]" });
  const out = JSON.parse(applyToolCallShimToBuffer("submit_pr_review", raw));
  assert.deepEqual(out.findings, []);
});

test("applyToolCallShimToBuffer: submit_pr_review with stringified array of objects parsed", () => {
  const raw = JSON.stringify({
    functionalChanges: [],
    findings: '[{"title":"x"}]',
  });
  const out = JSON.parse(applyToolCallShimToBuffer("submit_pr_review", raw));
  assert.deepEqual(out.findings, [{ title: "x" }]);
});

test("applyToolCallShimToBuffer: submit_pr_review with empty buffer -> empty arrays injected", () => {
  const out = JSON.parse(applyToolCallShimToBuffer("submit_pr_review", ""));
  assert.deepEqual(out.functionalChanges, []);
  assert.deepEqual(out.findings, []);
});

test("applyToolCallShimToBuffer: submit_pr_review with unparseable buffer -> empty arrays", () => {
  const out = JSON.parse(applyToolCallShimToBuffer("submit_pr_review", "{broken"));
  assert.deepEqual(out.functionalChanges, []);
  assert.deepEqual(out.findings, []);
});

test("applyToolCallShimToBuffer: non-shimmed tool passes raw through", () => {
  const raw = '{"x":1}';
  assert.equal(applyToolCallShimToBuffer("some_other_tool", raw), raw);
});

// -------- Streaming integration tests --------

function freshState() {
  return {
    messageStartSent: false,
    nextBlockIndex: 0,
    toolCalls: new Map(),
    thinkingBlockStarted: false,
    textBlockStarted: false,
    textBlockClosed: false,
  };
}

function streamChunks(chunks: any[], state: any): any[] {
  const all: any[] = [];
  for (const c of chunks) {
    const out = openaiToClaudeResponse(c, state);
    if (out) all.push(...out);
  }
  return all;
}

test("streaming: submit_pr_review with missing arrays gets corrective delta at finish", () => {
  const state = freshState();
  const chunks = [
    // chunk 1: message start + tool call start with name
    {
      id: "chatcmpl-1",
      model: "xiaomi-mimo/mimo-v2.5-pro",
      choices: [
        {
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                function: { name: "submit_pr_review", arguments: "" },
              },
            ],
          },
        },
      ],
    },
    // chunk 2: argument fragment (summary only — no findings/functionalChanges)
    {
      choices: [
        {
          delta: {
            tool_calls: [
              {
                index: 0,
                function: { arguments: '{"summary":"no findings"}' },
              },
            ],
          },
        },
      ],
    },
    // chunk 3: finish
    {
      choices: [{ delta: {}, finish_reason: "tool_calls" }],
    },
  ];

  const events = streamChunks(chunks, state);

  // No passthrough input_json_delta for shimmed tool
  const passthroughDeltas = events.filter(
    (e) =>
      e.type === "content_block_delta" &&
      e.delta?.type === "input_json_delta" &&
      e.delta?.partial_json === '{"summary":"no findings"}'
  );
  assert.equal(passthroughDeltas.length, 0, "raw passthrough delta should be suppressed");

  // Exactly one corrective input_json_delta on the tool block
  const correctiveDeltas = events.filter(
    (e) => e.type === "content_block_delta" && e.delta?.type === "input_json_delta"
  );
  assert.equal(correctiveDeltas.length, 1, "expected exactly one corrective delta");

  const finalInput = JSON.parse(correctiveDeltas[0].delta.partial_json);
  assert.equal(finalInput.summary, "no findings");
  assert.deepEqual(finalInput.functionalChanges, []);
  assert.deepEqual(finalInput.findings, []);

  // Corrective delta MUST come before the content_block_stop for that tool block
  const correctiveIdx = events.findIndex(
    (e) => e.type === "content_block_delta" && e.delta?.type === "input_json_delta"
  );
  const stopIdx = events.findIndex(
    (e) => e.type === "content_block_stop" && e.index === correctiveDeltas[0].index
  );
  assert.ok(correctiveIdx < stopIdx, "corrective delta must precede content_block_stop");
});

test("streaming: non-shimmed tool still streams partials through", () => {
  const state = freshState();
  const chunks = [
    {
      id: "chatcmpl-1",
      model: "x",
      choices: [
        {
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                function: { name: "some_other_tool", arguments: "" },
              },
            ],
          },
        },
      ],
    },
    {
      choices: [
        {
          delta: {
            tool_calls: [{ index: 0, function: { arguments: '{"x":1}' } }],
          },
        },
      ],
    },
    { choices: [{ delta: {}, finish_reason: "tool_calls" }] },
  ];

  const events = streamChunks(chunks, state);
  const deltas = events.filter(
    (e) => e.type === "content_block_delta" && e.delta?.type === "input_json_delta"
  );
  // For non-shimmed tools, the original passthrough delta survives (and no extra corrective delta).
  assert.equal(deltas.length, 1);
  assert.equal(deltas[0].delta.partial_json, '{"x":1}');
});
