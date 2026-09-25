import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// GPT-6 Astra is a Codex-native model like the gpt-5.6 tiers, but its ids were
// missing from CODEX_NATIVE_UNPREFIXED_MODELS. With both a Codex and an OpenAI
// connection active, bare `gpt-6-astra` went to OpenAI while bare `gpt-5.6-sol`
// went to Codex, and /v1/models never listed the bare Astra ids.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-gpt6-bare-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-gpt6-bare-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { CODEX_NATIVE_UNPREFIXED_MODELS, getModelInfoCore } =
  await import("../../open-sse/services/model.ts");
const { getProviderModels } = await import("../../open-sse/config/providerModels.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

// The base id and its effort tiers, as registered for the codex provider.
const ASTRA_IDS = getProviderModels("codex")
  .map((model) => model.id)
  .filter((id) => /^gpt-6-astra(?:-(?:ultra|max|xhigh|high|medium|low))?$/.test(id));
assert.ok(ASTRA_IDS.length >= 7, `expected the Astra effort tiers, got ${ASTRA_IDS}`);

async function seedConnection(provider: "codex" | "openai") {
  await providersDb.createProviderConnection({
    provider,
    authType: provider === "codex" ? "oauth" : "apikey",
    name: `${provider}-gpt6-bare`,
    email: provider === "codex" ? "codex@example.com" : undefined,
    apiKey: provider === "openai" ? "sk-openai-gpt6-bare" : undefined,
    accessToken: provider === "codex" ? "codex-gpt6-bare-access" : undefined,
    isActive: true,
    testStatus: "active",
    providerSpecificData: provider === "codex" ? { workspaceId: "ws-gpt6-bare" } : {},
  });
}

test.beforeEach(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("every GPT-6 Astra id in the Codex catalog is Codex-native when unprefixed", () => {
  for (const id of ASTRA_IDS) {
    assert.equal(CODEX_NATIVE_UNPREFIXED_MODELS.has(id), true, id);
  }
});

test("bare gpt-6-astra routes to Codex when Codex and OpenAI are both active", async () => {
  await seedConnection("codex");
  await seedConnection("openai");

  for (const id of ["gpt-6-astra", "gpt-5.6-sol"]) {
    const info = await getModelInfoCore(id, null);
    assert.equal(info.provider, "codex", id);
    assert.equal(info.model, id);
  }
});

test("bare gpt-6-astra stays on OpenAI when no Codex connection is active", async () => {
  await seedConnection("openai");

  const info = await getModelInfoCore("gpt-6-astra", null);
  assert.equal(info.provider, "openai");
  assert.equal(info.model, "gpt-6-astra");
});

test("/v1/models lists the bare GPT-6 Astra ids under their codex/ rows", async () => {
  await seedConnection("codex");

  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<{ id: string; parent?: string | null }> };
  const parentById = new Map(body.data.map((row) => [row.id, row.parent ?? null]));

  for (const id of ASTRA_IDS) {
    assert.equal(parentById.get(id), `codex/${id}`, id);
  }
});
