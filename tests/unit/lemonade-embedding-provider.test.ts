import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-lemonade-embedding-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { getEmbeddingProvider, parseEmbeddingModel, getEmbeddingDimension } =
  await import("../../open-sse/config/embeddingRegistry.ts");
const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");
const { LOCAL_PROVIDERS } = await import("../../src/shared/constants/providers/local.ts");
const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");

test.after(() => {
  core.resetDbInstance();
  rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("LOCAL_PROVIDERS declares embedding serviceKind for lemonade and llama-cpp", () => {
  assert.ok(LOCAL_PROVIDERS.lemonade.serviceKinds.includes("embedding"));
  assert.ok(LOCAL_PROVIDERS["llama-cpp"].serviceKinds.includes("embedding"));
});

test("lemonade embedding registry exposes the local endpoint and curated harrier model", () => {
  const provider = getEmbeddingProvider("lemonade");
  assert.ok(provider);
  assert.equal(provider.baseUrl, "http://localhost:13305/v1/embeddings");
  assert.equal(provider.authType, "none");
  assert.equal(provider.authHeader, "bearer");
  assert.deepEqual(provider.models, [
    { id: "harrier-oss-v1-0.6b", name: "Harrier OSS v1 0.6B", dimensions: 1024 },
  ]);
  assert.equal(getEmbeddingDimension("lemonade/harrier-oss-v1-0.6b"), 1024);
  assert.equal(getEmbeddingDimension("harrier-oss-v1-0.6b"), 1024);
});

test("llama-cpp embedding registry exposes the local llama-server endpoint", () => {
  const provider = getEmbeddingProvider("llama-cpp");
  assert.ok(provider);
  assert.equal(provider.baseUrl, "http://127.0.0.1:8080/v1/embeddings");
  assert.equal(provider.authType, "none");
  assert.equal(provider.authHeader, "bearer");
  assert.deepEqual(provider.models, []);
});

test("parseEmbeddingModel resolves lemonade, llama-cpp, and aliases", () => {
  assert.deepEqual(parseEmbeddingModel("lemonade/harrier-oss-v1-0.6b"), {
    provider: "lemonade",
    model: "harrier-oss-v1-0.6b",
  });

  // Bare curated model resolves automatically to lemonade
  assert.deepEqual(parseEmbeddingModel("harrier-oss-v1-0.6b"), {
    provider: "lemonade",
    model: "harrier-oss-v1-0.6b",
  });

  // llama.cpp and aliases
  assert.deepEqual(parseEmbeddingModel("llama-cpp/custom-embed"), {
    provider: "llama-cpp",
    model: "custom-embed",
  });
  assert.deepEqual(parseEmbeddingModel("llamacpp/custom-embed"), {
    provider: "llama-cpp",
    model: "custom-embed",
  });
  assert.deepEqual(parseEmbeddingModel("llama.cpp/custom-embed"), {
    provider: "llama-cpp",
    model: "custom-embed",
  });
});

test("handleEmbedding forwards Authorization header when key is present on lemonade", async () => {
  const originalFetch = globalThis.fetch;
  let captured: {
    url: string;
    headers: Record<string, string>;
    body: Record<string, unknown>;
  } | null = null;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: (options.headers as Record<string, string>) || {},
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.01, -0.02, 0.03], index: 0 }],
        usage: { prompt_tokens: 3, total_tokens: 3 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleEmbedding({
      body: {
        model: "lemonade/harrier-oss-v1-0.6b",
        input: "Hello world",
      },
      credentials: {
        apiKey: "lemonade",
        providerSpecificData: { baseUrl: "http://192.168.31.147:13305" },
      },
      resolvedProvider: {
        id: "lemonade",
        baseUrl: "http://localhost:13305/v1/embeddings",
        authType: "none",
        authHeader: "bearer",
        models: [{ id: "harrier-oss-v1-0.6b", name: "Harrier", dimensions: 1024 }],
      },
      resolvedModel: "harrier-oss-v1-0.6b",
      log: null,
    });

    assert.equal(result.success, true);
    assert.ok(captured);
    assert.equal(captured.url, "http://192.168.31.147:13305/v1/embeddings");
    assert.equal(captured.headers.Authorization, "Bearer lemonade");
    assert.deepEqual(captured.body, {
      model: "harrier-oss-v1-0.6b",
      input: "Hello world",
    });
    assert.equal(result.data.object, "list");
    assert.equal(result.data.data[0].object, "embedding");
    assert.deepEqual(result.data.data[0].embedding, [0.01, -0.02, 0.03]);
    assert.equal(result.data.usage.total_tokens, 3);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding supports keyless requests on lemonade without error", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; headers: Record<string, string> } | null = null;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: (options.headers as Record<string, string>) || {},
    };
    return new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 1, total_tokens: 1 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleEmbedding({
      body: {
        model: "lemonade/harrier-oss-v1-0.6b",
        input: "Hello",
      },
      credentials: null,
      resolvedProvider: {
        id: "lemonade",
        baseUrl: "http://localhost:13305/v1/embeddings",
        authType: "none",
        authHeader: "bearer",
        models: [],
      },
      resolvedModel: "harrier-oss-v1-0.6b",
      log: null,
    });

    assert.equal(result.success, true);
    assert.ok(captured);
    assert.equal(captured.url, "http://localhost:13305/v1/embeddings");
    assert.equal(captured.headers.Authorization, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding normalizes diverse local base URLs properly", async () => {
  const testCases = [
    { input: "http://192.168.31.147:13305", expected: "http://192.168.31.147:13305/v1/embeddings" },
    {
      input: "http://192.168.31.147:13305/v1",
      expected: "http://192.168.31.147:13305/v1/embeddings",
    },
    {
      input: "http://192.168.31.147:13305/api/v1",
      expected: "http://192.168.31.147:13305/api/v1/embeddings",
    },
    {
      input: "http://192.168.31.147:13305/embeddings",
      expected: "http://192.168.31.147:13305/embeddings",
    },
  ];

  const originalFetch = globalThis.fetch;

  try {
    for (const { input, expected } of testCases) {
      let capturedUrl = "";
      globalThis.fetch = async (url) => {
        capturedUrl = String(url);
        return new Response(
          JSON.stringify({
            data: [{ object: "embedding", embedding: [0.1], index: 0 }],
            usage: { prompt_tokens: 1, total_tokens: 1 },
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      };

      const result = await handleEmbedding({
        body: { model: "lemonade/harrier-oss-v1-0.6b", input: "test" },
        credentials: { providerSpecificData: { baseUrl: input } },
        resolvedProvider: {
          id: "lemonade",
          baseUrl: "http://localhost:13305/v1/embeddings",
          authType: "none",
          authHeader: "bearer",
          models: [],
        },
        resolvedModel: "harrier-oss-v1-0.6b",
        log: null,
      });

      assert.equal(result.success, true);
      assert.equal(capturedUrl, expected);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("createEmbeddingResponse hydrates configured Lemonade connection with Bearer key", async () => {
  await createProviderConnection({
    provider: "lemonade",
    authType: "none",
    name: "Lemonade LAN Server",
    apiKey: "lemonade",
    isActive: true,
    providerSpecificData: { baseUrl: "http://192.168.31.147:13305" },
  });

  const originalFetch = globalThis.fetch;
  let captured: {
    url: string;
    headers: Record<string, string>;
    body: Record<string, unknown>;
  } | null = null;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: (options.headers as Record<string, string>) || {},
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.0165, -0.07], index: 0 }],
        usage: { prompt_tokens: 4, total_tokens: 4 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const response = await createEmbeddingResponse({
      model: "lemonade/harrier-oss-v1-0.6b",
      input: ["Batch sentence one", "Batch sentence two"],
    });

    assert.equal(response.status, 200);
    const body = (await response.json()) as {
      object: string;
      data: Array<{ embedding: number[] }>;
      usage: { total_tokens: number };
    };
    assert.equal(body.object, "list");
    assert.equal(body.data.length, 1);
    assert.deepEqual(body.data[0].embedding, [0.0165, -0.07]);
    assert.equal(body.usage.total_tokens, 4);

    assert.ok(captured);
    assert.equal(captured.url, "http://192.168.31.147:13305/v1/embeddings");
    assert.equal(captured.headers.Authorization, "Bearer lemonade");
    assert.deepEqual(captured.body, {
      model: "harrier-oss-v1-0.6b",
      input: ["Batch sentence one", "Batch sentence two"],
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
