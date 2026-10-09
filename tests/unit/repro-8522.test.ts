/**
 * repro-8522 — quality-gate inherited-drift defect.
 *
 * Issue #8522: check:file-size (and the eslint-suppressions count) are ABSOLUTE
 * ratchets with no base-ref comparison. Once the release base is over a frozen
 * cap (inherited drift from an already-merged PR), EVERY subsequent PR goes red
 * on that gate regardless of content — the "innocent PR" cannot pass, so red
 * stops distinguishing "you broke it" from "you exist".
 *
 * This test reproduces the minimal defect: an innocent PR (base and head have
 * IDENTICAL LOC on the frozen file, PR touched nothing) still produces a
 * violation, because `evaluateFileSizes` compares head LOC to the frozen number
 * with no notion of the base.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { evaluateFileSizes } from "../../scripts/check/check-file-size.mjs";

const SCRIPT = fileURLToPath(new URL("../../scripts/check/check-file-size.mjs", import.meta.url));

test("8522: innocent PR (base already over frozen cap) must NOT be a violation", () => {
  // Scenario: frozen cap for src/foo.ts is 100. Some earlier merged PR grew it
  // to 110. The base of THIS PR is therefore 110. This PR is innocent — it does
  // not touch src/foo.ts at all, so head LOC == base LOC == 110.
  const baseLocByFile = { "src/foo.ts": 110 };
  const currentLocByFile = { ...baseLocByFile }; // PR changed nothing in foo.ts
  const frozen = { "src/foo.ts": 100 };
  const cap = 100;

  // With baseLocByFile, the gate compares against max(frozen, base) = max(100, 110) = 110,
  // so 110 > 110 is false — innocent PR passes.
  const { violations } = evaluateFileSizes(currentLocByFile, frozen, cap, baseLocByFile);

  assert.deepEqual(violations, [], "innocent PR flagged for inherited drift");
});

test("8522: PR that DOES grow a frozen file above frozen cap is a violation", () => {
  // Sanity: the gate must still catch a PR that grows the file above its cap.
  // Base is at the frozen cap (100), but PR grew it to 112.
  const baseLocByFile = { "src/foo.ts": 100 };
  const currentLocByFile = { "src/foo.ts": 112 }; // PR grew it +12
  const frozen = { "src/foo.ts": 100 };
  const cap = 100;

  // With baseLocByFile: threshold = max(100, 100) = 100, 112 > 100 → violation
  const { violations } = evaluateFileSizes(currentLocByFile, frozen, cap, baseLocByFile);
  assert.equal(violations.length, 1, "own-growth PR must be a violation");
});

// --- Test-file gate in PR mode: main() must look up base LOC for the test collector's
// files too, or every testFrozen entry is judged without its base size. Runs the CLI
// against a throwaway repo whose commit is the PR base and whose working tree is the head.

function lines(n: number) {
  return Array.from({ length: n }, (_, i) => `// ${i}`).join("\n");
}

function makeDriftedTestRepo() {
  const root = mkdtempSync(join(tmpdir(), "file-size-8522-"));
  mkdirSync(join(root, "tests/unit"), { recursive: true });
  writeFileSync(
    join(root, "baseline.json"),
    JSON.stringify({
      cap: 10,
      frozen: {},
      testCap: 10,
      testFrozen: { "tests/unit/frozen.test.ts": 12 },
    })
  );
  // Both test files already drifted on the base: frozen.test.ts past its frozen 12,
  // unfrozen.test.ts past testCap 10.
  writeFileSync(join(root, "tests/unit/frozen.test.ts"), lines(15));
  writeFileSync(join(root, "tests/unit/unfrozen.test.ts"), lines(20));
  execFileSync("git", ["init", "--quiet"], { cwd: root });
  execFileSync("git", ["add", "."], { cwd: root });
  execFileSync(
    "git",
    [
      "-c",
      "user.name=File Size Test",
      "-c",
      "user.email=file-size@example.invalid",
      "commit",
      "--quiet",
      "-m",
      "base",
    ],
    { cwd: root }
  );
  return root;
}

function runGate(root: string) {
  return spawnSync(
    process.execPath,
    [SCRIPT, "--baseline", join(root, "baseline.json"), "--base-ref", "HEAD"],
    { cwd: root, encoding: "utf8" }
  );
}

test("8522: innocent PR with test files already over their ceiling on the base passes", () => {
  const root = makeDriftedTestRepo();
  try {
    const r = runGate(root);
    assert.equal(r.status, 0, `${r.stdout}\n${r.stderr}`);
    assert.match(r.stdout, /\[test-file-size\] OK/);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("8522: PR that grows drifted test files past their base size is a violation", () => {
  const root = makeDriftedTestRepo();
  try {
    writeFileSync(join(root, "tests/unit/frozen.test.ts"), lines(16));
    writeFileSync(join(root, "tests/unit/unfrozen.test.ts"), lines(21));
    const r = runGate(root);
    assert.equal(r.status, 1, `${r.stdout}\n${r.stderr}`);
    assert.match(r.stderr, /2 test file violation\(s\)/);
    assert.match(r.stderr, /frozen\.test\.ts: 16 > congelado 12/);
    assert.match(r.stderr, /unfrozen\.test\.ts: 21 > cap 10/);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
