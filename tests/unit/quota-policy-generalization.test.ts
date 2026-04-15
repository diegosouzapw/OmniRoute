import test from "node:test";
import assert from "node:assert/strict";

const auth = await import("../../src/sse/services/auth.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");

function buildConnection(id, providerSpecificData = {}) {
  return {
    id,
    providerSpecificData,
  };
}

test("resolveQuotaLimitPolicy keeps codex legacy defaults when generic policy is missing", () => {
  const policy = auth.resolveQuotaLimitPolicy("codex", {
    codexLimitPolicy: { use5h: true, useWeekly: false },
  });

  assert.equal(policy.enabled, true);
  assert.deepEqual(policy.windows, ["session"]);
  assert.equal(policy.thresholdPercent, 90);
});

test("resolveQuotaLimitPolicy enforces codex weekly window when weekly toggle is enabled", () => {
  const policy = auth.resolveQuotaLimitPolicy("codex", {
    codexLimitPolicy: { use5h: true, useWeekly: true },
    limitPolicy: { enabled: true, windows: ["session"] },
  });

  assert.equal(policy.enabled, true);
  assert.deepEqual(policy.windows.sort(), ["session", "weekly"]);
});

test("resolveQuotaLimitPolicy removes codex weekly window when weekly toggle is disabled", () => {
  const policy = auth.resolveQuotaLimitPolicy("codex", {
    codexLimitPolicy: { use5h: true, useWeekly: false },
    limitPolicy: { enabled: true, windows: ["session", "weekly"] },
  });

  assert.equal(policy.enabled, true);
  assert.deepEqual(policy.windows, ["session"]);
});

test("resolveQuotaLimitPolicy disables non-codex policy by default", () => {
  const policy = auth.resolveQuotaLimitPolicy("openai", {});
  assert.equal(policy.enabled, false);
  assert.deepEqual(policy.windows, []);
});

test("resolveQuotaLimitPolicy accepts generic provider policy and clamps threshold", () => {
  const policy = auth.resolveQuotaLimitPolicy("openai", {
    limitPolicy: {
      enabled: true,
      thresholdPercent: 999,
      windows: ["daily", " monthly ", ""],
    },
  });

  assert.equal(policy.enabled, true);
  assert.equal(policy.thresholdPercent, 100);
  assert.deepEqual(policy.windows, ["daily", "monthly"]);
});

test("evaluateQuotaLimitPolicy blocks when configured window reaches threshold", () => {
  const resetAt = new Date(Date.now() + 60_000).toISOString();
  quotaCache.setQuotaCache("conn-policy-1", "openai", {
    daily: { remainingPercentage: 5, resetAt },
  });

  const result = auth.evaluateQuotaLimitPolicy(
    "openai",
    buildConnection("conn-policy-1", {
      limitPolicy: { enabled: true, thresholdPercent: 90, windows: ["daily"] },
    })
  );

  assert.equal(result.blocked, true);
  assert.equal(result.reasons.length, 1);
  assert.match(result.reasons[0], /daily usage/i);
  assert.equal(result.resetAt, resetAt);
});

test("evaluateQuotaLimitPolicy matches canonical weekly window against labeled cache keys", () => {
  const resetAt = new Date(Date.now() + 60_000).toISOString();
  quotaCache.setQuotaCache("conn-policy-weekly-label", "codex", {
    "weekly (7d)": { remainingPercentage: 0, resetAt },
  });

  const result = auth.evaluateQuotaLimitPolicy(
    "codex",
    buildConnection("conn-policy-weekly-label", {
      codexLimitPolicy: { use5h: true, useWeekly: true },
      limitPolicy: { enabled: true, windows: ["weekly"] },
    })
  );

  assert.equal(result.blocked, true);
  assert.equal(result.reasons.length, 1);
  assert.match(result.reasons[0], /weekly usage/i);
  assert.equal(result.resetAt, resetAt);
});

test("evaluateQuotaLimitPolicy does not block when no quota data exists", () => {
  const result = auth.evaluateQuotaLimitPolicy(
    "openai",
    buildConnection("conn-policy-missing", {
      limitPolicy: { enabled: true, thresholdPercent: 90, windows: ["daily"] },
    })
  );

  assert.equal(result.blocked, false);
  assert.deepEqual(result.reasons, []);
  assert.equal(result.resetAt, null);
});
