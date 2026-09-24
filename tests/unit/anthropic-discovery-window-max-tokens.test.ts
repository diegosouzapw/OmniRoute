import { test } from "node:test";
import assert from "node:assert/strict";

import { normalizeDiscoveredModels } from "@/lib/providerModels/modelDiscovery";

// Anthropic Models API (`GET /v1/models`) returns ModelInfo with:
//   max_input_tokens  — context window
//   max_tokens        — maximum value of the request `max_tokens` param (output cap)
// It does not send `context_length`. Claude's parseResponse is `(data) => data.data || []`,
// so those fields reach normalizeDiscoveredModels unchanged.
//
// #14159 added `record.max_tokens` to the window candidate list. The merge note already
// said that field is the output limit on several providers and left it untested. Live
// `/v1/models` then advertised claude-opus-5 context_length=128000 instead of 1M.

const ANTHROPIC_OPUS_5 = {
  type: "model",
  id: "claude-opus-5",
  display_name: "Claude Opus 5",
  max_input_tokens: 1_000_000,
  max_tokens: 128000,
};

test("Anthropic ModelInfo maps max_input_tokens to the window, not max_tokens", () => {
  const [model] = normalizeDiscoveredModels([ANTHROPIC_OPUS_5], "claude");

  assert.equal(model.id, "claude-opus-5");
  assert.equal(model.inputTokenLimit, 1_000_000);
  assert.equal(model.outputTokenLimit, 128000);
});

test("a record with only max_tokens does not treat the output cap as the window", () => {
  const [model] = normalizeDiscoveredModels(
    [{ id: "claude-opus-5", max_tokens: 128000 }],
    "claude"
  );

  assert.equal(model.inputTokenLimit, undefined);
  assert.equal(model.outputTokenLimit, 128000);
});

test("max_output_tokens is the output cap when present next to max_tokens", () => {
  const [model] = normalizeDiscoveredModels([
    { id: "vendor/both-output", max_output_tokens: 64000, max_tokens: 128000 },
  ]);

  assert.equal(model.inputTokenLimit, undefined);
  assert.equal(model.outputTokenLimit, 64000);
});

test("an explicit context_length still wins when the record also carries max_tokens", () => {
  const [model] = normalizeDiscoveredModels([
    { id: "vendor/or-shape", context_length: 262144, max_tokens: 8192 },
  ]);

  assert.equal(model.inputTokenLimit, 262144);
  assert.equal(model.outputTokenLimit, 8192);
});

test("vLLM max_model_len is still the window when max_tokens is also present", () => {
  const [model] = normalizeDiscoveredModels([
    { id: "qwen3.8", max_model_len: 250000, max_tokens: 8192 },
  ]);

  assert.equal(model.inputTokenLimit, 250000);
  assert.equal(model.outputTokenLimit, 8192);
});
