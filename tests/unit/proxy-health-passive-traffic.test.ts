/**
 * Passive verdict end to end through the real log pipeline: production
 * traffic written via the logger, flushed to storage, then folded by the
 * real sweep reader — no verdict stub. Gate measurement: a proxy with only
 * attributed failures in the window is skipped without a probe; a proxy
 * with only transient errors is probed as before.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-passive-e2e-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
process.env.PROXY_HEALTH_TEST_STAGGER_MS = "0";
process.env.PROXY_HEALTH_TEST_URL = "http://127.0.0.1:1/probe";
process.env.PROXY_PASSIVE_WINDOW_MS = "600000";
process.env.PROXY_HEALTH_PASSIVE_SKIP = "true";
delete process.env.PROXY_AUTO_REMOVE;
delete process.env.PROXY_AUTO_DISABLE;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const scheduler = await import("../../src/lib/proxyHealth/scheduler.ts");

test.after(() => {
  delete process.env.PROXY_HEALTH_PASSIVE_SKIP;
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

test("consecutive attributed production failures skip the probe (gate: dead proxy with no traffic signal)", async () => {
  const port = await freePort();
  const created = await proxiesDb.createProxy({
    name: "passive-e2e",
    type: "http",
    host: "127.0.0.1",
    port,
  });
  try {
    for (let i = 0; i < 3; i++) {
      proxyLogger.logProxyEvent({
        status: "error",
        proxy: { type: "http", host: "127.0.0.1", port },
        provider: "acme",
        error: "connect ECONNREFUSED 127.0.0.1",
      });
    }
    proxyLogger.flushProxyLogsSync();
    const summary = await sweepCapturingSummary();
    assert.match(summary, /0 tested/);
    assert.match(summary, /passive-skipped \(recent failure\)/);
  } finally {
    await proxiesDb.deleteProxyById(created!.id, { force: true });
  }
});

test("transient production errors keep the probe (ECONNRESET is neutral)", async () => {
  const port = await freePort();
  const created = await proxiesDb.createProxy({
    name: "passive-e2e-neutral",
    type: "http",
    host: "127.0.0.1",
    port,
  });
  try {
    for (let i = 0; i < 3; i++) {
      proxyLogger.logProxyEvent({
        status: "error",
        proxy: { type: "http", host: "127.0.0.1", port },
        provider: "acme",
        error: "read ECONNRESET",
      });
    }
    proxyLogger.flushProxyLogsSync();
    const summary = await sweepCapturingSummary();
    assert.match(summary, /1 tested/);
    assert.ok(!summary.includes("passive-skipped"), `no passive skip, got: ${summary}`);
  } finally {
    await proxiesDb.deleteProxyById(created!.id, { force: true });
  }
});

test("success for one provider never skips the probe others need (cross-provider guard)", async () => {
  const port = await freePort();
  const created = await proxiesDb.createProxy({
    name: "passive-e2e-cross",
    type: "http",
    host: "127.0.0.1",
    port,
  });
  try {
    proxyLogger.logProxyEvent({
      status: "success",
      proxy: { type: "http", host: "127.0.0.1", port },
      provider: "provider-a",
    });
    proxyLogger.logProxyEvent({
      status: "success",
      proxy: { type: "http", host: "127.0.0.1", port },
      provider: "provider-b",
    });
    proxyLogger.flushProxyLogsSync();
    const summary = await sweepCapturingSummary();
    assert.match(summary, /1 tested/);
    assert.ok(!summary.includes("passive-skipped"), `no passive skip, got: ${summary}`);
  } finally {
    await proxiesDb.deleteProxyById(created!.id, { force: true });
  }
});

test("single-provider success skips the redundant probe", async () => {
  const port = await freePort();
  const created = await proxiesDb.createProxy({
    name: "passive-e2e-single",
    type: "http",
    host: "127.0.0.1",
    port,
  });
  try {
    proxyLogger.logProxyEvent({
      status: "success",
      proxy: { type: "http", host: "127.0.0.1", port },
      provider: "provider-a",
    });
    proxyLogger.flushProxyLogsSync();
    const summary = await sweepCapturingSummary();
    assert.match(summary, /0 tested/);
    assert.match(summary, /passive-skipped \(recent success\)/);
  } finally {
    await proxiesDb.deleteProxyById(created!.id, { force: true });
  }
});

test("flag off probes everything despite attributed production failures", async () => {
  delete process.env.PROXY_HEALTH_PASSIVE_SKIP;
  const port = await freePort();
  const created = await proxiesDb.createProxy({
    name: "passive-e2e-off",
    type: "http",
    host: "127.0.0.1",
    port,
  });
  try {
    for (let i = 0; i < 3; i++) {
      proxyLogger.logProxyEvent({
        status: "error",
        proxy: { type: "http", host: "127.0.0.1", port },
        provider: "acme",
        error: "connect ECONNREFUSED 127.0.0.1",
      });
    }
    proxyLogger.flushProxyLogsSync();
    const summary = await sweepCapturingSummary();
    assert.match(summary, /1 tested/);
    assert.ok(!summary.includes("passive-skipped"), `no passive skip, got: ${summary}`);
  } finally {
    process.env.PROXY_HEALTH_PASSIVE_SKIP = "true";
    await proxiesDb.deleteProxyById(created!.id, { force: true });
  }
});
