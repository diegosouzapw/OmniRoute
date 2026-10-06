/**
 * Issue #8887 — deleting a provider connection must invalidate LKGP pins that
 * reference it without disturbing surviving, provider-level, or legacy pins.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lkgp-8887-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
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

async function createConnection(provider: string, name: string): Promise<string> {
  const connection = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `test-key-${name}`,
  });

  assert.equal(typeof connection.id, "string", "provider fixture must return a connection id");
  return connection.id as string;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#8887: single delete removes only the matching LKGP pin", async () => {
  const doomedId = await createConnection("berry", "single-doomed");
  const survivorId = await createConnection("berry", "single-survivor");

  await lkgpDb.setLKGP("single-doomed", "model-x", "berry", doomedId);
  await lkgpDb.setLKGP("single-survivor", "model-y", "berry", survivorId);

  assert.equal(await providersDb.deleteProviderConnection(doomedId), true);

  assert.equal(await lkgpDb.getLKGP("single-doomed", "model-x"), null);
  assert.deepEqual(await lkgpDb.getLKGP("single-survivor", "model-y"), {
    provider: "berry",
    connectionId: survivorId,
  });
});

test("#8887: single delete invalidates a warmed LKGP read-cache entry", async () => {
  const doomedId = await createConnection("berry", "cached-doomed");

  await lkgpDb.setLKGP("cached-doomed", "model-x", "berry", doomedId);

  assert.deepEqual(await readCache.getCachedLKGP("cached-doomed", "model-x"), {
    provider: "berry",
    connectionId: doomedId,
  });

  assert.equal(await providersDb.deleteProviderConnection(doomedId), true);

  assert.equal(
    await readCache.getCachedLKGP("cached-doomed", "model-x"),
    null,
    "deleted LKGP pins must not survive in the 5s read cache"
  );
});

test("#8887: bulk delete removes every matching LKGP pin", async () => {
  const doomedA = await createConnection("berry", "bulk-doomed-a");
  const doomedB = await createConnection("berry", "bulk-doomed-b");
  const survivorId = await createConnection("berry", "bulk-survivor");

  await lkgpDb.setLKGP("bulk-a", "model-x", "berry", doomedA);
  await lkgpDb.setLKGP("bulk-b", "model-y", "berry", doomedB);
  await lkgpDb.setLKGP("bulk-survivor", "model-z", "berry", survivorId);

  assert.equal(await providersDb.deleteProviderConnections([doomedA, doomedB]), 2);

  assert.equal(await lkgpDb.getLKGP("bulk-a", "model-x"), null);
  assert.equal(await lkgpDb.getLKGP("bulk-b", "model-y"), null);
  assert.deepEqual(await lkgpDb.getLKGP("bulk-survivor", "model-z"), {
    provider: "berry",
    connectionId: survivorId,
  });
});

test("#8887: provider-wide delete removes that provider's LKGP pins only", async () => {
  const berryId = await createConnection("berry", "provider-doomed");
  const cherryId = await createConnection("cherry", "provider-survivor");

  await lkgpDb.setLKGP("provider-doomed", "model-x", "berry", berryId);
  await lkgpDb.setLKGP("provider-survivor", "model-y", "cherry", cherryId);

  assert.equal(await providersDb.deleteProviderConnectionsByProvider("berry"), 1);

  assert.equal(await lkgpDb.getLKGP("provider-doomed", "model-x"), null);
  assert.deepEqual(await lkgpDb.getLKGP("provider-survivor", "model-y"), {
    provider: "cherry",
    connectionId: cherryId,
  });
});

test("#8887: provider-level LKGP pins without connectionId are preserved", async () => {
  const doomedId = await createConnection("berry", "provider-level");

  await lkgpDb.setLKGP("provider-level", "model-x", "berry");

  assert.equal(await providersDb.deleteProviderConnection(doomedId), true);
  assert.deepEqual(await lkgpDb.getLKGP("provider-level", "model-x"), { provider: "berry" });
});

test("#8887: legacy LKGP values are preserved during connection cleanup", async () => {
  const doomedId = await createConnection("berry", "legacy");
  const db = core.getDbInstance();

  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('lkgp', ?, ?)").run(
    "legacy:model-x",
    "berry"
  );

  assert.equal(await providersDb.deleteProviderConnection(doomedId), true);
  assert.deepEqual(await lkgpDb.getLKGP("legacy", "model-x"), { provider: "berry" });
});

test("#8887: deleting an unpinned connection does not disturb unrelated LKGP state", async () => {
  const doomedId = await createConnection("berry", "unpinned");
  const survivorId = await createConnection("cherry", "unrelated");

  await lkgpDb.setLKGP("unrelated", "model-y", "cherry", survivorId);

  assert.equal(await providersDb.deleteProviderConnection(doomedId), true);
  assert.deepEqual(await lkgpDb.getLKGP("unrelated", "model-y"), {
    provider: "cherry",
    connectionId: survivorId,
  });
});
