import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vision-16765-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");
const route = await import("../../src/app/api/provider-models/route.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const provider = "openai-compatible-chat-16765";
const modelId = "ali/text-only-fixture-16765";
const input = { provider, model: modelId };
const put = (supportsVision: boolean | null) =>
  route.PUT(
    new Request("http://localhost/api/provider-models", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, modelId, supportsVision }),
    })
  );

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const legacy of [true, false]) {
  test(`clearing the manual vision override also clears legacy ${legacy}, preserving other flags`, async () => {
    const original = getResolvedModelCapabilities(input).supportsVision;
    models.mergeModelCompatOverride(provider, modelId, {
      supportsVision: legacy,
      normalizeToolCallId: true,
    });
    assert.equal(getResolvedModelCapabilities(input).supportsVision, legacy);
    assert.equal((await put(true)).status, 200);
    assert.equal(getResolvedModelCapabilities(input).supportsVision, true);
    assert.equal((await put(null)).status, 200);
    const compat = models.getModelCompatOverrides(provider).find((row) => row.id === modelId);
    assert.equal(compat?.supportsVision, undefined);
    assert.equal(compat?.normalizeToolCallId, true);
    assert.equal(getResolvedModelCapabilities(input).supportsVision, original);
  });
}

test("synced nested IDs set and clear through the existing custom overlay", async () => {
  const original = getResolvedModelCapabilities(input).supportsVision;
  assert.equal((await put(true)).status, 200);
  assert.equal(getResolvedModelCapabilities(input).supportsVision, true);
  assert.equal((await put(null)).status, 200);
  assert.equal(getResolvedModelCapabilities(input).supportsVision, original);
  const rows = await models.getCustomModels(provider);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].id, modelId);
});
