// #9654/#10110: process-wide admission budget with per-key fair scheduling.
//
// The pre-#10110 per-connection lanes minted a controller per session, so the
// documented "in one process" heavy/bytes bound multiplied by up to 64 lanes
// (#10110). The fix removes the lanes entirely: every session resolves to ONE
// process-global controller, and per-request session identity is used only as
// a fairness scheduling key (round-robin dispatch, not capacity allocation).
import test from "node:test";
import assert from "node:assert/strict";

const admissionModule = await import("../../src/shared/middleware/chatBodyAdmission.ts");
const {
  PerConnectionAdmissionController,
  resolveSessionId,
  admitChatRequest,
  admitChatStructure,
  perConnectionAdmissionController,
  ChatAdmissionController,
} = admissionModule;

function makeRequest(headers: Record<string, string>, body = "{}"): Request {
  const h: Record<string, string> = { "content-type": "application/json", ...headers };
  return new Request("http://x/v1/chat/completions", { method: "POST", headers: h, body });
}

test("resolveSessionId hashes bearer token into opaque key", () => {
  const req = makeRequest({ authorization: "Bearer sk-secret-key-123" });
  const sid = resolveSessionId(req);
  assert.ok(sid.startsWith("key_"));
  assert.equal(sid.length, "key_".length + 16);
  // Same key → same hash
  const req2 = makeRequest({ authorization: "Bearer sk-secret-key-123" });
  assert.equal(resolveSessionId(req2), sid);
  // Different key → different hash
  const req3 = makeRequest({ authorization: "Bearer sk-different-key-456" });
  assert.notEqual(resolveSessionId(req3), sid);
});

test("resolveSessionId hashes x-api-key header (Anthropic-style)", () => {
  const req = makeRequest({ "x-api-key": "anthropic-key-xyz" });
  const sid = resolveSessionId(req);
  assert.ok(sid.startsWith("key_"));
  assert.equal(sid.length, "key_".length + 16);
});

test("resolveSessionId returns 'anonymous' for no auth", () => {
  const req = makeRequest({}, "{}");
  assert.equal(resolveSessionId(req), "anonymous");
});

test("resolveSessionId does not leak raw API key in the session ID", () => {
  const req = makeRequest({ authorization: "Bearer sk-secret-key-123" });
  const sid = resolveSessionId(req);
  assert.ok(!sid.includes("sk-secret-key-123"));
  assert.ok(!sid.includes("secret"));
});

// ── #10110: one process-global budget, shared by every session ────────────
// The pre-fix lanes isolated capacity per session (up to 64× the process
// bound, and fake credentials could shard capacity). The fix returns the SAME
// controller for every session so the process-wide bound is real.

test("PerConnectionAdmissionController shares ONE global budget across sessions", () => {
  const pc = new PerConnectionAdmissionController(1);
  const ctrlA = pc.getController("session-a");
  const ctrlB = pc.getController("session-b");

  // A acquires the only process-wide slot.
  const leaseA = ctrlA.tryAcquireHeavy();
  assert.ok(leaseA);
  // B shares the SAME budget: no per-session capacity is available while A
  // holds the single process-wide slot (pre-#10110 this minted B its own slot).
  assert.equal(ctrlB.tryAcquireHeavy(), null);
  leaseA.release();
  // Slot freed → either session may now acquire.
  assert.ok(ctrlB.tryAcquireHeavy());
  ctrlB.tryAcquireHeavy()?.release();
});

test("PerConnectionAdmissionController returns same controller for same session", () => {
  const pc = new PerConnectionAdmissionController(1);
  const a1 = pc.getController("session-a");
  const a2 = pc.getController("session-a");
  assert.equal(a1, a2);
});

test("PerConnectionAdmissionController returns the same controller for ALL sessions", () => {
  const pc = new PerConnectionAdmissionController(1);
  const a = pc.getController("session-a");
  const b = pc.getController("session-b");
  const c = pc.getController("session-c");
  // The shared process-global budget is a single instance (#10110): no per-key
  // controllers exist to multiply the bound.
  assert.equal(a, b);
  assert.equal(b, c);
});

test("PerConnectionAdmissionController never evicts a live lease (no lane lifecycle)", () => {
  // The pre-#10110 LRU/TTL lane eviction could drop a controller mid-lease and
  // mint a fresh one on re-admit — silently doubling capacity (#10110). With a
  // single shared controller there is nothing to evict and nothing to mint.
  const pc = new PerConnectionAdmissionController(1, { maxSessions: 1, sessionTtlMs: 50 });
  const ctrlA1 = pc.getController("a");
  const leaseA = ctrlA1.tryAcquireHeavy();
  assert.ok(leaseA);

  // Touching another session (LRU pressure) and waiting past the TTL must not
  // replace the controller holding the live lease.
  const b = pc.getController("b");
  assert.equal(b, ctrlA1, "same global controller, no per-session lane to evict");
  const aAgain = pc.getController("a");
  assert.equal(aAgain, ctrlA1, "controller identity is stable across TTL");
  assert.equal(aAgain.tryAcquireHeavy(), null, "live lease keeps the only slot");
  leaseA.release();
});

