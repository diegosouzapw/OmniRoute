/**
 * A 402 from a PAID OpenRouter model locks the whole connection as
 * "credits_exhausted" (intentional connection-scoped behavior for
 * OpenRouter's shared account balance). Only the free models the shipped
 * catalog documents as free-access keep being served from such a
 * connection, so combo failover to free models keeps working while any
 * other `:free`-suffixed id stays excluded on the exhausted balance.
 *
 * getProviderCredentials serves only catalogued free-access model requests
 * from a connection whose ONLY problem is credits_exhausted, while still
 * refusing paid-model requests, uncatalogued `:free` ids, and free-model
 * requests on a connection that's terminal for another reason, e.g. banned.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-openrouter-free-"));
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

test("getProviderCredentials stops serving an uncatalogued :free OpenRouter model after the connection is credits_exhausted", async () => {
  await resetStorage();

  await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    apiKey: "sk-or-exhausted",
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

test("getProviderCredentials still refuses a PAID OpenRouter model on a credits_exhausted connection", async () => {
  await resetStorage();

  await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    apiKey: "sk-or-exhausted-paid",
    isActive: true,
    testStatus: "credits_exhausted",
  });

  const selected = await auth.getProviderCredentials(
    "openrouter",
    null,
    null,
    "anthropic/claude-opus-4.5"
  );

  assert.deepEqual(
    selected,
    { allExpired: true, expiredCount: 1, expiredStatus: "credits_exhausted" },
    "paid-model requests must still be blocked on the exhausted connection"
  );
});

test("getProviderCredentials still refuses a :free OpenRouter model on a banned connection", async () => {
  await resetStorage();

  await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    apiKey: "sk-or-banned",
    isActive: true,
    testStatus: "banned",
  });

  const selected = await auth.getProviderCredentials(
    "openrouter",
    null,
    null,
    "meta-llama/llama-3.1-8b-instruct:free"
  );

  assert.deepEqual(
    selected,
    { allExpired: true, expiredCount: 1, expiredStatus: "banned" },
    "the free-model exemption only applies to credits_exhausted, not other terminal statuses"
  );
});

test("getProviderCredentials still refuses a :free model on a credits_exhausted connection for a NON-openrouter provider", async () => {
  await resetStorage();

  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-oai-exhausted",
    isActive: true,
    testStatus: "credits_exhausted",
  });

  const selected = await auth.getProviderCredentials("openai", null, null, "some-model:free");

  assert.deepEqual(
    selected,
    { allExpired: true, expiredCount: 1, expiredStatus: "credits_exhausted" },
    "the exemption is OpenRouter-specific, since only OpenRouter uses the :free naming convention with a shared balance"
  );
});
