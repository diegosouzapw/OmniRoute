/**
 * Tests for getCircuitBreakerStore() factory routing:
 *   - REDIS_URL set + reachable → RedisCircuitBreakerStore
 *   - REDIS_URL set + unreachable → SqliteCircuitBreakerStore (fallback)
 *   - REDIS_URL unset → SqliteCircuitBreakerStore
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import net from "node:net";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-warmup-factory-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../../src/lib/db/core.ts");

async function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetDb();
  delete process.env.REDIS_URL;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("REDIS_URL unset → SqliteCircuitBreakerStore", async () => {
  const { getCircuitBreakerStore, __resetCircuitBreakerFactory } =
    await import("../../../../src/lib/warmupScheduler/circuitBreakerFactory.ts");
  __resetCircuitBreakerFactory();
  delete process.env.REDIS_URL;
  const store = await getCircuitBreakerStore();
  assert.ok(store.constructor.name.includes("Sqlite"), `got ${store.constructor.name}`);
});

/**
 * A Redis that answers the handshake and then dies on the first real command.
 * Enough RESP to get ioredis to `connected`, which is the state the factory
 * caches -- an unreachable port only exercises the connect-time fallback, not
 * the far more likely case of Redis going away after we already cached it.
 */
function startFlakyRedis(): Promise<{ port: number; close: () => void }> {
  return new Promise((resolve) => {
    const server = net.createServer((socket) => {
      socket.on("data", (buf) => {
        const cmd = buf.toString().toLowerCase();
        if (cmd.includes("hgetall") || cmd.includes("hset") || cmd.includes("hget")) {
          socket.destroy(); // the outage: connection drops mid-command
          return;
        }
        if (cmd.includes("info")) {
          const body = "redis_version:7.0.0\r\n";
          socket.write(`$${body.length}\r\n${body}\r\n`);
          return;
        }
        socket.write("+PONG\r\n");
      });
      socket.on("error", () => {});
    });
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as { port: number };
      resolve({ port, close: () => server.close() });
    });
  });
}

test("a Redis failure after caching drops the cached store instead of serving it forever", async () => {
  const { getCircuitBreakerStore, __resetCircuitBreakerFactory } =
    await import("../../../../src/lib/warmupScheduler/circuitBreakerFactory.ts");
  const redis = await startFlakyRedis();
  try {
    __resetCircuitBreakerFactory();
    process.env.REDIS_URL = `redis://127.0.0.1:${redis.port}`;

    const first = await getCircuitBreakerStore();
    assert.ok(
      first.constructor.name.includes("Redis"),
      `handshake should yield a Redis-backed store, got ${first.constructor.name}`
    );

    // The outage. The call that hits it still fails -- that run is lost.
    await assert.rejects(() => first.get("conn-1"));

    // The point of the fix: the next call must NOT hand back the dead client.
    process.env.REDIS_URL = "redis://127.0.0.1:1"; // Redis is gone now
    const second = await getCircuitBreakerStore();
    assert.ok(
      second.constructor.name.includes("Sqlite"),
      `expected re-probe to fall back to Sqlite, got ${second.constructor.name}`
    );
  } finally {
    delete process.env.REDIS_URL;
    redis.close();
    __resetCircuitBreakerFactory();
  }
});

test("REDIS_URL set + unreachable → falls back to SqliteCircuitBreakerStore", async () => {
  const { getCircuitBreakerStore, __resetCircuitBreakerFactory } =
    await import("../../../../src/lib/warmupScheduler/circuitBreakerFactory.ts");
  __resetCircuitBreakerFactory();
  process.env.REDIS_URL = "redis://127.0.0.1:1"; // non-listening port → connect timeout
  const store = await getCircuitBreakerStore();
  assert.ok(
    store.constructor.name.includes("Sqlite"),
    `expected Sqlite fallback, got ${store.constructor.name}`
  );
  delete process.env.REDIS_URL;
});
