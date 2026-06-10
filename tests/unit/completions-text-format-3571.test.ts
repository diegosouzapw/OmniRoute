import test from "node:test";
import assert from "node:assert/strict";

import {
  toTextCompletionObject,
  transformSseData,
  createTextCompletionStreamTransformer,
} from "../../src/app/api/v1/completions/textCompletionTransform.ts";

// #3571 — /v1/completions (legacy OpenAI Completions API) must return
// `object: "text_completion"` with `choices[].text`, not the chat shape
// (`chat.completion(.chunk)` with `choices[].message|delta.content`), which crashes
// TabbyML's `openai/completion` backend ("missing field `text`").

test("#3571 non-stream: chat.completion → text_completion with choices[].text", () => {
  const out = toTextCompletionObject({
    id: "chatcmpl-1",
    object: "chat.completion",
    created: 1,
    model: "ds/deepseek-v4-flash",
    choices: [
      { index: 0, message: { role: "assistant", content: "public class Test {}" }, finish_reason: "stop" },
    ],
    usage: { prompt_tokens: 3, completion_tokens: 5, total_tokens: 8 },
  });
  assert.equal(out.object, "text_completion");
  assert.equal(out.choices[0].text, "public class Test {}");
  assert.equal(out.choices[0].finish_reason, "stop");
  assert.equal(out.choices[0].index, 0);
  assert.equal(out.choices[0].logprobs, null);
  assert.equal(out.choices[0].message, undefined); // no chat shape leaks
  assert.deepEqual(out.usage, { prompt_tokens: 3, completion_tokens: 5, total_tokens: 8 });
});

test("#3571 stream chunk: chat.completion.chunk(delta) → text_completion with text", () => {
  const out = toTextCompletionObject({
    id: "chatcmpl-2",
    object: "chat.completion.chunk",
    created: 2,
    model: "gpt-5.5",
    choices: [{ index: 0, delta: { content: "Hi" }, finish_reason: null }],
  });
  assert.equal(out.object, "text_completion");
  assert.equal(out.choices[0].text, "Hi");
  assert.equal(out.choices[0].delta, undefined);
});

test("#3571 transformSseData: passes [DONE] and non-JSON through, rewrites chat JSON", () => {
  assert.equal(transformSseData("[DONE]"), "[DONE]");
  assert.equal(transformSseData("  "), "");
  assert.equal(transformSseData("not json"), "not json");
  const rewritten = JSON.parse(
    transformSseData('{"object":"chat.completion.chunk","choices":[{"delta":{"content":"X"}}]}')
  );
  assert.equal(rewritten.object, "text_completion");
  assert.equal(rewritten.choices[0].text, "X");
});

test("#3571 empty delta content → text:'' (never undefined → no 'missing field text')", () => {
  const out = toTextCompletionObject({
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
  });
  assert.equal(out.choices[0].text, "");
});

test("#3571 stream transformer end-to-end: chat SSE → text SSE", async () => {
  const encoder = new TextEncoder();
  const chatSse =
    'data: {"object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"Hello"},"finish_reason":null}]}\n\n' +
    'data: {"object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":" world"},"finish_reason":"stop"}]}\n\n' +
    "data: [DONE]\n\n";

  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      // split into two arbitrary byte chunks to exercise the line buffer across boundaries
      const mid = Math.floor(chatSse.length / 2);
      controller.enqueue(encoder.encode(chatSse.slice(0, mid)));
      controller.enqueue(encoder.encode(chatSse.slice(mid)));
      controller.close();
    },
  });

  const out = source.pipeThrough(createTextCompletionStreamTransformer());
  const reader = out.getReader();
  const decoder = new TextDecoder();
  let result = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value, { stream: true });
  }

  const dataLines = result
    .split("\n")
    .filter((l) => l.startsWith("data:") && !l.includes("[DONE]"))
    .map((l) => JSON.parse(l.slice("data:".length).trim()));

  assert.equal(dataLines.length, 2);
  assert.ok(dataLines.every((o) => o.object === "text_completion"));
  assert.equal(dataLines[0].choices[0].text, "Hello");
  assert.equal(dataLines[1].choices[0].text, " world");
  assert.equal(dataLines[1].choices[0].finish_reason, "stop");
  assert.ok(result.includes("data: [DONE]")); // [DONE] preserved
  assert.ok(!result.includes("delta")); // no chat shape leaks
});
