import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-discovery-diagnostics-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const syncModelsRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");

const originalFetch = globalThis.fetch;

type ModelRow = { id: string };
type ModelsBody = {
  provider?: string;
  source?: string;
  intentional?: boolean;
  models?: ModelRow[];
  discoveryFailure?: Record<string, unknown>;
};

async function resetStorage() {
  globalThis.fetch = originalFetch;
  syncModelsRoute.__resetLoopbackReadinessForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function callRoute(connectionId: string, search = "") {
  return providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models${search}`),
    { params: { id: connectionId } }
  );
}

test.beforeEach(resetStorage);

test.after(() => {
  scheduler.__setModelSyncInternalTransportForTests(null);
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

scheduler.__setModelSyncInternalTransportForTests(async (input, init) => {
  const url = new URL(String(input));
  if (url.pathname.includes("__readiness_probe__")) {
    return new Response(null, { status: 404 });
  }
  const match = url.pathname.match(/^\/api\/providers\/([^/]+)\/models$/);
  assert.ok(match, `unexpected model-sync internal URL: ${url.pathname}`);
  return providerModelsRoute.GET(new Request(url, init), {
    params: { id: decodeURIComponent(match[1]!) },
  });
});

test("Veo AI Free exposes its static no-auth video catalog as intentional", async () => {
  const response = await callRoute("veoaifree-web");
  const body = (await response.json()) as ModelsBody;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "veoaifree-web");
  assert.equal(body.source, "local_catalog");
  assert.equal(body.intentional, true);
  assert.deepEqual(
    body.models?.map((model) => model.id),
    ["veo", "seedance"]
  );
});

test("Veo AI Free's intentional catalog completes model sync instead of returning 502", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "veoaifree-web",
    authType: "no-auth",
    name: "veo-sync-diagnostics-test",
    isActive: true,
    testStatus: "active",
  });

  const response = await syncModelsRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: Promise.resolve({ id: connection.id }) }
  );
  const body = (await response.json()) as Record<string, unknown>;

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.syncedModels, 2);
  assert.equal(body.availableModelsCount, 2);
});

test("a failed no-auth live catalog stays degraded instead of becoming intentional", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "no-auth",
    name: "opencode-diagnostics-test",
    isActive: true,
    testStatus: "active",
  });
  globalThis.fetch = async () => new Response("upstream unavailable", { status: 503 });

  const response = await callRoute(connection.id);
  const body = (await response.json()) as ModelsBody;

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.notEqual(body.intentional, true);
});

test("Copilot route returns safe structured failure diagnostics with its fallback warning", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "github",
    authType: "oauth",
    name: "github-diagnostics-test",
    accessToken: "github-access-secret",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { copilotToken: "copilot-token-secret" },
  });
  globalThis.fetch = async () =>
    new Response('{"private":"must-not-leak"}', {
      status: 503,
      headers: { "content-type": "application/json; charset=utf-8" },
    });

  const response = await callRoute(connection.id, "?refresh=true");
  const body = (await response.json()) as ModelsBody;

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.deepEqual(body.discoveryFailure, {
    kind: "http_status",
    upstreamStatus: 503,
    contentType: "application/json",
    bodyShape: "json",
  });
  assert.doesNotMatch(
    JSON.stringify(body),
    /must-not-leak|github-access-secret|copilot-token-secret/
  );
});
