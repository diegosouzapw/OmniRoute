/**
 * Tests for checkMultipleKeyModelAccess (batch access check).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-apikeygroups-batch-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const groupsDb = await import("../../src/lib/db/apiKeyGroups.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 50 * (attempt + 1)));
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
}

test.before(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    // best-effort
  }
});

test("batch result deep-equals looping checkKeyModelAccess for (key, model) pairs", async () => {
  await resetStorage();

  // Create a group with allow for gpt-4 and deny for claude-3
  const group = groupsDb.createKeyGroup("TestGroup");
  groupsDb.addGroupPermission(group.id, "gpt-4", "allow");
  groupsDb.addGroupPermission(group.id, "claude-3", "deny");

  // Create a key and add it to the group
  // We'll fabricate a key id since apiKeyGroups only needs the id string
  const keyId = "test-key-001";
  groupsDb.addKeyToGroup(keyId, group.id);

  const models = ["gpt-4", "claude-3", "gpt-3.5"];

  const batch = groupsDb.checkMultipleKeyModelAccess([keyId], models);
  const innerMap = batch.get(keyId)!;

  for (const model of models) {
    const single = groupsDb.checkKeyModelAccess(keyId, model);
    const batchResult = innerMap.get(model)!;

    assert.strictEqual(
      batchResult.allowed,
      single.allowed,
      `allowed mismatch for model=${model}`
    );
    assert.strictEqual(
      batchResult.deniedBy?.id ?? null,
      single.deniedBy?.id ?? null,
      `deniedBy mismatch for model=${model}`
    );
    assert.strictEqual(
      batchResult.matchedRules.length,
      single.matchedRules.length,
      `matchedRules length mismatch for model=${model}`
    );
  }
});

test("key with no groups → all models allowed (same as checkKeyModelAccess)", async () => {
  await resetStorage();

  const keyId = "no-group-key";
  const models = ["any-model", "another-model"];

  const batch = groupsDb.checkMultipleKeyModelAccess([keyId], models);
  for (const model of models) {
    const batchResult = batch.get(keyId)!.get(model)!;
    const single = groupsDb.checkKeyModelAccess(keyId, model);
    assert.deepEqual(batchResult, single);
  }
});

test("empty keyIds → empty outer map, no throw", async () => {
  await resetStorage();
  const result = groupsDb.checkMultipleKeyModelAccess([], ["gpt-4"]);
  assert.strictEqual(result.size, 0);
});

test("empty models → inner map is empty for each key, no throw", async () => {
  await resetStorage();
  const result = groupsDb.checkMultipleKeyModelAccess(["some-key"], []);
  assert.strictEqual(result.size, 1);
  assert.strictEqual(result.get("some-key")!.size, 0);
});
