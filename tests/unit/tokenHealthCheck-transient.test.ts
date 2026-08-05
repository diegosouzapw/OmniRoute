import { describe, it } from "node:test";
import assert from "node:assert/strict";

// We import the exported helpers directly. The module auto-starts the
// health-check timer on import, so we stop it immediately in a before hook.
import {
  isInRefreshBackoff,
  buildRefreshFailureUpdate,
  buildTransientRefreshRetryUpdate,
  stopTokenHealthCheck,
} from "../../src/lib/tokenHealthCheck.ts";

// Stop the auto-started timer so tests do not leak intervals.
stopTokenHealthCheck();

describe("buildTransientRefreshRetryUpdate", () => {
  it("sets a flat 2-minute window from now", () => {
    const now = "2026-08-02T12:00:00.000Z";
    const conn = { testStatus: "active", providerSpecificData: {} };
    const update = buildTransientRefreshRetryUpdate(conn, now);

    const untilMs = new Date(update.providerSpecificData.refreshCircuit.until).getTime();
    const nowMs = new Date(now).getTime();
    const diffMin = (untilMs - nowMs) / 60_000;

    assert.equal(diffMin, 2, `expected 2-minute window, got ${diffMin}`);
  });

  it("preserves existing streak from prior permanent failures", () => {
    const now = "2026-08-02T12:00:00.000Z";
    // Connection already had streak=3 from prior permanent failures.
    // Transient error should preserve it, not reset to 0.
    const conn = {
      testStatus: "active",
      providerSpecificData: { refreshCircuit: { streak: 3, until: "2026-08-02T10:00:00.000Z" } },
    };
    const update = buildTransientRefreshRetryUpdate(conn, now);

    assert.equal(update.providerSpecificData.refreshCircuit.streak, 3);
  });

  it("sets transient flag to true", () => {
    const now = "2026-08-02T12:00:00.000Z";
    const conn = { testStatus: "active", providerSpecificData: {} };
    const update = buildTransientRefreshRetryUpdate(conn, now);

    assert.equal(update.providerSpecificData.refreshCircuit.transient, true);
  });

  it("sets errorCode to refresh_transient", () => {
    const now = "2026-08-02T12:00:00.000Z";
    const conn = { testStatus: "active", providerSpecificData: {} };
    const update = buildTransientRefreshRetryUpdate(conn, now);

    assert.equal(update.errorCode, "refresh_transient");
    assert.equal(update.lastErrorType, "token_refresh_transient");
  });

  it("preserves expired status for already-expired connections", () => {
    const now = "2026-08-02T12:00:00.000Z";
    const conn = { testStatus: "expired", providerSpecificData: {} };
    const update = buildTransientRefreshRetryUpdate(conn, now);

    assert.equal(update.testStatus, "expired");
  });

  it("keeps active status for non-expired connections", () => {
    const now = "2026-08-02T12:00:00.000Z";
    const conn = { testStatus: "active", providerSpecificData: {} };
    const update = buildTransientRefreshRetryUpdate(conn, now);

    assert.equal(update.testStatus, "active");
  });
});

describe("buildRefreshFailureUpdate (existing behavior preserved)", () => {
  it("increments the streak", () => {
    const now = "2026-08-02T12:00:00.000Z";
    const conn = {
      testStatus: "active",
      providerSpecificData: { refreshCircuit: { streak: 2, until: "2026-08-02T10:00:00.000Z" } },
    };
    const update = buildRefreshFailureUpdate(conn, now);

    assert.equal(update.providerSpecificData.refreshCircuit.streak, 3);
  });

  it("applies exponential backoff (streak 3 -> 20 min)", () => {
    const now = "2026-08-02T12:00:00.000Z";
    const conn = {
      testStatus: "active",
      providerSpecificData: { refreshCircuit: { streak: 2, until: "2026-08-02T10:00:00.000Z" } },
    };
    const update = buildRefreshFailureUpdate(conn, now);

    const untilMs = new Date(update.providerSpecificData.refreshCircuit.until).getTime();
    const nowMs = new Date(now).getTime();
    const diffMin = (untilMs - nowMs) / 60_000;

    // streak=3 -> 5 * 2^(3-1) = 20 minutes
    assert.equal(diffMin, 20, `expected 20-minute backoff for streak 3, got ${diffMin}`);
  });
});

describe("transient vs permanent: integration", () => {
  it("transient retry window is shorter than minimum exponential backoff", () => {
    const now = "2026-08-02T12:00:00.000Z";
    const conn = { testStatus: "active", providerSpecificData: {} };

    const transient = buildTransientRefreshRetryUpdate(conn, now);
    const permanent = buildRefreshFailureUpdate(conn, now);

    const transientUntil = new Date(transient.providerSpecificData.refreshCircuit.until).getTime();
    const permanentUntil = new Date(permanent.providerSpecificData.refreshCircuit.until).getTime();

    assert.ok(
      transientUntil < permanentUntil,
      "transient 2min window should be shorter than permanent 5min exponential backoff"
    );
  });

  it("transient does not accumulate into permanent streak", () => {
    const now = "2026-08-02T12:00:00.000Z";
    // Simulate: 3 transient failures in a row
    let conn: { testStatus: string; providerSpecificData: Record<string, unknown> } = {
      testStatus: "active",
      providerSpecificData: {},
    };
    for (let i = 0; i < 3; i++) {
      const update = buildTransientRefreshRetryUpdate(conn, now);
      conn = { ...conn, providerSpecificData: update.providerSpecificData };
    }

    // Streak should still be 0 -- transient errors do not accumulate
    assert.equal(conn.providerSpecificData.refreshCircuit.streak, 0);
  });
});

describe("isInRefreshBackoff respects transient window", () => {
  it("returns true during transient window", () => {
    const now = "2026-08-02T12:00:00.000Z";
    const conn = { testStatus: "active", providerSpecificData: {} };
    const update = buildTransientRefreshRetryUpdate(conn, now);
    const connWithCircuit = { providerSpecificData: update.providerSpecificData };

    // 1 minute later -- still within 2-minute window
    const oneMinLater = new Date(now).getTime() + 60_000;
    assert.equal(isInRefreshBackoff(connWithCircuit, oneMinLater), true);
  });

  it("returns false after transient window expires", () => {
    const now = "2026-08-02T12:00:00.000Z";
    const conn = { testStatus: "active", providerSpecificData: {} };
    const update = buildTransientRefreshRetryUpdate(conn, now);
    const connWithCircuit = { providerSpecificData: update.providerSpecificData };

    // 3 minutes later -- past the 2-minute window
    const threeMinLater = new Date(now).getTime() + 3 * 60_000;
    assert.equal(isInRefreshBackoff(connWithCircuit, threeMinLater), false);
  });
});
