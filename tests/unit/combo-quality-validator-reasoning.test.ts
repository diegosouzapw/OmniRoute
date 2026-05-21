/**
 * Issue #2341 — `validateResponseQuality` must treat a response carrying
 * `reasoning_content` (Kimi-K2.5-TEE, GLM-5-TEE, etc.) as valid even when
 * `content` is null. The previous implementation only inspected `content`
 * and `tool_calls`, so reasoning models triggered a false-positive
 * "empty content" 502 and an unnecessary combo fallback.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { validateResponseQuality } = await import("../../open-sse/services/combo.ts");

function makeResponse(body: unknown, contentType = "application/json"): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": contentType },
  });
}

const silentLog = { warn: () => {} };

test("#2341 reasoning_content with null content is treated as valid", async () => {
  const res = makeResponse({
    choices: [
      {
        message: {
          content: null,
          reasoning_content: " The user simply said 'Say OK'. OK. ",
        },
      },
    ],
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true, `expected valid, got reason: ${out.reason}`);
});

test("#2341 legacy `reasoning` field is also recognized", async () => {
  // Some upstream variants use `reasoning` (no `_content` suffix).
  const res = makeResponse({
    choices: [
      {
        message: {
          content: null,
          reasoning: "Step-by-step deduction body here.",
        },
      },
    ],
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true, `expected valid, got reason: ${out.reason}`);
});

test("#2341 empty reasoning_content + empty content + no tool_calls still rejected", async () => {
  // Regression guard: the new branch must not weaken the empty-response check.
  const res = makeResponse({
    choices: [
      {
        message: {
          content: null,
          reasoning_content: "   ",
        },
      },
    ],
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, false);
  assert.match(out.reason ?? "", /empty content/i);
});

test("#2341 normal content-only response remains valid (backward compat)", async () => {
  const res = makeResponse({
    choices: [{ message: { content: "Hello world." } }],
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true);
});

test("#2341 tool_calls-only response remains valid (backward compat)", async () => {
  const res = makeResponse({
    choices: [
      {
        message: {
          content: null,
          tool_calls: [{ id: "c1", type: "function", function: { name: "x", arguments: "{}" } }],
        },
      },
    ],
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true);
});

test("#2341 reasoning_content as non-string is ignored (defensive)", async () => {
  const res = makeResponse({
    choices: [
      {
        message: {
          content: null,
          reasoning_content: { unexpected: "object" },
        },
      },
    ],
  });
  const out = await validateResponseQuality(res, false, silentLog);
  // Non-string reasoning_content shouldn't count as content; still rejected.
  assert.equal(out.valid, false);
});
