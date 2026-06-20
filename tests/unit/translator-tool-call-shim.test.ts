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

test("hasToolCallShim: returns true for registered shims", () => {
  assert.equal(hasToolCallShim("Read"), true);
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

test("applyToolCallShimToBuffer: Read removes empty pages but preserves valid ranges", () => {
  const withEmptyPages = JSON.parse(
    applyToolCallShimToBuffer(
      "Read",
      JSON.stringify({ file_path: "/etc/hosts", offset: 1, limit: 5, pages: "" })
    )
  );
  assert.deepEqual(withEmptyPages, { file_path: "/etc/hosts", offset: 1, limit: 5 });

  const withEmptyArrayPages = JSON.parse(
    applyToolCallShimToBuffer("Read", JSON.stringify({ file_path: "/tmp/a.pdf", pages: [] }))
  );
  assert.deepEqual(withEmptyArrayPages, { file_path: "/tmp/a.pdf" });

  const withValidPages = JSON.parse(
    applyToolCallShimToBuffer("Read", JSON.stringify({ file_path: "/tmp/a.pdf", pages: "1-5" }))
  );
  assert.deepEqual(withValidPages, { file_path: "/tmp/a.pdf", pages: "1-5" });
});

// Port of decolua/9router#1144: non-Anthropic models (GPT-5.5, DeepSeek …) sometimes
// emit absurd Read-tool args (e.g. limit: 99999999999) that Claude Code rejects and
// retries, wasting tokens. The shim clamps/normalizes those args before re-emitting.
test("applyToolCallShimToBuffer: Read clamps limit to 2000 (non-Anthropic models)", () => {
  const out = JSON.parse(
    applyToolCallShimToBuffer(
      "Read",
      JSON.stringify({ file_path: "/etc/hosts", limit: 99999999999 })
    )
  );
  assert.equal(out.limit, 2000);
});

test("applyToolCallShimToBuffer: Read drops non-positive limit", () => {
  const zero = JSON.parse(
    applyToolCallShimToBuffer("Read", JSON.stringify({ file_path: "/etc/hosts", limit: 0 }))
  );
  assert.equal("limit" in zero, false);

  const negative = JSON.parse(
    applyToolCallShimToBuffer("Read", JSON.stringify({ file_path: "/etc/hosts", limit: -50 }))
  );
  assert.equal("limit" in negative, false);
});

test("applyToolCallShimToBuffer: Read clamps negative offset to 0", () => {
  const out = JSON.parse(
    applyToolCallShimToBuffer("Read", JSON.stringify({ file_path: "/etc/hosts", offset: -5 }))
  );
  assert.equal(out.offset, 0);
});

test("applyToolCallShimToBuffer: Read coerces numeric-string limit/offset", () => {
  const out = JSON.parse(
    applyToolCallShimToBuffer(
      "Read",
      JSON.stringify({ file_path: "/etc/hosts", limit: "100", offset: "5" })
    )
  );
  assert.equal(out.limit, 100);
  assert.equal(out.offset, 5);
});

test("applyToolCallShimToBuffer: Read strips pages for non-PDF files", () => {
  const out = JSON.parse(
    applyToolCallShimToBuffer(
      "Read",
      JSON.stringify({ file_path: "/etc/hosts", pages: "1-3" })
    )
  );
  assert.equal("pages" in out, false);
});

test("applyToolCallShimToBuffer: Read strips malformed pages even on PDFs", () => {
  const out = JSON.parse(
    applyToolCallShimToBuffer(
      "Read",
      JSON.stringify({ file_path: "/tmp/doc.pdf", pages: "abc" })
    )
  );
  assert.equal("pages" in out, false);
});

test("applyToolCallShimToBuffer: Read accepts a single page on PDFs", () => {
  const out = JSON.parse(
    applyToolCallShimToBuffer(
      "Read",
      JSON.stringify({ file_path: "/tmp/doc.PDF", pages: "7" })
    )
  );
  assert.equal(out.pages, "7");
});

test("applyToolCallShimToBuffer: Read combined absurd args from non-Anthropic model", () => {
  // Simulates the upstream issue exactly: GPT-5.5-style giant limit, negative offset,
  // and a stray empty-string pages on a non-PDF.
  const out = JSON.parse(
    applyToolCallShimToBuffer(
      "Read",
      JSON.stringify({
        file_path: "F:/repo/file.js",
        offset: -5,
        limit: 25999999999999999,
        pages: "",
      })
    )
  );
  assert.deepEqual(out, { file_path: "F:/repo/file.js", offset: 0, limit: 2000 });
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

test("streaming: Read suppresses raw pages delta and emits cleaned input at finish", () => {
  const state = freshState();
  const chunks = [
    {
      id: "chatcmpl-read",
      model: "codex/gpt-5.5-high",
      choices: [
        {
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_read",
                function: { name: "Read", arguments: "" },
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
            tool_calls: [
              {
                index: 0,
                function: {
                  arguments: '{"file_path":"/etc/hosts","offset":1,"limit":5,"pages":""}',
                },
              },
            ],
          },
        },
      ],
    },
    { choices: [{ delta: {}, finish_reason: "tool_calls" }] },
  ];

  const events = streamChunks(chunks, state);
  const inputDeltas = events.filter(
    (e) => e.type === "content_block_delta" && e.delta?.type === "input_json_delta"
  );

  assert.equal(inputDeltas.length, 1, "expected exactly one cleaned Read delta");
  assert.equal(inputDeltas[0].delta.partial_json.includes('"pages"'), false);
  assert.deepEqual(JSON.parse(inputDeltas[0].delta.partial_json), {
    file_path: "/etc/hosts",
    offset: 1,
    limit: 5,
  });
});

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
