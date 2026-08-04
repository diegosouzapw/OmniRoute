import test from "node:test";
import assert from "node:assert/strict";

// Regression guard for the Responses-API streaming-protocol bug where native
// reasoning (`delta.reasoning_content`, no <think> tags) opened a reasoning
// item that was never closed before the message content, and the message
// reused the reasoning item's output_index — producing a protocol-invalid
// stream. After the fix, reasoning is closed at the top of the content/
// tool_calls handlers and the message is routed to `reasoningIndex + 1`.

const { createResponsesApiTransformStream } = await import(
  "../../open-sse/transformer/responsesTransformer.ts"
);
const { openaiToOpenAIResponsesResponse } = await import(
  "../../open-sse/translator/response/openai-responses.ts"
);
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function runTransformStream(chunks) {
  const stream = createResponsesApiTransformStream(null);
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();

  const output = [];
  const readerTask = (async () => {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      output.push(decoder.decode(value));
    }
  })();

  for (const chunk of chunks) {
    await writer.write(encoder.encode(chunk));
  }
  await writer.close();
  await readerTask;

  return output.join("");
}

function parseSseOutput(output) {
  return output
    .trim()
    .split("\n\n")
    .map((entry) => {
      const lines = entry.split("\n");
      const eventLine = lines.find((line) => line.startsWith("event: "));
      const dataLine = lines.find((line) => line.startsWith("data: "));
      return {
        event: eventLine ? eventLine.slice("event: ".length) : null,
        data: dataLine ? dataLine.slice("data: ".length) : null,
      };
    });
}

test("transformer: native reasoning is closed before message content and uses a distinct output_index", async () => {
  const output = await runTransformStream([
    'data: {"id":"chatcmpl_1","choices":[{"index":0,"delta":{"reasoning_content":"thinking"}}]}\n\n',
    'data: {"choices":[{"index":0,"delta":{"content":"answer"}}]}\n\n',
    'data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n',
  ]);

  const events = parseSseOutput(output).map((e) => {
    let data = null;
    if (e.data && e.data !== "[DONE]") {
      try {
        data = JSON.parse(e.data);
      } catch {
        data = null;
      }
    }
    return { event: e.event, data };
  });

  // The reasoning item must be closed (output_item.done with a reasoning item)
  // BEFORE the first message output_item.added is emitted.
  const reasoningDoneIdx = events.findIndex(
    (e) => e.event === "response.output_item.done" && e.data?.item?.type === "reasoning"
  );
  const messageAddedIdx = events.findIndex(
    (e) => e.event === "response.output_item.added" && e.data?.item?.type === "message"
  );

  assert.ok(reasoningDoneIdx >= 0, "reasoning item must be closed");
  assert.ok(messageAddedIdx >= 0, "message item must be added");
  assert.ok(
    reasoningDoneIdx < messageAddedIdx,
    "reasoning must be closed before message content begins"
  );

  // Reasoning lives at output_index 0; the message must NOT reuse it.
  const reasoningIndex = events.find(
    (e) => e.event === "response.output_item.added" && e.data?.item?.type === "reasoning"
  ).data.output_index;
  const messageIndex = events[messageAddedIdx].data.output_index;

  assert.equal(reasoningIndex, 0);
  assert.equal(messageIndex, reasoningIndex + 1);

  // The completed snapshot should carry both items at distinct indices.
  const completed = events.find((e) => e.event === "response.completed").data.response;
  assert.equal(completed.output[0].type, "reasoning");
  assert.equal(completed.output[1].type, "message");
  assert.equal(completed.output[1].content[0].text, "answer");
});

test("translator: native reasoning is closed before message content and uses a distinct output_index", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  const events = [];
  const chunks = [
    {
      id: "chatcmpl-1",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { reasoning_content: "thinking" }, finish_reason: null }],
    },
    {
      id: "chatcmpl-1",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "answer" }, finish_reason: null }],
    },
    {
      id: "chatcmpl-1",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    },
  ];
  for (const chunk of chunks) {
    const result = openaiToOpenAIResponsesResponse(chunk, state);
    if (result) events.push(...result);
  }

  const reasoningDoneIdx = events.findIndex(
    (e) => e.event === "response.output_item.done" && e.data?.item?.type === "reasoning"
  );
  const messageAddedIdx = events.findIndex(
    (e) => e.event === "response.output_item.added" && e.data?.item?.type === "message"
  );

  assert.ok(reasoningDoneIdx >= 0, "reasoning item must be closed");
  assert.ok(messageAddedIdx >= 0, "message item must be added");
  assert.ok(
    reasoningDoneIdx < messageAddedIdx,
    "reasoning must be closed before message content begins"
  );

  const reasoningIndex = events.find(
    (e) => e.event === "response.output_item.added" && e.data?.item?.type === "reasoning"
  ).data.output_index;
  const messageIndex = events[messageAddedIdx].data.output_index;

  assert.equal(reasoningIndex, 0);
  assert.equal(messageIndex, reasoningIndex + 1);
});
