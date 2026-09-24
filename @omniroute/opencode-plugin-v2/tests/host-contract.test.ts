import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildProviderPayload, collectCatalog } from "../src/catalog.js";

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false,
};

const rawModel = {
  id: "af/chat-latest",
  capabilities: { effort_tiers: ["low", "high"] },
};

async function publish() {
  const collected = await collectCatalog(baseOpts, {
    fetcher: async () => [rawModel],
    combosFetcher: async () => [],
  });
  const payload = buildProviderPayload(collected, baseOpts);
  assert.equal(collected.counts.models, 1);
  const model = payload.models[0] as unknown as Record<string, any>;
  assert.ok(model, "model must be published");
  return { info: payload.info as unknown as Record<string, any>, model };
}

describe("stable payload", () => {
  it("publishes one provider info with endpoint plus key", async () => {
    const { info } = await publish();
    assert.equal(info.id, "omniroute");
    assert.equal(info.package, "@opencode/ai/providers/openai-compatible");
    assert.equal((info.settings as Record<string, unknown>).baseURL, "https://gw.example.com/v1");
    assert.equal((info.settings as Record<string, unknown>).apiKey, "k");
  });

  it("publishes each model with package, endpoint, variants", async () => {
    const { model } = await publish();
    assert.equal(model.package, "@opencode/ai/providers/openai-compatible");
    assert.equal(
      (model.settings as Record<string, unknown>).baseURL,
      "https://gw.example.com/v1"
    );
    assert.ok(model.headers !== undefined);
    const variants = model.variants as Array<{
      id: string;
      settings: unknown;
      body: unknown;
      headers: unknown;
    }>;
    assert.deepEqual(
      variants.map((v) => v.id),
      ["low", "high"]
    );
    for (const variant of variants) {
      assert.deepEqual(variant.settings, { reasoningEffort: variant.id });
      assert.deepEqual(variant.body, { reasoningEffort: variant.id });
      assert.deepEqual(variant.headers, {});
    }
  });
});
