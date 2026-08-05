/**
 * Issue #8887 — deleting a provider connection must invalidate the LKGP pins
 * that point at it.
 *
 * `setLKGP()` persists `{ provider, connectionId }` under the `lkgp` namespace of
 * `key_value`, but none of the three delete paths in `src/lib/db/providers.ts`
 * touch that namespace. The pin therefore survives the connection it references
 * and becomes unbounded stale state.
 *
 * These tests drive only shipped public API (`setLKGP` / `getLKGP` /
 * `deleteProviderConnection*`) against the real modules — no mocking of the
 * module under test.
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

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const code = (error as NodeJS.ErrnoException | null)?.code;
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("deleteProviderConnection drops the LKGP pin for that connection and keeps others", async () => {
  const doomed = await providersDb.createProviderConnection({
    provider: "berry",
    authType: "apikey",
    name: "Doomed",
    apiKey: "sk-doomed",
  });
  const survivor = await providersDb.createProviderConnection({
    provider: "berry",
    authType: "apikey",
    name: "Survivor",
    apiKey: "sk-survivor",
  });

  await lkgpDb.setLKGP("combo-a", "model-x", "berry", (doomed as { id: string }).id);
  await lkgpDb.setLKGP("combo-b", "model-y", "berry", (survivor as { id: string }).id);

  assert.equal(await providersDb.deleteProviderConnection((doomed as { id: string }).id), true);

  assert.equal(
    await lkgpDb.getLKGP("combo-a", "model-x"),
    null,
    "pin for the deleted connection must be gone"
  );
  assert.deepEqual(
    await lkgpDb.getLKGP("combo-b", "model-y"),
    { provider: "berry", connectionId: (survivor as { id: string }).id },
    "pin for a surviving connection must be untouched"
  );
});

test("deleteProviderConnections drops every LKGP pin it deleted a connection for", async () => {
  const a = await providersDb.createProviderConnection({
    provider: "berry",
    authType: "apikey",
    name: "Alpha",
    apiKey: "sk-alpha",
  });
  const b = await providersDb.createProviderConnection({
    provider: "berry",
    authType: "apikey",
    name: "Beta",
    apiKey: "sk-beta",
  });
  const keep = await providersDb.createProviderConnection({
    provider: "berry",
    authType: "apikey",
    name: "Keep",
    apiKey: "sk-keep",
  });

  await lkgpDb.setLKGP("combo-a", "model-x", "berry", (a as { id: string }).id);
  await lkgpDb.setLKGP("combo-b", "model-y", "berry", (b as { id: string }).id);
  await lkgpDb.setLKGP("combo-c", "model-z", "berry", (keep as { id: string }).id);

  assert.equal(
    await providersDb.deleteProviderConnections([
      (a as { id: string }).id,
      (b as { id: string }).id,
    ]),
    2
  );

  assert.equal(await lkgpDb.getLKGP("combo-a", "model-x"), null);
  assert.equal(await lkgpDb.getLKGP("combo-b", "model-y"), null);
  assert.deepEqual(await lkgpDb.getLKGP("combo-c", "model-z"), {
    provider: "berry",
    connectionId: (keep as { id: string }).id,
  });
});

test("deleteProviderConnectionsByProvider drops that provider's LKGP pins only", async () => {
  const berry = await providersDb.createProviderConnection({
    provider: "berry",
    authType: "apikey",
    name: "Berry One",
    apiKey: "sk-berry",
  });
  const cherry = await providersDb.createProviderConnection({
    provider: "cherry",
    authType: "apikey",
    name: "Cherry One",
    apiKey: "sk-cherry",
  });

  await lkgpDb.setLKGP("combo-a", "model-x", "berry", (berry as { id: string }).id);
  await lkgpDb.setLKGP("combo-b", "model-y", "cherry", (cherry as { id: string }).id);

  assert.equal(await providersDb.deleteProviderConnectionsByProvider("berry"), 1);

  assert.equal(await lkgpDb.getLKGP("combo-a", "model-x"), null);
  assert.deepEqual(await lkgpDb.getLKGP("combo-b", "model-y"), {
    provider: "cherry",
    connectionId: (cherry as { id: string }).id,
  });
});

test("an LKGP pin without a connectionId is left alone by a connection delete", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "berry",
    authType: "apikey",
    name: "Bare",
    apiKey: "sk-bare",
  });

  await lkgpDb.setLKGP("combo-bare", "model-x", "berry");

  assert.equal(await providersDb.deleteProviderConnection((connection as { id: string }).id), true);

  assert.deepEqual(await lkgpDb.getLKGP("combo-bare", "model-x"), { provider: "berry" });
});

test("deleting a connection with no LKGP pins is a no-op and does not throw", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "berry",
    authType: "apikey",
    name: "Unpinned",
    apiKey: "sk-unpinned",
  });
  const other = await providersDb.createProviderConnection({
    provider: "cherry",
    authType: "apikey",
    name: "Other",
    apiKey: "sk-other",
  });
  await lkgpDb.setLKGP("combo-other", "model-y", "cherry", (other as { id: string }).id);

  assert.equal(await providersDb.deleteProviderConnection((connection as { id: string }).id), true);

  assert.deepEqual(await lkgpDb.getLKGP("combo-other", "model-y"), {
    provider: "cherry",
    connectionId: (other as { id: string }).id,
  });
});
