import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-evals-scorecard-route-"));
const TEST_MIGRATIONS_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-evals-scorecard-migrations-")
);
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_MIGRATIONS_DIR = process.env.OMNIROUTE_MIGRATIONS_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = TEST_MIGRATIONS_DIR;

fs.copyFileSync(
  path.join(process.cwd(), "src/lib/db/migrations/022_evals_tables.sql"),
  path.join(TEST_MIGRATIONS_DIR, "022_evals_tables.sql")
);

const core = await import("../../src/lib/db/core.ts");
const evalsDb = await import("../../src/lib/db/evals.ts");
const route = await import("../../src/app/api/evals/scorecard/route.ts");

function createEvalSuite(id: string, name: string) {
  core
    .getDbInstance()
    .prepare("INSERT INTO eval_suites (id, name, description, created_at) VALUES (?, ?, ?, ?)")
    .run(id, name, "", Date.now());
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.rmSync(TEST_MIGRATIONS_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }

  if (ORIGINAL_MIGRATIONS_DIR === undefined) {
    delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  } else {
    process.env.OMNIROUTE_MIGRATIONS_DIR = ORIGINAL_MIGRATIONS_DIR;
  }
});

test("eval scorecard route compares two persisted runs from the same suite", async () => {
  createEvalSuite("suite-alpha", "Suite Alpha");

  const runA = {
    suiteId: "suite-alpha",
    suiteName: "Suite Alpha",
    results: [
      { caseId: "c1", caseName: "Case 1", passed: true, durationMs: 120 },
      { caseId: "c2", caseName: "Case 2", passed: false, durationMs: 180 },
    ],
    summary: { total: 2, passed: 1, failed: 1, passRate: 50 },
  };
  const runB = {
    suiteId: "suite-alpha",
    suiteName: "Suite Alpha",
    results: [
      { caseId: "c1", caseName: "Case 1", passed: true, durationMs: 90 },
      { caseId: "c2", caseName: "Case 2", passed: true, durationMs: 100 },
    ],
    summary: { total: 2, passed: 2, failed: 0, passRate: 100 },
  };

  const runIdA = evalsDb.saveEvalResult("suite-alpha", "combo/reliable", "combo", 50, 150, runA);
  const runIdB = evalsDb.saveEvalResult("suite-alpha", "openai/gpt-4o", "model", 100, 95, runB);

  const response = await route.POST(
    new Request("http://localhost/api/evals/scorecard", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ runIdA, runIdB }),
    })
  );

  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.meta.targetA, "combo/reliable");
  assert.equal(body.meta.targetB, "openai/gpt-4o");
  assert.equal(body.scorecard.runA.passRate, 50);
  assert.equal(body.scorecard.runA.avgLatency, 150);
  assert.equal(body.scorecard.runB.passRate, 100);
  assert.equal(body.scorecard.runB.avgLatency, 95);
  assert.equal(body.scorecard.aggregate.overallPassRate, 75);
  assert.equal(body.scorecard.summary.preferredTarget, "B");
});

test("eval scorecard route rejects comparisons across different suites", async () => {
  createEvalSuite("suite-a", "Suite A");
  createEvalSuite("suite-b", "Suite B");

  const runIdA = evalsDb.saveEvalResult("suite-a", "combo/a", "combo", 100, 120, {
    suiteId: "suite-a",
    suiteName: "Suite A",
    results: [{ caseId: "a1", caseName: "A1", passed: true, durationMs: 120 }],
    summary: { total: 1, passed: 1, failed: 0, passRate: 100 },
  });
  const runIdB = evalsDb.saveEvalResult("suite-b", "model/b", "model", 100, 130, {
    suiteId: "suite-b",
    suiteName: "Suite B",
    results: [{ caseId: "b1", caseName: "B1", passed: true, durationMs: 130 }],
    summary: { total: 1, passed: 1, failed: 0, passRate: 100 },
  });

  const response = await route.POST(
    new Request("http://localhost/api/evals/scorecard", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ runIdA, runIdB }),
    })
  );
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.match(body.error, /same suite/i);
});
