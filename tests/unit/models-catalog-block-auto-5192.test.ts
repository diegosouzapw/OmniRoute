/**
 * #5192 — Blocking the "Auto (Zero-Config)" provider in Security settings must
 * remove the built-in `auto/*` combos from the `/v1/models` listing.
 *
 * The catalog advertises the built-in `auto/*` combos (#4164 / #4235) at the top
 * of `/v1/models`, but that injection loop ignored `settings.blockedProviders`,
 * so checking "Auto (Zero-Config)" in Security → Blocked Providers had no effect:
 * the model picker still showed `auto/*` entries. Blocking the system provider id
 * `auto` (its id and alias are both "auto") must suppress the whole `auto/*` block.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-block-auto-5192-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "block-auto-5192-test-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

type ModelsResponseBody = { data: Array<{ id: string }> };

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function getIds(): Promise<Set<string>> {
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as ModelsResponseBody;
  return new Set(body.data.map((item) => item.id));
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#5192 baseline: built-in auto/* combos are listed when Auto is not blocked", async () => {
  const ids = await getIds();
  assert.ok(ids.has("auto/best-coding"), "auto/best-coding should be listed by default");
  assert.ok(ids.has("auto/coding"), "auto/coding should be listed by default");
});

test("#5192: blocking the Auto (Zero-Config) provider removes all auto/* combos", async () => {
  await settingsDb.updateSettings({ blockedProviders: ["auto"] });
  const ids = await getIds();
  const leaked = [...ids].filter((id) => id === "auto" || id.startsWith("auto/"));
  assert.deepEqual(
    leaked,
    [],
    `no auto/* combos should be listed when Auto is blocked, but got: ${leaked.join(", ")}`
  );
});

test("#5192: blocking via the 'auto' alias is honored too", async () => {
  // id and alias are both "auto"; the Security UI stores whichever the user clicked.
  await settingsDb.updateSettings({ blockedProviders: ["auto"] });
  const ids = await getIds();
  assert.equal(ids.has("auto/smart"), false, "auto/smart must be absent when Auto is blocked");
});
