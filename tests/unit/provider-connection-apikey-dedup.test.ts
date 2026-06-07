import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-apikey-dedup-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "apikey-dedup-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function apiKeyConnections(provider: string) {
  const all = await providersDb.getProviderConnections({});
  return all.filter((c: any) => c.provider === provider && c.authType === "apikey");
}

// #3023 — adding the same API key twice (even under a different name) used to
// create a duplicate connection row. It must now dedup onto the existing one.
test("re-adding the same API key dedups instead of creating a duplicate (#3023)", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "key A",
    apiKey: "sk-DUP-123456",
  });
  const second = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "key B (same secret)",
    apiKey: "sk-DUP-123456",
  });

  const conns = await apiKeyConnections("openai");
  assert.equal(conns.length, 1, "a duplicate API key must not create a second row");
  assert.equal(second.id, first.id, "the duplicate must update the existing connection");
});

// Whitespace-only differences in the pasted key still dedup.
test("re-adding the same API key with surrounding whitespace still dedups (#3023)", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "key A",
    apiKey: "sk-TRIM-9",
  });
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "key B",
    apiKey: "  sk-TRIM-9  ",
  });

  assert.equal((await apiKeyConnections("openai")).length, 1);
});

// Genuinely different keys remain separate connections.
test("different API keys for the same provider create separate connections (#3023)", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "key A",
    apiKey: "sk-AAA",
  });
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "key B",
    apiKey: "sk-BBB",
  });

  assert.equal((await apiKeyConnections("openai")).length, 2);
});
