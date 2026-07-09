import test from "node:test";
import assert from "node:assert/strict";

const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
const { getModelInfoCore } = await import("../../open-sse/services/model.ts");
const { DEFAULT_PRICING_INFERENCE } =
  await import("../../src/shared/constants/pricing/inference-hosts.ts");

const INCLUDED_DIRECT_MODELS = [
  "hf:openai/gpt-oss-120b",
  "hf:zai-org/GLM-5.2",
  "hf:moonshotai/Kimi-K2.7-Code",
  "hf:Qwen/Qwen3.6-27B",
  "hf:MiniMaxAI/MiniMax-M3",
  "hf:zai-org/GLM-4.7-Flash",
  "hf:nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-NVFP4",
] as const;

const SYNTHETIC_MODEL_ALIASES = {
  "syn:gpt-oss-120b": "hf:openai/gpt-oss-120b",
  "syn:large:text": "hf:zai-org/GLM-5.2",
  "syn:large:vision": "hf:moonshotai/Kimi-K2.7-Code",
  "syn:small:vision": "hf:Qwen/Qwen3.6-27B",
  "syn:minimax-m3": "hf:MiniMaxAI/MiniMax-M3",
  "syn:small:text": "hf:zai-org/GLM-4.7-Flash",
  "syn:nemotron-3-super": "hf:nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-NVFP4",
} as const;

function syntheticEntry() {
  const entry = getRegistryEntry("synthetic");
  assert.ok(entry, "synthetic provider should be registered");
  return entry;
}

test("synthetic provider targets api.synthetic.new", () => {
  const entry = syntheticEntry();
  assert.equal(entry.baseUrl, "https://api.synthetic.new/openai/v1/chat/completions");
  assert.equal(entry.modelsUrl, "https://api.synthetic.new/openai/v1/models");
  assert.equal(entry.passthroughModels, true);
});

test("synthetic static catalog tracks the included direct models", () => {
  const ids = syntheticEntry().models.map((model) => model.id);
  assert.deepEqual(ids, INCLUDED_DIRECT_MODELS);
});

test("synthetic catalog carries current context and capability metadata", () => {
  const models = new Map(syntheticEntry().models.map((model) => [model.id, model]));

  assert.equal(models.get("hf:zai-org/GLM-5.2")?.contextLength, 524288);
  assert.equal(models.get("hf:zai-org/GLM-4.7-Flash")?.contextLength, 196608);
  assert.equal(models.get("hf:openai/gpt-oss-120b")?.contextLength, 131072);

  for (const id of INCLUDED_DIRECT_MODELS) {
    assert.equal(models.get(id)?.toolCalling, true, `${id} should advertise tool calling`);
    assert.equal(models.get(id)?.supportsReasoning, true, `${id} should advertise reasoning`);
    assert.equal(models.get(id)?.maxOutputTokens, 65536, `${id} should advertise max output`);
  }

  for (const id of [
    "hf:moonshotai/Kimi-K2.7-Code",
    "hf:Qwen/Qwen3.6-27B",
    "hf:MiniMaxAI/MiniMax-M3",
  ]) {
    assert.equal(models.get(id)?.supportsVision, true, `${id} should advertise vision`);
  }
});

test("synthetic catalog exposes short aliases for the provider-native ids", async () => {
  const models = new Map(syntheticEntry().models.map((model) => [model.id, model]));

  for (const [alias, canonicalId] of Object.entries(SYNTHETIC_MODEL_ALIASES)) {
    assert.deepEqual(models.get(canonicalId)?.aliases, [alias]);

    const resolved = await getModelInfoCore(`synthetic/${alias}`, null);
    assert.equal(resolved.provider, "synthetic");
    assert.equal(resolved.model, canonicalId);
  }
});

test("synthetic pricing covers every curated static model", () => {
  const pricing = DEFAULT_PRICING_INFERENCE.synthetic;
  for (const id of INCLUDED_DIRECT_MODELS) {
    assert.ok(pricing[id], `missing synthetic pricing for ${id}`);
  }

  assert.deepEqual(pricing["hf:zai-org/GLM-5.2"], {
    input: 1.4,
    output: 4.4,
    cached: 1.4,
    reasoning: 0,
    cache_creation: 0,
  });
});
