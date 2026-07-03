/**
 * Tests for getSyncedAvailableModelsGroupedByProviderConnection.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-models-grouped-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 50 * (attempt + 1)));
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
}

test.before(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    // best-effort
  }
});

const MODEL_A = { id: "gpt-4", name: "GPT-4" };
const MODEL_B = { id: "gpt-3.5", name: "GPT-3.5" };
const MODEL_C = { id: "claude-3-opus", name: "Claude 3 Opus" };
const MODEL_D = { id: "claude-3-haiku", name: "Claude 3 Haiku" };

test("grouped result matches getSyncedAvailableModelsByConnection per provider", async () => {
  await resetStorage();

  // Seed 2 providers × 2 connections
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", "conn-1", [MODEL_A]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", "conn-2", [MODEL_B]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("anthropic", "conn-3", [MODEL_C]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("anthropic", "conn-4", [MODEL_D]);

  const grouped = await modelsDb.getSyncedAvailableModelsGroupedByProviderConnection();

  // Compare per-provider against getSyncedAvailableModelsByConnection
  for (const providerId of ["openai", "anthropic"]) {
    const singleResult = await modelsDb.getSyncedAvailableModelsByConnection(providerId);
    const groupedForProvider = grouped[providerId] ?? {};

    // Each connectionId bucket must match
    for (const [connId, models] of Object.entries(singleResult)) {
      assert.deepEqual(
        groupedForProvider[connId],
        models,
        `provider=${providerId} connId=${connId} mismatch`
      );
    }

    // No extra connectionIds in the grouped result
    for (const connId of Object.keys(groupedForProvider)) {
      assert.ok(
        connId in singleResult,
        `extra connId=${connId} in grouped that is not in singleResult for ${providerId}`
      );
    }
  }
});

test("empty store → returns empty object", async () => {
  await resetStorage();
  const grouped = await modelsDb.getSyncedAvailableModelsGroupedByProviderConnection();
  assert.deepEqual(grouped, {});
});
