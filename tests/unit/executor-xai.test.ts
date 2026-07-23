import test from "node:test";
import assert from "node:assert/strict";

import { XaiExecutor } from "../../open-sse/executors/xai.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { xaiProvider } from "../../open-sse/config/providers/registry/xai/index.ts";

// Real xai catalog ids (open-sse/config/providers/registry/xai/index.ts):
//   grok-4.3                          — plain, reasoning-capable
//   grok-build-0.1                    — build/tool model, no reasoning mode
//   grok-4.20-multi-agent-0309        — neutral (not in either allow/deny list)
//   grok-4.20-0309-reasoning          — already encodes reasoning in the id
//   grok-4.20-0309-non-reasoning      — already encodes non-reasoning in the id

const credentials = { apiKey: "test-key" };

test("XaiExecutor is registered under the 'xai' key and set as the registry executor", () => {
  assert.equal(hasSpecializedExecutor("xai"), true);
  assert.ok(getExecutor("xai") instanceof XaiExecutor);
  assert.equal(xaiProvider.executor, "xai");
});

test("XaiExecutor can target the separate xAI OAuth provider config", () => {
  const executor = new XaiExecutor("xai-oauth");
  assert.equal(executor.getProvider(), "xai-oauth");
  assert.equal(executor.buildUrl("grok-4.5", false), "https://api.x.ai/v1/chat/completions");
});

test("strips a -{level} suffix from an allow-listed model and sets reasoning_effort", () => {
  const executor = new XaiExecutor();

  for (const level of ["low", "medium", "high", "xhigh"] as const) {
    const body = { model: `grok-4.3-${level}`, messages: [] };
    const out = executor.transformRequest(`grok-4.3-${level}`, body, false, credentials) as Record<
      string,
      unknown
    >;
    assert.equal(out.model, "grok-4.3", `level=${level} should strip suffix from model id`);
    assert.equal(out.reasoning_effort, level, `level=${level} should set reasoning_effort`);
  }
});

test("suffix parsing also applies to the explicit -reasoning variant without double-mutating it", () => {
  const executor = new XaiExecutor();
  const body = { model: "grok-4.20-0309-reasoning-high", messages: [] };
  const out = executor.transformRequest(
    "grok-4.20-0309-reasoning-high",
    body,
    false,
    credentials
  ) as Record<string, unknown>;

  assert.equal(out.model, "grok-4.20-0309-reasoning");
  assert.equal(out.reasoning_effort, "high");
});

test("strips reasoning_effort for a deny-listed model (grok-build-0.1)", () => {
  const executor = new XaiExecutor();
  const body = { model: "grok-build-0.1", reasoning_effort: "high", messages: [] };
  const out = executor.transformRequest("grok-build-0.1", body, false, credentials) as Record<
    string,
    unknown
  >;

  assert.equal(out.model, "grok-build-0.1");
  assert.equal(out.reasoning_effort, undefined);
});

test("strips reasoning_effort for the explicit -non-reasoning variant (already encodes reasoning state)", () => {
  const executor = new XaiExecutor();
  const body = {
    model: "grok-4.20-0309-non-reasoning",
    reasoning_effort: "high",
    messages: [],
  };
  const out = executor.transformRequest(
    "grok-4.20-0309-non-reasoning",
    body,
    false,
    credentials
  ) as Record<string, unknown>;

  assert.equal(out.model, "grok-4.20-0309-non-reasoning");
  assert.equal(out.reasoning_effort, undefined);
});

test("leaves a plain, unlisted model id and body unchanged (no suffix, not allow/deny listed)", () => {
  const executor = new XaiExecutor();
  const body = { model: "grok-4.20-multi-agent-0309", messages: [{ role: "user", content: "hi" }] };
  const out = executor.transformRequest(
    "grok-4.20-multi-agent-0309",
    body,
    false,
    credentials
  ) as Record<string, unknown>;

  assert.equal(out.model, "grok-4.20-multi-agent-0309");
  assert.equal(out.reasoning_effort, undefined);
  assert.deepEqual(out.messages, body.messages);
});

// Port of decolua/9router#2439 (author: @ryanngit): xAI ships a native
// `/v1/responses` endpoint. grok-4.20-multi-agent-0309 is tagged
// targetFormat: "openai-responses" in the registry (upstream's own tag) — it
// must resolve to xAI's native Responses URL, not the chat-completions
// bridge, mirroring the gh executor's targetFormat-driven routing (9router#102)
// and the "openai" -pro heuristic in open-sse/executors/default.ts.
test("XaiExecutor.buildUrl routes the Responses-tagged model (grok-4.20-multi-agent-0309) to xAI's native /v1/responses endpoint", () => {
  const executor = new XaiExecutor();
  const url = executor.buildUrl("grok-4.20-multi-agent-0309", true);
  assert.equal(url, "https://api.x.ai/v1/responses");
});

test("XaiExecutor.buildUrl keeps a plain chat model (grok-4.3) on /v1/chat/completions", () => {
  const executor = new XaiExecutor();
  const url = executor.buildUrl("grok-4.3", true);
  assert.equal(url, "https://api.x.ai/v1/chat/completions");
});
