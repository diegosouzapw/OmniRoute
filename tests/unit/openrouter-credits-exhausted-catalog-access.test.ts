/**
 * An OpenRouter connection locked as "credits_exhausted" must keep serving
 * only the free models the catalog documents as free-access, and must stop
 * serving any other `:free`-suffixed id. The `:free` suffix alone is not
 * proof of free access once the paid balance is exhausted.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-openrouter-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a credits_exhausted OpenRouter connection stops serving a :free model outside the free-access catalog", async () => {
  await resetStorage();

  await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    apiKey: "sk-or-exhausted-uncatalogued",
    isActive: true,
    testStatus: "credits_exhausted",
  });

  const selected = await auth.getProviderCredentials(
    "openrouter",
    null,
    null,
    "meta-llama/llama-3.1-8b-instruct:free"
  );

  assert.deepEqual(
    selected,
    { allExpired: true, expiredCount: 1, expiredStatus: "credits_exhausted" },
    "a :free model without catalogued free access must be excluded on the exhausted connection"
  );
});

test("a credits_exhausted OpenRouter connection keeps serving a catalogued free-access model", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    apiKey: "sk-or-exhausted-catalogued",
    isActive: true,
    testStatus: "credits_exhausted",
  });

  const selected = await auth.getProviderCredentials(
    "openrouter",
    null,
    null,
    "liquid/lfm-2.5-2.6b:free"
  );

  assert.ok(selected, "a catalogued free-access model must still be served");
  assert.equal(selected.connectionId, conn.id);
});
