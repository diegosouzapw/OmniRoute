import { test } from "node:test";
import assert from "node:assert/strict";

import { SlidingWindowLimiter } from "../../open-sse/services/slidingWindowLimiter.ts";

/** A controllable clock so the tests are deterministic (no real time). */
function fakeClock(start = 1_000_000) {
  let t = start;
  return {
    now: () => t,
    advance: (ms: number) => {
      t += ms;
    },
  };
}

test("allows up to N requests in the window and blocks the (N+1)-th", () => {
  const clock = fakeClock();
  const limiter = new SlidingWindowLimiter({ now: clock.now });
  const win = { requests: 3, windowMs: 1000 };

  assert.equal(limiter.tryAcquire("k", win).allowed, true);
  assert.equal(limiter.tryAcquire("k", win).allowed, true);
  assert.equal(limiter.tryAcquire("k", win).allowed, true);

  const blocked = limiter.tryAcquire("k", win);
  assert.equal(blocked.allowed, false, "the 4th request in a 3/1000ms window is blocked");
  assert.ok(blocked.retryAfterMs > 0 && blocked.retryAfterMs <= 1000, "retryAfterMs points at the oldest hit expiry");
});

test("the window slides: a slot frees once the oldest hit ages out", () => {
  const clock = fakeClock();
  const limiter = new SlidingWindowLimiter({ now: clock.now });
  const win = { requests: 2, windowMs: 1000 };

  assert.equal(limiter.tryAcquire("k", win).allowed, true); // t=0
  clock.advance(400);
  assert.equal(limiter.tryAcquire("k", win).allowed, true); // t=400
  assert.equal(limiter.tryAcquire("k", win).allowed, false, "2/1000ms is saturated at t=400");

  clock.advance(601); // t=1001 — the t=0 hit (>1000ms old) ages out
  assert.equal(limiter.tryAcquire("k", win).allowed, true, "a slot frees once the oldest hit leaves the window");
});

test("retryAfterMs reflects when the oldest in-window hit expires", () => {
  const clock = fakeClock();
  const limiter = new SlidingWindowLimiter({ now: clock.now });
  const win = { requests: 1, windowMs: 1000 };

  assert.equal(limiter.tryAcquire("k", win).allowed, true); // t=0
  clock.advance(250);
  const blocked = limiter.tryAcquire("k", win); // t=250
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterMs, 750, "oldest hit (t=0) expires at t=1000, now=250 → 750ms");
});

test("keys are isolated from one another", () => {
  const clock = fakeClock();
  const limiter = new SlidingWindowLimiter({ now: clock.now });
  const win = { requests: 1, windowMs: 1000 };

  assert.equal(limiter.tryAcquire("a", win).allowed, true);
  assert.equal(limiter.tryAcquire("b", win).allowed, true, "key b is unaffected by key a being saturated");
  assert.equal(limiter.tryAcquire("a", win).allowed, false);
});

test("a non-positive limit or window disables the limiter (always allowed)", () => {
  const limiter = new SlidingWindowLimiter();
  assert.equal(limiter.tryAcquire("k", { requests: 0, windowMs: 1000 }).allowed, true);
  assert.equal(limiter.tryAcquire("k", { requests: 5, windowMs: 0 }).allowed, true);
});

test("reset clears a single key's history", () => {
  const clock = fakeClock();
  const limiter = new SlidingWindowLimiter({ now: clock.now });
  const win = { requests: 1, windowMs: 1000 };

  assert.equal(limiter.tryAcquire("k", win).allowed, true);
  assert.equal(limiter.tryAcquire("k", win).allowed, false);
  limiter.reset("k");
  assert.equal(limiter.tryAcquire("k", win).allowed, true, "history cleared → slot available again");
});

test("blocked attempts do not consume a slot (no double counting)", () => {
  const clock = fakeClock();
  const limiter = new SlidingWindowLimiter({ now: clock.now });
  const win = { requests: 1, windowMs: 1000 };

  assert.equal(limiter.tryAcquire("k", win).allowed, true); // records t=0
  // Three failed attempts must not push timestamps; the window still holds exactly one hit.
  limiter.tryAcquire("k", win);
  limiter.tryAcquire("k", win);
  limiter.tryAcquire("k", win);
  clock.advance(1001);
  assert.equal(limiter.tryAcquire("k", win).allowed, true, "only the single successful hit aged out");
});
