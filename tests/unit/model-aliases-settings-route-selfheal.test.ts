/**
 * Regression test: GET /api/settings/model-aliases self-heals when the
 * webpack-bundled module instance used by this route was not hydrated at
 * startup (standalone production build chunk-splitting issue).
 *
 * In the standalone build, webpack creates two separate copies of
 * `modelDeprecation.ts` — one hydrated by startup (used for routing),
 * one used by this API route (starts empty).  The GET handler detects
 * empty `_customAliases` and reads from the DB settings blob.
 *
 * @see PR #<TBD> — fix/model-aliases-startup-persistence
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-aliases-selfheal-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = process.env.JWT_SECRET || "model-aliases-selfheal-jwt";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const modelDeprecation = await import("../../open-sse/services/modelDeprecation.ts");
const route = await import("../../src/app/api/settings/model-aliases/route.ts");

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /api/settings/model-aliases hydrates custom aliases from DB when in-memory state is empty", async () => {
  // Simulate: aliases were persisted to the DB settings blob (by a previous
  // session or startup path) but the current module instance's _customAliases
  // is empty (webpack chunk-splitting in standalone build).
  await localDb.updateSettings({
    modelAliases: {
      "claude-opus-4-8": "mimo/mimo-v2.5-pro",
      "claude-sonnet-5": "mimo/mimo-v2.5-pro",
    },
  });

  // Verify the module instance used by the route starts empty.
  // (In production this is the webpack-duplicated copy; here we force it.)
  modelDeprecation.setCustomAliases({});
  assert.deepEqual(modelDeprecation.getCustomAliases(), {});

  // GET should detect empty state, read from DB, and return the aliases.
  const response = await route.GET(
    await makeManagementSessionRequest("http://localhost/api/settings/model-aliases")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.custom["claude-opus-4-8"], "mimo/mimo-v2.5-pro");
  assert.equal(body.custom["claude-sonnet-5"], "mimo/mimo-v2.5-pro");
  assert.equal(
    body.all["claude-opus-4-8"],
    "mimo/mimo-v2.5-pro",
    "all should include custom aliases merged with built-in"
  );

  // Subsequent calls should return the same data (hydration was persisted
  // in-memory, no redundant DB read needed).
  const response2 = await route.GET(
    await makeManagementSessionRequest("http://localhost/api/settings/model-aliases")
  );
  const body2 = (await response2.json()) as any;
  assert.equal(body2.custom["claude-opus-4-8"], "mimo/mimo-v2.5-pro");
});

test("GET /api/settings/model-aliases skips hydration when custom aliases are already populated", async () => {
  // Pre-populate the in-memory state (as the startup path normally does).
  modelDeprecation.setCustomAliases({
    "old-model": "new-model",
  });

  // Write different data directly to DB (bypass updateSettings to avoid
  // triggering applyRuntimeSettings, which would overwrite _customAliases).
  const db = core.getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'modelAliases', ?)"
  ).run(JSON.stringify({ "db-only-model": "db-target" }));

  const response = await route.GET(
    await makeManagementSessionRequest("http://localhost/api/settings/model-aliases")
  );
  const body = (await response.json()) as any;

  // The in-memory aliases take precedence; DB was not read because state
  // was already populated.
  assert.equal(body.custom["old-model"], "new-model");
  assert.equal(body.custom["db-only-model"], undefined);
});

test("GET /api/settings/model-aliases handles missing modelAliases in DB gracefully", async () => {
  // No modelAliases in DB — the settings blob has no such key.
  modelDeprecation.setCustomAliases({});

  const response = await route.GET(
    await makeManagementSessionRequest("http://localhost/api/settings/model-aliases")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.deepEqual(body.custom, {});
  // Built-in aliases should still be present.
  assert.ok(Object.keys(body.builtIn).length > 0);
});
