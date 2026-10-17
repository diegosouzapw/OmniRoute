import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import type { SessionAccountAffinityRecord } from "../../src/lib/db/sessionAffinity/store.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-affinity-shadow-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
const core = await import("../../src/lib/db/core.ts");
const { sqliteSessionAffinityStore: local } =
  await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const { RedisSessionAffinityStore } =
  await import("../../src/lib/db/sessionAffinity/redisStore.ts");
const { SESSION_AFFINITY_REDIS_TIMEOUT_MS } =
  await import("../../src/lib/db/sessionAffinity/storeFactory.ts");

const now = 1_000;
const ttl = 60_000;
function record(connectionId: string): SessionAccountAffinityRecord {
  return {
    connectionId,
    accountIdentity: "a".repeat(64),
    createdAt: new Date(now - 100).toISOString(),
    lastUsedAt: new Date(now).toISOString(),
    expiresAt: new Date(now + ttl).toISOString(),
  };
}

// In-memory command double only: no connection, server, or Lua execution.
class FakeRedis {
  value: string | null = JSON.stringify(record("shared-winner"));
  fail = false;
  rejectCas = false;
  evalFailure = false;
  deferEval = false;
  release: (() => void) | undefined;
  async get(_key: string) {
    if (this.fail) throw new Error("synthetic outage");
    return this.value;
  }
  async set(_key: string, value: string, _mode: "PX", _ttl: number) {
    this.value = value;
    return "OK";
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
    if (expected === undefined) return [await this.get(_key), this.value === null ? -2 : ttl];
    if (this.evalFailure) throw new Error("synthetic EVAL error");
    if (this.deferEval) {
      await new Promise<void>((resolve) => {
        this.release = resolve;
      });
    }
    if (this.rejectCas) {
      this.value = JSON.stringify(record("shared-winner"));
      return [0, this.value, this.value === null ? -2 : ttl];
    }
    if ((this.value ?? "") !== expected) return [0, this.value, ttl];
    const existed = this.value !== null;
    this.value = replacement || null;
    return [replacement ? 1 : Number(existed), this.value, replacement ? _ttl : -2];
  }
}
function storeFor(redis: FakeRedis) {
  return new RedisSessionAffinityStore(async () => redis, local, SESSION_AFFINITY_REDIS_TIMEOUT_MS);
}
function seedLocal(key: string, _provider: string, value: SessionAccountAffinityRecord) {
  local.upsert(
    key,
    "codex",
    value.connectionId,
    Date.parse(value.createdAt),
    ttl + 100,
    value.accountIdentity
  );
  local.touch(key, "codex", Date.parse(value.lastUsedAt), ttl);
}
function shadow(key: string) {
  return local.get(key, "codex", ttl, now + 10);
}
const originalWarn = console.warn;
test.beforeEach(() => {
  console.warn = () => {};
});
test.afterEach(() => {
  console.warn = originalWarn;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const seeded of [false, true]) {
  test(`rejected upsert never shadows late-writer (seeded=${seeded})`, async () => {
    const key = `rejected-upsert-${seeded}`;
    const redis = new FakeRedis();
    const store = storeFor(redis);
    if (seeded) await seedLocal(key, "codex", record("shared-winner"));
    redis.rejectCas = true;
    await store.upsert(key, "codex", "late-writer", now + 1, ttl);
    assert.equal(JSON.parse(redis.value!).connectionId, "shared-winner");
    redis.fail = true;
    const result = await store.get(key, "codex", ttl, now + 2);
    assert.equal(result?.connectionId ?? null, null);
  });
}

test("rejected delete leaves the shared winner intact and invalidates local fallback", async () => {
  const key = "rejected-delete";
  const redis = new FakeRedis();
  redis.value = JSON.stringify(record("old-observation"));
  const store = storeFor(redis);
  await seedLocal(key, "codex", record("shared-winner"));
  redis.rejectCas = true;
  await store.delete(key, "codex");
  assert.equal(JSON.parse(redis.value!).connectionId, "shared-winner");
  redis.fail = true;
  assert.equal(await store.get(key, "codex", ttl, now + 2), null);
});

test("rejected touch does not refresh or replace the shadow", async () => {
  const key = "rejected-touch";
  const redis = new FakeRedis();
  const store = storeFor(redis);
  await seedLocal(key, "codex", record("shared-winner"));
  redis.rejectCas = true;
  await store.touch(key, "codex", now + 1, ttl);
  assert.equal(await shadow(key), null);
});

test("successful upsert removes local fallback; Redis preserves shared history; delete removes fallback", async () => {
  const key = "successful-mutations";
  const redis = new FakeRedis();
  const store = storeFor(redis);
  await local.upsert(key, "codex", "different-local-history", now - 500, ttl);
  await store.upsert(key, "codex", "caller", now + 1, ttl, "b".repeat(64));
  assert.equal(await shadow(key), null);
  assert.equal(JSON.parse(redis.value!).createdAt, record("shared-winner").createdAt);
  seedLocal(key, "codex", record("outage-local"));
  await store.delete(key, "codex");
  assert.equal(redis.value, null);
  assert.equal(await shadow(key), null);
});

test("successful touch removes local fallback; a shared miss leaves an outage decision alone", async () => {
  const key = "successful-touch";
  const redis = new FakeRedis();
  const store = storeFor(redis);
  seedLocal(key, "codex", record("outage-local"));
  await store.touch(key, "codex", now + 1, ttl);
  assert.equal(await shadow(key), null);
  assert.equal(JSON.parse(redis.value!).lastUsedAt, new Date(now + 1).toISOString());
  seedLocal(key, "codex", record("outage-local"));
  redis.value = null;
  await store.touch(key, "codex", now + 2, ttl);
  assert.equal(await shadow(key), null);
});

for (const operation of ["upsert", "touch", "delete"] as const) {
  for (const failure of ["error", "timeout"] as const) {
    test(`${operation} ${failure} falls back locally; late success cannot overwrite a newer shadow`, async () => {
      const key = `${operation}-${failure}`;
      const redis = new FakeRedis();
      const store = storeFor(redis);
      await seedLocal(key, "codex", record("shared-winner"));
      redis.evalFailure = failure === "error";
      redis.deferEval = failure === "timeout";
      const started = performance.now();
      if (operation === "upsert") await store.upsert(key, "codex", "caller", now + 1, ttl);
      else if (operation === "touch") await store.touch(key, "codex", now + 1, ttl);
      else await store.delete(key, "codex");
      assert.ok(performance.now() - started < SESSION_AFFINITY_REDIS_TIMEOUT_MS + 500);
      // touch cannot refresh the stale row cleared by the successful initial read.
      if (operation !== "upsert") assert.equal(await shadow(key), null);
      else {
        const value = await shadow(key);
        assert.equal(value?.connectionId, "caller");
        assert.equal(value?.lastUsedAt, new Date(now + 1).toISOString());
      }
      redis.fail = true;
      assert.deepEqual(await store.get(key, "codex", ttl, now + 2), await shadow(key));
      await local.upsert(key, "codex", "newer-shadow", now + 2, ttl);
      const newer = await shadow(key);
      if (failure === "timeout") {
        assert.ok(redis.release, "EVAL was sent before the deadline");
        redis.release();
        await new Promise((resolve) => setImmediate(resolve));
        assert.deepEqual(await shadow(key), newer);
      }
    });
  }
}

for (const operation of ["upsert", "touch", "delete"] as const) {
  test(`${operation} clears the shadow after the initial read while EVAL is pending`, async () => {
    const key = `pending-${operation}`;
    const redis = new FakeRedis();
    const store = storeFor(redis);
    await seedLocal(key, "codex", record("shared-winner"));
    redis.deferEval = true;
    const pending =
      operation === "upsert"
        ? store.upsert(key, "codex", "caller", now + 1, ttl)
        : operation === "touch"
          ? store.touch(key, "codex", now + 1, ttl)
          : store.delete(key, "codex");
    try {
      await new Promise((resolve) => setImmediate(resolve));
      assert.ok(redis.release);
      assert.equal(await shadow(key), null, "the initial Redis read already cleared local state");
    } finally {
      redis.release?.();
      await pending;
    }
    assert.equal(
      await shadow(key),
      null,
      "successful shared mutation removes, never installs, local state"
    );
  });
}

for (const localConnection of ["failed-account", "healthy-account"]) {
  test(`guarded eviction during rejected CAS is safe for ${localConnection}`, async () => {
    const key = `evict-${localConnection}`;
    const redis = new FakeRedis();
    redis.value = JSON.stringify(record("failed-account"));
    const store = storeFor(redis);
    await seedLocal(key, "codex", record(localConnection));
    redis.rejectCas = true;
    assert.equal(
      await store.evict(key, "codex", "failed-account"),
      localConnection === "failed-account"
    );
    assert.equal(JSON.parse(redis.value!).connectionId, "shared-winner");
    redis.fail = true;
    assert.equal((await store.get(key, "codex", ttl, now + 2))?.connectionId ?? null, null);
  });
}
