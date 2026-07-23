import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-model-sync-custom-preservation-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= `test-model-sync-custom-${Date.now()}`;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const modelSyncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");

const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("model sync preserves response-only custom models during discovery", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Codex Custom Preservation",
    accessToken: "test-codex-token",
    providerSpecificData: { workspaceId: "workspace-custom-preservation" },
  });
  await modelsDb.addCustomModel(
    "codex",
    "operator-private-codex",
    "Operator Private Codex",
    "manual",
    "responses",
    ["responses"],
    "openai-responses",
    { inputTokenLimit: 123456, outputTokenLimit: 6543 }
  );
  const before = await modelsDb.getCustomModels("codex");

  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    if (url.pathname.includes("__readiness_probe__")) {
      return new Response(null, { status: 404 });
    }
    if (url.pathname === `/api/providers/${connection.id}/models`) {
      const models = [{ id: "future-codex-experimental", name: "Future Codex" }];
      if (url.searchParams.get("excludeCustom") !== "true") {
        models.push({ id: "operator-private-codex", name: "Operator Private Codex" });
      }
      return Response.json({ models, source: "api" });
    }
    throw new Error(`Unexpected fetch in custom preservation test: ${url.href}`);
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models?quiet=1`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await modelsDb.getCustomModels("codex"), before);
  assert.deepEqual(
    (await modelsDb.getSyncedAvailableModelsForConnection("codex", connection.id)).map(
      (model) => model.id
    ),
    ["future-codex-experimental"]
  );
});
