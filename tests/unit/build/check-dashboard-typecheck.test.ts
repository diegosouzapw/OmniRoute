// tests/unit/build/check-dashboard-typecheck.test.ts
// Unit tests for the pure parsing/diff helpers in check-dashboard-typecheck.mjs.
// No child process is spawned — synthetic tsc-style output only, so the suite is
// fast and hermetic. Proves the gate actually DETECTS the #6625/#6909 bug class
// (an orphaned identifier — used but not declared — in a dashboard TSX file),
// not just that the script runs.

import test from "node:test";
import assert from "node:assert/strict";
import {
  parseTscOutput,
  diffAgainstBaseline,
} from "../../../scripts/check/check-dashboard-typecheck.mjs";

test("parseTscOutput: parses a TS2304 orphaned-identifier error (the #6625/#6909 bug class)", () => {
  const raw =
    `src/app/(dashboard)/dashboard/settings/components/ProxyRegistryManager.tsx(564,7): error TS2304: Cannot find name 'setPoolLoaded'.\n` +
    `src/app/(dashboard)/dashboard/settings/components/ProxyRegistryManager.tsx(1204,12): error TS2304: Cannot find name 'poolLoaded'.\n`;

  const counts = parseTscOutput(raw);

  assert.deepEqual(counts, {
    "src/app/(dashboard)/dashboard/settings/components/ProxyRegistryManager.tsx": {
      TS2304: 2,
    },
  });
});

test("parseTscOutput: ignores non-error lines (summary/info output)", () => {
  const raw =
    `Some info line that is not an error\n` +
    `src/app/(dashboard)/dashboard/foo.tsx(1,1): error TS2339: Property 'bar' does not exist.\n` +
    `Found 1 error in 1 file.\n`;

  const counts = parseTscOutput(raw);

  assert.deepEqual(counts, {
    "src/app/(dashboard)/dashboard/foo.tsx": { TS2339: 1 },
  });
});

test("parseTscOutput: returns empty map for clean output", () => {
  assert.deepEqual(parseTscOutput(""), {});
  assert.deepEqual(parseTscOutput("Found 0 errors.\n"), {});
});

test("diffAgainstBaseline: flags a brand-new orphaned-identifier error as a regression", () => {
  const baseline = {};
  const live = {
    "src/app/(dashboard)/dashboard/settings/components/ProxyRegistryManager.tsx": {
      TS2304: 5,
    },
  };

  const { regressions, improvements } = diffAgainstBaseline(live, baseline);

  assert.equal(regressions.length, 1);
  assert.equal(
    regressions[0].file,
    "src/app/(dashboard)/dashboard/settings/components/ProxyRegistryManager.tsx"
  );
  assert.equal(regressions[0].code, "TS2304");
  assert.equal(regressions[0].liveCount, 5);
  assert.equal(regressions[0].baselineCount, 0);
  assert.equal(improvements.length, 0);
});

test("diffAgainstBaseline: does NOT flag a frozen pre-existing error within its baselined count", () => {
  const baseline = { "src/app/(dashboard)/dashboard/foo.tsx": { TS2339: 3 } };
  const live = { "src/app/(dashboard)/dashboard/foo.tsx": { TS2339: 3 } };

  const { regressions, improvements } = diffAgainstBaseline(live, baseline);

  assert.equal(regressions.length, 0);
  assert.equal(improvements.length, 0);
});

test("diffAgainstBaseline: flags a count INCREASE beyond the frozen baseline as a regression", () => {
  const baseline = { "src/app/(dashboard)/dashboard/foo.tsx": { TS2339: 2 } };
  const live = { "src/app/(dashboard)/dashboard/foo.tsx": { TS2339: 3 } };

  const { regressions } = diffAgainstBaseline(live, baseline);

  assert.equal(regressions.length, 1);
  assert.equal(regressions[0].baselineCount, 2);
  assert.equal(regressions[0].liveCount, 3);
});

test("diffAgainstBaseline: reports (does not fail on) a count DECREASE as an improvement", () => {
  const baseline = { "src/app/(dashboard)/dashboard/foo.tsx": { TS2339: 3 } };
  const live = { "src/app/(dashboard)/dashboard/foo.tsx": { TS2339: 1 } };

  const { regressions, improvements } = diffAgainstBaseline(live, baseline);

  assert.equal(regressions.length, 0);
  assert.equal(improvements.length, 1);
  assert.equal(improvements[0].baselineCount, 3);
  assert.equal(improvements[0].liveCount, 1);
});

test("diffAgainstBaseline: a baselined error that fully disappears is reported as an improvement, not a failure", () => {
  const baseline = { "src/app/(dashboard)/dashboard/foo.tsx": { TS2339: 2 } };
  const live = {};

  const { regressions, improvements } = diffAgainstBaseline(live, baseline);

  assert.equal(regressions.length, 0);
  assert.equal(improvements.length, 1);
  assert.equal(improvements[0].liveCount, 0);
  assert.equal(improvements[0].baselineCount, 2);
});
