// #13696: AgentRouter routes GLM models through the generic DefaultExecutor
// (executor: "default"), which has no GLM-specific handling. When the
// connection's OpenAI-compatible alternate format is used, a Claude-style
// `thinking: {type: "adaptive"}` field survives stripUnsupportedParams
// untouched and reaches AgentRouter's upstream GLM endpoint verbatim, which
// 400s with `thinking.type "adaptive" is not supported by glm models; must
// be one of enabled, disabled`.
//
// Fix: paramSupport.ts STRIP_RULES maps thinking.type "adaptive" -> "enabled"
// (preserving other thinking fields, e.g. budget_tokens) for provider
// "agentrouter" + model matching /glm-/i.

import { test } from "node:test";
import assert from "node:assert/strict";
import { stripUnsupportedParams } from "../../open-sse/translator/paramSupport.ts";

test("stripUnsupportedParams: agentrouter + glm-5.3 maps thinking.type adaptive -> enabled", () => {
  const body: Record<string, unknown> = {
    model: "glm-5.3",
    thinking: { type: "adaptive", budget_tokens: 1024 },
    max_tokens: 512,
  };
  stripUnsupportedParams("agentrouter", "glm-5.3", body);
  assert.deepEqual(
    body.thinking,
    { type: "enabled", budget_tokens: 1024 },
    "adaptive must be mapped to enabled for agentrouter GLM models, preserving other thinking fields"
  );
  assert.equal(body.max_tokens, 512, "other params must survive");
});

test("stripUnsupportedParams: agentrouter + claude-opus-5 KEEPS thinking.type adaptive (regression guard)", () => {
  const body: Record<string, unknown> = {
    model: "claude-opus-5",
    thinking: { type: "adaptive" },
  };
  stripUnsupportedParams("agentrouter", "claude-opus-5", body);
  assert.deepEqual(
    body.thinking,
    { type: "adaptive" },
    "non-GLM agentrouter models must not be affected"
  );
});

test("stripUnsupportedParams: non-agentrouter provider with a glm-* model id KEEPS thinking.type adaptive", () => {
  const body: Record<string, unknown> = {
    model: "glm-5.3",
    thinking: { type: "adaptive" },
  };
  stripUnsupportedParams("glm", "glm-5.3", body);
  assert.deepEqual(
    body.thinking,
    { type: "adaptive" },
    "the native GLM provider's own executor handles this mapping separately; this rule must not fire for it"
  );
});

test("stripUnsupportedParams: agentrouter + glm-5.3 without a thinking field is a no-op", () => {
  const body: Record<string, unknown> = { model: "glm-5.3", max_tokens: 100 };
  stripUnsupportedParams("agentrouter", "glm-5.3", body);
  assert.equal(body.thinking, undefined, "no thinking field must not be introduced");
});
