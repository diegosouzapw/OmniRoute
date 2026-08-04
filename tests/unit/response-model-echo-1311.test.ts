import test from "node:test";
import assert from "node:assert/strict";

import {
  echoModelInObject,
  echoModelInSseLine,
  createModelEchoTransform,
} from "../../open-sse/services/responseModelEcho.ts";

// #1311: echo the requested alias/combo name back in the response model field so strict
// clients (Claude Desktop) that validate response.model === request.model stop 401-ing.

test("echoModelInObject rewrites a string model field", () => {
  const obj = { id: "x", model: "gpt-5.5", choices: [] };
  echoModelInObject(obj, "claude-sonnet-cx");
  assert.equal(obj.model, "claude-sonnet-cx");
});

test("echoModelInObject is a no-op when echoModel is falsy or model is absent", () => {
  const a = { model: "gpt-5.5" };
  echoModelInObject(a, null);
  assert.equal(a.model, "gpt-5.5");
  const b = { id: "x" } as Record<string, unknown>;
  echoModelInObject(b, "alias");
  assert.equal(b.model, undefined);
});

test("echoModelInSseLine rewrites a data chunk and leaves [DONE]/comments alone", () => {
  assert.equal(
    echoModelInSseLine('data: {"id":"1","model":"gpt-5.5","choices":[]}', "claude-sonnet-cx"),
    'data: {"id":"1","model":"claude-sonnet-cx","choices":[]}'
  );
  assert.equal(echoModelInSseLine("data: [DONE]", "claude-sonnet-cx"), "data: [DONE]");
  assert.equal(echoModelInSseLine(": keep-alive", "claude-sonnet-cx"), ": keep-alive");
  assert.equal(echoModelInSseLine("", "claude-sonnet-cx"), "");
});

test("createModelEchoTransform rewrites model across a streamed SSE response", async () => {
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const input = new ReadableStream({
    start(controller) {
      // split a frame across two chunks to exercise the cross-boundary buffer
      controller.enqueue(enc.encode('data: {"id":"1","model":"gpt-'));
      controller.enqueue(enc.encode('5.5","choices":[{"delta":{"content":"hi"}}]}\n\n'));
      controller.enqueue(enc.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  const out = input.pipeThrough(createModelEchoTransform("claude-sonnet-cx"));
  let text = "";
  for await (const chunk of out as unknown as AsyncIterable<Uint8Array>) {
    text += dec.decode(chunk, { stream: true });
  }
  assert.ok(text.includes('"model":"claude-sonnet-cx"'), text);
  assert.ok(!text.includes("gpt-5.5"), "upstream model name must be gone");
  assert.ok(text.includes("data: [DONE]"), "DONE sentinel preserved");
  assert.ok(text.includes('"content":"hi"'), "content preserved");
});

test("createModelEchoTransform with no echoModel passes bytes through unchanged", async () => {
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const input = new ReadableStream({
    start(controller) {
      controller.enqueue(enc.encode('data: {"model":"gpt-5.5"}\n\n'));
      controller.close();
    },
  });
  const out = input.pipeThrough(createModelEchoTransform(null));
  let text = "";
  for await (const chunk of out as unknown as AsyncIterable<Uint8Array>) {
    text += dec.decode(chunk, { stream: true });
  }
  assert.ok(text.includes('"model":"gpt-5.5"'));
});
