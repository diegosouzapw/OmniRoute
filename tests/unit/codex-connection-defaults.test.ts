import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-defaults-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { migrateCodexConnectionDefaultsFromLegacySettings } =
  await import("../../src/lib/providers/codexConnectionDefaults.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("migration backfills Codex request defaults, preserves existing providerSpecificData, and is idempotent", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "first@example.com",
    providerSpecificData: {
      workspaceId: "ws-first",
      tag: "team-a",
      codexLimitPolicy: { use5h: false, useWeekly: true },
    },
  });
  const second = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "second@example.com",
    providerSpecificData: {
      workspaceId: "ws-second",
      tag: "team-b",
      requestDefaults: { reasoningEffort: "high" },
    },
  });
  const untouched = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "third@example.com",
    providerSpecificData: {
      workspaceId: "ws-third",
      tag: "team-c",
      requestDefaults: { reasoningEffort: "low", serviceTier: "priority" },
    },
  });

  await settingsDb.updateSettings({ codexServiceTier: { enabled: true } });

  const firstRun = await migrateCodexConnectionDefaultsFromLegacySettings();
  const rows = await providersDb.getProviderConnections({ provider: "codex" });
  const byId = new Map(rows.map((row) => [row.id, row]));
  const settings = await settingsDb.getSettings();

  assert.equal(firstRun.migrated, true);
  assert.deepEqual(firstRun.updatedConnectionIds.sort(), [first.id, second.id].sort());
  assert.deepEqual((byId.get(first.id).providerSpecificData as any).requestDefaults, {
    reasoningEffort: "medium",
    serviceTier: "priority",
  });
  assert.deepEqual((byId.get(second.id) as any).providerSpecificData.requestDefaults, {
    reasoningEffort: "high",
    serviceTier: "priority",
  });
  assert.deepEqual((byId.get(untouched.id) as any).providerSpecificData.requestDefaults, {
    reasoningEffort: "low",
    serviceTier: "priority",
  });
  assert.equal((byId.get((first as any).id).providerSpecificData as any).tag, "team-a");
  assert.deepEqual((byId as any).get(first.id).providerSpecificData.codexLimitPolicy, {
    use5h: false,
    useWeekly: true,
  });
  assert.ok(settings.codexConnectionDefaultsMigrationV1);

  const secondRun = await migrateCodexConnectionDefaultsFromLegacySettings();
  assert.equal(secondRun.migrated, false);
  assert.deepEqual(secondRun.updatedConnectionIds, []);
});

test("provider connection persistence normalizes request defaults without dropping unrelated keys", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "normalize@example.com",
    providerSpecificData: {
      openaiStoreEnabled: true,
      workspaceId: "ws-normalize",
      tag: "team-z",
      requestDefaults: {
        reasoningEffort: "HIGH",
        serviceTier: "fast",
        customFlag: "keep-me",
      },
    },
  });

  (assert as any).deepEqual((created.providerSpecificData as any).requestDefaults, {
    reasoningEffort: "high",
    serviceTier: "priority",
    customFlag: "keep-me",
  });
  assert.equal((created.providerSpecificData as any).openaiStoreEnabled, true);
  assert.equal((created.providerSpecificData as any).workspaceId, "ws-normalize");
  assert.equal((created.providerSpecificData as any).tag, "team-z");

  const updated = await providersDb.updateProviderConnection((created as any).id, {
    providerSpecificData: {
      ...created.providerSpecificData,
      requestDefaults: { reasoningEffort: "medium" },
    },
  });

  assert.deepEqual((updated.providerSpecificData as any).requestDefaults, {
    reasoningEffort: "medium",
  });
  assert.equal((updated.providerSpecificData as any).openaiStoreEnabled, true);
  assert.equal((updated.providerSpecificData as any).workspaceId, "ws-normalize");
  assert.equal((updated.providerSpecificData as any).tag, "team-z");
});
