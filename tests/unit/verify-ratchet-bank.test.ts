import { test } from "node:test";
import assert from "node:assert";
import {
  formatBankSummary,
  verifyComplexityBaseline,
  verifyFileSizeBaseline,
  verifyFrozenMap,
  verifyQualityBaseline,
  verifyRatchetBank,
} from "../../scripts/quality/verify-ratchet-bank.mjs";

// The banking lane writes to the quality baselines unattended, so the only thing
// standing between it and a bot that can RAISE a cap is this verifier. Each test
// below is one way the automation could go wrong.

// --- frozen map (file-size `frozen` / `testFrozen`) ---

test("a lowered entry is banked as lowered", () => {
  const r = verifyFrozenMap({ "a.ts": 1000 }, { "a.ts": 900 });
  assert.deepEqual(r.problems, []);
  assert.deepEqual(r.lowered, [["a.ts", 1000, 900]]);
  assert.deepEqual(r.removed, []);
});

test("an entry that dropped out of the baseline is banked as removed", () => {
  const r = verifyFrozenMap({ "a.ts": 1000, "b.ts": 900 }, { "b.ts": 900 });
  assert.deepEqual(r.problems, []);
  assert.deepEqual(r.removed, ["a.ts"]);
  assert.deepEqual(r.lowered, []);
});

test("an unchanged entry is neither lowered nor removed", () => {
  const r = verifyFrozenMap({ "a.ts": 1000 }, { "a.ts": 1000 });
  assert.deepEqual(r.problems, []);
  assert.deepEqual(r.removed, []);
  assert.deepEqual(r.lowered, []);
});

test("RAISING an entry is rejected — this is the failure mode the gate exists for", () => {
  const r = verifyFrozenMap({ "a.ts": 1000 }, { "a.ts": 1001 });
  assert.equal(r.problems.length, 1);
  assert.match(r.problems[0], /RAISED 1000 → 1001/);
});

test("ADDING an entry is rejected — banking may not enroll new files", () => {
  const r = verifyFrozenMap({ "a.ts": 1000 }, { "a.ts": 1000, "new.ts": 5000 });
  assert.equal(r.problems.length, 1);
  assert.match(r.problems[0], /new\.ts.*ADDED/);
});

test("deleting a _rebaseline_ note stored inside frozen is rejected", () => {
  const r = verifyFrozenMap({ _rebaseline_x: "why", "a.ts": 10 }, { "a.ts": 10 });
  assert.equal(r.problems.length, 1);
  assert.match(r.problems[0], /_rebaseline_x.*deleted/);
  assert.deepEqual(r.removed, [], "a note is not a banked removal");
});

test("rewriting a note is rejected — the notes are the audit trail", () => {
  const r = verifyFrozenMap({ _rebaseline_x: "why" }, { _rebaseline_x: "different" });
  assert.equal(r.problems.length, 1);
  assert.match(r.problems[0], /rewritten/);
});

// --- file-size baseline as a whole ---

const fsBefore = () => ({
  cap: 800,
  testCap: 800,
  _comment: "keep me",
  frozen: { "a.ts": 1000, _rebaseline_1: "note" },
  testFrozen: { "t.test.ts": 900 },
});

test("file-size: a shrink in frozen and testFrozen is banked", () => {
  const after = fsBefore();
  after.frozen["a.ts"] = 850;
  delete after.testFrozen["t.test.ts"]; // fell under testCap
  const r = verifyFileSizeBaseline(fsBefore(), after);
  assert.deepEqual(r.problems, []);
  assert.deepEqual(r.lowered, [["a.ts", 1000, 850]]);
  assert.deepEqual(r.removed, ["t.test.ts"]);
});

test("file-size: raising the cap is rejected", () => {
  const after = fsBefore();
  after.cap = 1200;
  const r = verifyFileSizeBaseline(fsBefore(), after);
  assert.equal(r.problems.length, 1);
  assert.match(r.problems[0], /"cap" changed/);
});

test("file-size: changing testCap is rejected", () => {
  const after = fsBefore();
  after.testCap = 1200;
  const r = verifyFileSizeBaseline(fsBefore(), after);
  assert.match(r.problems[0], /"testCap" changed/);
});

test("file-size: touching an unrelated top-level key is rejected", () => {
  const after = fsBefore();
  after._comment = "rewritten";
  const r = verifyFileSizeBaseline(fsBefore(), after);
  assert.match(r.problems[0], /"_comment" changed/);
});

// --- complexity baseline ---

