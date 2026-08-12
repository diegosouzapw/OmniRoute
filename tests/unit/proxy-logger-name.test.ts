import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-logger-name-"));
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

test("proxy logs carry the registry name on the proxy entry", () => {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "nous-research",
    targetUrl: "nous/deepseek/deepseek-v4-flash-0731",
    level: "provider",
    levelId: "nous-research",
    proxy: { type: "http", host: "gw-eu.murphyproxies.com", port: 7777, name: "murphy-eu-fr" },
  });

  const [log] = proxyLogger.getProxyLogs();
  assert.equal(log.proxy.name, "murphy-eu-fr");
  assert.equal(log.proxy.host, "gw-eu.murphyproxies.com");
});

test("registry name survives SQLite persist + hydrate", () => {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "nous-research",
    proxy: { type: "http", host: "gw-eu.murphyproxies.com", port: 7777, name: "murphy-eu-de" },
  });

  // Force a fresh hydrate from the DB (clear in-memory, re-import module state
  // by re-running loadFromDb through a fresh module instance is heavy; instead
  // close + reopen the DB and read what was persisted).
  core.closeDbInstance();
  const db = core.getDbInstance();
  const rows = db.prepare("SELECT proxy_name, proxy_host FROM proxy_logs").all();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].proxy_name, "murphy-eu-de");
  assert.equal(rows[0].proxy_host, "gw-eu.murphyproxies.com");
});

test("search matches the registry name", () => {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "nous-research",
    proxy: { type: "http", host: "gw-eu.murphyproxies.com", port: 7777, name: "murphy-eu-fr" },
  });
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "openrouter",
  });

  const hits = proxyLogger.getProxyLogs({ search: "murphy-eu-fr" });
  assert.equal(hits.length, 1);
  assert.equal(hits[0].proxy.name, "murphy-eu-fr");
});

test("legacy rows without a name hydrate cleanly (host:port only)", () => {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "openrouter",
    proxy: { type: "http", host: "203.0.113.50", port: 8080 },
  });

  const [log] = proxyLogger.getProxyLogs();
  assert.equal(log.proxy.name, undefined);
  assert.equal(log.proxy.host, "203.0.113.50");
});
