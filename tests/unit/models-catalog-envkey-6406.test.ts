// Regression guard for issue #6406 — `/v1/models` returned the full catalog
// unauthenticated but 0 models when an env-var master key (OMNIROUTE_API_KEY /
// ROUTER_API_KEY) was presented. Root cause: `isModelAllowedForKey` denies when
// `getApiKeyMetadata` returns null, and env-var keys have no DB row.
// Fix: skip the per-model filter when apiKey has no metadata (env-var master key).

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-envkey-6406-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-envkey-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

// `getUnifiedModelsResponse` returns the OpenAI-shaped `{object, data}` catalog
// list (see catalog.ts's `responseBody`); only `data[].id` is asserted here.
interface ModelsCatalogResponseBody {
  object: string;
  data: Array<{ id: string; [key: string]: unknown }>;
}

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedOpenAi() {
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-envkey-6406",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  delete process.env.OMNIROUTE_API_KEY;
});

test("#6406 env-var master key (no DB metadata) sees the full catalog, not 0 models", async () => {
  await seedOpenAi();

  // Baseline: unauth response.
  const unauthResponse = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const unauthBody = (await unauthResponse.json()) as ModelsCatalogResponseBody;
  assert.equal(unauthResponse.status, 200);
  const unauthCount = unauthBody.data.length;
  assert.ok(unauthCount > 0, `unauth baseline must have models, got ${unauthCount}`);

  // Env-var master key path — no DB row, so getApiKeyMetadata returns null.
  const envKey = "sk-envkey-6406-master";
  process.env.OMNIROUTE_API_KEY = envKey;

  const authResponse = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { Authorization: `Bearer ${envKey}` },
    })
  );
  const authBody = (await authResponse.json()) as ModelsCatalogResponseBody;

  assert.equal(authResponse.status, 200);
  // Regression: before the fix, this collapsed to 0. Now it matches the unauth
  // catalog (env-var master key has no per-key restrictions).
  assert.equal(
    authBody.data.length,
    unauthCount,
    `env-var key catalog (${authBody.data.length}) must equal unauth catalog (${unauthCount}); auth should GATE access, not FILTER inventory when the key carries no restrictions`
  );
  assert.notEqual(authBody.data.length, 0, "env-var master key must not collapse catalog to 0");
});

test("#6406 DB-backed key with allowedModels still filters (unchanged behavior)", async () => {
  await seedOpenAi();

  const key = await apiKeysDb.createApiKey("envkey-6406-filter", "machine-envkey-6406");
  await apiKeysDb.updateApiKeyPermissions(key.id, { allowedModels: ["openai/*"] });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { Authorization: `Bearer ${key.key}` },
    })
  );
  const body = (await response.json()) as ModelsCatalogResponseBody;
  const ids: string[] = body.data.map((item) => item.id);

  assert.equal(response.status, 200);
  assert.ok(
    ids.some((id) => id.startsWith("openai/")),
    "DB-backed key with allowedModels=['openai/*'] must still see openai/* models"
  );
  assert.equal(
    ids.some((id) => id.startsWith("claude/") || id.startsWith("cc/")),
    false,
    "DB-backed allowedModels filter must still exclude non-matching families"
  );
});
