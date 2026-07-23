import { describe, expect, it, vi } from "vitest";
import {
  CREDITS_EXHAUSTED_STATUS,
  isCreditsExhaustedReprobeCandidate,
  isRecoverableCooldownConnection,
  selectRecoverableConnections,
  runConnectionRecoveryTick,
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
    expect(isRecoverableCooldownConnection(conn, nowMs)).toBe(false);
  });

  it("should reprobe credits_exhausted when >30m has elapsed since lastErrorAt", () => {
    const thirtyOneMinAgo = new Date(nowMs - thirtyMinMs - 60_000).toISOString();
    const conn = {
      id: "conn-1",
      testStatus: CREDITS_EXHAUSTED_STATUS,
      lastErrorAt: thirtyOneMinAgo,
    };
    expect(isCreditsExhaustedReprobeCandidate(conn, nowMs)).toBe(true);
  });

  it("should NOT reprobe credits_exhausted when <30m has elapsed since lastErrorAt", () => {
    const tenMinAgo = new Date(nowMs - 10 * 60 * 1000).toISOString();
    const conn = {
      id: "conn-1",
      testStatus: CREDITS_EXHAUSTED_STATUS,
      lastErrorAt: tenMinAgo,
    };
    expect(isCreditsExhaustedReprobeCandidate(conn, nowMs)).toBe(false);
  });

  it("should reprobe credits_exhausted if no timestamp is present (first tick after startup)", () => {
    const conn = {
      id: "conn-1",
      testStatus: CREDITS_EXHAUSTED_STATUS,
    };
    expect(isCreditsExhaustedReprobeCandidate(conn, nowMs)).toBe(true);
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
    expect(selected.map((c) => c.id)).toEqual(["t-1", "c-1"]);
  });

  it("runConnectionRecoveryTick calls clearConnectionError for reprobe candidates", async () => {
    const loadConnections = vi.fn().mockResolvedValue([
      {
        id: "c-1",
        testStatus: CREDITS_EXHAUSTED_STATUS,
        lastErrorAt: new Date(nowMs - thirtyMinMs - 1000).toISOString(),
      },
    ]);
    const clearConnectionError = vi.fn().mockResolvedValue(undefined);

    const res = await runConnectionRecoveryTick({
      nowMs,
      loadConnections,
      clearConnectionError,
    });

    expect(res.recovered).toBe(1);
    expect(res.recoveredIds).toEqual(["c-1"]);
    expect(clearConnectionError).toHaveBeenCalledWith("c-1", expect.anything());
  });
});
