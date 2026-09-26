/**
 * Passive verdict consumed by the sweep: scheduling only, never a status.
 * A degraded endpoint (recent attributed production failure) is skipped
 * without a live probe; a healthy endpoint skips the redundant probe. Counts
 * stay out of `tested`. RED-then-GREEN: with the stub neutralized (unknown),
 * proxies are probed again.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-passive-sweep-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
process.env.PROXY_HEALTH_TEST_STAGGER_MS = "0";

// The probe target: answers every request, so any peer that relays through
// the forward proxy below proves the target alive for the whole sweep.
// Created and wired BEFORE the scheduler import: the scheduler resolves the
// probe target once at module load, so the env override must precede it.
const target = http.createServer((_req, res) => {
  res.writeHead(200);
  res.end("{}");
});
await new Promise<void>((resolve) => target.listen(0, "127.0.0.1", () => resolve()));
const targetPort = (target.address() as net.AddressInfo).port;
process.env.PROXY_HEALTH_TEST_URL = `http://127.0.0.1:${targetPort}/probe`;
process.env.PROXY_HEALTH_USE_PROVIDER_TARGET = "false";
delete process.env.PROXY_AUTO_REMOVE;
delete process.env.PROXY_AUTO_DISABLE;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const scheduler = await import("../../src/lib/proxyHealth/scheduler.ts");

test.after(async () => {
  scheduler.__setPassiveVerdictReaderForTesting(null);
  delete process.env.PROXY_HEALTH_PASSIVE_SKIP;
  await new Promise<void>((resolve) => target.close(() => resolve()));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function freePort(): Promise<number> {
  const probe = net.createServer();
  await new Promise<void>((resolve) => probe.listen(0, "127.0.0.1", () => resolve()));
  const { port } = probe.address() as net.AddressInfo;
  await new Promise<void>((resolve) => probe.close(() => resolve()));
  return port;
}

async function seedProxy(): Promise<string> {
  const created = await proxiesDb.createProxy({
    name: `passive ${Date.now()}`,
    type: "http",
    host: "127.0.0.1",
    port: await freePort(),
  });
  return created!.id;
}

async function sweepCapturingSummary(): Promise<string> {
  const lines: string[] = [];
  const original = console.log;
  console.log = (...args: unknown[]) => {
    lines.push(args.map(String).join(" "));
  };
  try {
    await scheduler.forceProxyHealthSweep();
  } finally {
    console.log = original;
  }
  return lines.find((line) => line.includes("Sweep complete")) ?? "";
}

// A minimal forward proxy: absolute-form requests and CONNECT tunnels both
// reach the answering target above. Tunnel sockets are detached from the
// server, so they are tracked and destroyed on stop.
const tunnelSockets = new Set<net.Socket>();

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
    tunnelSockets.add(client as net.Socket);
    const socket = net.connect(targetPort, "127.0.0.1", () => {
      client.write("HTTP/1.1 200 Connection Established\r\n\r\n");
      socket.write(head);
      socket.pipe(client);
      client.pipe(socket);
    });
    tunnelSockets.add(socket);
    socket.on("error", () => client.destroy());
    client.on("error", () => socket.destroy());
  });
  return new Promise((resolve) => relay.listen(port, "127.0.0.1", () => resolve(relay)));
}

function stopRelay(relay: http.Server): Promise<void> {
  for (const socket of tunnelSockets) socket.destroy();
  tunnelSockets.clear();
  relay.closeAllConnections();
  return new Promise((resolve) => relay.close(() => resolve()));
}

test("degraded verdict skips the probe and is counted apart", async () => {
  process.env.PROXY_HEALTH_PASSIVE_SKIP = "true";
  const id = await seedProxy();
  try {
    scheduler.__setPassiveVerdictReaderForTesting(() => "degraded");
    const summary = await sweepCapturingSummary();
    assert.match(summary, /0 tested/);
    assert.match(summary, /passive-skipped \(recent failure\)/);
  } finally {
    scheduler.__setPassiveVerdictReaderForTesting(null);
    await proxiesDb.deleteProxyById(id, { force: true });
  }
});

test("healthy verdict skips the redundant probe", async () => {
  process.env.PROXY_HEALTH_PASSIVE_SKIP = "true";
  const id = await seedProxy();
  try {
    scheduler.__setPassiveVerdictReaderForTesting(() => "healthy");
    const summary = await sweepCapturingSummary();
    assert.match(summary, /0 tested/);
    assert.match(summary, /passive-skipped \(recent success\)/);
  } finally {
    scheduler.__setPassiveVerdictReaderForTesting(null);
    await proxiesDb.deleteProxyById(id, { force: true });
  }
});

test("unknown verdict probes as before (RED without the stub)", async () => {
  process.env.PROXY_HEALTH_PASSIVE_SKIP = "true";
  const id = await seedProxy();
  try {
    scheduler.__setPassiveVerdictReaderForTesting(() => "unknown");
    const summary = await sweepCapturingSummary();
    assert.match(summary, /1 tested/);
    assert.ok(!summary.includes("passive-skipped"), `no passive skip, got: ${summary}`);
  } finally {
    scheduler.__setPassiveVerdictReaderForTesting(null);
    await proxiesDb.deleteProxyById(id, { force: true });
  }
});

test("flag off probes every proxy even with a degraded stub", async () => {
  delete process.env.PROXY_HEALTH_PASSIVE_SKIP;
  const id = await seedProxy();
  try {
    scheduler.__setPassiveVerdictReaderForTesting(() => "degraded");
    const summary = await sweepCapturingSummary();
    assert.match(summary, /1 tested/);
    assert.ok(!summary.includes("passive-skipped"), `no passive skip, got: ${summary}`);
  } finally {
    scheduler.__setPassiveVerdictReaderForTesting(null);
    await proxiesDb.deleteProxyById(id, { force: true });
  }
});

test("skip beside a promoted peer keeps the cross-proxy promotion", async () => {
  // Pure decision-level proof that the partition preserves the tip
  // behavior: one answering peer (ok/200) proves the target alive, one
  // status-less inconclusive peer on the same target is promoted to fail,
  // and the passive skip lives outside that decision input entirely.
  // The sweep-level test below then proves the skip is counted apart.
  const decision = await import("../../src/lib/proxyHealth/decision.ts");
  const tipTarget = `http://127.0.0.1:${targetPort}/probe`;
  const evidenced = decision.applyCrossProbeEvidence(
    [
      { outcome: "ok", status: 200, target: tipTarget },
      { outcome: "inconclusive", status: null, target: tipTarget },
    ],
    new Map()
  );
  assert.equal(evidenced[0].outcome, "ok");
  assert.equal(evidenced[1].outcome, "fail");
});

test("skip beside a live peer is counted apart and keeps its row", async () => {
  // One answering peer (relay to the 200 target) is probed live while one
  // endpoint skipped by the passive verdict stays out of the decision: the
  // skip is scheduling-only (counted apart, registry row kept, no status).
  // relays through it. The scheduler resolves TEST_URL once at module load,
  // so this file wires the answering target before the scheduler import
  // (top of file); nothing to override per test.
  process.env.PROXY_HEALTH_PASSIVE_SKIP = "true";
  const relayPort = await freePort();
  const relay = await startRelay(relayPort);
  const relayProxy = await proxiesDb.createProxy({
    name: `passive-promoted-relay ${Date.now()}`,
    type: "http",
    host: "127.0.0.1",
    port: relayPort,
  });
  const skippedProxy = await proxiesDb.createProxy({
    name: `passive-promoted-skipped ${Date.now()}`,
    type: "http",
    host: "127.0.0.1",
    port: await freePort(),
  });
  try {
    scheduler.__resetTargetEvidenceForTesting();
    scheduler.__setPassiveVerdictReaderForTesting((id) =>
      id === skippedProxy!.id ? "degraded" : "unknown"
    );
    const summary = await sweepCapturingSummary();
    assert.match(summary, /1 tested, 1 alive/);
    assert.match(summary, /0 promoted/);
    assert.match(summary, /1 passive-skipped \(recent failure\)/);
    assert.equal(
      (await proxiesDb.getProxyById(skippedProxy!.id, { includeSecrets: false })) !== null,
      true,
      "skipped endpoint keeps its registry row"
    );
  } finally {
    scheduler.__setPassiveVerdictReaderForTesting(null);
    await stopRelay(relay);
    await proxiesDb.deleteProxyById(relayProxy!.id, { force: true });
    await proxiesDb.deleteProxyById(skippedProxy!.id, { force: true });
  }
});
