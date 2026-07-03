import { describe, it } from "node:test";
import assert from "node:assert";

describe("kenari provider entry in APIKEY_PROVIDERS", () => {
  it("exists with required fields", async () => {
    const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    const p = (APIKEY_PROVIDERS as Record<string, Record<string, unknown>>)["kenari"];
    assert.ok(p, "kenari must exist in APIKEY_PROVIDERS");
    assert.equal(p.id, "kenari");
    assert.equal(p.alias, "kenari");
    assert.equal(p.name, "Kenari");
    assert.equal(p.icon, "router");
    assert.equal(p.color, "#B5362A");
    assert.equal(p.textIcon, "KN");
    assert.equal(p.website, "https://kenari.id");
    assert.equal(p.passthroughModels, true);
  });

  it("includes authHint mentioning the kn- key prefix", async () => {
    const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    const p = (APIKEY_PROVIDERS as Record<string, { authHint?: string; apiHint?: string }>)[
      "kenari"
    ];
    assert.ok(p.authHint, "kenari must have an authHint field");
    assert.ok(p.authHint.includes("kn-"), "authHint should mention the kn- key prefix");
    assert.ok(p.apiHint, "kenari must have an apiHint");
    assert.ok(p.apiHint.includes("kenari.id"), "apiHint should reference kenari.id");
  });

  it("is flagged as an aggregator gateway", async () => {
    const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");
    assert.ok(AGGREGATOR_PROVIDER_IDS.has("kenari"), "kenari must be in AGGREGATOR_PROVIDER_IDS");
  });

  it("is registered in the execution registry with a live model catalog", async () => {
    const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
    const entry = getRegistryEntry("kenari");
    assert.ok(entry, "kenari must have a registry entry");
    assert.equal(entry.format, "openai");
    assert.equal(entry.authType, "apikey");
    assert.equal(entry.baseUrl, "https://kenari.id/v1/chat/completions");
    assert.equal(entry.modelsUrl, "https://kenari.id/v1/models");
    assert.equal(entry.passthroughModels, true, "kenari serves its catalog via /v1/models");
  });

  it("is resolvable through the static catalog for managed connections", async () => {
    const { resolveStaticProviderCatalogEntry } =
      await import("../../src/lib/providers/catalog.ts");
    const entry = resolveStaticProviderCatalogEntry("kenari");
    assert.ok(entry, "kenari must resolve through the static provider catalog");
    assert.equal(entry.category, "apikey", "kenari must be in the apikey category");
  });

  it("passes isManagedProviderConnectionId check so connections can be created", async () => {
    const { isManagedProviderConnectionId } = await import("../../src/lib/providers/catalog.ts");
    assert.equal(isManagedProviderConnectionId("kenari"), true);
  });

  it("supports bulk API key add (not excluded)", async () => {
    const { supportsBulkApiKey } = await import("../../src/shared/constants/providers.ts");
    assert.equal(supportsBulkApiKey("kenari"), true);
  });
});
