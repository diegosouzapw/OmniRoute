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

test("normalizeExecutorResult rejects malformed executor output", () => {
  assert.throws(() => normalizeExecutorResult({}), /must contain a Response/);
  assert.throws(
    () => normalizeExecutorResult({ response: "not-a-response" }),
    /must contain a Response/
  );
});

// #3229: the executor's bounded upstream classification is the only diagnostic chatCore can
// persist for Antigravity failures. If the normalizer drops it, the handler silently falls back
// to logging nothing at all — the bug this seam exists to catch.
test("normalizeExecutorResult carries upstreamDiagnostic through, and bare Responses have none", () => {
  const diagnostic = { httpStatus: 400, validationCategory: "tool_schema" };
  const rich = normalizeExecutorResult({
    response: new Response("x", { status: 400 }),
    url: "u",
    upstreamDiagnostic: diagnostic,
  });
  assert.deepEqual(rich.upstreamDiagnostic, diagnostic);

  assert.equal(normalizeExecutorResult(new Response("x")).upstreamDiagnostic, undefined);
  assert.equal(
    normalizeExecutorResult({ response: new Response("x"), url: "u" }).upstreamDiagnostic,
    undefined
  );
});
