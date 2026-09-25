import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cursor-catalog-"));
process.env.DATA_DIR = dataDir;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { GET } = await import("../../src/app/api/synced-available-models/route.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("provider page catalog exposes Cursor effort aliases without adding custom rows", async () => {
  await updateSettings({ requireLogin: false });
  const connection = await createProviderConnection({
    provider: "cursor",
    authType: "apikey",
    name: "Cursor catalog test",
    apiKey: "test-token",
    isActive: true,
  });
  await replaceSyncedAvailableModelsForConnection("cursor", connection.id, [
    { id: "grok-4.7", name: "Grok 4.7", source: "imported" },
  ]);

  const response = await GET(
    new Request("http://localhost/api/synced-available-models?provider=cursor")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { models: Array<{ id: string }> };
  const ids = body.models.map((model) => model.id);
  for (const tier of ["low", "medium", "high", "xhigh", "max"]) {
    assert.ok(ids.includes(`grok-4.7-${tier}`), `missing dashboard option grok-4.7-${tier}`);
  }
});
