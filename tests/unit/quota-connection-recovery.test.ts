import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import {
  CREDITS_EXHAUSTED_STATUS,
  isCreditsExhaustedReprobeCandidate,
  isExpiredReprobeCandidate,
  isRecoverableCooldownConnection,
  selectRecoverableConnections,
  runConnectionRecoveryTick,
  TERMINAL_CONNECTION_STATUSES,
} from "@/lib/quota/connectionRecovery";

describe("connectionRecovery — credits_exhausted reprobe", () => {
  const nowMs = 1_700_000_000_000;
  const thirtyMinMs = 30 * 60 * 1000;

  it("should NOT recover credits_exhausted as transient cooldown", () => {
    const conn = {
      id: "conn-1",
      testStatus: CREDITS_EXHAUSTED_STATUS,
      rateLimitedUntil: new Date(nowMs - 5000).toISOString(),
    };
    assert.equal(isRecoverableCooldownConnection(conn, nowMs), false);
  });

  it("should reprobe credits_exhausted when >30m has elapsed since lastErrorAt", () => {
    const thirtyOneMinAgo = new Date(nowMs - thirtyMinMs - 60_000).toISOString();
    const conn = {
      id: "conn-1",
      testStatus: CREDITS_EXHAUSTED_STATUS,
      lastErrorAt: thirtyOneMinAgo,
    };
    assert.equal(isCreditsExhaustedReprobeCandidate(conn, nowMs), true);
  });

  it("should NOT reprobe credits_exhausted when <30m has elapsed since lastErrorAt", () => {
    const tenMinAgo = new Date(nowMs - 10 * 60 * 1000).toISOString();
    const conn = {
      id: "conn-1",
      testStatus: CREDITS_EXHAUSTED_STATUS,
      lastErrorAt: tenMinAgo,
    };
    assert.equal(isCreditsExhaustedReprobeCandidate(conn, nowMs), false);
  });

  it("should reprobe credits_exhausted if no timestamp is present (first tick after startup)", () => {
    const conn = {
      id: "conn-1",
      testStatus: CREDITS_EXHAUSTED_STATUS,
    };
    assert.equal(isCreditsExhaustedReprobeCandidate(conn, nowMs), true);
  });

  it("selectRecoverableConnections includes both transient cooldowns and expired credits_exhausted", () => {
    const activeTransient = {
      id: "t-1",
      testStatus: "unavailable",
      rateLimitedUntil: new Date(nowMs - 1000).toISOString(),
    };
    const expiredCredits = {
      id: "c-1",
      testStatus: CREDITS_EXHAUSTED_STATUS,
      lastErrorAt: new Date(nowMs - thirtyMinMs - 1000).toISOString(),
    };
    const freshCredits = {
      id: "c-2",
      testStatus: CREDITS_EXHAUSTED_STATUS,
      lastErrorAt: new Date(nowMs - 1000).toISOString(),
    };

    const selected = selectRecoverableConnections(
      [activeTransient, expiredCredits, freshCredits],
      nowMs
    );
    assert.deepEqual(
      selected.map((c) => c.id),
      ["t-1", "c-1"]
    );
  });

  it("runConnectionRecoveryTick calls clearConnectionError for reprobe candidates", async () => {
    const loadConnections = mock.fn(async () => [
      {
        id: "c-1",
        testStatus: CREDITS_EXHAUSTED_STATUS,
        lastErrorAt: new Date(nowMs - thirtyMinMs - 1000).toISOString(),
      },
    ]);
    const clearConnectionError = mock.fn(async () => undefined);

    const res = await runConnectionRecoveryTick({
      nowMs,
      loadConnections,
      clearConnectionError,
    });

    assert.equal(res.recovered, 1);
    assert.deepEqual(res.recoveredIds, ["c-1"]);
    assert.equal(clearConnectionError.mock.callCount(), 1);
    assert.equal(clearConnectionError.mock.calls[0].arguments[0], "c-1");
    assert.notEqual(clearConnectionError.mock.calls[0].arguments[1], undefined);
  });
});

