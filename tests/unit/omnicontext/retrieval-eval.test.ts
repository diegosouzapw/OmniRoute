/**
 * Dedicated Continuity retrieval eval gate (Recall@3 ≥ 0.85, no wrong-project leak).
 * Wired as CI job `test-omnicontext-retrieval-eval` via `npm run test:omnicontext:retrieval-eval`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-omnicontext-retrieval-eval-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../../src/lib/db/core.ts");
const { RETRIEVAL_EVAL_FIXTURES } = await import("../../../src/lib/omnicontext/eval/fixtures.ts");
const { runRetrievalEvalSuite } =
  await import("../../../src/lib/omnicontext/eval/retrievalEval.ts");

test.beforeEach(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function createTestApiKey(id: string) {
  const db = coreDb.getDbInstance();
  db.prepare(
    "INSERT OR IGNORE INTO api_keys (id, name, key, machine_id, scopes, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(id, id, `sk-test-${id}`, "test-machine", "[]", new Date().toISOString());
}

test("retrieval eval suite meets Recall@3 gate and no wrong-project leak", () => {
  createTestApiKey("eval-key");
  const suite = runRetrievalEvalSuite(RETRIEVAL_EVAL_FIXTURES, "eval-key");
  assert.equal(suite.allPassed, true);
  assert.ok(suite.meanRecallAt3 >= 0.85);
  for (const result of suite.results) {
    assert.equal(result.passed, true, `case ${result.caseId} failed: ${JSON.stringify(result)}`);
  }
});
