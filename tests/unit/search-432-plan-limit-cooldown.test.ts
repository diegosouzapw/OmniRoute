import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

interface TestConnectionRecord {
  id?: string | number;
  isActive?: boolean;
  testStatus?: string;
  rateLimitedUntil?: string | null;
}

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-search-432-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "search-432-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const { RateLimitReason } = await import("../../open-sse/config/constants.ts");
const quotaTextCooldowns = await import("../../open-sse/services/quotaTextCooldowns.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const connectionRecovery = await import("../../src/lib/quota/connectionRecovery.ts");
const searchProxy = await import("../../open-sse/handlers/search/searchProxy.ts");
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

test("Tavily 432 plan limit body is detected as transient plan usage limit", () => {
  const tavily432Body = JSON.stringify({
    error: "This request exceeds your plan's set usage limit. Please upgrade your plan or contact support@tavily.com",
  });

  const isMatched = quotaTextCooldowns.isSubscriptionQuotaText(tavily432Body.toLowerCase(), "tavily-search");
  assert.equal(isMatched, true, "Should recognize Tavily plan limit error message");
});

test("checkFallbackError classifies status 432 and plan limit text as non-permanent quota_exhausted", () => {
  const tavily432Body = JSON.stringify({
    error: "This request exceeds your plan's set usage limit. Please upgrade your plan or contact support@tavily.com",
  });

  const result = accountFallback.checkFallbackError(
    432,
    tavily432Body,
    "tavily-search",
    null,
    undefined,
    undefined,
    0
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result.permanent, undefined);
  assert.equal(result.creditsExhausted, undefined);
  assert.ok(result.cooldownMs > 0, "Should have a positive cooldown duration");
});

test("markAccountUnavailable sets transient unavailable status without deactivating the connection", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "tavily-search",
    authType: "apikey",
    name: "tavily-plan-limit-test",
    apiKey: "tvly-test-key-12345",
    isActive: true,
    testStatus: "active",
  });
  const connId = String(conn.id);

  const errorText = JSON.stringify({
    error: "This request exceeds your plan's set usage limit.",
  });

  await auth.markAccountUnavailable(connId, 432, errorText, "tavily-search", null);

  const updatedRaw = (await providersDb.getProviderConnections({
    provider: "tavily-search",
  })) as TestConnectionRecord[];
  const updated = (Array.isArray(updatedRaw) ? updatedRaw : []).find(
    (c) => String(c.id) === connId
  );

  assert.ok(updated, "Connection should exist in DB");
  assert.equal(updated.isActive, true, "Connection must remain isActive=1");
  assert.equal(updated.testStatus, "unavailable", "Connection should be marked transient unavailable");
  assert.ok(updated.rateLimitedUntil, "rateLimitedUntil must be populated");

  const untilMs = new Date(updated.rateLimitedUntil).getTime();
  assert.ok(untilMs > Date.now(), "rateLimitedUntil should be in the future");
});

test("executeProviderFetch calls markAccountUnavailable on 432 error response when connectionId is present", async () => {
  let serverPort = 0;
  const server = http.createServer((_req, res) => {
    res.writeHead(432, { "Content-Type": "application/json", Connection: "close" });
    res.end(JSON.stringify({
      error: "This request exceeds your plan's set usage limit. Please upgrade your plan or contact support@tavily.com",
    }));
  });

  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      if (addr && typeof addr === "object") serverPort = addr.port;
      resolve();
    });
  });

  const conn = await providersDb.createProviderConnection({
    provider: "tavily-search",
    authType: "apikey",
    name: "tavily-fetch-432-test",
    apiKey: "tvly-test-key-fetch-432",
    isActive: true,
    testStatus: "active",
  });
  const connId = String(conn.id);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  timer.unref?.();

  try {
    const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");
    const result = await searchProxy.executeProviderFetch({
      config: SEARCH_PROVIDERS["tavily-search"],
      url: `http://127.0.0.1:${serverPort}/search`,
      init: { method: "POST", headers: { "Content-Type": "application/json" } },
      controller,
      timer,
      query: "test query",
      searchType: "web",
      maxResults: 5,
      startTime: Date.now(),
      connectionId: connId,
      proxy: null,
      proxyLevel: "none",
      normalize: () => ({ results: [], totalResults: 0 }),
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 432);

    const updatedRaw = (await providersDb.getProviderConnections({
      provider: "tavily-search",
    })) as TestConnectionRecord[];
    const updated = (Array.isArray(updatedRaw) ? updatedRaw : []).find(
      (c) => String(c.id) === connId
    );

    assert.ok(updated);
    assert.equal(updated.isActive, true, "isActive should stay true");
    assert.equal(updated.testStatus, "unavailable", "Connection should become unavailable");
    assert.ok(updated.rateLimitedUntil, "rateLimitedUntil should be set");
  } finally {
    clearTimeout(timer);
    await new Promise<void>((resolve) => {
      server.closeAllConnections?.();
      server.close(() => resolve());
    });
  }
});

