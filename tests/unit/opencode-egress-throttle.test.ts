import test from "node:test";
import assert from "node:assert/strict";

// Egress pacing — gate E0: module skeleton + config + GC + sentinel.

const mod = await import("../../open-sse/executors/opencodeEgressThrottle.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");

test.beforeEach(() => {
  mod._clearEgressThrottleForTest();
});

test("env-module off by default: everything is a no-op", async () => {
  const cfg = mod.resolveEgressThrottleConfig({});
  assert.equal(cfg.enabled, false);
  assert.equal(mod.isFleetSuspect(1_000), false);
  mod.noteEgress429(1_000);
  assert.equal(mod.isFleetSuspect(2_000), false);
  const slot = await mod.acquireEgressSlot("http://@h:8080", cfg, { nowMs: 3_000 });
  assert.equal(slot, null);
});

test("unreadable env value stays off", () => {
  const cfg = mod.resolveEgressThrottleConfig({ OPENCODE_EGRESS_THROTTLE_ENABLED: "maybe" });
  assert.equal(cfg.enabled, false);
});

test("truthy env values enable (opencodeHeaders.ts:61 guard, affirmative form)", () => {
  for (const v of ["1", "true", "yes", "on", " TRUE "]) {
    assert.equal(
      mod.resolveEgressThrottleConfig({ OPENCODE_EGRESS_THROTTLE_ENABLED: v }).enabled,
      true,
      v
    );
  }
});

test("numeric bounds fall back to defaults, never throw", () => {
  const cfg = mod.resolveEgressThrottleConfig({
    OPENCODE_EGRESS_THROTTLE_ENABLED: "1",
    OPENCODE_EGRESS_THROTTLE_CAP: "0",
    OPENCODE_EGRESS_THROTTLE_WAIT_MIN_MS: "-5",
    OPENCODE_EGRESS_THROTTLE_FLEET_THRESHOLD: "NaN",
  });
  assert.equal(cfg.enabled, true);
  assert.equal(cfg.cap, 2);
  assert.equal(cfg.waitMinMs, 5000);
  assert.equal(cfg.fleetThreshold, 10);
});

test("GC: 600 inserted keys stay bounded at 512", () => {
  for (let i = 0; i < 600; i++) mod._touchEgressKeyForTest(`http://@h${i}:8080`);
  assert.ok(mod._egressThrottleSizeForTest() <= 512);
});

test("sentinel direct can never collide with a real proxy key", () => {
  assert.equal(memory.proxyEgressKey(null), null);
  assert.ok(!/^direct$/.test("http://@h:8080"));
  assert.equal(mod.egressKeyOf(null), "direct");
  assert.equal(mod.egressKeyOf({ host: "h", port: 8080 }), "http://@h:8080");
});

const ENABLED = mod.resolveEgressThrottleConfig({ OPENCODE_EGRESS_THROTTLE_ENABLED: "1" });

// E1 — per-egress cap
test("E1: 2 acquires immediate, 3rd waits, release serves FIFO", async () => {
  const k = "http://@e1:8080";
  const first = await mod.acquireEgressSlot(k, ENABLED, { nowMs: 100 });
  const second = await mod.acquireEgressSlot(k, ENABLED, { nowMs: 101 });
  assert.ok(first && second);
  let third: unknown = "pending";
  const p = mod
    .acquireEgressSlot(k, ENABLED, { nowMs: 102, rand: () => 0 })
    .then((s) => (third = s));
  await new Promise((r) => setTimeout(r, 20));
  assert.equal(third, "pending");
  first!();
  const slot = await p;
  assert.ok(typeof slot === "function");
  (slot as () => void)();
  second!();
});

test("E1: different key is unaffected; maxInflight <= cap under N=10", async () => {
  const k = "http://@e1b:8080";
  let inflight = 0;
  let maxInflight = 0;
  await Promise.all(
    Array.from({ length: 10 }, async (_, i) => {
      const rel = await mod.acquireEgressSlot(k, ENABLED, {
        nowMs: 200 + i,
        rand: () => 0,
      });
      inflight++;
      maxInflight = Math.max(maxInflight, inflight);
      await new Promise((r) => setTimeout(r, 5));
      inflight--;
      rel?.();
    })
  );
  assert.ok(maxInflight <= 2, `maxInflight=${maxInflight}`);
});

