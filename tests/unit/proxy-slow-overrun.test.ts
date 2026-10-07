import test from "node:test";
import assert from "node:assert/strict";

// A slow egress is set aside only on repetition: three settled headers-wait
// overruns through the same egress key inside five minutes. A lone overrun, a
// pair, an expired window, a null key, or the opt-in flag off never writes.

const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");

const KEY = "http://@slow:8080";
const OTHER = "http://@other:8080";
const START = 1_800_000_000_000;
const WINDOW = 300_000;

test.beforeEach(() => {
  memory.__resetProxyRefusalMemoryForTesting();
  memory.__resetSlowOverrunsForTesting();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
});

test.after(() => {
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  memory.__resetSlowOverrunsForTesting();
});

test("three settled overruns inside five minutes count as evidence", () => {
  assert.equal(memory.isProxyAvoided(KEY, START), false);
  memory.recordSlowOverrun(KEY, START);
  memory.recordSlowOverrun(KEY, START + 60_000);
  assert.equal(memory.hasSlowOverrunEvidence(KEY, START + 120_000), false);
  memory.recordSlowOverrun(KEY, START + 120_000);
  assert.equal(memory.hasSlowOverrunEvidence(KEY, START + 120_000), true);
});

test("a lone overrun or a pair never counts as evidence", () => {
  memory.recordSlowOverrun(KEY, START);
  assert.equal(memory.hasSlowOverrunEvidence(KEY, START + 1_000), false);
  memory.recordSlowOverrun(KEY, START + 2_000);
  assert.equal(memory.hasSlowOverrunEvidence(KEY, START + 3_000), false);
  assert.equal(memory.isProxyAvoided(KEY, START + 4_000), false);
});

test("an expired window is not evidence", () => {
  memory.recordSlowOverrun(KEY, START);
  memory.recordSlowOverrun(KEY, START + 1_000);
  memory.recordSlowOverrun(KEY, START + WINDOW + 60_000);
  assert.equal(memory.hasSlowOverrunEvidence(KEY, START + WINDOW + 61_000), false);
});

test("a null key never records and never counts", () => {
  memory.recordSlowOverrun(null, START);
  memory.recordSlowOverrun(null, START + 1_000);
  memory.recordSlowOverrun(null, START + 2_000);
  assert.equal(memory.hasSlowOverrunEvidence(null, START + 3_000), false);
  assert.equal(memory.__slowOverrunSizeForTesting(), 0);
});

test("overruns for another key do not count", () => {
  memory.recordSlowOverrun(OTHER, START);
  memory.recordSlowOverrun(OTHER, START + 1_000);
  memory.recordSlowOverrun(OTHER, START + 2_000);
  assert.equal(memory.hasSlowOverrunEvidence(KEY, START + 3_000), false);
});

test("the overrun store keeps at most 1000 entries and evicts the oldest", () => {
  for (let i = 0; i < 1001; i++) {
    memory.recordSlowOverrun(`http://@h:${10000 + i}`, START + i);
  }
  assert.equal(memory.__slowOverrunSizeForTesting(), 1000);
});

test("stale overruns purge past the window plus twice the slow cap", () => {
  memory.recordSlowOverrun(KEY, START);
  memory.recordSlowOverrun(KEY, START + 1_000);
  memory.recordSlowOverrun(KEY, START + 2 * (WINDOW + 2 * 600_000) + 2);
  assert.equal(memory.__slowOverrunSizeForTesting(), 1);
});

test("the slow curve starts at 60s and caps at 600s", () => {
  const periods: Array<number | null> = [];
  let now = START;
  for (let i = 0; i < 5; i++) {
    const period = memory.noteProxyRefusal(KEY, "slow", now);
    periods.push(period);
    now += period ?? 0;
  }
  assert.deepEqual(periods, [60_000, 120_000, 240_000, 480_000, 600_000]);
});

test("a served response clears the slow set-aside so the egress returns", () => {
  memory.noteProxyRefusal(KEY, "slow", START);
  assert.equal(memory.isProxyAvoided(KEY, START + 1_000), true);
  memory.noteProxyServed(KEY);
  assert.equal(memory.isProxyAvoided(KEY, START + 2_000), false);
});

test("the gated helper sets aside only on evidence and only when opted in", async () => {
  const throttle = await import("../../open-sse/executors/opencodeEgressThrottle.ts");
  const proxy = { type: "http", host: "127.0.0.1", port: 18080 };
  const key = memory.proxyEgressKey(proxy);
  assert.ok(key);
  assert.equal(throttle.noteSlowOverrun({ proxy, fingerprint: "fp" }, false, null, START), null);
  assert.equal(memory.__slowOverrunSizeForTesting(), 0);
  assert.equal(throttle.noteSlowOverrun({ proxy, fingerprint: "fp" }, true, null, START), null);
  assert.equal(
    throttle.noteSlowOverrun({ proxy, fingerprint: "fp" }, true, null, START + 1_000),
    null
  );
  assert.equal(memory.isProxyAvoided(key, START + 2_000), false);
  const period = throttle.noteSlowOverrun({ proxy, fingerprint: "fp" }, true, null, START + 2_000);
  assert.equal(period, 60_000);
  assert.equal(memory.isProxyAvoided(key, START + 3_000), true);
});
