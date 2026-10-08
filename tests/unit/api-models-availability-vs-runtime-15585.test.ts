import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #15585 item 4: GET /api/models `available` must agree with the dispatch-time
// live-catalog gate (getModelInfo -> model_not_found) for authoritative providers.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15585-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "api-models-15585-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const modelsRoute = await import("../../src/app/api/models/route.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");

const PROVIDER = "opencode-zen";
const CONN = "oz-conn-15585";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#15585: /api/models available matches the authoritative live-catalog gate", async () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT OR REPLACE INTO provider_connections (id, provider, is_active, created_at, updated_at)
     VALUES (?, ?, 1, ?, ?)`
  ).run(CONN, PROVIDER, now, now);

  const res0 = await modelsRoute.GET(new Request("http://localhost/api/models"));
  const body0 = (await res0.json()) as {
    models: Array<{ provider: string; model: string; fullModel: string; available: boolean }>;
  };
  const statics = body0.models.filter(
    (m) =>
      m.fullModel.startsWith("opencode-zen/") ||
      m.provider === "opencode-zen" ||
      m.provider === "oz"
  );
  console.log(
    "static opencode-zen rows:",
    statics.length,
    statics.slice(0, 4).map((m) => m.fullModel)
  );
  assert.ok(statics.length >= 2, "need >=2 static opencode-zen rows to probe");
  const covered = statics[0];
  const missing = statics[1];

  // Live catalog lists ONLY `covered` (plus an unrelated id); `missing` is absent.
  await replaceSyncedAvailableModelsForConnection(PROVIDER, CONN, [
    { id: covered.model, name: covered.model, source: "imported" as const },
    { id: "some-live-only-model", name: "x", source: "imported" as const },
  ]);

  const res = await modelsRoute.GET(new Request("http://localhost/api/models"));
  const body = (await res.json()) as {
    models: Array<{ provider: string; model: string; fullModel: string; available: boolean }>;
  };
  const apiCovered = body.models.find((m) => m.fullModel === covered.fullModel)!;
  const apiMissing = body.models.find((m) => m.fullModel === missing.fullModel)!;

  const rtCovered = await getModelInfo(covered.fullModel);
  const rtMissing = await getModelInfo(missing.fullModel);
  const rtCoveredOk = !(rtCovered as { errorType?: string }).errorType;
  const rtMissingOk = !(rtMissing as { errorType?: string }).errorType;
  assert.equal(
    apiMissing.available,
    rtMissingOk,
    "phantom: /api/models says available for a model the live catalog excludes"
  );
  assert.equal(
    apiCovered.available,
    rtCoveredOk,
    "inverse: /api/models hides a model the live catalog (and routing) accepts"
  );
});
