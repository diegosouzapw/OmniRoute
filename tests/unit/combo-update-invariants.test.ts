import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { updateComboSchema } from "../../src/shared/validation/schemas/combo.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-invariants-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");

async function resetStorage() {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("updateComboSchema accepts nullable allowedProviders, allowedModelFamilies, and overrideAllowedProviders", () => {
  const parsedNulls = updateComboSchema.safeParse({
    allowedProviders: null,
    allowedModelFamilies: null,
    overrideAllowedProviders: true,
  });
  assert.equal(parsedNulls.success, true);
  if (parsedNulls.success) {
    assert.equal(parsedNulls.data.allowedProviders, null);
    assert.equal(parsedNulls.data.allowedModelFamilies, null);
    assert.equal(parsedNulls.data.overrideAllowedProviders, true);
  }

  const parsedArray = updateComboSchema.safeParse({
    allowedProviders: ["claude", "antigravity"],
    allowedModelFamilies: ["claude"],
  });
  assert.equal(parsedArray.success, true);
});

test("updateCombo allows updating allowedProviders and clearing with null", async () => {
  const combo = await combosDb.createCombo({
    name: "claude-combo",
    allowedProviders: ["claude"],
    models: [{ provider: "claude", model: "claude-sonnet-5" }],
  });
  assert.ok(combo?.id);

  // Updating models to include a new provider with expanded allowedProviders succeeds
  const updated = await combosDb.updateCombo(String(combo.id), {
    allowedProviders: ["claude", "antigravity"],
    models: [
      { provider: "claude", model: "claude-sonnet-5" },
      { provider: "antigravity", model: "claude-sonnet-4-6" },
    ],
  });
  assert.ok(updated);
  const typedUpdated = updated as {
    allowedProviders?: string[];
    models: Array<{ providerId?: string }>;
  };
  assert.deepEqual(typedUpdated.allowedProviders, ["claude", "antigravity"]);
  assert.equal(typedUpdated.models.length, 2);

  // Clearing allowedProviders with null succeeds and removes the invariant restriction
  const cleared = await combosDb.updateCombo(String(combo.id), {
    allowedProviders: null,
    models: [{ provider: "openrouter", model: "nvidia/nemotron-3.5-lightning:free" }],
  });
  assert.ok(cleared);
  const typedCleared = cleared as {
    allowedProviders?: string[];
    models: Array<{ providerId?: string }>;
  };
  assert.equal(typedCleared.allowedProviders, undefined);
  assert.equal(typedCleared.models[0]?.providerId, "openrouter");
});
