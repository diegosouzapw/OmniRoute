import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-10615-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("@/lib/db/models");
const localDb = { replaceSyncedAvailableModelsForConnection };
const modelsRoute = await import("../../src/app/api/models/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

test("#10615: /api/models must agree with /v1/models on exclusive synced-listing coverage", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "cursor",
    authType: "oauth",
    name: "cursor-main",
    accessToken: "cursor-access-token",
    isActive: true,
  });

  const apiModelsRes = await modelsRoute.GET(new Request("http://localhost/api/models"));
  const apiModelsBody = (await apiModelsRes.json()) as {
    models: Array<{ provider: string; model: string; fullModel: string; available: boolean }>;
  };
  const staticRow = apiModelsBody.models.find((m) => m.fullModel === "cu/composer-2.5");
  assert.ok(staticRow, "/api/models must list the static cursor model");
  assert.equal(staticRow!.available, true);

  await localDb.replaceSyncedAvailableModelsForConnection("cursor", connection.id, [
    { id: "composer-3", name: "Composer 3" },
  ]);
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();

  const v1Res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const v1Body = (await v1Res.json()) as { data: Array<{ id: string }> };
  const v1Ids = v1Body.data.map((m) => m.id);

  assert.equal(v1Res.status, 200);
  assert.ok(v1Ids.includes("cu/composer-3"));
  assert.equal(v1Ids.includes("cu/composer-2.5"), false);

  const apiModelsAfterRes = await modelsRoute.GET(new Request("http://localhost/api/models"));
  const apiModelsAfterBody = (await apiModelsAfterRes.json()) as {
    models: Array<{ fullModel: string; available: boolean }>;
  };
  const staticRowAfter = apiModelsAfterBody.models.find((m) => m.fullModel === "cu/composer-2.5");
  assert.ok(staticRowAfter);
  assert.equal(
    staticRowAfter!.available,
    false,
    "/api/models must mark a synced-superseded static model as unavailable"
  );
});
