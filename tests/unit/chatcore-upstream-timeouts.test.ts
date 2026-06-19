import test from "node:test";
import assert from "node:assert/strict";

import {
  createBodyTimeoutError,
  createUpstreamStartTimeoutError,
  createAbortError,
  computeBillableTokens,
  getExecutorTimeoutMs,
  normalizeExecutorResult,
} from "../../open-sse/handlers/chatCore/upstreamTimeouts.ts";

test("error factories set name and message", () => {
  const body = createBodyTimeoutError(1234);
  assert.equal(body.name, "BodyTimeoutError");
  assert.match(body.message, /1234ms/);

  const start = createUpstreamStartTimeoutError(500, "openai", "gpt-4o");
  assert.equal(start.name, "TimeoutError");
  assert.match(start.message, /openai\/gpt-4o/);

  const ctrl = new AbortController();
  ctrl.abort("nope");
  const ab = createAbortError(ctrl.signal);
  assert.equal(ab.name, "AbortError");
});

test("computeBillableTokens sums input+output+reasoning (no cache double-count)", () => {
  const total = computeBillableTokens({
    prompt_tokens: 10,
    completion_tokens: 5,
    reasoning_tokens: 2,
  });
  assert.equal(total, 17);
});

test("getExecutorTimeoutMs floors valid values and falls back to default", () => {
  assert.equal(getExecutorTimeoutMs({ getTimeoutMs: () => 1234.9 }), 1234);
  assert.equal(getExecutorTimeoutMs({ getTimeoutMs: () => NaN }), getExecutorTimeoutMs(null));
  assert.ok(Number.isFinite(getExecutorTimeoutMs(null)));
});

test("normalizeExecutorResult wraps bare Response and passes through rich result", () => {
  const r = new Response("x");
  const wrapped = normalizeExecutorResult(r);
  assert.equal(wrapped.response, r);
  assert.equal(wrapped.url, "");
  const rich = normalizeExecutorResult({ response: r, url: "u", headers: { a: "b" } });
  assert.equal(rich.url, "u");
  assert.equal(rich.headers.a, "b");
});
