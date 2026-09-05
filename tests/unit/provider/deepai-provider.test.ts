import { describe, it } from "node:test";
import { ok, equal } from "node:assert/strict";

describe("DeepAI provider registration", () => {
  it("is listed in IMAGE_ONLY_PROVIDER_IDS", async () => {
    const { IMAGE_ONLY_PROVIDER_IDS } = await import("@/shared/constants/providers");
    ok(IMAGE_ONLY_PROVIDER_IDS.has("deepai"), "deepai should be in IMAGE_ONLY_PROVIDER_IDS");
  });

  it("has a catalog entry in specialty-media", async () => {
    const { APIKEY_PROVIDERS_SPECIALTY } = await import(
      "@/shared/constants/providers/apikey/specialty-media"
    );
    ok(APIKEY_PROVIDERS_SPECIALTY.deepai, "deepai catalog entry should exist");
    equal(APIKEY_PROVIDERS_SPECIALTY.deepai.id, "deepai");
    equal(APIKEY_PROVIDERS_SPECIALTY.deepai.icon, "psychology");
  });

  it("has a registry entry", async () => {
    const { deepaiProvider } = await import(
      "@/../open-sse/config/providers/registry/deepai/index"
    );
    ok(deepaiProvider, "deepai registry entry should exist");
    equal(deepaiProvider.id, "deepai");
    equal(deepaiProvider.authType, "apikey");
    ok(deepaiProvider.models?.length >= 1, "should have at least one model");
  });
});
