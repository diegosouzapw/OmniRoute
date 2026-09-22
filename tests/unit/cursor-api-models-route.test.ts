import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cursor-api-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const cursorApiKeyAuth = await import("../../open-sse/services/cursorApiKeyAuth.ts");

const originalFetch = globalThis.fetch;

function jwt(): string {
  const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none" })}.${encode({ exp: Math.floor(Date.now() / 1000) + 3600 })}.sig`;
}

async function resetStorage() {
  globalThis.fetch = originalFetch;
  cursorApiKeyAuth.__resetCursorApiKeyAuthForTest();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedCursorApiConnection(apiKey: string) {
  return providersDb.createProviderConnection({
    provider: "cursor-api",
    authType: "apikey",
    name: `cursor-api-${Math.random().toString(16).slice(2, 8)}`,
    apiKey,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: true, machineId: "route-test-machine" },
  });
}

async function callRoute(connectionId: string) {
  return providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models?refresh=true`),
    { params: { id: connectionId } }
  );
}

test.beforeEach(resetStorage);

test.after(async () => {
  globalThis.fetch = originalFetch;
  cursorApiKeyAuth.__resetCursorApiKeyAuthForTest();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("cursor-api route exchanges the key and persists only account-live models", async () => {
  const apiKey = "crsr_route_live_models";
  const sessionToken = jwt();
  const calls: string[] = [];
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = String(input);
    calls.push(url);
    if (url.endsWith("/auth/exchange_user_api_key")) {
      return Response.json({ accessToken: sessionToken, refreshToken: null });
    }
    return Response.json({
      models: [
        { name: "default", displayName: "Auto" },
        { name: "gpt-entitled", displayName: "Entitled GPT" },
      ],
    });
  }) as typeof fetch;

  const connection = await seedCursorApiConnection(apiKey);
  const response = await callRoute(connection.id);
  const body = (await response.json()) as {
    source: string;
    models: Array<{ id: string }>;
  };

  assert.equal(response.status, 200);
  assert.equal(body.source, "api");
  assert.deepEqual(calls.length, 2);
  assert.match(calls[0], /\/auth\/exchange_user_api_key$/);
  assert.match(calls[1], /\/AvailableModels$/);
  assert.ok(body.models.some((model) => model.id === "auto"));
  assert.ok(body.models.some((model) => model.id === "gpt-entitled"));
  assert.equal(
    body.models.some((model) => model.id === "gpt-5.5-high"),
    false
  );
});

test("cursor-api route labels static fallback non-authoritative when live discovery fails", async () => {
  const apiKey = "crsr_route_discovery_failure";
  const sessionToken = jwt();
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = String(input);
    if (url.endsWith("/auth/exchange_user_api_key")) {
      return Response.json({ accessToken: sessionToken, refreshToken: null });
    }
    return new Response("plan does not expose model discovery", { status: 403 });
  }) as typeof fetch;

  const connection = await seedCursorApiConnection(apiKey);
  const response = await callRoute(connection.id);
  const body = (await response.json()) as {
    source: string;
    warning?: string;
    intentional?: boolean;
  };

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.match(body.warning || "", /non-authoritative local catalog/i);
  assert.notEqual(body.intentional, true);
});
