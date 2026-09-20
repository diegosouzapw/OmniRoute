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

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const contextOverridesDb = await import("../../src/lib/db/modelContextOverrides.ts");
const capabilities = await import("../../src/lib/modelCapabilities.ts");
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

  it("retains 1M context and input capacity for claude-opus-5 despite auto:discovery overrides", async () => {
    // Simulate flawed discovery pinning 128000 (output limit conflation)
    contextOverridesDb.setModelContextOverride("claude", "claude-opus-5", 128000, "auto:discovery");

    const resolved = capabilities.getResolvedModelCapabilities({
      provider: "claude",
      model: "claude-opus-5",
    });
    assert.equal(resolved.contextWindow, 1000000, "contextWindow must remain 1M");
    assert.equal(resolved.maxInputTokens, 1000000, "maxInputTokens must remain 1M");

    const gateCap = capabilities.resolveInputTokenCapForGate(
      { provider: "claude", model: "claude-opus-5" },
      { isCombo: true }
    );
    assert.equal(gateCap, 1000000, "combo gate cap must remain 1M");

    await providersDb.createProviderConnection({
      provider: "claude",
      authType: "oauth",
      name: "claude-test-conn",
      isActive: true,
      testStatus: "active",
      providerSpecificData: {},
    });

    await combosDb.createCombo({
      name: "claude-opus-5-combo-test",
      strategy: "priority",
      context_length: 1000000,
      models: [
        {
          model: "claude/claude-opus-5",
          providerId: "claude",
        },
      ],
    });

    const response = await catalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/v1/models")
    );
    assert.equal(response.status, 200);

    const body = (await response.json()) as { data: Array<Record<string, unknown>> };
    const combo = body.data.find((item) => item.id === "claude-opus-5-combo-test");

    assert.ok(combo, "combo should exist in models list");
    assert.equal(combo?.context_length, 1000000);
    assert.equal(combo?.max_input_tokens, 1000000, "combo max_input_tokens must be 1M, not 128000");
  });
});
