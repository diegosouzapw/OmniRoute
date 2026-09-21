import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The received status travels with the applied proxy: one merge at the log call site, and
// safeLogEvents forwards it to the proxy log. A locally generated 429 (no fetch) has no
// upstream status.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-merge-applied-sink-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const { withUpstreamStatus, mergeAppliedProxySink, safeLogEvents } =
  await import("../../src/sse/handlers/chatHelpers.ts");

test.beforeEach(() => {
  proxyLogger.clearProxyLogs();
});

test.after(() => {
  proxyLogger.clearProxyLogs();
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const PROXY_B = { type: "http", host: "127.0.0.1", port: 18080 };

test("withUpstreamStatus leaves the info untouched when nothing was received", () => {
  const info = { proxy: null, level: "direct", levelId: null };
  assert.strictEqual(withUpstreamStatus(info, {}), info);
  assert.strictEqual(withUpstreamStatus(null, {}), null);
});

test("withUpstreamStatus adds the received status without touching other fields", () => {
  const info = { proxy: PROXY_B, level: "account", levelId: "c1" };
  assert.deepEqual(withUpstreamStatus(info, { upstreamStatus: 429 }), {
    ...info,
    upstreamStatus: 429,
  });
  assert.deepEqual(withUpstreamStatus(null, { upstreamStatus: 502 }), { upstreamStatus: 502 });
});

test("mergeAppliedProxySink applies the executor proxy and the status together", () => {
  const merged = mergeAppliedProxySink(
    { proxy: null, level: "direct", levelId: null },
    { proxy: PROXY_B, upstreamStatus: 429 }
  );
  assert.deepEqual(merged, {
    proxy: PROXY_B,
    level: "account",
    levelId: null,
    upstreamStatus: 429,
  });
});

test("mergeAppliedProxySink after a network error on proxy B keeps B and no status", () => {
  const merged = mergeAppliedProxySink(
    { proxy: null, level: "direct", levelId: null },
    { proxy: PROXY_B, upstreamStatus: undefined }
  );
  assert.deepEqual(merged, { proxy: PROXY_B, level: "account", levelId: null });
});

test("the captured status wins over an upstreamStatus already on proxyInfo", () => {
  const merged = mergeAppliedProxySink(
    { proxy: null, level: "direct", levelId: null, upstreamStatus: 111 } as {
      proxy: unknown;
      level: string;
      levelId: string | null;
    },
    { proxy: null, upstreamStatus: 429 }
  );
  assert.equal((merged as { upstreamStatus?: number }).upstreamStatus, 429);
});

test("mergeAppliedProxySink with an empty sink returns the original proxyInfo", () => {
  const proxyInfo = { proxy: null, level: "direct", levelId: null };
  assert.strictEqual(mergeAppliedProxySink(proxyInfo, { proxy: null }), proxyInfo);
});

function logArgs(proxyInfo: unknown, status: number) {
  return {
    result: { success: false, status, error: "rate limited" },
    proxyInfo,
    proxyLatency: 5,
    provider: "openai",
    model: "gpt-5",
    sourceFormat: "openai",
    targetFormat: "openai",
    credentials: { connectionId: "conn-12345678" },
    comboName: null,
    clientRawRequest: null,
  };
}

test("safeLogEvents forwards the received status to the proxy log", async () => {
  const proxyInfo = mergeAppliedProxySink(
    { proxy: null, level: "direct", levelId: null },
    { proxy: PROXY_B, upstreamStatus: 429 }
  );
  await safeLogEvents(logArgs(proxyInfo, 429));
  const [entry] = proxyLogger.getProxyLogs();
  assert.equal(entry.upstreamStatus, 429);
  assert.equal(entry.status, "error");
});

test("a local 429 with no fetch logs a null upstream status", async () => {
  await safeLogEvents(logArgs({ proxy: PROXY_B, level: "provider", levelId: "openai" }, 429));
  const [entry] = proxyLogger.getProxyLogs();
  assert.equal(entry.upstreamStatus, null);
});
