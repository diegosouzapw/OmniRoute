/**
 * `extractRemainingAllowance` treats an all-unlimited quota as proven-safe headroom
 * only for providers with a documented free tier; anything else stays unknown.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { __testing } from "../../open-sse/services/autoCombo/freeAccessQuota.ts";

describe("extractRemainingAllowance unlimited gate", () => {
  it("reports full headroom for an all-unlimited free-tier quota", () => {
    const usage = { quotas: { a: { unlimited: true }, b: { unlimited: true } } };
    assert.equal(__testing.extractRemainingAllowance(usage, { isFreeTier: true }), 100);
  });

  it("stays unknown for an all-unlimited quota outside the free tier", () => {
    const usage = { quotas: { a: { unlimited: true } } };
    assert.equal(__testing.extractRemainingAllowance(usage, { isFreeTier: false }), null);
  });

  it("prefers the worst limited reading when unlimited and limited quotas mix", () => {
    const usage = { quotas: { a: { unlimited: true }, b: { remainingPercentage: 42 } } };
    assert.equal(__testing.extractRemainingAllowance(usage, { isFreeTier: true }), 42);
  });
});
