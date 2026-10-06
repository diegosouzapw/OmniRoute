import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-calllogs-filters-route-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "a".repeat(64);

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const route = await import("../../src/app/api/usage/call-logs/filters/route.ts");

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "filters-route-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  if (ORIGINAL_API_KEY_SECRET === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
});

test("filters route requires management auth", async () => {
  await enableManagementAuth();
  const res = await route.GET(new Request("http://localhost/api/usage/call-logs/filters"));
  assert.equal(res.status, 401);
});

test("filters route lists configured keys without traffic and never returns key material", async () => {
  await enableManagementAuth();
  const created = await apiKeysDb.createApiKey("Never Used", "machine-1");
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, detail_state)
       VALUES ('row-1', '2026-01-01T00:00:00.000Z', 'POST', '/v1/chat/completions', 200,
         'gpt-5', 'codex', 'none')`
    )
    .run();

  const res = await route.GET(
    await makeManagementSessionRequest("http://localhost/api/usage/call-logs/filters")
  );
  assert.equal(res.status, 200);
  const body = await res.json();

  assert.deepEqual(body.providers, ["codex"]);
  assert.deepEqual(body.models, ["gpt-5"]);
  assert.deepEqual(body.configuredKeys, [{ id: created.id, name: "Never Used" }]);
  assert.equal(JSON.stringify(body).includes(created.key), false, "raw key must not leak");
});

test("filters route serves repeat requests from a short-lived snapshot", async () => {
  await enableManagementAuth();
  const insert = core.getDbInstance().prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, detail_state)
       VALUES (@id, '2026-01-01T00:00:00.000Z', 'POST', '/v1/chat/completions', 200, 'm', @provider,
         'none')`
  );
  const get = async () =>
    (
      await route.GET(
        await makeManagementSessionRequest("http://localhost/api/usage/call-logs/filters")
      )
    ).json();

  // An earlier test in this file may have primed the snapshot; the second call must
  // return exactly what the first one did, without re-scanning call_logs.
  const first = await get();
  insert.run({ id: "later-row", provider: "provider-added-later" });
  const second = await get();
  assert.deepEqual(second.providers, first.providers);
  assert.equal(second.providers.includes("provider-added-later"), false);
});
