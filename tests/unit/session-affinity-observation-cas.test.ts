import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-observation-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
const core = await import("../../src/lib/db/core.ts");
const { sqliteSessionAffinityStore: local } =
  await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const factory = await import("../../src/lib/db/sessionAffinity/storeFactory.ts");
const identity = await import("../../src/lib/db/sessionAffinity/accountIdentity.ts");
const pin = await import("../../src/sse/services/sessionAffinityPin.ts");
const eviction = await import("../../src/lib/db/sessionAffinity/requestEviction.ts");

function account(id: string, user: string, priority = 1) {
  return {
    id,
    authType: "oauth",
    provider: "codex",
    priority,
    providerSpecificData: { workspaceId: "synthetic", chatgptUserId: user },
  };
}
function record(connection: ReturnType<typeof account>) {
  const now = Date.now();
  return {
    connectionId: connection.id,
    accountIdentity: identity.sessionAffinityAccountIdentity(connection, "codex"),
    createdAt: new Date(now).toISOString(),
    lastUsedAt: new Date(now).toISOString(),
    expiresAt: new Date(now + 60_000).toISOString(),
  };
}
function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}
// In-memory command double; no sockets or Redis/Lua execution.
class RedisDouble {
  value: string | null = null;
  rejected = 0;
  writes = 0;
  reads = 0;
  fail = false;
  holdNextRead = false;
  captured = deferred();
  release = deferred();
  repinOnEval: string | null = null;
  winnerPttl = 60_000;
  afterRead: (() => void) | undefined;
  async get(_key: string) {
    if (this.fail) throw new Error("synthetic outage");
    this.reads++;
    const value = this.value;
    if (this.holdNextRead) {
      this.holdNextRead = false;
      this.captured.resolve();
      await this.release.promise;
    }
    this.afterRead?.();
    return value;
  }
  async set(_key: string, value: string, _mode: "PX", _ttl: number) {
    this.value = value;
  }
  async del(_key: string) {
    const existed = this.value !== null;
    this.value = null;
    return Number(existed);
  }
  async eval(
    _script: string,
    _keys: number,
    _key: string,
    expected: string,
    replacement: string,
    _ttl: number
  ) {
    if (expected === undefined) return [await this.get(_key), this.value === null ? -2 : 60_000];
    if (this.repinOnEval) {
      this.value = this.repinOnEval;
      this.repinOnEval = null;
    }
    this.writes++;
    if ((this.value ?? "") !== expected) {
      this.rejected++;
      this.afterRead?.();
      return [0, this.value, this.value === null ? -2 : this.winnerPttl];
    }
    const existed = this.value !== null;
    this.value = replacement || null;
    return [replacement ? 1 : Number(existed), this.value, replacement ? _ttl : -2];
  }
}
function inject(redis: RedisDouble) {
  process.env.OMNIROUTE_SESSION_AFFINITY_STORE = "redis";
  factory._setSessionAffinityRedisForTests({
    getClient: async () => redis,
    isConfigured: () => true,
  });
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

test("held miss cannot overwrite a winner installed before mutation; both selectors agree", async () => {
  const redis = new RedisDouble();
  inject(redis);
  redis.holdNextRead = true;
  const b = pin.selectSessionAffinityConnection(
    "codex",
    "synthetic-held",
    [account("b-x", "X", 2), account("b-y", "Y")],
    60_000
  );
  await redis.captured.promise;
  const a = await pin.selectSessionAffinityConnection(
    "codex",
    "synthetic-held",
    [account("a-x", "X"), account("a-y", "Y", 2)],
    60_000
  );
  const winner = redis.value;
  redis.release.resolve();
  assert.equal((await b)?.id, "b-x");
  assert.equal(a?.id, "a-x");
  assert.equal(redis.value, winner);
  assert.equal(redis.rejected, 1);
});

for (const obsolete of [false, true]) {
  test(`lease commit preserves an intervening winner (obsolete=${obsolete})`, async () => {
    const redis = new RedisDouble();
    const store = inject(redis);
    if (obsolete) redis.value = JSON.stringify(record(account("obsolete", "OLD")));
    const observed = await store.get("synthetic-lease", "codex", 60_000);
    const plan = pin.planSessionAffinityConnection(
      "codex",
      "synthetic-lease",
      [account("claimed-y", "Y"), account("local-x", "X", 2)],
      60_000,
      observed
    )!;
    const winner = JSON.stringify(record(account("remote-x", "X")));
    redis.value = winner;
    await plan.commit();
    assert.equal(plan.connection.id, "claimed-y");
    assert.equal(redis.value, winner);
    assert.equal(redis.writes, 1, "obsolete replacement is a single conditional mutation");
    assert.equal(redis.rejected, 1);
  });
}

test("ordinary obsolete replacement adopts an intervening winner without deleting it", async () => {
  const redis = new RedisDouble();
  const store = inject(redis);
  redis.value = JSON.stringify(record(account("obsolete", "OLD")));
  const observed = await store.get("synthetic-obsolete", "codex", 60_000);
  const winner = JSON.stringify(record(account("remote-x", "X")));
  redis.value = winner;
  const selected = await pin.selectSessionAffinityConnection(
    "codex",
    "synthetic-obsolete",
    [account("local-y", "Y"), account("local-x", "X", 2)],
    60_000,
    observed
  );
  assert.equal(selected?.id, "local-x");
  assert.equal(redis.value, winner);
  assert.equal(redis.writes, 1);
});

test("SQLite fallback observation is a shared miss, never authority to replace a recovered winner", async (t) => {
  t.mock.method(console, "warn", () => {});
  const redis = new RedisDouble();
  const store = inject(redis);
  await local.upsertShadow!("synthetic-fallback", "codex", record(account("obsolete", "OLD")));
  redis.fail = true;
  const observed = await store.get("synthetic-fallback", "codex", 60_000);
  assert.equal(observed?.connectionId, "obsolete");
  redis.fail = false;
  const winner = JSON.stringify(record(account("remote-x", "X")));
  redis.value = winner;
  const selected = await pin.selectSessionAffinityConnection(
    "codex",
    "synthetic-fallback",
    [account("local-y", "Y"), account("local-x", "X", 2)],
    60_000,
    observed
  );
  assert.equal(selected?.id, "local-x");
  assert.equal(redis.value, winner);
  assert.equal(redis.rejected, 1);
});

test("rejected winner expires during its atomic CAS reply: retain local candidate and shared bytes", async (t) => {
  let clock = Date.now();
  t.mock.method(Date, "now", () => clock);
  const redis = new RedisDouble();
  inject(redis);
  const remote = record(account("remote-x", "X"));
  remote.expiresAt = new Date(clock + 10).toISOString();
  redis.winnerPttl = 10;
  const winner = JSON.stringify(remote);
  redis.repinOnEval = winner;
  redis.afterRead = () => {
    if (redis.rejected) clock += 20;
  };
  const selected = await pin.selectSessionAffinityConnection(
    "codex",
    "synthetic-expiry",
    [account("local-y", "Y"), account("local-x", "X", 2)],
    60_000
  );
  assert.equal(redis.rejected, 1);
  assert.equal(selected?.id, "local-y");
  assert.equal(redis.value, winner);
  assert.equal(redis.writes, 1);
});

test("default callback deletion is synchronous and silent on SQLite failure", (t) => {
  const output: unknown[][] = [];
  for (const method of ["log", "info", "debug", "warn", "error"] as const)
    t.mock.method(console, method, (...args: unknown[]) => {
      output.push(args);
    });
  let called = false;
  t.mock.method(local, "delete", () => {
    called = true;
    throw new Error("synthetic SQLite failure");
  });
  eviction.deleteSessionAccountAffinityBestEffort("synthetic-delete", "codex");
  assert.equal(called, true);
  assert.deepEqual(output, []);
});

test("touch cannot renew a record replaced while its GET reply was held", async () => {
  const redis = new RedisDouble();
  const store = inject(redis);
  redis.value = JSON.stringify(record(account("old-x", "X")));
  redis.holdNextRead = true;
  const pending = store.touch("synthetic-touch", "codex", Date.now(), 60_000);
  await redis.captured.promise;
  const winner = JSON.stringify(record(account("remote-y", "Y")));
  redis.value = winner;
  redis.release.resolve();
  await pending;
  assert.equal(redis.value, winner);
  assert.equal(redis.rejected, 1);
});
