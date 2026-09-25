import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-nara-14748-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#14748 NaraRouter import fetches every model from its live catalog", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "nara",
    authType: "apikey",
    name: "nara-live-catalog",
    apiKey: "nara-test-key",
  });

  const upstreamModels = [
    { id: "agnes-2.0-flash" },
    { id: "laguna-s-2.1" },
    { id: "minimax-m3-free" },
    { id: "mistral-large" },
    { id: "qwen3.8-27b" },
    { id: "nara-live-only-model" },
  ];
  const originalFetch = globalThis.fetch;
  const requestedUrls: string[] = [];
  globalThis.fetch = async (url) => {
    requestedUrls.push(String(url));
    return Response.json({ object: "list", data: upstreamModels });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.source, "api");
    assert.deepEqual(
      body.models.map((model: { id: string }) => model.id),
      upstreamModels.map(({ id }) => id)
    );
    assert.ok(requestedUrls.includes("https://router.bynara.id/v1/models"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("NaraRouter model import falls back to its seed when live discovery fails", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "nara",
    authType: "apikey",
    name: "nara-catalog-fallback",
    apiKey: "nara-test-key",
  });

  const originalFetch = globalThis.fetch;
  const requestedUrls: string[] = [];
  globalThis.fetch = async (url) => {
    requestedUrls.push(String(url));
    return new Response("bad gateway", { status: 502 });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.source, "local_catalog");
    assert.ok(body.models.length > 0, "the pinned NaraRouter seed should remain available");
    assert.ok(requestedUrls.includes("https://router.bynara.id/v1/models"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("NaraRouter model import falls back when the live catalog is malformed", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "nara",
    authType: "apikey",
    name: "nara-malformed-catalog",
    apiKey: "nara-test-key",
  });

  const originalFetch = globalThis.fetch;
  const requestedUrls: string[] = [];
  globalThis.fetch = async (url) => {
    requestedUrls.push(String(url));
    return new Response("{", { status: 200 });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );

    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.source, "local_catalog");
    assert.match(body.warning, /API unavailable/);
    assert.deepEqual(requestedUrls, [
      "https://router.bynara.id/v1/models",
      "https://router.bynara.id/models",
      "https://router.bynara.id/v1/chat/completions/models",
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
