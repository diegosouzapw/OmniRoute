/**
 * Unit tests for batch dashboard display logic.
 *
 * Tests the effectiveStatus() and progress calculation functions that
 * determine how batch status badges and progress bars are rendered in
 * BatchListTab.tsx and BatchDetailModal.tsx.
 *
 * These functions are pure and depend on no external modules, so they
 * are duplicated here to allow isolated testing without React/jsdom.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── Pure functions mirroring BatchListTab.tsx / BatchDetailModal.tsx ──────

/**
 * Returns a composite status key that reflects whether partial failures
 * occurred within a batch. Mirrors effectiveStatus() in the UI components.
 */
function effectiveStatus(batch) {
  const hasFailed = (batch.requestCountsFailed ?? 0) > 0;
  if (!hasFailed) return batch.status;
  const map = {
    completed: "completed_with_failures",
    in_progress: "in_progress_with_failures",
    finalizing: "finalizing_with_failures",
    cancelled: "cancelled_with_failures",
  };
  return map[batch.status] ?? batch.status;
}

/**
 * Computes progress bar segment percentages (green = done, red = failed).
 * Mirrors the inline calculations in BatchListTab and BatchDetailModal.
 */
function progressPcts(batch) {
  const total = batch.requestCountsTotal || 0;
  const completed = batch.requestCountsCompleted || 0;
  const failed = batch.requestCountsFailed || 0;
  const donePct = total > 0 ? (completed / total) * 100 : 0;
  const failedPct = total > 0 ? (failed / total) * 100 : 0;
  return { donePct, failedPct, total, completed, failed };
}

// ── effectiveStatus tests ─────────────────────────────────────────────────

describe("effectiveStatus — no failures", () => {
  it("returns 'completed' when requestCountsFailed is 0", () => {
    assert.equal(
      effectiveStatus({ status: "completed", requestCountsFailed: 0 }),
      "completed"
    );
  });

  it("returns 'in_progress' when requestCountsFailed is 0", () => {
    assert.equal(
      effectiveStatus({ status: "in_progress", requestCountsFailed: 0 }),
      "in_progress"
    );
  });

  it("returns 'finalizing' when requestCountsFailed is 0", () => {
    assert.equal(
      effectiveStatus({ status: "finalizing", requestCountsFailed: 0 }),
      "finalizing"
    );
  });

  it("returns 'cancelled' when requestCountsFailed is 0", () => {
    assert.equal(
      effectiveStatus({ status: "cancelled", requestCountsFailed: 0 }),
      "cancelled"
    );
  });

  it("returns 'failed' unchanged (already a failure state)", () => {
    assert.equal(
      effectiveStatus({ status: "failed", requestCountsFailed: 0 }),
      "failed"
    );
  });

  it("returns 'validating' unchanged", () => {
    assert.equal(
      effectiveStatus({ status: "validating", requestCountsFailed: 0 }),
      "validating"
    );
  });

  it("returns 'expired' unchanged", () => {
    assert.equal(
      effectiveStatus({ status: "expired", requestCountsFailed: 0 }),
      "expired"
    );
  });

  it("returns 'cancelling' unchanged", () => {
    assert.equal(
      effectiveStatus({ status: "cancelling", requestCountsFailed: 0 }),
      "cancelling"
    );
  });
});

describe("effectiveStatus — with failures", () => {
  it("completed + failures → completed_with_failures", () => {
    assert.equal(
      effectiveStatus({ status: "completed", requestCountsFailed: 3 }),
      "completed_with_failures"
    );
  });

  it("in_progress + failures → in_progress_with_failures", () => {
    assert.equal(
      effectiveStatus({ status: "in_progress", requestCountsFailed: 1 }),
      "in_progress_with_failures"
    );
  });

  it("finalizing + failures → finalizing_with_failures", () => {
    assert.equal(
      effectiveStatus({ status: "finalizing", requestCountsFailed: 2 }),
      "finalizing_with_failures"
    );
  });

  it("cancelled + failures → cancelled_with_failures", () => {
    assert.equal(
      effectiveStatus({ status: "cancelled", requestCountsFailed: 5 }),
      "cancelled_with_failures"
    );
  });

  it("failed + failures → failed (already a terminal error, no extra suffix)", () => {
    // 'failed' means the whole batch failed, not partial — no mapping needed
    assert.equal(
      effectiveStatus({ status: "failed", requestCountsFailed: 10 }),
      "failed"
    );
  });

  it("expired + failures → expired (no mapping defined)", () => {
    assert.equal(
      effectiveStatus({ status: "expired", requestCountsFailed: 1 }),
      "expired"
    );
  });

  it("validating + failures → validating (no mapping defined)", () => {
    assert.equal(
      effectiveStatus({ status: "validating", requestCountsFailed: 1 }),
      "validating"
    );
  });

  it("cancelling + failures → cancelling (no mapping defined)", () => {
    assert.equal(
      effectiveStatus({ status: "cancelling", requestCountsFailed: 2 }),
      "cancelling"
    );
  });
});

