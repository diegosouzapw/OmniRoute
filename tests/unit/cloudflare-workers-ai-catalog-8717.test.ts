/**
 * #8717 — Cloudflare Workers AI free catalog must not advertise dead model IDs.
 *
 * Four of the original six free-catalog entries return 400/403/410 from
 * Workers AI (`No such model`, deprecated, or forbidden). #8763 added live
 * replacements but left the dead IDs in place — free-model routing / combo
 * builders still pick them and burn quota on guaranteed failures.
 *
 * Regression: dead IDs absent from FREE_MODEL_BUDGETS + cloudflare-ai registry;
 * live replacements present; 30M monthlyTokens budget stays on the live
 * Llama 3.3 70B FP8 Fast entry (poolKey cloudflare-ai dedupes by max).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";
import { cloudflare_aiProvider } from "../../open-sse/config/providers/registry/cloudflare-ai/index.ts";

const DEAD_CLOUDFLARE_MODEL_IDS = [
  "@cf/meta/llama-3.3-70b-instruct",
  "@cf/meta/llama-3.1-8b-instruct",
  "@cf/google/gemma-3-12b-it",
  "@cf/qwen/qwen2.5-coder-15b-instruct",
] as const;

const LIVE_CLOUDFLARE_MODEL_IDS = [
  "@cf/mistral/mistral-7b-instruct-v0.2-lora",
  "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
  "@cf/qwen/qwen2.5-coder-32b-instruct",
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/meta/llama-3.2-3b-instruct",
  "@cf/qwen/qwq-32b",
  "@cf/zai-org/glm-4.7-flash",
  "@cf/moonshotai/kimi-k2.6",
  "@cf/google/gemma-4-26b-a4b-it",
] as const;

function cloudflareCatalogIds(): string[] {
  return FREE_MODEL_BUDGETS.filter((m) => m.provider === "cloudflare-ai").map((m) => m.modelId);
}

function cloudflareRegistryIds(): string[] {
  assert.equal(cloudflare_aiProvider.id, "cloudflare-ai");
  return (cloudflare_aiProvider.models ?? []).map((m) => m.id);
}

test("#8717: FREE_MODEL_BUDGETS must not list dead Cloudflare Workers AI model IDs", () => {
  const ids = cloudflareCatalogIds();
  for (const dead of DEAD_CLOUDFLARE_MODEL_IDS) {
    assert.equal(
      ids.includes(dead),
      false,
      `dead model ${dead} must be removed from freeModelCatalog (still present)`
    );
  }
});

test("#8717: FREE_MODEL_BUDGETS must list live Cloudflare Workers AI replacements", () => {
  const ids = cloudflareCatalogIds();
  for (const live of LIVE_CLOUDFLARE_MODEL_IDS) {
    assert.ok(ids.includes(live), `live model ${live} missing from freeModelCatalog`);
  }
});

test("#8717: cloudflare-ai registry must not list dead model IDs", () => {
  const ids = cloudflareRegistryIds();
  for (const dead of DEAD_CLOUDFLARE_MODEL_IDS) {
    assert.equal(
      ids.includes(dead),
      false,
      `dead model ${dead} must be removed from cloudflare-ai registry (still present)`
    );
  }
});

test("#8717: cloudflare-ai registry must list live replacements", () => {
  const ids = cloudflareRegistryIds();
  for (const live of LIVE_CLOUDFLARE_MODEL_IDS) {
    assert.ok(ids.includes(live), `live model ${live} missing from cloudflare-ai registry`);
  }
});

test("#8717: 30M monthlyTokens budget moves to live Llama 3.3 70B FP8 Fast", () => {
  const fp8 = FREE_MODEL_BUDGETS.find(
    (m) =>
      m.provider === "cloudflare-ai" && m.modelId === "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
  );
  assert.ok(fp8, "fp8-fast entry must exist");
  assert.equal(
    fp8.monthlyTokens,
    30_000_000,
    "Neurons/day free budget (~30M tok/mo) must stay on the live Llama 3.3 entry"
  );

  // No other cloudflare-ai catalog row should still claim the 30M (poolKey dedupes by max,
  // but advertising it on a dead id was the original bug surface).
  const withBudget = FREE_MODEL_BUDGETS.filter(
    (m) => m.provider === "cloudflare-ai" && m.monthlyTokens === 30_000_000
  );
  assert.equal(withBudget.length, 1);
  assert.equal(withBudget[0].modelId, "@cf/meta/llama-3.3-70b-instruct-fp8-fast");
});
