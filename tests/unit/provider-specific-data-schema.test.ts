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

test("provider schemas accept boolean requestDefaults.context1m for CC-compatible providers", () => {
  const created = createProviderSchema.safeParse({
    provider: "anthropic-compatible-cc-demo",
    apiKey: "token",
    name: "CC Compatible",
    providerSpecificData: {
      requestDefaults: {
        context1m: true,
      },
    },
  });
  const updated = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      requestDefaults: {
        context1m: false,
      },
    },
  });

  assert.equal(created.success, true);
  assert.equal(updated.success, true);
});

test("provider schemas reject non-boolean requestDefaults.context1m values", () => {
  const created = createProviderSchema.safeParse({
    provider: "anthropic-compatible-cc-demo",
    apiKey: "token",
    name: "CC Compatible",
    providerSpecificData: {
      requestDefaults: {
        context1m: "yes",
      },
    },
  });
  const updated = updateProviderConnectionSchema.safeParse({
    providerSpecificData: {
      requestDefaults: {
        context1m: 1,
      },
    },
  });

  assert.equal(created.success, false);
  assert.equal(updated.success, false);
});
