import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { SessionAccountAffinityRecord } from "../../src/lib/db/sessionAffinity/store.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-session-affinity-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
const core = await import("../../src/lib/db/core.ts");
const { sqliteSessionAffinityStore: local } =
  await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const { RedisSessionAffinityStore } =
  await import("../../src/lib/db/sessionAffinity/redisStore.ts");
const factory = await import("../../src/lib/db/sessionAffinity/storeFactory.ts");
const pin = await import("../../src/sse/services/sessionAffinityPin.ts");
const now = 1_000_000;
const ttl = 60_000;
const provider = "codex";
const identityA = "a".repeat(64);
const identityB = "b".repeat(64);

function gate() {
  let resolve!: () => void;
  const promise = new Promise<void>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}
function record(connection = "shared-B", identity = identityB): SessionAccountAffinityRecord {
  return {
    connectionId: connection,
    accountIdentity: identity,
    createdAt: new Date(now).toISOString(),
    lastUsedAt: new Date(now).toISOString(),
    expiresAt: new Date(now + ttl).toISOString(),
  };
}
const flush = () => new Promise<void>((resolve) => setImmediate(resolve));

class FakeRedis {
  raw: string | null = null;
  fail = false;
  hold = false;
  beforeMutation?: () => void;
  applied = gate();
  release = gate();
  private replyTail = Promise.resolve();
  async get(_key: string) {
    if (this.fail) throw new Error("synthetic outage");
    const value = this.raw;
    await this.replyTail;
    return value;
  }
  async set(_key: string, value: string, _mode: "PX", _ttl: number) {
    this.raw = value;
  }
  async del(_key: string) {
    const existed = this.raw !== null;
    this.raw = null;
    return Number(existed);
  }
  async eval(
    _script: string,
    _keys: number,
    _key: string,
    expected?: string,
    replacement?: string,
    duration?: number
  ) {
    if (this.fail) throw new Error("synthetic outage");
    if (expected === undefined) return [this.raw, this.raw === null ? -2 : ttl];
    this.beforeMutation?.();
    this.beforeMutation = undefined;
    const accepted = (this.raw ?? "") === expected;
    const existed = this.raw !== null;
    if (accepted) this.raw = replacement || null;
    const reply = [
      accepted ? (replacement ? 1 : Number(existed)) : 0,
      this.raw,
      this.raw === null ? -2 : duration || ttl,
    ];
    const earlier = this.replyTail;
    if (this.hold) {
      this.hold = false;
      this.replyTail = earlier.then(() => this.release.promise);
      this.applied.resolve();
      await this.replyTail;
    } else await earlier;
    return reply;
  }
}

function setup(timeout = 10, client = new FakeRedis()) {
  const store = new RedisSessionAffinityStore(async () => client, local, timeout);
  return { client, store };
}
function readLocal(key: string) {
  return local.get(key, provider, ttl, now + 10);
}

