import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-aliases-cascade-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("deleteModelAliasesForProvider removes only the target provider's aliases", async () => {
  // Managed/imported aliases are stored as key=<alias>, value="<providerId>/<model>".
  await models.setModelAlias("x-fast", "providerX/fast-model");
  await models.setModelAlias("x-smart", "providerX/smart-model");
  await models.setModelAlias("y-mini", "providerY/mini-model");

  const removed = await models.deleteModelAliasesForProvider("providerX");

  assert.deepEqual(removed.sort(), ["x-fast", "x-smart"]);

  const after = await models.getModelAliases();
  // providerX aliases are gone…
  assert.equal(after["x-fast"], undefined);
  assert.equal(after["x-smart"], undefined);
  // …and providerY's alias remains untouched.
  assert.equal(after["y-mini"], "providerY/mini-model");
});

test("deleteModelAliasesForProvider does not match providers sharing a name prefix", async () => {
  // "providerX" must not cascade-delete "providerXL"'s aliases (no partial-prefix match).
  await models.setModelAlias("x-fast", "providerX/fast-model");
  await models.setModelAlias("xl-fast", "providerXL/fast-model");

  const removed = await models.deleteModelAliasesForProvider("providerX");

  assert.deepEqual(removed, ["x-fast"]);

  const after = await models.getModelAliases();
  assert.equal(after["x-fast"], undefined);
  assert.equal(after["xl-fast"], "providerXL/fast-model");
});

test("after cascade delete, re-adding the same provider alias succeeds (re-import unblocked)", async () => {
  await models.setModelAlias("x-fast", "providerX/fast-model");

  await models.deleteModelAliasesForProvider("providerX");

  // Re-import: the alias key/value can be set again with no stale row blocking it.
  await models.setModelAlias("x-fast", "providerX/fast-model");

  const after = await models.getModelAliases();
  assert.equal(after["x-fast"], "providerX/fast-model");
});

test("deleteModelAliasesForProvider returns an empty list when there is nothing to remove", async () => {
  await models.setModelAlias("y-mini", "providerY/mini-model");

  const removed = await models.deleteModelAliasesForProvider("providerX");

  assert.deepEqual(removed, []);
  const after = await models.getModelAliases();
  assert.equal(after["y-mini"], "providerY/mini-model");
});
