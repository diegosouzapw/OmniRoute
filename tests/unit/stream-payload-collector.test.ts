import test from "node:test";
import assert from "node:assert/strict";

const collector = await import("../../open-sse/utils/streamPayloadCollector.ts");

test("compactStructuredStreamPayload returns null for null input", () => {
  assert.equal(collector.compactStructuredStreamPayload(null), null);
});

test("compactStructuredStreamPayload returns undefined for undefined input", () => {
  assert.equal(collector.compactStructuredStreamPayload(undefined), undefined);
});

test("compactStructuredStreamPayload passes through primitives", () => {
  assert.equal(collector.compactStructuredStreamPayload(42), 42);
  assert.equal(collector.compactStructuredStreamPayload("str"), "str");
  assert.equal(collector.compactStructuredStreamPayload(true), true);
});

test("compactStructuredStreamPayload compacts objects", () => {
  const input = { a: 1, b: "hello", c: [1, 2, 3] };
  const result = collector.compactStructuredStreamPayload(input);
  assert.ok(typeof result === "object");
  assert.ok(result !== null);
});

test("compactStructuredStreamPayload handles nested objects", () => {
  const input = { outer: { inner: { deep: "value" } } };
  const result = collector.compactStructuredStreamPayload(input);
  assert.ok(typeof result === "object");
});

test("compactStructuredStreamPayload handles arrays", () => {
  const input = [1, 2, { a: 3 }];
  const result = collector.compactStructuredStreamPayload(input);
  assert.ok(Array.isArray(result));
});

test("buildStreamSummaryFromEvents handles empty array", () => {
  const result = collector.buildStreamSummaryFromEvents([]);
  assert.ok(result === null || typeof result === "object");
});

test("buildStreamSummaryFromEvents handles single event", () => {
  const events = [{ data: { choices: [{ delta: { content: "hello" } }] } }];
  const result = collector.buildStreamSummaryFromEvents(events) as any;
  assert.ok(result !== null);
  assert.ok(typeof result === "object");
});

test("buildStreamSummaryFromEvents handles multiple events", () => {
  const events = [
    { data: { choices: [{ delta: { content: "hello" } }] } },
    { data: { choices: [{ delta: { content: " world" } }] } },
  ];
  const result = collector.buildStreamSummaryFromEvents(events) as any;
  assert.ok(result !== null);
  assert.ok(typeof result === "object");
});

test("createStructuredSSECollector returns collector object", () => {
  const result = collector.createStructuredSSECollector();
  assert.ok(typeof result === "object");
  assert.ok(result !== null);
});

test("createStructuredSSECollector with options", () => {
  const result = collector.createStructuredSSECollector({ maxEvents: 100 });
  assert.ok(typeof result === "object");
});

test("createStructuredSSECollector collector has expected methods", () => {
  const c = collector.createStructuredSSECollector();
  assert.ok(c !== null && typeof c === "object");
  const keys = Object.keys(c);
  assert.ok(keys.length > 0);
});

// #6276 — tool_call arguments lost in request/response logs when a continuation
// delta omits `index` (some OpenAI-compatible proxies only send `index` on the
// FIRST tool_call delta chunk, then only `id` on subsequent chunks).

type ToolCallSummary = {
  choices: Array<{
    message: {
      tool_calls: Array<{ function: { name: string; arguments: string } }>;
    };
  }>;
};

function toolCallEvent(delta: Record<string, unknown>, finishReason?: string) {
  return {
    index: 0,
    data: {
      id: "chatcmpl-1",
      object: "chat.completion.chunk",
      created: 1,
      model: "deepseek-v4-flash-free",
      choices: [{ index: 0, delta, ...(finishReason ? { finish_reason: finishReason } : {}) }],
    },
  };
}

test("buildStreamSummaryFromEvents merges tool_call deltas when every chunk carries `index` (happy path)", () => {
  const events = [
    toolCallEvent({
      role: "assistant",
      tool_calls: [
        { index: 0, id: "call_a", type: "function", function: { name: "Bash", arguments: "" } },
      ],
    }),
    toolCallEvent({
      tool_calls: [
        { index: 0, id: "call_a", type: "function", function: { arguments: '{"x":1}' } },
      ],
    }),
    toolCallEvent({}, "tool_calls"),
  ];

  const summary = collector.buildStreamSummaryFromEvents(
    events,
    "openai",
    "deepseek-v4-flash-free"
  ) as ToolCallSummary;
  const toolCalls = summary.choices[0].message.tool_calls;

  assert.equal(toolCalls.length, 1);
  assert.equal(toolCalls[0].function.name, "Bash");
  assert.equal(toolCalls[0].function.arguments, '{"x":1}');
});

test("buildStreamSummaryFromEvents merges a continuation delta that carries only `id` (no `index`) into the initiating tool_call (#6276)", () => {
  const events = [
    toolCallEvent({
      role: "assistant",
      tool_calls: [
        {
          index: 0,
          id: "call_00_xasdOvEWoeldzXAqFPQP2849",
          type: "function",
          function: { name: "Bash", arguments: "" },
        },
      ],
    }),
    // Continuation chunk omits `index`, carries only `id` + arguments fragment.
    toolCallEvent({
      tool_calls: [
        {
          id: "call_00_xasdOvEWoeldzXAqFPQP2849",
          type: "function",
          function: { arguments: '{"command": "date' },
        },
      ],
    }),
    toolCallEvent({
      tool_calls: [
        {
          id: "call_00_xasdOvEWoeldzXAqFPQP2849",
          type: "function",
          function: { arguments: '"}' },
        },
      ],
    }),
    toolCallEvent({}, "tool_calls"),
  ];

  const summary = collector.buildStreamSummaryFromEvents(
    events,
    "openai",
    "deepseek-v4-flash-free"
  ) as ToolCallSummary;
  const toolCalls = summary.choices[0].message.tool_calls;

  assert.equal(
    toolCalls.length,
    1,
    `expected 1 tool_call, got ${toolCalls.length}: ${JSON.stringify(toolCalls)}`
  );
  assert.equal(toolCalls[0].function.name, "Bash");
  assert.equal(toolCalls[0].function.arguments, '{"command": "date"}');
});

