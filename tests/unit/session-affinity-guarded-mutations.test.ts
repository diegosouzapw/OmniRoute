import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-affinity-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
const core = await import("../../src/lib/db/core.ts");
const sqlite = await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const redisModule = await import("../../src/lib/db/sessionAffinity/redisStore.ts");
const factory = await import("../../src/lib/db/sessionAffinity/storeFactory.ts");
const identity = await import("../../src/lib/db/sessionAffinity/accountIdentity.ts");
const pin = await import("../../src/sse/services/sessionAffinityPin.ts");

// Models delayed command execution, not Lua execution. The script contract is tested separately.
class DelayedRedis {
  values = new Map<string, string>();
  fail = false;
  deferWrite = false;
  release: (() => void) | undefined;
  calls: unknown[][] = [];
  async get(key: string) {
    if (this.fail) throw new Error("synthetic outage");
    return this.values.get(key) ?? null;
  }
  async wait() {
    if (this.deferWrite) {
      this.deferWrite = false;
      await new Promise<void>((resolve) => {
        this.release = resolve;
      });
    }
  }
  async set(key: string, value: string, _mode: "PX", _ttl: number) {
    await this.wait();
    this.values.set(key, value);
    return "OK";
  }
  async del(key: string) {
    await this.wait();
    return Number(this.values.delete(key));
  }
  async eval(
    script: string,
    keys: number,
    key: string,
    expected: string,
    replacement: string,
    ttl: number
  ) {
    if (expected === undefined) return [await this.get(key), this.values.has(key) ? 60_000 : -2];
    this.calls.push([script, keys, key, expected, replacement, ttl]);
    await this.wait();
    if ((this.values.get(key) ?? "") !== expected) return [0, this.values.get(key) ?? null, 60_000];
    if (!replacement) return [Number(this.values.delete(key)), null, -2];
    this.values.set(key, replacement);
    return [1, replacement, ttl];
  }
}
function account(id: string) {
  return {
    id,
    provider: "codex",
    authType: "oauth",
    providerSpecificData: {
      workspaceId: "synthetic-workspace",
      chatgptUserId: "synthetic-user",
    },
  };
}
function storeFor(redis: DelayedRedis) {
  return new redisModule.RedisSessionAffinityStore(
    async () => redis,
    sqlite.sqliteSessionAffinityStore,
    25
  );
}
test.beforeEach(() => {
  factory._setSessionAffinityRedisForTests(null);
  delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
});
test.after(() => {
  factory._setSessionAffinityRedisForTests(null);
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const operation of ["delete", "upsert"] as const) {
  test(`late timed-out ${operation} must not remove or overwrite a newer pin`, async () => {
    const redis = new DelayedRedis();
    const store = storeFor(redis);
    const sessionKey = `late-${operation}`;
    await store.upsert(sessionKey, "codex", "old", Date.now(), 60_000);
    redis.deferWrite = true;
    if (operation === "delete") await store.delete(sessionKey, "codex");
    else await store.upsert(sessionKey, "codex", "stale", Date.now(), 60_000);
    assert.ok(redis.release, "the write must actually be queued at the deadline");
    await store.upsert(sessionKey, "codex", "new", Date.now(), 60_000);
    redis.release();
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal((await store.get(sessionKey, "codex", 60_000))?.connectionId, "new");
  });
}

test("late initial upsert must not overwrite a pin created after observing a miss", async () => {
  const redis = new DelayedRedis();
  const store = storeFor(redis);
  redis.deferWrite = true;
  await store.upsert("late-miss", "codex", "stale", Date.now(), 60_000);
  assert.ok(redis.release);
  await store.upsert("late-miss", "codex", "new", Date.now(), 60_000);
  redis.release();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal((await store.get("late-miss", "codex", 60_000))?.connectionId, "new");
});

test("a read completing after the deadline must not issue an upsert or delete", async () => {
  for (const operation of ["upsert", "delete"] as const) {
    const redis = new DelayedRedis();
    const store = storeFor(redis);
    await store.upsert(operation, "codex", "old", Date.now(), 60_000);
    const get = redis.get.bind(redis);
    let release: (() => void) | undefined;
    redis.get = async (key) => {
      const value = await get(key);
      await new Promise<void>((resolve) => {
        release = resolve;
      });
      return value;
    };
    const calls = redis.calls.length;
    if (operation === "delete") await store.delete(operation, "codex");
    else await store.upsert(operation, "codex", "stale", Date.now(), 60_000);
    assert.ok(release);
    release();
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(redis.calls.length, calls);
  }
});

for (const shadow of ["empty", "wrong"] as const) {
  test(`remote pin touch clears local fallback without installing a mirror (${shadow})`, async () => {
    const redis = new DelayedRedis();
    const store = storeFor(redis);
    const key = `remote-touch-${shadow}`;
    const now = Date.now();
    await store.upsert(
      key,
      "codex",
      "remote-a",
      now,
      60_000,
      identity.sessionAffinityAccountIdentity(account("remote-a"), "codex")
    );
    const shared = await store.get(key, "codex", 60_000, now);
    sqlite.deleteSessionAccountAffinity(key, "codex");
    if (shadow === "wrong")
      sqlite.upsertSessionAccountAffinity(key, "codex", "wrong", now + 1, 60_000);
    assert.equal(
      identity.resolveSessionAffinityConnection(shared, [account("local-b")], "codex")?.id,
      "local-b"
    );
    await store.touch(key, "codex", now + 10, 60_000);
    redis.fail = true;
    assert.equal(await store.get(key, "codex", 60_000, now + 11), null);
  });
}

for (const consumer of ["planner", "select", "apply"] as const) {
  test(`default-off prefetched pins must not survive their expiry boundary (${consumer})`, async () => {
    const key = `expiry-${consumer}`;
    sqlite.upsertSessionAccountAffinity(key, "codex", "old", 1_000, 100);
    const snapshot = sqlite.getSessionAccountAffinity(key, "codex", 100, 1_050);
    assert.ok(snapshot);
    const actualNow = Date.now;
    Date.now = () => 1_100;
    try {
      const candidates = [
        { id: "old", lastUsedAt: new Date(1_050).toISOString() },
        { id: "fresh" },
      ];
      if (consumer === "apply") {
        assert.equal(
          pin.applySessionAffinityPin({
            forcedConnectionId: "fresh",
            options: { sessionKey: key },
            sessionAffinityTtlMs: 100,
            connections: candidates,
            provider: "codex",
            requestedModel: null,
            excludedConnectionIds: new Set(),
            isTerminalConnectionStatus: () => false,
            isCodexScopeUnavailable: () => false,
            isQuotaPolicyBlocked: () => false,
            affinityRecord: snapshot,
          }),
          null
        );
      } else if (consumer === "select") {
        assert.equal(
          (await pin.selectSessionAffinityConnection("codex", key, candidates, 100, snapshot))?.id,
          "fresh"
        );
      } else {
        assert.equal(
          pin.planSessionAffinityConnection("codex", key, candidates, 100, snapshot)?.connection.id,
          "fresh"
        );
        // Same choice as a fresh getter at the exact <= expiry boundary (base semantics).
        assert.equal(
          pin.planSessionAffinityConnection("codex", key, candidates, 100)?.connection.id,
          "fresh"
        );
      }
    } finally {
      Date.now = actualNow;
    }
  });
}

test("default-off selection must keep the base SQLite JSON shape byte-for-byte", async () => {
  const providers = await import("../../src/lib/db/providers.ts");
  const c = await providers.createProviderConnection({
    ...account("unused"),
    id: undefined,
    name: "synthetic-connection",
    accessToken: "synthetic",
    isActive: true,
  });
  const now = Date.now();
  const actualNow = Date.now;
  Date.now = () => now;
  try {
    await pin
      .planSessionAffinityConnection(
        "codex",
        "default-parity",
        [{ ...c, id: String(c.id) }],
        60_000,
        null
      )!
      .commit();
    const key = `codex:${createHash("sha256").update("codex:default-parity").digest("hex")}`;
    const row = core
      .getDbInstance()
      .prepare("SELECT value FROM key_value WHERE namespace=? AND key=?")
      .get("session_account_affinity", key) as { value: string };
    assert.equal(
      row.value,
      JSON.stringify({
        connectionId: String(c.id),
        createdAt: new Date(now).toISOString(),
        lastUsedAt: new Date(now).toISOString(),
        expiresAt: new Date(now + 60_000).toISOString(),
      })
    );
    assert.equal(
      identity.resolveSessionAffinityConnection(
        sqlite.getSessionAccountAffinity("default-parity", "codex", 60_000),
        [{ id: String(c.id) }],
        "codex"
      )?.id,
      String(c.id)
    );
  } finally {
    Date.now = actualNow;
  }
});

test("COMPARE_AND_UPDATE exact Lua text and ARGV contract", async () => {
  const script = (redisModule as unknown as Record<string, unknown>).COMPARE_AND_UPDATE;
  assert.equal(
    script,
    `
local raw = redis.call("GET", KEYS[1])
local ttl = redis.call("PTTL", KEYS[1])
if (raw or "") ~= ARGV[1] then return {0, raw or false, ttl} end
if ARGV[2] == "" then return {redis.call("DEL", KEYS[1]), false, -2} end
redis.call("SET", KEYS[1], ARGV[2], "PX", ARGV[3])
return {1, ARGV[2], ARGV[3]}
`
  );
  const redis = new DelayedRedis();
  const store = storeFor(redis);
  await store.upsert("contract", "codex", "old", Date.now(), 60_000);
  assert.equal(redis.calls[0][3], "", "ARGV[1] empty means the observed key was absent");
  const original = [...redis.values.values()][0];
  await store.touch("contract", "codex", Date.now(), 70_000);
  assert.equal(redis.calls[1][0], script);
  assert.equal(redis.calls[1][1], 1);
  assert.equal(redis.calls[1][3], original, "ARGV[1] is the exact observed value");
  assert.equal(typeof redis.calls[1][4], "string", "ARGV[2] is replacement JSON");
  assert.equal(redis.calls[1][5], 70_000, "ARGV[3] is PX milliseconds");
  const refreshed = [...redis.values.values()][0];
  await store.delete("contract", "codex");
  assert.deepEqual(redis.calls[2].slice(3), [refreshed, "", 0]);
  assert.equal(redis.calls[2][0], script);
});
