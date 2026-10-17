// Real-Redis integration check for the opt-in session-affinity store (#16472).
// Self-skips unless RUN_SESSION_AFFINITY_REDIS_INT=1 and REDIS_URL points at a disposable Redis
// (same gating convention as the RUN_*_INT suites). It creates only keys under a per-run prefix,
// enumerates them with SCAN (never KEYS) and deletes them afterwards. Prefer a disposable Redis. Example:
//   docker run --rm -d -p 127.0.0.1:6390:6379 redis:7-alpine
//   RUN_SESSION_AFFINITY_REDIS_INT=1 REDIS_URL=redis://127.0.0.1:6390 \
//     node --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts \
//     --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit \
//     tests/integration/session-affinity-redis-live.int.test.ts
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type Redis from "ioredis";
import type { RedisSessionAffinityStore } from "../../src/lib/db/sessionAffinity/redisStore.ts";

const RUN = process.env.RUN_SESSION_AFFINITY_REDIS_INT === "1" && Boolean(process.env.REDIS_URL);
const skip = RUN
  ? false
  : "set RUN_SESSION_AFFINITY_REDIS_INT=1 and REDIS_URL to a disposable Redis";

const PREFIX = `omniroute-affinity-int-${process.pid}-${Date.now()}:`;
const P = "codex";
const TTL = 60_000;
// Mirrors redisStore.keyFor (unprefixed; the shared client adds REDIS_KEY_PREFIX exactly once).
const key = (s: string, p: string) =>
  `session_affinity:${p}:${createHash("sha256").update(`${p}:${s}`).digest("hex")}`;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
// Account identities are SHA-256 digests in production; anything else is dropped by the store.
const id = (label: string) => createHash("sha256").update(`account:${label}`).digest("hex");

// SCAN MATCH patterns are not prefixed by ioredis and return full key names.
async function scanRunKeys(redis: Redis): Promise<string[]> {
  const found: string[] = [];
  let cursor = "0";
  do {
    const [next, batch] = (await redis.call(
      "SCAN",
      cursor,
      "MATCH",
      `${PREFIX}*`,
      "COUNT",
      "200"
    )) as [string, string[]];
    found.push(...batch);
    cursor = next;
  } while (cursor !== "0");
  return found;
}

type Ctx = {
  redis: Redis;
  storeA: RedisSessionAffinityStore;
  storeB: RedisSessionAffinityStore;
  factory: typeof import("../../src/lib/db/sessionAffinity/storeFactory.ts");
  READ_WITH_TTL: string;
  COMPARE_AND_UPDATE: string;
  dataDir: string;
};
let ctx: Ctx | null = null;

async function setup(): Promise<Ctx> {
  if (ctx) return ctx;
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-affinity-redis-int-"));
  process.env.DATA_DIR = dataDir;
  process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
  process.env.REDIS_KEY_PREFIX = PREFIX;
  process.env.OMNIROUTE_SESSION_AFFINITY_STORE = "redis";
  await import("../../src/lib/db/core.ts");
  const { getRedisClient } = await import("../../src/shared/utils/rateLimiter.ts");
  const { sqliteSessionAffinityStore } =
    await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
  const { RedisSessionAffinityStore, READ_WITH_TTL, COMPARE_AND_UPDATE } =
    await import("../../src/lib/db/sessionAffinity/redisStore.ts");
  const factory = await import("../../src/lib/db/sessionAffinity/storeFactory.ts");
  const redis = await getRedisClient();
  // A generous per-call timeout so a cold first connection is not mistaken for an outage.
  const storeA = new RedisSessionAffinityStore(getRedisClient, sqliteSessionAffinityStore, 2000);
  const storeB = new RedisSessionAffinityStore(getRedisClient, sqliteSessionAffinityStore, 2000);
  ctx = { redis, storeA, storeB, factory, READ_WITH_TTL, COMPARE_AND_UPDATE, dataDir };
  return ctx;
}

test.after(async () => {
  if (!ctx) return;
  // SCAN returns full names, while DEL is prefixed by the client, so strip the run prefix first.
  for (const k of await scanRunKeys(ctx.redis)) await ctx.redis.del(k.slice(PREFIX.length));
  assert.deepEqual(await scanRunKeys(ctx.redis), [], "no keys left behind");
  await ctx.redis.quit();
  fs.rmSync(ctx.dataDir, { recursive: true, force: true });
});

test("factory selects the Redis store and keys carry exactly one prefix", { skip }, async () => {
  const { factory, storeA, redis } = await setup();
  assert.equal(factory.getSessionAffinityStore().driver, "redis");
  await storeA.upsert("s-prefix", P, "conn-a", Date.now(), TTL, id("a"), null);
  assert.ok(await redis.get(key("s-prefix", P)), "record readable through the prefixed client");
  const keys = await scanRunKeys(redis);
  assert.ok(keys.length > 0, "the pin is stored under the run prefix");
  assert.ok(
    keys.every((k) => k.startsWith(PREFIX) && !k.startsWith(PREFIX + PREFIX)),
    "exactly one prefix on every stored key"
  );
});

test("READ_WITH_TTL on a missing key maps to an absent observation", { skip }, async () => {
  const { redis, storeA, READ_WITH_TTL } = await setup();
  const reply = (await redis.eval(READ_WITH_TTL, 1, key("s-missing", P))) as [
    string | null,
    number,
  ];
  assert.ok(Array.isArray(reply));
  assert.equal(reply[0], null);
  assert.equal(Number(reply[1]), -2);
  assert.equal(await storeA.get("s-missing", P, TTL, Date.now()), null);
});

