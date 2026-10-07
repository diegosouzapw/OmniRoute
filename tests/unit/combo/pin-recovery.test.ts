// tests/unit/combo/pin-recovery.test.ts
// Direct unit coverage for open-sse/services/combo/pinRecovery.ts — extracted from
// combo.ts (file-size cap) so it needs its own direct test rather than relying only
// on indirect coverage through handleComboChat integration tests.

import test from "node:test";
import assert from "node:assert/strict";
import {
  buildAllTargetsCoolingDownResponse,
  buildRecoveryHint,
  buildNoUpstreamResponseDiagnostics,
  buildEmptyComboTargetsPayload,
  formatPreDispatchExclusions,
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

test("buildRecoveryHint: context_requirements_exhausted maps to switch-combo (#8786)", () => {
  const hint = buildRecoveryHint("context_requirements_exhausted");
  assert.equal(hint.action, "switch-combo");
  assert.match(hint.next_step, /minContextWindow|contextFilterMode|lenient/i);
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

test("buildEmptyComboTargetsPayload: pre-filter pool → context_requirements_exhausted (#8786)", () => {
  const { message, diagnostics } = buildEmptyComboTargetsPayload(
    [
      { provider: "openai", modelStr: "gpt-4o" },
      { provider: "custom", modelStr: "tiny" },
    ],
    500000
  );
  assert.match(message, /context requirements filtering/);
  assert.match(message, /minContextWindow: 500000/);
  assert.equal(diagnostics.terminalReason, "context_requirements_exhausted");
  assert.equal(diagnostics.poolSize, 2);
  assert.equal(diagnostics.excluded?.length, 2);
  assert.equal(diagnostics.excluded?.[0]?.reason, "context_requirements");
  assert.equal(diagnostics.recovery?.action, "switch-combo");
});

test("buildEmptyComboTargetsPayload: empty pre-filter pool → generic no_executable_targets", () => {
  const { message, diagnostics } = buildEmptyComboTargetsPayload([], 128000);
  assert.equal(message, "Combo has no executable targets");
  assert.equal(diagnostics.terminalReason, "no_executable_targets");
  assert.equal(diagnostics.poolSize, 0);
  assert.deepEqual(diagnostics.excluded, []);
});

// ── all_targets_cooling_down: weighted pre-dispatch exclusions ──────────────

test("buildRecoveryHint: all_targets_cooling_down maps to wait with retry_after_seconds", () => {
  const hint = buildRecoveryHint("all_targets_cooling_down", 42);
  assert.equal(hint.action, "wait");
  assert.equal(hint.retry_after_seconds, 42);
  assert.match(hint.next_step, /cooling down|cooldown/i);
  assert.equal("retry_after_seconds" in buildRecoveryHint("all_targets_cooling_down"), false);
});

test("buildAllTargetsCoolingDownResponse: null when no resilience timer excluded anything", () => {
  assert.equal(buildAllTargetsCoolingDownResponse([]), null);
  assert.equal(
    buildAllTargetsCoolingDownResponse([
      { provider: "openai", model: "a", reason: "unavailable", retryAfterMs: null },
      { provider: "zai", model: "glm", reason: "free_tier_drained", retryAfterMs: null },
    ]),
    null
  );
});

test("buildAllTargetsCoolingDownResponse: 503 with Retry-After = earliest lapse and every exclusion listed", async () => {
  const res = buildAllTargetsCoolingDownResponse([
    { provider: "openai", model: "a", reason: "model_lockout", retryAfterMs: 57_400 },
    { provider: "claude", model: "b", reason: "circuit_open", retryAfterMs: 12_000 },
    { provider: "gemini", model: "c", reason: "provider_cooldown", retryAfterMs: null },
    { provider: "zai", model: "d", reason: "unavailable", retryAfterMs: null },
  ]);
  assert.ok(res);
  assert.equal(res.status, 503);
  assert.equal(res.headers.get("Retry-After"), "12");
  assert.equal(res.headers.get("x-omniroute-retry-after-seconds"), "12");
  assert.equal(res.headers.get("x-omniroute-combo-terminal-reason"), "all_targets_cooling_down");
  const body = (await res.json()) as {
    error: { code?: string };
    diagnostics: {
      poolSize: number;
      excluded: Array<{ provider: string; model?: string; reason: string }>;
    };
    recovery_hint: { action: string; retry_after_seconds?: number };
  };
  assert.equal(body.error.code, "all_targets_cooling_down");
  assert.equal(body.diagnostics.poolSize, 4);
  assert.deepEqual(
    body.diagnostics.excluded.map((e) => `${e.provider}/${e.model}:${e.reason}`),
    [
      "openai/a:model_lockout",
      "claude/b:circuit_open",
      "gemini/c:provider_cooldown",
      "zai/d:unavailable",
    ]
  );
  assert.deepEqual(body.recovery_hint, {
    action: "wait",
    retry_after_seconds: 12,
    next_step: body.recovery_hint.next_step,
  });
});

test("buildAllTargetsCoolingDownResponse: no Retry-After when no exclusion carries a timer", () => {
  const res = buildAllTargetsCoolingDownResponse([
    { provider: "openai", model: "a", reason: "model_lockout", retryAfterMs: null },
  ]);
  assert.ok(res);
  assert.equal(res.status, 503);
  assert.equal(res.headers.get("Retry-After"), null);
});

test("formatPreDispatchExclusions: operator one-liner with remaining seconds when known", () => {
  assert.equal(
    formatPreDispatchExclusions([
      { provider: "openai", model: "a", reason: "model_lockout", retryAfterMs: 57_400 },
      { provider: "claude", model: "b", reason: "circuit_open", retryAfterMs: null },
    ]),
    "openai/a: model_lockout (58s), claude/b: circuit_open"
  );
});
