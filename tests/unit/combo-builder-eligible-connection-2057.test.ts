/**
 * tests/unit/combo-builder-eligible-connection-2057.test.ts
 *
 * Regression for upstream issue #2057: the combo builder's "active providers"
 * filter (src/app/(dashboard)/dashboard/combos/page.tsx::fetchData) only kept
 * connections whose `testStatus` was exactly "active" or "success". New
 * connections default `testStatus` to `null` until someone explicitly runs a
 * connection test (src/lib/db/providers.ts), so a freshly-added custom
 * provider was excluded from `activeProviders` — which meant
 * ModelSelectModal's loadCustomProviderModels() effect never fetched its
 * models, and the combo builder's model list stayed empty for that provider.
 *
 * Fix: `isEligibleActiveConnection` (src/lib/combos/builderDraft.ts) treats a
 * never-tested connection (`testStatus` null/undefined) as eligible too,
 * matching the "error only on explicit failure" semantics already used by
 * `deriveConnectionStatus` in src/lib/combos/builderOptions.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { isEligibleActiveConnection } from "../../src/lib/combos/builderDraft.ts";

test("isEligibleActiveConnection includes a never-tested (testStatus null) connection", () => {
  assert.equal(isEligibleActiveConnection({ testStatus: null }), true);
});

test("isEligibleActiveConnection includes a never-tested (testStatus undefined) connection", () => {
  assert.equal(isEligibleActiveConnection({}), true);
});

test("isEligibleActiveConnection includes explicit active/success/unknown statuses", () => {
  assert.equal(isEligibleActiveConnection({ testStatus: "active" }), true);
  assert.equal(isEligibleActiveConnection({ testStatus: "success" }), true);
  assert.equal(isEligibleActiveConnection({ testStatus: "unknown" }), true);
});

test("isEligibleActiveConnection excludes connections that were explicitly deactivated", () => {
  assert.equal(isEligibleActiveConnection({ isActive: false, testStatus: null }), false);
  assert.equal(isEligibleActiveConnection({ isActive: false, testStatus: "active" }), false);
});

test("isEligibleActiveConnection excludes connections with a known error/failed test status", () => {
  assert.equal(isEligibleActiveConnection({ testStatus: "error" }), false);
  assert.equal(isEligibleActiveConnection({ testStatus: "failed" }), false);
  assert.equal(isEligibleActiveConnection({ testStatus: "expired" }), false);
  assert.equal(isEligibleActiveConnection({ testStatus: "unavailable" }), false);
});

test("simulated fetchData filter: a fresh custom provider connection with testStatus=null survives to activeProviders", () => {
  const connections = [
    { id: "conn-1", provider: "openai", testStatus: "active", isActive: true },
    // Freshly-added custom provider, never tested yet.
    { id: "conn-2", provider: "my-custom-provider", testStatus: null, isActive: true },
    { id: "conn-3", provider: "broken-provider", testStatus: "error", isActive: true },
  ];

  const activeProviders = connections.filter(isEligibleActiveConnection);

  assert.deepEqual(
    activeProviders.map((c) => c.id),
    ["conn-1", "conn-2"]
  );
});
