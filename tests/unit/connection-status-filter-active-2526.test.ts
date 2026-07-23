import { test } from "node:test";
import assert from "node:assert/strict";

import { filterActiveConnections, filterUsableConnections } from "@/shared/utils/connectionStatus";

// Ported from decolua/9router#2526 — the combos builder listed provider
// connections the user had explicitly disabled, because the page only
// filtered on the connection's last `testStatus` and ignored `isActive`.
// A disabled connection can still carry a stale "active"/"success"
// testStatus from before it was disabled.

test("filterActiveConnections excludes explicitly disabled connections", () => {
  const active = { id: "active", isActive: true };
  const legacyActive = { id: "legacy" }; // no isActive field -> treated as active
  const disabled = { id: "disabled", isActive: false };

  assert.deepEqual(filterActiveConnections([active, disabled, legacyActive]), [
    active,
    legacyActive,
  ]);
});

test("filterActiveConnections returns an empty list for invalid input", () => {
  assert.deepEqual(filterActiveConnections(undefined), []);
  assert.deepEqual(filterActiveConnections(null), []);
});

test("filterActiveConnections drops nullish entries instead of passing them through", () => {
  // A nullish element must not survive: callers read properties off the
  // result (e.g. `connection.testStatus`) and would throw a TypeError.
  const active = { id: "active", isActive: true };

  assert.deepEqual(filterActiveConnections([null, active, undefined]), [active]);
  assert.doesNotThrow(() => filterUsableConnections([null, undefined]));
  assert.deepEqual(filterUsableConnections([null, { id: "ok", testStatus: "active" }]), [
    { id: "ok", testStatus: "active" },
  ]);
});

test("filterUsableConnections applies the isActive gate before the testStatus gate", () => {
  // Regression for the exact bug: a disabled connection with a stale
  // "active" testStatus must NOT survive the combined filter that
  // src/app/(dashboard)/dashboard/combos/page.tsx fetchData() calls.
  const connections = [
    { id: "healthy", isActive: true, testStatus: "active" },
    { id: "healthy-success", isActive: true, testStatus: "success" },
    { id: "disabled-but-stale-status", isActive: false, testStatus: "active" },
    { id: "disabled-success-status", isActive: false, testStatus: "success" },
    { id: "enabled-not-tested", isActive: true, testStatus: "untested" },
    { id: "legacy-no-isActive", testStatus: "active" },
  ];

  assert.deepEqual(
    filterUsableConnections(connections).map((c) => c.id),
    ["healthy", "healthy-success", "legacy-no-isActive"]
  );
});

test("filterUsableConnections returns an empty list for invalid input", () => {
  assert.deepEqual(filterUsableConnections(undefined), []);
  assert.deepEqual(filterUsableConnections(null), []);
});
