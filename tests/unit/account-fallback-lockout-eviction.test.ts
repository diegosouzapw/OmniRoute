import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-lockout-eviction-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-lockout-eviction-secret";

const {
  lockModel,
  isModelLocked,
  clearAllModelLockouts,
  evictModelLockoutOverflow,
  getModelLockoutSize,
  MODEL_LOCKOUT_EVICTION_CAP,
} = await import("../../open-sse/services/accountFallback.ts");

const REASON = "rate_limited";
// Far from expiring — entry.until is well in the future.
const ACTIVE_COOLDOWN_MS = 60_000;
// Negative cooldown backdates `until` into the past (Date.now() + cooldownMs),
// deterministically producing an already-expired entry without a real sleep.
const EXPIRED_COOLDOWN_MS = -60_000;

test("eviction removes expired entries beyond the cap", () => {
  clearAllModelLockouts();

  const cap = MODEL_LOCKOUT_EVICTION_CAP ?? 1000;
  const extra = 50;
  const total = cap + extra;

  for (let i = 0; i < total; i++) {
    lockModel(`evict-test-p-${i}`, `conn-${i}`, `m-${i}`, REASON, EXPIRED_COOLDOWN_MS);
  }

  assert.equal(getModelLockoutSize(), total);

  evictModelLockoutOverflow();

  // Every entry here is already expired, so nothing is protected — eviction
  // should shrink exactly back down to the cap.
  assert.equal(
    getModelLockoutSize(),
    cap,
    "all-expired overflow should be evicted down to exactly the cap"
  );
});

test("eviction is idempotent when under cap", () => {
  clearAllModelLockouts();

  const cap = MODEL_LOCKOUT_EVICTION_CAP ?? 1000;
  const under = cap - 10;
  for (let i = 0; i < under; i++) {
    lockModel(`idemp-p-${i}`, `conn-${i}`, `m-${i}`, REASON, ACTIVE_COOLDOWN_MS);
  }

  assert.equal(getModelLockoutSize(), under);

  evictModelLockoutOverflow();

  assert.equal(getModelLockoutSize(), under);
});

test("eviction never removes a still-active lockout, even when the map exceeds the cap purely with active entries", () => {
  clearAllModelLockouts();

  const cap = MODEL_LOCKOUT_EVICTION_CAP ?? 1000;

  // Lock a "victim" model FIRST — the oldest insertion-order entry, i.e.
  // exactly what the old (buggy) insertion-order eviction deleted first.
  lockModel("victim-provider", "victim-conn", "victim-model", REASON, ACTIVE_COOLDOWN_MS);
  assert.ok(
    isModelLocked("victim-provider", "victim-conn", "victim-model"),
    "precondition: victim is locked"
  );

  // Push the map over the cap using only MORE active (not expired) entries.
  for (let i = 0; i < cap + 10; i++) {
    lockModel(`overflow-p-${i}`, `conn-${i}`, `m-${i}`, REASON, ACTIVE_COOLDOWN_MS);
  }
  assert.ok(getModelLockoutSize() > cap, "precondition: map exceeds the cap purely with active locks");

  evictModelLockoutOverflow();

  // The core regression (#6923): an active lock must survive eviction
  // regardless of insertion order, even while the map stays over the
  // nominal cap — a real, currently-cooling-down model must never be
  // silently reported as unlocked just because the Map got large.
  assert.ok(
    isModelLocked("victim-provider", "victim-conn", "victim-model"),
    "a still-active lockout must survive eviction even when the map is over cap"
  );
});

test("eviction removes expired entries while an active lockout in the same overflow survives", () => {
  clearAllModelLockouts();

  const cap = MODEL_LOCKOUT_EVICTION_CAP ?? 1000;
  const extra = 50;

  // Victim locked FIRST (oldest insertion order) with an active cooldown.
  lockModel("victim2-provider", "victim2-conn", "victim2-model", REASON, ACTIVE_COOLDOWN_MS);

  // Fill past the cap with EXPIRED entries — these should be evicted.
  for (let i = 0; i < cap + extra; i++) {
    lockModel(`stale-p-${i}`, `conn-${i}`, `m-${i}`, REASON, EXPIRED_COOLDOWN_MS);
  }

  const beforeSize = getModelLockoutSize();
  assert.equal(beforeSize, cap + extra + 1);

  evictModelLockoutOverflow();

  assert.ok(
    isModelLocked("victim2-provider", "victim2-conn", "victim2-model"),
    "active victim lockout must survive eviction"
  );
  // The oldest entry (the victim) is protected because it's active, so
  // eviction skips it and instead removes (extra + 1) of the expired
  // fillers to close the gap — landing exactly back at the cap.
  assert.equal(
    getModelLockoutSize(),
    cap,
    "expired fillers should be evicted down to exactly the cap, victim included"
  );
});
