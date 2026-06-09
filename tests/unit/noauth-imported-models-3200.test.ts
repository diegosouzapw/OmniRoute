// Regression test for #3200 — imported/custom models on noAuth providers were missing
// from GET /api/v1/models (and therefore from the Playground model dropdown), while
// BUILT-IN and CUSTOM models on regular auth providers showed up fine.
//
// Root cause: the custom-models loop in catalog.ts gated every model through
// hasEligibleConnectionForModel(getConnectionsForProvider(...)). noAuth providers
// (e.g. theoldllm / alias "tllm") have NO DB connection rows, so getConnectionsForProvider
// returns [] and hasEligibleConnectionForModel([]) === false → the model was dropped.
// Built-in models survived because they go through providerSupportsModel(), which has a
// noAuth bypass (#2798). This test asserts an IMPORTED model on a noAuth provider appears.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-noauth-imported-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-test-secret";

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#3200 imported model on a noAuth provider (theoldllm) appears in /api/v1/models", async () => {
  // theoldllm is a noAuth provider (alias "tllm") — it never creates a DB connection row.
  // Import a model that is NOT a built-in theoldllm model, so its presence is solely due
  // to the custom/imported path (the path the bug breaks).
  await modelsDb.addCustomModel("theoldllm", "my-imported-model-3200", "My Imported Model", "imported");

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<{ id: string }> };
  const ids = new Set(body.data.map((m) => m.id));

  assert.equal(response.status, 200);
  assert.ok(
    ids.has("tllm/my-imported-model-3200"),
    "imported model on noAuth provider must appear under its alias prefix"
  );
});

test("#3200 custom/imported models on auth providers still appear (no regression)", async () => {
  // kiro is an auth provider; with a manual custom model added, the alias-prefixed id
  // must still be present (the active-connection eligibility path is unchanged).
  // No connection seeded here — kiro custom models require an eligible connection, so
  // this guards that the fix does NOT make auth-provider custom models appear without one.
  await modelsDb.addCustomModel("kiro", "custom-kiro-3200", "Custom Kiro");

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<{ id: string }> };
  const ids = new Set(body.data.map((m) => m.id));

  assert.equal(response.status, 200);
  // Auth provider with NO active connection → custom model must NOT leak in.
  assert.equal(
    ids.has("kiro/custom-kiro-3200"),
    false,
    "auth-provider custom model must stay gated behind an eligible connection"
  );
});
