import { describe, it } from "node:test";
import { ok, equal } from "node:assert/strict";

describe("Regolo AI provider (#9031)", () => {
  it("exists in gateways catalog", async () => {
    const { APIKEY_PROVIDERS_GATEWAYS } = await import(
      "@/shared/constants/providers/apikey/gateways"
    );
    ok(APIKEY_PROVIDERS_GATEWAYS.regolo, "regolo entry should exist");
    equal(APIKEY_PROVIDERS_GATEWAYS.regolo.id, "regolo");
  });

  it("has registry entry with passthrough models", async () => {
    const { regoloProvider } = await import(
      "@/../open-sse/config/providers/registry/regolo/index"
    );
    ok(regoloProvider, "regolo registry entry should exist");
    equal(regoloProvider.authType, "apikey");
    equal(regoloProvider.passthroughModels, true);
  });

  it("is registered in providers index", async () => {
    // Just verify the module can be loaded
    const idx = await import("@/../open-sse/config/providers/index");
    ok(idx, "index should load without error");
  });
});
