/**
 * The proxy-health sweep logs an anonymous egress-sharing
 * summary line, computed from persisted proxy_logs (#10677) — no IP literals, no
 * account identities (PROXY_LOG_INCLUDE_IPS is the only raw-detail opt-in,
 * #10348). Console output is captured to prove the real sweep() emits it.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-egress-line-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
delete process.env.PROXY_LOG_INCLUDE_IPS;

const core = await import("../../src/lib/db/core.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { forceProxyHealthSweep, formatEgressSharingSummaryLine } =
  (await import("../../src/lib/proxyHealth/scheduler.ts")) as unknown as {
    forceProxyHealthSweep: () => Promise<void>;
    formatEgressSharingSummaryLine: (
      summary: EgressSharingSummary,
      warnings: Array<{ egressIp: string; rotationGroup: string; connections: string[] }>,
      includeDetails: boolean
    ) => string;
  };
import type { EgressSharingSummary } from "../../src/lib/proxyEgress.ts";

function resetStorage() {
  core.resetDbInstance();
  proxyLogger.clearProxyLogs();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.PROXY_LOG_INCLUDE_IPS;
});

test("formatEgressSharingSummaryLine is anonymous by default and raw when opted in", () => {
  const summary: EgressSharingSummary = {
    windowStart: "2026-08-20T00:00:00.000Z",
    windowEnd: "2026-08-21T00:00:00.000Z",
    distinctEgressIps: 1,
    sharingByRotationGroup: [
      { rotationGroup: "openai-auth0", sharedIps: 1, maxAccountsSharingOneIp: 2 },
    ],
    maxAccountsSharingOneIp: 2,
  };
  const warnings = [
    { egressIp: "100.115.194.84", rotationGroup: "openai-auth0", connections: ["a", "b"] },
  ];

  const anonymous = formatEgressSharingSummaryLine(summary, warnings, false);
  assert.equal(
    anonymous,
    "[ProxyHealth] egress: 1 rotation group(s) share an egress IP (max 2 accounts)"
  );
  assert.ok(!anonymous.includes("100.115.194.84"), "no IP without opt-in");

  const raw = formatEgressSharingSummaryLine(summary, warnings, true);
  assert.ok(raw.includes("100.115.194.84"), "raw IP only with PROXY_LOG_INCLUDE_IPS");
});

test("forceProxyHealthSweep logs the anonymous egress line when accounts share an IP", async () => {
  resetStorage();

  await proxiesDb.createProxy({
    name: "Dead Local Proxy",
    type: "http",
    host: "127.0.0.1",
    port: 1, // nothing listens — immediate ECONNREFUSED, no outbound traffic
  });

  // Two codex accounts on one egress IP, persisted (the sweep reads the DB).
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "codex",
    targetUrl: "codex/gpt-5.5",
    egressIp: "100.115.194.84",
    account: "acc-a",
    connectionId: "conn-a",
  });
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "codex",
    targetUrl: "codex/gpt-5.5",
    egressIp: "100.115.194.84",
    account: "acc-b",
    connectionId: "conn-b",
  });
  proxyLogger.flushProxyLogsSync(); // persist the enqueued batch before the sweep reads the DB

  const logs: string[] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => {
    logs.push(args.join(" "));
  };
  try {
    await forceProxyHealthSweep();
  } finally {
    console.log = originalLog;
  }

  const line = logs.find((l) => l.includes("[ProxyHealth] egress:"));
  assert.ok(line, "sweep must log the egress summary line");
  assert.ok(line!.includes("rotation group(s) share an egress IP (max 2 accounts)"), line!);
  assert.ok(!line!.includes("100.115.194.84"), "no IP literal in the default sweep line");
  assert.ok(!line!.includes("acc-a"), "no account identity in the default sweep line");
});

test("forceProxyHealthSweep logs raw details only with PROXY_LOG_INCLUDE_IPS=true", async () => {
  resetStorage();
  process.env.PROXY_LOG_INCLUDE_IPS = "true";

  await proxiesDb.createProxy({
    name: "Dead Local Proxy",
    type: "http",
    host: "127.0.0.1",
    port: 1,
  });
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "codex",
    targetUrl: "codex/gpt-5.5",
    egressIp: "100.115.194.84",
    account: "acc-a",
    connectionId: "conn-a",
  });
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "codex",
    targetUrl: "codex/gpt-5.5",
    egressIp: "100.115.194.84",
    account: "acc-b",
    connectionId: "conn-b",
  });
  proxyLogger.flushProxyLogsSync(); // persist the enqueued batch before the sweep reads the DB

  const logs: string[] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => {
    logs.push(args.join(" "));
  };
  try {
    await forceProxyHealthSweep();
  } finally {
    console.log = originalLog;
  }

  const line = logs.find((l) => l.includes("[ProxyHealth] egress:"));
  assert.ok(line, "sweep must log the egress summary line");
  assert.ok(line!.includes("100.115.194.84"), "raw IP restored by the opt-in");
});