test("PerConnectionAdmissionController snapshot reports process-wide aggregates", async () => {
  const pc = new PerConnectionAdmissionController(1);
  pc.getController("key_abc123");
  pc.getController("anonymous");

  const empty = pc.snapshot();
  assert.equal(empty.activeHeavy, 0);
  assert.equal(empty.queuedBytes, 0);
  assert.equal(empty.waiting, 0);
  assert.deepEqual(empty.lanes, []);

  // Occupy the global slot and park a waiter from a second key.
  const ctrlA = pc.getController("key_abc123");
  const leaseA = ctrlA.tryAcquireHeavy();
  assert.ok(leaseA);
  const wB = pc.getController("anonymous").acquireHeavyWithin(500, undefined, 100, "anonymous");
  await new Promise((resolve) => setTimeout(resolve, 30));

  const snap = pc.snapshot();
  assert.equal(snap.activeHeavy, 1);
  assert.equal(snap.queuedBytes, 100);
  assert.equal(snap.waiting, 1);
  assert.ok(Array.isArray(snap.lanes));
  for (const lane of snap.lanes) {
    assert.ok(typeof lane.key === "string");
    assert.ok(lane.waiting === 0 || lane.waiting === 1);
    // Keys are opaque hashed scheduler keys — raw credentials never appear.
    assert.ok(!lane.key.includes("secret"));
  }

  const waiterLease = await wB;
  waiterLease?.release();
  leaseA.release();
});

test("admitChatRequest uses per-connection controller by default", async () => {
  const result = await admitChatRequest(makeRequest({ authorization: "Bearer sk-test-key" }), {
    largeBodyBytes: 32,
    hardMaxBytes: 1024,
  });
  assert.equal(result.admit, true);
  if (result.admit) result.lease?.release();
});

test("admitChatRequest with explicit controller overrides per-connection lookup", async () => {
  const explicitController = new ChatAdmissionController(1);
  const result = await admitChatRequest(makeRequest({ authorization: "Bearer sk-test-key" }), {
    controller: explicitController,
    largeBodyBytes: 32,
    hardMaxBytes: 1024,
  });
  assert.equal(result.admit, true);
  if (result.admit) result.lease?.release();
});

test("admitChatStructure routes structural rejection to per-connection controller when heap pressure is genuinely high (#10183/#10268)", async () => {
  // occupy sess-a's per-connection controller via the module-level instance.
  // #503-fanout: the production singleton's legacy count cap is unlimited by
  // default (OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT unset in tests) — the real
  // capacity dimension is now the auto-derived ingest byte budget, so
  // "occupied" must exhaust that budget, not the (now unlimited) count.
  const controller = perConnectionAdmissionController.getController("sess-a");
  const occupied = controller.tryAcquireBudget(controller.maxInflightBytes);
  assert.ok(occupied);

  const result = await admitChatStructure(
    {
      messages: Array.from({ length: 3 }, () => ({ role: "user", content: "x" })),
    },
    null,
    {
      sessionId: "sess-a",
      maxMessages: 10,
      heavyMessages: 1,
      heavyTools: 10,
      heavyTokens: 10_000,
      // #10183/#10268: shedding is now conditional on real heap pressure.
      heapPressureCheck: () => true,
    }
  );
  // The process-wide slot is busy → 503
  assert.equal(result.admit, false);
  if (result.admit) return;
  assert.equal(result.response.status, 503);
  assert.equal(result.response.headers.get("Retry-After"), "1");
  occupied.release();
});

test("admitChatStructure with different sessionId shares the global budget", async () => {
  // occupy the shared process-global budget via sess-a (byte budget — see
  // the #503-fanout comment in the previous test).
  const ctrlA = perConnectionAdmissionController.getController("sess-a");
  const occupied = ctrlA.tryAcquireBudget(ctrlA.maxInflightBytes);
  assert.ok(occupied);

  // Session B must NOT get independent capacity (pre-#10110 it did — that was
  // the defect): it shares the one process-wide slot and must be rejected —
  // under real heap pressure. #10183/#10268 layered a heap-conditional gate on
  // top of this shed path (a healthy heap now gets a bounded headroom slot
  // instead of an outright 503), so this test forces genuine pressure to keep
  // exercising the #10110 shared-budget invariant it targets.
  const result = await admitChatStructure(
    {
      messages: Array.from({ length: 500 }, () => ({ role: "user", content: "x" })),
    },
    null,
    {
      sessionId: "sess-b",
      maxMessages: 0,
      heavyMessages: 200,
      heavyTools: 64,
      heavyTokens: 32_000,
      heapPressureCheck: () => true,
    }
  );
  assert.equal(result.admit, false);
  assert.equal(result.response.status, 503);
  occupied.release();
});
