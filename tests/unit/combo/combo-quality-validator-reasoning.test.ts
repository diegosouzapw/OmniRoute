/**
 * Issue #2341 — `validateResponseQuality` must treat a response carrying
 * `reasoning_content` (Kimi-K2.5-TEE, GLM-5-TEE, etc.) as valid even when
 * `content` is null. The previous implementation only inspected `content`
 * and `tool_calls`, so reasoning models triggered a false-positive
 * "empty content" 502 and an unnecessary combo fallback.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { validateResponseQuality } = await import("../../../open-sse/services/combo.ts");

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

test("#3587 reasoning consumed 90%+ of tokens → invalid (token exhaustion)", async () => {
  const res = makeResponse({
    choices: [
      {
        message: {
          content: null,
          reasoning_content: "Deep reasoning about the problem...",
        },
      },
    ],
    usage: {
      completion_tokens: 4096,
      reasoning_tokens: 3800,
    },
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, false, "should be invalid: reasoning exhausted tokens");
  assert.match(out.reason ?? "", /reasoning consumed/i);
});

test("#3587 reasoning consumed < 90% of tokens → valid (normal reasoning)", async () => {
  const res = makeResponse({
    choices: [
      {
        message: {
          content: null,
          reasoning_content: "Some reasoning",
        },
      },
    ],
    usage: {
      completion_tokens: 4096,
      reasoning_tokens: 500,
    },
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true, "should be valid: reasoning has room");
});

test("#3587 reasoning with no usage data → valid (can't determine)", async () => {
  const res = makeResponse({
    choices: [
      {
        message: {
          content: null,
          reasoning_content: "Some reasoning",
        },
      },
    ],
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true, "should be valid: no usage to check");
});

test("#3587 content present + reasoning + tokens exhausted → valid (has content)", async () => {
  const res = makeResponse({
    choices: [
      {
        message: {
          content: "Final answer here",
          reasoning_content: "Deep reasoning",
        },
      },
    ],
    usage: {
      completion_tokens: 4096,
      reasoning_tokens: 3800,
    },
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true, "should be valid: content is present");
});

test("#3587 reasoning via completion_tokens_details.reasoning_tokens → invalid", async () => {
  const res = makeResponse({
    choices: [
      {
        message: {
          content: null,
          reasoning_content: "Step-by-step analysis...",
        },
      },
    ],
    usage: {
      completion_tokens: 10000,
      completion_tokens_details: { reasoning_tokens: 9500 },
    },
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, false, "should be invalid: reasoning exhausted via details");
  assert.match(out.reason ?? "", /reasoning consumed/i);
});

test("client-audit-2026-09-01: finish_reason:length + reasoning <90% of tokens → invalid (direct truncation signal beats the ratio heuristic)", async () => {
  // Reproduces a live CT124 response: nvidia/nemotron truncated by max_tokens
  // with content:null, finish_reason:"length", and reasoning at only 63% of
  // completion_tokens (645/1024) — below the old 90% threshold, so it used to
  // pass the validator as "valid" even though the caller got nothing usable.
  const res = makeResponse({
    choices: [
      {
        message: {
          content: null,
          reasoning: "Step-by-step analysis that never reached a final answer...",
        },
        finish_reason: "length",
      },
    ],
    usage: {
      completion_tokens: 1024,
      completion_tokens_details: { reasoning_tokens: 645 },
    },
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, false, "should be invalid: finish_reason:length with empty content");
  assert.match(out.reason ?? "", /truncated at token limit/i);
});

test("client-audit-2026-09-01: finish_reason:max_tokens (Anthropic-shape naming) + empty content → invalid", async () => {
  const res = makeResponse({
    choices: [
      {
        message: { content: null, reasoning_content: "Partial reasoning trace" },
        finish_reason: "max_tokens",
      },
    ],
    usage: { completion_tokens: 512, reasoning_tokens: 100 },
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, false, "should be invalid: max_tokens finish_reason with empty content");
});

test("client-audit-2026-09-01: no finish_reason + reasoning <90% of tokens → still valid (regression guard, #3587 behavior preserved)", async () => {
  // Same low ratio as the case above, but no finish_reason reported at all —
  // the direct-truncation-signal branch must not fire, only the ratio heuristic.
  const res = makeResponse({
    choices: [{ message: { content: null, reasoning_content: "Some reasoning" } }],
    usage: { completion_tokens: 1024, reasoning_tokens: 645 },
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true, "should stay valid: no finish_reason signal, ratio under 90%");
});

test("client-audit-2026-09-01: finish_reason:stop + empty content + reasoning → ratio heuristic still applies unchanged", async () => {
  const res = makeResponse({
    choices: [
      {
        message: { content: null, reasoning_content: "Deep reasoning" },
        finish_reason: "stop",
      },
    ],
    usage: { completion_tokens: 4096, reasoning_tokens: 3800 },
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, false, "finish_reason:stop doesn't short-circuit — ratio (>90%) still applies");
  assert.match(out.reason ?? "", /reasoning consumed/i);
});

test("#3587 edge: completion_tokens=0 → safe (no division by zero)", async () => {
  const res = makeResponse({
    choices: [
      {
        message: {
          content: null,
          reasoning_content: "Tiny reasoning",
        },
      },
    ],
    usage: {
      completion_tokens: 0,
      reasoning_tokens: 0,
    },
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true, "should be valid: can't divide by zero");
});
