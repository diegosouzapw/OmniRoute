import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

// A search connection that once failed (a 429 cooldown, or a failed dashboard
// test) kept its lastError / non-active testStatus forever: executeProviderFetch
// marked failures via markAccountUnavailable but never cleared them on success,
// so the dashboard kept painting a healthy, serving connection red.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-search-clear-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "search-clear-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const searchProxy = await import("../../open-sse/handlers/search/searchProxy.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");

test.after(async () => {
  await closeCallLogSaves(500).catch(() => {});
  try {
    core.resetDbInstance();
  } catch {}
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

// A stuck upstream socket must fail the test, not park the runner for hours.
const TEST_TIMEOUT_MS = 30_000;
const timedTest = (name: string, fn: () => Promise<void>) =>
  test(name, { timeout: TEST_TIMEOUT_MS }, fn);

async function withServer<T>(
  status: number,
  body: string,
  fn: (port: number) => Promise<T>
): Promise<T> {
  const server = http.createServer((_req, res) => {
    res.writeHead(status, { "Content-Type": "application/json", Connection: "close" });
    res.end(body);
  });
  const port = await new Promise<number>((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      resolve(addr && typeof addr === "object" ? addr.port : 0);
    });
  });
  try {
    return await fn(port);
  } finally {
    // #14958: a pooled keep-alive socket held by the fetch dispatcher would keep
    // server.close() (and the whole test process) waiting forever — drop every
    // connection first so close() resolves and the file exits on its own.
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

async function runFetch(port: number, connectionId: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  timer.unref?.();
  return searchProxy.executeProviderFetch({
    config: SEARCH_PROVIDERS["tavily-search"],
    url: `http://127.0.0.1:${port}/search`,
    init: { method: "POST", headers: { "Content-Type": "application/json" } },
    controller,
    timer,
    query: "test query",
    searchType: "web",
    maxResults: 5,
    startTime: Date.now(),
    connectionId,
    proxy: null,
    proxyLevel: "none",
    log: null,
    normalize: () => ({ results: [], totalResults: 0 }),
  } as never);
}

timedTest("a successful search clears a stale failed-test error on the connection", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "tavily-search",
    authType: "apikey",
    name: "tavily-stale-test-error",
    apiKey: "tvly-test-key-stale",
    isActive: true,
    testStatus: "error",
  });
  const connId = String(conn.id);
  await providersDb.updateProviderConnection(connId, {
    testStatus: "error",
    lastError: "Connection test failed: 401 Unauthorized",
    lastErrorAt: new Date(Date.now() - 60_000).toISOString(),
    errorCode: "401",
  });

  const result = await withServer(200, JSON.stringify({ results: [] }), (port) =>
    runFetch(port, connId)
  );
  assert.equal(result.success, true);

  const after = (await providersDb.getProviderConnectionById(connId)) as Record<string, unknown>;
  assert.equal(after.testStatus, "active", "real success must reset testStatus");
  assert.equal(after.lastError ?? null, null, "real success must clear lastError");
  assert.equal(after.errorCode ?? null, null, "real success must clear errorCode");
});

timedTest(
  "a successful search after an elapsed 429 cooldown clears the cooldown error",
  async () => {
    const conn = await providersDb.createProviderConnection({
      provider: "tavily-search",
      authType: "apikey",
      name: "tavily-elapsed-cooldown",
      apiKey: "tvly-test-key-cooldown",
      isActive: true,
      testStatus: "active",
    });
    const connId = String(conn.id);
    await auth.markAccountUnavailable(connId, 429, "Too Many Requests", "tavily-search", null);
    // Simulate the cooldown having elapsed (lazy recovery lets the request through).
    await providersDb.updateProviderConnection(connId, {
      rateLimitedUntil: new Date(Date.now() - 1000).toISOString(),
    });

    const result = await withServer(200, JSON.stringify({ results: [] }), (port) =>
      runFetch(port, connId)
    );
    assert.equal(result.success, true);

    const after = (await providersDb.getProviderConnectionById(connId)) as Record<string, unknown>;
    assert.equal(after.testStatus, "active");
    assert.equal(after.lastError ?? null, null);
    assert.equal(after.rateLimitedUntil ?? null, null);
  }
);

timedTest("a failed search does not clear the connection error", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "tavily-search",
    authType: "apikey",
    name: "tavily-still-failing",
    apiKey: "tvly-test-key-failing",
    isActive: true,
    testStatus: "error",
  });
  const connId = String(conn.id);
  await providersDb.updateProviderConnection(connId, {
    testStatus: "error",
    lastError: "Connection test failed: 401 Unauthorized",
  });

  const result = await withServer(401, JSON.stringify({ error: "unauthorized" }), (port) =>
    runFetch(port, connId)
  );
  assert.equal(result.success, false);

  const after = (await providersDb.getProviderConnectionById(connId)) as Record<string, unknown>;
  assert.equal(after.testStatus, "error");
  assert.ok(after.lastError, "failure must keep the recorded error");
});
