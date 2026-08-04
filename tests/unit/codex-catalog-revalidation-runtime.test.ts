import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-revalidation-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const revalidation = await import("../../src/shared/services/codexCatalogRevalidation.ts");

const originalFetch = globalThis.fetch;
const originalEnv = {
  OMNIROUTE_PORT: process.env.OMNIROUTE_PORT,
  PORT: process.env.PORT,
  DASHBOARD_PORT: process.env.DASHBOARD_PORT,
  BASE_URL: process.env.BASE_URL,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  OMNIROUTE_INTERNAL_SCHEME: process.env.OMNIROUTE_INTERNAL_SCHEME,
};

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
  process.env.OMNIROUTE_PORT = "20128";
  process.env.PORT = "22128";
  process.env.DASHBOARD_PORT = "22128";
  process.env.BASE_URL = "https://attacker.example";
  delete process.env.NEXT_PUBLIC_BASE_URL;
  delete process.env.NEXT_PUBLIC_APP_URL;
  delete process.env.OMNIROUTE_INTERNAL_SCHEME;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test("live Codex revalidation sends its internal header only to the dashboard loopback origin", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Codex Runtime Safety",
    accessToken: "test-token",
    isActive: true,
    providerSpecificData: { workspaceId: "runtime-safety" },
  });
  const calls: Array<{ url: string; hasInternalAuth: boolean; redirect?: RequestRedirect }> = [];
  globalThis.fetch = async (input, init) => {
    const headers = new Headers(init?.headers);
    calls.push({
      url: String(input),
      hasInternalAuth: headers.has("x-model-sync-internal-auth"),
      redirect: init?.redirect,
    });
    return Response.json({ syncedModels: 1 });
  };

  const result = await revalidation.liveResyncCodexConnections("http://127.0.0.1:7777");

  assert.deepEqual(result, { attempted: 1, succeeded: 1 });
  assert.deepEqual(calls, [
    {
      url: `http://127.0.0.1:22128/api/providers/${connection.id}/sync-models?quiet=1`,
      hasInternalAuth: true,
      redirect: "error",
    },
  ]);
});

test("Codex readiness and live sync resolve the same dashboard loopback port", async () => {
  const calls: string[] = [];
  globalThis.fetch = async (input, init) => {
    calls.push(String(input));
    assert.equal(init?.redirect, "error");
    return new Response(null, { status: 404 });
  };

  await revalidation.waitForLoopbackHttpReady({
    apiBaseUrl: "http://localhost:7777",
    maxWaitMs: 100,
    pollMs: 1,
  });

  assert.deepEqual(calls, ["http://127.0.0.1:22128/api/providers/__readiness_probe__/models"]);
});
