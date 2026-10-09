import test from "node:test";
import assert from "node:assert/strict";
import { normalizeClaudeUsageQuotas } from "../../open-sse/services/usage/claudeQuota.ts";

test("normalizes current Claude limits into account and model quota collections", () => {
  const sessionReset = new Date(Date.now() + 60_000).toISOString();
  const weeklyReset = new Date(Date.now() + 120_000).toISOString();
  const scopedReset = new Date(Date.now() + 180_000).toISOString();
  const { quotas, modelQuotas } = normalizeClaudeUsageQuotas({
    five_hour: null,
    seven_day: null,
    limits: [
      {
        kind: "session",
        percent: 30,
        resetsAt: sessionReset,
        isActive: false,
        severity: "normal",
        scope: null,
      },
      {
        kind: "weekly_all",
        percent: 50,
        resetsAt: weeklyReset,
        isActive: false,
        severity: "warning",
        scope: null,
      },
      {
        kind: "weekly_scoped",
        percent: 100,
        resetsAt: scopedReset,
        isActive: true,
        severity: "critical",
        scope: { model: { displayName: "Fable" } },
      },
      {
        kind: "weekly_scoped",
        percent: 20,
        resetsAt: scopedReset,
        isActive: false,
        severity: "normal",
        scope: { model: { id: "claude-opus-5", displayName: "Opus" } },
      },
    ],
  });

  assert.equal(quotas["session (5h)"].remaining, 70);
  assert.equal(quotas["weekly (7d)"].remaining, 50);
  assert.deepEqual(Object.keys(quotas).sort(), ["session (5h)", "weekly (7d)"]);
  assert.equal(modelQuotas["weekly fable (7d)"].remaining, 0);
  assert.deepEqual(modelQuotas["weekly fable (7d)"].claudeQuota, {
    kind: "weekly_scoped",
    active: true,
    severity: "critical",
    scopeKey: "model:fable",
    modelId: null,
    modelDisplayName: "Fable",
  });
  assert.equal(modelQuotas["weekly opus (7d)"].claudeQuota?.modelId, "claude-opus-5");
  assert.equal(modelQuotas["weekly fable (7d)"].resetAt, scopedReset);
});

test("normalizes the evidenced snake-case current Claude limit shape", () => {
  const resetAt = new Date(Date.now() + 120_000).toISOString();
  const { modelQuotas } = normalizeClaudeUsageQuotas({
    limits: [
      {
        kind: "weekly_scoped",
        percent: 100,
        resets_at: resetAt,
        is_active: true,
        severity: "critical",
        scope: { model: { display_name: "Fable" } },
      },
    ],
  });
  assert.equal(modelQuotas["weekly fable (7d)"].resetAt, resetAt);
  assert.equal(modelQuotas["weekly fable (7d)"].claudeQuota?.active, true);
});

test("preserves active current Claude model limits when utilization is unreported", () => {
  const resetAt = new Date(Date.now() + 120_000).toISOString();
  const { modelQuotas } = normalizeClaudeUsageQuotas({
    limits: [
      {
        kind: "weekly_scoped",
        resetsAt: resetAt,
        isActive: true,
        severity: "critical",
        scope: { model: { displayName: "Fable" } },
      },
    ],
  });
  assert.equal(modelQuotas["weekly fable (7d)"].fractionReported, false);
  assert.equal(modelQuotas["weekly fable (7d)"].resetAt, resetAt);
  assert.equal(modelQuotas["weekly fable (7d)"].claudeQuota?.active, true);
});

test("adapts previous Claude fields into the same split representation", () => {
  const resetAt = new Date(Date.now() + 120_000).toISOString();
  const { quotas, modelQuotas } = normalizeClaudeUsageQuotas({
    five_hour: { utilization: 90, resets_at: resetAt },
    seven_day: { utilization: 20, resets_at: resetAt },
    seven_day_sonnet: { utilization: 35, resets_at: resetAt },
  });
  assert.equal(quotas["session (5h)"].remaining, 10);
  assert.equal(quotas["weekly (7d)"].remaining, 80);
  assert.equal(modelQuotas["weekly sonnet (7d)"].remaining, 65);
  assert.deepEqual(modelQuotas["weekly sonnet (7d)"].claudeQuota, {
    kind: "weekly_scoped",
    active: false,
    severity: null,
    scopeKey: "model:sonnet",
    modelId: null,
    modelDisplayName: "sonnet",
  });
});

