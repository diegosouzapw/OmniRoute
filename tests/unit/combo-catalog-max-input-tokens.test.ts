import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-combo-catalog-max-input-tokens-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "combo-max-input-test-secret";
// Each build below is a cold catalog build, bounded by CATALOG_BUILD_TIMEOUT_MS (8s by
// default, #12627); on a loaded runner the bound trips and the response is a 503 instead of
// the metadata under test. Pin it out of the way exactly like 12058 does.
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const {
  buildAliasMaps,
  getComboTargetModelId,
  prefixRoutesToProvider,
  prefixRoutesToCanonicalProvider,
} = await import("../../src/app/api/v1/models/catalogProviderMaps.ts");

describe("Combo catalog max_input_tokens and provider prefix stripping", () => {
  after(() => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("prefixRoutesToCanonicalProvider recognizes aliases resolving to their canonical provider (#13994)", () => {
    // "opencode" routes to canonical "opencode-zen" -- only the alias-aware
    // variant used by the combo prefix-stripping path recognizes this.
    assert.equal(prefixRoutesToCanonicalProvider("opencode", "opencode"), true);
    assert.equal(prefixRoutesToCanonicalProvider("oc", "opencode"), true);
    assert.equal(prefixRoutesToCanonicalProvider("opencode-zen", "opencode"), true);
    // unrelated prefix does not route to openrouter
    assert.equal(prefixRoutesToCanonicalProvider("nvidia", "openrouter"), false);
  });

  it("prefixRoutesToProvider (catalog.ts anti-collision guard) stays strict for self-aliased no-auth providers", () => {
    // #11433/7db430a3: the guard at catalog.ts:1121/1896 must keep failing
    // for a self-aliased provider whose id differs from its canonical
    // routing target, or the catalog would start publishing a
    // provider-prefixed id ("opencode/<model>") that actually routes to a
    // DIFFERENT provider ("opencode-zen") at request time.
    assert.equal(prefixRoutesToProvider("opencode", "opencode"), false);
    assert.equal(prefixRoutesToProvider("opencode-zen", "opencode-zen"), true);
    assert.equal(prefixRoutesToProvider("nvidia", "openrouter"), false);
  });

  it("getComboTargetModelId strips opencode/ prefix from target model string", () => {
    const maps = buildAliasMaps();
    const resolved = getComboTargetModelId(maps, {
      providerId: "opencode",
      modelStr: "opencode/nemotron-3-ultra-free",
    });

    assert.ok(resolved);
    assert.equal(resolved?.providerId, "opencode-zen");
    assert.equal(resolved?.modelId, "nemotron-3-ultra-free");
  });

  it("builds combo metadata with 1M max_input_tokens for 1M targets and explicit context", async () => {
    await providersDb.createProviderConnection({
      provider: "opencode",
      authType: "apikey",
      name: "opencode-test-conn",
      apiKey: "opencode-test-key",
      isActive: true,
      testStatus: "active",
      providerSpecificData: {},
    });

    await combosDb.createCombo({
      name: "free-1m-test-combo",
      strategy: "priority",
      context_length: 1000000,
      models: [
        {
          model: "opencode/nemotron-3-ultra-free",
          providerId: "opencode",
        },
      ],
    });

    catalog.__resetCatalogBuilderRunsForTest();

    const response = await catalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/v1/models")
    );
    assert.equal(response.status, 200);

    const body = (await response.json()) as { data: Array<Record<string, unknown>> };
    const combo = body.data.find((item) => item.id === "free-1m-test-combo");

    assert.ok(combo, "combo should exist in models list");
    assert.equal(combo?.context_length, 1000000, "context_length should be 1,000,000");
    assert.equal(
      combo?.max_input_tokens,
      1000000,
      "max_input_tokens should be 1,000,000, not 200,000"
    );
  });

  it("clamps max_input_tokens to explicit context_length when targets have larger limits", async () => {
    await combosDb.createCombo({
      name: "clamped-target-500k-combo",
      strategy: "priority",
      context_length: 500000,
      models: [
        {
          model: "opencode/nemotron-3-ultra-free",
          providerId: "opencode",
        },
      ],
    });

    catalog.__resetCatalogBuilderRunsForTest();

    const response = await catalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/v1/models")
    );
    assert.equal(response.status, 200);

    const body = (await response.json()) as { data: Array<Record<string, unknown>> };
    const combo = body.data.find((item) => item.id === "clamped-target-500k-combo");

    assert.ok(combo);
    assert.equal(combo?.context_length, 500000);
    assert.equal(combo?.max_input_tokens, 500000);
  });
});
