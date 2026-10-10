import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// GPT-6.1 Sol is a Codex-native model like gpt-6-astra and the gpt-5.6 tiers.
// Its ids must be in CODEX_NATIVE_UNPREFIXED_MODELS, otherwise with both a Codex
// and an OpenAI connection active the bare `gpt-6.1-sol` id is ambiguous (or goes
// to OpenAI) and /v1/models never lists the bare Codex rows.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-gpt61-bare-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-gpt61-bare-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { CODEX_NATIVE_UNPREFIXED_MODELS, getModelInfoCore } =
  await import("../../open-sse/services/model.ts");
const { getProviderModels } = await import("../../open-sse/config/providerModels.ts");
const { getPricingForModel } = await import("../../src/shared/constants/pricing.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

const MODEL = "gpt-6.1-sol";
const EFFORTS = ["ultra", "max", "xhigh", "high", "medium", "low"];
const EXPECTED_IDS = [MODEL, ...EFFORTS.map((effort) => `${MODEL}-${effort}`)];

// The base id and its effort tiers, as registered for the codex provider.
const SOL_IDS = getProviderModels("codex")
  .map((model) => model.id)
  .filter((id) => id === MODEL || id.startsWith(`${MODEL}-`));

async function seedConnection(provider: "codex" | "openai") {
  await providersDb.createProviderConnection({
    provider,
    authType: provider === "codex" ? "oauth" : "apikey",
    name: `${provider}-gpt61-bare`,
    email: provider === "codex" ? "codex@example.com" : undefined,
    apiKey: provider === "openai" ? "sk-openai-gpt61-bare" : undefined,
    accessToken: provider === "codex" ? "codex-gpt61-bare-access" : undefined,
    isActive: true,
    testStatus: "active",
    providerSpecificData: provider === "codex" ? { workspaceId: "ws-gpt61-bare" } : {},
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

test("the Codex catalog registers exactly the base GPT-6.1 Sol id and its six effort tiers", () => {
  assert.deepEqual([...SOL_IDS].sort(), [...EXPECTED_IDS].sort());
});

test("every GPT-6.1 Sol id in the Codex catalog is Codex-native when unprefixed", () => {
  for (const id of SOL_IDS) {
    assert.equal(CODEX_NATIVE_UNPREFIXED_MODELS.has(id), true, id);
  }
});

test("every GPT-6.1 Sol Codex id resolves a non-zero pricing row", () => {
  for (const id of SOL_IDS) {
    const price = getPricingForModel("cx", id);
    assert.ok(price, `cx/${id}`);
    assert.ok(price.input > 0 && price.output > 0, `cx/${id} must not resolve to $0`);
  }
});

test("bare gpt-6.1-sol routes to Codex when Codex and OpenAI are both active", async () => {
  await seedConnection("codex");
  await seedConnection("openai");

  for (const id of [MODEL, `${MODEL}-ultra`, `${MODEL}-low`]) {
    const info = await getModelInfoCore(id, null);
    assert.equal(info.provider, "codex", id);
    assert.equal(info.model, id);
  }
});

test("bare gpt-6.1-sol stays on OpenAI when no Codex connection is active", async () => {
  await seedConnection("openai");

  const info = await getModelInfoCore(MODEL, null);
  assert.equal(info.provider, "openai");
  assert.equal(info.model, MODEL);
});

test("/v1/models lists the bare GPT-6.1 Sol ids under their codex/ rows", async () => {
  await seedConnection("codex");

  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<{ id: string; parent?: string | null }> };
  const parentById = new Map(body.data.map((row) => [row.id, row.parent ?? null]));

  for (const id of SOL_IDS) {
    assert.equal(parentById.get(id), `codex/${id}`, id);
  }
});
