import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { providerUsesAuthoritativeLiveCatalog } from "../../open-sse/config/providerRegistry.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-live-catalog-8926-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "live-catalog-8926-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { addCustomModel, replaceSyncedAvailableModelsForConnection } =
  await import("../../src/lib/db/models.ts");
const { getActiveSyncedCatalog, getAllActiveSyncedModels } =
  await import("../../src/lib/db/models/activeSyncedCatalog.ts");
const { isRegisteredProviderEffortVariant } =
  await import("../../open-sse/utils/registeredEffortVariants.ts");

const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { getProviderModels } = await import("../../open-sse/config/providerModels.ts");

const PROVIDER = "github";
const CONNECTION_ID = "github-live-catalog-8926";
const LIVE_MODEL = "gpt-4.1";
const PHANTOM_MODEL = "oswe-vscode-prime";

function seedProviderCatalog(
  providerId: string,
  connectionId: string,
  modelIds: string[],
  isActive = true
) {
  const db = core.getDbInstance();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT OR REPLACE INTO provider_connections
       (id, provider, is_active, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run(connectionId, providerId, isActive ? 1 : 0, now, now);

  return replaceSyncedAvailableModelsForConnection(
    providerId,
    connectionId,
    modelIds.map((id) => ({
      id,
      name: id,
      source: "imported" as const,
    }))
  );
}

function seedActiveLiveCatalog() {
  return seedProviderCatalog(PROVIDER, CONNECTION_ID, [LIVE_MODEL]);
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

  assert.ok(
    getProviderModels(PROVIDER).some((model: { id?: string }) => model.id === PHANTOM_MODEL),
    `precondition: ${PHANTOM_MODEL} must exist in the static GitHub catalog`
  );

  await seedActiveLiveCatalog();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#8926: bare inference excludes a stale static model absent from the active live catalog", async () => {
  const resolved = await getModelInfo(PHANTOM_MODEL);

  assert.equal(resolved.provider, null);
  assert.equal(resolved.errorType, "model_not_found");
  assert.match(
    resolved.errorMessage,
    /active live catalog/i,
    "the error should explain that live availability rejected the stale entry"
  );
});

test("#8926: explicit provider/model rejects a stale static model before upstream dispatch", async () => {
  const resolved = await getModelInfo(`${PROVIDER}/${PHANTOM_MODEL}`);

  assert.equal(resolved.provider, null);
  assert.equal(resolved.errorType, "model_not_found");
  assert.match(
    resolved.errorMessage,
    /active live catalog/i,
    "the explicit route should report live-catalog unavailability"
  );
});

test("#8926: active alternative provider remains eligible", async () => {
  await seedProviderCatalog("ghe-copilot", "ghe-copilot-active-8926", []);

  const resolved = await getModelInfo(PHANTOM_MODEL);

  assert.equal(resolved.provider, "ghe-copilot");
  assert.equal(resolved.model, PHANTOM_MODEL);
});

test("#8926: explicit custom model overrides live-catalog exclusion", async () => {
  await addCustomModel(PROVIDER, PHANTOM_MODEL, "Operator custom override");

  const resolved = await getModelInfo(`${PROVIDER}/${PHANTOM_MODEL}`);

  assert.equal(resolved.provider, PROVIDER);
  assert.equal(resolved.model, PHANTOM_MODEL);
});

test("#8926: effort helper identifies only explicitly registered variants", () => {
  assert.equal(isRegisteredProviderEffortVariant("cursor", "gpt-5.3-codex-high"), true);

  assert.equal(
    isRegisteredProviderEffortVariant("cursor", "gpt-5.3-codex-max"),
    false,
    "an invented suffix must not bypass live-catalog authority"
  );
});

test("#8926: registered effort route survives while invented effort route is rejected", async () => {
  await seedProviderCatalog("cursor", "cursor-live-8926", ["gpt-5.3-codex"]);

  const registered = await getModelInfo("cursor/gpt-5.3-codex-high");

  assert.equal(registered.provider, "cursor");
  assert.equal(registered.model, "gpt-5.3-codex-high");

  const invented = await getModelInfo("cursor/gpt-5.3-codex-max");

  assert.equal(invented.provider, null);
  assert.equal(invented.errorType, "model_not_found");
});

test("#8926: active-only catalog excludes inactive siblings and resolves aliases", async () => {
  await seedProviderCatalog(PROVIDER, "github-inactive-sibling-8926", [PHANTOM_MODEL], false);

  const allActive = await getAllActiveSyncedModels();

  assert.deepEqual(
    allActive[PROVIDER]?.map((model) => model.id),
    [LIVE_MODEL]
  );

  const aliasCatalog = await getActiveSyncedCatalog("gh");

  assert.equal(aliasCatalog.authoritative, true);

  assert.deepEqual(
    aliasCatalog.models.map((model) => model.id),
    [LIVE_MODEL]
  );
});

test("#8926: providers without an authoritative live catalog retain static fallback", async () => {
  const resolved = await getModelInfo("openai/gpt-4o-mini");

  assert.equal(resolved.provider, "openai");
  assert.equal(resolved.model, "gpt-4o-mini");
});

test("#8926: registered effort variant is rejected when its live base is absent", async () => {
  await seedProviderCatalog("cursor", "cursor-live-without-base-8926", ["cursor-live-only-8926"]);

  const explicit = await getModelInfo("cursor/gpt-5.3-codex-high");

  assert.equal(explicit.provider, null);
  assert.equal(explicit.errorType, "model_not_found");
  assert.match(explicit.errorMessage, /active live catalog/i);

  const bare = await getModelInfo("gpt-5.3-codex-high");

  assert.equal(bare.provider, null);
  assert.equal(bare.errorType, "model_not_found");
  assert.match(bare.errorMessage, /active live catalog/i);
});

test("#8926: live authority defaults to strict and honors explicit partial-discovery opt-outs", () => {
  assert.equal(providerUsesAuthoritativeLiveCatalog("github"), true);
  assert.equal(providerUsesAuthoritativeLiveCatalog("cursor"), true);
  assert.equal(providerUsesAuthoritativeLiveCatalog("unknown-provider-8926"), true);
  assert.equal(providerUsesAuthoritativeLiveCatalog("theoldllm"), true);
  assert.equal(providerUsesAuthoritativeLiveCatalog("command-code"), false);
});

test("#8926: partial passthrough discovery remains non-authoritative", async () => {
  await seedProviderCatalog("command-code", "command-code-partial-live-8926", ["gpt-5.6-luna"]);

  const catalog = await getActiveSyncedCatalog("command-code");

  assert.equal(catalog.authoritative, false);
  assert.deepEqual(
    catalog.models.map((model) => model.id),
    ["gpt-5.6-luna"]
  );
});
