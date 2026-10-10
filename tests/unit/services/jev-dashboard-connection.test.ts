/**
 * #15641 review: the dashboard-managed classifier credential is read through the
 * src/lib/db provider accessor (decrypted, no raw SQL in open-sse). The original raw
 * `SELECT api_key, base_url FROM provider_connections` named a column that table does
 * not have, so the swallowed error left the dashboard connection unusable.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-jev-dashboard-conn-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const JEV_ENV_KEYS = [
  "OMNIROUTE_JEV_ENABLED",
  "OMNIROUTE_JEV_API_KEY",
  "OMNIROUTE_JEV_BASE_URL",
  "OMNIROUTE_JEV_WIRE",
  "OMNIROUTE_JEV_PROVIDER",
  "OMNIROUTE_JEV_MODEL",
  "TYPESAFE_API_KEY",
];
const savedEnv = new Map(JEV_ENV_KEYS.map((key) => [key, process.env[key]]));

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const { resolveJevRuntime, __resetJevRuntimeCacheForTests } =
  await import("../../../open-sse/services/jev/index.ts");

test.beforeEach(() => {
  for (const key of JEV_ENV_KEYS) delete process.env[key];
  process.env.OMNIROUTE_JEV_ENABLED = "on";
  __resetJevRuntimeCacheForTests();
});

test.after(() => {
  for (const [key, value] of savedEnv) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("an active dashboard `typesafe` connection supplies the classifier key", async () => {
  await providersDb.createProviderConnection({
    provider: "typesafe",
    authType: "apikey",
    name: "typesafe-dashboard",
    apiKey: "sk-dashboard-typesafe",
    isActive: true,
  });
  const runtime = await resolveJevRuntime();
  assert.ok(runtime, "the dashboard credential must resolve a runtime");
  assert.equal(runtime.apiKey, "sk-dashboard-typesafe");
  assert.equal(runtime.wire, "typesafe");
});

test("an explicit provider's stored custom base URL is used for the openai wire", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "classifier-gateway",
    apiKey: "sk-classifier",
    isActive: true,
    providerSpecificData: { baseUrl: "https://classifier.example/v1/" },
  });
  process.env.OMNIROUTE_JEV_PROVIDER = "openai";
  process.env.OMNIROUTE_JEV_MODEL = "tiny-classifier";
  const runtime = await resolveJevRuntime();
  assert.ok(runtime);
  assert.equal(runtime.apiKey, "sk-classifier");
  assert.equal(runtime.baseUrl, "https://classifier.example/v1");
  assert.equal(runtime.wire, "openai");
});
