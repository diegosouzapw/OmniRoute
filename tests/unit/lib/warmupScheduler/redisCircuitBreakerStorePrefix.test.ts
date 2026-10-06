/**
 * REDIS_KEY_PREFIX is documented as the namespace for ALL OmniRoute Redis keys, and the rate
 * limiter, auth cache and quota store honor it. The warmup circuit breaker hardcoded
 * `omniroute:warmup:cb:`, so on a shared Redis with a custom prefix its keys still landed in
 * the default namespace (outside a `~tenantA:*` key ACL, and colliding between instances).
 * Raised as MANDATORY in the #11042 review.
 *
 * KEY_PREFIX is read at module load, so each case imports a fresh copy of the store.
 */
import test from "node:test";
import assert from "node:assert/strict";

function makeKeyRecordingRedis() {
  const hashes = new Map<string, Record<string, string>>();
  return {
    keys: () => [...hashes.keys()],
    redis: {
      async hgetall(key: string) {
        return hashes.get(key) ?? {};
      },
      async hset(key: string, fields: Record<string, string>) {
        hashes.set(key, { ...(hashes.get(key) ?? {}), ...fields });
        return 1;
      },
      async hget(key: string, field: string) {
        return hashes.get(key)?.[field] ?? null;
      },
      async expire() {
        return 1;
      },
      async persist() {
        return 1;
      },
    },
  };
}

let importCount = 0;

async function keysWrittenWith(prefix: string | undefined) {
  const prev = process.env.REDIS_KEY_PREFIX;
  if (prefix === undefined) delete process.env.REDIS_KEY_PREFIX;
  else process.env.REDIS_KEY_PREFIX = prefix;
  try {
    const { RedisCircuitBreakerStore } = await import(
      `../../../../src/lib/warmupScheduler/redisCircuitBreakerStore.ts?case=${importCount++}`
    );
    const { keys, redis } = makeKeyRecordingRedis();
    const store = new RedisCircuitBreakerStore(redis);
    await store.recordResult("conn-1", { success: false, failureKind: "network" });
    assert.equal(await store.isInBackoff("conn-1"), true);
    assert.equal((await store.get("conn-1"))?.streak, 1);
    return keys();
  } finally {
    if (prev === undefined) delete process.env.REDIS_KEY_PREFIX;
    else process.env.REDIS_KEY_PREFIX = prev;
  }
}

test("warmup circuit-breaker keys use REDIS_KEY_PREFIX", async () => {
  assert.deepEqual(await keysWrittenWith("tenantA:"), ["tenantA:warmup:cb:conn-1"]);
});

test("warmup circuit-breaker keys are unchanged when REDIS_KEY_PREFIX is unset or blank", async () => {
  assert.deepEqual(await keysWrittenWith(undefined), ["omniroute:warmup:cb:conn-1"]);
  assert.deepEqual(await keysWrittenWith("   "), ["omniroute:warmup:cb:conn-1"]);
});
