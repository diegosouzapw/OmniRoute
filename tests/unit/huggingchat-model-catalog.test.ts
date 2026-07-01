import test from "node:test";
import assert from "node:assert/strict";

import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";
import { huggingchatProvider } from "../../open-sse/config/providers/registry/huggingchat/index.ts";

const HUGGINGCHAT_CONCRETE_MODELS = [
  "baidu/ERNIE-4.5-VL-424B-A47B-Base-PT",
  "CohereLabs/c4ai-command-r7b-12-2024",
  "CohereLabs/command-a-reasoning-08-2025",
  "CohereLabs/command-a-vision-07-2025",
  "deepseek-ai/DeepSeek-V4-Pro",
  "deepseek-ai/DeepSeek-V4-Flash",
  "google/gemma-4-31B-it",
  "google/gemma-4-26B-A4B-it",
  "inclusionAI/Ling-2.6-1T",
  "meta-llama/Llama-4-Scout-17B-16E-Instruct",
  "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
  "MiniMaxAI/MiniMax-M3",
  "moonshotai/Kimi-K2.7-Code",
  "moonshotai/Kimi-K2.6",
  "nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4",
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "Qwen/Qwen3.5-122B-A10B",
  "Qwen/Qwen3.5-397B-A17B",
  "Qwen/Qwen3.6-27B",
  "Qwen/Qwen3.6-35B-A3B",
  "stepfun-ai/Step-3.7-Flash",
  "XiaomiMiMo/MiMo-V2.5-Pro",
  "zai-org/GLM-5.2",
];

const MULTIMODAL_MODELS = new Set([
  "baidu/ERNIE-4.5-VL-424B-A47B-Base-PT",
  "CohereLabs/command-a-vision-07-2025",
  "google/gemma-4-31B-it",
  "google/gemma-4-26B-A4B-it",
  "meta-llama/Llama-4-Scout-17B-16E-Instruct",
  "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
  "MiniMaxAI/MiniMax-M3",
  "moonshotai/Kimi-K2.7-Code",
  "moonshotai/Kimi-K2.6",
  "Qwen/Qwen3.5-122B-A10B",
  "Qwen/Qwen3.5-397B-A17B",
  "Qwen/Qwen3.6-27B",
  "Qwen/Qwen3.6-35B-A3B",
  "stepfun-ai/Step-3.7-Flash",
]);

const TOOL_CALLING_MODELS = new Set([
  "CohereLabs/c4ai-command-r7b-12-2024",
  "CohereLabs/command-a-reasoning-08-2025",
  "deepseek-ai/DeepSeek-V4-Pro",
  "deepseek-ai/DeepSeek-V4-Flash",
  "google/gemma-4-31B-it",
  "google/gemma-4-26B-A4B-it",
  "inclusionAI/Ling-2.6-1T",
  "meta-llama/Llama-4-Scout-17B-16E-Instruct",
  "MiniMaxAI/MiniMax-M3",
  "moonshotai/Kimi-K2.7-Code",
  "moonshotai/Kimi-K2.6",
  "nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4",
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "Qwen/Qwen3.5-122B-A10B",
  "Qwen/Qwen3.5-397B-A17B",
  "Qwen/Qwen3.6-27B",
  "Qwen/Qwen3.6-35B-A3B",
  "stepfun-ai/Step-3.7-Flash",
  "XiaomiMiMo/MiMo-V2.5-Pro",
  "zai-org/GLM-5.2",
]);

const REASONING_MODELS = new Set([
  "deepseek-ai/DeepSeek-V4-Pro",
  "MiniMaxAI/MiniMax-M3",
  "moonshotai/Kimi-K2.7-Code",
  "nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4",
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "zai-org/GLM-5.2",
]);

const REMOVED_HUGGINGCHAT_MODELS = [
  "mistralai/Mistral-Small-24B-Instruct-2501",
  "mistralai/Mistral-Small-3.1-24B-Instruct-2503",
  "Qwen/Qwen3-235B-A22B",
  "Qwen/Qwen3-235B-A22B-Instruct-2507",
  "meta-llama/Llama-3.3-70B-Instruct",
  "Qwen/Qwen2.5-72B-Instruct",
  "deepseek-ai/DeepSeek-R1",
];

test("huggingchat registry contains only final concrete production models", () => {
  const modelIds = huggingchatProvider.models.map((model) => model.id);

  assert.deepEqual(modelIds, HUGGINGCHAT_CONCRETE_MODELS);
  assert.ok(!modelIds.includes("omni"), "omni is a router entry, not a concrete model");
  for (const removedModel of REMOVED_HUGGINGCHAT_MODELS) {
    assert.ok(!modelIds.includes(removedModel), `${removedModel} should not be registered`);
  }
});

test("huggingchat registry preserves supported boolean capabilities", () => {
  const byId = new Map(huggingchatProvider.models.map((model) => [model.id, model]));

  for (const id of HUGGINGCHAT_CONCRETE_MODELS) {
    const model = byId.get(id);
    assert.ok(model, `${id} should be registered`);
    assert.equal(model.supportsVision === true, MULTIMODAL_MODELS.has(id), `${id} vision flag`);
    assert.equal(model.toolCalling === true, TOOL_CALLING_MODELS.has(id), `${id} tools flag`);
    assert.equal(
      model.supportsReasoning === true,
      REASONING_MODELS.has(id),
      `${id} reasoning flag`
    );
  }
});

test("huggingchat free catalog tracks final concrete models without router budget duplication", () => {
  const freeModelIds = FREE_MODEL_BUDGETS.filter((budget) => budget.provider === "huggingchat").map(
    (budget) => budget.modelId
  );

  assert.deepEqual(freeModelIds, HUGGINGCHAT_CONCRETE_MODELS);
  assert.ok(!freeModelIds.includes("omni"), "omni is a router entry, not a free-model budget");
  for (const removedModel of REMOVED_HUGGINGCHAT_MODELS) {
    assert.ok(!freeModelIds.includes(removedModel), `${removedModel} should not be advertised`);
  }
});
