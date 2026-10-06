/**
 * #9654 Wave 2 — combo/fusion per-target lane-aware admission.
 *
 * Combo and fusion fan-out dispatch N targets without ever consulting the
 * adaptive-admission layer: the parent request holds one lease, but each
 * fan-out target is dispatched unconditionally. With virtual lanes enabled
 * (OMNIROUTE_CHAT_VIRTUAL_LANES=1), a tenant whose lane queue is full
 * should SKIP additional fan-out targets instead of piling more queued work
 * onto an already-congested lane.
 *
 * The per-target probe (`PerTargetAdmissionHook`, built by
 * `createPerTargetAdmissionHook`) is:
 *   - strictly non-blocking (maxWaitMs 0 — skip, never queue)
 *   - a no-op when virtual lanes are off (the shared queue is the only gate,
 *     and the parent request already holds one lease — probing there would
 *     double-count and reject combo targets)
 *   - routed to the PARENT's tenantKey so it gates the same per-tenant lane
 *   - release-immediately on admit: the probe is a capacity gate, not a hold
 *     (the parent's lease covers the fan-out; holding N more would inflate
 *     shared active cost and reject other sessions)
 *
 * Run: node --import tsx/esm --test tests/unit/combo-lane-awareness-9654.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { AdaptiveAdmissionRuntime } from "../../open-sse/services/admission/runtime.ts";
import type { PerTargetAdmissionHook } from "../../open-sse/services/admission/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-lane-awareness-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { createPerTargetAdmissionHook } = await import("../../src/sse/handlers/chatAdmission.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

type Body = Record<string, unknown>;

function okResponse(content: string): Response {
  return new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content } }] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function priorityCombo(models: string[]) {
  return {
    name: "test-lane-combo",
    strategy: "priority",
    models: models.map((m) => ({ model: m })),
  };
}

function rrCombo(models: string[]) {
  return {
    name: "test-lane-rr-combo",
    strategy: "round-robin",
    models: models.map((m) => ({ model: m })),
  };
}

function fusionCombo(models: string[], extra: Record<string, unknown> = {}) {
  return {
    name: "test-lane-fusion",
    strategy: "fusion",
    models: models.map((m) => ({ model: m })),
    config: extra,
  };
}

// ── Factory unit tests: hook semantics in isolation ────────────────────────

function fakeRuntime(opts: {
  virtualLanes: boolean;
  acquireResult?: {
    status: "admitted" | "rejected";
    lease?: { released: boolean; release: (outcome?: string) => void };
  };
  acquireError?: Error;
}): AdaptiveAdmissionRuntime & { acquireCalls: Array<Record<string, unknown>> } {
  const acquireCalls: Array<Record<string, unknown>> = [];
  const runtime = {
    acquireCalls,
    async acquire(input: Record<string, unknown>) {
      acquireCalls.push(input);
      if (opts.acquireError) throw opts.acquireError;
      if (opts.acquireResult) return opts.acquireResult;
      throw new Error("fake runtime: acquireResult not configured");
    },
    snapshot() {
      return { virtualLanes: opts.virtualLanes };
    },
  } as unknown as AdaptiveAdmissionRuntime & { acquireCalls: Array<Record<string, unknown>> };
  return runtime;
}

test("probe is a no-op when virtual lanes are off (never calls acquire)", async () => {
  const runtime = fakeRuntime({ virtualLanes: false });
  const hook = createPerTargetAdmissionHook(runtime, "tenant-a");
  const ok = await hook({ modelStr: "p/model", executionKey: "k1", body: {} });
  assert.equal(ok, true, "lanes off must pass every target through");
  assert.equal(runtime.acquireCalls.length, 0, "no acquire when lanes are off");
});

test("probe is strictly non-blocking: maxWaitMs 0, parent tenantKey, release-on-admit", async () => {
  let released = false;
  const runtime = fakeRuntime({
    virtualLanes: true,
    acquireResult: {
      status: "admitted",
      lease: {
        released: false,
        release: () => {
          released = true;
        },
      },
    },
  });
  const hook = createPerTargetAdmissionHook(runtime, "tenant-parent", null);
  const ok = await hook({ modelStr: "p/model", executionKey: "k1", body: { messages: [] } });

  assert.equal(ok, true, "admitted probe must proceed");
  assert.equal(runtime.acquireCalls.length, 1);
  assert.equal(runtime.acquireCalls[0].tenantKey, "tenant-parent", "must gate the parent's lane");
  assert.equal(runtime.acquireCalls[0].maxWaitMs, 0, "strictly non-blocking: never queue");
  assert.deepEqual(
    runtime.acquireCalls[0].body,
    { messages: [] },
    "probe must estimate cost from the real target body"
  );
  assert.equal(
    runtime.acquireCalls[0].streaming,
    false,
    "absent stream flag must price the target like the parent path (non-streaming class)"
  );
  assert.equal(
    released,
    true,
    "probe lease must be released immediately (capacity gate, not a hold)"
  );
});

test("probe prices the request class the target will actually dispatch", async () => {
  const runtime = fakeRuntime({
    virtualLanes: true,
    acquireResult: { status: "admitted", lease: { released: false, release: () => {} } },
  });
  const hook = createPerTargetAdmissionHook(runtime, "tenant-parent");

  await hook({ modelStr: "p/model", executionKey: "k1", body: { stream: true } });
  assert.equal(
    runtime.acquireCalls[0].streaming,
    true,
    "stream:true fan-out must be priced at streaming class (1)"
  );

  await hook({ modelStr: "p/model", executionKey: "k2", body: { stream: false } });
  assert.equal(
    runtime.acquireCalls[1].streaming,
    false,
    "stream:false fan-out (e.g. fusion panel) must be priced at non-streaming class (2)"
  );

  await hook({ modelStr: "p/model", executionKey: "k3", body: { messages: [] } });
  assert.equal(
    runtime.acquireCalls[2].streaming,
    false,
    "absent stream flag must match the parent path (non-streaming class)"
  );
});

test("probe skips the target when its lane is full (rejected acquire)", async () => {
  const runtime = fakeRuntime({
    virtualLanes: true,
    acquireResult: {
      status: "rejected",
      lease: undefined,
    },
  });
  const hook = createPerTargetAdmissionHook(runtime, "tenant-parent");
  const ok = await hook({ modelStr: "p/model", executionKey: "k1", body: {} });
  assert.equal(ok, false, "lane-full probe must skip the target");
});

test("probe fails open when the admission layer throws (never fails the fan-out)", async () => {
  const runtime = fakeRuntime({
    virtualLanes: true,
    acquireError: new Error("admission layer hiccup"),
  });
  const hook = createPerTargetAdmissionHook(runtime, "tenant-parent");
  const ok = await hook({ modelStr: "p/model", executionKey: "k1", body: {} });
  assert.equal(ok, true, "an admission-layer error must let the target dispatch ungated");
});

test("probe forwards the abort signal", async () => {
  const ac = new AbortController();
  ac.abort();
  const runtime = fakeRuntime({
    virtualLanes: true,
    acquireResult: { status: "rejected", lease: undefined },
  });
  const hook = createPerTargetAdmissionHook(runtime, "tenant-parent", ac.signal);
  await hook({ modelStr: "p/model", executionKey: "k1", body: {} });
  assert.equal(runtime.acquireCalls[0].signal, ac.signal, "probe must forward the parent signal");
});

// ── Integration: combo priority skips lane-full targets ────────────────────

test("priority combo: lane-full target is skipped before dispatch, healthy target serves", async () => {
  const calls: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    calls.push(m);
    return okResponse(`ans-${m}`);
  };
  // Lane full for the FIRST target only → it must be skipped, second serves.
  const perTargetAdmission: PerTargetAdmissionHook = async (t) => t.modelStr !== "p/first";

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: priorityCombo(["p/first", "p/second"]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
    perTargetAdmission,
  });

  assert.deepEqual(calls, ["p/second"], "lane-full first target must be skipped");
  assert.equal(res.status, 200);
});

test("priority combo: all targets lane-full falls through to the exhausted path", async () => {
  const calls: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    calls.push(m);
    return okResponse(`ans-${m}`);
  };
  const perTargetAdmission: PerTargetAdmissionHook = async () => false; // every target skipped

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: priorityCombo(["p/first", "p/second"]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
    perTargetAdmission,
  });

  assert.equal(calls.length, 0, "no target may be dispatched when every lane is full");
  assert.ok(
    [503, 502].includes(res.status),
    `expected a service-unavailable status, got ${res.status}`
  );
});

// ── Integration: round-robin skips lane-full targets ───────────────────────

test("round-robin: lane-full target is skipped, next target serves", async () => {
  const calls: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    calls.push(m);
    return okResponse(`ans-${m}`);
  };
  const perTargetAdmission: PerTargetAdmissionHook = async (t) => t.modelStr !== "p/first";

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: rrCombo(["p/first", "p/second"]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
    perTargetAdmission,
  });

  assert.deepEqual(calls, ["p/second"], "round-robin must skip the lane-full first target");
  assert.equal(res.status, 200);
});

// ── Integration: fusion drops lane-full panel members before fan-out ───────

test("fusion: lane-full panel member is dropped before fan-out, judge still runs", async () => {
  const calls: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    calls.push(m);
    if (m === "p/judge") return okResponse("FINAL");
    return okResponse(`ans-${m}`);
  };
  const perTargetAdmission = async (t: { modelStr: string }) => t.modelStr !== "p/dropped";

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: fusionCombo(["p/keep", "p/dropped"], { judgeModel: "p/judge" }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
    perTargetAdmission,
  });

  assert.ok(!calls.includes("p/dropped"), "lane-full panel member must never be dispatched");
  assert.ok(calls.includes("p/keep"), "healthy panel member must still fan out");
  assert.ok(calls.includes("p/judge"), "judge synthesis must still run");
  assert.equal(res.status, 200);
});

test("fusion: all panel members lane-full returns 503 before any fan-out", async () => {
  const calls: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    calls.push(m);
    return okResponse(`ans-${m}`);
  };
  const perTargetAdmission: PerTargetAdmissionHook = async () => false; // every member skipped

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: fusionCombo(["p/keep", "p/other"], { judgeModel: "p/judge" }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
    perTargetAdmission,
  });

  assert.equal(calls.length, 0, "no panel member may dispatch when every lane is full");
  assert.equal(res.status, 503, "all-skipped fusion must return 503, not synthesize with nothing");
});

test("fusion: no hook passed behaves exactly as before (no lane awareness)", async () => {
  const calls: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    calls.push(m);
    if (m === "p/judge") return okResponse("FINAL");
    return okResponse(`ans-${m}`);
  };

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: fusionCombo(["p/keep", "p/other"], { judgeModel: "p/judge" }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.deepEqual(calls.sort(), ["p/judge", "p/keep", "p/other"], "no hook = full panel fan-out");
  assert.equal(res.status, 200);
});
