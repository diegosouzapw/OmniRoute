// Repro for issue #11600 ("Detalhe adicional — supressao obsoleta derruba o job"):
//
// scripts/quality/run-eslint-json.mjs is the script behind `npm run lint:json`,
// which backs the CI `Lint` job's blocking ESLint pass (.github/workflows/ci.yml
// step "ESLint (JSON report)"). It builds this exact args array (see
// scripts/quality/run-eslint-json.mjs lines 31-42):
//
//   [".", "--cache", "--cache-location", ".eslintcache",
//    "--suppressions-location", "config/quality/eslint-suppressions.json",
//    "--format", "json", "--output-file", outFile, ...extra]
//
// and does `process.exit(result.status)` verbatim — i.e. it propagates ESLint's
// raw exit code, including exit code 2, which ESLint uses specifically for "There
// are suppressions left that do not occur anymore" (a stale/orphaned suppression
// entry), REGARDLESS of whether the tree has any real (unsuppressed) lint error.
//
// scripts/quality/validate-release-green.mjs already had to fix the identical
// failure class by adding --pass-on-unpruned-suppressions (PR #7962, issue #7837)
// — see that script's own comment: "An 'unpruned' suppression means a previously-
// frozen violation was legitimately fixed ... Without this flag ESLint 9.x exits 2
// for that reason alone". run-eslint-json.mjs never received the same fix, so the
// CI `Lint` job goes red whenever a suppression is orphaned by someone genuinely
// fixing pre-existing debt, even with zero real errors in the tree.
//
// This test reproduces run-eslint-json.mjs's EXACT args array (mirrored above,
// verified against the source at HEAD) against a minimal, isolated ESLint fixture
// (not OmniRoute's own 10k+ file tree — a cold full-tree lint costs 14-60min per
// open PR #11734, impractical for a fast regression test) and asserts the
// spec-correct outcome: exit 0.

import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const eslintBin = path.join(repoRoot, "node_modules", "eslint", "bin", "eslint.js");

function makeFixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "eslint-suppression-repro-"));
  fs.writeFileSync(
    path.join(dir, "eslint.config.mjs"),
    'export default [{files:["*.js"],rules:{"no-unused-vars":"error"}}];\n'
  );
  fs.writeFileSync(path.join(dir, "a.js"), "const unused = 1;\nmodule.exports = {};\n");
  fs.writeFileSync(path.join(dir, "suppressions.json"), "{}");
  return dir;
}

test("run-eslint-json.mjs's shipped eslint args must not exit non-zero on a pruned (stale) suppression with zero real errors (#11600)", () => {
  const dir = makeFixture();

  // Freeze the pre-existing violation (mirrors an eslint-suppressions.json baseline freeze).
  const freeze = spawnSync(
    process.execPath,
    [eslintBin, ".", "--suppressions-location", "suppressions.json", "--suppress-all"],
    { cwd: dir, encoding: "utf8" }
  );
  assert.equal(freeze.status, 0, `baseline freeze should succeed: ${freeze.stderr}`);

  // Someone genuinely fixes the violation without regenerating suppressions.json —
  // the suppression entry is now orphaned, and the tree has 0 real errors.
  fs.writeFileSync(path.join(dir, "a.js"), "module.exports = {};\n");

  // EXACT args run-eslint-json.mjs currently ships (scripts/quality/run-eslint-json.mjs:32-44),
  // plus the fix under test (--pass-on-unpruned-suppressions) once implemented.
  const result = spawnSync(
    process.execPath,
    [
      eslintBin,
      ".",
      "--cache",
      "--cache-location",
      ".eslintcache",
      "--suppressions-location",
      "suppressions.json",
      "--format",
      "json",
      "--output-file",
      "lint-out.json",
      "--pass-on-unpruned-suppressions",
    ],
    { cwd: dir, encoding: "utf8" }
  );

  fs.rmSync(dir, { recursive: true, force: true });

  // SPEC: a clean tree (0 real lint errors) must not fail the gate merely because a
  // suppression became stale.
  assert.equal(
    result.status,
    0,
    `eslint args exited ${result.status} on a stale suppression despite 0 real lint errors — ` +
      `the CI Lint job goes red for cleanup, not defects. stderr: ${result.stderr}`
  );
});

test("run-eslint-json.mjs source must pass --pass-on-unpruned-suppressions to ESLint (#11600)", () => {
  const source = fs.readFileSync(
    path.join(repoRoot, "scripts", "quality", "run-eslint-json.mjs"),
    "utf8"
  );
  assert.match(
    source,
    /--pass-on-unpruned-suppressions/,
    "run-eslint-json.mjs must pass --pass-on-unpruned-suppressions in its ESLint args array, " +
      "mirroring the identical fix already present in scripts/quality/validate-release-green.mjs " +
      "(PR #7962 / issue #7837) — otherwise the CI Lint job goes red on a merely-stale suppression."
  );
});
