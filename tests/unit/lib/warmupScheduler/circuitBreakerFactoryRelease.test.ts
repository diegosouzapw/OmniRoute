/**
 * getCircuitBreakerStore() must release the ioredis client it built when the
 * probe fails partway through, not only when the probe succeeds.
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

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-warmup-release-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/**
 * A Redis that finishes the handshake and then refuses PING, so the probe fails
 * at a point where a live client already exists -- the only way to observe
 * whether that client gets released. Closure is reported from the server side,
 * since the client itself is private to the factory.
 *
 * INFO is answered for real. Refusing it too leaves ioredis waiting on a
 * ready-check that `connectTimeout` does not bound.
 */
function startProbeRefusingRedis(): Promise<{
  port: number;
  socketClosed: () => boolean;
  close: () => void;
}> {
  return new Promise((resolve) => {
    let closed = false;
    const server = net.createServer((socket) => {
      socket.on("close", () => {
        closed = true;
      });
      socket.on("error", () => {});
      socket.on("data", (buf) => {
        if (buf.toString().toLowerCase().includes("info")) {
          const body = "redis_version:7.0.0\r\n";
          socket.write(`$${body.length}\r\n${body}\r\n`);
          return;
        }
        socket.write("-ERR probe refused\r\n");
      });
    });
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as { port: number };
      resolve({ port, socketClosed: () => closed, close: () => server.close() });
    });
  });
}

async function waitUntil(cond: () => boolean, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (!cond() && Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 20));
  }
}

test("a probe that fails after connecting still releases the Redis client", async () => {
  const { getCircuitBreakerStore, __resetCircuitBreakerFactory } =
    await import("../../../../src/lib/warmupScheduler/circuitBreakerFactory.ts");
  const redis = await startProbeRefusingRedis();
  try {
    __resetCircuitBreakerFactory();
    process.env.REDIS_URL = `redis://127.0.0.1:${redis.port}`;

    const store = await getCircuitBreakerStore();
    assert.ok(
      store.constructor.name.includes("Sqlite"),
      `a refused probe should fall back, got ${store.constructor.name}`
    );

    // The client existed by the time the probe threw, so somebody has to close
    // it. Left open, its socket keeps the event loop alive.
    await waitUntil(() => redis.socketClosed(), 2000);
    assert.ok(redis.socketClosed(), "the failed probe leaked its Redis socket");
  } finally {
    delete process.env.REDIS_URL;
    redis.close();
    __resetCircuitBreakerFactory();
  }
});
