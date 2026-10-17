import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// Synthetic data is isolated from the worktree and the operator's DATA_DIR.
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-affinity-store-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
const core = await import("../../src/lib/db/core.ts");
const affinity = await import("../../src/lib/db/sessionAccountAffinity.ts");
const factory = await import("../../src/lib/db/sessionAffinity/storeFactory.ts");
const pin = await import("../../src/sse/services/sessionAffinityPin.ts");
const identity = await import("../../src/lib/db/sessionAffinity/accountIdentity.ts");

class FakeRedis {
  now = 1_000;
  values = new Map<string, { value: string; expiresAt: number }>();
  calls: Array<{ method: string; args: unknown[] }> = [];
  failure: "error" | "hang" | null = null;
  pendingReject: ((error: Error) => void) | null = null;
  async check() {
    if (this.failure === "error") throw new Error("synthetic Redis failure");
    if (this.failure === "hang") {
      await new Promise<never>((_resolve, reject) => {
        this.pendingReject = reject;
      });
    }
  }
  async get(key: string) {
    this.calls.push({ method: "get", args: [key] });
    await this.check();
    const entry = this.values.get(key);
    if (!entry || entry.expiresAt <= this.now) return null;
    return entry.value;
  }
  async set(key: string, value: string, mode: "PX", ttl: number) {
    this.calls.push({ method: "set", args: [key, value, mode, ttl] });
    await this.check();
    assert.equal(mode, "PX");
    this.values.set(key, { value, expiresAt: this.now + ttl });
    return "OK";
  }
  async del(key: string) {
    this.calls.push({ method: "del", args: [key] });
    await this.check();
    return Number(this.values.delete(key));
  }
  async eval(
    _script: string,
    _keys: number,
    key: string,
    expected: string,
    replacement: string,
    ttl: number
  ) {
    if (expected === undefined) {
      this.calls.push({ method: "read", args: [key] });
      await this.check();
      const entry = this.values.get(key);
      return entry && entry.expiresAt > this.now
        ? [entry.value, entry.expiresAt - this.now]
        : [null, -2];
    }
    this.calls.push({ method: "eval", args: [key, expected, replacement, ttl] });
    await this.check();
    const entry = this.values.get(key);
    const current = entry && entry.expiresAt > this.now ? entry.value : "";
    if (current !== expected) return [0, current || null, entry ? entry.expiresAt - this.now : -2];
    if (!replacement) return [Number(this.values.delete(key)), null, -2];
    this.values.set(key, { value: replacement, expiresAt: this.now + ttl });
    return [1, replacement, ttl];
  }
}

