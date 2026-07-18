/**
 * Local/API-key provider-limits sync must honor PROVIDER_LIMITS_SYNC_SPACING_MS
 * too, not just the OAuth path (#6916).
 *
 * `syncAllProviderLimits` previously ran non-OAuth (local/API-key, e.g. Ollama)
 * connections in `concurrency`-sized chunks with NO spacing at all between
 * chunks, so setting `PROVIDER_LIMITS_SYNC_SPACING_MS` had no effect on that
 * path. This is the direct regression guard: forces >1 chunk (concurrency=1)
 * and asserts a measured gap >= spacingMs between chunk start times.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-apikey-spacing-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-apikey-spacing-sync-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerLimits = await import("../../src/lib/usage/providerLimits.ts");

const originalFetch = globalThis.fetch;

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.PROVIDER_LIMITS_SYNC_SPACING_MS;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  delete process.env.PROVIDER_LIMITS_SYNC_SPACING_MS;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function createGlmApiKeyConnection(i: number) {
  return providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `GLM Spacing ${i}`,
    apiKey: `glm-spacing-key-${i}`,
  });
}

function glmQuotaResponse() {
  return new Response(
    JSON.stringify({
      code: 200,
      success: true,
      data: {
        planName: "max",
        limits: [
          {
            type: "TOKENS_LIMIT",
            unit: 3,
            number: 5,
            percentage: 13,
            nextResetTime: Math.floor(Date.now() / 1000) + 3 * 3600,
            models: [],
          },
        ],
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

test("syncAllProviderLimits spaces chunks for local/API-key connections when spacingMs is set", async () => {
  process.env.PROVIDER_LIMITS_SYNC_SPACING_MS = "60";
  for (let i = 0; i < 3; i++) await createGlmApiKeyConnection(i);

  const chunkStarts: number[] = [];
  const start = Date.now();

  globalThis.fetch = (async () => {
    chunkStarts.push(Date.now() - start);
    return glmQuotaResponse();
  }) as typeof fetch;

  // concurrency: 1 forces 3 chunks of size 1 → 2 gaps must be >= spacingMs.
  await providerLimits.syncAllProviderLimits({ source: "scheduled", concurrency: 1 });

  assert.equal(chunkStarts.length, 3, "expected 3 fetches, one per connection");
  const gaps: number[] = [];
  for (let i = 1; i < chunkStarts.length; i++) gaps.push(chunkStarts[i] - chunkStarts[i - 1]);
  assert.ok(
    gaps.every((g) => g >= 50),
    `every chunk gap must be >= configured spacing (~60ms), gaps=${gaps.join(",")}`
  );
});

test("syncAllProviderLimits does not space local/API-key chunks when spacingMs=0 (opt-out)", async () => {
  process.env.PROVIDER_LIMITS_SYNC_SPACING_MS = "0";
  for (let i = 0; i < 3; i++) await createGlmApiKeyConnection(i);

  const chunkStarts: number[] = [];
  const start = Date.now();

  globalThis.fetch = (async () => {
    chunkStarts.push(Date.now() - start);
    return glmQuotaResponse();
  }) as typeof fetch;

  await providerLimits.syncAllProviderLimits({ source: "scheduled", concurrency: 1 });

  assert.equal(chunkStarts.length, 3);
  const gaps: number[] = [];
  for (let i = 1; i < chunkStarts.length; i++) gaps.push(chunkStarts[i] - chunkStarts[i - 1]);
  assert.ok(
    gaps.every((g) => g < 40),
    `spacingMs=0 must not introduce a forced gap, gaps=${gaps.join(",")}`
  );
});
