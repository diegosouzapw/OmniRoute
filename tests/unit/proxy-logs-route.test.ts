import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-logs-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const proxyLogsRoute = await import("../../src/app/api/usage/proxy-logs/route.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  proxyLogger.clearProxyLogs();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /api/usage/proxy-logs returns filtered proxy logs", async () => {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "openai",
    level: "provider",
    proxy: { type: "http", host: "proxy.local", port: 8080 },
    targetUrl: "https://api.openai.com/v1/models",
    clientIp: "127.0.0.1",
    latencyMs: 42,
  });

  const response = await proxyLogsRoute.GET(
    new Request("http://localhost/api/usage/proxy-logs?provider=openai&status=success")
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.length, 1);
  assert.equal(body[0].provider, "openai");
  assert.equal(body[0].status, "success");
});

test("DELETE /api/usage/proxy-logs clears proxy logs", async () => {
  proxyLogger.logProxyEvent({
    status: "error",
    provider: "anthropic",
    level: "global",
    error: "proxy failed",
  });

  const deleteResponse = await proxyLogsRoute.DELETE();
  const deleteBody = await deleteResponse.json();
  const listResponse = await proxyLogsRoute.GET(
    new Request("http://localhost/api/usage/proxy-logs")
  );
  const listBody = await listResponse.json();

  assert.equal(deleteResponse.status, 200);
  assert.deepEqual(deleteBody, { cleared: true });
  assert.deepEqual(listBody, []);
});
