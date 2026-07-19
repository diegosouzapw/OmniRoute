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

// OpenAI-shape stream: single role-only delta chunk, then the connection
// closes. No finish_reason anywhere, no `data: [DONE]` sentinel.
function makeTruncatedOpenAiStream(): Response {
  const body =
    `data: ${JSON.stringify({
      id: "chatcmpl-test-truncated",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
    })}\n\n`;
  return new Response(sseStream(body), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

// Healthy OpenAI-shape stream: content delta + a chunk carrying
// finish_reason: "stop" — must keep passing through (#3399/#3685 contract).
function makeHealthyOpenAiStream(): Response {
  const chunks = [
    JSON.stringify({
      id: "chatcmpl-test-healthy",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: { role: "assistant", content: "Hello" }, finish_reason: null }],
    }),
    JSON.stringify({
      id: "chatcmpl-test-healthy",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    }),
  ];
  const body = chunks.map((c) => `data: ${c}\n\n`).join("") + "data: [DONE]\n\n";
  return new Response(sseStream(body), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

test("#7285 RED: OpenAI-shape stream with role-only delta and NO finish_reason should fail over but currently passes as valid", async () => {
  const res = makeTruncatedOpenAiStream();
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, false, "expected failover (valid:false)");
});

test("#7285 control: a healthy OpenAI stream ending with finish_reason still passes through (#3399/#3685 no-regression)", async () => {
  const res = makeHealthyOpenAiStream();
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true, "expected valid:true for a properly terminated stream");
});
