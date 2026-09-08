// A self-hosted server like llama.cpp reports NO capability data on its own
// /v1/models response -- unlike Ollama (already fixed for this in #11087 via
// an /api/show probe), llama.cpp has no equivalent endpoint to probe. So a
// discovered embedding model's synced cache entry (syncedAvailableModels)
// never gets supportedEndpoints of its own, and the operator's only recourse
// is the explicit "Supported endpoints" override in the Providers UI.
//
// That override turned out to be broken end to end:
//
//  1. PUT /api/provider-models (updateCustomModel) 404'd for any model that
//     had never been explicitly imported into customModels before -- exactly
//     the case for every auto-discovered model, so the very save the UI
//     offers for this situation failed silently.
//  2. Even with a saved override, /v1/embeddings' dynamic-provider routing
//     (resolveLocalSyncedEndpointRoute) only ever consulted the raw,
//     un-annotated syncedAvailableModels cache -- never the customModels
//     override the /v1/models catalog itself already merges in for display.
//
// Both are pinned here against the real user-observed shape: a llama-cpp
// connection with one synced model (source: "imported", no
// supportedEndpoints), an operator-set override marking it embeddings-
// capable, and a request through the same code path createEmbeddingResponse
// uses (parseEmbeddingModel's provider miss -> resolveLocalSyncedEndpointRoute).

import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-local-embedding-override-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { resolveLocalSyncedEndpointRoute } = await import(
  "../../src/lib/providerModels/syncedEndpointRouting.ts"
);

const PROVIDER = "llama-cpp";
const ALIAS = "llamacpp";
const RAW_MODEL_ID = "/models/Qwen3-Embedding-4B-Q8_0.gguf";
const ALIAS_MODEL_ID = `${ALIAS}/${RAW_MODEL_ID}`;
const CONNECTION_ID = "c7e7371e-709d-4f3d-a704-b0767bf7f1bc";

beforeEach(() => {
  core.getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace IN ('customModels', 'syncedAvailableModels')")
    .run();
});

function seedSyncedModelWithNoCapabilityData() {
  core.getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
    )
    .run(
      `${PROVIDER}:${CONNECTION_ID}`,
      // Exact shape llama.cpp discovery actually persists: no supportedEndpoints,
      // no apiFormat -- the raw /v1/models response has nothing to carry them.
      JSON.stringify([{ id: RAW_MODEL_ID, name: RAW_MODEL_ID, source: "imported" }])
    );
}

test("updateCustomModel: createIfMissing upserts instead of 404ing on a never-imported model", async () => {
  const before = await modelsDb.getCustomModels(PROVIDER);
  assert.deepEqual(before, [], "sanity: no customModels row exists yet for this provider");

  const result = await modelsDb.updateCustomModel(
    PROVIDER,
    ALIAS_MODEL_ID,
    { supportedEndpoints: ["embeddings"] },
    { createIfMissing: true }
  );

  assert.ok(result, "must return the created/updated model, not null");
  assert.deepEqual(result!.supportedEndpoints, ["embeddings"]);

  const after = await modelsDb.getCustomModels(PROVIDER);
  assert.equal(after.length, 1);
  assert.equal(after[0].id, ALIAS_MODEL_ID);
});

test("updateCustomModel: without createIfMissing, still returns null for a never-imported model (unchanged contract)", async () => {
  const result = await modelsDb.updateCustomModel("some-other-provider", "never/imported", {
    supportedEndpoints: ["embeddings"],
  });
  assert.equal(result, null, "the PATCH isHidden caller relies on this null to trigger its own compat-override fallback");
});

test("resolveLocalSyncedEndpointRoute: an operator override rescues a model with no supportedEndpoints of its own", async () => {
  seedSyncedModelWithNoCapabilityData();

  const beforeOverride = await resolveLocalSyncedEndpointRoute(ALIAS_MODEL_ID, "embeddings");
  assert.equal(
    beforeOverride,
    null,
    "without an override, the un-annotated synced entry must not match"
  );

  await modelsDb.updateCustomModel(
    PROVIDER,
    ALIAS_MODEL_ID,
    { supportedEndpoints: ["embeddings"] },
    { createIfMissing: true }
  );

  const afterOverride = await resolveLocalSyncedEndpointRoute(ALIAS_MODEL_ID, "embeddings");
  assert.ok(afterOverride, "the explicit override must make the route resolve");
  assert.equal(afterOverride!.provider, PROVIDER);
  assert.equal(afterOverride!.model, RAW_MODEL_ID);
  assert.deepEqual(afterOverride!.connectionIds, [CONNECTION_ID]);
});

test("resolveLocalSyncedEndpointRoute: an override for a different model does not leak onto this one", async () => {
  seedSyncedModelWithNoCapabilityData();
  await modelsDb.updateCustomModel(
    PROVIDER,
    `${ALIAS}/some-other-model.gguf`,
    { supportedEndpoints: ["embeddings"] },
    { createIfMissing: true }
  );

  const route = await resolveLocalSyncedEndpointRoute(ALIAS_MODEL_ID, "embeddings");
  assert.equal(route, null, "an override on an unrelated model id must not match this one");
});

test("resolveLocalSyncedEndpointRoute: a caller who collapses the double slash to a single slash still resolves", async () => {
  // llama.cpp's own /v1/models reports models by absolute filesystem path
  // ("/models/Qwen3-Embedding-4B-Q8_0.gguf"), so "<alias>/<rawId>" reads as
  // "llamacpp//models/..." -- correct, but easy for an operator to naturally
  // collapse to a single slash when typing/pasting it by hand.
  seedSyncedModelWithNoCapabilityData();
  await modelsDb.updateCustomModel(
    PROVIDER,
    ALIAS_MODEL_ID, // saved under the catalog's own double-slash id
    { supportedEndpoints: ["embeddings"] },
    { createIfMissing: true }
  );

  const singleSlashId = `${ALIAS}/models/Qwen3-Embedding-4B-Q8_0.gguf`; // one slash, not two
  assert.notEqual(singleSlashId, ALIAS_MODEL_ID, "sanity: this really is the collapsed form");

  const route = await resolveLocalSyncedEndpointRoute(singleSlashId, "embeddings");
  assert.ok(route, "the single-slash form must still resolve to the same model/connection");
  assert.equal(route!.provider, PROVIDER);
  assert.equal(route!.model, RAW_MODEL_ID, "the resolved model id must be the real leading-slash form");
  assert.deepEqual(route!.connectionIds, [CONNECTION_ID]);
});

test("resolveLocalSyncedEndpointRoute: a model's own genuine supportedEndpoints still work with no override needed", async () => {
  core.getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
    )
    .run(
      `${PROVIDER}:${CONNECTION_ID}`,
      JSON.stringify([
        {
          id: RAW_MODEL_ID,
          name: RAW_MODEL_ID,
          source: "imported",
          supportedEndpoints: ["embeddings"],
        },
      ])
    );

  const route = await resolveLocalSyncedEndpointRoute(ALIAS_MODEL_ID, "embeddings");
  assert.ok(route, "a genuinely-annotated synced entry must resolve without needing an override");
  assert.deepEqual(route!.connectionIds, [CONNECTION_ID]);
});
