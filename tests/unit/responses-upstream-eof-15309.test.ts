import assert from "node:assert/strict";
import test from "node:test";

import { openaiToOpenAIResponsesResponse as translate } from "../../open-sse/translator/response/openai-responses.ts";
import { initState } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import {
  createDisconnectAwareStream,
  createStreamController,
} from "../../open-sse/utils/streamHandler.ts";
import { createSSEStream } from "../../open-sse/utils/stream.ts";

function chunk(delta: Record<string, unknown>, finishReason: string | null = null) {
  return {
    id: "synthetic-eof-probe",
    created: 1,
    model: "test-model",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  };
}

for (const [channel, delta] of Object.entries({
  reasoning: { reasoning_content: "Unfinished reasoning" },
  text: { content: "Partial answer" },
  tool: {
    tool_calls: [
      {
        index: 0,
        id: "call_probe",
        type: "function",
        function: { name: "read", arguments: '{"path":' },
      },
    ],
  },
})) {
  test(`#15309: ${channel} followed by EOF fails instead of completing`, () => {
    const state = initState(FORMATS.OPENAI_RESPONSES);
    const streamed = translate(chunk(delta), state);
    const flushed = translate(null, state);
    assert.ok(streamed.length > 0);
    assert.equal(state.finishReason ?? null, null);
    assert.ok(!flushed.some((event) => event.event === "response.completed"));
    const failed = flushed.find((event) => event.event === "response.failed");
    assert.ok(failed);
    assert.equal(failed.data.response.status, "failed");
    assert.equal(state.upstreamError.code, "stream_early_eof");
    assert.equal(failed.data.response.error.code, "502");
    assert.match(failed.data.response.error.message, /terminal marker/);
    assert.ok(failed.data.response.output.length > 0);
    assert.deepEqual(translate(null, state), [], "flush must be idempotent");
  });
}

for (const finishReason of ["stop", "tool_calls", "length", "content_filter"]) {
  test(`#15309: explicit ${finishReason} survives EOF without trailing usage`, () => {
    const state = initState(FORMATS.OPENAI_RESPONSES);
    translate(chunk({ content: "Answer" }), state);
    translate(chunk({}, finishReason), state);
    const events = translate(null, state);
    const incomplete = finishReason === "length" || finishReason === "content_filter";
    const terminal = events.find(
      (event) => event.event === (incomplete ? "response.incomplete" : "response.completed")
    );
    assert.ok(terminal);
    assert.equal(terminal.data.response.status, incomplete ? "incomplete" : "completed");
    assert.equal(state.upstreamError, undefined);
  });
}

test("#15309: usage without a finish reason is not a successful terminal", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  translate(chunk({ reasoning_content: "Partial" }), state);
  translate({ choices: [], usage: { prompt_tokens: 10, completion_tokens: 2 } }, state);
  const failed = translate(null, state).find((event) => event.event === "response.failed");
  assert.ok(failed);
  assert.equal(failed.data.response.usage.output_tokens, 2);
});

test("#15309: an explicit upstream error keeps its cause and uses a failure terminal", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  translate(chunk({ content: "Partial" }), state);
  translate({ choices: [], error: { code: 429, message: "Rate limited" } }, state);
  const failed = translate(null, state).find((event) => event.event === "response.failed");
  assert.ok(failed);
  assert.equal(state.upstreamError.status, 429);
  assert.equal(state.upstreamError.code, "rate_limit_exceeded");
  assert.equal(failed.data.response.error.code, "429");
});

test("#15309: translated EOF invokes failure callbacks and records failed completion", async () => {
  const failures: Record<string, unknown>[] = [];
  const completions: Record<string, unknown>[] = [];
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        new TextEncoder().encode(
          `data: ${JSON.stringify(chunk({ reasoning_content: "Partial" }))}\n\n`
        )
      );
      controller.close();
    },
  });
  const response = new Response(
    source.pipeThrough(
      createSSEStream({
        mode: "translate",
        targetFormat: FORMATS.OPENAI,
        sourceFormat: FORMATS.OPENAI_RESPONSES,
        provider: "test-provider",
        model: "test-model",
        body: { messages: [{ role: "user", content: "Test" }] },
        onFailure: (failure: Record<string, unknown>) => {
          failures.push(failure);
        },
        onComplete: (completion: Record<string, unknown>) => {
          completions.push(completion);
        },
      })
    )
  );
  const wire = await response.text();
  assert.match(wire, /response\.failed/);
  assert.match(wire, /terminal marker/);
  assert.doesNotMatch(wire, /response\.completed/);
  assert.equal(failures.length, 1);
  assert.equal(failures[0].status, 502);
  assert.equal(failures[0].code, "stream_early_eof");
  assert.equal(completions.length, 1);
  assert.equal(completions[0].status, 502);
  assert.equal(completions[0].errorCode, "stream_early_eof");
  assert.equal(completions[0].interrupted, true);
});

test("#15309: Responses client receives partial reasoning and an in-band failure", async () => {
  const transform = createSSEStream({
    mode: "translate",
    targetFormat: FORMATS.OPENAI,
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    provider: "test-provider",
    model: "test-model",
    body: { messages: [{ role: "user", content: "Test" }] },
  });
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        new TextEncoder().encode(
          `data: ${JSON.stringify(chunk({ reasoning_content: "Partial reasoning" }))}\n\n`
        )
      );
      controller.close();
    },
  });
  const stream = createDisconnectAwareStream(
    {
      readable: source.pipeThrough(transform),
      writable: { getWriter: () => ({ abort: () => Promise.resolve() }) },
    },
    createStreamController({ clientResponseFormat: FORMATS.OPENAI_RESPONSES })
  );
  const wire = await new Response(stream).text();
  assert.match(wire, /Partial reasoning/);
  assert.match(wire, /response\.failed/);
  assert.match(wire, /terminal marker/);
  assert.doesNotMatch(wire, /response\.completed/);
});
