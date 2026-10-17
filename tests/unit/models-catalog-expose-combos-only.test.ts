/**
 * `exposeCombosOnly` (opt-in, default false): the public `/v1/models` listing
 * advertises only combos (user combos + built-in auto/*), while the management
 * catalog and the single-model lookup keep every routable row. Catalog-only —
 * dispatch and the auto/* candidate pools are untouched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-expose-combos-only-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(TEST_DATA_DIR, "plugins");
process.env.API_KEY_SECRET ||= "synthetic-expose-combos-only";
// Catalog contents are under test, not the cold-build latency of a shared host.
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const catalogCache = await import("../../src/app/api/v1/models/catalogCache.ts");
const modelsRoute = await import("../../src/app/api/v1/models/route.ts");
const modelByIdRoute = await import("../../src/app/api/v1/models/[...model]/route.ts");
const managementCatalogRoute = await import("../../src/app/api/models/catalog/route.ts");
const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");

type Row = { id: string; owned_by?: string };
const COMBO_NAME = "expose-combos-only-fixture";

async function publicCatalog(): Promise<Row[]> {
  const res = await modelsRoute.GET(new Request("http://localhost/v1/models"));
  assert.equal(res.status, 200, await res.clone().text());
  return ((await res.json()) as { data: Row[] }).data;
}

test.before(async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-expose-combos-only",
    apiKey: "sk-synthetic",
    isActive: true,
    testStatus: "active",
  });
  await combosDb.createCombo({
    name: COMBO_NAME,
    strategy: "priority",
    models: [{ model: "openai/gpt-4o", providerId: "openai" }],
  });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("exposeCombosOnly defaults to false and is accepted by the settings schema", async () => {
  const defaults = await settingsDb.getSettings();
  assert.equal(defaults.exposeCombosOnly, false);
  const parsed = updateSettingsSchema.safeParse({ exposeCombosOnly: true });
  assert.equal(parsed.success, true);
  assert.equal(parsed.success && parsed.data.exposeCombosOnly, true);
});

test("flag off: provider rows and the combo are both listed (regression guard)", async () => {
  await settingsDb.updateSettings({ exposeCombosOnly: false, hideAutoCombos: false });
  const rows = await publicCatalog();
  assert.ok(
    rows.some((m) => m.id === COMBO_NAME),
    "user combo must be listed"
  );
  assert.ok(
    rows.some((m) => m.owned_by !== "combo"),
    "provider rows must be listed while the flag is off"
  );
});

test("flag on: /v1/models lists only combos, user combo and auto/* included", async () => {
  await settingsDb.updateSettings({ exposeCombosOnly: true, hideAutoCombos: false });
  const rows = await publicCatalog();
  assert.ok(
    rows.some((m) => m.id === COMBO_NAME),
    "user combo must stay listed"
  );
  assert.ok(
    rows.some((m) => m.id.startsWith("auto/")),
    "built-in auto/* combos stay listed unless hideAutoCombos"
  );
  const leaked = rows.filter((m) => m.owned_by !== "combo").map((m) => m.id);
  assert.deepEqual(leaked, [], `non-combo rows leaked: ${leaked.slice(0, 10).join(", ")}`);
});

test("flag on + hideAutoCombos: no auto/* rows, the user combo remains", async () => {
  await settingsDb.updateSettings({ exposeCombosOnly: true, hideAutoCombos: true });
  const rows = await publicCatalog();
  assert.deepEqual(
    rows.filter((m) => m.id.startsWith("auto/")).map((m) => m.id),
    []
  );
  assert.deepEqual(
    rows.map((m) => m.id),
    [COMBO_NAME]
  );
});

test("flag on: the management catalog still lists provider models", async () => {
  await settingsDb.updateSettings({ exposeCombosOnly: true, hideAutoCombos: false });
  const res = await managementCatalogRoute.GET(new Request("http://localhost/api/models/catalog"));
  assert.equal(res.status, 200, await res.clone().text());
  const body = (await res.json()) as { catalog: Record<string, { models: Row[] }> };
  const providerBuckets = Object.keys(body.catalog).filter((key) => key !== "combo");
  assert.ok(providerBuckets.length > 0, "model pickers need provider rows with the flag on");
});

test("flag on: /v1/models/{id} still resolves a provider model (lookup follows dispatch)", async () => {
  await settingsDb.updateSettings({ exposeCombosOnly: false });
  const providerId = (await publicCatalog()).find((m) => m.owned_by !== "combo")?.id;
  assert.ok(providerId, "fixture must expose at least one provider row with the flag off");

  await settingsDb.updateSettings({ exposeCombosOnly: true });
  const segments = providerId.split("/");
  const res = await modelByIdRoute.GET(new Request(`http://localhost/v1/models/${providerId}`), {
    params: Promise.resolve({ model: segments }),
  });
  assert.equal(res.status, 200, await res.clone().text());
  assert.equal(((await res.json()) as Row).id, providerId);
});

test("exposeCombosOnly is its own catalog cache dimension", async () => {
  catalogCache.__resetCatalogBuilderRunsForTest();
  let builds = 0;
  const build = async () => {
    builds += 1;
    return { body: `{"build":${builds}}`, headers: {}, status: 200, cacheTTL: 60_000 };
  };
  const headers = { corsHeaders: {}, diagnosticHeaders: {} };
  const request = () => new Request("http://localhost/v1/models?prefix=combos-only-cache-key");

  await catalogCache.resolveCachedCatalogResponse(request(), headers, build, {});
  await catalogCache.resolveCachedCatalogResponse(request(), headers, build, {
    exposeCombosOnly: true,
  });
  assert.equal(builds, 2, "toggling the flag must not replay the other variant's body");

  const off = await catalogCache.resolveCachedCatalogResponse(request(), headers, build, {});
  const on = await catalogCache.resolveCachedCatalogResponse(request(), headers, build, {
    exposeCombosOnly: true,
  });
  assert.equal(builds, 2, "each variant is served from its own cache entry");
  assert.equal(await off.text(), '{"build":1}');
  assert.equal(await on.text(), '{"build":2}');
});

test("the auto/* candidate pool never reads exposeCombosOnly (catalog-only filter)", () => {
  const autoComboDir = path.join(process.cwd(), "open-sse/services/autoCombo");
  const offenders = fs
    .readdirSync(autoComboDir, { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(".ts"))
    .filter((file) =>
      fs.readFileSync(path.join(autoComboDir, file), "utf8").includes("exposeCombosOnly")
    );
  assert.deepEqual(offenders, []);
});
