/**
 * The routable `auto` and `auto/lkgp` ids must be advertised in `/v1/models`.
 *
 * `parseAutoPrefix` accepts `auto` and every `auto/<variant>` in
 * `VALID_VARIANTS`, and the router materializes them on demand — but the
 * catalog loop only enumerates the template, suffix and family lists, so the
 * two ids are routable yet invisible to clients building their picker from
 * `/v1/models`. The catalog must announce every id the parser deems valid
 * (or exclude it explicitly), with the pool limits.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-catalog-auto-default-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-auto-default-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const autoIds = await import("../../src/app/api/v1/models/autoCatalogIds.ts");
const builtinCatalog = await import("../../open-sse/services/autoCombo/builtinCatalog.ts");
const autoPrefix = await import("../../open-sse/services/autoCombo/autoPrefix.ts");

type CatalogEntry = {
  id: string;
  owned_by?: string;
  context_length?: number;
  max_input_tokens?: number;
  max_output_tokens?: number;
};

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.updateSettings({ requireLogin: false });
}

async function seedProviders() {
  for (const provider of ["openai", "anthropic", "gemini", "groq", "deepseek", "mistral"]) {
    await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      apiKey: `sk-test-autodefault-${provider}`,
      name: `test-autodefault-${provider}`,
      isActive: true,
    });
  }
}

async function fetchCatalog(headers?: Record<string, string>): Promise<CatalogEntry[]> {
  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", { headers })
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as { data: CatalogEntry[] };
  return body.data;
}

function assertLimits(entry: CatalogEntry | undefined, id: string) {
  assert.ok(entry, `${id} must be listed`);
  assert.equal(typeof entry?.context_length, "number", `${id} must expose context_length`);
  assert.ok((entry?.context_length ?? 0) > 0, `${id} context_length must be positive`);
  assert.equal(typeof entry?.max_output_tokens, "number", `${id} must expose max_output_tokens`);
  assert.ok((entry?.max_output_tokens ?? 0) > 0, `${id} max_output_tokens must be positive`);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("catalog derivation announces the bare default id with pool limits", async () => {
  await seedProviders();
  const advertised = autoIds.getAdvertisedAutoIds();
  assert.ok(advertised.includes("auto"), "the derivation must include the bare default id");
  const data = await fetchCatalog();
  assertLimits(
    data.find((m) => m.id === "auto"),
    "auto"
  );
});

test("catalog derivation announces auto/lkgp with pool limits", async () => {
  assert.ok(
    autoPrefix.VALID_VARIANTS.includes("lkgp"),
    "sanity: lkgp is a valid variant at the parser"
  );
  assert.ok(
    autoPrefix.parseAutoPrefix("auto/lkgp").valid,
    "sanity: auto/lkgp routes when sent explicitly"
  );
  await seedProviders();
  const advertised = autoIds.getAdvertisedAutoIds();
  assert.ok(advertised.includes("auto/lkgp"), "the derivation must include auto/lkgp");
  const data = await fetchCatalog();
  assertLimits(
    data.find((m) => m.id === "auto/lkgp"),
    "auto/lkgp"
  );
});

test("hideAutoCombos keeps the two ids unadvertised while they stay routable", async () => {
  await seedProviders();
  await settingsDb.updateSettings({ hideAutoCombos: true });
  const data = await fetchCatalog();
  const ids = new Set(data.map((m) => m.id));
  assert.equal(ids.has("auto"), false, "auto must not be advertised when hidden");
  assert.equal(ids.has("auto/lkgp"), false, "auto/lkgp must not be advertised when hidden");
  assert.ok(autoPrefix.parseAutoPrefix("auto").valid, "auto stays routable when sent explicitly");
  assert.ok(
    autoPrefix.parseAutoPrefix("auto/lkgp").valid,
    "auto/lkgp stays routable when sent explicitly"
  );
});

test("a key with allowAutoCombos=false is not offered the two ids", async () => {
  await seedProviders();
  const key = await apiKeysDb.createApiKey("auto-default-denied", "machine-auto-default");
  await apiKeysDb.updateApiKeyPermissions(key.id, { allowAutoCombos: false });
  const data = await fetchCatalog({ Authorization: `Bearer ${key.key}` });
  const ids = new Set(data.map((m) => m.id));
  assert.equal(ids.has("auto"), false, "auto must not be offered to an opted-out key");
  assert.equal(ids.has("auto/lkgp"), false, "auto/lkgp must not be offered to an opted-out key");
  assert.ok(data.length > 0, "the catalog must still list other models for the opted-out key");
});

test("hidePaidModels keeps both ids advertised (neither is a paid tier)", async () => {
  assert.equal(builtinCatalog.isPaidTierAutoId("auto"), false);
  assert.equal(builtinCatalog.isPaidTierAutoId("auto/lkgp"), false);
  await seedProviders();
  await settingsDb.updateSettings({ hidePaidModels: true });
  const data = await fetchCatalog();
  assertLimits(
    data.find((m) => m.id === "auto"),
    "auto"
  );
  assertLimits(
    data.find((m) => m.id === "auto/lkgp"),
    "auto/lkgp"
  );
});

test("a stored combo named auto does not shadow the built-in entry", async () => {
  await seedProviders();
  await combosDb.createCombo({
    name: "auto",
    strategy: "priority",
    models: ["openai/gpt-4o"],
  });
  const data = await fetchCatalog();
  const matches = data.filter((m) => m.id === "auto");
  assert.equal(matches.length, 1, "exactly one auto entry must be listed");
  assert.equal(matches[0]?.owned_by, "combo", "the built-in entry wins over the stored combo");
  assertLimits(matches[0], "auto");
});
