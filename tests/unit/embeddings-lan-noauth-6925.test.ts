import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate the DB to a temp dir BEFORE importing any module that opens it.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-embed-lan-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createProviderNode } = await import("../../src/lib/db/providers/nodes.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// #6925: a keyless LAN OpenAI-compatible embeddings provider (e.g. Ollama at
// 10.x/192.168.x) must be classified as a no-auth local provider — never
// forced through the apikey/bearer fallback (which returns 401 because no
// credentials exist for a provider that was never meant to need any).
test("#6925: 10.x LAN embeddings provider is treated as no-auth (no Authorization header, no 401)", async () => {
  await createProviderNode({
    type: "openai-compatible-embeddings",
    name: "LAN Ollama",
    prefix: "lanollama6925",
    apiType: "embeddings",
    baseUrl: "http://10.10.0.181:11434/v1",
  });

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

  try {
    const res = await createEmbeddingResponse({
      model: "lanollama6925/nomic-embed-text",
      input: "hello world",
    });
    assert.equal(res.status, 200, "LAN embeddings request should succeed, not be blocked by auth");
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(captured, "upstream fetch should have been called");
  assert.equal(
    captured!.url,
    "http://10.10.0.181:11434/v1/embeddings",
    "should hit the LAN provider's own embeddings endpoint"
  );
  assert.equal(
    captured!.headers.Authorization,
    undefined,
    "a keyless LAN provider must not receive a fabricated Authorization header"
  );
});

test("#6925: 192.168.x LAN embeddings provider is also treated as no-auth", async () => {
  await createProviderNode({
    type: "openai-compatible-embeddings",
    name: "LAN Ollama 192",
    prefix: "lanollama6925b",
    apiType: "embeddings",
    baseUrl: "http://192.168.1.10:11434/v1",
  });

  const originalFetch = globalThis.fetch;
  let captured: { headers: Record<string, string> } | null = null;
  globalThis.fetch = async (_url: RequestInfo | URL, options: RequestInit = {}) => {
    captured = { headers: (options.headers as Record<string, string>) || {} };
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
      model: "lanollama6925b/nomic-embed-text",
      input: "hello world",
    });
    assert.equal(res.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(captured);
  assert.equal(captured!.headers.Authorization, undefined);
});

test("#6925: cloud-metadata endpoint (169.254.169.254) stays blocked, does not become a bare no-auth provider", async () => {
  await createProviderNode({
    type: "openai-compatible-embeddings",
    name: "Metadata Probe",
    prefix: "metadataprobe6925",
    apiType: "embeddings",
    baseUrl: "http://169.254.169.254/v1",
  });

  const res = await createEmbeddingResponse({
    model: "metadataprobe6925/whatever",
    input: "hello world",
  });

  // Must not be silently treated as a trusted no-auth local provider — either
  // rejected outright or still routed through the fallback (never authType "none").
  assert.notEqual(res.status, 200, "cloud-metadata host must not resolve as a no-auth provider");
});
