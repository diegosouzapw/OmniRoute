import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15762e2e-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000"; // cold catalog build can exceed 8s on loaded CI hosts
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-test-secret-15762";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const syncModelsRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { buildModelSyncInternalHeaders } =
  await import("../../src/shared/services/modelSyncScheduler.ts");

const originalFetch = globalThis.fetch;
test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const UPSTREAM = {
  object: "list",
  data: [
    {
      id: "GLM-5.3",
      object: "model",
      capabilities: { tool_calling: true, vision: false, attachment: false },
      reasoning: { supported: true, control: "effort", supported_efforts: ["max", "high", "low"] },
    },
  ],
};

for (const [provider, authType] of [
  ["openference", "oauth"],
  ["openference-api", "apikey"],
] as const) {
  test(`${provider}: sync-models then /v1/models exposes effort_tiers`, async () => {
    v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
    const conn = await providersDb.createProviderConnection({
      provider,
      authType,
      name: `${provider}-e2e`,
      ...(authType === "oauth" ? { accessToken: "jwt" } : { apiKey: "sk-x" }),
      isActive: true,
      testStatus: "active",
      providerSpecificData: { autoFetchModels: true },
    });
    const calls: string[] = [];
    globalThis.fetch = async (url: unknown) => {
      const u = String(url);
      calls.push(u);
      if (u.includes("api.openference.com/v1/models")) return Response.json(UPSTREAM);
      if (u.includes("__readiness_probe__")) return new Response("", { status: 404 });
      throw new Error("force in-process fallback: " + u);
    };
    const res = await syncModelsRoute.POST(
      new Request(`http://127.0.0.1/api/providers/${conn.id}/sync-models`, {
        method: "POST",
        headers: buildModelSyncInternalHeaders(),
      }),
      { params: Promise.resolve({ id: conn.id }) }
    );
    assert.equal(res.status, 200);
    globalThis.fetch = originalFetch;
    const response = await v1ModelsCatalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/v1/models")
    );
    const body = (await response.json()) as {
      data: Array<{ id: string; capabilities?: { effort_tiers?: string[] } }>;
    };
    const glm = body.data.filter((m) => m.id.endsWith("/GLM-5.3"));
    assert.ok(glm.length > 0);
    assert.deepEqual(glm[0].capabilities?.effort_tiers, ["max", "high", "low"]);
  });
}