test.beforeEach((t) => {
  t.mock.method(console, "warn", () => {});
});
test.after(() => {
  factory._setSessionAffinityRedisForTests(null);
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("healthy CAS loss clears an older outage pin before the next outage read", async () => {
  const { client, store } = setup();
  const key = "cas-loss";
  client.fail = true;
  await store.upsert(key, provider, "outage-A", now, ttl, identityA, null);
  client.fail = false;
  client.raw = JSON.stringify(record("winner-B", identityB));
  const winner = await store.upsert(key, provider, "loser-A", now + 1, ttl, identityA, null);
  assert.equal(winner && winner.connectionId, "winner-B");
  client.fail = true;
  assert.equal(await store.get(key, provider, ttl, now + 2), null);
});

for (const mode of ["ordinary", "lease"] as const) {
  test(`${mode} selector CAS loss invalidates preexisting outage pin`, async () => {
    const { client, store } = setup();
    const key = `selector-${mode}`;
    const candidate = { id: "candidate-C", provider, authType: "oauth" };
    const winner = {
      id: "winner-local-B",
      provider,
      authType: "oauth",
      providerSpecificData: { chatgptUserId: "B" },
    };
    const winnerIdentity = (
      await import("../../src/lib/db/sessionAffinity/accountIdentity.ts")
    ).sessionAffinityAccountIdentity(winner, provider);
    client.fail = true;
    await store.upsert(key, provider, "outage-A", now, ttl, identityA, null);
    client.fail = false;
    client.raw = JSON.stringify(record("winner-B", winnerIdentity));
    factory._setSessionAffinityRedisForTests({
      getClient: async () => client,
      isConfigured: () => true,
    });
    process.env.OMNIROUTE_SESSION_AFFINITY_STORE = "redis";
    const selectedStore = factory.getSessionAffinityStore();
    if (mode === "ordinary") {
      const selected = await pin.selectSessionAffinityConnection(
        provider,
        key,
        [candidate, winner],
        ttl,
        null
      );
      assert.equal(selected?.id, winner.id);
    } else {
      const plan = pin.planSessionAffinityConnection(
        provider,
        key,
        [candidate, winner],
        ttl,
        null
      )!;
      const claimed = plan.connection;
      await plan.commit();
      assert.equal(plan.connection, claimed);
    }
    client.fail = true;
    assert.equal(await selectedStore.get(key, provider, ttl, now + 2), null);
  });
}

test("healthy touch CAS loss clears obsolete local pin", async () => {
  const { client, store } = setup();
  const key = "touch-loss";
  client.fail = true;
  await store.upsert(key, provider, "outage-A", now, ttl, identityA, null);
  client.fail = false;
  client.raw = JSON.stringify(record("winner-A", identityA));
  client.beforeMutation = () => {
    client.raw = JSON.stringify(record("winner-B", identityB));
  };
  await store.touch(key, provider, now + 1, ttl);
  assert.equal(JSON.parse(client.raw!).connectionId, "winner-B");
  client.fail = true;
  assert.equal(await store.get(key, provider, ttl, now + 2), null);
});

test("healthy delete of already absent shared key clears outage-era local pin", async () => {
  const { client, store } = setup();
  const key = "delete-miss";
  client.fail = true;
  await store.upsert(key, provider, "outage-A", now, ttl, identityA, null);
  client.fail = false;
  client.raw = null;
  await store.delete(key, provider);
  client.fail = true;
  assert.equal(await store.get(key, provider, ttl, now + 2), null);
});

for (const operation of ["upsert", "touch"] as const) {
  test(`late ${operation} reply preserves a newer outage write for the same account`, async () => {
    const { client, store } = setup();
    const key = `late-${operation}`;
    client.fail = true;
    await store.upsert(key, provider, "outage-A", now, ttl, identityA, null);
    client.fail = false;
    client.raw = JSON.stringify(record("outage-A", identityA));
    client.hold = true;
    const pending =
      operation === "upsert"
        ? store.upsert(key, provider, "outage-A", now + 1, ttl, identityA)
        : store.touch(key, provider, now + 1, ttl);
    await client.applied.promise;
    await pending;
    if (operation === "touch") {
      assert.equal(readLocal(key), null, "the initial read cleared the row before touch timed out");
    } else {
      assert.equal(readLocal(key)?.lastUsedAt, new Date(now + 1).toISOString());
    }
    client.fail = true;
    await store.upsert(key, provider, "outage-A", now + 3, ttl, identityA, null);
    const newer = readLocal(key);
    client.release.resolve();
    await flush();
    assert.deepEqual(await store.get(key, provider, ttl, now + 4), newer);
  });
}

test("confirmed upsert/touch/delete never write local pins; healthy reads ignore outage pins; eviction clears matching pin", async () => {
  const { client, store } = setup();
  const key = "control";
  client.fail = false;
  await store.upsert(key, provider, "healthy-A", now, ttl, identityA, null);
  assert.equal(readLocal(key), null);
  await store.touch(key, provider, now + 1, ttl);
  assert.equal(readLocal(key), null);
  client.fail = true;
  await store.upsert(key, provider, "outage-A", now + 2, ttl, identityA, null);
  client.fail = false;
  client.raw = JSON.stringify(record("healthy-B", identityB));
  assert.equal((await store.get(key, provider, ttl, now + 3))?.connectionId, "healthy-B");
  client.raw = JSON.stringify(record("healthy-A", identityA));
  assert.equal(await store.evict(key, provider, "healthy-A", identityA), true);
  client.fail = true;
  assert.equal(await store.get(key, provider, ttl, now + 4), null);
});

class ModelRedis {
  raw: string | null = null;
  up = true;
  delayed = false;
  delayMutationOnly = false;
  rejectCas = false;
  step = 0;
  currentLate: { fallbackStep?: number } | undefined;
  readonly pending: Array<{
    value: unknown;
    resolve: (value: unknown) => void;
    step: number;
    fallbackStep?: number;
    loserId?: string;
  }> = [];
  onImmediateReply: (() => void) | undefined;
  loserIds = new Set<string>();
  private reply<T>(value: T, loserId?: string): Promise<T> {
    if (!this.delayed) {
      if (loserId) this.loserIds.add(loserId);
      this.onImmediateReply?.();
      return Promise.resolve(value);
    }
    return new Promise<T>((resolve) =>
      this.pending.push({
        value,
        resolve: resolve as (value: unknown) => void,
        step: this.step,
        loserId,
      })
    );
  }
  noteFallback() {
    for (const pending of this.pending) {
      if (pending.step === this.step) pending.fallbackStep ??= this.step;
    }
  }
  async get(_key: string) {
    if (!this.up) throw new Error("synthetic model outage");
    return this.reply(this.raw);
  }
  async set(_key: string, value: string, _mode: "PX", _ttl: number) {
    if (!this.up) throw new Error("synthetic model outage");
    this.raw = value;
  }
  async del(_key: string) {
    if (!this.up) throw new Error("synthetic model outage");
    const existed = this.raw !== null;
    this.raw = null;
    return this.reply(Number(existed));
  }
  async eval(
    _script: string,
    _keys: number,
    _key: string,
    expected?: string,
    replacement?: string,
    duration?: number
  ) {
    if (!this.up) throw new Error("synthetic model outage");
    if (expected === undefined) {
      if (this.delayMutationOnly) {
        this.onImmediateReply?.();
        return [this.raw, this.raw === null ? -2 : ttl];
      }
      return this.reply([this.raw, this.raw === null ? -2 : ttl]);
    }
    if (this.rejectCas) {
      this.raw = JSON.stringify(record("synthetic-interleaved-winner", identityB));
      this.rejectCas = false;
    }
    const accepted = (this.raw ?? "") === expected;
    const existed = this.raw !== null;
    const loserId = !accepted && replacement ? JSON.parse(replacement).connectionId : undefined;
    if (accepted) this.raw = replacement || null;
    return this.reply(
      [
        accepted ? (replacement ? 1 : Number(existed)) : 0,
        this.raw,
        this.raw === null ? -2 : duration || ttl,
      ],
      loserId
    );
  }
  release(index: number) {
    const pending = this.pending.splice(index, 1)[0];
    if (pending) {
      if (pending.loserId) this.loserIds.add(pending.loserId);
      this.currentLate = pending;
      pending.resolve(pending.value);
      setImmediate(() => {
        if (this.currentLate === pending) this.currentLate = undefined;
      });
    }
  }
  releaseAll() {
    while (this.pending.length) this.release(this.pending.length - 1);
  }
}

test("1000 seeded schedules preserve authoritative invalidation and exact late-write protection", async (t) => {
  const seeds = [0x16472009, 0x9e3779b9];
  const scheduleCount = 1000;
  const random = (state: { value: number }, n: number) => {
    state.value ^= state.value << 13;
    state.value ^= state.value >>> 17;
    state.value ^= state.value << 5;
    return (state.value >>> 0) % n;
  };
  for (const seed of seeds) {
    for (let schedule = 0; schedule < scheduleCount / seeds.length; schedule++) {
      const state = { value: seed ^ schedule };
      const key = `model-${seed.toString(16)}-${schedule}`;
      let step = 0;
      let authoritativeStep = -1;
      let localWriteStep = -1;
      let localWriteId: string | undefined;
      const evictedAt = new Map<string, number>();
      const loserIds = new Set<string>();
      const redis = new ModelRedis();
      redis.onImmediateReply = () => {
        authoritativeStep = step;
      };
      const fallback = {
        ...local,
        upsert(...args: Parameters<typeof local.upsert>) {
          const result = local.upsert(...args);
          const value = local.getSerialized(key, provider);
          if (value) {
            localWriteStep = step;
            localWriteId = local.get(key, provider, ttl, now + 100)?.connectionId;
            redis.noteFallback();
          }
          return result;
        },
        touch(...args: Parameters<typeof local.touch>) {
          const result = local.touch(...args);
          const value = local.getSerialized(key, provider);
          if (value) {
            localWriteStep = step;
            localWriteId = local.get(key, provider, ttl, now + 100)?.connectionId;
            redis.noteFallback();
          }
          return result;
        },
        delete(...args: Parameters<typeof local.delete>) {
          const result = local.delete(...args);
          localWriteStep = -1;
          localWriteId = undefined;
          return result;
        },
        deleteIfValue(...args: Parameters<typeof local.deleteIfValue>) {
          const before = local.getSerialized(key, provider);
          const late = redis.currentLate;
          const result = local.deleteIfValue(...args);
          if (before === args[2] && result) {
            assert.ok(
              !late || late.fallbackStep === undefined || localWriteStep <= late.fallbackStep,
              "a late completion removed a row written after its fallback"
            );
            localWriteStep = -1;
            localWriteId = undefined;
          }
          return result;
        },
        evict(...args: Parameters<typeof local.evict>) {
          const result = local.evict(...args);
          if (result) {
            evictedAt.set(args[3] ?? args[2], step);
            localWriteStep = -1;
            localWriteId = undefined;
          }
          return result;
        },
      };
      const stores = [
        new RedisSessionAffinityStore(async () => redis, fallback, 1),
        new RedisSessionAffinityStore(async () => redis, fallback, 1),
      ];
      for (let operationStep = 0; operationStep < 8; operationStep++) {
        step = operationStep;
        redis.step = step;
        const index = random(state, stores.length);
        const store = stores[index];
        const id = `model-${seed.toString(16)}-${schedule}-${operationStep}`;
        const accountIdentity = random(state, 2) ? identityA : identityB;
        redis.up = random(state, 5) !== 0;
        redis.delayed = redis.up && random(state, 4) === 0;
        const operation = random(state, 5);
        redis.rejectCas = redis.up && operation <= 1 && random(state, 5) === 0;
        redis.delayMutationOnly = redis.rejectCas;
        if (operation === 0)
          await store.upsert(key, provider, id, now + operationStep, ttl, accountIdentity);
        else if (operation === 1) await store.touch(key, provider, now + operationStep, ttl);
        else if (operation === 2) await store.delete(key, provider);
        else if (operation === 3) await store.evict(key, provider, id, accountIdentity);
        else await store.get(key, provider, ttl, now + operationStep);
        for (const loser of redis.loserIds) loserIds.add(loser);
        if (redis.pending.length && random(state, 3) === 0) {
          redis.release(random(state, redis.pending.length));
          await flush();
        }
        const current = local.get(key, provider, ttl, now + 100);
        if (current) {
          assert.ok(
            localWriteStep >= authoritativeStep,
            `schedule ${seed}/${schedule}/${step}: stale local row survived authoritative reply`
          );
          assert.ok(!loserIds.has(current.connectionId), "a CAS loser became a local pin");
          const evicted = evictedAt.get(current.accountIdentity ?? current.connectionId);
          assert.ok(
            evicted === undefined || localWriteStep > evicted,
            "an evicted account was resurrected without a later write"
          );
          assert.equal(current.connectionId, localWriteId);
        }
      }
      redis.releaseAll();
      await flush();
      const current = local.get(key, provider, ttl, now + 100);
      if (current) {
        assert.ok(
          localWriteStep >= authoritativeStep,
          `schedule ${seed}/${schedule}: stale final local row`
        );
        assert.ok(
          !loserIds.has(current.connectionId),
          `schedule ${seed}/${schedule}: CAS loser local row`
        );
      }
      local.delete(key, provider);
    }
  }
  t.diagnostic(JSON.stringify({ schedules: scheduleCount, seeds: ["0x16472009", "0x9e3779b9"] }));
});
