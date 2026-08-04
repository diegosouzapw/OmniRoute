/**
 * tests/unit/select-impacted-tests.test.ts
 *
 * TIA (Test Impact Analysis) selector — given a PR's changed files plus the
 * import-graph impact map, pick the impacted unit tests with a run-all
 * fail-safe. The `__RUN_ALL__` sentinel and `selectImpacted({changed, map})`
 * signature are load-bearing — CI wiring depends on them.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { selectImpacted } from "../../scripts/quality/select-impacted-tests.mjs";

const MAP = {
  sources: {
    "open-sse/services/combo.ts": ["tests/unit/combo-routing-engine.test.ts"],
    "src/sse/services/auth.ts": ["tests/unit/sse-auth.test.ts"],
  },
};

test("mapped source → its impacted test(s)", () => {
  const sel = selectImpacted({ changed: ["open-sse/services/combo.ts"], map: MAP });
  assert.deepEqual(sel, ["tests/unit/combo-routing-engine.test.ts"]);
});

test("changed test file → itself (always run a changed test)", () => {
  const sel = selectImpacted({ changed: ["tests/unit/sse-auth.test.ts"], map: MAP });
  assert.deepEqual(sel, ["tests/unit/sse-auth.test.ts"]);
});

test("hub file (setupPolyfill) → run all (fail-safe)", () => {
  const sel = selectImpacted({ changed: ["open-sse/utils/setupPolyfill.ts"], map: MAP });
  assert.deepEqual(sel, ["__RUN_ALL__"]);
});

test("unmapped source file → run all (fail-safe)", () => {
  const sel = selectImpacted({ changed: ["open-sse/brand-new-file.ts"], map: MAP });
  assert.deepEqual(sel, ["__RUN_ALL__"]);
});

// The TIA step runs selected files via `node --test`, so it must only ever select
// node:test unit files (the `test:unit` glob). vitest/.tsx/e2e/integration changes
// must NOT be selected — running them under node:test was the 99-false-failure bug.
test("changed vitest UI test (.test.tsx) → NOT selected", () => {
  const sel = selectImpacted({ changed: ["tests/unit/free-pool-tab.test.tsx"], map: MAP });
  assert.deepEqual(sel, []);
});

test("changed e2e test → NOT selected (not a node:test unit file)", () => {
  const sel = selectImpacted({ changed: ["tests/e2e/system-failover.test.ts"], map: MAP });
  assert.deepEqual(sel, []);
});

test("changed vitest file in uncurated tests/unit/autoCombo → NOT selected", () => {
  const sel = selectImpacted({ changed: ["tests/unit/autoCombo/tieredRotation.test.ts"], map: MAP });
  assert.deepEqual(sel, []);
});

test("changed unit test in a curated subdir → run itself", () => {
  const sel = selectImpacted({ changed: ["tests/unit/db/migration.test.ts"], map: MAP });
  assert.deepEqual(sel, ["tests/unit/db/migration.test.ts"]);
});

// Parity with package.json test:unit braces — memory/usage/combo/serial were missing
// from UNIT_SUBDIRS and silently failed to self-select.
test("changed unit test under memory/ → run itself", () => {
  const sel = selectImpacted({
    changed: ["tests/unit/memory/store.test.ts"],
    map: MAP,
  });
  assert.deepEqual(sel, ["tests/unit/memory/store.test.ts"]);
});

test("changed unit test under usage/ → run itself", () => {
  const sel = selectImpacted({
    changed: ["tests/unit/usage/quota.test.ts"],
    map: MAP,
  });
  assert.deepEqual(sel, ["tests/unit/usage/quota.test.ts"]);
});

test("changed unit test under combo/ → run itself", () => {
  const sel = selectImpacted({
    changed: ["tests/unit/combo/routing.test.ts"],
    map: MAP,
  });
  assert.deepEqual(sel, ["tests/unit/combo/routing.test.ts"]);
});

test("changed unit test under serial/ → run itself", () => {
  const sel = selectImpacted({
    changed: ["tests/unit/serial/flaky-once.test.ts"],
    map: MAP,
  });
  assert.deepEqual(sel, ["tests/unit/serial/flaky-once.test.ts"]);
});

test("changed unit .test.mjs → run itself", () => {
  const sel = selectImpacted({
    changed: ["tests/unit/example.test.mjs"],
    map: MAP,
  });
  assert.deepEqual(sel, ["tests/unit/example.test.mjs"]);
});

// package.json: tests/unit/**/*.test.mjs (any depth, not only UNIT_SUBDIRS).
test("nested .test.mjs outside UNIT_SUBDIRS → run itself", () => {
  const sel = selectImpacted({
    changed: ["tests/unit/misc/nested/deep.test.mjs"],
    map: MAP,
  });
  assert.deepEqual(sel, ["tests/unit/misc/nested/deep.test.mjs"]);
});

// electron/bin are outside the import-graph map roots — must NOT force __RUN_ALL__.
test("changed electron/ file alone → empty (not unit fail-safe)", () => {
  const sel = selectImpacted({ changed: ["electron/main.js"], map: MAP });
  assert.deepEqual(sel, []);
});

test("changed bin/ file alone → empty (not unit fail-safe)", () => {
  const sel = selectImpacted({ changed: ["bin/omniroute.js"], map: MAP });
  assert.deepEqual(sel, []);
});
