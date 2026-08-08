import assert from "node:assert/strict";
import test from "node:test";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");

const providers = [
  ["ofoxai", "https://api.ofox.ai/v1/chat/completions"],
  ["zerolimitai", "https://www.zerolimitai.com/api/v1/chat/completions"],
  ["chatanywhere", "https://api.chatanywhere.org/v1/chat/completions"],
  ["helyxai", "https://helyxai.space/v1/chat/completions"],
  ["auriko", "https://api.auriko.ai/v1/chat/completions"],
  ["poixe-ai", "https://api.poixe.com/v1/chat/completions"],
  ["naga-ai", "https://api.naga.ac/v1/chat/completions"],
  ["chat-oripe", "https://api.oriper.com/v1/chat/completions"],
] as const;

for (const [id, endpoint] of providers) {
  test(`${id} is wired through registry, metadata, endpoint and default executor`, () => {
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
    assert.ok(getExecutor(id) instanceof DefaultExecutor);
    assert.equal(isValidModel(id, "future/live-catalog-model"), true);
    assert.deepEqual(registry.models, []);
  });
}

test("Wave 3 metadata preserves the audited legal, quota and privacy warnings", () => {
  assert.match(APIKEY_PROVIDERS.chatanywhere.freeNote ?? "", /commercial traffic/i);
  assert.match(APIKEY_PROVIDERS.zerolimitai.freeNote ?? "", /3 and 7 days/i);
  assert.match(APIKEY_PROVIDERS.helyxai.freeNote ?? "", /100,000 tokens\/day/i);
  assert.match(APIKEY_PROVIDERS.auriko.freeNote ?? "", /not a free-token pool/i);
  assert.match(APIKEY_PROVIDERS["poixe-ai"].freeNote ?? "", /2 RPM\/5 RPD/i);
  assert.match(APIKEY_PROVIDERS["naga-ai"].freeNote ?? "", /training/i);
  assert.match(APIKEY_PROVIDERS["chat-oripe"].freeNote ?? "", /unconfirmed/i);
});
