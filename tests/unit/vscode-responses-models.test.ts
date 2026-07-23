import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vscode-responses-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "vscode-responses-models-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const vscodeModelsRoute = await import("../../src/app/api/v1/vscode/[token]/models/route.ts");
const vscodeRawModelsRoute =
  await import("../../src/app/api/v1/vscode/raw/[token]/models/route.ts");

type MetadataModel = {
  id?: string;
  root?: string;
  url?: string;
  api_format?: string;
  supported_endpoints?: string[];
};

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("vscode model metadata routes keep Responses text-generation models", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-vscode-responses-model",
    accessToken: "codex-test-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection("codex", connection.id, [
    {
      id: "future-codex-responses",
      name: "Future Codex Responses",
      source: "imported",
      apiFormat: "responses",
      supportedEndpoints: ["responses"],
      inputTokenLimit: 372000,
      outputTokenLimit: 128000,
    },
  ]);
  const key = await apiKeysDb.createApiKey(
    "vscode-responses-model",
    "machine-vscode-responses-model"
  );
  const params = { params: { token: key.key } };

  const [rawResponse, groupedResponse] = await Promise.all([
    vscodeRawModelsRoute.GET(
      new Request(`http://localhost/api/v1/vscode/raw/${encodeURIComponent(key.key)}/models`),
      params
    ),
    vscodeModelsRoute.GET(
      new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/models`),
      params
    ),
  ]);
  const rawBody = (await rawResponse.json()) as { data?: MetadataModel[] };
  const groupedBody = (await groupedResponse.json()) as { data?: MetadataModel[] };
  const rawModel = (rawBody.data || []).find(
    (entry) => entry.id === "cx/future-codex-responses"
  );
  const groupedModel = (groupedBody.data || []).find(
    (entry) => entry.root === "future-codex-responses"
  );

  assert.equal(rawResponse.status, 200);
  assert.equal(groupedResponse.status, 200);
  assert.ok(rawModel, "raw metadata route dropped a Responses text-generation model");
  assert.ok(groupedModel, "grouped metadata route dropped a Responses text-generation model");
  assert.equal(rawModel.api_format, "responses");
  assert.deepEqual(rawModel.supported_endpoints, ["responses"]);
  assert.equal(
    groupedModel.url,
    `http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/responses#models.ai.azure.com`
  );
});
