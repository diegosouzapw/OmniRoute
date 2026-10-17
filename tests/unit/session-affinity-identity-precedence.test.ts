import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-identity-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
const core = await import("../../src/lib/db/core.ts");
const { sqliteSessionAffinityStore: local } =
  await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const { RedisSessionAffinityStore } =
  await import("../../src/lib/db/sessionAffinity/redisStore.ts");
const identity = await import("../../src/lib/db/sessionAffinity/accountIdentity.ts");

function account(user: string) {
  return { id: "same-id", authType: "oauth", providerSpecificData: { chatgptUserId: user } };
}
const failed = account("synthetic-X");
const healthy = account("synthetic-Y");
const failedIdentity = identity.sessionAffinityAccountIdentity(failed, "codex");
const now = Date.now();
function record(withIdentity: boolean) {
  return {
    connectionId: "same-id",
    ...(withIdentity
      ? { accountIdentity: identity.sessionAffinityAccountIdentity(healthy, "codex") }
      : {}),
    createdAt: new Date(now).toISOString(),
    lastUsedAt: new Date(now).toISOString(),
    expiresAt: new Date(now + 60_000).toISOString(),
  };
}
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("a known contradictory identity prevents selecting an id collision", () => {
  assert.equal(identity.resolveSessionAffinityConnection(record(true), [failed], "codex"), null);
  assert.equal(
    identity.resolveSessionAffinityConnection(record(true), [failed, healthy], "codex"),
    healthy
  );
});

test("a legacy identity-free record still resolves by local id", () => {
  assert.equal(identity.resolveSessionAffinityConnection(record(false), [failed], "codex"), failed);
});

for (const driver of ["sqlite", "redis"] as const) {
  for (const mode of [
    "identity-conflict",
    "legacy-record",
    "identity-free-caller",
    "same-identity-different-id",
  ] as const) {
    test(`${driver} eviction: ${mode}`, async () => {
      const key = `synthetic-${driver}-${mode}`;
      const before = record(mode !== "legacy-record");
      await local.upsertShadow!(key, "codex", before);
      let value: string | null = JSON.stringify(before);
      let writes = 0;
      const redis = {
        async get(_key: string) {
          return value;
        },
        async set(_key: string, replacement: string, _mode: "PX", _ttl: number) {
          value = replacement;
        },
        async del(_key: string) {
          const existed = value !== null;
          value = null;
          return Number(existed);
        },
        async eval(
          _script: string,
          _count: number,
          _key: string,
          expected: string,
          replacement: string,
          _ttl: number
        ) {
          writes++;
          assert.equal(value, expected);
          value = replacement || null;
          return 1;
        },
      };
      const store =
        driver === "sqlite" ? local : new RedisSessionAffinityStore(async () => redis, local, 100);
      const callerIdentity =
        mode === "identity-free-caller"
          ? undefined
          : mode === "same-identity-different-id"
            ? before.accountIdentity
            : failedIdentity;
      const id = mode === "same-identity-different-id" ? "different-local-id" : "same-id";
      const evicted = await store.evict(key, "codex", id, callerIdentity);
      const conflict = mode === "identity-conflict";
      assert.equal(evicted, !conflict);
      assert.deepEqual(
        await local.get(key, "codex", 60_000),
        driver === "sqlite" && conflict ? before : null
      );
      if (driver === "redis") {
        assert.equal(writes, conflict ? 0 : 1);
        assert.equal(value, conflict ? JSON.stringify(before) : null);
      }
    });
  }
}
