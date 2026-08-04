import assert from "node:assert/strict";
import test from "node:test";

// @ts-expect-error — plain .mjs gate script, no type declarations by design
import { evaluateConvergence } from "../../scripts/check/check-install-upgrade.mjs";

/**
 * The whole point of this gate is that the two directions of schema divergence are NOT
 * equivalent, and the cheap symmetric check ("do the table sets match?") would either
 * block every release on harmless residue or let a real upgrade bug through.
 *
 * Measured on 2026-07-30: a real 3.8.48 install on VPS .16 upgraded to 3.8.49 ended with
 * 117 tables while a clean 3.8.49 install had 116 — the extra one being `cache_metrics`.
 */

test("converged schemas pass", () => {
  const v = evaluateConvergence({
    freshTables: ["a", "b", "c"],
    upgradedTables: ["c", "b", "a"],
  });
  assert.equal(v.ok, true);
  assert.deepEqual(v.failures, []);
  assert.deepEqual(v.onlyFresh, []);
  assert.deepEqual(v.onlyUpgraded, []);
});

test("a table only a CLEAN install creates is ALWAYS a failure — upgraders lack structure", () => {
  const v = evaluateConvergence({
    freshTables: ["a", "b", "new_feature_table"],
    upgradedTables: ["a", "b"],
  });
  assert.equal(v.ok, false);
  assert.deepEqual(v.onlyFresh, ["new_feature_table"]);
  assert.match(v.failures[0], /CLEAN install creates but an UPGRADE does not/);
  assert.match(v.failures[0], /new_feature_table/);
});

test("that direction cannot be silenced by the residual allowlist", () => {
  const v = evaluateConvergence({
    freshTables: ["a", "missing_on_upgrade"],
    upgradedTables: ["a"],
    // Even if someone lists it here, the dangerous direction must still fail.
    residualAllowlist: { missing_on_upgrade: "please ignore me" },
  });
  assert.equal(v.ok, false);
  assert.deepEqual(v.onlyFresh, ["missing_on_upgrade"]);
});

test("known residue (cache_metrics, the real 3.8.48→3.8.49 finding) passes but is reported", () => {
  const v = evaluateConvergence({
    freshTables: ["a", "b"],
    upgradedTables: ["a", "b", "cache_metrics"],
    residualAllowlist: { cache_metrics: "measured 2026-07-30 on VPS .16" },
  });
  assert.equal(v.ok, true, "allowlisted residue must not block a release");
  assert.deepEqual(v.onlyUpgraded, ["cache_metrics"], "still surfaced so it stays visible");
  assert.deepEqual(v.unknownResidue, []);
});

test("UNKNOWN residue fails — a new divergence must not hide behind the allowlist", () => {
  const v = evaluateConvergence({
    freshTables: ["a"],
    upgradedTables: ["a", "cache_metrics", "surprise_table"],
    residualAllowlist: { cache_metrics: "known" },
  });
  assert.equal(v.ok, false);
  assert.deepEqual(v.unknownResidue, ["surprise_table"]);
  assert.match(v.failures[0], /surprise_table/);
  assert.doesNotMatch(v.failures[0], /cache_metrics/, "the known one must not be re-reported as new");
});

test("both directions at once report both failures", () => {
  const v = evaluateConvergence({
    freshTables: ["shared", "only_fresh"],
    upgradedTables: ["shared", "only_upgraded"],
  });
  assert.equal(v.ok, false);
  assert.equal(v.failures.length, 2);
  assert.deepEqual(v.onlyFresh, ["only_fresh"]);
  assert.deepEqual(v.unknownResidue, ["only_upgraded"]);
});

test("accepts Sets as well as arrays (the gate passes Sets from sqlite_master)", () => {
  const v = evaluateConvergence({
    freshTables: new Set(["a", "b"]),
    upgradedTables: new Set(["a", "b"]),
  });
  assert.equal(v.ok, true);
});

test("empty/missing inputs do not crash", () => {
  const v = evaluateConvergence({ freshTables: undefined, upgradedTables: undefined });
  assert.equal(v.ok, true);
  assert.deepEqual(v.onlyFresh, []);
});
