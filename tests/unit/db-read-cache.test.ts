import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-read-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

async function importFresh(modulePath) {
  const url = pathToFileURL(path.resolve(modulePath)).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

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

test("getCachedSettings returns cached data until TTL expires or cache is invalidated", async () => {
  const readCache = await importFresh("src/lib/db/readCache.ts");
  const db = core.getDbInstance();

  await settingsDb.updateSettings({ label: "initial" });
  assert.equal((await readCache.getCachedSettings()).label, "initial");

  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "settings",
    "label",
    JSON.stringify("stale-write")
  );

  assert.equal((await readCache.getCachedSettings()).label, "initial");

  const originalNow = Date.now;
  try {
    Date.now = () => originalNow() + 6_000;
    assert.equal((await readCache.getCachedSettings()).label, "stale-write");
  } finally {
    Date.now = originalNow;
  }

  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "settings",
    "label",
    JSON.stringify("after-invalidate")
  );
  readCache.invalidateDbCache("settings");

  assert.equal((await readCache.getCachedSettings()).label, "after-invalidate");
});

test("getCachedPricing caches results and refreshes after invalidation", async () => {
  const readCache = await importFresh("src/lib/db/readCache.ts");
  const db = core.getDbInstance();

  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "pricing",
    "cache-provider",
    JSON.stringify({
      "model-a": { prompt: 1 },
    })
  );

  assert.equal((await readCache.getCachedPricing())["cache-provider"]["model-a"].prompt, 1);

  db.prepare("UPDATE key_value SET value = ? WHERE namespace = ? AND key = ?").run(
    JSON.stringify({
      "model-a": { prompt: 9 },
    }),
    "pricing",
    "cache-provider"
  );

  assert.equal((await readCache.getCachedPricing())["cache-provider"]["model-a"].prompt, 1);

  readCache.invalidateDbCache("pricing");

  assert.equal((await readCache.getCachedPricing())["cache-provider"]["model-a"].prompt, 9);
});

test("getCachedProviderConnections caches only the unfiltered query", async () => {
  const readCache = await importFresh("src/lib/db/readCache.ts");
  const db = core.getDbInstance();
  const now = new Date().toISOString();

  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Primary",
    apiKey: "sk-primary",
  });
  const firstRead = await readCache.getCachedProviderConnections();

  db.prepare(
    `
    INSERT INTO provider_connections (
      id, provider, auth_type, name, is_active, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `
  ).run("direct-insert", "openai", "apikey", "Secondary", 1, now, now);

  const cachedAll = await readCache.getCachedProviderConnections();
  const filtered = await readCache.getCachedProviderConnections({ provider: "openai" });

  assert.equal(firstRead.length, 1);
  assert.equal(cachedAll.length, 1);
  assert.equal(filtered.length, 2);

  readCache.invalidateDbCache("connections");

  assert.equal((await readCache.getCachedProviderConnections()).length, 2);
});

test("cached LKGP values refresh only after the specific key is invalidated", async () => {
  const readCache = await importFresh("src/lib/db/readCache.ts");
  const db = core.getDbInstance();
  const comboName = `combo-${Date.now()}`;
  const modelId = `model-${Date.now()}`;
  const lkgpKey = `${comboName}:${modelId}`;

  await settingsDb.setLKGP(comboName, modelId, "openai");
  assert.equal(await readCache.getCachedLKGP(comboName, modelId), "openai");

  db.prepare("UPDATE key_value SET value = ? WHERE namespace = 'lkgp' AND key = ?").run(
    JSON.stringify("anthropic"),
    lkgpKey
  );

  assert.equal(await readCache.getCachedLKGP(comboName, modelId), "openai");

  await readCache.setCachedLKGP(comboName, modelId, "gemini");

  assert.equal(await readCache.getCachedLKGP(comboName, modelId), "gemini");
});
