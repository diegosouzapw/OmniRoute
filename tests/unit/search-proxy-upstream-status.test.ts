import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import type { AddressInfo } from "node:net";

// Search proxy-log rows keep the HTTP status the provider actually
// returned. Real codes (incl. 429/500 from the wire) land on the journal line;
// locally synthesized codes (transport/timeout, envelope errors) stay null.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-search-upstream-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "search-upstream-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const searchProxy = await import("../../open-sse/handlers/search/searchProxy.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");

let server: http.Server;
let baseUrl = "";

test.before(async () => {
  server = http.createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://local");
    const code = Number(url.searchParams.get("code") ?? 200);
    if (url.searchParams.get("hang") === "1") return; // never respond -> caller aborts
    res.writeHead(code, { "Content-Type": "application/json", Connection: "close" });
    if (code >= 200 && code < 300) {
      res.end(JSON.stringify({ results: [], total: 0 }));
    } else {
      res.end(JSON.stringify({ error: `provider error ${code}` }));
    }
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

test.after(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
  proxyLogger.clearProxyLogs();
  await closeCallLogSaves(500).catch(() => {});
  try {
    core.resetDbInstance();
  } catch {}
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

test.beforeEach(() => {
  proxyLogger.clearProxyLogs();
});

function fetchParams(pathSuffix: string, timeoutMs = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  timer.unref?.();
  return {
    config: SEARCH_PROVIDERS["tavily-search"],
    url: `${baseUrl}${pathSuffix}`,
    init: { method: "POST", headers: { "Content-Type": "application/json" } },
    controller,
    timer,
    query: "test query",
    searchType: "web",
    maxResults: 5,
    startTime: Date.now(),
    connectionId: undefined,
    proxy: null,
    proxyLevel: "direct",
    normalize: () => ({ results: [], totalResults: 0 }),
  };
}

async function latestUpstreamStatus() {
  const [entry] = proxyLogger.getProxyLogs();
  assert.ok(entry, "a proxy log line must have been emitted");
  return entry.upstreamStatus;
}

test("a real 429 from the wire lands on the journal line", async () => {
  const p = fetchParams("/search?code=429");
  try {
    const result = await searchProxy.executeProviderFetch(p);
    assert.equal(result.success, false);
    assert.equal(result.status, 429);
    assert.equal(await latestUpstreamStatus(), 429);
  } finally {
    clearTimeout(p.timer);
  }
});

test("a real 200 from the wire lands on the journal line", async () => {
  const p = fetchParams("/search?code=200");
  try {
    const result = await searchProxy.executeProviderFetch(p);
    assert.equal(result.success, true);
    assert.equal(await latestUpstreamStatus(), 200);
  } finally {
    clearTimeout(p.timer);
  }
});

test("a real 500 from the wire lands on the journal line (not the 502 transport code)", async () => {
  const p = fetchParams("/search?code=500");
  try {
    const result = await searchProxy.executeProviderFetch(p);
    assert.equal(result.success, false);
    assert.equal(result.status, 500);
    assert.equal(await latestUpstreamStatus(), 500);
  } finally {
    clearTimeout(p.timer);
  }
});

test("a caller abort (no response received) keeps null", async () => {
  const p = fetchParams("/search?hang=1", 200);
  try {
    const result = await searchProxy.executeProviderFetch(p);
    assert.equal(result.success, false);
    assert.equal(await latestUpstreamStatus(), null);
  } finally {
    clearTimeout(p.timer);
  }
});

for (const quota of [true, false]) {
  test(`an AnySearch envelope error (quota=${quota}) keeps null despite result.status`, async () => {
    const p = fetchParams("/search?code=200");
    const envelope = new Error("AnySearch envelope error") as Error & { quota?: boolean };
    envelope.name = "AnysearchSearchEnvelopeError";
    envelope.quota = quota;
    const failingNormalize = () => {
      throw envelope;
    };
    try {
      const result = await searchProxy.executeProviderFetch({
        ...p,
        normalize: failingNormalize,
      });
      assert.equal(result.success, false);
      assert.equal(result.status, quota ? 402 : 502);
      assert.equal(
        await latestUpstreamStatus(),
        null,
        "synthesized envelope codes must never reach upstream_status"
      );
    } finally {
      clearTimeout(p.timer);
    }
  });
}