const cxBefore = () => ({ _comment: "c", count: 2169, _rebaseline_a: "note" });

test("complexity: lowering count is banked", () => {
  const after = cxBefore();
  after.count = 2100;
  const r = verifyComplexityBaseline(cxBefore(), after);
  assert.deepEqual(r.problems, []);
  assert.deepEqual(r.lowered, [["count", 2169, 2100]]);
});

test("complexity: raising count is rejected", () => {
  const after = cxBefore();
  after.count = 2200;
  const r = verifyComplexityBaseline(cxBefore(), after);
  assert.equal(r.problems.length, 1);
  assert.match(r.problems[0], /count RAISED 2169 → 2200/);
});

test("complexity: adding a rebaseline note is rejected — the bot never justifies a ceiling", () => {
  const after = cxBefore();
  after.count = 2100;
  after._rebaseline_new = "bot said so";
  const r = verifyComplexityBaseline(cxBefore(), after);
  assert.equal(r.problems.length, 1);
  assert.match(r.problems[0], /_rebaseline_new/);
});

// --- quality baseline (cognitive complexity lives nested) ---

const qBefore = () => ({
  metrics: {
    eslintWarnings: { value: 345 },
    cognitiveComplexity: { value: 956, _rebaseline_a: "note" },
  },
});

test("quality: lowering cognitiveComplexity.value is banked", () => {
  const after = qBefore();
  after.metrics.cognitiveComplexity.value = 900;
  const r = verifyQualityBaseline(qBefore(), after);
  assert.deepEqual(r.problems, []);
  assert.deepEqual(r.lowered, [["cognitiveComplexity", 956, 900]]);
});

test("quality: raising cognitiveComplexity.value is rejected", () => {
  const after = qBefore();
  after.metrics.cognitiveComplexity.value = 1000;
  const r = verifyQualityBaseline(qBefore(), after);
  assert.equal(r.problems.length, 1);
  assert.match(r.problems[0], /RAISED 956 → 1000/);
});

test("quality: moving a DIFFERENT metric is rejected even when cognitive went down", () => {
  const after = qBefore();
  after.metrics.cognitiveComplexity.value = 900;
  after.metrics.eslintWarnings.value = 400;
  const r = verifyQualityBaseline(qBefore(), after);
  assert.equal(r.problems.length, 1);
  assert.match(r.problems[0], /other than metrics\.cognitiveComplexity\.value/);
});

// --- aggregator ---

test("verifyRatchetBank reports ok+changed when every file only shrank", () => {
  const fsAfter = fsBefore();
  fsAfter.frozen["a.ts"] = 850;
  const cxAfter = cxBefore();
  cxAfter.count = 2100;
  const r = verifyRatchetBank({
    fileSize: { before: fsBefore(), after: fsAfter },
    complexity: { before: cxBefore(), after: cxAfter },
    quality: { before: qBefore(), after: qBefore() },
  });
  assert.equal(r.ok, true);
  assert.equal(r.changed, true);
  assert.equal(r.lowered.length, 2);
});

test("verifyRatchetBank is not ok if ANY file moved the wrong way", () => {
  const fsAfter = fsBefore();
  fsAfter.frozen["a.ts"] = 850; // legitimate shrink
  const cxAfter = cxBefore();
  cxAfter.count = 2200; // but complexity was raised
  const r = verifyRatchetBank({
    fileSize: { before: fsBefore(), after: fsAfter },
    complexity: { before: cxBefore(), after: cxAfter },
  });
  assert.equal(r.ok, false);
  assert.equal(r.problems.length, 1);
});

test("verifyRatchetBank reports ok+unchanged when nothing moved", () => {
  const r = verifyRatchetBank({
    fileSize: { before: fsBefore(), after: fsBefore() },
    complexity: { before: cxBefore(), after: cxBefore() },
    quality: { before: qBefore(), after: qBefore() },
  });
  assert.equal(r.ok, true);
  assert.equal(r.changed, false);
});

// --- summary rendering (this becomes the PR body) ---

test("formatBankSummary says nothing to bank when unchanged", () => {
  const out = formatBankSummary({ changed: false, lowered: [], removed: [] });
  assert.match(out, /Nothing to bank/);
});

test("formatBankSummary lists both lowered and removed entries", () => {
  const out = formatBankSummary({
    changed: true,
    lowered: [["a.ts", 1000, 850]],
    removed: ["schemas.ts"],
  });
  assert.match(out, /\| `a\.ts` \| 1000 \| 850 \|/);
  assert.match(out, /- `schemas\.ts`/);
});
