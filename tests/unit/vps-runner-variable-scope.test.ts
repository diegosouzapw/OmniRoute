/**
 * Guard for what `USE_VPS_RUNNER` is allowed to govern (gap 19).
 *
 * One variable used to switch the build AND the test jobs, which want OPPOSITE machines. The
 * build needs the .113's RAM — the production `next build` wants 18–20 GB and a hosted runner
 * has 16, which killed the same step nine times in the v3.8.49 cycle. The test jobs need the
 * hosted runner's link:
 *
 *     actions/setup-node on .113, 4 concurrent runners ..... 20m06s
 *     actions/setup-node hosted ............................     16s
 *     the tests themselves .................. 2m54 vs 2m31 — a tie
 *
 * So there was no setting that served both, and flipping the variable for a release traded a
 * working build for twenty-minute test jobs.
 *
 * The fix is not a second variable. Self-hosted is strictly worse for anything whose cost is
 * dominated by `setup-node` + `npm ci`, so those jobs are pinned to hosted and the variable now
 * means exactly one thing: "this job needs the .113's memory".
 *
 * `fast-gates` was the last holdout and the evidence for pinning it is unusually clean: across
 * 160 quality.yml runs it NEVER landed on a self-hosted runner — every non-skipped sample is
 * `GitHub Actions NNNN`. That was dead configuration, not a working escape hatch, and the
 * classifier is not at fault: ci.yml's Build ran on omniroute-113-7 and -6 in the same window.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const workflowDir = path.join(repoRoot, ".github/workflows");

/** Map every `runs-on:` line mentioning USE_VPS_RUNNER back to the job that owns it. */
function jobsSwitchedByVpsVar(): Array<{ file: string; job: string }> {
  const out: Array<{ file: string; job: string }> = [];
  for (const name of fs.readdirSync(workflowDir)) {
    if (!name.endsWith(".yml") && !name.endsWith(".yaml")) continue;
    const lines = fs.readFileSync(path.join(workflowDir, name), "utf-8").split("\n");
    let job = "";
    for (const line of lines) {
      const m = /^ {2}([A-Za-z0-9_-]+):\s*$/.exec(line);
      if (m) job = m[1];
      if (line.includes("USE_VPS_RUNNER") && line.includes("runs-on")) {
        out.push({ file: name, job });
      }
    }
  }
  return out;
}

/** Jobs whose cost is dominated by setup-node + npm ci, never by memory. */
const TEST_LIKE = /(^|-)(test|tests|vitest|unit|gates)($|-)/i;

test("USE_VPS_RUNNER never governs a test-like job", () => {
  const offenders = jobsSwitchedByVpsVar().filter((j) => TEST_LIKE.test(j.job));
  assert.deepEqual(
    offenders.map((j) => `${j.file}:${j.job}`),
    [],
    "self-hosted is strictly worse for these — setup-node measured 20m06s there vs 16s hosted, " +
      "while the tests themselves tie. Pin the job to ubuntu-latest instead of switching it."
  );
});

test("it still governs the build-like jobs — the ones that actually need the RAM", () => {
  const jobs = jobsSwitchedByVpsVar().map((j) => j.job);
  assert.ok(
    jobs.includes("build"),
    "the build is the whole reason the variable exists: 18-20 GB working set vs a 16 GB hosted runner"
  );
  assert.ok(jobs.includes("publish"), "npm-publish falls back to a full build when the artifact is missing");
});

test("fast-gates specifically stays hosted", () => {
  // The holdout. 160 runs, zero self-hosted samples — dead configuration, and it would have
  // inherited the setup-node penalty the day it fired.
  const wf = fs.readFileSync(path.join(workflowDir, "quality.yml"), "utf-8");
  const block = wf.split(/^ {2}fast-gates:\s*$/m)[1] ?? "";
  const runsOn = /^ {4}runs-on:\s*(.+)$/m.exec(block);
  assert.ok(runsOn, "fast-gates must declare runs-on");
  assert.match(runsOn[1].trim(), /^ubuntu-latest$/, "fast-gates must be pinned, not switched");
});
