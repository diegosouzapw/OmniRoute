import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lmstudio-multi-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "lmstudio-multi-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

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

function connectionId(connection: unknown): unknown {
  return (connection as { id?: unknown })?.id;
}

async function apiKeyConnections(provider: string) {
  const all = await providersDb.getProviderConnections({});
  return (all as Array<Record<string, unknown>>).filter(
    (c) => c.provider === provider && c.authType === "apikey"
  );
}

// #12173 — two distinct local LM Studio servers (different name, different
// providerSpecificData.baseUrl) that happen to share the same optional API
// key value must NOT collapse into one connection. The apikey-value dedup
// (#3023) was written for hosted providers where the key IS the account
// identity; for local/self-hosted providers the key is optional and users
// commonly reuse the same placeholder value across independent servers that
// are actually distinguished by base URL.
test("two LM Studio connections with different baseUrl but same optional API key stay separate (#12173)", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "lm-studio",
    authType: "apikey",
    name: "lmstudio-main",
    apiKey: "lm-studio",
    providerSpecificData: { baseUrl: "http://localhost:1234/v1" },
  });
  const second = await providersDb.createProviderConnection({
    provider: "lm-studio",
    authType: "apikey",
    name: "lmstudio-second",
    apiKey: "lm-studio",
    providerSpecificData: { baseUrl: "http://192.168.1.50:1234/v1" },
  });

  const conns = await apiKeyConnections("lm-studio");
  assert.equal(conns.length, 2, "distinct-baseUrl local connections must not be deduped onto one row");
  assert.notEqual(connectionId(second), connectionId(first), "the second add must create a new connection, not overwrite the first");
});

// Same baseUrl + same apiKey for a local provider must still dedup to 1 row
// (re-adding the same server should update, not duplicate).
test("two LM Studio connections with the same baseUrl and same API key still dedup to one row (#12173)", async () => {
  await providersDb.createProviderConnection({
    provider: "lm-studio",
    authType: "apikey",
    name: "lmstudio-main",
    apiKey: "lm-studio",
    providerSpecificData: { baseUrl: "http://localhost:1234/v1" },
  });
  await providersDb.createProviderConnection({
    provider: "lm-studio",
    authType: "apikey",
    name: "lmstudio-main-renamed",
    apiKey: "lm-studio",
    providerSpecificData: { baseUrl: "http://localhost:1234/v1/" },
  });

  const conns = await apiKeyConnections("lm-studio");
  assert.equal(conns.length, 1, "re-adding the same local server (same baseUrl, trailing slash aside) must dedup to one row");
});

// Hosted providers (#3023) must keep matching purely on apiKey value —
// no baseUrl carve-out for non-local providers.
test("hosted provider (openai) apiKey-value dedup is unaffected by baseUrl (#12173 regression guard)", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-main",
    apiKey: "sk-shared-secret",
  });
  const second = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-second",
    apiKey: "sk-shared-secret",
  });

  const conns = await apiKeyConnections("openai");
  assert.equal(conns.length, 1, "hosted-provider apiKey dedup (#3023) must still collapse to one row");
  assert.equal(connectionId(second), connectionId(first), "the second add must update the same hosted connection");
});