describe("effectiveStatus — edge cases", () => {
  it("treats null requestCountsFailed as 0", () => {
    assert.equal(
      effectiveStatus({ status: "completed", requestCountsFailed: null }),
      "completed"
    );
  });

  it("treats undefined requestCountsFailed as 0", () => {
    assert.equal(
      effectiveStatus({ status: "completed" }),
      "completed"
    );
  });

  it("treats negative failed count as 0 (> 0 check is false for negatives)", () => {
    // Negative counts should not happen in practice.
    // The check is `> 0`, so -1 does not trigger the failure mapping.
    assert.equal(
      effectiveStatus({ status: "completed", requestCountsFailed: -1 }),
      "completed"
    );
  });
});

// ── Progress percentage tests ─────────────────────────────────────────────

describe("progressPcts — zero total", () => {
  it("returns 0 for both pcts when total is 0", () => {
    const { donePct, failedPct } = progressPcts({
      requestCountsTotal: 0,
      requestCountsCompleted: 0,
      requestCountsFailed: 0,
    });
    assert.equal(donePct, 0);
    assert.equal(failedPct, 0);
  });

  it("returns 0 for both pcts when total is missing", () => {
    const { donePct, failedPct } = progressPcts({});
    assert.equal(donePct, 0);
    assert.equal(failedPct, 0);
  });
});

describe("progressPcts — normal cases", () => {
  it("all completed, no failures → donePct=100, failedPct=0", () => {
    const { donePct, failedPct } = progressPcts({
      requestCountsTotal: 10,
      requestCountsCompleted: 10,
      requestCountsFailed: 0,
    });
    assert.equal(donePct, 100);
    assert.equal(failedPct, 0);
  });

  it("all failed, none completed → donePct=0, failedPct=100", () => {
    const { donePct, failedPct } = progressPcts({
      requestCountsTotal: 4,
      requestCountsCompleted: 0,
      requestCountsFailed: 4,
    });
    assert.equal(donePct, 0);
    assert.equal(failedPct, 100);
  });

  it("mixed: 6 done, 2 failed of 10 total", () => {
    const { donePct, failedPct } = progressPcts({
      requestCountsTotal: 10,
      requestCountsCompleted: 6,
      requestCountsFailed: 2,
    });
    assert.equal(donePct, 60);
    assert.equal(failedPct, 20);
  });

  it("done + failed < total (still in progress)", () => {
    const { donePct, failedPct } = progressPcts({
      requestCountsTotal: 100,
      requestCountsCompleted: 30,
      requestCountsFailed: 10,
    });
    assert.equal(donePct, 30);
    assert.equal(failedPct, 10);
  });

  it("single item done", () => {
    const { donePct, failedPct } = progressPcts({
      requestCountsTotal: 1,
      requestCountsCompleted: 1,
      requestCountsFailed: 0,
    });
    assert.equal(donePct, 100);
    assert.equal(failedPct, 0);
  });

  it("single item failed", () => {
    const { donePct, failedPct } = progressPcts({
      requestCountsTotal: 1,
      requestCountsCompleted: 0,
      requestCountsFailed: 1,
    });
    assert.equal(donePct, 0);
    assert.equal(failedPct, 100);
  });
});

describe("progressPcts — combined progress bar width", () => {
  it("combined pct (done + failed) equals overall processed fraction", () => {
    const { donePct, failedPct } = progressPcts({
      requestCountsTotal: 10,
      requestCountsCompleted: 3,
      requestCountsFailed: 4,
    });
    const combinedPct = Math.round(donePct + failedPct);
    assert.equal(combinedPct, 70); // (3+4)/10 = 70%
  });

  it("combined pct stays ≤ 100 when all processed", () => {
    const { donePct, failedPct } = progressPcts({
      requestCountsTotal: 5,
      requestCountsCompleted: 3,
      requestCountsFailed: 2,
    });
    const combinedPct = donePct + failedPct;
    assert.ok(combinedPct <= 100, `Combined pct ${combinedPct} should not exceed 100`);
    assert.equal(combinedPct, 100);
  });
});
