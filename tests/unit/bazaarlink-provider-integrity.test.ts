import { describe, it } from "node:test";
import assert from "node:assert";

describe("bazaarlink provider entry in APIKEY_PROVIDERS", () => {
  it("exists with required fields", async () => {
    const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    const p = (APIKEY_PROVIDERS as Record<string, Record<string, unknown>>)["bazaarlink"];
    assert.ok(p, "bazaarlink must exist in APIKEY_PROVIDERS");
    assert.equal(p.id, "bazaarlink");
    assert.equal(p.alias, "bzl");
    assert.equal(p.name, "BazaarLink");
    assert.equal(p.icon, "storefront");
    assert.equal(p.color, "#6366F1");
    assert.equal(p.textIcon, "BZ");
    assert.equal(p.website, "https://bazaarlink.ai");
  });

  it("advertises the free tier and includes authHint", async () => {
    const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    const p = (
      APIKEY_PROVIDERS as Record<
        string,
        { hasFree?: boolean; authHint?: string; freeNote?: string; apiHint?: string }
      >
    )["bazaarlink"];
    assert.equal(p.hasFree, true, "bazaarlink should advertise a free tier");
    assert.ok(p.authHint, "bazaarlink must have an authHint field");
    assert.ok(p.authHint.includes("sk-bl-"), "authHint should mention the sk-bl- key prefix");
    assert.ok(p.freeNote, "bazaarlink must have a freeNote describing the free tier");
    assert.ok(p.apiHint, "bazaarlink must have an apiHint");
    assert.ok(p.apiHint.includes("bazaarlink.ai"), "apiHint should reference bazaarlink.ai");
  });

  it("is registered in the execution registry", async () => {
    const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
    const entry = getRegistryEntry("bazaarlink");
    assert.ok(entry, "bazaarlink must have a registry entry");
    assert.equal(entry.format, "openai");
    assert.equal(entry.authType, "apikey");
    assert.ok(entry.baseUrl, "registry entry must have a baseUrl");
    assert.ok(entry.modelsUrl, "registry entry must have a modelsUrl");
    assert.ok(
      entry.models && entry.models.length > 0,
      "registry entry must list at least one model"
    );
    assert.ok(
      entry.models.some((m: { id: string }) => m.id === "auto:free"),
      "registry must include auto:free model"
    );
    assert.ok(
      entry.models.some((m: { id: string }) => m.id === "mimo-v2.5-pro"),
      "registry must include mimo-v2.5-pro"
    );
  });

  it("is resolvable through the static catalog for managed connections", async () => {
    const { resolveStaticProviderCatalogEntry } =
      await import("../../src/lib/providers/catalog.ts");
    const entry = resolveStaticProviderCatalogEntry("bazaarlink");
    assert.ok(entry, "bazaarlink must resolve through the static provider catalog");
    assert.ok(entry.id, "bazaarlink", "resolved entry id must match");
    assert.equal(entry.category, "apikey", "bazaarlink must be in the apikey category");
  });

  it("passes isManagedProviderConnectionId check so connections can be created", async () => {
    const { isManagedProviderConnectionId } = await import("../../src/lib/providers/catalog.ts");
    const result = isManagedProviderConnectionId("bazaarlink");
    assert.equal(result, true, "bazaarlink must pass isManagedProviderConnectionId");
  });

  it("supports bulk API key add (not excluded)", async () => {
    const { supportsBulkApiKey } = await import("../../src/shared/constants/providers.ts");
    const result = supportsBulkApiKey("bazaarlink");
    assert.equal(result, true, "bazaarlink must support bulk API key add");
  });
});
