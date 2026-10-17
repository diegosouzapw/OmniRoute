import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-affinity-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "synthetic-affinity-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const leases = await import("../../src/lib/db/exclusiveConnectionLeases.ts");
const sqlite = await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const factory = await import("../../src/lib/db/sessionAffinity/storeFactory.ts");
const pin = await import("../../src/sse/services/sessionAffinityPin.ts");
const auth = await import("../../src/sse/services/auth.ts");

// In-memory command double only; no Redis server or Lua execution.
class FakeRedis {
  values = new Map<string, string>();
  async get(key: string) {
    return this.values.get(key) ?? null;
  }
  async set(key: string, value: string, _mode: "PX", _ttl: number) {
    this.values.set(key, value);
    return "OK";
  }
  async del(key: string) {
    return Number(this.values.delete(key));
  }
  async eval(
    _script: string,
    _keys: number,
    key: string,
    expected: string,
    replacement: string,
    _ttl: number
  ) {
    if (expected === undefined) return [await this.get(key), this.values.has(key) ? 60_000 : -2];
    if ((this.values.get(key) ?? "") !== expected) return [0, await this.get(key), 60_000];
    if (!replacement) return [Number(this.values.delete(key)), null, -2];
    this.values.set(key, replacement);
    return [1, replacement, _ttl];
  }
}

test.beforeEach(() => {
  factory._setSessionAffinityRedisForTests(null);
  delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
});
test.after(() => {
  factory._setSessionAffinityRedisForTests(null);
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const driver of ["sqlite", "redis"] as const) {
  for (const leasePath of [false, true]) {
    test(`${driver} ${leasePath ? "lease" : "non-lease"} auth selection after mid-flight pin eviction`, async (t) => {
      const sessionKey = `synthetic-race-${driver}-${leasePath}`;
      const redis = new FakeRedis();
      if (driver === "redis") {
        factory._setSessionAffinityRedisForTests({
          getClient: async () => redis,
          isConfigured: () => true,
        });
        process.env.OMNIROUTE_SESSION_AFFINITY_STORE = "redis";
      }
      const store = factory.getSessionAffinityStore();
      const makeConnection = async (name: string, priority: number) => {
        const connection = await providers.createProviderConnection({
          provider: "glm",
          authType: "apikey",
          name: `${sessionKey}-${name}`,
          apiKey: `synthetic-${sessionKey}-${name}`,
          isActive: true,
          testStatus: "active",
          priority,
        });
        return String(connection.id);
      };
      const a = await makeConnection("A", 2);
      const b = await makeConnection("B", 1);
      await store.upsert(sessionKey, "glm", a, Date.now(), 60_000);
      const get = t.mock.method(store, "get");
      let evicted = false;
      let readsAtEviction = -1;
      const db = core.getDbInstance();
      const prepare = db.prepare.bind(db);
      // This query runs inside the async lease-policy step, after the old
      // prefetch and before the planner/selector. Both candidates stay eligible.
      t.mock.method(db, "prepare", (sql: string) => {
        if (!evicted && sql.includes("SELECT connection_id, lease_owner_hash, expires_at")) {
          evicted = true;
          readsAtEviction = get.mock.callCount();
          if (driver === "sqlite")
            assert.equal(
              sqlite.evictSessionAccountAffinityForConnection(sessionKey, "glm", a),
              true
            );
          else
            assert.equal(
              sqlite.evictSessionAccountAffinityForConnection(sessionKey, "glm", a),
              false,
              "shared upsert must not have installed a local mirror"
            );
          redis.values.clear(); // The shared eviction has landed too.
        }
        return prepare(sql);
      });
      const owner = `vlo_${(driver === "redis" ? "R" : "S").repeat(43)}`;
      const key = leasePath
        ? await apiKeys.createApiKey("synthetic", "test", ["lease:exclusive"], {
            allowedConnections: [a, b],
          })
        : null;
      const selected = await auth.getProviderCredentials("glm", null, [a, b], null, {
        sessionKey,
        sessionAffinityTtlMs: 60_000,
        materializeCredentials: false,
        ...(key
          ? {
              lease: {
                apiKeyId: key.id,
                context: {
                  leaseOwnerId: owner,
                  leaseOwnerHash: leases.hashLeaseOwnerId(owner),
                  ownerDiagnostic: "synthetic",
                  generation: 1,
                },
                mode: "acquire" as const,
              },
            }
          : {}),
      });
      assert.equal(evicted, true, "must exercise the prefetch-to-selection window");
      // Base SQLite reads at planning time, sees the miss, and picks LRU B.
      // Redis lease planning remains synchronous and intentionally uses snapshot A.
      assert.equal(selected?.connectionId, driver === "redis" && leasePath ? a : b);
      assert.equal(readsAtEviction, driver === "redis" ? 1 : 0);
      if (driver === "sqlite")
        assert.equal(get.mock.callCount(), 0, "no store prefetch/read yield");
      if (driver === "redis" && leasePath) assert.equal(get.mock.callCount(), 1);
      if (driver === "redis" && !leasePath) {
        // Two selection reads, then the existing CAS-upsert observation read.
        assert.equal(get.mock.callCount(), 2);
      }
      if (key) {
        leases.invalidateExclusiveConnectionLease({
          leaseOwnerId: owner,
          generation: 1,
          apiKeyId: key.id,
          reason: "CONNECTION_INELIGIBLE",
        });
      }
    });
  }
}

test("SQLite selector reads at entry without an async store-read yield", async (t) => {
  const store = factory.getSessionAffinityStore();
  const get = t.mock.method(store, "get");
  sqlite.upsertSessionAccountAffinity("synthetic-entry", "glm", "A", Date.now(), 60_000);
  const selection = pin.selectSessionAffinityConnection(
    "glm",
    "synthetic-entry",
    [{ id: "A" }, { id: "B", priority: 1 }],
    60_000
  );
  assert.equal(get.mock.callCount(), 0, "SQLite must use the base synchronous getter");
  assert.equal((await selection)?.id, "A");
});

test("SQLite forced-pin override uses its own synchronous read without prefetch", async (t) => {
  const connection = await providers.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "synthetic-forced-connection",
    apiKey: "synthetic-forced-key",
    isActive: true,
    testStatus: "active",
  });
  const a = String(connection.id);
  sqlite.upsertSessionAccountAffinity("synthetic-forced", "glm", a, Date.now(), 60_000);
  const get = t.mock.method(factory.getSessionAffinityStore(), "get");
  const selected = await auth.getProviderCredentials("glm", null, [a], null, {
    sessionKey: "synthetic-forced",
    sessionAffinityTtlMs: 60_000,
    forcedConnectionId: a,
    materializeCredentials: false,
  });
  assert.equal(selected?.connectionId, a);
  assert.equal(get.mock.callCount(), 0);
});
