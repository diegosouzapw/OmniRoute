import test from "node:test";
import assert from "node:assert/strict";

const { clientWantsJsonResponse, resolveStreamFlag, stripMarkdownCodeFence } =
  await import("../../open-sse/utils/aiSdkCompat.ts");

test("T26: Accept application/json disables SSE stream mode", () => {
  assert.equal(clientWantsJsonResponse("application/json"), true);
  assert.equal(resolveStreamFlag(true, "application/json"), false);
});

test("T26: text/event-stream keeps SSE behavior", () => {
  assert.equal(clientWantsJsonResponse("text/event-stream"), false);
  assert.equal(resolveStreamFlag(true, "text/event-stream"), true);
});

test("T26: mixed Accept header prefers SSE only when text/event-stream is present", () => {
  assert.equal(clientWantsJsonResponse("application/json, text/event-stream"), false);
  assert.equal(resolveStreamFlag(true, "application/json, text/event-stream"), true);
});

test("T26: markdown code fence stripping unwraps Claude JSON blocks", () => {
  const wrapped = '```json\n{"name":"omniroute"}\n```';
  assert.equal(stripMarkdownCodeFence(wrapped), '{"name":"omniroute"}');
});

test("T26: non-fenced content is returned unchanged", () => {
  const plain = '{"name":"omniroute"}';
  assert.equal(stripMarkdownCodeFence(plain), plain);
});
