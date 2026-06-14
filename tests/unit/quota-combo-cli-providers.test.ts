/**
 * tests/unit/quota-combo-cli-providers.test.ts
 *
 * Regression: qtSd/ combos were generated from PROVIDER_MODELS, which is
 * EMPTY for CLI/OAuth providers (codex, kimi, claude, …). A pool built from those
 * providers produced ZERO combos → the quota key saw no models. The fix reads the
 * provider REGISTRY (same source /v1/models uses), which has those providers.
 *
 * This test creates a "codex" pool and asserts syncQuotaCombos produces combos
 * (it would have produced none before the fix).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-combo-cli-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { syncQuotaCombos } = await import("../../src/lib/quota/quotaCombos.ts");
const { quotaModelName } = await import("../../src/lib/quota/quotaModelNaming.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");

async function resetStorage() {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const CLI_PROVIDER = "codex"; // absent from PROVIDER_MODELS, present in REGISTRY

test("syncQuotaCombos generates qtSd/ combos for a CLI provider (codex) via REGISTRY", async () => {
  // Sanity: codex must be a REGISTRY provider with models (the fix's premise).
  const regModels = (REGISTRY as Record<string, { models?: Array<{ id?: string }> }>)[CLI_PROVIDER]
    ?.models;
  assert.ok(Array.isArray(regModels) && regModels.length > 0, "codex must have REGISTRY models");
  const firstModelId = regModels.find((m) => typeof m.id === "string")?.id as string;
  assert.ok(firstModelId, "codex must have at least one model id");

  const conn = await providersDb.createProviderConnection({
    provider: CLI_PROVIDER,
    authType: "apikey",
    name: "codex-cli",
    apiKey: "sk-codex",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "Codex Quota" });

  await syncQuotaCombos(pool.id);

  // Before the fix this was 0. Now there must be one combo per codex model.
  const all = await combosDb.getCombos();
  const { QUOTA_MODEL_PREFIX: PREFIX } = await import("../../src/lib/quota/quotaModelNaming.ts");
  const quotaCombos = all.filter(
    (c) => typeof c.name === "string" && (c.name as string).startsWith(PREFIX)
  );
  assert.ok(quotaCombos.length > 0, "codex pool must produce qtSd/ combos (was 0 before fix)");

  // B4: combos are named with the GROUP name ("GroupDemo" for default group), not pool name.
  const expectedName = quotaModelName("GroupDemo", CLI_PROVIDER, firstModelId);
  const combo = await combosDb.getComboByName(expectedName);
  assert.ok(combo, `combo "${expectedName}" must exist for the codex pool`);
});
