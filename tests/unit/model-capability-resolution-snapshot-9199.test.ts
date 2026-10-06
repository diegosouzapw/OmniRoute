/**
 * #9199 — build-local ModelCapabilityResolutionSnapshot parity.
 *
 * Snapshot-backed resolution must match ordinary on-demand resolvers for the
 * same pure chain (synced + max_token override + context override + alias
 * fallback + missing data). The snapshot must not flip models.dev's module-
 * global all-row cache.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cap-snapshot-9199-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "cap-snapshot-9199-secret";
// Isolate getTokenLimit from host env CONTEXT_LENGTH_* overrides.
const originalContextLengthEnv = new Map(
  Object.entries(process.env).filter(([key]) => key.startsWith("CONTEXT_LENGTH_"))
);
for (const key of originalContextLengthEnv.keys()) delete process.env[key];

const core = await import("../../src/lib/db/core.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const capabilityOverrides = await import("../../src/lib/db/modelCapabilityOverrides.ts");
const contextOverrides = await import("../../src/lib/db/modelContextOverrides.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");
const contextManager = await import("../../open-sse/services/contextManager.ts");
const model = await import("../../open-sse/services/model.ts");
const { MODEL_SPECS } = await import("../../src/shared/constants/modelSpecs.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");

test.after(() => {
  core.resetDbInstance();
  for (const key of Object.keys(process.env)) {
    if (key.startsWith("CONTEXT_LENGTH_")) delete process.env[key];
  }
  for (const [key, value] of originalContextLengthEnv) process.env[key] = value;
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // best-effort cleanup
  }
});

function seedFixture() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();

  modelsDevSync.saveModelsDevCapabilities({
    // Direct provider/model hit used by ordinary + snapshot paths.
    "parity-provider": {
      "parity-model": {
        tool_call: true,
        reasoning: true,
        attachment: false,
        structured_output: null,
        temperature: true,
        modalities_input: '["text"]',
        modalities_output: '["text"]',
        knowledge_cutoff: null,
        release_date: null,
        last_updated: null,
        status: null,
        family: null,
        open_weights: null,
        limit_context: 111111,
        limit_input: 100000,
        limit_output: 2222,
        interleaved_field: null,
      },
    },
    // Alias-side storage only — canonical `opencode` must still resolve via fallback.
    "opencode-zen": {
      "zen-only-model": {
        tool_call: true,
        reasoning: false,
        attachment: false,
        structured_output: null,
        temperature: true,
        modalities_input: '["text"]',
        modalities_output: '["text"]',
        knowledge_cutoff: null,
        release_date: null,
        last_updated: null,
        status: null,
        family: null,
        open_weights: null,
        limit_context: 333333,
        limit_input: 300000,
        limit_output: 4444,
        interleaved_field: null,
      },
    },
  });

  assert.equal(
    capabilityOverrides.setModelCapabilityOverride(
      "parity-provider/parity-model",
      "max_output_tokens",
      99999
    ),
    true
  );
  // Malformed capability override row must be filtered from list/bulk maps.
  core
    .getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO model_capability_overrides " +
        "(provider, model_id, override_key, override_value, refreshed_at) " +
        "VALUES (?, ?, ?, ?, datetime('now'))"
    )
    .run("parity-provider", "parity-model-bad", "max_output_tokens", "not-a-number");

  // Collision pairs that a delimiter-composed key would merge: (a, b\0c) vs (a\0b, c).
  assert.equal(
    capabilityOverrides.setModelCapabilityOverride("a/b\u0000c", "max_output_tokens", 10101),
    true
  );
  assert.equal(
    capabilityOverrides.setModelCapabilityOverride("a\u0000b/c", "max_output_tokens", 20202),
    true
  );
  assert.equal(contextOverrides.setModelContextOverride("a", "b\u0000c", 30303, "manual"), true);
  assert.equal(contextOverrides.setModelContextOverride("a\u0000b", "c", 40404, "manual"), true);

  // Real provider-model alias from open-sse/services/model.ts PROVIDER_MODEL_ALIASES.
  // Override is stored only under the raw alias id, not the canonical model.
  const aliasCanonical = model.resolveCanonicalProviderModel("github", "claude-4.5-opus");
  assert.equal(aliasCanonical.provider, "github");
  assert.equal(aliasCanonical.model, "claude-opus-4-5-20251101");
  assert.notEqual(aliasCanonical.model, "claude-4.5-opus");
  assert.equal(
    capabilityOverrides.setModelCapabilityOverride(
      "github/claude-4.5-opus",
      "max_output_tokens",
      77777
    ),
    true
  );
  assert.equal(
    capabilityOverrides.getModelCapabilityOverride(
      "github",
      "claude-opus-4-5-20251101",
      "max_output_tokens"
    ),
    null,
    "override must exist only under the raw alias model id"
  );

  assert.equal(
    contextOverrides.setModelContextOverride("parity-provider", "parity-model", 555555, "manual"),
    true
  );
}

function insertRawCapability(provider: string, modelId: string): void {
  modelsDevSync.ensureCapabilitiesTable();
  core
    .getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO model_capabilities " +
        "(provider, model_id, tool_call, reasoning, attachment, structured_output, temperature, " +
        "modalities_input, modalities_output, knowledge_cutoff, release_date, last_updated, " +
        "status, family, open_weights, limit_context, limit_input, limit_output, interleaved_field, last_synced) " +
        "VALUES (?, ?, 1, 1, 0, NULL, 1, '[]', '[]', NULL, NULL, NULL, NULL, NULL, NULL, 111111, 100000, 2222, NULL, datetime('now'))"
    )
    .run(provider, modelId);
}

function pickParityFields(
  resolved: ReturnType<typeof modelCapabilities.getResolvedModelCapabilities>
) {
  return {
    provider: resolved.provider,
    model: resolved.model,
    rawModel: resolved.rawModel,
    toolCalling: resolved.toolCalling,
    reasoning: resolved.reasoning,
    supportsThinking: resolved.supportsThinking,
    supportsTools: resolved.supportsTools,
    supportsVision: resolved.supportsVision,
    contextWindow: resolved.contextWindow,
    maxInputTokens: resolved.maxInputTokens,
    maxOutputTokens: resolved.maxOutputTokens,
    attachment: resolved.attachment,
    modalitiesInput: resolved.modalitiesInput,
    modalitiesOutput: resolved.modalitiesOutput,
  };
}

function assertOrdinarySnapshotParity(
  provider: string,
  modelId: string,
  snapshot: modelCapabilities.ModelCapabilityResolutionSnapshot,
  label: string
) {
  const ordinaryCaps = modelCapabilities.getResolvedModelCapabilities({
    provider,
    model: modelId,
  });
  const snapshotCaps = modelCapabilities.getResolvedModelCapabilities(
    { provider, model: modelId },
    snapshot
  );
  assert.deepEqual(
    pickParityFields(snapshotCaps),
    pickParityFields(ordinaryCaps),
    `${label}: getResolvedModelCapabilities parity`
  );

  const ordinaryLimit = contextManager.getTokenLimit(provider, modelId);
  const snapshotLimit = contextManager.getTokenLimit(provider, modelId, snapshot);
  assert.equal(
    snapshotLimit,
    ordinaryLimit,
    `${label}: getTokenLimit parity (got ${snapshotLimit}, want ${ordinaryLimit})`
  );

  const ordinaryContext = modelCapabilities.getModelContextLimit(provider, modelId);
  const snapshotContext = modelCapabilities.getModelContextLimit(provider, modelId, snapshot);
  assert.equal(snapshotContext, ordinaryContext, `${label}: getModelContextLimit parity`);
}

test("#9199 bulk capability rows treat prototype-shaped keys as data", () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();

  insertRawCapability("__proto__", "polluted-model");
  insertRawCapability("prototype-provider", "__proto__");
  assert.equal(Object.hasOwn(Object.prototype, "polluted-model"), false);

  const ordinary = modelsDevSync.getSyncedCapability("__proto__", "polluted-model");
  assert.equal(ordinary?.limit_context, 111111, "ordinary point lookup must support the row");
  assert.equal(Object.hasOwn(Object.prototype, "polluted-model"), false);

  try {
    const bulk = modelsDevSync.loadAllSyncedCapabilitiesUncached();
    assert.equal(Object.hasOwn(bulk, "__proto__"), true);
    assert.equal(bulk["__proto__"]?.["polluted-model"]?.limit_output, 2222);
    assert.equal(Object.hasOwn(bulk["prototype-provider"], "__proto__"), true);
    assert.equal(bulk["prototype-provider"]?.["__proto__"]?.limit_context, 111111);
    assert.equal(Object.hasOwn(Object.prototype, "polluted-model"), false);
  } finally {
    delete (Object.prototype as Record<string, unknown>)["polluted-model"];
  }
});

test("#9199 uncached bulk load does not mutate models.dev all-row cache", () => {
  seedFixture();
  // clearModelsDevCapabilities leaves cachedCapabilitiesLoadedAll=true with {}.
  modelsDevSync.clearModelsDevCapabilities();
  assert.equal(modelsDevSync.getSyncedCapability("parity-provider", "parity-model"), null);

  // Insert behind the module-global cache via raw SQL.
  const db = core.getDbInstance();
  insertRawCapability("parity-provider", "parity-model");

  // Ordinary path still sees the empty module cache.
  assert.equal(modelsDevSync.getSyncedCapability("parity-provider", "parity-model"), null);

  const bulk = modelsDevSync.loadAllSyncedCapabilitiesUncached();
  assert.equal(bulk["parity-provider"]?.["parity-model"]?.limit_context, 111111);

  // Uncached bulk must not publish into the module-global cache.
  assert.equal(
    modelsDevSync.getSyncedCapability("parity-provider", "parity-model"),
    null,
    "loadAllSyncedCapabilitiesUncached must not flip cachedCapabilitiesLoadedAll data"
  );

  const originalPrepare = db.prepare;
  const callPrepare = originalPrepare.bind(db);
  const counts = { synced: 0, capabilityOverrides: 0, contextOverrides: 0 };
  (db as unknown as { prepare: typeof db.prepare }).prepare = ((sql: string) => {
    const normalized = String(sql).replace(/\s+/g, " ").trim();
    if (normalized.includes("FROM model_capabilities")) counts.synced++;
    if (normalized.includes("FROM model_capability_overrides")) counts.capabilityOverrides++;
    if (normalized.includes("FROM model_context_overrides")) counts.contextOverrides++;
    return callPrepare(sql);
  }) as typeof db.prepare;

  try {
    const snapshot = modelCapabilities.createModelCapabilityResolutionSnapshot();
    assert.equal(snapshot.synced["parity-provider"]?.["parity-model"]?.limit_output, 2222);
  } finally {
    (db as unknown as { prepare: typeof db.prepare }).prepare = originalPrepare;
  }

  assert.deepEqual(counts, { synced: 1, capabilityOverrides: 1, contextOverrides: 1 });
  assert.equal(
    modelsDevSync.getSyncedCapability("parity-provider", "parity-model"),
    null,
    "snapshot creation must remain build-local"
  );
});

// This subtest stores map keys containing an embedded NUL byte ("\u0000") to
// verify the nested-map keying keeps delimiter-colliding pairs distinct. That
// requires the SQLite driver to preserve NUL bytes inside TEXT values.
// better-sqlite3 (the driver shipped and run in production/CI) preserves them.
// node:sqlite — the fallback this repo drops to when better-sqlite3's native
// module can't load (e.g. a sandbox missing the required GLIBC) — truncates a
// TEXT value at the first NUL byte (C-string semantics), so "a\u0000b" round-
// trips as "a". That is a hard limitation of the node:sqlite binding, not a
// defect in the code under test, and it only affects this NUL-byte edge case.
// Probe the active driver once and skip with a clear reason when NUL bytes are
// not preserved, so the test still runs and guards the behavior on CI.
function nulBytesArePreservedByDriver(): boolean {
  try {
    const db = core.getDbInstance();
    db.exec("CREATE TABLE IF NOT EXISTS __nul_probe (k TEXT)");
    db.prepare("DELETE FROM __nul_probe").run();
    db.prepare("INSERT INTO __nul_probe (k) VALUES (?)").run("a\u0000b");
    const row = db.prepare("SELECT k FROM __nul_probe").get() as { k: string } | undefined;
    return row?.k === "a\u0000b";
  } catch {
    return false;
  }
}

test("#9199 nested override maps keep delimiter-colliding pairs distinct", (t) => {
  if (!nulBytesArePreservedByDriver()) {
    t.skip(
      "Active SQLite driver truncates TEXT at embedded NUL bytes (node:sqlite " +
        "fallback); better-sqlite3 in CI preserves them. Known driver limitation, " +
        "not a code defect."
    );
    return;
  }
  seedFixture();
  const snapshot = modelCapabilities.createModelCapabilityResolutionSnapshot();

  // Delimiter-composed keys would merge these pairs; nested maps must not.
  assert.equal(snapshot.maxTokenOverrides.get("a")?.get("b\u0000c"), 10101);
  assert.equal(snapshot.maxTokenOverrides.get("a\u0000b")?.get("c"), 20202);
  assert.notEqual(
    snapshot.maxTokenOverrides.get("a")?.get("b\u0000c"),
    snapshot.maxTokenOverrides.get("a\u0000b")?.get("c")
  );

  assert.equal(snapshot.contextOverrides.get("a")?.get("b\u0000c"), 30303);
  assert.equal(snapshot.contextOverrides.get("a\u0000b")?.get("c"), 40404);
  assert.notEqual(
    snapshot.contextOverrides.get("a")?.get("b\u0000c"),
    snapshot.contextOverrides.get("a\u0000b")?.get("c")
  );

  assert.equal(
    capabilityOverrides.getModelCapabilityOverride(
      "a",
      "b\u0000c",
      "max_output_tokens",
      snapshot.maxTokenOverrides
    ),
    10101
  );
  assert.equal(
    capabilityOverrides.getModelCapabilityOverride(
      "a\u0000b",
      "c",
      "max_output_tokens",
      snapshot.maxTokenOverrides
    ),
    20202
  );
  assert.equal(
    contextOverrides.getModelContextOverride("a", "b\u0000c", snapshot.contextOverrides),
    30303
  );
  assert.equal(
    contextOverrides.getModelContextOverride("a\u0000b", "c", snapshot.contextOverrides),
    40404
  );

  assertOrdinarySnapshotParity("a", "b\u0000c", snapshot, "collision pair (a, b\\0c)");
  assertOrdinarySnapshotParity("a\u0000b", "c", snapshot, "collision pair (a\\0b, c)");

  assert.equal(
    modelCapabilities.getResolvedModelCapabilities({ provider: "a", model: "b\u0000c" }, snapshot)
      .maxOutputTokens,
    10101
  );
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities({ provider: "a\u0000b", model: "c" }, snapshot)
      .maxOutputTokens,
    20202
  );
  assert.equal(modelCapabilities.getModelContextLimit("a", "b\u0000c", snapshot), 30303);
  assert.equal(modelCapabilities.getModelContextLimit("a\u0000b", "c", snapshot), 40404);
});

test("#9199 snapshot-backed resolution matches ordinary resolvers across resolution paths", () => {
  seedFixture();
  const snapshot = modelCapabilities.createModelCapabilityResolutionSnapshot();

  // Static MODEL_SPECS pin (not seeded in models.dev / overrides).
  const staticSpec = MODEL_SPECS["gpt-4o-mini"];
  assert.ok(staticSpec, "gpt-4o-mini must remain a real MODEL_SPECS entry");
  assert.equal(typeof staticSpec.maxOutputTokens, "number");
  assert.equal(typeof staticSpec.contextWindow, "number");
  assert.equal(
    MODEL_SPECS["glm-5-turbo"],
    undefined,
    "glm-5-turbo must stay absent from MODEL_SPECS so its case exercises PROVIDER_MODELS"
  );

  // Provider registry defaultContextLength path: no per-model catalog hit.
  const defaultContextProvider = "gitlab-duo";
  const defaultContextModel = "no-catalog-model-9199";
  assert.equal(
    REGISTRY[defaultContextProvider]?.defaultContextLength,
    128000,
    "gitlab-duo must keep a real provider-registry defaultContextLength"
  );
  assert.equal(
    modelCapabilities.getModelContextLimit(defaultContextProvider, defaultContextModel),
    null,
    "default-context path requires no resolved per-model contextWindow"
  );

  // Model-name heuristic path: unknown provider with a claude-shaped model id.
  const heuristicProvider = "unknown-provider-9199";
  const heuristicModel = "custom-claude-lab";
  assert.equal(REGISTRY[heuristicProvider], undefined);
  assert.equal(
    modelCapabilities.getModelContextLimit(heuristicProvider, heuristicModel),
    null,
    "heuristic path requires no resolved per-model contextWindow"
  );

  const cases: Array<{ provider: string; model: string; label: string }> = [
    { provider: "parity-provider", model: "parity-model", label: "direct synced + both overrides" },
    { provider: "opencode", model: "zen-only-model", label: "alias fallback to opencode-zen" },
    {
      provider: "github",
      model: "claude-4.5-opus",
      label: "canonical model alias with rawModel-only max_token override",
    },
    {
      provider: "glm",
      model: "glm-5-turbo",
      label: "registry-backed model (PROVIDER_MODELS context/output limits)",
    },
    {
      provider: "missing-provider",
      model: "gpt-4o-mini",
      label: "static MODEL_SPECS-backed model",
    },
    {
      provider: defaultContextProvider,
      model: defaultContextModel,
      label: "provider registry defaultContextLength path",
    },
    {
      provider: heuristicProvider,
      model: heuristicModel,
      label: "model-name heuristic/default path",
    },
    { provider: "missing-provider", model: "missing-model", label: "missing synced + overrides" },
  ];

  for (const entry of cases) {
    assertOrdinarySnapshotParity(entry.provider, entry.model, snapshot, entry.label);
  }

  // Explicit override/precedence pins so the test is not only structural.
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities(
      { provider: "parity-provider", model: "parity-model" },
      snapshot
    ).maxOutputTokens,
    99999,
    "max_token override must win over synced limit_output"
  );
  assert.equal(
    modelCapabilities.getModelContextLimit("parity-provider", "parity-model", snapshot),
    555555,
    "context override must win over synced limit_context / resolved contextWindow"
  );
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities(
      { provider: "opencode", model: "zen-only-model" },
      snapshot
    ).contextWindow,
    333333,
    "canonical opencode must resolve capabilities stored under opencode-zen"
  );

  const aliasResolved = modelCapabilities.getResolvedModelCapabilities(
    { provider: "github", model: "claude-4.5-opus" },
    snapshot
  );
  assert.equal(aliasResolved.rawModel, "claude-4.5-opus");
  assert.equal(aliasResolved.model, "claude-opus-4-5-20251101");
  assert.equal(
    aliasResolved.maxOutputTokens,
    77777,
    "max_token override stored only under rawModel must still apply after alias resolution"
  );
  const canonicalOnly = modelCapabilities.getResolvedModelCapabilities(
    { provider: "github", model: "claude-opus-4-5-20251101" },
    snapshot
  );
  assert.equal(canonicalOnly.rawModel, "claude-opus-4-5-20251101");
  assert.equal(canonicalOnly.model, "claude-opus-4-5-20251101");
  assert.notEqual(
    canonicalOnly.maxOutputTokens,
    77777,
    "canonical id alone must not invent the rawModel-only max_token override"
  );

  // Registry-backed pins: glm-5-turbo is absent from MODEL_SPECS.
  const registryResolved = modelCapabilities.getResolvedModelCapabilities(
    { provider: "glm", model: "glm-5-turbo" },
    snapshot
  );
  assert.equal(registryResolved.contextWindow, 200000);
  assert.equal(registryResolved.maxOutputTokens, 131072);

  // Static MODEL_SPECS pin without a provider registry hit for this missing provider.
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities(
      { provider: "missing-provider", model: "gpt-4o-mini" },
      snapshot
    ).maxOutputTokens,
    staticSpec.maxOutputTokens
  );
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities(
      { provider: "missing-provider", model: "gpt-4o-mini" },
      snapshot
    ).contextWindow,
    staticSpec.contextWindow
  );

  // Provider defaultContextLength path (getTokenLimit step 3).
  assert.equal(
    contextManager.getTokenLimit(defaultContextProvider, defaultContextModel, snapshot),
    128000
  );

  // Model-name heuristic path (getTokenLimit step 4 → DEFAULT_LIMITS.claude).
  assert.equal(contextManager.getTokenLimit(heuristicProvider, heuristicModel, snapshot), 200000);

  // Missing path remains a pure default/fallback, not a catalog hit.
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities(
      { provider: "missing-provider", model: "missing-model" },
      snapshot
    ).contextWindow,
    null
  );
  assert.equal(contextManager.getTokenLimit("missing-provider", "missing-model", snapshot), 128000);

  assert.equal(
    snapshot.maxTokenOverrides.get("parity-provider")?.has("parity-model-bad") ?? false,
    false,
    "malformed max_token rows must be filtered from the bulk map"
  );
});
