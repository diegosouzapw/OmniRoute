import test from "node:test";
import assert from "node:assert/strict";
import { REGISTRY } from "../../../open-sse/config/providers/index.ts";
import { FREE_MODEL_BUDGETS } from "../../../open-sse/config/freeModelCatalog.data.ts";

test("Cloudflare Workers AI free catalog matches registry active models", () => {
  const cfRegistry = REGISTRY["cloudflare-ai"];
  assert.ok(cfRegistry, "cloudflare-ai should be registered");

  const registryModelIds = new Set(cfRegistry.models.map((m) => m.id));

  // Active free models per the #8717 audit as landed in c7be8a4870 (#8804),
  // which superseded the earlier #8808 list: llama-3.3-70b-instruct and
  // gemma-3-12b-it were re-classified as dead (Workers AI 400/403/410) and
  // replaced by llama-3.3-70b-instruct-fp8-fast / gemma-4-26b-a4b-it, while
  // mistral-7b-instruct-v0.2-lora stayed active.
  const expectedModels = [
    "@cf/mistral/mistral-7b-instruct-v0.2-lora",
    "@cf/qwen/qwen2.5-coder-32b-instruct",
    "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
    "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "@cf/meta/llama-3.2-3b-instruct",
    "@cf/qwen/qwq-32b",
    "@cf/zai-org/glm-4.7-flash",
    "@cf/moonshotai/kimi-k2.6",
    "@cf/google/gemma-4-26b-a4b-it",
  ];

  for (const id of expectedModels) {
    assert.ok(registryModelIds.has(id), `registry should contain ${id}`);
  }

  // Dead model IDs should be removed (see #8717 comment in the registry file)
  const deadModels = [
    "@cf/meta/llama-3.3-70b-instruct",
    "@cf/meta/llama-3.1-8b-instruct",
    "@cf/google/gemma-3-12b-it",
    "@cf/qwen/qwen2.5-coder-15b-instruct",
  ];

  for (const id of deadModels) {
    assert.equal(registryModelIds.has(id), false, `registry should NOT contain dead model ${id}`);
  }

  const freeCatalogCfModels = FREE_MODEL_BUDGETS.filter((b) => b.provider === "cloudflare-ai").map(
    (b) => b.modelId
  );
  for (const id of deadModels) {
    assert.equal(
      freeCatalogCfModels.includes(id),
      false,
      `free catalog data should NOT contain dead model ${id}`
    );
  }
});
