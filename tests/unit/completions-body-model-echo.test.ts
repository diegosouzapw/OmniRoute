import test from "node:test";
import assert from "node:assert/strict";

import {
  toTextCompletionObject,
  transformSseData,
  createTextCompletionStreamTransformer,
  asTextCompletionResponse,
} from "../../src/app/api/v1/completions/textCompletionTransform.ts";

// Regression: `/v1/completions` response `body.model` must echo the caller's
// requested model identifier (matching the `x-omniroute-model` response
// header). Legacy OpenAI Completions clients (e.g. TabbyML) pin cache keys
// and observability to the requested model — an upstream-provider string like
// `deepseek-v4.1-flash-preview` in place of the requested `ds/deepseek-v4-flash`
// breaks caching, budgeting, and dashboards.

test("body.model echoes requestedModel (non-stream, JSON)", () => {
  const out = toTextCompletionObject(
    {
      id: "chatcmpl-1",
      object: "chat.completion",
      created: 1,
      model: "deepseek-v4.1-flash-preview", // upstream provider's post-routing string
      choices: [{ index: 0, message: { content: "hi" }, finish_reason: "stop" }],
    },
    "ds/deepseek-v4-flash" // what the caller asked for
  );
  assert.equal(out.model, "ds/deepseek-v4-flash");
  assert.equal(out.object, "text_completion");
});

test("body.model falls back to upstream model when requestedModel omitted", () => {
  const out = toTextCompletionObject({
    id: "chatcmpl-2",
    object: "chat.completion",
    created: 2,
    model: "deepseek-v4.1-flash-preview",
    choices: [{ index: 0, message: { content: "hi" }, finish_reason: "stop" }],
  });
  assert.equal(out.model, "deepseek-v4.1-flash-preview"); // backward-compat
});

test("transformSseData rewrites SSE chunk model when requestedModel given", () => {
  const rewritten = JSON.parse(
    transformSseData(
      '{"object":"chat.completion.chunk","model":"gpt-5.5-turbo-2026-01","choices":[{"delta":{"content":"X"}}]}',
      "gpt-5.5"
    )
  );
  assert.equal(rewritten.object, "text_completion");
  assert.equal(rewritten.model, "gpt-5.5");
});

test("streaming transformer rewrites every chunk's model to requestedModel", async () => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const chatSse =
    'data: {"object":"chat.completion.chunk","model":"upstream-inner-1","choices":[{"delta":{"content":"Hi"},"finish_reason":null}]}\n\n' +
    'data: {"object":"chat.completion.chunk","model":"upstream-inner-2","choices":[{"delta":{"content":"!"},"finish_reason":"stop"}]}\n\n' +
    "data: [DONE]\n\n";

  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(chatSse));
      controller.close();
    },
  });

  const out = source.pipeThrough(createTextCompletionStreamTransformer("caller/requested"));
  const reader = out.getReader();
  const chunks: string[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(decoder.decode(value));
  }
  const text = chunks.join("");
  const dataLines = text.split("\n").filter((l) => l.startsWith("data:") && !l.includes("[DONE]"));
  assert.equal(dataLines.length, 2);
  for (const line of dataLines) {
    const parsed = JSON.parse(line.slice("data:".length).trim());
    assert.equal(parsed.object, "text_completion");
    assert.equal(parsed.model, "caller/requested");
  }
  // sanity: upstream ids replaced
  assert.equal(text.includes("upstream-inner-1"), false);
  assert.equal(text.includes("upstream-inner-2"), false);
});

test("asTextCompletionResponse (JSON path) rewrites body.model", async () => {
  const upstream = new Response(
    JSON.stringify({
      id: "chatcmpl-3",
      object: "chat.completion",
      created: 3,
      model: "upstream-real-provider-id",
      choices: [{ index: 0, message: { content: "ok" }, finish_reason: "stop" }],
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
  const wrapped = await asTextCompletionResponse(upstream, "caller/asked-for");
  const body = await wrapped.json();
  assert.equal(body.object, "text_completion");
  assert.equal(body.model, "caller/asked-for");
});
