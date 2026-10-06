// #10681: combo decision trace — unit + integration (public handleComboChat).
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-trace-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-decision-trace-secret";

const {
  COMBO_SKIP_REASONS,
  createInvocationId,
  finalizeComboTrace,
  getComboTrace,
  recordComboDecision,
  resetComboTraceStore,
  startComboTrace,
} = await import("../../../open-sse/services/combo/decisionTrace.ts");
const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const { recordComboRequest, resetComboMetrics } =
  await import("../../../open-sse/services/comboMetrics.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

function okResponse(content: string) {
  return new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content } }] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
function rateLimitedResponse() {
  return new Response(
    JSON.stringify({
      error: { message: "rate limited", type: "rate_limit_error", code: "rate_limit" },
    }),
    { status: 429, headers: { "Content-Type": "application/json" } }
  );
}

beforeEach(() => resetComboTraceStore());

test("createInvocationId yields unique opaque ids", () => {
  const a = createInvocationId();
  const b = createInvocationId();
  assert.ok(a.startsWith("combo-"));
  assert.notEqual(a, b);
});

test("skip reasons are allowlisted (unknown reason is rejected)", () => {
  startComboTrace("combo-t", { strategy: "priority", comboName: "x" });
  for (const reason of COMBO_SKIP_REASONS) {
    recordComboDecision("combo-t", {
      step: "s",
      target: "p/m",
      decision: "skipped_before_dispatch",
      reason,
    });
  }
  assert.throws(() =>
    recordComboDecision("combo-t", {
      step: "s",
      target: "p/m",
      decision: "skipped_before_dispatch",
      reason: "freeform upstream error",
    })
  );
  assert.equal(getComboTrace("combo-t")!.decisions.length, COMBO_SKIP_REASONS.length);
});

test("finalize marks never-iterated targets as not_reached", () => {
  startComboTrace("combo-t", { strategy: "priority", comboName: "x" });
  recordComboDecision("combo-t", { step: "s1", target: "p/a", decision: "dispatched" });
  recordComboDecision("combo-t", {
    step: "s2",
    target: "p/b",
    decision: "skipped_before_dispatch",
    reason: "provider_cooldown",
  });
  const trace = finalizeComboTrace("combo-t", [
    { executionKey: "s1", modelStr: "p/a" },
    { executionKey: "s2", modelStr: "p/b" },
    { executionKey: "s3", modelStr: "p/c" },
  ])!;
  assert.deepEqual(
    trace.decisions.map((d) => d.decision),
    ["dispatched", "skipped_before_dispatch", "not_reached"]
  );
});