test("observed-miss CAS: first writer wins, second gets the winner", { skip }, async () => {
  const { redis, storeA, storeB } = await setup();
  const s = "s-race";
  const now = Date.now();
  assert.equal(await storeA.upsert(s, P, "conn-x", now, TTL, id("x"), null), undefined);
  const before = await redis.get(key(s, P));
  const b = await storeB.upsert(s, P, "conn-y", now, TTL, id("y"), null);
  assert.ok(b && typeof b === "object", "rejected CAS returns the winner");
  assert.equal((b as { connectionId: string }).connectionId, "conn-x");
  assert.equal(await redis.get(key(s, P)), before, "winner bytes unchanged");
  const pttl = await redis.pttl(key(s, P));
  assert.ok(pttl > TTL - 5_000 && pttl <= TTL, `PX applied (${pttl})`);
});

test(
  "CAS with the observed raw value updates; a stale observation is rejected",
  { skip },
  async () => {
    const { storeA, storeB } = await setup();
    const s = "s-observed";
    const now = Date.now();
    await storeA.upsert(s, P, "conn-1", now, TTL, "id-1", null);
    const seen = await storeA.get(s, P, TTL, Date.now());
    assert.equal(seen?.connectionId, "conn-1");
    assert.equal(await storeA.upsert(s, P, "conn-2", now + 1, TTL, "id-2", seen), undefined);
    const stale = await storeB.upsert(s, P, "conn-3", now + 2, TTL, "id-3", seen);
    assert.equal((stale as { connectionId: string }).connectionId, "conn-2");
  }
);

test(
  "liveness is Redis-relative: a reader clock 2 s ahead still sees a live key",
  { skip },
  async () => {
    const { storeA, storeB } = await setup();
    const s = "s-skew";
    await storeA.upsert(s, P, "conn-x", Date.now(), 1_000, id("x"), null);
    const ahead = await storeB.get(s, P, 1_000, Date.now() + 2_000);
    assert.equal(ahead?.connectionId, "conn-x");
    const rejected = await storeB.upsert(s, P, "conn-y", Date.now() + 2_000, 1_000, id("y"), null);
    assert.equal((rejected as { connectionId: string }).connectionId, "conn-x", "adopts winner");
  }
);

test("touch renews PTTL; a key expires on Redis's clock", { skip }, async () => {
  const { redis, storeA } = await setup();
  const s = "s-ttl";
  await storeA.upsert(s, P, "conn-t", Date.now(), 400, id("t"), null);
  await sleep(250);
  await storeA.touch(s, P, Date.now(), 400);
  const renewed = await redis.pttl(key(s, P));
  assert.ok(renewed > 250, `renewed (${renewed})`);
  await sleep(500);
  assert.equal(await redis.exists(key(s, P)), 0);
  assert.equal(await storeA.get(s, P, 400, Date.now() - 10_000), null, "expired on Redis's clock");
});

test(
  "evict matches the shared pin by account identity, not by local connection id",
  { skip },
  async () => {
    const { redis, storeA, storeB } = await setup();
    const s = "s-evict";
    await storeA.upsert(s, P, "conn-e", Date.now(), TTL, id("e"), null);
    const stored = JSON.parse((await redis.get(key(s, P))) ?? "null");
    assert.equal(stored?.accountIdentity, id("e"), "the digest identity is stored with the pin");
    // Same connection id on another instance, but a different account: must not evict.
    assert.equal(await storeB.evict(s, P, "conn-e", id("other")), false);
    assert.equal(await redis.exists(key(s, P)), 1);
    // Same account under a different local connection id: evicts across instances.
    assert.equal(await storeB.evict(s, P, "conn-local-b", id("e")), true);
    assert.equal(await redis.exists(key(s, P)), 0);
  }
);

test("delete with an observation removes only the observed bytes", { skip }, async () => {
  const { redis, storeA } = await setup();
  const s = "s-delete";
  await storeA.upsert(s, P, "conn-d", Date.now(), TTL, id("d"), null);
  const seen = await storeA.get(s, P, TTL, Date.now());
  assert.equal(await storeA.upsert(s, P, "conn-d2", Date.now(), TTL, "id-d2", seen), undefined);
  await storeA.delete(s, P, seen);
  assert.equal(await redis.exists(key(s, P)), 1, "newer winner survives a stale delete");
  const fresh = await storeA.get(s, P, TTL, Date.now());
  await storeA.delete(s, P, fresh);
  assert.equal(await redis.exists(key(s, P)), 0);
});

test("raw COMPARE_AND_UPDATE replies have the documented shapes", { skip }, async () => {
  const { redis, COMPARE_AND_UPDATE } = await setup();
  const k = key("s-raw", P);
  type Reply = [number, string, number];
  const ins = (await redis.eval(
    COMPARE_AND_UPDATE,
    1,
    k,
    "",
    '{"connectionId":"c"}',
    5000
  )) as Reply;
  assert.deepEqual([Number(ins[0]), ins[1], Number(ins[2])], [1, '{"connectionId":"c"}', 5000]);
  const rej = (await redis.eval(
    COMPARE_AND_UPDATE,
    1,
    k,
    "",
    '{"connectionId":"d"}',
    5000
  )) as Reply;
  assert.equal(Number(rej[0]), 0);
  assert.equal(rej[1], '{"connectionId":"c"}');
  assert.ok(Number(rej[2]) > 0);
  const del = (await redis.eval(COMPARE_AND_UPDATE, 1, k, '{"connectionId":"c"}', "", 0)) as Reply;
  assert.equal(Number(del[0]), 1);
});
