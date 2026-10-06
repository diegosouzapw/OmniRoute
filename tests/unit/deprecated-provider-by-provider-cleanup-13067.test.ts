/**
 * by-provider leftover purge must finish the same post-steps as
 * single-row delete: bump the proxy cache generation and drop
 * synced model lists for that provider.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13067-by-provider-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const deletionPath = path.join(repoRoot, "src/lib/db/providers/deletion.ts");

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const models = await import("../../src/lib/db/models.ts");

const TEST_PROVIDER = "__test_provider_13067__";
const OTHER_PROVIDER = "__other_provider_13067__";

function extractFunctionBody(source: string, name: string): string {
  const start = source.indexOf(`export async function ${name}`);
  assert.ok(start >= 0, `${name} must exist`);
  const nextExport = source.indexOf("\nexport ", start + 1);
  return nextExport >= 0 ? source.slice(start, nextExport) : source.slice(start);
}

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
      break;
    } catch (error: unknown) {
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

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("by-provider delete calls proxy bump and synced-model purge", () => {
  const source = fs.readFileSync(deletionPath, "utf8");
  const body = extractFunctionBody(source, "deleteProviderConnectionsByProvider");
  assert.match(
    source,
    /deleteSyncedAvailableModelsForProvider/,
    "deletion helper must import the existing synced-model purge"
  );
  assert.match(
    body,
    /\bbumpProxyConfigGeneration\s*\(/,
    "by-provider path must bump proxy generation like single-row delete"
  );
  assert.match(
    body,
    /\bdeleteSyncedAvailableModelsForProvider\s*\(/,
    "by-provider path must drop synced models for the purged provider"
  );
});

test("single-row delete does not take the by-provider synced-model helper", () => {
  const source = fs.readFileSync(deletionPath, "utf8");
  const body = extractFunctionBody(source, "deleteProviderConnection");
  assert.match(body, /\bbumpProxyConfigGeneration\s*\(/);
  assert.doesNotMatch(
    body,
    /\bdeleteSyncedAvailableModelsForProvider\s*\(/,
    "per-id delete already cleans models at the route; do not fork a second deleter here"
  );
});

test("by-provider delete drops this provider's synced models and leaves others", async () => {
  const target = await providersDb.createProviderConnection({
    provider: TEST_PROVIDER,
    authType: "apikey",
    name: "leftover-a",
    apiKey: `sk-13067-a-${Date.now()}`,
  });
  const sibling = await providersDb.createProviderConnection({
    provider: TEST_PROVIDER,
    authType: "apikey",
    name: "leftover-b",
    apiKey: `sk-13067-b-${Date.now()}`,
  });
  const other = await providersDb.createProviderConnection({
    provider: OTHER_PROVIDER,
    authType: "apikey",
    name: "keep-me",
    apiKey: `sk-13067-keep-${Date.now()}`,
  });
  assert.ok(target?.id && sibling?.id && other?.id);

  await models.replaceSyncedAvailableModelsForConnection(TEST_PROVIDER, target.id, [
    { id: "orphan-model", name: "Orphan" },
  ]);
  await models.replaceSyncedAvailableModelsForConnection(TEST_PROVIDER, sibling.id, [
    { id: "orphan-model-2", name: "Orphan 2" },
  ]);
  await models.replaceSyncedAvailableModelsForConnection(OTHER_PROVIDER, other.id, [
    { id: "keep-model", name: "Keep" },
  ]);

  const deleted = await providersDb.deleteProviderConnectionsByProvider(TEST_PROVIDER);
  assert.equal(deleted, 2);

  assert.deepEqual(await models.getSyncedAvailableModelsForConnection(TEST_PROVIDER, target.id), []);
  assert.deepEqual(await models.getSyncedAvailableModelsForConnection(TEST_PROVIDER, sibling.id), []);
  const kept = await models.getSyncedAvailableModelsForConnection(OTHER_PROVIDER, other.id);
  assert.equal(kept.length, 1);
  assert.equal(kept[0]?.id, "keep-model");
});

test("by-provider synced-model purge must not fail the delete", () => {
  const source = fs.readFileSync(deletionPath, "utf8");
  const body = extractFunctionBody(source, "deleteProviderConnectionsByProvider");
  const syncedIdx = body.indexOf("deleteSyncedAvailableModelsForProvider(");
  assert.ok(syncedIdx >= 0, "by-provider path must purge synced models");
  const tryIdx = body.lastIndexOf("try {", syncedIdx);
  const catchIdx = body.indexOf("catch", syncedIdx);
  assert.ok(tryIdx >= 0 && tryIdx < syncedIdx, "synced purge must sit in try");
  assert.ok(catchIdx > syncedIdx, "synced purge must be caught so delete still returns");
});
