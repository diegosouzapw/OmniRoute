import { test } from "node:test";
import assert from "node:assert";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { readPackageVersion } from "../../scripts/check/check-docs-counts-sync.mjs";

// Regression guard for audit #15159 — G-10 (cognitive complexity baseline).
//
// The audit framed G-10 as "cognitive complexity was raised, never re-tightened…
// the re-tighten was mandated for v3.8.51 and slipped 428 points". Re-checking
// the baseline's own audit trail shows that is only PARTLY true, and the
// distinction is load-bearing:
//
//   * 1437 was NOT drift that escaped a re-tighten. It is exactly the
//     velocity-phase relaxation: 1197 * 1.2 = 1436.4 -> 1437. It is
//     owner-approved (2026-08-30) under `_policy`, which carries an explicit
//     close condition ("until": "4.0.0") and sets requireTighten: false.
//   * What WAS owed was a re-tighten toward 1009 from the v3.8.51 mandate, whose
//     own text allowed a natural shrink instead: "or via npm run
//     quality:ratchet -- --update if natural shrink appears earlier".
//
// So the correct action is to reclaim the shrink that actually happened (56
// points) and NOT to pretend the structural gap is closed. These tests pin that
// distinction so neither mistake recurs: a silent re-loosen, or a claim that
// 1009 has been reached.

type Baseline = {
  metrics: Record<
    string,
    { value: number; direction?: string; eps?: number; tightenSlack?: number }
  >;
  _policy?: { since?: string; until?: string; requireTighten?: boolean };
};

const root = path.resolve(import.meta.dirname, "..", "..");
const readBaseline = () =>
  JSON.parse(
    fs.readFileSync(path.join(root, "config/quality/quality-baseline.json"), "utf8")
  ) as Baseline;

test("G-10: the cognitiveComplexity baseline equals the real measured value", () => {
  // An exact ratchet (no eps, no slack) means the number IS the threshold. This
  // test runs the real gate, so a drifted baseline fails here rather than in CI.
  const baseline = readBaseline();
  const recorded = baseline.metrics.cognitiveComplexity.value;

  const out = execFileSync(process.execPath, ["scripts/check/check-cognitive-complexity.mjs"], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  const measured = Number(out.match(/cognitiveComplexity=(\d+)/)?.[1]);

  assert.ok(
    Number.isFinite(measured),
    `could not parse cognitiveComplexity from gate output: ${out.slice(0, 200)}`
  );
  assert.equal(
    measured,
    recorded,
    `baseline says ${recorded} but the gate measures ${measured} — re-tighten or document, never let them drift`
  );
});

test("G-10: the baseline was tightened BELOW the pre-existing 1437, not raised", () => {
  // Guards the direction of this change. The 2026-08-30 velocity relaxation set
  // 1437; the reclaim brings it down.
  const baseline = readBaseline();
  assert.ok(
    baseline.metrics.cognitiveComplexity.value < 1437,
    `expected a tighten below the velocity-relaxed 1437, found ${baseline.metrics.cognitiveComplexity.value}`
  );
});

test("G-10: the baseline still records the velocity relaxation and its close condition", () => {
  // The relaxation is real and owner-approved; it must not be quietly deleted to
  // make the numbers look tighter. `_policy` carries the close condition that
  // ends it at 4.0.0.
  const baseline = readBaseline();
  assert.ok(baseline._policy, "_policy block must survive — it scopes the velocity relaxation");
  assert.equal(baseline._policy.until, "4.0.0");
  assert.equal(baseline._policy.requireTighten, false);
});

test("G-10: the baseline does NOT claim the 1009 structural mandate was reached", () => {
  // The honest state: 1381 reclaimed naturally, ~372 still owed and owned by the
  // chatCore decomposition. A future edit that sets 1009 without the structural
  // work would be a false claim, so assert the residual gap is still acknowledged.
  const baseline = readBaseline();
  const value = baseline.metrics.cognitiveComplexity.value;
  const serialized = JSON.stringify(baseline.metrics.cognitiveComplexity);

  assert.ok(
    value > 1009,
    "the value must not silently equal the 1009 mandate unless the structural work actually landed"
  );
  assert.match(
    serialized,
    /chatCore/i,
    "the residual gap must stay attributed to the chatCore decomposition (audit Wave 5 / A-01)"
  );
});

test("G-10: the tightened baseline is still a 'down' ratchet", () => {
  // Direction must stay "down" (count may only fall). Flipping it to "up" would
  // turn a ceiling into a floor requirement.
  const baseline = readBaseline();
  assert.equal(baseline.metrics.cognitiveComplexity.direction, "down");
});

test("G-10: the tighten is documented with its measurement provenance", () => {
  // An undocumented baseline number is unreviewable. The provenance must name the
  // command, the measurement, and the prior baseline so a reviewer can re-run it.
  const baseline = readBaseline();
  const record = baseline.metrics.cognitiveComplexity as unknown as Record<string, unknown>;
  const provenance = record._measured_2026_10_08 as
    { command?: string; measured?: number; priorBaseline?: number; runs?: number } | undefined;

  assert.ok(provenance, "a tighten must carry a _measured_* provenance record");
  assert.match(String(provenance.command), /check-cognitive-complexity/);
  assert.equal(provenance.measured, record.value);
  assert.equal(provenance.priorBaseline, 1437);
  assert.ok((provenance.runs ?? 0) >= 2, "the measurement must have been taken more than once");
});

test("G-10: docs still agree with package.json after the tighten", () => {
  // Guard against collateral damage: G-06's widened validator runs over the same
  // tree, so confirm the version claims are still consistent.
  const validate = readPackageVersion as () => string | null;
  const expected = validate();
  assert.equal(expected, "3.8.52");

  for (const rel of ["README.md", "llm.txt"]) {
    const content = fs.readFileSync(path.join(root, rel), "utf8");
    assert.doesNotMatch(content, /OmniRoute 3\.8\.5[01]\b/, `${rel} regressed to a stale version`);
  }
});
