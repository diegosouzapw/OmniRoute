import test from "node:test";
import assert from "node:assert/strict";

// Regression for port-from-9router#1052: the streaming response translator's
// same-format fast path returned `[chunk]` unconditionally. The null/flush signal
// (chunk === null) therefore leaked a literal `[null]` to downstream consumers,
// which surfaced as an empty `data: null` SSE event between chunks and crashed
// strict clients (e.g. Factory Droid BYOK on /v1/responses).
const { translateResponse } = await import("../../open-sse/translator/index.ts");

test("#1052: same-format null flush yields no chunks (not [null])", () => {
  const out = translateResponse("openai", "openai", null, {});
  assert.deepEqual(out, []);
});

test("#1052: same-format real chunk still passes through unchanged", () => {
  const chunk = { id: "x", choices: [{ delta: { content: "hi" } }] };
  const out = translateResponse("openai", "openai", chunk, {});
  assert.deepEqual(out, [chunk]);
});
