// AI/ML API validates optional fields with a strict schema that rejects a literal
// `null` ("Expected number, received null") rather than reading it as "unset".
//
// This is not an exotic payload: the OpenAI SDKs serialise an unset optional as
// `null`, so a client that never touches temperature still puts `temperature:
// null` on the wire, and OmniRoute relays the body verbatim.
//
// Field sweep against POST /v1/chat/completions on 2026-09-03 — the lists below
// are transcribed from `details[].path` in the 400 bodies (the top-level
// `message` is generic and names no field).
import { test } from "node:test";
import assert from "node:assert/strict";
import { stripUnsupportedParams } from "../../open-sse/translator/paramSupport.ts";

/** 400 on null. temperature/top_p 400 on claude-sonnet-4.6 and deepseek-chat but
 *  200 on gpt-5, so the rejection is model-dependent; the rest 400 everywhere. */
const REJECTED_WHEN_NULL = [
  "temperature",
  "top_p",
  "seed",
  "tools",
  "tool_choice",
  "response_format",
  "stream",
  "stream_options",
  "parallel_tool_calls",
  "max_tokens",
  "max_completion_tokens",
  "reasoning_effort",
];

/** 200 with a null value — stripping these would be scope the rule has not earned. */
const ACCEPTED_WHEN_NULL = [
  "stop",
  "presence_penalty",
  "frequency_penalty",
  "n",
  "user",
  "logprobs",
  "logit_bias",
  "top_logprobs",
  "metadata",
];

test("aimlapi: every field the upstream rejects as null is dropped before dispatch", () => {
  const body: Record<string, unknown> = {
    model: "claude-sonnet-4.6",
    messages: [{ role: "user", content: "hi" }],
  };
  for (const key of REJECTED_WHEN_NULL) body[key] = null;
  stripUnsupportedParams("aimlapi", "claude-sonnet-4.6", body);

  for (const key of REJECTED_WHEN_NULL) {
    assert.equal(key in body, false, `${key} must not reach the upstream as null`);
  }
  assert.equal(body.model, "claude-sonnet-4.6");
  assert.ok(Array.isArray(body.messages), "the payload itself must survive");
});

test("aimlapi: real values are never touched — only the literal null is dropped", () => {
  // Falsy-but-meaningful values are the trap here: a plain `drop` rule would
  // discard a deliberate temperature: 0 or stream: false.
  const body: Record<string, unknown> = {
    model: "claude-sonnet-4.6",
    temperature: 0,
    top_p: 0.95,
    seed: 42,
    stream: false,
    max_tokens: 16,
    parallel_tool_calls: false,
    tools: [],
    reasoning_effort: "low",
  };
  stripUnsupportedParams("aimlapi", "claude-sonnet-4.6", body);

  assert.equal(body.temperature, 0);
  assert.equal(body.top_p, 0.95);
  assert.equal(body.seed, 42);
  assert.equal(body.stream, false);
  assert.equal(body.max_tokens, 16);
  assert.equal(body.parallel_tool_calls, false);
  assert.deepEqual(body.tools, []);
  assert.equal(body.reasoning_effort, "low");
});

test("aimlapi: params the upstream accepts as null are left alone", () => {
  const body: Record<string, unknown> = { model: "claude-sonnet-4.6" };
  for (const key of ACCEPTED_WHEN_NULL) body[key] = null;
  stripUnsupportedParams("aimlapi", "claude-sonnet-4.6", body);

  for (const key of ACCEPTED_WHEN_NULL) {
    assert.equal(body[key], null, `${key} returns 200 with null and must be preserved`);
  }
});

test("aimlapi: the two lists are disjoint", () => {
  // Guards against a future edit moving a field into both lists, which would make
  // one of the assertions above vacuous.
  for (const key of REJECTED_WHEN_NULL) {
    assert.equal(ACCEPTED_WHEN_NULL.includes(key), false, `${key} cannot be in both lists`);
  }
});

test("the null-drop is scoped to aimlapi and does not leak to other providers", () => {
  const body: Record<string, unknown> = {
    model: "gpt-5.4",
    temperature: null,
    seed: null,
    stream: null,
  };
  stripUnsupportedParams("openai", "gpt-5.4", body);

  assert.equal(body.temperature, null, "other providers keep their body verbatim");
  assert.equal(body.seed, null);
  assert.equal(body.stream, null);
});
