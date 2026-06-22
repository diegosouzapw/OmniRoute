import test from "node:test";
import assert from "node:assert/strict";

// Pure helpers of the release-green validator (Solution C). The orchestration is
// guarded behind a direct-run check, so importing the module here is side-effect-free.
const mod = await import("../../scripts/quality/validate-release-green.mjs");
const {
  firstFailureLine,
  eslintCounts,
  parseEslintJson,
  parseCognitiveCount,
  isDrift,
  computeVerdict,
} = mod;

test("eslintCounts sums errors + warnings across files", () => {
  const parsed = [
    { errorCount: 2, warningCount: 5 },
    { errorCount: 0, warningCount: 3 },
    {},
  ];
  assert.deepEqual(eslintCounts(parsed), { errors: 2, warnings: 8 });
});

test("parseEslintJson tolerates a leading non-JSON banner", () => {
  const out = "npm warn something\n[{\"errorCount\":0,\"warningCount\":1}]";
  assert.deepEqual(parseEslintJson(out), [{ errorCount: 0, warningCount: 1 }]);
  assert.equal(parseEslintJson("no json here"), null);
});

test("parseCognitiveCount reads the gate's count (en + pt)", () => {
  assert.equal(parseCognitiveCount("[cognitive-complexity] 797 function(s) exceed the threshold (15)."), 797);
  assert.equal(parseCognitiveCount("[cognitive-complexity] REGRESSÃO — 801 violações > baseline 797"), 801);
  assert.equal(parseCognitiveCount("no number"), null);
});

test("isDrift flags only growth past the committed baseline (down-direction ratchets)", () => {
  assert.equal(isDrift(3900, 3867), true); // grew → drift
  assert.equal(isDrift(3867, 3867), false); // equal → ok
  assert.equal(isDrift(3800, 3867), false); // improved → ok
  assert.equal(isDrift(10, null), false); // no baseline → never drift
  assert.equal(isDrift(null, 10), false); // unparsed → never drift
});

test("firstFailureLine surfaces the meaningful failure, not boilerplate", () => {
  const out = [
    "> omniroute@3.8.34 typecheck:core",
    "src/x.ts(10,5): error TS2322: Type 'string' is not assignable to 'number'.",
    "done",
  ].join("\n");
  assert.match(firstFailureLine(out), /error TS2322/);
});

test("computeVerdict: releaseGreen iff zero HARD failures (drift never blocks)", () => {
  const onlyDrift = computeVerdict([
    { kind: "hard", ok: true },
    { kind: "drift", ok: false },
  ]);
  assert.equal(onlyDrift.releaseGreen, true);
  assert.equal(onlyDrift.drift.length, 1);

  const hardFail = computeVerdict([
    { kind: "hard", ok: false },
    { kind: "drift", ok: false },
  ]);
  assert.equal(hardFail.releaseGreen, false);
  assert.equal(hardFail.hardFailures.length, 1);

  const allGreen = computeVerdict([
    { kind: "hard", ok: true },
    { kind: "drift", ok: true },
  ]);
  assert.equal(allGreen.releaseGreen, true);
});
