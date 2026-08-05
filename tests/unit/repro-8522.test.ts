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
import { evaluateFileSizes } from "../../scripts/check/check-file-size.mjs";

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
