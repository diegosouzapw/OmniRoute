// #10437: the #10183/#10268 fix admitted a busy heavyweight request immediately
// whenever the heap was healthy, via an unconditional no-op lease — with no bound
// of its own. That let an UNLIMITED number of "healthy heap" requests pile in ahead
// of the heap-pressure shed path, defeating the purpose of admission control: a
// slow leak (or a burst that never quite trips the heap-pressure ratio) could still
// starve the process. This is the permanent regression guard proving the
// healthy-heap fast path now has a real, finite ceiling (`healthyHeadroom`) and
// falls through to the SAME bounded-wait/shed path used under real heap pressure
// once that budget is exhausted — the existing #10183/#10268 heap-pressure gate is
// preserved unchanged; only the previously-unbounded healthy path is now bounded.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ChatAdmissionController,
  admitChatStructure,
} from "../../../src/shared/middleware/chatBodyAdmission.ts";

function heavyBody() {
  return {
    messages: Array.from({ length: 200 }, () => ({ role: "user", content: "x".repeat(40) })),
    tools: [] as unknown[],
  };
}

const heapHealthy = () => false; // "not under pressure" — the healthy-heap fast path

test("#10437: the healthy-heap fast path admits only a bounded headroom budget, never unlimited requests", async () => {
  const HEALTHY_HEADROOM = 2;
  // maxHeavyInFlight=1 (the primary structural lease); healthyHeadroom=2 is the
  // ADDITIONAL bounded budget available only while the heap stays healthy.
  const controller = new ChatAdmissionController(1, undefined, HEALTHY_HEADROOM);

  // Occupy the single primary lease directly, simulating one in-flight heavy
  // request — every subsequent admission below must go through the healthy-heap
  // fast path (busy primary capacity + healthy heap).
  const primary = controller.tryAcquireHeavy();
  assert.ok(primary);

  // Fire 3 CONCURRENT structurally-heavy requests on a healthy heap while the
  // primary lease is busy. Pre-fix, `admitChatStructure` returned a fresh no-op
  // lease for every single one of them, unconditionally — no ceiling existed.
  // Post-fix, only HEALTHY_HEADROOM (2) may bypass through the bounded headroom
  // budget; the remaining request must fall through to the bounded-wait/shed
  // path (queueMs=0 → immediate retryable 503), exactly like real heap pressure.
  const results = await Promise.all(
    Array.from({ length: 3 }, () =>
      admitChatStructure(heavyBody(), null, {
        controller,
        heapPressureCheck: heapHealthy,
        queueMs: 0,
      })
    )
  );

  const admitted = results.filter((r) => r.admit);
  const rejected = results.filter((r) => !r.admit);

  assert.equal(
    admitted.length,
    HEALTHY_HEADROOM,
    "only the finite healthy-headroom budget may bypass a busy primary lease on a healthy heap"
  );
  assert.equal(
    rejected.length,
    3 - HEALTHY_HEADROOM,
    "once the headroom budget is exhausted, further healthy-heap requests must be shed, not silently admitted"
  );
  for (const r of rejected) {
    if (r.admit) continue;
    assert.equal(r.response.status, 503);
    const payload = await r.response.json();
    assert.equal(payload.error.code, "chat_admission_busy");
    assert.equal(payload.error.reason, "structure_limit");
  }

  assert.equal(
    controller.activeHealthyHeadroom,
    HEALTHY_HEADROOM,
    "the headroom budget tracks its own active count independently of the primary lease"
  );

  primary.release();
  for (const r of admitted) if (r.admit) r.lease?.release();
  assert.equal(controller.activeHealthyHeadroom, 0, "released headroom leases free the budget");
});

test("#10437: healthyHeadroom=0 disables the fast-path bypass entirely — every busy healthy-heap request is bounded by the shed path", async () => {
  const controller = new ChatAdmissionController(1, undefined, 0);
  const primary = controller.tryAcquireHeavy();
  assert.ok(primary);

  const result = await admitChatStructure(heavyBody(), null, {
    controller,
    heapPressureCheck: heapHealthy,
    queueMs: 0,
  });

  assert.equal(result.admit, false, "with a zero headroom budget, a busy healthy-heap request must be shed");
  if (!result.admit) assert.equal(result.response.status, 503);
  primary.release();
});

test("#10437: the healthy-heap headroom budget still lets legitimate agent fan-out through up to its bound", async () => {
  // Default headroom (>= 1) must still admit at least one bypass, matching the
  // #10183/#10268 fix's original intent — this is not a regression to always-shed.
  const controller = new ChatAdmissionController(1);
  const primary = controller.tryAcquireHeavy();
  assert.ok(primary);

  const result = await admitChatStructure(heavyBody(), null, {
    controller,
    heapPressureCheck: heapHealthy,
  });
  assert.equal(result.admit, true, "at least the default headroom budget must admit a healthy-heap request");
  if (result.admit) result.lease?.release();
  primary.release();
});
