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
  clearAllModelLockouts,
  evictModelLockoutOverflow,
  getModelLockoutSize,
  MODEL_LOCKOUT_EVICTION_CAP,
} = await import("../../open-sse/services/accountFallback.ts");

const REASON = "rate_limited";
const COOLDOWN_MS = 60_000;

test("eviction removes oldest entries when cap exceeded", () => {
  clearAllModelLockouts();

  const cap = MODEL_LOCKOUT_EVICTION_CAP ?? 1000;
  const extra = 50;
  const total = cap + extra;

  for (let i = 0; i < total; i++) {
    lockModel(`evict-test-p-${i}`, `conn-${i}`, `m-${i}`, REASON, COOLDOWN_MS);
  }

  assert.equal(getModelLockoutSize(), total);

  evictModelLockoutOverflow();

  const size = getModelLockoutSize();
  assert.ok(size <= cap, `expected ≤${cap} lockouts after eviction, got ${size}`);
});

test("eviction is idempotent when under cap", () => {
  clearAllModelLockouts();

  const cap = MODEL_LOCKOUT_EVICTION_CAP ?? 1000;
  const under = cap - 10;
  for (let i = 0; i < under; i++) {
    lockModel(`idemp-p-${i}`, `conn-${i}`, `m-${i}`, REASON, COOLDOWN_MS);
  }

  assert.equal(getModelLockoutSize(), under);

  evictModelLockoutOverflow();

  assert.equal(getModelLockoutSize(), under);
});

test("eviction keeps most recent entries", () => {
  clearAllModelLockouts();

  const cap = MODEL_LOCKOUT_EVICTION_CAP ?? 1000;
  const extra = 30;
  const total = cap + extra;

  for (let i = 0; i < total; i++) {
    lockModel(`keep-p-${i}`, `conn-${i}`, `m-${i}`, REASON, COOLDOWN_MS);
  }

  assert.equal(getModelLockoutSize(), total);

  evictModelLockoutOverflow();

  const size = getModelLockoutSize();
  assert.ok(size <= cap, `expected ≤${cap}, got ${size}`);
  // Should have kept the later entries, not fallen below (cap - extra)
  assert.ok(size >= total - extra, "most recent entries should be preserved");
});
