import test from "node:test";
import assert from "node:assert/strict";

const {
  clientWantsJsonResponse,
  resolveStreamFlag,
  resolveExplicitStreamAlias,
  hasExplicitNoStreamParam,
  stripMarkdownCodeFence,
} = await import("../../open-sse/utils/aiSdkCompat.ts");

test("T26: explicit stream:true takes priority over Accept application/json (#656)", () => {
  assert.equal(clientWantsJsonResponse("application/json"), true);
  // Body stream:true always wins — even with Accept: application/json
  assert.equal(resolveStreamFlag(true, "application/json"), true);
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

test("T26: undefined stream falls back to Accept header heuristic (#656)", () => {
  // No explicit stream param — Accept: application/json means no streaming
  assert.equal(resolveStreamFlag(undefined, "application/json"), false);
  // No explicit stream param + no JSON accept = stream by default
  assert.equal(resolveStreamFlag(undefined, "text/event-stream"), true);
  assert.equal(resolveStreamFlag(undefined, undefined), true);
});

test("T26: explicit stream:false always prevents streaming", () => {
  assert.equal(resolveStreamFlag(false, "text/event-stream"), false);
  assert.equal(resolveStreamFlag(false, undefined), false);
});

test("T26: explicit non-stream aliases are detected", () => {
  assert.equal(hasExplicitNoStreamParam({ non_stream: true }), true);
  assert.equal(hasExplicitNoStreamParam({ disable_stream: true }), true);
  assert.equal(hasExplicitNoStreamParam({ disable_streaming: true }), true);
  assert.equal(hasExplicitNoStreamParam({ streaming: false }), true);
  assert.equal(hasExplicitNoStreamParam({ streaming: true }), false);
  assert.equal(hasExplicitNoStreamParam({ stream: false }), false);
  assert.equal(hasExplicitNoStreamParam({}), false);
});

test("T26: explicit stream aliases resolve true/false correctly", () => {
  assert.equal(resolveExplicitStreamAlias({ streaming: true }), true);
  assert.equal(resolveExplicitStreamAlias({ streaming: false }), false);
  assert.equal(resolveExplicitStreamAlias({ disable_streaming: true }), false);
  assert.equal(resolveExplicitStreamAlias({}), undefined);
});
