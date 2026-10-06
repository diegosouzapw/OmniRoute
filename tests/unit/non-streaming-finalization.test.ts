import { test } from "node:test";
import assert from "node:assert/strict";

import type {
  ChatCoreErrorResult,
  ProviderLegReceipt,
  ProviderLegUsage,
  ServerOwnedToolLoopResult,
} from "../../src/lib/skills/toolLoopTypes.ts";
import {
  buildNonStreamingFinalizationPlan,
  finalizeNonStreamingRequest,
  finalizeToolLoopError,
  type NonStreamingFinalizationDeps,
} from "../../open-sse/handlers/chatCore/nonStreamingFinalization.ts";

function receipt(index: number, overrides: Partial<ProviderLegReceipt> = {}): ProviderLegReceipt {
  return {
    index,
    connectionId: "conn-1",
    provider: "openai",
    model: "gpt-4o",
    startedAt: "2026-01-01T00:00:00.000Z",
    endedAt: "2026-01-01T00:00:01.000Z",
    latencyMs: 100,
    httpStatus: 200,
    errorType: null,
    usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    serviceTier: null,
    computedCostUsd: 0.01,
    toolCalls: [],
    termination: "completed",
    clientVisible: true,
    ...overrides,
  };
}

function usage(overrides: Partial<ProviderLegUsage> = {}): ProviderLegUsage {
  return {
    prompt_tokens: 100,
    completion_tokens: 20,
    total_tokens: 120,
    cache_read_input_tokens: 10,
    reasoning_tokens: 5,
    ...overrides,
  };
}

function errorResult(): ChatCoreErrorResult {
  return {
    success: false,
    status: 429,
    response: new Response(JSON.stringify({ error: { message: "rate limited" } }), {
      status: 429,
    }),
    error: "rate limited",
    errorCode: "rate_limited",
    errorType: "rate_limit_error",
    retryAfterMs: 1000,
  };
}

function spyDeps(): NonStreamingFinalizationDeps & { calls: Record<string, number> } {
  const calls = {
    writeUsage: 0,
    writeCost: 0,
    scheduleQuota: 0,
    writeAttempt: 0,
    finalizePending: 0,
  };
  return {
    calls,
    writeUsage: () => {
      calls.writeUsage += 1;
    },
    writeCost: () => {
      calls.writeCost += 1;
    },
    scheduleQuota: () => {
      calls.scheduleQuota += 1;
    },
    writeAttempt: () => {
      calls.writeAttempt += 1;
    },
    finalizePending: () => {
      calls.finalizePending += 1;
    },
  };
}

test("failure plan maps loop aggregate and 429 error", () => {
  const loop: ServerOwnedToolLoopResult = {
    kind: "error",
    errorResult: errorResult(),
    cumulativeUsage: usage(),
    totalCostUsd: 0.03,
    receipts: [
      receipt(0),
      receipt(1, {
        httpStatus: 429,
        errorType: "rate_limit_error",
        termination: "provider_error",
        computedCostUsd: 0.02,
      }),
    ],
    followUps: 1,
    termination: "provider_error",
  };
  const plan = buildNonStreamingFinalizationPlan(loop);
  assert.equal(plan.kind, "failure");
  if (plan.kind !== "failure") return;
  assert.equal(plan.error.status, 429);
  assert.equal(plan.error.errorCode, "rate_limited");
  assert.deepEqual(plan.usage, usage());
  assert.equal(plan.totalCostUsd, 0.03);
  assert.equal(plan.receiptCount, 2);
});

test("success plan maps loop usage and receipt count", () => {
  const loop: ServerOwnedToolLoopResult = {
    kind: "ok",
    response: { choices: [{ message: { content: "done" }, finish_reason: "stop" }] },
    cumulativeUsage: usage({ prompt_tokens: 11, completion_tokens: 7, total_tokens: 18 }),
    totalCostUsd: 0.02,
    receipts: [receipt(0)],
    followUps: 0,
    termination: "completed",
  };
  const plan = buildNonStreamingFinalizationPlan(loop);
  assert.equal(plan.kind, "success");
  if (plan.kind !== "success") return;
  assert.equal(plan.usage?.prompt_tokens, 11);
  assert.equal(plan.totalCostUsd, 0.02);
  assert.equal(plan.receiptCount, 1);
});

test("failure finalizer writes usage/cost/attempt/pending once and skips quota", async () => {
  const loop: ServerOwnedToolLoopResult = {
    kind: "error",
    errorResult: errorResult(),
    cumulativeUsage: usage(),
    totalCostUsd: 0.03,
    receipts: [receipt(0), receipt(1, { httpStatus: 429 })],
    followUps: 1,
    termination: "provider_error",
  };
  const deps = spyDeps();
  await finalizeNonStreamingRequest(buildNonStreamingFinalizationPlan(loop), deps);
  assert.equal(deps.calls.writeUsage, 1);
  assert.equal(deps.calls.writeCost, 1);
  assert.equal(deps.calls.scheduleQuota, 0);
  assert.equal(deps.calls.writeAttempt, 1);
  assert.equal(deps.calls.finalizePending, 1);
});

test("success finalizer writes usage/cost/quota/attempt/pending once", async () => {
  const loop: ServerOwnedToolLoopResult = {
    kind: "ok",
    response: { choices: [{ message: { content: "done" }, finish_reason: "stop" }] },
    cumulativeUsage: usage(),
    totalCostUsd: 0.02,
    receipts: [receipt(0)],
    followUps: 0,
    termination: "completed",
  };
  const deps = spyDeps();
  await finalizeNonStreamingRequest(buildNonStreamingFinalizationPlan(loop), deps);
  assert.equal(deps.calls.writeUsage, 1);
  assert.equal(deps.calls.writeCost, 1);
  assert.equal(deps.calls.scheduleQuota, 1);
  assert.equal(deps.calls.writeAttempt, 1);
  assert.equal(deps.calls.finalizePending, 1);
});

test("finalizeToolLoopError delegates through finalization plan and deps", async () => {
  const loop: ServerOwnedToolLoopResult = {
    kind: "error",
    errorResult: errorResult(),
    cumulativeUsage: usage(),
    totalCostUsd: 0.05,
    receipts: [receipt(0), receipt(1, { httpStatus: 429 })],
    followUps: 1,
    termination: "provider_error",
  };
  let usageSaved = false;
  let attemptLogged = false;
  let pendingTracked = false;

  const res = await finalizeToolLoopError({
    loop,
    model: "gpt-4o",
    provider: "openai",
    connectionId: "conn-1",
    providerRequest: { messages: [] },
    persistFailureUsage: (status, code, u) => {
      assert.equal(status, 429);
      assert.equal(code, "rate_limited");
      assert.equal(u?.prompt_tokens, 100);
      assert.equal(u?.completion_tokens, 20);
      assert.equal(u?.cache_read_input_tokens, 10);
      assert.equal(u?.reasoning_tokens, 5);
      usageSaved = true;
    },
    persistAttemptLogs: (params) => {
      assert.equal(params.status, 429);
      attemptLogged = true;
    },
    trackPendingRequest: (m, _p, _conn, pending) => {
      assert.equal(m, "gpt-4o");
      assert.equal(pending, false);
      pendingTracked = true;
    },
  });

  assert.equal(res.status, 429);
  assert.equal(usageSaved, true);
  assert.equal(attemptLogged, true);
  assert.equal(pendingTracked, true);
});
