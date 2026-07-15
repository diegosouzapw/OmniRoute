import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-openrouter-embeddings-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const embeddingRegistry = await import("../../open-sse/config/embeddingRegistry.ts");
const staticModels = await import("../../src/lib/providers/staticModels.ts");

const originalFetch = globalThis.fetch;

/** Shape of the /api/providers/[id]/models discovery payload asserted below. */
type DiscoveredModel = { id: string; name?: string };
type ModelsResponseBody = { source: string; models: DiscoveredModel[] };

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string, overrides: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: "or-test-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
    ...overrides,
  });
}

async function callRoute(connectionId: string) {
  return providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models`),
    { params: { id: connectionId } }
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("embeddingRegistry curated openrouter catalog carries the refreshed lineup with dimensions (#6976)", () => {
  const config = embeddingRegistry.getEmbeddingProvider("openrouter");
  assert.ok(config, "openrouter embedding provider config must exist");
  const ids = config!.models.map((m) => m.id);
  for (const expected of [
    "openai/text-embedding-3-small",
    "openai/text-embedding-3-large",
    "qwen/qwen3-embedding-8b",
    "qwen/qwen3-embedding-4b",
    "baai/bge-m3",
    "mistralai/mistral-embed-2312",
    "google/gemini-embedding-001",
  ]) {
    assert.ok(ids.includes(expected), `expected curated id ${expected}; got ${ids.join(", ")}`);
    const dim = config!.models.find((m) => m.id === expected)?.dimensions;
    assert.equal(typeof dim, "number", `${expected} must carry a dimensions value`);
  }
});

test("getStaticModelsForProvider(openrouter) folds the curated embeddings into the specialty catalog (#6976)", () => {
  const specialty = staticModels.getStaticModelsForProvider("openrouter");
  assert.ok(specialty && specialty.length > 0);
  const embeddingEntry = specialty!.find((m) => m.id === "baai/bge-m3");
  assert.ok(embeddingEntry, "curated bge-m3 entry must be present in the static catalog");
  assert.equal(embeddingEntry!.apiFormat, "embeddings");
});

test("live discovery merges curated embeddings into the response even when /v1/models returns none (#6976)", async () => {
  const connection = await seedConnection("openrouter");
  globalThis.fetch = async () =>
    Response.json({
      data: [{ id: "anthropic/claude-sonnet-5", name: "Claude Sonnet 5" }],
    });

  const response = await callRoute(connection.id);
  const body = (await response.json()) as ModelsResponseBody;

  assert.equal(response.status, 200);
  assert.equal(body.source, "api");
  const ids = body.models.map((m) => m.id);
  // Chat model from the live /v1/models fetch is preserved.
  assert.ok(ids.includes("anthropic/claude-sonnet-5"));
  // RED before the Step 2 merge: the live discovery success path (buildApiDiscoveryResponse)
  // returned `models` verbatim, so curated embeddings never appeared here — only on the
  // no-config local_catalog fallback. GREEN after: curated embeddings/rerank entries from
  // getStaticModelsForProvider() are folded in additively.
  assert.ok(
    ids.includes("baai/bge-m3"),
    `curated embedding baai/bge-m3 should be merged into live discovery; got: ${ids.join(", ")}`
  );
  assert.ok(ids.includes("openai/text-embedding-3-small"));
});

test("live discovery dedups: a model already present in the live catalog is not duplicated (#6976)", async () => {
  const connection = await seedConnection("openrouter");
  globalThis.fetch = async () =>
    Response.json({
      // OpenRouter's live /v1/models never actually lists embedding ids today, but
      // this proves the merge is a dedup-by-id union, not a blind concat.
      data: [{ id: "baai/bge-m3", name: "BGE-M3 (live)" }],
    });

  const response = await callRoute(connection.id);
  const body = (await response.json()) as ModelsResponseBody;

  const bgeEntries = body.models.filter((m) => m.id === "baai/bge-m3");
  assert.equal(bgeEntries.length, 1, "baai/bge-m3 must appear exactly once");
  assert.equal(bgeEntries[0].name, "BGE-M3 (live)", "live entry wins over the curated duplicate");
});
