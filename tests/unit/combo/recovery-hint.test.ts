// tests/unit/combo/recovery-hint.test.ts
// Tests for the `recovery` field on ComboDiagnostics and the
// errorResponseWithComboDiagnostics recovery header emission.

import test from "node:test";
import assert from "node:assert/strict";
import { errorResponseWithComboDiagnostics } from "../../../open-sse/utils/error.ts";
import type { ComboDiagnostics, RecoveryAction } from "../../../open-sse/utils/error.ts";

type JsonBody = { diagnostics?: { recovery?: Record<string, unknown> } };

function emptyDiag(overrides?: Partial<ComboDiagnostics>): ComboDiagnostics {
  return {
    combo_name: "my-combo",
    strategy: "priority",
    targets_tried: [],
    last_status: 503,
    last_error: "all targets failed",
    terminal_reason: "max_attempts_exceeded",
    ...overrides,
  };
}

test("recovery with try-auto action is present in response body", async () => {
  const diag = emptyDiag({
    recovery: {
      action: "try-auto" as RecoveryAction,
      next_step: "All exhausted. Use model: auto.",
    },
  });
  const res = errorResponseWithComboDiagnostics(503, "exhausted", diag);
  const body = (await res.json()) as JsonBody;
  assert.ok(body.diagnostics?.recovery);
  assert.equal(body.diagnostics?.recovery?.action, "try-auto");
  assert.equal(body.diagnostics?.recovery?.next_step, "All exhausted. Use model: auto.");
});

test("recovery with wait action and retry_after_seconds", async () => {
  const diag = emptyDiag({
    recovery: {
      action: "wait" as RecoveryAction,
      next_step: "Rate limited.",
      retry_after_seconds: 30,
    },
  });
  const res = errorResponseWithComboDiagnostics(429, "rate limited", diag);
  const body = (await res.json()) as JsonBody;
  assert.equal(body.diagnostics?.recovery?.action, "wait");
  assert.equal(body.diagnostics?.recovery?.retry_after_seconds, 30);
});

test("recovery with switch-combo action", async () => {
  const diag = emptyDiag({
    recovery: { action: "switch-combo" as RecoveryAction, next_step: "No healthy targets." },
  });
  const res = errorResponseWithComboDiagnostics(503, "no targets", diag);
  const body = (await res.json()) as JsonBody;
  assert.equal(body.diagnostics?.recovery?.action, "switch-combo");
});

test("recovery hint omitted when recovery is undefined", async () => {
  const diag = emptyDiag();
  const res = errorResponseWithComboDiagnostics(503, "generic", diag);
  const body = (await res.json()) as JsonBody;
  assert.equal(body.diagnostics?.recovery, undefined);
});

test("x-omniroute-recovery-action header emitted when recovery present", async () => {
  const diag = emptyDiag({
    recovery: {
      action: "try-auto" as RecoveryAction,
      next_step: "Auto-select available providers.",
    },
  });
  const res = errorResponseWithComboDiagnostics(503, "exhausted", diag);
  assert.equal(res.headers.get("x-omniroute-recovery-action"), "try-auto");
  assert.equal(
    res.headers.get("x-omniroute-recovery-next-step"),
    "Auto-select available providers."
  );
});

test("x-omniroute-retry-after-seconds header emitted when retry_after_seconds set", async () => {
  const diag = emptyDiag({
    recovery: { action: "wait" as RecoveryAction, next_step: "wait", retry_after_seconds: 45 },
  });
  const res = errorResponseWithComboDiagnostics(429, "rate limited", diag);
  assert.equal(res.headers.get("x-omniroute-retry-after-seconds"), "45");
});

test("x-omniroute-retry-after-seconds omitted when retry_after_seconds is 0", async () => {
  const diag = emptyDiag({
    recovery: { action: "retry" as RecoveryAction, next_step: "retry", retry_after_seconds: 0 },
  });
  const res = errorResponseWithComboDiagnostics(503, "transient", diag);
  assert.equal(res.headers.get("x-omniroute-retry-after-seconds"), null);
});

test("x-omniroute-recovery-* headers omitted when recovery is undefined", async () => {
  const diag = emptyDiag();
  const res = errorResponseWithComboDiagnostics(503, "generic", diag);
  assert.equal(res.headers.get("x-omniroute-recovery-action"), null);
  assert.equal(res.headers.get("x-omniroute-recovery-next-step"), null);
});

test("next_step sanitized (newlines → spaces, max 128 chars)", async () => {
  const longStep = "A".repeat(200) + "\nwith\nnewlines";
  const diag = emptyDiag({
    recovery: { action: "try-auto" as RecoveryAction, next_step: longStep },
  });
  const res = errorResponseWithComboDiagnostics(503, "exhausted", diag);
  const sanitized = res.headers.get("x-omniroute-recovery-next-step")!;
  assert.ok(sanitized.length <= 128);
  assert.ok(!sanitized.includes("\n"));
});

test("drops recovery when next_step is whitespace-only", async () => {
  const diag = emptyDiag({ recovery: { action: "try-auto" as RecoveryAction, next_step: "   " } });
  const res = errorResponseWithComboDiagnostics(503, "exhausted", diag);
  const body = (await res.json()) as JsonBody;
  assert.equal(body.diagnostics?.recovery, undefined);
  assert.equal(res.headers.get("x-omniroute-recovery-action"), null);
});

test("invalid action causes recovery to be dropped", async () => {
  const diag = emptyDiag({
    recovery: { action: "garbage" as RecoveryAction, next_step: "something" },
  });
  const res = errorResponseWithComboDiagnostics(503, "exhausted", diag);
  const body = (await res.json()) as JsonBody;
  assert.equal(body.diagnostics?.recovery, undefined);
});
