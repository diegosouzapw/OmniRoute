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
  classifyRunError,
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

test("computeVerdict: full-coverage classification — ratchets are drift, defects are hard", () => {
  // Mirrors the expanded check set: the ratchets that historically surfaced in
  // layers on the release PR (complexity/openapi/zizmor/…) are DRIFT → never block;
  // the new real-defect gates (docs-all, integration) are HARD → block.
  const results = [
    { id: "complexity", kind: "drift", ok: false },
    { id: "openapi-coverage", kind: "drift", ok: false },
    { id: "workflow-lint", kind: "drift", ok: false },
    { id: "dead-code", kind: "drift", ok: true },
    { id: "codeql-ratchet", kind: "drift", ok: true },
    { id: "docs-all", kind: "hard", ok: true },
    { id: "integration", kind: "hard", ok: true },
  ];
  const v = computeVerdict(results);
  // Three ratchets drifted but NONE block — release is still green, all reported.
  assert.equal(v.releaseGreen, true);
  assert.equal(v.drift.length, 3);

  // A hard gate (integration assertion regression) flips it red.
  const withHardFail = computeVerdict([...results, { id: "integration", kind: "hard", ok: false }]);
  assert.equal(withHardFail.releaseGreen, false);
  assert.equal(withHardFail.hardFailures.length, 1);
});

test("classifyRunError: a killed gate under a timeout surfaces as a visible non-zero failure (not an infinite hang)", () => {
  // execFileSync kills the child on timeout → err.killed === true. The unit suite wedged on an
  // unreleased SQLite handle must become a reported failure, never an infinite block that gets
  // the pre-flight killed before it surfaces the unit reds (the v3.8.42 miss).
  const r = classifyRunError({ killed: true, signal: "SIGTERM" }, 45 * 60 * 1000);
  assert.equal(r.code, 124);
  assert.match(r.out, /ceiling/);
  assert.match(r.out, /hung\/failed gate/);
});

test("classifyRunError: a normal non-zero exit keeps its status + combined output", () => {
  const r = classifyRunError({ status: 1, stdout: "boom-out", stderr: "boom-err" }, undefined);
  assert.equal(r.code, 1);
  assert.equal(r.out, "boom-outboom-err");
});

test("classifyRunError: a kill WITHOUT a configured timeout is not misreported as a timeout", () => {
  // No timeout set → a killed/odd error falls through to the generic branch (code 1), so we never
  // claim a hang ceiling that was not actually configured.
  const r = classifyRunError({ killed: true }, undefined);
  assert.equal(r.code, 1);
  assert.doesNotMatch(r.out, /ceiling/);
});
