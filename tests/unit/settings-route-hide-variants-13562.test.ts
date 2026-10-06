import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-issue-13562-"));
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

interface HideVariantSettings {
  hidePaidModels: boolean;
  hideAutoCombos: boolean;
  hideNoThinkVariants: boolean;
}

test("PATCH /api/settings persists hideAutoCombos / hideNoThinkVariants (#13562)", async () => {
  const before = (await settingsDb.getSettings()) as unknown as HideVariantSettings;
  assert.equal(before.hideAutoCombos, false);
  assert.equal(before.hideNoThinkVariants, false);

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { hidePaidModels: true, hideAutoCombos: true, hideNoThinkVariants: true },
    })
  );
  const after = (await settingsDb.getSettings()) as unknown as HideVariantSettings;

  assert.equal(response.status, 200, "route should accept the PATCH");
  assert.equal(after.hidePaidModels, true, "control key should persist");
  assert.equal(after.hideAutoCombos, true, "hideAutoCombos should have persisted");
  assert.equal(after.hideNoThinkVariants, true, "hideNoThinkVariants should have persisted");
});
