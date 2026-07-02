import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-reset-events-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { recordProviderQuotaResetEventIfChanged, getProviderQuotaWindowStartIso } = await import(
  "../../../src/lib/db/quotaResetEvents.ts"
);

// Force migrations (incl. 108_provider_quota_reset_events) to run.
core.getDbInstance();

const CONN = "conn-1";
const PROVIDER = "antigravity";
const PREV_RESET = "2026-01-08T00:00:00.000Z";
const CUR_RESET = "2026-01-15T00:00:00.000Z"; // +7d, different day
const OBSERVED = "2026-01-15T00:05:00.000Z";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("records a weekly window transition and getWindowStart returns the prior window start", () => {
  recordProviderQuotaResetEventIfChanged({
    provider: PROVIDER,
    connectionId: CONN,
    windowKey: "weekly",
    currentResetAt: CUR_RESET,
    currentRemainingPercentage: 100,
    previousObservation: { resetAt: PREV_RESET, remainingPercentage: 5 },
    observedAt: OBSERVED,
  });

  // For the new window (resets at CUR_RESET) the observed start is PREV_RESET.
  const start = getProviderQuotaWindowStartIso(CONN, CUR_RESET, Date.parse(OBSERVED) + 1000);
  assert.equal(start, PREV_RESET);
});

test("getWindowStart returns null for a reset day with no recorded event", () => {
  assert.equal(
    getProviderQuotaWindowStartIso(CONN, "2026-02-01T00:00:00.000Z", Date.parse(OBSERVED) + 1000),
    null
  );
});

test("does not record when previous and current reset fall on the same day (no transition)", () => {
  recordProviderQuotaResetEventIfChanged({
    provider: PROVIDER,
    connectionId: "conn-sameday",
    windowKey: "weekly",
    currentResetAt: "2026-03-10T23:00:00.000Z",
    currentRemainingPercentage: 80,
    previousObservation: { resetAt: "2026-03-10T01:00:00.000Z", remainingPercentage: 70 },
    observedAt: "2026-03-10T23:30:00.000Z",
  });
  assert.equal(
    getProviderQuotaWindowStartIso(
      "conn-sameday",
      "2026-03-10T23:00:00.000Z",
      Date.parse("2026-03-11T00:00:00.000Z")
    ),
    null
  );
});

test("does not record for a non-weekly (e.g. daily) window", () => {
  recordProviderQuotaResetEventIfChanged({
    provider: PROVIDER,
    connectionId: "conn-daily",
    windowKey: "daily",
    currentResetAt: CUR_RESET,
    currentRemainingPercentage: 100,
    previousObservation: { resetAt: PREV_RESET, remainingPercentage: 5 },
    observedAt: OBSERVED,
  });
  assert.equal(
    getProviderQuotaWindowStartIso("conn-daily", CUR_RESET, Date.parse(OBSERVED) + 1000),
    null
  );
});
