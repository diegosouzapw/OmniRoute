import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providerModelsRoute =
  await import("../../src/app/api/v1/providers/[provider]/models/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string, overrides: Record<string, any> = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "apikey",
    name: overrides.name || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey || "sk-test",
    accessToken: overrides.accessToken,
    isActive: overrides.isActive ?? true,
    testStatus: overrides.testStatus || "active",
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("provider models route returns only selected provider models with unprefixed ids", async () => {
  await seedConnection("openai", { name: "openai-main" });
  await seedConnection("claude", {
    authType: "oauth",
    name: "claude-main",
    apiKey: null,
    accessToken: "claude-access",
  });
  await combosDb.createCombo({
    name: "team-router",
    strategy: "priority",
    models: ["openai/gpt-4o"],
  });

  const response = await providerModelsRoute.GET(
    new Request("http://localhost/api/v1/providers/openai/models"),
    {
      params: Promise.resolve({ provider: "openai" }),
    }
  );

  const body = (await response.json()) as any;
  const ids = body.data.map((model: any) => model.id);

  assert.equal(response.status, 200);
  assert.ok(ids.length > 0);
  assert.equal(
    ids.some((id: string) => id.includes("/")),
    false
  );
  assert.equal(
    body.data.some((model: any) => model.owned_by !== "openai"),
    false
  );
  assert.equal(ids.includes("team-router"), false);
});

test("provider models route accepts provider alias in path", async () => {
  await seedConnection("claude", {
    authType: "oauth",
    name: "claude-main",
    apiKey: null,
    accessToken: "claude-access",
  });

  const response = await providerModelsRoute.GET(
    new Request("http://localhost/api/v1/providers/cc/models"),
    {
      params: Promise.resolve({ provider: "cc" }),
    }
  );

  const body = (await response.json()) as any;
  const ids = body.data.map((model: any) => model.id);

  assert.equal(response.status, 200);
  assert.ok(ids.includes("claude-sonnet-4-6"));
  assert.equal(
    ids.some((id: string) => id.startsWith("cc/") || id.startsWith("claude/")),
    false
  );
});

test("provider models route returns 400 for unknown provider", async () => {
  const response = await providerModelsRoute.GET(
    new Request("http://localhost/api/v1/providers/nope/models"),
    {
      params: Promise.resolve({ provider: "nope" }),
    }
  );

  const body = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.equal(body.error.code, "invalid_provider");
});
