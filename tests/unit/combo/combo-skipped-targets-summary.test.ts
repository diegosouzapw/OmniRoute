/**
 * #12659 — ALL_TARGETS_SKIPPED must carry per-target skip reasons.
 *
 * Before this fix, `executeTargetGates.ts`'s persisted-connection-cooldown
 * skip branch never called `recordComboDecision`, `persisted_cooldown` was
 * not even an allowlisted `ComboSkipReason`, and the 503 diagnostics body's
 * `excluded[]` only ever sourced from exhaustedProviders/exhaustedConnections
 * — so a persisted-cooldown-only failure surfaced as an opaque
 * `attempted=0, excluded=[]`.
 */
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-skipped-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-skipped-targets-secret";

const {
  COMBO_SKIP_REASONS,
  recordComboDecision,
  resetComboTraceStore,
  startComboTrace,
  summarizeSkippedTargets,
  getComboTrace,
} = await import("../../../open-sse/services/combo/decisionTrace.ts");

beforeEach(() => resetComboTraceStore());

test("#12659: persisted_cooldown is an allowlisted skip reason", () => {
  assert.ok(
    (COMBO_SKIP_REASONS as readonly string[]).includes("persisted_cooldown"),
    "persisted_cooldown must be recordable — it used to have no allowlist entry at all"
  );
});

test("#12659: a persisted-cooldown skip is grouped into skippedTargets[] by reason", () => {
  startComboTrace("combo-skip-1", { strategy: "priority", comboName: "my-combo" });
  recordComboDecision("combo-skip-1", {
    step: "step-1",
    target: "zai/glm-5.3",
    decision: "skipped_before_dispatch",
    reason: "persisted_cooldown",
  });
  recordComboDecision("combo-skip-1", {
    step: "step-2",
    target: "openai/gpt-x",
    decision: "skipped_before_dispatch",
    reason: "persisted_cooldown",
  });
  recordComboDecision("combo-skip-1", {
    step: "step-3",
    target: "anthropic/claude-y",
    decision: "skipped_before_dispatch",
    reason: "circuit_open",
  });

  const groups = summarizeSkippedTargets(getComboTrace("combo-skip-1"));
  const persisted = groups.find((g) => g.reason === "persisted_cooldown");
  assert.ok(persisted, "expected a persisted_cooldown group in the summary");
  assert.deepEqual(persisted!.targets.sort(), ["openai/gpt-x", "zai/glm-5.3"]);

  const circuit = groups.find((g) => g.reason === "circuit_open");
  assert.ok(circuit);
  assert.deepEqual(circuit!.targets, ["anthropic/claude-y"]);
});

test("#12659: summarizeSkippedTargets ignores dispatched/not_reached decisions", () => {
  startComboTrace("combo-skip-2", { strategy: "priority", comboName: "my-combo" });
  recordComboDecision("combo-skip-2", {
    step: "step-1",
    target: "zai/glm-5.3",
    decision: "dispatched",
  });
  recordComboDecision("combo-skip-2", {
    step: "step-2",
    target: "openai/gpt-x",
    decision: "not_reached",
  });
  const groups = summarizeSkippedTargets(getComboTrace("combo-skip-2"));
  assert.deepEqual(groups, []);
});

test("#12659: summarizeSkippedTargets is safe on a null/missing trace", () => {
  assert.deepEqual(summarizeSkippedTargets(null), []);
  assert.deepEqual(summarizeSkippedTargets(getComboTrace("does-not-exist")), []);
});

test("#12659: diagnostics body groups persisted-cooldown skips WITHOUT leaking a connection id or a stack trace", async () => {
  const { errorResponseWithComboDiagnostics } = await import("../../../open-sse/utils/error.ts");
  const res = errorResponseWithComboDiagnostics(
    503,
    "Service temporarily unavailable: all targets were skipped by pre-dispatch filters",
    {
      poolSize: 2,
      attempted: 0,
      excluded: [],
      attemptOrder: [],
      terminalReason: "all_targets_skipped",
      skippedTargets: [{ reason: "persisted_cooldown", targets: ["zai/glm-5.3", "openai/gpt-x"] }],
    },
    { code: "ALL_TARGETS_SKIPPED", type: "service_unavailable" }
  );
  const body = (await res.json()) as {
    diagnostics: { skippedTargets?: Array<{ reason: string; targets: string[] }> };
  };
  assert.ok(body.diagnostics.skippedTargets, "diagnostics.skippedTargets must be present");
  assert.deepEqual(body.diagnostics.skippedTargets![0], {
    reason: "persisted_cooldown",
    targets: ["zai/glm-5.3", "openai/gpt-x"],
  });
  const serialized = JSON.stringify(body);
  // Task notes (#12659): a skip reason must never leak an upstream stack
  // trace or a credential/account-id fragment — this body was built through
  // buildErrorBody()/sanitizeComboDiagnostics(), never raw err.stack.
  assert.ok(!/\bat\s+\/[\w./-]+:\d+:\d+/.test(serialized), "no stack-trace frame in the body");
  assert.ok(!serialized.includes("0217fa47"), "no connection/account id leaked into the body");
});
