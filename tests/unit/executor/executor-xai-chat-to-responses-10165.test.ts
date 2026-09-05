import test from "node:test";
import assert from "node:assert/strict";

import { XaiExecutor } from "../../../open-sse/executors/xai.ts";
import { getModelTargetFormat } from "../../../open-sse/config/providerModels.ts";

test("#10165 xai-oauth grok-4.5 is tagged openai-responses", () => {
  assert.equal(getModelTargetFormat("xai-oauth", "grok-4.5"), "openai-responses");
  assert.equal(getModelTargetFormat("xao", "grok-4.5"), "openai-responses");
});

test("#10165 XaiExecutor converts chat body to Responses fields for grok-4.5", () => {
  const executor = new XaiExecutor("xai-oauth");
  const body = {
    model: "grok-4.5",
    messages: [{ role: "user", content: "say ok" }],
    max_tokens: 16,
    response_format: { type: "json_object" },
  };
  const out = executor.transformRequest("grok-4.5", body, false, {
    accessToken: "test",
  } as never) as Record<string, unknown>;

  assert.ok(Array.isArray(out.input), "messages must become input");
  assert.equal(out.messages, undefined);
  assert.equal(out.max_output_tokens, 16);
  assert.equal(out.max_tokens, undefined);
  assert.equal(out.response_format, undefined);
  assert.ok(out.text && typeof out.text === "object");
});

test("#10165 XaiExecutor maps max_tokens when input already present", () => {
  const executor = new XaiExecutor("xai-oauth");
  const body = {
    model: "grok-4.5",
    input: "say ok",
    max_tokens: 32,
  };
  const out = executor.transformRequest("grok-4.5", body, false, {
    accessToken: "test",
  } as never) as Record<string, unknown>;

  assert.equal(out.input, "say ok");
  assert.equal(out.max_output_tokens, 32);
  assert.equal(out.max_tokens, undefined);
});
