import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-specialty-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "specialty-catalog-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");
const embeddingsRoute = await import("../../src/app/api/v1/embeddings/route.ts");
const videoRoute = await import("../../src/app/api/v1/videos/generations/route.ts");
const musicRoute = await import("../../src/app/api/v1/music/generations/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // These routes all derive from the shared unified catalog (getUnifiedModelsResponse),
  // which #6408 wrapped in a 1.5s TTL response cache keyed only by (prefix, isCodex
  // client, apiKey) — NOT by DB state. Every test in this file hits that same cache key,
  // so without clearing it between test cases a test running within the TTL window of
  // a previous one gets served the previous test's stale catalog instead of a fresh
  // build reflecting this test's own seeded connections.
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedConnection(provider: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: "test-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

async function listedIds(
  route: { GET: (request?: Request) => Promise<Response> },
  pathname: string
) {
  const response = await route.GET(new Request(`http://localhost${pathname}`));
  const body = (await response.json()) as { data?: Array<{ id: string }> };
  assert.equal(response.status, 200);
  return (body.data || []).map((model) => model.id);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("image catalog GET uses the unified active-credential model list", async () => {
  await seedConnection("codex");

  const ids = await listedIds(imageRoute, "/v1/images/generations");

  assert.ok(ids.includes("codex/gpt-5.5"));
  assert.ok(!ids.includes("openai/gpt-image-2"));
});

test("specialty catalog GET preserves unified catalog headers", async () => {
  await seedConnection("codex");

  const response = await imageRoute.GET(
    new Request("http://localhost/v1/images/generations", {
      headers: { "x-request-id": "specialty-catalog-test" },
    })
  );
  await response.json();

  assert.equal(response.headers.get("x-request-id"), "specialty-catalog-test");
  assert.ok(response.headers.get("x-model-catalog-version"));
  assert.match(response.headers.get("content-type") || "", /application\/json/);
});

test("embedding catalog GET hides providers without active credentials", async () => {
  await seedConnection("cohere");

  const ids = await listedIds(embeddingsRoute, "/v1/embeddings");

  assert.ok(ids.includes("cohere/embed-v4.0"));
  assert.ok(!ids.includes("openai/text-embedding-3-small"));
});

test("video catalog GET hides credential-backed providers without credentials", async () => {
  await seedConnection("kie");

  const ids = await listedIds(videoRoute, "/v1/videos/generations");

  assert.ok(ids.includes("kie/veo/veo-3-1"));
  assert.ok(!ids.includes("vertex/veo-3.0-generate-001"));
});

test("music catalog GET hides providers without active credentials", async () => {
  await seedConnection("kie");

  const ids = await listedIds(musicRoute, "/v1/music/generations");

  assert.ok(ids.includes("kie/suno-v4.0"));
  assert.ok(!ids.includes("vertex/lyria-002"));
});
