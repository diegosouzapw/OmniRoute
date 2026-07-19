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

// The four curated GPT-5.6 ids above (gpt-5.6, gpt-5.6-sol, gpt-5.6-terra, gpt-5.6-luna)
// are tagged directly in the registry via GPT_5_6_API_CAPABILITIES (#7242) and hit the
// `found?.targetFormat` fast path before ever reaching the heuristic below — so they
// don't exercise it. PR #7663 added a `^gpt-5\.6(?:$|[-.])` heuristic (mirroring the
// existing `-pro$` one) specifically to cover *dynamically-synced* GPT-5.6 variants that
// post-date the curated catalog. Assert against an id that is deliberately NOT in the
// registry to prove the heuristic branch itself, not the curated tag.
test("getModelTargetFormat heuristic covers un-curated GPT-5.6 variants not yet in the registry", () => {
  assert.equal(getModelTargetFormat("openai", "gpt-5.6-nova"), "openai-responses");
  assert.equal(getModelTargetFormat("openai", "gpt-5.6.preview"), "openai-responses");
});

test("getModelTargetFormat heuristic does not falsely match gpt-5.60 (no separator)", () => {
  assert.equal(getModelTargetFormat("openai", "gpt-5.60"), null);
});

test("getModelTargetFormat heuristic is scoped to the openai alias, not codex", () => {
  // codex is the OAuth/CLI provider and is a DISTINCT target from the public openai
  // alias — its own registry entries already carry explicit targetFormat tags where
  // needed, and this heuristic must never fire for it.
  assert.equal(getModelTargetFormat("codex", "gpt-5.6-nova"), null);
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
