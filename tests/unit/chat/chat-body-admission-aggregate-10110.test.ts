// #10110: Aggregate process-wide bounds for byte-level chat admission.
//
// The always-on per-connection admission layer (#9940 / #9654) enforces
// CHAT_MAX_HEAVY_IN_FLIGHT and CHAT_ADMISSION_MAX_QUEUED_BYTES PER LANE, so the
// documented "in one process" contract (docs/reference/ENVIRONMENT.md:193) is
// multiplied by OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS (default 64): up to 64
// concurrent heavy requests and 256 MiB of parked bodies process-wide.
//
// These tests assert the AGGREGATE contract that the issue's acceptance
// criteria demand. They are intentionally deterministic (exact === assertions,
// no <= fudge) and are RED on release/v3.8.50 — they only pass once the byte
// level admits against one process-global budget with per-key fairness.
import test from "node:test";
import assert from "node:assert/strict";

const admissionModule = await import("../../../src/shared/middleware/chatBodyAdmission.ts");
const { PerConnectionAdmissionController, CHAT_ADMISSION_MAX_QUEUED_BYTES } = admissionModule;

const GLOBAL_QUEUED_BUDGET = CHAT_ADMISSION_MAX_QUEUED_BYTES; // 4 MiB default

// Aggregate across distinct controllers. With the fix every key resolves to
// ONE process-global controller (shared budget), so dedupe-by-identity yields
// the true process-wide totals — never double-counted, never multiplied by
// the number of keys.
function aggregateActiveHeavy(
  pc: InstanceType<typeof PerConnectionAdmissionController>,
  keys: string[]
): number {
  const seen = new Set<object>();
  let total = 0;
  for (const key of keys) {
    const controller = pc.getController(key);
    if (seen.has(controller)) continue;
    seen.add(controller);
    total += controller.activeHeavy;
  }
  return total;
}

function aggregateQueuedBytes(
  pc: InstanceType<typeof PerConnectionAdmissionController>,
  keys: string[]
): number {
  const seen = new Set<object>();
  let total = 0;
  for (const key of keys) {
    const controller = pc.getController(key);
    if (seen.has(controller)) continue;
    seen.add(controller);
    total += controller.queuedBytes;
  }
  return total;
}

// ── Family 1: active-LRU eviction must not mint replacement capacity ──────
// Issue repro: maxSessions=1, key A acquires; key B admission LRU-evicts A;
// A re-admits and gets a FRESH controller with fresh capacity while the old
// lease still holds → effectiveActiveForA = 2. The aggregate must stay 1.

test("LRU eviction of a live lane does not mint a second capacity slot", () => {
  // Red on release/v3.8.50: B's admission LRU-evicts A's lane, and A's re-admit
  // gets a FRESH controller with fresh capacity while the old lease still holds.
  // With the fix there are no per-session lanes at all: getController returns the
  // one shared process-global controller, so no capacity can ever be minted.
  const pc = new PerConnectionAdmissionController(1, { maxSessions: 1, sessionTtlMs: 60_000 });

  const ctrlA1 = pc.getController("A");
  const leaseA = ctrlA1.tryAcquireHeavy();
  assert.ok(leaseA, "A acquires the only slot");

  // B's admission must NOT evict the lane holding a live lease; and even if
  // the lane is retired/recreated, it must not mint fresh capacity.
  pc.getController("B");

  // A re-admits: no fresh capacity may appear while the old lease is live.
  const ctrlA2 = pc.getController("A");
  assert.equal(
    ctrlA2.tryAcquireHeavy(),
    null,
    "a live lease must keep its slot; no second capacity may be minted"
  );

  // Aggregate active heavy across every lane stays at the process-wide bound.
  assert.equal(
    aggregateActiveHeavy(pc, ["A", "B"]),
    1,
    "process-wide active heavy must be 1, not 2 (orphaned lease + minted slot)"
  );

  leaseA.release();
});

