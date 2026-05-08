import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-v1beta-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "v1beta-models-test-secret";

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const v1betaModelsRoute = await import("../../src/app/api/v1beta/models/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("v1beta models route deduplicates custom models against built-in and synced entries", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", "conn-main", [
    {
      id: "gpt-4o",
      name: "GPT-4o From Sync",
      source: "imported",
    },
    {
      id: "review-sync-only",
      name: "Review Sync Only",
      source: "imported",
    },
  ]);
  await modelsDb.addCustomModel("openai", "gpt-4o", "GPT-4o Manual Duplicate");
  await modelsDb.addCustomModel("openai", "review-sync-only", "Review Manual Duplicate");
  await modelsDb.addCustomModel("openai", "review-manual-only", "Review Manual Only");

  const response = await v1betaModelsRoute.GET();
  const body = (await response.json()) as { models: Array<{ name: string }> };
  const names = body.models.map((model) => model.name);

  assert.equal(response.status, 200);
  assert.equal(names.filter((name) => name === "models/openai/gpt-4o").length, 1);
  assert.equal(names.filter((name) => name === "models/openai/review-sync-only").length, 1);
  assert.equal(names.filter((name) => name === "models/openai/review-manual-only").length, 1);
});