test("buildStreamSummaryFromEvents keeps two genuinely different interleaved tool_calls separate", () => {
  const events = [
    toolCallEvent({
      role: "assistant",
      tool_calls: [
        { index: 0, id: "call_a", type: "function", function: { name: "Bash", arguments: "" } },
        { index: 1, id: "call_b", type: "function", function: { name: "Read", arguments: "" } },
      ],
    }),
    toolCallEvent({
      tool_calls: [
        { index: 0, id: "call_a", type: "function", function: { arguments: '{"cmd":"a"' } },
        { index: 1, id: "call_b", type: "function", function: { arguments: '{"path":"b"' } },
      ],
    }),
    toolCallEvent({
      tool_calls: [
        { index: 0, id: "call_a", type: "function", function: { arguments: "}" } },
        { index: 1, id: "call_b", type: "function", function: { arguments: "}" } },
      ],
    }),
    toolCallEvent({}, "tool_calls"),
  ];

  const summary = collector.buildStreamSummaryFromEvents(
    events,
    "openai",
    "deepseek-v4-flash-free"
  ) as ToolCallSummary;
  const toolCalls = summary.choices[0].message.tool_calls;

  assert.equal(toolCalls.length, 2);
  assert.equal(toolCalls[0].function.name, "Bash");
  assert.equal(toolCalls[0].function.arguments, '{"cmd":"a"}');
  assert.equal(toolCalls[1].function.name, "Read");
  assert.equal(toolCalls[1].function.arguments, '{"path":"b"}');
});

type OpenAIStreamSummary = {
  choices: Array<{
    finish_reason: string;
    message: {
      tool_calls?: Array<{ function: { name: string; arguments: string } }>;
      reasoning_content?: string;
    };
  }>;
  usage?: { total_tokens: number };
};

// #9315 — the dashboard's "Provider Response" panel went stale/incomplete for
// long streamed responses because it was reconstructed from
// buildStreamSummaryFromEvents(collector.getEvents(), ...) — and getEvents()
// only returns whatever survived the collector's maxEvents/maxBytes cap. Once
// a stream exceeded that cap, every chunk after the cutoff (final
// finish_reason, tool_calls, rest of reasoning_content, usage) was silently
// dropped from the reconstruction, even though the client actually received
// the complete, correct response.
test("#9315: collector.getSummary() reflects the full stream even after maxEvents truncation", () => {
  const c = collector.createStructuredSSECollector({
    maxEvents: 3,
    format: "openai",
    fallbackModel: "test-model",
  });

  // First 3 chunks fill the cap.
  c.push({
    id: "chatcmpl-1",
    object: "chat.completion.chunk",
    created: 1,
    model: "test-model",
    choices: [{ index: 0, delta: { role: "assistant", content: "Thinking" } }],
  });
  c.push({ choices: [{ index: 0, delta: { content: " about it" } }] });
  c.push({ choices: [{ index: 0, delta: { reasoning_content: "step one. " } }] });

  // These all arrive AFTER the cap is full — the OLD reconstruction-from-
  // getEvents() approach silently loses every one of them.
  c.push({ choices: [{ index: 0, delta: { reasoning_content: "step two." } }] });
  c.push({
    choices: [
      {
        index: 0,
        delta: {
          tool_calls: [
            {
              index: 0,
              id: "call_1",
              type: "function",
              function: { name: "Bash", arguments: '{"cmd":"date"}' },
            },
          ],
        },
      },
    ],
  });
  c.push({ choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }] });
  c.push({
    choices: [{ index: 0, delta: {} }],
    usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 },
  });

  // Sanity check: this test is only meaningful if truncation genuinely happened.
  const retained = c.getEvents();
  assert.equal(retained.length, 3, "expected the raw event array to be capped at maxEvents");

  // Characterize the pre-fix bug: reconstructing from the truncated retained
  // events (the old approach every call site in stream.ts used) misses
  // everything that arrived after the cap.
  const staleSummary = collector.buildStreamSummaryFromEvents(
    retained,
    "openai",
    "test-model"
  ) as OpenAIStreamSummary;
  assert.equal(staleSummary.choices[0].finish_reason, "stop");
  assert.equal(staleSummary.choices[0].message.tool_calls, undefined);
  assert.equal(staleSummary.choices[0].message.reasoning_content, "step one.");

  // The fix: getSummary() was fed every pushed chunk, truncated from storage
  // or not, so it reflects the true final state.
  const liveSummary = c.getSummary() as OpenAIStreamSummary;
  assert.equal(liveSummary.choices[0].finish_reason, "tool_calls");
  assert.equal(liveSummary.choices[0].message.tool_calls.length, 1);
  assert.equal(liveSummary.choices[0].message.tool_calls[0].function.name, "Bash");
  assert.equal(liveSummary.choices[0].message.tool_calls[0].function.arguments, '{"cmd":"date"}');
  assert.equal(liveSummary.choices[0].message.reasoning_content, "step one. step two.");
  assert.equal(liveSummary.usage.total_tokens, 30);
});

test("#9315: getSummary() returns undefined when no format was configured (unaffected client-response collector)", () => {
  const c = collector.createStructuredSSECollector({ maxEvents: 200 });
  c.push({ choices: [{ index: 0, delta: { content: "hi" } }] });
  assert.equal(c.getSummary(), undefined);
});
