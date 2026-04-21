import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-webhooks-routes-auth-"));
const TEST_MIGRATIONS_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-webhooks-auth-migrations-")
);
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_MIGRATIONS_DIR = process.env.OMNIROUTE_MIGRATIONS_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = TEST_MIGRATIONS_DIR;

for (const migration of [
  "001_initial_schema.sql",
  "011_webhooks.sql",
  "029_webhooks_templates.sql",
]) {
  fs.copyFileSync(
    path.join(process.cwd(), "src/lib/db/migrations", migration),
    path.join(TEST_MIGRATIONS_DIR, migration)
  );
}

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const webhooksDb = await import("../../src/lib/db/webhooks.ts");
const webhooksRoute = await import("../../src/app/api/webhooks/route.ts");
const webhookRoute = await import("../../src/app/api/webhooks/[id]/route.ts");
const webhookTestRoute = await import("../../src/app/api/webhooks/[id]/test/route.ts");

async function resetStorage() {
  core.resetDbInstance();
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
  fs.rmSync(TEST_MIGRATIONS_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }

  if (ORIGINAL_MIGRATIONS_DIR === undefined) {
    delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  } else {
    process.env.OMNIROUTE_MIGRATIONS_DIR = ORIGINAL_MIGRATIONS_DIR;
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

test("webhook management routes require a management session and mask secrets on read", async () => {
  await enableManagementAuth();

  const created = webhooksDb.createWebhook({
    url: "https://example.com/hooks",
    description: "Primary webhook",
    secret: "whsec_super_secret_value",
  });

  const unauthenticatedList = await webhooksRoute.GET(new Request("http://localhost/api/webhooks"));
  const invalidTokenList = await webhooksRoute.GET(
    new Request("http://localhost/api/webhooks", {
      headers: { authorization: "Bearer sk-invalid" },
    })
  );
  const authenticatedList = await webhooksRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/webhooks")
  );
  const detailResponse = await webhookRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/webhooks/${created.id}`),
    { params: Promise.resolve({ id: created.id }) }
  );
  const unauthenticatedTest = await webhookTestRoute.POST(
    new Request(`http://localhost/api/webhooks/${created.id}/test`, { method: "POST" }),
    { params: Promise.resolve({ id: created.id }) }
  );

  const unauthenticatedBody = await unauthenticatedList.json();
  const invalidTokenBody = await invalidTokenList.json();
  const authenticatedBody = await authenticatedList.json();
  const detailBody = await detailResponse.json();
  const unauthenticatedTestBody = await unauthenticatedTest.json();

  assert.equal(unauthenticatedList.status, 401);
  assert.equal(unauthenticatedBody.error.message, "Authentication required");
  assert.equal(invalidTokenList.status, 403);
  assert.equal(invalidTokenBody.error.message, "Invalid management token");
  assert.equal(authenticatedList.status, 200);
  assert.equal(authenticatedBody.webhooks[0].secret, "whsec_supe...");
  assert.equal(detailResponse.status, 200);
  assert.equal(detailBody.webhook.secret, "whsec_supe...");
  assert.equal(unauthenticatedTest.status, 401);
  assert.equal(unauthenticatedTestBody.error.message, "Authentication required");
});

test("webhook create route requires management auth and still returns the generated secret after creation", async () => {
  await enableManagementAuth();

  const unauthenticatedCreate = await webhooksRoute.POST(
    new Request("http://localhost/api/webhooks", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: "https://example.com/new-hook" }),
    })
  );
  const authenticatedCreate = await webhooksRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/webhooks", {
      method: "POST",
      body: { url: "https://example.com/new-hook" },
    })
  );

  const unauthenticatedBody = await unauthenticatedCreate.json();
  const authenticatedBody = await authenticatedCreate.json();

  assert.equal(unauthenticatedCreate.status, 401);
  assert.equal(unauthenticatedBody.error.message, "Authentication required");
  assert.equal(authenticatedCreate.status, 201);
  assert.match(authenticatedBody.webhook.secret, /^whsec_/);
});