// ── Family 2: active-TTL eviction must not mint replacement capacity ──────
// Same invariant via the idle-TTL path: a lane that still holds a live lease
// must not be evicted (or, if retired, must not hand out fresh capacity).

test("TTL eviction of a live lane does not mint a second capacity slot", async () => {
  // Red on release/v3.8.50: the idle-TTL evicts A's lane mid-lease; a re-admit
  // then mints a fresh controller with fresh capacity (orphaned lease + new slot).
  // With the fix the shared controller outlives any session and never mints.
  const pc = new PerConnectionAdmissionController(1, { maxSessions: 64, sessionTtlMs: 50 });

  const ctrlA1 = pc.getController("A");
  const leaseA = ctrlA1.tryAcquireHeavy();
  assert.ok(leaseA, "A acquires the only slot");

  // Wait past the idle TTL so evictIfDue() would mark A's lane stale.
  await new Promise((resolve) => setTimeout(resolve, 120));

  // Re-admitting A must not produce a controller with fresh capacity.
  const ctrlA2 = pc.getController("A");
  assert.equal(
    ctrlA2.tryAcquireHeavy(),
    null,
    "a live lease must survive TTL; no fresh capacity may be minted"
  );
  assert.equal(
    aggregateActiveHeavy(pc, ["A"]),
    1,
    "process-wide active heavy must stay 1 after TTL with a live lease"
  );

  leaseA.release();
});

// ── Family 3: aggregate parked bytes stay within the process-wide budget ──
// Regression guard for the byte side of the multiplication: waiters parked
// from DIFFERENT lanes must share ONE process-wide queued-bytes budget.
//
// Note on shape: on the buggy code an idle lane never parks (its waiter
// acquires on its own free capacity instantly), so cross-lane bytes are only
// observable while multiple lanes are simultaneously busy — an arrangement
// the global-budget fix makes impossible by construction. The active-heavy
// families (1/2/4) are the RED probes; this family locks in the byte budget
// once the shared budget exists: one busy slot + waiters parked from two
// lanes, aggregate must never exceed the single process-wide budget.

test("parked bytes across lanes share one process-wide budget", async () => {
  const pc = new PerConnectionAdmissionController(1, { maxSessions: 64, sessionTtlMs: 60_000 });

  // One lane holds the single busy slot.
  const ctrlA = pc.getController("A");
  const heldA = ctrlA.tryAcquireHeavy();
  assert.ok(heldA);

  // Two waiters park — one keyed A, one keyed B — against the SAME busy slot.
  // Together they must respect the single process-wide budget.
  const wA = ctrlA.acquireHeavyWithin(2_000, undefined, GLOBAL_QUEUED_BUDGET, "A");
  const wB = pc.getController("B").acquireHeavyWithin(2_000, undefined, GLOBAL_QUEUED_BUDGET, "B");
  await new Promise((resolve) => setTimeout(resolve, 30));

  const aggregate = aggregateQueuedBytes(pc, ["A", "B"]);
  assert.ok(
    aggregate <= GLOBAL_QUEUED_BUDGET,
    `aggregate queued bytes (${aggregate}) must stay within the single process-wide budget (${GLOBAL_QUEUED_BUDGET})`
  );

  heldA.release();
  const leases = await Promise.all([wA, wB]);
  for (const lease of leases) lease?.release();
  assert.equal(aggregateQueuedBytes(pc, ["A", "B"]), 0, "all parked bytes released");
});

