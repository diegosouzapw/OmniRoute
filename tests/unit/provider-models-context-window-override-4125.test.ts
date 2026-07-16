import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #4125: manual per-model context-window override.
//
// Custom-model rows already carried an inputTokenLimit/outputTokenLimit set at
// creation time, but there was no way to *edit* the real context window afterwards
// when a provider's own /models endpoint misreports it (e.g. reports 1M when the
// real limit is 128K), and combo routing would drop the model once a too-small
// value made it into the catalog / models.dev sync.
//
// This reuses the Feature-5004 `model_context_overrides` table (source="manual"),
// which already wins over the catalog in `getModelContextLimit()` — the same
// resolver combo routing consults — so no new priority-0 source is needed in
// modelCapabilities.ts. This test proves the API round trip end-to-end: PUT sets
// the override, GET surfaces it back on the model row, and getModelContextLimit()
// (the function combo.ts calls) picks it up.

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-provider-model-context-override-4125-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const contextOverrides = await import("../../src/lib/db/modelContextOverrides.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");
const providerModelsRoute = await import("../../src/app/api/provider-models/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function buildRequest(method: string, body: unknown) {
  return new Request("http://localhost/api/provider-models", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("PUT with contextWindowOverride persists a manual override that wins over the catalog", async () => {
  await modelsDb.addCustomModel(
    "openai-compatible-demo",
    "misreported-model",
    "Misreported Model",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    { inputTokenLimit: 1_000_000 } // provider misreports 1M
  );

  const putRes = await providerModelsRoute.PUT(
    buildRequest("PUT", {
      provider: "openai-compatible-demo",
      modelId: "misreported-model",
      contextWindowOverride: 131072, // real window per the operator
    })
  );
  const putBody = (await putRes.json()) as { contextWindowOverride?: number | null };

  assert.equal(putRes.status, 200);
  assert.equal(putBody.contextWindowOverride, 131072);

  // Persisted as a "manual" source in the Feature-5004 table.
  const record = contextOverrides.getModelContextOverrideRecord(
    "openai-compatible-demo",
    "misreported-model"
  );
  assert.ok(record, "override record should exist");
  assert.equal(record!.realContext, 131072);
  assert.equal(record!.source, "manual");

  // getModelContextLimit is what combo.ts's context-window filter reads — the
  // manual override must win over the (wrong) 1M value on the custom-model row.
  const limit = modelCapabilities.getModelContextLimit(
    "openai-compatible-demo",
    "misreported-model"
  );
  assert.equal(limit, 131072);
});

test("GET surfaces contextWindowOverride on the custom model row", async () => {
  await modelsDb.addCustomModel("openai-compatible-demo", "m1", "M1");
  contextOverrides.setModelContextOverride("openai-compatible-demo", "m1", 200000, "manual");

  const getRes = await providerModelsRoute.GET(
    new Request("http://localhost/api/provider-models?provider=openai-compatible-demo")
  );
  const body = (await getRes.json()) as {
    models: Array<{ id?: string; contextWindowOverride?: number; contextWindowOverrideSource?: string }>;
  };

  const row = body.models.find((m) => m.id === "m1");
  assert.ok(row, "model row should be present");
  assert.equal(row!.contextWindowOverride, 200000);
  assert.equal(row!.contextWindowOverrideSource, "manual");
});

test("PUT with contextWindowOverride: null clears a previously set override", async () => {
  await modelsDb.addCustomModel("openai-compatible-demo", "m2", "M2");
  contextOverrides.setModelContextOverride("openai-compatible-demo", "m2", 50000, "manual");

  const putRes = await providerModelsRoute.PUT(
    buildRequest("PUT", {
      provider: "openai-compatible-demo",
      modelId: "m2",
      contextWindowOverride: null,
    })
  );
  assert.equal(putRes.status, 200);

  const record = contextOverrides.getModelContextOverrideRecord("openai-compatible-demo", "m2");
  assert.equal(record, null);
});

test("default behavior unchanged: no override means getModelContextLimit falls back to the catalog", async () => {
  await modelsDb.addCustomModel("openai-compatible-demo", "m3", "M3");
  const limit = modelCapabilities.getModelContextLimit("openai-compatible-demo", "m3");
  // No override, no catalog entry for this unknown custom model → null (not dropped
  // by the combo prefilter, which treats unknown context as "include to be safe").
  assert.equal(limit, null);
});
