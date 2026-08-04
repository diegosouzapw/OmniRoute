import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

// Isolate the DB to a temp dir BEFORE importing any module that opens it.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-embed-proxy-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");
const { resolveProxyForRequest } = await import("../../open-sse/utils/proxyFetch.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function withHttpServer(handler: http.RequestListener, fn: (baseUrl: string) => Promise<void>) {
  const server = http.createServer(handler);
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve());
  });
  const address = server.address();
  assert.ok(address && typeof address === "object");
  try {
    await fn(`http://127.0.0.1:${(address as { port: number }).port}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  }
}

test("embeddings forward the connection-level (key) pinned proxy to the upstream fetch", async () => {
  // T14 Proxy Fast-Fail performs a real TCP reachability check before running
  // the request inside the proxy context, so the "proxy" must be a real,
  // reachable local listener (its actual response body is irrelevant here —
  // the assertion is about which proxy context the upstream fetch observes).
  await withHttpServer(
    (_req, res) => {
      res.writeHead(200);
      res.end("ok");
    },
    async (proxyBaseUrl) => {
      const proxyUrl = new URL(proxyBaseUrl);

      const connection = await providersDb.createProviderConnection({
        provider: "mistral",
        authType: "apikey",
        name: "Test Mistral Proxy",
        apiKey: "mistral-test-key",
      });

      // Pin a proxy at the connection ("key") level — the most specific level,
      // exactly like a user would configure per-connection in the dashboard.
      await settingsDb.setProxyForLevel("key", (connection as any).id, {
        type: "http",
        host: proxyUrl.hostname,
        port: Number(proxyUrl.port),
      });

      let capturedProxySource: string | null = null;
      let capturedProxyUrl: string | null = null;

      const originalFetch = globalThis.fetch;
      globalThis.fetch = async (input: RequestInfo | URL) => {
        const targetUrl = typeof input === "string" ? input : (input as URL).toString();
        const resolved = resolveProxyForRequest(targetUrl);
        capturedProxySource = resolved.source;
        capturedProxyUrl = resolved.proxyUrl;
        return new Response(
          JSON.stringify({
            data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
            usage: { prompt_tokens: 3, total_tokens: 3 },
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      };

      try {
        const res = await createEmbeddingResponse({
          model: "mistral/mistral-embed",
          input: "hello world",
        });
        assert.equal(res.status, 200, "embedding request should succeed");
      } finally {
        globalThis.fetch = originalFetch;
      }

      // The upstream fetch must have run inside the AsyncLocalStorage proxy
      // context carrying the connection's pinned proxy — not "direct" (no
      // context) and not the env-var proxy fallback.
      assert.equal(
        capturedProxySource,
        "context",
        `expected the embeddings upstream fetch to run inside a proxy context, got source="${capturedProxySource}"`
      );
      assert.ok(
        capturedProxyUrl && capturedProxyUrl.includes(`${proxyUrl.hostname}:${proxyUrl.port}`),
        `expected the connection's pinned proxy to be forwarded, got "${capturedProxyUrl}"`
      );
    }
  );
});
