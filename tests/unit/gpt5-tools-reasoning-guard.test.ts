/**
 * GPT-5 tools+reasoning guard — `stripGpt5ReasoningWhenTools`.
 *
 * On the raw `openai` Chat Completions surface, GPT-5.x reasoning models reject a
 * request that carries BOTH function tools and an active `reasoning_effort` with
 * HTTP 400: "Function tools with reasoning_effort are not supported for
 * <model> in /v1/chat/completions. Please use /v1/responses instead."
 * (port of 9router#2540). OmniRoute's `forceResponsesUpstream` guard only fires
 * for `openai-compatible-*` connections carrying MCP/tool_search tool shapes —
 * the plain `openai` provider has no equivalent guard, so this scenario still
 * reaches the upstream 400 today. Strip `reasoning_effort`/`reasoning` when
 * function tools are present so the request succeeds on /v1/chat/completions.
 *
 * The guard is passed the request's already-resolved `targetFormat` (chatCore
 * resolves it once via `resolveChatCoreTargetFormat` before this guard runs) so it
 * gates on the actual upstream surface for THIS request rather than a model-name
 * list. This matters because #7242 (closes #2540 upstream / 9router#2547) tags the
 * public GPT-5.6 family with `targetFormat: "openai-responses"` and routes it to
 * `/v1/responses` instead — an endpoint that accepts tools + reasoning natively —
 * so stripping must NOT fire for GPT-5.6 requests once that routing is in effect.
 * Without this composition, #7101's strip and #7242's reroute would combine into
 * the worst of both worlds: routed to the endpoint that supports reasoning, but
 * with reasoning silently dropped anyway.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { stripGpt5ReasoningWhenTools } from "../../open-sse/services/gpt5SamplingGuard.ts";

// Chat Completions models in this suite use gpt-5.4/gpt-5.5 (targetFormat "openai"),
// which stay on /chat/completions and must keep being stripped. gpt-5.6-sol is reserved
// for the /v1/responses composition cases below, where stripping must NOT happen.

test("strips reasoning_effort for openai gpt-5.x on /chat/completions when function tools are present", () => {
  const body = {
    model: "gpt-5.4-sol",
    reasoning_effort: "high",
    tools: [{ type: "function", function: { name: "read_file" } }],
    messages: [],
  };
  const result = stripGpt5ReasoningWhenTools(body, "openai", "gpt-5.4-sol", "openai");
  assert.equal(result.reasoning_effort, undefined);
});

test("strips nested reasoning.effort for openai gpt-5.x on /chat/completions when function tools are present", () => {
  const body = {
    model: "gpt-5.4-sol",
    reasoning: { effort: "medium" },
    tools: [{ type: "function", function: { name: "read_file" } }],
  };
  const result = stripGpt5ReasoningWhenTools(body, "openai", "gpt-5.4-sol", "openai");
  assert.equal(result.reasoning, undefined);
});

test("keeps reasoning_effort=none untouched (already non-reasoning mode)", () => {
  const body = {
    model: "gpt-5.4-sol",
    reasoning_effort: "none",
    tools: [{ type: "function", function: { name: "read_file" } }],
  };
  const result = stripGpt5ReasoningWhenTools(body, "openai", "gpt-5.4-sol", "openai");
  assert.equal(result.reasoning_effort, "none");
});

test("keeps reasoning_effort when there are no tools", () => {
  const body = { model: "gpt-5.4-sol", reasoning_effort: "high", messages: [] };
  const result = stripGpt5ReasoningWhenTools(body, "openai", "gpt-5.4-sol", "openai");
  assert.equal(result.reasoning_effort, "high");
});

test("keeps reasoning_effort when tools array is empty", () => {
  const body = { model: "gpt-5.4-sol", reasoning_effort: "high", tools: [] };
  const result = stripGpt5ReasoningWhenTools(body, "openai", "gpt-5.4-sol", "openai");
  assert.equal(result.reasoning_effort, "high");
});

test("non-openai provider is untouched", () => {
  const body = {
    model: "gpt-5.4-sol",
    reasoning_effort: "high",
    tools: [{ type: "function", function: { name: "x" } }],
  };
  const result = stripGpt5ReasoningWhenTools(body, "codex", "gpt-5.4-sol", "openai");
  assert.equal(result.reasoning_effort, "high");
});

test("non-gpt-5 openai model is untouched", () => {
  const body = {
    model: "gpt-4o",
    reasoning_effort: "high",
    tools: [{ type: "function", function: { name: "x" } }],
  };
  const result = stripGpt5ReasoningWhenTools(body, "openai", "gpt-4o", "openai");
  assert.equal(result.reasoning_effort, "high");
});

test("returns the same reference when nothing to strip", () => {
  const body = { model: "gpt-5.4-sol", tools: [{ type: "function" }], messages: [] };
  const result = stripGpt5ReasoningWhenTools(body, "openai", "gpt-5.4-sol", "openai");
  assert.equal(result, body);
});

test("logs the stripped fields when a logger is provided", () => {
  const calls: Array<[string, string]> = [];
  const log = { warn: (tag: string, message: string) => calls.push([tag, message]) };
  stripGpt5ReasoningWhenTools(
    {
      model: "gpt-5.4-sol",
      reasoning_effort: "high",
      tools: [{ type: "function", function: { name: "x" } }],
    },
    "openai",
    "gpt-5.4-sol",
    "openai",
    log
  );
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], "PARAMS");
  assert.match(calls[0][1], /reasoning_effort/);
});

// --- Composition with #7242 (GPT-5.6 → /v1/responses) ---
//
// #7242 tags the public GPT-5.6 family with targetFormat "openai-responses" so it is
// routed to /v1/responses, which natively supports tools + reasoning together. If this
// guard ignored targetFormat and only looked at provider+model-name (the pre-#7242
// shape), a GPT-5.6 request with tools + reasoning_effort would still get its reasoning
// silently stripped even though it is no longer going to /chat/completions — the worst
// of both worlds. These cases prove the composition holds.

test("gpt-5.6 routed to /v1/responses (targetFormat openai-responses) keeps reasoning_effort", () => {
  const body = {
    model: "gpt-5.6-sol",
    reasoning_effort: "high",
    tools: [{ type: "function", function: { name: "read_file" } }],
    messages: [],
  };
  const result = stripGpt5ReasoningWhenTools(body, "openai", "gpt-5.6-sol", "openai-responses");
  assert.equal(result.reasoning_effort, "high");
  assert.equal(result, body, "no-op path should return the same reference");
});

test("gpt-5.6 routed to /v1/responses keeps nested reasoning.effort too", () => {
  const body = {
    model: "gpt-5.6-sol",
    reasoning: { effort: "medium" },
    tools: [{ type: "function", function: { name: "read_file" } }],
  };
  const result = stripGpt5ReasoningWhenTools(body, "openai", "gpt-5.6-sol", "openai-responses");
  assert.deepEqual(result.reasoning, { effort: "medium" });
});

test("gpt-5.4/gpt-5.5 stay on /chat/completions (targetFormat openai) and keep stripping", () => {
  for (const model of ["gpt-5.4-sol", "gpt-5.5-pro"]) {
    const body = {
      model,
      reasoning_effort: "high",
      tools: [{ type: "function", function: { name: "read_file" } }],
    };
    const result = stripGpt5ReasoningWhenTools(body, "openai", model, "openai");
    assert.equal(result.reasoning_effort, undefined, `${model} should still be stripped`);
  }
});

test("if gpt-5.6 were ever NOT routed to /v1/responses, the strip would still apply (defense in depth)", () => {
  const body = {
    model: "gpt-5.6-sol",
    reasoning_effort: "high",
    tools: [{ type: "function", function: { name: "read_file" } }],
  };
  const result = stripGpt5ReasoningWhenTools(body, "openai", "gpt-5.6-sol", "openai");
  assert.equal(result.reasoning_effort, undefined);
});
