// tests/unit/combo/combo-failure-tracker-session-isolation.test.ts
// Regression guard: recordComboFailure()'s auto-clear must be scoped to the
// FAILING session only. Prior to this fix, failureTracker.ts called
// clearSessionModelHistoryForCombo(comboName) — a combo-WIDE delete with no
// session_id filter — so one session crossing the consecutive-failure
// threshold silently dropped every OTHER session's live pin on that same
// combo. See src/lib/db/contextHandoffs.ts::deleteSessionModelHistory (the
// session-scoped replacement) and open-sse/services/combo/failureTracker.ts.
//
// This exercises the real session_model_history table (not just the
// in-memory failure counter covered by combo-failure-tracker.test.ts), so it
// needs an isolated, throwaway DATA_DIR. process.env.DATA_DIR is set BEFORE
// the dynamic imports below (module-level DB constants are resolved once, at
// first import, in src/lib/db/core.ts) — this file intentionally avoids any
// static import of the DB-backed modules so it stays hermetic whether it is
// run standalone (`node --test <file>`, no isolateDataDir --import) or as
// part of the full suite.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-combo-failure-tracker-session-isolation-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const handoffDb = await import("../../../src/lib/db/contextHandoffs.ts");
const failureTracker = await import("../../../open-sse/services/combo/failureTracker.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("recordComboFailure clears only the failing session's pin, leaving other sessions on the same combo untouched", () => {
  failureTracker.__resetComboFailureTrackerForTests();
  const comboName = "combo-session-isolation-probe";

  // Seed pins for two different sessions sharing the SAME combo.
  handoffDb.recordSessionModelUsage("sessA-probe", comboName, "openai/gpt-4o", "openai");
  handoffDb.recordSessionModelUsage("sessB-probe", comboName, "anthropic/claude", "anthropic");

  // Sanity: both pins exist before any failure is recorded.
  assert.equal(handoffDb.getLastSessionModel("sessA-probe", comboName), "openai/gpt-4o");
  assert.equal(handoffDb.getLastSessionModel("sessB-probe", comboName), "anthropic/claude");

  // Only session A crosses the consecutive-failure threshold.
  let lastResult = { count: 0, pinClearedNow: false };
  for (let i = 0; i < failureTracker.COMBO_FAILURE_THRESHOLD; i++) {
    lastResult = failureTracker.recordComboFailure("sessA-probe", comboName);
  }
  assert.equal(lastResult.count, failureTracker.COMBO_FAILURE_THRESHOLD);
  assert.equal(lastResult.pinClearedNow, true, "threshold-cross should report a pin clear");

  // The failing session's pin is cleared...
  assert.equal(
    handoffDb.getLastSessionModel("sessA-probe", comboName),
    null,
    "the failing session's own pin should be cleared"
  );
  // ...but the healthy, unrelated session's pin on the SAME combo survives.
  assert.equal(
    handoffDb.getLastSessionModel("sessB-probe", comboName),
    "anthropic/claude",
    "an unrelated session's pin on the same combo must NOT be dropped"
  );
});

test("recordComboFailure does not disturb an unrelated combo's pin for the SAME failing session", () => {
  failureTracker.__resetComboFailureTrackerForTests();
  const failingCombo = "combo-session-isolation-failing";
  const otherCombo = "combo-session-isolation-other";

  handoffDb.recordSessionModelUsage("sessC-probe", failingCombo, "openai/gpt-4o", "openai");
  handoffDb.recordSessionModelUsage("sessC-probe", otherCombo, "anthropic/claude", "anthropic");

  for (let i = 0; i < failureTracker.COMBO_FAILURE_THRESHOLD; i++) {
    failureTracker.recordComboFailure("sessC-probe", failingCombo);
  }

  assert.equal(handoffDb.getLastSessionModel("sessC-probe", failingCombo), null);
  assert.equal(
    handoffDb.getLastSessionModel("sessC-probe", otherCombo),
    "anthropic/claude",
    "the same session's pin on a DIFFERENT combo must not be cleared"
  );
});
