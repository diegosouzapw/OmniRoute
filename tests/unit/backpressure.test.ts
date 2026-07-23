import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { evalCapacity } from "../../src/sse/utils/backpressure.ts";
import type { CapacityResult } from "../../src/sse/utils/backpressure.ts";

// ---------------------------------------------------------------------------
// evalCapacity — pure function, no mocking required
// ---------------------------------------------------------------------------

beforeEach(() => {
  delete process.env.OMNI_MAX_CONCURRENT_CONNECTIONS;
});

test("backpressure: cap=0 never rejects regardless of active count", () => {
  const r: CapacityResult = evalCapacity(9999, 0);
  assert.equal(r.shouldReject, false);
});

test("backpressure: negative cap never rejects", () => {
  assert.equal(evalCapacity(100, -1).shouldReject, false);
});

test("backpressure: passes when active is zero", () => {
  assert.equal(evalCapacity(0, 10).shouldReject, false);
});

test("backpressure: passes when active is below cap", () => {
  assert.equal(evalCapacity(5, 10).shouldReject, false);
});

test("backpressure: passes when active is exactly cap minus one", () => {
  assert.equal(evalCapacity(9, 10).shouldReject, false);
});

test("backpressure: rejects when active equals cap", () => {
  const r = evalCapacity(10, 10);
  assert.equal(r.shouldReject, true);
});

test("backpressure: rejects when active exceeds cap", () => {
  assert.equal(evalCapacity(100, 10).shouldReject, true);
});

test("backpressure: rejection returns HTTP 429", async () => {
  const r = evalCapacity(10, 10);
  assert.equal(r.shouldReject, true);
  if (!r.shouldReject) throw new Error("unreachable");
  assert.equal(r.response.status, 429);
});

test("backpressure: rejection includes Retry-After header >= 1", async () => {
  const r = evalCapacity(10, 10);
  assert.equal(r.shouldReject, true);
  if (!r.shouldReject) throw new Error("unreachable");
  const val = Number(r.response.headers.get("Retry-After"));
  assert.ok(val >= 1, `Retry-After must be >= 1, got ${val}`);
});

test("backpressure: X-RateLimit-Limit matches the cap", async () => {
  const r = evalCapacity(7, 5);
  assert.equal(r.shouldReject, true);
  if (!r.shouldReject) throw new Error("unreachable");
  assert.equal(r.response.headers.get("X-RateLimit-Limit"), "5");
  assert.equal(r.response.headers.get("X-RateLimit-Remaining"), "0");
});

test("backpressure: rejection body is valid JSON with error.type=rate_limit", async () => {
  const r = evalCapacity(3, 3);
  assert.equal(r.shouldReject, true);
  if (!r.shouldReject) throw new Error("unreachable");
  const body = await r.response.json();
  assert.equal(body?.error?.type, "rate_limit");
  assert.ok(typeof body.error.message === "string");
  assert.ok(typeof body.error.retry_after === "number");
});

test("backpressure: rejection message contains active and limit counts", async () => {
  const r = evalCapacity(8, 5);
  assert.equal(r.shouldReject, true);
  if (!r.shouldReject) throw new Error("unreachable");
  const body = await r.response.json();
  assert.ok(body.error.message.includes("8"), "message should reference active count");
  assert.ok(body.error.message.includes("5"), "message should reference cap");
});

test("backpressure: retry-after formula — at cap gives ceil(1*30)=30", async () => {
  const r = evalCapacity(10, 10);
  assert.equal(r.shouldReject, true);
  if (!r.shouldReject) throw new Error("unreachable");
  assert.equal(Number(r.response.headers.get("Retry-After")), 30);
});

test("backpressure: retry-after increases proportionally under higher load", async () => {
  const r1 = evalCapacity(10, 10); // factor 1.0 → 30s
  const r2 = evalCapacity(20, 10); // factor 2.0 → 60s
  assert.equal(r1.shouldReject, true);
  assert.equal(r2.shouldReject, true);
  if (!r1.shouldReject || !r2.shouldReject) throw new Error("unreachable");
  const ra1 = Number(r1.response.headers.get("Retry-After"));
  const ra2 = Number(r2.response.headers.get("Retry-After"));
  assert.ok(ra2 > ra1, `retry-after should grow with load factor (${ra1} → ${ra2})`);
});

test("backpressure: Content-Type is application/json", async () => {
  const r = evalCapacity(5, 5);
  assert.equal(r.shouldReject, true);
  if (!r.shouldReject) throw new Error("unreachable");
  assert.ok(r.response.headers.get("Content-Type")?.includes("application/json"));
});
