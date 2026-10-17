import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-affinity-initial-read-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
const core = await import("../../src/lib/db/core.ts");
const { sqliteSessionAffinityStore: local } =
  await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const { RedisSessionAffinityStore } =
  await import("../../src/lib/db/sessionAffinity/redisStore.ts");
const now = 1_000_000;
const ttl = 60_000;
const provider = "codex";
const record = JSON.stringify({
  connectionId: "shared-B",
  accountIdentity: "b".repeat(64),
  createdAt: new Date(now).toISOString(),
  lastUsedAt: new Date(now).toISOString(),
  expiresAt: new Date(now + ttl).toISOString(),
});
test.beforeEach((t) => t.mock.method(console, "warn", () => {}));
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const op of ["upsert", "touch", "delete"] as const) {
  test(`R1: ${op} clears local on the initial read before the next command`, async () => {
    for (const raw of [record, null, ""] as const) {
      const key = `initial-${op}-${raw === record ? "record" : raw === null ? "missing" : "empty"}`;
      local.upsert(key, provider, "stale-A", now, ttl, "a".repeat(64));
      let cleared = false;
      let rowAtSecondCommand: string | null | undefined;
      const fallback = {
        ...local,
        delete(sessionKey: string, storeProvider: string) {
          local.delete(sessionKey, storeProvider);
          cleared = true;
        },
      };
      const client = {
        async get() {
          return raw;
        },
        async set() {},
        async del() {
          return 0;
        },
        async eval(_script: string, _n: number, _key: string, expected?: string) {
          if (expected === undefined) return raw === "" ? [] : [raw, raw === null ? -2 : ttl];
          rowAtSecondCommand = local.getSerialized(key, provider);
          throw new Error("synthetic second-command failure");
        },
      };
      const store = new RedisSessionAffinityStore(async () => client, fallback, 100);
      if (op === "upsert") await store.upsert(key, provider, "candidate-C", now + 1, ttl);
      else if (op === "touch") await store.touch(key, provider, now + 1, ttl);
      else await store.delete(key, provider);
      if (rowAtSecondCommand !== undefined) {
        assert.equal(rowAtSecondCommand, null, "initial reply must clear local before mutation");
      }
      assert.equal(cleared, true, "every initial reply shape is authoritative");
      if (op === "touch") {
        const outage = new RedisSessionAffinityStore(
          async () => {
            throw new Error("synthetic outage");
          },
          local,
          100
        );
        assert.equal(await outage.get(key, provider, ttl, now + 2), null);
      }
    }
  });
}
