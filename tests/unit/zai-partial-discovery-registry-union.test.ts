/**
 * Production incident (2026-10-05): z.ai's live model discovery (the
 * Anthropic-compat /models surface) omits glm-5.3-flash, while the model is
 * fully dispatchable on the provider's coding-plan endpoint — the static
 * registry marks exactly that with a per-model `targetFormat` override.
 * Because live discovery is authoritative by default
 * (providerUsesAuthoritativeLiveCatalog), the synced snapshot vetoed the
 * registry-known model and every combo targeting zai/glm-5.3-flash-max failed
 * pre-dispatch with "model_not_in_catalog" (ALL_TARGETS_SKIPPED) even though
 * both the static registry and the model capability sync knew the model.
 *
 * Fix under test: getActiveSyncedCatalog unions registry models that carry an
 * explicit per-model dispatch intent (`targetFormat`) into the discovered set.
 * The union is bounded: synced metadata still wins for ids discovery knows,
 * and registry models without the marker stay vetoed, preserving the
 * authoritative-catalog guarantee for everything discovery did report.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-zai-partial-discovery-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "zai-partial-discovery-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { zaiProvider } = await import("../../open-sse/config/providers/registry/zai/index.ts");

const PROVIDER = "zai";
const CONNECTION_ID = "zai-partial-discovery-union";
// Dispatchable upstream, present in the static registry with a targetFormat
// override, but absent from the provider's discovery snapshot.
const MISSING_TAGGED_MODEL = "glm-5.3-flash";
const EFFORT_TARGET = `${PROVIDER}/${MISSING_TAGGED_MODEL}-max`;
// In the registry but WITHOUT the dispatch marker — and deliberately omitted
// from the seeded snapshot to prove partial discovery still vetoes it.
const MISSING_UNTAGGED_MODEL = "glm-4.7";
// What the provider's discovery surface actually returned (production
// snapshot from the incident).
const DISCOVERED_MODELS = [
  "glm-5.3",
  "glm-5.2",
  "glm-5.1",
  "glm-5",
  "glm-5-turbo",
  "glm-4.7-flash",
];

function registryModel(id: string) {
  return zaiProvider.models.find((model) => model.id === id);
}

async function seedPartialDiscovery(): Promise<void> {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT OR REPLACE INTO provider_connections (id, provider, is_active, created_at, updated_at)
     VALUES (?, ?, 1, ?, ?)`
  ).run(CONNECTION_ID, PROVIDER, now, now);

  await replaceSyncedAvailableModelsForConnection(
    PROVIDER,
    CONNECTION_ID,
    DISCOVERED_MODELS.map((id) => ({ id, name: id, source: "imported" }))
  );
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

  await seedPartialDiscovery();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("precondition: the missing model is registry-curated with dispatch intent, an untagged peer is not", () => {
  const tagged = registryModel(MISSING_TAGGED_MODEL);
  assert.ok(tagged, `${MISSING_TAGGED_MODEL} must exist in the zai static registry`);
  assert.equal(tagged.targetFormat, "openai");
  assert.ok(
    tagged.supportedThinkingEfforts?.includes("max"),
    "the incident target is an effort variant of the tagged base"
  );

  const untagged = registryModel(MISSING_UNTAGGED_MODEL);
  assert.ok(untagged, `${MISSING_UNTAGGED_MODEL} must exist in the zai static registry`);
  assert.equal(untagged.targetFormat, undefined);
});

test("a fresh partial catalog vetoes a dispatch-tagged registry model — the incident", async () => {
  const resolved = await getModelInfo(EFFORT_TARGET);

  // The tagged base is unioned from the registry, so the effort variant
  // resolves against it and the model becomes available.
  assert.equal(resolved.provider, PROVIDER);
  assert.match(resolved.model ?? "", /^glm-5\.3-flash/);
  // The dispatch-format handoff is the point of the fix: the resolved info
  // must carry the registry's targetFormat so the request leaves on the
  // OpenAI-compatible coding-plan surface, not the provider default.
  assert.equal(resolved.targetFormat, "openai");
});

test("an empty-but-fresh discovery snapshot never becomes authoritative from tagged rows", async () => {
  await replaceSyncedAvailableModelsForConnection(PROVIDER, CONNECTION_ID, []);
  const { getActiveSyncedCatalog } = await import("../../src/lib/db/models/activeSyncedCatalog.ts");

  const catalog = await getActiveSyncedCatalog(PROVIDER);

  assert.equal(catalog.authoritative, false);
  assert.ok(!catalog.models.some((model) => model.id === MISSING_TAGGED_MODEL));
});

test("listing surfaces agree with dispatch: the tagged base is listed with registry provenance", async () => {
  const { getAllActiveSyncedModels } =
    await import("../../src/lib/db/models/activeSyncedCatalog.ts");

  const listings = await getAllActiveSyncedModels();

  const listed = (listings[PROVIDER] ?? []).find((model) => model.id === MISSING_TAGGED_MODEL);
  assert.ok(listed, "a model dispatch accepts must be discoverable in listings");
  assert.equal(listed.catalogOrigin, "registry");
});

test("a tagged provider without the opt-in flag keeps discovery gating", async () => {
  const { openaiProvider } =
    await import("../../open-sse/config/providers/registry/openai/index.ts");
  const { getAllActiveSyncedModels } =
    await import("../../src/lib/db/models/activeSyncedCatalog.ts");

  // openai carries targetFormat tags but has NOT opted into the union: a
  // discovery snapshot omitting one of its tagged models must keep vetoing it.
  const taggedModel = openaiProvider.models.find(
    (model) => typeof model.targetFormat === "string" && model.targetFormat.length > 0
  );
  assert.ok(taggedModel, "precondition: openai registry has a targetFormat-tagged model");
  assert.notEqual(openaiProvider.registryDispatchUnion, true);

  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT OR REPLACE INTO provider_connections (id, provider, is_active, created_at, updated_at)
     VALUES (?, ?, 1, ?, ?)`
  ).run("openai-no-union-flag", "openai", now, now);
  const discoveredIds = openaiProvider.models
    .filter((model) => model.id !== taggedModel.id)
    .map((model) => ({ id: model.id, name: model.name, source: "imported" }));
  await replaceSyncedAvailableModelsForConnection("openai", "openai-no-union-flag", discoveredIds);

  const resolved = await getModelInfo(`openai/${taggedModel.id}`);
  assert.equal(resolved.provider, null);
  assert.equal(resolved.errorType, "model_not_found");

  const listings = await getAllActiveSyncedModels();
  assert.ok(!(listings.openai ?? []).some((model) => model.id === taggedModel.id));
});

test("the tagged base joins the authoritative catalog without displacing discovery rows", async () => {
  const { getActiveSyncedCatalog } = await import("../../src/lib/db/models/activeSyncedCatalog.ts");

  const catalog = await getActiveSyncedCatalog(PROVIDER);

  assert.equal(catalog.authoritative, true);
  const byId = new Map(catalog.models.map((model) => [model.id, model]));
  assert.ok(byId.has(MISSING_TAGGED_MODEL), "tagged base must be unioned in");

  // Merge precedence: discovery spoke for glm-5.3, so its synced metadata must
  // win — the registry's display name ("GLM 5.3") and dispatch tag ("openai")
  // must not overwrite it. A flipped merge direction would revert learned
  // metadata to static registry values for every tagged model.
  const discovered = byId.get("glm-5.3");
  assert.ok(discovered, "discovered rows must be preserved");
  assert.equal(discovered.source, "imported");
  assert.equal(discovered.name, "glm-5.3");
  assert.equal(discovered.targetFormat, undefined);

  // The unioned row carries the registry's dispatch intent and capability
  // contract; visionBridgeRouter and the combo context filter read these
  // fields off the row without a registry fallback.
  const tagged = byId.get(MISSING_TAGGED_MODEL);
  assert.ok(tagged, "unioned row must expose its metadata");
  assert.equal(tagged.targetFormat, "openai");
  assert.ok(tagged.supportedThinkingEfforts?.includes("max"));
  // The row and its effort array are process-lifetime singletons handed out
  // by reference (model.ts assigns the array into runtime metadata), so both
  // must be frozen — a normalize rebuild would otherwise discard the freeze.
  assert.equal(Object.isFrozen(tagged), true);
  assert.equal(Object.isFrozen(tagged.supportedThinkingEfforts), true);
  assert.equal(tagged.supportsVision, true);
  assert.equal(tagged.contextWindow, 1000000);
  assert.equal(tagged.outputTokenLimit, 131072);
});

test("an untagged registry model omitted from discovery stays vetoed", async () => {
  const resolved = await getModelInfo(`${PROVIDER}/${MISSING_UNTAGGED_MODEL}`);

  assert.equal(resolved.provider, null);
  assert.equal(resolved.errorType, "model_not_found");
  assert.match(resolved.errorMessage, /active live catalog/i);
});
