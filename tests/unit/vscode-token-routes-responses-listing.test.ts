// #7587: PR #7012 widened only the `/models` route's isUsableChatModel copy to
// accept Responses-API-format models (e.g. Codex-discovery-synced GPT models with
// apiFormat "responses"); the other 4 duplicated copies (tags/show, token + raw)
// still rejected anything that wasn't literally "chat-completions", silently
// dropping every OpenAI/Codex "responses" model from the Ollama-compatible
// listing endpoints VS Code's "Ollama" provider import flow actually uses.
//
// Split into its own file (rather than appended to vscode-token-routes.test.ts)
// because that file is frozen by check-file-size.mjs's testFrozen baseline.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vscode-responses-listing-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "vscode-responses-listing-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const vscodeModelsRoute = await import("../../src/app/api/v1/vscode/[token]/models/route.ts");
const vscodeTagsRoute = await import("../../src/app/api/v1/vscode/[token]/api/tags/route.ts");
const vscodeShowRoute = await import("../../src/app/api/v1/vscode/[token]/api/show/route.ts");
const vscodeRawTagsRoute =
  await import("../../src/app/api/v1/vscode/raw/[token]/api/tags/route.ts");
const vscodeRawShowRoute =
  await import("../../src/app/api/v1/vscode/raw/[token]/api/show/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("vscode Ollama-compatible tags/show routes (token + raw) expose Codex-discovered responses-format GPT models", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });

  // Note: the id deliberately avoids the "gpt-5.4" family — it collides with
  // CODEX_DISCOVERY_EXCLUDED_ID_PREFIXES (src/shared/services/codexDiscoveryPolicy.ts)
  // and would be dropped from the catalog before ever reaching the listing filter
  // this test targets.
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: "codex-vscode-responses-listing",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection("codex", connection.id, [
    {
      id: "gpt-6.9-responses-probe",
      name: "GPT 6.9 Responses Probe",
      apiFormat: "responses",
      supportedEndpoints: ["responses"],
      inputTokenLimit: 400000,
      outputTokenLimit: 128000,
    },
  ]);
  const key = await apiKeysDb.createApiKey(
    "vscode-responses-listing",
    "machine-vscode-responses-listing"
  );

  const modelsResponse = await vscodeModelsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/models`)
  );
  const modelsBody = (await modelsResponse.json()) as {
    data?: Array<{ id?: string; owned_by?: string; api_format?: string }>;
  };
  const responsesModel = (modelsBody.data || []).find(
    (model) => model.owned_by === "codex" && model.api_format === "responses"
  );
  assert.ok(
    responsesModel,
    "precondition failed: expected the responses-format GPT model on /models (PR #7012 fix)"
  );

  const tagsResponse = await vscodeTagsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/api/tags`)
  );
  const tagsBody = (await tagsResponse.json()) as { models?: Array<{ name?: string }> };
  const tagNames = new Set((tagsBody.models || []).map((model) => model.name));
  assert.ok(
    tagNames.has(responsesModel!.id),
    `expected /api/tags (Ollama flow) to also expose the responses-format GPT model, got: ${JSON.stringify(
      Array.from(tagNames)
    )}`
  );

  const rawTagsResponse = await vscodeRawTagsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/raw/${encodeURIComponent(key.key)}/api/tags`)
  );
  const rawTagsBody = (await rawTagsResponse.json()) as { models?: Array<{ name?: string }> };
  const rawTagNames: string[] = (rawTagsBody.models || [])
    .map((model) => model.name)
    .filter((name): name is string => typeof name === "string");
  const rawResponsesModelName = rawTagNames.find((name) =>
    name.includes("gpt-6.9-responses-probe")
  );
  assert.ok(
    rawResponsesModelName,
    `expected raw /api/tags to also expose the responses-format GPT model, got: ${JSON.stringify(
      rawTagNames
    )}`
  );

  const showResponse = await vscodeShowRoute.POST(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/api/show`, {
      method: "POST",
      body: JSON.stringify({ name: responsesModel!.id }),
    })
  );
  assert.equal(
    showResponse.status,
    200,
    "expected /api/show to find the responses-format GPT model by its tag name"
  );

  const rawShowResponse = await vscodeRawShowRoute.POST(
    new Request(`http://localhost/api/v1/vscode/raw/${encodeURIComponent(key.key)}/api/show`, {
      method: "POST",
      body: JSON.stringify({ name: rawResponsesModelName }),
    })
  );
  assert.equal(
    rawShowResponse.status,
    200,
    "expected raw /api/show to find the responses-format GPT model by its tag name"
  );
});
