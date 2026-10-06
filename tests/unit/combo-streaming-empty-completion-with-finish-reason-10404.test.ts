import test from "node:test";
import assert from "node:assert/strict";

const { validateResponseQuality } = await import("../../open-sse/services/combo.ts");

const encoder = new TextEncoder();
const silentLog = { warn: () => {} };

function sseStream(body: string): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(body));
      controller.close();
    },
  });
}

function makeEmptyButTerminatedOpenAiStream(): Response {
  const chunks = [
    JSON.stringify({
      id: "chatcmpl-10404",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
    }),
    JSON.stringify({
      id: "chatcmpl-10404",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 56447, completion_tokens: 0, total_tokens: 56447 },
    }),
  ];
  const body = chunks.map((c) => `data: ${c}\n\n`).join("") + "data: [DONE]\n\n";
  return new Response(sseStream(body), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

function makeToolCallsOnlyOpenAiStream(): Response {
  const chunks = [
    JSON.stringify({
      id: "chatcmpl-10404-tool",
      object: "chat.completion.chunk",
      choices: [
        {
          index: 0,
          delta: {
            role: "assistant",
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                type: "function",
                function: { name: "get_weather", arguments: "" },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    }),
    JSON.stringify({
      id: "chatcmpl-10404-tool",
      object: "chat.completion.chunk",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [{ index: 0, function: { arguments: '{"city":"SF"}' } }],
          },
          finish_reason: null,
        },
      ],
    }),
    JSON.stringify({
      id: "chatcmpl-10404-tool",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
      usage: { prompt_tokens: 100, completion_tokens: 12, total_tokens: 112 },
    }),
  ];
  const body = chunks.map((c) => `data: ${c}\n\n`).join("") + "data: [DONE]\n\n";
  return new Response(sseStream(body), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

test("#10404: OpenAI-shape stream that reaches finish_reason:stop with zero content/tool_calls/reasoning should fail over, not pass as valid", async () => {
  const res = makeEmptyButTerminatedOpenAiStream();
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(
    out.valid,
    false,
    "expected failover (valid:false) for a terminated-but-empty streaming completion"
  );
});

test("#10404 no-regression: OpenAI-shape stream carrying only tool_calls deltas + finish_reason:tool_calls must still pass as valid", async () => {
  const res = makeToolCallsOnlyOpenAiStream();
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true, "tool_calls-only streams must not be treated as empty");
});
