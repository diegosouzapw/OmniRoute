/**
 * #14587 — the runtime reads modelCompatOverrides.supportsVision, but the canonical
 * capability resolver (and therefore /v1/models + /v1/combos) used to ignore it.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compat-vision-14587-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "compat-vision-14587-test-secret";

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");
const { enrichCatalogModelEntry } = await import("../../src/lib/modelMetadataRegistry.ts");
const { computeComboCapabilities, projectComboCollectionWithCapabilities } =
  await import("../../src/app/api/v1/combos/projectCombo.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");

const TRUE_MODEL = "acme-compat-sight-14587";
const FALSE_MODEL = "acme-compat-blind-14587";
const UNSET_MODEL = "acme-compat-unknown-14587";
const CUSTOM_WINS_TRUE = "acme-custom-wins-true-14587";
const CUSTOM_WINS_FALSE = "acme-custom-wins-false-14587";
const SHARED_MODEL = "acme-provider-scoped-14587";

test.before(async () => {
  modelsDb.mergeModelCompatOverride("codex", TRUE_MODEL, { supportsVision: true });
  modelsDb.mergeModelCompatOverride("codex", FALSE_MODEL, { supportsVision: false });
  modelsDb.mergeModelCompatOverride("codex", CUSTOM_WINS_TRUE, { supportsVision: false });
  modelsDb.mergeModelCompatOverride("codex", CUSTOM_WINS_FALSE, { supportsVision: true });
  modelsDb.mergeModelCompatOverride("codex", SHARED_MODEL, { supportsVision: true });
  modelsDb.mergeModelCompatOverride("anthropic", SHARED_MODEL, { supportsVision: false });

  await modelsDb.addCustomModel(
    "codex",
    CUSTOM_WINS_TRUE,
    CUSTOM_WINS_TRUE,
    "manual",
    "responses",
    ["chat"],
    undefined,
    {},
    true
  );
  await modelsDb.addCustomModel(
    "codex",
    CUSTOM_WINS_FALSE,
    CUSTOM_WINS_FALSE,
    "manual",
    "responses",
    ["chat"],
    undefined,
    {},
    false
  );
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("#14587 canonical resolver honors compat true/false/unset without changing custom precedence", () => {
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities({
      provider: "codex",
      model: TRUE_MODEL,
    }).supportsVision,
    true
  );
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities({
      provider: "codex",
      model: FALSE_MODEL,
    }).supportsVision,
    false
  );
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities({
      provider: "codex",
      model: UNSET_MODEL,
    }).supportsVision,
    null
  );
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities(
      { provider: "codex", model: TRUE_MODEL },
      { persistedOverrides: false }
    ).supportsVision,
    null,
    "override-free catalog reconciliation must stay override-free"
  );

  assert.equal(
    modelCapabilities.getResolvedModelCapabilities({
      provider: "codex",
      model: CUSTOM_WINS_TRUE,
    }).supportsVision,
    true,
    "customModels true must win over compat false"
  );
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities({
      provider: "codex",
      model: CUSTOM_WINS_FALSE,
    }).supportsVision,
    false,
    "customModels false must win over compat true"
  );
});

test("#14587 bare, prefixed, and alias forms resolve the same compat override", () => {
  const cases = [
    { provider: "codex", model: TRUE_MODEL },
    { provider: "codex", model: `cx/${TRUE_MODEL}` },
    { provider: "cx", model: `cx/${TRUE_MODEL}` },
    `codex/${TRUE_MODEL}`,
    `cx/${TRUE_MODEL}`,
  ] as const;

  for (const input of cases) {
    assert.equal(
      modelCapabilities.getResolvedModelCapabilities(input).supportsVision,
      true,
      JSON.stringify(input)
    );
  }
});

test("#14587 identical model ids remain isolated by provider", () => {
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities({
      provider: "codex",
      model: SHARED_MODEL,
    }).supportsVision,
    true
  );
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities({
      provider: "anthropic",
      model: SHARED_MODEL,
    }).supportsVision,
    false
  );
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities({
      provider: "openai",
      model: SHARED_MODEL,
    }).supportsVision,
    null
  );
});

test("#14587 /v1/models enrichment and /v1/combos projection use the compat verdict", () => {
  const snapshot = modelCapabilities.createModelCapabilityResolutionSnapshot();
  const catalogEntry = enrichCatalogModelEntry(
    {
      id: `cx/${TRUE_MODEL}`,
      owned_by: "codex",
      root: TRUE_MODEL,
    },
    undefined,
    { modelsDevPricing: null, capabilityResolutionSnapshot: snapshot }
  );
  const textOnlyEntry = enrichCatalogModelEntry(
    {
      id: `cx/${FALSE_MODEL}`,
      owned_by: "codex",
      root: FALSE_MODEL,
    },
    undefined,
    { modelsDevPricing: null, capabilityResolutionSnapshot: snapshot }
  );

  assert.equal((catalogEntry.capabilities as Record<string, unknown>).vision, true);
  assert.deepEqual(catalogEntry.input_modalities, ["text", "image"]);
  assert.equal((textOnlyEntry.capabilities as Record<string, unknown>).vision, false);
  assert.equal(textOnlyEntry.input_modalities, undefined);

  assert.equal(
    computeComboCapabilities({
      models: [
        { kind: "model", model: `cx/${TRUE_MODEL}` },
        { kind: "model", model: `codex/${TRUE_MODEL}` },
      ],
    }).multimodal,
    true
  );
  assert.equal(
    computeComboCapabilities({
      models: [
        { kind: "model", model: `cx/${TRUE_MODEL}` },
        { kind: "model", model: `cx/${FALSE_MODEL}` },
      ],
    }).multimodal,
    false
  );
});

test("#14587 snapshot matches single lookup and bulk-loads compat overrides once", () => {
  const db = core.getDbInstance();
  const ordinaryResults = new Map(
    [TRUE_MODEL, FALSE_MODEL, UNSET_MODEL, SHARED_MODEL].map((model) => [
      model,
      modelCapabilities.getResolvedModelCapabilities({ provider: "codex", model }).supportsVision,
    ])
  );
  const originalPrepare = db.prepare;
  const callPrepare = originalPrepare.bind(db);
  let compatQueries = 0;
  (db as unknown as { prepare: typeof db.prepare }).prepare = ((sql: string) => {
    const normalized = String(sql).replace(/\s+/g, " ").trim();
    if (normalized.includes("modelCompatOverrides")) compatQueries++;
    if (
      normalized.includes("SELECT value FROM key_value") &&
      normalized.includes("namespace = ?")
    ) {
      throw new Error("snapshot resolution attempted a point key_value query");
    }
    return callPrepare(sql);
  }) as typeof db.prepare;

  try {
    const snapshot = modelCapabilities.createModelCapabilityResolutionSnapshot();
    assert.equal(compatQueries, 1, "snapshot must bulk-read the compat namespace exactly once");
    for (const model of [TRUE_MODEL, FALSE_MODEL, UNSET_MODEL, SHARED_MODEL]) {
      const bulk = modelCapabilities.getResolvedModelCapabilities(
        { provider: "codex", model },
        undefined,
        snapshot
      );
      assert.equal(bulk.supportsVision, ordinaryResults.get(model), model);
    }
    assert.equal(compatQueries, 1, "snapshot lookups must not repeat the bulk query");

    for (let index = 0; index < 20; index++) {
      modelCapabilities.getResolvedModelCapabilities(
        { provider: "codex", model: index % 2 ? TRUE_MODEL : FALSE_MODEL },
        undefined,
        snapshot
      );
    }
    assert.equal(compatQueries, 1, "snapshot lookups must not issue one query per model");

    compatQueries = 0;
    const projected = projectComboCollectionWithCapabilities([
      {
        name: "compat-snapshot-a",
        strategy: "priority",
        models: [{ kind: "model", model: `cx/${TRUE_MODEL}` }],
      },
      {
        name: "compat-snapshot-b",
        strategy: "priority",
        models: [{ kind: "model", model: `cx/${TRUE_MODEL}` }],
      },
    ]);
    assert.deepEqual(
      projected.map((combo) => combo.capabilities?.multimodal),
      [true, true]
    );
    assert.equal(compatQueries, 1, "a combo collection must share one compat snapshot");
  } finally {
    (db as unknown as { prepare: typeof db.prepare }).prepare = originalPrepare;
  }
});

test("#14587 runtime already consumes the same compat override", async () => {
  const runtimeTrue = await getModelInfo(`cx/${TRUE_MODEL}`);
  const runtimeFalse = await getModelInfo(`cx/${FALSE_MODEL}`);
  assert.equal(runtimeTrue.supportsVision, true);
  assert.equal(runtimeFalse.supportsVision, false);
});
