import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-logger-client-ip-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");

function resetStorage() {
  proxyLogger.clearProxyLogs();
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  resetStorage();
});

test("proxy logs expose the forwarded address as clientIp", () => {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "codex",
    targetUrl: "codex/gpt-5.5",
    clientIp: "127.0.0.1",
  });

  const [log] = proxyLogger.getProxyLogs({ search: "127.0.0.1" });

  assert.equal(log.clientIp, "127.0.0.1");
  assert.equal(Object.hasOwn(log, "publicIp"), false);
});

test("legacy publicIp input maps to clientIp", () => {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "openrouter",
    publicIp: "203.0.113.10",
  });

  const [log] = proxyLogger.getProxyLogs();

  assert.equal(log.clientIp, "203.0.113.10");
  assert.equal(Object.hasOwn(log, "publicIp"), false);
});
