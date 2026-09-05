/**
 * Pool-diagnosis wiring: paid-only filter, model lockout, and STRICT-zero-cost
 * exclusions each report what they removed so an empty `auto/*` pool names
 * the stage that emptied it instead of failing silently.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { filterPaidOnlyCandidatesWithDiagnosis } from "../../open-sse/services/autoCombo/paidModelFilter.ts";
import { filterLockoutCandidates } from "../../open-sse/services/autoCombo/modelLockoutFilter.ts";

describe("virtualFactory pool diagnosis wiring", () => {
  it("reports one paid exclusion out of two on a mixed pool", () => {
    const pool = [
      { provider: "openai", model: "gpt-4o" },
      { provider: "cerebras", model: "zai-glm-4.7" },
    ] as Array<{ provider: string; model: string }>;
    const { pool: kept, diagnosis } = filterPaidOnlyCandidatesWithDiagnosis(pool, true);
    assert.equal(kept.length, 1);
    assert.equal(diagnosis!.excludedPaid, 1);
    assert.equal(diagnosis!.total, 2);
  });

  it("excludes fully locked candidates and rewrites the unlocked subset", () => {
    const locked = (_provider: string, _connectionId: string, _model: string) => true;
    const pool = [
      { provider: "openai", model: "m1", connectionId: null, allowedConnectionIds: ["c1", "c2"] },
      { provider: "openai", model: "m2", connectionId: "c9", allowedConnectionIds: ["c9"] },
    ];
    const result = filterLockoutCandidates(pool, { isModelLocked: locked });
    assert.equal(result.pool.length, 0);
    assert.equal(result.diagnosis!.excludedLockout, 2);
    const partial = (_provider: string, connectionId: string, _model: string) =>
      connectionId === "c1";
    const rewritten = filterLockoutCandidates(pool.slice(0, 1), { isModelLocked: partial });
    assert.deepEqual(rewritten.pool[0]!.allowedConnectionIds, ["c2"]);
  });

  it("keeps a candidate without usable ids with a null diagnosis", () => {
    const pool = [{ provider: "openai", model: "m1", connectionId: null }];
    const result = filterLockoutCandidates(pool, { isModelLocked: () => true });
    assert.equal(result.pool.length, 1);
    assert.equal(result.diagnosis, null);
  });

  it("classifies a catalog-free model without hard-stop guarantee as no-hard-stop", async () => {
    const { classifyStrictZeroCostCandidate, findBudgetEntry } = await import(
      "../../open-sse/services/autoCombo/strictZeroCostFilter.ts"
    );
    const candidate = {
      provider: "bluesminds",
      model: "gpt-4o",
      connectionId: "c1",
      allowedConnectionIds: ["c1"],
    };
    const verdict = classifyStrictZeroCostCandidate(candidate, findBudgetEntry(candidate), () => null, {
      minRemainingAllowance: 1,
      maxStateAgeMs: 180_000,
    });
    assert.equal(verdict.outcome, "no-hard-stop");
  });
});
