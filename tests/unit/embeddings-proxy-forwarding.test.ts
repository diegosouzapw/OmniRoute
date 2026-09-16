import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { buildDynamicEmbeddingProvider } from "../../open-sse/config/embeddingRegistry.ts";
import type { EmbeddingProviderNodeRow } from "../../open-sse/config/embeddingRegistry.ts";

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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function withHttpServer(
  handler: http.RequestListener,
  fn: (baseUrl: string) => Promise<void>
) {
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

// ---------------------------------------------------------------------------
// #13234 — buildDynamicEmbeddingProvider must default to apikey/bearer auth
// so that custom OpenAI-compatible providers forward their configured API key
// on outbound embedding requests. Previously it hardcoded authType: "none",
// which caused buildAuth() to skip the Authorization header entirely.
// ---------------------------------------------------------------------------

test("buildDynamicEmbeddingProvider defaults to apikey/bearer auth (#13234)", () => {
  const node: EmbeddingProviderNodeRow = {
    prefix: "my-custom",
    name: "My Custom Provider",
    baseUrl: "https://api.example.com/v1",
    apiType: "embeddings",
  };
  const provider = buildDynamicEmbeddingProvider(node);
  assert.equal(provider.authType, "apikey", "authType must be apikey, not none");
  assert.equal(provider.authHeader, "bearer", "authHeader must be bearer, not none");
  assert.equal(provider.baseUrl, "https://api.example.com/v1/embeddings");
  assert.equal(provider.id, "my-custom");
});

test("buildDynamicEmbeddingProvider strips trailing slashes before appending /embeddings", () => {
  const node: EmbeddingProviderNodeRow = {
    prefix: "trailing",
    name: "Trailing Slashes",
    baseUrl: "https://api.example.com/v1///",
  };
  const provider = buildDynamicEmbeddingProvider(node);
  assert.equal(provider.baseUrl, "https://api.example.com/v1/embeddings");
  assert.equal(provider.authType, "apikey");
});

test("buildDynamicEmbeddingProvider rejects invalid prefixes", () => {
  assert.throws(
    () =>
      buildDynamicEmbeddingProvider({
        prefix: "bad/slash",
        name: "Bad",
        baseUrl: "https://x.com",
      }),
    /must not contain \//,
  );
  assert.throws(
    () =>
      buildDynamicEmbeddingProvider({
        prefix: "",
        name: "Empty",
        baseUrl: "https://x.com",
      }),
    /missing prefix/,
  );
});

// Integration-level: verify the Authorization header reaches the upstream
// when createEmbeddingResponse is called with a provider that has credentials.

test("createEmbeddingResponse attaches Authorization header for provider with credentials (#13234)", async () => {
  // NOTE: The DB is already initialized from the first test in this file.
  // We create a new mistral connection here and verify the auth header is set.
  // The first test's connection (mistral-test-key) is also present, but
  // getProviderCredentials selects based on availability, so we just verify
  // that SOME Bearer token is attached — proving buildAuth() no longer skips it.
  await providersDb.createProviderConnection({
    provider: "mistral",
    authType: "apikey",
    name: "Auth Test Mistral",
    apiKey: "sk-test-auth-header-12345",
  });

  let capturedAuthHeader: string | null = null;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_input: RequestInfo | URL, init?: RequestInit) => {
    capturedAuthHeader = (init?.headers as Record<string, string>)?.["Authorization"] ?? null;
    return new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 1, total_tokens: 1 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const res = await createEmbeddingResponse({
      model: "mistral/mistral-embed",
      input: "test auth header",
    });
    assert.equal(res.status, 200, "embedding request should succeed");
    // The key assertion: Authorization header must be set (not null/undefined).
    // Before the fix, buildDynamicEmbeddingProvider set authType: "none" which
    // caused buildAuth() to skip the header entirely.
    assert.ok(
      capturedAuthHeader,
      "Authorization header must be attached (#13234) — was null/undefined before the fix"
    );
    assert.ok(
      capturedAuthHeader!.startsWith("Bearer "),
      `Authorization must use Bearer scheme, got: ${capturedAuthHeader}`
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
