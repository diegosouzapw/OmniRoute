// tests/unit/combo/pin-recovery.test.ts
// Direct unit coverage for open-sse/services/combo/pinRecovery.ts — extracted from
// combo.ts (file-size cap) so it needs its own direct test rather than relying only
// on indirect coverage through handleComboChat integration tests.

import test from "node:test";
import assert from "node:assert/strict";
import {
  buildRecoveryHint,
  buildNoUpstreamResponseDiagnostics,
} from "../../../open-sse/services/combo/pinRecovery.ts";

test("buildRecoveryHint: reasoning_budget_exhausted maps to switch-combo", () => {
  const hint = buildRecoveryHint("reasoning_budget_exhausted");
  assert.equal(hint.action, "switch-combo");
  assert.match(hint.next_step, /Increase max_tokens/);
});

test("buildRecoveryHint: max_attempts_exceeded maps to try-auto", () => {
  const hint = buildRecoveryHint("max_attempts_exceeded");
  assert.equal(hint.action, "try-auto");
  assert.match(hint.next_step, /model: auto/);
});

test("buildRecoveryHint: all_accounts_inactive maps to switch-combo with dashboard hint", () => {
  const hint = buildRecoveryHint("all_accounts_inactive");
  assert.equal(hint.action, "switch-combo");
  assert.match(hint.next_step, /dashboard\/providers/);
});

test("buildRecoveryHint: all_models_failed includes retry_after_seconds when positive", () => {
  const hint = buildRecoveryHint("all_models_failed", 30);
  assert.equal(hint.action, "try-auto");
  assert.equal(hint.retry_after_seconds, 30);
});

test("buildRecoveryHint: all_models_failed omits retry_after_seconds when undefined", () => {
  const hint = buildRecoveryHint("all_models_failed");
  assert.equal(hint.action, "try-auto");
  assert.equal("retry_after_seconds" in hint, false);
});

test("buildRecoveryHint: all_models_failed omits retry_after_seconds when zero or negative", () => {
  assert.equal("retry_after_seconds" in buildRecoveryHint("all_models_failed", 0), false);
  assert.equal("retry_after_seconds" in buildRecoveryHint("all_models_failed", -5), false);
});

test("buildRecoveryHint: no_executable_targets maps to switch-combo", () => {
  const hint = buildRecoveryHint("no_executable_targets");
  assert.equal(hint.action, "switch-combo");
  assert.match(hint.next_step, /no executable targets/);
});

test("buildRecoveryHint: unknown terminalReason falls back to retry", () => {
  const hint = buildRecoveryHint("some_unrecognized_reason");
  assert.equal(hint.action, "retry");
  assert.match(hint.next_step, /transiently/);
});

test("buildNoUpstreamResponseDiagnostics: builds a minimal diagnostics payload from poolSize", () => {
  const diag = buildNoUpstreamResponseDiagnostics(4);
  assert.deepEqual(diag, {
    poolSize: 4,
    attempted: 0,
    excluded: [],
    attemptOrder: [],
    terminalReason: "no_upstream_response",
  });
});

test("buildNoUpstreamResponseDiagnostics: zero poolSize is passed through as-is", () => {
  const diag = buildNoUpstreamResponseDiagnostics(0);
  assert.equal(diag.poolSize, 0);
  assert.equal(diag.terminalReason, "no_upstream_response");
});
