import test from "node:test";
import assert from "node:assert/strict";

import { nvidiaProvider } from "../../open-sse/config/providers/registry/nvidia/index.ts";

// Port of decolua/9router#2373 ("fix(nvidia): expand NIM chat model catalog"). Upstream's
// PR also added a per-model `thinkingFormat`/`kind` capability shape in a legacy
// open-sse/providers/capabilities.js file that has no equivalent in OmniRoute — reasoning
// translation here is per-PROVIDER (open-sse/translator/paramSupport.ts,
// executors/default.ts, both gated on `this.provider === "nvidia"`), not per-model, so
// only the catalog (RegistryModel.supportsReasoning/supportsVision) needed porting.
// Embedding/ASR/TTS entries from the same upstream PR are already covered by
// open-sse/config/embeddingRegistry.ts and audioRegistry.ts, so they are not duplicated
// here. `minimaxai/minimax-m3` is intentionally excluded — see the #3329 guard
// (nvidia-minimax-m3-removed-3329.test.ts).
const modelIds = new Set(nvidiaProvider.models.map((m) => m.id));

test("#2373: NVIDIA NIM registry gains the newly-observed chat-completions models", () => {
  for (const id of [
    "abacusai/dracarys-llama-3.1-70b-instruct",
    "google/gemma-2-2b-it",
    "google/gemma-3n-e2b-it",
    "meta/llama-3.1-8b-instruct",
    "meta/llama-3.2-11b-vision-instruct",
    "meta/llama-4-maverick-17b-128e-instruct",
    "meta/llama-guard-4-12b",
    "mistralai/ministral-14b-instruct-2512",
    "mistralai/mistral-medium-3.5-128b",
    "mistralai/mistral-nemotron",
    "mistralai/mixtral-8x7b-instruct-v0.1",
    "nvidia/ising-calibration-1-35b-a3b",
    "nvidia/llama-3.1-nemoguard-8b-content-safety",
    "nvidia/llama-3.3-nemotron-super-49b-v1.5",
    "nvidia/nemotron-3-nano-30b-a3b",
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
    "nvidia/nemotron-nano-12b-v2-vl",
    "nvidia/nvidia-nemotron-nano-9b-v2",
    "qwen/qwen3-next-80b-a3b-instruct",
    "sarvamai/sarvam-m",
    "stockmark/stockmark-2-100b-instruct",
    "upstage/solar-10.7b-instruct",
  ]) {
    assert.ok(modelIds.has(id), `expected nvidia registry to include ${id}`);
  }
});

test("#2373: reasoning-capable NVIDIA-hosted models are flagged supportsReasoning", () => {
  const reasoningIds = [
    "nvidia/ising-calibration-1-35b-a3b",
    "nvidia/nemotron-3-nano-30b-a3b",
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
    "nvidia/nemotron-nano-12b-v2-vl",
    "nvidia/nvidia-nemotron-nano-9b-v2",
    "qwen/qwen3-next-80b-a3b-instruct",
  ];
  for (const id of reasoningIds) {
    const model = nvidiaProvider.models.find((m) => m.id === id);
    assert.ok(model, `model ${id} must exist`);
    assert.equal(model?.supportsReasoning, true, `${id} must be supportsReasoning: true`);
  }
});

test("#2373/#3329: minimaxai/minimax-m3 stays excluded from the nvidia tier", () => {
  assert.ok(
    !modelIds.has("minimaxai/minimax-m3"),
    "minimaxai/minimax-m3 must not be re-added to the nvidia registry (404 upstream, #3329)"
  );
  // sanity: the working sibling stays listed
  assert.ok(modelIds.has("minimaxai/minimax-m2.7"), "minimaxai/minimax-m2.7 stays available");
});

test("#2373: non-chat model kinds (NER/diffusion) from the upstream PR are not ported into the chat registry", () => {
  assert.ok(
    !modelIds.has("nvidia/gliner-pii"),
    "nvidia/gliner-pii is an NER/PII tagger, not a chat-completions model"
  );
  assert.ok(
    !modelIds.has("google/diffusiongemma-26b-a4b-it"),
    "google/diffusiongemma-26b-a4b-it is a diffusion model, not a chat-completions model"
  );
});
