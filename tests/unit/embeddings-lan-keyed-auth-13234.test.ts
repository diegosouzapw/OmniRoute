/**
 * #13234: a LAN/CGNAT OpenAI-compatible embeddings node with a stored API key
 * must send Authorization: Bearer on the outbound proxy request.
 *
 * Dashboard Check already does this via buildBearerHeaders. The embeddings
 * proxy did not: #6925 classified every private-host node as authType "none"
 * before credentials were loaded, so buildAuth dropped the key and the
 * upstream returned 401. Chat/completions against the same node/key worked.
 *
 * Keyless LAN nodes stay no-auth (#6925). Cloud-metadata hosts stay blocked.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-embed-lan-key-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createProviderNode } = await import("../../src/lib/db/providers/nodes.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function stubEmbeddingFetch() {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; headers: Record<string, string> } | null = null;
  globalThis.fetch = async (url: RequestInfo | URL, options: RequestInit = {}) => {
    captured = {
      url: String(url),
      headers: (options.headers as Record<string, string>) || {},
    };
    return new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 3, total_tokens: 3 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
  return {
    get captured() {
      return captured;
    },
    restore() {
      globalThis.fetch = originalFetch;
    },
  };
}

test("#13234: 100.64 CGNAT embeddings node with stored key sends Authorization", async () => {
  const node = await createProviderNode({
    type: "openai-compatible-embeddings",
    name: "CGNAT Embed",
    prefix: "cgnatembed13234",
    apiType: "embeddings",
    baseUrl: "http://100.64.1.10:8080/v1",
  });

  await providersDb.createProviderConnection({
    provider: node.id,
    authType: "apikey",
    name: "CGNAT Embed Key",
    apiKey: "sk-embed-13234",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      prefix: "cgnatembed13234",
      baseUrl: "http://100.64.1.10:8080/v1",
    },
  });

  const fetchStub = stubEmbeddingFetch();
  try {
    const res = await createEmbeddingResponse({
      model: "cgnatembed13234/nomic-embed-text",
      input: "hello world",
    });
    assert.equal(res.status, 200);
  } finally {
    fetchStub.restore();
  }

  assert.ok(fetchStub.captured);
  assert.equal(
    fetchStub.captured!.url,
    "http://100.64.1.10:8080/v1/embeddings",
    "should hit the node's own embeddings endpoint"
  );
  assert.equal(
    fetchStub.captured!.headers.Authorization,
    "Bearer sk-embed-13234",
    "stored key must ride on the outbound embeddings request, matching Check"
  );
});

test("#13234: keyless 10.x LAN embeddings node still sends no Authorization", async () => {
  await createProviderNode({
    type: "openai-compatible-embeddings",
    name: "LAN Ollama Keyless",
    prefix: "lanollama13234",
    apiType: "embeddings",
    baseUrl: "http://10.10.0.181:11434/v1",
  });

  const fetchStub = stubEmbeddingFetch();
  try {
    const res = await createEmbeddingResponse({
      model: "lanollama13234/nomic-embed-text",
      input: "hello world",
    });
    assert.equal(res.status, 200);
  } finally {
    fetchStub.restore();
  }

  assert.ok(fetchStub.captured);
  assert.equal(
    fetchStub.captured!.headers.Authorization,
    undefined,
    "a keyless LAN provider must not receive a fabricated Authorization header"
  );
});

test("#13234: LAN node with a keyless connection record still sends no Authorization", async () => {
  const node = await createProviderNode({
    type: "openai-compatible-embeddings",
    name: "LAN empty key",
    prefix: "lanempty13234",
    apiType: "embeddings",
    baseUrl: "http://10.20.0.5:11434/v1",
  });

  await providersDb.createProviderConnection({
    provider: node.id,
    authType: "apikey",
    name: "LAN empty key conn",
    apiKey: "",
    isActive: true,
  });

  const fetchStub = stubEmbeddingFetch();
  try {
    const res = await createEmbeddingResponse({
      model: "lanempty13234/nomic-embed-text",
      input: "hello world",
    });
    assert.equal(res.status, 200);
  } finally {
    fetchStub.restore();
  }

  assert.ok(fetchStub.captured);
  assert.equal(
    fetchStub.captured!.headers.Authorization,
    undefined,
    "empty stored key must not fabricate Authorization",
  );
});
