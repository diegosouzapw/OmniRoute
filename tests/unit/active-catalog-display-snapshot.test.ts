import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-display-catalog-"));
process.env.DATA_DIR = directory;
process.env.API_KEY_SECRET = "display-catalog-test-secret";
const core = await import("../../src/lib/db/core.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { getActiveSyncedCatalog } = await import("../../src/lib/db/models/activeSyncedCatalog.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

test("display snapshot unions active connections, excludes inactive catalogs and custom/import overlays", async () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  for (const [id, active] of [
    ["active-a", 1],
    ["active-b", 1],
    ["inactive", 0],
  ] as const) {
    db.prepare(
      "INSERT INTO provider_connections (id,provider,is_active,created_at,updated_at) VALUES (?,?,?,?,?)"
    ).run(id, "nvidia", active, now, now);
    await replaceSyncedAvailableModelsForConnection("nvidia", id, [
      { id: `${id}-model`, name: id },
    ]);
  }
  db.prepare("INSERT OR REPLACE INTO key_value (namespace,key,value) VALUES (?,?,?)").run(
    "customModels",
    "nvidia",
    JSON.stringify([
      { id: "manual", source: "custom" },
      { id: "old-import", source: "imported" },
    ])
  );
  const catalog = await getActiveSyncedCatalog("nvidia", false);
  assert.equal(catalog.authoritative, true);
  assert.deepEqual(catalog.models.map((m) => m.id).sort(), ["active-a-model", "active-b-model"]);
});

test("custom rows alone cannot establish an authoritative discovery snapshot", async () => {
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace,key,value) VALUES (?,?,?)")
    .run("customModels", "openai", JSON.stringify([{ id: "manual", source: "custom" }]));
  const catalog = await getActiveSyncedCatalog("openai", false);
  assert.equal(catalog.authoritative, false);
  assert.equal(catalog.models.length, 0);
});
