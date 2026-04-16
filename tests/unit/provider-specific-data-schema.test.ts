import test from "node:test";
import assert from "node:assert/strict";

const { createProviderSchema, updateProviderConnectionSchema } =
  await import("../../src/shared/validation/schemas.ts");

test("provider schemas accept boolean openaiStoreEnabled in providerSpecificData", () => {
  const created = createProviderSchema.safeParse({
    provider: "codex",
    apiKey: "token",
    name: "Codex",
    providerSpecificData: {
      openaiStoreEnabled: true,
    },
  });
  const updated = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      openaiStoreEnabled: false,
    },
  });

  assert.equal(created.success, true);
  assert.equal(updated.success, true);
});

test("provider schemas reject non-boolean openaiStoreEnabled values", () => {
  const created = createProviderSchema.safeParse({
    provider: "codex",
    apiKey: "token",
    name: "Codex",
    providerSpecificData: {
      openaiStoreEnabled: "yes",
    },
  });
  const updated = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      openaiStoreEnabled: "no",
    },
  });

  assert.equal(created.success, false);
  assert.equal(updated.success, false);
});
