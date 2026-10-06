import assert from "node:assert/strict";
import test from "node:test";

// @ts-expect-error — plain .mjs gate script, no type declarations by design
import {
  assertNoDiskExhaustion,
  evaluateConvergence,
} from "../../scripts/check/check-install-upgrade.mjs";

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
  assert.doesNotMatch(
    v.failures[0],
    /cache_metrics/,
    "the known one must not be re-reported as new"
  );
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

// ─── ENOSPC guard ──────────────────────────────────────────────────────────────
//
// The v3.8.50 publish run (CI 33104507735) failed with "15 tables a CLEAN install creates
// but an UPGRADE does not". None of them was missing: the Phase B upgrade install had hit
// `npm warn tar TAR_ENTRY_ERROR ENOSPC: no space left on device` 5611 times, npm still
// exited 0, the truncated `omniroute serve` "exited with code 0 before serving", and the
// database therefore still held the 3.8.49 schema. npm reporting disk exhaustion as a
// warning is what let a full disk masquerade as a schema defect.

test("npm ENOSPC warnings are raised as an install failure, not ignored", () => {
  const enospc = "npm warn tar TAR_ENTRY_ERROR ENOSPC: no space left on device, write\n".repeat(3);
  assert.throws(
    () => assertNoDiskExhaustion(enospc, "upgrade install"),
    (err: Error) => {
      assert.match(err.message, /upgrade install/);
      assert.match(err.message, /ran out of disk space/);
      assert.match(err.message, /3 ENOSPC error/);
      // The operator must not go looking for a migration that is not missing.
      assert.match(err.message, /NOT a schema divergence/);
      return true;
    }
  );
});

test("a clean install log does not trip the disk guard", () => {
  assert.doesNotThrow(() =>
    assertNoDiskExhaustion(
      "npm warn deprecated boolean@3.2.0: Package no longer supported.\nadded 900 packages\n",
      "clean install"
    )
  );
});

test("the guard also catches the bare kernel message without the ENOSPC code", () => {
  assert.throws(
    () => assertNoDiskExhaustion("Error: no space left on device", "clean install"),
    /ran out of disk space/
  );
});
