import test from "node:test";
import assert from "node:assert/strict";

const { mergeProviderLimitsCacheEntry, toProviderLimitsCacheEntry } =
  await import("../../src/lib/usage/providerLimitsCache.ts");

const fetchedAt = "2026-09-05T00:00:00.000Z";
const previous = {
  quotas: { session: { remainingPercentage: 20 } },
  plan: "pro",
  message: null,
  fetchedAt,
  source: "sync",
  bankedResetCredits: 3,
};

test("GLM cache preserves a known reset-card count only when the auxiliary count is unknown", () => {
  for (const provider of ["glm", "glm-cn", "glmt", "zai"]) {
    const unknownCount = toProviderLimitsCacheEntry(
      { quotas: { session: { remainingPercentage: 80 } }, plan: "pro" },
      "manual",
      fetchedAt
    );
    const merged = mergeProviderLimitsCacheEntry(provider, unknownCount, previous);
    assert.equal(merged.bankedResetCredits, 3, `${provider} should preserve a known count`);
    assert.deepEqual(merged.quotas, { session: { remainingPercentage: 80 } });

    const authoritativeZero = toProviderLimitsCacheEntry(
      {
        quotas: { session: { remainingPercentage: 90 } },
        plan: "pro",
        bankedResetCredits: 0,
      },
      "manual",
      fetchedAt
    );
    const cleared = mergeProviderLimitsCacheEntry(provider, authoritativeZero, previous);
    assert.equal(cleared.bankedResetCredits, 0, `${provider} should accept authoritative zero`);
  }
});

test("non-GLM providers do not inherit GLM reset-card cache semantics", () => {
  const next = toProviderLimitsCacheEntry(
    { quotas: { session: { remainingPercentage: 80 } }, plan: "pro" },
    "manual",
    fetchedAt
  );
  assert.equal(
    mergeProviderLimitsCacheEntry("codex", next, previous).bankedResetCredits,
    undefined
  );
});
