import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-alias-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = process.env.JWT_SECRET || "model-alias-route-jwt";

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const localDb = await import("../../src/lib/localDb.ts");
const route = await import("../../src/app/api/models/alias/route.ts");
const catalogRoute = await import("../../src/app/api/models/catalog/route.ts");
const v1Catalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("model alias route resolves a stored alias and emits diagnostics headers", async () => {
  await modelsDb.setModelAlias("fast-default", "openai/gpt-4o-mini");

  const response = await route.GET(
    await makeManagementSessionRequest("http://localhost/api/models/alias?alias=fast-default", {
      headers: { "x-request-id": "req-model-alias-1" },
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("X-Request-Id"), "req-model-alias-1");
  assert.equal(response.headers.get("X-Model-Alias-Resolved"), "openai/gpt-4o-mini");
  assert.match(response.headers.get("X-Model-Catalog-Version") || "", /^model-metadata-v1:/);
  assert.equal(body.resolved.qualifiedId, "openai/gpt-4o-mini");
  assert.equal(body.resolved.source, "stored_alias");
});

test("model alias route returns typed ambiguity errors for ambiguous aliases", async () => {
  const response = await route.GET(
    await makeManagementSessionRequest("http://localhost/api/models/alias?alias=claude-sonnet-4-6")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 409);
  assert.equal(body.error.code, "MODEL_ALIAS_AMBIGUOUS");
  assert.ok(Array.isArray(body.error.candidates));
  assert.equal(response.headers.get("X-Model-Alias-Resolved"), "claude-sonnet-4-6");
});

test("model alias route requires a dashboard session when management auth is enabled", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });

  const unauthenticated = await route.GET(
    new Request("http://localhost/api/models/alias?alias=fast-default")
  );
  const invalidToken = await route.GET(
    new Request("http://localhost/api/models/alias?alias=fast-default", {
      headers: { authorization: "Bearer sk-invalid" },
    })
  );

  const unauthenticatedBody = (await unauthenticated.json()) as any;
  const invalidTokenBody = (await invalidToken.json()) as any;

  assert.equal(unauthenticated.status, 401);
  assert.equal(unauthenticatedBody.error.message, "Authentication required");
  assert.equal(invalidToken.status, 403);
  assert.equal(invalidTokenBody.error.message, "Invalid management token");
  assert.match(unauthenticated.headers.get("X-Model-Catalog-Version") || "", /^model-metadata-v1:/);
});

test("api models catalog route reuses the unified catalog diagnostics headers", async () => {
  const response = await catalogRoute.GET(
    new Request("http://localhost/api/models/catalog", {
      headers: { "x-request-id": "req-model-catalog-1" },
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("X-Request-Id"), "req-model-catalog-1");
  assert.match(response.headers.get("X-Model-Catalog-Version") || "", /^model-metadata-v1:/);
  assert.equal(typeof body.catalog, "object");
  assert.equal(typeof body.catalogVersion, "string");
});

test("v1 models catalog emits diagnostics headers alongside the OpenAI-compatible list", async () => {
  const response = await v1Catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { "x-request-id": "req-v1-models-1" },
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("X-Request-Id"), "req-v1-models-1");
  assert.match(response.headers.get("X-Model-Catalog-Version") || "", /^model-metadata-v1:/);
  assert.equal(body.object, "list");
  assert.ok(Array.isArray(body.data));
});
