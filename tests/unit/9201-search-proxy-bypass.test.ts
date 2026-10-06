import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9201-search-proxy-"));
process.env.DATA_DIR = dataDir;
process.env.REQUIRE_API_KEY = "false";
process.env.DASHBOARD_PASSWORD = "";
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;
delete process.env.HTTP_PROXY;
delete process.env.HTTPS_PROXY;
delete process.env.ALL_PROXY;
delete process.env.http_proxy;
delete process.env.https_proxy;
delete process.env.all_proxy;
process.env.NO_PROXY = "";
process.env.no_proxy = "";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const searchRegistry = await import("../../open-sse/config/searchRegistry.ts");
const searchRoute = await import("../../src/app/api/v1/search/route.ts");

let proxyServer: http.Server;
let proxyPort = 0;
let connectionId = "";
const originalSerperBaseUrl = searchRegistry.SEARCH_PROVIDERS["serper-search"].baseUrl;

function listen(server: http.Server): Promise<number> {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") throw new Error("proxy did not bind");
      resolve(address.port);
    });
  });
}

test.before(async () => {
  proxyServer = http.createServer();
  proxyPort = await listen(proxyServer);

  const connection = await providersDb.createProviderConnection({
    provider: "serper-search",
    authType: "apikey",
    name: "serper-proxy-probe",
    apiKey: "probe-serper-key",
    isActive: true,
    testStatus: "active",
  });
  connectionId = String(connection.id);
  await proxiesDb.createProxyAndAssign(
    { name: "search-probe-proxy", type: "http", host: "127.0.0.1", port: proxyPort },
    { scope: "account", scopeId: connectionId }
  );

  searchRegistry.SEARCH_PROVIDERS["serper-search"].baseUrl = "http://search-probe.invalid";
});

test.after(async () => {
  searchRegistry.SEARCH_PROVIDERS["serper-search"].baseUrl = originalSerperBaseUrl;
  await new Promise<void>((resolve) => proxyServer.close(() => resolve()));
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function installProxyResponseCounter() {
  let proxyRequests = 0;
  const payload = JSON.stringify({
    organic: [
      {
        title: "Proxy-served result",
        link: "https://example.com/proxy-served",
        snippet: "The configured connection proxy received this request.",
      },
    ],
    searchParameters: { totalResults: 1 },
  });
  proxyServer.removeAllListeners("request");
  proxyServer.removeAllListeners("connect");
  proxyServer.on("request", (_request, response) => {
    proxyRequests += 1;
    response.statusCode = 200;
    response.setHeader("content-type", "application/json");
    response.end(payload);
  });
  proxyServer.on("connect", (_request, socket, head) => {
    proxyRequests += 1;
    socket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
    const reply = () => {
      socket.end(
        `HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: ${Buffer.byteLength(payload)}\r\nConnection: close\r\n\r\n${payload}`
      );
    };
    if (head.length > 0) reply();
    else socket.once("data", reply);
  });
  return () => proxyRequests;
}

async function postSearch(query: string) {
  return searchRoute.POST(
    new Request("http://localhost/v1/search", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query,
        provider: "serper-search",
        max_results: 1,
        search_type: "web",
      }),
    })
  );
}

test("POST /v1/search sends a connection's provider request through its configured proxy", async () => {
  const getProxyRequests = installProxyResponseCounter();

  const response = await postSearch(`proxy probe red ${Date.now()}`);
  const body = (await response.json()) as { results?: unknown[]; error?: unknown };

  assert.deepEqual(
    {
      status: response.status,
      proxyRequests: getProxyRequests(),
      resultCount: Array.isArray(body.results) ? body.results.length : 0,
    },
    { status: 200, proxyRequests: 1, resultCount: 1 },
    JSON.stringify(body)
  );
  assert.equal(connectionId.length > 0, true);
});
