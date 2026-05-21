import test from "node:test";
import assert from "node:assert/strict";

const { createProviderSchema, providersBatchTestSchema } =
  await import("../../src/shared/validation/schemas.ts");
const { providerAllowsOptionalApiKey } = await import("../../src/shared/constants/providers.ts");

test("Pollinations is treated as a keyless-capable provider", () => {
  assert.equal(providerAllowsOptionalApiKey("pollinations"), true);
});

test("createProviderSchema allows Pollinations without apiKey", () => {
  const result = createProviderSchema.safeParse({
    provider: "pollinations",
    name: "Pollinations",
  });

  assert.equal(result.success, true);
});

test("providersBatchTestSchema accepts cloud-agent batch mode", () => {
  const result = providersBatchTestSchema.safeParse({
    mode: "cloud-agent",
  });

  assert.equal(result.success, true);
});
