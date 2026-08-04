import test from "node:test";
import assert from "node:assert/strict";

const providerPageUtils = await import(
  "../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts"
);

test("default provider view hides cross-cutting sections that duplicate primary cards", () => {
  const { shouldShowProviderSection } = providerPageUtils;

  assert.equal(shouldShowProviderSection("oauth", null, false), true);
  assert.equal(shouldShowProviderSection("free", null, false), false);
  assert.equal(shouldShowProviderSection("webfetch", null, false), false);
  assert.equal(shouldShowProviderSection("webfetch", "webfetch", false), true);
  assert.equal(shouldShowProviderSection("free", null, true), true);
  assert.equal(shouldShowProviderSection("oauth", null, true), false);
});
