/**
 * Sweep verdict memory (in-process, volatile).
 *
 */
import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../src/lib/proxyHealth/sweepVerdict.ts");
const {
  recordSweepVerdict,
  getSweepVerdict,
  getSweepVerdicts,
  deleteSweepVerdict,
  clearSweepVerdicts,
  toSweepVerdict,
} = mod;

test("cause gate: 403 blocked is unproven", () => {
  assert.equal(toSweepVerdict("blocked", 403, 0).cause, "unproven");
});

test("cause gate: 401 and 429 blocked stay unclassified", () => {
  assert.equal(toSweepVerdict("blocked", 401, 0).cause, "unclassified");
  assert.equal(toSweepVerdict("blocked", 429, 0).cause, "unclassified");
});

test("cause gate: non-blocked verdicts stay unclassified", () => {
  for (const verdict of ["ok", "fail", "hang", "inconclusive"] as const) {
    assert.equal(toSweepVerdict(verdict, 403, 0).cause, "unclassified");
  }
});

test("cause gate: blocked without status stays unclassified", () => {
  assert.equal(toSweepVerdict("blocked", null, 0).cause, "unclassified");
});

test("record/get round-trips verdict, cause, status and date", () => {
  clearSweepVerdicts();
  const at = Date.now();
  recordSweepVerdict("p1", { verdict: "blocked", cause: "unproven", status: 403, at });
  assert.deepEqual(getSweepVerdict("p1"), {
    verdict: "blocked",
    cause: "unproven",
    status: 403,
    at,
  });
});

test("empty id is a no-op", () => {
  clearSweepVerdicts();
  recordSweepVerdict("", { verdict: "ok", cause: "unclassified", status: 200, at: Date.now() });
  assert.equal(getSweepVerdict(""), undefined);
  assert.deepEqual(getSweepVerdicts([""]), {});
});

test("batch lookup returns only known ids", () => {
  clearSweepVerdicts();
  const at = Date.now();
  recordSweepVerdict("a", { verdict: "ok", cause: "unclassified", status: 200, at });
  recordSweepVerdict("b", { verdict: "fail", cause: "unclassified", status: null, at });
  const batch = getSweepVerdicts(["a", "b", "missing"]);
  assert.deepEqual(Object.keys(batch).sort(), ["a", "b"]);
  assert.equal(batch.a.verdict, "ok");
});

test("delete removes one entry", () => {
  clearSweepVerdicts();
  const at = Date.now();
  recordSweepVerdict("x", { verdict: "hang", cause: "unclassified", status: null, at });
  deleteSweepVerdict("x");
  assert.equal(getSweepVerdict("x"), undefined);
});

test("rewrite refreshes recency so a fresh id is evicted last", () => {
  clearSweepVerdicts();
  const at = Date.now();
  recordSweepVerdict("old", { verdict: "ok", cause: "unclassified", status: 200, at });
  for (let i = 0; i < 5000; i++) {
    recordSweepVerdict(`fill-${i}`, { verdict: "ok", cause: "unclassified", status: 200, at });
  }
  // Refresh "old" (delete+set moves it to the tail), then add one more entry.
  recordSweepVerdict("old", { verdict: "fail", cause: "unclassified", status: null, at });
  recordSweepVerdict("newest", { verdict: "ok", cause: "unclassified", status: 200, at });
  assert.equal(getSweepVerdict("old")?.verdict, "fail");
  assert.equal(getSweepVerdict("newest")?.verdict, "ok");
  assert.equal(getSweepVerdict("fill-0"), undefined);
});

test("clear isolates suites", () => {
  recordSweepVerdict("z", { verdict: "ok", cause: "unclassified", status: 200, at: Date.now() });
  clearSweepVerdicts();
  assert.deepEqual(getSweepVerdicts(["z"]), {});
});
