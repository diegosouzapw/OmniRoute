import test from "node:test";
import assert from "node:assert/strict";

const { createProviderSchema, providersBatchTestSchema } =
  await import("../../src/shared/validation/schemas.ts");
const { providerAllowsOptionalApiKey } = await import("../../src/shared/constants/providers.ts");

// #11117: Pollinations no longer serves anonymous requests (401 without a key),
// so it left EXPLICIT_OPTIONAL_APIKEY_PROVIDER_IDS — key is now required.
test("Pollinations requires an API key", () => {
  assert.equal(providerAllowsOptionalApiKey("pollinations"), false);
});

test("createProviderSchema rejects Pollinations without apiKey", () => {
  const result = createProviderSchema.safeParse({
    provider: "pollinations",
    name: "Pollinations",
  });

  assert.equal(result.success, false);
});

test("providersBatchTestSchema accepts cloud-agent batch mode", () => {
  const result = providersBatchTestSchema.safeParse({
    mode: "cloud-agent",
  });

  assert.equal(result.success, true);
});
