// #6247 regression guard — the per-connection /api/providers/[id]/models route
// (used by MCP list_models_catalog + the dashboard import view) must include
// USER-ADDED custom models, not just the static/discovered catalog.
//
// Root cause: the route never read getCustomModels(provider) (custom models live
// in key_value namespace `customModels`), so the live REST /api/v1/models merged
// them but the per-connection route did not — on both the local_catalog and the
// discovery-success paths. Fix: merge getCustomModels(provider) (dedup by id,
// owned_by: provider) into the route's returned model list.
//
// Harness copied (minimal) from tests/unit/provider-models-route.test.ts — the
// frozen file's own note says the seedConnection/callRoute harness is not
// separately extractable, so a small local copy is acceptable.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-custom-merge-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

interface SeedOverrides {
  authType?: string;
  name?: string;
  apiKey?: string;
  accessToken?: string;
  isActive?: boolean;
  testStatus?: string;
  providerSpecificData?: Record<string, unknown>;
}

async function seedConnection(provider: string, overrides: SeedOverrides = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "apikey",
    name: overrides.name || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey,
    accessToken: overrides.accessToken,
    isActive: overrides.isActive ?? true,
    testStatus: overrides.testStatus || "active",
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

async function callRoute(connectionId: string, search = "") {
  return providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models${search}`),
    { params: { id: connectionId } }
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("per-connection models route includes user-added custom models on the local_catalog path (#6247)", async () => {
  const connection = await seedConnection("aimlapi", { apiKey: "aiml-key" });

  // A user-added custom model persisted under key_value namespace `customModels`.
  await modelsDb.addCustomModel("aimlapi", "my-org/custom-model-6247", "My Custom 6247");

  // Force the local_catalog fallback: the live models probe fails, so the route
  // serves the local catalog (source local_catalog) — the path that dropped
  // custom models before the fix.
  globalThis.fetch = (async () => new Response("upstream down", { status: 500 })) as typeof fetch;

  const response = await callRoute(connection.id);
  const body = (await response.json()) as {
    source?: string;
    models?: Array<{ id: string; owned_by?: string }>;
  };

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  const custom = (body.models || []).find((m) => m.id === "my-org/custom-model-6247");
  // RED before the fix: the custom model is absent (route never read getCustomModels).
  assert.ok(custom, "user-added custom model must appear in the per-connection catalog");
  assert.equal(custom.owned_by, "aimlapi", "custom model must be stamped owned_by = provider");
});
