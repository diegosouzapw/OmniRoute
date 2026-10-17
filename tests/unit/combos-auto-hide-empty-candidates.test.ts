/**
 * Auto combos with no live candidates must not be listed.
 *
 * `/api/combos/auto` (dashboard catalog source) and `/v1/models` (client-facing
 * catalog) advertised every built-in `auto/*` id unconditionally, including
 * families/categories with zero connected providers — cards showed "No matching
 * providers" and clients got ids that can never dispatch. Both listings now
 * skip combos whose materialized candidate pool is empty.
 *
 * Note: `opencode` is a no-auth provider, so even an "empty" DB has candidates
 * for the unconstrained combos (auto, auto/coding, ...) and for families its
 * oc/* models match (auto/mimo, auto/deepseek). Families with no matching
 * connected model — auto/minimax, auto/zai — still come back with an empty
 * pool and are the reliable negative cases.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hide-empty-auto-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "hide-empty-auto-test-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosAutoRoute = await import("../../src/app/api/combos/auto/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

// Families with no matching models in any seeded registry — the materialized
// pool is empty, so these ids must be filtered from every listing.
const EMPTY_FAMILY_IDS = ["auto/minimax", "auto/zai"];

const SEEDED_PROVIDERS = ["openai", "anthropic", "gemini", "groq", "deepseek", "mistral"];

type ComboEntry = { id: string; candidateCount: number };

async function listCombos(): Promise<ComboEntry[]> {
  const res = await combosAutoRoute.GET(new Request("http://localhost/api/combos/auto"));
  const body = (await res.json()) as { combos: ComboEntry[] };
  return body.combos;
}

async function listModelIds(): Promise<Set<string>> {
  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await res.json()) as { data: Array<{ id: string }> };
  return new Set(body.data.map((m) => m.id));
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.updateSettings({ requireLogin: false });
}

async function seedProviders(prefix: string) {
  for (const provider of SEEDED_PROVIDERS) {
    await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      apiKey: `sk-test-${prefix}-${provider}`,
      name: `test-${prefix}-${provider}`,
      isActive: true,
    });
  }
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // best-effort cleanup
  }
});

test("/api/combos/auto lists only combos with candidates", async () => {
  const combos = await listCombos();
  assert.ok(combos.length > 0, "the no-auth opencode pool should yield candidates");
  for (const combo of combos) {
    assert.ok(
      combo.candidateCount > 0,
      `${combo.id} listed with ${combo.candidateCount} candidates — empty combos must be filtered`
    );
  }
  const ids = new Set(combos.map((c) => c.id));
  for (const emptyId of EMPTY_FAMILY_IDS) {
    assert.ok(!ids.has(emptyId), `${emptyId} has no matching model — must not be listed`);
  }
});

test("/v1/models does not advertise auto/* ids without candidates", async () => {
  const ids = await listModelIds();
  for (const emptyId of EMPTY_FAMILY_IDS) {
    assert.ok(!ids.has(emptyId), `${emptyId} has an empty pool — must not be advertised`);
  }
  // The derived ids obey the same announced-iff-materializable contract:
  // advertised exactly when their pool is non-empty.
  const advertisedAuto = await import("../../src/app/api/v1/models/autoCatalogIds.ts");
  for (const derivedId of ["auto", "auto/lkgp"]) {
    const virtual = await advertisedAuto.materializeAdvertisedAutoCombo(
      derivedId,
      derivedId.replace(/^auto\/?/, ""),
      undefined
    );
    assert.equal(
      ids.has(derivedId),
      virtual.models.length > 0,
      `${derivedId} must be advertised iff it has candidates (pool=${virtual.models.length})`
    );
  }
});

test("seeded pool: every listed combo has candidates, empty families stay hidden", async () => {
  await seedProviders("hide-empty");
  const combos = await listCombos();
  for (const combo of combos) {
    assert.ok(
      combo.candidateCount > 0,
      `${combo.id} listed with ${combo.candidateCount} candidates — empty combos must be filtered`
    );
  }
  const ids = new Set(combos.map((c) => c.id));
  assert.ok(ids.has("auto/gemini"), "auto/gemini has a seeded provider and must stay listed");
  for (const emptyId of EMPTY_FAMILY_IDS) {
    assert.ok(!ids.has(emptyId), `${emptyId} has no matching model — must not be listed`);
  }
});

test("seeded pool: /v1/models advertises auto/* ids that have candidates only", async () => {
  await seedProviders("hide-empty-v1");
  const ids = await listModelIds();
  assert.ok(
    ids.has("auto/gemini"),
    "auto/gemini has candidates (seeded gemini provider) and must be advertised"
  );
  for (const emptyId of EMPTY_FAMILY_IDS) {
    assert.ok(!ids.has(emptyId), `${emptyId} has an empty pool — must not be advertised`);
  }
});
