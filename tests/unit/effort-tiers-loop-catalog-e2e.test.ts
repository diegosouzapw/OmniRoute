/**
 * effort_tiers loop — I1 end-to-end proof: a set recorded through the REAL
 * record path (executor-style connection key) surfaces in the REAL catalog
 * response (/api/v1/models), including the learned-only variant entry.
 * Never "fix" this test by injecting the same string on both sides.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-effort-loop-e2e-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "loop-e2e-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { recordLearnedReasoningEffort, __test_resetLearnedReasoningEffortCaps } =
  await import("../../open-sse/services/learnedReasoningEffortCaps.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// Copied verbatim from sync-reasoning-supported-efforts-7694.test.ts
async function seedProviderConnection(provider: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: `${provider}-key`,
    isActive: true,
    testStatus: "active",
  });
}

test.beforeEach(async () => {
  __test_resetLearnedReasoningEffortCaps();
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("learned set flows end-to-end into /v1/models capabilities and variant entries", async () => {
  // Non-namespaced id on purpose: mirrors the real incident model
  // (x-preview-f-free) where sm.id === the executor-visible post-strip id.
  const MODEL_ID = "loop-model-e2e";
  const connection = await seedProviderConnection("huggingface");
  await modelsDb.replaceSyncedAvailableModelsForConnection("huggingface", connection.id, [
    {
      id: MODEL_ID,
      name: "Loop Model E2E",
      supportedThinkingEfforts: ["none", "low", "medium", "high"],
    },
  ]);

  // Simulate the real 400 learning path (base.ts calls exactly this, with the
  // executor's CONNECTION id as provider key):
  recordLearnedReasoningEffort("openai-compatible-chat-eaff6869", MODEL_ID, ["low", "high", "max"]);

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    data: Array<{ id: string; capabilities?: { effort_tiers?: string[] } }>;
  };

  const baseEntry = body.data.find((m) => m.id.endsWith(MODEL_ID));
  assert.ok(baseEntry, "base entry present");
  assert.deepEqual(baseEntry!.capabilities?.effort_tiers, ["low", "high", "max"]);

  const maxVariant = body.data.find((m) => m.id === `${baseEntry!.id}-max`);
  assert.ok(maxVariant, "learned-only tier synthesized as a variant entry");
});

test("excluded provider (glm) never surfaces effort_tiers, learned or synced", async () => {
  const MODEL_ID = "glm-4-flash";
  const connection = await seedProviderConnection("glm");
  await modelsDb.replaceSyncedAvailableModelsForConnection("glm", connection.id, [
    {
      id: MODEL_ID,
      name: "GLM 4 Flash",
      supportedThinkingEfforts: ["none", "low", "medium", "high"],
    },
  ]);
  recordLearnedReasoningEffort("glm-connection-1", MODEL_ID, ["low", "high"]);

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    data: Array<{ id: string; capabilities?: { effort_tiers?: string[] } }>;
  };

  const baseEntry = body.data.find((m) => m.id.endsWith(MODEL_ID));
  assert.ok(baseEntry, "base entry present");
  assert.equal(
    baseEntry!.capabilities?.effort_tiers,
    undefined,
    "glm owns its own -{effort} suffix mechanism — the catalog must not also expose effort_tiers"
  );
});
