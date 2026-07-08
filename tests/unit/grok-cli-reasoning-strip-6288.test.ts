import test from "node:test";
import assert from "node:assert/strict";

const { GrokCliExecutor } = await import("@omniroute/open-sse/executors/grok-cli");

// Regression for #6288: Grok Build (`grok-cli` executor) returns 400 on every
// request from Claude Code because Claude Code forwards `reasoning_effort`
// (and sometimes a nested `reasoning` object), which Grok Build's upstream
// chat-proxy endpoint does not accept. transformRequest() must strip both
// before forwarding, without breaking the existing #5273 stripping.

test("#6288 grok-cli transformRequest strips reasoning_effort", () => {
  const executor = new GrokCliExecutor();
  const body = {
    model: "grok-build",
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "high",
  };

  const out = executor.transformRequest("grok-build", body, false, {} as never) as Record<
    string,
    unknown
  >;

  assert.equal("reasoning_effort" in out, false, "reasoning_effort must be stripped");
  assert.deepEqual(out.messages, [{ role: "user", content: "hi" }]);
  assert.equal(out.model, "grok-build");
});

test("#6288 grok-cli transformRequest strips nested reasoning object", () => {
  const executor = new GrokCliExecutor();
  const body = {
    model: "grok-build",
    messages: [{ role: "user", content: "hi" }],
    reasoning: { effort: "high" },
  };

  const out = executor.transformRequest("grok-build", body, false, {} as never) as Record<
    string,
    unknown
  >;

  assert.equal("reasoning" in out, false, "reasoning must be stripped");
});

test("#6288 grok-cli transformRequest still strips #5273 unsupported sampling params", () => {
  const executor = new GrokCliExecutor();
  const body = {
    model: "grok-build",
    messages: [{ role: "user", content: "hi" }],
    presencePenalty: 0.5,
    frequencyPenalty: 0.3,
    logprobs: true,
    topLogprobs: 5,
    reasoning_effort: "medium",
  };

  const out = executor.transformRequest("grok-build", body, false, {} as never) as Record<
    string,
    unknown
  >;

  for (const param of [
    "presencePenalty",
    "frequencyPenalty",
    "logprobs",
    "topLogprobs",
    "reasoning_effort",
  ]) {
    assert.equal(param in out, false, `${param} must be stripped`);
  }
});
