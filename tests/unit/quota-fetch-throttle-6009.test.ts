import test from "node:test";
import assert from "node:assert/strict";

// Regression guard for #6009 — forced delay/cooldown between upstream quota fetches.
// When many accounts on one IP fetch provider quota, firing them all in the same
// second looks suspicious to the upstream (per router-for-me/CLIProxyAPI#2385 this
// can get a Codex OAuth token revoked). MinIntervalThrottle serializes the actual
// network calls and spaces each start >= minIntervalMs after the previous one.

const { MinIntervalThrottle, resolveQuotaFetchMinIntervalMs } = await import(
  "../../open-sse/services/quotaFetchThrottle.ts"
);

class FakeClock {
  t = 1000;
  slept: number[] = [];
  now = () => this.t;
  sleep = async (ms: number) => {
    this.slept.push(ms);
    this.t += ms;
  };
}

test("#6009 spaces concurrent fetch starts by at least minIntervalMs", async () => {
  const clock = new FakeClock();
  const throttle = new MinIntervalThrottle({ minIntervalMs: 250, jitterMs: 0, clock });

  // Fire 4 concurrent acquisitions (simulates 4 accounts fetching at once).
  await Promise.all(Array.from({ length: 4 }, () => throttle.acquire()));

  // First runs immediately; the other three each sleep the full 250ms gap, so
  // the four network calls start at t = 1000, 1250, 1500, 1750 (spaced, not bursty).
  assert.deepEqual(clock.slept, [250, 250, 250]);
  assert.equal(clock.now(), 1750);
});

test("#6009 minIntervalMs=0 disables throttling (no sleeps)", async () => {
  const clock = new FakeClock();
  const throttle = new MinIntervalThrottle({ minIntervalMs: 0, jitterMs: 0, clock });
  await Promise.all([throttle.acquire(), throttle.acquire(), throttle.acquire()]);
  assert.deepEqual(clock.slept, []);
});

test("#6009 a single fetch is never delayed", async () => {
  const clock = new FakeClock();
  const throttle = new MinIntervalThrottle({ minIntervalMs: 500, jitterMs: 0, clock });
  await throttle.acquire();
  assert.deepEqual(clock.slept, []);
  assert.equal(clock.now(), 1000);
});

test("#6009 jitter adds a bounded extra spacing on top of the min gap", async () => {
  const clock = new FakeClock();
  // Deterministic rand → always 0.5, so jitter = floor(0.5 * 100) = 50.
  const throttle = new MinIntervalThrottle({
    minIntervalMs: 200,
    jitterMs: 100,
    clock,
    rand: () => 0.5,
  });
  await Promise.all(Array.from({ length: 3 }, () => throttle.acquire()));
  // First call never sleeps; each subsequent waits gap = 200 + floor(0.5*100) = 250.
  assert.deepEqual(clock.slept, [250, 250]);
});

test("#6009 env resolver clamps to sane bounds and defaults", () => {
  assert.equal(resolveQuotaFetchMinIntervalMs({}), 250); // default
  assert.equal(resolveQuotaFetchMinIntervalMs({ OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS: "0" }), 0);
  assert.equal(
    resolveQuotaFetchMinIntervalMs({ OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS: "1000" }),
    1000
  );
  // garbage / negative → default
  assert.equal(
    resolveQuotaFetchMinIntervalMs({ OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS: "abc" }),
    250
  );
  assert.equal(resolveQuotaFetchMinIntervalMs({ OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS: "-5" }), 250);
  // absurdly high → clamped to max 5000
  assert.equal(
    resolveQuotaFetchMinIntervalMs({ OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS: "999999" }),
    5000
  );
});
