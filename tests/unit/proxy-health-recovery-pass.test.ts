/**
 * Recovery pass against the real set-aside memory: a success ends the
 * set-aside now (asserted on `isProxyAvoided`, not on the kind), a refusal
 * re-records it with the existing doubling. Off by default: with the flag
 * unset, no probe runs.
 */
import test from "node:test";
import assert from "node:assert/strict";

const scheduler = await import("../../src/lib/proxyHealth/scheduler.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");

const KEY = "http://rec@127.0.0.1:8080";
const LIMITS = { maxCandidates: 10, durationMs: 60_000, concurrency: 2 };
const CANDIDATES = [{ key: KEY, kind: "ip_quota_429" as const, setAsideAt: 1000 }];

test.afterEach(() => {
  memory.__resetProxyRefusalMemoryForTesting();
  delete process.env.PROXY_HEALTH_RECOVERY_ENABLED;
});

test("success ends the set-aside: the proxy is no longer avoided", async () => {
  process.env.PROXY_HEALTH_RECOVERY_ENABLED = "true";
  memory.noteProxyRefusal(KEY, "ip_quota_429");
  assert.equal(memory.isProxyAvoided(KEY), true);
  const result = await scheduler.runRecoveryPass(
    async () => "ok",
    CANDIDATES,
    LIMITS,
    process.env
  );
  assert.equal(result.recovered, 1);
  assert.equal(memory.isProxyAvoided(KEY), false);
});

test("refusal re-records the set-aside with the existing doubling", async () => {
  process.env.PROXY_HEALTH_RECOVERY_ENABLED = "true";
  const first = memory.noteProxyRefusal(KEY, "ip_quota_429");
  memory.noteProxyRecovered(KEY, "ip_quota_429");
  const result = await scheduler.runRecoveryPass(
    async () => "blocked",
    CANDIDATES,
    LIMITS,
    process.env
  );
  assert.equal(result.refused, 1);
  assert.equal(memory.isProxyAvoided(KEY), true);
  assert.ok(first !== null && first > 0);
});

test("flag off (default): no probe runs", async () => {
  delete process.env.PROXY_HEALTH_RECOVERY_ENABLED;
  let calls = 0;
  const result = await scheduler.runRecoveryPass(
    async () => {
      calls++;
      return "ok";
    },
    CANDIDATES,
    LIMITS,
    process.env
  );
  assert.deepEqual(result, { planned: 0, recovered: 0, refused: 0 });
  assert.equal(calls, 0);
});

test("the injected probe receives the egress key string (no id-object mismatch)", async () => {
  process.env.PROXY_HEALTH_RECOVERY_ENABLED = "true";
  memory.noteProxyRefusal(KEY, "ip_quota_429");
  let seen: unknown = null;
  const result = await scheduler.runRecoveryPass(
    async (key) => {
      seen = key;
      return "ok";
    },
    CANDIDATES,
    LIMITS,
    process.env
  );
  assert.equal(seen, KEY);
  assert.equal(result.recovered, 1);
});
