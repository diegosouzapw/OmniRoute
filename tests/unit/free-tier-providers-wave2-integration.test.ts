import assert from "node:assert/strict";
import test from "node:test";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");

const providers = [
  ["literouter", "https://api.literouter.com/v1/chat/completions", []],
  ["mnn-ai", "https://api.mnnai.ru/v1/chat/completions", []],
  ["meganova-ai", "https://api.meganova.ai/v1/chat/completions", []],
  ["mixlayer", "https://models.mixlayer.ai/v1/chat/completions", ["qwen/qwen3.5-4b-free"]],
  ["speka", "https://speka.me/v1/chat/completions", []],
  ["tokenreply", "https://api.tokenreply.com/v1/chat/completions", []],
  ["yolo-auto", "https://yolo-auto.com/v1/chat/completions", ["qwen3.6-35b-a3b"]],
  ["dxnt", "https://www.dxnt.com/v1/chat/completions", []],
  [
    "cloudcode-one",
    "https://api.cloudcode.one/v1/chat/completions",
    ["glm-4.7-flash", "glm-4.6v-flash"],
  ],
] as const;

for (const [id, endpoint, modelIds] of providers) {
  test(`${id} is wired through registry, metadata, endpoint and default executor`, async () => {
    const registry = REGISTRY[id];
    const metadata = APIKEY_PROVIDERS[id];

    assert.ok(registry);
    assert.ok(metadata);
    assert.equal(registry.id, id);
    assert.equal(registry.alias, id);
    assert.equal(registry.baseUrl, endpoint);
    assert.equal(PROVIDER_ENDPOINTS[id], endpoint);
    assert.equal(metadata.id, id);
    assert.equal(metadata.alias, id);
    assert.equal(metadata.hasFree, true);
    assert.equal(metadata.passthroughModels, true);
    assert.ok(typeof metadata.freeNote === "string" && metadata.freeNote.length > 0);
    assert.equal(AGGREGATOR_PROVIDER_IDS.has(id), true);
    assert.ok((await getExecutor(id)) instanceof DefaultExecutor);
    assert.equal(isValidModel(id, "future/live-catalog-model"), true);
    assert.deepEqual(
      registry.models.map((model) => model.id),
      modelIds
    );
  });
}

test("risk-sensitive metadata preserves the audited quota qualifications", () => {
  assert.match(APIKEY_PROVIDERS["mnn-ai"].apiHint ?? "", /jurisdiction.*privacy/i);
  assert.match(APIKEY_PROVIDERS["meganova-ai"].freeNote ?? "", /per-model quotas/i);
  assert.match(APIKEY_PROVIDERS["meganova-ai"].freeNote ?? "", /paid overage/i);
  assert.match(APIKEY_PROVIDERS.tokenreply.freeNote ?? "", /no fixed global free quota/i);
  assert.match(APIKEY_PROVIDERS["yolo-auto"].freeNote ?? "", /no numeric daily quota/i);
  assert.match(APIKEY_PROVIDERS["cloudcode-one"].freeNote ?? "", /credit or a coupon/i);
});
