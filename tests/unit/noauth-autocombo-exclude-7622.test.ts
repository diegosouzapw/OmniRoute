/**
 * #7622 — no-auth provider "Excluded Models" field is stored + enforced at
 * dispatch time (src/sse/services/auth.ts) but IGNORED by the auto-combo/fusion
 * candidate pool builder (`getNoAuthCandidates()` in
 * open-sse/services/autoCombo/virtualFactory.ts). An excluded no-auth model must
 * never be advertised/selected in `auto/*` combos in the first place — it should
 * only fail over after being picked instead.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7622-noauth-exclude-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");

async function resetStorage() {
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

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("#7622: a no-auth model excluded via providerSpecificData.excludedModels is ABSENT from the auto-combo candidate pool", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "no-auth",
    name: "OpenCode Free Account 1",
    providerSpecificData: { excludedModels: "mimo-v2.5-free" },
  });
  assert.ok(conn.id, "connection must be created");

  const combo = await virtualFactory.createVirtualAutoCombo(undefined);

  const modelStrings = combo.models.map((m: { model: string }) => m.model);
  assert.ok(
    !modelStrings.some((model: string) => model.endsWith("/mimo-v2.5-free")),
    "BUG #7622: the excluded model 'mimo-v2.5-free' must not appear in the auto-combo " +
      `candidate pool, but it did. Pool: ${JSON.stringify(modelStrings)}`
  );
});

test("#7622: a non-excluded no-auth model from the same connection remains in the auto-combo candidate pool", async () => {
  await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "no-auth",
    name: "OpenCode Free Account 1",
    providerSpecificData: { excludedModels: "mimo-v2.5-free" },
  });

  const combo = await virtualFactory.createVirtualAutoCombo(undefined);

  const modelStrings = combo.models.map((m: { model: string }) => m.model);
  assert.ok(
    modelStrings.some((model: string) => model.endsWith("/big-pickle")),
    `a non-excluded model ("big-pickle") must remain in the pool. Pool: ${JSON.stringify(modelStrings)}`
  );
});

test("#7622 regression guard: with no excludedModels set, all opencode models remain in the pool (baseline unchanged)", async () => {
  await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "no-auth",
    name: "OpenCode Free Account 1",
    providerSpecificData: { fingerprints: ["11111111111111111111111111111111"] },
  });

  const combo = await virtualFactory.createVirtualAutoCombo(undefined);

  const modelStrings = combo.models.map((m: { model: string }) => m.model);
  assert.ok(
    modelStrings.some((model: string) => model.endsWith("/mimo-v2.5-free")),
    `baseline: no exclusion set, mimo-v2.5-free must still be present. Pool: ${JSON.stringify(modelStrings)}`
  );
});