function account(id: string, user = "synthetic-user") {
  return {
    id,
    provider: "codex",
    authType: "oauth",
    providerSpecificData: {
      workspaceId: "synthetic-workspace",
      chatgptUserId: user,
    },
  };
}
function injected(redis: FakeRedis, configured = true) {
  factory._setSessionAffinityRedisForTests({
    getClient: async () => redis,
    isConfigured: () => configured,
  });
  process.env.OMNIROUTE_SESSION_AFFINITY_STORE = "redis";
  return factory.getSessionAffinityStore();
}
const warnings: unknown[][] = [];
let originalWarn: typeof console.warn;
test.beforeEach(() => {
  originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args);
  };
  warnings.length = 0;
  factory._setSessionAffinityRedisForTests(null);
  delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
  core
    .getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace = ?")
    .run("session_account_affinity");
});
test.afterEach(() => {
  console.warn = originalWarn;
});
test.after(() => {
  factory._setSessionAffinityRedisForTests(null);
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("default SQLite preserves CRUD, disabled TTL, timestamps and expiry boundaries", async () => {
  const store = factory.getSessionAffinityStore();
  assert.equal(store.driver, "sqlite");
  assert.equal(await store.get("session", "codex", 100, 1_000), null);
  await store.upsert("session", "codex", "local-a", 1_000, 100);
  assert.equal(await store.get("session", "codex", 0, 1_000), null);
  assert.deepEqual(await store.get("session", "codex", 100, 1_050), {
    connectionId: "local-a",
    createdAt: new Date(1_000).toISOString(),
    lastUsedAt: new Date(1_000).toISOString(),
    expiresAt: new Date(1_100).toISOString(),
  });
  await store.touch("session", "codex", 1_050, 100);
  const record = await store.get("session", "codex", 100, 1_100);
  assert.equal(record?.createdAt, new Date(1_000).toISOString());
  assert.equal(record?.expiresAt, new Date(1_150).toISOString());
  assert.equal(await store.get("session", "codex", 100, 1_150), null);
  await store.upsert("session", "codex", "local-a", 1_000, 100);
  await store.delete("session", "codex");
  assert.equal(await store.get("session", "codex", 100, 1_001), null);
});

test("two store instances share a pin and resolve identity before instance-local ids", async (t) => {
  const redis = new FakeRedis();
  t.mock.method(Date, "now", () => redis.now);
  const instanceA = injected(redis);
  const a = account("instance-a");
  await instanceA.upsert(
    "session",
    "codex",
    a.id,
    1_000,
    100,
    identity.sessionAffinityAccountIdentity(a, "codex")
  );
  factory._setSessionAffinityRedisForTests({
    getClient: async () => redis,
    isConfigured: () => true,
  });
  const instanceB = factory.getSessionAffinityStore();
  assert.notEqual(instanceA, instanceB);
  // B has no local shadow: its read must actually come from the shared Redis.
  affinity.deleteSessionAccountAffinity("session", "codex");
  const b = account("instance-b");
  const record = await instanceB.get("session", "codex", 100, 1_001);
  const plan = pin.planSessionAffinityConnection(
    "codex",
    "session",
    [account("instance-a", "other-user"), b],
    100,
    record
  );
  assert.equal(plan?.connection.id, b.id);
  assert.equal(
    pin.applySessionAffinityPin({
      forcedConnectionId: "other",
      options: { sessionKey: "session" },
      sessionAffinityTtlMs: 100,
      connections: [b],
      provider: "codex",
      requestedModel: null,
      excludedConnectionIds: new Set(),
      isTerminalConnectionStatus: () => false,
      isCodexScopeUnavailable: () => false,
      isQuotaPolicyBlocked: () => false,
      affinityRecord: record,
    }),
    b.id
  );
  const key = `session_affinity:codex:${createHash("sha256").update("codex:session").digest("hex")}`;
  assert.ok(redis.values.has(key));
  assert.equal(redis.calls.find((call) => call.method === "eval")?.args[3], 100);
  redis.now = 1_050;
  await instanceB.touch("session", "codex", 1_050, 100);
  assert.equal(redis.values.get(key)?.expiresAt, 1_150);
  assert.equal((await instanceB.get("session", "codex", 100, 1_100))?.createdAt, record?.createdAt);
  redis.now = 1_150;
  assert.equal(await instanceB.get("session", "codex", 100, 1_150), null);
  await instanceA.upsert("session", "codex", a.id, 1_150, 100);
  await instanceB.delete("session", "codex");
  assert.equal(await instanceA.get("session", "codex", 100, 1_151), null);
});

test("a pin outside the candidate pool is a miss; legacy SQLite pins still resolve", async () => {
  const a = account("instance-a");
  const store = injected(new FakeRedis());
  await store.upsert(
    "session",
    "codex",
    a.id,
    1_000,
    100,
    identity.sessionAffinityAccountIdentity(a, "codex")
  );
  const record = await store.get("session", "codex", 100, 1_001);
  assert.equal(
    identity.resolveSessionAffinityConnection(record, [account("other", "other-user")], "codex"),
    null
  );
  factory._setSessionAffinityRedisForTests(null);
  delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
  affinity.upsertSessionAccountAffinity("legacy", "codex", "legacy-id", Date.now(), 60_000);
  const legacy = await factory.getSessionAffinityStore().get("legacy", "codex", 60_000);
  assert.equal(
    identity.resolveSessionAffinityConnection(legacy, [{ id: "legacy-id" }], "codex")?.id,
    "legacy-id"
  );
});

test("identity hashes email-based identities and SQLite preserves it through touch", async () => {
  const conn = {
    id: "local",
    provider: "synthetic",
    authType: "oauth",
    email: "synthetic@example.invalid",
  };
  const digest = identity.sessionAffinityAccountIdentity(conn, "synthetic");
  assert.match(digest, /^[a-f0-9]{64}$/);
  assert.ok(!digest.includes(conn.email));
  const store = factory.getSessionAffinityStore();
  await store.upsert("session", "synthetic", conn.id, 1_000, 100, digest);
  await store.touch("session", "synthetic", 1_050, 100);
  const record = await store.get("session", "synthetic", 100, 1_100);
  assert.equal(record?.accountIdentity, digest);
  assert.equal(
    identity.resolveSessionAffinityConnection(record, [{ ...conn, id: "other-local" }], "synthetic")
      ?.id,
    "other-local"
  );
});

test("Redis errors fall back per call, writes reach SQLite and warnings are throttled", async () => {
  const redis = new FakeRedis();
  redis.failure = "error";
  const store = injected(redis);
  const now = Date.now();
  await store.upsert("failure", "codex", "fallback-id", now, 60_000);
  assert.equal((await store.get("failure", "codex", 60_000))?.connectionId, "fallback-id");
  await store.touch("failure", "codex", now + 1, 60_000);
  assert.equal(warnings.length, 1);
  assert.match(String(warnings[0]), /Redis.*SQLite/i);
  await store.delete("failure", "codex");
  assert.equal(affinity.getSessionAccountAffinity("failure", "codex", 60_000), null);
});

test("hung Redis bounds admission and handles a rejection arriving after the timeout", async () => {
  const redis = new FakeRedis();
  redis.failure = "hang";
  const store = injected(redis);
  const start = performance.now();
  const record = await store.get("hang", "codex", 60_000);
  assert.equal(record, null);
  assert.equal(
    pin.planSessionAffinityConnection("codex", "hang", [account("fallback")], 60_000, record)
      ?.connection.id,
    "fallback"
  );
  assert.ok(performance.now() - start < factory.SESSION_AFFINITY_REDIS_TIMEOUT_MS + 500);
  assert.equal(warnings.length, 1);
  redis.pendingReject?.(new Error("synthetic late rejection"));
  await new Promise((resolve) => setImmediate(resolve));
  const writeStart = performance.now();
  await store.upsert("hang-write", "codex", "fallback", Date.now(), 60_000);
  assert.ok(performance.now() - writeStart < factory.SESSION_AFFINITY_REDIS_TIMEOUT_MS + 500);
  assert.equal(
    affinity.getSessionAccountAffinity("hang-write", "codex", 60_000)?.connectionId,
    "fallback"
  );
  redis.pendingReject?.(new Error("synthetic late write rejection"));
});

test("environment selection requires exactly redis and configured Redis", () => {
  assert.equal(factory.getSessionAffinityStore().driver, "sqlite");
  process.env.OMNIROUTE_SESSION_AFFINITY_STORE = "unknown";
  assert.equal(factory.getSessionAffinityStore().driver, "sqlite");
  assert.equal(factory.getSessionAffinityStore().driver, "sqlite");
  assert.equal(warnings.length, 1);
  warnings.length = 0;
  factory._setSessionAffinityRedisForTests(null);
  process.env.OMNIROUTE_SESSION_AFFINITY_STORE = "redis";
  assert.equal(factory.getSessionAffinityStore().driver, "sqlite");
  assert.equal(factory.getSessionAffinityStore().driver, "sqlite");
  assert.equal(warnings.length, 1);
});

test("async credential selection reuses the shared pin and still enforces local eligibility", async () => {
  const providers = await import("../../src/lib/db/providers.ts");
  const settings = await import("../../src/lib/db/settings.ts");
  const auth = await import("../../src/sse/services/auth.ts");
  const redis = new FakeRedis();
  redis.now = Date.now();
  const store = injected(redis);
  const local = await providers.createProviderConnection({
    ...account("unused"),
    id: undefined,
    name: "synthetic-local-account",
    accessToken: "synthetic-token",
    isActive: true,
    testStatus: "active",
  });
  const other = await providers.createProviderConnection({
    ...account("unused", "other-user"),
    id: undefined,
    name: "synthetic-other-account",
    accessToken: "synthetic-other-token",
    isActive: true,
    testStatus: "active",
  });
  await settings.updateSettings({ sessionAffinityTtlMs: 60_000 });
  await store.upsert(
    "request-path",
    "codex",
    "remote-instance-id",
    Date.now(),
    60_000,
    identity.sessionAffinityAccountIdentity(account("remote-instance-id"), "codex")
  );
  const selected = await auth.getProviderCredentials("codex", null, null, "synthetic-model", {
    sessionKey: "request-path",
    forcedConnectionId: String(other.id),
  });
  assert.equal(
    selected && "connectionId" in selected ? selected.connectionId : null,
    String(local.id)
  );
  // Seed CAS read + prefetch + fresh non-lease selection read + CAS-touch observation.
  assert.equal(redis.calls.filter((call) => call.method === "read").length, 4);
  const excluded = await auth.getProviderCredentials("codex", null, null, "synthetic-model", {
    sessionKey: "request-path",
    forcedConnectionId: String(other.id),
    excludeConnectionIds: [String(local.id)],
  });
  assert.equal(
    excluded && "connectionId" in excluded ? excluded.connectionId : null,
    String(other.id)
  );
  await store.upsert(
    "request-eviction",
    "codex",
    "remote-instance-id",
    Date.now(),
    60_000,
    identity.sessionAffinityAccountIdentity(account("remote-instance-id"), "codex")
  );
  assert.equal(
    await affinity.evictSessionAccountAffinityForConnectionAsync(
      "request-eviction",
      "codex",
      String(local.id)
    ),
    true
  );
  assert.equal(await store.get("request-eviction", "codex", 60_000), null);
  await providers.deleteProviderConnection(String(local.id));
  await providers.deleteProviderConnection(String(other.id));
});

test("client acquisition is bounded and a late client does not issue commands", async () => {
  const redis = new FakeRedis();
  let release: ((client: FakeRedis) => void) | undefined;
  factory._setSessionAffinityRedisForTests({
    isConfigured: () => true,
    getClient: () =>
      new Promise((resolve) => {
        release = resolve;
      }),
  });
  process.env.OMNIROUTE_SESSION_AFFINITY_STORE = "redis";
  const started = performance.now();
  assert.equal(await factory.getSessionAffinityStore().get("acquisition", "codex", 60_000), null);
  assert.ok(performance.now() - started < factory.SESSION_AFFINITY_REDIS_TIMEOUT_MS + 500);
  release?.(redis);
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(redis.calls.length, 0);
});

test("touch and guarded eviction do not overwrite or delete a concurrent repin", async () => {
  const redis = new FakeRedis();
  const store = injected(redis);
  await store.upsert("race", "codex", "original", 1_000, 100);
  const originalEval = redis.eval.bind(redis);
  redis.eval = async (script, keys, key, expected, replacement, ttl) => {
    if (expected === undefined) return originalEval(script, keys, key, expected, replacement, ttl);
    assert.match(script, /redis.call\("SET"/);
    assert.match(script, /"PX"/);
    const repin = {
      connectionId: "concurrent",
      createdAt: new Date(1_000).toISOString(),
      lastUsedAt: new Date(1_050).toISOString(),
      expiresAt: new Date(1_500).toISOString(),
    };
    redis.values.set(key, { value: JSON.stringify(repin), expiresAt: 1_500 });
    return originalEval(script, keys, key, expected, replacement, ttl);
  };
  await store.touch("race", "codex", 1_050, 100);
  assert.equal((await store.get("race", "codex", 100, 1_051))?.connectionId, "concurrent");
  assert.equal(
    (await store.get("race", "codex", 100, 1_051))?.expiresAt,
    new Date(1_551).toISOString() // local 1_051 + Redis's remaining 500 ms
  );
  // Restore the old shared pin so eviction reads it before the concurrent repin.
  await store.upsert("race", "codex", "original", 1_000, 100);
  await store.evict("race", "codex", "original");
  assert.equal((await store.get("race", "codex", 100, 1_051))?.connectionId, "concurrent");
});

test("callback deletion is explicitly best-effort for Redis failures", async () => {
  const redis = new FakeRedis();
  const store = injected(redis);
  await store.upsert("callback", "codex", "synthetic-local", Date.now(), 60_000);
  redis.failure = "error";
  assert.doesNotThrow(() => affinity.deleteSessionAccountAffinityBestEffort("callback", "codex"));
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(affinity.getSessionAccountAffinity("callback", "codex", 60_000), null);
  assert.equal(warnings.length, 1);
});

test("conditional eviction matches shared identity without deleting another account's pin", async () => {
  const store = injected(new FakeRedis());
  const digest = identity.sessionAffinityAccountIdentity(account("a"), "codex");
  await store.upsert("evict", "codex", "a", 1_000, 100, digest);
  assert.equal(await store.evict("evict", "codex", "b", "different-identity"), false);
  assert.equal(await store.evict("evict", "codex", "b", digest), true);
  assert.equal(await store.get("evict", "codex", 100, 1_001), null);
});