test("handleComboChat: mixed fallback produces an ordered decision trace", async () => {
  const invocationId = createInvocationId();
  const calls: string[] = [];
  const res = await handleComboChat({
    invocationId,
    body: { messages: [{ role: "user", content: "ping" }] },
    combo: {
      name: "trace-std",
      strategy: "priority",
      models: ["openai/a", "openai/b", "openai/c"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_b: Record<string, unknown>, modelStr: string) => {
      calls.push(modelStr);
      if (modelStr === "openai/a") return rateLimitedResponse();
      return okResponse("recovered");
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
  });
  assert.equal(res.status, 200);
  assert.deepEqual(calls, ["openai/a", "openai/b"]);

  const trace = getComboTrace(invocationId)!;
  assert.equal(trace.comboName, "trace-std");
  assert.equal(trace.strategy, "priority");
  assert.deepEqual(
    trace.decisions.map((d) => ({ target: d.target, decision: d.decision })),
    [
      { target: "openai/a", decision: "dispatched" },
      { target: "openai/b", decision: "dispatched" },
      { target: "openai/c", decision: "not_reached" },
    ]
  );
  assert.equal(trace.terminal?.status, 200);
});

test("handleComboChat: predictive-TTFT skip records skipped_before_dispatch/predictive_ttft", async () => {
  const comboName = "trace-predictive-ttft";
  resetComboMetrics(comboName);
  // Seed enough samples (>= PREDICTIVE_TTFT_MIN_SAMPLES) with a high average
  // latency for openai/a so the predictive-TTFT breaker trusts and trips on it.
  for (let i = 0; i < 5; i++) {
    recordComboRequest(comboName, "openai/a", {
      success: true,
      latencyMs: 5000,
      strategy: "priority",
    });
  }

  const invocationId = createInvocationId();
  const calls: string[] = [];
  const res = await handleComboChat({
    invocationId,
    body: { messages: [{ role: "user", content: "ping" }] },
    combo: {
      name: comboName,
      strategy: "priority",
      models: ["openai/a", "openai/b"],
      config: {
        maxRetries: 0,
        retryDelayMs: 0,
        fallbackDelayMs: 0,
        zeroLatencyOptimizationsEnabled: true,
        predictiveTtftMs: 100,
      },
    },
    handleSingleModel: async (_b: Record<string, unknown>, modelStr: string) => {
      calls.push(modelStr);
      return okResponse(`ok-${modelStr}`);
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
  });
  assert.equal(res.status, 200);
  // openai/a must never be dispatched — it is skipped pre-flight by the
  // predictive-TTFT breaker; only openai/b is actually called.
  assert.deepEqual(calls, ["openai/b"]);

  const trace = getComboTrace(invocationId)!;
  assert.deepEqual(
    trace.decisions.map((d) => ({
      target: d.target,
      decision: d.decision,
      reason: d.reason ?? null,
    })),
    [
      { target: "openai/a", decision: "skipped_before_dispatch", reason: "predictive_ttft" },
      { target: "openai/b", decision: "dispatched", reason: null },
    ]
  );
});

test("handleComboChat: pre-dispatch skip records allowlisted reason", async () => {
  const invocationId = createInvocationId();
  const res = await handleComboChat({
    invocationId,
    body: { messages: [{ role: "user", content: "ping" }] },
    combo: {
      name: "trace-skip",
      strategy: "priority",
      models: ["openai/a", "openai/b", "openai/c"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_b, modelStr) =>
      modelStr === "openai/a" ? rateLimitedResponse() : okResponse(`ok-${modelStr}`),
    isModelAvailable: async (_m: string, target?: { modelStr?: string }) =>
      target?.modelStr !== "openai/b",
    log,
    settings: null,
    allCombos: null,
  });
  assert.equal(res.status, 200);
  const trace = getComboTrace(invocationId)!;
  assert.deepEqual(
    trace.decisions.map((d) => ({
      target: d.target,
      decision: d.decision,
      reason: d.reason ?? null,
    })),
    [
      { target: "openai/a", decision: "dispatched", reason: null },
      { target: "openai/b", decision: "skipped_before_dispatch", reason: "availability" },
      { target: "openai/c", decision: "dispatched", reason: null },
    ]
  );
});

test("egress: every response carries X-OmniRoute-Combo-Trace (success path)", async () => {
  const invocationId = createInvocationId();
  const res = await handleComboChat({
    invocationId,
    body: { messages: [{ role: "user", content: "ping" }] },
    combo: {
      name: "egress-ok",
      strategy: "priority",
      models: ["openai/a", "openai/b"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () => okResponse("recovered"),
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
  });
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("X-OmniRoute-Combo-Trace"), invocationId);
});

test("egress: header present even when every target fails", async () => {
  const invocationId = createInvocationId();
  const res = await handleComboChat({
    invocationId,
    body: { messages: [{ role: "user", content: "ping" }] },
    combo: {
      name: "egress-fail",
      strategy: "priority",
      models: ["openai/a", "openai/b"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () => rateLimitedResponse(),
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
  });
  assert.notEqual(res.status, 200);
  assert.equal(res.headers.get("X-OmniRoute-Combo-Trace"), invocationId);
});

test("egress: finalized trace is emitted as one metadata-only log line", async () => {
  const invocationId = createInvocationId();
  const infoCalls: string[] = [];
  const capturingLog = {
    info: (_cat: string, msg: string) => infoCalls.push(msg),
    warn: noop,
    debug: noop,
    error: noop,
  };
  const res = await handleComboChat({
    invocationId,
    body: { messages: [{ role: "user", content: "ping" }] },
    combo: {
      name: "egress-log",
      strategy: "priority",
      models: ["openai/a", "openai/b"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () => okResponse("recovered"),
    isModelAvailable: async () => true,
    log: capturingLog,
    settings: null,
    allCombos: null,
  });
  assert.equal(res.status, 200);
  const line = infoCalls.find((m) => m.includes("combo trace") && m.includes(invocationId));
  assert.ok(line, "finalized trace log line expected");
  assert.ok(line!.includes('"status":200'), "log line must carry the terminal status");
  assert.ok(!line!.includes("messages"), "log line must not carry request content");
});

test("retention: in-flight traces are pinned against eviction (finalized evicted first)", () => {
  resetComboTraceStore();
  for (let i = 0; i < 2000; i++) {
    startComboTrace(`combo-t-${i}`, { strategy: "priority", comboName: "x" });
  }
  // Only the FIRST trace is finalized; the other 1999 are still in flight.
  finalizeComboTrace("combo-t-0", [{ executionKey: "s", modelStr: "p/m" }]);
  // Burst beyond the cap: eviction must prefer the finalized trace.
  startComboTrace("combo-t-2000", { strategy: "priority", comboName: "x" });
  assert.equal(getComboTrace("combo-t-0"), null, "finalized trace is the eviction victim");
  assert.ok(getComboTrace("combo-t-1"), "in-flight trace survives the burst");
  assert.ok(getComboTrace("combo-t-1999"), "in-flight trace survives the burst");
  assert.ok(getComboTrace("combo-t-2000"), "new trace is stored");
});