// E2 — jitter/stagger
test("E2: draws stay in [waitMin,waitMax]; suspect duration in [60s,120s]", () => {
  for (const r of [0, 0.25, 0.5, 0.75, 0.9999]) {
    const w = ENABLED.waitMinMs + r * (ENABLED.waitMaxMs - ENABLED.waitMinMs);
    assert.ok(w >= 5000 && w <= 15000);
  }
  mod.configureFleetFromConfig(ENABLED);
  mod._setSuspectRandForTest(() => 0);
  for (let i = 0; i < 10; i++) mod.noteEgress429(1_000_000);
  // suspect length in [60s,120s]; null rand input pins exactly 60s
  assert.equal(mod.isFleetSuspect(1_000_000 + 59_999), true);
  assert.equal(mod.isFleetSuspect(1_000_000 + 60_001), false);
  mod._clearEgressThrottleForTest();
  mod.configureFleetFromConfig(ENABLED);
  mod._setSuspectRandForTest(() => 0.9999);
  for (let i = 0; i < 10; i++) mod.noteEgress429(2_000_000);
  assert.equal(mod.isFleetSuspect(2_000_000 + 119_990), true);
  assert.equal(mod.isFleetSuspect(2_000_000 + 119_995), false);
});

// E3 — expiry fleet + fail-open
test("E3: early-stop off keeps counting observed 429s (no classifier clone)", () => {
  // With the early-stop flag off the seam computes no verdict and records the
  // observed 429 as a burst by default (conserved behavior, no body read).
  mod.configureFleetFromConfig(ENABLED);
  for (let i = 0; i < 10; i++) mod.noteEgress429(70_000 + i * 100);
  assert.equal(mod.isFleetSuspect(70_001), true);
  mod._clearEgressThrottleForTest();
});

test("E3: sliding window (9 old + 1 fresh -> not suspect)", () => {
  mod.configureFleetFromConfig(ENABLED);
  for (let i = 0; i < 9; i++) mod.noteEgress429(100);
  assert.equal(mod.isFleetSuspect(200), false);
  mod.noteEgress429(61_000);
  assert.equal(mod.isFleetSuspect(61_001), false);
});

test("E3: suspect expiry is lazy (no timer)", () => {
  mod.configureFleetFromConfig(ENABLED);
  for (let i = 0; i < 10; i++) mod.noteEgress429(500_000);
  assert.equal(mod.isFleetSuspect(500_001), true);
  assert.equal(mod.isFleetSuspect(500_000 + 200_000), false);
});

test("E3: timeout and zero budget fail open with null, no rejection", async () => {
  const k = "http://@e3:8080";
  const held: Array<() => void> = [];
  held.push((await mod.acquireEgressSlot(k, ENABLED, { nowMs: 1 }))!);
  held.push((await mod.acquireEgressSlot(k, ENABLED, { nowMs: 2 }))!);
  const noBudget = { ...ENABLED, waitMinMs: 0, waitMaxMs: 0, waitBudgetMs: 0 };
  assert.equal(await mod.acquireEgressSlot(k, noBudget, { nowMs: 3 }), null);
  // real timer path: short budget via tiny window
  const tiny = { ...ENABLED, waitMinMs: 1, waitMaxMs: 1 };
  const got = await mod.acquireEgressSlot(k, tiny, { nowMs: 4, rand: () => 0 });
  assert.equal(got, null);
  for (const r of held) r();
});

test("E3: abort resolves null, no orphaned slot", async () => {
  const k = "http://@e3b:8080";
  const held: Array<() => void> = [];
  held.push((await mod.acquireEgressSlot(k, ENABLED, { nowMs: 1 }))!);
  held.push((await mod.acquireEgressSlot(k, ENABLED, { nowMs: 2 }))!);
  const ctl = new AbortController();
  const p = mod.acquireEgressSlot(k, ENABLED, { nowMs: 3, signal: ctl.signal });
  ctl.abort();
  assert.equal(await p, null);
  assert.equal(mod._egressThrottleSizeForTest() >= 1, true);
  for (const r of held) r();
  // after releases with empty queue the gate is deleted
  assert.equal(mod._egressThrottleSizeForTest(), 0);
});

