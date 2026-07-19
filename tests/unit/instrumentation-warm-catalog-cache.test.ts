/**
 * Behavioral regression test for warmModelCatalogCache() (src/instrumentation-node.ts).
 *
 * The original PR warmed getUnifiedModelsResponse()'s top-level Response
 * cache with an unauthenticated dummy request. That cache (`catalogCache` in
 * catalog.ts) is keyed by prefix/isCodex/apiKey AND has only a 1.5s TTL
 * (CATALOG_CACHE_TTL_MS — a #6408 burst-dedup window for concurrent SDK/
 * dashboard requests, not a startup-warm cache), so warming it has no lasting
 * effect once real traffic (which almost never arrives within 1.5s of boot,
 * and which typically DOES send an Authorization header — a different cache
 * key) starts flowing.
 *
 * The one genuinely durable, apiKey-independent cost in the catalog build is
 * getOpenRouterCatalog()'s 24h disk-cached network fetch — buildUnifiedModelsResponseCore()
 * calls it unconditionally whenever an OpenRouter connection is configured,
 * decoupled entirely from the per-key Response cache. warmModelCatalogCache()
 * now warms that explicitly. These tests prove:
 *   1. warmup fetches the OpenRouter catalog exactly once when a connection exists,
 *   2. a REAL request using a DIFFERENT apiKey than the warmup afterwards reuses
 *      that warmed cache instead of re-fetching (the actual claimed benefit),
 *   3. warmup makes no OpenRouter network call at all when no connection is configured,
 *   4. warmup never rejects even when the OpenRouter fetch fails.
 *
 * mock.module() is unavailable in this tsx/ESM + Node native test-runner setup
 * (see tests/unit/proxyfetch-undici-retry.test.ts), so globalThis.fetch — a
 * plain mutable global, not a frozen ESM binding — is monkey-patched directly
 * (same pattern as Math.random in tests/unit/apikey-connection-health-check.test.ts).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-warm-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { warmModelCatalogCache } = await import("../../src/instrumentation-node.ts");
const { getUnifiedModelsResponse } = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error) {
      const code = (error as { code?: string } | undefined)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const REAL_FETCH = globalThis.fetch;
let fetchCallCount = 0;

function installFakeOpenRouterFetch(): void {
  fetchCallCount = 0;
  globalThis.fetch = (async () => {
    fetchCallCount++;
    return new Response(JSON.stringify({ data: [{ id: "test/fake-model", architecture: {} }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
}

function installFailingOpenRouterFetch(): void {
  fetchCallCount = 0;
  globalThis.fetch = (async () => {
    fetchCallCount++;
    throw new Error("simulated OpenRouter network failure");
  }) as typeof fetch;
}

function restoreRealFetch(): void {
  globalThis.fetch = REAL_FETCH;
}

test("warmModelCatalogCache warms the OpenRouter catalog once, and a real request with a different apiKey reuses it", async () => {
  await resetStorage();
  installFakeOpenRouterFetch();
  try {
    await providersDb.createProviderConnection({
      provider: "openrouter",
      authType: "apikey",
      name: "test-openrouter",
      apiKey: "sk-or-test",
      isActive: true,
    });

    await warmModelCatalogCache();
    assert.equal(fetchCallCount, 1, "warmup should fetch the OpenRouter catalog exactly once");

    // A real client authenticating with a DIFFERENT apiKey than the warmup's
    // anonymous request must NOT re-trigger the network fetch — this is the
    // actual, durable, apiKey-independent benefit warmModelCatalogCache()
    // delivers, unlike the top-level per-key Response cache (1.5s TTL).
    const realReq = new Request("http://127.0.0.1/v1/models", {
      headers: { Authorization: "Bearer sk-a-totally-different-real-client-key" },
    });
    await (await getUnifiedModelsResponse(realReq)).text();
    assert.equal(
      fetchCallCount,
      1,
      "a real request with a different apiKey should reuse the warmed OpenRouter cache, not re-fetch"
    );
  } finally {
    restoreRealFetch();
  }
});

test("warmModelCatalogCache makes no OpenRouter network call when no OpenRouter connection is configured", async () => {
  await resetStorage();
  installFakeOpenRouterFetch();
  try {
    // No openrouter connection created — warmup must not make an
    // unconditional third-party network call for deployments that never use it.
    await warmModelCatalogCache();
    assert.equal(
      fetchCallCount,
      0,
      "warmup should not call the OpenRouter API without a configured connection"
    );
  } finally {
    restoreRealFetch();
  }
});

test("warmModelCatalogCache never rejects, even when the OpenRouter fetch fails", async () => {
  await resetStorage();
  await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "test-openrouter-failing",
    apiKey: "sk-or-test-fail",
    isActive: true,
  });
  installFailingOpenRouterFetch();
  try {
    await assert.doesNotReject(() => warmModelCatalogCache());
    assert.ok(fetchCallCount > 0, "precondition: the fetch was actually attempted and failed");
  } finally {
    restoreRealFetch();
  }
});
