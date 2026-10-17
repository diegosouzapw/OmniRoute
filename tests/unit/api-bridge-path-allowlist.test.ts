/**
 * The API-only port (API_PORT) relays a fixed set of public LLM routes to the dashboard
 * port and answers 404 for everything else, so the dashboard UI and the management API
 * are never reachable through it. Gemini-native clients (Gemini CLI, google-genai SDK)
 * call /v1beta/models/...; those must be relayed like /v1, while /api/* (other than the
 * OAuth callback) stays blocked.
 */

import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";

const bridge = await import("../../src/lib/apiBridgeServer.ts");

const RELAYED_BODY = "relayed-by-dashboard";

async function withBridge(fn: (apiPort: number, relayed: string[]) => Promise<void>) {
  const relayed: string[] = [];
  const dashboard = http.createServer((req, res) => {
    relayed.push(req.url || "");
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(RELAYED_BODY);
  });
  await new Promise<void>((resolve) => dashboard.listen(0, "127.0.0.1", resolve));
  const dashboardPort = (dashboard.address() as net.AddressInfo).port;
  const apiServer = bridge.createApiBridgeServer(dashboardPort);
  await new Promise<void>((resolve) => apiServer.listen(0, "127.0.0.1", resolve));
  const apiPort = (apiServer.address() as net.AddressInfo).port;
  try {
    await fn(apiPort, relayed);
  } finally {
    apiServer.close();
    apiServer.closeAllConnections();
    dashboard.close();
    dashboard.closeAllConnections();
  }
}

function get(apiPort: number, path: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: "127.0.0.1", port: apiPort, path }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ status: res.statusCode || 0, body }));
    });
    req.on("error", reject);
    req.end();
  });
}

test("Gemini-native /v1beta routes are relayed to the dashboard port", async () => {
  await withBridge(async (apiPort, relayed) => {
    const paths = [
      "/v1beta/models",
      "/v1beta/models/gemini-2.5-pro:generateContent",
      "/v1beta/models/gemini-2.5-pro:streamGenerateContent?alt=sse",
      "/V1BETA/models",
    ];
    for (const path of paths) {
      const res = await get(apiPort, path);
      assert.equal(res.status, 200, `${path} should be relayed`);
      assert.equal(res.body, RELAYED_BODY, `${path} should reach the dashboard`);
    }
    assert.deepEqual(relayed, paths);
  });
});

test("the existing OpenAI-compatible routes are still relayed", async () => {
  await withBridge(async (apiPort, relayed) => {
    for (const path of ["/v1/models", "/v1/chat/completions", "/responses", "/codex/x"]) {
      const res = await get(apiPort, path);
      assert.equal(res.status, 200, `${path} should be relayed`);
    }
    assert.equal(relayed.length, 4);
  });
});

test("dashboard and management routes stay blocked on the API port", async () => {
  await withBridge(async (apiPort, relayed) => {
    const blocked = [
      "/",
      "/dashboard",
      "/api/keys",
      "/api/v1beta/models",
      "/v1betaX/models",
      "/v1beta2/models",
      "/xv1beta/models",
    ];
    for (const path of blocked) {
      const res = await get(apiPort, path);
      assert.equal(res.status, 404, `${path} should be blocked`);
      assert.equal(JSON.parse(res.body).error, "not_found");
    }
    assert.deepEqual(relayed, []);
  });
});
