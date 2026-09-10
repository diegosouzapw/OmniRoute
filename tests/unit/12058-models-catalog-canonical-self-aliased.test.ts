/**
 * Regression test for #12058 — `MODELS_CATALOG_PREFIX_MODE=canonical` (or
 * `?prefix=canonical`) dropped every chat row of a *self-aliased* provider: a
 * registry entry whose `alias` is undefined (`antigravity`) or equal to its own id
 * (`agy`, and most built-in providers).
 *
 * Root cause: every emission loop in `catalog.ts` pushes the `alias/model` row only
 * when `includeAlias` is set and the `canonicalProviderId/model` row only when
 * `canonicalProviderId !== alias` (a dual-mode duplicate guard). For a self-aliased
 * provider both ids are the same string, so in canonical mode neither branch fires
 * and the provider vanishes. #11832 / PR #11918 fixed the same class for custom
 * provider nodes (`includeAlias || Boolean(prefix)`) but left built-in providers
 * behind.
 *
 * Fix: treat the alias row as the canonical row whenever the two ids coincide, in
 * the static, synced, custom and alias-backed loops alike. `alias` and `dual` modes
 * already emitted that single row, so their output must not change.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-12058-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const aliasesDb = await import("../../src/lib/db/models/aliases.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

type CatalogRow = { id: string; parent: string | null; root: string | null };
type PrefixMode = "alias" | "canonical" | "dual";

// Both ship this id in their curated static catalog (ANTIGRAVITY_PUBLIC_MODELS /
// AGY_PUBLIC_MODELS). `antigravity` has `alias: undefined`, `agy` has `alias: "agy"`.
const SELF_ALIASED_PROVIDERS = ["antigravity", "agy"] as const;
const STATIC_MODEL_ID = "gemini-3.7-flash-high";

// A self-aliased api-key provider used to exercise the synced / custom /
// alias-backed loops, which carry the same guard as the static loop.
const SYNCED_PROVIDER = "groq";
const SYNCED_MODEL_ID = "probe-synced-12058";
// A synced audio model must survive too (it is a chat-loop row with `type: "audio"`).
const SYNCED_AUDIO_MODEL_ID = "probe-tts-12058";
const CUSTOM_MODEL_ID = "probe-custom-12058";
const ALIAS_BACKED_MODEL_ID = "probe-alias-backed-12058";

// Control: a normally-aliased provider (alias `cc`, canonical `claude`) whose
// mode gating must stay exactly as it was.
const CONTROL_ALIAS_ID = "cc/claude-sonnet-4-6";
const CONTROL_CANONICAL_ID = "claude/claude-sonnet-4-6";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedOauthConnection(provider: string) {
  await providersDb.createProviderConnection({
    provider,
    authType: "oauth",
    name: `${provider}-12058`,
    apiKey: null,
    accessToken: `${provider}-access-token`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

async function seedCatalog() {
  for (const provider of SELF_ALIASED_PROVIDERS) await seedOauthConnection(provider);
  await seedOauthConnection("claude");

  const connection = await providersDb.createProviderConnection({
    provider: SYNCED_PROVIDER,
    authType: "apikey",
    name: `${SYNCED_PROVIDER}-12058`,
    apiKey: "sk-test-12058",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    SYNCED_PROVIDER,
    (connection as { id: string }).id,
    [
      { id: SYNCED_MODEL_ID, source: "imported", supportedEndpoints: ["chat"] },
      { id: SYNCED_AUDIO_MODEL_ID, source: "imported", supportedEndpoints: ["audio-speech"] },
    ]
  );
  await modelsDb.addCustomModel(SYNCED_PROVIDER, CUSTOM_MODEL_ID, "Probe Custom 12058");
  await aliasesDb.setModelAlias(
    ALIAS_BACKED_MODEL_ID,
    `${SYNCED_PROVIDER}/${ALIAS_BACKED_MODEL_ID}`
  );
}

async function getRows(mode: PrefixMode): Promise<CatalogRow[]> {
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request(`http://localhost/api/v1/models?prefix=${mode}`)
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: CatalogRow[] };
  return body.data;
}

function idsWithPrefix(rows: CatalogRow[], prefix: string): string[] {
  return rows.map((row) => row.id).filter((id) => id.startsWith(`${prefix}/`));
}

function duplicates(rows: CatalogRow[]): string[] {
  const ids = rows.map((row) => row.id);
  return ids.filter((id, index) => ids.indexOf(id) !== index);
}

function assertExactlyOnce(rows: CatalogRow[], id: string, mode: PrefixMode) {
  const matches = rows.filter((row) => row.id === id);
  assert.equal(
    matches.length,
    1,
    `${mode} mode: expected exactly one "${id}", got ${matches.length}`
  );
  return matches[0];
}

test.beforeEach(async () => {
  await resetStorage();
  await seedCatalog();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#12058 canonical mode lists the curated models of self-aliased providers once, re-rooted", async () => {
  const rows = await getRows("canonical");

  for (const provider of SELF_ALIASED_PROVIDERS) {
    const row = assertExactlyOnce(rows, `${provider}/${STATIC_MODEL_ID}`, "canonical");
    // The single surviving row is the head of its chain: no parent to point at.
    assert.equal(row.parent, null, `${provider}: the canonical row must not carry a parent`);
    assert.equal(row.root, STATIC_MODEL_ID, `${provider}: root must be the bare model id`);

    // Anti-vacuity: the whole curated chat catalog is back, not just the sampled id.
    const listed = idsWithPrefix(rows, provider);
    assert.ok(
      listed.length >= 5,
      `${provider}: expected the curated catalog in canonical mode, got ${JSON.stringify(listed)}`
    );
  }

  assert.deepEqual(duplicates(rows), [], "canonical mode must not emit duplicate ids");
});

test("#12058 canonical mode keeps synced, custom and alias-backed rows of a self-aliased provider", async () => {
  const rows = await getRows("canonical");

  for (const modelId of [
    SYNCED_MODEL_ID,
    SYNCED_AUDIO_MODEL_ID,
    CUSTOM_MODEL_ID,
    ALIAS_BACKED_MODEL_ID,
  ]) {
    const row = assertExactlyOnce(rows, `${SYNCED_PROVIDER}/${modelId}`, "canonical");
    assert.equal(row.parent, null, `${modelId}: the canonical row must not carry a parent`);
  }
});

test("#12058 canonical mode still suppresses the alias row of a normally-aliased provider", async () => {
  // Guards against "fixing" the defect by disabling the alias gate outright.
  const rows = await getRows("canonical");
  const ids = new Set(rows.map((row) => row.id));

  assert.ok(ids.has(CONTROL_CANONICAL_ID), `expected "${CONTROL_CANONICAL_ID}" in canonical mode`);
  assert.equal(
    ids.has(CONTROL_ALIAS_ID),
    false,
    `"${CONTROL_ALIAS_ID}" must stay suppressed in canonical mode`
  );
});

test("#12058 self-aliased providers emit the same single id set in every mode; alias/dual stay unchanged", async () => {
  const byMode = {
    alias: await getRows("alias"),
    canonical: await getRows("canonical"),
    dual: await getRows("dual"),
  } satisfies Record<PrefixMode, CatalogRow[]>;

  for (const mode of ["alias", "dual"] as const) {
    assert.deepEqual(duplicates(byMode[mode]), [], `${mode} mode must not emit duplicate ids`);
  }

  // A self-aliased provider has exactly one id form, so all three modes must agree.
  for (const provider of [...SELF_ALIASED_PROVIDERS, SYNCED_PROVIDER]) {
    const aliasIds = idsWithPrefix(byMode.alias, provider).sort();
    assert.ok(aliasIds.length > 0, `${provider}: alias mode must list the provider at all`);
    assert.deepEqual(
      idsWithPrefix(byMode.canonical, provider).sort(),
      aliasIds,
      `${provider}: canonical mode must list the same ids as alias mode`
    );
    assert.deepEqual(
      idsWithPrefix(byMode.dual, provider).sort(),
      aliasIds,
      `${provider}: dual mode must list the same ids as alias mode`
    );
  }

  // The normally-aliased control keeps its per-mode shape.
  const aliasIds = new Set(byMode.alias.map((row) => row.id));
  const dualIds = new Set(byMode.dual.map((row) => row.id));
  assert.ok(aliasIds.has(CONTROL_ALIAS_ID), "alias mode keeps the cc/ row");
  assert.equal(aliasIds.has(CONTROL_CANONICAL_ID), false, "alias mode suppresses the claude/ row");
  assert.ok(dualIds.has(CONTROL_ALIAS_ID), "dual mode keeps the cc/ row");
  assert.ok(dualIds.has(CONTROL_CANONICAL_ID), "dual mode keeps the claude/ row");
});
