import { test } from "node:test";
import assert from "node:assert/strict";

import { normalizeDiscoveredModels } from "@/lib/providerModels/modelDiscovery";

// Regression guard for #12858.
//
// vLLM's /v1/models reports the context window as `max_model_len` — the value
// the engine was started with — and nothing else. The native `vllm` provider is
// `passthroughModels: true`, and the OpenAI- and Anthropic-compatible custom
// providers pass the same raw records through, so all three connection shapes
// land here. Before the fix no window field matched, the model was persisted
// with no `inputTokenLimit`, and `/v1/models` advertised the 128K provider
// default for a deployment serving 250K.
//
// Same class of bug as #3202 (OpenRouter's `context_length`): the provider
// declares the window under a name the normalizer does not read.

test("#12858 maps vLLM max_model_len into inputTokenLimit", () => {
  const [model] = normalizeDiscoveredModels([
    { id: "qwen3.8", owned_by: "vllm", root: "/models/Qwen3.8-27B-FP8", max_model_len: 250000 },
  ]);

  assert.equal(model.id, "qwen3.8");
  assert.equal(model.inputTokenLimit, 250000);
});

test("#12858 accepts the camelCase spelling too", () => {
  // `contextLength` is already accepted next to `context_length`; keep the two
  // spellings of this field symmetric with that pair.
  const [model] = normalizeDiscoveredModels([{ id: "vendor/camel", maxModelLen: 131072 }]);

  assert.equal(model.inputTokenLimit, 131072);
});

test("#12858 preserves an explicit inputTokenLimit over max_model_len", () => {
  const [model] = normalizeDiscoveredModels([
    { id: "vendor/explicit-wins", inputTokenLimit: 200000, max_model_len: 999999 },
  ]);

  assert.equal(model.inputTokenLimit, 200000);
});

test("#12858 keeps context_length ahead of max_model_len when a record has both", () => {
  // OpenRouter-style catalogs are the older contract (#3202); a record carrying
  // both fields must not change meaning because this one was added.
  const [model] = normalizeDiscoveredModels([
    { id: "vendor/both", context_length: 262144, max_model_len: 131072 },
  ]);

  assert.equal(model.inputTokenLimit, 262144);
});

test("#12858 ignores a non-positive or non-numeric max_model_len", () => {
  const [zero] = normalizeDiscoveredModels([{ id: "vendor/zero", max_model_len: 0 }]);
  const [negative] = normalizeDiscoveredModels([{ id: "vendor/negative", max_model_len: -1 }]);
  const [text] = normalizeDiscoveredModels([{ id: "vendor/text", max_model_len: "250000" }]);

  assert.equal(zero.inputTokenLimit, undefined);
  assert.equal(negative.inputTokenLimit, undefined);
  assert.equal(text.inputTokenLimit, undefined);
});

test("#12858 leaves inputTokenLimit unset when no window field is present", () => {
  const [model] = normalizeDiscoveredModels([{ id: "vendor/no-window" }]);

  assert.equal(model.inputTokenLimit, undefined);
});
