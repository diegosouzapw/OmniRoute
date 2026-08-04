/**
 * OpenAI API-key GPT-5.6 family must route through the native Responses API
 * (/v1/responses), not Chat Completions (/v1/chat/completions).
 *
 * Port of 9router#2547 (closes 9router#2540): OpenAI rejects Chat Completions
 * requests that combine function tools with an active `reasoning_effort` for
 * the GPT-5.6 family with HTTP 400 ("Function tools with reasoning_effort are
 * not supported for <model> in /v1/chat/completions. Please use /v1/responses
 * instead."). OmniRoute already has a generic model-specific `targetFormat`
 * override (used today for gpt-5.5-pro / gpt-5.4-pro, #5842) that routes the
 * request body translation AND the executor's outbound URL to
 * api.openai.com/v1/responses — the GPT-5.6 family registry entries were
 * simply missing the tag.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { getModelTargetFormat } from "../../open-sse/config/providerModels.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

test("getModelTargetFormat routes the public OpenAI GPT-5.6 family through Responses", () => {
  for (const modelId of ["gpt-5.6", "gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"]) {
    assert.equal(
      getModelTargetFormat("openai", modelId),
      "openai-responses",
      `${modelId} must target openai-responses`
    );
  }
});

test("GPT-5.4 (non-5.6) stays on Chat Completions", () => {
  assert.equal(getModelTargetFormat("openai", "gpt-5.4"), null);
});

test("DefaultExecutor builds the /v1/responses URL for gpt-5.6-sol", () => {
  const executor = new DefaultExecutor("openai");
  const url = executor.buildUrl("gpt-5.6-sol", true, 0, null);
  assert.equal(url, "https://api.openai.com/v1/responses");
});

test("DefaultExecutor keeps /v1/chat/completions for gpt-5.4", () => {
  const executor = new DefaultExecutor("openai");
  const url = executor.buildUrl("gpt-5.4", true, 0, null);
  assert.equal(url, "https://api.openai.com/v1/chat/completions");
});
