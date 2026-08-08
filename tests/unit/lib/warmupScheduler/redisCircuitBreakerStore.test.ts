/**
 * Tests for RedisCircuitBreakerStore using a lightweight in-memory mock that
 * implements the RedisLike surface (hgetall/hset/hget/expire/persist).
 */

import test from "node:test";
import assert from "node:assert/strict";
import { RedisCircuitBreakerStore } from "../../../../src/lib/warmupScheduler/redisCircuitBreakerStore.ts";
import {
  getConnectionRuntimeState,
  upsertWarmupState,
} from "../../../../src/lib/db/connectionRuntimeState.ts";
import { resetDbInstance } from "../../../../src/lib/db/core.ts";

function makeMockRedis() {
  const store = new Map<string, Map<string, string>>();
  return {
    _store: store,
    redis: {
      async hgetall(key: string) {
        const entry = store.get(key);
        if (!entry) return {};
        return Object.fromEntries(entry);
      },
      async hset(key: string, ...args: (string | number)[]) {
        if (!store.has(key)) store.set(key, new Map());
        const entry = store.get(key)!;
        if (args.length === 1 && typeof args[0] === "object") {
          for (const [k, v] of Object.entries(args[0])) entry.set(k, String(v));
        } else {
          for (let i = 0; i < args.length; i += 2) entry.set(args[i], String(args[i + 1]));
        }
        return "OK";
      },
      async hget(key: string, field: string) {
        return store.get(key)?.get(field) ?? null;
      },
      async expire(key: string, seconds: number) {
        return 1;
      },
      async persist(key: string) {
        return 1;
      },
    } as {
      hgetall(k: string): Promise<Record<string, string>>;
      hset(k: string, ...a: (string | number)[]): Promise<string>;
      hget(k: string, f: string): Promise<string | null>;
      expire(k: string, s: number): Promise<number>;
      persist(k: string): Promise<number>;
    },
  };
}

test("recordResult(success): clears streak and until", async () => {
  const mock = makeMockRedis();
  const store = new RedisCircuitBreakerStore(mock.redis);
  await store.recordResult("c1", {
    success: false,
    tokensUsed: 0,
    durationMs: 1,
    failureKind: "network",
  });
  await store.recordResult("c1", { success: true, tokensUsed: 4, durationMs: 5 });
  const state = await store.get("c1");
  assert.equal(state?.streak, 0);
  assert.equal(state?.lastResult, "success");
  assert.ok(state?.lastWarmupAt, "success should set lastWarmupAt");
  assert.equal(await store.isInBackoff("c1"), false);
});

test("recordResult(forbidden): sets lastResult=forbidden and PERSISTs", async () => {
  const mock = makeMockRedis();
  const store = new RedisCircuitBreakerStore(mock.redis);
  await store.recordResult("c1", {
    success: false,
    tokensUsed: 0,
    durationMs: 1,
    failureKind: "forbidden",
  });
  const state = await store.get("c1");
  assert.equal(state?.lastResult, "forbidden");
  assert.ok(state?.lastFailAt, "forbidden should set lastFailAt");
});

test("recordResult(rate_limit): increments streak and sets TTL", async () => {
  const mock = makeMockRedis();
  const store = new RedisCircuitBreakerStore(mock.redis);
  await store.recordResult("c1", {
    success: false,
    tokensUsed: 0,
    durationMs: 1,
    failureKind: "rate_limit",
  });
  await store.recordResult("c1", {
    success: false,
    tokensUsed: 0,
    durationMs: 1,
    failureKind: "rate_limit",
  });
  const state = await store.get("c1");
  assert.equal(state?.streak, 2);
  assert.equal(state?.lastResult, "rate_limit");
  assert.ok(state?.until);
});

test("isInBackoff: until > now → true, absent → false", async () => {
  const mock = makeMockRedis();
  const store = new RedisCircuitBreakerStore(mock.redis);
  assert.equal(await store.isInBackoff("c1"), false);
  await store.recordResult("c1", {
    success: false,
    tokensUsed: 0,
    durationMs: 1,
    failureKind: "network",
  });
  assert.equal(await store.isInBackoff("c1"), true);
});

test("get: returns empty-state for unknown connection", async () => {
  const mock = makeMockRedis();
  const store = new RedisCircuitBreakerStore(mock.redis);
  assert.equal(await store.get("nope"), null);
});

test("recordResult(success) clears forbidden flag in SQLite backup", async () => {
  // Use isolated temp DB (same pattern as connectionRuntimeState.test.ts)
  const providersDb = await import("../../../../src/lib/db/providers.ts");
  const conn = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "forbid-test",
    email: "forbid@test.com",
    accessToken: "tok",
    refreshToken: "rt",
    isActive: false,
  });
  const connId = conn!.id;
  // Seed: simulate forbidden state in SQLite backup
  await upsertWarmupState(connId, {
    lastWarmupAt: new Date().toISOString(),
    lastResult: "forbidden",
    tokensUsed: 0,
  });
  const mock = makeMockRedis();
  const store = new RedisCircuitBreakerStore(mock.redis);
  // Set forbidden in Redis (also writes SQLite backup via markForbidden)
  await store.recordResult(connId, {
    success: false,
    tokensUsed: 0,
    durationMs: 1,
    failureKind: "forbidden",
  });
  // Now record success — should clear forbidden in SQLite backup
  await store.recordResult(connId, { success: true, tokensUsed: 4, durationMs: 5 });
  // Verify SQLite backup final state (not just "called")
  const sqliteState = getConnectionRuntimeState(connId);
  assert.equal(
    sqliteState?.lastWarmupResult,
    "success",
    "SQLite backup last_warmup_result must be 'success' after successful warmup, not stuck at 'forbidden'"
  );
});

test.beforeEach(async () => {
  // Isolate each test in its own temp DB to avoid FK/setup bleed
  const fs = await import("node:fs");
  const os = await import("node:os");
  const path = await import("node:path");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-redis-cb-"));
  process.env.DATA_DIR = tmp;
  process.env.NODE_ENV = "test";
  process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
  resetDbInstance();
});

test.after(() => {
  resetDbInstance();
});
