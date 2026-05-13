import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-payload-rules-route-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/settings/payload-rules/route.ts");
const payloadRulesService = await import("../../open-sse/services/payloadRules.ts");

async function resetStorage() {
  core.resetDbInstance();
  payloadRulesService.resetPayloadRulesConfigForTests();
  delete process.env.INITIAL_PASSWORD;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }

  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }

  if (ORIGINAL_JWT_SECRET === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
  }
});

test("payload rules route returns the neutral config by default", async () => {
  const response = await route.GET(new Request("http://localhost/api/settings/payload-rules"));
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    default: [],
    override: [],
    filter: [],
    defaultRaw: [],
  });
});

test("payload rules route requires a dashboard session when management auth is enabled", async () => {
  await enableManagementAuth();

  const unauthenticated = await route.GET(
    new Request("http://localhost/api/settings/payload-rules")
  );
  const invalidToken = await route.GET(
    new Request("http://localhost/api/settings/payload-rules", {
      headers: { authorization: "Bearer sk-invalid" },
    })
  );
  const authenticated = await route.GET(
    await makeManagementSessionRequest("http://localhost/api/settings/payload-rules")
  );

  const unauthenticatedBody = (await unauthenticated.json()) as any;
  const invalidTokenBody = (await invalidToken.json()) as any;
  const authenticatedBody = (await authenticated.json()) as any;

  assert.equal(unauthenticated.status, 401);
  assert.equal(unauthenticatedBody.error.message, "Authentication required");
  assert.equal(invalidToken.status, 403);
  assert.equal(invalidTokenBody.error.message, "Invalid management token");
  assert.equal(authenticated.status, 200);
  assert.deepEqual(authenticatedBody, {
    default: [],
    override: [],
    filter: [],
    defaultRaw: [],
  });
});

test("payload rules route persists normalized config and hot reloads the runtime", async () => {
  await enableManagementAuth();

  const requestBody = {
    default: [
      {
        models: [{ name: "gpt-*" }],
        params: { temperature: 0.2 },
      },
    ],
    override: [
      {
        models: [{ name: "claude-*", protocol: "anthropic" }],
        params: { max_tokens: 512 },
      },
    ],
    filter: [
      {
        models: [{ name: "*", protocol: "openai" }],
        params: ["metadata.internal"],
      },
    ],
    "default-raw": [
      {
        models: [{ name: "gpt-4o-mini" }],
        params: {
          response_format: '{"type":"json_schema"}',
        },
      },
    ],
  };

  const response = await route.PUT(
    await makeManagementSessionRequest("http://localhost/api/settings/payload-rules", {
      method: "PUT",
      body: requestBody,
    })
  );
  const body = (await response.json()) as any;
  const settings = await settingsDb.getSettings();
  const runtimeConfig = await payloadRulesService.getPayloadRulesConfig();

  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    default: requestBody.default,
    override: requestBody.override,
    filter: requestBody.filter,
    defaultRaw: requestBody["default-raw"],
  });
  assert.deepEqual(settings.payloadRules, body);
  assert.deepEqual(runtimeConfig, body);
});

test("payload rules route rejects malformed and schema-invalid payloads", async () => {
  await enableManagementAuth();

  const invalidJson = await route.PUT(
    await makeManagementSessionRequest("http://localhost/api/settings/payload-rules", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: "{",
    })
  );
  const invalidSchema = await route.PUT(
    await makeManagementSessionRequest("http://localhost/api/settings/payload-rules", {
      method: "PUT",
      body: {},
    })
  );

  const invalidJsonBody = (await invalidJson.json()) as any;
  const invalidSchemaBody = (await invalidSchema.json()) as any;
  const runtimeConfig = await payloadRulesService.getPayloadRulesConfig();

  assert.equal(invalidJson.status, 400);
  assert.equal(invalidJsonBody.error.message, "Invalid request");
  assert.deepEqual(invalidJsonBody.error.details, [
    { field: "body", message: "Invalid JSON body" },
  ]);

  assert.equal(invalidSchema.status, 400);
  assert.equal(invalidSchemaBody.error.message, "Invalid request");
  assert.match(invalidSchemaBody.error.details[0].message, /No valid fields to update/);
  assert.deepEqual(runtimeConfig, {
    default: [],
    override: [],
    filter: [],
    defaultRaw: [],
  });
});
