/**
 * tests/unit/catalog-order-contract.test.ts
 *
 * Provider-grouped ordering contract for the unified model catalog.
 *
 * Red-first: proves the current tree publishes fragmented provider blocks.
 * Uses the same DB module set and reset pattern as models-catalog-route.test.ts.
 * /api/models, quota-short-circuit, and inbound-alias cases are split into
 * separate files to avoid extra module imports that break the sql.js lifecycle.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-catalog-order-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-order-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seedConnection(provider: string, overrides: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: (overrides.authType as string) || "apikey",
    name: `${provider}-test-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: (overrides.apiKey as string) || "sk-test",
    accessToken: overrides.accessToken as string | undefined,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  }) as Promise<{ id: string }>;
}

function countProviderBlocks(ownedBySequence: string[]): number {
  const blocks: string[] = [];
  for (const ownedBy of ownedBySequence) {
    if (blocks.length === 0 || blocks[blocks.length - 1] !== ownedBy) {
      blocks.push(ownedBy);
    }
  }
  return blocks.length;
}

// ─────────────────────────────────────────────────────────────────────────────
// Exact provider-grouped order: blocks === distinct owned_by
// ─────────────────────────────────────────────────────────────────────────────

test("catalog /v1/models: exact provider-grouped order (blocks === distinct owned_by)", async () => {
  // Seed 3 providers with synced models to guarantee fragmentation if unsorted.
  // The static registry also emits models for active providers, so the catalog
  // will contain rows from openai, anthropic, and opencode from multiple loops.
  const conn1 = await seedConnection("openai");
  const conn2 = await seedConnection("anthropic");
  const conn3 = await seedConnection("opencode");

  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", (conn1 as { id: string }).id, [
    { id: "gpt-4", name: "GPT-4" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "anthropic",
    (conn2 as { id: string }).id,
    [{ id: "claude-3-opus", name: "Claude 3 Opus" }]
  );
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "opencode",
    (conn3 as { id: string }).id,
    [
      { id: "kimi-k2", name: "Kimi K2" },
      { id: "glm-4", name: "GLM-4" },
    ]
  );

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models?configuredOnly=true")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<{ owned_by: string }> };

  // Guarantee rows from all 3 seeded providers are present
  const ownedByValues = body.data.map((m) => m.owned_by);
  const distinctOwnedBy = new Set(ownedByValues);
  assert.ok(distinctOwnedBy.has("openai"), "openai rows present");
  assert.ok(distinctOwnedBy.has("anthropic"), "anthropic rows present");
  assert.ok(distinctOwnedBy.has("opencode"), "opencode rows present");

  // Exact invariant: each provider appears in exactly one contiguous block
  const blockCount = countProviderBlocks(ownedByValues);
  assert.equal(
    blockCount,
    distinctOwnedBy.size,
    `Fragmented: ${blockCount} blocks for ${distinctOwnedBy.size} distinct providers. ` +
      `Sequence: ${ownedByValues.join(", ")}`
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Combo block pinned first
// ─────────────────────────────────────────────────────────────────────────────

test("catalog /v1/models: combo block appears first", async () => {
  const conn = await seedConnection("openai");
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", (conn as { id: string }).id, [
    { id: "gpt-4", name: "GPT-4" },
  ]);
  await combosDb.createCombo({
    name: "test-combo",
    modelIds: ["openai/gpt-4"],
    strategy: "fallback",
    isActive: true,
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models?configuredOnly=true")
  );
  const body = (await response.json()) as { data: Array<{ owned_by: string }> };

  const hasCombo = body.data.some((m) => m.owned_by === "combo");
  const hasNonCombo = body.data.some((m) => m.owned_by !== "combo");
  assert.ok(hasCombo, "combo rows present");
  assert.ok(hasNonCombo, "non-combo rows present");

  const firstNonComboIndex = body.data.findIndex((m) => m.owned_by !== "combo");
  const lastComboIndex = body.data.map((m) => m.owned_by).lastIndexOf("combo");
  assert.ok(
    lastComboIndex < firstNonComboIndex,
    `Combo block not first: last combo at ${lastComboIndex}, first non-combo at ${firstNonComboIndex}`
  );
});
