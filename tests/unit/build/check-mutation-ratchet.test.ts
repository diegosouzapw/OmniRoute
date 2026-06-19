import { test } from "node:test";
import assert from "node:assert";
import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import {
  evaluateMutationRatchet,
  mutationScoreForFile,
  measureMutationScores,
  readBaselineMutationScores,
} from "../../../scripts/check/check-mutation-ratchet.mjs";

// ── evaluateMutationRatchet: direction UP (score can only improve) ───────────
test("mutation ratchet flags a drop (direction up)", () => {
  assert.equal(evaluateMutationRatchet(72.0, 75.0).regressed, true);
  assert.equal(evaluateMutationRatchet(76.0, 75.0).regressed, false);
  assert.equal(evaluateMutationRatchet(76.0, 75.0).improved, true);
  assert.equal(evaluateMutationRatchet(75.0, 75.0).regressed, false); // equal holds
  assert.equal(evaluateMutationRatchet(75.0, 75.0).improved, false);
});

// ── mutationScoreForFile: covered score = detected/(detected+survived),
// NoCoverage EXCLUDED (it is a coverage gap, not a test-quality signal). ─────
test("mutationScoreForFile computes the covered score and excludes NoCoverage", () => {
  const fileData = {
    mutants: [
      { status: "Killed" },
      { status: "Killed" },
      { status: "Killed" },
      { status: "Timeout" }, // Timeout counts as detected
      { status: "Survived" },
      { status: "Survived" },
      { status: "NoCoverage" }, // excluded from denominator
      { status: "NoCoverage" },
      { status: "Ignored" }, // excluded (not a valid mutant)
    ],
  };
  // detected = 4 (3 Killed + 1 Timeout); denom = 6 (+2 Survived); NoCoverage/Ignored out.
  assert.ok(Math.abs(mutationScoreForFile(fileData) - (4 / 6) * 100) < 1e-9);
});

test("mutationScoreForFile returns null when there are no covered mutants", () => {
  assert.equal(mutationScoreForFile({ mutants: [{ status: "NoCoverage" }] }), null);
  assert.equal(mutationScoreForFile({ mutants: [] }), null);
});

// ── measureMutationScores: per-file scores from a report (and merges batches) ─
test("measureMutationScores maps each mutated file to its score", () => {
  const report = {
    files: {
      "src/a.ts": { mutants: [{ status: "Killed" }, { status: "Survived" }] }, // 50
      "src/b.ts": { mutants: [{ status: "Killed" }, { status: "Killed" }] }, // 100
      "src/empty.ts": { mutants: [{ status: "NoCoverage" }] }, // null -> omitted
    },
  };
  const scores = measureMutationScores(report);
  assert.equal(scores["src/a.ts"], 50);
  assert.equal(scores["src/b.ts"], 100);
  assert.equal("src/empty.ts" in scores, false);
});

test("measureMutationScores accepts several reports (per-batch) and unions them", () => {
  const c = { files: { "src/a.ts": { mutants: [{ status: "Killed" }, { status: "Survived" }] } } };
  const g = { files: { "src/b.ts": { mutants: [{ status: "Killed" }] } } };
  const scores = measureMutationScores([c, g]);
  assert.equal(scores["src/a.ts"], 50);
  assert.equal(scores["src/b.ts"], 100);
});

// ── readBaselineMutationScores: graceful skip when the file/keys are absent ──
test("readBaselineMutationScores returns {} when the baseline file is missing", () => {
  assert.deepEqual(readBaselineMutationScores("/no/such/baseline.json"), {});
});

test("readBaselineMutationScores extracts mutationScore.<path> metric values", () => {
  // Write a tiny baseline to a temp file and read it back.
  const tmp = path.join(os.tmpdir(), `mut-baseline-${process.pid}.json`);
  fs.writeFileSync(
    tmp,
    JSON.stringify({
      metrics: {
        eslintWarnings: { value: 10, direction: "down" },
        "mutationScore.src/a.ts": { value: 70, direction: "up", dedicatedGate: true },
        "mutationScore.src/b.ts": { value: 80, direction: "up", dedicatedGate: true },
      },
    })
  );
  const base = readBaselineMutationScores(tmp);
  assert.deepEqual(base, { "src/a.ts": 70, "src/b.ts": 80 });
  fs.rmSync(tmp, { force: true });
});
