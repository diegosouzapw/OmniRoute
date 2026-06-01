import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  upsertHandoff,
  getHandoff,
  deleteHandoff,
  cleanupExpiredHandoffs,
  hasActiveHandoff,
} from "../../src/lib/db/contextHandoffs.ts";

describe("contextHandoffs", () => {
  const sessionId = `handoff-sess-${Date.now()}`;
  const comboName = "test-combo";

  const payload = {
    sessionId,
    comboName,
    fromAccount: "account-1",
    summary: "Test summary",
    keyDecisions: ["decision-1", "decision-2"],
    taskProgress: "50%",
    activeEntities: ["entity-1"],
    messageCount: 10,
    model: "gpt-4o",
    warningThresholdPct: 0.85,
    generatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
  };

  it("upsertHandoff stores without throwing", () => {
    upsertHandoff(payload);
  });

  it("getHandoff retrieves stored handoff", () => {
    const result = getHandoff(sessionId, comboName);
    assert.ok(result, "should return handoff");
    assert.equal(result!.sessionId, sessionId);
    assert.equal(result!.comboName, comboName);
    assert.deepEqual(result!.keyDecisions, ["decision-1", "decision-2"]);
  });

  it("hasActiveHandoff returns true for existing handoff", () => {
    assert.equal(hasActiveHandoff(sessionId, comboName), true);
  });

  it("upsertHandoff overwrites existing handoff", () => {
    upsertHandoff({ ...payload, summary: "Updated summary" });
    const result = getHandoff(sessionId, comboName);
    assert.equal(result!.summary, "Updated summary");
  });

  it("deleteHandoff removes entry", () => {
    const delSession = `del-handoff-${Date.now()}`;
    upsertHandoff({ ...payload, sessionId: delSession });
    deleteHandoff(delSession, comboName);
    assert.equal(getHandoff(delSession, comboName), null);
  });

  it("cleanupExpiredHandoffs removes expired entries", () => {
    const expiredSession = `expired-${Date.now()}`;
    upsertHandoff({
      ...payload,
      sessionId: expiredSession,
      expiresAt: new Date(Date.now() - 1000).toISOString(),
    });
    cleanupExpiredHandoffs();
    assert.equal(getHandoff(expiredSession, comboName), null);
  });

  it("getHandoff returns null for unknown session", () => {
    assert.equal(getHandoff(`unknown-${Date.now()}`, comboName), null);
  });
});
