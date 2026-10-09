import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-first-run-15059-"));
process.env.DATA_DIR = testDataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(testDataDir, "plugins");
process.env.NODE_ENV = "test";
process.env.API_KEY_SECRET = "synthetic-first-run-15059-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const { prepareVirtualAutoComboInputs } =
  await import("../../open-sse/services/autoCombo/virtualFactory.ts");
const { filterTosAvoidCandidates } =
  await import("../../open-sse/services/autoCombo/strictZeroCostFilter.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("fresh auto pool excludes provider-wide ToS-avoid models missing from the budget catalog", async () => {
  const prepared = await prepareVirtualAutoComboInputs();
  assert.equal(
    prepared.regularCandidates.some((row) => row.provider === "opencode"),
    false
  );
});

test("provider ToS verdict covers a newly discovered model absent from the budget catalog", () => {
  const pool = [{ provider: "opencode", model: "new-uncataloged-model", connectionId: "noauth" }];
  assert.deepEqual(filterTosAvoidCandidates(pool, true, []), []);
});

test("explicit ToS filter opt-out preserves the original candidate", () => {
  const pool = [{ provider: "opencode", model: "new-uncataloged-model", connectionId: "noauth" }];
  assert.equal(filterTosAvoidCandidates(pool, false, []), pool);
});

test("missing provider and model verdicts do not invent a ToS restriction", () => {
  const pool = [{ provider: "synthetic-provider", model: "new-model", connectionId: "noauth" }];
  assert.deepEqual(filterTosAvoidCandidates(pool, true, []), pool);
});

test("Moonshot live catalog hides phantom static Kimi K3 after a successful sync", async () => {
  // This assertion concerns provider models, independent of virtual auto generation.
  await updateSettings({ hideAutoCombos: true });
  const connection = await providersDb.createProviderConnection({
    provider: "moonshot",
    authType: "apikey",
    name: "Moonshot fixture",
    apiKey: "synthetic-moonshot-key",
    isActive: true,
    testStatus: "active",
  });
  assert.equal(typeof connection.id, "string");
  await modelsDb.replaceSyncedAvailableModelsForConnection("moonshot", connection.id, [
    { id: "kimi-k2.7-code", name: "Kimi K2.7 Code", source: "imported" },
    { id: "kimi-k2.6", name: "Kimi K2.6", source: "imported" },
  ]);
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body: { data: { id: string }[] } = await response.json();
  assert.equal(response.status, 200, JSON.stringify(body));
  const ids = new Set(body.data.map((model) => model.id));
  assert.ok(ids.has("moonshot/kimi-k2.7-code"));
  assert.ok(ids.has("moonshot/kimi-k2.6"));
  assert.equal(ids.has("moonshot/kimi-k3"), false);
  assert.equal(ids.has("moonshot/kimi-k3-256k"), false);
});
