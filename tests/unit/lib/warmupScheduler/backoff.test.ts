import test from "node:test";
import assert from "node:assert/strict";
import { getWarmupBackoffUntil } from "../../../../src/lib/warmupScheduler/backoff.ts";

test("backoff: streak=1 → 5min", () => {
  const until = new Date(getWarmupBackoffUntil(1)).getTime();
  const expected = Date.now() + 5 * 60 * 1000;
  assert.ok(
    Math.abs(until - expected) < 1000,
    `expected ~5min, got ${(until - Date.now()) / 60000}min`
  );
});

test("backoff: streak=2 → 10min", () => {
  const until = new Date(getWarmupBackoffUntil(2)).getTime();
  const expected = Date.now() + 10 * 60 * 1000;
  assert.ok(
    Math.abs(until - expected) < 1000,
    `expected ~10min, got ${(until - Date.now()) / 60000}min`
  );
});

test("backoff: streak=3 → 20min", () => {
  const until = new Date(getWarmupBackoffUntil(3)).getTime();
  const expected = Date.now() + 20 * 60 * 1000;
  assert.ok(
    Math.abs(until - expected) < 1000,
    `expected ~20min, got ${(until - Date.now()) / 60000}min`
  );
});

test("backoff: streak=10 capped at 240min", () => {
  const until = new Date(getWarmupBackoffUntil(10)).getTime();
  const expected = Date.now() + 240 * 60 * 1000;
  assert.ok(
    Math.abs(until - expected) < 1000,
    `expected ~240min cap, got ${(until - Date.now()) / 60000}min`
  );
});

test("backoff: streak=0 still returns a future timestamp", () => {
  const until = new Date(getWarmupBackoffUntil(0)).getTime();
  assert.ok(until > Date.now(), "should be in the future");
});
