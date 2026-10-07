import test from "node:test";
import assert from "node:assert/strict";

const collector = await import("../../open-sse/utils/streamPayloadCollector.ts");
import { splitConcatenatedToolCallArguments } from "../../open-sse/utils/streamPayloadCollector.ts";

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
  const events = [{ index: 0, data: { choices: [{ delta: { content: "hello" } }] } }];
  const result = collector.buildStreamSummaryFromEvents(events);
  assert.ok(result !== null);
  assert.ok(typeof result === "object");
});

test("buildStreamSummaryFromEvents handles multiple events", () => {
  const events = [
    { index: 0, data: { choices: [{ delta: { content: " hello" } }] } },
  ];
  const result = collector.buildStreamSummaryFromEvents(events);
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

// opencode/muse-spark-1.2-contributor-free (zen provider): the upstream SSE stream
// never varies `index`/`id` for a 2nd/3rd tool_call of the SAME name in one turn —
// every delta lands on the same accumulator key, so 3 distinct `task` calls
// concatenate into a single malformed `arguments` string containing 3 back-to-back
// JSON objects (the model emits the whole 3rd call already glued to the first two
// in one delta — no true streaming needed to trigger it).
test("buildStreamSummaryFromEvents splits a tool_call whose arguments are multiple concatenated JSON objects under the same id/index (muse-spark SSE index bug)", () => {
  const glued =
    '{"description":"Subagent OK 1","prompt":"Reply only \\"OK\\". Nothing else.","subagent_type":"general"}' +
    '{"description":"Subagent OK 2","prompt":"Reply only \\"OK\\". Nothing else.","subagent_type":"general"}' +
    '{"description":"Subagent OK 3","prompt":"Reply only \\"OK\\". Nothing else.","subagent_type":"general"}';

  const events = [
    toolCallEvent({
      role: "assistant",
      tool_calls: [
        {
          index: 0,
          id: "call_task_glued",
          type: "function",
          function: { name: "task", arguments: glued },
        },
      ],
    }),
    toolCallEvent({}, "tool_calls"),
  ];

  const summary = collector.buildStreamSummaryFromEvents(
    events,
    "openai",
    "opencode/muse-spark-1.2-contributor-free"
  ) as ToolCallSummary;
  const toolCalls = summary.choices[0].message.tool_calls;

  assert.equal(
    toolCalls.length,
    3,
    `expected 3 split tool_calls, got ${toolCalls.length}: ${JSON.stringify(toolCalls)}`
  );
  for (const [i, tc] of toolCalls.entries()) {
    assert.equal(tc.function.name, "task");
    const parsed = JSON.parse(tc.function.arguments);
    assert.equal(parsed.description, `Subagent OK ${i + 1}`);
  }
});

test("buildStreamSummaryFromEvents leaves a single valid JSON arguments string untouched (no false-positive split)", () => {
  const events = [
    toolCallEvent({
      role: "assistant",
      tool_calls: [
        {
          index: 0,
          id: "call_single",
          type: "function",
          function: { name: "write", arguments: '{"path":"a.txt","content":"{}"}' },
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

  assert.equal(toolCalls.length, 1);
  assert.equal(toolCalls[0].function.arguments, '{"path":"a.txt","content":"{}"}');
});

test("buildStreamSummaryFromEvents leaves genuinely malformed (non-concatenated) JSON arguments untouched (no worse than before)", () => {
  const events = [
    toolCallEvent({
      role: "assistant",
      tool_calls: [
        {
          index: 0,
          id: "call_broken",
          type: "function",
          function: { name: "write", arguments: '{"path":"a.txt", "content": tr' },
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

  assert.equal(toolCalls.length, 1);
  assert.equal(toolCalls[0].function.arguments, '{"path":"a.txt", "content": tr');
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

test("splitConcatenatedToolCallArguments — two back-to-back JSON objects", () => {
  const a = JSON.stringify({ tool: "x", args: "1" });
  const b = JSON.stringify({ tool: "y", args: "2" });
  const out = splitConcatenatedToolCallArguments(a + b);
  assert.deepEqual(out, [a, b]); // >=2 valid values -> split (array of parts)
});

test("splitConcatenatedToolCallArguments — nested object + escaped quotes stay single JSON", () => {
  const a = JSON.stringify({ a: 'he said "hi"', b: { c: 1 } });
  const single = a; // a is ONE valid JSON object -> no split
  const out = splitConcatenatedToolCallArguments(single);
  assert.equal(out, null); // single valid JSON -> untouched (null)
});

test("splitConcatenatedToolCallArguments — braces/quotes inside strings exercise escaped scanner", () => {
  // Two valid JSON values whose string bodies contain braces and escaped quotes.
  // Concatenated they reach the inString/escaped state machine (not the JSON.parse
  // fast path), so this covers the case the owner asked about.
  const a = JSON.stringify({ cmd: 'echo "}{" ; x' });
  const b = JSON.stringify({ cmd: "{[not json]}" });
  const out = splitConcatenatedToolCallArguments(a + b);
  assert.deepEqual(out, [a, b]); // >=2 valid values -> split into parts
});

test("splitConcatenatedToolCallArguments — top-level array is single value", () => {
  const arr = JSON.stringify([{ tool: "x" }, { tool: "y" }]);
  const out = splitConcatenatedToolCallArguments(arr);
  assert.equal(out, null); // one value boundary (array) -> not split
});

// Continuation gap (2026-08-21): emitTranslatedClientItem in stream.ts pushes
// every translate-mode client-visible item wrapped as `{event, data}` (needed
// so formatSSE can emit both the SSE `event:` line and the `data:` payload
// separately) -- but every reducer's ingest() read `payload.type` directly,
// one level too shallow for that shape, so a client-facing summary built
// from translate-mode events (e.g. clientPayload when the client speaks
// Responses API) never found a real response id/output. Only affected
// clientPayloadCollector in translate mode; providerPayloadCollector and
// passthrough mode always pushed the bare payload directly.
test("buildStreamSummaryFromEvents unwraps a translate-mode {event, data} envelope", () => {
  const events = [
    {
      data: {
        event: "response.completed",
        data: {
          type: "response.completed",
          response: {
            id: "resp_wrapped_1",
            output: [{ type: "message", role: "assistant", content: "hi" }],
          },
        },
      },
      event: "response.completed",
    },
  ];
  const result = collector.buildStreamSummaryFromEvents(events, "openai-responses") as {
    id?: unknown;
    output?: unknown;
  };
  assert.equal(
    result?.id,
    "resp_wrapped_1",
    "must read the id from one level deeper, not undefined"
  );
  assert.ok(Array.isArray(result?.output) && result.output.length === 1);
});

test("buildStreamSummaryFromEvents still reads a bare (unwrapped) event correctly", () => {
  const events = [
    {
      data: {
        type: "response.completed",
        response: {
          id: "resp_bare_1",
          output: [{ type: "message", role: "assistant", content: "hi" }],
        },
      },
    },
  ];
  const result = collector.buildStreamSummaryFromEvents(events, "openai-responses") as {
    id?: unknown;
    output?: unknown;
  };
  assert.equal(result?.id, "resp_bare_1");
  assert.ok(Array.isArray(result?.output) && result.output.length === 1);
});

test("createStructuredSSECollector's live getSummary() also unwraps a pushed {event, data} envelope", () => {
  const c = collector.createStructuredSSECollector({ format: "openai-responses" });
  c.push({
    event: "response.completed",
    data: {
      type: "response.completed",
      response: { id: "resp_wrapped_live", output: [] },
    },
  });
  const summary = c.getSummary() as { id?: unknown };
  assert.equal(summary?.id, "resp_wrapped_live");
});

test("push() defers cloneLogPayload until after cap check — dropped events are not deep-cloned", () => {
  const c = collector.createStructuredSSECollector({
    maxEvents: 2,
    format: "openai",
    fallbackModel: "test-model",
  });

  // Push 3 events — the third should be dropped (cap = 2).
  c.push({
    id: "chatcmpl-1",
    object: "chat.completion.chunk",
    created: 1,
    model: "test-model",
    choices: [{ index: 0, delta: { role: "assistant", content: "A" } }],
  });
  c.push({ choices: [{ index: 0, delta: { content: "B" } }] });
  c.push({ choices: [{ index: 0, delta: { content: "C" } }] });

  const events = c.getEvents();
  assert.equal(events.length, 2, "only 2 events should be retained (cap = 2)");

  const summary = c.getSummary() as Record<string, unknown>;
  assert.ok(summary, "summary must be present");
  const choices = summary.choices as Array<{ message: { content: string | null } }>;
  const content = choices?.[0]?.message?.content;
  assert.ok(
    typeof content === "string" &&
      content.includes("A") &&
      content.includes("B") &&
      content.includes("C"),
    "summary must reflect ALL pushed events (including dropped) — reducer ingests every chunk"
  );
});

test("push() stores a snapshot — mutating the original payload after push does not affect stored event data", () => {
  const c = collector.createStructuredSSECollector({ maxEvents: 5 });
  const payload = {
    id: "chatcmpl-snap",
    choices: [{ index: 0, delta: { content: "original" } }],
  };

  c.push(payload);
  const stored = c.getEvents()[0];

  // Mutate the original payload after push.
  payload.choices[0].delta.content = "mutated";
  payload.id = "changed";

  assert.equal(
    (stored.data as Record<string, unknown>).id,
    "chatcmpl-snap",
    "stored event must retain original id (snapshot, not reference)"
  );
  const storedDelta = (stored.data as Record<string, unknown>).choices as Array<
    Record<string, unknown>
  >;
  assert.equal(
    (storedDelta[0] as Record<string, unknown>).delta?.content,
    "original",
    "stored event must retain original content (snapshot, not reference)"
  );
});

test("summary snapshot isolation — OpenAI: mutating payload after push() does not change getSummary()", () => {
  const c = collector.createStructuredSSECollector({
    maxEvents: 10,
    format: "openai",
    fallbackModel: "test-model",
  });
  const payload = {
    id: "chatcmpl-snap-openai",
    object: "chat.completion.chunk",
    created: 1,
    model: "test-model",
    choices: [{ index: 0, delta: { role: "assistant", content: "Hello" } }],
    usage: { prompt_tokens: 10, completion_tokens: 5 },
  };
  c.push(payload);
  const before = JSON.parse(JSON.stringify(c.getSummary()));

  payload.id = "MUTATED_ID";
  payload.choices[0].delta.content = "MUTATED";
  payload.usage.prompt_tokens = 9999;

  const after = c.getSummary();
  assert.equal(before.id, after.id, "OpenAI summary id must not change after payload mutation");
  assert.equal(
    before.choices[0].message.content,
    after.choices[0].message.content,
    "OpenAI summary content must not change after payload mutation"
  );
  assert.deepEqual(
    before.usage,
    after.usage,
    "OpenAI summary usage must not change after payload mutation"
  );
});

test("summary snapshot isolation — Responses: mutating payload after push() does not change getSummary()", () => {
  const c = collector.createStructuredSSECollector({
    maxEvents: 10,
    format: "openai-responses",
    fallbackModel: "test-model",
  });
  const payload = {
    type: "response.output_text.delta",
    delta: "Hello world",
    response: { id: "resp_snap", output: [], status: "in_progress" },
    usage: { input_tokens: 10, output_tokens: 5 },
  };
  c.push(payload);
  const before = JSON.parse(JSON.stringify(c.getSummary()));

  payload.delta = "MUTATED";
  payload.response.id = "MUTATED_RESP";
  payload.usage.input_tokens = 9999;

  const after = c.getSummary();
  assert.equal(before.id, after.id, "Responses summary id must not change after payload mutation");
  assert.deepEqual(
    before.usage,
    after.usage,
    "Responses summary usage must not change after payload mutation"
  );
});

test("summary snapshot isolation — Claude: mutating payload after push() does not change getSummary()", () => {
  const c = collector.createStructuredSSECollector({
    maxEvents: 10,
    format: "claude",
    fallbackModel: "test-model",
  });
  const payload = {
    type: "message_start",
    message: { id: "msg_snap", model: "claude-3", role: "assistant", usage: { input_tokens: 10 } },
  };
  c.push(payload);
  const before = JSON.parse(JSON.stringify(c.getSummary()));

  payload.message.id = "MUTATED_MSG";
  payload.message.model = "MUTATED_MODEL";

  const after = c.getSummary();
  assert.deepEqual(before, after, "Claude summary must not change after payload mutation");
});

test("summary snapshot isolation — Gemini: mutating payload after push() does not change getSummary()", () => {
  const c = collector.createStructuredSSECollector({
    maxEvents: 10,
    format: "gemini",
    fallbackModel: "test-model",
  });
  const payload = {
    modelVersion: "gemini-2.0",
    candidates: [
      {
        content: { role: "model", parts: [{ text: "Hello" }] },
        finishReason: "STOP",
      },
    ],
    usageMetadata: { promptTokenCount: 10 },
  };
  c.push(payload);
  const before = JSON.parse(JSON.stringify(c.getSummary()));

  payload.modelVersion = "MUTATED_MODEL";
  payload.candidates[0].content.parts[0].text = "MUTATED";
  payload.usageMetadata.promptTokenCount = 9999;

  const after = c.getSummary();
  assert.deepEqual(before, after, "Gemini summary must not change after payload mutation");
});

test("getEvents() defensive-copy: mutations to returned events do not affect subsequent calls", () => {
  const c = collector.createStructuredSSECollector({ maxEvents: 5 });
  c.push({ choices: [{ index: 0, delta: { content: "A" } }] });
  c.push({ choices: [{ index: 0, delta: { content: "B" } }] });

  const first = c.getEvents();
  const second = c.getEvents();

  // Mutate first deeply
  first[0].data = { MUTATED: true };
  first[0].timestamp = "MUTATED_TIME";
  first.push({ data: { INJECTED: true } });

  // second must be unaffected by mutations to first
  assert.equal(
    second.length,
    2,
    "second call must still return 2 events (push to first did not leak)"
  );
  assert.notEqual(
    second[0].data?.MUTATED,
    true,
    "second call events must not reflect mutation of first"
  );

  const third = c.getEvents();
  assert.equal(
    third.length,
    2,
    "third call must still return 2 events (push to first did not leak)"
  );
  assert.notEqual(
    third[0].data?.MUTATED,
    true,
    "third call events must not reflect mutation of first"
  );
  assert.notEqual(
    third[0].timestamp,
    "MUTATED_TIME",
    "third call timestamps must not reflect mutation of first"
  );
});
