/**
 * Default-path recovery: with no injected probe, `runRecoveryPass`
 * resolves the ledger key through the real registry and the real sweep probe.
 * A local relay first answers 429 (sweep records the ledger entry), then 200
 * (recovery pass re-tests through the same proxy and recovers it). No
 * outbound traffic; the flag gate is on for this file only.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-recovery-default-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
process.env.PROXY_HEALTH_RECOVERY_ENABLED = "true";
process.env.PROXY_HEALTH_TEST_STAGGER_MS = "0";

let mode: "refuse" | "serve" = "refuse";
const target = http.createServer((_req, res) => {
  if (mode === "refuse") {
    res.writeHead(429);
    res.end();
  } else {
    res.writeHead(200);
    res.end("ok");
  }
});
await new Promise<void>((resolve) => target.listen(0, "127.0.0.1", () => resolve()));
const targetPort = (target.address() as net.AddressInfo).port;
process.env.PROXY_HEALTH_TEST_URL = `http://127.0.0.1:${targetPort}/probe`;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const scheduler = await import("../../src/lib/proxyHealth/scheduler.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const { proxyEgressKey } = await import("../../open-sse/utils/proxyRefusalMemory.ts");

test.after(async () => {
  delete process.env.PROXY_HEALTH_RECOVERY_ENABLED;
  await new Promise<void>((resolve) => target.close(() => resolve()));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.afterEach(() => {
  memory.__resetProxyRefusalMemoryForTesting();
  scheduler.__resetRecoveryLedgerForTesting();
  mode = "refuse";
});

function startRelay(port: number): Promise<http.Server> {
  const relay = http.createServer((req, res) => {
    const upstream = http.request(
      { host: "127.0.0.1", port: targetPort, method: req.method, path: "/probe" },
      (answer) => {
        res.writeHead(answer.statusCode ?? 502);
        answer.pipe(res);
      }
    );
    upstream.on("error", () => res.destroy());
    req.pipe(upstream);
  });
  relay.on("connect", (_req, client, head) => {
    const socket = net.connect(targetPort, "127.0.0.1", () => {
      client.write("HTTP/1.1 200 Connection Established\r\n\r\n");
      socket.write(head);
      socket.pipe(client);
      client.pipe(socket);
    });
    socket.on("error", () => client.destroy());
    client.on("error", () => socket.destroy());
  });
  return new Promise((resolve) => relay.listen(port, "127.0.0.1", () => resolve(relay)));
}

async function freePort(): Promise<number> {
  const probe = net.createServer();
  await new Promise<void>((resolve) => probe.listen(0, "127.0.0.1", () => resolve()));
  const { port } = probe.address() as net.AddressInfo;
  await new Promise<void>((resolve) => probe.close(() => resolve()));
  return port;
}

test("default path: sweep-observed 429 is re-tested and recovered, no injected probe", async () => {
  const port = await freePort();
  const created = await proxiesDb.createProxy({
    name: `recovery ${port}`,
    type: "http",
    host: "127.0.0.1",
    port,
  });
  const relay = await startRelay(port);
  try {
    // Phase 1: target refuses → sweep records the ledger entry for this key.
    await scheduler.forceProxyHealthSweep();
    const key = proxyEgressKey({ type: "http", host: "127.0.0.1", port });
    assert.ok(key !== null);
    assert.equal(scheduler.__recoveryLedgerSizeForTesting(), 1);
    // The key is set aside in shared memory, as the hot path would hold it.
    memory.noteProxyRefusal(key, "ip_quota_429");
    assert.equal(memory.isProxyAvoided(key), true);
    // Phase 2: target serves → default probe re-tests through the same proxy.
    mode = "serve";
    const result = await scheduler.runRecoveryPass(
      undefined,
      undefined,
      { maxCandidates: 10, durationMs: 60_000, concurrency: 2 },
      process.env
    );
    assert.equal(result.planned, 1);
    assert.equal(result.recovered, 1);
    assert.equal(memory.isProxyAvoided(key), false);
  } finally {
    relay.closeAllConnections();
    await new Promise<void>((resolve) => relay.close(() => resolve()));
    if (created) await proxiesDb.deleteProxyById(created.id, { force: true });
  }
});