test("a 16 MiB per-lane config still respects the process-wide byte budget", async () => {
  // The issue's 1 GiB scenario shape: per-lane budgets that would multiply
  // into 1 GiB must instead be capped by the single process-wide budget.
  const MiB = 1024 * 1024;
  const pc = new PerConnectionAdmissionController(1, { maxSessions: 64, sessionTtlMs: 60_000 });

  const ctrlA = pc.getController("A");
  const heldA = ctrlA.tryAcquireHeavy();
  assert.ok(heldA);

  const wA = ctrlA.acquireHeavyWithin(2_000, undefined, 16 * MiB, "A");
  const wB = pc.getController("B").acquireHeavyWithin(2_000, undefined, 16 * MiB, "B");
  await new Promise((resolve) => setTimeout(resolve, 30));

  const aggregate = aggregateQueuedBytes(pc, ["A", "B"]);
  assert.ok(
    aggregate <= GLOBAL_QUEUED_BUDGET,
    `16 MiB per-lane config must still respect the process-wide budget; aggregate was ${aggregate}`
  );

  heldA.release();
  const leases = await Promise.all([wA, wB]);
  for (const lease of leases) lease?.release();
});

// ── Family 4: same-session recreation waits on the global slot ────────────
// A session that released and re-admits while ANOTHER session holds the
// process-wide slot must queue, not bypass.

test("same-session recreation waits while another session holds the global slot", () => {
  const pc = new PerConnectionAdmissionController(1, { maxSessions: 64, sessionTtlMs: 60_000 });

  const ctrlA = pc.getController("A");
  const leaseA = ctrlA.tryAcquireHeavy();
  assert.ok(leaseA);
  leaseA.release(); // A releases; the global slot is free.

  // B takes the single process-wide slot.
  const ctrlB = pc.getController("B");
  const leaseB = ctrlB.tryAcquireHeavy();
  assert.ok(leaseB);

  // A re-admits while B holds the slot → must wait, not bypass.
  assert.equal(
    ctrlA.tryAcquireHeavy(),
    null,
    "recreated A must not bypass the process-wide slot held by B"
  );
  assert.equal(
    aggregateActiveHeavy(pc, ["A", "B"]),
    1,
    "aggregate active heavy is 1 with B holding the slot"
  );

  leaseB.release();
});

// ── Fairness guard (B2): lanes are served round-robin over the shared budget ─
// A session that queues a burst must not consume every dispatch turn: when A
// queues two waiters and B queues one behind the same busy slot, B's waiter
// must be served BEFORE A's second follow-up (round-robin across lanes, the
// adaptive dispatchLanes precedent). A strict single FIFO would serve A-A-B
// and starve B under sustained load.

test("one session's burst does not starve another session's bounded wait", async () => {
  const pc = new PerConnectionAdmissionController(1, { maxSessions: 64, sessionTtlMs: 60_000 });

  // A holds the single slot and queues two follow-ups.
  const ctrlA = pc.getController("A");
  const leaseA = ctrlA.tryAcquireHeavy();
  assert.ok(leaseA);

  const aWaiters = [
    ctrlA.acquireHeavyWithin(2_000, undefined, 0, "A"),
    ctrlA.acquireHeavyWithin(2_000, undefined, 0, "A"),
  ];

  // B queues one bounded wait behind the shared slot.
  const ctrlB = pc.getController("B");
  const bWaiter = ctrlB.acquireHeavyWithin(2_000, undefined, 0, "B");

  // Free the slot, then release each lease the moment it arrives so the next
  // waiter can proceed. Record acquisition order.
  leaseA.release();
  const order: string[] = [];
  const track = (label: string) => (lease: unknown) => {
    if (lease) {
      order.push(label);
      (lease as { release: () => void }).release();
    }
  };
  void aWaiters[0].then(track("a1"));
  void aWaiters[1].then(track("a2"));
  void bWaiter.then(track("b1"));
  await Promise.all([...aWaiters, bWaiter]);

  assert.equal(
    order.length,
    3,
    "all three queued sessions must acquire within the bounded wait; none starve"
  );
  assert.equal(
    order.indexOf("b1"),
    1,
    `round-robin must serve B before A's second follow-up (strict FIFO would starve B); got order ${order.join(" -> ")}`
  );
  assert.equal(aggregateActiveHeavy(pc, ["A", "B"]), 0);
});