test("executeProviderFetch does NOT mark account unavailable on non-quota client errors (400, 401, 403, 404)", async () => {
  for (const statusCode of [400, 401, 403, 404]) {
    let serverPort = 0;
    const server = http.createServer((_req, res) => {
      res.writeHead(statusCode, { "Content-Type": "application/json", Connection: "close" });
      res.end(JSON.stringify({ error: `Generic client error ${statusCode}` }));
    });

    await new Promise<void>((resolve) => {
      server.listen(0, "127.0.0.1", () => {
        const addr = server.address();
        if (addr && typeof addr === "object") serverPort = addr.port;
        resolve();
      });
    });

    const conn = await providersDb.createProviderConnection({
      provider: "tavily-search",
      authType: "apikey",
      name: `tavily-fetch-${statusCode}-test`,
      apiKey: `tvly-test-key-fetch-${statusCode}`,
      isActive: true,
      testStatus: "active",
    });
    const connId = String(conn.id);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    timer.unref?.();

    try {
      const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");
      const result = await searchProxy.executeProviderFetch({
        config: SEARCH_PROVIDERS["tavily-search"],
        url: `http://127.0.0.1:${serverPort}/search`,
        init: { method: "POST", headers: { "Content-Type": "application/json" } },
        controller,
        timer,
        query: "test query",
        searchType: "web",
        maxResults: 5,
        startTime: Date.now(),
        connectionId: connId,
        proxy: null,
        proxyLevel: "none",
        normalize: () => ({ results: [], totalResults: 0 }),
      });

      assert.equal(result.success, false);
      assert.equal(result.status, statusCode);

      const updatedRaw = (await providersDb.getProviderConnections({
        provider: "tavily-search",
      })) as TestConnectionRecord[];
      const updated = (Array.isArray(updatedRaw) ? updatedRaw : []).find(
        (c) => String(c.id) === connId
      );

      assert.ok(updated);
      assert.equal(updated.isActive, true, `isActive must remain true on ${statusCode}`);
      assert.equal(updated.testStatus, "active", `testStatus must remain 'active' on ${statusCode}`);
      assert.ok(!updated.rateLimitedUntil, `rateLimitedUntil must be null/empty on ${statusCode}`);
    } finally {
      clearTimeout(timer);
      await new Promise<void>((resolve) => {
        server.closeAllConnections?.();
        server.close(() => resolve());
      });
    }
  }
});

test("cooldown on key1 allows getProviderCredentials to auto-rotate to healthy key2", async () => {
  const conn1 = await providersDb.createProviderConnection({
    provider: "tavily-search",
    authType: "apikey",
    name: "tavily-key-1",
    apiKey: "tvly-key-1",
    priority: 1,
    isActive: true,
    testStatus: "active",
  });
  const conn2 = await providersDb.createProviderConnection({
    provider: "tavily-search",
    authType: "apikey",
    name: "tavily-key-2",
    apiKey: "tvly-key-2",
    priority: 2,
    isActive: true,
    testStatus: "active",
  });

  // Mark key1 as unavailable due to 432
  await auth.markAccountUnavailable(String(conn1.id), 432, "plan limit reached", "tavily-search", null);

  // Next credential resolution should skip key1 and return key2
  const selected = await auth.getProviderCredentials("tavily-search");
  assert.ok(selected, "Should return available credentials");
  assert.equal(String(selected.connectionId), String(conn2.id), "Should rotate to healthy key2");
});

test("connectionRecovery restores elapsed unavailable connections", () => {
  const pastTime = new Date(Date.now() - 5000).toISOString();
  const connInput = {
    id: "test-conn-1",
    testStatus: "unavailable",
    rateLimitedUntil: pastTime,
    lastErrorAt: pastTime,
  };

  const isRecoverable = connectionRecovery.isRecoverableCooldownConnection(connInput, Date.now());
  assert.equal(isRecoverable, true, "Elapsed unavailable connection should be recoverable");
});
