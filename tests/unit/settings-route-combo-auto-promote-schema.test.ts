import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-auto-promote-schema-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
}

test.beforeEach(async () => {
  await resetStorage();
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

interface PromoteSettings {
  comboAutoPromoteEnabled: boolean;
}

test("PATCH /api/settings persists comboAutoPromoteEnabled false/true", async () => {
  const before = (await settingsDb.getSettings()) as unknown as PromoteSettings;
  assert.equal(before.comboAutoPromoteEnabled, false);

  // Flip on
  const onRes = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { comboAutoPromoteEnabled: true },
    })
  );
  const on = (await settingsDb.getSettings()) as unknown as PromoteSettings;
  assert.equal(onRes.status, 200, "route should accept enabling PATCH");
  assert.equal(on.comboAutoPromoteEnabled, true, "comboAutoPromoteEnabled should persist true");

  // Flip off — the failure mode before this fix: Zod stripped the key, PATCH 200, value stayed true
  const offRes = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { comboAutoPromoteEnabled: false },
    })
  );
  const off = (await settingsDb.getSettings()) as unknown as PromoteSettings;
  assert.equal(offRes.status, 200, "route should accept disabling PATCH");
  assert.equal(
    off.comboAutoPromoteEnabled,
    false,
    "comboAutoPromoteEnabled should persist false (must not be stripped by updateSettingsSchema)"
  );
});
