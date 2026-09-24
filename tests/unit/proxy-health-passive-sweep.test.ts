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
import net from "node:net";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-passive-sweep-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
process.env.PROXY_HEALTH_TEST_STAGGER_MS = "0";
process.env.PROXY_HEALTH_TEST_URL = "http://127.0.0.1:1/probe";
delete process.env.PROXY_AUTO_REMOVE;
delete process.env.PROXY_AUTO_DISABLE;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const scheduler = await import("../../src/lib/proxyHealth/scheduler.ts");

test.after(() => {
  scheduler.__setPassiveVerdictReaderForTesting(null);
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

test("degraded verdict skips the probe and is counted apart", async () => {
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