describe("connectionRecovery — stale testStatus='error' labels", () => {
  const nowMs = 1_700_000_000_000;

  it("should recover an error-status connection whose cooldown elapsed", () => {
    const conn = {
      id: "e-1",
      testStatus: "error",
      rateLimitedUntil: new Date(nowMs - 1000).toISOString(),
    };
    assert.equal(isRecoverableCooldownConnection(conn, nowMs), true);
  });

  it("should recover an error-status connection with no cooldown at all (stale label)", () => {
    const conn = {
      id: "e-2",
      testStatus: "error",
      rateLimitedUntil: null,
      lastErrorAt: new Date(nowMs - 5 * 60 * 1000).toISOString(),
    };
    assert.equal(isRecoverableCooldownConnection(conn, nowMs), true);
  });

  it("should NOT recover a fresh no-cooldown error label inside the grace window", () => {
    const conn = {
      id: "e-2b",
      testStatus: "error",
      rateLimitedUntil: null,
      lastErrorAt: new Date(nowMs - 30 * 1000).toISOString(),
    };
    assert.equal(isRecoverableCooldownConnection(conn, nowMs), false);
  });

  it("should NOT recover an error label with neither cooldown nor timestamp (unverifiable)", () => {
    const conn = { id: "e-2c", testStatus: "error", rateLimitedUntil: null };
    assert.equal(isRecoverableCooldownConnection(conn, nowMs), false);
  });

  it("should NOT recover an error-status connection still inside its cooldown window", () => {
    const conn = {
      id: "e-3",
      testStatus: "error",
      rateLimitedUntil: new Date(nowMs + 30_000).toISOString(),
    };
    assert.equal(isRecoverableCooldownConnection(conn, nowMs), false);
  });

  it("should NOT recover terminal statuses", () => {
    for (const status of TERMINAL_CONNECTION_STATUSES) {
      const conn = {
        id: "e-4",
        testStatus: status,
        rateLimitedUntil: new Date(nowMs - 1000).toISOString(),
      };
      assert.equal(isRecoverableCooldownConnection(conn, nowMs), false, status);
    }
  });

  it("selectRecoverableConnections includes stale error labels alongside cooldown recoveries", () => {
    const staleError = {
      id: "e-1",
      testStatus: "error",
      rateLimitedUntil: null,
      lastErrorAt: new Date(nowMs - 10 * 60 * 1000).toISOString(),
    };
    const coolingError = {
      id: "e-2",
      testStatus: "error",
      rateLimitedUntil: new Date(nowMs + 60_000).toISOString(),
    };
    const transient = {
      id: "t-1",
      testStatus: "unavailable",
      rateLimitedUntil: new Date(nowMs - 1000).toISOString(),
    };
    const selected = selectRecoverableConnections([staleError, coolingError, transient], nowMs);
    assert.deepEqual(
      selected.map((c) => c.id),
      ["e-1", "t-1"]
    );
  });
});

describe("connectionRecovery — unrecognized statuses", () => {
  const nowMs = 1_700_000_000_000;
  it("should NOT recover an unknown testStatus value", () => {
    const conn = {
      id: "u-1",
      testStatus: "unknown-status",
      rateLimitedUntil: new Date(nowMs - 1000).toISOString(),
    };
    assert.equal(isRecoverableCooldownConnection(conn, nowMs), false);
  });
});

describe("connectionRecovery — mixed timestamp encodings", () => {
  const nowMs = 1_700_000_000_000;
  it("should recover a stale error label with a numeric-string lastErrorAt", () => {
    const conn = {
      id: "n-1",
      testStatus: "error",
      rateLimitedUntil: null,
      lastErrorAt: String(nowMs - 120_000), // epoch-ms string, 2 minutes ago
    };
    assert.equal(isRecoverableCooldownConnection(conn, nowMs), true);
  });
  it("should NOT recover a fresh error label with a numeric-string lastErrorAt", () => {
    const conn = {
      id: "n-2",
      testStatus: "error",
      rateLimitedUntil: null,
      lastErrorAt: String(nowMs - 10_000), // 10s ago — inside the grace window
    };
    assert.equal(isRecoverableCooldownConnection(conn, nowMs), false);
  });
});

describe("connectionRecovery — expired reprobe", () => {
  const nowMs = 1_700_000_000_000;
  const thirtyMinMs = 30 * 60 * 1000;

  it("should reprobe expired after 30m unless lastErrorType is a real deactivation", () => {
    const old = {
      id: "e-1",
      testStatus: "expired",
      lastErrorAt: new Date(nowMs - thirtyMinMs - 1000).toISOString(),
      lastErrorType: "unauthorized",
    };
    assert.equal(isExpiredReprobeCandidate(old, nowMs), true);
    assert.equal(
      isExpiredReprobeCandidate({ ...old, lastErrorType: "invalid_grant" }, nowMs),
      false
    );
  });

  it("selectRecoverableConnections includes stale expired rows", () => {
    const selected = selectRecoverableConnections(
      [
        {
          id: "e-1",
          testStatus: "expired",
          lastErrorAt: new Date(nowMs - thirtyMinMs - 1000).toISOString(),
        },
      ],
      nowMs
    );
    assert.deepEqual(selected.map((c) => c.id), ["e-1"]);
  });
});
