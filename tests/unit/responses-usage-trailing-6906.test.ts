// Regression guard for #6906: response.completed must carry usage even when
// the upstream sends a trailing usage-only chunk AFTER the finish_reason chunk
// (the real-world OpenAI-compatible `stream_options.include_usage: true` order).
import test from "node:test";
import assert from "node:assert/strict";

import { openaiToOpenAIResponsesResponse } from "../../open-sse/translator/response/openai-responses.ts";
import { initState } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { createResponsesApiTransformStream } from "../../open-sse/transformer/responsesTransformer.ts";

function collectLiveTranslatorEvents(chunks) {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  const events = [];
  for (const chunk of chunks) {
    const result = openaiToOpenAIResponsesResponse(chunk, state);
    if (result) events.push(...result);
  }
  return events;
}

test("BUG #6906: live translator — response.completed carries usage when the usage-only chunk arrives AFTER finish_reason", () => {
  const events = collectLiveTranslatorEvents([
    {
      id: "chatcmpl-1",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "Hello" }, finish_reason: null }],
    },
    // finish_reason chunk arrives BEFORE the usage-only chunk (real-world order)
    {
      id: "chatcmpl-1",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: null,
    },
    // trailing usage-only chunk per stream_options.include_usage=true semantics
    {
      id: "chatcmpl-1",
      model: "gpt-4.1",
      choices: [],
      usage: { prompt_tokens: 2249, completion_tokens: 123, total_tokens: 2372 },
    },
  ]);

  const completedEvent = events.find((event) => event.event === "response.completed");
  assert.ok(completedEvent, "response.completed event should be emitted");
  assert.deepEqual(
    completedEvent.data.response.usage,
    { input_tokens: 2249, output_tokens: 123, total_tokens: 2372 },
    "response.completed must carry usage even when the usage-only chunk trails finish_reason"
  );
});

test("BUG #6906 (flush fallback): live translator still emits response.completed on stream end when no trailing usage chunk ever arrives", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  const events = [];
  const chunks = [
    {
      id: "chatcmpl-2",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "Hi" }, finish_reason: null }],
    },
    {
      id: "chatcmpl-2",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    },
  ];
  for (const chunk of chunks) {
    const result = openaiToOpenAIResponsesResponse(chunk, state);
    if (result) events.push(...result);
  }
  // stream end (flush)
  const flushed = openaiToOpenAIResponsesResponse(null, state);
  if (flushed) events.push(...flushed);

  const completedEvent = events.find((event) => event.event === "response.completed");
  assert.ok(completedEvent, "response.completed event should be emitted on flush");
});

test("BUG #6906: legacy transformer — response.completed carries usage when the usage-only chunk arrives AFTER finish_reason", async () => {
  const chunks = [
    {
      id: "chatcmpl-3",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "Hello" }, finish_reason: null }],
    },
    {
      id: "chatcmpl-3",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: null,
    },
    {
      id: "chatcmpl-3",
      model: "gpt-4.1",
      choices: [],
      usage: { prompt_tokens: 55, completion_tokens: 11, total_tokens: 66 },
    },
  ];

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const readable = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  const transformed = readable.pipeThrough(createResponsesApiTransformStream(null, 60000));
  const reader = transformed.getReader();
  let full = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    full += decoder.decode(value, { stream: true });
  }

  // Events are emitted as `event: <type>\ndata: <json>\n\n` blocks.
  const blocks = full.split("\n\n").filter((block) => block.includes("event: response.completed"));
  assert.ok(blocks.length > 0, "response.completed event should be emitted");
  const dataLine = blocks[0].split("\n").find((line) => line.startsWith("data:"));
  const payload = JSON.parse(dataLine.replace(/^data:\s*/, ""));
  assert.deepEqual(
    payload.response.usage,
    { prompt_tokens: 55, completion_tokens: 11, total_tokens: 66 },
    "legacy transformer response.completed must carry usage even when the usage-only chunk trails finish_reason"
  );
});
