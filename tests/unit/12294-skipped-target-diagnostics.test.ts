import test from "node:test";
import assert from "node:assert/strict";

// Dynamic import is the established convention in this suite (see
// 9303-recovery-hint-all-targets-skipped.test.ts): tests run under the
// tsx/esm + polyfill loader stack, and importing open-sse modules statically
// from tests/unit races the polyfill setup. This exercises the module
// boundary intentionally.
const {
  COMBO_SKIP_REASONS,
  createInvocationId,
  resetComboTraceStore,
  startComboTrace,
  recordComboDecision,
  getComboTrace,
  summarizeSkippedTargetsWithRetry,
} = await import("../../open-sse/services/combo/decisionTrace.ts");

test("#12294: persisted_cooldown is a recognized skip reason", () => {
  assert.ok(
    (COMBO_SKIP_REASONS as readonly string[]).includes("persisted_cooldown"),
    "persisted_cooldown must be in the COMBO_SKIP_REASONS allowlist"
  );
});

test("#12294: summarizeSkippedTargets aggregates skip decisions with reason and detail", () => {
  resetComboTraceStore();
  const id = createInvocationId();
  startComboTrace(id, { strategy: "priority", comboName: "smart" });

  recordComboDecision(id, {
    step: "s1",
    target: "command-code/deepseek/deepseek-v4-flash-xhigh",
    decision: "skipped_before_dispatch",
    reason: "persisted_cooldown",
    detail:
      "Skipping command-code/deepseek/deepseek-v4-flash-xhigh — connection abc has persisted cooldown until 2030-01-01T00:00:00.000Z",
  });
  recordComboDecision(id, {
    step: "s2",
    target: "kimi-coding-apikey/kimi-for-coding-highspeed",
    decision: "skipped_before_dispatch",
    reason: "availability",
  });
  recordComboDecision(id, {
    step: "s3",
    target: "opencode-go/glm-5.3-flash",
    decision: "dispatched",
  });

  const { skippedTargets, nextRetryAt } = summarizeSkippedTargetsWithRetry(getComboTrace(id));

  assert.equal(skippedTargets.length, 2, "only skipped targets are summarized");
  assert.equal(skippedTargets[0].reason, "persisted_cooldown");
  assert.match(skippedTargets[0].detail ?? "", /until 2030-01-01T00:00:00\.000Z/);
  assert.equal(skippedTargets[1].reason, "availability");
  assert.equal(skippedTargets[1].detail, undefined, "no detail means no detail field");
  assert.equal(nextRetryAt, "2030-01-01T00:00:00.000Z");
});

test("#12294: nextRetryAt picks the earliest FUTURE cooldown reset", () => {
  resetComboTraceStore();
  const id = createInvocationId();
  startComboTrace(id, { strategy: "priority", comboName: "yano-openweights" });

  recordComboDecision(id, {
    step: "s1",
    target: "a/one",
    decision: "skipped_before_dispatch",
    reason: "persisted_cooldown",
    detail: "cooldown until 2020-01-01T00:00:00.000Z", // already expired
  });
  recordComboDecision(id, {
    step: "s2",
    target: "b/two",
    decision: "skipped_before_dispatch",
    reason: "persisted_cooldown",
    detail: "cooldown until 2030-06-01T12:00:00.000Z",
  });
  recordComboDecision(id, {
    step: "s3",
    target: "c/three",
    decision: "skipped_before_dispatch",
    reason: "persisted_cooldown",
    detail: "cooldown until 2031-01-01T00:00:00.000Z", // later
  });

  const { nextRetryAt } = summarizeSkippedTargetsWithRetry(getComboTrace(id));
  assert.equal(nextRetryAt, "2030-06-01T12:00:00.000Z");
});

test("#12294: non-cooldown skips and absent traces yield no nextRetryAt", () => {
  resetComboTraceStore();
  const id = createInvocationId();
  startComboTrace(id, { strategy: "priority", comboName: "x" });
  recordComboDecision(id, {
    step: "s1",
    target: "a/one",
    decision: "skipped_before_dispatch",
    reason: "quota_cutoff",
  });

  const fromTrace = summarizeSkippedTargetsWithRetry(getComboTrace(id));
  assert.equal(fromTrace.skippedTargets.length, 1);
  assert.equal(fromTrace.nextRetryAt, null, "quota_cutoff carries no cooldown timestamp");

  assert.deepEqual(summarizeSkippedTargetsWithRetry(null), {
    skippedTargets: [],
    nextRetryAt: null,
  });
  assert.deepEqual(summarizeSkippedTargetsWithRetry(getComboTrace("missing-id")), {
    skippedTargets: [],
    nextRetryAt: null,
  });
});

test("#12294: recordComboDecision stores detail alongside the reason", () => {
  resetComboTraceStore();
  const id = createInvocationId();
  startComboTrace(id, { strategy: "priority", comboName: "x" });
  recordComboDecision(id, {
    step: "s1",
    target: "a/one",
    decision: "skipped_before_dispatch",
    reason: "persisted_cooldown",
    detail: "cooldown until 2030-02-03T04:05:06.000Z",
  });

  const trace = getComboTrace(id);
  assert.equal(trace?.decisions[0]?.detail, "cooldown until 2030-02-03T04:05:06.000Z");
});
