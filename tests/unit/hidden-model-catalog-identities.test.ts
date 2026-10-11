import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hidden-catalog-identities-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const models = await import("../../src/lib/db/models.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function ids() {
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<{ id: string }> };
  return body.data.map((model) => model.id);
}

test("catalog retains its existing listing when only one of two colliding node IDs is hidden", async () => {
  for (const suffix of ["a", "b"]) {
    const id = `openai-compatible-chat-hidden-catalog-${suffix}`;
    await providers.createProviderNode({
      id,
      type: "openai-compatible",
      name: id,
      prefix: "shared-hidden-catalog",
      baseUrl: "https://fixture.invalid/v1",
    });
    const connection = await providers.createProviderConnection({
      provider: id,
      authType: "apikey",
      name: id,
      apiKey: "sk-catalog-fixture",
      isActive: true,
      testStatus: "active",
      providerSpecificData: { baseUrl: "https://fixture.invalid/v1" },
    });
    await models.replaceSyncedAvailableModelsForConnection(id, String(connection.id), [
      {
        id: "vendor/model-x",
        name: "Node model",
        source: "imported",
        supportedEndpoints: ["chat"],
      },
    ]);
  }
  assert.ok((await ids()).includes("shared-hidden-catalog/vendor/model-x"));
  models.mergeModelCompatOverride("openai-compatible-chat-hidden-catalog-a", "vendor/model-x", {
    isHidden: true,
  });
  assert.ok(
    (await ids()).includes("shared-hidden-catalog/vendor/model-x"),
    "hiding one node must not remove the other node's existing catalog contribution"
  );
});

test("non-chat visibility retains literal IDs even when they match a chat legacy alias", async () => {
  const { createHiddenModelLookup } = await import("../../src/lib/hiddenModelLookup.ts");
  const hidden = new Map([["gh", new Set(["claude-4.5-opus"])]]);
  const chat = createHiddenModelLookup(hidden);
  const images = createHiddenModelLookup(hidden, [], "images");
  assert.equal(chat("github", "claude-opus-4-5-20251101"), true);
  assert.equal(images("github", "claude-4.5-opus"), true);
  assert.equal(images("github", "claude-opus-4-5-20251101"), false);
});
