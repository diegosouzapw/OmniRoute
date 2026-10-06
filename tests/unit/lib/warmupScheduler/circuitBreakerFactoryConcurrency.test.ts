/**
 * getCircuitBreakerStore() must serialise concurrent probes, so two callers
 * that arrive before the cache is warm do not each build a Redis client.
 *
 * One ioredis case per file, and this is the whole reason: a client left behind
 * by an earlier case in the same process wedges every later connect, so a second
 * one here hangs rather than fails. Measured both ways round -- reordering does
 * not help, only a fresh process does, and `node:test` gives each file one.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import net from "node:net";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-warmup-concurrency-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/**
 * A Redis that behaves. Counts accepted connections so a test can tell one
 * probe from two.
 */
function startCountingRedis(): Promise<{
  port: number;
  connections: () => number;
  close: () => void;
}> {
  return new Promise((resolve) => {
    let n = 0;
    const server = net.createServer((socket) => {
      n += 1;
      socket.on("error", () => {});
      socket.on("data", (buf) => {
        if (buf.toString().toLowerCase().includes("info")) {
          const body = "redis_version:7.0.0\r\n";
          socket.write(`$${body.length}\r\n${body}\r\n`);
          return;
        }
        socket.write("+PONG\r\n");
      });
    });
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as { port: number };
      resolve({ port, connections: () => n, close: () => server.close() });
    });
  });
}

test("concurrent callers share one probe instead of each opening a Redis client", async () => {
  const { getCircuitBreakerStore, __resetCircuitBreakerFactory } =
    await import("../../../../src/lib/warmupScheduler/circuitBreakerFactory.ts");
  const redis = await startCountingRedis();
  try {
    __resetCircuitBreakerFactory();
    process.env.REDIS_URL = `redis://127.0.0.1:${redis.port}`;

    // Started together, on purpose: neither has awaited, so both see an empty
    // cache. This is the shape a warmup cycle takes when a tick overruns and
    // the next one starts while it is still going.
    const [a, b] = await Promise.all([getCircuitBreakerStore(), getCircuitBreakerStore()]);

    assert.strictEqual(a, b, "both callers should get the same store instance");
    assert.equal(
      redis.connections(),
      1,
      `a second probe opened a Redis client nobody can close (${redis.connections()} connections)`
    );
  } finally {
    delete process.env.REDIS_URL;
    redis.close();
    __resetCircuitBreakerFactory();
  }
});
