import test from "node:test";
import assert from "node:assert/strict";

const { OAUTH_PROVIDERS, getProviderById } = await import(
  "../../src/shared/constants/providers.ts"
);

test("Qoder provider display label is 'Qoder' (not 'Qoder AI')", () => {
  assert.equal((OAUTH_PROVIDERS as Record<string, { name: string }>).qoder.name, "Qoder");
});

test("getProviderById('qoder') resolves the renamed display label", () => {
  const provider = getProviderById("qoder");
  assert.ok(provider, "qoder provider should resolve");
  assert.equal(provider.name, "Qoder");
  assert.notEqual(provider.name, "Qoder AI");
});
