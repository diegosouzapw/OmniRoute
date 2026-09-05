import { after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-seed-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");

const UUID_V4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

beforeEach(resetStorage);
after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function createCodexOAuthConnection(providerSpecificData?: Record<string, unknown>) {
  const suffix = Math.random().toString(16).slice(2, 10);
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: `codex-${suffix}`,
    accessToken: `access-${suffix}`,
    refreshToken: `refresh-${suffix}`,
    providerSpecificData,
  });
  assert.ok(connection && typeof connection.id === "string");
  return connection;
}

test("codex OAuth connections persist a fingerprint seed at creation (default session mode)", async () => {
  const connection = await createCodexOAuthConnection();
  const psd = connection.providerSpecificData as Record<string, unknown>;
  assert.match(String(psd.codexFingerprintSeed), UUID_V4_PATTERN);
});

test("the seed survives unrelated edits and explicit re-saves (identity stability)", async () => {
  const connection = await createCodexOAuthConnection({ workspaceId: "ws-1" });
  const seed = (connection.providerSpecificData as Record<string, unknown>).codexFingerprintSeed;

  const renamed = await providersDb.updateProviderConnection(connection.id, { name: "renamed" });
  assert.equal(
    (renamed?.providerSpecificData as Record<string, unknown>).codexFingerprintSeed,
    seed
  );

  const resaved = await providersDb.updateProviderConnection(connection.id, {
    providerSpecificData: { workspaceId: "ws-1", codexFingerprintMode: "full" },
  });
  assert.equal(
    (resaved?.providerSpecificData as Record<string, unknown>).codexFingerprintSeed,
    seed
  );
  assert.equal(
    (resaved?.providerSpecificData as Record<string, unknown>).codexFingerprintMode,
    "full"
  );
});

test("explicit off is not seeded; switching to full seeds once and keeps it", async () => {
  const connection = await createCodexOAuthConnection({ codexFingerprintMode: "off" });
  assert.equal(
    (connection.providerSpecificData as Record<string, unknown>).codexFingerprintSeed,
    undefined
  );

  const switched = await providersDb.updateProviderConnection(connection.id, {
    providerSpecificData: { codexFingerprintMode: "full" },
  });
  const psd = switched?.providerSpecificData as Record<string, unknown>;
  assert.match(String(psd.codexFingerprintSeed), UUID_V4_PATTERN);

  const again = await providersDb.updateProviderConnection(connection.id, { name: "again" });
  assert.equal(
    (again?.providerSpecificData as Record<string, unknown>).codexFingerprintSeed,
    psd.codexFingerprintSeed
  );
});

test("a client-supplied seed is replaced by a system-managed one", async () => {
  const connection = await createCodexOAuthConnection({
    codexFingerprintSeed: "client-supplied-not-a-uuid",
  });
  const seed = String(
    (connection.providerSpecificData as Record<string, unknown>).codexFingerprintSeed
  );
  assert.match(seed, UUID_V4_PATTERN);
  assert.notEqual(seed, "client-supplied-not-a-uuid");
});

test("non-OAuth codex connections are never seeded", async () => {
  const suffix = Math.random().toString(16).slice(2, 10);
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: `codex-key-${suffix}`,
    apiKey: `sk-codex-${suffix}`,
  });
  assert.ok(connection);
  const psd = (connection.providerSpecificData ?? {}) as Record<string, unknown>;
  assert.equal(psd.codexFingerprintSeed, undefined);
});
