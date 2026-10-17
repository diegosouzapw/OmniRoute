/**
 * Central model visibility in the Models catalog.
 *
 * `GET /api/models/catalog?includeHidden=1` (management only) keeps the models an
 * operator hid on a provider page, tags them `hidden: true`, and tells the dashboard
 * which stored `(provider, modelId)` keys a hide/show must PATCH. Without the param —
 * and on the public `/v1/models` — hidden models stay out, exactly as before.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-catalog-visibility-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { mergeModelCompatOverride } = await import("@/lib/db/models");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const catalogRoute = await import("../../src/app/api/models/catalog/route.ts");
const catalogUtils =
  await import("../../src/app/(dashboard)/dashboard/models/modelCatalogUtils.ts");
const visibilityUtils =
  await import("../../src/app/(dashboard)/dashboard/models/catalogVisibility.ts");

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type CatalogEntry = {
  id: string;
  hidden?: boolean;
  visibility?: { modality: string; targets: Array<{ provider: string; modelId: string }> };
};

async function fetchManagementCatalog(query = ""): Promise<CatalogEntry[]> {
  const response = await catalogRoute.GET(
    new Request(`http://localhost/api/models/catalog${query}`)
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    catalog: Record<string, { models: CatalogEntry[] }>;
  };
  return Object.values(body.catalog).flatMap((bucket) => bucket.models);
}

async function fetchPublicIds(): Promise<string[]> {
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<{ id: string }> };
  return body.data.map((model) => model.id);
}

async function seedClaude() {
  await providersDb.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    name: "claude-visibility",
    apiKey: "sk-test-visibility",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

test("includeHidden=1 keeps a hidden model, tagged hidden, with the stored key to unhide", async () => {
  await seedClaude();
  // Hidden on the provider page whose route param was the alias "cc".
  mergeModelCompatOverride("cc", "claude-opus-5", { isHidden: true, modality: "chat" });

  const withHidden = await fetchManagementCatalog("?includeHidden=1");
  const hiddenRow = withHidden.find((model) => model.id === "cc/claude-opus-5");
  assert.ok(hiddenRow, "hidden model must be listed when includeHidden=1");
  assert.equal(hiddenRow.hidden, true);
  assert.equal(hiddenRow.visibility?.modality, "chat");
  assert.deepEqual(hiddenRow.visibility?.targets, [{ provider: "cc", modelId: "claude-opus-5" }]);

  const visibleRow = withHidden.find(
    (model) => model.id.startsWith("cc/") && model.id !== "cc/claude-opus-5"
  );
  assert.ok(visibleRow, "a visible claude model is listed too");
  assert.equal(visibleRow.hidden, undefined);
  assert.equal(visibleRow.visibility?.targets[0]?.provider, "claude");

  const withoutHidden = await fetchManagementCatalog();
  assert.equal(
    withoutHidden.some((model) => model.id === "cc/claude-opus-5"),
    false,
    "without includeHidden the hidden model stays out"
  );
  assert.equal(
    withoutHidden.some((model) => model.visibility !== undefined),
    false,
    "the default catalog payload is unchanged"
  );

  const publicIds = await fetchPublicIds();
  assert.equal(publicIds.includes("cc/claude-opus-5"), false, "/v1/models still omits it");
});

test("includeHidden=1 maps a compatible-node prefix row back to the node id", async () => {
  const NODE_ID = "openai-compatible-chat-visibility-c0ffee00-0000-4000-8000-000000000000";
  const PREFIX = "vis-node";
  await providersDb.createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "Visibility Node",
    prefix: PREFIX,
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  await providersDb.createProviderConnection({
    provider: NODE_ID,
    authType: "apikey",
    name: "vis-node-conn",
    apiKey: "sk-test-vis-node",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
      chatPath: "/v1/chat/completions",
      modelsPath: "/v1/models",
    },
  });
  const { addCustomModel } = await import("@/lib/db/models");
  await addCustomModel(NODE_ID, "vis-chat", "Vis Chat");

  const rows = await fetchManagementCatalog("?includeHidden=1");
  const row = rows.find((model) => model.id === `${PREFIX}/vis-chat`);
  assert.ok(row, `expected ${PREFIX}/vis-chat in ${JSON.stringify(rows.map((r) => r.id))}`);
  assert.deepEqual(row.visibility?.targets, [{ provider: NODE_ID, modelId: "vis-chat" }]);
});

test("groupVisibilityPatches builds one PATCH payload per provider and modality", () => {
  const rows = catalogUtils.flattenCatalog({
    claude: {
      provider: "Claude",
      models: [
        {
          id: "cc/a",
          type: "chat",
          visibility: { modality: "chat", targets: [{ provider: "claude", modelId: "a" }] },
        },
        {
          id: "cc/b",
          type: "chat",
          hidden: true,
          visibility: {
            modality: "chat",
            targets: [
              { provider: "cc", modelId: "b" },
              { provider: "claude", modelId: "b" },
            ],
          },
        },
      ],
    },
    openai: {
      provider: "OpenAI",
      models: [
        {
          id: "openai/text-embedding-3-small",
          type: "embedding",
          visibility: {
            modality: "embeddings",
            targets: [{ provider: "openai", modelId: "text-embedding-3-small" }],
          },
        },
        { id: "combo-x", type: "chat" },
      ],
    },
  });

  // Hiding skips rows that are already hidden and rows with no visibility target.
  assert.deepEqual(visibilityUtils.groupVisibilityPatches(rows, true), [
    { provider: "claude", modality: "chat", modelIds: ["a"] },
    { provider: "openai", modality: "embeddings", modelIds: ["text-embedding-3-small"] },
  ]);
  // Showing clears every stored key of the hidden row (alias and canonical).
  assert.deepEqual(visibilityUtils.groupVisibilityPatches(rows, false), [
    { provider: "cc", modality: "chat", modelIds: ["b"] },
    { provider: "claude", modality: "chat", modelIds: ["b"] },
  ]);

  assert.deepEqual(visibilityUtils.countCatalogVisibility(rows), {
    visible: 3,
    hidden: 1,
    total: 4,
  });
});

test('the "hidden" / "visible" visibility filter selects rows by their hidden flag', () => {
  const rows = catalogUtils.flattenCatalog({
    alpha: {
      provider: "Alpha",
      models: [
        { id: "alpha/on", type: "chat" },
        { id: "alpha/off", type: "chat", hidden: true },
      ],
    },
  });
  const base = { query: "", providerId: "all", type: "all" };
  assert.deepEqual(
    catalogUtils.filterCatalogModels(rows, { ...base, visibility: "hidden" }).map((r) => r.id),
    ["alpha/off"]
  );
  assert.deepEqual(
    catalogUtils.filterCatalogModels(rows, { ...base, visibility: "visible" }).map((r) => r.id),
    ["alpha/on"]
  );
  assert.equal(catalogUtils.filterCatalogModels(rows, { ...base, visibility: "all" }).length, 2);
});

test("a toggle round-trip through PATCH /api/provider-models hides then shows the row", async () => {
  await seedClaude();
  const providerModelsRoute = await import("../../src/app/api/provider-models/route.ts");
  const patch = async (hidden: boolean, rows: CatalogEntry[]) => {
    const flattened = catalogUtils.flattenCatalog({ claude: { provider: "Claude", models: rows } });
    for (const body of visibilityUtils.groupVisibilityPatches(flattened, hidden)) {
      const response = await providerModelsRoute.PATCH(
        new Request(
          `http://localhost/api/provider-models?provider=${encodeURIComponent(body.provider)}`,
          {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              isHidden: hidden,
              modelIds: body.modelIds,
              modality: body.modality,
            }),
          }
        )
      );
      assert.equal(response.status, 200);
    }
  };

  const before = await fetchManagementCatalog("?includeHidden=1");
  const row = before.find((model) => model.id === "cc/claude-opus-5");
  assert.ok(row && row.hidden === undefined, "starts visible");
  await patch(true, [row]);
  assert.equal((await fetchPublicIds()).includes("cc/claude-opus-5"), false, "hidden publicly");

  const afterHide = await fetchManagementCatalog("?includeHidden=1");
  const hiddenRow = afterHide.find((model) => model.id === "cc/claude-opus-5");
  assert.equal(hiddenRow?.hidden, true);
  await patch(false, [hiddenRow!]);
  assert.equal((await fetchPublicIds()).includes("cc/claude-opus-5"), true, "visible again");
});

test("includeHidden=1 requires management auth when login is enabled", async () => {
  process.env.INITIAL_PASSWORD = "visibility-test-password";
  const response = await catalogRoute.GET(
    new Request("http://localhost/api/models/catalog?includeHidden=1")
  );
  assert.equal(response.status, 401);
});
