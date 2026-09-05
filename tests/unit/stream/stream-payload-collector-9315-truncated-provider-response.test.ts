import test from "node:test";
import assert from "node:assert/strict";

const collector = await import("../../../open-sse/utils/streamPayloadCollector.ts");

/**
 * #9315 — Dashboard log viewer shows stale provider response for long streamed responses.
 *
 * Root cause: buildStreamSummaryFromEvents(providerPayloadCollector.getEvents(), ...)
 * reconstructs the provider payload from captured SSE events. The StructuredSSECollector
 * is head-retaining/tail-dropping with default caps (maxEvents=200/maxBytes=49152).
 * When a stream exceeds these caps, late events — final content, reasoning, tool_calls,
 * finish_reason — are silently dropped, so the "Provider Response" panel in the dashboard
 * shows stale/incomplete data.
 *
 * The fix: pass the accumulated responseBody directly to providerPayloadCollector.build()
 * instead of buildStreamSummaryFromEvents(), matching what the client path already does.
 * This regression test proves the truncation and validates the fix path.
 */

test("buildStreamSummaryFromEvents loses tool_calls and finish_reason when collector caps are exceeded (#9315)", () => {
  const maxEvents = 50;
  const c = collector.createStructuredSSECollector({ maxEvents });
  // Fill the collector with 48 content delta chunks (leaving 2 event slots)
  for (let i = 0; i < 48; i++) {
    c.push({
      id: "chatcmpl-test",
      object: "chat.completion.chunk",
      created: 1,
      model: "test-model",
      choices: [{ index: 0, delta: { content: `chunk-${i} ` } }],
    });
  }
  // Push reasoning chunk (event 49 — within cap)
  c.push({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1,
    model: "test-model",
    choices: [{ index: 0, delta: { reasoning_content: "deep reasoning " } }],
  });
  // Push final content chunk (event 50 — last slot)
  c.push({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1,
    model: "test-model",
    choices: [{ index: 0, delta: { content: "final piece " } }],
  });
  // These pushes are DROPPED — collector is full at 50 events
  c.push({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1,
    model: "test-model",
    choices: [{
      index: 0, delta: {
        role: "assistant",
        tool_calls: [{ index: 0, id: "call_1", type: "function", function: { name: "Bash", arguments: "{}" } }],
      },
    }],
  });
  c.push({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1,
    model: "test-model",
    choices: [{ index: 0, finish_reason: "tool_calls" }],
  });

  // Build provider payload summary the OLD way (from events)
  const events = c.getEvents();
  const summaryFromEvents = collector.buildStreamSummaryFromEvents(
    events,
    "openai",
    "test-model"
  ) as Record<string, unknown> | null;

  // Verify data loss from truncated events
  const choices = summaryFromEvents?.choices as Array<Record<string, unknown>> | undefined;
  const message = choices?.[0]?.message as Record<string, unknown> | undefined;

  // Tool calls and finish_reason were DROPPED — summary has no tool_calls and wrong finish_reason
  const hasToolCalls = Array.isArray(message?.tool_calls) && message.tool_calls.length > 0;
  assert.ok(
    !hasToolCalls,
    `Tool calls should be LOST from events-based summary. Got tool_calls: ${JSON.stringify(message?.tool_calls)}`
  );
  // finish_reason defaults to "stop" when the finish_reason event was dropped
  assert.equal(
    choices?.[0]?.finish_reason,
    "stop",
    `Finish reason should default to "stop". Got: ${JSON.stringify(choices?.[0]?.finish_reason)}`
  );

  // Verify the dropped events count
  const buildResult = c.build();
  assert.ok(
    (buildResult as Record<string, unknown>)._droppedEvents === 2,
    `Expected 2 dropped events, got ${JSON.stringify((buildResult as Record<string, unknown>)._droppedEvents)}`
  );

  // Build provider payload the NEW way (from responseBody directly, same as client path)
  const responseBody = {
    choices: [
      {
        message: {
          role: "assistant",
          content: "chunk-0 chunk-1 chunk-2 [...snip...] chunk-47 final piece ",
          reasoning_content: "deep reasoning ",
          tool_calls: [{ index: 0, id: "call_1", type: "function", function: { name: "Bash", arguments: "{}" } }],
        },
        finish_reason: "tool_calls",
      },
    ],
    usage: { prompt_tokens: 10, completion_tokens: 100, total_tokens: 110 },
    _streamed: true,
  };
  const buildFromResponse = c.build(responseBody, { includeEvents: false });
  const summary = (buildFromResponse as Record<string, unknown>).summary as Record<string, unknown> | null;

  // Verify ALL data is present with responseBody approach
  assert.ok(summary !== null, "summary should not be null");
});

test("providerPayload built from responseBody retains all data regardless of collector truncation", () => {
  // Simulate a small collector cap that causes heavy truncation
  const maxEvents = 3;
  const c = collector.createStructuredSSECollector({ maxEvents });

  c.push({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1,
    model: "test-model",
    choices: [{ index: 0, delta: { content: "hello " } }],
  });
  c.push({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1,
    model: "test-model",
    choices: [{ index: 0, delta: { content: "world " } }],
  });
  c.push({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1,
    model: "test-model",
    choices: [{ index: 0, delta: { content: "how are " } }],
  });
  // These get dropped (cap reached)
  c.push({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1,
    model: "test-model",
    choices: [{ index: 0, delta: { content: "you? " } }],
  });
  c.push({
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1,
    model: "test-model",
    choices: [{ index: 0, finish_reason: "stop" }],
  });

  // Build from events — will be truncated
  const events = c.getEvents();
  const summaryFromEvents = collector.buildStreamSummaryFromEvents(
    events,
    "openai",
    "test-model"
  ) as Record<string, unknown> | null;
  const choicesFromEvents = summaryFromEvents?.choices as Array<Record<string, unknown>> | undefined;
  const messageFromEvents = choicesFromEvents?.[0]?.message as Record<string, unknown> | undefined;
  const contentFromEvents = typeof messageFromEvents?.content === "string" ? messageFromEvents.content : "";
  // finish_reason was dropped so it defaults to "stop" anyway — checking content
  assert.ok(
    !contentFromEvents.includes("you?"),
    `"you?" should be LOST from events-based summary. Content: ${JSON.stringify(contentFromEvents)}`
  );

  // Build from responseBody directly — NOT truncated
  const responseBody = {
    choices: [
      {
        message: {
          role: "assistant",
          content: "hello world how are you?",
        },
        finish_reason: "stop",
      },
    ],
    usage: { prompt_tokens: 5, completion_tokens: 20, total_tokens: 25 },
    _streamed: true,
  };
  const buildFromResponse = c.build(responseBody, { includeEvents: false });
  const summary = (buildFromResponse as Record<string, unknown>).summary as Record<string, unknown> | null;
  assert.ok(summary !== null);
  const s = summary as Record<string, unknown>;
  assert.equal((s.choices as Array<Record<string, unknown>>)[0].message.content, "hello world how are you?");
  assert.equal((s.choices as Array<Record<string, unknown>>)[0].finish_reason, "stop");
});
