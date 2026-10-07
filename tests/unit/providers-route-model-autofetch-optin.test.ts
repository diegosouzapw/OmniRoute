import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-autofetch-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "provider-autofetch-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const originalFetch = globalThis.fetch;
const core = await import("../../src/lib/db/core.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");

const modelSyncUrls: string[] = [];
globalThis.fetch = (async (input: string | URL | Request) => {
  const url =
    typeof input === "string" ? input : input instanceof Request ? input.url : input.toString();
  if (new URL(url).pathname.includes("/sync-models")) {
    modelSyncUrls.push(url);
  }
  return new Response(JSON.stringify({ data: [] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}) as typeof fetch;

type CreateOptions = {
  autoFetchModels?: boolean;
  clientOwnsModelSync?: boolean;
};

async function createConnection(options: CreateOptions = {}): Promise<Response> {
  const providerSpecificData =
    options.autoFetchModels === undefined
      ? undefined
      : { autoFetchModels: options.autoFetchModels };

  const response = await providersRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/providers", {
      method: "POST",
      headers: options.clientOwnsModelSync ? { "X-Skip-Model-Sync": "true" } : undefined,
      body: {
        provider: "openai",
        apiKey: "sk-provider-autofetch-test",
        name: "Provider auto-fetch test",
        ...(providerSpecificData ? { providerSpecificData } : {}),
      },
    })
  );

  await new Promise<void>((resolve) => setTimeout(resolve, 10));
  return response;
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  modelSyncUrls.length = 0;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("POST /api/providers does not sync models when autoFetchModels is omitted", async () => {
  const response = await createConnection();

  assert.equal(response.status, 201);
  assert.equal(modelSyncUrls.length, 0);
});

test("POST /api/providers does not sync models when autoFetchModels is false", async () => {
  const response = await createConnection({ autoFetchModels: false });

  assert.equal(response.status, 201);
  assert.equal(modelSyncUrls.length, 0);
});

test("POST /api/providers syncs models exactly once when autoFetchModels is true", async () => {
  const response = await createConnection({ autoFetchModels: true });

  assert.equal(response.status, 201);
  assert.equal(modelSyncUrls.length, 1);
  assert.match(modelSyncUrls[0], /\/api\/providers\/[^/]+\/sync-models\?mode=import$/);
});

test("POST /api/providers lets a dashboard-owned sync suppress the server duplicate", async () => {
  const response = await createConnection({ autoFetchModels: true, clientOwnsModelSync: true });

  assert.equal(response.status, 201);
  assert.equal(modelSyncUrls.length, 0);
});
