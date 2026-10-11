/**
 * #15659 / #15204 / #15568: an Antigravity account whose live catalog lists only the
 * `-tiered` Flash ids (no `-high|medium|low`) has every tier display id refused by the
 * authoritative live-catalog check in getModelInfo(): "Model 'gemini-3.8-flash-high' is
 * not available in the active live catalog for provider 'antigravity'".
 *
 * FINDING (this test's first run): the refusal is NOT specific to 3.8. The 3.7 tier ids
 * (`gemini-3.7-flash-high|medium|low`) are refused the same way on a tiered-only account.
 * ANTIGRAVITY_MODEL_ALIASES maps the 3.7 tiers onto `gemini-3.7-flash-tiered`, but that map
 * is applied on the dispatch/MITM side, after this check, so it cannot rescue the request.
 * That matches the reporter's own wording in #15568 ("all variants high, med, low are gone").
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag38-15659-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "ag38-15659-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");

const PROVIDER = "antigravity";
const CONNECTION_ID = "ag-15659-test-connection";

async function seedLiveCatalog(ids: string[]): Promise<void> {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT OR REPLACE INTO provider_connections (id, provider, is_active, created_at, updated_at)
     VALUES (?, ?, 1, ?, ?)`
  ).run(CONNECTION_ID, PROVIDER, now, now);
  await replaceSyncedAvailableModelsForConnection(
    PROVIDER,
    CONNECTION_ID,
    ids.map((id) => ({ id, name: id, source: "imported" }))
  );
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("tiered ids themselves resolve on a tiered-only account (sanity)", async () => {
  await seedLiveCatalog(["gemini-3.7-flash-tiered", "gemini-3.8-flash-tiered"]);
  for (const id of ["gemini-3.7-flash-tiered", "gemini-3.8-flash-tiered"]) {
    const resolved = await getModelInfo(`antigravity/${id}`);
    assert.equal(resolved.errorType, undefined, JSON.stringify(resolved));
  }
});

test("#15659: the bare display id gemini-3.7-flash must not be refused on a tiered-only account", async () => {
  await seedLiveCatalog(["gemini-3.7-flash-tiered", "gemini-3.8-flash-tiered"]);
  const resolved = await getModelInfo("antigravity/gemini-3.7-flash");
  assert.equal(resolved.errorType, undefined, JSON.stringify(resolved));
});

test("#15659: a provisioned account that lists the tier ids directly is unaffected", async () => {
  await seedLiveCatalog([
    "gemini-3.8-flash-high",
    "gemini-3.8-flash-medium",
    "gemini-3.8-flash-low",
  ]);
  const resolved = await getModelInfo("antigravity/gemini-3.8-flash-high");
  assert.equal(resolved.errorType, undefined, JSON.stringify(resolved));
});

test("#15659: an unrelated id is still refused by the live-catalog check", async () => {
  await seedLiveCatalog(["gemini-3.7-flash-tiered"]);
  const resolved = await getModelInfo("antigravity/gemini-9-nonexistent");
  assert.equal(resolved.errorType, "model_not_found");
});

for (const tier of ["-high", "-medium", "-low"]) {
  test(`#15659: gemini-3.7-flash${tier} must not be refused on a tiered-only account`, async () => {
    await seedLiveCatalog(["gemini-3.7-flash-tiered", "gemini-3.8-flash-tiered"]);
    const resolved = await getModelInfo(`antigravity/gemini-3.7-flash${tier}`);
    assert.equal(resolved.errorType, undefined, JSON.stringify(resolved));
  });
}

for (const tier of ["", "-high", "-medium", "-low"]) {
  test(`#15659: gemini-3.8-flash${tier} must not be refused on a tiered-only account`, async () => {
    await seedLiveCatalog(["gemini-3.7-flash-tiered", "gemini-3.8-flash-tiered"]);
    const resolved = await getModelInfo(`antigravity/gemini-3.8-flash${tier}`);
    assert.equal(resolved.errorType, undefined, JSON.stringify(resolved));
    assert.equal(resolved.provider, PROVIDER);
  });
}