test("merges current and previous limits by semantic window", () => {
  const currentReset = new Date(Date.now() + 60_000).toISOString();
  const legacyReset = new Date(Date.now() + 120_000).toISOString();
  const { quotas, modelQuotas } = normalizeClaudeUsageQuotas({
    five_hour: { utilization: 90, resets_at: legacyReset },
    seven_day: { utilization: 20, resets_at: legacyReset },
    seven_day_fable: { utilization: 75, resets_at: legacyReset },
    seven_day_sonnet: { utilization: 35, resets_at: legacyReset },
    limits: [
      { kind: "session", percent: 30, resetsAt: currentReset, isActive: false, severity: "normal" },
      {
        kind: "weekly_scoped",
        percent: 100,
        resetsAt: currentReset,
        isActive: true,
        severity: "critical",
        scope: { model: { displayName: "Fable" } },
      },
    ],
  });
  assert.equal(quotas["session (5h)"].used, 30);
  assert.equal(quotas["session (5h)"].resetAt, currentReset);
  assert.equal(quotas["weekly (7d)"].used, 20);
  assert.equal(modelQuotas["weekly fable (7d)"].used, 100);
  assert.equal(modelQuotas["weekly fable (7d)"].resetAt, currentReset);
  assert.equal(modelQuotas["weekly sonnet (7d)"].used, 35);
});

test("current upstream model IDs replace matching legacy display-name windows", () => {
  const legacyReset = new Date(Date.now() + 120_000).toISOString();
  const currentReset = new Date(Date.now() + 60_000).toISOString();
  const { modelQuotas } = normalizeClaudeUsageQuotas({
    seven_day_fable: { utilization: 75, resets_at: legacyReset },
    limits: [
      {
        kind: "weekly_scoped",
        percent: 100,
        resetsAt: currentReset,
        isActive: true,
        severity: "critical",
        scope: { model: { id: "claude-fable-5-1" } },
      },
    ],
  });

  assert.deepEqual(Object.keys(modelQuotas), ["weekly claude-fable-5-1 (7d)"]);
  assert.equal(modelQuotas["weekly claude-fable-5-1 (7d)"].resetAt, currentReset);
});

test("empty or invalid current limits retain valid previous windows", () => {
  const resetAt = new Date(Date.now() + 60_000).toISOString();
  const previous = {
    five_hour: { utilization: 100, resets_at: resetAt },
    seven_day_sonnet: { utilization: 25, resets_at: resetAt },
  };
  for (const limits of [[], null, { kind: "weekly_all" }, 42, "invalid"]) {
    const { quotas, modelQuotas } = normalizeClaudeUsageQuotas({ ...previous, limits });
    assert.equal(quotas["session (5h)"].used, 100);
    assert.equal(modelQuotas["weekly sonnet (7d)"].used, 25);
  }
});

for (const { label, scope } of [
  { label: "model-less", scope: null },
  { label: "non-tokenizable", scope: { model: { displayName: "???" } } },
]) {
  for (const activeFirst of [true, false]) {
    test(`preserves duplicate ${label} current scopes when the active limit is ${activeFirst ? "first" : "last"}`, () => {
      const activeReset = new Date(Date.now() + 60_000).toISOString();
      const inactiveReset = new Date(Date.now() + 120_000).toISOString();
      const active = {
        kind: "weekly_scoped",
        percent: 100,
        resetsAt: activeReset,
        isActive: true,
        severity: "critical",
        scope,
      };
      const inactive = {
        kind: "weekly_scoped",
        percent: 20,
        resetsAt: inactiveReset,
        isActive: false,
        severity: "normal",
        scope,
      };

      const { modelQuotas } = normalizeClaudeUsageQuotas({
        limits: activeFirst ? [active, inactive] : [inactive, active],
      });

      assert.deepEqual(Object.keys(modelQuotas), [
        "weekly scoped (7d) #1",
        "weekly scoped (7d) #2",
      ]);
      const activeQuota = Object.values(modelQuotas).find((quota) => quota.claudeQuota?.active);
      assert.equal(activeQuota?.resetAt, activeReset);
    });
  }
}
