import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { unexpectedCatalogNetworkRequests } from "../_helpers/catalogNetworkGuard13389.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-dashboard-retry-"));
Object.assign(process.env, {
  DATA_DIR: dataDir,
  API_KEY_SECRET: "catalog-dashboard-fixture-secret",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  APP_LOG_TO_FILE: "false",
  CATALOG_BUILD_TIMEOUT_MS: "50",
});

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const { GET } = await import("../../src/app/api/models/catalog/route.ts");
const catalogCache = await import("../../src/app/api/v1/models/catalogCache.ts");
const { aiHordeImageCatalog } = await import("../../open-sse/services/aihordeImageCatalog.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("dashboard catalog preserves retry headers for a real cold-build timeout", async () => {
  await settings.updateSettings({
    requireLogin: false,
    requireAuthForModels: false,
    hideAutoCombos: true,
    hideNoThinkVariants: true,
  });
  // Pause only the external HTTP boundary; exercise the real builder and adapter.
  const upstream = Promise.withResolvers<Response>();
  aiHordeImageCatalog.clear();
  aiHordeImageCatalog.setFetch(() => upstream.promise);
  try {
    const response = await GET(new Request("http://localhost/api/models/catalog"));
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("Retry-After"), "1");
    assert.equal(response.headers.get("x-omniroute-catalog"), "build-timeout");
    const body = await response.json();
    assert.equal(body.error.message, "catalog_build_timeout");
    assert.equal(body.error.code, "service_unavailable");
    assert.ok(!body.error.message.includes("at /"));
    assert.equal(response.headers.get("Content-Length"), null);
    assert.deepEqual(unexpectedCatalogNetworkRequests, []);
  } finally {
    upstream.resolve(Response.json([]));
    await catalogCache.__flushCatalogBackgroundRefreshForTest();
  }
});