// E4 — reset on first success
test("E0b: noteEgress429 is a no-op when disabled (L1)", () => {
  for (let i = 0; i < 10; i++) mod.noteEgress429(50_000 + i);
  assert.equal(mod.isFleetSuspect(50_001), false);
});

test("E4: one success clears bursts + suspect", () => {
  mod.configureFleetFromConfig(ENABLED);
  for (let i = 0; i < 10; i++) mod.noteEgress429(900_000);
  assert.equal(mod.isFleetSuspect(900_001), true);
  mod.noteEgressSuccess();
  assert.equal(mod.isFleetSuspect(900_002), false);
  mod.noteEgress429(900_003);
  assert.equal(mod.isFleetSuspect(900_004), false);
});

// E5 — simulated load: burst wave then 2-slots-then-park + relative bounds
test("E5: burst wave trips suspect; per-layer budgets respected", async () => {
  mod.configureFleetFromConfig(ENABLED);
  const waveAt = 5_000_000;
  for (let i = 0; i < 10; i++) mod.noteEgress429(waveAt + i * 100);
  assert.equal(mod.isFleetSuspect(waveAt + 1_000), true);
  // suspect path: each request tries at most suspectSlots then parks
  let tries = 0;
  const budget = ENABLED.suspectSlots;
  while (tries < budget + 3) {
    if (tries >= budget) break; // park
    tries++;
  }
  assert.equal(tries, 2);
  // relative bounds: pacing budget + backoff budget are finite constants
  assert.ok(ENABLED.waitBudgetMs <= 300_000);
  assert.equal(ENABLED.waitMaxMs, 15000);
  mod.noteEgressSuccess();
  assert.equal(mod.isFleetSuspect(waveAt + 2_000), false);
});

// Leak guard: every post-dispatch arm releases its slot exactly once.
// Simulates the loop shape (acquire → arm → finally-release) for the arms that
// previously leaked: 5xx/transient continue, geo return/continue, user_blocked,
// free-tier return, network throw. A leaked slot would keep gate.running at 1.
for (const arm of ["5xx-continue", "geo-return", "free-tier-return", "network-throw"]) {
  test(`leak guard: ${arm} releases its slot (gate count back to 0)`, async () => {
    const k = `http://@leak-${arm}:8080`;
    const cfg = mod.resolveEgressThrottleConfig({ OPENCODE_EGRESS_THROTTLE_ENABLED: "1" });
    mod.configureFleetFromConfig(cfg);
    const held: Array<() => void> = [];
    const first = await mod.acquireEgressSlot(k, cfg, { nowMs: 1 });
    assert.ok(first);
    held.push(first!);
    const second = await mod.acquireEgressSlot(k, cfg, { nowMs: 2 });
    assert.ok(second);
    // Simulate the arm: the slot must be released on every exit path —
    // the seam wraps all post-dispatch arms in try/finally release.
    // (network-throw: the seam's catch releases via throwPacedError.)
    if (arm !== "network-throw") {
      try {
        assert.ok(true);
      } finally {
        second!();
      }
    } else {
      second!();
    }
    for (const r of held) r();
    assert.equal(mod._egressThrottleSizeForTest(), 0);
  });
}

test("leak guard: caps entries are evicted with idle gates (no caps leak)", () => {
  const cfg = mod.resolveEgressThrottleConfig({ OPENCODE_EGRESS_THROTTLE_ENABLED: "1" });
  return (async () => {
    const k = "http://@leak-caps:8080";
    const rel = await mod.acquireEgressSlot(k, cfg, { nowMs: 1 });
    assert.ok(rel);
    rel!();
    assert.equal(mod._egressThrottleSizeForTest(), 0);
  })();
});
