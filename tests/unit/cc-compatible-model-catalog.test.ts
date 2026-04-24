import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cc-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.afterEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("v1 models exposes CC-compatible fallback models under the provider node prefix", async () => {
  await providersDb.createProviderNode({
    id: "anthropic-compatible-cc-cm",
    type: "anthropic-compatible",
    name: "Claude Max",
    prefix: "cm",
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/messages?beta=true",
    modelsPath: "/v1/models",
  });

  await providersDb.createProviderConnection({
    provider: "anthropic-compatible-cc-cm",
    authType: "apikey",
    name: "cm-main",
    apiKey: "sk-test",
    isActive: true,
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
      chatPath: "/v1/messages?beta=true",
      modelsPath: "/v1/models",
    },
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", { method: "GET" })
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as any;
  const ids = new Set(body.data.map((item) => item.id));

  assert.ok(ids.has("cm/claude-opus-4-7"));
  assert.ok(ids.has("cm/claude-opus-4-6"));
  assert.ok(ids.has("cm/claude-sonnet-4-6"));
  assert.equal(
    [...ids].some((id) => (id as any).startsWith("anthropic-compatible-cc-cm/")),
    false
  );
});
