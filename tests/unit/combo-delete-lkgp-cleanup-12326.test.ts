/**
 * Issue #12326 — deleting a combo must remove the LKGP pins keyed by its name
 * without disturbing surviving combos' pins.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lkgp-12326-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const comboRepo = await import("../../src/lib/db/repositories/sqliteComboRepository.ts");
const lkgpDb = await import("../../src/lib/db/settings/lkgp.ts");
const readCache = await import("../../src/lib/db/readCache.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      break;
    } catch (error: unknown) {
      const code =
        error && typeof error === "object" && "code" in error
          ? String((error as { code?: unknown }).code)
          : "";

      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
        continue;
      }

      throw error;
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function createCombo(name: string): Promise<string> {
  const combo = await comboRepo.createCombo({
    name,
    models: [{ provider: "berry", model: "model-x" }],
  } as Parameters<typeof comboRepo.createCombo>[0]);

  assert.equal(typeof combo.id, "string", "combo fixture must return an id");
  return combo.id as string;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#12326: deleting a combo removes its LKGP pins", async () => {
  const doomedId = await createCombo("doomed-combo");
  await createCombo("survivor-combo");

  await lkgpDb.setLKGP("doomed-combo", "model-x", "berry", "conn-1");
  await lkgpDb.setLKGP("doomed-combo", "model-y", "berry", "conn-2");
  await lkgpDb.setLKGP("survivor-combo", "model-x", "berry", "conn-3");

  assert.equal(await comboRepo.deleteCombo(doomedId), true);

  assert.equal(await lkgpDb.getLKGP("doomed-combo", "model-x"), null);
  assert.equal(await lkgpDb.getLKGP("doomed-combo", "model-y"), null);
  assert.deepEqual(await lkgpDb.getLKGP("survivor-combo", "model-x"), {
    provider: "berry",
    connectionId: "conn-3",
  });
});

test("#12326: deleting a combo invalidates warmed LKGP read-cache entries", async () => {
  const doomedId = await createCombo("cached-combo");

  await lkgpDb.setLKGP("cached-combo", "model-x", "berry", "conn-1");

  assert.deepEqual(await readCache.getCachedLKGP("cached-combo", "model-x"), {
    provider: "berry",
    connectionId: "conn-1",
  });

  assert.equal(await comboRepo.deleteCombo(doomedId), true);

  assert.equal(
    await readCache.getCachedLKGP("cached-combo", "model-x"),
    null,
    "deleted combos' LKGP pins must not survive in the read cache"
  );
});

test("#12326: a combo whose name prefixes another keeps the sibling's pins", async () => {
  const doomedId = await createCombo("prod");
  await createCombo("prod-canary");

  await lkgpDb.setLKGP("prod", "model-x", "berry", "conn-1");
  await lkgpDb.setLKGP("prod-canary", "model-x", "berry", "conn-2");

  assert.equal(await comboRepo.deleteCombo(doomedId), true);

  assert.equal(await lkgpDb.getLKGP("prod", "model-x"), null);
  assert.deepEqual(
    await lkgpDb.getLKGP("prod-canary", "model-x"),
    { provider: "berry", connectionId: "conn-2" },
    "the ':' delimiter must keep a prefix-sharing sibling's pins intact"
  );
});

test("#12326: LIKE wildcards in a combo name do not widen the cleanup", async () => {
  const doomedId = await createCombo("temp_a");
  await createCombo("tempXa");

  await lkgpDb.setLKGP("temp_a", "model-x", "berry", "conn-1");
  await lkgpDb.setLKGP("tempXa", "model-x", "berry", "conn-2");

  assert.equal(await comboRepo.deleteCombo(doomedId), true);

  assert.equal(await lkgpDb.getLKGP("temp_a", "model-x"), null);
  assert.deepEqual(
    await lkgpDb.getLKGP("tempXa", "model-x"),
    { provider: "berry", connectionId: "conn-2" },
    "'_' must be escaped so it cannot match an arbitrary character"
  );
});

test("#12326: deleting an unknown combo id leaves LKGP state untouched", async () => {
  await createCombo("untouched-combo");
  await lkgpDb.setLKGP("untouched-combo", "model-x", "berry", "conn-1");

  assert.equal(await comboRepo.deleteCombo("00000000-0000-0000-0000-000000000000"), false);

  assert.deepEqual(await lkgpDb.getLKGP("untouched-combo", "model-x"), {
    provider: "berry",
    connectionId: "conn-1",
  });
});

test("#12326: deleting a combo without pins succeeds", async () => {
  const doomedId = await createCombo("no-pins-combo");

  assert.equal(await comboRepo.deleteCombo(doomedId), true);
  assert.equal(await lkgpDb.getLKGP("no-pins-combo", "model-x"), null);
});
