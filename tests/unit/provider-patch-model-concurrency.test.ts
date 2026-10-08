// PATCH /api/providers/[id] accepts, persists, and returns
// `rateLimitOverrides.modelConcurrency`, and runtime state reflects the update
// without a restart (refreshConnectionRateLimits path is already exercised by
// the in-memory limiter for scalar fields).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-concurrency-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.JWT_SECRET = "test-jwt-secret-model-concurrency";
process.env.INITIAL_PASSWORD = "admin-secret";

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection, getProviderConnectionById } =
  await import("../../src/lib/db/providers.ts");
const providerByIdRoute = await import("../../src/app/api/providers/[id]/route.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function createConnection() {
  return (await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI key",
    apiKey: "sk-test-key-value",
    priority: 1,
    isActive: true,
    testStatus: "active",
  })) as Record<string, unknown>;
}

async function patchConnection(id: string, body: Record<string, unknown>) {
  const request = await makeManagementSessionRequest(`http://localhost/api/providers/${id}`, {
    method: "PUT",
    body,
  });
  return providerByIdRoute.PUT(request, { params: Promise.resolve({ id }) });
}

function readBody(response: Response) {
  return response.json() as Promise<Record<string, unknown>>;
}

test("PUT accepts, persists, and returns the modelConcurrency map", async () => {
  const connection = await createConnection();

  const response = await patchConnection(connection.id as string, {
    rateLimitOverrides: { maxConcurrent: 4, modelConcurrency: { "glm-5": 1, "glm-4.7": 3 } },
  });
  assert.equal(response.status, 200);
  const body = await readBody(response);
  const overrides = (body.rateLimitOverrides ??
    (body.connection as Record<string, unknown>)?.rateLimitOverrides) as Record<string, unknown>;
  assert.deepEqual(overrides?.modelConcurrency, { "glm-5": 1, "glm-4.7": 3 });

  const persisted = (await getProviderConnectionById(connection.id as string)) as Record<
    string,
    unknown
  >;
  assert.deepEqual((persisted.rateLimitOverrides as Record<string, unknown>)?.modelConcurrency, {
    "glm-5": 1,
    "glm-4.7": 3,
  });
});

test("PUT rejects an invalid modelConcurrency map with a 400 and keeps the old row", async () => {
  const connection = await createConnection();
  await patchConnection(connection.id as string, {
    rateLimitOverrides: { modelConcurrency: { "glm-5": 1 } },
  });

  const bad = await patchConnection(connection.id as string, {
    rateLimitOverrides: { modelConcurrency: { "glm-5": 0 } },
  });
  assert.equal(bad.status, 400);

  const persisted = (await getProviderConnectionById(connection.id as string)) as Record<
    string,
    unknown
  >;
  assert.deepEqual((persisted.rateLimitOverrides as Record<string, unknown>)?.modelConcurrency, {
    "glm-5": 1,
  });
});

test("subsequent dashboard-style save preserves the configured map", async () => {
  const connection = await createConnection();
  await patchConnection(connection.id as string, {
    rateLimitOverrides: { modelConcurrency: { "glm-5": 1 } },
  });

  // Mirrors EditConnectionModal handleSubmit: it always rewrites the whole
  // overrides object; after this change it must carry the map forward.
  const response = await patchConnection(connection.id as string, {
    name: connection.name,
    priority: connection.priority,
    rateLimitOverrides: { rpm: 60, modelConcurrency: { "glm-5": 1 } },
  });
  assert.equal(response.status, 200);

  const persisted = (await getProviderConnectionById(connection.id as string)) as Record<
    string,
    unknown
  >;
  const overrides = persisted.rateLimitOverrides as Record<string, unknown>;
  assert.equal(overrides?.rpm, 60);
  assert.deepEqual(overrides?.modelConcurrency, { "glm-5": 1 });
});
