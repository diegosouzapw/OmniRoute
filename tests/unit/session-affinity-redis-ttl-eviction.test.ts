import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-order-ttl-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
const core = await import("../../src/lib/db/core.ts");
const { sqliteSessionAffinityStore: local } =
  await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const { RedisSessionAffinityStore } =
  await import("../../src/lib/db/sessionAffinity/redisStore.ts");
const factory = await import("../../src/lib/db/sessionAffinity/storeFactory.ts");
const identity = await import("../../src/lib/db/sessionAffinity/accountIdentity.ts");
const pin = await import("../../src/sse/services/sessionAffinityPin.ts");

function gate() {
  let resolve!: () => void;
  const promise = new Promise<void>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}
// Socket-free Redis command model: TTL uses the server's clock, independently
// of the calling instance's clock. Pauses below delay replies AFTER execution.
class RedisDouble {
  now = 1_000_000;
  raw: string | null = null;
  deadline = 0;
  rejected = 0;
  reads = 0;
  fail = false;
  holdReply = false;
  applied = gate();
  release = gate();
  outstandingReply = false;
  forcedPttl: number | null = null;
  trace: string[] = [];
  expire() {
    if (this.deadline <= this.now) this.raw = null;
  }
  async get(_key: string) {
    if (this.fail) throw new Error("synthetic outage");
    this.expire();
    const raw = this.raw;
    this.trace.push("GET executed");
    // A later command cannot reply before the earlier EVAL on the singleton socket.
    if (this.outstandingReply) await this.release.promise;
    this.trace.push("GET reply");
    return raw;
  }
  async set(_key: string, raw: string, _mode: "PX", ttl: number) {
    this.raw = raw;
    this.deadline = this.now + ttl;
  }
  async del(_key: string) {
    const exists = this.raw !== null;
    this.raw = null;
    return Number(exists);
  }
  async eval(
    script: string,
    _count: number,
    _key: string,
    expected?: string,
    replacement?: string,
    ttl?: number
  ) {
    if (this.fail) throw new Error("synthetic outage");
    this.expire();
    if (script.includes("PTTL") && expected === undefined) {
      this.reads++;
      const result = [
        this.raw,
        this.forcedPttl ?? (this.raw === null ? -2 : this.deadline - this.now),
      ];
      if (this.outstandingReply) await this.release.promise;
      return result;
    }
    if ((this.raw ?? "") !== expected) {
      this.rejected++;
      return script.includes("PTTL")
        ? [0, this.raw, this.raw === null ? -2 : this.deadline - this.now]
        : 0;
    }
    const exists = this.raw !== null;
    this.raw = replacement || null;
    this.deadline = this.now + (ttl ?? 0);
    const result = replacement ? 1 : Number(exists);
    const response = [result, this.raw, replacement ? ttl : -2];
    this.trace.push(
      `EVAL executed: ${replacement ? JSON.parse(replacement).connectionId : "delete"}`
    );
    if (this.holdReply) {
      this.holdReply = false;
      this.outstandingReply = true;
      this.applied.resolve();
      await this.release.promise;
      this.outstandingReply = false;
    }
    this.trace.push(`EVAL reply: ${replacement ? JSON.parse(replacement).connectionId : "delete"}`);
    return script.includes("PTTL") ? response : result;
  }
}
function store(redis: RedisDouble) {
  return new RedisSessionAffinityStore(async () => redis, local, 100);
}
function account(id: string, user: string, priority = 1) {
  return {
    id,
    provider: "codex",
    authType: "oauth",
    priority,
    providerSpecificData: { workspaceId: "synthetic-workspace", chatgptUserId: user },
  };
}
function inject(redis: RedisDouble) {
  factory._setSessionAffinityRedisForTests({
    getClient: async () => redis,
    isConfigured: () => true,
  });
  process.env.OMNIROUTE_SESSION_AFFINITY_STORE = "redis";
  return factory.getSessionAffinityStore();
}
test.afterEach(() => {
  factory._setSessionAffinityRedisForTests(null);
  delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const mutation of ["touch", "upsert"] as const) {
  test(`FIFO ${mutation} reply during eviction must not resurrect the shadow`, async (t) => {
    const redis = new RedisDouble();
    const s = store(redis);
    const key = `synthetic-evict-${mutation}`;
    await s.upsert(key, "codex", "failed-A", redis.now, 60_000);
    redis.holdReply = true;
    const pending =
      mutation === "touch"
        ? s.touch(key, "codex", redis.now + 1, 60_000)
        : s.upsert(key, "codex", "failed-A", redis.now + 1, 60_000);
    await redis.applied.promise;
    const eviction = s.evict(key, "codex", "failed-A");
    // evict's synchronous SQLite pre-clear occurs while the earlier EVAL reply is pending.
    assert.equal(local.get(key, "codex", 60_000, redis.now + 2), null);
    await Promise.resolve();
    await Promise.resolve();
    redis.release.resolve();
    await pending;
    assert.equal(await eviction, true);
    assert.equal(redis.raw, null);
    const shadow = await local.get(key, "codex", 60_000, redis.now + 2);
    redis.fail = true;
    t.mock.method(console, "warn", () => {});
    const outageRecord = await s.get(key, "codex", 60_000, redis.now + 2);
    t.diagnostic(
      JSON.stringify({
        shared: redis.raw,
        shadow: shadow?.connectionId ?? null,
        outageAccount: outageRecord?.connectionId ?? null,
        trace: redis.trace,
      })
    );
    assert.equal(shadow, null, "completed eviction must survive earlier mutation's delayed reply");
    assert.equal(outageRecord, null, "outage fallback must not resurrect the evicted account");
  });
}

test("FIFO old delete reply leaves the newer pin only in Redis", async (t) => {
  const redis = new RedisDouble();
  const s = store(redis);
  const key = "synthetic-delete-reply";
  await s.upsert(key, "codex", "old-A", redis.now, 60_000);
  redis.holdReply = true;
  const pending = s.delete(key, "codex");
  await redis.applied.promise;
  assert.equal(redis.raw, null);
  const upsert = s.upsert(key, "codex", "new-B", redis.now + 1, 60_000);
  await Promise.resolve();
  await Promise.resolve();
  redis.release.resolve();
  await pending;
  await upsert;
  const shadow = await local.get(key, "codex", 60_000, redis.now + 2);
  t.diagnostic(
    JSON.stringify({
      shared: JSON.parse(redis.raw!).connectionId,
      shadow: shadow?.connectionId ?? null,
    })
  );
  assert.equal(shadow, null, "accepted shared pin must not be mirrored locally");
  assert.equal(JSON.parse(redis.raw!).connectionId, "new-B");
});

test("clock-ahead instance converges despite continuously renewed Redis PX", async (t) => {
  const redis = new RedisDouble();
  const ttl = 1_000;
  const skew = 2_000;
  let clientNow = redis.now;
  t.mock.method(Date, "now", () => clientNow);
  const a = store(redis);
  const ax = account("a-x", "X");
  await a.upsert(
    "synthetic-skew",
    "codex",
    ax.id,
    redis.now,
    ttl,
    identity.sessionAffinityAccountIdentity(ax, "codex")
  );
  inject(redis);
  const results: string[] = [];
  const poolB = [account("b-y", "Y"), account("b-x", "X", 2)];
  for (let i = 0; i < 20; i++) {
    redis.now += 500;
    clientNow = redis.now;
    await a.touch("synthetic-skew", "codex", clientNow, ttl);
    clientNow = redis.now + skew;
    const selected = await pin.selectSessionAffinityConnection(
      "codex",
      "synthetic-skew",
      poolB,
      ttl
    );
    // Date.now is mocked, not the Date constructor; align usage timestamps with
    // the simulated instance clock and retain the mutated pool between requests.
    (selected as { lastUsedAt?: string }).lastUsedAt = new Date(clientNow).toISOString();
    results.push(selected!.id);
    assert.equal(
      JSON.parse(redis.raw!).accountIdentity,
      identity.sessionAffinityAccountIdentity(ax, "codex")
    );
  }
  t.diagnostic(
    JSON.stringify({
      elapsedServerMs: 10_000,
      ttl,
      skew,
      selections: results,
      rejected: redis.rejected,
    })
  );
  assert.ok(
    results.every((id) => id === "b-x"),
    "reader must adopt X within the first request"
  );
  assert.equal(redis.rejected, 0, "renewals must not trigger a clock-skew CAS loop");
});

for (const skew of [-2_000, 2_000]) {
  test(`Redis expiry is a miss regardless of reader clock (skew=${skew})`, async () => {
    const redis = new RedisDouble();
    const s = store(redis);
    await s.upsert(`synthetic-expired-${skew}`, "codex", "X", redis.now, 1_000);
    redis.now += 1_000;
    assert.equal(await s.get(`synthetic-expired-${skew}`, "codex", 1_000, redis.now + skew), null);
  });
}

test("successful write after eviction leaves the newer different-account pin only in Redis", async () => {
  const redis = new RedisDouble();
  const s = store(redis);
  const key = "synthetic-newer-pin";
  await s.upsert(key, "codex", "old-A", redis.now, 60_000);
  redis.holdReply = true;
  const eviction = s.evict(key, "codex", "old-A");
  await redis.applied.promise;
  assert.equal(redis.raw, null);
  const later = s.upsert(key, "codex", "new-B", redis.now + 1, 60_000);
  await Promise.resolve();
  await Promise.resolve();
  redis.release.resolve();
  assert.equal(await eviction, true);
  await later;
  assert.equal(await local.get(key, "codex", 60_000, redis.now + 2), null);
  assert.equal(JSON.parse(redis.raw!).connectionId, "new-B");
  redis.fail = true;
  assert.equal(await s.get(key, "codex", 60_000, redis.now + 2), null);
});

test("PTTL zero rejects even present JSON; no-expiry accepts old-format JSON independently of clocks", async () => {
  const redis = new RedisDouble();
  const s = store(redis);
  const key = "synthetic-ttl-authority";
  await s.upsert(key, "codex", "X", redis.now, 1_000);
  const raw = redis.raw;
  redis.forcedPttl = 0;
  assert.equal(await s.get(key, "codex", 1_000, redis.now - 2_000), null);
  redis.forcedPttl = -1;
  const record = await s.get(key, "codex", 1_000, redis.now + 2_000);
  assert.equal(record?.connectionId, "X");
  assert.ok(Date.parse(record!.expiresAt) > redis.now + 2_000);
  assert.equal(redis.raw, raw, "local deadlines must never rewrite shared JSON");
});

test("rejected CAS adopts a skewed live winner from the same reply without another read", async () => {
  const redis = new RedisDouble();
  const s = store(redis);
  const key = "synthetic-rejected-ttl";
  await s.upsert(key, "codex", "X", redis.now, 1_000);
  const raw = redis.raw;
  const result = await s.upsert(key, "codex", "Y", redis.now + 2_000, 1_000, undefined, null);
  assert.equal(result && result.connectionId, "X");
  assert.equal(result && result.expiresAt, new Date(redis.now + 3_000).toISOString());
  assert.equal(redis.raw, raw);
  assert.equal(redis.rejected, 1);
  assert.equal(redis.reads, 1, "only the seed read is issued; rejected CAS includes its winner");
});

test("mapped expiry keeps exact original CAS bytes, including whitespace and unknown fields", async () => {
  const redis = new RedisDouble();
  const s = store(redis);
  const key = "synthetic-raw-cas";
  await s.upsert(key, "codex", "X", redis.now, 1_000);
  redis.raw = `\n ${JSON.stringify({ ...JSON.parse(redis.raw!), syntheticExtra: true })} `;
  const observed = await s.get(key, "codex", 1_000, redis.now + 2_000);
  assert.ok(observed);
  assert.notEqual(observed.expiresAt, JSON.parse(redis.raw!).expiresAt);
  await s.upsert(key, "codex", "Y", redis.now + 2_000, 1_000, undefined, observed);
  assert.equal(redis.rejected, 0);
  assert.equal(JSON.parse(redis.raw!).connectionId, "Y");
  assert.equal(await local.get(key, "codex", 1_000, redis.now + 2_001), null);
  assert.equal(
    (await s.get(key, "codex", 1_000, redis.now + 2_001))?.expiresAt,
    new Date(redis.now + 3_001).toISOString()
  );
});

test("real read object preserves provenance across awaits for obsolete replacement", async () => {
  const redis = new RedisDouble();
  const s = inject(redis);
  const now = Date.now();
  const old = account("old", "OLD");
  await s.upsert(
    "synthetic-provenance",
    "codex",
    old.id,
    now,
    60_000,
    identity.sessionAffinityAccountIdentity(old, "codex")
  );
  const observed = await s.get("synthetic-provenance", "codex", 60_000);
  await Promise.resolve();
  await Promise.resolve();
  const selected = await pin.selectSessionAffinityConnection(
    "codex",
    "synthetic-provenance",
    [account("new", "NEW")],
    60_000,
    observed
  );
  assert.equal(selected?.id, "new");
  assert.equal(redis.rejected, 0);
  assert.equal(JSON.parse(redis.raw!).connectionId, "new");
});
